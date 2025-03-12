import React, { useState } from 'react';
import { Grid, Card, CardMedia, Dialog, DialogContent } from '@mui/material';

const drawings = [
  { id: 1, src: 'drawing1.jpg', title: 'ציור 1' },
  { id: 2, src: 'drawing2.jpg', title: 'ציור 2' },
  { id: 3, src: 'drawing3.jpg', title: 'ציור 3' },
];

const Gallery = () => {
  const [selectedDrawing, setSelectedDrawing] = useState<{ id: number; src: string; title: string } | null>(null);

  const handleClick = (drawing:any) => {
    setSelectedDrawing(drawing);
  };

  const handleClose = () => {
    setSelectedDrawing(null);
  };

  return (
    <div>
      <Grid container spacing={4}>
        {drawings.map((drawing) => (
          <Grid item xs={4} key={drawing.id}>
            <Card 
              onClick={() => handleClick(drawing)} 
              sx={{ 
                transition: 'transform 0.2s', 
                '&:hover': { transform: 'scale(1.05)' } 
              }}
            >
              <CardMedia
                component="img"
                image={drawing.src}
                alt={drawing.title}
              />
            </Card>
          </Grid>
        ))}
      </Grid>
      <Dialog open={Boolean(selectedDrawing)} onClose={handleClose}>
        <DialogContent>
          {selectedDrawing && (
            <div>
              <h2>{selectedDrawing.title}</h2>
              <img src={selectedDrawing.src} alt={selectedDrawing.title} style={{ width: '100%' }} />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Gallery;
