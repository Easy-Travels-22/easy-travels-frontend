import { StyleSheet, TextInput, View, Text } from "react-native";

export default function ActivityCard() {
  return (
    <View style={styles.cardContainer}>
      <Text style={styles.title}>Card</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    width: "100%",
    height: 150,
    marginVertical: 15,
    borderRadius: 15,
    backgroundColor: "#daf7dc",
  },
  title: {
    fontFamily: "RobotoLight",
    fontSize: 30,
  },
});
