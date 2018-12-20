import {createStackNavigator,createAppContainer} from "react-navigation";
import LoginScreen from "./screens/LoginScreen.js";
import SplashScreen from "./screens/SplashScreen.js";
import SignupScreen from "./screens/SignupScreen.js";
import CreateTaskScreen from "./screens/CreateTaskScreen.js";

const AppNavigator = createStackNavigator(
  {
    Login: LoginScreen,
    Splash: SplashScreen,
    Signup: SignupScreen,
    CreateTask: CreateTaskScreen,
  },
  {
    initialRouteName: "Splash",
  }
);

export default createAppContainer(AppNavigator);
