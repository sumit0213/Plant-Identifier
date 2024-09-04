import React, { useState } from 'react';
import NavigationBar from './NavigationBar';  // Import NavigationBar component
import HeroSection from './HeroSection';      // Import HeroSection component
import FooterSection from './FooterSection';  // Import FooterSection component

// Import all images from the gallery folder
const importAll = (r) => r.keys().map(r);
const images = importAll(require.context('../Asset/gallery', false, /\.(png|jpe?g|svg)$/));

const FullGallery = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  const handleOpenLightbox = (index) => {
    setPhotoIndex(index);
    setIsOpen(true);
  };

  const handleCloseLightbox = () => {
    setIsOpen(false);
  };

  const handleNext = () => {
    setPhotoIndex((photoIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setPhotoIndex((photoIndex + images.length - 1) % images.length);
  };

  return (
    <div>
      {/* Include the NavigationBar */}
      <NavigationBar />

      {/* Include the HeroSection */}
      <HeroSection />

      {/* Full gallery content */}
      <div
        style={{
          padding: '50px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
          gap: '20px',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#f0f0f0',
          minHeight: '100vh',
        }}
      >
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Gallery Image ${index + 1}`}
            style={fullGalleryImageStyle}
            onClick={() => handleOpenLightbox(index)}
          />
        ))}

        {isOpen && (
          <div style={lightboxStyle}>
            <button style={navButtonStyle} onClick={handlePrev}>
              ❮
            </button>
            <img src={images[photoIndex]} alt={`Image ${photoIndex + 1}`} style={lightboxImageStyle} />
            <button style={navButtonStyle} onClick={handleNext}>
              ❯
            </button>
            <button style={closeButtonStyle} onClick={handleCloseLightbox}>
              ✕
            </button>
          </div>
        )}
      </div>

      {/* Include the FooterSection */}
      <FooterSection />
    </div>
  );
};

// Full gallery image styling
const fullGalleryImageStyle = {
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

// Lightbox styling
const lightboxStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  backgroundColor: 'rgba(0, 0, 0, 0.8)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1000,
};

const lightboxImageStyle = {
  maxWidth: '80%',
  maxHeight: '80%',
};

const closeButtonStyle = {
  position: 'absolute',
  top: '20px',
  right: '20px',
  fontSize: '24px',
  color: '#fff',
  backgroundColor: 'transparent',
  border: 'none',
  cursor: 'pointer',
};

const navButtonStyle = {
  fontSize: '24px',
  color: '#fff',
  backgroundColor: 'transparent',
  border: 'none',
  cursor: 'pointer',
  margin: '0 20px',
};

export default FullGallery;
