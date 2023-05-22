import React from "react";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";

const items = [
  {
    image: require("../../assets/steak.png"),
    text: "Steak",
  },
  {
    image: require("../../assets/bar1.png"),
    text: "Bars",
  },
  {
    image: require("../../assets/seafood1.png"),
    text: "Seafood",
  },
  {
    image: require("../../assets/italian1.png"),
    text: "Italian",
  },
  {
    image: require("../../assets/sushi.png"),
    text: "Sushi",
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