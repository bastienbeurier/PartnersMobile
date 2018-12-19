import * as Constants from "../Constants";
import * as base64 from "base-64";
import {AsyncStorage} from "react-native";

export default class ApiUtils {

  static token = null;

  static async saveToken(token) {
    try {
      ApiUtils.token = token; // TODO BB: load token on app start.
      await AsyncStorage.setItem(Constants.TOKEN_KEY, token);
    } catch (error) {
     console.log("Could not save auth token.");
    }
  }

  static async enrichedHeaders(headers, authorized) {
    if (authorized && ApiUtils.token && ApiUtils.token.length) {
      headers.Authorization = "Bearer " + ApiUtils.token;
    }

    headers.Accept = "application/json";
    headers["Content-Type"] = "application/json";
    return headers;
  }

  static async makeRequest(endpoint, requestType, headers, body, authorized, success, failure) {
    return fetch(Constants.API_URL + endpoint, {
      method: requestType,
      headers: ApiUtils.enrichedHeaders(headers, authorized),
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

  static async login(endpoint, requestType, email, password, success, failure) {
    const headers = { "Authorization": "Basic " + base64.encode(email + ":" + password) };
    return this.makeRequest(endpoint, requestType, headers, {}, false, success, failure);
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
      }, failure);
  }
}
