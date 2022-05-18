import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useContext, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";
import { UserContext } from "../context/UserContext";
import { useNavigation } from "@react-navigation/core";
import axios from "axios";

export default function LoginScreen({ setIsSignedIn }) {
  const navigation = useNavigation();
  const { user, setUser, token, setToken } = useContext(UserContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [failedLoginAttempt, setFailedLoginAttempt] = useState(false);
  const handleLogin = async () => {
    try {
      const res = await axios.post(
        "https://easy-travels-api.herokuapp.com/api/v1/users/login",
        {
          name: username,
          password: password,
        }
      );
      if (res.data.token) {
        setToken(res.data.token);
        setIsSignedIn(true);
      }
    } catch (error) {
      setFailedLoginAttempt(true);
      console.log("ERROR: ", error);
    }
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
            onChangeText={setUsername}
          />
          <AntDesign name="user" size={20} color="black" />
        </View>
        <View style={{ ...styles.usernameContainer, marginBottom: 70 }}>
          <TextInput
            autoCapitalize="none"
            style={styles.textInput}
            placeholder="Password"
            secureTextEntry
            onChangeText={setPassword}
          />
          <AntDesign name="lock" size={20} color="black" />
        </View>
        <Text>{failedLoginAttempt && "Username or Password is incorrect"}</Text>
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
