import React, { Component } from 'react';
import { View, Text, Dimensions, ActivityIndicator } from 'react-native';
import { Button } from 'react-native-elements';
import { MapView } from 'expo';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as actions from '../actions/index';

const DEFAULT_ZOOM = 0.09;

class MapScreen extends Component {
  static navigationOptions = {
    title: 'Map',
    tabBarIcon: ({ tintColor }) => (
      <Icon name="map" size={30} color={tintColor} />
    )
  };

  state = {
    mapLoaded: false,
    region: {
      longitude: -122,
      latitude: 37,
      latitudeDelta: DEFAULT_ZOOM,
      longitudeDelta:
        (Dimensions.get('window').width / Dimensions.get('window').height) *
        DEFAULT_ZOOM
    },
    gettingLocation: false,
    searching: false
  };

  componentDidMount = () => {
    this.setState({ mapLoaded: true });
  };

  goToLocationButtonHandler = () => {
    this.setState({ gettingLocation: true });
    navigator.geolocation.getCurrentPosition(pos => {
      const currentCoords = {
        longitude: pos.coords.longitude,
        latitude: pos.coords.latitude
      };
      this.setState({ gettingLocation: false });
      this.goToLocation(currentCoords);
    });
  };

  goToLocation = coords => {
    this.map.animateToRegion({
      ...this.state.region,
      longitude: coords.longitude,
      latitude: coords.latitude,
      latitudeDelta: DEFAULT_ZOOM,
      longitudeDelta:
        (Dimensions.get('window').width / Dimensions.get('window').height) *
        DEFAULT_ZOOM
    });
  };

  onJobsButtonHandler = () => {
    this.setState({ searching: true });
    this.props.fetchJobs(this.state.region, () => {
      this.setState({ searching: false });
      this.props.navigation.navigate('deck');
    });
  };

  onRegionChangeComplete = region => {
    this.setState({ region });
  };

  render() {
    if (!this.state.mapLoaded) {
      return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <ActivityIndicator size="large" />
        </View>
      );
    }

    let searchButton = null;

    if (!this.state.gettingLocation) {
      searchButton = (
        <Button
          text={this.state.searching ? 'Searching...' : 'Search for jobs'}
          onPress={this.onJobsButtonHandler}
          buttonStyle={styles.buttonStyle}
          icon={<Icon name="search" color="white" size={15} />}
        />
      );
    }

    return (
      <View style={{ flex: 1 }}>
        <MapView
          style={{ flex: 1 }}
          initialRegion={this.state.region}
          ref={ref => (this.map = ref)}
          onRegionChangeComplete={this.onRegionChangeComplete}
        />
        <View style={styles.buttonContainer}>
          <Button
            text={this.state.gettingLocation ? 'Finding you...' : 'Find me'}
            onPress={this.goToLocationButtonHandler}
            buttonStyle={styles.buttonStyle}
            icon={<Icon name="my-location" color="white" size={15} />}
          />

          {searchButton}
        </View>
      </View>
    );
  }
}

const styles = {
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    justifyContent: 'space-around'
  },
  buttonStyle: { width: '80%', margin: 5, backgroundColor: '#5492f7' }
};

export default connect(
  null,
  actions
)(MapScreen);
