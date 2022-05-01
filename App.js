import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";
import CreateActivityScreen from "./screens/SchedulerScreens/CreateActivityScreen";
import SingleSchedulerScreen from "./screens/SchedulerScreens/SingleSchedulerScreen";
import ItineraryOverviewScreen from "./screens/SchedulerScreens/ItineraryOverviewScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFonts } from "expo-font";

const Stack = createNativeStackNavigator();

export default function App() {
  const [loaded] = useFonts({
    RobotoLight: require("./assets/fonts/Roboto-Light.ttf"),
    Roboto: require("./assets/fonts/Roboto-Regular.ttf"),
    JosefinSans: require("./assets/fonts/JosefinSans-Light.ttf"),
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
        <Stack.Screen
          name="ItineraryOverviewScreen"
          component={ItineraryOverviewScreen}
        />
        <Stack.Screen
          name="SingleSchedulerScreen"
          component={SingleSchedulerScreen}
        />
        <Stack.Screen
          name="CreateActivityScreen"
          component={CreateActivityScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
