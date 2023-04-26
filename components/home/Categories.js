import React from "react";
import { View, Text, Image, ScrollView } from "react-native";

const items = [
  {
    image: require("../../assets/pickup.png"),
    text: "Pick-up",
  },
  {
    image: require("../../assets/fastfood.png"),
    text: "Burger",
  },
  {
    image: require("../../assets/snack.png"),
    text: "Snacks",
  },
  {
    image: require("../../assets/drink.png"),
    text: "Drinks",
  },
  {
    image: require("../../assets/dessert.png"),
    text: "Dessert",
  },

];

export default function Categories() {
  return (
    <View
      style={{
        marginTop: 5,
        backgroundColor: "#fff",
        paddingVertical: 10,
        paddingLeft: 20,
      }}
    >
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {items.map((item, index) => (
          <View key={index} style={{ alignItems: "center", marginRight: 30 }}>
            <Image
              source={item.image}
              style={{
                width: 50,
                height: 40,
                resizeMode: "contain",
              }}
            />
            <Text style={{ fontSize: 13, fontWeight: "900" }}>{item.text}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}