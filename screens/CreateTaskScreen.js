import React from "react";
import {Alert, View, Button} from "react-native";
import {NavigationActions, StackActions} from "react-navigation";
import ApiUtils from "../utils/ApiUtils.js";

export default class CreateTaskScreen extends React.Component {

  goToLogin() {
    const login = StackActions.reset({
      index: 0,
      actions: [ NavigationActions.navigate({ routeName: "Login" })],
    });
    this.props.navigation.dispatch(login);
  }

  signout() {
    this.goToLogin();

    ApiUtils.signout((jsonResponse) =>
      {},
      (errorMessage) => {
        Alert.alert(errorMessage);
      });
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Button
          title="Logout"
          onPress={() => this.signout()}
        />
      </View>
    );
  }
}
