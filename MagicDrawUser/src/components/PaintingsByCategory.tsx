// "use client"

// import type React from "react"
// import { useEffect, useState } from "react"
// import { useNavigate, useParams } from "react-router-dom"
// import { useDispatch, useSelector } from "react-redux"
// import { fetchPaintingsByCategory } from "../store/slices/paintingsSlice"
// import type { AppDispatch, RootState } from "../store/store"
// import type { PaintingType } from "../types/PaintingType"

// // Material UI imports
// import {
//   Box,
//   Typography,
//   InputBase,
//   IconButton,
//   Paper,
//   Grid,
//   CircularProgress,
//   Chip,
//   Tooltip,
//   Fade,
//   Zoom,
//   Container,
//   Alert,
//   Snackbar,
// } from "@mui/material"

// // Icons
// import SearchIcon from "@mui/icons-material/Search"
// import ClearIcon from "@mui/icons-material/Clear"
// import ImageIcon from "@mui/icons-material/Image"
// import ArrowBackIcon from "@mui/icons-material/ArrowBack"
// import CategoryIcon from "@mui/icons-material/Category"
// import VisibilityIcon from "@mui/icons-material/Visibility"
// import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome"

// // Color themes for painting cards
// const cardThemes = [
//   {
//     gradient: "linear-gradient(135deg, #FF9AA2 0%, #FFB7B2 100%)",
//     shadow: "0 10px 20px rgba(255, 154, 162, 0.3)",
//   },
//   {
//     gradient: "linear-gradient(135deg, #FFDAC1 0%, #FFC8A2 100%)",
//     shadow: "0 10px 20px rgba(255, 218, 193, 0.3)",
//   },
//   {
//     gradient: "linear-gradient(135deg, #E2F0CB 0%, #B5EAD7 100%)",
//     shadow: "0 10px 20px rgba(226, 240, 203, 0.3)",
//   },
//   {
//     gradient: "linear-gradient(135deg, #C7CEEA 0%, #B5B9FF 100%)",
//     shadow: "0 10px 20px rgba(199, 206, 234, 0.3)",
//   },
// ]

// const PaintingsByCategory: React.FC = () => {
//   const navigate = useNavigate()
//   const dispatch = useDispatch<AppDispatch>()
//   const {
//     list: paintings,
//     loading,
//     error,
//   } = useSelector((state: RootState) => state.paintings) as {
//     list: PaintingType[]
//     loading: boolean
//     error: string | null
//   }

//   const { categoryName } = useParams<{ categoryName: string }>()
//   const [searchTerm, setSearchTerm] = useState<string>("")
//   const [hoveredCard, setHoveredCard] = useState<string | null>(null)
//   const [showAlert, setShowAlert] = useState(false)

//   useEffect(() => {
//     console.log("categoryId", categoryName)
//     dispatch(fetchPaintingsByCategory(categoryName!))
//   }, [dispatch, categoryName])

//   const filteredPaintings = searchTerm
//     ? paintings.filter((painting) => painting.fileName?.toLowerCase().includes(searchTerm.toLowerCase()))
//     : paintings

//   const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setSearchTerm(event.target.value)
//   }

//   const clearSearch = () => {
//     setSearchTerm("")
//   }

//   const handleImageClick = (imagePath: string) => {
//     if (sessionStorage.getItem("authToken")) {
//       navigate("/show-painting", { state: { selectedImage: imagePath } })
//     } else {
//       setShowAlert(true)
//     }
//   }

//   // Loading Animation Component
//   const LoadingAnimation = () => (
//     <Box
//       sx={{
//         display: "flex",
//         flexDirection: "column",
//         justifyContent: "center",
//         alignItems: "center",
//         minHeight: "400px",
//         gap: 3,
//       }}
//     >
//       <Box sx={{ position: "relative" }}>
//         <CircularProgress
//           size={80}
//           sx={{
//             color: "#FF9AA2",
//             animation: "pulse 2s ease-in-out infinite",
//             "@keyframes pulse": {
//               "0%": { transform: "scale(1)" },
//               "50%": { transform: "scale(1.1)" },
//               "100%": { transform: "scale(1)" },
//             },
//           }}
//         />
//         <Box
//           sx={{
//             position: "absolute",
//             top: "50%",
//             left: "50%",
//             transform: "translate(-50%, -50%)",
//           }}
//         >
//           <AutoAwesomeIcon
//             sx={{
//               color: "#FFDAC1",
//               fontSize: "2rem",
//               animation: "spin 3s linear infinite",
//               "@keyframes spin": {
//                 "0%": { transform: "rotate(0deg)" },
//                 "100%": { transform: "rotate(360deg)" },
//               },
//             }}
//           />
//         </Box>
//       </Box>
//       <Typography
//         variant="h6"
//         sx={{
//           color: "#FF9AA2",
//           fontFamily: '"Comic Sans MS", cursive, sans-serif',
//           fontWeight: "bold",
//           animation: "bounce 1s ease-in-out infinite",
//           "@keyframes bounce": {
//             "0%, 100%": { transform: "translateY(0)" },
//             "50%": { transform: "translateY(-10px)" },
//           },
//         }}
//       >
//         טוען ציורים מדהימים...
//       </Typography>
//     </Box>
//   )

//   if (loading) {
//     return (
//       <Container maxWidth="lg" sx={{ py: 4 }}>
//         <LoadingAnimation />
//       </Container>
//     )
//   }

//   if (error) {
//     return (
//       <Container maxWidth="lg" sx={{ py: 4 }}>
//         <Paper
//           elevation={0}
//           sx={{
//             p: 4,
//             textAlign: "center",
//             borderRadius: "20px",
//             background: "rgba(255, 154, 162, 0.1)",
//             border: "3px solid #FF9AA2",
//           }}
//         >
//           <Typography
//             variant="h6"
//             sx={{
//               color: "#FF9AA2",
//               fontFamily: '"Comic Sans MS", cursive, sans-serif',
//               fontWeight: "bold",
//               mb: 2,
//             }}
//           >
//             אופס! משהו השתבש
//           </Typography>
//           <Typography
//             sx={{
//               color: "#666",
//               fontFamily: '"Comic Sans MS", cursive, sans-serif',
//             }}
//           >
//             שגיאה בטעינת הציורים: {error}
//           </Typography>
//         </Paper>
//       </Container>
//     )
//   }

//   return (
//     <Box
//       sx={{
//         minHeight: "100vh",
//         background: "linear-gradient(135deg, #FAFAFA 0%, #F0F0F0 100%)",
//         fontFamily: '"Comic Sans MS", cursive, sans-serif',
//         py: 4,
//       }}
//     >
//       <Container maxWidth="lg">
//         {/* Back Button */}
//         <IconButton
//           onClick={() => navigate(-1)}
//           sx={{
//             position: "fixed",
//             top: 20,
//             right: 20,
//             zIndex: 1000,
//             background: "linear-gradient(135deg, #FF9AA2 0%, #FFB7B2 100%)",
//             color: "white",
//             width: 56,
//             height: 56,
//             boxShadow: "0 8px 20px rgba(255, 154, 162, 0.4)",
//             "&:hover": {
//               background: "linear-gradient(135deg, #FFB7B2 0%, #FF9AA2 100%)",
//               transform: "scale(1.1)",
//               boxShadow: "0 12px 25px rgba(255, 154, 162, 0.5)",
//             },
//             transition: "all 0.3s ease",
//           }}
//         >
//           <ArrowBackIcon />
//         </IconButton>

//         {/* Header */}
//         <Paper
//           elevation={0}
//           sx={{
//             p: 4,
//             mb: 4,
//             borderRadius: "24px",
//             background: "linear-gradient(135deg, rgba(255,255,255,0.9), rgba(248,250,255,0.9))",
//             backdropFilter: "blur(10px)",
//             border: "3px solid #E2F0CB",
//             textAlign: "center",
//           }}
//         >
//           <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 2, mb: 2 }}>
//             <CategoryIcon sx={{ fontSize: "3rem", color: "#E2F0CB" }} />
//             <Typography
//               variant="h3"
//               sx={{
//                 fontWeight: "bold",
//                 color: "#E2F0CB",
//                 fontFamily: '"Comic Sans MS", cursive, sans-serif',
//                 textShadow: "2px 2px 4px rgba(0,0,0,0.1)",
//               }}
//             >
//               {categoryName}
//             </Typography>
//           </Box>
//           <Typography
//             variant="h6"
//             sx={{
//               color: "#666",
//               fontFamily: '"Comic Sans MS", cursive, sans-serif',
//             }}
//           >
//             גלה ציורים מדהימים בקטגוריה זו!
//           </Typography>
//         </Paper>

//         {/* Search Bar */}
//         <Paper
//           elevation={0}
//           sx={{
//             p: 1,
//             display: "flex",
//             alignItems: "center",
//             maxWidth: "500px",
//             mx: "auto",
//             mb: 4,
//             borderRadius: "30px",
//             background: "rgba(255, 255, 255, 0.9)",
//             backdropFilter: "blur(10px)",
//             boxShadow: "0 8px 25px rgba(0, 0, 0, 0.1)",
//             border: "3px solid #FFDAC1",
//           }}
//         >
//           <IconButton sx={{ p: 2, color: "#FFDAC1" }}>
//             <SearchIcon />
//           </IconButton>
//           <InputBase
//             sx={{
//               ml: 1,
//               flex: 1,
//               fontFamily: '"Comic Sans MS", cursive, sans-serif',
//               fontSize: "1.1rem",
//             }}
//             placeholder="חיפוש ציור מיוחד..."
//             value={searchTerm}
//             onChange={handleSearch}
//           />
//           {searchTerm && (
//             <IconButton sx={{ p: 1, color: "#FFDAC1" }} onClick={clearSearch}>
//               <ClearIcon />
//             </IconButton>
//           )}
//         </Paper>

//         {/* Results Count */}
//         {filteredPaintings.length > 0 && (
//           <Box sx={{ textAlign: "center", mb: 3 }}>
//             <Chip
//               label={`נמצאו ${filteredPaintings.length} ציורים`}
//               sx={{
//                 background: "linear-gradient(45deg, #C7CEEA, #B5B9FF)",
//                 color: "white",
//                 fontFamily: '"Comic Sans MS", cursive, sans-serif',
//                 fontWeight: "bold",
//                 fontSize: "1rem",
//                 px: 2,
//                 py: 1,
//               }}
//             />
//           </Box>
//         )}

//         {/* Paintings Grid */}
//         {filteredPaintings.length === 0 ? (
//           <Paper
//             elevation={0}
//             sx={{
//               p: 6,
//               textAlign: "center",
//               borderRadius: "20px",
//               background: "rgba(199, 206, 234, 0.1)",
//               border: "3px dashed #C7CEEA",
//             }}
//           >
//             <ImageIcon sx={{ fontSize: 80, color: "#C7CEEA", mb: 3 }} />
//             <Typography
//               variant="h5"
//               sx={{
//                 fontFamily: '"Comic Sans MS", cursive, sans-serif',
//                 color: "#C7CEEA",
//                 fontWeight: "bold",
//                 mb: 2,
//               }}
//             >
//               לא נמצאו ציורים
//             </Typography>
//             <Typography
//               sx={{
//                 fontFamily: '"Comic Sans MS", cursive, sans-serif',
//                 color: "#888",
//               }}
//             >
//               {searchTerm ? "נסה לחפש משהו אחר" : "אין ציורים בקטגוריה זו כרגע"}
//             </Typography>
//           </Paper>
//         ) : (
//           <Grid container spacing={3}>
//             {filteredPaintings.map((painting, index) => {
//               const theme = cardThemes[index % cardThemes.length]

//               return (
//                 <Grid item xs={6} sm={4} md={3} key={painting.id}>
//                   <Zoom in={true} style={{ transitionDelay: `${index * 100}ms` }}>
//                     <Paper
//                       elevation={0}
//                       sx={{
//                         borderRadius: "20px",
//                         overflow: "hidden",
//                         height: "100%",
//                         display: "flex",
//                         flexDirection: "column",
//                         position: "relative",
//                         transition: "all 0.3s ease",
//                         transform: hoveredCard === painting.id ? "translateY(-12px) scale(1.02)" : "none",
//                         boxShadow: hoveredCard === painting.id ? theme.shadow : "0 6px 15px rgba(0, 0, 0, 0.1)",
//                         border: "3px solid #fff",
//                         cursor: "pointer",
//                       }}
//                       onMouseEnter={() => setHoveredCard(painting.id)}
//                       onMouseLeave={() => setHoveredCard(null)}
//                       onClick={() => handleImageClick(painting.url)}
//                     >
//                       <Box
//                         sx={{
//                           position: "relative",
//                           paddingTop: "100%",
//                           overflow: "hidden",
//                         }}
//                       >
//                         <Box
//                           component="img"
//                           src={painting.url}
//                           alt={painting.fileName}
//                           sx={{
//                             position: "absolute",
//                             top: 0,
//                             left: 0,
//                             width: "100%",
//                             height: "100%",
//                             objectFit: "cover",
//                             transition: "transform 0.5s ease",
//                             transform: hoveredCard === painting.id ? "scale(1.15)" : "scale(1)",
//                           }}
//                         />

//                         <Fade in={hoveredCard === painting.id}>
//                           <Box
//                             sx={{
//                               position: "absolute",
//                               top: 0,
//                               left: 0,
//                               right: 0,
//                               bottom: 0,
//                               background: "rgba(0, 0, 0, 0.4)",
//                               display: "flex",
//                               justifyContent: "center",
//                               alignItems: "center",
//                             }}
//                           >
//                             <Tooltip title="צפה בציור">
//                               <IconButton
//                                 sx={{
//                                   color: "white",
//                                   background: "rgba(255, 255, 255, 0.2)",
//                                   backdropFilter: "blur(10px)",
//                                   width: 60,
//                                   height: 60,
//                                   "&:hover": {
//                                     background: "rgba(255, 255, 255, 0.3)",
//                                     transform: "scale(1.1)",
//                                   },
//                                   transition: "all 0.3s ease",
//                                 }}
//                               >
//                                 <VisibilityIcon sx={{ fontSize: "2rem" }} />
//                               </IconButton>
//                             </Tooltip>
//                           </Box>
//                         </Fade>
//                       </Box>

//                       <Box
//                         sx={{
//                           p: 2,
//                           background: theme.gradient,
//                           color: "white",
//                           flexGrow: 1,
//                           display: "flex",
//                           flexDirection: "column",
//                           justifyContent: "center",
//                         }}
//                       >
//                         <Typography
//                           variant="subtitle1"
//                           sx={{
//                             fontWeight: 700,
//                             textAlign: "center",
//                             overflow: "hidden",
//                             textOverflow: "ellipsis",
//                             whiteSpace: "nowrap",
//                             fontFamily: '"Comic Sans MS", cursive, sans-serif',
//                             fontSize: "1.1rem",
//                           }}
//                         >
//                           {painting.fileName}
//                         </Typography>
//                       </Box>
//                     </Paper>
//                   </Zoom>
//                 </Grid>
//               )
//             })}
//           </Grid>
//         )}

//         {/* Beautiful Alert */}
//         <Snackbar
//           open={showAlert}
//           autoHideDuration={6000}
//           onClose={() => setShowAlert(false)}
//           anchorOrigin={{ vertical: "top", horizontal: "center" }}
//         >
//           <Alert
//             onClose={() => setShowAlert(false)}
//             severity="warning"
//             sx={{
//               width: "100%",
//               borderRadius: "16px",
//               fontFamily: '"Comic Sans MS", cursive, sans-serif',
//               fontSize: "1.1rem",
//               fontWeight: "bold",
//               background: "linear-gradient(135deg, #FFDAC1 0%, #FFC8A2 100%)",
//               color: "white",
//               "& .MuiAlert-icon": {
//                 color: "white",
//               },
//             }}
//           >
//             דרושה התחברות כדי לצפות בציור. נא להתחבר או להירשם.
//           </Alert>
//         </Snackbar>
//       </Container>
//     </Box>
//   )
// }

// export default PaintingsByCategory

"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { fetchPaintingsByCategory } from "../store/slices/paintingsSlice"
import type { AppDispatch, RootState } from "../store/store"
import type { PaintingType } from "../types/PaintingType"

// Material UI imports
import {
  Box,
  Typography,
  InputBase,
  IconButton,
  Paper,
  Grid,
  CircularProgress,
  Chip,
  Tooltip,
  Fade,
  Zoom,
  Container,
  Alert,
  Snackbar,
} from "@mui/material"

// Icons
import SearchIcon from "@mui/icons-material/Search"
import ClearIcon from "@mui/icons-material/Clear"
import ImageIcon from "@mui/icons-material/Image"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import CategoryIcon from "@mui/icons-material/Category"
import VisibilityIcon from "@mui/icons-material/Visibility"
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome"

// Color themes for painting cards
const cardThemes = [
  {
    gradient: "linear-gradient(135deg, #FF9AA2 0%, #FFB7B2 100%)",
    shadow: "0 10px 20px rgba(255, 154, 162, 0.3)",
  },
  {
    gradient: "linear-gradient(135deg, #FFDAC1 0%, #FFC8A2 100%)",
    shadow: "0 10px 20px rgba(255, 218, 193, 0.3)",
  },
  {
    gradient: "linear-gradient(135deg, #E2F0CB 0%, #B5EAD7 100%)",
    shadow: "0 10px 20px rgba(226, 240, 203, 0.3)",
  },
  {
    gradient: "linear-gradient(135deg, #C7CEEA 0%, #B5B9FF 100%)",
    shadow: "0 10px 20px rgba(199, 206, 234, 0.3)",
  },
]

const PaintingsByCategory: React.FC = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  const {
    list: paintings,
    loading,
    error,
  } = useSelector((state: RootState) => state.paintings) as {
    list: PaintingType[]
    loading: boolean
    error: string | null
  }

  const { categoryName } = useParams<{ categoryName: string }>()
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)
  const [showAlert, setShowAlert] = useState(false)

  useEffect(() => {
    console.log("categoryId", categoryName)
    dispatch(fetchPaintingsByCategory(categoryName!))
  }, [dispatch, categoryName])

  const filteredPaintings = searchTerm
    ? paintings.filter((painting) => painting.fileName?.toLowerCase().includes(searchTerm.toLowerCase()))
    : paintings

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  const clearSearch = () => {
    setSearchTerm("")
  }

  const handleImageClick = (imagePath: string) => {
    if (sessionStorage.getItem("authToken")) {
      navigate("/show-painting", { state: { selectedImage: imagePath } })
    } else {
      setShowAlert(true)
    }
  }

  // Loading Animation Component
  const LoadingAnimation = () => (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "400px",
        gap: 3,
      }}
    >
      <Box sx={{ position: "relative" }}>
        <CircularProgress
          size={80}
          sx={{
            color: "#FF9AA2",
            animation: "pulse 2s ease-in-out infinite",
            "@keyframes pulse": {
              "0%": { transform: "scale(1)" },
              "50%": { transform: "scale(1.1)" },
              "100%": { transform: "scale(1)" },
            },
          }}
        />
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <AutoAwesomeIcon
            sx={{
              color: "#FFDAC1",
              fontSize: "2rem",
              animation: "spin 3s linear infinite",
              "@keyframes spin": {
                "0%": { transform: "rotate(0deg)" },
                "100%": { transform: "rotate(360deg)" },
              },
            }}
          />
        </Box>
      </Box>
      <Typography
        variant="h6"
        sx={{
          color: "#FF9AA2",
          fontFamily: '"Comic Sans MS", cursive, sans-serif',
          fontWeight: "bold",
          animation: "bounce 1s ease-in-out infinite",
          "@keyframes bounce": {
            "0%, 100%": { transform: "translateY(0)" },
            "50%": { transform: "translateY(-10px)" },
          },
        }}
      >
        טוען ציורים מדהימים...
      </Typography>
    </Box>
  )

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <LoadingAnimation />
      </Container>
    )
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Paper
          elevation={0}
          sx={{
            p: 4,
            textAlign: "center",
            borderRadius: "20px",
            background: "rgba(255, 154, 162, 0.1)",
            border: "3px solid #FF9AA2",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              color: "#FF9AA2",
              fontFamily: '"Comic Sans MS", cursive, sans-serif',
              fontWeight: "bold",
              mb: 2,
            }}
          >
            אופס! משהו השתבש
          </Typography>
          <Typography
            sx={{
              color: "#666",
              fontFamily: '"Comic Sans MS", cursive, sans-serif',
            }}
          >
            שגיאה בטעינת הציורים: {error}
          </Typography>
        </Paper>
      </Container>
    )
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #FAFAFA 0%, #F0F0F0 100%)",
        fontFamily: '"Comic Sans MS", cursive, sans-serif',
        py: 4,
      }}
    >
      <Container maxWidth="lg">
        {/* Back Button */}
        <IconButton
          onClick={() => navigate(-1)}
          sx={{
            position: "fixed",
            top: 20,
            right: 20,
            zIndex: 1000,
            background: "linear-gradient(135deg, #FF9AA2 0%, #FFB7B2 100%)",
            color: "white",
            width: 56,
            height: 56,
            boxShadow: "0 8px 20px rgba(255, 154, 162, 0.4)",
            "&:hover": {
              background: "linear-gradient(135deg, #FFB7B2 0%, #FF9AA2 100%)",
              transform: "scale(1.1)",
              boxShadow: "0 12px 25px rgba(255, 154, 162, 0.5)",
            },
            transition: "all 0.3s ease",
          }}
        >
          <ArrowBackIcon />
        </IconButton>

        {/* Header */}
        <Paper
          elevation={0}
          sx={{
            p: 4,
            mb: 4,
            borderRadius: "24px",
            background: "linear-gradient(135deg, rgba(255,255,255,0.9), rgba(248,250,255,0.9))",
            backdropFilter: "blur(10px)",
            border: "3px solid #E2F0CB",
            textAlign: "center",
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 2, mb: 2 }}>
            <CategoryIcon sx={{ fontSize: "3rem", color: "#E2F0CB" }} />
            <Typography
              variant="h3"
              sx={{
                fontWeight: "bold",
                color: "#E2F0CB",
                fontFamily: '"Comic Sans MS", cursive, sans-serif',
                textShadow: "2px 2px 4px rgba(0,0,0,0.1)",
              }}
            >
              {categoryName}
            </Typography>
          </Box>
          <Typography
            variant="h6"
            sx={{
              color: "#666",
              fontFamily: '"Comic Sans MS", cursive, sans-serif',
            }}
          >
            גלה ציורים מדהימים בקטגוריה זו!
          </Typography>
        </Paper>

        {/* Search Bar */}
        <Paper
          elevation={0}
          sx={{
            p: 1,
            display: "flex",
            alignItems: "center",
            maxWidth: "500px",
            mx: "auto",
            mb: 4,
            borderRadius: "30px",
            background: "rgba(255, 255, 255, 0.9)",
            backdropFilter: "blur(10px)",
            boxShadow: "0 8px 25px rgba(0, 0, 0, 0.1)",
            border: "3px solid #FFDAC1",
          }}
        >
          <IconButton sx={{ p: 2, color: "#FFDAC1" }}>
            <SearchIcon />
          </IconButton>
          <InputBase
            sx={{
              ml: 1,
              flex: 1,
              fontFamily: '"Comic Sans MS", cursive, sans-serif',
              fontSize: "1.1rem",
            }}
            placeholder="חיפוש ציור מיוחד..."
            value={searchTerm}
            onChange={handleSearch}
          />
          {searchTerm && (
            <IconButton sx={{ p: 1, color: "#FFDAC1" }} onClick={clearSearch}>
              <ClearIcon />
            </IconButton>
          )}
        </Paper>

        {/* Results Count */}
        {filteredPaintings.length > 0 && (
          <Box sx={{ textAlign: "center", mb: 3 }}>
            <Chip
              label={`נמצאו ${filteredPaintings.length} ציורים`}
              sx={{
                background: "linear-gradient(45deg, #C7CEEA, #B5B9FF)",
                color: "white",
                fontFamily: '"Comic Sans MS", cursive, sans-serif',
                fontWeight: "bold",
                fontSize: "1rem",
                px: 2,
                py: 1,
              }}
            />
          </Box>
        )}

        {/* Paintings Grid */}
        {filteredPaintings.length === 0 ? (
          <Paper
            elevation={0}
            sx={{
              p: 6,
              textAlign: "center",
              borderRadius: "20px",
              background: "rgba(199, 206, 234, 0.1)",
              border: "3px dashed #C7CEEA",
            }}
          >
            <ImageIcon sx={{ fontSize: 80, color: "#C7CEEA", mb: 3 }} />
            <Typography
              variant="h5"
              sx={{
                fontFamily: '"Comic Sans MS", cursive, sans-serif',
                color: "#C7CEEA",
                fontWeight: "bold",
                mb: 2,
              }}
            >
              לא נמצאו ציורים
            </Typography>
            <Typography
              sx={{
                fontFamily: '"Comic Sans MS", cursive, sans-serif',
                color: "#888",
              }}
            >
              {searchTerm ? "נסה לחפש משהו אחר" : "אין ציורים בקטגוריה זו כרגע"}
            </Typography>
          </Paper>
        ) : (
          <Grid container spacing={3}>
            {filteredPaintings.map((painting, index) => {
              const theme = cardThemes[index % cardThemes.length]

              return (
                <Grid item xs={6} sm={4} md={3} key={painting.id}>
                  <Zoom in={true} style={{ transitionDelay: `${index * 100}ms` }}>
                    <Paper
                      elevation={0}
                      sx={{
                        borderRadius: "20px",
                        overflow: "hidden",
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        position: "relative",
                        transition: "all 0.3s ease",
                        transform: hoveredCard === painting.id ? "translateY(-12px) scale(1.02)" : "none",
                        boxShadow: hoveredCard === painting.id ? theme.shadow : "0 6px 15px rgba(0, 0, 0, 0.1)",
                        border: "3px solid #fff",
                        cursor: "pointer",
                      }}
                      onMouseEnter={() => setHoveredCard(painting.id)}
                      onMouseLeave={() => setHoveredCard(null)}
                      onClick={() => handleImageClick(painting.url)}
                    >
                      <Box
                        sx={{
                          position: "relative",
                          paddingTop: "100%",
                          overflow: "hidden",
                        }}
                      >
                        <Box
                          component="img"
                          src={painting.url}
                          alt={painting.fileName}
                          sx={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            transition: "transform 0.5s ease",
                            transform: hoveredCard === painting.id ? "scale(1.15)" : "scale(1)",
                          }}
                        />

                        <Fade in={hoveredCard === painting.id}>
                          <Box
                            sx={{
                              position: "absolute",
                              top: 0,
                              left: 0,
                              right: 0,
                              bottom: 0,
                              background: "rgba(0, 0, 0, 0.4)",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <Tooltip title="צפה בציור">
                              <IconButton
                                sx={{
                                  color: "white",
                                  background: "rgba(255, 255, 255, 0.2)",
                                  backdropFilter: "blur(10px)",
                                  width: 60,
                                  height: 60,
                                  "&:hover": {
                                    background: "rgba(255, 255, 255, 0.3)",
                                    transform: "scale(1.1)",
                                  },
                                  transition: "all 0.3s ease",
                                }}
                              >
                                <VisibilityIcon sx={{ fontSize: "2rem" }} />
                              </IconButton>
                            </Tooltip>
                          </Box>
                        </Fade>
                      </Box>

                      <Box
                        sx={{
                          p: 2,
                          background: theme.gradient,
                          color: "white",
                          flexGrow: 1,
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                        }}
                      >
                        <Typography
                          variant="subtitle1"
                          sx={{
                            fontWeight: 700,
                            textAlign: "center",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                            fontFamily: '"Comic Sans MS", cursive, sans-serif',
                            fontSize: "1.1rem",
                          }}
                        >
                          {painting.fileName}
                        </Typography>
                      </Box>
                    </Paper>
                  </Zoom>
                </Grid>
              )
            })}
          </Grid>
        )}

        {/* Beautiful Alert */}
        <Snackbar
          open={showAlert}
          autoHideDuration={6000}
          onClose={() => setShowAlert(false)}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert
            onClose={() => setShowAlert(false)}
            severity="warning"
            sx={{
              width: "100%",
              borderRadius: "16px",
              fontFamily: '"Comic Sans MS", cursive, sans-serif',
              fontSize: "1.1rem",
              fontWeight: "bold",
              background: "linear-gradient(135deg, #FFDAC1 0%, #FFC8A2 100%)",
              color: "white",
              "& .MuiAlert-icon": {
                color: "white",
              },
            }}
          >
            דרושה התחברות כדי לצפות בציור. נא להתחבר או להירשם.
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  )
}

export default PaintingsByCategory
