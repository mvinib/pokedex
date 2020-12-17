import React, {useState, useEffect} from 'react'
import { View, Text, Image, FlatList } from 'react-native'

export default function favorite() {

    const [pokemonsPromises, setPokemonsPromises] = useState([])
    const [pokemonsName, setPokemonsName] = useState([])
    const [pokemonsId, setPokemonsId] = useState([])

    const [pokemonsTeste, setPokemonsTeste] = useState([])

    useEffect(() => {
        for (let i = 1; i < 10; i++) {
            const url = `https://pokeapi.co/api/v2/pokemon/${i}`
            pokemonsPromises.push(fetch(url)
            .then(response => response.json()))
        }

        Promise.all(pokemonsPromises)
            .then(response => {
                response.map( item => {
                    pokemonsName.push(item.name)
                    pokemonsId.push(item.id)

                   
                })
            })
    }, [])

    useEffect(() => {
        console.log(pokemonsName)
        pokemonsName.map( pokemons => {
            pokemonsTeste.push({name: pokemons})
        })
    }, [pokemonsName])

    useEffect(() => {
        console.log(pokemonsId)
    }, [pokemonsId])

    useEffect(() => {
        console.log('vtnc lixo', pokemonsTeste)
    }, [pokemonsTeste])

    return (
        <View>
            <Text>Favorito</Text>
            <FlatList 
                    data={pokemonsTeste}
                    scrollEnabled={true}
                    //keyExtractor={key => key.name}
                    
                    renderItem={(obj)=>{
                        return(
                          <View>
                            <Text>{obj.name}</Text>
                          </View>
                        )
                      }}
                />
        </View>
    )
}



function showPokemons(item) {
    console.log(item)
    const VAIFDPDOKRL = item.item
    //const { id } = item
//const imageUrl = `https://pokeres.bastionbot.org/images/pokemon/${id}.png`

    return (
        <View style={{flex: 1, flexDirection: 'row'}}>
           {/*  <Image style={{width: 60, height: 60}} source={{uri: imageUrl}} /> */}
            <Text>{VAIFDPDOKRL}</Text>
        </View>
    )
}