import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Button } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import PersonalizarIA from './PersonalizarIA';

export default function Tab2() {
  const navigation = useNavigation();
  const [personalidad, setPersonalidad] = useState("");
  const [tema, setTema] = useState("");

  const irAPersonalizar = () => {
    navigation.navigate("PersonalizarIA");
  };

  return (

    //Aquí tenemos los componentes de nuestra ventana donde personalizamos MEVI como botones, cajas de texto y lista de caja
    <ScrollView style={styles.back}>
      <View style={{ alignItems: 'center', marginTop: 40 }}>
        <Text style={styles.titulo}>Configuración</Text>

        <Text style={styles.subtitulo1}>Personalidades para MEVI</Text>
        <View style={styles.pickerContainer}>
          <Picker
            style={styles.picker}
            dropdownIconColor="white"
            mode="dropdown"
            selectedValue={personalidad}
            onValueChange={(itemValue) => setPersonalidad(itemValue)}
          >
            <Picker.Item label="Seleccione una Personalidad para MEVI" value="" />
            <Picker.Item label="Personalidad 1" value="1" />
            <Picker.Item label="Personalidad 2" value="2" />
            <Picker.Item label="Personalidad 3" value="3" />
          </Picker>
        </View>

        <Text style={styles.subtitulo1}>Temas</Text>
        <View style={styles.pickerContainer}>
          <Picker
            style={styles.picker}
            dropdownIconColor="white"
            mode="dropdown"
            selectedValue={tema}
            onValueChange={(itemValue) => setTema(itemValue)}
          >
            <Picker.Item label="Seleccione un tema para la app" value="" />
            <Picker.Item label="Oscuro" value="oscuro" />
            <Picker.Item label="Claro" value="claro" />
          </Picker>
        </View>

        <View style={styles.buttonRow}>
          <View style={styles.buttonContainer}>
            <Button title="Guardar Cambios" color="#3D84BA" onPress={() => alert("Cambios guardados")} />
          </View>

          <View style={styles.buttonContainer}>
            <Button title="Personalizar" color="gray" onPress={irAPersonalizar} />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  back: {
    backgroundColor: 'black',
  },
  titulo: {
    fontWeight: 'bold',
    fontSize: 40,
    color: "white",
    marginBottom: 20,
  },
  subtitulo1: {
    marginRight: 'auto',
    marginLeft: 10,
    marginTop: 1,
    marginBottom: 6,
    fontWeight: 'bold',
    fontSize: 20,
    color: "white",
  },
  picker: {
    color: 'white',
    height: 50,
    width: '100%',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 8,
    marginHorizontal: 10,
    width: '90%',
    marginBottom: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    marginTop: 20,
  },
  buttonContainer: {
    flex: 1,
    marginHorizontal: 5,
  },
});
