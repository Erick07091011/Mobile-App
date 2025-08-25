import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Button, TouchableOpacity, TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';
import { supabase } from './supabase';

export default function Registro() {
  const navigation = useNavigation();

  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [genero, setGenero] = useState('');
  const [altura, setAltura] = useState('');
  const [peso, setPeso] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [showPicker, setShowPicker] = useState(false);

  const registrarUsuario = async () => {
    if (!nombre || !correo || !contrasena) {
      alert('Favor de completar todos los campos obligatorios.');
      return;
    }

    //Creamos usuario en tabal de authentication de Supabase 
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: correo,
      password: contrasena,
    });

    if (authError) {
      alert('Error al registrar usuario: ' + authError.message);
      return;
    }

    // Insertamos los datos adicionales en tabla personalizada, usando el id del usuario authentication de la tabla registro_usuario
    const { error: dbError } = await supabase.from('registro_usuario').insert([
      {
        id_usuario: authData.user.id,  //Aquí vinculamos el registro con el usuario autenticado
        nombre_completo: nombre,
        correo_electronico: correo,
        genero: genero,
        estatura: altura ? parseFloat(altura) : null,
        peso: peso ? parseInt(peso) : null,
        fecha_nacimiento: fechaNacimiento ? new Date(fechaNacimiento) : null
      }
    ]);

    if (dbError) {
      alert('Error al guardar datos adicionales: ' + dbError.message);

      return;
    }

    //Mandamos alerta a usuario de éxito
    alert('Usuario registrado con éxito. Revisa tu correo para confirmar la cuenta.');
    navigation.goBack();
  };

  return (
    //Aquí tenemos nuestro contenedor de componentes de la ventana como texto, cajas de texto, caja de lista y botones
    <ScrollView style={styles.atras}>
      <View style={{ alignItems: 'center', marginTop: 40 }}>
        <Text style={styles.titulo}>Registro</Text>

        <Text style={styles.subtitulo1}>Nombre Completo</Text>
        <TextInput
          style={styles.input}
          value={nombre}
          onChangeText={setNombre}
          placeholder="Roberto Martínez"
          placeholderTextColor="white"
        />

        <Text style={styles.subtitulo1}>Correo electrónico</Text>
        <TextInput
          style={styles.input}
          value={correo}
          onChangeText={setCorreo}
          placeholder="Correo electrónico"
          placeholderTextColor="white"
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Text style={styles.subtitulo1}>Contraseña</Text>
        <TextInput
          style={styles.input}
          value={contrasena}
          onChangeText={setContrasena}
          placeholder="********"
          placeholderTextColor="white"
          secureTextEntry
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
            value={new Date()}
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

        <View style={styles.btn1}>
          <Button title="Registrar" color="#3D84BA" onPress={registrarUsuario} />
        </View>

        <View style={styles.btn2}>
          <Button title="Cancelar" color="gray" onPress={() => navigation.goBack()} />
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
  btn1: {
    marginTop: 2,
    width: 100,
    marginLeft: 50,
    marginRight: 'auto',
  },
  btn2: {
    marginTop: -35,
    width: 100,
    height: 180,
    marginLeft: 'auto',
    marginRight: 50,
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
});

