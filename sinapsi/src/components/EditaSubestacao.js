import React, { Component } from 'react';
import DataService from '../services/DataService';

export default class EditaSubestacao extends Component {
  constructor(props) {
    super(props);
    this.getSubestacao = this.getSubestacao.bind(this);
    this.alteraCodigo = this.alteraCodigo.bind(this);
    this.alteraNome = this.alteraNome.bind(this);
    this.alteraLatitude = this.alteraLatitude.bind(this);
    this.alteraLongitude = this.alteraLongitude.bind(this);
    this.alterarSubestacao = this.alterarSubestacao.bind(this);

    this.state = {
      subestacaoAtual: {
        codigo: "",
        nome:"",
        latitude: "",
        longitude: ""
      },
      message: "",
      submitted: false
    };
  }

  componentDidMount() {
    this.getSubestacao(this.props.match.params.id);
  }

  alteraCodigo(e) {
    const codigo = e.target.value;
    this.setState(function (prevState) {
      return {
        subestacaoAtual: {
          ...prevState.subestacaoAtual,
          codigo: codigo
        }
      };
    });
  }

  alteraNome(e) {
    const nome = e.target.value;
    this.setState(function (prevState) {
      return {
        subestacaoAtual: {
          ...prevState.subestacaoAtual,
          nome: nome
        }
      };
    });
  }

  alteraLatitude(e) {
    const latitude = e.target.value;
    this.setState(function (prevState) {
      return {
        subestacaoAtual: {
          ...prevState.subestacaoAtual,
          latitude: latitude
        }
      };
    });
  }

  alteraLongitude(e) {
    const longitude = e.target.value;
    this.setState(function (prevState) {
      return {
        subestacaoAtual: {
          ...prevState.subestacaoAtual,
          longitude: longitude
        }
      };
    });
  }

  getSubestacao(id) {
    DataService.getEditar(id)
      .then(response => {
        this.setState({
          subestacaoAtual: response.data
        });
        console.log(response.data);
        console.log(this.props.match.params);
      })
      .catch(e => {
        console.log(e);
      });
  }

  alterarSubestacao() {
      DataService.update(
      this.state.subestacaoAtual.id_subestacao,
      this.state.subestacaoAtual
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "Subestação alterada com sucesso.",
          submitted: true
        })
        this.props.history.push("/subestacoes");
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { subestacaoAtual } = this.state;

    return (
      <div>
        <h4> Alterar Subestação</h4>
        <br />
        <div className="submit-form">
          {this.state.submitted ? (
            <div>
              <h4>Subestação alterada com sucesso.</h4>
            </div>
          ) : (
              <div>
                <div className="form-group">
                  <label htmlFor="codigo">Código</label>
                  <input
                    type="text"
                    className="form-control"
                    id="codigo"
                    required
                    value={subestacaoAtual.codigo}
                    onChange={this.alteraCodigo}
                    name="codigo"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="nome">Nome</label>
                  <input
                    type="text"
                    className="form-control"
                    id="nome"
                    required
                    value={subestacaoAtual.nome}
                    onChange={this.alteraNome}
                    name="nome"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="latitude">Latitude</label>
                  <input
                    type="number"
                    className="form-control"
                    id="latitude"
                    required
                    value={subestacaoAtual.latitude}
                    onChange={this.alteraLatitude}
                    name="latitude"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="longitude">Longitude</label>
                  <input
                    type="number"
                    className="form-control"
                    id="longitude"
                    required
                    value={subestacaoAtual.longitude}
                    onChange={this.alteraLongitude}
                    name="longitude"
                  />
                </div>
                <button onClick={this.alterarSubestacao} className="btn btn-success">
                  Alterar
            </button>
              </div>
            )}
        </div>
      </div>
    )
  }
}