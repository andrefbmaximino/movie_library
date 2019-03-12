import React, { Component } from 'react';

import { Link } from "react-router-dom";

import Filmes from './Filmes';

import axios from 'axios';
import Navbar from './Navbar';

class Landing extends Component {

  constructor(props) {
    super(props);
    this.state = {
      toSee: [],
      downloaded: [],
      configured: [],
      seen: [],
      search: ''
    };

  }

  componentDidMount(){
    this.loadToSee(this.state.search);
    this.loadDownloaded(this.state.search);
    this.loadConfigured(this.state.search);
    this.loadSeen(this.state.search);
  }

  loadToSee = (search) => {
    console.log("search:");
    console.log(search);
    this.loadMovies(1, "toSee", 6, search);
  }

  loadDownloaded = (search) => {
    this.loadMovies(2, "downloaded", 6, search);
  }

  loadConfigured = (search) => {
    this.loadMovies(3, "configured", 6, search);
  }

  loadSeen = (search) => {
    this.loadMovies(4, "seen", 6, search);
  }

  loadMovies = (state, stateName, limit, search) => {

    axios.get('/api/movies/'+state, {
      params: {
        limit: limit,
        search: search
      }
    })
      .then(res => {
        this.setState({[stateName]: res.data});
      })
      .catch(err => console.log(err));
  } 

  render() {
    return (
      <div>
      <Navbar showNavbarSearch={true} handleSearch={this.handleSearch}></Navbar>
      
      <div id="adicionar" className="container">
        <Link to="/adicionar">
            <button type="button" className="btn btn-outline-success">Adicionar Filme</button>
        </Link>
      </div>
      
      {this.state.toSee.length > 0 &&
        <Filmes movies={this.state.toSee} sectionName={"Filmes para ver"} state={1} updateList={this.updateList}></Filmes>
      }

      {this.state.downloaded.length > 0 &&
        <Filmes movies={this.state.downloaded} sectionName={"Filmes sacados"} state={2} updateList={this.updateList}></Filmes>
      }

      {this.state.configured.length > 0 &&
        <Filmes movies={this.state.configured} sectionName={"Filmes prontos"} state={3} updateList={this.updateList}></Filmes>
      }

      {this.state.seen.length > 0 &&
        <Filmes movies={this.state.seen} sectionName={"Filmes vistos"} state={4} updateList={this.updateList}></Filmes>
      }
      
      </div>
    );
  }

  handleSearch = (search) => {
    this.loadToSee(search);
    this.loadDownloaded(search);
    this.loadConfigured(search);
    this.loadSeen(search);
  }


  updateList = (value) => {

    if(parseInt(value) === 1){
      this.loadToSee(this.state.search);
      this.loadDownloaded(this.state.search);
    } else if(parseInt(value) === 2){
      this.loadDownloaded(this.state.search);
      this.loadConfigured(this.state.search);
    } else if(parseInt(value) === 3){
      this.loadConfigured(this.state.search);
      this.loadSeen(this.state.search);
    } else{
      this.loadSeen(this.state.search);
    }

  }
}

export default Landing;
