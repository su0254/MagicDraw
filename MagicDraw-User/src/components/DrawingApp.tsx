import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import CanvasDraw from 'react-canvas-draw';
import { Box, Button, Slider, Typography, Input, Paper, Switch, FormControlLabel } from '@mui/material';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store/store';
import { addPaintedPainting } from '../store/slices/paintingPaintedSlice';
import { UpLoadPaintingPaintedType } from '../types/UpLoadPaintingPaintedType';

const DrawingApp: React.FC = () => {
  const [brushColor, setBrushColor] = useState<string>("#000");
  const [brushRadius, setBrushRadius] = useState<number>(5);
  const [isEraser, setIsEraser] = useState<boolean>(false);
  const [canvasSize, setCanvasSize] = useState<{ width: number; height: number }>({ width: 800, height: 400 });
  const canvasRef = useRef<CanvasDraw>(null);

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { backgroundImageUrl } = location.state || {};

  useEffect(() => {
    if (backgroundImageUrl) {
      const img = new Image();
      img.src = backgroundImageUrl;
      img.onload = () => {
        const maxWidth = 800;
        const maxHeight = 600;
        let width = img.width;
        let height = img.height;

        if (width > maxWidth) {
          const scaleFactor = maxWidth / width;
          width = maxWidth;
          height = height * scaleFactor;
        }
        if (height > maxHeight) {
          const scaleFactor = maxHeight / height;
          height = maxHeight;
          width = width * scaleFactor;
        }

        setCanvasSize({ width, height });
      };
    }
  }, [backgroundImageUrl]);

  const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBrushColor(event.target.value);
  };

  const handleBrushRadiusChange = (event: Event, value: number | number[]) => {
    setBrushRadius(value as number);
  };

  const toggleEraser = () => {
    setIsEraser(!isEraser);
  };

  const saveToDatabase = async () => {
    if (canvasRef.current) {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      const img = new Image();
      img.src = backgroundImageUrl;
      img.onload = async () => {
        canvas.width = img.width;
        canvas.height = img.height;

        ctx?.drawImage(img, 0, 0);

        const drawingData = canvasRef.current?.getDataURL("image/png");
        const drawingImg = new Image();
        drawingImg.src = drawingData;
        drawingImg.onload = async () => {
          ctx?.drawImage(drawingImg, 0, 0);

          const finalImage = canvas.toDataURL("image/png");

          const response = await fetch(finalImage);
          const blob = await response.blob();
          const file = new File([blob], "painted_drawing.png", { type: "image/png" });

          const paintingData: UpLoadPaintingPaintedType = {
            userId: localStorage.getItem('userId') || '',
            fileName: '12345',
            imageFile: file,
          };

          await dispatch(addPaintedPainting(paintingData));

          alert('The painted drawing has been saved to the database!');
        };
      };
    }
  };

  const clearCanvas = () => {
    if (canvasRef.current) {
      canvasRef.current.clear();
    }
  };

  const goToHomePage = () => {
    navigate('/');
  };

  return (
    <Box
      sx={{
        padding: '20px',
        background: 'linear-gradient(135deg, #84fab0, #8fd3f4)',
        borderRadius: '15px',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
        maxWidth: '900px',
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
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Input
            type="color"
            value={brushColor}
            onChange={handleColorChange}
            disabled={isEraser}
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
          <Box
            sx={{
              position: 'relative',
              width: `${canvasSize.width}px`,
              height: `${canvasSize.height}px`,
              borderRadius: '10px',
              overflow: 'hidden',
            }}
          >
            <CanvasDraw
              ref={canvasRef}
              brushColor={isEraser ? "#fff" : brushColor}
              brushRadius={brushRadius}
              lazyRadius={0}
              imgSrc={backgroundImageUrl}
              canvasWidth={canvasSize.width}
              canvasHeight={canvasSize.height}
              style={{
                border: '2px solid black',
                width: '100%',
                height: '100%',
                borderRadius: '10px',
              }}
            />
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '20px' }}>
            <Button
              variant="contained"
              onClick={saveToDatabase}
              sx={{
                background: 'linear-gradient(135deg, #a18cd1, #fbc2eb)',
                color: '#fff',
                '&:hover': { background: 'linear-gradient(135deg, #fbc2eb, #a18cd1)' },
              }}
            >
              Save to Database
            </Button>
            <Button
              variant="contained"
              onClick={clearCanvas}
              sx={{
                background: 'linear-gradient(135deg, #84fab0, #8fd3f4)',
                color: '#fff',
                '&:hover': { background: 'linear-gradient(135deg, #8fd3f4, #84fab0)' },
              }}
            >
              Clear
            </Button>
            <Button
              variant="contained"
              onClick={goToHomePage}
              sx={{
                background: 'linear-gradient(135deg, #ff9a9e, #fad0c4)',
                color: '#fff',
                '&:hover': { background: 'linear-gradient(135deg, #fad0c4, #ff9a9e)' },
              }}
            >
              Go to Home
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default DrawingApp;