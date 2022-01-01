import React from 'react';
import { Grid, CircularProgress } from '@material-ui/core';

export const GrowingSpinner = (
  <>
    <Grid container justify="center">
      <CircularProgress />
      <CircularProgress color="secondary" />
    </Grid>
  </>
);
