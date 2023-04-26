import React from "react";
import { View, Text, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
//const image1= require("../../assets/burger1.jpg")


export const localRestaurants = [
    {
        name: "Hot Crush Burger",
        image: require("../../assets/burger1.jpg"),
        categories: ["Cafe", "Bar"],
        price: "$$",
        reviews: 1104,
        rating: 4.5,
    },
    {
        name: "Hot Crush Burger Gold",
        image: require("../../assets/burger1.jpg"),
        categories: ["Cafe", "Bar"],
        price: "$$",
        reviews: 1244,
        rating: 4.9,
    },
    {
        name: "Hot Crush Burger",
        image: require("../../assets/burger1.jpg"),
        categories: ["Cafe", "Bar"],
        price: "$$",
        reviews: 700,
        rating: 4.7,
    },
];

export default function RestaurantItem({ restaurantData, navigation }) {
    return (
        <TouchableOpacity
            activeOpacity={1}
            style={{ marginBottom: 30 }}
            onPress={() =>
                navigation.navigate("RestaurantDetail", {
                    name: restaurantData.name,
                    image: restaurantData.image_url,
                    price: restaurantData.price,
                    reviews: restaurantData.review_count,
                    rating: restaurantData.rating,
                    categories: restaurantData.categories,
                })
            }
        >
            <View
                style={{ marginTop: 10, padding: 15, backgroundColor: "white" }}>
                <RestaurantImage restaurantData={restaurantData} />
                <RestaurantInfo restaurantData={restaurantData} />
            </View>
        </TouchableOpacity>
    )
};

const RestaurantImage = ({ restaurantData }) => (
    <>
        <Image
            source={{ uri: restaurantData.image_url }}
            style={{ width: "100%", height: 250, marginTop: 10 }}
        />
        <TouchableOpacity style={{ position: "absolute", right: 40, top: 14 }}>
            <MaterialCommunityIcons name='heart-outline' size={25} color='#eee' />
        </TouchableOpacity>
    </>

);

const RestaurantInfo = ({ restaurantData }) => (
    <View style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 10,
    }}>

        <View>
            <Text style={{ fontSize: 15, fontWeight: "bold" }}>{restaurantData.name}</Text>
            <Text style={{ fontSize: 13, color: "gray" }}>25-30 . min</Text>
        </View>
        <View
            style={{
                backgroundColor: "#eee",
                height: 30,
                width: 30,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 15
            }}>
            <Text>4.5</Text>
        </View>
    </View>
)