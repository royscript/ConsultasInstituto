//import { Text } from 'react-native';
import React from 'react';
import { View, StyleSheet, Text, Linking } from 'react-native';
import { Col, Row, Grid } from 'react-native-easy-grid';

const Justificaciones=({ justificaciones })=>{
    return (
        <>
        <View style={styles.container}>
                <Grid>
                    <Col size={35}>
                        <Row style={styles.cell}>
                            <Text style={{fontWeight:'bold'}}>Fecha</Text>
                        </Row>
                        {
                            justificaciones.map((item,key)=>{
                                const fechaInicio = new Date(item.fechaInicio);
                                const inicio = fechaInicio.getDate()+'/'+(fechaInicio.getMonth()+1);
                                const fechaFinal = new Date(item.fechaFinal);
                                const final = fechaFinal.getDate()+'/'+(fechaFinal.getMonth()+1);
                                return (
                                    <Row style={styles.cell} key={key}>
                                        <Text>{inicio+' al '+final}</Text>
                                    </Row>
                                );
                            })
                        }
                    </Col>
                    <Col size={35}>
                        <Row style={styles.cell}>
                            <Text style={{fontWeight:'bold'}}>Motivo</Text>
                        </Row>
                        {
                            justificaciones.map((item,key)=>{
                                return (
                                    <Row style={styles.cell} key={key}>
                                        <Text style={{justifyContent:'center'}}>{item.justificacion}</Text>
                                    </Row>
                                );
                            })
                        }
                    </Col>
                    <Col size={35}>
                        <Row style={styles.cell}>
                            <Text style={{fontWeight:'bold'}}>Doc</Text>
                        </Row>
                        {
                            justificaciones.map((item,key)=>{
                                return (
                                    <Row style={styles.cell} key={key}>
                                        <Text onPress={()=>{
                                            item.documento==''? null :
                                            Linking.openURL(item.documento);
                                            console.log("Click");
                                            }}>{item.documento==''?'':'Click'}</Text>
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

export default Justificaciones;

const styles = StyleSheet.create({
    container: {
      width: '100%',
      height: 500,
      padding: 16,
      paddingTop: 0,
      backgroundColor: '#fff',
    },
    header: {
        width: '100%',
        height: 15,
        borderWidth: 1,
        borderColor: '#ddd',
        flex: 1, 
        justifyContent: 'center',
        alignItems: 'center'
      },
    cell: {
      borderWidth: 1,
      borderColor: '#ddd',
      flex: 1, 
      justifyContent: 'center',
      alignItems: 'center'
    },
  });