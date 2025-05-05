import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";

function ParkingSessionComponent(props) {
  return (
    <TouchableWithoutFeedback onPress={() => Alert.alert("В разработке!")}>
      <View style={styles.parkingSessionCard}>
        <Text style={styles.parkingName}>
          {"Парковочная сессия №" + props.id}
        </Text>
        <Text style={styles.parkingAdress}>
          {"Время окончания: " +
            `${new Date(props.end_date).getHours()}:${new Date(
              props.end_date
            ).getMinutes()}, ${
              new Date(props.end_date).getMonth() + 1
            }.${new Date(props.end_date).getDate()}.${new Date(
              props.end_date
            ).getFullYear()}`}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  parkingSessionCard: {
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

export default ParkingSessionComponent;
