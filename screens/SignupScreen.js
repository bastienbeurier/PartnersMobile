import React from "react";
import { ActivityIndicator, Alert, Button, View, Text, TextInput } from "react-native";

export default class SignupScreen extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  submitSignupForm(username, password, email) {
    return fetch("https://partners-web.herokuapp.com/api/users", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
        email: email,
      }),
    })
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.error) {
          Alert.alert(responseJson.message);
        } else {
          this.props.navigation.navigate("Login");
          Alert.alert("Signup successful! Please login.");
        }
      })
      .catch(error => {
        Alert.alert(error.message);
      });
  }

  render() {
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
      />
      <TextInput
        style={{height: 50}}
        placeholder="Confirm your password"
        onChangeText={confirm_password => this.setState({confirm_password})}
        autoCapitalize="none"
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
