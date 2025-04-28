import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";

function ParkingComponent(props) {
  return (
    <TouchableWithoutFeedback onPress={() => Alert.alert("В разработке!")}>
      <View style={styles.parkingCard}>
        <Text style={styles.parkingName}>{"Зона №" + props.id}</Text>
        <Text style={styles.parkingAdress}>{props.adress}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  parkingCard: {
    backgroundColor: "cornflowerblue",
    flex: 1,
    flexDirection: "column",
    height: 80,
    alignItems: "center",
    justifyContent: "center",
    margin: 5,
    borderRadius: 10,
  },
  parkingName: {
    fontSize: 14,
    color: "lightgray",
  },
  parkingAdress: {
    fontSize: 20,
    color: "azure",
  },
});

export default ParkingComponent;
