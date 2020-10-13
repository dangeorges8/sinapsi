import React, { Component } from 'react';
import DataService from '../services/DataService';
import { Link } from 'react-router-dom';
import { ReactComponent as DeleteSVG } from '../assets/delete.svg'
import { ReactComponent as EditSVG } from '../assets/edit.svg'
import { ReactComponent as MapSVG } from '../assets/map.svg'

export default class ListaSubestacoesComponent extends Component {
  constructor(props) {
    super(props);
    this.listaSubestacoes = this.listaSubestacoes.bind(this);
    this.deleteSubestacao = this.deleteSubestacao.bind(this);
    this.atualizaLista = this.atualizaLista.bind(this);
    
    this.state = {
      subestacoes: [],
    }
  }

  componentDidMount() {
    this.listaSubestacoes();
  }

  listaSubestacoes() {
    DataService.getAll()
      .then(
        response => {
          const result = response.data === [] ? [] : response.data
          this.setState({
            subestacoes: result
          });
        })
      .catch(e => {
        console.log(e);
      });
  }

  atualizaLista() {
    this.listaSubestacoes();
    this.setState({
      subestacoes: []
    })
  }

  deleteSubestacao(e) {
    DataService.delete(e)
      .then(response => {
        this.atualizaLista();
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { subestacoes } = this.state;

    return (

      <div className="container">
        <h4>Subestações</h4>
        <br />
        <table className="table table-responsive-md table-hover">
          <thead>
            <tr>
              <th scope="col" >Código</th>
              <th scope="col" >Nome</th>
              <th scope="col" >Excluir</th>
              <th scope="col" >Alterar</th>
              <th scope="col" >Mapa</th>
            </tr>
          </thead>
          {subestacoes.map((subestacao) => (
            <tbody key={subestacao.codigo}>
              <tr>
                <th scope="row">{subestacao.codigo}</th>
                <th>{subestacao.nome}</th>
                <th >
                  <a
                    href="/subestacoes"
                    onClick={this.deleteSubestacao.bind(this, subestacao.id_subestacao)}
                  >
                    <DeleteSVG />
                  </a>
                </th>
                <th >
                  <Link
                    to={"/editar/" + subestacao.id_subestacao}><EditSVG />
                  </Link>
                </th>
                <th><MapSVG /></th>
              </tr>
            </tbody>
          )
          )}
        </table>
        <Link to="/adiciona" renderAs={Link} className="btn btn-success">Incluir</Link>
      </div>
    )
  }
}