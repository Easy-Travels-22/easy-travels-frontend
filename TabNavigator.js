import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./screens/HomeScreen";
import SchedulerScreen from "./screens/SchedulerScreens/SchedulerTest";
import SchedulerScreen2 from "./screens/SchedulerScreens/SingleSchedulerScreen";
import AccommodationScreen from "./screens/AccommodationScreen";
import TransportScreen from "./screens/TransportScreen";
import CalendarScreen from "./screens/CalendarScreen";
import SchedulerStack from "./screens/SchedulerScreens/SchedulerStack";

export default function TabNavigator() {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Home"
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="SchedulerStack" component={SchedulerStack} />
      <Tab.Screen name="Accomodations" component={AccommodationScreen} />
      <Tab.Screen name="Transport" component={TransportScreen} />
      <Tab.Screen name="Calendar" component={CalendarScreen} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
