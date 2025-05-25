import type React from "react"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "../store/store"
import { fetchCategories } from "../store/slices/categorySlice"
import { addPainting } from "../store/slices/paintingsSlice"
import { useAuth } from "./AuthContext"
import Category from "./Category"
import HomePageMain from "./HomePageMain"

// Material UI imports
import {
  AppBar, Toolbar,
  Button,
  Typography,
  Box,
  Container,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  CircularProgress,
  Paper,
  IconButton,
  Tooltip,
  Grid,
} from "@mui/material"

// Icons
import CloudUploadIcon from "@mui/icons-material/CloudUpload"
import PersonIcon from "@mui/icons-material/Person"
import LogoutIcon from "@mui/icons-material/Logout"
import LoginIcon from "@mui/icons-material/Login"
import HowToRegIcon from "@mui/icons-material/HowToReg"
import CloseIcon from "@mui/icons-material/Close"
import PaletteIcon from "@mui/icons-material/Palette"
import BrushIcon from "@mui/icons-material/Brush"

const HomePage: React.FC = () => {
  const navigate = useNavigate()
  const { isLoggedIn, setIsLoggedIn } = useAuth()
  const dispatch = useDispatch<AppDispatch>()
  // const theme = useTheme()
  // const isMobile = useMediaQuery(theme.breakpoints.down("sm"))

  const [openUploadDialog, setOpenUploadDialog] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [paintingName, setPaintingName] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  const { list: categories, loading: categoriesLoading } = useSelector(
    (state: RootState) => state.categories,
  ) as unknown as { list: { categoryName: string }[]; loading: boolean }

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(fetchCategories())
    }
  }, [dispatch, isLoggedIn])

  const handleLogout = () => {
    setIsLoggedIn(false)
    navigate("/")
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0]
      setSelectedFile(file)

      // Create preview URL for the selected image
      const fileReader = new FileReader()
      fileReader.onload = () => {
        setPreviewUrl(fileReader.result as string)
      }
      fileReader.readAsDataURL(file)
    }
  }

  const handleUpload = async () => {
    const userId = localStorage.getItem("userId") || ""

    if (selectedFile && paintingName && selectedCategory) {
      const formData = {
        fileName: paintingName,
        categoryName: selectedCategory,
        userId: userId,
        imageFile: selectedFile,
      }

      try {
        await dispatch(addPainting(formData))
        alert("הציור הועלה בהצלחה!")
        setOpenUploadDialog(false)
        setPaintingName("")
        setSelectedCategory("")
        setSelectedFile(null)
        setPreviewUrl(null)
      } catch (error) {
        console.error("שגיאה בהעלאת הציור:", error)
        alert("אירעה שגיאה בהעלאת הציור. נסה שוב.")
      }
    } else {
      alert("אנא מלא את כל השדות.")
    }
  }

  const closeUploadDialog = () => {
    setOpenUploadDialog(false)
    setPaintingName("")
    setSelectedCategory("")
    setSelectedFile(null)
    setPreviewUrl(null)
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        background: "linear-gradient(135deg, #FAFAFA 0%, #F0F0F0 100%)",
        fontFamily: '"Comic Sans MS", cursive, sans-serif',
      }}
    >
      <AppBar
        position="static"
        elevation={0}
        sx={{
          background: "rgba(255, 255, 255, 0.9)",
          backdropFilter: "blur(10px)",
          borderBottom: "3px solid #FFB7B2",
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 800,
              color: "#FF9AA2",
              fontFamily: '"Comic Sans MS", cursive, sans-serif',
              letterSpacing: "0.5px",
              textShadow: "1px 1px 2px rgba(0,0,0,0.1)",
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <PaletteIcon sx={{ color: "#FFDAC1" }} />
            <span style={{ color: "#FF9AA2" }}>MagicDraw -</span>
            <span style={{ color: "#FFDAC1" }}>ציור</span>
            <span style={{ color: "#E2F0CB" }}>קסם של</span>
          </Typography>

          <Box sx={{ display: "flex", gap: 1 }}>
            {isLoggedIn ? (
              <>
                <Tooltip title="אזור אישי">
                  <Button
                    variant="contained"
                    startIcon={<PersonIcon />}
                    onClick={() => navigate("/personal-area")}
                    sx={{
                      borderRadius: "20px",
                      background: "linear-gradient(45deg, #FF9AA2, #FFB7B2)",
                      boxShadow: "0 4px 10px rgba(255, 154, 162, 0.3)",
                      textTransform: "none",
                      fontWeight: 600,
                      fontFamily: '"Comic Sans MS", cursive, sans-serif',
                      "&:hover": {
                        background: "linear-gradient(45deg, #FFB7B2, #FF9AA2)",
                        boxShadow: "0 6px 15px rgba(255, 154, 162, 0.4)",
                      },
                    }}
                  >
                    אזור אישי
                  </Button>
                </Tooltip>

                <Tooltip title="התנתק">
                  <Button
                    variant="outlined"
                    startIcon={<LogoutIcon />}
                    onClick={handleLogout}
                    sx={{
                      borderRadius: "20px",
                      borderColor: "#FF9AA2",
                      color: "#FF9AA2",
                      textTransform: "none",
                      fontWeight: 600,
                      fontFamily: '"Comic Sans MS", cursive, sans-serif',
                      "&:hover": {
                        borderColor: "#FFB7B2",
                        background: "rgba(255, 154, 162, 0.05)",
                      },
                    }}
                  >
                    התנתק
                  </Button>
                </Tooltip>
              </>
            ) : (
              <>
                <Tooltip title="הרשמה">
                  <Button
                    variant="contained"
                    startIcon={<HowToRegIcon />}
                    onClick={() => navigate("/register")}
                    sx={{
                      borderRadius: "20px",
                      background: "linear-gradient(45deg, #FF9AA2, #FFB7B2)",
                      boxShadow: "0 4px 10px rgba(255, 154, 162, 0.3)",
                      textTransform: "none",
                      fontWeight: 600,
                      fontFamily: '"Comic Sans MS", cursive, sans-serif',
                      "&:hover": {
                        background: "linear-gradient(45deg, #FFB7B2, #FF9AA2)",
                        boxShadow: "0 6px 15px rgba(255, 154, 162, 0.4)",
                      },
                    }}
                  >
                    הרשמה
                  </Button>
                </Tooltip>

                <Tooltip title="התחברות">
                  <Button
                    variant="outlined"
                    startIcon={<LoginIcon />}
                    onClick={() => navigate("/login")}
                    sx={{
                      borderRadius: "20px",
                      borderColor: "#FF9AA2",
                      color: "#FF9AA2",
                      textTransform: "none",
                      fontWeight: 600,
                      fontFamily: '"Comic Sans MS", cursive, sans-serif',
                      "&:hover": {
                        borderColor: "#FFB7B2",
                        background: "rgba(255, 154, 162, 0.05)",
                      },
                    }}
                  >
                    התחברות
                  </Button>
                </Tooltip>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ mt: 6, mb: 8 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            <Paper
              elevation={0}
              sx={{
                borderRadius: "24px",
                overflow: "hidden",
                background: "linear-gradient(135deg, rgba(255,255,255,0.9), rgba(255,255,255,0.7))",
                backdropFilter: "blur(10px)",
                boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                mb: 6,
                position: "relative",
                border: "3px solid #FFB7B2",
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  opacity: 0.05,
                  backgroundImage: 'url("/placeholder.svg?height=600&width=1200")',
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  zIndex: 0,
                }}
              />

              <Box
                sx={{
                  position: "relative",
                  zIndex: 1,
                  p: { xs: 4, md: 6 },
                  textAlign: "center",
                }}
              >
                <Typography
                  variant="h2"
                  component="h1"
                  sx={{
                    fontWeight: 800,
                    color: "#FF9AA2",
                    mb: 2,
                    fontFamily: '"Comic Sans MS", cursive, sans-serif',
                    textShadow: "2px 2px 4px rgba(0,0,0,0.1)",
                  }}
                >
                  <span style={{ color: "#FF9AA2" }}>ברוכים</span> <span style={{ color: "#FFDAC1" }}>הבאים</span>{" "}
                  <span style={{ color: "#E2F0CB" }}>לגלריה!</span>
                </Typography>

                <Typography
                  variant="h6"
                  sx={{
                    color: "#546e7a",
                    maxWidth: "800px",
                    mx: "auto",
                    mb: 4,
                    lineHeight: 1.6,
                    fontFamily: '"Comic Sans MS", cursive, sans-serif',
                  }}
                >
                  גלו, חקרו ותיהנו מציורי ילדים מדהימים. תנו לדמיון והיצירתיות שלכם לפרוח.
                </Typography>

                {isLoggedIn && (
                  <Button
                    variant="contained"
                    size="large"
                    startIcon={<BrushIcon />}
                    onClick={() => setOpenUploadDialog(true)}
                    sx={{
                      borderRadius: "30px",
                      py: 1.5,
                      px: 4,
                      background: "linear-gradient(45deg, #FFDAC1, #FFC8A2)",
                      boxShadow: "0 4px 20px rgba(255, 218, 193, 0.4)",
                      textTransform: "none",
                      fontSize: "1.1rem",
                      fontWeight: 600,
                      fontFamily: '"Comic Sans MS", cursive, sans-serif',
                      color: "#fff",
                      "&:hover": {
                        background: "linear-gradient(45deg, #FFC8A2, #FFDAC1)",
                        boxShadow: "0 6px 25px rgba(255, 218, 193, 0.5)",
                      },
                    }}
                  >
                    העלאת ציור חדש
                  </Button>
                )}
              </Box>
            </Paper>

            <HomePageMain />
          </Grid>
          <Grid item xs={12} md={4}>
            <Category />
          </Grid>
        </Grid>
      </Container>

      {/* Dialog for uploading a painting */}
      <Dialog
        open={openUploadDialog}
        onClose={closeUploadDialog}
        PaperProps={{
          sx: {
            borderRadius: "16px",
            boxShadow: "0 10px 40px rgba(0,0,0,0.2)",
            maxWidth: "500px",
            width: "100%",
            border: "3px solid #FFB7B2",
            fontFamily: '"Comic Sans MS", cursive, sans-serif',
          },
        }}
      >
        <DialogTitle
          sx={{
            background: "linear-gradient(45deg, #FF9AA2, #FFB7B2)",
            color: "white",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            py: 2,
            fontFamily: '"Comic Sans MS", cursive, sans-serif',
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 600, fontFamily: '"Comic Sans MS", cursive, sans-serif' }}>
            העלאת ציור חדש
          </Typography>
          <IconButton edge="end" color="inherit" onClick={closeUploadDialog} aria-label="close" size="small">
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent sx={{ pt: 3, pb: 1 }}>
          <TextField
            label="שם הציור"
            fullWidth
            margin="normal"
            value={paintingName}
            onChange={(e) => setPaintingName(e.target.value)}
            variant="outlined"
            InputProps={{
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
          />

          <FormControl fullWidth margin="normal">
            <InputLabel id="category-label" sx={{ fontFamily: '"Comic Sans MS", cursive, sans-serif' }}>
              קטגוריה
            </InputLabel>
            <Select
              labelId="category-label"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              MenuProps={{
                PaperProps: {
                  style: {
                    maxHeight: 200,
                    overflowY: "auto",
                  },
                },
              }}
              sx={{
                borderRadius: "12px",
                fontFamily: '"Comic Sans MS", cursive, sans-serif',
              }}
            >
              {categoriesLoading ? (
                <MenuItem disabled>
                  <CircularProgress size={20} />
                </MenuItem>
              ) : (
                categories.map((category, index) => (
                  <MenuItem
                    key={index}
                    value={category.categoryName}
                    sx={{
                      fontWeight: 500,
                      fontFamily: '"Comic Sans MS", cursive, sans-serif',
                      "&:hover": {
                        background: "rgba(255, 154, 162, 0.1)",
                      },
                      "&.Mui-selected": {
                        background: "rgba(255, 154, 162, 0.2)",
                      },
                    }}
                  >
                    {category.categoryName}
                  </MenuItem>
                ))
              )}
            </Select>
          </FormControl>

          <Box
            sx={{
              mt: 3,
              mb: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
            }}
          >
            <Button
              variant="outlined"
              component="label"
              startIcon={<CloudUploadIcon />}
              sx={{
                borderRadius: "12px",
                borderColor: "#FF9AA2",
                color: "#FF9AA2",
                p: 1.5,
                fontFamily: '"Comic Sans MS", cursive, sans-serif',
                "&:hover": {
                  borderColor: "#FFB7B2",
                  background: "rgba(255, 154, 162, 0.05)",
                },
              }}
            >
              בחר קובץ תמונה
              <input type="file" accept="image/*" hidden onChange={handleFileChange} />
            </Button>

            {previewUrl && (
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <Paper
                  elevation={0}
                  sx={{
                    p: 1,
                    borderRadius: "12px",
                    border: "2px solid #FFB7B2",
                    width: "100%",
                    maxWidth: "300px",
                  }}
                >
                  <img
                    src={previewUrl || "/placeholder.svg"}
                    alt="תצוגה מקדימה"
                    style={{
                      width: "100%",
                      height: "auto",
                      borderRadius: "8px",
                      objectFit: "contain",
                    }}
                  />
                </Paper>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ fontFamily: '"Comic Sans MS", cursive, sans-serif' }}
                >
                  {selectedFile?.name}
                </Typography>
              </Box>
            )}
          </Box>
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 3, pt: 1 }}>
          <Button
            onClick={closeUploadDialog}
            sx={{
              color: "#FF9AA2",
              borderRadius: "10px",
              textTransform: "none",
              fontWeight: 600,
              fontFamily: '"Comic Sans MS", cursive, sans-serif',
            }}
          >
            ביטול
          </Button>
          <Button
            onClick={handleUpload}
            variant="contained"
            sx={{
              borderRadius: "10px",
              background: "linear-gradient(45deg, #FF9AA2, #FFB7B2)",
              textTransform: "none",
              fontWeight: 600,
              px: 3,
              fontFamily: '"Comic Sans MS", cursive, sans-serif',
              "&:hover": {
                background: "linear-gradient(45deg, #FFB7B2, #FF9AA2)",
              },
            }}
          >
            העלאה
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )

  // return (
  //   <Box
  //     sx={{
  //       minHeight: "100vh",
  //       display: "flex",
  //       flexDirection: "column",
  //       background: "linear-gradient(135deg, #FAFAFA 0%, #F0F0F0 100%)",
  //       fontFamily: '"Comic Sans MS", cursive, sans-serif',
  //     }}
  //   >
  //     <AppBar
  //       position="static"
  //       elevation={0}
  //       sx={{
  //         background: "rgba(255, 255, 255, 0.9)",
  //         backdropFilter: "blur(10px)",
  //         borderBottom: "3px solid #FFB7B2",
  //       }}
  //     >
  //       <Toolbar sx={{ justifyContent: "space-between" }}>
  //         <Typography
  //           variant="h5"
  //           sx={{
  //             fontWeight: 800,
  //             color: "#FF9AA2",
  //             fontFamily: '"Comic Sans MS", cursive, sans-serif',
  //             letterSpacing: "0.5px",
  //             textShadow: "1px 1px 2px rgba(0,0,0,0.1)",
  //             display: "flex",
  //             alignItems: "center",
  //             gap: 1,
  //           }}
  //         >
  //           <PaletteIcon sx={{ color: "#FFDAC1" }} />
  //           <span style={{ color: "#FF9AA2" }}>MagicDraw -</span>
  //           <span style={{ color: "#FFDAC1" }}>ציור</span>
  //           <span style={{ color: "#E2F0CB" }}>קסם של</span>
  //         </Typography>

  //         <Box sx={{ display: "flex", gap: 1 }}>
  //           {isLoggedIn ? (
  //             <>
  //               <Tooltip title="אזור אישי">
  //                 <Button
  //                   variant="contained"
  //                   startIcon={<PersonIcon />}
  //                   onClick={() => navigate("/personal-area")}
  //                   sx={{
  //                     borderRadius: "20px",
  //                     background: "linear-gradient(45deg, #FF9AA2, #FFB7B2)",
  //                     boxShadow: "0 4px 10px rgba(255, 154, 162, 0.3)",
  //                     textTransform: "none",
  //                     fontWeight: 600,
  //                     fontFamily: '"Comic Sans MS", cursive, sans-serif',
  //                     "&:hover": {
  //                       background: "linear-gradient(45deg, #FFB7B2, #FF9AA2)",
  //                       boxShadow: "0 6px 15px rgba(255, 154, 162, 0.4)",
  //                     },
  //                   }}
  //                 >
  //                   אזור אישי
  //                 </Button>
  //               </Tooltip>

  //               <Tooltip title="התנתק">
  //                 <Button
  //                   variant="outlined"
  //                   startIcon={<LogoutIcon />}
  //                   onClick={handleLogout}
  //                   sx={{
  //                     borderRadius: "20px",
  //                     borderColor: "#FF9AA2",
  //                     color: "#FF9AA2",
  //                     textTransform: "none",
  //                     fontWeight: 600,
  //                     fontFamily: '"Comic Sans MS", cursive, sans-serif',
  //                     "&:hover": {
  //                       borderColor: "#FFB7B2",
  //                       background: "rgba(255, 154, 162, 0.05)",
  //                     },
  //                   }}
  //                 >
  //                   התנתק
  //                 </Button>
  //               </Tooltip>
  //             </>
  //           ) : (
  //             <>
  //               <Tooltip title="הרשמה">
  //                 <Button
  //                   variant="contained"
  //                   startIcon={<HowToRegIcon />}
  //                   onClick={() => navigate("/register")}
  //                   sx={{
  //                     borderRadius: "20px",
  //                     background: "linear-gradient(45deg, #FF9AA2, #FFB7B2)",
  //                     boxShadow: "0 4px 10px rgba(255, 154, 162, 0.3)",
  //                     textTransform: "none",
  //                     fontWeight: 600,
  //                     fontFamily: '"Comic Sans MS", cursive, sans-serif',
  //                     "&:hover": {
  //                       background: "linear-gradient(45deg, #FFB7B2, #FF9AA2)",
  //                       boxShadow: "0 6px 15px rgba(255, 154, 162, 0.4)",
  //                     },
  //                   }}
  //                 >
  //                   הרשמה
  //                 </Button>
  //               </Tooltip>

  //               <Tooltip title="התחברות">
  //                 <Button
  //                   variant="outlined"
  //                   startIcon={<LoginIcon />}
  //                   onClick={() => navigate("/login")}
  //                   sx={{
  //                     borderRadius: "20px",
  //                     borderColor: "#FF9AA2",
  //                     color: "#FF9AA2",
  //                     textTransform: "none",
  //                     fontWeight: 600,
  //                     fontFamily: '"Comic Sans MS", cursive, sans-serif',
  //                     "&:hover": {
  //                       borderColor: "#FFB7B2",
  //                       background: "rgba(255, 154, 162, 0.05)",
  //                     },
  //                   }}
  //                 >
  //                   התחברות
  //                 </Button>
  //               </Tooltip>
  //             </>
  //           )}
  //         </Box>
  //       </Toolbar>
  //     </AppBar>

  //     <Container maxWidth="lg" sx={{ mt: 6, mb: 8 }}>
  //       <Paper
  //         elevation={0}
  //         sx={{
  //           borderRadius: "24px",
  //           overflow: "hidden",
  //           background: "linear-gradient(135deg, rgba(255,255,255,0.9), rgba(255,255,255,0.7))",
  //           backdropFilter: "blur(10px)",
  //           boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
  //           mb: 6,
  //           position: "relative",
  //           border: "3px solid #FFB7B2",
  //         }}
  //       >
  //         <Box
  //           sx={{
  //             position: "absolute",
  //             top: 0,
  //             left: 0,
  //             right: 0,
  //             bottom: 0,
  //             opacity: 0.05,
  //             backgroundImage: 'url("/placeholder.svg?height=600&width=1200")',
  //             backgroundSize: "cover",
  //             backgroundPosition: "center",
  //             zIndex: 0,
  //           }}
  //         />

  //         <Box
  //           sx={{
  //             position: "relative",
  //             zIndex: 1,
  //             p: { xs: 4, md: 6 },
  //             textAlign: "center",
  //           }}
  //         >
  //           <Typography
  //             variant="h2"
  //             component="h1"
  //             sx={{
  //               fontWeight: 800,
  //               color: "#FF9AA2",
  //               mb: 2,
  //               fontFamily: '"Comic Sans MS", cursive, sans-serif',
  //               textShadow: "2px 2px 4px rgba(0,0,0,0.1)",
  //             }}
  //           >
  //             <span style={{ color: "#FF9AA2" }}>ברוכים</span> <span style={{ color: "#FFDAC1" }}>הבאים</span>{" "}
  //             <span style={{ color: "#E2F0CB" }}>לגלריה!</span>
  //           </Typography>

  //           <Typography
  //             variant="h6"
  //             sx={{
  //               color: "#546e7a",
  //               maxWidth: "800px",
  //               mx: "auto",
  //               mb: 4,
  //               lineHeight: 1.6,
  //               fontFamily: '"Comic Sans MS", cursive, sans-serif',
  //             }}
  //           >
  //             גלו, חקרו ותיהנו מציורי ילדים מדהימים. תנו לדמיון והיצירתיות שלכם לפרוח.
  //           </Typography>

  //           {isLoggedIn && (
  //             <Button
  //               variant="contained"
  //               size="large"
  //               startIcon={<BrushIcon />}
  //               onClick={() => setOpenUploadDialog(true)}
  //               sx={{
  //                 borderRadius: "30px",
  //                 py: 1.5,
  //                 px: 4,
  //                 background: "linear-gradient(45deg, #FFDAC1, #FFC8A2)",
  //                 boxShadow: "0 4px 20px rgba(255, 218, 193, 0.4)",
  //                 textTransform: "none",
  //                 fontSize: "1.1rem",
  //                 fontWeight: 600,
  //                 fontFamily: '"Comic Sans MS", cursive, sans-serif',
  //                 color: "#fff",
  //                 "&:hover": {
  //                   background: "linear-gradient(45deg, #FFC8A2, #FFDAC1)",
  //                   boxShadow: "0 6px 25px rgba(255, 218, 193, 0.5)",
  //                 },
  //               }}
  //             >
  //               העלאת ציור חדש
  //             </Button>
  //           )}
  //         </Box>
  //       </Paper>

  //       <Category />
  //       <HomePageMain />
  //     </Container>

  //     {/* Dialog for uploading a painting */}
  //     <Dialog
  //       open={openUploadDialog}
  //       onClose={closeUploadDialog}
  //       PaperProps={{
  //         sx: {
  //           borderRadius: "16px",
  //           boxShadow: "0 10px 40px rgba(0,0,0,0.2)",
  //           maxWidth: "500px",
  //           width: "100%",
  //           border: "3px solid #FFB7B2",
  //           fontFamily: '"Comic Sans MS", cursive, sans-serif',
  //         },
  //       }}
  //     >
  //       <DialogTitle
  //         sx={{
  //           background: "linear-gradient(45deg, #FF9AA2, #FFB7B2)",
  //           color: "white",
  //           display: "flex",
  //           justifyContent: "space-between",
  //           alignItems: "center",
  //           py: 2,
  //           fontFamily: '"Comic Sans MS", cursive, sans-serif',
  //         }}
  //       >
  //         <Typography variant="h6" sx={{ fontWeight: 600, fontFamily: '"Comic Sans MS", cursive, sans-serif' }}>
  //           העלאת ציור חדש
  //         </Typography>
  //         <IconButton edge="end" color="inherit" onClick={closeUploadDialog} aria-label="close" size="small">
  //           <CloseIcon />
  //         </IconButton>
  //       </DialogTitle>

  //       <DialogContent sx={{ pt: 3, pb: 1 }}>
  //         <TextField
  //           label="שם הציור"
  //           fullWidth
  //           margin="normal"
  //           value={paintingName}
  //           onChange={(e) => setPaintingName(e.target.value)}
  //           variant="outlined"
  //           InputProps={{
  //             sx: {
  //               borderRadius: "12px",
  //               fontFamily: '"Comic Sans MS", cursive, sans-serif',
  //             },
  //           }}
  //           InputLabelProps={{
  //             sx: {
  //               fontFamily: '"Comic Sans MS", cursive, sans-serif',
  //             },
  //           }}
  //         />

  //         <FormControl fullWidth margin="normal">
  //           <InputLabel id="category-label" sx={{ fontFamily: '"Comic Sans MS", cursive, sans-serif' }}>
  //             קטגוריה
  //           </InputLabel>
  //           <Select
  //             labelId="category-label"
  //             value={selectedCategory}
  //             onChange={(e) => setSelectedCategory(e.target.value)}
  //             MenuProps={{
  //               PaperProps: {
  //                 style: {
  //                   maxHeight: 200,
  //                   overflowY: "auto",
  //                 },
  //               },
  //             }}
  //             sx={{
  //               borderRadius: "12px",
  //               fontFamily: '"Comic Sans MS", cursive, sans-serif',
  //             }}
  //           >
  //             {categoriesLoading ? (
  //               <MenuItem disabled>
  //                 <CircularProgress size={20} />
  //               </MenuItem>
  //             ) : (
  //               categories.map((category, index) => (
  //                 <MenuItem
  //                   key={index}
  //                   value={category.categoryName}
  //                   sx={{
  //                     fontWeight: 500,
  //                     fontFamily: '"Comic Sans MS", cursive, sans-serif',
  //                     "&:hover": {
  //                       background: "rgba(255, 154, 162, 0.1)",
  //                     },
  //                     "&.Mui-selected": {
  //                       background: "rgba(255, 154, 162, 0.2)",
  //                     },
  //                   }}
  //                 >
  //                   {category.categoryName}
  //                 </MenuItem>
  //               ))
  //             )}
  //           </Select>
  //         </FormControl>

  //         <Box
  //           sx={{
  //             mt: 3,
  //             mb: 2,
  //             display: "flex",
  //             flexDirection: "column",
  //             alignItems: "center",
  //             gap: 2,
  //           }}
  //         >
  //           <Button
  //             variant="outlined"
  //             component="label"
  //             startIcon={<CloudUploadIcon />}
  //             sx={{
  //               borderRadius: "12px",
  //               borderColor: "#FF9AA2",
  //               color: "#FF9AA2",
  //               p: 1.5,
  //               fontFamily: '"Comic Sans MS", cursive, sans-serif',
  //               "&:hover": {
  //                 borderColor: "#FFB7B2",
  //                 background: "rgba(255, 154, 162, 0.05)",
  //               },
  //             }}
  //           >
  //             בחר קובץ תמונה
  //             <input type="file" accept="image/*" hidden onChange={handleFileChange} />
  //           </Button>

  //           {previewUrl && (
  //             <Box
  //               sx={{
  //                 width: "100%",
  //                 display: "flex",
  //                 flexDirection: "column",
  //                 alignItems: "center",
  //                 gap: 1,
  //               }}
  //             >
  //               <Paper
  //                 elevation={0}
  //                 sx={{
  //                   p: 1,
  //                   borderRadius: "12px",
  //                   border: "2px solid #FFB7B2",
  //                   width: "100%",
  //                   maxWidth: "300px",
  //                 }}
  //               >
  //                 <img
  //                   src={previewUrl || "/placeholder.svg"}
  //                   alt="תצוגה מקדימה"
  //                   style={{
  //                     width: "100%",
  //                     height: "auto",
  //                     borderRadius: "8px",
  //                     objectFit: "contain",
  //                   }}
  //                 />
  //               </Paper>
  //               <Typography
  //                 variant="body2"
  //                 color="text.secondary"
  //                 sx={{ fontFamily: '"Comic Sans MS", cursive, sans-serif' }}
  //               >
  //                 {selectedFile?.name}
  //               </Typography>
  //             </Box>
  //           )}
  //         </Box>
  //       </DialogContent>

  //       <DialogActions sx={{ px: 3, pb: 3, pt: 1 }}>
  //         <Button
  //           onClick={closeUploadDialog}
  //           sx={{
  //             color: "#FF9AA2",
  //             borderRadius: "10px",
  //             textTransform: "none",
  //             fontWeight: 600,
  //             fontFamily: '"Comic Sans MS", cursive, sans-serif',
  //           }}
  //         >
  //           ביטול
  //         </Button>
  //         <Button
  //           onClick={handleUpload}
  //           variant="contained"
  //           sx={{
  //             borderRadius: "10px",
  //             background: "linear-gradient(45deg, #FF9AA2, #FFB7B2)",
  //             textTransform: "none",
  //             fontWeight: 600,
  //             px: 3,
  //             fontFamily: '"Comic Sans MS", cursive, sans-serif',
  //             "&:hover": {
  //               background: "linear-gradient(45deg, #FFB7B2, #FF9AA2)",
  //             },
  //           }}
  //         >
  //           העלאה
  //         </Button>
  //       </DialogActions>
  //     </Dialog>
  //   </Box>
  // )
}

export default HomePage
