import React, { Component } from "react";
import { View, Text, ActivityIndicator } from "react-native";

import Slides from "../components/Slides";
import { connect } from "react-redux";

const SLIDE_DATA = [
  { text: "Welcome to Job Finder", color: "#03A9F4" },
  { text: "Set your location, then swipe away!", color: "#009688" },
  { text: "READY TO GO", color: "#03A9F4" }
];

class WelcomeScreen extends Component {
  componentWillReceiveProps = nextProps => {
    if (!nextProps.shouldShowScreen && nextProps.decisionValid && nextProps.tokenValid) {
      this.props.navigation.navigate("map");
    }
    if (!nextProps.shouldShowScreen && nextProps.decisionValid && !nextProps.tokenValid) {
      this.props.navigation.navigate("auth");
    }
  };

  onSlidesComplete = () => {
    this.props.navigation.navigate("auth");
  };

  render() {
    if (this.props.shouldShowScreen && this.props.decisionValid) {
      return (
        <View
          style={{
            flex: 1
          }}
        >
          <Slides data={SLIDE_DATA} onButtonPressed={this.onSlidesComplete} />
        </View>
      );
    }

    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
}

const mapStateToProps = state => {
  const { auth } = state;
  let decisionValid = false;
  let tokenValid = false;
  const stateLoaded = auth.progress
    ? auth.progress === "completed" ? true : false
    : false;
  let shouldShowScreen = false;
  if (stateLoaded) {
    const currentTime = Math.floor(new Date().getTime() / 1000);
    shouldShowScreen = auth.token ? false : true;
    decisionValid = true;
    tokenValid = auth.token && auth.expires && auth.expires > currentTime;
  }
  return {
    shouldShowScreen,
    decisionValid,
    tokenValid
  };
};

export default connect(mapStateToProps, null)(WelcomeScreen);
