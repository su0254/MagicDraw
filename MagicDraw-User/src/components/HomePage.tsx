import React from 'react';
import { AppBar, Toolbar, Button, Typography, Box, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Category from './Category';
import HomePageMain from './HomePageMain';
import { useAuth } from './AuthContext';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn } = useAuth();

  const handleLogout = () => {
    setIsLoggedIn(false); // עדכון מצב המשתמש ל"לא מחובר"
    navigate('/'); // חזרה לעמוד הבית
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        background: 'linear-gradient(135deg, #fdfbfb, #ebedee)',
      }}
    >
      <AppBar
        position="static"
        sx={{
          background: 'rgba(255, 255, 255, 0.9)',
          boxShadow: 'none',
          borderBottom: '1px solid #ddd',
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 'bold',
              color: '#555',
              textShadow: '1px 1px 2px rgba(0,0,0,0.1)',
            }}
          >
            Art Gallery
          </Typography>
          <Box>
            {!isLoggedIn && (
              <>
                <Button
                  sx={{
                    margin: '0 10px',
                    fontWeight: 'bold',
                    borderRadius: '20px',
                    background: 'linear-gradient(135deg, #84fab0, #8fd3f4)',
                    color: '#fff',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #8fd3f4, #84fab0)',
                    },
                  }}
                  onClick={() => navigate('/register')}
                >
                  Register
                </Button>
                <Button
                  sx={{
                    margin: '0 10px',
                    fontWeight: 'bold',
                    borderRadius: '20px',
                    background: 'linear-gradient(135deg, #ff9a9e, #fad0c4)',
                    color: '#fff',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #fad0c4, #ff9a9e)',
                    },
                  }}
                  onClick={() => navigate('/login')}
                >
                  Login
                </Button>
              </>
            )}
            {isLoggedIn && (
              <Button
                sx={{
                  margin: '0 10px',
                  fontWeight: 'bold',
                  borderRadius: '20px',
                  background: 'linear-gradient(135deg, #a18cd1, #fbc2eb)',
                  color: '#fff',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #fbc2eb, #a18cd1)',
                  },
                }}
                onClick={handleLogout}
              >
                Logout
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      <Container
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          padding: '20px',
        }}
      >
        <Typography
          variant="h3"
          gutterBottom
          sx={{
            fontWeight: 'bold',
            color: '#333',
            textShadow: '1px 1px 2px rgba(0,0,0,0.1)',
          }}
        >
          Welcome to the Art Gallery
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{
            color: '#555',
            maxWidth: '600px',
            marginBottom: '20px',
          }}
        >
          Discover, explore, and enjoy beautiful paintings from around the world. Let your creativity and imagination soar.
        </Typography>
        {isLoggedIn && (
          <Button
            sx={{
              margin: '0 10px',
              fontWeight: 'bold',
              borderRadius: '20px',
              background: 'linear-gradient(135deg, #84fab0, #8fd3f4)',
              color: '#fff',
              '&:hover': {
                background: 'linear-gradient(135deg, #8fd3f4, #84fab0)',
              },
            }}
            component="label"
          >
            Upload Image
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={(event) => {
                if (event.target.files && event.target.files.length > 0) {
                  console.log(event.target.files[0]);
                }
              }}
            />
          </Button>
        )}
      </Container>
      <Category />
      <HomePageMain />
    </Box>
  );
};

export default HomePage;