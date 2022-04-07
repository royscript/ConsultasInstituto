import React, { useState, useEffect } from 'react';
import { Text } from 'react-native';
import ListaAlumnos from '../flatList/ListaAlumnos';
import dataApi from '../apiGoogle/DataAPI';
import BuscadorAlumno from '../flatList/BuscadorAlumno'
function Alumnos({ navigation, route }) {
    const [alumnos, setAlumno] = useState([]);
    const [datosFiltrados, setDatosFiltrados] = useState([]);
    const [fotos, setFotos] = useState();
    const [alumnosEspeciales, setAlumnosEspeciales] = useState();
    const [loading, setLoading] = useState(true);
    const [mensajeLoading, setMensajeLoading] = useState('');
    const [buscar, setBuscar] = useState('');
    const removerAcentos = (str) => {
      try {
        return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      } catch (error) {
        console.log("Error removerAcentos() : "+error);
        return str;
      }
      
    } 
    const filtrar = (buscar)=>{
      setBuscar(buscar);
      buscar = removerAcentos(String(buscar)).toUpperCase();
      setDatosFiltrados([]);
      var datos = [];
      if(buscar.length>0){
        alumnos.find((alumno,index)=>{
          if(buscar.split(' ').length>1){
            var vectorBuscar = buscar.split(' ');
            vectorBuscar.find((item)=> {
              if(
                (removerAcentos(alumno.nombres).toUpperCase().search(item)!=(-1)
                ||
                removerAcentos(alumno.apPaterno).toUpperCase().search(item)!=(-1)
                ||
                removerAcentos(alumno.apMaterno).toUpperCase().search(item)!=(-1))
                &&
                (item !='' && item!= ' ')
              ){
                  datos.push(alumno);
              }
            });
          }else if(buscar.search("NM")!=-1 || buscar.search("NB")!=-1){
            buscar = buscar.replace(' ','');
            if(alumno.curso.toUpperCase().replace(' ','')==buscar){
              datos.push(alumno);
            }
          }else if(buscar.search("PIE")!=-1){
            if(
                alumno.esPie.search("SI")!=-1
                ){
                  datos.push(alumno);
              }
          }else if(buscar.search("SEMIP")!=-1){
              if(
                  alumno.esAlumnoEspecial==true
                  ){
                    datos.push(alumno);
                }
          }else{
            if(
              removerAcentos(alumno.nombres).toUpperCase().search(buscar)!=(-1)
              ||
              removerAcentos(alumno.apPaterno).toUpperCase().search(buscar)!=(-1)
              ||
              removerAcentos(alumno.apMaterno).toUpperCase().search(buscar)!=(-1)
              ){
                datos.push(alumno);
            }
          }
          
        });
        };
        const removerDuplicados = (arrayIn) => {
          var arrayOut = [];
          arrayIn.forEach(item=> {
            try {
              if (JSON.stringify(arrayOut[arrayOut.length-1].rut) !== JSON.stringify(item.rut)) {
                arrayOut.push(item);
              }
            } catch(err) {
              arrayOut.push(item);
             }
          })
          return arrayOut;
      }
        setDatosFiltrados(removerDuplicados(datos));
    }
    useEffect(()=>{
      const ordenarRegistrosFotos= (result)=>{
        //console.log("Cantidad de fotos : "+result.values.length);
          var resultados = [];
          result.values.forEach((datos,index) => {
              if(index>0){
                  if(datos[0]!='' && datos[4]!=''){
                      resultados.push({
                      rut : datos[0], 
                      foto: datos[4]
                      });
                  }
              }
          });
          setFotos(resultados);
      }
      //console.log("Buscando Fotos");
      setMensajeLoading('Cargando Fotos ...');
      dataApi(ordenarRegistrosFotos,'fotos!E1:I');
    },[])

    useEffect(()=>{
      const ordenarRegistrosAlumnosEspeciales= (result)=>{
      //console.log("Cantidad de AlumnosEspeciales : "+result.values.length);
          var resultados = [];
          result.values.forEach((datos,index) => {
              resultados.push({
                rut : datos[7], 
                acuerdo: datos[8]
              });
          });
          setAlumnosEspeciales(resultados);
          
      }
      //console.log("Buscando AlumnosEspeciales");
      //console.log("Buscando resultados "+alumnosEspeciales.length);
      setMensajeLoading('Cargando AlumnosEspeciales ...');
      dataApi(ordenarRegistrosAlumnosEspeciales,'alumnosEspeciales!A2:I');
    },[fotos])


    useEffect(() => {
            const obtenerFotoAlumno = (rut) =>{
              var foto = fotos.find(foto=>foto.rut==rut);
              if(foto){
                foto = foto.foto;
              }
              return foto;
            }
            const esAlumnoEspecial = (rut)=>{
              var es = alumnosEspeciales.find(alumno=> alumno.rut==rut);
              if(es){
                return es.acuerdo;
              }else{
                return false;
              }
            }
            const ordenarRegistrosAlumnos= (result)=>{
              var resultados = [];
              //console.log("alumnos "+result.values.length);
              result.values.forEach((datos,index) => {
                  if(index>0){
                    if(datos[12]!='' && datos[9]!=''){
                      if(typeof datos[9] != 'undefined'){
                        resultados.push({
                          jornada : datos[0], 
                          curso: datos[1], 
                          numero: datos[2],
                          fechaMatricula: datos[5], 
                          apPaterno: datos[7], 
                          apMaterno: datos[8], nombres: datos[9],
                          fechaNacimiento : datos[10],
                          rut: datos[12],
                          direccion : datos[13],
                          telefonos : datos[14],
                          oficio : datos[17],
                          concontrato : datos[18],
                          horarioTrabajo : datos[19],
                          antecedentesMorbidos : datos[20],
                          email : datos[21],
                          contarsenaCorreo : datos[22],
                          numeroWhatsapp : datos[24],
                          esPie : datos[27],
                          tipoPie : datos[28],
                          nacionalidad : datos[29],
                          embarazo : datos[30],
                          numeroHijos : datos[31],
                          colegioProcedencia : datos[32],
                          ultimoCursoAprobado : datos[33],
                          repitencias : datos[34],
                          apoderado : datos[35],
                          estadoCivil : datos[36],
                          sename : datos[37],
                          sexo : datos[38],
                          comuna : datos[39],
                          foto : obtenerFotoAlumno(datos[12]),
                          fechaRetiro : datos[41],
                          esAlumnoEspecial : (esAlumnoEspecial(datos[12])==false?false:true),
                          acuerdoAlumnoEspecial : esAlumnoEspecial(datos[12])
                        });
                      }
                      
                    }
                  }
              });
              setAlumno(resultados);
              setLoading(false);
            }
            setMensajeLoading('Cargando alumnos...');
            dataApi(ordenarRegistrosAlumnos,'alumnos!A1:AP271');
        
    }, [alumnosEspeciales]);

    const mostrarDetalles = (parametros) => {
        navigation.navigate('Detalle',parametros);
    }
    if(loading==true){
        return (
          <>
              <Text style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                  {mensajeLoading}
              </Text>
          </>
          
      );
    }else{
      return (
          <>
            <ListaAlumnos mostrarDetalles={mostrarDetalles} alumnos={datosFiltrados} fotos={fotos}/>
            <BuscadorAlumno filtrar={filtrar} buscar={buscar}/>
          </>
      );
    }
    
}
export default Alumnos;