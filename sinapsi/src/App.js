import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Header from './components/Header';
import AddSubestacao from './components/AddSubestacao';
import Home from './components/Home';
import ListaSubestacoes from './components/ListaSubestacoes';
import EditaSubestacao from './components/EditaSubestacao';
import DataService from './services/DataService';

import { validarCodigo, validarLatitude, validarLongitude } from './models/ValidacaoCadastro'
import ValidacoesCadastro from './contexts/ValidacoesCadastro';

class App extends Component {
  render() {
    return (
      <div className="container">
        <Header />
        <div className="container mt-3">
          <Switch>
            <Route
              exact path={["/", "/home"]}
              component={Home}
            />
            <Route
              exact path={["/subestacoes/:id", "/subestacoes"]}
              component={ListaSubestacoes}
            />
            <ValidacoesCadastro.Provider value={{
                  codigo: validarCodigo,
                  latitude: validarLatitude,
                  longitude: validarLongitude
                }}>
            <Route
              exact path="/adiciona"
              render={props => <AddSubestacao {...props}
                aoEnviar={incluirSubestacao}
              />}
            />
            <Route
              exact path="/editar/:id"
              render={props => <EditaSubestacao {...props}
                aoEnviar={incluirSubestacao}
              />}
            />
            </ValidacoesCadastro.Provider>
          </Switch>
        </div>
      </div>
    )
  }
}

function incluirSubestacao(data) {
  DataService.create(data)
    .then(response => {
      console.log(response.data);
    })
    .catch(e => {
      console.log(e);
    });
}

const AppWithRouter = withRouter(App);

export default AppWithRouter;
