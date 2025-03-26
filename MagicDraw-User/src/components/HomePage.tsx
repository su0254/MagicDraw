import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Button, Typography, Box, Container, TextField, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, Select, InputLabel, FormControl, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Category from './Category';
import HomePageMain from './HomePageMain';
import { useAuth } from './AuthContext';
import { fetchCategories } from '../store/slices/categorySlice';
import { addPainting } from '../store/slices/paintingsSlice'; // ייבוא הפעולה להעלאת ציור
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn } = useAuth();
  const dispatch = useDispatch<AppDispatch>();

  const [openUploadDialog, setOpenUploadDialog] = useState(false); // State to manage the dialog visibility
  const [selectedFile, setSelectedFile] = useState<File | null>(null); // State to store the selected file
  const [paintingName, setPaintingName] = useState(''); // State to store the painting name
  const [selectedCategory, setSelectedCategory] = useState(''); // State to store the selected category

  const { list: categories, loading: categoriesLoading } = useSelector((state: RootState) => state.categories) as unknown as { list: { categoryName: string }[]; loading: boolean };

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(fetchCategories()); // Fetch categories when the user is logged in
    }
  }, [dispatch, isLoggedIn]);

  const handleLogout = () => {
    setIsLoggedIn(false); // עדכון מצב המשתמש ל"לא מחובר"
    navigate('/'); // חזרה לעמוד הבית
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    const userId = localStorage.getItem('userId') || '';
    console.log('category', selectedCategory);

    if (selectedFile && paintingName && selectedCategory) {
      const formData = {
        fileName: paintingName,
        categoryName: selectedCategory,
        userId: userId,
        imageFile: selectedFile
      };

      try {
        await dispatch(addPainting(formData)); // קריאת API להעלאת הציור
        alert('הציור הועלה בהצלחה!');
        setOpenUploadDialog(false); // סגירת הדיאלוג לאחר העלאה מוצלחת
        setPaintingName(''); // איפוס השדות
        setSelectedCategory('');
        setSelectedFile(null);
      } catch (error) {
        console.error('שגיאה בהעלאת הציור:', error);
        alert('אירעה שגיאה בהעלאת הציור. נסה שוב.');
      }
    } else {
      alert('אנא מלא את כל השדות.');
    }
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
            {isLoggedIn && (
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
                  onClick={() => navigate('/personal-area')}
                >
                  Personal Area
                </Button>
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
              </>
            )}
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
            onClick={() => setOpenUploadDialog(true)} // Open the dialog
          >
            העלאת ציור
          </Button>
        )}
      </Container>
      <Category />
      <HomePageMain />

      {/* Dialog for uploading a painting */}
      <Dialog open={openUploadDialog} onClose={() => setOpenUploadDialog(false)}>
        <DialogTitle>העלאת ציור</DialogTitle>
        <DialogContent>
          <TextField
            label="שם הציור"
            fullWidth
            margin="normal"
            value={paintingName}
            onChange={(e) => setPaintingName(e.target.value)}
          />
          <FormControl fullWidth margin="normal">
            <InputLabel id="category-label">קטגוריה</InputLabel>
            <Select
              labelId="category-label"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              MenuProps={{
                PaperProps: {
                  style: {
                    maxHeight: 200, // גובה מקסימלי לגלילה
                    overflowY: 'auto', // גלילה אנכית
                  },
                },
              }}
              sx={{
                background: 'rgba(255, 255, 255, 0.9)',
                borderRadius: '10px',
                boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
              }}
            >
              {categoriesLoading ? (
                <MenuItem disabled>
                  <CircularProgress size={20} />
                </MenuItem>
              ) : (
                categories.map((category, index) => (
                  <MenuItem
                    key={index}
                    value={category.categoryName}
                    sx={{
                      fontWeight: 'bold',
                      color: '#555',
                      '&:hover': {
                        background: 'linear-gradient(135deg, #84fab0, #8fd3f4)',
                        color: '#fff',
                      },
                    }}
                  >
                    {category.categoryName}
                  </MenuItem>
                ))
              )}
            </Select>
          </FormControl>
          <Button
            variant="contained"
            component="label"
            sx={{
              marginTop: '10px',
              background: 'linear-gradient(135deg, #84fab0, #8fd3f4)',
              color: '#fff',
              '&:hover': {
                background: 'linear-gradient(135deg, #8fd3f4, #84fab0)',
              },
            }}
          >
            בחר קובץ
            <input type="file" accept="image/*" hidden onChange={handleFileChange} />
          </Button>
          {selectedFile && (
            <Typography variant="body2" sx={{ marginTop: '10px' }}>
              קובץ שנבחר: {selectedFile.name}
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenUploadDialog(false)} color="secondary">
            ביטול
          </Button>
          <Button onClick={handleUpload} color="primary">
            העלאה
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default HomePage;