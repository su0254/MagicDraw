// import React, { useState } from 'react';
// import { useForm, Controller } from 'react-hook-form';
// import { Box, Typography, TextField, Button, Paper, Alert, Snackbar } from '@mui/material';
// import { useDispatch, useSelector } from 'react-redux';
// import { addUser } from '../store/slices/authSlice';
// import { AppDispatch, RootState } from '../store/store';
// import { useNavigate } from 'react-router-dom';
// import { UserRegisterType } from '../types/UserRegisterType';
// import { useAuth } from './AuthContext';

// // interface RegisterFormInputs {
// //   firstName: string;
// //   lastName: string;
// // }

// const Register: React.FC = () => {
//   const {
//     handleSubmit,
//     control,
//     formState: { errors },
//   } = useForm<UserRegisterType>();

//   const context=useAuth();
//   const setIsLoggedIn =  context.setIsLoggedIn;
    
//   const dispatch = useDispatch<AppDispatch>();
//   const navigate = useNavigate();
//   const { loading, error } = useSelector((state: RootState) => state.auth as { loading: boolean; error: string | null });

//   const [successMessage, setSuccessMessage] = useState<string | null>(null); // הודעת הצלחה
//   const [failureMessage, setFailureMessage] = useState<string | null>(null); // הודעת כישלון

//   const onSubmit = async (data: UserRegisterType) => {
//     try {
//       await dispatch(addUser(data)).unwrap(); // Dispatch the addUser action
//       setSuccessMessage('Registration successful!'); // הצגת הודעת הצלחה
//       setFailureMessage(null); // איפוס הודעת כישלון
//       setIsLoggedIn(true); // עדכון מצב המשתמש ל"מחובר"
//       navigate('/'); // מעבר לעמוד הבית לאחר הרשמה מוצלחת
//     } catch (err) {
//       setFailureMessage('Failed to register. Please try again.'); // הצגת הודעת כישלון
//       setSuccessMessage(null); // איפוס הודעת הצלחה
//     }
//   };

//   const handleCancel = () => {
//     navigate('/'); // חזרה לעמוד הבית
//   };

//   return (
//     <Box
//       sx={{
//         minHeight: '100vh',
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//         background: 'linear-gradient(135deg, #f7f9fc, #eaf3fa)', // Light pastel background
//       }}
//     >
//       <Paper
//         elevation={3}
//         sx={{
//           padding: '30px',
//           borderRadius: '15px',
//           maxWidth: '400px',
//           width: '100%',
//           background: 'rgba(255, 255, 255, 0.9)', // Semi-transparent white background
//           boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
//         }}
//       >
//         <Typography
//           variant="h4"
//           align="center"
//           gutterBottom
//           sx={{
//             fontWeight: 'bold',
//             color: '#333',
//           }}
//         >
//           הרשמה
//         </Typography>
//         <form onSubmit={handleSubmit(onSubmit)}>
//           <Controller
//             name="firstName"
//             control={control}
//             defaultValue=""
//             rules={{ required: 'First name is required' }}
//             render={({ field }) => (
//               <TextField
//                 {...field}
//                 label="First Name"
//                 variant="outlined"
//                 fullWidth
//                 margin="normal"
//                 error={!!errors.firstName}
//                 helperText={errors.firstName?.message}
//               />
//             )}
//           />
//           <Controller
//             name="lastName"
//             control={control}
//             defaultValue=""
//             rules={{ required: 'Last name is required' }}
//             render={({ field }) => (
//               <TextField
//                 {...field}
//                 label="Last Name"
//                 variant="outlined"
//                 fullWidth
//                 margin="normal"
//                 error={!!errors.lastName}
//                 helperText={errors.lastName?.message}
//               />
//             )}
//           />
//           <Controller
//             name="mail"
//             control={control}
//             defaultValue=""
//             rules={{ required: 'Email is required' }}
//             render={({ field }) => (
//               <TextField
//                 {...field}
//                 label="Email"
//                 variant="outlined"
//                 fullWidth
//                 margin="normal"
//                 error={!!errors.mail}
//                 helperText={errors.mail?.message}
//               />
//             )}
//           />
//           <Controller
//             name="password"
//             control={control}
//             defaultValue=""
//             rules={{ required: 'Password is required' }}
//             render={({ field }) => (
//               <TextField
//                 {...field}
//                 label="Password"
//                 type="password"
//                 variant="outlined"
//                 fullWidth
//                 margin="normal"
//                 error={!!errors.password}
//                 helperText={errors.password?.message}
//               />
//             )}
//           />
//           {error && (
//             <Typography color="error" variant="body2" sx={{ marginTop: '10px' }}>
//               {error}
//             </Typography>
//           )}
//           <Button
//             type="submit"
//             variant="contained"
//             fullWidth
//             sx={{
//               marginTop: '20px',
//               padding: '10px',
//               fontWeight: 'bold',
//               background: 'linear-gradient(135deg, #84fab0, #8fd3f4)',
//               color: '#fff',
//               '&:hover': {
//                 background: 'linear-gradient(135deg, #8fd3f4, #84fab0)',
//               },
//             }}
//             // disabled={loading}
//           >
//             Register
//           </Button>
//           <Button
//             variant="outlined"
//             fullWidth
//             sx={{
//               marginTop: '10px',
//               padding: '10px',
//               fontWeight: 'bold',
//               color: '#555',
//               borderColor: '#ddd',
//               '&:hover': {
//                 borderColor: '#aaa',
//                 background: '#f5f5f5',
//               },
//             }}
//             onClick={handleCancel}
//           >
//             Cancel
//           </Button>
//         </form>
//       </Paper>

//       {/* אלרטים להודעות הצלחה וכישלון */}
//       <Snackbar
//         open={!!successMessage}
//         autoHideDuration={6000}
//         onClose={() => setSuccessMessage(null)}
//         anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
//       >
//         <Alert onClose={() => setSuccessMessage(null)} severity="success" sx={{ width: '100%' }}>
//           {successMessage}
//         </Alert>
//       </Snackbar>
//       <Snackbar
//         open={!!failureMessage}
//         autoHideDuration={6000}
//         onClose={() => setFailureMessage(null)}
//         anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
//       >
//         <Alert onClose={() => setFailureMessage(null)} severity="error" sx={{ width: '100%' }}>
//           {failureMessage}
//         </Alert>
//       </Snackbar>
//     </Box>
//   );
// };

// export default Register;

"use client"

import type React from "react"
import { useState } from "react"
import { useForm, Controller } from "react-hook-form"
import { Box, Typography, TextField, Button, Paper, Alert, Snackbar } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import { addUser } from "../store/slices/authSlice"
import type { AppDispatch, RootState } from "../store/store"
import { useNavigate } from "react-router-dom"
import type { UserRegisterType } from "../types/UserRegisterType"
import { useAuth } from "./AuthContext"

// Icons
import HowToRegIcon from "@mui/icons-material/HowToReg"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import PersonIcon from "@mui/icons-material/Person"
import EmailIcon from "@mui/icons-material/Email"
import LockIcon from "@mui/icons-material/Lock"

const Register: React.FC = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<UserRegisterType>()

  const context = useAuth()
  const setIsLoggedIn = context.setIsLoggedIn

  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const { error } = useSelector((state: RootState) => state.auth as { loading: boolean; error: string | null })

  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [failureMessage, setFailureMessage] = useState<string | null>(null)

  const onSubmit = async (data: UserRegisterType) => {
    try {
      await dispatch(addUser(data)).unwrap()
      setSuccessMessage("ההרשמה בוצעה בהצלחה!")
      setFailureMessage(null)
      setIsLoggedIn(true)
      navigate("/")
    } catch (err) {
      setFailureMessage("ההרשמה נכשלה. אנא נסה שוב.")
      setSuccessMessage(null)
    }
  }

  const handleCancel = () => {
    navigate("/")
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #FAFAFA 0%, #F0F0F0 100%)",
        fontFamily: '"Comic Sans MS", cursive, sans-serif',
      }}
    >
      <Paper
        elevation={0}
        sx={{
          padding: "30px",
          borderRadius: "24px",
          maxWidth: "400px",
          width: "100%",
          background: "rgba(255, 255, 255, 0.9)",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
          border: "3px solid #FFDAC1",
          textAlign: "center",
        }}
      >
        <Box sx={{ mb: 4, display: "flex", flexDirection: "column", alignItems: "center" }}>
          <Box
            sx={{
              width: "80px",
              height: "80px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, #FFDAC1, #FFC8A2)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              mb: 2,
            }}
          >
            <HowToRegIcon sx={{ fontSize: "40px", color: "white" }} />
          </Box>
          <Typography
            variant="h4"
            sx={{
              fontWeight: "bold",
              color: "#FFDAC1",
              fontFamily: '"Comic Sans MS", cursive, sans-serif',
            }}
          >
            הרשמה
          </Typography>
        </Box>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Box sx={{ mb: 3, position: "relative" }}>
            <Controller
              name="firstName"
              control={control}
              defaultValue=""
              rules={{ required: "נדרש שם פרטי" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="שם פרטי"
                  variant="outlined"
                  fullWidth
                  error={!!errors.firstName}
                  helperText={errors.firstName?.message}
                  InputProps={{
                    startAdornment: <PersonIcon sx={{ mr: 1, color: "#FFDAC1" }} />,
                    sx: {
                      borderRadius: "12px",
                      fontFamily: '"Comic Sans MS", cursive, sans-serif',
                    },
                  }}
                  InputLabelProps={{
                    sx: {
                      fontFamily: '"Comic Sans MS", cursive, sans-serif',
                    },
                  }}
                  FormHelperTextProps={{
                    sx: {
                      fontFamily: '"Comic Sans MS", cursive, sans-serif',
                    },
                  }}
                />
              )}
            />
          </Box>

          <Box sx={{ mb: 3, position: "relative" }}>
            <Controller
              name="lastName"
              control={control}
              defaultValue=""
              rules={{ required: "נדרש שם משפחה" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="שם משפחה"
                  variant="outlined"
                  fullWidth
                  error={!!errors.lastName}
                  helperText={errors.lastName?.message}
                  InputProps={{
                    startAdornment: <PersonIcon sx={{ mr: 1, color: "#FFDAC1" }} />,
                    sx: {
                      borderRadius: "12px",
                      fontFamily: '"Comic Sans MS", cursive, sans-serif',
                    },
                  }}
                  InputLabelProps={{
                    sx: {
                      fontFamily: '"Comic Sans MS", cursive, sans-serif',
                    },
                  }}
                  FormHelperTextProps={{
                    sx: {
                      fontFamily: '"Comic Sans MS", cursive, sans-serif',
                    },
                  }}
                />
              )}
            />
          </Box>

          <Box sx={{ mb: 3, position: "relative" }}>
            <Controller
              name="mail"
              control={control}
              defaultValue=""
              rules={{ required: "נדרש אימייל" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="אימייל"
                  variant="outlined"
                  fullWidth
                  error={!!errors.mail}
                  helperText={errors.mail?.message}
                  InputProps={{
                    startAdornment: <EmailIcon sx={{ mr: 1, color: "#FFDAC1" }} />,
                    sx: {
                      borderRadius: "12px",
                      fontFamily: '"Comic Sans MS", cursive, sans-serif',
                    },
                  }}
                  InputLabelProps={{
                    sx: {
                      fontFamily: '"Comic Sans MS", cursive, sans-serif',
                    },
                  }}
                  FormHelperTextProps={{
                    sx: {
                      fontFamily: '"Comic Sans MS", cursive, sans-serif',
                    },
                  }}
                />
              )}
            />
          </Box>

          <Box sx={{ mb: 3, position: "relative" }}>
            <Controller
              name="password"
              control={control}
              defaultValue=""
              rules={{ required: "נדרשת סיסמה" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="סיסמה"
                  type="password"
                  variant="outlined"
                  fullWidth
                  error={!!errors.password}
                  helperText={errors.password?.message}
                  InputProps={{
                    startAdornment: <LockIcon sx={{ mr: 1, color: "#FFDAC1" }} />,
                    sx: {
                      borderRadius: "12px",
                      fontFamily: '"Comic Sans MS", cursive, sans-serif',
                    },
                  }}
                  InputLabelProps={{
                    sx: {
                      fontFamily: '"Comic Sans MS", cursive, sans-serif',
                    },
                  }}
                  FormHelperTextProps={{
                    sx: {
                      fontFamily: '"Comic Sans MS", cursive, sans-serif',
                    },
                  }}
                />
              )}
            />
          </Box>

          {error && (
            <Typography
              color="error"
              variant="body2"
              sx={{ marginTop: "10px", fontFamily: '"Comic Sans MS", cursive, sans-serif' }}
            >
              {error}
            </Typography>
          )}

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              marginTop: "20px",
              padding: "12px",
              fontWeight: "bold",
              background: "linear-gradient(45deg, #FFDAC1, #FFC8A2)",
              color: "#fff",
              borderRadius: "12px",
              boxShadow: "0 4px 10px rgba(255, 218, 193, 0.3)",
              fontFamily: '"Comic Sans MS", cursive, sans-serif',
              "&:hover": {
                background: "linear-gradient(45deg, #FFC8A2, #FFDAC1)",
                boxShadow: "0 6px 15px rgba(255, 218, 193, 0.4)",
              },
            }}
            // disabled={loading}
          >
            הרשמה
          </Button>

          <Button
            variant="outlined"
            fullWidth
            sx={{
              marginTop: "10px",
              padding: "12px",
              fontWeight: "bold",
              color: "#FFDAC1",
              borderColor: "#FFC8A2",
              borderRadius: "12px",
              fontFamily: '"Comic Sans MS", cursive, sans-serif',
              "&:hover": {
                borderColor: "#FFDAC1",
                background: "rgba(255, 218, 193, 0.05)",
              },
            }}
            onClick={handleCancel}
            startIcon={<ArrowBackIcon />}
          >
            חזרה
          </Button>
        </form>
      </Paper>

      {/* אלרטים להודעות הצלחה וכישלון */}
      <Snackbar
        open={!!successMessage}
        autoHideDuration={6000}
        onClose={() => setSuccessMessage(null)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSuccessMessage(null)}
          severity="success"
          sx={{ width: "100%", fontFamily: '"Comic Sans MS", cursive, sans-serif' }}
        >
          {successMessage}
        </Alert>
      </Snackbar>
      <Snackbar
        open={!!failureMessage}
        autoHideDuration={6000}
        onClose={() => setFailureMessage(null)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setFailureMessage(null)}
          severity="error"
          sx={{ width: "100%", fontFamily: '"Comic Sans MS", cursive, sans-serif' }}
        >
          {failureMessage}
        </Alert>
      </Snackbar>
    </Box>
  )
}

export default Register
