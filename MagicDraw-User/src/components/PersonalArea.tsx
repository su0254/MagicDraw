import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Button, TextField, Grid, Card, CardMedia, CardContent, CardActionArea } from '@mui/material';
import { AppDispatch, RootState } from '../store/store';
import { fetchPaintedPaintingsByUser } from '../store/slices/paintingPaintedSlice';
import axios from 'axios';

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
    (state: RootState) => state.paintingsPainted
  );

  const userId = localStorage.getItem('userId') || '';

  // Fetch user details
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5058/api/User/${userId}`);
        setUserDetails(response.data);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUserDetails();
    dispatch(fetchPaintedPaintingsByUser(userId));
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

  const handlePaintingClick = (paintingId: string) => {
    navigate('/show-painting', { state: { paintingId } });
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
          <Typography>Loading...</Typography>
        ) : error ? (
          <Typography color="error">Error: {error}</Typography>
        ) : paintedPaintings.length === 0 ? (
          <Typography>No painted paintings found.</Typography>
        ) : (
          <Grid container spacing={3}>
            {paintedPaintings.map((painting) => (
              <Grid item xs={12} sm={6} md={4} key={painting.id}>
                <Card>
                  <CardActionArea onClick={() => handlePaintingClick(painting.id)}>
                    <CardMedia
                      component="img"
                      height="200"
                      image={painting.imageUrl} // Assuming `imageUrl` is the property for the painting's image
                      alt={painting.name}
                    />
                    <CardContent>
                      <Typography variant="h6">{painting.name}</Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </Box>
  );
};

export default PersonalArea;