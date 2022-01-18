import React, { useEffect, useState } from "react";
import { makeStyles } from '@material-ui/core/styles'
import _ from 'lodash';
import MainContent from '../../components/MainContent';
import content from '../../pageContent/galleryPageContent';
import GalleryCard from '../../components/cards/GalleryCard';
import FlickrApi from '../../utils/FlickrApi/FlickrApi';
// import { PhotoSetRequest }from '../../utils/FlickrApi/FlickrApiTypes';
import { flickrConfig }from '../../configs/flickrConfigs';
import Grid from "@material-ui/core/Grid";
import { Container, GridList, GridListTile  } from "@material-ui/core";
// import CircularProgress from "@material-ui/core/CircularProgress";

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

  return (
    <>
      <Grid item xs={12}>
        <MainContent
          title={content.title}
          mainContent={content.mainContent}
        />
      </Grid>
    <div className={classes.gridListRoot}>
      <GridList cellHeight={"auto"} className={classes.gridList} cols={3} spacing={3}>
        {galleryPictures.map((photo, index) => (
          <GridListTile key={photo.key} cols={photo.height > photo.width ? 1 : 2}>
            <img src={photo.imagePath} alt={photo.key?.toString()}/>
          </GridListTile>
        ))}
      </GridList>
    </div>
{/* cols={photo.height > photo.width ? 1 : 2} */}
      {/* <Container 
        className={classes.cardGrid} 
        maxWidth="lg"
      > */}

        {/* <Grid 
          container 
          spacing={2}
          alignItems="center"
        > */}
          {
            // galleryPictures.map((photo, index) => {
            //   console.log(index, photo);
            //   return getPhotoCard(index, photo);
            // })
          }
        {/* </Grid> */}

      {/* </Container> */}
    </>
  );
};

export default Gallery;
