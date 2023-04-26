import React, { useState } from "react";
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Button } from "react-native";
import About from "./About";
// import BouncyCheckbox from "react-native-bouncy-checkbox";
// import { useDispatch } from "react-redux";
// import { useSelector } from "react-redux";

const styles = StyleSheet.create({
    menuItemStyle: {
        flexDirection: "row",
        justifyContent: "space-between",
        margin: 20,
    },

    titleStyle: {
        fontSize: 19,
        fontWeight: "600",
    },
});

export default function MenuItems({
    route,
    foods,
    marginLeft,
    decreaseItem,
    increaseItem,
    getFoodQty
}) {


    // const cartItems = useSelector(
    //   (state) => state.cartReducer.selectedItems.items
    // );

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <About route={route} />

            {foods.map((food, index) => (
                <View key={index}>
                    <View style={styles.menuItemStyle}>
                        <FoodInfo food={food} getFoodQty={getFoodQty} decreaseItem={decreaseItem} increaseItem={increaseItem} />
                        <FoodImage food={food} marginLeft={marginLeft ? marginLeft : 0} />
                    </View>
                </View>
            ))}
        </ScrollView>
    );
}

const FoodInfo = (props) => {
    return (
        <View style={{ width: 240, justifyContent: "space-evenly" }}>
            <Text style={styles.titleStyle}>{props.food.title}</Text>
            <Text>{props.food.description}</Text>
            <Text>{props.food.price}</Text>
            <View style={{
                width: 100, flexDirection: "row", justifyContent: "space-between", alignItems: 'center',
                marginTop: 10
            }}>

                <Button title="-" onPress={() => props.decreaseItem(props.food)} />
                <TouchableOpacity><Text>{props.getFoodQty(props.food)}</Text></TouchableOpacity>
                <Button title="+" onPress={() => props.increaseItem(props.food)} />
            </View>

        </View>
    )
}

const FoodImage = ({ marginLeft, ...props }) => (
    <View>
        <Image
            source={{ uri: props.food.image }}
            style={{
                width: 100,
                height: 100,
                borderRadius: 8,
                marginLeft: marginLeft,
            }}
        />
    </View>
);