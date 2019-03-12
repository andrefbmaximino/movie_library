import React, { Component } from 'react'
import Filme from './Filme';
import axios from 'axios';
import PropTypes from 'prop-types';



class Filmes extends Component {

  static contextTypes = {
    router: PropTypes.object.isRequired
  };

  render() {
    return (
      <div className="container">
        
          <h2 className="section-title">{this.props.sectionName}</h2>
          <div className="row">
          {
            this.props.movies.map(function(item){
              return <Filme movie={item} key={item._id} addButtonClicked={this.handleAddClicked} alreadyExists={true}></Filme>
            }.bind(this))
          }
          </div>
        
      </div>
    )
  }

  handleAddClicked = (movie) => {
    
    if(movie.state!==5){
      movie.state = parseInt(movie.state) + 1;
    
      axios.post('/api/movies', movie)
              .then(res => {
                this.props.updateList(this.props.state);
              })
              .catch(err => console.log(err));
    } else{
      this.context.router.history.push("/");
    }
    
            
  }

}

export default Filmes;
