import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Box, Typography, TextField, Button, Paper } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../store/slices/authSlice';
import { AppDispatch, RootState } from '../store/store';
import { UserLoginType } from '../types/UserLoginType';

const Login: React.FC = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<UserLoginType>();

  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector((state: RootState) => state.auth as { loading: boolean; error: string | null }); // Access Redux state

  const onSubmit = (data: UserLoginType) => {
    dispatch(login(data)); // Dispatch the login action
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
            {/* {loading ? <CircularProgress size={24} sx={{ color: '#fff' }} /> : 'Login'} */}
            Login
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default Login;