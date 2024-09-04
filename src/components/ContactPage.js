import React from 'react';
import NavigationBar from './NavigationBar';
import HeroSection from './HeroSection';
import FooterSection from './FooterSection';
import { Container, Paper, Typography, List, ListItem, ListItemIcon, ListItemText, Grid } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import FaxIcon from '@mui/icons-material/Print';
import EmailIcon from '@mui/icons-material/Email';
import { MapContainer, TileLayer, Marker, Tooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default icon issues in React-Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

const ContactPage = () => {
  return (
    <>
      <NavigationBar />
      <HeroSection />
      <Container maxWidth="lg" style={{ paddingTop: '20px', paddingBottom: '20px' }}>
        <Grid container spacing={2} style={{ height: 'auto' }}>
          <Grid item xs={12} md={6} style={{ height: '400px' }}>
            <MapContainer center={[22.079625, 82.155431]} zoom={15} style={{ height: '100%', width: '100%' }}>
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <Marker position={[22.079625, 82.155431]}>
                <Tooltip permanent>
                  GGV, Koni, Bilaspur, C.G.
                </Tooltip>
              </Marker>
            </MapContainer>
          </Grid>
          <Grid item xs={12} md={6} style={{ display: 'flex', alignItems: 'center' }}>
            <Paper elevation={4} style={{ width: '100%', padding: '20px', backgroundColor: '#003366', color: 'white', height: '100%' }}>
              <Typography variant="h4" style={{ color: 'white', marginBottom: '20px', fontSize: '24px' }}>
                Contact Info
              </Typography>
              <List>
                <ListItem style={{ padding: '10px 0' }}>
                  <ListItemIcon>
                    <LocationOnIcon style={{ color: 'white' }} />
                  </ListItemIcon>
                  <ListItemText 
                    primary="GGV, Koni, Bilaspur, (C.G.), India, 495009" 
                    primaryTypographyProps={{ style: { color: 'white', fontSize: '18px' } }}
                  />
                </ListItem>
                <ListItem style={{ padding: '10px 0' }}>
                  <ListItemIcon>
                    <PhoneIcon style={{ color: 'white' }} />
                  </ListItemIcon>
                  <ListItemText 
                    primary="REGISTRAR OFFICE 07752 - 260209" 
                    primaryTypographyProps={{ style: { color: 'white', fontSize: '18px' } }}
                  />
                </ListItem>
                <ListItem style={{ padding: '10px 0' }}>
                  <ListItemIcon>
                    <FaxIcon style={{ color: 'white' }} />
                  </ListItemIcon>
                  <ListItemText 
                    primary="FAX NUMBER 07752 - 260148" 
                    primaryTypographyProps={{ style: { color: 'white', fontSize: '18px' } }}
                  />
                </ListItem>
                <ListItem style={{ padding: '10px 0' }}>
                  <ListItemIcon>
                    <EmailIcon style={{ color: 'white' }} />
                  </ListItemIcon>
                  <ListItemText 
                    primary="EMAIL centraluniv@ggu.ac.in" 
                    primaryTypographyProps={{ style: { color: 'white', fontSize: '18px' } }}
                  />
                </ListItem>
              </List>
            </Paper>
          </Grid>
        </Grid>
      </Container>
      <FooterSection />
    </>
  );
};

export default ContactPage;
