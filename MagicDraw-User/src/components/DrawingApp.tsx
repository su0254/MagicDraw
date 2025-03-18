import React, { useState, useRef } from 'react';
import CanvasDraw from 'react-canvas-draw';
import { Box, Button, Slider, Typography, Input, Paper, Switch, FormControlLabel } from '@mui/material';

const gradients = [
  'linear-gradient(135deg, #84fab0, #8fd3f4)', // Green-Blue
  'linear-gradient(135deg, #ff9a9e, #fad0c4)', // Pink
  'linear-gradient(135deg, #a18cd1, #fbc2eb)', // Purple-Pink
  'linear-gradient(135deg, #fad0c4, #ff9a9e)', // Peach
];

const DrawingApp: React.FC = () => {
  const [brushColor, setBrushColor] = useState<string>("#000");
  const [brushRadius, setBrushRadius] = useState<number>(5);
  const [isEraser, setIsEraser] = useState<boolean>(false); // מצב מחיקה
  const canvasRef = useRef<CanvasDraw>(null);

  const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBrushColor(event.target.value);
  };

  const handleBrushRadiusChange = (event: Event, value: number | number[]) => {
    setBrushRadius(value as number);
  };

  const toggleEraser = () => {
    setIsEraser(!isEraser);
  };

  const downloadImage = () => {
    if (canvasRef.current) {
      const dataURL = canvasRef.current.getDataURL();
      if (dataURL) {
        const link = document.createElement('a');
        link.href = dataURL;
        link.download = 'drawing.png';
        link.click();
      } else {
        console.error("Failed to retrieve the canvas data.");
      }
    } else {
      console.error("Canvas reference is not available.");
    }
  };

  const printCanvas = () => {
    if (canvasRef.current) {
      const dataURL = canvasRef.current.getDataURL();
      if (dataURL) {
        const newWindow = window.open('');
        if (newWindow) {
          newWindow.document.write(`<img src="${dataURL}" alt="Canvas Drawing" />`);
          newWindow.print();
        } else {
          console.error("Failed to open a new window for printing.");
        }
      } else {
        console.error("Failed to retrieve the canvas data.");
      }
    } else {
      console.error("Canvas reference is not available.");
    }
  };

  const clearCanvas = () => {
    if (canvasRef.current) {
      canvasRef.current.clear();
    } else {
      console.error("Canvas reference is not available.");
    }
  };

  return (
    <Box
      sx={{
        padding: '20px',
        background: gradients[0],
        borderRadius: '15px',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
        maxWidth: '800px',
        margin: 'auto',
        marginTop: '20px',
      }}
    >
      <Typography variant="h4" align="center" gutterBottom sx={{ color: '#333' }}>
        Drawing App
      </Typography>
      <Paper
        elevation={3}
        sx={{
          padding: '20px',
          borderRadius: '10px',
          //background: gradients[1],
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Input
            type="color"
            value={brushColor}
            onChange={handleColorChange}
            disabled={isEraser} // מניעת שינוי צבע במצב מחיקה
            sx={{
              margin: '10px 0',
              width: '50px',
              height: '50px',
              border: 'none',
              cursor: 'pointer',
            }}
          />
          <Typography variant="body1" sx={{ color: '#333', marginBottom: '10px' }}>
            Brush Radius: {brushRadius}
          </Typography>
          <Slider
            value={brushRadius}
            onChange={handleBrushRadiusChange}
            min={1}
            max={50}
            sx={{
              width: '80%',
              color: '#333',
            }}
          />
          <FormControlLabel
            control={<Switch checked={isEraser} onChange={toggleEraser} />}
            label="Eraser Mode"
            sx={{ marginBottom: '10px', color: '#333' }}
          />
          <CanvasDraw
            ref={canvasRef}
            brushColor={isEraser ? "#fff" : brushColor} // מחיקה בצבע לבן (צבע הרקע)
            brushRadius={brushRadius}
            lazyRadius={0}
            style={{
              border: '2px solid black',
              width: '100%',
              height: '400px',
              borderRadius: '10px',
              marginTop: '20px',
            }}
          />
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '20px' }}>
            <Button
              variant="contained"
              onClick={downloadImage}
              sx={{
                background: gradients[2],
                color: '#fff',
                '&:hover': { background: gradients[3] },
              }}
            >
              Download Image
            </Button>
            <Button
              variant="contained"
              onClick={printCanvas}
              sx={{
                background: gradients[3],
                color: '#fff',
                '&:hover': { background: gradients[2] },
              }}
            >
              Print
            </Button>
            <Button
              variant="contained"
              onClick={clearCanvas}
              sx={{
                background: gradients[0],
                color: '#fff',
                '&:hover': { background: gradients[1] },
              }}
            >
              Clear
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default DrawingApp;