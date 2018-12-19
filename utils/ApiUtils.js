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

  static async makeRequestWithCredentials(endpoint, requestType, email, password, successHandler, failureHandler) {
    const headers = {
      "Authorization": "Basic " + base64.encode(email + ":" + password),
    };

    return this.makeRequest(endpoint, requestType, headers, successHandler, failureHandler);
  }

  static async makeRequestWithToken(endpoint, requestType, successHandler, failureHandler) {
    let token = null;
    if (ApiUtils.token) {
      token = ApiUtils.token;
    } else {
      try {
        token = await AsyncStorage.getItem(Constants.TOKEN_KEY);
        ApiUtils.token = token;
      } catch (error) {
        failureHandler(error);
        return;
      }
    }

    const headers = token && token.length > 0 ? {"Authorization:Bearer": token} : {};
    return this.makeRequest(endpoint, requestType, headers, successHandler, failureHandler);
  }

  static async makeRequest(endpoint, requestType, headers, successHandler, failureHandler) {
    return fetch(Constants.API_URL + endpoint, {
      method: requestType,
      headers: headers,
    })
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.error) {
          failureHandler(responseJson.error);
        } else {
          successHandler(responseJson);
        }
      })
      .catch(error => {
        failureHandler(error);
      });
  }

}
