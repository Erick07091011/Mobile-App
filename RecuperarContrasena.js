import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TextInput, Button, Alert } from 'react-native';
import { supabase } from './supabase';

export default function RecuperarCorreo() {
  const [email, setEmail] = useState('');

  const handleRecuperar = async () => {
    if (!email) {
      Alert.alert("Error", "Ingresa tu correo");
      return;
    }

    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
  redirectTo: 'https://erick07091011.github.io/Mobile-App/'
});

    if (error) {
      Alert.alert("Error", error.message);
    } else {
      Alert.alert(
        "Éxito",
        "Se ha enviado un enlace a tu correo para restablecer la contraseña"
      );
    }
  };

  return (
    //Aquí tenemos los componentes de la ventana como texto, caja de texto y boton para recuperar contraseña y mandar correco electronico con link
    <ScrollView style={styles.container}>
      <View style={{ alignItems: 'center', marginTop: 50 }}>
        <Text style={styles.title}>Recuperar Contraseña</Text>
        <TextInput
          style={styles.input}
          placeholder="Correo electrónico"
          placeholderTextColor="white"
          value={email}
          onChangeText={setEmail}
        />
        <View style={{ marginTop: 20, width: 180 }}>
          <Button title="Enviar enlace" color="#3D84BA" onPress={handleRecuperar} />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'black' },
  title: { fontSize: 30, fontWeight: 'bold', color: 'white', marginBottom: 20 },
  input: {
    width: '90%',
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 8,
    color: 'white',
    paddingHorizontal: 15,
    paddingVertical: 8,
    fontSize: 16,
  },
});


