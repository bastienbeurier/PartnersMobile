import React from "react";
import {FlatList, Text, TouchableOpacity, View} from "react-native";
import PropTypes from "prop-types";


class TaskListItem extends React.PureComponent {

  _onPress = () => {
    this.props.onPressItem(this.props.id);
  };

  render() {
    return (
      <TouchableOpacity onPress={this._onPress}>
        <View>
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

  goToCreateTask(categoryKey) {
    this.props.navigation.navigate("CreateTask", {categoryKey: categoryKey});
  }

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
      />
    );
  }
}
