import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Header from './components/Header';
import AddSubestacao from './components/formularios/AddSubestacao';
import VerNoMapa from './components/VerNoMapa';
import ListaSubestacoes from './components/ListaSubestacoes';
import EditaSubestacao from './components/formularios/EditaSubestacao';

import { validarCodigo, validarLatitude, validarLongitude, validarCodigoRede } from './models/ValidacaoCadastro'
import ValidacoesCadastro from './contexts/ValidacoesCadastro';
import { Box } from '@material-ui/core';
import './style.css';

class App extends Component {
  render() {
    return (
      <Box width="100%" display="flex" flexDirection="column">
        <Header />
        <div className="mx-auto" style={{width: 1000 + 'px'}}>
          <Switch>
            <Route
              exact path={["/", "/subestacoes/:id", "/subestacoes"]}
              component={ListaSubestacoes}
            />
            <Route
              exact path={["/mapa/:id", "/mapa"]}
              component={VerNoMapa}
            />
            <ValidacoesCadastro.Provider value={{
                  codigo: validarCodigo,
                  codigoRede: validarCodigoRede,
                  latitude: validarLatitude,
                  longitude: validarLongitude
                }}>
            <Route
              exact path="/adiciona"
              component={AddSubestacao}
            />
            <Route
              exact path="/editar/:id"
              render={props => <EditaSubestacao {...props}
              />}
            />
            </ValidacoesCadastro.Provider>
          </Switch>
        </div>
      </Box>
    )
  }
}

const AppWithRouter = withRouter(App);

export default AppWithRouter;
