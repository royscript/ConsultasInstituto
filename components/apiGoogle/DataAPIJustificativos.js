const dataApi = async (ordenarRegistros,rangoSheet) => {
    const sheetId = ('13TUKSwZ0DzMETbyZUO5HpbF31Z-vM4SVDZknEcbZ2xM');
    const sheetName = rangoSheet.replace(':', '%3A');//alumnos!A1%3AAN271
    const apiKey = ('AIzaSyD_ESxMy4_coPA_bzHlhwsm8_WvG66Fe5Q');
    const tokenAcceso = ('792526917057-0t6ibc4khp9t9pph9pkspqqhp1ftcp94.apps.googleusercontent.com');
    try {
      //console.log(`https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${sheetName}?access_token=${tokenAcceso}&key=${apiKey}`);
      fetch(`https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${sheetName}?access_token=${tokenAcceso}&key=${apiKey}`)
        .then((response) => response.json())
        .then((result) => {
          //console.log(result.length);
          ordenarRegistros(result);
        });

    } catch(e) {
      console.log(e);
    }
  };
  export default dataApi;