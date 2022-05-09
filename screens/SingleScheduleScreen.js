import { StatusBar } from "expo-status-bar";
import React, { useRef, useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  View,
  PanResponder,
  Animated,
  Easing,
  FlatList,
  TouchableOpacity,
  TouchableHighlight,
} from "react-native";
import uuid from "react-native-uuid";
import { SafeAreaView } from "react-native-safe-area-context";
import FloatingButtons from "../components/FloatingButtons";

export default function SingleScheduleScreen({ route, navigation }) {
  const { schedule, index } = route.params;
  console.log(schedule[index]);
  const [item, setItemArr] = useState([]);
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.activity__item}
      onPress={() => {
        editActivityPage(item);
      }}
      onLongPress={() =>
        Alert.alert("Alert", "Long press options:", [
          { text: "ok" },
          {
            text: "view",
            onPress: () => {
              editActivityPage(item);
            },
          },
          {
            text: "delete",
            onPress: () => {
              deleteItem(item.id);
            },
          },
        ])
      }
    >
      <Text>{item.name}</Text>
    </TouchableOpacity>
  );

  const createActivityPage = () => {
    navigation.push("CreateActivityScreen", {
      addItem: addItem,
      isNewItem: true,
    });
  };

  const editActivityPage = (item) => {
    navigation.push("CreateActivityScreen", {
      updateItem: updateItem,
      deleteItem: deleteItem,
      item: item,
      isNewItem: false,
    });
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

  const updateItem = (id, newName, newDescription) => {
    setItemArr(
      itemArr.map((item) => {
        if (item.id == id) {
          item.name = newName;
          item.description = newDescription;
        }
        return item;
      })
    );
  };

  const deleteItem = (id) => {
    setItemArr(itemArr.filter((item) => item.id != id));
  };

  return (
    <View style={styles.container}>
      {/* <View style={styles.headerBar}>
        <Text>29 APRIL 2022</Text>
      </View> */}
      <View style={styles.activity__listWrapper}>
        <FlatList
          data={schedule[index]}
          renderItem={renderItem}
          keyExtractor={(item) => item.key}
        />
      </View>
      <FloatingButtons fn={createActivityPage} />
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
    backgroundColor: "lightgrey",
    // borderWidth: 2,
    // borderStyle: "solid",
    // borderColor: "cyan",
    height: 38,
    width: 250,
    borderRadius: 8,
    borderBottomRightRadius: 24,
    marginTop: 5,
    marginBottom: 5,
    paddingHorizontal: 5,
  },
});
