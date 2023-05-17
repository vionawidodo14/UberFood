import React, { useState } from "react";
import { View, Text, Touchable, TouchableOpacity, TextInput } from "react-native";

export default function SearchBar({ cityHandler, onPressSearch }) {
  const [text, setText] = useState('')

  return (
    <View style={{ marginTop: 15, flexDirection: "row" }}>
      <TextInput style={{
        paddingLeft: 10,
        width: '80%',
        backgroundColor: "#eee",
        borderRadius: 50,
        flexDirection: "row",
        alignItems: "center",
        marginRight: 10,
      }}
        placeholder="Search menu"
        onChangeText={val => setText(val)}
      />

      <TouchableOpacity onPress={() => onPressSearch(text)}>

        <View
          style={{
            flexDirection: "row",
            backgroundColor: "white",
            padding: 9,
            borderRadius: 30,
            alignItems: "center",
          }}
        >
          <Text>Search</Text>
        </View>
      </TouchableOpacity>

    </View>
  );
}