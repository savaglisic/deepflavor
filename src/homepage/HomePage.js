import React from 'react';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import './HomePage.css'; // This will import the CSS for styling

function HomePage() {
    const navigate = useNavigate();

    const handleGetStartedClick = () => {
        navigate('/panelist'); // Navigate to the PanelistNumber page
  };

  return (
    <div className="home-container">
      <img src="/assets/ailogo.png" alt="DeepFlavor and University of Florida Logos" className="home-logo" />
      <h1 className="home-title">Blueberry Flavor Panel</h1>
      <Button
          variant="contained"
          onClick={handleGetStartedClick}
          sx={{
            backgroundColor: '#618dde', // Example color
            borderRadius: '20px',
            padding: '20px 60px',
            fontSize: '2em', // Larger font size for the text inside the button
            textTransform: 'none',
            '&:hover': {
              backgroundColor: '#d3a9d9', // Slightly lighter shade on hover
            },
            // Add additional styling if necessary
          }}
        >
          Get Started
        </Button>
    </div>
  );
}

export default HomePage;
