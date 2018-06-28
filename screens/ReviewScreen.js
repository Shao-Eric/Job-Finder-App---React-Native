import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  Linking,
  Dimensions,
  AsyncStorage
} from 'react-native';
import { Button, Card } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { connect } from 'react-redux';
import { MapView } from 'expo';

class ReviewScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    return {
      headerTitle: 'Review Jobs',
      headerRight: (
        <Button
          text={params ? params.buttonText : 'loading'}
          onPress={() => {
            navigation.navigate('settings');
          }}
        />
      ),
      tabBarIcon: ({ tintColor }) => (
        <Icon name="favorite" size={30} color={tintColor} />
      )
    };
  };

  componentDidMount = () => {
    const { setParams } = this.props.navigation;
    setParams({ buttonText: 'Settings' });
  };

  renderLikedJobs = () => {
    return this.props.likedJobs.map(job => {
      const initialRegion = {
        latitude: job.latitude,
        longitude: job.longitude,
        latitudeDelta: 0.01,
        longitudeDelta:
          (Dimensions.get('window').width / Dimensions.get('window').height) *
          0.01
      };

      return (
        <Card key={job.jobkey} title={job.jobtitle}>
          <View style={{ height: 200 }}>
            <MapView
              style={{ flex: 1 }}
              cacheEnabled
              scrollEnabled={false}
              initialRegion={initialRegion}
            />
            <View style={styles.detailWrapper}>
              <Text style={styles.italics}>{job.company}</Text>
              <Text style={styles.italics}>{job.formattedRelativeTime}</Text>
            </View>
            <Button
              text="Apply Now!"
              backgroundColor="#03A9F4"
              onPress={() => Linking.openURL(job.url)}
            />
          </View>
        </Card>
      );
    });
  };

  render() {
    if (this.props.likedJobs.length === 0) {
      return (
        <View style={styles.noLikedViewStyle}>
          <Text
            style={styles.noLikedTextStyle}
            onPress={() => AsyncStorage.removeItem('fb_token')}
          >
            You have no liked jobs
          </Text>
        </View>
      );
    }

    return <ScrollView>{this.renderLikedJobs()}</ScrollView>;
  }
}

const styles = {
  detailWrapper: {
    marginBottom: 10,
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  italics: {
    fontStyle: 'italic'
  },
  noLikedViewStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  noLikedTextStyle: {
    fontSize: 30,
    textAlign: 'center',
    color: 'black'
  }
};

const mapStateToProps = state => {
  const { likes } = state;
  return {
    likedJobs: likes.jobs
  };
};

export default connect(
  mapStateToProps,
  null
)(ReviewScreen);
