import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Pokedex, Pokemon }from '../modules/PokeDex/index';
import Grid from '@material-ui/core/Grid';
import Header from './Header';
import About from '../modules/About/About';
import Gallery from '../modules/Gallery/Gallery';
import Album from '../templates/Album';

const TOTAL_QUESTIONS = 10;

const App: React.FC = () => (
  <div>

    {/* <Album/> */}
    <Grid 
      spacing={3}
      container
      direction="row"
      justify="center"
      alignItems="center"
    >
      <Grid item xs={12}>
        <Header/>
      </Grid>
    </Grid>
    <Grid 
      spacing={3}
      container
      direction="row"
      justify="center"
      alignItems="center"
    >
      <Grid item xs={12}>
      <Switch>
        <Route exact path="/" render={(props:any) => <About {...props} />} />
        <Route exact path="/gallery" render={(props:any) => <Gallery {...props} />} />
        <Route exact path="/pokedex" render={(props: any) => <Pokedex {...props}/>}/>
        <Route
          exact
          path="/:pokemonId"
          render={(props:any) => <Pokemon {...props}/>}
          />
        </Switch>
      </Grid>
    </Grid>



  </div>
);

export default App;
