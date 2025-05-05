import React from "react";
import {
  Alert,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useState, useEffect, useCallback } from "react";
import { supabase } from "../utils/supabase";
import ParkingSessionComponent from "./ParkingSessionComponent";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect } from "@react-navigation/native";

function HomeScreen({ session }) {
  const [loading, setLoading] = useState(true);
  const [parkingSessions, setParkingSessions] = useState("");
  const [parkings, setParkings] = useState("");

  useEffect(() => {
    getParkingSessions();
    getParkings();
  }, [session]);

  useFocusEffect(
    React.useCallback(() => {
      getParkingSessions();
      getParkings();

      return;
    }, [])
  );

  async function getParkingSessions() {
    setLoading(true);

    let currentDate = new Date();

    currentDate.setMinutes(
      currentDate.getMinutes() + new Date().getTimezoneOffset() * -1
    );

    const { data, error, status } = await supabase
      .from("parking_sessions")
      .select()
      .eq("user_id", session.user.id)
      .gte(
        "end_date",

        currentDate.toISOString()
      );

    let newData = JSON.stringify(data);

    if (!(newData === JSON.stringify(parkingSessions))) {
      setParkingSessions(JSON.parse(newData));
    }

    setLoading(false);
  }

  async function getParkings() {
    setLoading(true);

    const { data, error, status } = await supabase.from("parkings").select();

    let newData = JSON.stringify(data);

    if (!(newData === JSON.stringify(parkings))) {
      setParkings(JSON.parse(newData));
    }

    setLoading(false);
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Icon
        name="notifications-outline"
        size={30}
        color="grey"
        onPress={() => Alert.alert("В разработке!")}
        style={{ alignSelf: "flex-end", paddingTop: 10, paddingEnd: 10 }}
      />
      <View style={styles.container}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          {loading ? (
            <></>
          ) : parkingSessions.length > 0 ? (
            parkingSessions.map((data, index) => (
              <ParkingSessionComponent key={index} {...data} />
            ))
          ) : (
            <Text style={{ fontSize: 18, margin: 20 }}>
              Активных парковочных сессий нет
            </Text>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  activeParking: {},
});

export default HomeScreen;
