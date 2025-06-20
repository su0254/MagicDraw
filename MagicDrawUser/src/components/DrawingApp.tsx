import { useState, useRef, useEffect } from "react"
import { Stage, Layer, Line, Image as KonvaImage } from "react-konva"
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
import SaveIcon from "@mui/icons-material/Save"
import ArrowForwardIcon from "@mui/icons-material/ArrowForward"
import DownloadIcon from "@mui/icons-material/Download"
import DeleteIcon from "@mui/icons-material/Delete"
import HomeIcon from "@mui/icons-material/Home"
import PaletteIcon from "@mui/icons-material/Palette"
import FormatPaintIcon from "@mui/icons-material/FormatPaint"
import PrintIcon from "@mui/icons-material/Print"
import { useLocation, useNavigate } from "react-router"
import { useDispatch } from "react-redux"
import { AppDispatch } from "../store/store"
import { addPaintedPainting } from "../store/slices/paintingPaintedSlice"
import AIInstructions from "./AIInstructions"

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

const DrawingApp = () => {
  const [brushColor, setBrushColor] = useState("#FF9AA2")
  const [brushWidth, setBrushWidth] = useState(5)

  type LineType = {
    points: number[]
    color: string
    width: number
    tool: string
  }
  const [lines, setLines] = useState<LineType[]>([])
  const [isDrawing, setIsDrawing] = useState(false)
  const [isEraser, setIsEraser] = useState(false)
  const [canvasSize, setCanvasSize] = useState({ width: 800, height: 400 })
  const stageRef = useRef<any>(null)
  const backgroundImageRef = useRef<any>(null)
  const [backgroundImage, setBackgroundImage] = useState<HTMLImageElement | null>(null)

  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  const { backgroundImageUrl } = location.state || {}


  useEffect(() => {
    if (backgroundImageUrl) {
      const img = new Image()
      img.crossOrigin = "anonymous"
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
        setBackgroundImage(img)
      }
    }
  }, [backgroundImageUrl])

  const handleMouseDown = (e: any) => {
    setIsDrawing(true)
    const pos = e.target.getStage().getPointerPosition()

    setLines([
      ...lines,
      {
        points: [pos.x, pos.y],
        color: isEraser ? "#FFFFFF" : brushColor,
        width: brushWidth,
        tool: isEraser ? "eraser" : "brush",
      },
    ])
  }

  const handleMouseMove = (e: any) => {
    if (!isDrawing) return

    const stage = e.target.getStage()
    const point = stage.getPointerPosition()

    const lastLine = lines[lines.length - 1]
    lastLine.points = lastLine.points.concat([point.x, point.y])

    setLines([...lines.slice(0, -1), lastLine])
  }

  const handleMouseUp = () => {
    setIsDrawing(false)
  }

  const handleColorChange = (event: any) => {
    setBrushColor(event.target.value)
    setIsEraser(false)
  }

  const handleBrushWidthChange = (event: any, value: any) => {
    setBrushWidth(value)
    console.log(event, value);
  }

  const toggleEraser = () => {
    setIsEraser(!isEraser)
  }

  const clearCanvas = () => {
    setLines([])
  }

  const saveToDatabase = async () => {
    if (stageRef.current) {
      const dataURL = stageRef.current.toDataURL()

      // Create a canvas to combine background and drawing
      const canvas = document.createElement("canvas")
      const ctx = canvas.getContext("2d")

      canvas.width = canvasSize.width
      canvas.height = canvasSize.height

      // Draw background image
      if (backgroundImage) {
        ctx?.drawImage(backgroundImage, 0, 0, canvasSize.width, canvasSize.height)
      }

      // Draw the Konva stage content
      const drawingImg = new Image()
      drawingImg.src = dataURL
      drawingImg.onload = async () => {
        ctx?.drawImage(drawingImg, 0, 0)

        const finalImage = canvas.toDataURL("image/png")

        try {
          const response = await fetch(finalImage)
          const blob = await response.blob()
          const file = new File([blob], `painting-${Date.now()}`, { type: "image/png" })

          const paintingData = {
            userId: localStorage.getItem("userId") || "",
            fileName: `painting-${Date.now()}.png`,
            imageFile: file,
          }
          console.log("paintingData", paintingData);


          // Here you would dispatch to Redux or use another method to save
           await dispatch(addPaintedPainting(paintingData))

          alert("הציור נשמר בהצלחה!")
        } catch (error) {
          console.error("Error saving image:", error)
        }
      }
    }
  }

  const downloadImage = (format = "png") => {
    if (stageRef.current) {
      const dataURL = stageRef.current.toDataURL()

      // Create a canvas to combine background and drawing
      const canvas = document.createElement("canvas")
      const ctx = canvas.getContext("2d")

      canvas.width = canvasSize.width
      canvas.height = canvasSize.height

      // Draw background image
      if (backgroundImage) {
        ctx?.drawImage(backgroundImage, 0, 0, canvasSize.width, canvasSize.height)
      }

      // Draw the Konva stage content
      const drawingImg = new Image()
      drawingImg.src = dataURL
      drawingImg.onload = () => {
        ctx?.drawImage(drawingImg, 0, 0)

        const finalImage = canvas.toDataURL(`image/${format}`)

        // Create download link
        const link = document.createElement("a")
        link.href = finalImage
        link.download = `painted_drawing.${format}`
        link.click()
      }
    }
  }

  const printCanvas = () => {
    if (stageRef.current) {
      const dataURL = stageRef.current.toDataURL()

      // Create a canvas to combine background and drawing
      const canvas = document.createElement("canvas")
      const ctx = canvas.getContext("2d")

      canvas.width = canvasSize.width
      canvas.height = canvasSize.height

      // Draw background image
      if (backgroundImage) {
        ctx?.drawImage(backgroundImage, 0, 0, canvasSize.width, canvasSize.height)
      }

      // Draw the Konva stage content
      const drawingImg = new Image()
      drawingImg.src = dataURL
      drawingImg.onload = () => {
        ctx?.drawImage(drawingImg, 0, 0)

        const finalImage = canvas.toDataURL("image/png")

        // Create print window
        const printWindow = window.open("", "_blank")
        if (printWindow) {
          printWindow.document.write(`<img src="${finalImage}" style="width:100%; height:auto;" />`)
          printWindow.document.close()
          printWindow.focus()
          printWindow.print()
          printWindow.close()
        }
      }
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
        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            <AIInstructions imageUrl={backgroundImageUrl || ""} />
          </Grid>
        </Grid>

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

        {/* אייקון חץ לחזרה לעמוד הקודם */}
        <ArrowForwardIcon
          onClick={() => navigate(-1)}
          sx={{
            position: "absolute",
            top: "70px",
            right: "80px",
            fontSize: "2rem",
            color: "#555",
            cursor: "pointer",
            "&:hover": {
              color: "#000",
            },
          }}
        />
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
                  גודל מברשת: {brushWidth}
                </Typography>
                <Slider
                  value={brushWidth}
                  onChange={handleBrushWidthChange}
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
              <Tooltip title="ניקוי הכל">
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
                  ניקוי הכל
                </Button>
              </Tooltip>
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
              <Stage
                width={canvasSize.width}
                height={canvasSize.height}
                onMouseDown={handleMouseDown}
                onMousemove={handleMouseMove}
                onMouseup={handleMouseUp}
                ref={stageRef}
              >
                <Layer>
                  {backgroundImage && (
                    <KonvaImage
                      image={backgroundImage}
                      width={canvasSize.width}
                      height={canvasSize.height}
                      ref={backgroundImageRef}
                    />
                  )}
                  {lines.map((line, i) => (
                    <Line
                      key={i}
                      points={line.points}
                      stroke={line.color}
                      strokeWidth={line.width}
                      tension={0.5}
                      lineCap="round"
                      lineJoin="round"
                      globalCompositeOperation={line.tool === "eraser" ? "destination-out" : "source-over"}
                    />
                  ))}
                </Layer>
              </Stage>
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

              <Tooltip title="הדפסה">
                <Button
                  variant="contained"
                  onClick={printCanvas}
                  startIcon={<PrintIcon />}
                  sx={{
                    background: "linear-gradient(135deg, #FEE440 0%, #F15BB5 100%)",
                    color: "#fff",
                    borderRadius: "12px",
                    padding: "10px 20px",
                    fontWeight: "bold",
                    boxShadow: "0 4px 10px rgba(255, 228, 64, 0.3)",
                    fontFamily: '"Comic Sans MS", cursive, sans-serif',
                    "&:hover": {
                      background: "linear-gradient(135deg, #F15BB5 0%, #FEE440 100%)",
                      transform: "translateY(-3px)",
                      boxShadow: "0 6px 15px rgba(255, 228, 64, 0.4)",
                    },
                    transition: "all 0.3s ease",
                  }}
                >
                  הדפסה
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
