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
  const token=sessionStorage.getItem('token');

  // Fetch user details
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5058/api/User/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`, // החלף ב-token שלך
            'Content-Type': 'application/json'
          },
        });
        
        setUserDetails(response.data);
      } catch (error) {
        console.error('Error fetching user details:', error);
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
      alert('Details updated successfully!');
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating user details:', error);
      alert('Failed to update details. Please try again.');
    }
  };

  const handlePaintingClick = (imagePath: string) => {
    navigate('/show-painting', { state: { selectedImage: imagePath } });
  };

  return (
    <Box sx={{ padding: '20px', maxWidth: '1200px', margin: 'auto' }}>
      <Typography variant="h4" gutterBottom>
        Personal Area
      </Typography>

      {/* User Details Section */}
      <Box sx={{ marginBottom: '30px' }}>
        <Typography variant="h5" gutterBottom>
          Personal Details
        </Typography>
        {isEditing ? (
          <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: '15px', maxWidth: '400px' }}>
            <TextField
              label="First Name"
              name="firstName"
              value={userDetails.firstName}
              onChange={handleInputChange}
              fullWidth
            />
            <TextField
              label="Last Name"
              name="lastName"
              value={userDetails.lastName}
              onChange={handleInputChange}
              fullWidth
            />
            <TextField
              label="Email"
              name="email"
              value={userDetails.email}
              onChange={handleInputChange}
              fullWidth
            />
            <Box sx={{ display: 'flex', gap: '10px' }}>
              <Button variant="contained" color="primary" onClick={handleSaveDetails}>
                Save
              </Button>
              <Button variant="outlined" color="secondary" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
            </Box>
          </Box>
        ) : (
          <Box>
            <Typography variant="body1">First Name: {userDetails.firstName}</Typography>
            <Typography variant="body1">Last Name: {userDetails.lastName}</Typography>
            <Typography variant="body1">Email: {userDetails.email}</Typography>
            <Button variant="contained" sx={{ marginTop: '10px' }} onClick={() => setIsEditing(true)}>
              Edit Details
            </Button>
          </Box>
        )}
      </Box>

      {/* Painted Paintings Section */}
      <Box>
        <Typography variant="h5" gutterBottom>
          Your Painted Paintings
        </Typography>
        {loading ? (
          <CircularProgress />
        ) : error ? (
          <Typography color="error">Error: {error}</Typography>
        ) : paintedPaintings.length === 0 ? (
          <Typography>No painted paintings found.</Typography>
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
                  width: '200px',
                  height: '250px',
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
                  src={painting.url} // Assuming `imageUrl` is the property for the painting's image
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