import { StyleSheet, TextInput, View, Button, Text } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useState } from "react";
import TodaySection from "../components/TodaySection";
import { Formik } from "formik";

import DatePicker from "react-native-neat-date-picker";

export default function CreateTripScreen() {
  const [modalOpen, setModalOpen] = useState(true);

  const handleDateConfirm = () => {
    setModalOpen(false);
  };
  return (
    <View style={styles.container}>
      <View>
        <Text>Trip Name:</Text>
        <Text>Travel Period:</Text>
        <Text>Where to:</Text>
        <Text>Description:</Text>

        <Button title="Submit" />
        <DatePicker
          isVisible={modalOpen}
          mode={"range"}
          onConfirm={handleDateConfirm}
          onCancel={() => setModalOpen(false)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingVertical: 20,
    paddingHorizontal: 18,
  },
});
