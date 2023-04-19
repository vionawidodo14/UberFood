import React, { useState } from 'react'
import { useContext } from 'react'
import { View, Text, Button, ScrollView } from 'react-native'
import { StyleSheet, TextInput } from 'react-native'
import { AuthenticatedUserContext } from '../App'
import { updatePassword } from "firebase/auth";
import { auth } from '../config/firebase'

const Account = () => {

  const { user } = useContext(AuthenticatedUserContext)

  const update = async () => {
    try {
      await updatePassword(user, '12345678')
      alert('success')

    } catch (error) {
      alert('gagal login ulang')
    }

  }

  return (
    <ScrollView style={{
      padding: 10,
    }}>
      <Text style={{ fontSize: 26, marginBottom: 20 }}>My Account</Text>

      <Text>Email</Text>
      <TextInput style={styles.input} value={user.email} />

      <Text>Name</Text>
      <TextInput style={styles.input} />
      <Text>Phone</Text>
      <TextInput style={styles.input} />

      <Text>Password</Text>
      <TextInput style={styles.input} secureTextEntry={true} />

      <Button title='Update' onPress={update} />
    </ScrollView>
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
});
export default Account
