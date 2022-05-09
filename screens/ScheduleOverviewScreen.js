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
  ScrollView,
} from "react-native";
import uuid from "react-native-uuid";
import { SafeAreaView } from "react-native-safe-area-context";
import FloatingButtons from "../components/FloatingButtons";

export default function ScheduleOverviewScreen({ route, navigation }) {
  const { trip } = route.params;
  const [itemArr, setItemArr] = useState([
    {
      key: uuid.v4(),
      type: "lodging",
      name: "Melbourne AirBnb",
      description: "AirBnb that costs $595.67 mad dollars",
    },
  ]);

  const sortDateRange = (range) => {
    let dates = [
      { year: range[0].getFullYear(), month: range[0].getMonth(), days: [] },
    ];
    let currIndex = 0;
    let datesIndex = 0;

    // console.log(currIndex + "/ " + range.length);
    // const isSameMonth = true;
    while (currIndex < range.length) {
      console.log("catch this:");
      console.log(dates);
      const currDate = range[currIndex];
      const year = currDate.getFullYear();
      const month = currDate.getMonth();
      if (dates[datesIndex].year == year && dates[datesIndex].month == month) {
        dates[datesIndex].days = [...dates[datesIndex].days, currDate];
      } else {
        datesIndex++;
        dates.push({
          year: year,
          month: month,
          days: [currDate],
        });
      }
      currIndex++;
    }
    return dates;
  };

  const customDateString = (date) => {
    const [month, day, year] = [
      date.getMonth(),
      date.getDate(),
      date.getFullYear(),
    ];
    return day + "/" + month + "/" + year;
  };

  const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.date__wrapper}>
      <Text style={{ fontSize: 18 }}>{item.getDate()}</Text>
      <Text style={{ fontSize: 9 }}>{days[item.getDay()]}</Text>
    </TouchableOpacity>
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
      <View style={styles.tripBanner}>
        <Text style={{ fontWeight: "bold" }}>{trip.name.toUpperCase()}</Text>
        <Text>{`${customDateString(trip.startDate)} - ${customDateString(
          trip.endDate
        )}`}</Text>
      </View>
      <View style={styles.datesContainer}>
        <View style={styles.listWrapper}>
          <FlatList data={trip.dateRange} renderItem={renderItem} />
        </View>
        {/* <Text>temporary overview homepage</Text>
      <Button
        title={"navigate"}
        onPress={() => {
          navigation.push("SingleScheduleScreen");
        }}
      /> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    backgroundColor: "white",
  },
  tripBanner: {
    backgroundColor: "lightgrey",
    paddingHorizontal: 28,
    height: 120,
    justifyContent: "flex-end",
    paddingBottom: 4,
    marginTop: 30,
    width: "100%",
  },
  datesContainer: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    paddingVertical: 40,
    paddingHorizontal: 28,
    backgroundColor: "white",
    width: "100%",
    borderWidth: 1,
    borderColor: "red",
  },
  listWrapper: { borderWidth: 1, borderColor: "cyan", width: "100%", flex: 1 },
  date__wrapper: {
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: "lightgrey",
    flexDirection: "row",
    alignItems: "flex-start",
    paddingLeft: 5,
    flexDirection: "column",
  },
});
