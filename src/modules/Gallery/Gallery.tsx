import React, { useEffect, useState } from "react";
import { makeStyles, Theme, fade } from '@material-ui/core/styles'
import _ from 'lodash';
import MainContent from '../../components/MainContent';
import content from '../../pageContent/galleryPageContent';
import GalleryCard from '../../components/cards/GalleryCard';
import FlickrApi from '../../utils/FlickrApi/FlickrApi';
import { PhotoSetRequest }from '../../utils/FlickrApi/FlickrApiTypes';
import configs from '../../configs/flickrConfigs';
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";

type PictureObject = {
  imagePath:string;
  height:number;
  width:number;
};

const useStyles = makeStyles(theme => ({
   galleryContainer: {
      paddingTop: '20px',
      paddingLeft: '50px',
      paddingRight: '50px',
   },
}));

const Gallery:React.FC = (props) => {
  const classes = useStyles();
  const apiKey = configs.Key;
  const apiSecret = configs.Secret;
  const userID = configs.userID;
  const api = new FlickrApi(apiKey, apiSecret, userID);
  const [photosetTitle, setPhotosetTitle] = useState('Eurotrip');
  const [photosetID, setPhotosetID] = useState<string>('');
  const [photoAlbum, setPhotoAlbum] = useState<string[]>([]);
  const [galleryPictures, setGalleryPictures] = useState<Array<PictureObject>>([]);

  useEffect(() => {
    async function getPhotos() {

      if(photosetID === '') {
        let response = await api.getPhotoSetID(photosetTitle);
        // console.log(`Get Photoset ID response: ${JSON.stringify(response)}`);
        let { data } = response;
        const { photosets } = data;
        let { photoset } = photosets;
        let lodashObj = _.forIn( photoset, function(value, key){
            const { id } = value;
            const title = _.get(value, 'title._content');
            if(title === photosetTitle && photosetID === '') {
              setPhotosetID(id);
            }
        });
        console.log(`Photo set: ${JSON.stringify(lodashObj)}`);
      };

      if(photoAlbum.length === 0) {

        // let response = await api.getPhotosFromSet(photosetID);
/*         console.log(`Get Photos response: ${JSON.stringify(response)}`);
        const { data } = response;
        const { photoset } = data;
        const photo = _.get(photoset, 'photo'); 
        _.forIn(photo, function(value, key) {
          const { id } = value;
          photoAlbum.push(id);
        });
        setPhotoAlbum(photoAlbum); */

        //Setting gallery pictures with size of medium
/*         photoAlbum.forEach(async (value:string) => {
          const response = await api.getPhotoSizes(value);
          const { data } = response;
          const { sizes } = data;
          const sourceUrl = _.get(sizes, 'size[8].source');
          const width = _.get(sizes, 'size[8].width');
          const height = _.get(sizes, 'size[8].height');
          // console.log(`Source URL: ${sourceUrl}`);
          const pictureObject:PictureObject = {
            imagePath: sourceUrl,
            height,
            width,
          }
          galleryPictures.push(pictureObject);
        }); */
        setGalleryPictures(galleryPictures);
        // console.log(`Set Gallery Pictures: ${galleryPictures}`);
      }
    };

    getPhotos();

  });

  const getPhotoCard = (index:number) => {
    // console.log('Get photo Card');
    // console.log(`index: ${index}`);
    // console.log(`picture: ${galleryPictures}`);
    let imagePath = '';
    let height = 0; 
    let width = 0; 
    if(galleryPictures.length > 0) {
      imagePath = galleryPictures[index].imagePath;
      height = galleryPictures[index].height;
      width = galleryPictures[index].width;
    }
    // console.log(`image path: ${imagePath}`);
    // console.log(`height: ${height}`);
    // console.log(`width: ${width}`);
    return (
      <Grid item xs={6} key={index}>
        <p>Inside the gallery card</p>
        <GalleryCard
          imagePath={imagePath}
          height={height}
          width={width}
        />
      </Grid>
    );
  }

  const paragragh = (p:string) => {
    return (
      <p>
        {p}
      </p>
    );
  }

  return (
    <div> 
      <MainContent
        title={content.title}
        mainContent={content.mainContent}
      />
      {
        <Grid container spacing={2} className={classes.galleryContainer}>

          {/* //TODO: not rendering component inside of for loop!!!!!!! */}
          {getPhotoCard(1)}


        </Grid>
      }

    </div>
  );
};

export default Gallery;
