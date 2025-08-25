import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, Button, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useFocusEffect, useNavigation } from '@react-navigation/native'; // useFocusEffect para recargar al volver
import { supabase } from './supabase';

export default function Tab3() {
  const [image, setImage] = useState(null); // Esta es la URI local seleccionada para la imagen o foto
  const [loading, setLoading] = useState(true);
  const [perfil, setPerfil] = useState(null);
  const navigation = useNavigation();

  const obtenerPerfil = async () => {
    try {
      setLoading(true);
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError) throw userError;

      if (!user) {
        console.log("No hay usuario logueado");
        setPerfil(null);
        return;
      }

      const { data, error } = await supabase
        .from('registro_usuario')
        .select('*')
        .eq('id_usuario', user.id)
        .single();

      if (error) throw error;

      setPerfil(data);
      setImage(null); //Aquí reseteamos la imagen local para que muestre la del perfil guardado
    } catch (error) {
      console.error("Error obteniendo perfil:", error.message);
      Alert.alert('Error', 'No se pudo cargar el perfil');
    } finally {
      setLoading(false);
    }
  };

  //Aquí recargamos el perfil cada vez que la pantalla esté enfocada (vuelvas de editar)
  useFocusEffect(
    useCallback(() => {
      obtenerPerfil();
    }, [])
  );

  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      alert('Permiso requerido para acceder a las imágenes');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri); // Imagen local seleccionada
    }
  };

  const btnClick1 = () => {
    navigation.navigate("Editar");
  };

const eliminarCuenta = async () => {
  try {
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError) throw userError;
    if (!user) {
      Alert.alert("Error", "No hay usuario autenticado");
      return;
    }

    const session = await supabase.auth.getSession();
    const accessToken = session.data.session?.access_token;

    const res = await fetch(
      "https://vlmumyosvxmmmfflklwk.supabase.co/functions/v1/delete-user",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ userId: user.id }),
      }
    );

    const result = await res.json();
    console.log("Respuesta función Edge:", result);

    if (!res.ok) throw new Error(result.error || "Error eliminando usuario");

    await supabase.auth.signOut();

    Alert.alert("Cuenta eliminada", "Tu cuenta ha sido eliminada correctamente.");
    navigation.navigate("Login");

  } catch (error) {
    console.error("Error eliminando cuenta:", error.message);
    Alert.alert("Error", "No se pudo eliminar la cuenta.");
  }
};

//Esta funcion nos ayuda a confirmar la eliminacion de la cuenta
  const confirmarEliminarCuenta = () => {
    Alert.alert(
      "Eliminar cuenta",
      "¿Seguro que deseas eliminar tu cuenta? Esta acción no se puede deshacer.",
      [
        { text: "No", style: "cancel" },
        { text: "Sí", style: "destructive", onPress: eliminarCuenta }
      ]
    );
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'black' }}>
        <ActivityIndicator size="large" color="white" />
      </View>
    );
  }

  return (
    //Aquí tenemos nuestros componentes de la ventana para visualizar los datos del perfil del usuario así como los botnes EDITAR Y ELIMINAR
    <ScrollView style={styles.atras}>
      <View style={{ alignItems: 'center', marginTop: 40 }}>
        <Text style={styles.titulo}>Perfil</Text>

        <TouchableOpacity onPress={pickImage}>
          {image ? (
            <Image source={{ uri: image }} style={styles.image} />
          ) : perfil?.imagen_perfil ? (
            <Image source={{ uri: perfil.imagen_perfil }} style={styles.image} />
          ) : (
            <MaterialCommunityIcons name="account-circle" size={120} color="gray" />
          )}
        </TouchableOpacity>

        <Text style={styles.subtitulo1}>Nombre</Text>
        <Text style={styles.subtitulo2}>{perfil?.nombre_completo || 'No registrado'}</Text>

        <Text style={styles.subtitulo1}>Género</Text>
        <Text style={styles.subtitulo2}>{perfil?.genero || 'No registrado'}</Text>

        <Text style={styles.subtitulo1}>Estatura</Text>
        <Text style={styles.subtitulo2}>{perfil?.estatura || 'No registrado'}</Text>

        <Text style={styles.subtitulo1}>Peso</Text>
        <Text style={styles.subtitulo2}>{perfil?.peso || 'No registrado'}</Text>

        <Text style={styles.subtitulo1}>Fecha de Nacimiento</Text>
        <Text style={styles.subtitulo2}>{perfil?.fecha_nacimiento || 'No registrado'}</Text>

        <View style={styles.buttonRow}>
          <View style={styles.buttonContainer}>
            <Button title="Editar" onPress={btnClick1} color="#3D84BA" />
          </View>

          <View style={styles.buttonContainer}>
            <Button title="Eliminar cuenta" color="red" onPress={confirmarEliminarCuenta} />
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
    color: "white",
    marginBottom: 20,
  },
  atras: {
    backgroundColor: 'black',
    flex: 1,
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
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
  subtitulo2: {
    marginRight: 'auto',
    marginLeft: 10,
    marginBottom: 10,
    fontSize: 15,
    color: "white",
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

