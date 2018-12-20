import * as Constants from "../Constants";
import * as base64 from "base-64";
import {Alert, AsyncStorage} from "react-native";
import {NavigationActions, StackActions} from "react-navigation";

export default class ApiUtils {

  static token = null;

  static async saveToken(token) {
    try {
      ApiUtils.token = token;
      if (token) {
        await AsyncStorage.setItem(Constants.TOKEN_KEY, token);
      } else {
        console.log("Removing token");
        await AsyncStorage.removeItem(Constants.TOKEN_KEY);
      }
    } catch (error) {
     console.error(error);
    }
  }

  static async retrieveToken(success, failure) {
    try {
      const token = await AsyncStorage.getItem(Constants.TOKEN_KEY);
      if (token !== null) {
        console.log("Token: " + token);
        ApiUtils.token = token;
        success();
      } else {
        failure();
      }
    } catch (error) {
      console.error(error);
      failure();
    }
  }

  static deleteToken(context, redirect) {
    ApiUtils.token = null;
    ApiUtils.saveToken(null);

    if (!redirect || !context) {
      return;
    }

    const login = StackActions.reset({
      index: 0,
      actions: [ NavigationActions.navigate({ routeName: "Login" })],
    });
    context.props.navigation.dispatch(login);
    Alert.alert("Credentials expired, please login again.");
  }

  static async makeRequest(context, endpoint, requestType, headers, body, authorized, success, failure) {
    let enrichedHeaders = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };

    if (authorized && ApiUtils.token && ApiUtils.token.length) {
      enrichedHeaders.Authorization = "Bearer " + ApiUtils.token;
    }

    Object.keys(headers).forEach(key => {
      enrichedHeaders[key] = headers[key];
    });

    return fetch(Constants.API_URL + endpoint, {
      method: requestType,
      headers: enrichedHeaders,
      body: body ? JSON.stringify(body) : null,
    })
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.error) {
          if (responseJson.error === "Unauthorized") {
            this.deleteToken(context, true);
          } else {
            failure(responseJson.message);
          }
        } else {
          success(responseJson);
        }
      })
      .catch(error => {
        failure(error.message);
      });
  }

  static async login(context, email, password, success, failure) {
    const headers = { "Authorization": "Basic " + base64.encode(email + ":" + password) };
    return this.makeRequest(context, "tokens", "POST", headers, {}, false, success, failure);
  }

  static async signup(context, email, username, password, success, failure) {
    ApiUtils.makeRequest(context, "users","POST", {},
      {
        username: username,
        password: password,
        email: email,
      }, false, success, failure);
  }

  static async signout(context, success, failure) {
    ApiUtils.makeRequest(context, "tokens","DELETE",{},{},true,
      (jsonResponse) => {
        this.deleteToken(null, false);
        success(jsonResponse);
      }, (errorMessage) => {
        this.deleteToken(null, false);
        failure(errorMessage);
      });
  }

  static async createTask(context, category, duration, note, success, failure) {
    ApiUtils.makeRequest(context, "tasks","POST",{},{
        category: category,
        duration: duration,
      },true,
      success,failure);
  }
}
