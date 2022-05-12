import { Text, View, TouchableOpacity, StyleSheet, Linking } from 'react-native';
const styles = (esPie) => {
  let backgroundColor = '#FFF';
  if(esPie=='SI'){
    backgroundColor = '#ffff00';
  }
  return  StyleSheet.create({
      listItem:{
          margin:10,
          padding:10,
          width:"95%",
          flex:1,
          alignSelf:"center",
          flexDirection:"row",
          borderRadius:5,
          backgroundColor : backgroundColor
      }
  })
};
function ItemJustificacion({ item,index }) {
  const fechaInicio = new Date(item.fechaInicio);
  const inicio = fechaInicio.getDate()+'/'+(fechaInicio.getMonth()+1);
  const fechaFinal = new Date(item.fechaFinal);
  const final = fechaFinal.getDate()+'/'+(fechaFinal.getMonth()+1);
  return (
    <TouchableOpacity onPress={()=>{
      item.documento==''? null :
      Linking.openURL(item.documento);
      }}>
      <View style={styles(item.esPie).listItem}>
        <View style={{alignItems:"center",flex:1}}>
          <Text style={{justifyContent:'center'}}>{item.justificacion}</Text>
          <Text style={{fontWeight:"bold", color:"black"}}>{inicio+' al '+final}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
export default ItemJustificacion;