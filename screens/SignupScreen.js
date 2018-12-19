import React from "react";
import { ActivityIndicator, Alert, Button, View, TextInput } from "react-native";
import ApiUtils from "../utils/ApiUtils";
import {NavigationActions, StackActions} from "react-navigation";

export default class SignupScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
    };
  }

  goToLogin() {
    const splash = StackActions.reset({
      index: 0,
      actions: [ NavigationActions.navigate({ routeName: "Login" })],
    });
    this.props.navigation.dispatch(splash);
  }

  submitSignupForm(username, password, email) {
    this.setState({
      isLoading: true,
    });

    ApiUtils.makeRequest(
      "users",
      "POST",
      {},
      JSON.stringify({
        username: username,
        password: password,
        email: email,
      }),
      (jsonResponse) => {
        this.goToLogin();
        Alert.alert("Signup successful! Please login.");

        this.setState({
          isLoading: false,
        });
      },
      (error) => {
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
      return <View
        style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
        <TextInput
          style={{height: 50}}
          placeholder="Type your email"
          onChangeText={email => this.setState({email})}
          autoCapitalize="none"
        />
        <TextInput
          style={{height: 50}}
          placeholder="Type your username"
          onChangeText={username => this.setState({username})}
          autoCapitalize="none"
        />
        <TextInput
          style={{height: 50}}
          placeholder="Type your password"
          onChangeText={password => this.setState({password})}
          autoCapitalize="none"
          secureTextEntry
        />
        <TextInput
          style={{height: 50}}
          placeholder="Confirm your password"
          onChangeText={confirm_password => this.setState({confirm_password})}
          autoCapitalize="none"
          secureTextEntry
        />
        <Button
          title="Sign Up"
          onPress={() => {
            let reg = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
            if (!this.state.email || reg.test(this.state.email) === false) {
              Alert.alert("Invalid email.");
              return;
            }

            reg = /[a-zA-Z0-9_]{1,20}/;
            if (!this.state.username || reg.test(this.state.username) === false) {
              Alert.alert("Invalid username (1-20 chars).");
              return;
            }

            reg = /[a-zA-Z0-9~!@#$%^&*()_+=-]{6,20}/;
            if (!this.state.password || reg.test(this.state.password) === false) {
              Alert.alert("Invalid password (6-20 chars).");
              return;
            }

            if (!this.state.confirm_password || this.state.password !== this.state.confirm_password) {
              Alert.alert("Passwords don't match.");
              return;
            }

            this.submitSignupForm(
              this.state.username,
              this.state.password,
              this.state.email,
            );
          }}/>
      </View>;
    }
  }
}
