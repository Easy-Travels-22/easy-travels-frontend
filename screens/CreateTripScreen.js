import {
  StyleSheet,
  TextInput,
  View,
  Button,
  Text,
  Picker,
  Dimensions,
  Keyboard,
} from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useState } from "react";
import { continents, countries } from "countries-list";
import { FontAwesome } from "@expo/vector-icons";

import DatePicker from "react-native-neat-date-picker";

export default function CreateTripScreen() {
  const { width, height } = Dimensions.get("window");
  const [modalOpen, setModalOpen] = useState(false);
  const [dateRange, setDateRange] = useState();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

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
    const diffInDays = Math.round(diffInTime / oneDay);

    return diffInDays;
  };
  return (
    <TouchableWithoutFeedback
      style={{ height: "100%" }}
      onPress={Keyboard.dismiss()}
    >
      <View style={styles.container}>
        <Text style={styles.fieldLabel}>Trip Name:</Text>
        <View style={styles.fieldContainer}>
          <TextInput style={styles.fieldInput} />
        </View>
        <Text style={styles.fieldLabel}>
          {`Travel Period: ${
            startDate && endDate
              ? calculateDaysApart(startDate, endDate) + " days"
              : ""
          }`}
        </Text>
        <View
          style={{
            ...styles.fieldContainer,
            height: 50,
            paddingLeft: 12,
          }}
        >
          <Text style={{ width: "37%", fontFamily: "RobotoLight" }}>{`From:\n${
            startDate ? startDate.toDateString() : ""
          }`}</Text>
          <Text style={{ width: "37%", fontFamily: "RobotoLight" }}>{`To:\n${
            endDate ? endDate.toDateString() : ""
          }`}</Text>
          <TouchableOpacity
            onPress={handleSelectDate}
            style={{
              backgroundColor: "#8b9d71",
              height: 50,
              width: 60,
              borderRadius: 15,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <FontAwesome name="calendar" size={24} color="#ededed" />
          </TouchableOpacity>
        </View>

        <Text style={styles.fieldLabel}>Description:</Text>
        <TextInput
          style={{
            width: "100%",
            flex: 1,
            borderRadius: 15,
            paddingHorizontal: 12,
            fontFamily: "RobotoLight",
            backgroundColor: "#ededed",
            marginBottom: 15,
          }}
          multiline={true}
          numberOfLines={20}
        />

        <TouchableOpacity style={{ ...styles.submitButton, width: width - 56 }}>
          <Text
            style={{ color: "white", fontFamily: "RobotoLight", fontSize: 20 }}
          >
            SUBMIT
          </Text>
        </TouchableOpacity>
        <DatePicker
          isVisible={modalOpen}
          mode={"range"}
          onConfirm={handleDateConfirm}
          onCancel={() => setModalOpen(false)}
        />
      </View>
    </TouchableWithoutFeedback>
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
    width: "75%",
    fontSize: 18,
    fontFamily: "RobotoLight",
    paddingLeft: 12,
  },
  submitButton: {
    backgroundColor: "#8b9d71",
    height: 50,
    width: "100%",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
});
