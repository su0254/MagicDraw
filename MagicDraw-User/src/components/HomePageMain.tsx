import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPaintings } from '../store/slices/paintingsSlice';
import { AppDispatch, RootState } from '../store/store';
import SearchIcon from '@mui/icons-material/Search';
import { Button, CircularProgress, Typography } from '@mui/material';
import { PaintingType } from '../types/PaintingType';

const gradients = [
  'linear-gradient(135deg, #84fab0, #8fd3f4)', // Green-Blue
  'linear-gradient(135deg, #ff9a9e, #fad0c4)', // Pink
  'linear-gradient(135deg, #a18cd1, #fbc2eb)', // Purple-Pink
];

const HomePageMain: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { list: paintings, loading, error } = useSelector(
    (state: RootState) => state.paintings
  ) as { list: PaintingType[]; loading: boolean; error: string | null };

  const [searchTerm, setSearchTerm] = useState<string>(''); // State for search input
  const [currentPage, setCurrentPage] = useState<number>(1); // State for current page
  const itemsPerPage = 8; // Number of items per page

  useEffect(() => {
    dispatch(fetchPaintings()); // Fetch paintings from the database
  }, [dispatch]);

  const filteredPaintings = searchTerm
    ? paintings.filter((painting) =>
        painting.fileName?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : paintings; // אם אין ערך בחיפוש, מציגים את כל הציורים

  const totalPages = Math.ceil(filteredPaintings.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentPaintings = filteredPaintings.slice(startIndex, startIndex + itemsPerPage);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reset to the first page when searching
  };

  const handleImageClick = (imagePath: string) => {
    console.log(imagePath);
    
    navigate('/show-painting', { state: { selectedImage: imagePath } });
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return (
      <Typography color="error" style={{ textAlign: 'center', marginTop: '20px' }}>
        שגיאה בטעינת הציורים: {error}
      </Typography>
    );
  }

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
        {currentPaintings.map((painting, index) => (
          <div
            key={painting.id}
            style={{
              cursor: 'pointer',
              border: '1px solid #ddd',
              borderRadius: '10px',
              overflow: 'hidden',
              width: '150px',
              height: '230px',
              transition: 'transform 0.2s',
            }}
            onClick={() => {console.log(painting.url);
             handleImageClick(painting.url);}}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.transform = 'scale(1)';
            }}
          >
            <img
              src={painting.url}
              alt={painting.fileName}
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
              {painting.fileName}
            </div>
          </div>
        ))}
      </div>
      {filteredPaintings.length === 0 && (
        <p style={{ textAlign: 'center', color: '#555', marginTop: '20px' }}>
          לא נמצאו תוצאות לחיפוש.
        </p>
      )}
      {filteredPaintings.length > itemsPerPage && (
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