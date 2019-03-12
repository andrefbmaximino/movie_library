import React, { Component } from 'react'
import Navbar from './Navbar';
import axios from 'axios';
import Filmes from './Filmes';

class FilmesCategoria extends Component {

  constructor(props) {
    super(props);
    this.state = {
      movies: []
    };

  }

  componentDidMount(){
    console.log(this.props.match.params.state);
    this.loadMovies(this.props.match.params.state);
  }

  componentDidUpdate(prevProps, prevState){
    this.loadMovies(this.props.match.params.state);
  }

  loadMovies = (state) => {

    axios.get('/api/movies/'+state, {
      params: {
        limit: 0
      }
    })
      .then(res => {
        this.setState({movies: res.data});
      })
      .catch(err => console.log(err));
  }
  
  fillPageTitle = () => {
    if(this.props.match.params.state === '1'){
      return "Filmes para ver";
    } else if(this.props.match.params.state === '2'){
      return "Filmes sacados";
    } else if(this.props.match.params.state === '3'){
      return "Filmes configurados";
    } else if(this.props.match.params.state === '4'){
      return "Filmes vistos";
    } else{
      return "Não há filmes nesse estado"
    }

  }
   
  render() {
    return (
      <React.Fragment>
      <Navbar></Navbar>
      <div className="container">
        
        {this.state.movies.length > 0 &&
          <Filmes movies={this.state.movies} sectionName={this.fillPageTitle()} state={this.props.match.params.state} updateList={this.updateList}></Filmes>
        }
      </div>
      </React.Fragment>
    )
  }

  updateList = (value) => {

    this.loadMovies(this.props.match.params.state);

  }

}

export default FilmesCategoria;