import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Alumnos from './navigation/Alumnos';
import DetalleAlumno from './navigation/DetalleAlumno';
import Maps from './maps/Maps'
/*
Dependencias react navigation
yarn add @react-navigation/native
yarn add react-native-screens react-native-safe-area-context
yarn add @react-navigation/native-stack
npm i react-native-table-component
npm i react-native-easy-grid
*/
const Stack = createNativeStackNavigator();

function Inicio() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Alumnos" component={Alumnos} />
        <Stack.Screen name="Detalle" component={DetalleAlumno} />
        <Stack.Screen name="Mapa" component={Maps} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default Inicio;