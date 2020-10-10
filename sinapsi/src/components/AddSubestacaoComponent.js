import React, { Component } from 'react';
import DataService from '../services/DataService';

export default class AddSubestacaoComponent extends Component {
  constructor(props) {
    super(props);
    this.codigo = this.codigo.bind(this);
    this.nome = this.nome.bind(this);
    this.latitude = this.latitude.bind(this);
    this.longitude = this.longitude.bind(this);
    this.incluir = this.incluir.bind(this);

    this.state = {
      id: null,
      codigo: "",
      nome: "",
      latitude: "",
      longitude: "",
      submitted: false
    };
  }

  codigo(e) {
    this.setState({
      codigo: e.target.value
    });
  }

  nome(e) {
    this.setState({
      nome: e.target.value
    });
  }

  latitude(e) {
    this.setState({
      latitude: e.target.value
    });
  }

  longitude(e) {
    this.setState({
      longitude: e.target.value
    });
  }

  incluir() {
    var data = {
      codigo: this.state.codigo,
      nome: this.state.nome,
      latitude: this.state.latitude,
      longitude: this.state.longitude
    };

    DataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id_subestacao,
          codigo: response.data.codigo,
          nome: response.data.nome,
          latitude: response.data.latitude,
          longitude: response.data.longitude,
          submitted: true
        });
        console.log(response.data);
        this.props.history.push("/subestacoes");
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    return (
      <div>
        <h4>Nova Subestação</h4>
        <br/>
        <div className="submit-form">
          {this.state.submitted ? (
            <div>
              <h4>Subestação incluída com sucesso.</h4>
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
                    value={this.state.codigo}
                    onChange={this.codigo}
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
                    value={this.state.nome}
                    onChange={this.nome}
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
                    value={this.state.latitude}
                    onChange={this.latitude}
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
                    value={this.state.longitude}
                    onChange={this.longitude}
                    name="longitude"
                  />
                </div>
                <button onClick={this.incluir} className="btn btn-success">
                  Incluir
            </button>
              </div>
            )
          }
        </div>
      </div>
    )
  }
}