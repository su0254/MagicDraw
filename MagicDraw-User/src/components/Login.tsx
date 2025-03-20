import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Box, Typography, TextField, Button, Paper, Alert, Snackbar } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../store/slices/authSlice';
import { AppDispatch, RootState } from '../store/store';
import { UserLoginType } from '../types/UserLoginType';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const Login: React.FC = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<UserLoginType>();

  const context=useAuth();
  const setIsLoggedIn =  context.setIsLoggedIn;

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state: RootState) => state.auth as { loading: boolean; error: string | null });

  const [successMessage, setSuccessMessage] = useState<string | null>(null); // הודעת הצלחה
  const [failureMessage, setFailureMessage] = useState<string | null>(null); // הודעת כישלון

  const onSubmit = async (data: UserLoginType) => {
    try {
      await dispatch(login(data)).unwrap(); // Dispatch the login action
      setSuccessMessage('Login successful!'); // הצגת הודעת הצלחה
      setFailureMessage(null); // איפוס הודעת כישלון
      setIsLoggedIn(true); // עדכון מצב המשתמש ל"מחובר"
      navigate('/'); // מעבר לעמוד הבית לאחר התחברות מוצלחת
    } catch (err) {
      setFailureMessage('Failed to login. Please check your credentials.'); // הצגת הודעת כישלון
      setSuccessMessage(null); // איפוס הודעת הצלחה
    }
  };

  const handleCancel = () => {
    navigate('/'); // חזרה לעמוד הבית
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #f7f9fc, #eaf3fa)', // Light pastel background
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: '30px',
          borderRadius: '15px',
          maxWidth: '400px',
          width: '100%',
          background: 'rgba(255, 255, 255, 0.9)', // Semi-transparent white background
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{
            fontWeight: 'bold',
            color: '#333',
          }}
        >
          Login
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="mail"
            control={control}
            defaultValue=""
            rules={{ required: 'Email is required' }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Email"
                variant="outlined"
                fullWidth
                margin="normal"
                error={!!errors.mail}
                helperText={errors.mail?.message}
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            defaultValue=""
            rules={{ required: 'Password is required' }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Password"
                type="password"
                variant="outlined"
                fullWidth
                margin="normal"
                error={!!errors.password}
                helperText={errors.password?.message}
              />
            )}
          />
          {error && (
            <Typography color="error" variant="body2" sx={{ marginTop: '10px' }}>
              {error}
            </Typography>
          )}
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              marginTop: '20px',
              padding: '10px',
              fontWeight: 'bold',
              background: 'linear-gradient(135deg, #84fab0, #8fd3f4)',
              color: '#fff',
              '&:hover': {
                background: 'linear-gradient(135deg, #8fd3f4, #84fab0)',
              },
            }}
          // disabled={loading}
          >
            Login
          </Button>
          <Button
            variant="outlined"
            fullWidth
            sx={{
              marginTop: '10px',
              padding: '10px',
              fontWeight: 'bold',
              color: '#555',
              borderColor: '#ddd',
              '&:hover': {
                borderColor: '#aaa',
                background: '#f5f5f5',
              },
            }}
            onClick={handleCancel}
          >
            Cancel
          </Button>
        </form>
      </Paper>

      {/* אלרטים להודעות הצלחה וכישלון */}
      <Snackbar
        open={!!successMessage}
        autoHideDuration={6000}
        onClose={() => setSuccessMessage(null)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={() => setSuccessMessage(null)} severity="success" sx={{ width: '100%' }}>
          {successMessage}
        </Alert>
      </Snackbar>
      <Snackbar
        open={!!failureMessage}
        autoHideDuration={6000}
        onClose={() => setFailureMessage(null)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={() => setFailureMessage(null)} severity="error" sx={{ width: '100%' }}>
          {failureMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Login;