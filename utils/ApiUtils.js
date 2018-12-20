import * as Constants from "../Constants";
import * as base64 from "base-64";
import {AsyncStorage} from "react-native";

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

  static async makeRequest(endpoint, requestType, headers, body, authorized, success, failure) {
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
          failure(responseJson.message);
        } else {
          success(responseJson);
        }
      })
      .catch(error => {
        failure(error.message);
      });
  }

  static async login(email, password, success, failure) {
    const headers = { "Authorization": "Basic " + base64.encode(email + ":" + password) };
    return this.makeRequest("tokens", "POST", headers, {}, false, success, failure);
  }

  static async signup(email, username, password, success, failure) {
    ApiUtils.makeRequest("users","POST", {},
      {
        username: username,
        password: password,
        email: email,
      }, false, success, failure);
  }

  static async signout(success, failure) {
    ApiUtils.makeRequest("tokens","DELETE",{},{},true,
      (jsonResponse) => {
        ApiUtils.token = null;
        ApiUtils.saveToken(null);
        success(jsonResponse);
      }, (errorMessage) => {
        ApiUtils.token = null;
        ApiUtils.saveToken(null);
        failure(errorMessage);
      });
  }
}
