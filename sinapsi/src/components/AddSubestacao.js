import { Button, TextField } from '@material-ui/core';
import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import ValidacoesCadastro from '../contexts/ValidacoesCadastro';
import useErros from '../hooks/useErros'

export default function AddSubestacaoComponent({ aoEnviar }) {
  const [codigo, setCodigo] = useState("");
  const [nome, setNome] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const validacoes = useContext(ValidacoesCadastro);
  const [erros, validarCampos] = useErros(validacoes);
  let history = useHistory();

  useEffect(() => {

  }, [redirecionar, aoEnviar])

  function redirecionar() {
    history.push("/subestacoes");
  }

  function possoEnviar() {
    for(let campo in erros) {
      if(!erros[campo].valido){
        return false;
      }
    }
    return true;
  }

  return (
    <div>
      <h4>Nova Subestação</h4>
      <form
        onSubmit={event => {
          event.preventDefault();
          if(possoEnviar()){
            aoEnviar({ codigo, nome, latitude, longitude });
            redirecionar();
          }
        }}
        className="submit-form"
      >
        <TextField
          value={codigo}
          onChange={event => {
            setCodigo(event.target.value)
          }}
          id="codigo"
          label="Código"
          type="text"
          name="codigo"
          required
          variant="outlined"
          margin="normal"
          onBlur={validarCampos}
          error={!erros.codigo.valido}
          helperText={erros.codigo.texto}
          fullWidth
        />
        <TextField
          value={nome}
          onChange={event => { setNome(event.target.value) }}
          id="nome"
          label="Nome"
          type="text"
          name="nome"
          required
          variant="outlined"
          margin="normal"
          fullWidth
        />
        <TextField
          value={latitude}
          onChange={event => { setLatitude(event.target.value) }}
          id="latitude"
          label="Latitude"
          type="number"
          name="latitude"
          required
          variant="outlined"
          margin="normal"
          onBlur={validarCampos}
          error={!erros.latitude.valido}
          helperText={erros.latitude.texto}
          fullWidth
        />
        <TextField
          value={longitude}
          onChange={event => { setLongitude(event.target.value) }}
          id="longitude"
          label="Longitude"
          type="number"
          name="longitude"
          required
          variant="outlined"
          margin="normal"
          onBlur={validarCampos}
          error={!erros.longitude.valido}
          helperText={erros.longitude.texto}
          fullWidth
        />
        <Button
          type="submit"
          variant="contained"
          color="primary">
          Incluir
          </Button>
      </form>
    </div>
  )
}