import React from 'react';
import { Container, Grid, Paper, Typography } from '@mui/material';
import flowerImage from 'C:/Users/Crio/my-react-app/src/Asset/flower2.png';
import fruitImage from 'C:/Users/Crio/my-react-app/src/Asset/fruit.png';
import leafImage from 'C:/Users/Crio/my-react-app/src/Asset/Leaf2.png';
import barkImage from 'C:/Users/Crio/my-react-app/src/Asset/Bark1.png';

const CardSection = ({ cards, handleCardClick }) => {
  return (
    <Container sx={{
      marginTop: '40px',
      background: 'linear-gradient(to top, #000 50%, #fff 50%)' 
    }}>
      <Typography
        variant="h4"
        component="h2"
        gutterBottom
        sx={{
          textAlign: 'center',
          fontWeight: 'bold',
          fontFamily: 'Poppins, sans-serif',
          color: '#2c3e50',
          textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
        }}
      >
        Make Your Plant Selections
      </Typography>
      <Typography
        variant="body1"
        component="p"
        sx={{
          textAlign: 'center',
          marginBottom: '40px',
          fontFamily: 'Poppins, sans-serif',
          color: '#34495e',
          textShadow: '1px 1px 3px rgba(0,0,0,0.2)',
        }}
      >
        "There is no one who loves pain itself, who seeks after it and wants to have it, simply because it is pain..."
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {cards.map((card, index) => {
          let cardImage;
          switch (card.name) {
            case 'Flower':
              cardImage = flowerImage;
              break;
            case 'Fruit':
              cardImage = fruitImage;
              break;
            case 'Leaf':
              cardImage = leafImage;
              break;
            case 'Bark':
              cardImage = barkImage;
              break;
            default:
              cardImage = "https://via.placeholder.com/150";
          }

          return (
            <Grid item key={index} xs={12} sm={6} md={3}>
              <Paper
                elevation={5}
                sx={{
                  textAlign: 'center',
                  padding: '20px',
                  background: 'linear-gradient(135deg, #72edf2 10%, #5151e5 100%)',
                  cursor: 'pointer',
                  borderRadius: '15px',
                  boxShadow: '0 8px 15px rgba(0, 0, 0, 0.2)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #ff9a9e 10%, #fad0c4 100%)',
                    color: '#fff',
                    transform: 'scale(1.1) rotate(1deg)',
                    boxShadow: '0 12px 25px rgba(0, 0, 0, 0.3)',
                  },
                  transition: 'transform 0.4s, background 0.4s, box-shadow 0.4s',
                }}
                onClick={() => handleCardClick(card.route)}
              >
                <img
                  src={cardImage}
                  alt={card.name}
                  style={{
                    marginBottom: '20px',
                    width: '100%',
                    borderRadius: '15px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                    transition: 'transform 0.4s',
                    '&:hover': {
                      transform: 'scale(1.1)',
                    },
                  }}
                />
                <Typography
                  variant="h6"
                  component="div"
                  sx={{
                    fontWeight: 'bold',
                    fontFamily: 'Poppins, sans-serif',
                    color: '#fff',
                    textShadow: '1px 1px 3px rgba(0,0,0,0.2)',
                  }}
                >
                  {card.name}
                </Typography>
                <Typography
                  variant="body2"
                  component="p"
                  sx={{
                    fontFamily: 'Poppins, sans-serif',
                    color: '#f0f0f0',
                    fontSize: '0.9rem',
                    marginTop: '10px',
                  }}
                >
                  I am putting myself to the fullest possible use, which is all I think any conscious entity can ever
                  hope to do.
                </Typography>
              </Paper>
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
};

export default CardSection;
