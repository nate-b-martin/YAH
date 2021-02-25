import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { GridListTile } from '@material-ui/core';

type GalleryTileProps = {
  key:number;
  imagePath:string;
  height:number;
  width:number;
  cols?:number;
}

const useStyles = makeStyles((theme) => ({
  card: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: "center"
    
  },
  cardMedia: {
    marginTop: '5px',
    marginBottom: '5px',
    borderRadius: '10px'
  },
  cardContent: {
    flexGrow: 1,
  },
  gridListTile: {
    padding: "5px",
  }
}));

const GalleryTile = (props:GalleryTileProps) => {
  const classes = useStyles();

  return (
    <GridListTile key={props.key} className={classes.gridListTile} cols={props.cols} >
      <img src={props.imagePath} />
    // </GridListTile>
  );
}

export default GalleryTile;