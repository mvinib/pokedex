import React, { useState, useEffect} from 'react'
import { View, Text, TextInput, TouchableOpacity, ImageBackground } from 'react-native'

import styles from '../styles/register.js'
import formStyles from '../styles/form.js'

import background from '../../assets/background.jpg'

export default function register({ navigation }) {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')
    const [error, setError] = useState(true)

    const url = `http://10.0.0.10:8080/auth/user`

    async function singUp() {
        await fetch(url, {
            method: 'POST',
            headers: {
                'Content-type' : 'application/json',
                'Accept' : 'application/json'
            },
            body: JSON.stringify({
                "username": username,
                "email": email,
                "password": password
            })
        })
        .then(response => response.json()
        .then(data => {
            console.log(data)
            setMessage(data.message)
            setError(data.error)
        }))   
    }

    function validation() {
        if(username == '' || email == '' || password == '') {
            setMessage('Preencha todos os campos!')
            return
        }
        singUp()
    }

    useEffect(() => {
        console.log(error)
        if(error != true) {
        
            navigation.navigate('Login')
        }
    }, [error])

    return (
        <ImageBackground source={background} blurRadius={2} style={styles.container}>
            <View style={styles.container}>
            <View style={styles.header}>
                <Text style={{fontSize: 45, color: 'white'}}>Pokedex</Text>
                <Text style={{fontSize: 18, color: 'white', textAlign: "center", marginTop: 10}}>Curabitur sed elit sodales, tempor eros in, lacinia dolor. Phasellus id ligula fringilla, cursus.</Text>
            </View>

            <View style={formStyles.form}>
                <Text style={{fontSize: 13, color: '#fff', fontWeight: '100'}}>User</Text>
                <TextInput style={[formStyles.input, {outline: 'none'}]}
                    onChangeText={ text => { setUsername(text), setMessage('') }}
                />

                <Text style={{fontSize: 13, color: '#fff', fontWeight: '100'}}>Email</Text>
                <TextInput style={[formStyles.input, {outline: 'none'}]}
                    autoCapitalize="none"
                    onChangeText={ text => { setEmail(text), setMessage('') }}
                />

                <Text style={{fontSize: 13, color: '#fff', fontWeight: '100'}}>Password</Text>
                <TextInput style={[formStyles.input, {outline: 'none'}]}
                    onChangeText={ text => { setPassword(text), setMessage('') }}
                    secureTextEntry={true}
                />
                <Text style={{fontSize: 12, color: '#fff', fontWeight: '100', textAlign: 'center'}}>{message}</Text>
                <TouchableOpacity style={formStyles.button} onPress={validation}>
                    <Text style={{fontSize: 15, color: '#fff', textAlign: 'center'}}>Sign up</Text>
                </TouchableOpacity>

                <Text style={{fontSize: 12, color: '#fff', fontWeight: '100', textAlign: 'center'}}>Already have an account? <Text style={{textDecorationLine: 'underline'}} onPress={() => navigation.navigate('Login')}>Click here to enter</Text></Text>
            </View>
            </View>
        </ImageBackground>

    )
}
