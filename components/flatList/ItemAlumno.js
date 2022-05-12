import { Text, View, Image, TouchableOpacity, StyleSheet } from 'react-native';
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
function ItemAlumno({ item,index, mostrarDetalles }) {
  return (
    <TouchableOpacity onPress={()=>{
              mostrarDetalles({ datos : item });
          }}>
      <View style={styles(item.esPie).listItem}>
        <Text style={{backgroundColor:'#4285f4', color:'#fff', textAlign:'center',borderRadius:30, width:20, height:20, top:50}}>{index+1}</Text>
        <Image source={{uri:`https:\/\/drive.google.com\/uc?id=${item.foto}`}}  style={{width:60, height:60,borderRadius:30}} />
        <View style={{alignItems:"center",flex:1}}>
          <Text style={{fontWeight:"bold"}}>{item.nombres}</Text>
          <Text>{item.apPaterno+' '+item.apMaterno}</Text>
          <Text style={{fontWeight:"bold", color:"black"}}>{item.curso}</Text>
          <Text style={{backgroundColor:'#562990', color:'#fff', textAlign:'center',borderRadius:30, height:20}}> N° Matricula {item.numero} </Text>
          
          {item.fechaRetiro==undefined? null : <Text style={{fontWeight:"bold", color:"black"}}> Fecha retiro : <Text style={{fontWeight:"bold", color:"red"}}>{item.fechaRetiro}</Text></Text>} 
          {item.esPie=='SI'?<Text style={{fontWeight:"bold", color:"black", backgroundColor:'yellow'}}>PIE - {item.tipoPie}</Text>:null}
          {item.esAlumnoEspecial==true?<Text style={{fontWeight:"bold", color:"white", backgroundColor:'green'}}>SEMI PRESENCIAL</Text>:null}
        </View>
      </View>
    </TouchableOpacity>
  );
}
export default ItemAlumno;