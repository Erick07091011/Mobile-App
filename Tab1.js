import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, TextInput, TouchableOpacity} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import Ventana_Principal from './Ventana_Principal';

export default class Tab1 extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }


  onPressEnviar = () => {
    console.log('Enviar');
  };

  render() {
    //Aquí tenemos los componentes de texto, grupo de texto, boton y caja de texto
    const image = require('./assets/mevi2.png');

    return (
      <ScrollView style={styles.back}>
        <View>
          <Image source={image} style={styles.logoPequeno} />
          <Text ></Text>
          <View style={styles.groupBox}>
          </View>

        <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Pregunta lo que necesites...."
          placeholderTextColor="white"
        />

         <TouchableOpacity style={styles.botoncircular} onPress={this.onPressEnviar}>
              <Ionicons name="arrow-forward" size={28} color="black" />
            </TouchableOpacity>
        </View>    
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  back: {
    backgroundColor: 'black',
  },

  input:{
  borderWidth: 1,
  borderColor: '#338AB0',
  borderRadius: 8,
  color: "white",
  paddingHorizontal: 15,
  paddingVertical: 10,
  marginHorizontal: 10,
  marginTop: 5,
  width: '80%',
  fontSize: 20,
  marginBottom: 10,
  marginTop: 0, 
  },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
    marginTop: 5,
  },

  logoPequeno: {
    width: 120,
    height: 29,
    alignSelf: 'center',
    marginTop: 50,
    marginLeft: 5,
  },

  groupBox: {
    borderWidth: 2,
    borderColor: '#338AB0',
    borderRadius: 8,
    padding: 40,
    marginHorizontal: 10,
    marginBottom: 5,
    paddingVertical: 250,
  },
  
  botoncircular: {
    backgroundColor: '#338AB0',
    marginLeft: 10,
    borderRadius: 25,
    width: 50,
    height: 50,
    justifyContent: 'center',
    borderRadius: 28,
    alignItems: 'center',
  },
  flecha: {
    color: 'black',
    fontSize: 24,
    fontWeight: 'bold',
  }
  
});

