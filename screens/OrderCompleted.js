import React, { useEffect, useState } from "react";
import { View, Text, SafeAreaView, ScrollView } from "react-native";
import colors from "../colors";
import { Entypo } from '@expo/vector-icons';
import { Button } from "react-native";

export default function OrderCompleted({ route, navigation }) {
    const { orderData } = route.params;


    const [lastOrder, setLastOrder] = useState({
        items: [
            {
                title: "Bologna",
                description: "With butter lettuce, tomato and sauce bechamel",
                price: "$13.50",
                image:
                    "https://www.modernhoney.com/wp-content/uploads/2019/08/Classic-Lasagna-14-scaled.jpg",
            },
        ],
    });



    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
            {/* green checkmark */}
            <View
                style={{
                    margin: 15,
                    alignItems: "center",
                    height: "100%",
                }}
            >
                <View style={{ height: 100 }}>
                    <Entypo name="check" size={72} color={colors.primary} />
                </View>

                <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 20 }}>
                    Your order at {orderData.restaurantName} has been placed for ${orderData.totalPrice}
                </Text>

                <Button onPress={() => {
                    navigation.navigate('Home')
                }} title='Home' />
            </View>
        </SafeAreaView>
    );
}