import React from 'react';
import { Container, Grid, Paper, Typography, Box } from '@mui/material';
import { motion } from 'framer-motion';
import alternatingImage1 from 'C:/Users/Crio/my-react-app/src/Asset/AlternatingSection1.png';
import alternatingImage2 from 'C:/Users/Crio/my-react-app/src/Asset/AlternatingSection2.png';

const AlternatingSection = ({ content }) => {
  const animationVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  };

  return (
    <Container sx={{
      marginTop: '32px',
      backgroundColor: '#000',
      minHeight: '900px' // Adjust this value as needed to increase the length
    }}>
      <Grid container spacing={4}>
        {content.map((item, index) => (
          <React.Fragment key={index}>
            {index % 2 === 0 ? (
              <>
                <Grid item xs={12} md={6}>
                  <motion.div
                    initial="hidden"
                    animate="visible"
                    transition={{ duration: 0.5 }}
                    variants={animationVariants}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <img
                        src={index === 0 ? alternatingImage1 : item.image}
                        alt={item.alt}
                        style={{
                          borderRadius: '15px',
                          marginRight: '20px',
                          width: '100%',
                          boxShadow: '0 8px 15px rgba(0, 0, 0, 0.2)',
                          transition: 'transform 0.4s',
                          '&:hover': {
                            transform: 'scale(1.1)',
                          },
                        }}
                      />
                    </Box>
                  </motion.div>
                </Grid>
                <Grid item xs={12} md={6}>
                  <motion.div
                    initial="hidden"
                    animate="visible"
                    transition={{ duration: 0.5 }}
                    variants={animationVariants}
                  >
                    <Paper
                      elevation={5}
                      sx={{
                        padding: '20px',
                        background: 'linear-gradient(135deg, #72edf2 10%, #5151e5 100%)',
                        borderRadius: '15px',
                        boxShadow: '0 8px 15px rgba(0, 0, 0, 0.2)',
                        '&:hover': {
                          background: 'linear-gradient(135deg, #ff9a9e 10%, #fad0c4 100%)',
                          transform: 'scale(1.1) rotate(1deg)',
                          transition: 'transform 0.4s, background 0.4s, box-shadow 0.4s',
                        },
                      }}
                    >
                      <Typography
                        variant="h4"
                        component="h2"
                        gutterBottom
                        sx={{
                          fontWeight: 'bold',
                          fontFamily: 'Poppins, sans-serif',
                          color: '#fff',
                          textShadow: '1px 1px 3px rgba(0,0,0,0.2)',
                        }}
                      >
                        {item.title}
                      </Typography>
                      <Typography variant="body1" component="p" sx={{ fontFamily: 'Poppins, sans-serif', color: '#f0f0f0' }}>
                        {item.text}
                      </Typography>
                    </Paper>
                  </motion.div>
                </Grid>
              </>
            ) : (
              <>
                <Grid item xs={12} md={6}>
                  <motion.div
                    initial="hidden"
                    animate="visible"
                    transition={{ duration: 0.5 }}
                    variants={animationVariants}
                  >
                    <Paper
                      elevation={5}
                      sx={{
                        padding: '20px',
                        background: 'linear-gradient(135deg, #72edf2 10%, #5151e5 100%)',
                        borderRadius: '15px',
                        boxShadow: '0 8px 15px rgba(0, 0, 0, 0.2)',
                        '&:hover': {
                          background: 'linear-gradient(135deg, #ff9a9e 10%, #fad0c4 100%)',
                          transform: 'scale(1.1) rotate(1deg)',
                          transition: 'transform 0.4s, background 0.4s, box-shadow 0.4s',
                        },
                      }}
                    >
                      <Typography
                        variant="h4"
                        component="h2"
                        gutterBottom
                        sx={{
                          fontWeight: 'bold',
                          fontFamily: 'Poppins, sans-serif',
                          color: '#fff',
                          textShadow: '1px 1px 3px rgba(0,0,0,0.2)',
                        }}
                      >
                        {item.title}
                      </Typography>
                      <Typography variant="body1" component="p" sx={{ fontFamily: 'Poppins, sans-serif', color: '#f0f0f0' }}>
                        {item.text}
                      </Typography>
                    </Paper>
                  </motion.div>
                </Grid>
                <Grid item xs={12} md={6}>
                  <motion.div
                    initial="hidden"
                    animate="visible"
                    transition={{ duration: 0.5 }}
                    variants={animationVariants}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <img
                        src={index === 1 ? alternatingImage2 : item.image}
                        alt={item.alt}
                        style={{
                          borderRadius: '15px',
                          marginRight: '20px',
                          width: '100%',
                          boxShadow: '0 8px 15px rgba(0, 0, 0, 0.2)',
                          transition: 'transform 0.4s',
                          '&:hover': {
                            transform: 'scale(1.1)',
                          },
                        }}
                      />
                    </Box>
                  </motion.div>
                </Grid>
              </>
            )}
          </React.Fragment>
        ))}
      </Grid>
    </Container>
  );
};

export default AlternatingSection;
