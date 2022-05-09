import {
  StyleSheet,
  TextInput,
  View,
  Button,
  Text,
  Picker,
  Dimensions,
  Keyboard,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import { useState } from "react";
import { continents, countries } from "countries-list";
import { FontAwesome } from "@expo/vector-icons";

import uuid from "react-native-uuid";
import DatePicker from "react-native-neat-date-picker";
import global from "../assets/styles/global";

export default function CreateTripScreen({ route, navigation }) {
  const { addTrip } = route.params;
  const { width, height } = Dimensions.get("window");
  const [modalOpen, setModalOpen] = useState(false);
  // const [dateRange, setDateRange] = useState();
  const [name, setName] = useState();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [description, setDescription] = useState();

  const handleDateConfirm = ({ startDate, endDate }) => {
    setStartDate(startDate);
    setEndDate(endDate);
    setModalOpen(false);
  };
  const handleSelectDate = () => {
    setModalOpen(true);
  };
  const calculateDaysApart = (day1, day2) => {
    const oneDay = 1000 * 60 * 60 * 24;
    const diffInTime = day2.getTime() - day1.getTime();
    const diffInDays = Math.round(diffInTime / oneDay) + 1;

    return diffInDays;
  };

  const getDatesInRange = (startDate, endDate) => {
    const date = new Date(startDate.getTime());

    const dates = [];

    while (date <= endDate) {
      dates.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }

    return dates;
  };

  // const d1 = new Date('2022-01-18');
  // const d2 = new Date('2022-01-24');

  // console.log(getDatesInRange(d1, d2));

  const handleSubmit = () => {
    if (!startDate) {
      alert("Start and end date required");
    } else if (!name) {
      alert("Trip name required");
    } else {
      const duration = calculateDaysApart(startDate, endDate);
      const dateRange = getDatesInRange(startDate, endDate);
      let schedule = Array.from({ length: duration }, () => []);
      const trip = {
        key: uuid.v4(),
        name: name,
        description: description,
        startDate: startDate,
        endDate: endDate,
        dateRange: dateRange,
        schedule: schedule,
      };
      console.log(trip);
      addTrip(trip);
      navigation.push("ScheduleOverviewScreen", { trip: trip });
    }
  };
  return (
    // <TouchableWithoutFeedback
    //   style={{ height: "100%" }}
    //   onPress={Keyboard.dismiss()}
    // >
    <View style={styles.container}>
      <Text style={[global.h3, { marginBottom: 27 }]}>Plan a Trip</Text>
      <View style={styles.fieldContainer}>
        <TextInput
          style={styles.fieldInput}
          placeholder={"Trip name"}
          placeholderTextColor="black"
          onChangeText={(name) => {
            setName(name);
          }}
        />
      </View>
      <TouchableOpacity
        style={{
          ...styles.fieldContainer,
          height: 50,
          paddingLeft: 12,
          marginBottom: 0,
        }}
        activeOpacity={1}
        onPress={handleSelectDate}
      >
        <Text style={{ width: "37%", fontFamily: "RobotoLight" }}>{`From:\n${
          startDate ? startDate.toDateString() : ""
        }`}</Text>
        <Text style={{ width: "37%", fontFamily: "RobotoLight" }}>{`To:\n${
          endDate ? endDate.toDateString() : ""
        }`}</Text>
        <View
          style={{
            backgroundColor: "grey",
            height: 50,
            width: 60,
            borderRadius: 8,
            borderTopLeftRadius: 0,
            borderBottomLeftRadius: 0,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <FontAwesome name="calendar" size={24} color="#ededed" />
        </View>
      </TouchableOpacity>
      <Text style={[styles.fieldLabel, { marginBottom: 20 }]}>
        {`Travel Duration: ${
          startDate && endDate
            ? calculateDaysApart(startDate, endDate) + " day(s)"
            : ""
        }`}
      </Text>

      <TextInput
        style={{
          width: "100%",
          flex: 1,
          borderRadius: 8,
          paddingHorizontal: 12,
          fontFamily: "RobotoLight",
          backgroundColor: "#ededed",
          marginBottom: 15,
          textAlignVertical: "top",
          backgroundColor: "white",
          borderWidth: 1,
          borderColor: "lightgrey",
          paddingVertical: 12,
          fontSize: 15,
        }}
        multiline={true}
        numberOfLines={20}
        placeholder={"Description"}
        placeholderTextColor={"black"}
        onChangeText={(description) => {
          setDescription(description);
        }}
      />

      <TouchableOpacity
        style={{ ...styles.submitButton, width: width - 56 }}
        onPress={handleSubmit}
      >
        <Text
          style={{ color: "white", fontFamily: "RobotoLight", fontSize: 20 }}
        >
          Start Planning
        </Text>
      </TouchableOpacity>
      <DatePicker
        isVisible={modalOpen}
        mode={"range"}
        onConfirm={handleDateConfirm}
        onCancel={() => setModalOpen(false)}
      />
    </View>
    // </TouchableWithoutFeedback>
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
  fieldLabel: {
    marginLeft: 12,
    fontFamily: "JosefinSans",
    fontSize: 15,
  },
  fieldContainer: {
    width: "100%",
    height: 40,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    marginBottom: 20,
    // backgroundColor: "#ededed",
    borderColor: "lightgrey",
    borderWidth: 1,
    color: "black",
  },
  fieldInput: {
    height: "100%",
    width: "75%",
    fontSize: 15,
    fontFamily: "RobotoLight",
    paddingLeft: 12,
    alignItems: "center",
  },
  submitButton: {
    backgroundColor: "grey",
    height: 50,
    width: "100%",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
});
