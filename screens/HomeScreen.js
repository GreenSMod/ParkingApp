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
import { useState, useEffect } from "react";
import { supabase } from "../utils/supabase";
import ParkingSessionComponent from "./ParkingSessionComponent";

function HomeScreen({ session }) {
  const [loading, setLoading] = useState(true);
  const [parkingSessions, setParkingSessions] = useState("");

  useEffect(() => {
    if (session) getParkingSessions();
  }, [session]);

  async function getParkingSessions() {
    const { data, error, status } = await supabase
      .from("parking_sessions")
      .select();
    setParkingSessions(JSON.parse(JSON.stringify(data)));
  }

  return (
    <View>
      <Icon
        name="notifications-outline"
        size={30}
        color="grey"
        onPress={() => Alert.alert("В разработке!")}
        style={{ alignSelf: "flex-end", paddingTop: 10, paddingEnd: 10 }}
      />
      <View style={styles.container}>
        <ScrollView>
          {parkingSessions.map((data, index) => (
            <ParkingSessionComponent key={index} {...data} />
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  activeParking: {},
});

export default HomeScreen;
