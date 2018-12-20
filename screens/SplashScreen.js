import React from "react";
import {Text, View } from "react-native";
import {NavigationActions, StackActions} from "react-navigation";
import ApiUtils from "../utils/ApiUtils.js";

export default class SplashScreen extends React.Component {

  componentWillMount(){
    ApiUtils.retrieveToken(() => {
      this.goTo("CreateTask");
    }, () => {
      this.goTo("Login");
    });
  }

  goTo(screen) {
    const login = StackActions.reset({
      index: 0,
      actions: [ NavigationActions.navigate({ routeName: screen })],
    });
    this.props.navigation.dispatch(login);
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Partners</Text>
      </View>
    );
  }
}
