import React from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import ItemJustificacion from './ItemJustificacion';

const ListaJustificaciones = ({ justificaciones })=> {
    return (
      <>
        <View style={styles.container}>
          <FlatList
            style={{flex:1}}
            data={justificaciones}
            renderItem={({ item, index }) => <ItemJustificacion item={item} index={index}/>}
            keyExtractor={item => item.rut+'-'+Math.random().toString(36).substr(2, 18)}
          />
        </View>
      </>
      
    );
}
 export default ListaJustificaciones;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
    marginTop:1,
    marginBottom : 0
  }
});