// // import type React from "react"
// // import { useEffect, useState } from "react"
// // import { useDispatch, useSelector } from "react-redux"
// // import { useNavigate } from "react-router-dom"
// // import { Box, Typography, Button, TextField, CircularProgress, Paper, Grid, Avatar, Divider, Zoom } from "@mui/material"
// // import type { AppDispatch, RootState } from "../store/store"
// // import { fetchPaintedPaintingsByUser } from "../store/slices/paintingPaintedSlice"
// // import axios from "axios"

// // // Icons
// // import EditIcon from "@mui/icons-material/Edit"
// // import SaveIcon from "@mui/icons-material/Save"
// // import CancelIcon from "@mui/icons-material/Cancel"
// // import PersonIcon from "@mui/icons-material/Person"
// // import PaletteIcon from "@mui/icons-material/Palette"
// // import ImageIcon from "@mui/icons-material/Image"
// // import ArrowForwardIcon from "@mui/icons-material/ArrowForward"; // ייבוא אייקון חדש
// // import { getAuthHeader } from "../authTokenManager"
// // // Color themes for painting cards
// // const cardThemes = [
// //   {
// //     gradient: "linear-gradient(135deg, #FF9AA2 0%, #FFB7B2 100%)",
// //     shadow: "0 8px 16px rgba(255, 154, 162, 0.3)",
// //   },
// //   {
// //     gradient: "linear-gradient(135deg, #FFDAC1 0%, #FFC8A2 100%)",
// //     shadow: "0 8px 16px rgba(255, 218, 193, 0.3)",
// //   },
// //   {
// //     gradient: "linear-gradient(135deg, #E2F0CB 0%, #B5EAD7 100%)",
// //     shadow: "0 8px 16px rgba(226, 240, 203, 0.3)",
// //   },
// //   {
// //     gradient: "linear-gradient(135deg, #C7CEEA 0%, #B5B9FF 100%)",
// //     shadow: "0 8px 16px rgba(199, 206, 234, 0.3)",
// //   },
// // ]

// // const PersonalArea: React.FC = () => {
// //   const dispatch = useDispatch<AppDispatch>()
// //   const navigate = useNavigate()

// //   const [userDetails, setUserDetails] = useState({
// //     firstName: "",
// //     lastName: "",
// //     email: "",
// //   })
// //   const [isEditing, setIsEditing] = useState(false)
// //   const [hoveredCard, setHoveredCard] = useState<string | null>(null)

// //   const { list: paintedPaintings, loading, error } = useSelector((state: RootState) => state.paintedPaintings)

// //   const userId = localStorage.getItem("userId") || ""

// //   // Fetch user details
// //   useEffect(() => {
// //     const fetchUserDetails = async () => {
// //       try {
// //         console.log("Fetching user details for userId:", userId);
        
// //         const response = await axios.get(`https://magicdrawapi.onrender.com/api/User/${userId}`, 
// //           {
// //             headers: {
// //               ...getAuthHeader()
// //             },
// //           }
// //         )
// //         setUserDetails(response.data)
// //       } catch (error) {
// //         console.error("שגיאה בשליפת פרטי המשתמש:", error)
// //       }
// //     }

// //     fetchUserDetails()
// //     dispatch(fetchPaintedPaintingsByUser())
// //   }, [dispatch, userId])

// //   const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
// //     const { name, value } = event.target
// //     setUserDetails((prevDetails) => ({
// //       ...prevDetails,
// //       [name]: value,
// //     }))
// //   }

// //   const handleSaveDetails = async () => {
// //     try {
// //       await axios.put(`https://magicdrawapi.onrender.com/api/User/${userId}`, userDetails)
// //       alert("הפרטים עודכנו בהצלחה!")
// //       setIsEditing(false)
// //     } catch (error) {
// //       console.error("שגיאה בעדכון פרטי המשתמש:", error)
// //       alert("עדכון הפרטים נכשל. נסה שוב.")
// //     }
// //   }

// //   const handlePaintingClick = (paintingId: string) => {
// //     navigate("/show-painting", { state: { selectedImage: paintingId } })
// //   }

// //   return (
// //     <Box
// //       sx={{
// //         padding: "20px",
// //         background: "linear-gradient(135deg, #FAFAFA 0%, #F0F0F0 100%)",
// //         minHeight: "100vh",
// //         fontFamily: '"Comic Sans MS", cursive, sans-serif',
// //       }}
// //     >
// //             {/* אייקון חץ לחזרה לעמוד הקודם */}
// //             <ArrowForwardIcon
// //         onClick={() => navigate(-1)} // חזרה לעמוד הקודם
// //         sx={{
// //           position: "absolute",
// //           top: "70px", // מיקום למטה
// //           right: "80px", // מיקום לצד שמאל
// //           fontSize: "2rem",
// //           color: "#555",
// //           cursor: "pointer",
// //           "&:hover": {
// //             color: "#000",
// //           },
// //         }}
// //       />
// //       <Paper
// //         elevation={0}
// //         sx={{
// //           maxWidth: "1200px",
// //           margin: "auto",
// //           borderRadius: "24px",
// //           overflow: "hidden",
// //           background: "white",
// //           boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
// //           border: "3px solid #C7CEEA",
// //         }}
// //       >
// //         <Box
// //           sx={{
// //             p: 4,
// //             background: "linear-gradient(135deg, #C7CEEA 0%, #B5B9FF 100%)",
// //             color: "white",
// //             textAlign: "center",
// //           }}
// //         >
// //           <Typography
// //             variant="h4"
// //             sx={{
// //               fontWeight: "bold",
// //               fontFamily: '"Comic Sans MS", cursive, sans-serif',
// //               textShadow: "1px 1px 2px rgba(0,0,0,0.1)",
// //             }}
// //           >
// //             <PersonIcon sx={{ mr: 1, fontSize: "1.2em", verticalAlign: "middle" }} />
// //             האזור האישי שלי
// //           </Typography>
// //         </Box>

// //         <Grid container spacing={4} sx={{ p: 4 }}>
// //           {/* User Details Section */}
// //           <Grid item xs={12} md={4}>
// //             <Paper
// //               elevation={0}
// //               sx={{
// //                 p: 3,
// //                 borderRadius: "16px",
// //                 height: "100%",
// //                 border: "2px solid #C7CEEA",
// //               }}
// //             >
// //               <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mb: 3 }}>
// //                 <Avatar
// //                   sx={{
// //                     width: 100,
// //                     height: 100,
// //                     bgcolor: "#C7CEEA",
// //                     mb: 2,
// //                     fontSize: "3rem",
// //                   }}
// //                 >
// //                   {userDetails.firstName.charAt(0)}
// //                 </Avatar>
// //                 <Typography
// //                   variant="h5"
// //                   sx={{
// //                     fontWeight: "bold",
// //                     color: "#C7CEEA",
// //                     fontFamily: '"Comic Sans MS", cursive, sans-serif',
// //                   }}
// //                 >
// //                   פרטים אישיים
// //                 </Typography>
// //               </Box>

// //               <Divider sx={{ mb: 3, borderColor: "#C7CEEA" }} />

// //               {isEditing ? (
// //                 <Box component="form" sx={{ display: "flex", flexDirection: "column", gap: "15px" }}>
// //                   <TextField
// //                     label="שם פרטי"
// //                     name="firstName"
// //                     value={userDetails.firstName}
// //                     onChange={handleInputChange}
// //                     fullWidth
// //                     InputProps={{
// //                       sx: {
// //                         borderRadius: "12px",
// //                         fontFamily: '"Comic Sans MS", cursive, sans-serif',
// //                       },
// //                     }}
// //                     InputLabelProps={{
// //                       sx: {
// //                         fontFamily: '"Comic Sans MS", cursive, sans-serif',
// //                       },
// //                     }}
// //                   />
// //                   <TextField
// //                     label="שם משפחה"
// //                     name="lastName"
// //                     value={userDetails.lastName}
// //                     onChange={handleInputChange}
// //                     fullWidth
// //                     InputProps={{
// //                       sx: {
// //                         borderRadius: "12px",
// //                         fontFamily: '"Comic Sans MS", cursive, sans-serif',
// //                       },
// //                     }}
// //                     InputLabelProps={{
// //                       sx: {
// //                         fontFamily: '"Comic Sans MS", cursive, sans-serif',
// //                       },
// //                     }}
// //                   />
// //                   <TextField
// //                     label="אימייל"
// //                     name="email"
// //                     value={userDetails.email}
// //                     onChange={handleInputChange}
// //                     fullWidth
// //                     InputProps={{
// //                       sx: {
// //                         borderRadius: "12px",
// //                         fontFamily: '"Comic Sans MS", cursive, sans-serif',
// //                       },
// //                     }}
// //                     InputLabelProps={{
// //                       sx: {
// //                         fontFamily: '"Comic Sans MS", cursive, sans-serif',
// //                       },
// //                     }}
// //                   />
// //                   <Box sx={{ display: "flex", gap: "10px", mt: 2 }}>
// //                     <Button
// //                       variant="contained"
// //                       onClick={handleSaveDetails}
// //                       startIcon={<SaveIcon />}
// //                       sx={{
// //                         flex: 1,
// //                         background: "linear-gradient(135deg, #C7CEEA 0%, #B5B9FF 100%)",
// //                         color: "#fff",
// //                         borderRadius: "12px",
// //                         fontFamily: '"Comic Sans MS", cursive, sans-serif',
// //                         "&:hover": {
// //                           background: "linear-gradient(135deg, #B5B9FF 0%, #C7CEEA 100%)",
// //                         },
// //                       }}
// //                     >
// //                       שמור
// //                     </Button>
// //                     <Button
// //                       variant="outlined"
// //                       onClick={() => setIsEditing(false)}
// //                       startIcon={<CancelIcon />}
// //                       sx={{
// //                         flex: 1,
// //                         borderColor: "#C7CEEA",
// //                         color: "#C7CEEA",
// //                         borderRadius: "12px",
// //                         fontFamily: '"Comic Sans MS", cursive, sans-serif',
// //                         "&:hover": {
// //                           borderColor: "#B5B9FF",
// //                           background: "rgba(199, 206, 234, 0.05)",
// //                         },
// //                       }}
// //                     >
// //                       ביטול
// //                     </Button>
// //                   </Box>
// //                 </Box>
// //               ) : (
// //                 <Box>
// //                   <Box sx={{ mb: 2 }}>
// //                     <Typography
// //                       variant="body2"
// //                       sx={{
// //                         color: "#888",
// //                         fontFamily: '"Comic Sans MS", cursive, sans-serif',
// //                       }}
// //                     >
// //                       שם פרטי
// //                     </Typography>
// //                     <Typography
// //                       variant="h6"
// //                       sx={{
// //                         color: "#555",
// //                         fontFamily: '"Comic Sans MS", cursive, sans-serif',
// //                       }}
// //                     >
// //                       {userDetails.firstName}
// //                     </Typography>
// //                   </Box>

// //                   <Box sx={{ mb: 2 }}>
// //                     <Typography
// //                       variant="body2"
// //                       sx={{
// //                         color: "#888",
// //                         fontFamily: '"Comic Sans MS", cursive, sans-serif',
// //                       }}
// //                     >
// //                       שם משפחה
// //                     </Typography>
// //                     <Typography
// //                       variant="h6"
// //                       sx={{
// //                         color: "#555",
// //                         fontFamily: '"Comic Sans MS", cursive, sans-serif',
// //                       }}
// //                     >
// //                       {userDetails.lastName}
// //                     </Typography>
// //                   </Box>

// //                   <Box sx={{ mb: 3 }}>
// //                     <Typography
// //                       variant="body2"
// //                       sx={{
// //                         color: "#888",
// //                         fontFamily: '"Comic Sans MS", cursive, sans-serif',
// //                       }}
// //                     >
// //                       אימייל
// //                     </Typography>
// //                     <Typography
// //                       variant="h6"
// //                       sx={{
// //                         color: "#555",
// //                         fontFamily: '"Comic Sans MS", cursive, sans-serif',
// //                       }}
// //                     >
// //                       {userDetails.email}
// //                     </Typography>
// //                   </Box>

// //                   <Button
// //                     variant="contained"
// //                     startIcon={<EditIcon />}
// //                     onClick={() => setIsEditing(true)}
// //                     sx={{
// //                       background: "linear-gradient(135deg, #C7CEEA 0%, #B5B9FF 100%)",
// //                       color: "#fff",
// //                       borderRadius: "12px",
// //                       fontFamily: '"Comic Sans MS", cursive, sans-serif',
// //                       "&:hover": {
// //                         background: "linear-gradient(135deg, #B5B9FF 0%, #C7CEEA 100%)",
// //                       },
// //                     }}
// //                   >
// //                     ערוך פרטים
// //                   </Button>
// //                 </Box>
// //               )}
// //             </Paper>
// //           </Grid>

// //           {/* Painted Paintings Section */}
// //           <Grid item xs={12} md={8}>
// //             <Paper
// //               elevation={0}
// //               sx={{
// //                 p: 3,
// //                 borderRadius: "16px",
// //                 height: "100%",
// //                 border: "2px solid #C7CEEA",
// //               }}
// //             >
// //               <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
// //                 <PaletteIcon sx={{ color: "#C7CEEA", mr: 1, fontSize: "2rem" }} />
// //                 <Typography
// //                   variant="h5"
// //                   sx={{
// //                     fontWeight: "bold",
// //                     color: "#C7CEEA",
// //                     fontFamily: '"Comic Sans MS", cursive, sans-serif',
// //                   }}
// //                 >
// //                   הציורים שלי
// //                 </Typography>
// //               </Box>

// //               <Divider sx={{ mb: 3, borderColor: "#C7CEEA" }} />

// //               {loading ? (
// //                 <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
// //                   <CircularProgress sx={{ color: "#C7CEEA" }} />
// //                 </Box>
// //               ) : error ? (
// //                 <Box
// //                   sx={{
// //                     p: 3,
// //                     textAlign: "center",
// //                     borderRadius: "12px",
// //                     background: "rgba(255, 154, 162, 0.1)",
// //                   }}
// //                 >
// //                   <Typography
// //                     color="error"
// //                     sx={{
// //                       fontFamily: '"Comic Sans MS", cursive, sans-serif',
// //                     }}
// //                   >
// //                     שגיאה: {error}
// //                   </Typography>
// //                 </Box>
// //               ) : paintedPaintings.length === 0 ? (
// //                 <Box
// //                   sx={{
// //                     p: 4,
// //                     textAlign: "center",
// //                     borderRadius: "12px",
// //                     background: "rgba(199, 206, 234, 0.1)",
// //                   }}
// //                 >
// //                   <ImageIcon sx={{ fontSize: 60, color: "#C7CEEA", mb: 2 }} />
// //                   <Typography
// //                     variant="h6"
// //                     sx={{
// //                       fontFamily: '"Comic Sans MS", cursive, sans-serif',
// //                       color: "#888",
// //                     }}
// //                   >
// //                     לא נמצאו ציורים צבועים
// //                   </Typography>
// //                   <Typography
// //                     variant="body2"
// //                     sx={{
// //                       fontFamily: '"Comic Sans MS", cursive, sans-serif',
// //                       color: "#888",
// //                       mt: 1,
// //                     }}
// //                   >
// //                     התחל לצבוע ציורים והם יופיעו כאן
// //                   </Typography>
// //                 </Box>
// //               ) : (
// //                 <Grid container spacing={2}>
// //                   {paintedPaintings.map((painting, index) => (
// //                     <Grid item xs={12} sm={6} md={4} key={painting.id}>
// //                       <Zoom in={true} style={{ transitionDelay: `${index * 100}ms` }}>
// //                         <Paper
// //                           elevation={0}
// //                           sx={{
// //                             borderRadius: "16px",
// //                             overflow: "hidden",
// //                             height: "100%",
// //                             display: "flex",
// //                             flexDirection: "column",
// //                             position: "relative",
// //                             transition: "all 0.3s ease",
// //                             transform: hoveredCard === painting.id ? "translateY(-8px)" : "none",
// //                             boxShadow:
// //                               hoveredCard === painting.id
// //                                 ? cardThemes[index % cardThemes.length].shadow
// //                                 : "0 4px 10px rgba(0, 0, 0, 0.1)",
// //                             border: "3px solid #fff",
// //                             cursor: "pointer",
// //                           }}
// //                           onMouseEnter={() => setHoveredCard(painting.id)}
// //                           onMouseLeave={() => setHoveredCard(null)}
// //                           onClick={() => handlePaintingClick(painting.url)}
// //                         >
// //                           <Box
// //                             sx={{
// //                               position: "relative",
// //                               paddingTop: "100%", // 1:1 Aspect ratio
// //                               overflow: "hidden",
// //                             }}
// //                           >
// //                             <Box
// //                               component="img"
// //                               src={painting.url}
// //                               alt={painting.fileName}
// //                               sx={{
// //                                 position: "absolute",
// //                                 top: 0,
// //                                 left: 0,
// //                                 width: "100%",
// //                                 height: "100%",
// //                                 objectFit: "cover",
// //                                 transition: "transform 0.5s ease",
// //                                 transform: hoveredCard === painting.id ? "scale(1.1)" : "scale(1)",
// //                               }}
// //                             />
// //                           </Box>

// //                           <Box
// //                             sx={{
// //                               p: 2,
// //                               background: cardThemes[index % cardThemes.length].gradient,
// //                               color: "white",
// //                               flexGrow: 1,
// //                               display: "flex",
// //                               flexDirection: "column",
// //                               justifyContent: "space-between",
// //                             }}
// //                           >
// //                             <Typography
// //                               variant="subtitle1"
// //                               sx={{
// //                                 fontWeight: 600,
// //                                 textAlign: "center",
// //                                 overflow: "hidden",
// //                                 textOverflow: "ellipsis",
// //                                 whiteSpace: "nowrap",
// //                                 fontFamily: '"Comic Sans MS", cursive, sans-serif',
// //                               }}
// //                             >
// //                               {painting.fileName}
// //                             </Typography>
// //                           </Box>
// //                         </Paper>
// //                       </Zoom>
// //                     </Grid>
// //                   ))}
// //                 </Grid>
// //               )}
// //             </Paper>
// //           </Grid>
// //         </Grid>
// //       </Paper>
// //     </Box>
// //   )
// // }

// // export default PersonalArea


// "use client"

// import type React from "react"
// import { useEffect, useState } from "react"
// import { useDispatch, useSelector } from "react-redux"
// import { useNavigate } from "react-router-dom"
// import {
//   Box,
//   Typography,
//   Button,
//   TextField,
//   CircularProgress,
//   Paper,
//   Grid,
//   Avatar,
//   Divider,
//   Zoom,
//   IconButton,
//   Tooltip,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Fade,
// } from "@mui/material"
// import type { AppDispatch, RootState } from "../store/store"
// import { fetchPaintedPaintingsByUser, deletePaintedPainting } from "../store/slices/paintingPaintedSlice"
// import axios from "axios"

// // Icons
// import EditIcon from "@mui/icons-material/Edit"
// import SaveIcon from "@mui/icons-material/Save"
// import CancelIcon from "@mui/icons-material/Cancel"
// import PersonIcon from "@mui/icons-material/Person"
// import PaletteIcon from "@mui/icons-material/Palette"
// import ImageIcon from "@mui/icons-material/Image"
// import ArrowForwardIcon from "@mui/icons-material/ArrowForward"
// import DeleteIcon from "@mui/icons-material/Delete"
// import DeleteForeverIcon from "@mui/icons-material/DeleteForever"
// import WarningIcon from "@mui/icons-material/Warning"
// import { getAuthHeader } from "../authTokenManager"

// // Color themes for painting cards
// const cardThemes = [
//   {
//     gradient: "linear-gradient(135deg, #FF9AA2 0%, #FFB7B2 100%)",
//     shadow: "0 8px 16px rgba(255, 154, 162, 0.3)",
//   },
//   {
//     gradient: "linear-gradient(135deg, #FFDAC1 0%, #FFC8A2 100%)",
//     shadow: "0 8px 16px rgba(255, 218, 193, 0.3)",
//   },
//   {
//     gradient: "linear-gradient(135deg, #E2F0CB 0%, #B5EAD7 100%)",
//     shadow: "0 8px 16px rgba(226, 240, 203, 0.3)",
//   },
//   {
//     gradient: "linear-gradient(135deg, #C7CEEA 0%, #B5B9FF 100%)",
//     shadow: "0 8px 16px rgba(199, 206, 234, 0.3)",
//   },
// ]

// const PersonalArea: React.FC = () => {
//   const dispatch = useDispatch<AppDispatch>()
//   const navigate = useNavigate()

//   const [userDetails, setUserDetails] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//   })
//   const [isEditing, setIsEditing] = useState(false)
//   const [hoveredCard, setHoveredCard] = useState<string | null>(null)
//   const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
//   const [paintingToDelete, setPaintingToDelete] = useState<{ id: string; fileName: string } | null>(null)
//   const [deletingPaintingId, setDeletingPaintingId] = useState<string | null>(null)

//   const { list: paintedPaintings, loading, error } = useSelector((state: RootState) => state.paintedPaintings)

//   const userId = localStorage.getItem("userId") || ""

//   // Fetch user details
//   useEffect(() => {
//     const fetchUserDetails = async () => {
//       try {
//         console.log("Fetching user details for userId:", userId)

//         const response = await axios.get(`https://magicdrawapi.onrender.com/api/User/${userId}`, {
//           headers: {
//             ...getAuthHeader(),
//           },
//         })
//         setUserDetails(response.data)
//       } catch (error) {
//         console.error("שגיאה בשליפת פרטי המשתמש:", error)
//       }
//     }

//     fetchUserDetails()
//     dispatch(fetchPaintedPaintingsByUser())
//   }, [dispatch, userId])

//   const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = event.target
//     setUserDetails((prevDetails) => ({
//       ...prevDetails,
//       [name]: value,
//     }))
//   }

//   const handleSaveDetails = async () => {
//     try {
//       await axios.put(`https://magicdrawapi.onrender.com/api/User/${userId}`, userDetails)
//       alert("הפרטים עודכנו בהצלחה!")
//       setIsEditing(false)
//     } catch (error) {
//       console.error("שגיאה בעדכון פרטי המשתמש:", error)
//       alert("עדכון הפרטים נכשל. נסה שוב.")
//     }
//   }

//   const handlePaintingClick = (paintingUrl: string) => {
//     navigate("/show-painting", { state: { selectedImage: paintingUrl } })
//   }

//   const handleDeleteClick = (event: React.MouseEvent, painting: { id: string; fileName: string }) => {
//     event.stopPropagation() // Prevent triggering the painting click
//     setPaintingToDelete(painting)
//     setDeleteDialogOpen(true)
//   }

//   const handleConfirmDelete = async () => {
//     if (paintingToDelete) {
//       setDeletingPaintingId(paintingToDelete.id)
//       try {
//         await dispatch(deletePaintedPainting(paintingToDelete.id)).unwrap()
//         setDeleteDialogOpen(false)
//         setPaintingToDelete(null)
//         // Optionally show success message
//       } catch (error) {
//         console.error("שגיאה במחיקת הציור:", error)
//         alert("מחיקת הציור נכשלה. נסה שוב.")
//       } finally {
//         setDeletingPaintingId(null)
//       }
//     }
//   }

//   const handleCancelDelete = () => {
//     setDeleteDialogOpen(false)
//     setPaintingToDelete(null)
//   }

//   return (
//     <Box
//       sx={{
//         padding: "20px",
//         background: "linear-gradient(135deg, #FAFAFA 0%, #F0F0F0 100%)",
//         minHeight: "100vh",
//         fontFamily: '"Comic Sans MS", cursive, sans-serif',
//       }}
//     >
//       {/* אייקון חץ לחזרה לעמוד הקודם */}
//       <ArrowForwardIcon
//         onClick={() => navigate(-1)}
//         sx={{
//           position: "absolute",
//           top: "70px",
//           right: "80px",
//           fontSize: "2rem",
//           color: "#555",
//           cursor: "pointer",
//           "&:hover": {
//             color: "#000",
//           },
//         }}
//       />

//       <Paper
//         elevation={0}
//         sx={{
//           maxWidth: "1200px",
//           margin: "auto",
//           borderRadius: "24px",
//           overflow: "hidden",
//           background: "white",
//           boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
//           border: "3px solid #C7CEEA",
//         }}
//       >
//         <Box
//           sx={{
//             p: 4,
//             background: "linear-gradient(135deg, #C7CEEA 0%, #B5B9FF 100%)",
//             color: "white",
//             textAlign: "center",
//           }}
//         >
//           <Typography
//             variant="h4"
//             sx={{
//               fontWeight: "bold",
//               fontFamily: '"Comic Sans MS", cursive, sans-serif',
//               textShadow: "1px 1px 2px rgba(0,0,0,0.1)",
//             }}
//           >
//             <PersonIcon sx={{ mr: 1, fontSize: "1.2em", verticalAlign: "middle" }} />
//             האזור האישי שלי
//           </Typography>
//         </Box>

//         <Grid container spacing={4} sx={{ p: 4 }}>
//           {/* User Details Section */}
//           <Grid item xs={12} md={4}>
//             <Paper
//               elevation={0}
//               sx={{
//                 p: 3,
//                 borderRadius: "16px",
//                 height: "100%",
//                 border: "2px solid #C7CEEA",
//               }}
//             >
//               <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mb: 3 }}>
//                 <Avatar
//                   sx={{
//                     width: 100,
//                     height: 100,
//                     bgcolor: "#C7CEEA",
//                     mb: 2,
//                     fontSize: "3rem",
//                   }}
//                 >
//                   {userDetails.firstName.charAt(0)}
//                 </Avatar>
//                 <Typography
//                   variant="h5"
//                   sx={{
//                     fontWeight: "bold",
//                     color: "#C7CEEA",
//                     fontFamily: '"Comic Sans MS", cursive, sans-serif',
//                   }}
//                 >
//                   פרטים אישיים
//                 </Typography>
//               </Box>

//               <Divider sx={{ mb: 3, borderColor: "#C7CEEA" }} />

//               {isEditing ? (
//                 <Box component="form" sx={{ display: "flex", flexDirection: "column", gap: "15px" }}>
//                   <TextField
//                     label="שם פרטי"
//                     name="firstName"
//                     value={userDetails.firstName}
//                     onChange={handleInputChange}
//                     fullWidth
//                     InputProps={{
//                       sx: {
//                         borderRadius: "12px",
//                         fontFamily: '"Comic Sans MS", cursive, sans-serif',
//                       },
//                     }}
//                     InputLabelProps={{
//                       sx: {
//                         fontFamily: '"Comic Sans MS", cursive, sans-serif',
//                       },
//                     }}
//                   />
//                   <TextField
//                     label="שם משפחה"
//                     name="lastName"
//                     value={userDetails.lastName}
//                     onChange={handleInputChange}
//                     fullWidth
//                     InputProps={{
//                       sx: {
//                         borderRadius: "12px",
//                         fontFamily: '"Comic Sans MS", cursive, sans-serif',
//                       },
//                     }}
//                     InputLabelProps={{
//                       sx: {
//                         fontFamily: '"Comic Sans MS", cursive, sans-serif',
//                       },
//                     }}
//                   />
//                   <TextField
//                     label="אימייל"
//                     name="email"
//                     value={userDetails.email}
//                     onChange={handleInputChange}
//                     fullWidth
//                     InputProps={{
//                       sx: {
//                         borderRadius: "12px",
//                         fontFamily: '"Comic Sans MS", cursive, sans-serif',
//                       },
//                     }}
//                     InputLabelProps={{
//                       sx: {
//                         fontFamily: '"Comic Sans MS", cursive, sans-serif',
//                       },
//                     }}
//                   />
//                   <Box sx={{ display: "flex", gap: "10px", mt: 2 }}>
//                     <Button
//                       variant="contained"
//                       onClick={handleSaveDetails}
//                       startIcon={<SaveIcon />}
//                       sx={{
//                         flex: 1,
//                         background: "linear-gradient(135deg, #C7CEEA 0%, #B5B9FF 100%)",
//                         color: "#fff",
//                         borderRadius: "12px",
//                         fontFamily: '"Comic Sans MS", cursive, sans-serif',
//                         "&:hover": {
//                           background: "linear-gradient(135deg, #B5B9FF 0%, #C7CEEA 100%)",
//                         },
//                       }}
//                     >
//                       שמור
//                     </Button>
//                     <Button
//                       variant="outlined"
//                       onClick={() => setIsEditing(false)}
//                       startIcon={<CancelIcon />}
//                       sx={{
//                         flex: 1,
//                         borderColor: "#C7CEEA",
//                         color: "#C7CEEA",
//                         borderRadius: "12px",
//                         fontFamily: '"Comic Sans MS", cursive, sans-serif',
//                         "&:hover": {
//                           borderColor: "#B5B9FF",
//                           background: "rgba(199, 206, 234, 0.05)",
//                         },
//                       }}
//                     >
//                       ביטול
//                     </Button>
//                   </Box>
//                 </Box>
//               ) : (
//                 <Box>
//                   <Box sx={{ mb: 2 }}>
//                     <Typography
//                       variant="body2"
//                       sx={{
//                         color: "#888",
//                         fontFamily: '"Comic Sans MS", cursive, sans-serif',
//                       }}
//                     >
//                       שם פרטי
//                     </Typography>
//                     <Typography
//                       variant="h6"
//                       sx={{
//                         color: "#555",
//                         fontFamily: '"Comic Sans MS", cursive, sans-serif',
//                       }}
//                     >
//                       {userDetails.firstName}
//                     </Typography>
//                   </Box>

//                   <Box sx={{ mb: 2 }}>
//                     <Typography
//                       variant="body2"
//                       sx={{
//                         color: "#888",
//                         fontFamily: '"Comic Sans MS", cursive, sans-serif',
//                       }}
//                     >
//                       שם משפחה
//                     </Typography>
//                     <Typography
//                       variant="h6"
//                       sx={{
//                         color: "#555",
//                         fontFamily: '"Comic Sans MS", cursive, sans-serif',
//                       }}
//                     >
//                       {userDetails.lastName}
//                     </Typography>
//                   </Box>

//                   <Box sx={{ mb: 3 }}>
//                     <Typography
//                       variant="body2"
//                       sx={{
//                         color: "#888",
//                         fontFamily: '"Comic Sans MS", cursive, sans-serif',
//                       }}
//                     >
//                       אימייל
//                     </Typography>
//                     <Typography
//                       variant="h6"
//                       sx={{
//                         color: "#555",
//                         fontFamily: '"Comic Sans MS", cursive, sans-serif',
//                       }}
//                     >
//                       {userDetails.email}
//                     </Typography>
//                   </Box>

//                   <Button
//                     variant="contained"
//                     startIcon={<EditIcon />}
//                     onClick={() => setIsEditing(true)}
//                     sx={{
//                       background: "linear-gradient(135deg, #C7CEEA 0%, #B5B9FF 100%)",
//                       color: "#fff",
//                       borderRadius: "12px",
//                       fontFamily: '"Comic Sans MS", cursive, sans-serif',
//                       "&:hover": {
//                         background: "linear-gradient(135deg, #B5B9FF 0%, #C7CEEA 100%)",
//                       },
//                     }}
//                   >
//                     ערוך פרטים
//                   </Button>
//                 </Box>
//               )}
//             </Paper>
//           </Grid>

//           {/* Painted Paintings Section */}
//           <Grid item xs={12} md={8}>
//             <Paper
//               elevation={0}
//               sx={{
//                 p: 3,
//                 borderRadius: "16px",
//                 height: "100%",
//                 border: "2px solid #C7CEEA",
//               }}
//             >
//               <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
//                 <PaletteIcon sx={{ color: "#C7CEEA", mr: 1, fontSize: "2rem" }} />
//                 <Typography
//                   variant="h5"
//                   sx={{
//                     fontWeight: "bold",
//                     color: "#C7CEEA",
//                     fontFamily: '"Comic Sans MS", cursive, sans-serif',
//                   }}
//                 >
//                   הציורים שלי
//                 </Typography>
//               </Box>

//               <Divider sx={{ mb: 3, borderColor: "#C7CEEA" }} />

//               {loading ? (
//                 <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
//                   <CircularProgress sx={{ color: "#C7CEEA" }} />
//                 </Box>
//               ) : error ? (
//                 <Box
//                   sx={{
//                     p: 3,
//                     textAlign: "center",
//                     borderRadius: "12px",
//                     background: "rgba(255, 154, 162, 0.1)",
//                   }}
//                 >
//                   <Typography
//                     color="error"
//                     sx={{
//                       fontFamily: '"Comic Sans MS", cursive, sans-serif',
//                     }}
//                   >
//                     שגיאה: {error}
//                   </Typography>
//                 </Box>
//               ) : paintedPaintings.length === 0 ? (
//                 <Box
//                   sx={{
//                     p: 4,
//                     textAlign: "center",
//                     borderRadius: "12px",
//                     background: "rgba(199, 206, 234, 0.1)",
//                   }}
//                 >
//                   <ImageIcon sx={{ fontSize: 60, color: "#C7CEEA", mb: 2 }} />
//                   <Typography
//                     variant="h6"
//                     sx={{
//                       fontFamily: '"Comic Sans MS", cursive, sans-serif',
//                       color: "#888",
//                     }}
//                   >
//                     לא נמצאו ציורים צבועים
//                   </Typography>
//                   <Typography
//                     variant="body2"
//                     sx={{
//                       fontFamily: '"Comic Sans MS", cursive, sans-serif',
//                       color: "#888",
//                       mt: 1,
//                     }}
//                   >
//                     התחל לצבוע ציורים והם יופיעו כאן
//                   </Typography>
//                 </Box>
//               ) : (
//                 <Grid container spacing={2}>
//                   {paintedPaintings.map((painting, index) => (
//                     <Grid item xs={12} sm={6} md={4} key={painting.id}>
//                       <Zoom in={true} style={{ transitionDelay: `${index * 100}ms` }}>
//                         <Paper
//                           elevation={0}
//                           sx={{
//                             borderRadius: "16px",
//                             overflow: "hidden",
//                             height: "100%",
//                             display: "flex",
//                             flexDirection: "column",
//                             position: "relative",
//                             transition: "all 0.3s ease",
//                             transform: hoveredCard === painting.id ? "translateY(-8px)" : "none",
//                             boxShadow:
//                               hoveredCard === painting.id
//                                 ? cardThemes[index % cardThemes.length].shadow
//                                 : "0 4px 10px rgba(0, 0, 0, 0.1)",
//                             border: "3px solid #fff",
//                             cursor: "pointer",
//                           }}
//                           onMouseEnter={() => setHoveredCard(painting.id)}
//                           onMouseLeave={() => setHoveredCard(null)}
//                           onClick={() => handlePaintingClick(painting.url)}
//                         >
//                           {/* Delete Button */}
//                           <Fade in={hoveredCard === painting.id || deletingPaintingId === painting.id}>
//                             <Box
//                               sx={{
//                                 position: "absolute",
//                                 top: 8,
//                                 right: 8,
//                                 zIndex: 2,
//                               }}
//                             >
//                               <Tooltip title="מחק ציור" arrow>
//                                 <IconButton
//                                   onClick={(e) =>
//                                     handleDeleteClick(e, { id: painting.id, fileName: painting.fileName })
//                                   }
//                                   disabled={deletingPaintingId === painting.id}
//                                   sx={{
//                                     width: 36,
//                                     height: 36,
//                                     background: "linear-gradient(135deg, #FF9AA2 0%, #FFB7B2 100%)",
//                                     color: "white",
//                                     boxShadow: "0 4px 12px rgba(255, 154, 162, 0.4)",
//                                     "&:hover": {
//                                       background: "linear-gradient(135deg, #FFB7B2 0%, #FF9AA2 100%)",
//                                       transform: "scale(1.1)",
//                                       boxShadow: "0 6px 16px rgba(255, 154, 162, 0.5)",
//                                     },
//                                     "&:disabled": {
//                                       background: "linear-gradient(135deg, #ccc 0%, #bbb 100%)",
//                                       color: "white",
//                                     },
//                                     transition: "all 0.3s ease",
//                                   }}
//                                 >
//                                   {deletingPaintingId === painting.id ? (
//                                     <CircularProgress size={20} sx={{ color: "white" }} />
//                                   ) : (
//                                     <DeleteIcon fontSize="small" />
//                                   )}
//                                 </IconButton>
//                               </Tooltip>
//                             </Box>
//                           </Fade>

//                           <Box
//                             sx={{
//                               position: "relative",
//                               paddingTop: "100%", // 1:1 Aspect ratio
//                               overflow: "hidden",
//                             }}
//                           >
//                             <Box
//                               component="img"
//                               src={painting.url}
//                               alt={painting.fileName}
//                               sx={{
//                                 position: "absolute",
//                                 top: 0,
//                                 left: 0,
//                                 width: "100%",
//                                 height: "100%",
//                                 objectFit: "cover",
//                                 transition: "transform 0.5s ease",
//                                 transform: hoveredCard === painting.id ? "scale(1.1)" : "scale(1)",
//                               }}
//                             />
//                           </Box>

//                           <Box
//                             sx={{
//                               p: 2,
//                               background: cardThemes[index % cardThemes.length].gradient,
//                               color: "white",
//                               flexGrow: 1,
//                               display: "flex",
//                               flexDirection: "column",
//                               justifyContent: "space-between",
//                             }}
//                           >
//                             <Typography
//                               variant="subtitle1"
//                               sx={{
//                                 fontWeight: 600,
//                                 textAlign: "center",
//                                 overflow: "hidden",
//                                 textOverflow: "ellipsis",
//                                 whiteSpace: "nowrap",
//                                 fontFamily: '"Comic Sans MS", cursive, sans-serif',
//                               }}
//                             >
//                               {painting.fileName}
//                             </Typography>
//                           </Box>
//                         </Paper>
//                       </Zoom>
//                     </Grid>
//                   ))}
//                 </Grid>
//               )}
//             </Paper>
//           </Grid>
//         </Grid>
//       </Paper>

//       {/* Delete Confirmation Dialog */}
//       <Dialog
//         open={deleteDialogOpen}
//         onClose={handleCancelDelete}
//         PaperProps={{
//           sx: {
//             borderRadius: "20px",
//             border: "3px solid #FF9AA2",
//             fontFamily: '"Comic Sans MS", cursive, sans-serif',
//           },
//         }}
//       >
//         <DialogTitle
//           sx={{
//             background: "linear-gradient(135deg, #FF9AA2 0%, #FFB7B2 100%)",
//             color: "white",
//             textAlign: "center",
//             fontFamily: '"Comic Sans MS", cursive, sans-serif',
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             gap: 1,
//           }}
//         >
//           <WarningIcon />
//           מחיקת ציור
//         </DialogTitle>

//         <DialogContent sx={{ p: 3, textAlign: "center" }}>
//           <Box sx={{ mb: 2 }}>
//             <DeleteForeverIcon
//               sx={{
//                 fontSize: "4rem",
//                 color: "#FF9AA2",
//                 animation: "wobble 1s ease-in-out infinite",
//                 "@keyframes wobble": {
//                   "0%, 100%": { transform: "rotate(0deg)" },
//                   "25%": { transform: "rotate(-5deg)" },
//                   "75%": { transform: "rotate(5deg)" },
//                 },
//               }}
//             />
//           </Box>

//           <Typography
//             variant="h6"
//             sx={{
//               fontFamily: '"Comic Sans MS", cursive, sans-serif',
//               color: "#555",
//               mb: 1,
//             }}
//           >
//             האם אתה בטוח שברצונך למחוק את הציור?
//           </Typography>

//           <Typography
//             variant="body1"
//             sx={{
//               fontFamily: '"Comic Sans MS", cursive, sans-serif',
//               color: "#FF9AA2",
//               fontWeight: "bold",
//             }}
//           >
//             "{paintingToDelete?.fileName}"
//           </Typography>

//           <Typography
//             variant="body2"
//             sx={{
//               fontFamily: '"Comic Sans MS", cursive, sans-serif',
//               color: "#888",
//               mt: 2,
//             }}
//           >
//             פעולה זו לא ניתנת לביטול!
//           </Typography>
//         </DialogContent>

//         <DialogActions sx={{ p: 3, justifyContent: "center", gap: 2 }}>
//           <Button
//             onClick={handleCancelDelete}
//             variant="outlined"
//             sx={{
//               borderColor: "#C7CEEA",
//               color: "#C7CEEA",
//               borderRadius: "12px",
//               fontFamily: '"Comic Sans MS", cursive, sans-serif',
//               "&:hover": {
//                 borderColor: "#B5B9FF",
//                 background: "rgba(199, 206, 234, 0.05)",
//               },
//             }}
//           >
//             ביטול
//           </Button>

//           <Button
//             onClick={handleConfirmDelete}
//             variant="contained"
//             startIcon={<DeleteIcon />}
//             sx={{
//               background: "linear-gradient(135deg, #FF9AA2 0%, #FFB7B2 100%)",
//               color: "white",
//               borderRadius: "12px",
//               fontFamily: '"Comic Sans MS", cursive, sans-serif',
//               "&:hover": {
//                 background: "linear-gradient(135deg, #FFB7B2 0%, #FF9AA2 100%)",
//                 transform: "translateY(-2px)",
//               },
//             }}
//           >
//             מחק ציור
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   )
// }

// export default PersonalArea

"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import {
  Box,
  Typography,
  Button,
  TextField,
  CircularProgress,
  Paper,
  Grid,
  Avatar,
  Divider,
  Zoom,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Fade,
} from "@mui/material"
import type { AppDispatch, RootState } from "../store/store"
import { fetchPaintedPaintingsByUser, deletePaintedPainting } from "../store/slices/paintingPaintedSlice"
import axios from "axios"

// Icons
import EditIcon from "@mui/icons-material/Edit"
import SaveIcon from "@mui/icons-material/Save"
import CancelIcon from "@mui/icons-material/Cancel"
import PersonIcon from "@mui/icons-material/Person"
import PaletteIcon from "@mui/icons-material/Palette"
import ImageIcon from "@mui/icons-material/Image"
import ArrowForwardIcon from "@mui/icons-material/ArrowForward"
import DeleteIcon from "@mui/icons-material/Delete"
import DeleteForeverIcon from "@mui/icons-material/DeleteForever"
import WarningIcon from "@mui/icons-material/Warning"
import { getAuthHeader } from "../authTokenManager"

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
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [paintingToDelete, setPaintingToDelete] = useState<{ id: string; fileName: string } | null>(null)
  const [deletingPaintingId, setDeletingPaintingId] = useState<string | null>(null)

  const { list: paintedPaintings, loading, error } = useSelector((state: RootState) => state.paintedPaintings)

  const userId = localStorage.getItem("userId") || ""

  // Fetch user details
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        console.log("Fetching user details for userId:", userId)

        const response = await axios.get(`https://magicdrawapi.onrender.com/api/User/${userId}`, {
          headers: {
            ...getAuthHeader(),
          },
        })
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
      await axios.put(`https://magicdrawapi.onrender.com/api/User/${userId}`, userDetails)
      alert("הפרטים עודכנו בהצלחה!")
      setIsEditing(false)
    } catch (error) {
      console.error("שגיאה בעדכון פרטי המשתמש:", error)
      alert("עדכון הפרטים נכשל. נסה שוב.")
    }
  }

  const handlePaintingClick = (paintingUrl: string) => {
    navigate("/show-painting", { state: { selectedImage: paintingUrl } })
  }

  const handleDeleteClick = (event: React.MouseEvent, painting: { id: string; fileName: string }) => {
    event.stopPropagation() // Prevent triggering the painting click
    setPaintingToDelete(painting)
    setDeleteDialogOpen(true)
  }

  const handleConfirmDelete = async () => {
    if (paintingToDelete) {
      setDeletingPaintingId(paintingToDelete.id)
      try {
        await dispatch(deletePaintedPainting(paintingToDelete.id)).unwrap()
        setDeleteDialogOpen(false)
        setPaintingToDelete(null)
        // Optionally show success message
      } catch (error) {
        console.error("שגיאה במחיקת הציור:", error)
        alert("מחיקת הציור נכשלה. נסה שוב.")
      } finally {
        setDeletingPaintingId(null)
      }
    }
  }

  const handleCancelDelete = () => {
    setDeleteDialogOpen(false)
    setPaintingToDelete(null)
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
                          {/* Delete Button */}
                          <Fade in={hoveredCard === painting.id || deletingPaintingId === painting.id}>
                            <Box
                              sx={{
                                position: "absolute",
                                top: 8,
                                right: 8,
                                zIndex: 2,
                              }}
                            >
                              <Tooltip title="מחק ציור" arrow>
                                <IconButton
                                  onClick={(e) =>
                                    handleDeleteClick(e, { id: painting.id, fileName: painting.fileName })
                                  }
                                  disabled={deletingPaintingId === painting.id}
                                  sx={{
                                    width: 36,
                                    height: 36,
                                    background: "linear-gradient(135deg, #FF9AA2 0%, #FFB7B2 100%)",
                                    color: "white",
                                    boxShadow: "0 4px 12px rgba(255, 154, 162, 0.4)",
                                    "&:hover": {
                                      background: "linear-gradient(135deg, #FFB7B2 0%, #FF9AA2 100%)",
                                      transform: "scale(1.1)",
                                      boxShadow: "0 6px 16px rgba(255, 154, 162, 0.5)",
                                    },
                                    "&:disabled": {
                                      background: "linear-gradient(135deg, #ccc 0%, #bbb 100%)",
                                      color: "white",
                                    },
                                    transition: "all 0.3s ease",
                                  }}
                                >
                                  {deletingPaintingId === painting.id ? (
                                    <CircularProgress size={20} sx={{ color: "white" }} />
                                  ) : (
                                    <DeleteIcon fontSize="small" />
                                  )}
                                </IconButton>
                              </Tooltip>
                            </Box>
                          </Fade>

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

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={handleCancelDelete}
        PaperProps={{
          sx: {
            borderRadius: "20px",
            border: "3px solid #FF9AA2",
            fontFamily: '"Comic Sans MS", cursive, sans-serif',
          },
        }}
      >
        <DialogTitle
          sx={{
            background: "linear-gradient(135deg, #FF9AA2 0%, #FFB7B2 100%)",
            color: "white",
            textAlign: "center",
            fontFamily: '"Comic Sans MS", cursive, sans-serif',
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 1,
          }}
        >
          <WarningIcon />
          מחיקת ציור
        </DialogTitle>

        <DialogContent sx={{ p: 3, textAlign: "center" }}>
          <Box sx={{ mb: 2 }}>
            <DeleteForeverIcon
              sx={{
                fontSize: "4rem",
                color: "#FF9AA2",
                animation: "wobble 1s ease-in-out infinite",
                "@keyframes wobble": {
                  "0%, 100%": { transform: "rotate(0deg)" },
                  "25%": { transform: "rotate(-5deg)" },
                  "75%": { transform: "rotate(5deg)" },
                },
              }}
            />
          </Box>

          <Typography
            variant="h6"
            sx={{
              fontFamily: '"Comic Sans MS", cursive, sans-serif',
              color: "#555",
              mb: 1,
            }}
          >
            האם אתה בטוח שברצונך למחוק את הציור?
          </Typography>

          <Typography
            variant="body1"
            sx={{
              fontFamily: '"Comic Sans MS", cursive, sans-serif',
              color: "#FF9AA2",
              fontWeight: "bold",
            }}
          >
            "{paintingToDelete?.fileName}"
          </Typography>

          <Typography
            variant="body2"
            sx={{
              fontFamily: '"Comic Sans MS", cursive, sans-serif',
              color: "#888",
              mt: 2,
            }}
          >
            פעולה זו לא ניתנת לביטול!
          </Typography>
        </DialogContent>

        <DialogActions sx={{ p: 3, justifyContent: "center", gap: 2 }}>
          <Button
            onClick={handleCancelDelete}
            variant="outlined"
            sx={{
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

          <Button
            onClick={handleConfirmDelete}
            variant="contained"
            startIcon={<DeleteIcon />}
            sx={{
              background: "linear-gradient(135deg, #FF9AA2 0%, #FFB7B2 100%)",
              color: "white",
              borderRadius: "12px",
              fontFamily: '"Comic Sans MS", cursive, sans-serif',
              "&:hover": {
                background: "linear-gradient(135deg, #FFB7B2 0%, #FF9AA2 100%)",
                transform: "translateY(-2px)",
              },
            }}
          >
            מחק ציור
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default PersonalArea
