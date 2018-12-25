import React from "react";
import {ActivityIndicator, Alert, FlatList, Text, View } from "react-native";
import ApiUtils from "../utils/ApiUtils.js";


export default class TasksForCategoryScreen extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      data: [],
    };
  }

  componentWillMount(){
    this.setState({
      isLoading: true,
    });

    const { navigation } = this.props;
    const category = navigation.getParam("category", null);
    const before = navigation.getParam("before", null);
    const after = navigation.getParam("after", null);

    if (!category || !before || !after) {
      navigation.goBack();
      Alert.alert("Internal error, sorry for the inconvenience.");
      return;
    }

    ApiUtils.getTaskPerCategory(this, category, before, after,
      (jsonResponse) => {
        this.setState({
          data: jsonResponse["tasks"],
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

  _renderItem = ({item}) => (
    <View style={{height: 100}}>
      <Text>
        {item.username}
      </Text>
      <Text>
        {item.timestamp}
      </Text>
      <Text>
        {item.comment}
      </Text>
    </View>
  );

  render() {
    if (this.state.isLoading) {
      return <ActivityIndicator size="large" color="#0000ff" />;
    } else {
      return (
        <FlatList
          data={this.state.data}
          extraData={this.state}
          renderItem={this._renderItem}
        />
      );
    }
  }
}
