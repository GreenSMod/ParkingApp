import React from "react";
import HomeScreen from "./HomeScreen";
import ProfileScreen from "./ProfileScreen";
import Icon from "react-native-vector-icons/Ionicons";
import MapScreen from "./MapScreen";
import { Session } from "@supabase/supabase-js";
import { useState, useEffect } from "react";
import { supabase } from "../utils/supabase";
import { NavigationContainer } from "@react-navigation/native";
import {
  BottomTabBar,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();

function MainScreen({ session }) {
  if (!session?.user) throw new Error("No user on the session!");

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Home") {
              iconName = focused ? "home" : "home-outline";
            } else if (route.name === "Map") {
              iconName = focused ? "map" : "map-outline";
            } else if (route.name === "Profile") {
              iconName = focused ? "person" : "person-outline";
            }

            return <Icon name={iconName} size={size} color={color} />;
          },
          tabBarInactiveTintColor: "gray",
          headerShown: false,
          tabBarShowLabel: false,
        })}
      >
        <Tab.Screen name="Home">
          {(props) => <HomeScreen {...props} session={session} />}
        </Tab.Screen>
        <Tab.Screen name="Map">
          {(props) => <MapScreen {...props} session={session} />}
        </Tab.Screen>
        <Tab.Screen name="Profile">
          {(props) => <ProfileScreen {...props} session={session} />}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default MainScreen;
