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
// import CircularProgress from "@material-ui/core/CircularProgress";

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
  const apiKey = flickrConfig.Key;
  const apiSecret = flickrConfig.Secret;
  const userID = flickrConfig.userID;
  const api = new FlickrApi(apiKey, apiSecret, userID);
  const [photosetTitle, setPhotosetTitle] = useState('Eurotrip');
  const [photosetID, setPhotosetID] = useState<string>('');
  const [photoIDs, setPhotoIDs] = useState<Array<String>>([]);
  // const [photoAlbum, setPhotoAlbum] = useState<string[]>([]);
  const [galleryPictures, setGalleryPictures] = useState<Array<PictureObject>>([]);



  useEffect( () => {

    const getPhotoSetIdByTitle = (set:Object, title?:String) =>{
      title = _.get(set, 'title._content');
      console.log(`Title: ${title}`);
      if(title === photosetTitle) {
        console.log(`Setting photo set id`);
        const pid = _.get(set, 'id');
        setPhotosetID(pid);
      }
    }

    async function getPhotosetID() {
      let response = await api.getPhotoSetID(photosetTitle);

      const photosets = _.get(response, 'data.photosets.photoset'); // array with photosets
      _.map(photosets, getPhotoSetIdByTitle);

    } 

    function getPhotoIDs (photo:Object) {
      return _.get(photo, 'id');
    }

    async function getPhotos() {
      const response = await api.getPhotosFromSet(photosetID);
      console.log(`get photo response: ${JSON.stringify(response)}`);

      const photoArr = _.get(response, "data.photoset.photo");
      const ids = _.map(photoArr, getPhotoIDs);
      setPhotoIDs(ids);
    }

    async function getSizes(size:String) {

      const imageSources = _.map(photoIDs, async (id) => {
        await api.getPhotoSizes(id);
        //TODO: Parse response GET Source Url for size param "medium"
        /*
          const pObj = [];
          for(let id in photoIDs) {
            console.log(`photo id in loop: ${id}`);
            const response = await api.getPhotoSizes(id);
            // console.log(`Size Response: ${JSON.stringify(response)}`);
            const sourceUrl = _.get(response, 'data.size[8].source');
            const width = _.get(response, 'data.size[8].width');
            const height = _.get(response, 'size[8].height');
            const pictureObject:PictureObject = {
              imagePath: sourceUrl,
              height,
              width,
            }
            const pic = {id:pictureObject};
            pObj.push(pic)
          }
        }
      


        // pObj.forEach(element => console.log(`pic object: ${JSON.stringify(element)}`))
        //Setting gallery pictures with size of medium
        // setGalleryPictures(galleryPictures);

      */
    
      })
    }
  

      async function retrieve() {
        await getPhotosetID();
        // await getPhotos();
      }

      retrieve();

  }, [photosetTitle]);

  const getPhotoCard = (index:number) => {
    // console.log('Get photo Card');
    // console.log(`index: ${index}`);
    // console.log(`picture: ${galleryPictures}`);
    let imagePath = '';
    let height = 0; 
    let width = 0; 
    // if(galleryPictures.length > 0) {
    //   imagePath = galleryPictures[index].imagePath;
    //   height = galleryPictures[index].height;
    //   width = galleryPictures[index].width;
    // }
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
