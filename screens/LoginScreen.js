import React from "react";
import { Button, View, TextInput } from "react-native";

export default class LoginScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
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
        />
        <Button
          title="Login"
          onPress={() => this.props.navigation.navigate("Splash")}
        />
        <Button
          title="No account yet? Sign up!"
          onPress={() => this.props.navigation.navigate("Signup")}
        />
      </View>
    );
  }
}
