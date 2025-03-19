import React from 'react';
import { Box, Button, Typography, Paper, IconButton } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';

const gradients = [
  'linear-gradient(135deg, #84fab0, #8fd3f4)', // Green-Blue
  'linear-gradient(135deg, #ff9a9e, #fad0c4)', // Pink
  'linear-gradient(135deg, #a18cd1, #fbc2eb)', // Purple-Pink
];

interface ShowPaintingProps {
  selectedImage: string;
}

const ShowPainting: React.FC<ShowPaintingProps> = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedImage } = location.state || {};

  const handleNavigateToDrawingApp = () => {
    navigate('/drawing-app', { state: { backgroundImageUrl: selectedImage } });
  };

  const handleClose = () => {
    navigate('/'); // חזרה לעמוד הבית
  };

  const handleDownloadImage = () => {
    const link = document.createElement('a');
    link.href = selectedImage;
    link.download = 'painting.png';
    link.click();
  };

  const handlePrintImage = () => {
    const newWindow = window.open('');
    if (newWindow) {
      newWindow.document.write(`<img src="${selectedImage}" alt="Printed Painting" style="max-width: 100%;"/>`);
      newWindow.print();
    }
  };

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: '20px',
          borderRadius: '15px',
          background:  'linear-gradient(135deg, #fdfbfb, #ebedee)',
          width: '90%',
          maxWidth: '800px',
          position: 'relative',
        }}
      >
        {/* אייקון לסגירה */}
        <IconButton
          onClick={handleClose}
          sx={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            color: 'rgba(0, 0, 0, 0.8)',
          }}
        >
          <CloseIcon />
        </IconButton>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: '20px',
          }}
        >
          <img
            src={selectedImage}
            alt="Selected Painting"
            style={{
              maxWidth: '100%',
              maxHeight: '400px',
              border: '2px solid black',
              borderRadius: '10px',
            }}
          />
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
          <Button
            variant="contained"
            onClick={handleNavigateToDrawingApp}
            sx={{
              background: gradients[1],
              color: '#fff',
              '&:hover': { background: 'linear-gradient(135deg, #fad0c4, #ff9a9e)' },
            }}
          >
            לצביעת התמונה
          </Button>
          <Button
            variant="contained"
            onClick={handleDownloadImage}
            sx={{
              background: gradients[2],
              color: '#fff',
              '&:hover': { background: 'linear-gradient(135deg, #fbc2eb, #a18cd1)' },
            }}
          >
            הורד תמונה
          </Button>
          <Button
            variant="contained"
            onClick={handlePrintImage}
            sx={{
              background: gradients[0],
              color: '#fff',
              '&:hover': { background: 'linear-gradient(135deg, #8fd3f4, #84fab0)' },
            }}
          >
            הדפס תמונה
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default ShowPainting;