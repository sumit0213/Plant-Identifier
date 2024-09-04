import React from 'react';
import { Grid } from '@mui/material';
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

const position = [22.079625, 82.155431]; // Adjusted latitude and longitude for Bilaspur

const ContactMapInfo = () => {
  return (
    <Grid container spacing={2} style={{ height: 'auto', paddingTop: '20px' }}>
      <Grid item xs={12} style={{ height: '300px', minHeight: '300px' }}>
        <MapContainer center={position} zoom={15} style={{ height: '100%', width: '100%' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={position}>
            <Tooltip permanent>
              GGV, Koni, Bilaspur, C.G.
            </Tooltip>
          </Marker>
        </MapContainer>
      </Grid>
    </Grid>
  );
};

export default ContactMapInfo;
