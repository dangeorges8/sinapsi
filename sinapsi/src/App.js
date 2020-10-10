import React, { Component } from 'react';
import { Switch, Route, Link, withRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import AddSubestacaoComponent from './components/AddSubestacaoComponent';
import HomeComponent from './components/HomeComponent';
import ListaSubestacoesComponent from './components/ListaSubestacoesComponent';
import VerNoMapaComponent from './components/VerNoMapaComponent';
import EditaSubestacao from './components/EditaSubestacao';

class App extends Component {

  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <a href="/home" className="navbar-brand">Home</a>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/subestacoes"} className="nav-link">
               Subestações
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/adiciona"} className="nav-link">
               Adiciona
              </Link>
            </li>
          </div>
        </nav>
        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/home"]} component={HomeComponent}/>
            <Route exact path={["/subestacoes/:id", "/subestacoes"]}
              component={ListaSubestacoesComponent}/>
              <Route exact path="/adiciona" 
              component={AddSubestacaoComponent}/>
            <Route exact path="/editar/:id" component={EditaSubestacao}/>
          </Switch>
        </div>
      </div>
    )
  }
}

const AppWithRouter = withRouter(App);

export default AppWithRouter;
