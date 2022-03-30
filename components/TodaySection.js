import { StyleSheet, TextInput, View, Text } from "react-native";
import ActivityCard from "./ActivityCard";

export default function TodaySection() {
  return (
    <View style={styles.todayContainer}>
      <Text style={styles.title}>Today</Text>
      <ActivityCard />
      <ActivityCard />
    </View>
  );
}

const styles = StyleSheet.create({
  todayContainer: {
    width: "100%",
    marginVertical: 15,
  },
  title: {
    fontFamily: "RobotoLight",
    fontSize: 30,
  },
});
