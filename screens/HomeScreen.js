import {
  StyleSheet,
  TextInput,
  View,
  Text,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useState, useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import global from "../assets/styles/global";
import uuid from "react-native-uuid";
import axios from "axios";

export default function HomeScreen({ navigation }) {
  const [searchSelected, setSearchSelected] = useState(false);
  const { token, user } = useContext(UserContext);
  const [trips, setTrips] = useState([]);

  const fetchUserTrips = async () => {
    axios
      .get("https://easy-travels-api.herokuapp.com/api/v1/trips", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log("fetched: ", res.data.data);
        setTrips(res.data.data);
      })
      .catch((err) => console.log("ERROR: ", err));
  };

  useEffect(() => {
    fetchUserTrips();
  }, []);

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
    date = new Date(date);
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
      style={[styles.tripCard, global.bgcolor__grad_1, global.dropshadow_1]}
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
      <Text style={[global.headerText_1, global.color__dark_1]}>My Trips</Text>
      <TouchableOpacity
        style={[styles.button, global.bgcolor__secondaryLight]}
        onPress={() =>
          navigation.push("CreateTripScreen", { addTrip: addTrip })
        }
      >
        <AntDesign name="plus" size={26} color="#0D1735" />
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
    borderRadius: 65 / 2,
    bottom: 30,
    right: 30,
    zIndex: 2,
  },
  tripCard: {
    width: "100%",
    // backgroundColor: "lightgrey",
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
