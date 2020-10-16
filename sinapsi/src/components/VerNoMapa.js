import { Button, TextField, Box, makeStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import DataService from '../services/DataService';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
  margin: {
    margin: theme.spacing(1),
  }
}));

export default function VerNoMapa({ match }) {
  const classes = useStyles();
  const [id, setId] = useState("");
  const [codigo, setCodigo] = useState("");
  const [nome, setNome] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  useEffect(() => {
    getSubestacao(match.params.id);
  }, [])

  useEffect(() => {
  }, [codigo, nome, latitude, longitude])

  function getSubestacao(id) {
    console.log("getSubestacao: " + id)
    DataService.getEditar(id)
      .then(response => {
        setId(response.data.id);
        setCodigo(response.data.codigo);
        setNome(response.data.nome);
        setLatitude(response.data.latitude);
        setLongitude(response.data.longitude);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  return (
    <Box width="80%">
      <br />
      <h4>Alterar Subestação</h4>
      <form
        className={classes.root}
      >
        <TextField
          value={codigo}
          id="codigo"
          label="Código"
          type="text"
          name="codigo"
          required
          variant="outlined"
          size="small"
          margin="normal"
          disabled
        />
        <TextField
          value={nome}
          id="nome"
          label="Nome"
          type="text"
          name="nome"
          variant="outlined"
          size="small"
          margin="normal"
          fullWidth
          disabled
        />
        <TextField
          value={latitude}
          id="latitude"
          label="Latitude"
          type="number"
          name="latitude"
          required
          variant="outlined"
          size="small"
          margin="normal"
          disabled
        />
        <TextField
          value={longitude}
          id="longitude"
          label="Longitude"
          type="number"
          name="longitude"
          required
          variant="outlined"
          size="small"
          margin="normal"
          disabled
        />
      </form>

        <div className="container">
          <br />
          <h6>Mapa</h6>
          <div>
          <img src={`https://open.mapquestapi.com/staticmap/v5/map?locations=${latitude},${longitude}&zoom=12&size=800,400&key=xcb2F7YpfI5VJGA4X1luFld5ngKGGXIv&center`}/>
          </div>
        </div>
        <Link to="/subestacoes" className="btn btn-outline-primary">Voltar</Link>

    </Box>
  )
}