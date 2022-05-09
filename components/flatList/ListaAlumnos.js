import React, { useState } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import ItemAlumno from './ItemAlumno';

const ListaAlumnos = ({ mostrarDetalles, alumnos })=> {

    /*var datos = alumnos.map((alumno=>{
      var foto = fotos.find(foto => alumno.rut===foto.rut);
      if(foto){
        foto = foto.foto;
      }
      return {
        ...alumno,
        foto : foto
      }
    }));*/
    //const [data,setData] = useState(datos);
    return (
      <>
        <View style={styles.container}>
          <FlatList
            style={{flex:1}}
            data={alumnos}
            renderItem={({ item, index }) => <ItemAlumno item={item} index={index} mostrarDetalles={mostrarDetalles}/>}
            keyExtractor={item => item.rut+'-'+Math.random().toString(36).substr(2, 18)}
          />
        </View>
        <View>
          
        </View>
      </>
      
    );
}
 export default ListaAlumnos;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
    marginTop:1,
    marginBottom : 0
  }
});