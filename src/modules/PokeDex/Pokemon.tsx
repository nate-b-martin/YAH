import React, { useState, useEffect } from 'react';
import { Typography, Link, CircularProgress, Button } from '@material-ui/core';
import axios from 'axios';


const toFirstCharUpperCase = (name:string) => 
   name.charAt(0).toUpperCase() + name.slice(1);

const Pokemon:React.FC = (props:any) => {
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

   const generatePokemonJSX = () => {
      const { name, id, species, height, weight, types, sprites } = pokemon;
      const fullImageUrl = `https://pokeres.bastionbot.org/images/pokemon/${id}.png`;
      const { front_default } = sprites;
      return (
         <>
            <Typography variant="h1">
               {`${id}. ${toFirstCharUpperCase(name)}`}
            </Typography>
            <img style={{ width: "300px", height: "300px"}}src={fullImageUrl}/>
            <Typography variant="h3"> Pokemon Info </Typography>
            <Typography>
               {"Species: "}
               <Link href={species.url}> {species.name} </Link>
            </Typography>
            <Typography>Height: {height}</Typography>
            <Typography>Weight: {weight}</Typography>
            <Typography variant="h6">Types:
               {types.map((typeInfo: { type: any; }) => {
                  const { type } = typeInfo;
                  const { name } = type;
                  return <Typography key={name}> {`${name}`}</Typography>
               })}
            </Typography>
         </>
      );
   }

   return (
   <>
      {pokemon === undefined && <CircularProgress/>}
      {pokemon !== undefined && pokemon && generatePokemonJSX()}
      {pokemon === false && <Typography>Pokemon not found</Typography> }
      {pokemon !== undefined && (
         <Button variant="contained" onClick={() => history.push("/")}>
            Back To PokeDex
         </Button>
      )}
   </>
   );
};

export default Pokemon;