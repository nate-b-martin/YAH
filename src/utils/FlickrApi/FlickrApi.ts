import axios from 'axios';
import { PhotoSetRequest } from './FlickrApiTypes';

class FlickrApi {

    apiKey:string;
    apiSecret:string;
    userId:string;

    constructor(key:string, secret:string, userId:string) {
        this.apiKey = key;
        this.apiSecret = secret;
        this.userId= userId;
    }


    async getPhotoSetID(photosetTitle:string){
        const url = `https://www.flickr.com/services/rest/?method=flickr.photosets.getList&api_key=${this.apiKey}&user_id=${this.userId}&format=json&nojsoncallback=1`;
        return await axios.get(url);
    }
    
    async getPhotosFromSet(photoSetID:string) {
        const url = `https://www.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=${this.apiKey}&photoset_id=${photoSetID}&user_id=${this.userId}&format=json&nojsoncallback=1`
        return await axios.get(url);
    }

    async getPhotoSizes(photoID:any) {
        const url = `https://www.flickr.com/services/rest/?method=flickr.photos.getSizes&api_key=${this.apiKey}&photo_id=${photoID}&format=json&nojsoncallback=1`;
        return await axios.get(url);
    }

}

export default FlickrApi;