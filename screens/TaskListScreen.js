import React from "react";
import {Button, FlatList, Text, TouchableOpacity, View} from "react-native";
import PropTypes from "prop-types";


class TaskListItem extends React.PureComponent {

  _onPress = () => {
    this.props.onPressItem(this.props.id);
  };

  render() {
    return (
      <TouchableOpacity onPress={this._onPress}>
        <View style={{height: 120, justifyContent: "center"}}>
          <Text>
            {this.props.title}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}

TaskListItem.propTypes = {
  onPressItem: PropTypes.func,
};

export default class TaskListScreen extends React.Component {

  static navigationOptions = ({ navigation }) => {
    return {
      headerLeft: (
        <Button
          onPress={navigation.getParam("goToSummary")}
          title="Summary"
        />
      ),
    };
  };

  componentDidMount() {
    this.props.navigation.setParams({ goToSummary: this._goToSummary });
  }

  goToCreateTask(categoryKey) {
    this.props.navigation.navigate("CreateTask", {categoryKey: categoryKey});
  }

  _goToSummary = () => {
    this.props.navigation.navigate("Summary");
  };

  _onPressItem = (id: string) => {
    this.setState((state) => {
      this.goToCreateTask(id);
    });
  };

  _renderItem = ({item}) => (
    <TaskListItem
      onPressItem={this._onPressItem}
      title={item.title}
      id={item.key}
    />
  );

  render() {
    return (
      <FlatList
        columnWrapperStyle={{
          flex: 1,
          justifyContent: "space-around",
        }}
        data={[
          {key: "laundry", title: "Laundry"},
          {key: "dishes", title: "Dishes"},
          {key: "cleaning", title: "Cleaning"},
          {key: "tidying", title: "Tidying"},
          {key: "pets", title: "Pets"},
          {key: "cooking", title: "Cooking"},
          {key: "plants", title: "Plants"},
          {key: "garden", title: "Garden"},
          {key: "trash", title: "Trash"},
          {key: "groceries", title: "Groceries"},
          {key: "administrative", title: "Administrative"},
          {key: "IT", title: "IT"},
          {key: "kids", title: "Kids"},
        ]}
        extraData={this.state}
        renderItem={this._renderItem}
        numColumns={4}
      />
    );
  }
}
