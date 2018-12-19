import React from "react";
import {Button, View, TextInput, Alert, ActivityIndicator} from "react-native";
import { NavigationActions, StackActions } from "react-navigation";
import ApiUtils from "../utils/ApiUtils.js";

export default class LoginScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
    };
  }

  goToSplash() {
    const splash = StackActions.reset({
      index: 0,
      actions: [ NavigationActions.navigate({ routeName: "Splash" })],
    });
    this.props.navigation.dispatch(splash);
  }

  submitLoginForm(email, password) {
    this.setState({
      isLoading: true,
    });

    ApiUtils.makeLoginRequest(
      "tokens",
      "POST",
      email,
      password,
      (jsonResponse) => {
        ApiUtils.saveToken(jsonResponse.token);
        this.goToSplash();
      },
      (errorMessage) => {
        Alert.alert(errorMessage);
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
