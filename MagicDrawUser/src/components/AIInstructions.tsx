// import type React from "react"
// import { useState, useEffect } from "react"
// import { useDispatch, useSelector } from "react-redux"
// import {
//   IconButton,
//   Typography,
//   Box,
//   Paper,
//   Button,
//   Fade,
//   Zoom,
//   Collapse,
//   Chip,
//   Tooltip,
//   LinearProgress,
// } from "@mui/material"
// import type { AppDispatch, RootState } from "../store/store"
// import { fetchColorInstructions } from "../store/slices/AIinstructionsSlice" // Adjust import path as needed

// // Icons
// import SmartToyIcon from "@mui/icons-material/SmartToy"
// import CloseIcon from "@mui/icons-material/Close"
// import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome"
// import PaletteIcon from "@mui/icons-material/Palette"
// import LightbulbIcon from "@mui/icons-material/Lightbulb"
// import StarIcon from "@mui/icons-material/Star"
// import BrushIcon from "@mui/icons-material/Brush"
// import ColorLensIcon from "@mui/icons-material/ColorLens"
// import FormatPaintIcon from "@mui/icons-material/FormatPaint"
// import ErrorIcon from "@mui/icons-material/Error"
// import RefreshIcon from "@mui/icons-material/Refresh"

// interface AiInstructionsSectionProps {
//   imageUrl: string
// }

// const AIInstructions: React.FC<AiInstructionsSectionProps> = ({ imageUrl }) => {
//   const dispatch = useDispatch<AppDispatch>()
//   const [open, setOpen] = useState(false)
//   const [showSparkles, setShowSparkles] = useState(false)

//   // Get data from Redux store - adjust the selector based on your store structure
//   const { instructions, loading, error } = useSelector((state: RootState) => ({
//     instructions: state.AIcolorInstructions?.instructions || null,
//     loading: state.AIcolorInstructions?.loading || false,
//     error: state.AIcolorInstructions?.error || null,
//   }))

//   // Show sparkles when instructions are loaded successfully
//   useEffect(() => {
//     if (instructions && !loading && !error) {
//       setShowSparkles(true)
//       setTimeout(() => setShowSparkles(false), 1000)
//     }
//   }, [instructions, loading, error])

//   const toggleOpen = () => {
//     setOpen(!open)
//   }

//   const handleRetry = () => {
//     console.log("Retrying to fetch instructions for image:", imageUrl);

//     dispatch(fetchColorInstructions(imageUrl))
//   }

//   const fetchInstructions = () => {
//     console.log("Fetching instructions for image:", imageUrl);
//     dispatch(fetchColorInstructions(imageUrl))
//     toggleOpen()
//   }

//   const speakInstructions = () => {
//     const utterance = new SpeechSynthesisUtterance(instructions ?? "");
//     speechSynthesis.speak(utterance);
//   }

//   // Clean up instructions text
//   const cleanInstructions = instructions?.replace(/\*\*/g, "")?.replace(/^\s*\*\s+/gm, "- ")

//   // Sparkle animation component
//   const Sparkles = () => (
//     <Box
//       sx={{
//         position: "absolute",
//         top: 0,
//         left: 0,
//         right: 0,
//         bottom: 0,
//         pointerEvents: "none",
//         overflow: "hidden",
//       }}
//     >
//       {[...Array(6)].map((_, i) => (
//         <Box
//           key={i}
//           sx={{
//             position: "absolute",
//             top: `${Math.random() * 100}%`,
//             left: `${Math.random() * 100}%`,
//             animation: "sparkle 1s ease-out",
//             "@keyframes sparkle": {
//               "0%": { opacity: 0, transform: "scale(0) rotate(0deg)" },
//               "50%": { opacity: 1, transform: "scale(1) rotate(180deg)" },
//               "100%": { opacity: 0, transform: "scale(0) rotate(360deg)" },
//             },
//           }}
//         >
//           <StarIcon sx={{ color: "#FFD700", fontSize: "1rem" }} />
//         </Box>
//       ))}
//     </Box>
//   )

//   // Show loading state initially or when fetching
//   const isInitialLoading = loading && !instructions
//   const hasInstructions = instructions && !loading
//   const hasError = error && !loading

//   return (
//     <Box sx={{ position: "absolute", top: 16, left: 16, zIndex: 10 }}>
//       <Collapse in={open} timeout={300}>
//         <Zoom in={open}>
//           <Paper
//             elevation={0}
//             sx={{
//               p: 3,
//               maxWidth: 350,
//               maxHeight: 400,
//               overflowY: "auto",
//               direction: "rtl",
//               position: "relative",
//               borderRadius: "20px",
//               background: "linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(248,250,255,0.95) 100%)",
//               backdropFilter: "blur(10px)",
//               border: "3px solid #E2F0CB",
//               boxShadow: "0 15px 35px rgba(0,0,0,0.1)",
//               fontFamily: '"Comic Sans MS", cursive, sans-serif',
//             }}
//           >
//             {showSparkles && <Sparkles />}

//             <IconButton
//               size="small"
//               onClick={toggleOpen}
//               sx={{
//                 position: "absolute",
//                 top: 8,
//                 left: 8,
//                 background: "rgba(255, 154, 162, 0.1)",
//                 color: "#FF9AA2",
//                 "&:hover": {
//                   background: "rgba(255, 154, 162, 0.2)",
//                   transform: "scale(1.1)",
//                 },
//                 transition: "all 0.3s ease",
//               }}
//             >
//               <CloseIcon fontSize="small" />
//             </IconButton>

//             <Box sx={{ display: "flex", alignItems: "center", mb: 2, gap: 1 }}>
//               <Box
//                 sx={{
//                   width: 40,
//                   height: 40,
//                   borderRadius: "50%",
//                   background: hasError
//                     ? "linear-gradient(135deg, #FF9AA2 0%, #FFB7B2 100%)"
//                     : "linear-gradient(135deg, #E2F0CB 0%, #B5EAD7 100%)",
//                   display: "flex",
//                   justifyContent: "center",
//                   alignItems: "center",
//                   animation: loading ? "pulse 1.5s ease-in-out infinite" : "none",
//                   "@keyframes pulse": {
//                     "0%": { transform: "scale(1)" },
//                     "50%": { transform: "scale(1.1)" },
//                     "100%": { transform: "scale(1)" },
//                   },
//                 }}
//               >
//                 {hasError ? (
//                   <ErrorIcon sx={{ color: "white", fontSize: "1.5rem" }} />
//                 ) : (
//                   <SmartToyIcon sx={{ color: "white", fontSize: "1.5rem" }} />
//                 )}
//               </Box>
//               <Typography

//                 variant="h6"
//                 sx={{
//                   fontWeight: "bold",
//                   color: hasError ? "#FF9AA2" : "#E2F0CB",
//                   fontFamily: '"Comic Sans MS", cursive, sans-serif',
//                 }}
//               >
//                 🤖 עוזר הצביעה החכם
//               </Typography>
//             </Box>

//             {/* Loading State */}
//             {loading && (
//               <Box sx={{ py: 3 }}>
//                 <Box sx={{ display: "flex", alignItems: "center", mb: 2, gap: 1 }}>
//                   <AutoAwesomeIcon sx={{ color: "#E2F0CB", animation: "spin 2s linear infinite" }} />
//                   <Typography
//                     variant="body1"
//                     sx={{
//                       fontFamily: '"Comic Sans MS", cursive, sans-serif',
//                       color: "#555",
//                     }}
//                   >
//                     יוצר הצעות מדהימות...
//                   </Typography>
//                 </Box>

//                 <LinearProgress
//                   sx={{
//                     height: 8,
//                     borderRadius: 4,
//                     backgroundColor: "rgba(226, 240, 203, 0.2)",
//                     "& .MuiLinearProgress-bar": {
//                       borderRadius: 4,
//                       background: "linear-gradient(90deg, #E2F0CB 0%, #B5EAD7 100%)",
//                     },
//                   }}
//                 />

//                 <Box sx={{ display: "flex", justifyContent: "center", mt: 2, gap: 1 }}>
//                   {[PaletteIcon, BrushIcon, ColorLensIcon].map((Icon, index) => (
//                     <Icon
//                       key={index}
//                       sx={{
//                         color: "#E2F0CB",
//                         fontSize: "1.5rem",
//                         animation: `bounce 1s ease-in-out infinite ${index * 0.2}s`,
//                         "@keyframes bounce": {
//                           "0%, 100%": { transform: "translateY(0)" },
//                           "50%": { transform: "translateY(-10px)" },
//                         },
//                       }}
//                     />
//                   ))}
//                 </Box>
//               </Box>
//             )}

//             {/* Error State */}
//             {hasError && (
//               <Box sx={{ py: 2, textAlign: "center" }}>
//                 <Typography
//                   variant="body1"
//                   sx={{
//                     color: "#FF9AA2",
//                     fontFamily: '"Comic Sans MS", cursive, sans-serif',
//                     mb: 2,
//                   }}
//                 >
//                   אופס! משהו השתבש בקבלת ההוראות
//                 </Typography>
//                 <Button
//                   variant="contained"
//                   onClick={handleRetry}
//                   startIcon={<RefreshIcon />}
//                   sx={{
//                     background: "linear-gradient(135deg, #FF9AA2 0%, #FFB7B2 100%)",
//                     color: "white",
//                     borderRadius: "12px",
//                     fontFamily: '"Comic Sans MS", cursive, sans-serif',
//                     "&:hover": {
//                       background: "linear-gradient(135deg, #FFB7B2 0%, #FF9AA2 100%)",
//                     },
//                   }}
//                 >
//                   נסה שוב
//                 </Button>
//               </Box>
//             )}

//             {/* Success State - Show Instructions */}
//             {hasInstructions && (
//               <Fade in={hasInstructions}>
//                 <Box>
//                   <Box sx={{ display: "flex", gap: 1, mb: 2, flexWrap: "wrap" }}>
//                     <Chip
//                       icon={<LightbulbIcon />}
//                       label="טיפים חכמים"
//                       size="small"
//                       sx={{
//                         background: "linear-gradient(45deg, #FFDAC1, #FFC8A2)",
//                         color: "white",
//                         fontFamily: '"Comic Sans MS", cursive, sans-serif',
//                         fontWeight: "bold",
//                       }}
//                     />
//                     <Chip
//                       icon={<FormatPaintIcon />}
//                       label="הוראות צביעה"
//                       size="small"
//                       sx={{
//                         background: "linear-gradient(45deg, #FF9AA2, #FFB7B2)",
//                         color: "white",
//                         fontFamily: '"Comic Sans MS", cursive, sans-serif',
//                         fontWeight: "bold",
//                       }}
//                     />
//                   </Box>

//                   <Typography
//                     variant="body2"
//                     sx={{
//                       whiteSpace: "pre-line",
//                       lineHeight: 1.6,
//                       color: "#444",
//                       fontFamily: '"Comic Sans MS", cursive, sans-serif',
//                       "& strong": {
//                         color: "#E2F0CB",
//                         fontWeight: "bold",
//                       },
//                     }}
//                   >
//                     {cleanInstructions}
//                   </Typography>

//                   <Box sx={{ mt: 2, textAlign: "center" }}>
//                     <Chip
//                       icon={<StarIcon />}
//                       label="בהצלחה ביצירה!"
//                       sx={{
//                         background: "linear-gradient(45deg, #C7CEEA, #B5B9FF)",
//                         color: "white",
//                         fontFamily: '"Comic Sans MS", cursive, sans-serif',
//                         fontWeight: "bold",
//                       }}
//                     />
//                   </Box>
//                 </Box>
//               </Fade>
//             )}
//           </Paper>
//         </Zoom>
//       </Collapse>

//       <Fade in={!open}>
//         <Box>
//           <Tooltip title="קבל הצעות צביעה מהעוזר החכם!" arrow>
//             <Button
//               variant="contained"
//               onClick={fetchInstructions}
//               disabled={isInitialLoading}
//               startIcon={
//                 <Box sx={{ position: "relative" }}>
//                   {hasError ? (
//                     <ErrorIcon />
//                   ) : (
//                     <>
//                       <SmartToyIcon />
//                       {hasInstructions && (
//                         <AutoAwesomeIcon
//                           sx={{
//                             position: "absolute",
//                             top: -8,
//                             right: -8,
//                             fontSize: "0.8rem",
//                             color: "#FFD700",
//                             animation: "twinkle 2s ease-in-out infinite",
//                             "@keyframes twinkle": {
//                               "0%, 100%": { opacity: 1, transform: "scale(1)" },
//                               "50%": { opacity: 0.5, transform: "scale(1.2)" },
//                             },
//                           }}
//                         />
//                       )}
//                     </>
//                   )}
//                 </Box>
//               }
//               size="medium"
//               sx={{
//                 textTransform: "none",
//                 borderRadius: "16px",
//                 padding: "12px 20px",
//                 background: hasError
//                   ? "linear-gradient(135deg, #FF9AA2 0%, #FFB7B2 100%)"
//                   : "linear-gradient(135deg, #E2F0CB 0%, #B5EAD7 100%)",
//                 color: "white",
//                 fontWeight: "bold",
//                 fontSize: "1rem",
//                 boxShadow: hasError ? "0 8px 20px rgba(255, 154, 162, 0.4)" : "0 8px 20px rgba(226, 240, 203, 0.4)",
//                 fontFamily: '"Comic Sans MS", cursive, sans-serif',
//                 "&:hover": {
//                   background: hasError
//                     ? "linear-gradient(135deg, #FFB7B2 0%, #FF9AA2 100%)"
//                     : "linear-gradient(135deg, #B5EAD7 0%, #E2F0CB 100%)",
//                   transform: "translateY(-3px)",
//                   boxShadow: hasError ? "0 12px 25px rgba(255, 154, 162, 0.5)" : "0 12px 25px rgba(226, 240, 203, 0.5)",
//                 },
//                 "&:disabled": {
//                   background: "linear-gradient(135deg, #ccc 0%, #bbb 100%)",
//                   color: "white",
//                 },
//                 transition: "all 0.3s ease",
//               }}
//             >
//               {isInitialLoading ? "טוען..." : hasError ? "שגיאה - לחץ לפתיחה" : "🎨 עוזר הצביעה החכם"}
//             </Button>
//           </Tooltip>
//         </Box>
//       </Fade>
//     </Box>
//   )
// }

// export default AIInstructions

"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  IconButton,
  Typography,
  Box,
  Paper,
  Button,
  Fade,
  Zoom,
  Collapse,
  Chip,
  Tooltip,
  LinearProgress,
} from "@mui/material"
import type { AppDispatch, RootState } from "../store/store"
import { fetchColorInstructions } from "../store/slices/AIinstructionsSlice" // Adjust import path as needed

// Icons
import SmartToyIcon from "@mui/icons-material/SmartToy"
import CloseIcon from "@mui/icons-material/Close"
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome"
import PaletteIcon from "@mui/icons-material/Palette"
import LightbulbIcon from "@mui/icons-material/Lightbulb"
import StarIcon from "@mui/icons-material/Star"
import BrushIcon from "@mui/icons-material/Brush"
import ColorLensIcon from "@mui/icons-material/ColorLens"
import FormatPaintIcon from "@mui/icons-material/FormatPaint"
import ErrorIcon from "@mui/icons-material/Error"
import RefreshIcon from "@mui/icons-material/Refresh"
import VolumeOffIcon from "@mui/icons-material/VolumeOff"
import RecordVoiceOverIcon from "@mui/icons-material/RecordVoiceOver"

interface AiInstructionsSectionProps {
  imageUrl: string
}

const AIInstructions: React.FC<AiInstructionsSectionProps> = ({ imageUrl }) => {
  const dispatch = useDispatch<AppDispatch>()
  const [open, setOpen] = useState(false)
  const [showSparkles, setShowSparkles] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)

  // Get data from Redux store - adjust the selector based on your store structure
  const { instructions, loading, error } = useSelector((state: RootState) => ({
    instructions: state.AIcolorInstructions?.instructions || null,
    loading: state.AIcolorInstructions?.loading || false,
    error: state.AIcolorInstructions?.error || null,
  }))

  // Show sparkles when instructions are loaded successfully
  useEffect(() => {
    if (instructions && !loading && !error) {
      setShowSparkles(true)
      setTimeout(() => setShowSparkles(false), 1000)
    }
  }, [instructions, loading, error])

  // Check if speech synthesis is speaking
  useEffect(() => {
    const checkSpeaking = () => {
      setIsSpeaking(speechSynthesis.speaking)
    }

    const interval = setInterval(checkSpeaking, 100)
    return () => clearInterval(interval)
  }, [])

  const toggleOpen = () => {
    setOpen(!open)
  }

  const handleRetry = () => {
    console.log("Retrying to fetch instructions for image:", imageUrl)
    dispatch(fetchColorInstructions(imageUrl))
  }

  const fetchInstructions = () => {
    console.log("Fetching instructions for image:", imageUrl)
    dispatch(fetchColorInstructions(imageUrl))
    toggleOpen()
  }

  const speakInstructions = () => {
    if (!instructions) return

    // Stop any current speech
    speechSynthesis.cancel()

    if (isSpeaking) {
      // If currently speaking, stop
      speechSynthesis.cancel()
      setIsSpeaking(false)
    } else {
      // Start speaking
      const cleanText = instructions.replace(/\*\*/g, "").replace(/^\s*\*\s+/gm, "")
      const utterance = new SpeechSynthesisUtterance(cleanText)

      // Configure voice settings for a more pleasant experience
      utterance.rate = 0.8 // Slightly slower for kids
      utterance.pitch = 1.1 // Slightly higher pitch
      utterance.volume = 0.8

      // Set Hebrew voice if available
      const voices = speechSynthesis.getVoices()
      const hebrewVoice = voices.find((voice) => voice.lang.includes("he"))
      if (hebrewVoice) {
        utterance.voice = hebrewVoice
      }

      utterance.onstart = () => setIsSpeaking(true)
      utterance.onend = () => setIsSpeaking(false)
      utterance.onerror = () => setIsSpeaking(false)

      speechSynthesis.speak(utterance)
    }
  }

  // Clean up instructions text
  const cleanInstructions = instructions?.replace(/\*\*/g, "")?.replace(/^\s*\*\s+/gm, "- ")

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
      }}
    >
      {[...Array(6)].map((_, i) => (
        <Box
          key={i}
          sx={{
            position: "absolute",
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animation: "sparkle 1s ease-out",
            "@keyframes sparkle": {
              "0%": { opacity: 0, transform: "scale(0) rotate(0deg)" },
              "50%": { opacity: 1, transform: "scale(1) rotate(180deg)" },
              "100%": { opacity: 0, transform: "scale(0) rotate(360deg)" },
            },
          }}
        >
          <StarIcon sx={{ color: "#FFD700", fontSize: "1rem" }} />
        </Box>
      ))}
    </Box>
  )

  // Show loading state initially or when fetching
  const isInitialLoading = loading && !instructions
  const hasInstructions = instructions && !loading
  const hasError = error && !loading

  return (
    <Box sx={{ position: "absolute", top: 16, left: 16, zIndex: 10 }}>
      <Collapse in={open} timeout={300}>
        <Zoom in={open}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              maxWidth: 350,
              maxHeight: 400,
              overflowY: "auto",
              direction: "rtl",
              position: "relative",
              borderRadius: "20px",
              background: "linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(248,250,255,0.95) 100%)",
              backdropFilter: "blur(10px)",
              border: "3px solid #E2F0CB",
              boxShadow: "0 15px 35px rgba(0,0,0,0.1)",
              fontFamily: '"Comic Sans MS", cursive, sans-serif',
            }}
          >
            {showSparkles && <Sparkles />}

            <IconButton
              size="small"
              onClick={toggleOpen}
              sx={{
                position: "absolute",
                top: 8,
                left: 8,
                background: "rgba(255, 154, 162, 0.1)",
                color: "#FF9AA2",
                "&:hover": {
                  background: "rgba(255, 154, 162, 0.2)",
                  transform: "scale(1.1)",
                },
                transition: "all 0.3s ease",
              }}
            >
              <CloseIcon fontSize="small" />
            </IconButton>

            <Box sx={{ display: "flex", alignItems: "center", mb: 2, gap: 1 }}>
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  background: hasError
                    ? "linear-gradient(135deg, #FF9AA2 0%, #FFB7B2 100%)"
                    : "linear-gradient(135deg, #E2F0CB 0%, #B5EAD7 100%)",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  animation: loading ? "pulse 1.5s ease-in-out infinite" : "none",
                  "@keyframes pulse": {
                    "0%": { transform: "scale(1)" },
                    "50%": { transform: "scale(1.1)" },
                    "100%": { transform: "scale(1)" },
                  },
                }}
              >
                {hasError ? (
                  <ErrorIcon sx={{ color: "white", fontSize: "1.5rem" }} />
                ) : (
                  <SmartToyIcon sx={{ color: "white", fontSize: "1.5rem" }} />
                )}
              </Box>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "bold",
                  color: hasError ? "#FF9AA2" : "#E2F0CB",
                  fontFamily: '"Comic Sans MS", cursive, sans-serif',
                }}
              >
                🤖 עוזר הצביעה החכם
              </Typography>
            </Box>

            {/* Loading State */}
            {loading && (
              <Box sx={{ py: 3 }}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2, gap: 1 }}>
                  <AutoAwesomeIcon sx={{ color: "#E2F0CB", animation: "spin 2s linear infinite" }} />
                  <Typography
                    variant="body1"
                    sx={{
                      fontFamily: '"Comic Sans MS", cursive, sans-serif',
                      color: "#555",
                    }}
                  >
                    יוצר הצעות מדהימות...
                  </Typography>
                </Box>

                <LinearProgress
                  sx={{
                    height: 8,
                    borderRadius: 4,
                    backgroundColor: "rgba(226, 240, 203, 0.2)",
                    "& .MuiLinearProgress-bar": {
                      borderRadius: 4,
                      background: "linear-gradient(90deg, #E2F0CB 0%, #B5EAD7 100%)",
                    },
                  }}
                />

                <Box sx={{ display: "flex", justifyContent: "center", mt: 2, gap: 1 }}>
                  {[PaletteIcon, BrushIcon, ColorLensIcon].map((Icon, index) => (
                    <Icon
                      key={index}
                      sx={{
                        color: "#E2F0CB",
                        fontSize: "1.5rem",
                        animation: `bounce 1s ease-in-out infinite ${index * 0.2}s`,
                        "@keyframes bounce": {
                          "0%, 100%": { transform: "translateY(0)" },
                          "50%": { transform: "translateY(-10px)" },
                        },
                      }}
                    />
                  ))}
                </Box>
              </Box>
            )}

            {/* Error State */}
            {hasError && (
              <Box sx={{ py: 2, textAlign: "center" }}>
                <Typography
                  variant="body1"
                  sx={{
                    color: "#FF9AA2",
                    fontFamily: '"Comic Sans MS", cursive, sans-serif',
                    mb: 2,
                  }}
                >
                  אופס! משהו השתבש בקבלת ההוראות
                </Typography>
                <Button
                  variant="contained"
                  onClick={handleRetry}
                  startIcon={<RefreshIcon />}
                  sx={{
                    background: "linear-gradient(135deg, #FF9AA2 0%, #FFB7B2 100%)",
                    color: "white",
                    borderRadius: "12px",
                    fontFamily: '"Comic Sans MS", cursive, sans-serif',
                    "&:hover": {
                      background: "linear-gradient(135deg, #FFB7B2 0%, #FF9AA2 100%)",
                    },
                  }}
                >
                  נסה שוב
                </Button>
              </Box>
            )}

            {/* Success State - Show Instructions */}
            {hasInstructions && (
              <Fade in={hasInstructions}>
                <Box>
                  <Box
                    sx={{
                      display: "flex",
                      gap: 1,
                      mb: 2,
                      flexWrap: "wrap",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                      <Chip
                        icon={<LightbulbIcon />}
                        label="טיפים חכמים"
                        size="small"
                        sx={{
                          background: "linear-gradient(45deg, #FFDAC1, #FFC8A2)",
                          color: "white",
                          fontFamily: '"Comic Sans MS", cursive, sans-serif',
                          fontWeight: "bold",
                        }}
                      />
                      <Chip
                        icon={<FormatPaintIcon />}
                        label="הוראות צביעה"
                        size="small"
                        sx={{
                          background: "linear-gradient(45deg, #FF9AA2, #FFB7B2)",
                          color: "white",
                          fontFamily: '"Comic Sans MS", cursive, sans-serif',
                          fontWeight: "bold",
                        }}
                      />
                    </Box>

                    {/* Voice Button */}
                    <Tooltip title={isSpeaking ? "עצור קריאה" : "קרא בקול רם"} arrow>
                      <IconButton
                        onClick={speakInstructions}
                        sx={{
                          width: 40,
                          height: 40,
                          background: isSpeaking
                            ? "linear-gradient(135deg, #FF9AA2 0%, #FFB7B2 100%)"
                            : "linear-gradient(135deg, #C7CEEA 0%, #B5B9FF 100%)",
                          color: "white",
                          boxShadow: isSpeaking
                            ? "0 6px 16px rgba(255, 154, 162, 0.4)"
                            : "0 6px 16px rgba(199, 206, 234, 0.4)",
                          animation: isSpeaking ? "voicePulse 1s ease-in-out infinite" : "none",
                          "&:hover": {
                            background: isSpeaking
                              ? "linear-gradient(135deg, #FFB7B2 0%, #FF9AA2 100%)"
                              : "linear-gradient(135deg, #B5B9FF 0%, #C7CEEA 100%)",
                            transform: "scale(1.1)",
                            boxShadow: isSpeaking
                              ? "0 8px 20px rgba(255, 154, 162, 0.5)"
                              : "0 8px 20px rgba(199, 206, 234, 0.5)",
                          },
                          transition: "all 0.3s ease",
                          "@keyframes voicePulse": {
                            "0%": { transform: "scale(1)" },
                            "50%": { transform: "scale(1.05)" },
                            "100%": { transform: "scale(1)" },
                          },
                        }}
                      >
                        {isSpeaking ? <VolumeOffIcon fontSize="small" /> : <RecordVoiceOverIcon fontSize="small" />}
                      </IconButton>
                    </Tooltip>
                  </Box>

                  <Typography
                    variant="body2"
                    sx={{
                      whiteSpace: "pre-line",
                      lineHeight: 1.6,
                      color: "#444",
                      fontFamily: '"Comic Sans MS", cursive, sans-serif',
                      "& strong": {
                        color: "#E2F0CB",
                        fontWeight: "bold",
                      },
                    }}
                  >
                    {cleanInstructions}
                  </Typography>

                  <Box sx={{ mt: 2, textAlign: "center" }}>
                    <Chip
                      icon={<StarIcon />}
                      label="בהצלחה ביצירה!"
                      sx={{
                        background: "linear-gradient(45deg, #C7CEEA, #B5B9FF)",
                        color: "white",
                        fontFamily: '"Comic Sans MS", cursive, sans-serif',
                        fontWeight: "bold",
                      }}
                    />
                  </Box>
                </Box>
              </Fade>
            )}
          </Paper>
        </Zoom>
      </Collapse>

      <Fade in={!open}>
        <Box>
          <Tooltip title="קבל הצעות צביעה מהעוזר החכם!" arrow>
            <Button
              variant="contained"
              onClick={fetchInstructions}
              disabled={isInitialLoading}
              startIcon={
                <Box sx={{ position: "relative" }}>
                  {hasError ? (
                    <ErrorIcon />
                  ) : (
                    <>
                      <SmartToyIcon />
                      {hasInstructions && (
                        <AutoAwesomeIcon
                          sx={{
                            position: "absolute",
                            top: -8,
                            right: -8,
                            fontSize: "0.8rem",
                            color: "#FFD700",
                            animation: "twinkle 2s ease-in-out infinite",
                            "@keyframes twinkle": {
                              "0%, 100%": { opacity: 1, transform: "scale(1)" },
                              "50%": { opacity: 0.5, transform: "scale(1.2)" },
                            },
                          }}
                        />
                      )}
                    </>
                  )}
                </Box>
              }
              size="medium"
              sx={{
                textTransform: "none",
                borderRadius: "16px",
                padding: "12px 20px",
                background: hasError
                  ? "linear-gradient(135deg, #FF9AA2 0%, #FFB7B2 100%)"
                  : "linear-gradient(135deg, #E2F0CB 0%, #B5EAD7 100%)",
                color: "white",
                fontWeight: "bold",
                fontSize: "1rem",
                boxShadow: hasError ? "0 8px 20px rgba(255, 154, 162, 0.4)" : "0 8px 20px rgba(226, 240, 203, 0.4)",
                fontFamily: '"Comic Sans MS", cursive, sans-serif',
                "&:hover": {
                  background: hasError
                    ? "linear-gradient(135deg, #FFB7B2 0%, #FF9AA2 100%)"
                    : "linear-gradient(135deg, #B5EAD7 0%, #E2F0CB 100%)",
                  transform: "translateY(-3px)",
                  boxShadow: hasError ? "0 12px 25px rgba(255, 154, 162, 0.5)" : "0 12px 25px rgba(226, 240, 203, 0.5)",
                },
                "&:disabled": {
                  background: "linear-gradient(135deg, #ccc 0%, #bbb 100%)",
                  color: "white",
                },
                transition: "all 0.3s ease",
              }}
            >
              {isInitialLoading ? "טוען..." : hasError ? "שגיאה - לחץ לפתיחה" : "🎨 עוזר הצביעה החכם"}
            </Button>
          </Tooltip>
        </Box>
      </Fade>
    </Box>
  )
}

export default AIInstructions
