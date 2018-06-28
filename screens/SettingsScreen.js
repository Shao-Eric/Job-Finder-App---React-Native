import React, { Component } from "react";
import { View, Text } from "react-native";
import { Button } from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialIcons";
import { connect } from "react-redux";
import { clearLikedJobs } from "../actions";

class SettingsScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: "Settings",
    tabBarIcon: ({ tintColor }) => <Icon name="favorite" size={30} color={tintColor} />
  });

  render() {
    return (
      <View style={{ flex: 1, paddingTop: 10 }}>
        <Button
          text={"Reset liked jobs"}
          icon={<Icon name="delete-forever" color="white" size={15} />}
          onPress={this.props.clearLikedJobs}
          buttonStyle={{ width: "100%" }}
        />
      </View>
    );
  }
}

export default connect(null, { clearLikedJobs })(SettingsScreen);
