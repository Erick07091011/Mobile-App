import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { supabase } from './supabase';
import * as Linking from 'expo-linking';

export default function CambiarContrasena() {
  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  // Detectar token del deep link
  useEffect(() => {
    const getUrl = async () => {
      const url = await Linking.getInitialURL();
      if (url) {
        const { queryParams } = Linking.parse(url);
        if (queryParams?.access_token) setToken(queryParams.access_token);
        if (queryParams?.email) setEmail(queryParams.email);
      }
    };
    getUrl();
  }, []);

  const handleCambiar = async () => {
    if (!password || !confirm) {
      Alert.alert("Error", "Completa ambos campos");
      return;
    }
    if (password !== confirm) {
      Alert.alert("Error", "Las contraseñas no coinciden");
      return;
    }
    if (!token) {
      Alert.alert("Error", "No se detectó token de recuperación");
      return;
    }

    const { error } = await supabase.auth.updateUser(
      { password },
      { accessToken: token }
    );

    if (error) {
      Alert.alert("Error", error.message);
    } else {
      Alert.alert("Éxito", "Contraseña actualizada correctamente");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.email}>Correo: {email}</Text>
      <TextInput
        style={styles.input}
        placeholder="Nueva contraseña"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirmar contraseña"
        secureTextEntry
        value={confirm}
        onChangeText={setConfirm}
      />
      <View style={{ marginTop: 20 }}>
        <Button title="Cambiar contraseña" onPress={handleCambiar} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'black', padding: 20 },
  email: { color: 'white', fontWeight: 'bold', marginBottom: 15 },
  input: {
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 8,
    color: 'white',
    padding: 10,
    marginVertical: 10,
  },
});

