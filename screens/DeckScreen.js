import React, { Component } from "react";
import { View, Text, Platform, Dimensions } from "react-native";
import { connect } from "react-redux";
import { MapView } from "expo";
import { Card, Button } from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialIcons";
import * as actions from "../actions/index";
import Swipe from "../components/Swipe";

const MAP_HEIGHT = Dimensions.get("window").height * 0.5;
const CARD_HEIGHT = Dimensions.get("window").height * 0.8;
const DEFAULT_ZOOM = 0.01;

class DeckScreen extends Component {
  static navigationOptions = {
    title: "Jobs",
    tabBarIcon: ({ tintColor }) => <Icon name="work" size={30} color={tintColor} />
  };

  renderCard = job => {
    initialRegion = {
      latitude: job.latitude,
      longitude: job.longitude,
      latitudeDelta: DEFAULT_ZOOM,
      longitudeDelta:
        Dimensions.get("window").width / Dimensions.get("window").height * DEFAULT_ZOOM
    };

    return (
      <Card title={job.jobtitle} containerStyle={{ height: CARD_HEIGHT }}>
        <View style={{ height: MAP_HEIGHT }}>
          <MapView
            scrollEnabled={false}
            style={{ flex: 1 }}
            cacheEnabled
            initialRegion={initialRegion}
          >
            <MapView.Marker coordinate={initialRegion} />
          </MapView>
        </View>
        <View style={styles.detailWrapper}>
          <Text>{job.company}</Text>
          <Text>{job.formattedRelativeTime}</Text>
        </View>
        <Text> {job.snippet.replace(/<\/b>/g, "")} </Text>
      </Card>
    );
  };

  renderNoMoreCards = () => {
    return (
      <Card title="No more jobs">
        <View>
          <Button
            text={this.props.anyLikes ? "Review your liked jobs" : "Go back to the map"}
            onPress={() =>
              this.props.navigation.navigate(this.props.anyLikes ? "review" : "map")
            }
          />
        </View>
      </Card>
    );
  };

  render() {
    return (
      <View
        style={{
          paddingTop: Platform.OS === "ios" ? 0 : Expo.Constants.statusBarHeight,
          flex: 1
        }}
      >
        <Swipe
          data={this.props.jobs}
          dataIdKey="jobkey"
          renderCard={this.renderCard}
          renderNoMoreCards={this.renderNoMoreCards}
          onSwipeRight={job => this.props.likeJob(job)}
        />
      </View>
    );
  }
}

const styles = {
  detailWrapper: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 10
  }
};

const mapStateToProps = ({ jobs, likes }) => {
  return { jobs: jobs.results, anyLikes: likes.jobs.length > 0 };
};

export default connect(mapStateToProps, actions)(DeckScreen);
