import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import image from '../../static/mando.jpg';

type GalleryCardProps = {
  imagePath?:string;
  height?:number;
  width?:number;
}

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1,1,1,1),
  },
  media: {
    // paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
}));

const GalleryCard = (props:GalleryCardProps) => {
  const classes = useStyles();

  // console.log(`image path: ${props.imagePath}`);
  // console.log(`height: ${props.height}`);
  // console.log(`width: ${props.width}`);
  return (
    <Card className={classes.root}>
      {/* <CardMedia
        className={classes.media}
        image={props.imagePath}
        title="Image title"
        style={{width:props.width, height: props.height}}
      /> */}
      <img src={props.imagePath}/>
      {/* <CardContent className={classes.cardContent}>
        <Typography gutterBottom variant="h5" component="h2">
          Heading
        </Typography>
        <Typography>
          This is a media card. You can use this section to describe the content.
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" color="primary">
          View
        </Button>
        <Button size="small" color="primary">
          Edit
        </Button>
      </CardActions> */}
    </Card>
  );
}

export default GalleryCard;