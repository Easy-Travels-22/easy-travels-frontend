import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";
import { Navigation } from "@material-ui/icons";

export default function LoginScreen({ navigation }) {
  const handleLogin = () => {
    navigation.navigate("TabNavigator");
  };
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>EasyTravels</Text>
      <View style={styles.fieldsContainer}>
        <View style={styles.usernameContainer}>
          <TextInput
            autoCapitalize="none"
            style={styles.textInput}
            placeholder="Username"
          />
          <AntDesign name="user" size={20} color="black" />
        </View>
        <View style={{ ...styles.usernameContainer, marginBottom: 70 }}>
          <TextInput
            autoCapitalize="none"
            style={styles.textInput}
            placeholder="Password"
            secureTextEntry
          />
          <AntDesign name="lock" size={20} color="black" />
        </View>
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.actionText}>LOGIN</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.loginButton}>
          <Text style={styles.actionText}>CREATE ACCOUNT</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#abc8c0",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontFamily: "JosefinSans",
    fontSize: 55,
  },
  fieldsContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "85%",
    height: "50%",
    minHeight: 200,
    borderRadius: 20,
    // shadowColor: "rgba(0, 0, 0, 0.25)",
    // shadowOffset: { width: 10, height: 10 },
    // shadowRadius: 10,
    // shadowOpacity: 1,
  },
  usernameContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "black",
    height: 55,
    width: "100%",
    paddingHorizontal: 10,
    backgroundColor: "white",
    marginBottom: 15,
  },
  textInput: {
    width: "90%",
  },
  loginButton: {
    width: "100%",
    height: 55,
    backgroundColor: "#daf7dc",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "black",
    marginBottom: 10,
  },
  actionText: {
    fontSize: 16,
    fontFamily: "RobotoLight",
    letterSpacing: 0.5,
  },
});
