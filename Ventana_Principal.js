import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, TextInput } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import TAB1 from './Tab1';
import TAB2 from './Tab2';
import TAB3 from './Tab3';

export default class Prueba extends Component {
  //modificar nombre de clase
  constructor(props) {
    super(props);
    this.state = {
      input1: '',
    };
  }

  render() {
    //Aquí tenemos los componentes de nuestra barra de navegacion en la parte baja de la pantalla dentro de la app
    const Tab = createBottomTabNavigator();
    return (
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: {
          backgroundColor: 'black', 
          borderTopWidth: 0, 
          },
          tabBarActiveTintColor: 'white',    
          tabBarInactiveTintColor: 'gray', 
          headerShown: false,
          
        }}>
        <Tab.Screen
          name="Inicio"
          component={TAB1}
          options={{
            headerShown: false,
            tabBarLabel: 'inicio',
            tabBarIcon: ({ stext }) => (
              <Ionicons name="home" color="white" size={30} />
            ),
          }}
        />

        <Tab.Screen
          name="Configuracion"
          component={TAB2}
          options={{
            headerShown: false,
            tabBarLabel: 'configuracion',
            tabBarIcon: ({ stext }) => (
              <Ionicons name="settings" color="white" size={30} />
            ),
          }}
        />

        <Tab.Screen
          name="Cuenta"
          component={TAB3}
          options={{
            headerShown: false,
            tabBarLabel: 'cuenta',
            tabBarIcon: ({ stext }) => (
              <Ionicons name="person" color="white" size={30} />
            ),
          }}
        />
      </Tab.Navigator>
    );
  }
}

const styles = StyleSheet.create({});
