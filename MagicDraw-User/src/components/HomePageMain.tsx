import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search'; // ייבוא אייקון חיפוש מ-MUI
import { Button } from '@mui/material';

interface ImageFile {
  name: string;
  path: string;
}

const gradients = [
  'linear-gradient(135deg, #84fab0, #8fd3f4)', // Green-Blue
  'linear-gradient(135deg, #ff9a9e, #fad0c4)', // Pink
  'linear-gradient(135deg, #a18cd1, #fbc2eb)', // Purple-Pink
];

const HomePageMain: React.FC = () => {
  const navigate = useNavigate();

  const images: ImageFile[] = [
    { name: 'פסח', path: '/images/5.png' },
    { name: 'ראש השנה', path: '/images/6-1.png' },
    { name: 'אות ד', path: '/images/dalet.png' },
    { name: 'ל"ג בעומר', path: '/images/moi-raskraski-koster-4.jpg' },
    { name: 'אריה', path: '/images/moi-raskraski-lev-14-gigapixel-art-scale-2_00x (1).jpg' },
    { name: 'אריה', path: '/images/moi-raskraski-lev-14-gigapixel-art-scale-2_00x.jpg' },
    { name: 'דבורה', path: '/images/raskraski-zhivotnie-pchela-15.jpg' },
    { name: 'דבורה', path: '/images/raskraski-zhivotnie-pchela-15.jpg' },
    { name: 'דבורה', path: '/images/raskraski-zhivotnie-pchela-15.jpg' },
    { name: 'דבורה', path: '/images/raskraski-zhivotnie-pchela-15.jpg' },
    { name: 'דבורה', path: '/images/raskraski-zhivotnie-pchela-15.jpg' },
    { name: 'דבורה', path: '/images/raskraski-zhivotnie-pchela-15.jpg' },
    { name: 'דבורה', path: '/images/raskraski-zhivotnie-pchela-15.jpg' },
    { name: 'דבורה', path: '/images/raskraski-zhivotnie-pchela-15.jpg' },
    { name: 'דבורה', path: '/images/raskraski-zhivotnie-pchela-15.jpg' },
    { name: 'דבורה', path: '/images/raskraski-zhivotnie-pchela-15.jpg' },
    { name: 'דבורה', path: '/images/raskraski-zhivotnie-pchela-15.jpg' },
    { name: 'דבורה', path: '/images/raskraski-zhivotnie-pchela-15.jpg' },
    { name: 'דבורה', path: '/images/raskraski-zhivotnie-pchela-15.jpg' },
    { name: 'דבורה', path: '/images/raskraski-zhivotnie-pchela-15.jpg' },
    { name: 'דבורה', path: '/images/raskraski-zhivotnie-pchela-15.jpg' },
    { name: 'דבורה', path: '/images/raskraski-zhivotnie-pchela-15.jpg' },
    { name: 'דבורה', path: '/images/raskraski-zhivotnie-pchela-15.jpg' },
    { name: 'דבורה', path: '/images/raskraski-zhivotnie-pchela-15.jpg' },
    { name: 'דבורה', path: '/images/raskraski-zhivotnie-pchela-15.jpg' },
    { name: 'דבורה', path: '/images/raskraski-zhivotnie-pchela-15.jpg' },
    { name: 'דבורה', path: '/images/raskraski-zhivotnie-pchela-15.jpg' },
    
  ];

  const [searchTerm, setSearchTerm] = useState<string>(''); // State for search input
  const [currentPage, setCurrentPage] = useState<number>(1); // State for current page
  const itemsPerPage = 8; // Number of items per page

  const filteredImages = images.filter((image) =>
    image.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredImages.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentImages = filteredImages.slice(startIndex, startIndex + itemsPerPage);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reset to the first page when searching
  };

  const handleImageClick = (imagePath: string) => {
    navigate('/show-painting', { state: { selectedImage: imagePath } });
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '20px' }}>
        <div style={{ position: 'relative', width: '300px' }}>
          <input
            type="text"
            placeholder="חיפוש ציור"
            value={searchTerm}
            onChange={handleSearch}
            style={{
              width: '100%',
              padding: '10px 40px 10px 10px', // מרווח לאייקון
              borderRadius: '20px',
              border: '1px solid #ddd',
              outline: 'none',
              fontSize: '16px',
              boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
            }}
          />
          <SearchIcon
            style={{
              position: 'absolute',
              right: '10px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#888',
              cursor: 'pointer',
            }}
          />
        </div>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
        {currentImages.map((image, index) => (
          <div
            key={index}
            style={{
              cursor: 'pointer',
              border: '1px solid #ddd',
              borderRadius: '10px',
              overflow: 'hidden',
              width: '150px',
              height: '230px',
              transition: 'transform 0.2s',
            }}
            onClick={() => handleImageClick(image.path)}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.transform = 'scale(1)';
            }}
          >
            <img
              src={image.path}
              alt={image.name}
              style={{ width: '100%', height: '150px', objectFit: 'cover' }}
            />
            <div
              style={{
                background: gradients[index % gradients.length],
                color: 'white',
                textAlign: 'center',
                padding: '5px',
                height: '30px',
              }}
            >
              {image.name}
            </div>
          </div>
        ))}
      </div>
      {filteredImages.length === 0 && (
        <p style={{ textAlign: 'center', color: '#555', marginTop: '20px' }}>
          לא נמצאו תוצאות לחיפוש.
        </p>
      )}
      {filteredImages.length > itemsPerPage && (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px', gap: '10px' }}>
          <Button
            variant="contained"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
            sx={{
              background: 'linear-gradient(135deg, #84fab0, #8fd3f4)',
              color: '#fff',
              '&:hover': {
                background: 'linear-gradient(135deg, #8fd3f4, #84fab0)',
              },
            }}
          >
            ציורים קודמים
          </Button>
          <Button
            variant="contained"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
            sx={{
              background: 'linear-gradient(135deg, #84fab0, #8fd3f4)',
              color: '#fff',
              '&:hover': {
                background: 'linear-gradient(135deg, #8fd3f4, #84fab0)',
              },
            }}
          >
            ציורים נוספים
          </Button>
        </div>
      )}
    </div>
  );
};

export default HomePageMain;