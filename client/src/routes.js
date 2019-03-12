import React from 'react';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import LandingPage from './components/Landing';
import Adicionar from './components/Adicionar';
import FilmesCategoria from './components/FilmesCategoria';




const Routes = () => (
    <Router>
        
        <Switch>
            <Route exact path="/" component={LandingPage}></Route>

            <Route path="/adicionar" component={Adicionar}></Route>

            <Route path="/:state" component={FilmesCategoria}></Route>

        </Switch>
        
    </Router>
)

export default Routes;