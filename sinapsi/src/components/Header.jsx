import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Header extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand navbar-dark bg-dark" >
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
    )
  }
}