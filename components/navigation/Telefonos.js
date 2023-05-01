//import { Text } from 'react-native';
import React from 'react';
import { View, StyleSheet, Text, Alert, Linking } from 'react-native';
import { Col, Row, Grid } from 'react-native-easy-grid';
const alertaError = (text)=>{
    Alert.alert('Error', text, [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
}
const llamar = (tel, nombreCompleto)=>{
    Alert.alert ('Telefono : '+tel, '¿Que desea hacer?',
        [
            {text: 'Cancelar', onPress: () => {/*console.log ('Cancelar')*/}},
            {text: 'Llamar', onPress: () => {
                                        if(tel.length===11){//Celular 56967052104
                                            tel = `+${tel}`;
                                        }else if(tel.length===9){//celular sin codigo 967052104
                                            tel = `+56${tel}`;
                                        }
                                        try {
                                            return Linking.openURL('tel:/'+tel+'/');
                                        } catch (error) {
                                            return alertaError('Error :' + error);
                                        }
                                        
                                        /*Linking.canOpenURL('tel:/'+tel+'/').then((supported) => {
                                        if (!supported) {
                                            alertaError('Can not handle tel:' + tel)
                                        } else {
                                            return Linking.openURL('tel:/'+tel+'/')
                                        }
                                        }).catch(error => alertaError(error))*/
                             } 
            },
            {text: 'Whatsapp', onPress: () => {
                            if(tel.length===11){//Celular 56967052104
                                tel = `+${tel}`.replaceAll(' ','');
                            }else if(tel.length===9){//celular sin codigo 967052104
                                tel = `+56${tel}`.replaceAll(' ','');
                            }else{
                                
                            }
                            try {
                                return Linking.openURL(`whatsapp://send?text=${encodeURIComponent(`Estimad@ ${nombreCompleto}`)}&phone=${tel}`);
                            } catch (error) {
                                return alertaError('Error :' + error);
                            }
                            
                            /*Linking.canOpenURL(`whatsapp://send?text=${encodeURIComponent(`Estimad@ ${nombreCompleto}`)}&phone=${tel}`).then((supported) => {
                            if (!supported) {
                                alertaError('Can not handle tel:' + tel)
                                alertaError(`whatsapp://send?text=${encodeURIComponent(`Estimad@ ${nombreCompleto}`)}&phone=${tel}`)
                            } else {
                                return Linking.openURL(`whatsapp://send?text=${encodeURIComponent(`Estimad@ ${nombreCompleto}`)}&phone=${tel}`)
                            }
                            }).catch(error => alertaError(error))*/
                } 
            }
        ])
}
const Telefonos=({ telefonos, nombreCompleto })=>{
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
                                    <Text onPress={()=>llamar(item.telefono, nombreCompleto)}>{item.telefono}</Text>
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