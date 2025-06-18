// import type React from "react"
// import { useState } from "react"
// import { useForm, Controller } from "react-hook-form"
// import { Box, Typography, TextField, Button, Paper, Alert, Snackbar } from "@mui/material"
// import { useDispatch, useSelector } from "react-redux"
// import { login } from "../store/slices/authSlice"
// import type { AppDispatch, RootState } from "../store/store"
// import type { UserLoginType } from "../types/UserLoginType"
// import { useNavigate } from "react-router-dom"
// import { useAuth } from "./AuthContext"

// // Icons
// import LoginIcon from "@mui/icons-material/Login"
// import ArrowBackIcon from "@mui/icons-material/ArrowBack"
// import EmailIcon from "@mui/icons-material/Email"
// import LockIcon from "@mui/icons-material/Lock"

// const Login: React.FC = () => {
//   const {
//     handleSubmit,
//     control,
//     formState: { errors },
//   } = useForm<UserLoginType>()

//   const context = useAuth()
//   const setIsLoggedIn = context.setIsLoggedIn

//   const dispatch = useDispatch<AppDispatch>()
//   const navigate = useNavigate()
//   const {  error } = useSelector((state: RootState) => state.auth as { loading: boolean; error: string | null })

//   const [successMessage, setSuccessMessage] = useState<string | null>(null)
//   const [failureMessage, setFailureMessage] = useState<string | null>(null)

//   const onSubmit = async (data: UserLoginType) => {
//     try {
//       await dispatch(login(data)).unwrap()
//       setSuccessMessage("התחברות בוצעה בהצלחה!")
//       setFailureMessage(null)
//       setIsLoggedIn(true)
//       navigate("/")
//     } catch (err) {
//       setFailureMessage("ההתחברות נכשלה. אנא בדוק את פרטי ההתחברות שלך.")
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
//           border: "3px solid #FFB7B2",
//           textAlign: "center",
//         }}
//       >
//         <Box sx={{ mb: 4, display: "flex", flexDirection: "column", alignItems: "center" }}>
//           <Box
//             sx={{
//               width: "80px",
//               height: "80px",
//               borderRadius: "50%",
//               background: "linear-gradient(135deg, #FF9AA2, #FFB7B2)",
//               display: "flex",
//               justifyContent: "center",
//               alignItems: "center",
//               mb: 2,
//             }}
//           >
//             <LoginIcon sx={{ fontSize: "40px", color: "white" }} />
//           </Box>
//           <Typography
//             variant="h4"
//             sx={{
//               fontWeight: "bold",
//               color: "#FF9AA2",
//               fontFamily: '"Comic Sans MS", cursive, sans-serif',
//             }}
//           >
//             התחברות
//           </Typography>
//         </Box>

//         <form onSubmit={handleSubmit(onSubmit)}>
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
//                     startAdornment: <EmailIcon sx={{ mr: 1, color: "#FF9AA2" }} />,
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
//                     startAdornment: <LockIcon sx={{ mr: 1, color: "#FF9AA2" }} />,
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
//               background: "linear-gradient(45deg, #FF9AA2, #FFB7B2)",
//               color: "#fff",
//               borderRadius: "12px",
//               boxShadow: "0 4px 10px rgba(255, 154, 162, 0.3)",
//               fontFamily: '"Comic Sans MS", cursive, sans-serif',
//               "&:hover": {
//                 background: "linear-gradient(45deg, #FFB7B2, #FF9AA2)",
//                 boxShadow: "0 6px 15px rgba(255, 154, 162, 0.4)",
//               },
//             }}
//             // disabled={loading}
//           >
//             התחברות
//           </Button>

//           <Button
//             variant="outlined"
//             fullWidth
//             sx={{
//               marginTop: "10px",
//               padding: "12px",
//               fontWeight: "bold",
//               color: "#FF9AA2",
//               borderColor: "#FFB7B2",
//               borderRadius: "12px",
//               fontFamily: '"Comic Sans MS", cursive, sans-serif',
//               "&:hover": {
//                 borderColor: "#FF9AA2",
//                 background: "rgba(255, 154, 162, 0.05)",
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

// export default Login

"use client"

import type React from "react"
import { useState } from "react"
import { useForm, Controller } from "react-hook-form"
import { Box, Typography, TextField, Button, Paper, CircularProgress, Fade, Zoom, Collapse } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import { login } from "../store/slices/authSlice"
import type { AppDispatch, RootState } from "../store/store"
import type { UserLoginType } from "../types/UserLoginType"
import { useNavigate } from "react-router-dom"
import { useAuth } from "./AuthContext"

// Icons
import LoginIcon from "@mui/icons-material/Login"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import EmailIcon from "@mui/icons-material/Email"
import LockIcon from "@mui/icons-material/Lock"
import CheckCircleIcon from "@mui/icons-material/CheckCircle"
import ErrorIcon from "@mui/icons-material/Error"
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome"
import StarIcon from "@mui/icons-material/Star"
import CloseIcon from "@mui/icons-material/Close"

const Login: React.FC = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<UserLoginType>()

  const context = useAuth()
  const setIsLoggedIn = context.setIsLoggedIn

  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const { loading, error } = useSelector((state: RootState) => state.auth as { loading: boolean; error: string | null })

  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [failureMessage, setFailureMessage] = useState<string | null>(null)
  const [showSparkles, setShowSparkles] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false) // New state to track if form was submitted

  const onSubmit = async (data: UserLoginType) => {
    setIsSubmitting(true) // Start animations
    setFailureMessage(null) // Clear any previous error messages

    try {
      await dispatch(login(data)).unwrap()
      setSuccessMessage("התחברות בוצעה בהצלחה! 🎉")
      setShowSparkles(true)

      // Hide sparkles after animation
      setTimeout(() => setShowSparkles(false), 2000)

      // Navigate after showing success message
      setTimeout(() => {
        setIsLoggedIn(true)
        navigate("/")
      }, 1500)
    } catch (err) {
      setFailureMessage("ההתחברות נכשלה. אנא בדוק את פרטי ההתחברות שלך.")
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
      {[...Array(8)].map((_, i) => (
        <Box
          key={i}
          sx={{
            position: "absolute",
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animation: "sparkle 2s ease-out",
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
          background: "linear-gradient(135deg, #E2F0CB 0%, #B5EAD7 100%)",
          border: "3px solid #B5EAD7",
          textAlign: "center",
          minWidth: "300px",
          boxShadow: "0 15px 35px rgba(0,0,0,0.2)",
        }}
      >
        <Box sx={{ position: "relative" }}>
          {showSparkles && <Sparkles />}

          <Box
            sx={{
              width: 80,
              height: 80,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #B5EAD7 0%, #E2F0CB 100%)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              mx: "auto",
              mb: 2,
              animation: "bounce 1s ease-in-out infinite",
              "@keyframes bounce": {
                "0%, 100%": { transform: "translateY(0)" },
                "50%": { transform: "translateY(-10px)" },
              },
            }}
          >
            <CheckCircleIcon sx={{ fontSize: "3rem", color: "white" }} />
          </Box>

          <Typography
            variant="h5"
            sx={{
              fontWeight: "bold",
              color: "white",
              fontFamily: '"Comic Sans MS", cursive, sans-serif',
              mb: 1,
              textShadow: "1px 1px 2px rgba(0,0,0,0.1)",
            }}
          >
            מעולה! 🎉
          </Typography>

          <Typography
            variant="body1"
            sx={{
              color: "white",
              fontFamily: '"Comic Sans MS", cursive, sans-serif',
              mb: 2,
            }}
          >
            {successMessage}
          </Typography>

          <Box sx={{ display: "flex", justifyContent: "center", gap: 1 }}>
            {[...Array(3)].map((_, i) => (
              <AutoAwesomeIcon
                key={i}
                sx={{
                  color: "#FFD700",
                  fontSize: "1.5rem",
                  animation: `twinkle 1.5s ease-in-out infinite ${i * 0.3}s`,
                  "@keyframes twinkle": {
                    "0%, 100%": { opacity: 1, transform: "scale(1)" },
                    "50%": { opacity: 0.5, transform: "scale(1.2)" },
                  },
                }}
              />
            ))}
          </Box>
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
          minWidth: "320px",
          boxShadow: "0 10px 25px rgba(255, 154, 162, 0.3)",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, flex: 1 }}>
            <Box
              sx={{
                width: 50,
                height: 50,
                borderRadius: "50%",
                background: "rgba(255, 255, 255, 0.2)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                animation: "shake 0.5s ease-in-out",
                "@keyframes shake": {
                  "0%, 100%": { transform: "translateX(0)" },
                  "25%": { transform: "translateX(-5px)" },
                  "75%": { transform: "translateX(5px)" },
                },
              }}
            >
              <ErrorIcon sx={{ fontSize: "2rem", color: "white" }} />
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
                אופס! 😅
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
              width: 32,
              height: 32,
              borderRadius: "50%",
              color: "white",
              "&:hover": {
                background: "rgba(255, 255, 255, 0.1)",
              },
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
          maxWidth: "400px",
          width: "100%",
          background: "rgba(255, 255, 255, 0.9)",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
          border: "3px solid #FFB7B2",
          textAlign: "center",
          position: "relative",
        }}
      >
        <Box sx={{ mb: 4, display: "flex", flexDirection: "column", alignItems: "center" }}>
          <Box
            sx={{
              width: "80px",
              height: "80px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, #FF9AA2, #FFB7B2)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              mb: 2,
              position: "relative",
              // Only animate if we're showing loading animations
              animation: showLoadingAnimations ? "pulse 1.5s ease-in-out infinite" : "none",
              "@keyframes pulse": {
                "0%": { transform: "scale(1)" },
                "50%": { transform: "scale(1.05)" },
                "100%": { transform: "scale(1)" },
              },
            }}
          >
            {showLoadingAnimations ? (
              <CircularProgress
                size={40}
                sx={{
                  color: "white",
                  animation: "spin 1s linear infinite",
                  "@keyframes spin": {
                    "0%": { transform: "rotate(0deg)" },
                    "100%": { transform: "rotate(360deg)" },
                  },
                }}
              />
            ) : (
              <LoginIcon sx={{ fontSize: "40px", color: "white" }} />
            )}

            {/* Only show the golden star when loading animations are active */}
            {showLoadingAnimations && (
              <Box
                sx={{
                  position: "absolute",
                  top: -10,
                  right: -10,
                  width: 20,
                  height: 20,
                  borderRadius: "50%",
                  background: "#FFD700",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  animation: "bounce 1s ease-in-out infinite",
                }}
              >
                <AutoAwesomeIcon sx={{ fontSize: "12px", color: "white" }} />
              </Box>
            )}
          </Box>

          <Typography
            variant="h4"
            sx={{
              fontWeight: "bold",
              color: "#FF9AA2",
              fontFamily: '"Comic Sans MS", cursive, sans-serif',
            }}
          >
            התחברות
          </Typography>

          {/* Only show loading text when loading animations are active */}
          {showLoadingAnimations && (
            <Fade in={showLoadingAnimations}>
              <Typography
                variant="body2"
                sx={{
                  color: "#FF9AA2",
                  fontFamily: '"Comic Sans MS", cursive, sans-serif',
                  mt: 1,
                  animation: "fadeInOut 2s ease-in-out infinite",
                  "@keyframes fadeInOut": {
                    "0%, 100%": { opacity: 0.7 },
                    "50%": { opacity: 1 },
                  },
                }}
              >
                מתחבר... אנא המתן 🌟
              </Typography>
            </Fade>
          )}
        </Box>

        <form onSubmit={handleSubmit(onSubmit)}>
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
                    startAdornment: <EmailIcon sx={{ mr: 1, color: "#FF9AA2" }} />,
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
                    startAdornment: <LockIcon sx={{ mr: 1, color: "#FF9AA2" }} />,
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
                : "linear-gradient(45deg, #FF9AA2, #FFB7B2)",
              color: "#fff",
              borderRadius: "12px",
              boxShadow: showLoadingAnimations ? "none" : "0 4px 10px rgba(255, 154, 162, 0.3)",
              fontFamily: '"Comic Sans MS", cursive, sans-serif',
              position: "relative",
              overflow: "hidden",
              "&:hover": {
                background: showLoadingAnimations
                  ? "linear-gradient(45deg, #ccc, #bbb)"
                  : "linear-gradient(45deg, #FFB7B2, #FF9AA2)",
                boxShadow: showLoadingAnimations ? "none" : "0 6px 15px rgba(255, 154, 162, 0.4)",
              },
              "&:disabled": {
                color: "white",
              },
            }}
          >
            {showLoadingAnimations ? (
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <CircularProgress size={20} sx={{ color: "white" }} />
                <span>מתחבר...</span>
              </Box>
            ) : (
              "התחברות"
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
              color: showLoadingAnimations ? "#ccc" : "#FF9AA2",
              borderColor: showLoadingAnimations ? "#ccc" : "#FFB7B2",
              borderRadius: "12px",
              fontFamily: '"Comic Sans MS", cursive, sans-serif',
              "&:hover": {
                borderColor: showLoadingAnimations ? "#ccc" : "#FF9AA2",
                background: showLoadingAnimations ? "transparent" : "rgba(255, 154, 162, 0.05)",
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

export default Login
