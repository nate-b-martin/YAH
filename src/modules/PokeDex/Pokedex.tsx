import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Grid, Card, CardContent, CardMedia, CircularProgress, Typography, TextField } from '@material-ui/core';
import { makeStyles, Theme, fade } from '@material-ui/core/styles'
import SearchIcon from '@material-ui/icons/Search';
import axios from 'axios';
import content from '../../pageContent/pokedexPageContent';
import MainContent from '../../components/MainContent';

const useStyles = makeStyles(theme => ({
   pokedexContainer: {
      paddingTop: '20px',
      paddingLeft: '50px',
      paddingRight: '50px',
   },
   cardMedia: {
      margin: "auto",
   },
   cardContent: {
      textAlign: "center",
   },
   searchContainer: {
      display: "flex",
      backgroundcolor: fade(theme.palette.common.white, 0.15),
      paddingLeft: "20px",
      paddingRight: "20px",
      marginTop: "5px",
      marginBottom: "5px",
      justifyContent: "center"
   },
   searchIcon: {
      alignSelf: "flex-end",
      marginBottom: "5px"
   },
   searchInput: {
      width: "200px",
      margin: "5px",
   }
}));

interface PokemonData {
   id:number,
   name:string,
   sprite:string,
}

const toFirstCharUpperCase = (name:string) => 
   name.charAt(0).toUpperCase() + name.slice(1);


const Pokedex:React.FC = (props:any) => {
   const { history } = props;
   const classes = useStyles();
   const [pokemonData, setPokemonData] = useState<any>({});
   const [filter, setFilter] = useState("");

   const handleSearchChange = (e:any) => {
      setFilter(e.target.value);
   }

   useEffect(() => {
      axios.get('https://pokeapi.co/api/v2/pokemon?limit=807')
      .then(function(response){
         const { data } = response;
         const { results } = data;
         const newPokemonData = Array<PokemonData>();
         results.forEach((pokemon: { name: any; }, index: number) => {
            newPokemonData[index + 1] = {
               id: index + 1,
               name: pokemon.name,
               sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`,
            }
         });
         setPokemonData(newPokemonData);
      });
   }, []);
   
   const getPokemonCard = (pokemonId:number) => {
      const { id, name, sprite } = pokemonData[pokemonId];
      return (
         <Grid item xs={4} key={pokemonId}>
            <Card onClick = {() => history.push(`/${pokemonId}`)}>
               <CardMedia
                  className={classes.cardMedia}
                  image={sprite}
                  style={{width: "130px", height: "130px"}}
               />
               <CardContent className={classes.cardContent}>
                  <Typography>{`${id}. ${toFirstCharUpperCase(name)}`}</Typography>
               </CardContent>
            </Card>
         </Grid>
      );
   }

   return (
      <div>
      <MainContent
         title={content.title}
         mainContent={content.mainContent}
      />
      {pokemonData ? (
         <Grid container spacing={2} className={classes.pokedexContainer} >
            <Grid item xs={12} key="searchInput">
               <div className={classes.searchContainer}>
                  <SearchIcon className={classes.searchIcon}/>
                  <TextField 
                     onChange={handleSearchChange}
                     className={classes.searchInput}
                     label="Pokemon"
                     variant="standard"
                  />
               </div>
            </Grid>
               {Object.keys(pokemonData).map((pokemonId) => 
                  pokemonData[pokemonId].name.includes(filter) && 
                  getPokemonCard(parseInt(pokemonId)))}
         </Grid>
      ) : (
         <CircularProgress/>
      )}
      </div>
   );
};

export default Pokedex;