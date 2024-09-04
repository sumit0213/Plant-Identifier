import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

// Import all images from the gallery folder
const importAll = (r) => r.keys().map(r);
const images = importAll(require.context('../Asset/gallery', false, /\.(png|jpe?g|svg)$/));

const ImageGallery = () => {
  const galleryRef = useRef(null);  // Reference to the gallery container
  const [visibleImages, setVisibleImages] = useState(8); // Number of visible images initially
  const navigate = useNavigate();

  // Auto-scroll functionality (optional)
  const imageWidth = 170;

  useEffect(() => {
    let currentIndex = 0;

    const scrollInterval = setInterval(() => {
      if (galleryRef.current) {
        const nextIndex = (currentIndex + 1) % visibleImages;
        galleryRef.current.scroll({
          left: nextIndex * imageWidth,
          behavior: 'smooth',
        });
        currentIndex = nextIndex;
      }
    }, 2000);

    return () => clearInterval(scrollInterval);
  }, [visibleImages]);

  // Navigate to the full gallery on button click
  const handleShowMore = () => {
    navigate('/full-gallery');
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        height: '45vh',
        backgroundColor: '#f0f0f0',
      }}
    >
      <div
        style={{
          padding: '20px',
          borderRadius: '15px',
          backdropFilter: 'blur(10px)',
          backgroundColor: 'rgba(255, 255, 255, 0.4)',
          boxShadow: '0 0 30px rgba(0, 0, 0, 0.1)',
          width: '750px',
        }}
      >
        <div
          ref={galleryRef}
          style={{
            display: 'flex',
            overflowX: 'hidden',
            gap: '20px',
            padding: '20px',
            borderRadius: '15px',
          }}
        >
          {images.slice(0, visibleImages).map((image, index) => (
            <img key={index} src={image} alt={`Gallery Image ${index + 1}`} style={galleryImageStyle} />
          ))}
        </div>
      </div>

      <button
        onClick={handleShowMore}
        style={{
          marginTop: '20px',
          padding: '10px 20px',
          fontSize: '16px',
          backgroundColor: '#007bff',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          transition: 'background-color 0.3s',
        }}
        onMouseOver={(e) => (e.target.style.backgroundColor = '#0056b3')}
        onMouseOut={(e) => (e.target.style.backgroundColor = '#007bff')}
      >
        Show More
      </button>
    </div>
  );
};

// Gallery image styling
const galleryImageStyle = {
  height: '150px',
  width: '150px',
  borderRadius: '10px',
  objectFit: 'cover',
  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
  border: '3px solid black',
  transition: 'transform 0.5s ease-in-out, box-shadow 0.3s ease-in-out',
  cursor: 'pointer',
  '&:hover': {
    transform: 'rotate(10deg) scale(1.1)',
    boxShadow: '0 6px 25px rgba(0, 0, 0, 0.3)',
  },
};

export default ImageGallery;
