import React, { useContext, useState } from "react";
import { View, Text, Button } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import About from "../components/restaurantDetail/About";
import MenuItems from "../components/restaurantDetail/MenuItems";
import ViewCart from "../components/restaurantDetail/ViewCart";
import { AuthenticatedUserContext } from "../App";
import dayjs from 'dayjs'


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
            price: food.price,
            basePrice: food.basePrice,
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
        price: food.price,
        basePrice: food.basePrice,
      }
      setCart([
        ...removed,
        newItem
      ])
    } else {
      const newItem = {
        title: food.title,
        quantity: 1,
        price: food.price,
        basePrice: food.basePrice,
      }
      setCart([
        ...cart,
        newItem
      ])
    }
  }

  const createOrder = async () => {
    // return console.log(dayjs().format('YYYY-MM-DD'));

    const orderData = {
      totalPrice: getTotal().totalPrice,
      totalQuantity: getTotal().totalQuantity,
      totalExpenses: getTotal().totalExpenses,
      address: 'address',
      type: route.params.type,
      items: cart,
      restaurantName: route.params.name,
      restaurantImage: route.params.image,
      user: user.email,
      date: dayjs().format('YYYY-MM-DD')
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
    const totalExpenses = cart.reduce((curr, next) => curr + parseInt(next.basePrice), 0)
    const totalQuantity = cart.reduce((curr, next) => curr + next.quantity, 0)
    return {
      totalPrice,
      totalExpenses,
      totalQuantity
    }
  }
  return (
    <View style={{ flex: 1 }}>
      <MenuItems route={route} getFoodQty={getFoodQty} decreaseItem={decreaseItem} increaseItem={increaseItem} />
      <View style={{
        backgroundColor: "#eee",
      }}>
        <Button disabled={cart.length == 0} title={`Order - $${getTotal().totalPrice}`} onPress={createOrder} />
      </View>

      {/* <ViewCart navigation={navigation} /> */}
    </View>
  );
}