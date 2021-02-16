import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Header from '../../components/Header';
import About from '../About/About';
import Gallery from '../Gallery/Gallery';
import { Pokedex, Pokemon }from '../PokeDex/index';
import { Route, Switch } from 'react-router-dom';
// import classes from '*.module.css';

const useStyles = makeStyles((theme) => ({
  header: theme.mixins.toolbar,
})); 



const FullLayout = () => {
  const classes = useStyles();
  return (
    <>
      <Grid item xs={12}>
        <Header/>
      </Grid>

        <Grid item xs={12}>
          <div className={classes.header}>
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
          </div>
        </Grid>
    </>
  )
}

export default FullLayout;