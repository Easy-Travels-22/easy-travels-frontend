import { StyleSheet, TextInput, View, Text, Button } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useState } from "react";
import TodaySection from "../components/TodaySection";

export default function HomeScreen2({ navigation }) {
  const [searchSelected, setSearchSelected] = useState(false);

  const handleSearchFocus = () => {
    setSearchSelected((state) => !state);
  };
  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <View
          style={
            searchSelected
              ? styles.searchBarContainerSelected
              : styles.searchBarContainer
          }
        >
          <TextInput
            style={styles.searchBarInput}
            autoCapitalize="none"
            placeholder="Search"
            onFocus={handleSearchFocus}
            onBlur={handleSearchFocus}
          />
          <AntDesign name="search1" size={20} color="black" />
        </View>
        {!searchSelected && (
          <View style={styles.profileIconContainer}>
            <AntDesign name="user" size={30} color="black" />
          </View>
        )}
      </View>
      <TodaySection />
      <View>
        <Text>temporary trip homepage</Text>
        <Button
          title={"navigate"}
          onPress={() => {
            navigation.push("ScheduleOverviewScreen");
          }}
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
  topBar: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  searchBarContainer: {
    backgroundColor: "#daf7dc",
    width: "80%",
    height: 50,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "black",
    flexDirection: "row",
    alignItems: "center",
  },
  searchBarContainerSelected: {
    backgroundColor: "#daf7dc",
    width: "100%",
    height: 50,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "black",
    flexDirection: "row",
    alignItems: "center",
  },
  searchBarInput: {
    width: "80%",
    height: 50,
    marginLeft: "2.5%",
    marginRight: 20,
  },
  profileIconContainer: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});
