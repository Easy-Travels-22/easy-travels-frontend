import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Keyboard,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Button,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import uuid from "react-native-uuid";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";

export default function CreateActivityScreen({ route, navigation }) {
  const { addEvent, updateItem, deleteItem, item, isNewItem } = route.params;
  const [isEditable, setIsEditable] = useState(isNewItem);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (item) {
      setName(item.name);
      setDescription(item.description);
    }
  }, []);
  const handleSubmit = () => {
    if (name == "") {
      alert("name cannot be blank");
    } else {
      if (isNewItem) {
        addEvent({
          key: uuid.v4(),
          type: "activity",
          name: name,
          description: description,
        });
      } else {
        updateItem(item.id, name, description);
      }
      navigation.pop();
    }
  };
  const handleEdit = () => {
    setIsEditable(true);
  };
  const handleDelete = () => {
    deleteItem(item.id);
    navigation.navigate("SingleScheduleScreen");
  };
  const handleCancel = () => {
    navigation.navigate("SingleScheduleScreen");
  };
  return (
    // <TouchableWithoutFeedback
    //   style={{ height: "100%" }}
    //   onPress={Keyboard.dismiss()}
    // >
    <SafeAreaView style={styles.container}>
      <Button onPress={handleSubmit} title={"hell"}></Button>
      <View style={styles.header__wrapper}>
        {!isNewItem && (
          <TouchableOpacity style={styles.header__icon} onPress={handleDelete}>
            <Text>delete</Text>
            {/* <Entypo name="check" size={30} color="cyan" /> */}
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={styles.header__icon}
          onPress={() => {
            isEditable ? handleSubmit() : handleEdit();
          }}
        >
          <Text>{isEditable ? "save" : "edit"}</Text>
          {/* <Entypo name="check" size={30} color="cyan" /> */}
        </TouchableOpacity>
        <TouchableOpacity style={styles.header__icon} onPress={handleCancel}>
          <Text>cancel</Text>
          {/* <Entypo name="cross" size={35} color="cyan" /> */}
        </TouchableOpacity>
      </View>
      <View style={styles.title__wrapper}>
        <TextInput
          style={styles.title__field}
          onChangeText={setName}
          placeholder={"TITLE"}
          placeholderTextColor="grey"
          editable={isEditable}
          value={name}
        ></TextInput>
      </View>
      <View style={styles.details__container}>
        {((!isEditable && description) || isEditable) && (
          <View
            style={[
              styles.details__wrapper,
              { borderTopWidth: isEditable ? 1 : 0 },
            ]}
          >
            <Entypo name="text" size={20} color="grey" />
            <TextInput
              style={styles.details__field}
              onChangeText={setDescription}
              placeholder={"Notes"}
              placeholderTextColor="grey"
              editable={isEditable}
              value={description}
            />
          </View>
        )}
        {isEditable && (
          <View
            style={[
              styles.details__wrapper,
              { borderTopWidth: isEditable ? 1 : 0 },
            ]}
          >
            <Entypo name="location-pin" size={20} color="grey" />
            <TextInput
              style={styles.details__field}
              // onChangeText={setDescription}
              placeholder={"Location"}
              placeholderTextColor="grey"
              editable={isEditable}
            />
          </View>
        )}
        <StatusBar style="auto" />
      </View>
    </SafeAreaView>
    // </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch",
    justifyContent: "flex-start",
    backgroundColor: "white",
  },
  header__wrapper: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingRight: 28,
    marginBottom: 10,
  },
  header__icon: { marginLeft: 10 },
  title__wrapper: {
    // borderWidth: 1,
    // borderColor: "black",
    backgroundColor: "lightgrey",
    height: 50,
    marginLeft: 28,
    width: "100%",
    borderTopLeftRadius: 32,
    borderBottomLeftRadius: 8,
    justifyContent: "flex-end",
    paddingVertical: 5,
    paddingHorizontal: 16,
  },
  title__field: {
    paddingHorizontal: 3,
    fontSize: 18,
    color: "black",
  },
  details__container: {
    alignItems: "stretch",
    justifyContent: "flex-start",
    paddingVertical: 20,
    paddingHorizontal: 28,
  },
  details__wrapper: {
    // borderWidth: 1,
    // borderColor: "red",
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: "grey",
    flexDirection: "row",
    alignItems: "center",
    // width: "100%",
  },
  details__field: {
    // borderWidth: 1,
    // borderColor: "green",
    marginLeft: 5,
    fontSize: 16,
    color: "black",
  },
  fieldLabel: {
    marginLeft: 12,
    fontFamily: "JosefinSans",
    fontSize: 20,
  },
  fieldContainer: {
    width: "100%",
    height: 40,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    marginBottom: 20,
    backgroundColor: "#ededed",
  },
  fieldInput: {
    height: "100%",
    fontSize: 18,
    fontFamily: "RobotoLight",
    paddingLeft: 12,
    width: "100%",
  },
  submitButton__wrapper: {
    backgroundColor: "lightblue",
    height: 50,
    width: "100%",
    borderRadius: 15,
    marginBottom: 20,
  },
  submitButton__inner: {
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});
