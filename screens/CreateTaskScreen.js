import React from "react";
import { ActivityIndicator, Alert, Button, View, Text, TextInput } from "react-native";
import ApiUtils from "../utils/ApiUtils";

export default class CreateTaskScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
    };
  }

  goToTaskList() {
    this.props.navigation.goBack();
  }

  submitTaskForm(categoryKey, duration, comment) {
    this.setState({
      isLoading: true,
    });

    ApiUtils.createTask(this, categoryKey, duration, comment,
      (jsonResponse) => {
        this.goToTaskList();
        Alert.alert("Task saved!");
        this.setState({
          isLoading: false,
        });
      },
      (errorMessage) => {
        Alert.alert(errorMessage);
        this.setState({
          isLoading: false,
        });
      });
  }

  render() {
    const { navigation } = this.props;
    const categoryKey = navigation.getParam("categoryKey", "");

    if (this.state.isLoading) {
      return <ActivityIndicator size="large" color="#0000ff" />;
    } else {
      return <View
        style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
        <Text>{categoryKey}</Text>
        <TextInput
          style={{height: 50}}
          placeholder="How many minutes?"
          onChangeText={durationString => this.setState({durationString})}
          keyboardType = "numeric"
        />
        <TextInput
          style={{height: 50}}
          placeholder="Optional comment"
          onChangeText={comment => this.setState({comment})}
          autoCapitalize="none"
        />
        <Button
          title="Save"
          onPress={() => {
            let reg = /^[0-9]{1,3}$/;
            if (!this.state.durationString || reg.test(this.state.durationString) === false) {
              Alert.alert("Minutes should be between 1 and 999.");
              return;
            }

            this.submitTaskForm(
              categoryKey,
              parseInt(this.state.durationString , 10 ) + 1,
              this.state.comment,
            );
          }}/>
      </View>;
    }
  }
}
