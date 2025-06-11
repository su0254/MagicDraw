// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { Box, Typography, Button, TextField, CircularProgress } from '@mui/material';
// import { AppDispatch, RootState } from '../store/store';
// import { fetchPaintedPaintingsByUser } from '../store/slices/paintingPaintedSlice';
// import axios from 'axios';

// const gradients = [
//   'linear-gradient(135deg, #84fab0, #8fd3f4)', // Green-Blue
//   'linear-gradient(135deg, #ff9a9e, #fad0c4)', // Pink
//   'linear-gradient(135deg, #a18cd1, #fbc2eb)', // Purple-Pink
// ];

// const PersonalArea: React.FC = () => {
//   const dispatch = useDispatch<AppDispatch>();
//   const navigate = useNavigate();

//   const [userDetails, setUserDetails] = useState({
//     firstName: '',
//     lastName: '',
//     email: '',
//   });
//   const [isEditing, setIsEditing] = useState(false);

//   const { list: paintedPaintings, loading, error } = useSelector(
//     (state: RootState) => state.paintedPaintings
//   );

//   const userId = localStorage.getItem('userId') || '';

//   // Fetch user details
//   useEffect(() => {
//     const fetchUserDetails = async () => {
//       try {
//         const response = await axios.get(`http://localhost:5058/api/User/${userId}`);
//         setUserDetails(response.data);
//       } catch (error) {
//         console.error('שגיאה בשליפת פרטי המשתמש:', error);
//       }
//     };

//     fetchUserDetails();
//     dispatch(fetchPaintedPaintingsByUser());
//   }, [dispatch, userId]);

//   const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = event.target;
//     setUserDetails((prevDetails) => ({
//       ...prevDetails,
//       [name]: value,
//     }));
//   };

//   const handleSaveDetails = async () => {
//     try {
//       await axios.put(`http://localhost:5058/api/User/${userId}`, userDetails);
//       alert('הפרטים עודכנו בהצלחה!');
//       setIsEditing(false);
//     } catch (error) {
//       console.error('שגיאה בעדכון פרטי המשתמש:', error);
//       alert('עדכון הפרטים נכשל. נסה שוב.');
//     }
//   };

//   const handlePaintingClick = (paintingId: string) => {
//     navigate('/show-painting', { state: { paintingId } });
//   };

//   return (
//     <Box
//       sx={{
//         padding: '20px',
//         maxWidth: '1200px',
//         margin: 'auto',
//         direction: 'rtl',
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'center',
//         justifyContent: 'center',
//         minHeight: '100vh',
//       }}
//     >
//       <Typography variant="h4" gutterBottom sx={{ color: '#333', textAlign: 'center', fontSize: 'clamp(1.5rem, 2.5vw, 2.5rem)' }}>
//         האזור האישי
//       </Typography>

//       {/* User Details Section */}
//       <Box
//         sx={{
//           marginBottom: '30px',
//           textAlign: 'center',
//           width: '100%',
//           maxWidth: '400px',
//         }}
//       >
//         <Typography variant="h5" gutterBottom sx={{ color: '#555', fontSize: 'clamp(1.2rem, 2vw, 1.8rem)' }}>
//           פרטים אישיים
//         </Typography>
//         {isEditing ? (
//           <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
//             <TextField
//               label="שם פרטי"
//               name="firstName"
//               value={userDetails.firstName}
//               onChange={handleInputChange}
//               fullWidth
//               inputProps={{ style: { textAlign: 'right' } }}
//             />
//             <TextField
//               label="שם משפחה"
//               name="lastName"
//               value={userDetails.lastName}
//               onChange={handleInputChange}
//               fullWidth
//               inputProps={{ style: { textAlign: 'right' } }}
//             />
//             <TextField
//               label="אימייל"
//               name="email"
//               value={userDetails.email}
//               onChange={handleInputChange}
//               fullWidth
//               inputProps={{ style: { textAlign: 'right' } }}
//             />
//             <Box sx={{ display: 'flex', gap: '10px' }}>
//               <Button
//                 variant="contained"
//                 onClick={handleSaveDetails}
//                 sx={{
//                   flex: 1,
//                   marginTop: '10px',
//                   background: 'linear-gradient(135deg, #a18cd1, #fbc2eb)',
//                   color: '#fff',
//                   '&:hover': {
//                     background: 'linear-gradient(135deg, #fbc2eb, #a18cd1)',
//                   },
//                 }}
//               >
//                 שמור
//               </Button>
//               <Button
//                 variant="outlined"
//                 onClick={() => setIsEditing(false)}
//                 sx={{
//                   flex: 1,
//                   borderColor: gradients[1],
//                   color: gradients[1],
                  
//                 }}
//               >
//                 ביטול
//               </Button>
//             </Box>
//           </Box>
//         ) : (
//           <Box>
//             <Typography variant="body1" sx={{ color: '#555', fontSize: 'clamp(1rem, 1.5vw, 1.2rem)' }}>
//               שם פרטי: {userDetails.firstName}
//             </Typography>
//             <Typography variant="body1" sx={{ color: '#555', fontSize: 'clamp(1rem, 1.5vw, 1.2rem)' }}>
//               שם משפחה: {userDetails.lastName}
//             </Typography>
//             <Typography variant="body1" sx={{ color: '#555', fontSize: 'clamp(1rem, 1.5vw, 1.2rem)' }}>
//               אימייל: {userDetails.email}
//             </Typography>
//             <Button
//               variant="contained"
//               sx={{
//                 marginTop: '10px',
//                 background: 'linear-gradient(135deg, #84fab0, #8fd3f4)',
//                 color: '#fff',
//                 '&:hover': {
//                   background: 'linear-gradient(135deg, #8fd3f4, #84fab0)',
//                 },
//               }}
//               onClick={() => setIsEditing(true)}
//             >
//               ערוך פרטים
//             </Button>
//           </Box>
//         )}
//       </Box>

//       {/* Painted Paintings Section */}
//       <Box
//         sx={{
//           width: '100%',
//           textAlign: 'center',
//         }}
//       >
//         <Typography variant="h5" gutterBottom sx={{ color: '#555', fontSize: 'clamp(1.2rem, 2vw, 1.8rem)' }}>
//           הציורים שלך
//         </Typography>
//         {loading ? (
//           <CircularProgress />
//         ) : error ? (
//           <Typography color="error" sx={{ textAlign: 'center' }}>שגיאה: {error}</Typography>
//         ) : paintedPaintings.length === 0 ? (
//           <Typography sx={{ textAlign: 'center' }}>לא נמצאו ציורים צבועים.</Typography>
//         ) : (
//           <Box
//             sx={{
//               display: 'flex',
//               flexWrap: 'wrap',
//               gap: '20px',
//               justifyContent: 'center',
//               marginTop: '20px',
//             }}
//           >
//             {paintedPaintings.map((painting, index) => (
//               <Box
//                 key={painting.id}
//                 sx={{
//                   cursor: 'pointer',
//                   borderRadius: '15px',
//                   overflow: 'hidden',
//                   width: 'clamp(150px, 20vw, 200px)',
//                   height: 'clamp(200px, 25vw, 250px)',
//                   boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
//                   transition: 'transform 0.3s, box-shadow 0.3s',
//                   '&:hover': {
//                     transform: 'scale(1.05)',
//                     boxShadow: '0 6px 15px rgba(0, 0, 0, 0.3)',
//                   },
//                 }}
//                 onClick={() => handlePaintingClick(painting.url)}
//               >
//                 <img
//                   src={painting.url}
//                   alt={painting.fileName}
//                   style={{
//                     width: '100%',
//                     height: '70%',
//                     objectFit: 'cover',
//                     borderTopLeftRadius: '15px',
//                     borderTopRightRadius: '15px',
//                   }}
//                 />
//                 <Box
//                   sx={{
//                     background: gradients[index % gradients.length],
//                     color: 'white',
//                     textAlign: 'center',
//                     padding: '10px',
//                     height: '30%',
//                     display: 'flex',
//                     alignItems: 'center',
//                     justifyContent: 'center',
//                   }}
//                 >
//                   {painting.fileName}
//                 </Box>
//               </Box>
//             ))}
//           </Box>
//         )}
//       </Box>
//     </Box>
//   );
// };

// export default PersonalArea;


import type React from "react"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { Box, Typography, Button, TextField, CircularProgress, Paper, Grid, Avatar, Divider, Zoom } from "@mui/material"
import type { AppDispatch, RootState } from "../store/store"
import { fetchPaintedPaintingsByUser } from "../store/slices/paintingPaintedSlice"
import axios from "axios"

// Icons
import EditIcon from "@mui/icons-material/Edit"
import SaveIcon from "@mui/icons-material/Save"
import CancelIcon from "@mui/icons-material/Cancel"
import PersonIcon from "@mui/icons-material/Person"
import PaletteIcon from "@mui/icons-material/Palette"
import ImageIcon from "@mui/icons-material/Image"
import ArrowForwardIcon from "@mui/icons-material/ArrowForward"; // ייבוא אייקון חדש
// Color themes for painting cards
const cardThemes = [
  {
    gradient: "linear-gradient(135deg, #FF9AA2 0%, #FFB7B2 100%)",
    shadow: "0 8px 16px rgba(255, 154, 162, 0.3)",
  },
  {
    gradient: "linear-gradient(135deg, #FFDAC1 0%, #FFC8A2 100%)",
    shadow: "0 8px 16px rgba(255, 218, 193, 0.3)",
  },
  {
    gradient: "linear-gradient(135deg, #E2F0CB 0%, #B5EAD7 100%)",
    shadow: "0 8px 16px rgba(226, 240, 203, 0.3)",
  },
  {
    gradient: "linear-gradient(135deg, #C7CEEA 0%, #B5B9FF 100%)",
    shadow: "0 8px 16px rgba(199, 206, 234, 0.3)",
  },
]

const PersonalArea: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  const [userDetails, setUserDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
  })
  const [isEditing, setIsEditing] = useState(false)
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)

  const { list: paintedPaintings, loading, error } = useSelector((state: RootState) => state.paintedPaintings)

  const userId = localStorage.getItem("userId") || ""

  // Fetch user details
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`https://magicdrawapi.onrender.com/api/User/${userId}`)
        setUserDetails(response.data)
      } catch (error) {
        console.error("שגיאה בשליפת פרטי המשתמש:", error)
      }
    }

    fetchUserDetails()
    dispatch(fetchPaintedPaintingsByUser())
  }, [dispatch, userId])

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }))
  }

  const handleSaveDetails = async () => {
    try {
      await axios.put(`http://localhost:5058/api/User/${userId}`, userDetails)
      alert("הפרטים עודכנו בהצלחה!")
      setIsEditing(false)
    } catch (error) {
      console.error("שגיאה בעדכון פרטי המשתמש:", error)
      alert("עדכון הפרטים נכשל. נסה שוב.")
    }
  }

  const handlePaintingClick = (paintingId: string) => {
    navigate("/show-painting", { state: { selectedImage: paintingId } })
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
            {/* אייקון חץ לחזרה לעמוד הקודם */}
            <ArrowForwardIcon
        onClick={() => navigate(-1)} // חזרה לעמוד הקודם
        sx={{
          position: "absolute",
          top: "70px", // מיקום למטה
          right: "80px", // מיקום לצד שמאל
          fontSize: "2rem",
          color: "#555",
          cursor: "pointer",
          "&:hover": {
            color: "#000",
          },
        }}
      />
      <Paper
        elevation={0}
        sx={{
          maxWidth: "1200px",
          margin: "auto",
          borderRadius: "24px",
          overflow: "hidden",
          background: "white",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
          border: "3px solid #C7CEEA",
        }}
      >
        <Box
          sx={{
            p: 4,
            background: "linear-gradient(135deg, #C7CEEA 0%, #B5B9FF 100%)",
            color: "white",
            textAlign: "center",
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontWeight: "bold",
              fontFamily: '"Comic Sans MS", cursive, sans-serif',
              textShadow: "1px 1px 2px rgba(0,0,0,0.1)",
            }}
          >
            <PersonIcon sx={{ mr: 1, fontSize: "1.2em", verticalAlign: "middle" }} />
            האזור האישי שלי
          </Typography>
        </Box>

        <Grid container spacing={4} sx={{ p: 4 }}>
          {/* User Details Section */}
          <Grid item xs={12} md={4}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                borderRadius: "16px",
                height: "100%",
                border: "2px solid #C7CEEA",
              }}
            >
              <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mb: 3 }}>
                <Avatar
                  sx={{
                    width: 100,
                    height: 100,
                    bgcolor: "#C7CEEA",
                    mb: 2,
                    fontSize: "3rem",
                  }}
                >
                  {userDetails.firstName.charAt(0)}
                </Avatar>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: "bold",
                    color: "#C7CEEA",
                    fontFamily: '"Comic Sans MS", cursive, sans-serif',
                  }}
                >
                  פרטים אישיים
                </Typography>
              </Box>

              <Divider sx={{ mb: 3, borderColor: "#C7CEEA" }} />

              {isEditing ? (
                <Box component="form" sx={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                  <TextField
                    label="שם פרטי"
                    name="firstName"
                    value={userDetails.firstName}
                    onChange={handleInputChange}
                    fullWidth
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
                  <TextField
                    label="שם משפחה"
                    name="lastName"
                    value={userDetails.lastName}
                    onChange={handleInputChange}
                    fullWidth
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
                  <TextField
                    label="אימייל"
                    name="email"
                    value={userDetails.email}
                    onChange={handleInputChange}
                    fullWidth
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
                  <Box sx={{ display: "flex", gap: "10px", mt: 2 }}>
                    <Button
                      variant="contained"
                      onClick={handleSaveDetails}
                      startIcon={<SaveIcon />}
                      sx={{
                        flex: 1,
                        background: "linear-gradient(135deg, #C7CEEA 0%, #B5B9FF 100%)",
                        color: "#fff",
                        borderRadius: "12px",
                        fontFamily: '"Comic Sans MS", cursive, sans-serif',
                        "&:hover": {
                          background: "linear-gradient(135deg, #B5B9FF 0%, #C7CEEA 100%)",
                        },
                      }}
                    >
                      שמור
                    </Button>
                    <Button
                      variant="outlined"
                      onClick={() => setIsEditing(false)}
                      startIcon={<CancelIcon />}
                      sx={{
                        flex: 1,
                        borderColor: "#C7CEEA",
                        color: "#C7CEEA",
                        borderRadius: "12px",
                        fontFamily: '"Comic Sans MS", cursive, sans-serif',
                        "&:hover": {
                          borderColor: "#B5B9FF",
                          background: "rgba(199, 206, 234, 0.05)",
                        },
                      }}
                    >
                      ביטול
                    </Button>
                  </Box>
                </Box>
              ) : (
                <Box>
                  <Box sx={{ mb: 2 }}>
                    <Typography
                      variant="body2"
                      sx={{
                        color: "#888",
                        fontFamily: '"Comic Sans MS", cursive, sans-serif',
                      }}
                    >
                      שם פרטי
                    </Typography>
                    <Typography
                      variant="h6"
                      sx={{
                        color: "#555",
                        fontFamily: '"Comic Sans MS", cursive, sans-serif',
                      }}
                    >
                      {userDetails.firstName}
                    </Typography>
                  </Box>

                  <Box sx={{ mb: 2 }}>
                    <Typography
                      variant="body2"
                      sx={{
                        color: "#888",
                        fontFamily: '"Comic Sans MS", cursive, sans-serif',
                      }}
                    >
                      שם משפחה
                    </Typography>
                    <Typography
                      variant="h6"
                      sx={{
                        color: "#555",
                        fontFamily: '"Comic Sans MS", cursive, sans-serif',
                      }}
                    >
                      {userDetails.lastName}
                    </Typography>
                  </Box>

                  <Box sx={{ mb: 3 }}>
                    <Typography
                      variant="body2"
                      sx={{
                        color: "#888",
                        fontFamily: '"Comic Sans MS", cursive, sans-serif',
                      }}
                    >
                      אימייל
                    </Typography>
                    <Typography
                      variant="h6"
                      sx={{
                        color: "#555",
                        fontFamily: '"Comic Sans MS", cursive, sans-serif',
                      }}
                    >
                      {userDetails.email}
                    </Typography>
                  </Box>

                  <Button
                    variant="contained"
                    startIcon={<EditIcon />}
                    onClick={() => setIsEditing(true)}
                    sx={{
                      background: "linear-gradient(135deg, #C7CEEA 0%, #B5B9FF 100%)",
                      color: "#fff",
                      borderRadius: "12px",
                      fontFamily: '"Comic Sans MS", cursive, sans-serif',
                      "&:hover": {
                        background: "linear-gradient(135deg, #B5B9FF 0%, #C7CEEA 100%)",
                      },
                    }}
                  >
                    ערוך פרטים
                  </Button>
                </Box>
              )}
            </Paper>
          </Grid>

          {/* Painted Paintings Section */}
          <Grid item xs={12} md={8}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                borderRadius: "16px",
                height: "100%",
                border: "2px solid #C7CEEA",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                <PaletteIcon sx={{ color: "#C7CEEA", mr: 1, fontSize: "2rem" }} />
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: "bold",
                    color: "#C7CEEA",
                    fontFamily: '"Comic Sans MS", cursive, sans-serif',
                  }}
                >
                  הציורים שלי
                </Typography>
              </Box>

              <Divider sx={{ mb: 3, borderColor: "#C7CEEA" }} />

              {loading ? (
                <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
                  <CircularProgress sx={{ color: "#C7CEEA" }} />
                </Box>
              ) : error ? (
                <Box
                  sx={{
                    p: 3,
                    textAlign: "center",
                    borderRadius: "12px",
                    background: "rgba(255, 154, 162, 0.1)",
                  }}
                >
                  <Typography
                    color="error"
                    sx={{
                      fontFamily: '"Comic Sans MS", cursive, sans-serif',
                    }}
                  >
                    שגיאה: {error}
                  </Typography>
                </Box>
              ) : paintedPaintings.length === 0 ? (
                <Box
                  sx={{
                    p: 4,
                    textAlign: "center",
                    borderRadius: "12px",
                    background: "rgba(199, 206, 234, 0.1)",
                  }}
                >
                  <ImageIcon sx={{ fontSize: 60, color: "#C7CEEA", mb: 2 }} />
                  <Typography
                    variant="h6"
                    sx={{
                      fontFamily: '"Comic Sans MS", cursive, sans-serif',
                      color: "#888",
                    }}
                  >
                    לא נמצאו ציורים צבועים
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      fontFamily: '"Comic Sans MS", cursive, sans-serif',
                      color: "#888",
                      mt: 1,
                    }}
                  >
                    התחל לצבוע ציורים והם יופיעו כאן
                  </Typography>
                </Box>
              ) : (
                <Grid container spacing={2}>
                  {paintedPaintings.map((painting, index) => (
                    <Grid item xs={12} sm={6} md={4} key={painting.id}>
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
                            boxShadow:
                              hoveredCard === painting.id
                                ? cardThemes[index % cardThemes.length].shadow
                                : "0 4px 10px rgba(0, 0, 0, 0.1)",
                            border: "3px solid #fff",
                            cursor: "pointer",
                          }}
                          onMouseEnter={() => setHoveredCard(painting.id)}
                          onMouseLeave={() => setHoveredCard(null)}
                          onClick={() => handlePaintingClick(painting.url)}
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
                          </Box>

                          <Box
                            sx={{
                              p: 2,
                              background: cardThemes[index % cardThemes.length].gradient,
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
                          </Box>
                        </Paper>
                      </Zoom>
                    </Grid>
                  ))}
                </Grid>
              )}
            </Paper>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  )
}

export default PersonalArea
