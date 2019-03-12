import React, { Component } from 'react';

import { getDataFromIMDB, getMovieFromIMDB } from '../utils/requests';
import Filme from './Filme';
import axios from 'axios';
import PropTypes from 'prop-types';
import Navbar from './Navbar';


class Adicionar extends Component {

  static contextTypes = {
    router: PropTypes.object.isRequired
  };

    constructor(props) {
      super(props);
      this.state = {
        name: '',
        movies: []
      };
  
      this.handleChange = this.handleChange.bind(this);
      this.handleAddClicked = this.handleAddClicked.bind(this);
    }
    
    handleChange = (event) => {
      let newState = {};

      newState[event.target.name] = event.target.value;
      this.setState(newState);
    };

    handleKeyPress = (event) => {
      if(event.key === 'Enter'){
        this.handleConfirmClick();
      }
    }

  render() {

    return (
      <React.Fragment>
      <Navbar></Navbar>
      <div id="adicionar" className="container">
        
        <div className="form-adicionar">
            <input 
                type="text" 
                name="name"
                placeholder="Filme a adicionar" 
                className="form-control mr-sm-2"
                value={this.state.name}
                onChange={this.handleChange}
                onKeyPress={this.handleKeyPress}
                />

            <button className="btn btn-outline-primary my-2 my-sm-0" onClick={this.handleConfirmClick}>Pesquisar</button>
        </div> 

        <h2 className="section-title">Filmes Encontrados</h2>
        
        <div className="row">
          {
            this.state.movies.map(function(item){
              return <Filme movie={item} key={item.imdbID} addButtonClicked={this.handleAddClicked}></Filme>
            }.bind(this))
          }
        
        </div>

      </div>
      </React.Fragment>
    )
  }

  handleConfirmClick = () => {
    let promiseObj = getDataFromIMDB(this.state.name);
    
    promiseObj.then(response => {
        if (response !== undefined){

            console.log(response);
            this.setState({movies: response.data.Search})
        }
    })
    .catch(error => {
        console.log(error);
    });
  }

  handleAddClicked = (value) => {

    let promiseObj = getMovieFromIMDB(value);
    
    promiseObj.then(response => {
        if (response !== undefined){

          let movie = {
            Title: response.data.Title,
            Poster: response.data.Poster,
            Plot: response.data.Plot,
            state: 1,
            Year: response.data.Year
          }
          
          axios.post('/api/movies', movie)
            .then(res => {
              this.context.router.history.push("/");
            })
            .catch(err => console.log(err));
          

        }
    })
    .catch(error => {
        console.log(error);
    });


  }
  
}

export default Adicionar;
