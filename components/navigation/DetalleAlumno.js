import { useEffect, useState } from 'react';
import { Text, Image, View, StyleSheet,ScrollView,SafeAreaView,Dimensions  } from 'react-native';
import Telefonos from './Telefonos';
import dataApi from '../apiGoogle/DataAPIJustificativos'; 
import Justificaciones from './Justificaciones';
import { Button } from 'react-native-elements';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        minHeight : Dimensions.get('window').height,
        alignItems : 'center'
      },
      scrollView: {
        backgroundColor: 'pink',
        marginHorizontal: 20
      },
    listItem:{
        margin:10,
        padding:10,
        backgroundColor:"#FFF",
        width:"95%",
        alignSelf:"center",
        borderRadius:5
    }
});
function calcularEdad(fecha) {
    var hoy = new Date();
    var cumpleanos = fecha;
    var edad = hoy.getFullYear() - cumpleanos.getFullYear();
    var m = hoy.getMonth() - cumpleanos.getMonth();

    if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
        edad--;
    }

    return edad;
}
function DetalleAlumno({ navigation, route }) {
    const alumno = route.params.datos;
    const [justificaciones, setJustificaciones] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(()=>{
            const ordenarRegistrosJustificaciones= (result)=>{
                var resultados = [];
                result.values.forEach((datos,index) => {
                    if(alumno.rut==datos[1]){
                        resultados.push({
                            id : datos[0], 
                            rut: datos[1], 
                            justificacion: datos[2],
                            documento: datos[3], 
                            fechaInicio: datos[4], 
                            fechaFinal: datos[5],
                        });
                    }
                });
                setJustificaciones(resultados);
                setLoading(false);
            }
        dataApi(ordenarRegistrosJustificaciones,'justificaciones!A1:H');
    },[])
    let fechaNacimiento = alumno.fechaNacimiento;
    const dia = fechaNacimiento.split("/")[0];
    const mes = fechaNacimiento.split("/")[1];
    const ano = fechaNacimiento.split("/")[2];
    fechaNacimiento = new Date(ano+"/"+mes+"/"+dia);
    const fechaActual = new Date();
    var edad = calcularEdad(fechaNacimiento);
    return (
        <SafeAreaView>
            <ScrollView style={styles.listItem}>
                <View style={{alignSelf : 'center'}}>
                    <Image
                        style={{ width: 200, height: 200,borderRadius:110}}
                        source={{ uri:'https://drive.google.com/uc?id='+alumno.foto}}
                        />
                </View>
                <View style={{flex:1, alignSelf:'center', width:'100%', alignItems:'center'}}>
                    <Text style={{fontWeight:"bold"}}>{alumno.nombres}</Text>
                    <Text style={{fontWeight:"bold"}}>{alumno.apPaterno} {alumno.apMaterno}</Text>
                    <Text>{alumno.rut}</Text>
                    <Text style={{fontWeight:"bold"}}>{alumno.curso}</Text>
                    <Text style={alumno.nacionalidad=='CHILENO' || alumno.nacionalidad=='CHILENA' ? null : {fontWeight:"bold"}}>{alumno.nacionalidad}</Text>
                    <Text style={{fontStyle: 'italic'}}>{alumno.estadoCivil.toLowerCase()}</Text>
                    <Text style={{fontStyle: 'italic'}}>{alumno.fechaNacimiento}, {edad} años</Text>
                    <Text style={{fontWeight:"bold", color:"black"}}>Fecha Matricula : <Text style={{fontWeight:"normal", color:"black"}}>{alumno.fechaMatricula}</Text></Text>
                    <Text style={{fontWeight:"bold", color:"black"}}>Fecha Ingreso : <Text style={{fontWeight:"normal", color:"black"}}>{alumno.fechaIngreso}</Text></Text>
                    <Text style={{fontWeight:"bold", color:"black"}}>Vive con : <Text style={{fontWeight:"normal", color:"black"}}>{alumno.conQuienVive.toLowerCase()}</Text></Text>
                    {alumno.fechaRetiro==undefined? null : <Text style={{fontWeight:"bold", color:"black"}}> Fecha retiro : <Text style={{fontWeight:"bold", color:"red"}}>{alumno.fechaRetiro}</Text></Text>} 
                    {alumno.esPie=='SI'?<Text style={{fontWeight:"bold", color:"black", backgroundColor:'yellow'}}>PIE - {alumno.tipoPie}</Text>:null}
                    {alumno.esAlumnoEspecial==true?<Text style={{fontWeight:"bold", color:"white", backgroundColor:'green'}}>SEMI PRESENCIAL - {alumno.acuerdoAlumnoEspecial}</Text>:null}
                    <Text></Text>
                    <Text style={{fontWeight:"bold"}}>Telefono</Text>
                    <Telefonos telefonos={alumno.telefonos}/>
                    <Text></Text>
                    <Text style={{fontWeight:"bold"}}>Apoderado</Text>
                    <Text>{alumno.apoderado}</Text>
                    <Text></Text>
                    <Text style={{fontWeight:"bold"}}>Colegio Procedencia</Text>
                    <Text>{alumno.colegioProcedencia}</Text>
                    <Text></Text>
                    <Text style={{fontWeight:"bold"}}>Ultimo curso aprobado : <Text style={{fontWeight:'normal'}}>{alumno.ultimoCursoAprobado}</Text></Text>
                    
                    <Text style={{fontWeight:"bold"}}> {alumno.repitencias!=''?"Repitencias :"+alumno.repitencias:null}</Text>
                    <Text></Text>
                    <Text style={{fontWeight:"bold"}}> {alumno.numeroHijos!=''?"Nº hijos :"+alumno.numeroHijos:null}</Text>
                    <Text></Text>
                    <Text style={{fontWeight:"bold"}}>Dirección</Text>
                    <Text>{alumno.direccion}</Text>
                    <Button title={"Ver mapa"} onPress={()=>{
                        navigation.navigate('Mapa',{direccion : alumno.direccion, comuna : alumno.comuna});
                    }}></Button>
                    <Text></Text>
                    <Text style={{fontWeight:"bold"}}>E-mail</Text>
                    <Text>{alumno.email}</Text>
                    <Text style={{fontWeight:"bold",color:"red"}}>{alumno.contarsenaCorreo}</Text>
                    <Text></Text>
                    <Text style={{fontWeight:"bold"}}>Antecedentes Morbidos</Text>
                    <Text>{alumno.antecedentesMorbidos=='' ? 'No registra': alumno.antecedentesMorbidos}</Text>
                    <Text style={{fontWeight:"bold",color:"red"}}>{alumno.embarazo}</Text>
                    <Text></Text>
                    <Text style={{fontWeight:"bold"}}> {alumno.oficio!=''?"Oficio :"+alumno.oficio:null}</Text>
                    <Text style={{fontWeight:"bold"}}> {alumno.horarioTrabajo!=''?"Horario de Trabajo :"+alumno.horarioTrabajo:null}</Text>
                    <Text></Text>
                    <Text style={{fontWeight:"bold",color:"black"}}>Justificativos</Text>
                    <Text></Text>
                    <Justificaciones justificaciones={justificaciones}/>
                    <Text></Text>
                    <Text></Text>
                    <Text></Text>
                    <Text></Text>
                </View>
            </ScrollView >
        </SafeAreaView>
        
    );
}
  export default DetalleAlumno;