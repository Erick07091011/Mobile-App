import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, Button, TouchableOpacity, TextInput, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { supabase } from './supabase';

export default function Editar() {
  const [image, setImage] = useState(null); // Aquí guardaremos base64 con prefijo data:image/jpeg;base64,...
  const [uploading, setUploading] = useState(false);
  const navigation = useNavigation(); //Aquí usamos la navegacion de la app con el usuario
  const [input1, setInput1] = useState(''); 
  const [genero, setGenero] = useState(''); //Aquí cargamos el dato genero
  const [altura, setAltura] = useState(''); //Aquí cargamos el dato altura
  const [peso, setPeso] = useState(''); //Aquí cargamos el dato peso
  const [fechaNacimiento, setFechaNacimiento] = useState(''); //Aquí cargamos el dato fecha de nacimiento
  const [showPicker, setShowPicker] = useState(false); //Aquí cargamos el componente de seleccion de imagen
  const [imagenPerfilUrl, setImagenPerfilUrl] = useState(null); //Con esta variable cargamos la imagen de perfil

  useEffect(() => {
    cargarPerfil();
  }, []);

 //Esta funcion ayuda a cargar el perfil completo del usuario en la ventana de Perfil
  const cargarPerfil = async () => {
    try {
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError) throw userError;
      if (!user) {
        Alert.alert('Error', 'No hay usuario logueado');
        return;
      }

      const { data, error } = await supabase
        .from('registro_usuario')
        .select('*')
        .eq('id_usuario', user.id)
        .single();

      if (error) throw error;

      setInput1(data.nombre_completo || '');
      setGenero(data.genero || '');
      setAltura(data.estatura ? String(data.estatura) : '');
      setPeso(data.peso ? String(data.peso) : '');
      setFechaNacimiento(data.fecha_nacimiento || '');

      // Si ya existe imagen base64 guardada, la mostramos directamente
      if (data.imagen_perfil && data.imagen_perfil.startsWith('data:image')) {
        setImage(data.imagen_perfil);
        setImagenPerfilUrl(null);
      } else {
        setImagenPerfilUrl(null);
      }
    } catch (error) {
      console.error('Error cargando perfil:', error.message);
      Alert.alert('Error', 'No se pudo cargar el perfil');
    }
  };

  // Función para seleccionar imagen del dispositivo y obtener base64
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
      base64: true, // IMPORTANTE para obtener base64
    });

    if (!result.canceled) {
      // Guardamos la imagen como URI base64 para mostrar y guardar
      setImage(`data:image/jpeg;base64,${result.assets[0].base64}`);
    }
  };

//Esta funcion nos ayuda a actualizar los datos ingresados en las cajas de texto para modificar los datos del usuario en su perfil
  const guardarCambios = async () => {
    try {
      setUploading(true);

      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError) throw userError;
      if (!user) {
        Alert.alert('Error', 'No hay usuario logueado');
        setUploading(false);
        return;
      }

      // Aquí actualizamos con base64 directamente en imagen_perfil la foto del perfil del usuario
      const { error } = await supabase
        .from('registro_usuario')
        .update({
          nombre_completo: input1,
          genero: genero,
          estatura: parseFloat(altura) || null,
          peso: parseFloat(peso) || null,
          fecha_nacimiento: fechaNacimiento,
          imagen_perfil: image,
        })
        .eq('id_usuario', user.id);

      setUploading(false);

      if (error) throw error;

    //Aquí mandamos mensajes de alerta al usuario
      Alert.alert('Éxito', 'Perfil actualizado correctamente');
      navigation.goBack();
    } catch (error) {
      setUploading(false);
      console.error('Error actualizando perfil:', error.message);
      Alert.alert('Error', 'No se pudo actualizar el perfil');
    }
  };

  return (
    //En esta parte se muestran todos los componentes de texto y cajas de texto así como los botones en la ventana
    <ScrollView style={styles.atras}>
      <View style={{ alignItems: 'center', marginTop: 40 }}>
        <Text style={styles.titulo}>Perfil</Text>

        <TouchableOpacity onPress={pickImage}>
          {image ? (
            <Image source={{ uri: image }} style={styles.image} />
          ) : imagenPerfilUrl ? (
            <Image source={{ uri: imagenPerfilUrl }} style={styles.image} />
          ) : (
            <MaterialCommunityIcons name="account-circle" size={120} color="gray" />
          )}
        </TouchableOpacity>

        <Button title={uploading ? 'Guardando...' : 'Seleccionar foto de perfil'} onPress={pickImage} color="#888" disabled={uploading} />

        <Text style={styles.subtitulo1}>Nombre</Text>
        <TextInput
          style={styles.input}
          value={input1}
          onChangeText={setInput1}
          placeholder="Roberto Martínez"
          placeholderTextColor="white"
        />

        <Text style={styles.subtitulo1}>Género</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={genero}
            onValueChange={(itemValue) => setGenero(itemValue)}
            style={styles.picker}
            dropdownIconColor="white"
          >
            <Picker.Item label="Seleccione una opción" value="" />
            <Picker.Item label="Masculino" value="Masculino" />
            <Picker.Item label="Femenino" value="Femenino" />
          </Picker>
        </View>

        <Text style={styles.subtitulo1}>Estatura</Text>
        <TextInput
          style={styles.input}
          value={altura}
          onChangeText={setAltura}
          placeholder="1.65"
          placeholderTextColor="white"
          keyboardType="numeric"
        />

        <Text style={styles.subtitulo1}>Peso</Text>
        <TextInput
          style={styles.input}
          value={peso}
          onChangeText={setPeso}
          placeholder="67"
          placeholderTextColor="white"
          keyboardType="numeric"
        />

        <Text style={styles.subtitulo1}>Fecha de Nacimiento</Text>

        <TouchableOpacity style={styles.input} onPress={() => setShowPicker(true)}>
          <Text style={{ color: 'white' }}>
            {fechaNacimiento ? fechaNacimiento : 'Selecciona una fecha'}
          </Text>
        </TouchableOpacity>

        {showPicker && (
          <DateTimePicker
            value={fechaNacimiento ? new Date(fechaNacimiento) : new Date()}
            mode="date"
            display="default"
            onChange={(event, selectedDate) => {
              setShowPicker(false);
              if (event.type === 'set') {
                const currentDate = selectedDate || new Date();
                setFechaNacimiento(currentDate.toISOString().split('T')[0]);
              }
            }}
          />
        )}

        <View style={styles.buttonRow}>
        <View style={styles.buttonContainer}>
          <Button title="Guardar" color="#3D84BA" onPress={guardarCambios} disabled={uploading} />
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
  image: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
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
  pickerContainer: {
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 8,
    marginHorizontal: 10,
    width: '90%',
    marginBottom: 10,
  },
  picker: {
    color: 'white',
    height: 50,
    width: '100%',
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


