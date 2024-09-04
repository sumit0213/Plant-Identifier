import React from 'react';
import { AppBar, Toolbar, Typography, Button, Tooltip, IconButton, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useTheme, useMediaQuery } from '@mui/material';

const NavigationBar = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const menuItems = [
    { label: 'Contact Us', route: '/contact' },
    { label: 'About Us', route: '/about' },
    { label: 'References', route: '/references' },
    { label: 'Donate Us', route: '/donate' },
    { label: 'Home Page', route: '/' },
    { label: 'GGU Web Link', link: 'https://www.ggu.ac.in/' },
  ];

  return (
    <AppBar position="static" color="transparent" elevation={0} sx={{ backgroundColor: '#1A237E' }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1, color: '#fff', fontFamily: 'Poppins, sans-serif' }}>
          Vaultflow
        </Typography>

        {isMobile ? (
          <>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ color: 'yellow' }}
              onClick={handleMenuOpen}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              {menuItems.map((item, index) => (
                <MenuItem
                  key={index}
                  onClick={() => {
                    handleMenuClose();
                    item.route ? navigate(item.route) : window.open(item.link, '_blank');
                  }}
                >
                  {item.label}
                </MenuItem>
              ))}
              <MenuItem onClick={handleMenuClose}>Search</MenuItem>
            </Menu>
          </>
        ) : (
          <>
            {menuItems.map((item, index) => (
              <Tooltip title={item.label} key={index}>
                <Button
                  color="inherit"
                  onClick={() => item.route ? navigate(item.route) : window.open(item.link, '_blank')}
                  sx={{
                    color: 'yellow',
                    '&:hover': {
                      color: '#ffcc00',
                      transform: 'scale(1.1)',
                    },
                    transition: 'transform 0.2s',
                  }}
                >
                  {item.label}
                </Button>
              </Tooltip>
            ))}
            <Button
              color="inherit"
              sx={{
                color: 'yellow',
                '&:hover': {
                  color: '#ffcc00',
                  transform: 'scale(1.1)',
                },
                transition: 'transform 0.2s',
              }}
            >
              Search
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default NavigationBar;
