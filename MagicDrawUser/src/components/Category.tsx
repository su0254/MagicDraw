// "use client"

// import type React from "react"
// import { useEffect, useState } from "react"
// import { useDispatch, useSelector } from "react-redux"
// import { Box, Button, Typography, CircularProgress, Zoom, Tooltip } from "@mui/material"
// import { fetchCategories } from "../store/slices/categorySlice"
// import type { AppDispatch, RootState } from "../store/store"
// import { useNavigate } from "react-router-dom"

// // Icons
// import CategoryIcon from "@mui/icons-material/Category"
// import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome"
// import ErrorIcon from "@mui/icons-material/Error"

// // Playful gradients for categories
// const categoryGradients = [
//   {
//     gradient: "linear-gradient(135deg, #FF9AA2 0%, #FFB7B2 100%)",
//     shadow: "0 8px 20px rgba(255, 154, 162, 0.4)",
//     hoverGradient: "linear-gradient(135deg, #FFB7B2 0%, #FF9AA2 100%)",
//   },
//   {
//     gradient: "linear-gradient(135deg, #FFDAC1 0%, #FFC8A2 100%)",
//     shadow: "0 8px 20px rgba(255, 218, 193, 0.4)",
//     hoverGradient: "linear-gradient(135deg, #FFC8A2 0%, #FFDAC1 100%)",
//   },
//   {
//     gradient: "linear-gradient(135deg, #E2F0CB 0%, #B5EAD7 100%)",
//     shadow: "0 8px 20px rgba(226, 240, 203, 0.4)",
//     hoverGradient: "linear-gradient(135deg, #B5EAD7 0%, #E2F0CB 100%)",
//   },
//   {
//     gradient: "linear-gradient(135deg, #C7CEEA 0%, #B5B9FF 100%)",
//     shadow: "0 8px 20px rgba(199, 206, 234, 0.4)",
//     hoverGradient: "linear-gradient(135deg, #B5B9FF 0%, #C7CEEA 100%)",
//   },
// ]

// const Category: React.FC = () => {
//   const dispatch = useDispatch<AppDispatch>()
//   const {
//     list: categories,
//     loading,
//     error,
//   } = useSelector((state: RootState) => state.categories) as unknown as {
//     list: { id: string; categoryName: string }[]
//     loading: boolean
//     error: string | null
//   }

//   const navigate = useNavigate()
//   const [hoveredCategory, setHoveredCategory] = useState<string | null>(null)

//   useEffect(() => {
//     dispatch(fetchCategories())
//     console.log("categories", categories)
//   }, [dispatch])

//   const handleCategoryClick = (categoryName: string) => {
//     console.log("categories", categories)
//     console.log("categoryId", categoryName)
//     navigate(`/paintingsByCategory/${categoryName}`)
//   }

//   // Loading Animation
//   if (loading) {
//     return (
//       <Box
//         sx={{
//           position: "fixed",
//           top: "120px",
//           right: "20px",
//           p: 3,
//           borderRadius: "20px",
//           background: "rgba(255, 255, 255, 0.9)",
//           backdropFilter: "blur(10px)",
//           border: "3px solid #E2F0CB",
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//           gap: 2,
//           zIndex: 100,
//         }}
//       >
//         <Box sx={{ position: "relative" }}>
//           <CircularProgress
//             size={50}
//             sx={{
//               color: "#E2F0CB",
//               animation: "pulse 2s ease-in-out infinite",
//               "@keyframes pulse": {
//                 "0%": { transform: "scale(1)" },
//                 "50%": { transform: "scale(1.1)" },
//                 "100%": { transform: "scale(1)" },
//               },
//             }}
//           />
//           <AutoAwesomeIcon
//             sx={{
//               position: "absolute",
//               top: "50%",
//               left: "50%",
//               transform: "translate(-50%, -50%)",
//               color: "#FFDAC1",
//               fontSize: "1.5rem",
//               animation: "spin 3s linear infinite",
//               "@keyframes spin": {
//                 "0%": { transform: "translate(-50%, -50%) rotate(0deg)" },
//                 "100%": { transform: "translate(-50%, -50%) rotate(360deg)" },
//               },
//             }}
//           />
//         </Box>
//         <Typography
//           variant="body1"
//           sx={{
//             fontWeight: "bold",
//             color: "#E2F0CB",
//             fontFamily: '"Comic Sans MS", cursive, sans-serif',
//             textAlign: "center",
//           }}
//         >
//           טוען קטגוריות...
//         </Typography>
//       </Box>
//     )
//   }

//   // Error State
//   if (error) {
//     return (
//       <Box
//         sx={{
//           position: "fixed",
//           top: "120px",
//           right: "20px",
//           p: 3,
//           borderRadius: "20px",
//           background: "rgba(255, 154, 162, 0.1)",
//           backdropFilter: "blur(10px)",
//           border: "3px solid #FF9AA2",
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//           gap: 2,
//           zIndex: 100,
//         }}
//       >
//         <ErrorIcon sx={{ fontSize: "3rem", color: "#FF9AA2" }} />
//         <Typography
//           variant="body1"
//           sx={{
//             fontWeight: "bold",
//             color: "#FF9AA2",
//             fontFamily: '"Comic Sans MS", cursive, sans-serif',
//             textAlign: "center",
//           }}
//         >
//           שגיאה בטעינת קטגוריות
//         </Typography>
//       </Box>
//     )
//   }

//   return (
//     <Box
//       sx={{
//         position: "fixed",
//         top: "120px",
//         right: "20px",
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "flex-end",
//         gap: 2,
//         zIndex: 100,
//         maxWidth: "250px",
//       }}
//     >
//       {/* Header */}
//       <Box
//         sx={{
//           p: 2,
//           borderRadius: "16px",
//           background: "rgba(255, 255, 255, 0.9)",
//           backdropFilter: "blur(10px)",
//           border: "3px solid #E2F0CB",
//           display: "flex",
//           alignItems: "center",
//           gap: 1,
//           width: "100%",
//           justifyContent: "center",
//         }}
//       >
//         <CategoryIcon sx={{ color: "#E2F0CB", fontSize: "2rem" }} />
//         <Typography
//           variant="h6"
//           sx={{
//             fontWeight: "bold",
//             color: "#E2F0CB",
//             fontFamily: '"Comic Sans MS", cursive, sans-serif',
//           }}
//         >
//           קטגוריות
//         </Typography>
//       </Box>

//       {/* Category Buttons */}
//       {categories.map((category, index) => {
//         const theme = categoryGradients[index % categoryGradients.length]

//         return (
//           <Zoom in={true} style={{ transitionDelay: `${index * 150}ms` }} key={category.id}>
//             <Tooltip title={`צפה בציורים בקטגוריית ${category.categoryName}`} arrow placement="left">
//               <Button
//                 onClick={() => handleCategoryClick(category.categoryName)}
//                 onMouseEnter={() => setHoveredCategory(category.id)}
//                 onMouseLeave={() => setHoveredCategory(null)}
//                 sx={{
//                   width: "220px",
//                   height: "60px",
//                   fontWeight: "bold",
//                   fontSize: "1.1rem",
//                   borderRadius: "20px",
//                   background: theme.gradient,
//                   color: "#fff",
//                   textTransform: "none",
//                   fontFamily: '"Comic Sans MS", cursive, sans-serif',
//                   boxShadow: "0 6px 15px rgba(0, 0, 0, 0.2)",
//                   transition: "all 0.3s ease",
//                   transform:
//                     hoveredCategory === category.id ? "translateY(-5px) translateX(-10px) scale(1.05)" : "none",
//                   "&:hover": {
//                     background: theme.hoverGradient,
//                     boxShadow: theme.shadow,
//                   },
//                   "&:active": {
//                     transform: "translateY(-2px) translateX(-5px) scale(1.02)",
//                   },
//                 }}
//               >
//                 {category.categoryName}
//               </Button>
//             </Tooltip>
//           </Zoom>
//         )
//       })}
//     </Box>
//   )
// }

// export default Category

"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Box, Button, Typography, CircularProgress, Zoom, Tooltip } from "@mui/material"
import { fetchCategories } from "../store/slices/categorySlice"
import type { AppDispatch, RootState } from "../store/store"
import { useNavigate } from "react-router-dom"

// Icons
import CategoryIcon from "@mui/icons-material/Category"
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome"
import ErrorIcon from "@mui/icons-material/Error"

// Playful gradients for categories
const categoryGradients = [
  {
    gradient: "linear-gradient(135deg, #FF9AA2 0%, #FFB7B2 100%)",
    shadow: "0 8px 20px rgba(255, 154, 162, 0.4)",
    hoverGradient: "linear-gradient(135deg, #FFB7B2 0%, #FF9AA2 100%)",
  },
  {
    gradient: "linear-gradient(135deg, #FFDAC1 0%, #FFC8A2 100%)",
    shadow: "0 8px 20px rgba(255, 218, 193, 0.4)",
    hoverGradient: "linear-gradient(135deg, #FFC8A2 0%, #FFDAC1 100%)",
  },
  {
    gradient: "linear-gradient(135deg, #E2F0CB 0%, #B5EAD7 100%)",
    shadow: "0 8px 20px rgba(226, 240, 203, 0.4)",
    hoverGradient: "linear-gradient(135deg, #B5EAD7 0%, #E2F0CB 100%)",
  },
  {
    gradient: "linear-gradient(135deg, #C7CEEA 0%, #B5B9FF 100%)",
    shadow: "0 8px 20px rgba(199, 206, 234, 0.4)",
    hoverGradient: "linear-gradient(135deg, #B5B9FF 0%, #C7CEEA 100%)",
  },
]

const Category: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const {
    list: categories,
    loading,
    error,
  } = useSelector((state: RootState) => state.categories) as unknown as {
    list: { id: string; categoryName: string }[]
    loading: boolean
    error: string | null
  }

  const navigate = useNavigate()
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null)

  useEffect(() => {
    dispatch(fetchCategories())
    console.log("categories", categories)
  }, [dispatch])

  const handleCategoryClick = (categoryName: string) => {
    console.log("categories", categories)
    console.log("categoryId", categoryName)
    navigate(`/paintingsByCategory/${categoryName}`)
  }

  // Loading Animation
  if (loading) {
    return (
      <Box
        sx={{
          position: "fixed",
          top: "120px",
          right: "20px",
          p: 3,
          borderRadius: "20px",
          background: "rgba(255, 255, 255, 0.9)",
          backdropFilter: "blur(10px)",
          border: "3px solid #E2F0CB",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
          zIndex: 100,
        }}
      >
        <Box sx={{ position: "relative" }}>
          <CircularProgress
            size={50}
            sx={{
              color: "#E2F0CB",
              animation: "pulse 2s ease-in-out infinite",
              "@keyframes pulse": {
                "0%": { transform: "scale(1)" },
                "50%": { transform: "scale(1.1)" },
                "100%": { transform: "scale(1)" },
              },
            }}
          />
          <AutoAwesomeIcon
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              color: "#FFDAC1",
              fontSize: "1.5rem",
              animation: "spin 3s linear infinite",
              "@keyframes spin": {
                "0%": { transform: "translate(-50%, -50%) rotate(0deg)" },
                "100%": { transform: "translate(-50%, -50%) rotate(360deg)" },
              },
            }}
          />
        </Box>
        <Typography
          variant="body1"
          sx={{
            fontWeight: "bold",
            color: "#E2F0CB",
            fontFamily: '"Comic Sans MS", cursive, sans-serif',
            textAlign: "center",
          }}
        >
          טוען קטגוריות...
        </Typography>
      </Box>
    )
  }

  // Error State
  if (error) {
    return (
      <Box
        sx={{
          position: "fixed",
          top: "120px",
          right: "20px",
          p: 3,
          borderRadius: "20px",
          background: "rgba(255, 154, 162, 0.1)",
          backdropFilter: "blur(10px)",
          border: "3px solid #FF9AA2",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
          zIndex: 100,
        }}
      >
        <ErrorIcon sx={{ fontSize: "3rem", color: "#FF9AA2" }} />
        <Typography
          variant="body1"
          sx={{
            fontWeight: "bold",
            color: "#FF9AA2",
            fontFamily: '"Comic Sans MS", cursive, sans-serif',
            textAlign: "center",
          }}
        >
          שגיאה בטעינת קטגוריות
        </Typography>
      </Box>
    )
  }

  return (
    <Box
      sx={{
        position: "fixed",
        top: "120px",
        right: "20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        gap: 2,
        zIndex: 100,
        maxWidth: "250px",
      }}
    >
      {/* Header */}
      <Box
        sx={{
          p: 2,
          borderRadius: "16px",
          background: "rgba(255, 255, 255, 0.9)",
          backdropFilter: "blur(10px)",
          border: "3px solid #E2F0CB",
          display: "flex",
          alignItems: "center",
          gap: 1,
          width: "100%",
          justifyContent: "center",
        }}
      >
        <CategoryIcon sx={{ color: "#E2F0CB", fontSize: "2rem" }} />
        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
            color: "#E2F0CB",
            fontFamily: '"Comic Sans MS", cursive, sans-serif',
          }}
        >
          קטגוריות
        </Typography>
      </Box>

      {/* Category Buttons */}
      {categories.map((category, index) => {
        const theme = categoryGradients[index % categoryGradients.length]

        return (
          <Zoom in={true} style={{ transitionDelay: `${index * 150}ms` }} key={category.id}>
            <Tooltip title={`צפה בציורים בקטגוריית ${category.categoryName}`} arrow placement="left">
              <Button
                onClick={() => handleCategoryClick(category.categoryName)}
                onMouseEnter={() => setHoveredCategory(category.id)}
                onMouseLeave={() => setHoveredCategory(null)}
                sx={{
                  width: "220px",
                  height: "60px",
                  fontWeight: "bold",
                  fontSize: "1.1rem",
                  borderRadius: "20px",
                  background: theme.gradient,
                  color: "#fff",
                  textTransform: "none",
                  fontFamily: '"Comic Sans MS", cursive, sans-serif',
                  boxShadow: "0 6px 15px rgba(0, 0, 0, 0.2)",
                  transition: "all 0.3s ease",
                  transform:
                    hoveredCategory === category.id ? "translateY(-5px) translateX(-10px) scale(1.05)" : "none",
                  "&:hover": {
                    background: theme.hoverGradient,
                    boxShadow: theme.shadow,
                  },
                  "&:active": {
                    transform: "translateY(-2px) translateX(-5px) scale(1.02)",
                  },
                }}
              >
                {category.categoryName}
              </Button>
            </Tooltip>
          </Zoom>
        )
      })}
    </Box>
  )
}

export default Category
