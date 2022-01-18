import React, {useState, MouseEvent} from 'react';
import _ from 'lodash';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { GridListTile } from '@material-ui/core';
import FlickrApi from '../utils/FlickrApi';
import flickrConfig from './configs/flickrConfigs';
import { SettingsPowerRounded } from '@material-ui/icons';

type GalleryTileProps = {
  key:number;
  imagePath:string;
  height:number;
  width:number;
  cols?:number;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    gridListTile: {
      padding: "3px",
    },
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }),
);

const getLargePicture = async (e: MouseEvent) => {
    const src = e.currentTarget.getAttribute('src');
    const id = src?.match("(\\d+)_")?.pop();

    const { Key, Secret, userID } = flickrConfig;
    const api = new FlickrApi(Key, Secret, userID);

    const response = await api.getPhotoSizes(id);
    const sizeArr = _.get(response, 'data.sizes.size[9]');
    const { source, width, height } = sizeArr;
    return {imagePath: source, height, width}
}

const GalleryTile = (props:GalleryTileProps) => {
  const classes = useStyles();
  const [largePicture, setLargePicture] = useState<string>('');
  const [open, setOpen] = useState(false);

  const handleClick = async (e: MouseEvent) => {
    e.preventDefault();
    const largePicture = await getLargePicture(e);
    console.log(largePicture);
    setLargePicture(largePicture.imagePath);

    //TODO: Modal with large image. 
  }

  const handleOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  return (
    <GridListTile key={props.key} 
      className={classes.gridListTile} 
      cols={props.cols} 
    >
      <img src={props.imagePath}
        onClick={handleClick}
      />
    </GridListTile>
  );
}

export default GalleryTile;