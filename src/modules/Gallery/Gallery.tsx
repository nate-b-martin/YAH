import React, { useState, useEffect, MouseEvent } from "react";
import {useFlickr} from './hooks/useFlickr';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { PictureObject } from './types/GalleryTypes';
import _ from 'lodash';
import MainContent from '../../components/MainContent';
import content from '../../pageContent/galleryPageContent';
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import {  Box, GridList } from "@material-ui/core";
import GalleryTile from "./components/GalleryTile";
import CircularProgress from '@material-ui/core/CircularProgress';


const useStyles = makeStyles(theme => ({
  gridListRoot: {
    display: 'flex',
    flexWrap: 'wrap',
    overflow: 'hidden',
    backgroundColor:theme.palette.background.paper,
    justifyContent: 'center',
  },
  gridList: {
    justifyContent: 'center',
  },
  circularProgress: {
    marginTop: "15%",
    justifyContent: 'center',
  },
  albums:{
    marginLeft: '12.5%',
    marginRight: '12.5%',
  }
}));


const Gallery:React.FC = (props) => {
  const theme = useTheme();
  const screenNarrow = useMediaQuery('(max-width:340px');
  const screenExtraSmall = useMediaQuery(theme.breakpoints.only('xs'));
  const screenSmall = useMediaQuery(theme.breakpoints.only('sm'));
  const screenMedium = useMediaQuery(theme.breakpoints.only('md'));
  const screenLarge = useMediaQuery(theme.breakpoints.only('lg'));
  const screenExtraLarge = useMediaQuery(theme.breakpoints.only('xl'));

  const classes = useStyles();
  const [albumTitle, setAlbumTitle] = useState('Eurotrip');
  const [dataFetched, setDataFetched] = useState(false);

  const galleryPictures = useFlickr(albumTitle);
  useEffect(() => {
    if(galleryPictures.length > 0){
      setDataFetched(true);
    }
  });

  const handleAlbum = () => {

  }

  const orderPictures = (pictures:PictureObject[]) => {
    return _.orderBy(pictures, 'width');
  }

 const getScreenWidth = () => {
    if (screenExtraLarge) {
      return 6;
    } else if (screenNarrow) {
      return 1;
    } else if (screenLarge) {
      return 5;
    } else if (screenMedium) {
      return 4;
    } else if (screenSmall) {
      return 1;
    } else if (screenExtraSmall) {
      return 1
    } else {
      return 3;
    }
  }

  return (
    <>
      <Grid item xs={12}>
        <MainContent
          title={content.title}
          mainContent={content.mainContent}
        />
      </Grid>

      <div className={classes.albums}> 
        <Button variant="contained" color="primary"> All Photos </Button> 
        {/* TODO: When clicking Euro Trip button only pictures that are in that album will show */}
        <Button variant="contained" color="primary"> Euro Trip </Button>
        {/* TODO: When clicking Puppies button only pictures that are in the puppy album will show */}
        <Button variant="contained" color="primary"> Puppies </Button>
      </div>
      <div className={classes.gridListRoot}>
        {
            !dataFetched ? (<CircularProgress className={classes.circularProgress} size={150}/>) : (
            <GridList className={classes.gridList} cellHeight={"auto"}  cols={getScreenWidth()} spacing={1}>
              {
                orderPictures(galleryPictures).map((photo, index) => (
                <GalleryTile 
                  key={index} 
                  imagePath={photo.imagePath}
                  height={photo.height} 
                  width={photo.width}
                  cols={1}
                />
                ))
              }
            </GridList>
          )
        }
      </div>
    </>
  );
};

export default Gallery;
