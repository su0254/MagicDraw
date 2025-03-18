// import React, { useState, useEffect } from 'react';
// import { Box, Typography } from '@mui/material';
// import mammoth from 'mammoth';
// import * as pdfjsLib from 'pdfjs-dist/build/pdf';

// const gradients = [
//   'linear-gradient(135deg, #84fab0, #8fd3f4)', // Green-Blue
//   'linear-gradient(135deg, #ff9a9e, #fad0c4)', // Pink
//   'linear-gradient(135deg, #a18cd1, #fbc2eb)', // Purple-Pink
//   'linear-gradient(135deg, #fad0c4, #ff9a9e)', // Peach
// ];

// const files = [
//   {
//     name: "Document1",
//     type: "word",
//     path: "Y:\\Groups\\Group_5\\אולמן שרה\\sari ulman.docx"
//   },
//   {
//     name: "Document2",
//     type: "pdf",
//     path: "Y:\\Groups\\Group_5\\אולמן שרה\\חידון טו בשבט.pdf",
//   },
//   // הוסף כאן את שאר הקבצים
// ];

// const FileDisplay = () => {
//   const [fileContents, setFileContents] = useState<Record<string, string>>({});

//   useEffect(() => {
//     const loadFileContents = async () => {
//       for (const file of files) {
//         if (file.type === "word") {
//           try {
//             const response = await fetch(file.path);
//             const arrayBuffer = await response.arrayBuffer();
//             const { value } = await mammoth.convertToHtml({ arrayBuffer });
//             setFileContents(prev => ({ ...prev, [file.name]: value }));
//           } catch (error) {
//             console.error("Error reading Word file:", error);
//           }
//         } else if (file.type === "pdf") {
//           try {
//             const loadingTask = pdfjsLib.getDocument(file.path);
//             const pdf = await loadingTask.promise;
//             let pdfText = '';

//             for (let i = 1; i <= pdf.numPages; i++) {
//               const page = await pdf.getPage(i);
//               const textContent = await page.getTextContent();
//               const textItems = textContent.items.map((item: { str: string }) => item.str);
//               pdfText += textItems.join(' ') + '\n'; // הוספת תוכן כל עמוד
//             }

//             setFileContents(prev => ({ ...prev, [file.name]: pdfText }));
//           } catch (error) {
//             console.error("Error reading PDF file:", error);
//           }
//         }
//       }
//     };

//     loadFileContents();
//   }, []);

//   return (
//     <Box
//       sx={{
//         minHeight: '100vh',
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//         flexWrap: 'wrap',
//         gap: '20px',
//         padding: '20px',
//         background: 'linear-gradient(135deg, #fdfbfb, #ebedee)', // Light background
//       }}
//     >
//       {files.map((file, index) => (
//         <Box
//           key={index}
//           sx={{
//             width: '250px',
//             height: 'auto',
//             display: 'flex',
//             flexDirection: 'column',
//             justifyContent: 'center',
//             alignItems: 'center',
//             textAlign: 'center',
//             borderRadius: '10px',
//             border: `3px solid transparent`,
//             backgroundImage: `${gradients[index % gradients.length]}, linear-gradient(white, white)`,
//             backgroundOrigin: 'border-box',
//             backgroundClip: 'padding-box, border-box',
//             boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
//             padding: '10px',
//           }}
//         >
//           <Typography
//             variant="h6"
//             sx={{
//               fontWeight: 'bold',
//               color: '#555',
//             }}
//           >
//             {file.name}
//           </Typography>
//           <Typography
//             variant="body2"
//             sx={{
//               color: '#777',
//               marginTop: '5px',
//             }}
//           >
//             {file.type.toUpperCase()}
//           </Typography>
//           <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap' }}>
//             {fileContents[file.name]}
//           </Typography>
//         </Box>
//       ))}
//     </Box>
//   );
// };

// export default FileDisplay;

// import { useEffect, useState } from 'react';
// // import { GlobalWorkerOptions } from 'pdfjs-dist/legacy/build/pdf';
// // import pdfWorker from 'pdfjs-dist/legacy/build/pdf.worker.entry';

// import '../cssFiles/homePage.css';

// // הגדרת worker עבור PDF.js
// // GlobalWorkerOptions.workerSrc = pdfWorker;

// const HomePageMain = () => {
//   const [fileContents, setFileContents] = useState<{ [key: string]: string }>({});
//   const [error, setError] = useState<string | null>(null);

//   // מערך של קבצים קיימים
//   const files = [
//     // { name: 'example.pdf', type: 'application/pdf', path: '/files/test2.pdf' },
//     { name: 'test1.docx', type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', path: '/files/test1.docx' },
//     { name: 'test2.docx', type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', path: '/files/test2.docx' },
//     { name: 'test3.docx', type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', path: '/files/test3.docx' },
//     { name: 'test4.docx', type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', path: '/files/test4.docx' },
//     { name: 'test5.docx', type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', path: '/files/test5.docx' },

//   ];

//   const loadFileContents = async (file: { name: string; type: string; path: string }) => {
//     try {
//       if (file.type === 'application/pdf') {
//         // קריאת קובץ PDF
//         const pdfjsLib = await import('pdfjs-dist');
//         const pdf = await pdfjsLib.getDocument(file.path).promise;
//         let pdfText = '';

//         for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
//           const page = await pdf.getPage(pageNum);
//           const textContent = await page.getTextContent();
//           const text = textContent.items.map((item: any) => item.str).join(' ');
//           pdfText += text + '\n';
//         }

//         setFileContents((prev) => ({ ...prev, [file.name]: pdfText }));
//       } else if (file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
//         // קריאת קובץ Word
//         const mammoth = await import('mammoth');
//         const response = await fetch(file.path);
//         if (!response.ok) throw new Error('Network response was not ok');
//         const arrayBuffer = await response.arrayBuffer();
//         const result = await mammoth.extractRawText({ arrayBuffer });
//         setFileContents((prev) => ({ ...prev, [file.name]: result.value }));
//       } else {
//         throw new Error('Unsupported file type');
//       }
//     } catch (err: any) {
//       setError(`Error reading file ${file.name}: ${err.message}`);
//     }
//   };

//   useEffect(() => {
//     // טוען את כל הקבצים במערך
//     files.forEach((file) => {
//       loadFileContents(file);
//     });
//   }, []);

//   return (
//     <div className="homepage-main">
//       <h1 className="homepage-title">File Contents</h1>
//       {error && <p className="error-message">{error}</p>}
//       <div className="file-contents">
//         {Object.entries(fileContents).map(([fileName, content]) => (
//           <div key={fileName} className="file-content">
//             <h2>{fileName}</h2>
//             <pre>{content}</pre>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default HomePageMain;

// import React, { useState } from 'react';
// import mammoth from 'mammoth';

// interface ImageFile {
//   name: string;
//   path: string;
// }

// const HomePageMain = () => {
//   const [images] = useState<ImageFile[]>([
//     { name: 'Image 1', path: 'Y:\Groups\Group_5\אולמן שרה\practicom\MagicDraw\MagicDraw-User\src\images\SSGP0177.JPG' },
//     { name: 'Image 2', path: 'Y:\Groups\Group_5\אולמן שרה\practicom\MagicDraw\MagicDraw-User\src\images\SSGP0222.JPG' },
//     { name: 'Image 3', path: 'Y:\Groups\Group_5\אולמן שרה\practicom\MagicDraw\MagicDraw-User\src\images\SSGP0247.JPG' }
//   ]);

//   return (
//     <div>
//       <h2>גלריית תמונות</h2>
//       <div style={{ display: 'flex', flexWrap: 'wrap' }}>
//         {images.map((image, index) => (
//           <div key={index} style={{ margin: '10px' }}>
//             <img
//               src={image.path}
//               alt={image.name}
//               style={{ width: '150px', height: '150px', objectFit: 'cover' }}
//             />
//             <p>{image.name}</p>
//           </div>
//         ))}
//       </div>
//     </div>
// );
// };
// export default HomePageMain;
