import React from 'react';
import { Dialog, DialogContent } from '@mui/material';

const MagnifyImage = ({ src, onClose }) => {
  return (
    <Dialog open={true} onClose={onClose} maxWidth="md">
      <DialogContent>
        <img 
          src={src} 
          alt="Magnified View" 
          style={{ 
            width: '100%', 
            height: 'auto', 
            borderRadius: '10px' 
          }} 
        />
      </DialogContent>
    </Dialog>
  );
};

export default MagnifyImage;
