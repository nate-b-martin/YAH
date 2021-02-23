import React, { useEffect, useState } from "react";
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { makeStyles, useTheme } from '@material-ui/core/styles'
import _ from 'lodash';
import MainContent from '../../components/MainContent';
import content from '../../pageContent/galleryPageContent';
import GalleryCard from '../../components/cards/GalleryCard';
import FlickrApi from '../../utils/FlickrApi/FlickrApi';
import flickrConfig from '../../configs/flickrConfigs';
import Grid from "@material-ui/core/Grid";
import { Container, GridList, GridListTile, isWidthUp  } from "@material-ui/core";


type PictureObject = {
  key?:number,
  imagePath:string;
  height:number;
  width:number;
};

const useStyles = makeStyles(theme => ({
  cardGrid: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  gridListRoot: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor:theme.palette.background.paper,
  },
  gridList: {
    width: "50%",
    height: "50%",
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
  const apiKey = flickrConfig.Key;
  const apiSecret = flickrConfig.Secret;
  const userID = flickrConfig.userID;
  const api = new FlickrApi(apiKey, apiSecret, userID);
  const [photosetTitle, setPhotosetTitle] = useState('Eurotrip');
  const [photosetID, setPhotosetID] = useState<string>('');
  const [photoIDs, setPhotoIDs] = useState<Array<String>>([]);
  const [galleryPictures, setGalleryPictures] = useState<Array<PictureObject>>([]);

  useEffect( () => {

    const getPhotoSetIdByTitle = (set:Object, title?:String):string => {
      title = _.get(set, 'title._content');
      console.log(`Title: ${title}`);
      if(title === photosetTitle) {
        console.log(`Setting photo set id`);
        const pid = _.get(set, 'id');
        setPhotosetID(pid);
        return pid;
      }
      return '';
    }


    function getPhotoIDs (photo:Object) {
      return _.get(photo, 'id');
    }

    async function retrieve() {
      //Get photo set ID
      let response = await api.getPhotoSetID(photosetTitle);

      const photosets = _.get(response, 'data.photosets.photoset'); // array with photosets
      const setIDs = _.map(photosets, getPhotoSetIdByTitle);
      const setID = setIDs[setIDs.length - 1];

      //Get photo IDs from set ID
      console.log(`Gettings photos for photoset: ${setID}`);
      response = await api.getPhotosFromSet(setID);

      const photoArr = _.get(response, "data.photoset.photo");
      const ids = _.map(photoArr, getPhotoIDs);
      setPhotoIDs(ids);

      console.log(`Gettings Sizes for photos: ${ids}`);
      const pictureSet = [];
      for(let i = 0; i < ids.length; i++) {
        const response = await api.getPhotoSizes(ids[i]);
        const sizeArr = _.get(response, 'data.sizes.size[6]');
        const sourceUrl = sizeArr.source
        const width = sizeArr.width;
        const height = sizeArr.height;
        const pictureObject:PictureObject = {
          key: i,
          imagePath: sourceUrl,
          height,
          width,
        }
        console.log(`picture object: ${JSON.stringify(pictureObject)}`);
        pictureSet.push(pictureObject);
      }
      setGalleryPictures(pictureSet);
    }

    retrieve();

  }, []);

  const getPhotoCard = (index:number, photo:PictureObject) => {
    return (
      <Grid key={index} item xs={6}>
        <GalleryCard
          imagePath={photo.imagePath}
          height={photo.height}
          width={photo.width}
        />
      </Grid>
    );
  }

  const orderPictures = (pictures:PictureObject[]) => {
    return _.orderBy(pictures, 'height');
  }

 const getScreenWidth = () => {
    if (screenExtraLarge) {
      return 4;
    } else if (screenNarrow) {
      return 1;
    } else if (screenLarge) {
      return 4;
    } else if (screenMedium) {
      return 3;
    } else if (screenSmall) {
      return 2;
    } else if (screenExtraSmall) {
      return 1;
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
    <div className={classes.gridListRoot}>
      {
        getScreenWidth() < 3 ? (
          <GridList cellHeight={"auto"}  cols={getScreenWidth()} spacing={8}>
            {
              orderPictures(galleryPictures).map((photo, index) => (
              <GridListTile key={photo.key} cols={photo.height > photo.width ? 1 : 1}>
                <img src={photo.imagePath} alt={photo.key?.toString()}/>
              </GridListTile>
            ))}
          </GridList>
        ) : (

          <GridList cellHeight={"auto"}  cols={getScreenWidth()} spacing={8}>
            {
              galleryPictures.map((photo, index) => (
              <GridListTile key={photo.key} cols={photo.height > photo.width ? 1 : 2}>
                <img src={photo.imagePath} alt={photo.key?.toString()}/>
              </GridListTile>
            ))}
          </GridList>
        ) 
      }
    </div>
    </>
  );
};

export default Gallery;
