import React from 'react';
import { List, ListItem, ListItemText, Paper, ListItemButton } from '@mui/material';

const Sidebar = () => {
  const categories = ['קטגוריה 1', 'קטגוריה 2', 'קטגוריה 3'];

  return (
    <Paper elevation={3} sx={{ padding: 2 }}>
      <List>
        {categories.map((category) => (
          <ListItem key={category}>
            <ListItemButton sx={{ '&:hover': { backgroundColor: '#e0e0e0' } }}>
            </ListItemButton>
            <ListItemText primary={category} />
          </ListItem>
          
        ))}
      </List>
    </Paper>
  );
};

export default Sidebar;
