import React, { useState } from 'react'
import { useContext } from 'react'
import { View, Text, Button, TouchableOpacity, Alert, ScrollView, Image, SafeAreaView } from 'react-native'
import { StyleSheet, TextInput } from 'react-native'
import { AuthenticatedUserContext } from '../App'
import { updatePassword } from "firebase/auth";
import { auth } from '../config/firebase'

const backImage = require("../assets/backImage.jpg");
const [password, setPassword] = useState("");

const Account = () => {

    const { user } = useContext(AuthenticatedUserContext)

    const update = async () => {
        if (password !== "") {
            updatePassword(user, password)
                .then(() => console.log("Update success"))
                .catch((err) => Alert.alert("Update failed", err.message));
        }



    };



    const logout = () => {
        Alert.alert(
            "Logout",
            "Are you sure? You want to logout?",
            [
                {
                    text: "Cancel",
                    onPress: () => {
                        return null;
                    },
                },
                {
                    text: "Confirm",
                    onPress: () => {
                        auth()
                            .signOut()
                            .then(() => navigation.replace("Auth"))
                            .catch((error) => {
                                console.log(error);
                                if (error.code === "auth/no-current-user")
                                    navigation.replace("Auth");
                                else alert(error);
                            });
                    },
                },
            ],
            { cancelable: false }
        );
    };


    return (

        <View style={styles.container}>
            <Image source={backImage} style={styles.backImage} />
            <View style={styles.whiteSheet} />
            <Text style={[styles.box1, styles.title]}>My Account</Text>
            <SafeAreaView style={styles.form}>


                <Text>Email</Text>
                <TextInput style={styles.input} value={user.email} />

                <Text>Name</Text>
                <TextInput style={styles.input} />
                <Text>Phone</Text>
                <TextInput style={styles.input} />

                <Text>Password</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter password"
                    autoCapitalize="none"
                    autoCorrect={false}
                    secureTextEntry={true}
                    textContentType="password"
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                />
                <Button title='Update' onPress={update} />
                <TouchableOpacity
                    style={styles.buttonStyle}
                    activeOpacity={0.5}
                    onPress={logout}
                >
                    <Text style={styles.buttonTextStyle}>
                        Logout
                    </Text>
                </TouchableOpacity>

            </SafeAreaView>
        </View>
    )
}


const styles = StyleSheet.create({
    input: {
        height: 40,
        marginBottom: 10,
        marginTop: 10,
        padding: 5,
        borderWidth: 1,
    },
    buttonStyle: {
        minWidth: 300,
        backgroundColor: "#f57c00",
        borderWidth: 0,
        color: "#FFFFFF",
        borderColor: "#7DE24E",
        height: 40,
        alignItems: "center",
        borderRadius: 30,
        marginLeft: 35,
        marginRight: 35,
        marginTop: 20,
        marginBottom: 25,
    },
    buttonTextStyle: {
        color: "#FFFFFF",
        paddingVertical: 10,
        fontSize: 16,
    },
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    title: {
        fontSize: 36,
        fontWeight: 'bold',
        color: "black",
        alignSelf: "center",
        marginTop: 70,
        paddingBottom: 24,

    },
    input: {
        backgroundColor: "#F6F7FB",
        height: 58,
        marginBottom: 20,
        fontSize: 16,
        borderRadius: 10,
        padding: 12,
    },
    backImage: {
        width: "100%",
        height: 340,
        position: "absolute",
        top: 0,
        resizeMode: 'cover',
    },
    whiteSheet: {
        width: '100%',
        height: '75%',
        position: "absolute",
        bottom: 0,
        backgroundColor: '#fff',
        borderTopLeftRadius: 60,
    },
    form: {
        flex: 1,
        justifyContent: 'center',
        marginTop: 100,
        marginHorizontal: 30,
    },
    button: {
        backgroundColor: '#f57c00',
        height: 58,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
    },
    box1: {
        backgroundColor: '#F6F7FB',
        color: 'white',
        opacity: .5,
        width: 200,
        height: 50,
    }

});
export default Account