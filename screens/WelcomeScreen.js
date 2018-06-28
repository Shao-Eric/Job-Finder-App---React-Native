import React, { Component } from 'react';
import { View, Text, AsyncStorage, ActivityIndicator } from 'react-native';
import { AppLoading } from 'expo';
import Slides from '../components/Slides';

const SLIDE_DATA = [
  { text: 'Welcome to JobApp', color: '#03A9F4' },
  { text: 'Use this to find a job', color: '#009688' },
  { text: 'Set your location, then swipe away', color: '#03A9F4' }
];

class WelcomeScreen extends Component {
  state = { token: null };

  async componentWillMount() {
    let token = await AsyncStorage.getItem('fb_token');
    if (token) {
      this.props.navigation.navigate('map');
      this.setState({ token });
    } else {
      this.setState({ token: false });
    }
  }
  onSlidesComplete() {
    this.props.navigation.navigate('auth');
  }

  render() {
    if (this.state.token === null) {
      return (
        <ActivityIndicator
          size="large"
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        />
      );
    }
    return (
      <View style={{ flex: 1 }}>
        <Slides
          data={SLIDE_DATA}
          onComplete={this.onSlidesComplete.bind(this)}
        />
      </View>
    );
  }
}

export default WelcomeScreen;
