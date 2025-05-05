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
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect } from "@react-navigation/native";

function MapScreen({ session }) {
  const [loading, setLoading] = useState(true);
  const [parkings, setParkings] = useState("");

  useEffect(() => {
    getParkings();
  }, [session]);

  useFocusEffect(
    React.useCallback(() => {
      getParkings();

      return;
    }, [])
  );

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
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {loading ? (
          <></>
        ) : (
          parkings.map((data, index) => (
            <ParkingComponent key={index} {...data} />
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
});

export default MapScreen;
