// import type React from "react"
// import { useState } from "react"
// import { useForm, Controller } from "react-hook-form"
// import { Box, Typography, TextField, Button, Paper, Alert, Snackbar } from "@mui/material"
// import { useDispatch, useSelector } from "react-redux"
// import { addUser } from "../store/slices/authSlice"
// import type { AppDispatch, RootState } from "../store/store"
// import { useNavigate } from "react-router-dom"
// import type { UserRegisterType } from "../types/UserRegisterType"
// import { useAuth } from "./AuthContext"

// // Icons
// import HowToRegIcon from "@mui/icons-material/HowToReg"
// import ArrowBackIcon from "@mui/icons-material/ArrowBack"
// import PersonIcon from "@mui/icons-material/Person"
// import EmailIcon from "@mui/icons-material/Email"
// import LockIcon from "@mui/icons-material/Lock"

// const Register: React.FC = () => {
//   const {
//     handleSubmit,
//     control,
//     formState: { errors },
//   } = useForm<UserRegisterType>()

//   const context = useAuth()
//   const setIsLoggedIn = context.setIsLoggedIn

//   const dispatch = useDispatch<AppDispatch>()
//   const navigate = useNavigate()
//   const { error } = useSelector((state: RootState) => state.auth as { loading: boolean; error: string | null })

//   const [successMessage, setSuccessMessage] = useState<string | null>(null)
//   const [failureMessage, setFailureMessage] = useState<string | null>(null)

//   const onSubmit = async (data: UserRegisterType) => {
//     try {
//       await dispatch(addUser(data)).unwrap()
//       setSuccessMessage("ההרשמה בוצעה בהצלחה!")
//       setFailureMessage(null)
//       setIsLoggedIn(true)
//       navigate("/")
//     } catch (err) {
//       setFailureMessage("ההרשמה נכשלה. אנא נסה שוב.")
//       setSuccessMessage(null)
//     }
//   }

//   const handleCancel = () => {
//     navigate("/")
//   }

//   return (
//     <Box
//       sx={{
//         minHeight: "100vh",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         background: "linear-gradient(135deg, #FAFAFA 0%, #F0F0F0 100%)",
//         fontFamily: '"Comic Sans MS", cursive, sans-serif',
//       }}
//     >
//       <Paper
//         elevation={0}
//         sx={{
//           padding: "30px",
//           borderRadius: "24px",
//           maxWidth: "400px",
//           width: "100%",
//           background: "rgba(255, 255, 255, 0.9)",
//           boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
//           border: "3px solid #FFDAC1",
//           textAlign: "center",
//         }}
//       >
//         <Box sx={{ mb: 4, display: "flex", flexDirection: "column", alignItems: "center" }}>
//           <Box
//             sx={{
//               width: "80px",
//               height: "80px",
//               borderRadius: "50%",
//               background: "linear-gradient(135deg, #FFDAC1, #FFC8A2)",
//               display: "flex",
//               justifyContent: "center",
//               alignItems: "center",
//               mb: 2,
//             }}
//           >
//             <HowToRegIcon sx={{ fontSize: "40px", color: "white" }} />
//           </Box>
//           <Typography
//             variant="h4"
//             sx={{
//               fontWeight: "bold",
//               color: "#FFDAC1",
//               fontFamily: '"Comic Sans MS", cursive, sans-serif',
//             }}
//           >
//             הרשמה
//           </Typography>
//         </Box>

//         <form onSubmit={handleSubmit(onSubmit)}>
//           <Box sx={{ mb: 3, position: "relative" }}>
//             <Controller
//               name="firstName"
//               control={control}
//               defaultValue=""
//               rules={{ required: "נדרש שם פרטי" }}
//               render={({ field }) => (
//                 <TextField
//                   {...field}
//                   label="שם פרטי"
//                   variant="outlined"
//                   fullWidth
//                   error={!!errors.firstName}
//                   helperText={errors.firstName?.message}
//                   InputProps={{
//                     startAdornment: <PersonIcon sx={{ mr: 1, color: "#FFDAC1" }} />,
//                     sx: {
//                       borderRadius: "12px",
//                       fontFamily: '"Comic Sans MS", cursive, sans-serif',
//                     },
//                   }}
//                   InputLabelProps={{
//                     sx: {
//                       fontFamily: '"Comic Sans MS", cursive, sans-serif',
//                     },
//                   }}
//                   FormHelperTextProps={{
//                     sx: {
//                       fontFamily: '"Comic Sans MS", cursive, sans-serif',
//                     },
//                   }}
//                 />
//               )}
//             />
//           </Box>

//           <Box sx={{ mb: 3, position: "relative" }}>
//             <Controller
//               name="lastName"
//               control={control}
//               defaultValue=""
//               rules={{ required: "נדרש שם משפחה" }}
//               render={({ field }) => (
//                 <TextField
//                   {...field}
//                   label="שם משפחה"
//                   variant="outlined"
//                   fullWidth
//                   error={!!errors.lastName}
//                   helperText={errors.lastName?.message}
//                   InputProps={{
//                     startAdornment: <PersonIcon sx={{ mr: 1, color: "#FFDAC1" }} />,
//                     sx: {
//                       borderRadius: "12px",
//                       fontFamily: '"Comic Sans MS", cursive, sans-serif',
//                     },
//                   }}
//                   InputLabelProps={{
//                     sx: {
//                       fontFamily: '"Comic Sans MS", cursive, sans-serif',
//                     },
//                   }}
//                   FormHelperTextProps={{
//                     sx: {
//                       fontFamily: '"Comic Sans MS", cursive, sans-serif',
//                     },
//                   }}
//                 />
//               )}
//             />
//           </Box>

//           <Box sx={{ mb: 3, position: "relative" }}>
//             <Controller
//               name="mail"
//               control={control}
//               defaultValue=""
//               rules={{ required: "נדרש אימייל" }}
//               render={({ field }) => (
//                 <TextField
//                   {...field}
//                   label="אימייל"
//                   variant="outlined"
//                   fullWidth
//                   error={!!errors.mail}
//                   helperText={errors.mail?.message}
//                   InputProps={{
//                     startAdornment: <EmailIcon sx={{ mr: 1, color: "#FFDAC1" }} />,
//                     sx: {
//                       borderRadius: "12px",
//                       fontFamily: '"Comic Sans MS", cursive, sans-serif',
//                     },
//                   }}
//                   InputLabelProps={{
//                     sx: {
//                       fontFamily: '"Comic Sans MS", cursive, sans-serif',
//                     },
//                   }}
//                   FormHelperTextProps={{
//                     sx: {
//                       fontFamily: '"Comic Sans MS", cursive, sans-serif',
//                     },
//                   }}
//                 />
//               )}
//             />
//           </Box>

//           <Box sx={{ mb: 3, position: "relative" }}>
//             <Controller
//               name="password"
//               control={control}
//               defaultValue=""
//               rules={{ required: "נדרשת סיסמה" }}
//               render={({ field }) => (
//                 <TextField
//                   {...field}
//                   label="סיסמה"
//                   type="password"
//                   variant="outlined"
//                   fullWidth
//                   error={!!errors.password}
//                   helperText={errors.password?.message}
//                   InputProps={{
//                     startAdornment: <LockIcon sx={{ mr: 1, color: "#FFDAC1" }} />,
//                     sx: {
//                       borderRadius: "12px",
//                       fontFamily: '"Comic Sans MS", cursive, sans-serif',
//                     },
//                   }}
//                   InputLabelProps={{
//                     sx: {
//                       fontFamily: '"Comic Sans MS", cursive, sans-serif',
//                     },
//                   }}
//                   FormHelperTextProps={{
//                     sx: {
//                       fontFamily: '"Comic Sans MS", cursive, sans-serif',
//                     },
//                   }}
//                 />
//               )}
//             />
//           </Box>

//           {error && (
//             <Typography
//               color="error"
//               variant="body2"
//               sx={{ marginTop: "10px", fontFamily: '"Comic Sans MS", cursive, sans-serif' }}
//             >
//               {error}
//             </Typography>
//           )}

//           <Button
//             type="submit"
//             variant="contained"
//             fullWidth
//             sx={{
//               marginTop: "20px",
//               padding: "12px",
//               fontWeight: "bold",
//               background: "linear-gradient(45deg, #FFDAC1, #FFC8A2)",
//               color: "#fff",
//               borderRadius: "12px",
//               boxShadow: "0 4px 10px rgba(255, 218, 193, 0.3)",
//               fontFamily: '"Comic Sans MS", cursive, sans-serif',
//               "&:hover": {
//                 background: "linear-gradient(45deg, #FFC8A2, #FFDAC1)",
//                 boxShadow: "0 6px 15px rgba(255, 218, 193, 0.4)",
//               },
//             }}
//             // disabled={loading}
//           >
//             הרשמה
//           </Button>

//           <Button
//             variant="outlined"
//             fullWidth
//             sx={{
//               marginTop: "10px",
//               padding: "12px",
//               fontWeight: "bold",
//               color: "#FFDAC1",
//               borderColor: "#FFC8A2",
//               borderRadius: "12px",
//               fontFamily: '"Comic Sans MS", cursive, sans-serif',
//               "&:hover": {
//                 borderColor: "#FFDAC1",
//                 background: "rgba(255, 218, 193, 0.05)",
//               },
//             }}
//             onClick={handleCancel}
//             startIcon={<ArrowBackIcon />}
//           >
//             חזרה
//           </Button>
//         </form>
//       </Paper>

//       {/* אלרטים להודעות הצלחה וכישלון */}
//       <Snackbar
//         open={!!successMessage}
//         autoHideDuration={6000}
//         onClose={() => setSuccessMessage(null)}
//         anchorOrigin={{ vertical: "top", horizontal: "center" }}
//       >
//         <Alert
//           onClose={() => setSuccessMessage(null)}
//           severity="success"
//           sx={{ width: "100%", fontFamily: '"Comic Sans MS", cursive, sans-serif' }}
//         >
//           {successMessage}
//         </Alert>
//       </Snackbar>
//       <Snackbar
//         open={!!failureMessage}
//         autoHideDuration={6000}
//         onClose={() => setFailureMessage(null)}
//         anchorOrigin={{ vertical: "top", horizontal: "center" }}
//       >
//         <Alert
//           onClose={() => setFailureMessage(null)}
//           severity="error"
//           sx={{ width: "100%", fontFamily: '"Comic Sans MS", cursive, sans-serif' }}
//         >
//           {failureMessage}
//         </Alert>
//       </Snackbar>
//     </Box>
//   )
// }

// export default Register

"use client"

import type React from "react"
import { useState } from "react"
import { useForm, Controller } from "react-hook-form"
import { Box, Typography, TextField, Button, Paper, CircularProgress, Fade, Zoom, Collapse } from "@mui/material"
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
import CheckCircleIcon from "@mui/icons-material/CheckCircle"
import ErrorIcon from "@mui/icons-material/Error"
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome"
import StarIcon from "@mui/icons-material/Star"
import CloseIcon from "@mui/icons-material/Close"
import CelebrationIcon from "@mui/icons-material/Celebration"
import GroupAddIcon from "@mui/icons-material/GroupAdd"

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
  const { loading, error } = useSelector((state: RootState) => state.auth as { loading: boolean; error: string | null })

  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [failureMessage, setFailureMessage] = useState<string | null>(null)
  const [showSparkles, setShowSparkles] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false) // Track if form was submitted

  const onSubmit = async (data: UserRegisterType) => {
    setIsSubmitting(true) // Start animations
    setFailureMessage(null) // Clear any previous error messages

    try {
      await dispatch(addUser(data)).unwrap()
      setSuccessMessage("ההרשמה בוצעה בהצלחה! ברוכים הבאים! 🎉")
      setShowSparkles(true)

      // Hide sparkles after animation
      setTimeout(() => setShowSparkles(false), 2500)

      // Navigate after showing success message
      setTimeout(() => {
        setIsLoggedIn(true)
        navigate("/")
      }, 2000)
    } catch (err) {
      setFailureMessage("ההרשמה נכשלה. אנא בדוק את הפרטים ונסה שוב.")
      setSuccessMessage(null)
      setIsSubmitting(false) // Stop animations on error
    }
  }

  const handleCancel = () => {
    navigate("/")
  }

  // Sparkle animation component
  const Sparkles = () => (
    <Box
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        pointerEvents: "none",
        overflow: "hidden",
        zIndex: 10,
      }}
    >
      {[...Array(12)].map((_, i) => (
        <Box
          key={i}
          sx={{
            position: "absolute",
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animation: "sparkle 2.5s ease-out",
            animationDelay: `${Math.random() * 1}s`,
            "@keyframes sparkle": {
              "0%": { opacity: 0, transform: "scale(0) rotate(0deg)" },
              "50%": { opacity: 1, transform: "scale(1) rotate(180deg)" },
              "100%": { opacity: 0, transform: "scale(0) rotate(360deg)" },
            },
          }}
        >
          <StarIcon sx={{ color: "#FFD700", fontSize: "1.2rem" }} />
        </Box>
      ))}
    </Box>
  )

  // Custom Success Message Component
  const SuccessMessage = () => (
    <Zoom in={!!successMessage}>
      <Paper
        elevation={0}
        sx={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 1000,
          p: 4,
          borderRadius: "20px",
          background: "linear-gradient(135deg, #FFDAC1 0%, #FFC8A2 100%)",
          border: "3px solid #FFC8A2",
          textAlign: "center",
          minWidth: "320px",
          boxShadow: "0 15px 35px rgba(0,0,0,0.2)",
        }}
      >
        <Box sx={{ position: "relative" }}>
          {showSparkles && <Sparkles />}

          <Box
            sx={{
              width: 90,
              height: 90,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #FFC8A2 0%, #FFDAC1 100%)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              mx: "auto",
              mb: 2,
              position: "relative",
              animation: "celebrationBounce 1.5s ease-in-out infinite",
              "@keyframes celebrationBounce": {
                "0%, 100%": { transform: "translateY(0) scale(1)" },
                "25%": { transform: "translateY(-15px) scale(1.1)" },
                "50%": { transform: "translateY(-5px) scale(1.05)" },
                "75%": { transform: "translateY(-10px) scale(1.08)" },
              },
            }}
          >
            <CheckCircleIcon sx={{ fontSize: "3.5rem", color: "white" }} />

            {/* Celebration confetti around the icon */}
            <CelebrationIcon
              sx={{
                position: "absolute",
                top: -10,
                right: -10,
                fontSize: "1.5rem",
                color: "#FFD700",
                animation: "confetti 2s ease-in-out infinite",
                "@keyframes confetti": {
                  "0%, 100%": { transform: "rotate(0deg) scale(1)" },
                  "25%": { transform: "rotate(15deg) scale(1.2)" },
                  "50%": { transform: "rotate(-10deg) scale(0.9)" },
                  "75%": { transform: "rotate(20deg) scale(1.1)" },
                },
              }}
            />
          </Box>

          <Typography
            variant="h4"
            sx={{
              fontWeight: "bold",
              color: "white",
              fontFamily: '"Comic Sans MS", cursive, sans-serif',
              mb: 1,
              textShadow: "2px 2px 4px rgba(0,0,0,0.2)",
            }}
          >
            מזל טוב! 🎊
          </Typography>

          <Typography
            variant="body1"
            sx={{
              color: "white",
              fontFamily: '"Comic Sans MS", cursive, sans-serif',
              mb: 3,
              fontSize: "1.1rem",
            }}
          >
            {successMessage}
          </Typography>

          <Box sx={{ display: "flex", justifyContent: "center", gap: 1, mb: 2 }}>
            {[GroupAddIcon, AutoAwesomeIcon, CelebrationIcon].map((Icon, i) => (
              <Icon
                key={i}
                sx={{
                  color: "#FFD700",
                  fontSize: "2rem",
                  animation: `celebration 2s ease-in-out infinite ${i * 0.4}s`,
                  "@keyframes celebration": {
                    "0%, 100%": { opacity: 1, transform: "scale(1) rotate(0deg)" },
                    "25%": { opacity: 0.7, transform: "scale(1.3) rotate(90deg)" },
                    "50%": { opacity: 1, transform: "scale(0.8) rotate(180deg)" },
                    "75%": { opacity: 0.8, transform: "scale(1.2) rotate(270deg)" },
                  },
                }}
              />
            ))}
          </Box>

          <Typography
            variant="body2"
            sx={{
              color: "rgba(255, 255, 255, 0.9)",
              fontFamily: '"Comic Sans MS", cursive, sans-serif',
              fontStyle: "italic",
            }}
          >
            מעבירים אותך לגלריה...
          </Typography>
        </Box>
      </Paper>
    </Zoom>
  )

  // Custom Error Message Component
  const ErrorMessage = () => (
    <Collapse in={!!failureMessage}>
      <Paper
        elevation={0}
        sx={{
          position: "fixed",
          top: 100,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 1000,
          p: 3,
          borderRadius: "16px",
          background: "linear-gradient(135deg, #FF9AA2 0%, #FFB7B2 100%)",
          border: "3px solid #FFB7B2",
          textAlign: "center",
          minWidth: "340px",
          boxShadow: "0 10px 25px rgba(255, 154, 162, 0.3)",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, flex: 1 }}>
            <Box
              sx={{
                width: 55,
                height: 55,
                borderRadius: "50%",
                background: "rgba(255, 255, 255, 0.2)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                animation: "errorShake 0.6s ease-in-out",
                "@keyframes errorShake": {
                  "0%, 100%": { transform: "translateX(0) rotate(0deg)" },
                  "25%": { transform: "translateX(-8px) rotate(-5deg)" },
                  "75%": { transform: "translateX(8px) rotate(5deg)" },
                },
              }}
            >
              <ErrorIcon sx={{ fontSize: "2.2rem", color: "white" }} />
            </Box>

            <Box sx={{ textAlign: "right", flex: 1 }}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "bold",
                  color: "white",
                  fontFamily: '"Comic Sans MS", cursive, sans-serif',
                  mb: 0.5,
                }}
              >
                אופס! משהו השתבש 😅
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: "white",
                  fontFamily: '"Comic Sans MS", cursive, sans-serif',
                  opacity: 0.9,
                }}
              >
                {failureMessage}
              </Typography>
            </Box>
          </Box>

          <Button
            size="small"
            onClick={() => setFailureMessage(null)}
            sx={{
              minWidth: "auto",
              width: 36,
              height: 36,
              borderRadius: "50%",
              color: "white",
              "&:hover": {
                background: "rgba(255, 255, 255, 0.1)",
                transform: "scale(1.1)",
              },
              transition: "all 0.3s ease",
            }}
          >
            <CloseIcon fontSize="small" />
          </Button>
        </Box>
      </Paper>
    </Collapse>
  )

  // Check if we should show loading animations (only after submit and while loading)
  const showLoadingAnimations = isSubmitting && loading

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #FAFAFA 0%, #F0F0F0 100%)",
        fontFamily: '"Comic Sans MS", cursive, sans-serif',
        position: "relative",
      }}
    >
      <Paper
        elevation={0}
        sx={{
          padding: "30px",
          borderRadius: "24px",
          maxWidth: "420px",
          width: "100%",
          background: "rgba(255, 255, 255, 0.9)",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
          border: "3px solid #FFDAC1",
          textAlign: "center",
          position: "relative",
        }}
      >
        <Box sx={{ mb: 4, display: "flex", flexDirection: "column", alignItems: "center" }}>
          <Box
            sx={{
              width: "85px",
              height: "85px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, #FFDAC1, #FFC8A2)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              mb: 2,
              position: "relative",
              // Only animate if we're showing loading animations
              animation: showLoadingAnimations ? "registerPulse 1.8s ease-in-out infinite" : "none",
              "@keyframes registerPulse": {
                "0%": { transform: "scale(1)" },
                "50%": { transform: "scale(1.08)" },
                "100%": { transform: "scale(1)" },
              },
            }}
          >
            {showLoadingAnimations ? (
              <CircularProgress
                size={45}
                sx={{
                  color: "white",
                  animation: "registerSpin 1.2s linear infinite",
                  "@keyframes registerSpin": {
                    "0%": { transform: "rotate(0deg)" },
                    "100%": { transform: "rotate(360deg)" },
                  },
                }}
              />
            ) : (
              <HowToRegIcon sx={{ fontSize: "42px", color: "white" }} />
            )}

            {/* Only show the golden star when loading animations are active */}
            {showLoadingAnimations && (
              <Box
                sx={{
                  position: "absolute",
                  top: -12,
                  right: -12,
                  width: 24,
                  height: 24,
                  borderRadius: "50%",
                  background: "#FFD700",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  animation: "registerBounce 1.2s ease-in-out infinite",
                  "@keyframes registerBounce": {
                    "0%, 100%": { transform: "translateY(0) scale(1)" },
                    "50%": { transform: "translateY(-8px) scale(1.1)" },
                  },
                }}
              >
                <AutoAwesomeIcon sx={{ fontSize: "14px", color: "white" }} />
              </Box>
            )}
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

          {/* Only show loading text when loading animations are active */}
          {showLoadingAnimations && (
            <Fade in={showLoadingAnimations}>
              <Typography
                variant="body2"
                sx={{
                  color: "#FFDAC1",
                  fontFamily: '"Comic Sans MS", cursive, sans-serif',
                  mt: 1,
                  animation: "registerFade 2.5s ease-in-out infinite",
                  "@keyframes registerFade": {
                    "0%, 100%": { opacity: 0.6 },
                    "50%": { opacity: 1 },
                  },
                }}
              >
                יוצר את החשבון שלך... ⭐
              </Typography>
            </Fade>
          )}
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
                  disabled={showLoadingAnimations}
                  error={!!errors.firstName}
                  helperText={errors.firstName?.message}
                  InputProps={{
                    startAdornment: <PersonIcon sx={{ mr: 1, color: "#FFDAC1" }} />,
                    sx: {
                      borderRadius: "12px",
                      fontFamily: '"Comic Sans MS", cursive, sans-serif',
                      opacity: showLoadingAnimations ? 0.7 : 1,
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
                  disabled={showLoadingAnimations}
                  error={!!errors.lastName}
                  helperText={errors.lastName?.message}
                  InputProps={{
                    startAdornment: <PersonIcon sx={{ mr: 1, color: "#FFDAC1" }} />,
                    sx: {
                      borderRadius: "12px",
                      fontFamily: '"Comic Sans MS", cursive, sans-serif',
                      opacity: showLoadingAnimations ? 0.7 : 1,
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
                  disabled={showLoadingAnimations}
                  error={!!errors.mail}
                  helperText={errors.mail?.message}
                  InputProps={{
                    startAdornment: <EmailIcon sx={{ mr: 1, color: "#FFDAC1" }} />,
                    sx: {
                      borderRadius: "12px",
                      fontFamily: '"Comic Sans MS", cursive, sans-serif',
                      opacity: showLoadingAnimations ? 0.7 : 1,
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
                  disabled={showLoadingAnimations}
                  error={!!errors.password}
                  helperText={errors.password?.message}
                  InputProps={{
                    startAdornment: <LockIcon sx={{ mr: 1, color: "#FFDAC1" }} />,
                    sx: {
                      borderRadius: "12px",
                      fontFamily: '"Comic Sans MS", cursive, sans-serif',
                      opacity: showLoadingAnimations ? 0.7 : 1,
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
            disabled={showLoadingAnimations}
            sx={{
              marginTop: "20px",
              padding: "12px",
              fontWeight: "bold",
              background: showLoadingAnimations
                ? "linear-gradient(45deg, #ccc, #bbb)"
                : "linear-gradient(45deg, #FFDAC1, #FFC8A2)",
              color: "#fff",
              borderRadius: "12px",
              boxShadow: showLoadingAnimations ? "none" : "0 4px 10px rgba(255, 218, 193, 0.3)",
              fontFamily: '"Comic Sans MS", cursive, sans-serif',
              position: "relative",
              overflow: "hidden",
              "&:hover": {
                background: showLoadingAnimations
                  ? "linear-gradient(45deg, #ccc, #bbb)"
                  : "linear-gradient(45deg, #FFC8A2, #FFDAC1)",
                boxShadow: showLoadingAnimations ? "none" : "0 6px 15px rgba(255, 218, 193, 0.4)",
              },
              "&:disabled": {
                color: "white",
              },
            }}
          >
            {showLoadingAnimations ? (
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <CircularProgress size={22} sx={{ color: "white" }} />
                <span>נרשם...</span>
              </Box>
            ) : (
              "הרשמה"
            )}
          </Button>

          <Button
            variant="outlined"
            fullWidth
            disabled={showLoadingAnimations}
            sx={{
              marginTop: "10px",
              padding: "12px",
              fontWeight: "bold",
              color: showLoadingAnimations ? "#ccc" : "#FFDAC1",
              borderColor: showLoadingAnimations ? "#ccc" : "#FFC8A2",
              borderRadius: "12px",
              fontFamily: '"Comic Sans MS", cursive, sans-serif',
              "&:hover": {
                borderColor: showLoadingAnimations ? "#ccc" : "#FFDAC1",
                background: showLoadingAnimations ? "transparent" : "rgba(255, 218, 193, 0.05)",
              },
            }}
            onClick={handleCancel}
            startIcon={<ArrowBackIcon />}
          >
            חזרה
          </Button>
        </form>
      </Paper>

      {/* Custom Messages */}
      {successMessage && <SuccessMessage />}
      {failureMessage && <ErrorMessage />}
    </Box>
  )
}

export default Register
