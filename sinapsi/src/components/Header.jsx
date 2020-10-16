import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Header extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand navbar-dark bg-dark" >
        <a href="/home" className="navbar-brand"></a>
        <div className="navbar-nav mr-auto">
          <li className="navbar-brand">
            <Link to={"/subestacoes"} className="nav-link">
              Subestações
            </Link>
          </li>
          <li className="navbar-brand">
            <Link to={"/adiciona"} className="nav-link">
              Adicionar
            </Link>
          </li>
        </div>
      </nav>
    )
  }
}