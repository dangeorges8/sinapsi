import React, { Component } from 'react';
import DataService from '../services/DataService';
import { Link } from 'react-router-dom';

export default class ListaSubestacoesComponent extends Component {
  constructor(props) {
    super(props);
    this.listaSubestacoes = this.listaSubestacoes.bind(this);
    this.deleteSubestacao = this.deleteSubestacao.bind(this);
    this.subestacaoAtual = this.subestacaoAtual.bind(this);
    this.atualizaLista = this.atualizaLista.bind(this);
    //this.atualizaLista = this.atualizaLista.bind(this);

    this.state = {
      subestacoes: [],
      subestacaoAtual: ""
    }
  }

  componentDidMount(){
    this.listaSubestacoes();
  }

  listaSubestacoes() {
    DataService.getAll()
      .then( 
        response => {
        const result = response.data == [] ? [] : response.data
        this.setState({
          subestacoes: result
        });
        console.log(response.data)
      })
      .catch(e => {
        console.log(e);
      });
  }

  subestacaoAtual(id){
    console.log("subestação atual: " + id)
    this.setState({
      subestacaoAtual: id
    })
  }

  atualizaLista() {
    this.listaSubestacoes();
    this.setState({
      subestacoes: [],
      subestacaoAtual: ""
    })
  }

  deleteSubestacao(e) {
    console.log("Id a ser deletado: " + e);
    DataService.delete(e)
      .then(response => {
        console.log(response.data);
        this.atualizaLista();
      })
      .catch(e => {
        console.log(e);
      });
  }
  
  render( ){
    const { subestacoes, subestacaoAtual } = this.state;

    return (
      
      <div className="col-md-12">
        <h4>Subestações</h4>
        <br/>
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">Código</th>
              <th scope="col">Nome</th>
              <th scope="col">Excluir</th>
              <th scope="col">Alterar</th>
              <th scope="col">Exibir Mapa</th>
            </tr>
          </thead>
          {subestacoes.map((subestacao) => (
            <tbody key={subestacao.codigo}>
              <tr>
                <th scope="col">{subestacao.codigo}</th>
                <th scope="col">{subestacao.nome}</th>
                <th scope="col">
                  <a href="" onClick={this.deleteSubestacao.bind(this, subestacao.id_subestacao)}>
                    Excluir
                  </a>
                </th>
                <th scope="col">
                  <Link 
                    to={"/editar/" + subestacao.id_subestacao}>Alterar</Link>
                </th>
                <th scope="col">Exibir no Mapa</th>
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