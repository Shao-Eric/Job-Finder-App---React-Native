import { Permissions, Notifications } from "expo";
import { AsyncStorage } from "react-native";
import axios from "axios";

const PUSH_ENDPOINT = "http://rallycoding.herokuapp.com/api/tokens";

export default async () => {
  const previousToken = await AsyncStorage.getItem("pushToken");

  if (previousToken) {
    return;
  } else {
    const { status } = await Permissions.askAsync(Permissions.REMOTE_NOTIFICATIONS);
    if (status !== "granted") {
      return;
    }

    const pushToken = await Notifications.getExpoPushTokenAsync();

    await axios.post(PUSH_ENDPOINT, { token: { pushToken } });
    await AsyncStorage.setItem("pushToken", pushToken);
  }
};
