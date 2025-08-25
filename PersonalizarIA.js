import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Button, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function PersonalizarIA() {
  const navigation = useNavigation();
  const [uploading, setUploading] = useState(false); 

  return (
    //Aquí tenemos el contenedor de nuestros componentes de la ventana de personalizar MEVI como cajas de texto y texto así como los botones de la ventana 
    <ScrollView style={styles.atras}>
      <View style={{ alignItems: 'center', marginTop: 40 }}>
        <Text style={styles.titulo}>Personalizar MEVI</Text>

        <Text style={styles.subtitulo1}>¿Cómo te gustaría que te llamara MEVI?</Text>
        <TextInput
          style={styles.input}
          placeholder="Nombre"
          placeholderTextColor="white"
        />

        <Text style={styles.subtitulo1}>¿De qué tema te gustaría que te hablara MEVI?</Text>
        <TextInput
          style={styles.input}
          placeholder="Tecnología, Salud, Belleza..."
          placeholderTextColor="white"
        />

        <Text style={styles.subtitulo1}>¿Qué personalidad te gustaría que tuviera MEVI?</Text>
        <TextInput
          style={styles.input}
          placeholder="Robótico, Directo, Sarcástico..."
          placeholderTextColor="white"
        />

        <View style={styles.buttonRow}>
          <View style={styles.buttonContainer}>
            <Button title="Guardar Cambios" color="#3D84BA" onPress={() => { /* aquí tu lógica */ }} />
          </View>

          <View style={styles.buttonContainer}>
            <Button title="Cancelar" color="gray" onPress={() => navigation.goBack()} disabled={uploading} />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  titulo: {
    fontWeight: 'bold',
    fontSize: 40,
    color: 'white',
    marginBottom: 20,
  },
  atras: {
    backgroundColor: 'black',
    flex: 1,
  },
  subtitulo1: {
    marginRight: 'auto',
    marginLeft: 10,
    marginTop: 10,
    marginBottom: 20,
    fontWeight: 'bold',
    fontSize: 20,
    color: 'white',
  },
  input: {
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 8,
    color: 'white',
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginHorizontal: 10,
    width: '90%',
    fontSize: 16,
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

