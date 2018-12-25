import React from "react";
import {ActivityIndicator, Alert, FlatList, Text, TouchableOpacity, View } from "react-native";
import ApiUtils from "../utils/ApiUtils.js";
import PropTypes from "prop-types";


class SummaryListItem extends React.PureComponent {

  _onPress = () => {
    this.props.onPressItem(this.props.id);
  };

  render() {
    return (
      <TouchableOpacity onPress={this._onPress}>
        <View style={{height: 50, justifyContent: "center"}}>
          <Text>
            {this.props.title}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}

SummaryListItem.propTypes = {
  onPressItem: PropTypes.func,
};

export default class SplashScreen extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      data: [],
      username: "You",
      partnerUsername: "Partner",
    };
  }

  componentWillMount(){
    let before = new Date();
    let after = new Date();
    after.setDate(after.getDate() - 7);

    this.setState({
      isLoading: true,
    });

    ApiUtils.getTaskSummary(this, before, after,
      (jsonResponse) => {
        let summary = jsonResponse["category_summaries"];
        const compoundValues = this.buildCompoundSummaryItem(summary);
        summary.unshift(compoundValues);
        this.setState({
          data: summary,
          isLoading: false,
          username: jsonResponse["partners"][0],
          partnerUsername: jsonResponse["partners"][1],
        });
      },
      (errorMessage) => {
        Alert.alert(errorMessage);
        this.setState({
          isLoading: false,
        });
      });
  }

  buildCompoundSummaryItem(categorySummaries) {
    let totalCount = 0;
    let totalDuration = 0;
    let partnerTotalCount = 0;
    let partnerTotalDuration = 0;
    for (let i = 0; i < categorySummaries.length; i++) {
      const item = categorySummaries[i];
      totalCount += item["partner_task_counts"][0];
      totalDuration += item["partner_task_durations"][0];
      partnerTotalCount += item["partner_task_counts"][1];
      partnerTotalDuration += item["partner_task_durations"][1];
    }
    return {
      category: "total",
      partner_task_counts: [totalCount, partnerTotalCount],
      partner_task_durations: [totalDuration, partnerTotalDuration],
    };
  }

  goToCategoryHistory() {}

  _onPressItem = (id: string) => {
    this.setState((state) => {
      this.goToCategoryHistory();
    });
  };

  _renderItem = ({item}) => (
    <SummaryListItem
      onPressItem={this._onPressItem}
      title={this.titleForSummaryItem(item)}
      id={item.key}
    />
  );

  titleForSummaryItem(item) {
    return item["category"].toUpperCase() + " " + this.state.username + " (" +
      item["partner_task_counts"][0] + " times, " + item["partner_task_durations"][0]
      + "mins) " + this.state.partnerUsername + " (" + item["partner_task_counts"][1]
      + " times, " + item["partner_task_durations"][1] + "mins)";
  }

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
