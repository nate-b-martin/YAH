import React, { useEffect, useState } from "react";
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { makeStyles, useTheme } from '@material-ui/core/styles'
import _, { union } from 'lodash';
import MainContent from '../../components/MainContent';
import content from '../../pageContent/galleryPageContent';
import GalleryCard from './components/GalleryTile';
import FlickrApi from './components/utils/FlickrApi';
import flickrConfig from '../../configs/flickrConfigs';
import Grid from "@material-ui/core/Grid";
import { Container, GridList, GridListTile, isWidthUp  } from "@material-ui/core";
import GalleryTile from "./components/GalleryTile";
import CircularProgress from '@material-ui/core/CircularProgress';



type PictureObject = {
  key?:number,
  imagePath:string;
  height:number;
  width:number;
};

const useStyles = makeStyles(theme => ({
  gridListRoot: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor:theme.palette.background.paper,
  },
  circularProgress: {
    marginTop: "15%",
  },
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
  const [dataFetched, setDataFetched] = useState(false);

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

    async function retrieve() {
      //Get photo set ID
      let response = await api.getPhotoSetID(photosetTitle);

      const photosets = _.get(response, 'data.photosets.photoset'); // array with photosets
      const setID = _.map(photosets, getPhotoSetIdByTitle).pop();

      //Get photo IDs from set ID
      response = await api.getPhotosFromSet(setID);

      const photoArr = _.get(response, "data.photoset.photo");
      const ids = _.map(photoArr, (photo) => {return _.get(photo, 'id')});
      setPhotoIDs(ids);

      const pictureSet = _.map(ids, async (id, index) => {
        const response = await api.getPhotoSizes(id);
        const sizeArr = _.get(response, 'data.sizes.size[6]');
        const { source, width, height } = sizeArr;
        const pictureObject:PictureObject = {
          key: index,
          imagePath: source,
          height,
          width,
        }
        console.log(`picture object: ${JSON.stringify(pictureObject)}`);
        return pictureObject;
      })

      setGalleryPictures(await Promise.all(pictureSet));
      setDataFetched(true);
    }

    retrieve();

  }, [photosetTitle]);

  const orderPictures = (pictures:PictureObject[]) => {
    return _.orderBy(pictures, 'height');
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
      return 3;
    } else if (screenExtraSmall) {
      return 2
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
            !dataFetched ? (<CircularProgress className={classes.circularProgress} size={150}/> ) : (
            <GridList cellHeight={"auto"}  cols={1} spacing={4}>
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
