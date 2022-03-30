import { createDrawerNavigator } from "@react-navigation/drawer";
import TabNavigator from "./TabNavigator";
import CreateTripScreen from "./screens/CreateTripScreen";

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Europe" component={TabNavigator} />
      <Drawer.Screen name="Create Trip" component={CreateTripScreen} />
    </Drawer.Navigator>
  );
}
