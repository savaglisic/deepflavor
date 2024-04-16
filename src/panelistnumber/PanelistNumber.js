import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import {
  Typography, 
  TextField, 
  Button, 
  Box, 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogContentText, 
  DialogActions
} from '@mui/material';

function PanelistNumber() {
  const [panelistId, setPanelistId] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const inputRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    const savedId = localStorage.getItem('panelistId');
    if (savedId) {
      setPanelistId(savedId);
    }
  }, []);

  const handleContinueClick = () => {
    // Check if the value is not empty, contains only numbers, and is less than 300
    if (!panelistId || isNaN(panelistId) || Number(panelistId) >= 300 || Number(panelistId) <= 0) {
      setOpenDialog(true); // If the check fails, open the dialog
    } else {
      localStorage.setItem('panelistId', panelistId);
      console.log("Panelist ID is valid:", panelistId);
      navigate('/demographics');
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false); // Close the dialog
    inputRef.current.focus(); // Focus back on the input field
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <Typography variant="h4" component="h2" color="textPrimary" gutterBottom>
        Panelist Information
      </Typography>
      <Typography 
        variant="body1" 
        component="p" 
        color="error" 
        gutterBottom 
        sx={{ fontSize: '2.2rem', marginBottom: '20px' }}
      >
        Please enter your two or three digit PANELIST ID number.
      </Typography>
      <TextField
        variant="outlined"
        placeholder="Panelist ID"
        margin="normal"
        sx={{
          width: '11%', // Adjust width as needed
          '.MuiInputBase-input': {
            height: '2.5rem', // Adjust height as needed
            fontSize: '1.8rem', // Adjust font size as needed
            padding: '10px',
          },
        }}
        value={panelistId}
        onChange={(e) => setPanelistId(e.target.value)}
        inputRef={inputRef}
      />
      <Button variant="contained" color="primary" onClick={handleContinueClick}>
        Continue
      </Button>

      {/* Dialog component for the popup message */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
      >
        <DialogTitle>
          Oops, that's not the number we're looking for.
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ margin: '20px' }}> {/* Added padding */}
            Your panelist ID number is usually a number between 1 and 100. Please ask one of the lab employees if you're unsure of your pre-assigned number.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Try Again
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default PanelistNumber;


