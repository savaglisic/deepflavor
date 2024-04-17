import React from 'react';
import { Button, Typography, Paper, Box, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function HomePage() {
    const navigate = useNavigate();

    const handleGetStartedClick = () => {
        navigate('/panelist'); // Navigate to the PanelistNumber page
    };

    const handleClearLocalStorage = () => {
        localStorage.clear(); // Clears the local storage
        console.log('Local storage cleared'); // Optional: for debugging
    };

    return (
      <Paper 
        elevation={3} 
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          padding: 4,
          position: 'relative' // Position relative for absolute positioning of the icon and button
        }}
      >
        <IconButton 
          onClick={handleClearLocalStorage}
          sx={{
            position: 'absolute',
            left: 20, // Distance from the left
            bottom: 20, // Distance from the bottom
            color: 'gray' // Icon color
          }}
        >
        </IconButton>

        <Box sx={{ textAlign: 'center', marginBottom: 4 }}>
          <img src="/assets/ailogo.png" alt="DeepFlavor and University of Florida Logos" style={{ width: '100%', height: 'auto', marginBottom: '20px' }} />
          <Typography variant="h4" gutterBottom sx={{ color: '#333', fontWeight: 'bold' }}>
            Blueberry Flavor Panel
          </Typography>
        </Box>
        <Button
            variant="contained"
            onClick={handleGetStartedClick}
            sx={{
              backgroundColor: '#618dde',
              borderRadius: '20px',
              padding: '10px 30px',
              fontSize: '1.5rem',
              textTransform: 'none',
              '&:hover': {
                backgroundColor: '#5071bf',
              }
            }}
          >
            Get Started
          </Button>

        <Button
            variant="contained"
            onClick={handleClearLocalStorage}
            sx={{
              position: 'absolute',
              bottom: 40, // Distance from the bottom
              backgroundColor: '#ff6868', // Reddish tone for emphasis
              color: 'white', // White text
              '&:hover': {
                backgroundColor: '#ff5a5a', // Slightly lighter red on hover
              }
            }}
          >
            Clear Cache
          </Button>
      </Paper>
    );
}

export default HomePage;
