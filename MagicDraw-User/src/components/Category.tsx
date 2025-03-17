import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, Typography } from '@mui/material';
import { fetchCategories } from '../store/slices/categorySlice'; // Import the fetchCategories action
import { AppDispatch, RootState } from '../store/store'; // Import RootState type

const Category: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { list: categories, loading, error } = useSelector((state: RootState) => state.categories) as unknown as { list: { categoryName: string }[]; loading: boolean; error: string | null }; // Access categories state

  useEffect(() => {
    dispatch(fetchCategories()); // Fetch categories on component mount
  }, [dispatch]);
console.log("category component",categories);

  // Define pastel gradients for each category
  const gradients = [
    'linear-gradient(135deg, #84fab0, #8fd3f4)', // Green-Blue
    'linear-gradient(135deg, #ff9a9e, #fad0c4)', // Pink
    'linear-gradient(135deg, #a18cd1, #fbc2eb)', // Purple-Pink
    'linear-gradient(135deg, #fad0c4, #ff9a9e)', // Peach
  ];

  if (loading) {
    return (
      <Typography
        variant="h6"
        sx={{
          fontWeight: 'bold',
          color: '#555',
          marginTop: '20px',
        }}
      >
        Loading categories...
      </Typography>
    );
  }

  if (error) {
    return (
      <Typography
        variant="h6"
        sx={{
          fontWeight: 'bold',
          color: 'red',
          marginTop: '20px',
        }}
      >
        Error: {error}
      </Typography>
    );
  }

  return (
    <Box
      sx={{
        position: 'absolute',
        top: '100px',
        right: '20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        gap: '15px', // Increased gap for better spacing
      }}
    >
      <Typography
        variant="h6"
        sx={{
          fontWeight: 'bold',
          color: '#555',
          marginBottom: '10px',
        }}
      >
        Categories
      </Typography>
      {categories.map((category, index) => (
        <Button
          key={index}
          sx={{
            width: '200px', // Uniform width
            height: '50px', // Uniform height
            fontWeight: 'bold',
            fontSize: '16px', // Larger font size
            borderRadius: '25px',
            background: gradients[index % gradients.length], // Cycle through gradients
            color: '#fff',
            '&:hover': {
              background: gradients[index % gradients.length].replace('135deg', '-135deg'), // Reverse gradient direction on hover
            },
          }}
        >
          {category.categoryName}
        </Button>
      ))}
    </Box>
  );
};

export default Category;