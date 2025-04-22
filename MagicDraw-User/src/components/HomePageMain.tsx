// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchPaintings } from '../store/slices/paintingsSlice';
// import { AppDispatch, RootState } from '../store/store';
// import SearchIcon from '@mui/icons-material/Search';
// import { Button, CircularProgress, Typography } from '@mui/material';
// import { PaintingType } from '../types/PaintingType';

// const gradients = [
//   'linear-gradient(135deg, #84fab0, #8fd3f4)', // Green-Blue
//   'linear-gradient(135deg, #ff9a9e, #fad0c4)', // Pink
//   'linear-gradient(135deg, #a18cd1, #fbc2eb)', // Purple-Pink
// ];

// const HomePageMain: React.FC = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch<AppDispatch>();
//   const { list: paintings, loading, error } = useSelector(
//     (state: RootState) => state.paintings
//   ) as { list: PaintingType[]; loading: boolean; error: string | null };

//   const [searchTerm, setSearchTerm] = useState<string>(''); // State for search input
//   const [currentPage, setCurrentPage] = useState<number>(1); // State for current page
//   const itemsPerPage = 8; // Number of items per page

//   useEffect(() => {
//     dispatch(fetchPaintings()); // Fetch paintings from the database
//   }, [dispatch]);

//   const filteredPaintings = searchTerm
//     ? paintings.filter((painting) =>
//         painting.fileName?.toLowerCase().includes(searchTerm.toLowerCase())
//       )
//     : paintings; // אם אין ערך בחיפוש, מציגים את כל הציורים

//   const totalPages = Math.ceil(filteredPaintings.length / itemsPerPage);
//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const currentPaintings = filteredPaintings.slice(startIndex, startIndex + itemsPerPage);

//   const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setSearchTerm(event.target.value);
//     setCurrentPage(1); // Reset to the first page when searching
//   };

//   const handleImageClick = (imagePath: string) => {
//     console.log(imagePath);
    
//     navigate('/show-painting', { state: { selectedImage: imagePath } });
//   };

//   if (loading) {
//     return (
//       <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
//         <CircularProgress />
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <Typography color="error" style={{ textAlign: 'center', marginTop: '20px' }}>
//         שגיאה בטעינת הציורים: {error}
//       </Typography>
//     );
//   }

//   return (
//     <div>
//       <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '20px' }}>
//         <div style={{ position: 'relative', width: '300px' }}>
//           <input
//             type="text"
//             placeholder="חיפוש ציור"
//             value={searchTerm}
//             onChange={handleSearch}
//             style={{
//               width: '100%',
//               padding: '10px 40px 10px 10px', // מרווח לאייקון
//               borderRadius: '20px',
//               border: '1px solid #ddd',
//               outline: 'none',
//               fontSize: '16px',
//               boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
//             }}
//           />
//           <SearchIcon
//             style={{
//               position: 'absolute',
//               right: '10px',
//               top: '50%',
//               transform: 'translateY(-50%)',
//               color: '#888',
//               cursor: 'pointer',
//             }}
//           />
//         </div>
//       </div>
//       <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
//         {currentPaintings.map((painting, index) => (
//           <div
//             key={painting.id}
//             style={{
//               cursor: 'pointer',
//               border: '1px solid #ddd',
//               borderRadius: '10px',
//               overflow: 'hidden',
//               width: '150px',
//               height: '230px',
//               transition: 'transform 0.2s',
//             }}
//             onClick={() => {console.log(painting.url);
//              handleImageClick(painting.url);}}
//             onMouseEnter={(e) => {
//               (e.currentTarget as HTMLElement).style.transform = 'scale(1.05)';
//             }}
//             onMouseLeave={(e) => {
//               (e.currentTarget as HTMLElement).style.transform = 'scale(1)';
//             }}
//           >
//             <img
//               src={painting.url}
//               alt={painting.fileName}
//               style={{ width: '100%', height: '150px', objectFit: 'cover' }}
//             />
//             <div
//               style={{
//                 background: gradients[index % gradients.length],
//                 color: 'white',
//                 textAlign: 'center',
//                 padding: '5px',
//                 height: '30px',
//               }}
//             >
//               {painting.fileName}
//             </div>
//           </div>
//         ))}
//       </div>
//       {filteredPaintings.length === 0 && (
//         <p style={{ textAlign: 'center', color: '#555', marginTop: '20px' }}>
//           לא נמצאו תוצאות לחיפוש.
//         </p>
//       )}
//       {filteredPaintings.length > itemsPerPage && (
//         <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px', gap: '10px' }}>
//           <Button
//             variant="contained"
//             disabled={currentPage === 1}
//             onClick={() => setCurrentPage((prev) => prev - 1)}
//             sx={{
//               background: 'linear-gradient(135deg, #84fab0, #8fd3f4)',
//               color: '#fff',
//               '&:hover': {
//                 background: 'linear-gradient(135deg, #8fd3f4, #84fab0)',
//               },
//             }}
//           >
//             ציורים קודמים
//           </Button>
//           <Button
//             variant="contained"
//             disabled={currentPage === totalPages}
//             onClick={() => setCurrentPage((prev) => prev + 1)}
//             sx={{
//               background: 'linear-gradient(135deg, #84fab0, #8fd3f4)',
//               color: '#fff',
//               '&:hover': {
//                 background: 'linear-gradient(135deg, #8fd3f4, #84fab0)',
//               },
//             }}
//           >
//             ציורים נוספים
//           </Button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default HomePageMain;

"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { fetchPaintings } from "../store/slices/paintingsSlice"
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
  Button,
  CircularProgress,
  Pagination,
  Chip,
  Tooltip,
  Fade,
  Zoom,
  useMediaQuery,
  useTheme,
} from "@mui/material"

// Icons
import SearchIcon from "@mui/icons-material/Search"
import ImageIcon from "@mui/icons-material/Image"
import VisibilityIcon from "@mui/icons-material/Visibility"
import ClearIcon from "@mui/icons-material/Clear"

// Color themes for painting cards - using PrintKids-inspired colors
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
  {
    gradient: "linear-gradient(135deg, #FF9AA2 0%, #FFB7B2 100%)",
    shadow: "0 10px 20px rgba(255, 154, 162, 0.3)",
  },
  {
    gradient: "linear-gradient(135deg, #FFDAC1 0%, #FFC8A2 100%)",
    shadow: "0 10px 20px rgba(255, 218, 193, 0.3)",
  },
]

const HomePageMain: React.FC = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))

  const {
    list: paintings,
    loading,
    error,
  } = useSelector((state: RootState) => state.paintings) as {
    list: PaintingType[]
    loading: boolean
    error: string | null
  }

  const [searchTerm, setSearchTerm] = useState<string>("")
  const [currentPage, setCurrentPage] = useState<number>(1)
  const itemsPerPage = isMobile ? 6 : 8
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)

  useEffect(() => {
    dispatch(fetchPaintings())
    console.log("Fetching paintings...", paintings);
    
  }, [dispatch])

  const filteredPaintings = searchTerm
    ? paintings.filter((painting) => painting.fileName?.toLowerCase().includes(searchTerm.toLowerCase()))
    : paintings

  const totalPages = Math.ceil(filteredPaintings.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const currentPaintings = filteredPaintings.slice(startIndex, startIndex + itemsPerPage)

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
    setCurrentPage(1)
  }

  const clearSearch = () => {
    setSearchTerm("")
    setCurrentPage(1)
  }

  const handleImageClick = (imagePath: string) => {
    navigate("/show-painting", { state: { selectedImage: imagePath } })
  }

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value)
    // Scroll to top of gallery
    window.scrollTo({
      top: document.getElementById("gallery-section")?.offsetTop || 0,
      behavior: "smooth",
    })
  }

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "300px",
        }}
      >
        <CircularProgress size={60} sx={{ color: "#FF9AA2" }} />
      </Box>
    )
  }

  if (error) {
    return (
      <Paper
        elevation={0}
        sx={{
          p: 4,
          textAlign: "center",
          borderRadius: "16px",
          background: "rgba(255, 255, 255, 0.8)",
          backdropFilter: "blur(10px)",
        }}
      >
        <Typography variant="h6" color="error" gutterBottom>
          שגיאה בטעינת הציורים
        </Typography>
        <Typography color="text.secondary">{error}</Typography>
        <Button
          variant="contained"
          sx={{
            mt: 2,
            borderRadius: "10px",
            background: "linear-gradient(45deg, #FF9AA2, #FFB7B2)",
          }}
          onClick={() => dispatch(fetchPaintings())}
        >
          נסה שוב
        </Button>
      </Paper>
    )
  }

  return (
    <Box id="gallery-section" sx={{ mt: 4 }}>
      <Typography
        variant="h4"
        component="h2"
        sx={{
          mb: 4,
          fontWeight: 700,
          color: "#FF9AA2",
          textAlign: "center",
          fontFamily: '"Comic Sans MS", cursive, sans-serif',
        }}
      >
        הגלריה שלנו
      </Typography>

      <Paper
        elevation={0}
        sx={{
          p: 1,
          display: "flex",
          alignItems: "center",
          width: "100%",
          maxWidth: "500px",
          mx: "auto",
          mb: 4,
          borderRadius: "30px",
          background: "rgba(255, 255, 255, 0.8)",
          backdropFilter: "blur(10px)",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
          border: "2px solid #FFB7B2",
        }}
      >
        <IconButton sx={{ p: 2, color: "#FF9AA2" }}>
          <SearchIcon />
        </IconButton>
        <InputBase
          sx={{ ml: 1, flex: 1, fontFamily: '"Comic Sans MS", cursive, sans-serif' }}
          placeholder="חיפוש ציור..."
          value={searchTerm}
          onChange={handleSearch}
        />
        {searchTerm && (
          <IconButton sx={{ p: 1 }} onClick={clearSearch}>
            <ClearIcon fontSize="small" />
          </IconButton>
        )}
      </Paper>

      {filteredPaintings.length === 0 ? (
        <Paper
          elevation={0}
          sx={{
            p: 4,
            textAlign: "center",
            borderRadius: "16px",
            background: "rgba(255, 255, 255, 0.8)",
            backdropFilter: "blur(10px)",
            border: "2px dashed #FFB7B2",
          }}
        >
          <ImageIcon sx={{ fontSize: 60, color: "#FFB7B2", mb: 2 }} />
          <Typography
            variant="h6"
            color="text.secondary"
            gutterBottom
            sx={{ fontFamily: '"Comic Sans MS", cursive, sans-serif' }}
          >
            לא נמצאו תוצאות לחיפוש
          </Typography>
          {searchTerm && (
            <Button
              variant="outlined"
              onClick={clearSearch}
              sx={{
                mt: 2,
                borderRadius: "10px",
                borderColor: "#FF9AA2",
                color: "#FF9AA2",
                fontFamily: '"Comic Sans MS", cursive, sans-serif',
              }}
            >
              נקה חיפוש
            </Button>
          )}
        </Paper>
      ) : (
        <>
          <Grid container spacing={3} justifyContent="center">
            {currentPaintings.map((painting, index) => {
              const theme = cardThemes[index % cardThemes.length]

              return (
                <Grid item xs={6} sm={4} md={3} key={painting.id}>
                  <Zoom in={true} style={{ transitionDelay: `${index * 100}ms` }}>
                    <Paper
                      elevation={0}
                      sx={{
                        borderRadius: "16px",
                        overflow: "hidden",
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        position: "relative",
                        transition: "all 0.3s ease",
                        transform: hoveredCard === painting.id ? "translateY(-8px)" : "none",
                        boxShadow: hoveredCard === painting.id ? theme.shadow : "0 4px 10px rgba(0, 0, 0, 0.1)",
                        border: "3px solid #fff",
                      }}
                      onMouseEnter={() => setHoveredCard(painting.id)}
                      onMouseLeave={() => setHoveredCard(null)}
                      onClick={() => handleImageClick(painting.url)}
                    >
                      <Box
                        sx={{
                          position: "relative",
                          paddingTop: "100%", // 1:1 Aspect ratio
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
                            transform: hoveredCard === painting.id ? "scale(1.1)" : "scale(1)",
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
                              background: "rgba(0, 0, 0, 0.3)",
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
                                  "&:hover": {
                                    background: "rgba(255, 255, 255, 0.3)",
                                  },
                                }}
                              >
                                <VisibilityIcon />
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
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography
                          variant="subtitle1"
                          sx={{
                            fontWeight: 600,
                            textAlign: "center",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                            fontFamily: '"Comic Sans MS", cursive, sans-serif',
                          }}
                        >
                          {painting.fileName}
                        </Typography>

                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            mt: 1,
                          }}
                        >
                          <Chip
                            label={painting.categoryName || "כללי"}
                            size="small"
                            sx={{
                              background: "rgba(255, 255, 255, 0.3)",
                              color: "white",
                              fontWeight: 500,
                              fontSize: "0.7rem",
                              fontFamily: '"Comic Sans MS", cursive, sans-serif',
                            }}
                          />
                        </Box>
                      </Box>
                    </Paper>
                  </Zoom>
                </Grid>
              )
            })}
          </Grid>

          {totalPages > 1 && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                mt: 4,
                mb: 2,
              }}
            >
              <Pagination
                count={totalPages}
                page={currentPage}
                onChange={handlePageChange}
                color="primary"
                size={isMobile ? "small" : "medium"}
                sx={{
                  "& .MuiPaginationItem-root": {
                    borderRadius: "10px",
                    fontFamily: '"Comic Sans MS", cursive, sans-serif',
                  },
                  "& .Mui-selected": {
                    background: "linear-gradient(45deg, #FF9AA2, #FFB7B2)",
                    color: "white",
                    fontWeight: "bold",
                  },
                }}
              />
            </Box>
          )}
        </>
      )}
    </Box>
  )
}

export default HomePageMain

