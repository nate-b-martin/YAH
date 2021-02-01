import React, { useState } from 'react';
import { Route, RouteProps, Switch } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import FullLayout from '../modules/Layouts/FullLayout';

const App: React.FC = () => (
  <Grid 
    spacing={3}
    container
    direction="row"
    justify="center"
    alignItems="center"
  >
    <FullLayout/>
  </Grid>
);

export default App;
