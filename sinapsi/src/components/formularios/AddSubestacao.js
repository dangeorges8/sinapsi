import { Button, TextField, Box, IconButton } from '@material-ui/core';
import React, { useEffect, useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import ValidacoesCadastro from '../../contexts/ValidacoesCadastro';
import useErros from '../../hooks/useErros'
import DataService from '../../services/DataService';
import { ReactComponent as DeleteSVG } from '../../assets/delete.svg'
import { ReactComponent as EditSVG } from '../../assets/edit.svg'
import { useStyles } from './formulariosStyle';

export default function AddSubestacao({ theme }) {
  const classes = useStyles(theme);
  const [codigo, setCodigo] = useState("");
  const [nome, setNome] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [redes, setRedes] = useState([]);
  const [codigoRede, setCodigoRede] = useState("");
  const [nomeRede, setNomeRede] = useState("");
  const [tensaoNominal, setTensaoNominal] = useState("");
  const validacoes = useContext(ValidacoesCadastro);
  const [erros, validarCampos] = useErros(validacoes);
  let history = useHistory();

  useEffect(() => {

  }, [redirecionar, incluirSubestacao, alteraOuSetRede])

  function redirecionar(id) {
    incluirRede(id);
    history.push("/subestacoes");
  }

  function possoEnviar() {
    for (let campo in erros) {
      if (!erros[campo].valido) {
        return false;
      }
    }
    return true;
  }

  function incluirSubestacao(data) {
    DataService.create(data)
      .then(response => {
        redirecionar(response.data.id);
      })
      .catch(e => {
        console.log(e);
      })
      ;
  }

  function incluirRede(id) {
    DataService.createListaRedes(id, redes)
      .then(response => {
        console.log("REDE: " + response.data)
      })
      .catch(e => {
        console.log(e)
      });
  }

  function alteraOuSetRede(rede) {
    var contains = false;
    redes.map(redesGravada =>
      redesGravada.codigoRede === rede.codigoRede ? contains = true : contains = false)

    if (contains) {
      alteraRede(rede, rede.codigoRede);
    } else {
      setRedes([...redes, rede]);
    }
  }

  function alteraRede(novaRede, codigo) {
    setRedes(redes.map(rede => rede.codigoRede === codigo ? novaRede : rede));
  }

  function deletaRede(index) {
    redes.splice(index, 1);
    setRedes([...redes]);
  }

  return (
    <Box width="80%">
      <br />
      <h5>Subestação</h5>
      <form
        onSubmit={event => {
          event.preventDefault();
          if (possoEnviar()) {
            incluirSubestacao({ codigo, nome, latitude, longitude })
          }
        }}
        className={classes.root}
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
          size="small"
          onBlur={validarCampos}
          error={!erros.codigo.valido}
          helperText={erros.codigo.texto}
        />
        <TextField
          value={nome}
          onChange={event => { setNome(event.target.value) }}
          id="nome"
          label="Nome"
          type="text"
          name="nome"
          variant="outlined"
          size="small"
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
          size="small"
          margin="normal"
          onBlur={validarCampos}
          error={!erros.latitude.valido}
          helperText={erros.latitude.texto}
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
          size="small"
          margin="normal"
          onBlur={validarCampos}
          error={!erros.longitude.valido}
          helperText={erros.longitude.texto}
        />
        <br />
        <br />
        <h5>Rede MT</h5>
        <TextField
          value={codigoRede}
          onChange={event => {
            setCodigoRede(event.target.value)
          }}
          id="codigoRede"
          label="Código"
          type="text"
          name="codigoRede"
          variant="outlined"
          size="small"
          onBlur={validarCampos}
          error={!erros.codigoRede.valido}
          helperText={erros.codigoRede.texto}
          fullWidth
        />
        <TextField
          value={nomeRede}
          onChange={event => { setNomeRede(event.target.value) }}
          id="nomeRede"
          label="Nome"
          type="text"
          name="nomeRede"
          variant="outlined"
          size="small"
          margin="normal"
          fullWidth
        />
        <TextField
          value={tensaoNominal}
          onChange={event => { setTensaoNominal(event.target.value) }}
          id="tensaoNominal"
          label="Tensão Nominal"
          type="number"
          name="tensaoNominal"
          variant="outlined"
          size="small"
          margin="normal"
        />
        <Button
          onClick={() => {
            let tempRede = {
              codigoRede: codigoRede,
              nomeRede: nomeRede,
              tensaoNominal: tensaoNominal
            }
            if (possoEnviar()) {
              alteraOuSetRede(tempRede);
              setCodigoRede("");
              setNomeRede("");
              setTensaoNominal("");
            }
          }
          }
          className={classes.margin}

          variant="contained"
          color="primary"
          width="30%"
          size="small"
        >
          Alterar / Incluir Rede
          </Button>

        <div className="container">
          <br />
          <h6>Redes MT Adicionadas</h6>
          <table className="table table-sm table-bordered table-responsive-sm table-hover">
            <thead className="thead-dark">
              <tr>
                <th scope="col" >Código</th>
                <th scope="col" >Nome</th>
                <th scope="col" >Tensão Nominal</th>
                <th scope="col" >Excluir</th>
                <th scope="col" >Alterar</th>
              </tr>
            </thead>
            {redes.map((rede, index) => (
              <tbody key={index}>
                <tr>
                  <th>{rede.codigoRede}</th>
                  <th>{rede.nomeRede}</th>
                  <th>{rede.tensaoNominal}</th>
                  <th>
                    <IconButton
                    size="small"
                      onClick={() => {
                        deletaRede(index);
                      }}
                    >
                      <DeleteSVG />
                    </IconButton>
                  </th>
                  <th >
                    <IconButton
                    size="small"
                      onClick={() => {
                        setCodigoRede(rede.codigoRede);
                        setNomeRede(rede.nomeRede);
                        setTensaoNominal(rede.tensaoNominal);
                      }}
                    >
                      <EditSVG />
                    </IconButton>
                  </th>
                </tr>
              </tbody>
            ))}
          </table>
        </div>

        <Link to="/subestacoes" className="btn btn-outline-secondary btn-sm">Cancelar</Link>
        <Button
          className={classes.margin}
          type="submit"
          variant="contained"
          color="primary"
          width="50%"
          size="small"
        >
          Finalizar Cadastro
          </Button>
      </form>
    </Box>
  )
}