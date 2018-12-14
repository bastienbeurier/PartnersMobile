import React from "react";
import { createStackNavigator, createAppContainer } from "react-navigation";
import LoginScreen from "./screens/LoginScreen.js"
import SplashScreen from "./screens/SplashScreen.js"
import SignupScreen from "./screens/SignupScreen.js"

const AppNavigator = createStackNavigator(
  {
    Login: LoginScreen,
    Splash: SplashScreen,
    Signup: SignupScreen,
  },
  {
    initialRouteName: "Login"
  }
);

export default createAppContainer(AppNavigator);
