import React, { useState, useEffect}  from 'react'
import { View, Text, TextInput, TouchableOpacity, ImageBackground } from 'react-native'

import styles from '../styles/register.js'
import formStyles from '../styles/form.js'

import background from '../../assets/background.jpg'

export default function login({ navigation }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')
    const [error, setError] = useState(true)
    
    const url = `http://10.0.0.10:8080/auth/user/${email}/${password}`

    async function login() {
        await fetch(url, {
            method: 'GET',
            headers: {
              'Accept' : 'application/json'  
            }
        })
        .then(response => response.json()
        .then(data => {
            setMessage(data.message)
            setError(data.error)
        }))
    }

    function validation() {
        if(email == '' || password == '') {
            setMessage('Preencha todos os campos!')
            return
        }
        login()
    }

    useEffect(() => {
        console.log(error)
        if(error == false) {
            navigation.navigate('Dashboard')
        }
    }, [error])

    return (
        <ImageBackground source={background} blurRadius={2} style={styles.container}>
            <View style={styles.container}>
            <View style={styles.header}>
                <Text style={{fontSize: 45, color: 'white'}}>Pokedex</Text>
                <Text style={{fontSize: 18, color: 'white', textAlign: "center", marginTop: 10}}>Morbi luctus sapien purus. Nullam aliquet nibh nec purus pharetra, sed scelerisque leo congue.</Text>
            </View>

            <View style={formStyles.form}>

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
                    <Text style={{fontSize: 15, color: '#fff', textAlign: 'center'}}>Sign in</Text>
                </TouchableOpacity>

                <Text style={{fontSize: 12, color: '#fff', fontWeight: '100', textAlign: 'center'}}>or</Text>
                <Text style={{fontSize: 12, color: '#fff', fontWeight: '100', textAlign: 'center', marginTop: 5, textDecorationLine: 'underline'}} onPress={() => navigation.navigate('Register')}>Create a new account</Text>
            </View>
            </View>
        </ImageBackground>

    )
}
