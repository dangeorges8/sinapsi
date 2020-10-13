import React from 'react';

const ValidacoesCadastro = React.createContext(
  {
    codigo: semValidacao,
    latitude: semValidacao,
    longitude: semValidacao
  }
);

function semValidacao(dados) {
  return {valido: true, texto: ""}
}

export default ValidacoesCadastro;

