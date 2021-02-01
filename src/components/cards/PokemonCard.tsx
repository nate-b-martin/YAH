import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

type PokemonCardProps = {
  id:number;
  title:string;
  image:string;
  pokemonName:string;
  height:string;
  weight:string;
  pokemonInfo?:string; 
}

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(20, 20, 8, 20),
  },
  media: {
    height: 431,
    width: 431,
    margin: "20px",
  },
  cardActionArea: {
    width: "1"
  },
}));

const PokemonCard = (props:PokemonCardProps) => {
  const classes = useStyles();

  return (
    <div className={classes.root} >
        <Card >
          <CardActionArea>
            <CardMedia
              className={classes.media}
              image={props.image}
              title={props.pokemonName}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {props.pokemonName}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                Height: {props.height}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                Weight: {props.weight}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
    </div>
  );
}

export default PokemonCard;