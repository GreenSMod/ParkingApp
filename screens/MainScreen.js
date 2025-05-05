import React from "react";
import HomeScreen from "./HomeScreen";
import ProfileScreen from "./ProfileScreen";
import Icon from "react-native-vector-icons/Ionicons";
import MapScreen from "./MapScreen";
import { Session } from "@supabase/supabase-js";
import { useState, useEffect } from "react";
import { supabase } from "../utils/supabase";
//import { Button, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import {
  BottomTabBar,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabNavigator from "./TabNavigator";
import EditVehicleScreen from "./EditVehicleScreen";
import { SafeAreaProvider } from "react-native-safe-area-context";
import NewParkingSessionScreen from "./NewParkingSessionScreen";

const Tab = createBottomTabNavigator();

const Stack = createNativeStackNavigator();

function MainScreen({ session }) {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home">
            {(props) => <TabNavigator {...props} session={session} />}
          </Stack.Screen>

          <Stack.Screen name="Map">
            {(props) => <MapScreen {...props} session={session} />}
          </Stack.Screen>

          <Stack.Screen name="Profile">
            {(props) => <ProfileScreen {...props} session={session} />}
          </Stack.Screen>

          <Stack.Screen
            name="EditVehicle"
            options={{ headerShown: true, title: "Редактировать ТС" }}
          >
            {(props) => <EditVehicleScreen {...props} session={session} />}
          </Stack.Screen>

          <Stack.Screen
            name="NewParkingSession"
            options={{ headerShown: true, title: "Начать парковку" }}
          >
            {(props) => (
              <NewParkingSessionScreen {...props} session={session} />
            )}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );

  // if (!session?.user) throw new Error("No user on the session!");

  // return (
  //   <NavigationContainer>
  //     <Tab.Navigator
  //       screenOptions={({ route }) => ({
  //         tabBarIcon: ({ focused, color, size }) => {
  //           let iconName;

  //           if (route.name === "Home") {
  //             iconName = focused ? "home" : "home-outline";
  //           } else if (route.name === "Map") {
  //             iconName = focused ? "map" : "map-outline";
  //           } else if (route.name === "Profile") {
  //             iconName = focused ? "person" : "person-outline";
  //           }

  //           return <Icon name={iconName} size={size} color={color} />;
  //         },
  //         tabBarInactiveTintColor: "gray",
  //         headerShown: false,
  //         tabBarShowLabel: false,
  //       })}
  //     >
  //       <Tab.Screen name="Home">
  //         {(props) => <HomeScreen {...props} session={session} />}
  //       </Tab.Screen>
  //       <Tab.Screen name="Map">
  //         {(props) => <MapScreen {...props} session={session} />}
  //       </Tab.Screen>
  //       <Tab.Screen name="Profile">
  //         {(props) => <ProfileScreen {...props} session={session} />}
  //       </Tab.Screen>
  //     </Tab.Navigator>
  //   </NavigationContainer>
  // );
}

export default MainScreen;
