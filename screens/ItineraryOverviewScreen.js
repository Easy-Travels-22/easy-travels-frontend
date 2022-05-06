import { StatusBar } from "expo-status-bar";
import React, { useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  PanResponder,
  Animated,
  Easing,
  FlatList,
  TouchableOpacity,
  TouchableHighlight,
  Button,
} from "react-native";
import uuid from "react-native-uuid";
import { SafeAreaView } from "react-native-safe-area-context";
import FloatingButtons from "../components/FloatingButtons";

export default function ItineraryOverviewScreen({ navigation }) {
  const [itemArr, setItemArr] = useState([
    {
      key: uuid.v4(),
      type: "lodging",
      name: "Melbourne AirBnb",
      description: "AirBnb that costs $595.67 mad dollars",
    },
  ]);
  const renderItem = ({ item }) => (
    <View style={styles.activity__item}>
      <Text>{item.name}</Text>
    </View>
  );

  const createActivity = () => {
    navigation.push("CreateActivityScreen", { addItem: addItem });
  };

  const addItem = (newName, newDescription) => {
    setItemArr([
      ...itemArr,
      {
        key: uuid.v4(),
        type: "activity",
        name: newName,
        description: newDescription,
      },
    ]);
  };
  return (
    <View style={styles.container}>
      <Text>temporary overview homepage</Text>
      <Button
        title={"navigate"}
        onPress={() => {
          navigation.push("SingleSchedulerScreen");
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    paddingVertical: 20,
    paddingHorizontal: 28,
    backgroundColor: "white",
  },
  headerBar: {
    backgroundColor: "cyan",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: 40,
  },
  activity__listWrapper: {
    flex: 1,
    alignSelf: "stretch",
    position: "relative",
  },

  activity__item: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 2,
    borderStyle: "solid",
    borderColor: "cyan",
    height: 55,
    borderRadius: 10,
    marginTop: 5,
    marginBottom: 5,
    paddingHorizontal: 5,
  },
});
