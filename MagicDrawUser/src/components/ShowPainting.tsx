import type React from "react"
import { Box, Button, Typography, Paper, IconButton, Zoom, Tooltip } from "@mui/material"
import { useNavigate, useLocation } from "react-router-dom"

// Icons
import CloseIcon from "@mui/icons-material/Close"
import ColorLensIcon from "@mui/icons-material/ColorLens"
import DownloadIcon from "@mui/icons-material/Download"
import PrintIcon from "@mui/icons-material/Print"

// Color themes for buttons
const buttonThemes = [
  {
    gradient: "linear-gradient(135deg, #E2F0CB 0%, #B5EAD7 100%)",
    shadow: "0 10px 20px rgba(226, 240, 203, 0.3)",
    hoverGradient: "linear-gradient(135deg, #B5EAD7 0%, #E2F0CB 100%)",
  },
  {
    gradient: "linear-gradient(135deg, #FF9AA2 0%, #FFB7B2 100%)",
    shadow: "0 10px 20px rgba(255, 154, 162, 0.3)",
    hoverGradient: "linear-gradient(135deg, #FFB7B2 0%, #FF9AA2 100%)",
  },
  {
    gradient: "linear-gradient(135deg, #FFDAC1 0%, #FFC8A2 100%)",
    shadow: "0 10px 20px rgba(255, 218, 193, 0.3)",
    hoverGradient: "linear-gradient(135deg, #FFC8A2 0%, #FFDAC1 100%)",
  },
]

interface ShowPaintingProps {
  selectedImage: string
}

const ShowPainting: React.FC<ShowPaintingProps> = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { selectedImage } = location.state || {}

  const handleNavigateToDrawingApp = () => {
    navigate("/drawing-app", { state: { backgroundImageUrl: selectedImage } })
  }

  const handleClose = () => {
    navigate("/")
  }

  const handleDownloadImage = () => {
    const link = document.createElement("a")
    link.href = selectedImage
    link.download = "painting.png"
    link.click()
  }

  const handlePrintImage = () => {
    const newWindow = window.open("")
    if (newWindow) {
      newWindow.document.write(`<img src="${selectedImage}" alt="Printed Painting" style="max-width: 100%;"/>`)
      newWindow.print()
    }
  }

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        backdropFilter: "blur(5px)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
        fontFamily: '"Comic Sans MS", cursive, sans-serif',
      }}
    >
      <Zoom in={true}>
        <Paper
          elevation={0}
          sx={{
            padding: "20px",
            borderRadius: "24px",
            background: "white",
            width: "90%",
            maxWidth: "800px",
            position: "relative",
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
            border: "3px solid #E2F0CB",
          }}
        >
          {/* אייקון לסגירה */}
          <IconButton
            onClick={handleClose}
            sx={{
              position: "absolute",
              top: "15px",
              right: "15px",
              color: "#FF9AA2",
              background: "rgba(255, 154, 162, 0.1)",
              "&:hover": {
                background: "rgba(255, 154, 162, 0.2)",
              },
            }}
          >
            <CloseIcon />
          </IconButton>

          <Typography
            variant="h5"
            sx={{
              textAlign: "center",
              mb: 3,
              fontWeight: "bold",
              color: "#E2F0CB",
              fontFamily: '"Comic Sans MS", cursive, sans-serif',
            }}
          >
            הציור שלך
          </Typography>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: "20px",
            }}
          >
            <Paper
              elevation={0}
              sx={{
                padding: "10px",
                borderRadius: "16px",
                overflow: "hidden",
                border: "3px solid #E2F0CB",
                boxShadow: "0 10px 20px rgba(226, 240, 203, 0.3)",
              }}
            >
              <img
                src={selectedImage || "/placeholder.svg"}
                alt="Selected Painting"
                style={{
                  maxWidth: "100%",
                  maxHeight: "400px",
                  borderRadius: "10px",
                  display: "block",
                }}
              />
            </Paper>
          </Box>

          <Box sx={{ display: "flex", justifyContent: "center", gap: "15px", flexWrap: "wrap" }}>
            <Tooltip title="לצביעת התמונה">
              <Button
                variant="contained"
                onClick={handleNavigateToDrawingApp}
                startIcon={<ColorLensIcon />}
                sx={{
                  background: buttonThemes[0].gradient,
                  color: "#fff",
                  borderRadius: "12px",
                  padding: "10px 20px",
                  fontWeight: "bold",
                  boxShadow: buttonThemes[0].shadow,
                  fontFamily: '"Comic Sans MS", cursive, sans-serif',
                  "&:hover": {
                    background: buttonThemes[0].hoverGradient,
                    transform: "translateY(-3px)",
                    boxShadow: "0 15px 25px rgba(226, 240, 203, 0.4)",
                  },
                  transition: "all 0.3s ease",
                }}
              >
                לצביעת התמונה
              </Button>
            </Tooltip>

            <Tooltip title="הורד תמונה">
              <Button
                variant="contained"
                onClick={handleDownloadImage}
                startIcon={<DownloadIcon />}
                sx={{
                  background: buttonThemes[1].gradient,
                  color: "#fff",
                  borderRadius: "12px",
                  padding: "10px 20px",
                  fontWeight: "bold",
                  boxShadow: buttonThemes[1].shadow,
                  fontFamily: '"Comic Sans MS", cursive, sans-serif',
                  "&:hover": {
                    background: buttonThemes[1].hoverGradient,
                    transform: "translateY(-3px)",
                    boxShadow: "0 15px 25px rgba(255, 154, 162, 0.4)",
                  },
                  transition: "all 0.3s ease",
                }}
              >
                הורד תמונה
              </Button>
            </Tooltip>

            <Tooltip title="הדפס תמונה">
              <Button
                variant="contained"
                onClick={handlePrintImage}
                startIcon={<PrintIcon />}
                sx={{
                  background: buttonThemes[2].gradient,
                  color: "#fff",
                  borderRadius: "12px",
                  padding: "10px 20px",
                  fontWeight: "bold",
                  boxShadow: buttonThemes[2].shadow,
                  fontFamily: '"Comic Sans MS", cursive, sans-serif',
                  "&:hover": {
                    background: buttonThemes[2].hoverGradient,
                    transform: "translateY(-3px)",
                    boxShadow: "0 15px 25px rgba(255, 218, 193, 0.4)",
                  },
                  transition: "all 0.3s ease",
                }}
              >
                הדפס תמונה
              </Button>
            </Tooltip>
          </Box>
        </Paper>
      </Zoom>
    </Box>
  )
}

export default ShowPainting
