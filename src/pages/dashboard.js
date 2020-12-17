import React, { useState, useEffect } from 'react'
import { View, Text, TextInput, TouchableOpacity, FlatList, SafeAreaView, Image } from 'react-native'
import { Entypo, Ionicons, MaterialIcons  } from '@expo/vector-icons';


import styles from '../styles/dashboard'

export default function dashboard() {
    const [pokemon, setPokemon] = useState([])
    const [pokemons, setPokemons] = useState([])


    useEffect(() => {
        for (let i = 1; i <= 100; i++) {
            const url = `https://pokeapi.co/api/v2/pokemon/${i}`
            fetch(url)
            .then(response => response.json()
            .then(data => pokemons.push(data)))
        }
    }, [])

    return (
        <SafeAreaView style={styles.container}>
           {/* header */}
            <View style={styles.header}>
               <Entypo name="menu" size={35} color="white" />
                    <TextInput style={[styles.input, {outline: 'none'}]}
                        onChangeText={ text => {console.log(text)}}
                    />
                    <TouchableOpacity>
                        <Ionicons name="ios-search" size={24} color="white" />
                    </TouchableOpacity>
            </View>

            <View style={styles.body}>
                <FlatList 
                    data={pokemons}
                    scrollEnabled={true}
                    keyExtractor={key => key.name}  
                    renderItem={showPokemons}
                />
            </View>
            
        </SafeAreaView>
    )
}


function showPokemons(item) {
    console.log('sdfasdf')
    const { id, name, types } = item.item

    const pokemonTypes = types.map(typeName => typeName.type.name).join(' | ')
 


    console.log(types.map(typeName => typeName.type.name))

    const imageUrl = `https://pokeres.bastionbot.org/images/pokemon/${id}.png`
    
    return (
        <View style={[styles.card, styleCard(types[0].type.name)]}>
            <Image style={styles.pokemonImage} source={{uri: imageUrl}} />
            <View style={styles.info}>
                <Text style={{fontWeight: 'bold'}}>{id}. {name}</Text>
                <Text>{pokemonTypes}</Text>
            </View>
            <View style={styles.buttonFavorite}>
                <TouchableOpacity>
                    <MaterialIcons name="favorite-border" size={24} color="black" />
                </TouchableOpacity>
            </View>
        </View>
    )
}

function styleCard(type) {
    if (type == 'steel') {
        return styles.steel
    } else if (type == 'fire') {
        return styles.fire
    } else if (type == 'grass') {
        console.log(type)
        return styles.grass
    } else if (type == 'electric') {
        return styles.electric
    } else if (type == 'water') {
        return styles.water
    } else if (type == 'ice') {
        return styles.ice
    } else if (type == 'ground') {
        return styles.ground
    } else if (type == 'rock') {
        return styles.rock
    } else if (type == 'fairy') {
        return styles.fairy
    } else if (type == 'poison') {
        return styles.poison
    } else if (type == 'bug') {
        return styles.bug
    } else if (type == 'dragon') {
        return styles.dragon
    } else if (type == 'pyschic') {
        return styles.pyschic
    } else if (type == 'flying') {
        return styles.fire
    } else if (type == 'fighting') {
        return styles.fire
    } else {
        return styles.normal
    }
}