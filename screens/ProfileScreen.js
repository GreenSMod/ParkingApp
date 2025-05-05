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
import { supabase } from "../utils/supabase";
import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { useFocusEffect } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import VehicleComponent from "./VehicleComponent";

function ProfileScreen({ session }) {
  const navigation = useNavigation();

  const [loading, setLoading] = useState(true);
  const [vehicles, setVehicles] = useState("");
  const [balance, setBalance] = useState("");
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    getVehicles();
    getBalance();
    // const unsubscribe = navigation.addListener("focus", () => {
    //   getVehicles();
    //   getBalance();
    // });

    // return unsubscribe;
  }, [session]);

  useFocusEffect(
    React.useCallback(() => {
      getVehicles();
      getBalance();

      return;
    }, [])
  );

  async function getVehicles() {
    setLoading(true);

    const { data, error, status } = await supabase
      .from("vehicles")
      .select()
      .eq("owner_id", session?.user.id);

    let newData = JSON.stringify(data);

    if (!(newData === JSON.stringify(vehicles))) {
      setVehicles(JSON.parse(newData));
    }

    setLoading(false);
  }

  async function getBalance() {
    setLoading(true);

    const { data, error, status } = await supabase
      .from("balances")
      .select(`balance`)
      .eq("id", session?.user.id)
      .single();

    if (!(data.balance === balance)) {
      setBalance(data.balance);
    }

    setLoading(false);
  }

  async function addMoney() {
    setDisabled(true);
    setTimeout(() => setDisabled(false), 3000);

    //getBalance();

    let newBalance = balance + 100;

    setBalance(newBalance);

    const updates = {
      id: session.user.id,
      balance: newBalance,
    };

    const { error } = await supabase.from("balances").upsert(updates);
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.footer}>
        <Icon name="person-circle-sharp" size={42} color="white" />
        <Text style={styles.emailLabel}>{session.user.email}</Text>
        <View style={styles.signOutButton}>
          <Button
            title="Выйти"
            color="darkblue"
            onPress={() => supabase.auth.signOut()}
          ></Button>
        </View>
      </View>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Text style={styles.vehiclesLabel}>Транспортные средства</Text>
        <ScrollView horizontal={true} style={styles.vehiclesScrollView}>
          {loading ? (
            <></>
          ) : vehicles.length > 0 ? (
            vehicles.map((data, index) => (
              <VehicleComponent key={index} {...data} />
            ))
          ) : (
            <Text style={{ fontSize: 15, margin: 20 }}>ТС не добавлены</Text>
          )}
        </ScrollView>
        <View style={styles.addVehicleButton}>
          <Button
            title="Добавить ТС"
            onPress={() =>
              navigation.navigate("EditVehicle", {
                isNew: true,
              })
            }
          ></Button>
        </View>
        <Text style={styles.moneyLabel}>Баланс: {balance} руб</Text>
        <View style={styles.addMoneyButton}>
          <Button
            title="Пополнить баланс"
            onPress={addMoney}
            disabled={disabled}
          ></Button>
        </View>
        <View style={styles.operationsHistory}>
          <Button
            title="История операций"
            onPress={() => Alert.alert("В разработке!")}
          ></Button>
        </View>
      </ScrollView>
    </SafeAreaView>
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
  signOutButton: {
    flex: 1,
    alignItems: "flex-end",
    paddingTop: 5,
    paddingRight: 20,
  },
  vehiclesLabel: {
    fontSize: 20,
    color: "grey",
    paddingTop: 30,
    paddingLeft: 20,
  },
  vehiclesScrollView: {},

  addVehicleButton: { width: 200, marginTop: 20, marginLeft: 20 },
  moneyLabel: { fontSize: 20, color: "grey", marginTop: 70, marginLeft: 20 },
  addMoneyButton: { width: 250, marginTop: 20, marginLeft: 20 },
  operationsHistory: {
    width: 250,
    marginTop: 100,
    marginBottom: 40,
    marginLeft: 20,
  },
});

export default ProfileScreen;
