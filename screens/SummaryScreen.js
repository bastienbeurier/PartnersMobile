import React from "react";
import {Alert, Text, View } from "react-native";
import ApiUtils from "../utils/ApiUtils.js";

export default class SplashScreen extends React.Component {

  componentWillMount(){
    let before = new Date();
    let after = new Date();
    after.setDate(after.getDate() - 7);

    ApiUtils.getTaskSummary(this, before, after,
      (jsonResponse) => {
        console.log(jsonResponse);
        Alert.alert("Success");
      },
      (errorMessage) => {
        Alert.alert(errorMessage);
      });
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Summary</Text>
      </View>
    );
  }
}
