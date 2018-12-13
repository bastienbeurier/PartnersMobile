import React from "react";
import { createStackNavigator, createAppContainer } from "react-navigation";

const AppNavigator = createStackNavigator(
  {
    Login: LoginScreen,
    Splash: SplashScreen,
  },
  {
    initialRouteName: "Login"
  }
);

export default createAppContainer(AppNavigator);
