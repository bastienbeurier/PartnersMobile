import React from "react";
import {View, Button, AsyncStorage, Alert} from 'react-native';
// import {NavigationActions, StackActions} from 'react-navigation';
// import * as Constants from '../Constants';

export default class SplashScreen extends React.Component {

  // async getToken(successHandler, errorHandler) {
  //   try {
  //     const token = await AsyncStorage.getItem(Constants.TOKEN_KEY);
  //     if (token !== null) {
  //       successHandler(token);
  //     } else {
  //       this.goToLogin();
  //     }
  //   } catch (error) {
  //     errorHandler(error.message);
  //   }
  // }
  //
  // handleError(message) {
  //   Alert.alert(message);
  // }
  //
  // invalidateToken(token) {
  //   Alert.alert("Token is: " + token);
  // }
  //
  // goToLogin() {
  //   const login = StackActions.reset({
  //     index: 0,
  //     actions: [ NavigationActions.navigate({ routeName: "Login" })],
  //   });
  //   this.props.navigation.dispatch(login);
  // }

  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Button
          title="Logout"
          onPress={() => {
            // this.getToken(this.invalidateToken, this.handleError);
          }
          }
        />
      </View>
    );
  }
}
