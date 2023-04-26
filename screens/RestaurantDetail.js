import React, { useContext, useState } from "react";
import { View, Text, Button } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import About from "../components/restaurantDetail/About";
import MenuItems from "../components/restaurantDetail/MenuItems";
import ViewCart from "../components/restaurantDetail/ViewCart";
import { AuthenticatedUserContext } from "../App";

const foods = [
    {
        title: "Lasagna",
        description: "With butter lettuce, tomato and sauce bechamel",
        price: 13,
        image:
            "https://www.modernhoney.com/wp-content/uploads/2019/08/Classic-Lasagna-14-scaled.jpg",
    },
    {
        title: "Tandoori Chicken",
        description:
            "Amazing Indian dish with tenderloin chicken off the sizzles 🔥",
        price: 19,
        image: "https://i.ytimg.com/vi/BKxGodX9NGg/maxresdefault.jpg",
    },
    {
        title: "Chilaquiles",
        description:
            "Chilaquiles with cheese and sauce. A delicious mexican dish 🇲🇽",
        price: 14,
        image:
            "https://i2.wp.com/chilipeppermadness.com/wp-content/uploads/2020/11/Chilaquales-Recipe-Chilaquiles-Rojos-1.jpg",
    },
    {
        title: "Chicken Caesar Salad",
        description:
            "One can never go wrong with a chicken caesar salad. Healthy option with greens and proteins!",
        price: 21,
        image:
            "https://images.themodernproper.com/billowy-turkey/production/posts/2019/Easy-italian-salad-recipe-10.jpg?w=1200&h=1200&q=82&fm=jpg&fit=crop&fp-x=0.5&fp-y=0.5&dm=1614096227&s=c0f63a30cef3334d97f9ecad14be51da",
    },
    {
        title: "Lasagna",
        description: "With butter lettuce, tomato and sauce bechamel",
        price: 13,
        image:
            "https://thestayathomechef.com/wp-content/uploads/2017/08/Most-Amazing-Lasagna-2-e1574792735811.jpg",
    },
];

export default function RestaurantDetail({ route, navigation }) {
    const [cart, setCart] = useState([])
    const { user } = useContext(AuthenticatedUserContext)

    const getFoodQty = (food) => {
        const foodInCart = cart.find((item) => item.title === food.title)
        if (foodInCart) {
            return foodInCart.quantity
        }
        return 0
    }
    const decreaseItem = (food) => {
        const foodIndex = cart.findIndex((item) => item.title === food.title)
        if (foodIndex > -1) {
            let newData = cart.filter(item => item.title != food.title)
            if (cart[foodIndex].quantity - 1 == 0) {

            }
            else {
                newData = [
                    ...newData, {
                        title: food.title,
                        quantity: cart[foodIndex].quantity - 1,
                        price: food.price
                    }]

            }
            setCart(newData)
        }
    }
    const increaseItem = (food) => {
        const foodIndex = cart.findIndex((item) => item.title === food.title)
        if (foodIndex > -1) {
            const removed = cart.filter(item => item.title != food.title)
            const newItem = {
                title: food.title,
                quantity: cart[foodIndex].quantity + 1,
                price: food.price
            }
            setCart([
                ...removed,
                newItem
            ])
        } else {
            const newItem = {
                title: food.title,
                quantity: 1,
                price: food.price
            }
            setCart([
                ...cart,
                newItem
            ])
        }
    }

    const createOrder = async () => {
        const orderData = {
            totalPrice: getTotal().totalPrice,
            totalQuantity: getTotal().totalQuantity,
            address: 'address',
            type: 'delivery',
            items: cart,
            restaurantName: route.params.name,
            user: user.email
        }
        const rawResponse = await fetch('https://uber-food-clone-a209f-default-rtdb.firebaseio.com/transaction.json', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(orderData)
        });
        const content = await rawResponse.json();

        navigation.navigate("OrderCompleted", {
            orderData
        })
        setCart([])
        alert("Order Created")
    }

    const getTotal = () => {
        const totalPrice = cart.reduce((curr, next) => curr + (next.price * next.quantity), 0)
        const totalQuantity = cart.reduce((curr, next) => curr + next.quantity, 0)
        return {
            totalPrice,
            totalQuantity
        }
    }
    return (
        <View style={{ flex: 1 }}>
            <MenuItems route={route} foods={foods} getFoodQty={getFoodQty} decreaseItem={decreaseItem} increaseItem={increaseItem} />
            <View style={{
                backgroundColor: "#eee",
            }}>
                <Button disabled={cart.length == 0} title={`Order - $${getTotal().totalPrice}`} onPress={createOrder} />
            </View>

            {/* <ViewCart navigation={navigation} /> */}
        </View>
    );
}