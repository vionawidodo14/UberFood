import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, Text, Image, StyleSheet, SafeAreaView, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from '@expo/vector-icons';
import colors from '../colors';
import { Entypo } from '@expo/vector-icons';
import chefImage from "../assets/Chef_icon.svg.png";
import HeaderTabs from "../components/home/HeaderTabs";
import SearchBar from "../components/home/SearchBar";
import Categories from "../components/home/Categories";
import RestaurantItem from "../components/home/RestaurantItems";
import BottomTabs from "../components/home/BottomTabs";


const YELP_API_KEY =
    "TRnxSOeAb59cGBVBD1BxHIp8fBcQbyJGUH79VPcEk1EPBUSBBw-fPkNpTxRAXeWDQgThMPEOotxJg1-xs91C3bGKAM9ZaLlDHc9HqTz8_9W9RRJGek4f4-Bufm4mZHYx";


const Home = () => {

    const navigation = useNavigation();
    const [activeTab, setActiveTab] = useState("Delivery");
    const [city, setCity] = useState("San Francisco");
    const [restaurantData, setRestaurantData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);

    const getRestaurantsFromYelp = () => {
        const yelpUrl = 'https://uber-food-clone-a209f-default-rtdb.firebaseio.com/restaurant.json'

        return fetch(yelpUrl).then((res) => res.json()).
            then(json => {
                const data = Object.keys(json).map((id) => json[id])
                const datalist = data.filter((item) => item.transactions.includes(activeTab.toLowerCase()))

                setRestaurantData(datalist)
                setFilteredData(datalist)
            });
    };

    useEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <FontAwesome name="search" size={24} color={colors.gray} style={{ marginLeft: 15 }} />
            ),
            headerRight: () => (
                <Image
                    source={chefImage}
                    style={{
                        width: 40,
                        height: 40,
                        marginRight: 15,
                    }}
                />
            ),
        });

        getRestaurantsFromYelp()


    }, [navigation, activeTab]);

    const handleSearch = (text) => {
        const filtered = restaurantData.filter(item => item.name.toLowerCase().includes(text))
        setFilteredData(filtered)
    }

    const handleCategorySelected = (text) => {
        const filtered = restaurantData.filter(item => item.category == text.toLowerCase())
        setFilteredData(filtered)
    }
    return (
        <SafeAreaView style={{ backgroundColor: "#eee", flex: 1 }}>
            <View style={styles.container}>
                <HeaderTabs activeTab={activeTab} setActiveTab={setActiveTab} />
                <SearchBar cityHandler={setCity} onPressSearch={handleSearch} />
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Categories selectCategory={handleCategorySelected} />
                {
                    filteredData.map(item => <RestaurantItem navigation={navigation} restaurantData={item} />)
                }


            </ScrollView>
            <View style={styles.container1}>
                <TouchableOpacity
                    onPress={() => navigation.navigate("Chat")}
                    style={styles.chatButton}
                >
                    <Entypo name="chat" size={24} color={colors.lightGray} />
                </TouchableOpacity>
            </View>
            <BottomTabs />
        </SafeAreaView>
    );
};

export default Home;

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        padding: 15
    },
    container1: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        marginRight: 10,
        backgroundColor: "#eee",
    },
    chatButton: {
        backgroundColor: colors.primary,
        height: 50,
        width: 50,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: colors.primary,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: .9,
        shadowRadius: 8,
        marginRight: 20,
        marginBottom: 50,
    },
    header:
    {
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
    }
});