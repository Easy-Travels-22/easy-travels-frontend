import {
  StyleSheet,
  TextInput,
  View,
  Text,
  Button,
  TouchableOpacity,
} from "react-native";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { useState } from "react";
import TodaySection from "../components/TodaySection";
import global from "../assets/styles/global";
import CreateTripScreen from "./CreateTripScreen";

export default function HomeScreen({ navigation }) {
  const [searchSelected, setSearchSelected] = useState(false);

  const handleSearchFocus = () => {
    setSearchSelected((state) => !state);
  };
  return (
    <View style={styles.container}>
      <Text style={global.h3}>My Trips</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.push("CreateTripScreen")}
      >
        <AntDesign name="plus" size={40} color="white" />
      </TouchableOpacity>
      <Button
        title={"navigate"}
        onPress={() => {
          navigation.push("ItineraryOverviewScreen");
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    paddingVertical: 20,
    paddingHorizontal: 35,
  },
  button: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    width: 65,
    height: 65,
    borderRadius: 100,
    backgroundColor: "lightgrey",
    bottom: 30,
    right: 30,
  },
});
