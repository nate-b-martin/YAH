import {useState, useEffect} from 'react';
import _ from 'lodash';
import FlickrApi from '../utils/FlickrApi'
import flickrConfig from '../components/configs/flickrConfigs';
import {PictureObject} from '../types/GalleryTypes';

export const useFlickr = (albumTitle:string):Array<PictureObject> => {
  const apiKey = flickrConfig.Key;
  const apiSecret = flickrConfig.Secret;
  const userID = flickrConfig.userID;
  const api = new FlickrApi(apiKey, apiSecret, userID);
  const [photosetID, setPhotosetID] = useState<string>('');
  const [photoIDs, setPhotoIDs] = useState<Array<String>>([]);
  const [galleryPictures, setGalleryPictures] = useState<Array<PictureObject>>([]);
  const [largePicture, setLargePicture] = useState<string>('');
  const [open, setOpen] = useState(false);

  useEffect( () => {
    const getPhotoSetIdByTitle = (set:Object, title?:String):string => {
      title = _.get(set, 'title._content');
      console.log(`Title: ${title}`);
      if(title === albumTitle) {
        console.log(`Setting photo set id`);
        const pid = _.get(set, 'id');
        setPhotosetID(pid);
        return pid;
      }
      return '';
    }

    async function retrieve() {
      //Get photo set ID
      let response = await api.getPhotoSetID(albumTitle);

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
    }

    retrieve();

  }, []);

  return galleryPictures
}