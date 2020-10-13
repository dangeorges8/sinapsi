function validarCodigo(codigo) {
  if(codigo.length != 3) {
    return {valido: false, texto: "O código deve ter 3 caracteres"}
  } return {valido: true, texto: ""};
}

function validarLatitude(latitude){
  if(latitude < -90 || latitude > 90) {
    return {valido: false, texto: "Latitude mínima: -90, máxima: 90"}
  } return {valido: true, texto: ""}
}

function validarLongitude(longitude){
  if(longitude < -180 || longitude > 180) {
    return {valido: false, texto: "Longitude mínima: -180, máxima: 180"}
  } return {valido: true, texto: ""}
}

export {validarCodigo, validarLatitude, validarLongitude};