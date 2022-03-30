import { StyleSheet, TextInput, View, Text } from "react-native";

export default function ActivityCard({ type }) {
  return (
    <View
      style={
        type === "DESTINATION"
          ? styles.destContainer
          : type === "ACCOMMS"
          ? styles.accommContainer
          : styles.transitContainer
      }
    >
      <View style={styles.image} />
      <Text style={styles.title}>Card</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  destContainer: {
    width: "100%",
    height: 120,
    marginVertical: 5,
    borderRadius: 15,
    backgroundColor: "#daf7dc",
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  accommContainer: {
    width: "100%",
    height: 120,
    marginVertical: 5,
    borderRadius: 15,
    backgroundColor: "#daf7dc",
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  transitContainer: {
    width: "100%",
    height: 120,
    marginVertical: 5,
    borderRadius: 15,
    backgroundColor: "#daf7dc",
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  title: {
    fontFamily: "RobotoLight",
    fontSize: 30,
  },
  image: {
    borderWidth: 1,
    borderColor: "black",
    width: 120,
    height: 120,
    borderRadius: 15,
  },
});
