import { types } from "util"
import FlickrApi from "./FlickrApi"

// type FlickrApiTypes = {
//     apiKey:string,
//     apiSecret:string,
//     userID:string
// }

type PhotoSetRequest = {
    photoSetTitle?:string,
    photoSetID?:string
}

export type {
    PhotoSetRequest,
}

