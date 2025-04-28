import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  ScrollView,
  Alert,
} from "react-native";

import { useState, useEffect } from "react";
import { supabase } from "../utils/supabase";
import ParkingComponent from "./ParkingComponent";

function MapScreen({ session }) {
  const [loading, setLoading] = useState(true);
  const [parkings, setParkings] = useState("");

  useEffect(() => {
    if (session) getParkings();
  }, [session]);

  async function getParkings() {
    const { data, error, status } = await supabase.from("parkings").select();
    setParkings(JSON.parse(JSON.stringify(data)));
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        {parkings.map((data, index) => (
          <ParkingComponent key={index} {...data} />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
});

export default MapScreen;
