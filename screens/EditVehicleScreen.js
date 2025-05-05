import { Button } from "@rneui/themed";
import React from "react";
import { TextInput, View, StyleSheet, Alert, SafeAreaView } from "react-native";
import { supabase } from "../utils/supabase";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { registerDevMenuItems } from "expo-dev-client";

function EditVehicleScreen({ session, route }) {
  const { isNew, props } = route.params;

  const navigation = useNavigation();

  const [plate, setPlate] = useState("");

  function CheckInputs() {
    //regexp = new RegExp("/^[АВЕКМНОРСТУХ]{1}$/");
    //let text = "Н";
    //console.log(text.match(regexp)); // false
    //console.log(/^([a-z0-9]{5,})$/.test("abc12")); // true
    //console.log(/^([a-z0-9]{5,})$/.test("abc123")); // true
    if ((plate.length < 8) | (plate.length > 9)) return false;

    return true;
  }

  async function AddVehicle() {
    if (!CheckInputs()) {
      Alert.alert("Некорректный номер ТС");
      return;
    }

    const { error } = await supabase
      .from("vehicles")
      .insert({ owner_id: session.user.id, plate: plate });

    if (error) {
      Alert.alert("Некорректный номер ТС");
      return;
    }

    navigation.goBack();
  }

  async function EditVehicle() {
    if (!CheckInputs()) {
      Alert.alert("Некорректный номер ТС");
      return;
    }

    const { error } = await supabase
      .from("vehicles")
      .update({ plate: plate })
      .eq("id", props.id);

    if (error) {
      Alert.alert("Некорректный номер ТС");
      return;
    }

    navigation.getParent()?.getVehicles();
    navigation.goBack();
  }

  async function DeleteVehicle() {
    const { error } = await supabase
      .from("vehicles")
      .delete()
      .eq("id", props.id);

    if (error) {
      Alert.alert("Произошла ошибка!");
      return;
    }

    navigation.goBack();
  }

  return (
    <SafeAreaView>
      <TextInput
        style={styles.input}
        placeholder={props?.plate ? props.plate : "Номер ТС"}
        autoFocus={false}
        maxLength={9}
        onChangeText={(newPlate) => setPlate(newPlate)}
      ></TextInput>
      <View style={styles.addVehicleButton}>
        {isNew ? (
          <Button title="Добавить ТС" onPress={() => AddVehicle()}></Button>
        ) : (
          <Button
            title="Редактировать ТС"
            onPress={() => EditVehicle()}
          ></Button>
        )}
      </View>
      {isNew ? (
        <></>
      ) : (
        <View style={styles.deleteVehicleButton}>
          <Button
            title="Удалить ТС"
            color="red"
            onPress={() => DeleteVehicle()}
          ></Button>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 30,
    borderWidth: 1,
    padding: 10,
  },
  addVehicleButton: { width: 200, marginTop: 20, marginLeft: 30 },
  deleteVehicleButton: {
    width: 200,
    marginTop: 20,
    marginLeft: 30,
  },
});

export default EditVehicleScreen;
