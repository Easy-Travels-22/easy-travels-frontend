import {
  StyleSheet,
  TextInput,
  View,
  Text,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useState, useContext } from "react";
import { UserContext } from "../context/UserContext";
import global from "../assets/styles/global";
import uuid from "react-native-uuid";

export default function HomeScreen({ navigation }) {
  const [searchSelected, setSearchSelected] = useState(false);
  const { token } = useContext(UserContext);
  const [trips, setTrips] = useState([
    {
      dateRange: [
        new Date("2022-05-30"),
        new Date("2022-05-31"),
        new Date("2022-06-01"),
        new Date("2022-06-02"),
      ],
      description: "its gonna be lit",
      endDate: new Date("2022-06-02"),
      key: 1, // uuid.v4(),
      name: "europe",
      schedule: [
        [
          {
            key: uuid.v4(),
            type: "lodging",
            name: "Melbourne AirBnb",
            description: "AirBnb that costs $595.67 mad dollars",
          },
        ],
        [
          {
            key: uuid.v4(),
            type: "activity",
            name: "Theme park",
            description: "The best theme park in europe",
          },
        ],
        [],
        [],
      ],
      startDate: new Date("2022-05-30"),
    },
  ]);

  const addTrip = (trip) => {
    setTrips([...trips, trip]);
  };

  const updateTrip = (updatedTrip) => {
    const updatedTrips = trips.map((trip) => {
      if (trip.key == updatedTrip.key) {
        return updatedTrip;
      } else {
        return trip;
      }
    });
    setTrips(updatedTrips);
  };
  const customDateString = (date) => {
    const [month, day, year] = [
      date.getMonth(),
      date.getDate(),
      date.getFullYear(),
    ];
    return day + "/" + month + "/" + year;
  };
  const handleSearchFocus = () => {
    setSearchSelected((state) => !state);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.tripCard}
      onPress={() => {
        navigation.push("ScheduleOverviewScreen", {
          trip: item,
          updateTrip: updateTrip,
        });
      }}
    >
      <Text style={{ fontWeight: "bold" }}>{item.name.toUpperCase()}</Text>
      <Text>{`${customDateString(item.startDate)} - ${customDateString(
        item.endDate
      )}`}</Text>
    </TouchableOpacity>
  );
  return (
    <View style={styles.container}>
      <Text style={global.h3}>My Trips</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          navigation.push("CreateTripScreen", { addTrip: addTrip })
        }
      >
        <AntDesign name="plus" size={40} color="white" />
      </TouchableOpacity>
      <View style={styles.listWrapper}>
        <FlatList data={trips} renderItem={renderItem}></FlatList>
      </View>
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
    zIndex: 2,
  },
  tripCard: {
    width: "100%",
    backgroundColor: "lightgrey",
    borderRadius: 8,
    borderBottomRightRadius: 32,
    borderTopLeftRadius: 32,
    height: 100,
    paddingVertical: 10,
    paddingHorizontal: 17,
    justifyContent: "flex-end",
    marginBottom: 10,
  },
  listWrapper: {
    flex: 1,
    alignSelf: "stretch",
    marginTop: 37,
  },
});
