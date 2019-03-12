import React, { Component } from 'react';
import brand from '../album.png';
import {NavLink} from 'react-router-dom';


class Navbar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  handleChange(event) {
    console.log(event.target.value);
    this.setState({value: event.target.value});
  }

  

  render() {
    return (
      
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
            <a className="navbar-brand" href="/">
                <img src={brand} width="70" height="70" alt=""></img>
            </a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
        
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <NavLink className="nav-link" exact to="/">Todos</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" exact to="/1">Para ver</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" exact to="/2">Sacados</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" exact to="/3">Configurados</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" exact to="/4">Vistos</NavLink>
                </li>
            </ul>
            {this.props.showNavbarSearch &&
                <React.Fragment>
                  <input className="form-control mr-sm-2" type="search" placeholder="Pesquisar filme" aria-label="Search" value={this.state.value} onChange={this.handleChange}></input>
                  <button className="btn btn-outline-primary my-2 my-sm-0" type="submit" onClick={this.handleSubmit}>Pesquisar</button>
                </React.Fragment>
            }
          </div>
          </div>
        </nav>
      
    )
  }

  handleSubmit() {
    this.props.handleSearch(this.state.value);
  }
}

export default Navbar;
