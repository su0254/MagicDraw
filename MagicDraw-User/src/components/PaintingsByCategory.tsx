// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchPaintingsByCategory } from '../store/slices/paintingsSlice'; // פעולה לשליפת ציורים לפי קטגוריה
// import { AppDispatch, RootState } from '../store/store';
// import SearchIcon from '@mui/icons-material/Search';
// import { CircularProgress, Typography } from '@mui/material';
// import { PaintingType } from '../types/PaintingType';

// const gradients = [
//   'linear-gradient(135deg, #84fab0, #8fd3f4)', // Green-Blue
//   'linear-gradient(135deg, #ff9a9e, #fad0c4)', // Pink
//   'linear-gradient(135deg, #a18cd1, #fbc2eb)', // Purple-Pink
// ];

// interface PaintingsByCategoryProps {
//   categoryId: string; // מזהה הקטגוריה
// }

// const PaintingsByCategory: React.FC<PaintingsByCategoryProps> = ({ categoryId }) => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch<AppDispatch>();
//   const { list: paintings, loading, error } = useSelector(
//     (state: RootState) => state.paintings
//   ) as { list: PaintingType[]; loading: boolean; error: string | null };

//   const [searchTerm, setSearchTerm] = useState<string>(''); // State for search input

//   useEffect(() => {
//     dispatch(fetchPaintingsByCategory(categoryId)); // Fetch paintings by category
//   }, [dispatch, categoryId]);

//   const filteredPaintings = searchTerm
//     ? paintings.filter((painting) =>
//         painting.fileName?.toLowerCase().includes(searchTerm.toLowerCase())
//       )
//     : paintings; // אם אין ערך בחיפוש, מציגים את כל הציורים

//   const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setSearchTerm(event.target.value);
//   };

//   const handleImageClick = (imagePath: string) => {
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
//       {/* Search Bar */}
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

//       {/* Paintings Grid */}
//       <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
//         {filteredPaintings.map((painting, index) => (
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
//             onClick={() => handleImageClick(painting.url)}
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

//       {/* No Results Message */}
//       {filteredPaintings.length === 0 && (
//         <p style={{ textAlign: 'center', color: '#555', marginTop: '20px' }}>
//           לא נמצאו תוצאות לחיפוש.
//         </p>
//       )}
//     </div>
//   );
// };

// export default PaintingsByCategory;

"use client"

import type React from "react"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Box, Button, Typography, Paper, CircularProgress, Zoom } from "@mui/material"
import { fetchCategories } from "../store/slices/categorySlice"
import type { AppDispatch, RootState } from "../store/store"

// Icons
import CategoryIcon from "@mui/icons-material/Category"

// Define pastel gradients for each category - PrintKids inspired colors
const categoryThemes = [
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

const Category: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const {
    list: categories,
    loading,
    error,
  } = useSelector((state: RootState) => state.categories) as unknown as {
    list: { categoryName: string }[]
    loading: boolean
    error: string | null
  }

  useEffect(() => {
    dispatch(fetchCategories())
  }, [dispatch])

  if (loading) {
    return (
      <Paper
        elevation={0}
        sx={{
          position: "fixed",
          top: "120px",
          right: "20px",
          p: 2,
          borderRadius: "16px",
          background: "rgba(255, 255, 255, 0.8)",
          backdropFilter: "blur(10px)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
          border: "2px solid #FFB7B2",
        }}
      >
        <CircularProgress size={30} sx={{ color: "#FF9AA2" }} />
        <Typography
          variant="body2"
          sx={{
            fontWeight: 600,
            color: "#546e7a",
            fontFamily: '"Comic Sans MS", cursive, sans-serif',
          }}
        >
          טוען קטגוריות...
        </Typography>
      </Paper>
    )
  }

  if (error) {
    return (
      <Paper
        elevation={0}
        sx={{
          position: "fixed",
          top: "120px",
          right: "20px",
          p: 2,
          borderRadius: "16px",
          background: "rgba(255, 255, 255, 0.8)",
          backdropFilter: "blur(10px)",
          border: "2px solid #FFB7B2",
        }}
      >
        <Typography
          variant="body2"
          sx={{
            fontWeight: 600,
            color: "#f44336",
            fontFamily: '"Comic Sans MS", cursive, sans-serif',
          }}
        >
          שגיאה בטעינת קטגוריות
        </Typography>
      </Paper>
    )
  }

  return (
    <Paper
      elevation={0}
      sx={{
        position: "fixed",
        top: "120px",
        right: "20px",
        p: 2,
        borderRadius: "16px",
        background: "rgba(255, 255, 255, 0.8)",
        backdropFilter: "blur(10px)",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        gap: 2,
        border: "2px solid #FFB7B2",
        maxWidth: "220px",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, width: "100%", mb: 1 }}>
        <CategoryIcon sx={{ color: "#FF9AA2" }} />
        <Typography
          variant="subtitle1"
          sx={{
            fontWeight: 700,
            color: "#FF9AA2",
            fontFamily: '"Comic Sans MS", cursive, sans-serif',
          }}
        >
          קטגוריות
        </Typography>
      </Box>

      {categories.map((category, index) => (
        <Zoom in={true} style={{ transitionDelay: `${index * 100}ms` }} key={index}>
          <Button
            sx={{
              width: "100%",
              py: 1.2,
              px: 2,
              fontWeight: "bold",
              fontSize: "0.9rem",
              borderRadius: "12px",
              background: categoryThemes[index % categoryThemes.length].gradient,
              color: "#fff",
              textAlign: "center",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              transition: "all 0.3s ease",
              fontFamily: '"Comic Sans MS", cursive, sans-serif',
              "&:hover": {
                transform: "translateY(-3px)",
                boxShadow: categoryThemes[index % categoryThemes.length].shadow,
              },
            }}
          >
            {category.categoryName}
          </Button>
        </Zoom>
      ))}
    </Paper>
  )
}

export default Category
