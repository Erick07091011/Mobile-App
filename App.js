import React, { useEffect, useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Linking from 'expo-linking';

// Aquí hago la importación de las pantallas que se usan en la navegación de la app
import AssetExample from './components/AssetExample';
import Ventana_Principal from './Ventana_Principal';
import Editar from './Editar';
import Registro from './Registro';
import InSesion from './InSesion';
import RecuperarContrasena from './RecuperarContrasena';
import PersonalizarIA from './PersonalizarIA';
import CambiarContrasena from './CambiarContrasena';

// Aquí creo el stack de navegación
const Stack = createNativeStackNavigator();

export default function App() {
  const navigationRef = useRef();

  useEffect(() => {
    const handleDeepLink = ({ url }) => {
      const { queryParams } = Linking.parse(url);
      console.log('URL recibida:', url);
      console.log('Parámetros:', queryParams);

    // Aquí se toma el token para navegar a la pantalla de "CambiarContrasena"
      if (queryParams?.access_token) {
        navigationRef.current?.navigate('CambiarContrasena', { accessToken: queryParams.access_token });
      }
    };

    const subscription = Linking.addEventListener('url', handleDeepLink);

    Linking.getInitialURL().then((url) => {
      if (url) handleDeepLink({ url });
    });

    return () => {
      subscription.remove();
    };
  }, []);

  return (
    // Este es el contenedor principal de la navegación de ventanas para la app
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={AssetExample} />
        <Stack.Screen name="Login" component={InSesion} />
        <Stack.Screen name="Registro" component={Registro} />
        <Stack.Screen name="Principal" component={Ventana_Principal} />
        <Stack.Screen name="Editar" component={Editar} />
        <Stack.Screen name="RecuperarContrasena" component={RecuperarContrasena} />
        <Stack.Screen name="CambiarContrasena" component={CambiarContrasena} />
        <Stack.Screen name="PersonalizarIA" component={PersonalizarIA} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

