import React from 'react';
import { Container, Grid, Paper, Typography, Box, Avatar, IconButton, Collapse } from '@mui/material';
import Slider from 'react-slick';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

const TestimonialsSection = ({ testimonials, expandedCard, handleExpandClick }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  };

  return (
    <Box sx={{ background: 'linear-gradient(135deg, #f5f5f5 10%, #e0e0e0 100%)', padding: '60px 0', marginTop: '40px' }}>
      <Container>
        <Typography
          variant="h4"
          component="h2"
          gutterBottom
          sx={{
            textAlign: 'center',
            fontWeight: 'bold',
            fontFamily: 'Poppins, sans-serif',
            marginBottom: '40px',
            color: '#2c3e50',
            textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
          }}
        >
          Customers Love Vaultflow
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {testimonials.map((testimonial, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Paper
                elevation={5}
                sx={{
                  padding: '30px',
                  textAlign: 'center',
                  borderRadius: '15px',
                  boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
                  background: 'linear-gradient(135deg, #72edf2 10%, #5151e5 100%)',
                  color: '#fff',
                  transition: 'transform 0.4s, background 0.4s, box-shadow 0.4s',
                  cursor: 'pointer',
                  transform: expandedCard === index ? 'scale(1.1)' : 'scale(1)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #ff9a9e 10%, #fad0c4 100%)',
                    transform: 'scale(1.1)',
                    boxShadow: '0 12px 25px rgba(0, 0, 0, 0.3)',
                  },
                }}
                onClick={() => handleExpandClick(index)}
              >
                <Box sx={{ marginBottom: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <Avatar
                    src={testimonial.image}
                    alt={testimonial.name}
                    sx={{
                      width: '60px',
                      height: '60px',
                      marginRight: '10px',
                      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                    }}
                  />
                  <Box sx={{ textAlign: 'left' }}>
                    <Typography
                      variant="subtitle1"
                      component="p"
                      sx={{
                        fontWeight: 'bold',
                        fontFamily: 'Poppins, sans-serif',
                        color: '#fff',
                        textShadow: '1px 1px 3px rgba(0,0,0,0.2)',
                      }}
                    >
                      {testimonial.name}
                    </Typography>
                    <Typography variant="body2" component="p" sx={{ color: '#ddd' }}>
                      {testimonial.designation}
                    </Typography>
                    <Typography variant="caption" component="p" sx={{ color: '#bbb' }}>
                      {testimonial.company}
                    </Typography>
                  </Box>
                </Box>
                <Typography
                  variant="body1"
                  component="p"
                  sx={{
                    fontStyle: 'italic',
                    color: '#eee',
                    fontFamily: 'Poppins, sans-serif',
                  }}
                >
                  "{testimonial.feedback}"
                </Typography>
                <IconButton sx={{ marginTop: '20px', color: '#fff' }}>
                  {expandedCard === index ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </IconButton>
                <Collapse in={expandedCard === index}>
                  <Box sx={{ marginTop: '20px' }}>
                    {/* Slide or additional content goes here */}
                    <Slider {...settings}>
                      <div>
                        <Typography variant="body1" sx={{ color: '#fff' }}>More detail about this testimonial...</Typography>
                      </div>
                      <div>
                        <Typography variant="body1" sx={{ color: '#fff' }}>Another slide with more content...</Typography>
                      </div>
                    </Slider>
                  </Box>
                </Collapse>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default TestimonialsSection;
