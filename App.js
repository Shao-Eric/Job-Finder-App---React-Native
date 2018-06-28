import Expo, { Notifications } from "expo";
import React from "react";
import { StyleSheet, Text, View, Platform, Alert } from "react-native";
import { TabNavigator, StackNavigator } from "react-navigation";
import { Provider } from "react-redux";
import store from "./store/index";
import AuthScreen from "./screens/AuthScreen";
import WelcomeScreen from "./screens/WelcomeScreen";
import MapScreen from "./screens/MapScreen";
import DeckScreen from "./screens/DeckScreen";
import SettingsScreen from "./screens/SettingsScreen";
import ReviewScreen from "./screens/ReviewScreen";
import registerForNotifications from "./services/push_notifications";

export default class App extends React.Component {
  componentDidMount = async () => {
    await registerForNotifications();
    Notifications.addListener(notification => {
      //https://expo.io/dashboard/notifications
      //ExponentPushToken[0m5Qj2HID6atS-tDISbXVf]
      //console.log(notification);
      //console.log(notification.data); //JSON data. //i.e. { "text":"A crazy new job is near your location"}

      if (notification.origin === "received" && notification.data.text)
        Alert.alert("New Push Notification", notification.data.text, [{ text: "ok." }]);
    });
  };

  render() {
    const ReviewNavigator = StackNavigator({
      review: { screen: ReviewScreen },
      settings: { screen: SettingsScreen }
    });

    const MainNavigator = TabNavigator(
      {
        map: { screen: MapScreen },
        deck: { screen: DeckScreen },
        review: { screen: ReviewNavigator }
      },
      {
        navigationOptions: { swipeEnabled: false },
        animationEnabled: false,
        tabBarPosition: "bottom",
        tabBarOptions: {
          indicatorStyle: {
            backgroundColor: "blue"
          },
          showIcon: true, //Default false for android and true for ios
          iconStyle: { width: 30, height: 30 },
          labelStyle: { fontSize: 12 }
        }
      }
    );

    const AppNavigator = TabNavigator(
      {
        welcome: { screen: WelcomeScreen },
        auth: { screen: AuthScreen },
        main: {
          screen: MainNavigator
        }
      },
      {
        navigationOptions: {
          tabBarVisible: false,
          swipeEnabled: false
        },
        tabBarPosition: "bottom",
        tabBarOptions: {
          indicatorStyle: {
            backgroundColor: "blue"
          }
        },
        backBehavior: "none"
      }
    );

    return (
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    );
  }
}
