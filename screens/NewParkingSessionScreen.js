import React from "react";
import {
  TextInput,
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  Button,
  Alert,
} from "react-native";
import { supabase } from "../utils/supabase";
import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { Dropdown } from "react-native-element-dropdown";
import Icon from "react-native-vector-icons/Ionicons";
import { useFocusEffect } from "@react-navigation/native";

function NewParkingSessionScreen({ session, route }) {
  const { props } = route.params;

  const navigation = useNavigation();

  const [loading, setLoading] = useState(true);
  const [vehicles, setVehicles] = useState("");
  const [dropdownValue, setDropdownValue] = useState("");
  const [time, setTime] = useState("");

  useEffect(() => {
    getVehicles();
  }, [session]);

  async function getVehicles() {
    setLoading(true);

    const { data, error, status } = await supabase
      .from("vehicles")
      .select()
      .eq("owner_id", session?.user.id);

    setVehicles(JSON.parse(JSON.stringify(data)));

    setLoading(false);
  }

  async function StartParking() {
    if (dropdownValue === "") {
      Alert.alert("Не выбрано ТС!");
      return;
    }

    let intTime = parseInt(time);

    if (isNaN(intTime) || time <= 0) {
      Alert.alert("Введено неверное количество времени стоянки!");
      return;
    }

    const { data, error, status } = await supabase
      .from("balances")
      .select(`balance`)
      .eq("id", session.user.id)
      .single();

    let cost = Math.round((time * props.price) / 60);

    if (data.balance < cost) {
      Alert.alert("Недостаточно средств на счёте!");
      return;
    }

    let newBalance = data.balance - cost;

    const updates = {
      id: session.user.id,
      balance: newBalance,
    };

    const { error2 } = await supabase.from("balances").upsert(updates);

    let end_date = new Date();

    end_date.setMinutes(
      end_date.getMinutes() + intTime + end_date.getTimezoneOffset() * -1
    );

    const { error3 } = await supabase.from("parking_sessions").insert({
      user_id: session.user.id,
      vehicle_id: dropdownValue,
      end_date: end_date.toISOString(),
      cost: cost,
      parking_id: props.id,
    });

    navigation.navigate("Home");
  }

  return (
    <SafeAreaView>
      <Text style={styles.parkingName}>{"Зона №" + props.id}</Text>
      <Text style={styles.parkingAdress}>{props.adress}</Text>
      <Text style={styles.parkingPrice}>
        {"Стоимость часа: " + props.price + " руб"}
      </Text>

      {loading ? (
        <></>
      ) : (
        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          placeholder="Выберите ТС"
          maxHeight={300}
          data={vehicles}
          labelField="plate"
          valueField="id"
          onChange={(item) => {
            setDropdownValue(item.id);
          }}
          renderLeftIcon={() => (
            <Icon name="car" size={20} color="black" style={styles.icon} />
          )}
        ></Dropdown>
      )}
      <TextInput
        style={styles.input}
        placeholder={"Время стоянки, минут"}
        autoFocus={false}
        maxLength={9}
        onChangeText={(newTime) => setTime(newTime)}
        keyboardType="number-pad"
      ></TextInput>
      <View style={styles.startParkingButton}>
        <Button title="Начать парковку" onPress={() => StartParking()}></Button>
      </View>
    </SafeAreaView>
  );
}

export default NewParkingSessionScreen;

const styles = StyleSheet.create({
  parkingName: {
    fontSize: 22,
    color: "black",
    margin: 16,
  },
  parkingAdress: {
    fontSize: 18,
    color: "gray",
    marginLeft: 16,
    marginBottom: 16,
    marginTop: 0,
  },
  parkingPrice: {
    fontSize: 18,
    color: "darkblue",
    marginLeft: 16,
    marginBottom: 8,
    marginTop: 8,
  },
  dropdown: {
    margin: 16,
    marginTop: 32,
    height: 50,
    borderBottomColor: "gray",
    borderBottomWidth: 0.5,
  },
  icon: {
    marginRight: 10,
  },
  placeholderStyle: {
    fontSize: 18,
  },
  selectedTextStyle: {
    fontSize: 18,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  input: {
    height: 40,
    margin: 16,
    marginTop: 32,
    borderWidth: 1,
    padding: 10,
  },
  startParkingButton: {
    width: 200,
    marginTop: 50,
    marginLeft: 16,
  },
});
