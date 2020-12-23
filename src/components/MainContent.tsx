import React from 'react'
import { Container, makeStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

interface MainContentType {
    title?:string,
    mainContent?:string,
}

const useStyles = makeStyles((theme) => ({
    icon: {
      marginRight: theme.spacing(2),
    },
    heroContent: {
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(8, 0, 6),
    },
    heroButtons: {
      marginTop: theme.spacing(4),
    },
    cardGrid: {
      paddingTop: theme.spacing(8),
      paddingBottom: theme.spacing(8),
    },
    card: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
    },
    cardMedia: {
      paddingTop: '56.25%', // 16:9
    },
    cardContent: {
      flexGrow: 1,
    },
    footer: {
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(6),
    },
  }));

const MainContent = (props:MainContentType) => {
    const classes = useStyles();

    return (
    <main>
      {/* Hero unit */}
      <div className={classes.heroContent}>
        <Container maxWidth="sm">
          <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              {props.title}
          </Typography>
          <Typography variant="h5" align="center" color="textSecondary" paragraph>
              {props.mainContent}
          </Typography>
          <div>

          </div>
        </Container>
      </div>
    </main>
    );
}
export default MainContent;
