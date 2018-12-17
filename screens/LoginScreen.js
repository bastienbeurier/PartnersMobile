import React from "react";
import {Headers, Button, View, TextInput, Alert, ActivityIndicator} from "react-native";
import * as Constants from "../Constants.js";
import * as base64 from "base-64";

export default class LoginScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
    };
  }

  submitLoginForm(email, password) {
    this.setState({
      isLoading: true,
    });

    return fetch(Constants.API_URL + "tokens", {
      method: "POST",
      headers: {
        "Authorization": "Basic " + base64.encode(email + ":" + password),
      },
    })
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.error) {
          Alert.alert(responseJson.message);
        } else {
          this.props.navigation.navigate("Splash");
        }

        this.setState({
          isLoading: false,
        });
      })
      .catch(error => {
        Alert.alert(error.message);
        this.setState({
          isLoading: false,
        });
      });
  }

  render() {
    if (this.state.isLoading) {
      return <ActivityIndicator size="large" color="#0000ff" />;
    } else {
      return <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <TextInput
          style={{height: 50}}
          placeholder="Type your email"
          onChangeText={(email) => this.setState({email})}
          autoCapitalize="none"
        />
        <TextInput
          placeholder="Type your password"
          onChangeText={(password) => this.setState({password})}
          autoCapitalize="none"
          secureTextEntry
        />
        <Button
          title="Login"
          onPress={() => {
            let reg = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
            if (!this.state.email || reg.test(this.state.email) === false) {
              Alert.alert("Invalid email.");
              return;
            }

            reg = /[a-zA-Z0-9~!@#$%^&*()_+=-]{6,20}/;
            if (!this.state.password || reg.test(this.state.password) === false) {
              Alert.alert("Invalid password (6-20 chars).");
              return;
            }

            this.submitLoginForm(
              this.state.email,
              this.state.password,
            );
          }}
        />
        <Button
          title="No account yet? Sign up!"
          onPress={() => this.props.navigation.navigate("Signup")}
        />
      </View>;
    }
  }
}
