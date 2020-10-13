import { Button, TextField } from '@material-ui/core';
import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import ValidacoesCadastro from '../contexts/ValidacoesCadastro';
import DataService from '../services/DataService';
import useErros from '../hooks/useErros'

export default function EditaSubestacao({match}) {
  const [id, setId] = useState("");
  const [codigo, setCodigo] = useState("");
  const [nome, setNome] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const validacoes = useContext(ValidacoesCadastro);
  const [erros, validarCampos] = useErros(validacoes);

  let history = useHistory();

  function redirecionar() {
    history.push(`/subestacoes`);
  }

  useEffect(() => {
    getSubestacao(match.params.id);
  }, [])

  useEffect(() => {
  }, [codigo, nome, latitude, longitude, alterarSubestacao])

  function getSubestacao(id) {
    DataService.getEditar(id)
      .then(response => {
        setId(response.data.id_subestacao);
        setCodigo(response.data.codigo);
        setNome(response.data.nome);
        setLatitude(response.data.latitude);
        setLongitude(response.data.longitude);
      })
      .catch(e => {
        console.log(e);
      });
  }

  function alterarSubestacao(id, dados) {
    DataService.update(id, dados)
      .then(response => {
        console.log(response.data);
        redirecionar();
      })
      .catch(e => {
        console.log(e);
      });
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
      <h4>Alterar Subestação</h4>
      <form
        onSubmit={event => {
          event.preventDefault();
          if(possoEnviar()){
            alterarSubestacao(id, { codigo, nome, latitude, longitude });
          }
        }}
        className="submit-form"
      >
        <TextField
          value={codigo}
          onChange={event => { setCodigo(event.target.value) }}
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