import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  ScrollView,
  Alert,
  TouchableWithoutFeedback,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

function ProfileScreen(props) {
  return (
    <View>
      <View style={styles.footer}>
        <Icon name="person-circle-sharp" size={42} color="white" />
        <Text style={styles.emailLabel}>some_email@mail.com</Text>
      </View>
      <ScrollView>
        <Text style={styles.vehiclesLabel}>Транспортные средства</Text>
        <ScrollView horizontal={true} style={styles.vehiclesScrollView}>
          <TouchableWithoutFeedback
            onPressIn={() => Alert.alert("В разработке!")}
          >
            <View style={styles.vehicleCard}>
              <Text style={styles.vehiclePlate}>А 001 АА 72</Text>
              <Icon name="car" size={130} color="white" />
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onPressIn={() => Alert.alert("В разработке!")}
          >
            <View style={styles.vehicleCard}>
              <Text style={styles.vehiclePlate}>Б 222 ББ 72</Text>
              <Icon name="car" size={130} color="white" />
            </View>
          </TouchableWithoutFeedback>
        </ScrollView>
        <View style={styles.addVehicleButton}>
          <Button
            title="Добавить ТС"
            onPress={() => Alert.alert("В разработке!")}
          ></Button>
        </View>
        <Text style={styles.moneyLabel}>Баланс: 0 руб</Text>
        <View style={styles.addMoneyButton}>
          <Button
            title="Пополнить баланс"
            onPress={() => Alert.alert("В разработке!")}
          ></Button>
        </View>
        <View style={styles.operationsHistory}>
          <Button
            title="История операций"
            onPress={() => Alert.alert("В разработке!")}
          ></Button>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    flexDirection: "row",
    height: 70,
    width: "100%",
    paddingTop: 15,
    paddingLeft: 15,
    backgroundColor: "dodgerblue",
  },
  emailLabel: { fontSize: 16, paddingTop: 10, paddingLeft: 20 },
  vehiclesLabel: {
    fontSize: 20,
    color: "grey",
    paddingTop: 30,
    paddingLeft: 20,
  },
  vehiclesScrollView: {},
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
  addVehicleButton: { width: 200, paddingTop: 20, paddingLeft: 20 },
  moneyLabel: { fontSize: 20, color: "grey", paddingTop: 70, paddingLeft: 20 },
  addMoneyButton: { width: 250, paddingTop: 20, paddingLeft: 20 },
  operationsHistory: { width: 250, paddingTop: 100, paddingLeft: 20 },
});

export default ProfileScreen;
