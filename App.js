import {createStackNavigator,createAppContainer} from "react-navigation";
import LoginScreen from "./screens/LoginScreen.js";
import SplashScreen from "./screens/SplashScreen.js";
import SignupScreen from "./screens/SignupScreen.js";
import TaskListScreen from "./screens/TaskListScreen.js";
import CreateTaskScreen from "./screens/CreateTaskScreen.js";
import SummaryScreen from "./screens/SummaryScreen.js";
import TasksForCategoryScreen from "./screens/TasksForCategoryScreen.js";

const AppNavigator = createStackNavigator(
  {
    Login: LoginScreen,
    Splash: SplashScreen,
    Signup: SignupScreen,
    TaskList: TaskListScreen,
    CreateTask: CreateTaskScreen,
    Summary: SummaryScreen,
    TasksForCategory: TasksForCategoryScreen,
  },
  {
    initialRouteName: "Splash",
  }
);

export default createAppContainer(AppNavigator);
