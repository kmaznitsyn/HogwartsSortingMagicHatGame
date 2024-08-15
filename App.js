import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./screens/HomeScreen";
import ListScreen from "./screens/ListScreen";
import DetailsScreen from "./screens/DetailsScreen";
import { Ionicons } from "@expo/vector-icons";
import MagicianSortContextProvider from "./store/magician-sort-context";
import ResetButtonWrapper from "./components/ResetButtonWrapper";

const ListStack = createNativeStackNavigator();

function ListStackScreen() {
  return (
    <ListStack.Navigator>
      <ListStack.Screen
        options={{
          title: "Sort Guesses",
          headerRight: () => <ResetButtonWrapper />,

          headerShown: true,
        }}
        name="ListScreen"
        component={ListScreen}
      />
      <ListStack.Screen name="DetailsScreen" component={DetailsScreen} />
    </ListStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <MagicianSortContextProvider>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen
            options={{
              title: "Magician Sorting",
              headerRight: () => <ResetButtonWrapper />,
              tabBarIcon: ({ color }) => (
                <Ionicons name="color-wand-outline" color={color} size={22} />
              ),
            }}
            name="HomeScreen"
            component={HomeScreen}
          />
          <Tab.Screen
            options={{
              title: "Sort Guesses",
              headerRight: () => <ResetButtonWrapper />,
              tabBarIcon: ({ color }) => (
                <Ionicons name="list" color={color} size={22} />
              ),
              headerShown: false,
            }}
            name="ListStack"
            component={ListStackScreen}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </MagicianSortContextProvider>
  );
}
