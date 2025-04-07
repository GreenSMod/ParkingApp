import React from "react";
import { StyleSheet, Text, View } from "react-native";
//import { MapView, PROVIDER_DEFAULT } from "react-native-maps";

function MapScreen(props) {
  return <View style={styles.container}></View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  mapView: {
    width: "100%",
    height: "100%",
  },
});

export default MapScreen;
