import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Button, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { supabase } from './supabase';

export default function InSesion() {
  //Aquí cargamos los datos de inicio de sesion para el usuario
  const navigation = useNavigation();
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');

  //Aquí nos redirige a la ventana de Registro para un usuario nuevo
  const btnClick1 = () => {
    navigation.navigate("Registro");
  };

  const handleLogin = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: input1,
      password: input2,
    });

    //Aquí si no se inicia sesion con las credenciales correctas manda una alerta o de usuario no registrado así como de iniciar sesion correctamente nos redirige a la ventana principal de la app
    if (error) {
      alert('Error en inicio de sesión: ' + error.message);
    } else {
      navigation.replace('Principal');
    }
  };

  //Aquí nos redirige a la ventana para recuperar contraseña con el correo electronico
  const handleRecuperar = () => {
    navigation.navigate("RecuperarContrasena");
  };

  return (
    //Aquí tenemos nuestro contenedor de componentes de la ventana como texto, cajas de texto y botones
    <ScrollView style={styles.atras}>
      <View style={{ alignItems: 'center', marginTop: 40 }}>
        <Text style={styles.titulo}>Inicio de Sesión</Text>

        <Text style={styles.subtitulo1}>Correo electrónico</Text>
        <TextInput
          style={styles.input}
          value={input1}
          onChangeText={setInput1}
          placeholder="Correo electrónico"
          placeholderTextColor="white"
        />

        <Text style={styles.subtitulo1}>Contraseña</Text>
        <TextInput
          style={styles.input}
          value={input2}
          onChangeText={setInput2}
          placeholder="Contraseña"
          placeholderTextColor="white"
          secureTextEntry
        />
        <View style={styles.buttonRow}>
        <View style={styles.buttonContainer}>
          <Button title="Registrar" color="#3D84BA" onPress={btnClick1} />
        </View>

        <View style={styles.buttonContainer}>
          <Button title="Iniciar Sesión" color="gray" onPress={handleLogin} />
        </View>
        </View>

        <View style={styles.filaEnlace}>
          <Text style={styles.subtitulo2}>¿Olvidaste tu contraseña?</Text>
          <TouchableOpacity onPress={handleRecuperar}>
            <Text style={styles.enlace}>Recuperar contraseña</Text>
          </TouchableOpacity>
        </View>

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  titulo: {
    fontWeight: 'bold',
    fontSize: 40,
    color: "white",
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
    color: "white",
  },
  subtitulo2: {
    fontWeight: 'bold',
    fontSize: 15,
    color: "white",
  },
  enlace: {
    fontSize: 15,
    color: "#3D84BA",
    marginLeft: 6,
    borderBottomWidth: 1,
    borderBottomColor: "#3D84BA",
    paddingBottom: 2,
  },
  filaEnlace: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 50,
    marginBottom: 20,
    marginLeft: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 8,
    color: "white",
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

