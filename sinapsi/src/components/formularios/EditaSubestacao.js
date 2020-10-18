import { Button, TextField, Box, IconButton } from '@material-ui/core';
import React, { useEffect, useState, useContext } from 'react';
import { useHistory, Link } from 'react-router-dom';
import ValidacoesCadastro from '../../contexts/ValidacoesCadastro';
import DataService from '../../services/DataService';
import useErros from '../../hooks/useErros';
import { ReactComponent as DeleteSVG } from '../../assets/delete.svg';
import { ReactComponent as EditSVG } from '../../assets/edit.svg';
import { useStyles } from './formulariosStyle';

export default function EditaSubestacao({ match, theme }) {
  const classes = useStyles(theme);
  const [id, setId] = useState("");
  const [codigo, setCodigo] = useState("");
  const [nome, setNome] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const validacoes = useContext(ValidacoesCadastro);
  const [erros, validarCampos] = useErros(validacoes);
  const [redes, setRedes] = useState([]);
  const [codigoRede, setCodigoRede] = useState("");
  const [nomeRede, setNomeRede] = useState("");
  const [tensaoNominal, setTensaoNominal] = useState("");

  let history = useHistory();

  function redirecionar() {
    history.push(`/subestacoes`);
  }

  useEffect(() => {
    getSubestacao(match.params.id);
    getRedes(match.params.id);
  }, [])

  useEffect(() => {
  }, [codigo, nome, latitude, longitude, alterarSubestacao, deletaRede, getRedes, updateRede,alteraRede])

  function getSubestacao(id) {
    DataService.getEditar(id)
      .then(response => {
        setId(response.data.id);
        setCodigo(response.data.codigo);
        setNome(response.data.nome);
        setLatitude(response.data.latitude);
        setLongitude(response.data.longitude);
      })
      .catch(e => {
        console.log(e);
      });
  }

  function getRedes(id) {
    DataService.getRedesBySubestacao(id)
      .then(response => {
        setRedes(response.data)
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
    for (let campo in erros) {
      if (!erros[campo].valido) {
        return false;
      }
    }
    return true;
  }

  function addRede(rede) {
    DataService.createRede(id, rede)
      .then(response => {
        console.log("REDE Criada " + response.data);
        getRedes(id);
      })
      .catch(e => {
        console.log(e)
      });
  }

  function alteraRede(rede) {
    var idAlterado;
    redes.map(redesGravadas =>
      redesGravadas.codigoRede === rede[0].codigoRede ? idAlterado
        = redesGravadas.id_rede_mt : "")
    var novaRede = [{
      id_rede_mt: idAlterado,
      codigoRede: rede[0].codigoRede,
      nomeRede: rede[0].nomeRede,
      tensaoNominal: rede[0].tensaoNominal,
      subestacao: {
        id: id,
        codigo: codigo,
        nome: nome,
        latitude: latitude,
        longitude: longitude
      }
    }]
    updateRede(novaRede);
  }

  async function updateRede(rede) {
   await DataService.updateRede(id, rede)
      .then(response => {
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
        getRedes(id)
  }

  function alterarOuIncluir(rede) {
    let contains = subestacaoContemRede(rede);
    if (contains) {
     alteraRede(rede);
    } else {
     addRede(rede);
    }
  }

  function subestacaoContemRede(rede) {
    let contemRede = false;
    redes.map(redeGravada => redeGravada.codigoRede === rede[0].codigoRede ? contemRede = true : false);
    return contemRede;
  }

  function deletaRede(idRede) {
    DataService.deleteRedeById(idRede)
      .then(response => {
        console.log("REDE DELETADA ");
        getRedes(id);
      })
      .catch(e => {
        console.log(e)
      });
  }

  return (
    <Box width="80%">
      <br />
      <h4>Alterar Subestação</h4>
      <form
        onSubmit={event => {
          event.preventDefault();
          if (possoEnviar()) {
            alterarSubestacao(id, { codigo, nome, latitude, longitude });
          }
        }}
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
          onClick={(event) => {
            let tempRede = [{
              codigoRede: codigoRede,
              nomeRede: nomeRede,
              tensaoNominal: tensaoNominal
            }]
            if(!subestacaoContemRede(tempRede) && !erros.codigoRede.valido){
              event.preventDefault();
            }else {
              alterarOuIncluir(tempRede);
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
                  <th >
                    <IconButton
                    size="small"
                      onClick={() => {
                        deletaRede(rede.id_rede_mt);
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
          Finalizar Alterações
          </Button>
      </form>
    </Box>
  )
}