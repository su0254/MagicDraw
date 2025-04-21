import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Button, TextField, CircularProgress } from '@mui/material';
import { AppDispatch, RootState } from '../store/store';
import { fetchPaintedPaintingsByUser } from '../store/slices/paintingPaintedSlice';
import axios from 'axios';

const gradients = [
  'linear-gradient(135deg, #84fab0, #8fd3f4)', // Green-Blue
  'linear-gradient(135deg, #ff9a9e, #fad0c4)', // Pink
  'linear-gradient(135deg, #a18cd1, #fbc2eb)', // Purple-Pink
];

const PersonalArea: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [userDetails, setUserDetails] = useState({
    firstName: '',
    lastName: '',
    email: '',
  });
  const [isEditing, setIsEditing] = useState(false);

  const { list: paintedPaintings, loading, error } = useSelector(
    (state: RootState) => state.paintedPaintings
  );

  const userId = localStorage.getItem('userId') || '';

  // Fetch user details
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5058/api/User/${userId}`);
        setUserDetails(response.data);
      } catch (error) {
        console.error('שגיאה בשליפת פרטי המשתמש:', error);
      }
    };

    fetchUserDetails();
    dispatch(fetchPaintedPaintingsByUser());
  }, [dispatch, userId]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSaveDetails = async () => {
    try {
      await axios.put(`http://localhost:5058/api/User/${userId}`, userDetails);
      alert('הפרטים עודכנו בהצלחה!');
      setIsEditing(false);
    } catch (error) {
      console.error('שגיאה בעדכון פרטי המשתמש:', error);
      alert('עדכון הפרטים נכשל. נסה שוב.');
    }
  };

  const handlePaintingClick = (paintingId: string) => {
    navigate('/show-painting', { state: { paintingId } });
  };

  return (
    <Box
      sx={{
        padding: '20px',
        maxWidth: '1200px',
        margin: 'auto',
        direction: 'rtl',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
      }}
    >
      <Typography variant="h4" gutterBottom sx={{ color: '#333', textAlign: 'center', fontSize: 'clamp(1.5rem, 2.5vw, 2.5rem)' }}>
        האזור האישי
      </Typography>

      {/* User Details Section */}
      <Box
        sx={{
          marginBottom: '30px',
          textAlign: 'center',
          width: '100%',
          maxWidth: '400px',
        }}
      >
        <Typography variant="h5" gutterBottom sx={{ color: '#555', fontSize: 'clamp(1.2rem, 2vw, 1.8rem)' }}>
          פרטים אישיים
        </Typography>
        {isEditing ? (
          <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <TextField
              label="שם פרטי"
              name="firstName"
              value={userDetails.firstName}
              onChange={handleInputChange}
              fullWidth
              inputProps={{ style: { textAlign: 'right' } }}
            />
            <TextField
              label="שם משפחה"
              name="lastName"
              value={userDetails.lastName}
              onChange={handleInputChange}
              fullWidth
              inputProps={{ style: { textAlign: 'right' } }}
            />
            <TextField
              label="אימייל"
              name="email"
              value={userDetails.email}
              onChange={handleInputChange}
              fullWidth
              inputProps={{ style: { textAlign: 'right' } }}
            />
            <Box sx={{ display: 'flex', gap: '10px' }}>
              <Button
                variant="contained"
                onClick={handleSaveDetails}
                sx={{
                  flex: 1,
                  marginTop: '10px',
                  background: 'linear-gradient(135deg, #a18cd1, #fbc2eb)',
                  color: '#fff',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #fbc2eb, #a18cd1)',
                  },
                }}
              >
                שמור
              </Button>
              <Button
                variant="outlined"
                onClick={() => setIsEditing(false)}
                sx={{
                  flex: 1,
                  borderColor: gradients[1],
                  color: gradients[1],
                  
                }}
              >
                ביטול
              </Button>
            </Box>
          </Box>
        ) : (
          <Box>
            <Typography variant="body1" sx={{ color: '#555', fontSize: 'clamp(1rem, 1.5vw, 1.2rem)' }}>
              שם פרטי: {userDetails.firstName}
            </Typography>
            <Typography variant="body1" sx={{ color: '#555', fontSize: 'clamp(1rem, 1.5vw, 1.2rem)' }}>
              שם משפחה: {userDetails.lastName}
            </Typography>
            <Typography variant="body1" sx={{ color: '#555', fontSize: 'clamp(1rem, 1.5vw, 1.2rem)' }}>
              אימייל: {userDetails.email}
            </Typography>
            <Button
              variant="contained"
              sx={{
                marginTop: '10px',
                background: 'linear-gradient(135deg, #84fab0, #8fd3f4)',
                color: '#fff',
                '&:hover': {
                  background: 'linear-gradient(135deg, #8fd3f4, #84fab0)',
                },
              }}
              onClick={() => setIsEditing(true)}
            >
              ערוך פרטים
            </Button>
          </Box>
        )}
      </Box>

      {/* Painted Paintings Section */}
      <Box
        sx={{
          width: '100%',
          textAlign: 'center',
        }}
      >
        <Typography variant="h5" gutterBottom sx={{ color: '#555', fontSize: 'clamp(1.2rem, 2vw, 1.8rem)' }}>
          הציורים שלך
        </Typography>
        {loading ? (
          <CircularProgress />
        ) : error ? (
          <Typography color="error" sx={{ textAlign: 'center' }}>שגיאה: {error}</Typography>
        ) : paintedPaintings.length === 0 ? (
          <Typography sx={{ textAlign: 'center' }}>לא נמצאו ציורים צבועים.</Typography>
        ) : (
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '20px',
              justifyContent: 'center',
              marginTop: '20px',
            }}
          >
            {paintedPaintings.map((painting, index) => (
              <Box
                key={painting.id}
                sx={{
                  cursor: 'pointer',
                  borderRadius: '15px',
                  overflow: 'hidden',
                  width: 'clamp(150px, 20vw, 200px)',
                  height: 'clamp(200px, 25vw, 250px)',
                  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  '&:hover': {
                    transform: 'scale(1.05)',
                    boxShadow: '0 6px 15px rgba(0, 0, 0, 0.3)',
                  },
                }}
                onClick={() => handlePaintingClick(painting.url)}
              >
                <img
                  src={painting.url}
                  alt={painting.fileName}
                  style={{
                    width: '100%',
                    height: '70%',
                    objectFit: 'cover',
                    borderTopLeftRadius: '15px',
                    borderTopRightRadius: '15px',
                  }}
                />
                <Box
                  sx={{
                    background: gradients[index % gradients.length],
                    color: 'white',
                    textAlign: 'center',
                    padding: '10px',
                    height: '30%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {painting.fileName}
                </Box>
              </Box>
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default PersonalArea;