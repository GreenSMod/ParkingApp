import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

function VehicleComponent(props) {
  const navigation = useNavigation();
  return (
    <TouchableWithoutFeedback
      onPress={() =>
        navigation.navigate("EditVehicle", {
          isNew: false,
          props: props,
        })
      }
    >
      <View style={styles.vehicleCard}>
        <Text style={styles.vehiclePlate}>{props.plate}</Text>
        <Icon name="car" size={130} color="white" />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  vehicleCard: {
    backgroundColor: "dodgerblue",
    width: 200,
    height: 200,
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
    borderRadius: 10,
  },
  vehiclePlate: {
    fontSize: 20,
    color: "white",
  },
});

export default VehicleComponent;
