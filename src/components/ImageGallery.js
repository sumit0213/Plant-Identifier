import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import NavigationBar from './NavigationBar';
import HeroSection from './HeroSection';


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
    <div>      
      <HeroSection />

      {/* New Section */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          height: '200px',
          backgroundColor: '#ffffff', // Purple background as in the image
          marginTop: '95PX',
        }}
      >
        {/* Rounded Div with Text
        <div
          style={{
            backgroundColor: '#8338ec', // Another shade of purple for the DIVI tag
            borderRadius: '20px',
            padding: '10px 20px',
            color: 'white',
            fontSize: '20px',
            fontWeight: 'bold',
            marginBottom: '10px',
          }}
        >
          DIVI
        </div> */}

        {/* Header Section */}
        <h1
          style={{
            color: 'black',
            fontSize: '40px',
            fontWeight: 'bold',
            marginBottom: '-10px',
          }}
        >
          IMAGE GALLERY
        </h1>

        {/* Subtitle Section */}
        <h2
          style={{
            color: 'black',
            fontSize: '24px',
            fontWeight: 'normal',
            marginBottom: '90px',

          }}
        >
          "various plant images, essential for research and species identification, as part of our botanical study collection."
        </h2>

        {/* Line below Subtitle */}
        <div
          style={{
            width: '60px',
            height: '4px',
            backgroundColor: '#ffffff', // Same purple color as the DIVI tag
            marginBottom: '20px',
          }}
        />
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
         // height: '45vh',
          backgroundColor: '#ffffff',
          padding: '2px', // Remove any padding that could cause gaps
        }}
      >
        {/* <div
          style={{
            padding: '0', // Remove padding to avoid gaps
            borderRadius: '0px',
            backdropFilter: 'blur(10px)',
            backgroundColor: '#ffffff',
            boxShadow: '0 0 30px rgba(0, 0, 0, 0.1)',
            width: '100vw', // Set full width to remove gaps
            maxWidth: '100%', // Remove the max width limit
            margin: '0 auto', // Ensure the container remains centered
          }}
        > */}
          <div
            ref={galleryRef}
            style={{
              display: 'flex',
              overflowX: 'hidden',
              gap: '20px',
              padding: '20px',
              //borderRadius: '15px',
              margin: '20px', // No margin to ensure no gaps
              padding: '0', // Remove padding to avoid gaps
              borderRadius: '0px',
              backdropFilter: 'blur(10px)',
              backgroundColor: '#ffffff',
              boxShadow: '0 0 30px rgba(0, 0, 0, 0.1)',
              width: '100vw', // Set full width to remove gaps
              maxWidth: '100%', // Remove the max width limit
              margin: '0 auto', // Ensure the container remains centered
            }}
          >
            {images.slice(0, visibleImages).map((image, index) => (
              <img key={index} src={image} style={galleryImageStyle} />
            ))}
          </div>
        {/* </div> */}

        <button
          onClick={handleShowMore}
          style={{
            marginTop: '80px',
            padding: '10px 20px',
            fontSize: '22px',
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
    </div>
  );
};

// Gallery image styling
const galleryImageStyle = {
  height: '230px',
  width: '230px',
  borderRadius: '0px',
  objectFit: 'cover',
  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
  border: '0px solid black',
  transition: 'transform 0.5s ease-in-out, box-shadow 0.3s ease-in-out',
  cursor: 'pointer',
  '&:hover': {
    transform: 'rotate(10deg) scale(1.1)',
    boxShadow: '0 6px 25px rgba(0, 0, 0, 0.3)',
  },
};

export default ImageGallery;
