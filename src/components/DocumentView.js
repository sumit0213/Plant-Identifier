import React, { useState, useEffect } from 'react';
import { Typography, Box, Button } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import NavigationBar from './NavigationBar';
import FooterSection from './FooterSection';
import ImageGallery from './ImageGallery'; // Import the gallery component
import mammoth from 'mammoth';

const DocumentView = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { speciesName } = location.state || {};
  const [docxContent, setDocxContent] = useState('');
  const [imageList, setImageList] = useState([]); // List of images

  useEffect(() => {
    if (speciesName) {
      fetchDocumentContent(speciesName);
      fetchImages(speciesName);
    }
  }, [speciesName]);

  // Fetch and display document content based on species name
  const fetchDocumentContent = async (speciesName) => {
    try {
      const fileName = speciesName.replace(/\s+/g, '_') + '.docx';
      const filePath = `/species_doc/${fileName}`;

      const response = await fetch(filePath);

      if (!response.ok) {
        console.error('Failed to fetch the file:', response.statusText);
        return;
      }

      const arrayBuffer = await response.arrayBuffer();
      const result = await mammoth.convertToHtml({ arrayBuffer });

      setDocxContent(result.value);
    } catch (error) {
      console.error('Error fetching or processing the file:', error);
    }
  };

  // Fetch and display all images based on the species folder
  const fetchImages = (speciesName) => {
    const folderName = speciesName.replace(/\s+/g, '_'); // Folder name matches the species name
    const imagePath = `/species_images/${folderName}/`; // Base path to the species folder

    const possibleImages = [
      `${imagePath}${folderName}.png`,
      `${imagePath}${folderName}2.png`,
      `${imagePath}${folderName}3.png`,
      `${imagePath}${folderName}4.png`,
    ];

    const validImages = [];
    possibleImages.forEach((imageSrc) => {
      const img = new Image();
      img.src = imageSrc;

      img.onload = () => {
        validImages.push(imageSrc); // Image exists, add to validImages list
        setImageList([...validImages]);
      };

      img.onerror = (error) => {
        console.error(`Image failed to load: ${imageSrc}`, error);
      };
    });
  };

  return (
    <div>
      <NavigationBar />

      <div style={{ padding: '20px' }}>
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{ fontFamily: 'Poppins, sans-serif', color: '#2c3e50' }}
        >
          {speciesName} Document Content
        </Typography>

        {/* Integrating ImageGallery here */}
        <ImageGallery images={imageList} /> {/* Passing image list to the gallery */}

        <Box
          sx={{
            marginTop: '40px',
            padding: '20px',
            borderRadius: '10px',
            backgroundColor: '#f9f9f9',
            boxShadow: '0 0 15px rgba(0, 0, 0, 0.1)',
          }}
        >
          <Typography
            variant="h5"
            align="center"
            gutterBottom
            sx={{ fontFamily: 'Poppins, sans-serif', color: '#2c3e50' }}
          >
            Document Content
          </Typography>
          <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap', fontFamily: 'Roboto, sans-serif', color: '#333' }}>
            <div
              dangerouslySetInnerHTML={{
                __html: docxContent || 'No content available for this species.',
              }}
            />
          </Typography>
        </Box>

        <Box sx={{ marginTop: '20px', textAlign: 'center' }}>
          <Button
            variant="contained"
            sx={{
              background: 'linear-gradient(135deg, #72edf2 10%, #5151e5 100%)',
              color: '#fff',
              padding: '10px 20px',
              fontWeight: 'bold',
              fontFamily: 'Poppins, sans-serif',
              boxShadow: '0 8px 15px rgba(0, 0, 0, 0.2)',
              transition: 'transform 0.3s, box-shadow 0.3s',
              '&:hover': {
                background: 'linear-gradient(135deg, #ff9a9e 10%, #fad0c4 100%)',
                boxShadow: '0 12px 25px rgba(0, 0, 0, 0.3)',
                transform: 'scale(1.05)',
              },
            }}
            onClick={() => navigate(-1)}
          >
            Back
          </Button>
        </Box>
      </div>

      <FooterSection navigate={navigate} />
    </div>
  );
};

export default DocumentView;
