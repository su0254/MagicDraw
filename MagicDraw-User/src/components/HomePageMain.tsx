import React from 'react';
import { useNavigate } from 'react-router-dom';

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
    { name: 'Image 1', path: '/images/5.png' },
    { name: 'Image 2', path: '/images/6-1.png' },
    { name: 'Image 3', path: '/images/dalet.png' },
    { name: 'Image 4', path: '/images/moi-raskraski-koster-4.jpg' },
    { name: 'Image 5', path: '/images/moi-raskraski-lev-14-gigapixel-art-scale-2_00x (1).jpg' },
    { name: 'Image 6', path: '/images/moi-raskraski-lev-14-gigapixel-art-scale-2_00x.jpg' },
    { name: 'Image 7', path: '/images/raskraski-zhivotnie-pchela-15.jpg' },
  ];

  const handleImageClick = (imagePath: string) => {
    navigate('/show-painting', { state: { selectedImage: imagePath } });
  };

  return (
    <div>
      <h2>גלריית תמונות</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
        {images.map((image, index) => (
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
    </div>
  );
};

export default HomePageMain;