import React, { Component } from "react";
import { View, Text, Platform, AsyncStorage } from "react-native";
import { Button } from "react-native-elements";
import { connect } from "react-redux";
import * as actions from "../actions/index";

class AuthScreen extends Component {
  state = { loading: true };
  componentDidMount() {
    this.props.facebookLogin();
    this.onAuthComplete(this.props);
  }

  componentWillReceiveProps = nextProps => {
    this.onAuthComplete(nextProps);
  };

  onAuthComplete = props => {
    if (props.validToken) {
      this.props.navigation.navigate("map");
    } else {
      this.setState({ loading: false });
    }
  };

  render() {
    let buttonShow = null;

    if (!this.props.validToken && !this.state.loading) {
      buttonShow = (
        <View>
          <Text style={{ fontSize: 20, paddingBottom: 5, textAlign: "center" }}>
            This app requires login via Facebook
          </Text>
          <Button
            text="Login via Facebook"
            onPress={() => {
              this.props.facebookLogin();
            }}
          />
        </View>
      );
    }

    return (
      <View
        style={{
          paddingTop: Platform.OS === "ios" ? 0 : Expo.Constants.statusBarHeight,
          flex: 1,
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        {buttonShow}
      </View>
    );
  }
}

const mapStateToProps = state => {
  const { auth } = state;
  const currentTime = Math.floor(new Date().getTime() / 1000);
  let loading = true;

  if (auth.progress && auth.progress === "completed") {
    loading = false;
  }
  return {
    validToken: auth.token && auth.expires && auth.expires > currentTime,
    loading: loading
  };
};

export default connect(mapStateToProps, actions)(AuthScreen);
