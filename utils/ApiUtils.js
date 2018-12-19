import * as Constants from "../Constants";
import * as base64 from "base-64";
import {AsyncStorage} from "react-native";

export default class ApiUtils {

  static token = null;

  static async saveToken(token) {
    try {
      await AsyncStorage.setItem(Constants.TOKEN_KEY, token);
    } catch (error) {
     console.log("Could not save auth token.");
    }
  }

  static async authHeaders(headers) {
    let token = null;
    if (ApiUtils.token) {
      headers["Authorization:Bearer"] = ApiUtils.token;
    } else {
      try {
        token = await AsyncStorage.getItem(Constants.TOKEN_KEY);
      } catch (error) {
        console.log("Error while retrieve token");
      }

      if (token && token.length > 0) {
        headers["Authorization:Bearer"] = token;
        ApiUtils.token = token;
      }
    }

    return headers;
  }

  static async makeRequest(endpoint, requestType, headers, body, authorized, successHandler, failureHandler) {
    if (authorized) {
      headers = ApiUtils.authHeaders(headers);
    }

    headers.Accept = "application/json";
    headers["Content-Type"] = "application/json";

    return fetch(Constants.API_URL + endpoint, {
      method: requestType,
      headers: headers,
      body: JSON.stringify(body),
    })
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.error) {
          failureHandler(responseJson.message);
        } else {
          successHandler(responseJson);
        }
      })
      .catch(error => {
        failureHandler(error.message);
      });
  }

  static async makeLoginRequest(endpoint, requestType, email, password, successHandler, failureHandler) {
    const headers = {
      "Authorization": "Basic " + base64.encode(email + ":" + password),
    };

    return this.makeRequest(endpoint, requestType, headers, {}, false, successHandler, failureHandler);
  }

  static async makeSignupRequest(email, username, password, sucessHandler, failureHandler) {
    ApiUtils.makeRequest(
      "users",
      "POST",
      {},
      {
        username: username,
        password: password,
        email: email,
      },
      false,
      sucessHandler,
      failureHandler);
  }
}
