// import React, { useState, useRef, useEffect } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import CanvasDraw from 'react-canvas-draw';
// import { Box, Button, Slider, Typography, Input, Paper, Switch, FormControlLabel } from '@mui/material';
// import { useDispatch } from 'react-redux';
// import { AppDispatch } from '../store/store';
// import { addPaintedPainting } from '../store/slices/paintingPaintedSlice';
// import { UpLoadPaintingPaintedType } from '../types/UpLoadPaintingPaintedType';

// const DrawingApp: React.FC = () => {
//   const [brushColor, setBrushColor] = useState<string>("#000");
//   const [brushRadius, setBrushRadius] = useState<number>(5);
//   const [isEraser, setIsEraser] = useState<boolean>(false);
//   const [canvasSize, setCanvasSize] = useState<{ width: number; height: number }>({ width: 800, height: 400 });
//   const canvasRef = useRef<CanvasDraw>(null);

//   const location = useLocation();
//   const navigate = useNavigate();
//   const dispatch = useDispatch<AppDispatch>();
//   const { backgroundImageUrl } = location.state || {};

//   useEffect(() => {
//     if (backgroundImageUrl) {
//       const img = new Image();
//       img.src = backgroundImageUrl;
//       img.onload = () => {
//         const maxWidth = 800;
//         const maxHeight = 600;
//         let width = img.width;
//         let height = img.height;

//         if (width > maxWidth) {
//           const scaleFactor = maxWidth / width;
//           width = maxWidth;
//           height = height * scaleFactor;
//         }
//         if (height > maxHeight) {
//           const scaleFactor = maxHeight / height;
//           height = maxHeight;
//           width = width * scaleFactor;
//         }

//         setCanvasSize({ width, height });
//       };
//     }
//   }, [backgroundImageUrl]);

//   const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setBrushColor(event.target.value);
//   };

//   const handleBrushRadiusChange = (event: Event, value: number | number[]) => {
//     setBrushRadius(value as number);
//   };

//   const toggleEraser = () => {
//     setIsEraser(!isEraser);
//   };

//   const saveToDatabase = async () => {
//     if (canvasRef.current) {
//       const canvas = document.createElement('canvas');
//       const ctx = canvas.getContext('2d');

//       const img = new Image();
//       img.crossOrigin = 'anonymous';
//       img.src = backgroundImageUrl;
//       img.onload = async () => {
//         canvas.width = img.width;
//         canvas.height = img.height;

//         ctx?.drawImage(img, 0, 0);

//         const drawingData = canvasRef.current?.getDataURL("image/png");
//         const drawingImg = new Image();
//         drawingImg.src = drawingData;
//         drawingImg.onload = async () => {
//           ctx?.drawImage(drawingImg, 0, 0);

//           const finalImage = canvas.toDataURL("image/png");

//           const response = await fetch(finalImage);
//           const blob = await response.blob();
//           const file = new File([blob], "painted_drawing.png", { type: "image/png" });

//           const paintingData: UpLoadPaintingPaintedType = {
//             userId: localStorage.getItem('userId') || '',
//             fileName: '12345',
//             imageFile: file,
//           };

//           await dispatch(addPaintedPainting(paintingData));

//           alert('The painted drawing has been saved to the database!');
//         };
//       };
//     }
//   };

//   const downloadImage = (format: 'png' | 'jpg' = 'png') => {
//     if (canvasRef.current) {
//       const canvas = document.createElement('canvas');
//       const ctx = canvas.getContext('2d');
  
//       const img = new Image();
//       img.crossOrigin = 'anonymous';
//       img.src = backgroundImageUrl;
//       img.onload = () => {
//         canvas.width = img.width;
//         canvas.height = img.height;
  
//         ctx?.drawImage(img, 0, 0);
  
//         const drawingData = canvasRef.current?.getDataURL("image/png");
//         const drawingImg = new Image();
//         drawingImg.src = drawingData;
//         drawingImg.onload = () => {
//           ctx?.drawImage(drawingImg, 0, 0);
  
//           const finalImage = canvas.toDataURL(`image/${format}`);
  
//           // יצירת קישור להורדה
//           const link = document.createElement('a');
//           link.href = finalImage;
//           link.download = `painted_drawing.${format}`;
//           link.click();
//         };
//       };
//     }
//   };

//   const clearCanvas = () => {
//     if (canvasRef.current) {
//       canvasRef.current.clear();
//     }
//   };

//   const goToHomePage = () => {
//     navigate('/');
//   };

//   return (
//     <Box
//       sx={{
//         padding: '20px',
//         background: 'linear-gradient(135deg, #84fab0, #8fd3f4)',
//         borderRadius: '15px',
//         boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
//         maxWidth: '900px',
//         margin: 'auto',
//         marginTop: '20px',
//       }}
//     >
//       <Typography variant="h4" align="center" gutterBottom sx={{ color: '#333' }}>
//         Drawing App
//       </Typography>
//       <Paper
//         elevation={3}
//         sx={{
//           padding: '20px',
//           borderRadius: '10px',
//         }}
//       >
//         <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
//           <Input
//             type="color"
//             value={brushColor}
//             onChange={handleColorChange}
//             disabled={isEraser}
//             sx={{
//               margin: '10px 0',
//               width: '50px',
//               height: '50px',
//               border: 'none',
//               cursor: 'pointer',
//             }}
//           />
//           <Typography variant="body1" sx={{ color: '#333', marginBottom: '10px' }}>
//             Brush Radius: {brushRadius}
//           </Typography>
//           <Slider
//             value={brushRadius}
//             onChange={handleBrushRadiusChange}
//             min={1}
//             max={50}
//             sx={{
//               width: '80%',
//               color: '#333',
//             }}
//           />
//           <FormControlLabel
//             control={<Switch checked={isEraser} onChange={toggleEraser} />}
//             label="Eraser Mode"
//             sx={{ marginBottom: '10px', color: '#333' }}
//           />
//           <Box
//             sx={{
//               position: 'relative',
//               width: `${canvasSize.width}px`,
//               height: `${canvasSize.height}px`,
//               borderRadius: '10px',
//               overflow: 'hidden',
//             }}
//           >
//             <CanvasDraw
//               ref={canvasRef}
//               brushColor={isEraser ? "#fff" : brushColor}
//               brushRadius={brushRadius}
//               lazyRadius={0}
//               imgSrc={backgroundImageUrl}
//               canvasWidth={canvasSize.width}
//               canvasHeight={canvasSize.height}
//               style={{
//                 border: '2px solid black',
//                 width: '100%',
//                 height: '100%',
//                 borderRadius: '10px',
//               }}
//             />
//           </Box>
//           <Box sx={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '20px' }}>
//             <Button
//               variant="contained"
//               onClick={saveToDatabase}
//               sx={{
//                 background: 'linear-gradient(135deg, #a18cd1, #fbc2eb)',
//                 color: '#fff',
//                 '&:hover': { background: 'linear-gradient(135deg, #fbc2eb, #a18cd1)' },
//               }}
//             >
//               שמירה
//             </Button>
//             <Button
//     variant="contained"
//     onClick={downloadImage}
//     sx={{
//       background: 'linear-gradient(135deg, #84fab0, #8fd3f4)',
//       color: '#fff',
//       '&:hover': { background: 'linear-gradient(135deg, #8fd3f4, #84fab0)' },
//     }}
//   >
//     להורדת התמונה
//   </Button>
//             <Button
//               variant="contained"
//               onClick={clearCanvas}
//               sx={{
//                 background: 'linear-gradient(135deg, #84fab0, #8fd3f4)',
//                 color: '#fff',
//                 '&:hover': { background: 'linear-gradient(135deg, #8fd3f4, #84fab0)' },
//               }}
//             >
//               ניקוי הכל
//             </Button>
//             <Button
//               variant="contained"
//               onClick={goToHomePage}
//               sx={{
//                 background: 'linear-gradient(135deg, #ff9a9e, #fad0c4)',
//                 color: '#fff',
//                 '&:hover': { background: 'linear-gradient(135deg, #fad0c4, #ff9a9e)' },
//               }}
//             >
//               חזרה לדף הבית
//             </Button>
//           </Box>
//         </Box>
//       </Paper>
//     </Box>
//   );
// };

// export default DrawingApp;

"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import CanvasDraw from "react-canvas-draw"
import {
  Box,
  Button,
  Slider,
  Typography,
  Input,
  Paper,
  Switch,
  FormControlLabel,
  IconButton,
  Tooltip,
  Grid,
} from "@mui/material"
import { useDispatch } from "react-redux"
import type { AppDispatch } from "../store/store"
import { addPaintedPainting } from "../store/slices/paintingPaintedSlice"
import type { UpLoadPaintingPaintedType } from "../types/UpLoadPaintingPaintedType"
import SaveIcon from "@mui/icons-material/Save"
import DownloadIcon from "@mui/icons-material/Download"
import DeleteIcon from "@mui/icons-material/Delete"
import HomeIcon from "@mui/icons-material/Home"
import PaletteIcon from "@mui/icons-material/Palette"
import FormatPaintIcon from "@mui/icons-material/FormatPaint"

// Color palette
const colorPalette = [
  "#FF9AA2", // Pink
  "#FFDAC1", // Peach
  "#E2F0CB", // Light Green
  "#B5EAD7", // Mint
  "#C7CEEA", // Light Blue
  "#9B5DE5", // Purple
  "#F15BB5", // Hot Pink
  "#FEE440", // Yellow
  "#00BBF9", // Blue
  "#00F5D4", // Teal
  "#FB6107", // Orange
  "#000000", // Black
  "#FFFFFF", // White
]

const DrawingApp: React.FC = () => {
  const [brushColor, setBrushColor] = useState<string>("#FF9AA2")
  const [brushRadius, setBrushRadius] = useState<number>(5)
  const [isEraser, setIsEraser] = useState<boolean>(false)
  const [canvasSize, setCanvasSize] = useState<{ width: number; height: number }>({ width: 800, height: 400 })
  const canvasRef = useRef<CanvasDraw>(null)

  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  const { backgroundImageUrl } = location.state || {}

  useEffect(() => {
    if (backgroundImageUrl) {
      const img = new Image()
      img.src = backgroundImageUrl
      img.onload = () => {
        const maxWidth = 800
        const maxHeight = 600
        let width = img.width
        let height = img.height

        if (width > maxWidth) {
          const scaleFactor = maxWidth / width
          width = maxWidth
          height = height * scaleFactor
        }
        if (height > maxHeight) {
          const scaleFactor = maxHeight / height
          height = maxHeight
          width = width * scaleFactor
        }

        setCanvasSize({ width, height })
      }
    }
  }, [backgroundImageUrl])

  const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBrushColor(event.target.value)
    setIsEraser(false)
  }

  const handleBrushRadiusChange = (event: Event, value: number | number[]) => {
    setBrushRadius(value as number)
  }

  const toggleEraser = () => {
    setIsEraser(!isEraser)
  }

  const saveToDatabase = async () => {
    if (canvasRef.current) {
      const canvas = document.createElement("canvas")
      const ctx = canvas.getContext("2d")

      const img = new Image()
      img.crossOrigin = "anonymous"
      img.src = backgroundImageUrl
      img.onload = async () => {
        canvas.width = img.width
        canvas.height = img.height

        ctx?.drawImage(img, 0, 0)

        const drawingData = canvasRef.current?.getDataURL(`${img.src?.split(".").pop()}`)
        const drawingImg = new Image()
        drawingImg.src = drawingData
        drawingImg.onload = async () => {
          ctx?.drawImage(drawingImg, 0, 0)

          const finalImage = canvas.toDataURL(`${img.src?.split(".").pop()}`)

          const response = await fetch(finalImage)
          console.log("response", response);
          
          const blob = await response.blob()
          const file = new File([blob], "my-image", { type: "image/png" })

          const paintingData = {
            userId: localStorage.getItem("userId") || "",
            fileName: "12345",
            imageFile: file,
          }
          console.log("paintingData", paintingData);
          // Save the painting data to the database
          await dispatch(addPaintedPainting(paintingData))

          alert("הציור נשמר בהצלחה!")
        }
      }
    }
  }

  const downloadImage = (format: "png" | "jpg" = "png") => {
    if (canvasRef.current) {
      const canvas = document.createElement("canvas")
      const ctx = canvas.getContext("2d")

      const img = new Image()
      img.crossOrigin = "anonymous"
      img.src = backgroundImageUrl
      img.onload = () => {
        canvas.width = img.width
        canvas.height = img.height

        ctx?.drawImage(img, 0, 0)

        const drawingData = canvasRef.current?.getDataURL("image/png")
        const drawingImg = new Image()
        drawingImg.src = drawingData
        drawingImg.onload = () => {
          ctx?.drawImage(drawingImg, 0, 0)

          const finalImage = canvas.toDataURL(`image/${format}`)

          // יצירת קישור להורדה
          const link = document.createElement("a")
          link.href = finalImage
          link.download = `painted_drawing.${format}`
          link.click()
        }
      }
    }
  }

  const clearCanvas = () => {
    if (canvasRef.current) {
      canvasRef.current.clear()
    }
  }

  const goToHomePage = () => {
    navigate("/")
  }

  return (
    <Box
      sx={{
        padding: "20px",
        background: "linear-gradient(135deg, #FAFAFA 0%, #F0F0F0 100%)",
        minHeight: "100vh",
        fontFamily: '"Comic Sans MS", cursive, sans-serif',
      }}
    >
      <Paper
        elevation={0}
        sx={{
          padding: "20px",
          borderRadius: "24px",
          maxWidth: "1000px",
          margin: "auto",
          background: "white",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
          border: "3px solid #E2F0CB",
        }}
      >
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{
            color: "#E2F0CB",
            fontWeight: "bold",
            fontFamily: '"Comic Sans MS", cursive, sans-serif',
            mb: 3,
          }}
        >
          <FormatPaintIcon sx={{ mr: 1, fontSize: "1.2em", verticalAlign: "middle" }} />
          אפליקציית צביעה
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            <Paper
              elevation={0}
              sx={{
                p: 2,
                borderRadius: "16px",
                background: "rgba(255, 255, 255, 0.9)",
                border: "2px solid #E2F0CB",
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  color: "#E2F0CB",
                  fontWeight: "bold",
                  fontFamily: '"Comic Sans MS", cursive, sans-serif',
                  mb: 2,
                  textAlign: "center",
                }}
              >
                <PaletteIcon sx={{ mr: 1, verticalAlign: "middle" }} />
                כלי ציור
              </Typography>

              <Box sx={{ mb: 3 }}>
                <Typography
                  variant="body1"
                  sx={{
                    color: "#555",
                    mb: 1,
                    fontFamily: '"Comic Sans MS", cursive, sans-serif',
                  }}
                >
                  צבע מברשת:
                </Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2, justifyContent: "center" }}>
                  {colorPalette.map((color) => (
                    <Tooltip key={color} title={color} arrow>
                      <IconButton
                        onClick={() => {
                          setBrushColor(color)
                          setIsEraser(false)
                        }}
                        sx={{
                          width: 30,
                          height: 30,
                          backgroundColor: color,
                          border: brushColor === color ? "3px solid #555" : "1px solid #ddd",
                          "&:hover": {
                            transform: "scale(1.1)",
                          },
                        }}
                      />
                    </Tooltip>
                  ))}
                </Box>
                <Input
                  type="color"
                  value={brushColor}
                  onChange={handleColorChange}
                  disabled={isEraser}
                  sx={{
                    width: "100%",
                    height: "40px",
                    border: "none",
                    cursor: "pointer",
                    mb: 2,
                  }}
                />
              </Box>

              <Box sx={{ mb: 3 }}>
                <Typography
                  variant="body1"
                  sx={{
                    color: "#555",
                    fontFamily: '"Comic Sans MS", cursive, sans-serif',
                  }}
                >
                  גודל מברשת: {brushRadius}
                </Typography>
                <Slider
                  value={brushRadius}
                  onChange={handleBrushRadiusChange}
                  min={1}
                  max={50}
                  sx={{
                    color: "#E2F0CB",
                    "& .MuiSlider-thumb": {
                      width: 20,
                      height: 20,
                      backgroundColor: "#E2F0CB",
                    },
                  }}
                />
              </Box>

              <FormControlLabel
                control={
                  <Switch
                    checked={isEraser}
                    onChange={toggleEraser}
                    sx={{
                      "& .MuiSwitch-switchBase.Mui-checked": {
                        color: "#E2F0CB",
                      },
                      "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                        backgroundColor: "#E2F0CB",
                      },
                    }}
                  />
                }
                label="מחק"
                sx={{
                  mb: 2,
                  color: "#555",
                  fontFamily: '"Comic Sans MS", cursive, sans-serif',
                  width: "100%",
                }}
              />
            </Paper>
          </Grid>

          <Grid item xs={12} md={9}>
            <Box
              sx={{
                position: "relative",
                width: "100%",
                height: `${canvasSize.height}px`,
                maxHeight: "600px",
                borderRadius: "16px",
                overflow: "hidden",
                boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)",
                border: "3px solid #E2F0CB",
              }}
            >
              <CanvasDraw
                ref={canvasRef}
                brushColor={isEraser ? "#fff" : brushColor}
                brushRadius={brushRadius}
                lazyRadius={0}
                imgSrc={backgroundImageUrl}
                canvasWidth={canvasSize.width}
                canvasHeight={canvasSize.height}
                style={{
                  width: "100%",
                  height: "100%",
                }}
              />
            </Box>

            <Box sx={{ display: "flex", justifyContent: "center", gap: "10px", mt: 3, flexWrap: "wrap" }}>
              <Tooltip title="שמירה">
                <Button
                  variant="contained"
                  onClick={saveToDatabase}
                  startIcon={<SaveIcon />}
                  sx={{
                    background: "linear-gradient(135deg, #E2F0CB 0%, #B5EAD7 100%)",
                    color: "#fff",
                    borderRadius: "12px",
                    padding: "10px 20px",
                    fontWeight: "bold",
                    boxShadow: "0 4px 10px rgba(226, 240, 203, 0.3)",
                    fontFamily: '"Comic Sans MS", cursive, sans-serif',
                    "&:hover": {
                      background: "linear-gradient(135deg, #B5EAD7 0%, #E2F0CB 100%)",
                      transform: "translateY(-3px)",
                      boxShadow: "0 6px 15px rgba(226, 240, 203, 0.4)",
                    },
                    transition: "all 0.3s ease",
                  }}
                >
                  שמירה
                </Button>
              </Tooltip>

              <Tooltip title="הורדה">
                <Button
                  variant="contained"
                  onClick={() => downloadImage()}
                  startIcon={<DownloadIcon />}
                  sx={{
                    background: "linear-gradient(135deg, #FF9AA2 0%, #FFB7B2 100%)",
                    color: "#fff",
                    borderRadius: "12px",
                    padding: "10px 20px",
                    fontWeight: "bold",
                    boxShadow: "0 4px 10px rgba(255, 154, 162, 0.3)",
                    fontFamily: '"Comic Sans MS", cursive, sans-serif',
                    "&:hover": {
                      background: "linear-gradient(135deg, #FFB7B2 0%, #FF9AA2 100%)",
                      transform: "translateY(-3px)",
                      boxShadow: "0 6px 15px rgba(255, 154, 162, 0.4)",
                    },
                    transition: "all 0.3s ease",
                  }}
                >
                  הורדה
                </Button>
              </Tooltip>

              <Tooltip title="ניקוי">
                <Button
                  variant="contained"
                  onClick={clearCanvas}
                  startIcon={<DeleteIcon />}
                  sx={{
                    background: "linear-gradient(135deg, #FFDAC1 0%, #FFC8A2 100%)",
                    color: "#fff",
                    borderRadius: "12px",
                    padding: "10px 20px",
                    fontWeight: "bold",
                    boxShadow: "0 4px 10px rgba(255, 218, 193, 0.3)",
                    fontFamily: '"Comic Sans MS", cursive, sans-serif',
                    "&:hover": {
                      background: "linear-gradient(135deg, #FFC8A2 0%, #FFDAC1 100%)",
                      transform: "translateY(-3px)",
                      boxShadow: "0 6px 15px rgba(255, 218, 193, 0.4)",
                    },
                    transition: "all 0.3s ease",
                  }}
                >
                  ניקוי
                </Button>
              </Tooltip>

              <Tooltip title="חזרה לדף הבית">
                <Button
                  variant="contained"
                  onClick={goToHomePage}
                  startIcon={<HomeIcon />}
                  sx={{
                    background: "linear-gradient(135deg, #C7CEEA 0%, #B5B9FF 100%)",
                    color: "#fff",
                    borderRadius: "12px",
                    padding: "10px 20px",
                    fontWeight: "bold",
                    boxShadow: "0 4px 10px rgba(199, 206, 234, 0.3)",
                    fontFamily: '"Comic Sans MS", cursive, sans-serif',
                    "&:hover": {
                      background: "linear-gradient(135deg, #B5B9FF 0%, #C7CEEA 100%)",
                      transform: "translateY(-3px)",
                      boxShadow: "0 6px 15px rgba(199, 206, 234, 0.4)",
                    },
                    transition: "all 0.3s ease",
                  }}
                >
                  חזרה לדף הבית
                </Button>
              </Tooltip>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  )
}

export default DrawingApp
