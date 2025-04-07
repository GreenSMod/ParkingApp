import React from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

function HomeScreen(props) {
  return (
    <View>
      <Icon
        name="notifications-outline"
        size={30}
        color="grey"
        onPress={() => Alert.alert("В разработке!")}
        style={{ alignSelf: "flex-end", paddingTop: 10, paddingEnd: 10 }}
      />
      <Text style={{ paddingTop: 50, paddingLeft: 20, fontSize: 20 }}>
        Активных парковочных сеансов нет
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  activeParking: {},
});

export default HomeScreen;
