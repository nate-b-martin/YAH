import React from 'react'
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import { Route, Switch } from 'react-router-dom';

interface LinkButtonProps {
  linkTitle:string;
  path:string;
  history?:any;
}


const useStyles = makeStyles(theme => ({
  buttonText: {
    color:"white"
  },
}));


const HeaderLinkButton = (props:LinkButtonProps) => {
  const { history } = props;
  const classes = useStyles();

  const handleButtonClick = (pageURL:string) => {
    history.push(pageURL);
  };

    return (
      <div>
            <Button 
                onClick={() => handleButtonClick(props.path)}
            >
              <Link component="button"
              >
                <Typography className={classes.buttonText}>
                  {props.linkTitle}
                </Typography>
              </Link>
            </Button>
      </div>
    )
};

export default HeaderLinkButton;
