import React, { useContext, useEffect } from 'react'
import { useState } from 'react'
import { View, Text, ScrollView } from 'react-native'
import { AuthenticatedUserContext } from '../App'

const OrderList = () => {
    const { user } = useContext(AuthenticatedUserContext)

    const [transactions, setTransactions] = useState({})
    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = () => {
        fetch('https://uber-food-clone-a209f-default-rtdb.firebaseio.com/transaction.json').then((res) => res.json()).then(json => setTransactions(json));
    }


    return (
        <ScrollView>

            {
                Object.keys(transactions).map(id => transactions[id].user == user.email && (
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        backgroundColor: 'white',
                        padding: 5,
                        margin: 5,
                        alignItems: 'center',
                        marginTop: 20,
                    }}>
                        <View>
                            <View><Text style={{ fontSize: 16, fontWeight: 'bold' }}>{transactions[id].restaurantName}</Text></View>

                            <View>
                                {transactions[id].items.map(i => <Text>{i.title} {i.quantity}x - ${i.price} </Text>)}
                            </View>

                            <Text>{transactions[id].type}</Text>
                        </View>

                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>${transactions[id].totalPrice}</Text>
                    </View>
                ))

            }


        </ScrollView>
    )
}

export default OrderList