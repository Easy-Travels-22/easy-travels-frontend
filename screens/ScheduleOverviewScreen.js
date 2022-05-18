import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Button,
  ScrollView,
} from "react-native";
import uuid from "react-native-uuid";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ScheduleOverviewScreen({ route, navigation }) {
  const { trip, updateTrip } = route.params;
  const [itemArr, setItemArr] = useState([]);

  const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const months = [
    "JANUARY",
    "FEBRUARY",
    "MARCH",
    "APRIL",
    "MAY",
    "JUNE",
    "JULY",
    "AUGUST",
    "SEPTEMBER",
    "OCTOBER",
    "NOVEMBER",
    "DECEMBER",
  ];

  const sortDateRange = (range) => {
    let dates = [
      { year: range[0].getFullYear(), month: range[0].getMonth(), days: [] },
    ];
    let currIndex = 0;
    let datesIndex = 0;

    while (currIndex < range.length) {
      const currDate = range[currIndex];
      const year = currDate.getFullYear();
      const month = currDate.getMonth();
      if (dates[datesIndex].year == year && dates[datesIndex].month == month) {
        dates[datesIndex].days = [
          ...dates[datesIndex].days,
          { index: currIndex, date: currDate },
        ];
      } else {
        datesIndex++;
        dates.push({
          year: year,
          month: month,
          days: [{ index: currIndex, date: currDate }],
        });
      }
      currIndex++;
    }
    return dates;
  };

  const customDateString = (date) => {
    date = new Date(date);
    const [month, day, year] = [
      date.getMonth(),
      date.getDate(),
      date.getFullYear(),
    ];
    return day + "/" + month + "/" + year;
  };

  const updateSchedule = (updatedSchedule) => {
    let updatedTrip = { ...trip };
    updatedTrip.schedule = updatedSchedule;
    updateTrip(updatedTrip);
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
        <ScrollView style={styles.listWrapper}>
          {sortDateRange(trip.dateRange).map((date) => (
            <View style={{ marginBottom: 20 }}>
              <View style={styles.date__wrapper}>
                <Text>{months[date.month] + " " + date.year}</Text>
              </View>
              {date.days.map((day) => (
                <View style={styles.date__wrapper}>
                  <TouchableOpacity
                    style={{ width: "100%" }}
                    onPress={() => {
                      navigation.push("SingleScheduleScreen", {
                        schedule: trip.schedule,
                        index: day.index,
                        updateSchedule: updateSchedule,
                      });
                    }}
                  >
                    <Text style={{ fontSize: 18 }}>{day.date.getDate()}</Text>
                    <Text style={{ fontSize: 9 }}>
                      {days[day.date.getDay()]}
                    </Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          ))}
        </ScrollView>
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
  },
  listWrapper: { width: "100%", flex: 1 },
  date__wrapper: {
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: "lightgrey",
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "center",
    paddingLeft: 5,
    flexDirection: "column",
  },
});
