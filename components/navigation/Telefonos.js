//import { Text } from 'react-native';
import React from 'react';
import { View, StyleSheet, Text, Alert, Linking } from 'react-native';
import { Col, Row, Grid } from 'react-native-easy-grid';

const llamar = (tel)=>{
    Alert.alert ('Telefono : '+tel, '¿Que desea hacer?',
        [
            {text: 'Cancelar', onPress: () => {/*console.log ('Cancelar')*/}},
            {text: 'Llamar', onPress: () => {
                                        Linking.canOpenURL('tel: '+tel).then((supported) => {
                                        if (!supported) {
                                            console.log('Can not handle tel:' + tel)
                                        } else {
                                            return Linking.openURL('tel: '+tel)
                                        }
                                        }).catch(error => console.log('tel error', error))
                             } 
            }])
}
const Telefonos=({ telefonos })=>{
    var vectorTelefonos = telefonos.split(' ');
    var listadoContactos = [];
    var telefonoMomentaneo = '';
    var contactoMomentaneo = '';
    //56986530713 ALUMNO LLAMADAS 979774426 Aumno WHATSAPP 949085872 Madre 983942812 Padre
    for(var x=0;x<vectorTelefonos.length;x++){
        if(!isNaN(vectorTelefonos[x])){//Si es numerico
            if(contactoMomentaneo.length>0){
                listadoContactos.push({
                    contacto : contactoMomentaneo,
                    telefono : telefonoMomentaneo
                });
                telefonoMomentaneo = '';
                contactoMomentaneo = '';
            }
            telefonoMomentaneo = vectorTelefonos[x];
        }else{
            contactoMomentaneo += vectorTelefonos[x]+" ";
        }
        if((x+1)==vectorTelefonos.length){
            listadoContactos.push({
                contacto : contactoMomentaneo,
                telefono : telefonoMomentaneo
            });
            telefonoMomentaneo = '';
            contactoMomentaneo = '';
        }
    }
    
    return (
        <>
            <View style={styles.container}>
                <Grid>
                    <Col size={35}>
                    <Row style={styles.cell}>
                        <Text style={{fontWeight:'bold'}}>CONTACTO</Text>
                    </Row>
                    {
                        listadoContactos.map((item,key)=>{
                            return (
                                <Row style={styles.cell} key={key}>
                                    <Text>{item.contacto}</Text>
                                </Row>
                            );
                        })
                    }
                    </Col>
                    <Col size={50}>
                    <Row style={styles.cell}>
                        <Text style={{fontWeight:'bold'}}>FONO</Text>
                    </Row>
                    {
                        listadoContactos.map((item,key)=>{
                            return (
                                <Row style={styles.cell} key={key}>
                                    <Text onPress={()=>llamar(item.telefono)}>{item.telefono}</Text>
                                </Row>
                            );
                        })
                    }
                    </Col>
                </Grid>
            </View>
        </>
        
        
    )
}
export default Telefonos;

const styles = StyleSheet.create({
    container: {
      width: '100%',
      height: 300,
      padding: 16,
      paddingTop: 0,
      backgroundColor: '#fff',
    },
    cell: {
      borderWidth: 1,
      borderColor: '#ddd',
      flex: 1, 
      justifyContent: 'center',
      alignItems: 'center'
    },
  });