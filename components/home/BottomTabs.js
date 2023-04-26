import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

export default function BottomTabs() {
  const navigation = useNavigation();

  return (
    <View
      style={{
        flexDirection: "row",
        margin: 10,
        marginHorizontal: 30,
        justifyContent: "space-between",
      }}
    >
      <Icon icon="home" text="Home" onPress={() => navigation.navigate('Home')} />
      <Icon icon="receipt" text="Orders" onPress={() => navigation.navigate('OrderList')} />
      <Icon icon="user" text="Account" onPress={() => navigation.navigate('Account')} />
    </View>
  );
}

const Icon = (props) => (
  <TouchableOpacity onPress={props.onPress}>
    <View>
      <FontAwesome5
        name={props.icon}
        size={25}
        style={{
          marginBottom: 3,
          alignSelf: "center",
        }}
      />
      <Text>{props.text}</Text>
    </View>
  </TouchableOpacity>
);