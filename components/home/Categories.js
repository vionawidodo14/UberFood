import React from "react";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";

const items = [
  {
    image: require("../../assets/pickup.png"),
    text: "Noodles",
  },
  {
    image: require("../../assets/fastfood.png"),
    text: "Bars",
  },
  {
    image: require("../../assets/snack.png"),
    text: "Salad",
  },
  {
    image: require("../../assets/drink.png"),
    text: "Italian",
  },
  {
    image: require("../../assets/dessert.png"),
    text: "Ramen",
  },

];

export default function Categories({ selectCategory }) {
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
          <TouchableOpacity onPress={() => selectCategory(item.text)}>
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
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}