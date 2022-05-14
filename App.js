import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";
import CreateTripScreen from "./screens/CreateTripScreen";
import CreateEventScreen from "./screens/CreateEventScreen";
import SingleScheduleScreen from "./screens/SingleScheduleScreen";
import ScheduleOverviewScreen from "./screens/ScheduleOverviewScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFonts } from "expo-font";

const Stack = createNativeStackNavigator();

export default function App() {
  const [loaded] = useFonts({
    RobotoLight: require("./assets/fonts/Roboto-Light.ttf"),
    Roboto: require("./assets/fonts/Roboto-Regular.ttf"),
    JosefinSans: require("./assets/fonts/JosefinSans-Light.ttf"),
    OpenSansExtraBold: require("./assets/fonts/OpenSans-ExtraBold.ttf"),
    ArchivoNarrow: require("./assets/fonts/ArchivoNarrow-Regular.ttf"),
    PTSans: require("./assets/fonts/PTSans-Regular.ttf"),
  });

  if (!loaded) {
    return null;
  }
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{ headerBackVisible: false }}
        />
        <Stack.Screen name="CreateTripScreen" component={CreateTripScreen} />
        <Stack.Screen
          name="ScheduleOverviewScreen"
          component={ScheduleOverviewScreen}
        />
        <Stack.Screen
          name="SingleScheduleScreen"
          component={SingleScheduleScreen}
        />
        <Stack.Screen
          name="CreateEventScreen"
          component={CreateEventScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
