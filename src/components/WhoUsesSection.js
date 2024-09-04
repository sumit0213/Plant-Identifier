import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Avatar, Paper, Button } from '@mui/material';

const WhoUsesSection = () => {
  const [activeIndex, setActiveIndex] = useState(0); // State to keep track of the active card
  const [isHovering, setIsHovering] = useState(false); // State to track mouse hover
  const [showFullQuote, setShowFullQuote] = useState(false); // State to toggle the full quote

  const users = [
    {
      name: "Hélène Ralimanana",
      designation: "Team Manager, Kew Madagascar Conservation Centre",
      location: "Madagascar",
      quote: "I use iNaturalist to share information with other people who are interested in Madagascar plants. It is also an opportunity for me to validate the photos and information recorded during field trips, and to provide information on species distribution for the IUCN Red List assessments."
    },
    {
      name: "Oskar",
      designation: "Team Manager, Kew Madagascar Conservation Centre",
      location: "Madagascar",
      quote: "I use iNaturalist to share information with other people who are interested in Madagascar plants. It is also an opportunity for me to validate the photos and information recorded during field trips, and to provide information on species distribution for the IUCN Red List assessments."
    },
    {
      name: "Tokiyo",
      designation: "Team Manager, Kew Madagascar Conservation Centre",
      location: "Madagascar",
      quote: "I use iNaturalist to share information with other people who are interested in Madagascar plants. It is also an opportunity for me to validate the photos and information recorded during field trips, and to provide information on species distribution for the IUCN Red List assessments."
    },
    // Add more user objects here
  ];

  useEffect(() => {
    let intervalId;
    if (!isHovering) {
      intervalId = setInterval(() => {
        setActiveIndex(prevIndex => prevIndex < users.length - 1 ? prevIndex + 1 : 0);
      }, 3000); // Rotate every 3 seconds
    }

    return () => clearInterval(intervalId); // Cleanup the interval on component unmount
  }, [isHovering, users.length]); // Depend on isHovering and users.length to control the interval

  const toggleFullQuote = () => {
    setShowFullQuote(!showFullQuote);
  };

  return (
    <Box sx={{ background: 'linear-gradient(135deg, #f5f5f5 10%, #e0e0e0 100%)', padding: { xs: '30px 0', md: '60px 0' }, marginTop: '40px' }}>
      <Container>
        <Typography variant="h4" component="h2" gutterBottom sx={{ textAlign: 'center', fontWeight: 'bold', fontFamily: 'Poppins, sans-serif', marginBottom: '40px', color: '#2c3e50', textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}>
          Who Uses iNaturalist?
        </Typography>
        <Box sx={{ position: 'relative', minHeight: { xs: 'auto', md: '400px' }, overflow: 'hidden' }}>
          {users.map((user, index) => (
            <Box
              key={index}
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'opacity 1s, transform 1s',
                opacity: index === activeIndex ? 1 : 0,
                transform: index === activeIndex ? 'translateY(0)' : 'translateY(20px)',
                visibility: index === activeIndex ? 'visible' : 'hidden',
                padding: { xs: '20px', md: '0' }
              }}
              onMouseEnter={() => setIsHovering(true)} // Pause transition on hover
              onMouseLeave={() => setIsHovering(false)} // Resume transition on mouse leave
            >
              <Paper elevation={5} sx={{ padding: '20px', borderRadius: '15px', boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)', background: 'linear-gradient(135deg, #72edf2 10%, #5151e5 100%)', color: '#fff', textAlign: 'center', maxWidth: { xs: '100%', md: '80%' } }}>
                <Avatar src="https://via.placeholder.com/150" alt={user.name} sx={{ width: { xs: '50px', md: '100px' }, height: { xs: '50px', md: '100px' }, marginBottom: '20px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }} />
                <Typography variant="subtitle1" component="p" sx={{ fontWeight: 'bold', fontFamily: 'Poppins, sans-serif', color: '#fff', textShadow: '1px 1px 3px rgba(0,0,0,0.2)', fontSize: { xs: '16px', md: '20px' } }}>
                  {user.name}
                </Typography>
                <Typography variant="body2" component="p" sx={{ color: '#ddd', fontSize: { xs: '14px', md: '16px' } }}>
                  {user.designation}
                </Typography>
                <Typography variant="caption" component="p" sx={{ color: '#bbb', fontSize: { xs: '12px', md: '14px' } }}>
                  {user.location}
                </Typography>
                <Typography variant="body1" component="p" sx={{ fontStyle: 'italic', color: '#eee', fontFamily: 'Poppins, sans-serif', marginTop: '20px', fontSize: { xs: '14px', md: '16px' }, maxHeight: showFullQuote ? 'none' : '50px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  "{user.quote}"
                </Typography>
                <Button onClick={toggleFullQuote} sx={{ marginTop: '10px', color: '#fff', fontSize: '12px' }}>
                  {showFullQuote ? 'View Less' : 'View More'}
                </Button>
              </Paper>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default WhoUsesSection;
