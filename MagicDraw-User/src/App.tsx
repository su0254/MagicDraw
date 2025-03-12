import React from 'react';
import { Container, Grid, Button, AppBar, Toolbar, Typography } from '@mui/material';
import Sidebar from './components/Sidebar';
import Gallery from './components/Gallery';


const App = () => {
  return (
    <Container maxWidth="lg">
      <AppBar position="static" sx={{ backgroundColor: '#3f51b5' }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            ציורים לילדים
          </Typography>
          <Button color="inherit">אזור אישי</Button>
          <Button color="inherit">צביעת ציור</Button>
        </Toolbar>
      </AppBar>
      <Grid container spacing={4} sx={{ marginTop: 2 }}>
        <Grid item xs={3}>
          <Sidebar />
        </Grid>
        <Grid item xs={9}>
          <Gallery />
        </Grid>
      </Grid>
    </Container>
  );
};

export default App;
