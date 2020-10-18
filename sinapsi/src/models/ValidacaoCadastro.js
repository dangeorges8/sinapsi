import DataService from "../services/DataService";

async function validarCodigo(codigo) {
  if (codigo.length !== 3) {
    return { valido: false, texto: "O código deve ter 3 caracteres" }
  } 
  const codigoExiste = await codigoExistente(codigo);
  if (codigoExiste) {
    return { valido: false, texto: "Este código já existe em nosso banco de dados." }
  }
  return { valido: true, texto: "" };
}

async function validarCodigoRede(codigoRede) {
  if (codigoRede.length > 5) {
    return { valido: false, texto: "O código deve ter até 5 caracteres" }
  } 
  const codigoExiste = await codigoRedeExistente(codigoRede);
  if (codigoExiste) {
    return { valido: false, texto: "Este código já existe em nosso banco de dados." }
  }
  return { valido: true, texto: "" };
}

function validarLatitude(latitude) {
  if (latitude < -90 || latitude > 90) {
    return { valido: false, texto: "Latitude mínima: -90, máxima: 90" }
  } return { valido: true, texto: "" }
}

function validarLongitude(longitude) {
  if (longitude < -180 || longitude > 180) {
    return { valido: false, texto: "Longitude mínima: -180, máxima: 180" }
  } return { valido: true, texto: "" }
}

async function codigoExistente(codigo) {
  let existe = false;
  await DataService.getByCodigo(codigo)
    .then(response => {
      if (codigo === response.data.codigo) {
        existe = true;
      } 
    })
    .catch(e => {
      console.log(e)
    })
    return existe;
}

async function codigoRedeExistente(codigoRede) {
  let existe = false;
  await DataService.getByCodigoRede(codigoRede)
    .then(response => {
      if (codigoRede === response.data.codigoRede) {
        existe = true;
      } 
    })
    .catch(e => {
      console.log(e)
    })
    return existe;
}

export { validarCodigo, validarLatitude, validarLongitude, validarCodigoRede, codigoRedeExistente };