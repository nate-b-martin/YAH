import React, { useState, useEffect } from 'react';
import { Typography, CircularProgress, Button } from '@material-ui/core';
import PokemonCard from '../../components/cards/PokemonCard';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';


const toFirstCharUpperCase = (name:string) => 
   name.charAt(0).toUpperCase() + name.slice(1);

const Pokemon = (props:any) => {
   const { history, match } = props;
   const { params } = match;
   const { pokemonId } = params;
   const [pokemon, setPokemon] = useState<any | undefined>(undefined);

   useEffect(() => {
      axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
      .then(function (response){
         const { data } = response;
         setPokemon(data);
         console.log(data);
      })
      .catch(function (error){
         setPokemon(false);
      });
   }, [pokemonId]);

   const generatePokemonCard = () => {
      const { name, id, height, weight, sprites } = pokemon;
      const fullImageUrl = `https://pokeres.bastionbot.org/images/pokemon/${id}.png`;
      const { front_default } = sprites;
      return (
         <Grid item xs={12}>
            <PokemonCard
               id={id}
               title={toFirstCharUpperCase(name)}
               pokemonName={toFirstCharUpperCase(name)}
               image={fullImageUrl}
               height={height}
               weight={weight}
            />
         </Grid>
      );
   }

   return (
   <>
      {pokemon === undefined && <CircularProgress/>}
      {pokemon !== undefined && pokemon && generatePokemonCard()}
      {pokemon === false && <Typography>Pokemon not found</Typography> }
      {pokemon !== undefined && (
         <Button variant="contained" onClick={() => history.push("/pokedex")}>
            Back To PokeDex
         </Button>
      )}
   </>
   );
};

export default Pokemon;