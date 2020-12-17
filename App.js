import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { MaterialCommunityIcons, MaterialIcons  } from '@expo/vector-icons';


import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';


import register from './src/pages/register';
import login from './src/pages/login';
import dashboard from './src/pages/dashboard';
import favorite from './src/pages/favorite'


const Stack = createStackNavigator()

const Tab = createMaterialBottomTabNavigator()


export default function App() {
  return (
   <NavigationContainer>
     <Stack.Navigator initialRouteName={"Dashboard"}>
       <Stack.Screen
        name={'Register'}
        component={register}
        options={{ headerShown: false }}
       />

       <Stack.Screen 
        name={'Login'}
        component={login}
        options={{ headerShown: false }}
       />

      <Stack.Screen
        name={'Dashboard'}
        component={MyTabs}
        options={{ headerShown: false}}
      />
     </Stack.Navigator>
   </NavigationContainer>
  );
}

function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName='Dashboard'
      activeColor='#08173B'
      inactiveColor='rgba(215, 215, 215, 1)'
      shifting={true}
      barStyle={{ borderTopWidth: 1, borderColor: 'rgba(0, 0, 0, 0.5)'}}
    >
      <Tab.Screen
        name='Dashboard'
        component={dashboard}
        options={{
          tabBarLabel: 'Home',
          tabBarColor: '#fff',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />

      <Tab.Screen 
      name="Favorite" 
      component={favorite} 
      options={{
        tabBarLabel: 'Favorites',
        tabBarColor: '#fff',
        tabBarIcon: ({ color,  focused }) => (
          <MaterialIcons name={ focused ? "favorite" : "favorite-border"} size={24} color={color} />
        )
      }} />
    </Tab.Navigator>
  );
}
