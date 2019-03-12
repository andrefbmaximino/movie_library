import React, { Component } from 'react';


class Filme extends Component {

  constructor(props) {
    super(props);
    this.state = {
      movie: {}
    };

  }

  render() {

    let styles = {
      
        maxWidth: '100%',
        height: '253px'
      
    }

    return (
      
      <div className="col-4 col-md-3 col-lg-2">
        <div className="movie-div" onClick={this.handleClick}>
          <img style={styles} src={this.props.movie.Poster} alt=""></img>
          <p className="movie-title">{this.props.movie.Title}</p>
        </div>
      </div>
    )
  }

  handleClick = () => {
    console.log(this.props.movie.state !== '4');
    
    
    if(this.props.movie.state !== '4'){

      if(this.props.alreadyExists){
      
        const movie = this.props.movie;
        this.props.addButtonClicked(movie);
      
      } else{
        const id = this.props.movie.imdbID;
        this.props.addButtonClicked(id);
      }

    }
    
  }

  
}

export default Filme;
