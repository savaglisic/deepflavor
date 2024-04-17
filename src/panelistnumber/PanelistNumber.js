import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import {
  Typography, 
  TextField, 
  Button, 
  Box, 
  Paper, // Use Paper for consistent styling
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
    if (!panelistId || isNaN(panelistId) || Number(panelistId) >= 300 || Number(panelistId) <= 0) {
      setOpenDialog(true);
    } else {
      localStorage.setItem('panelistId', panelistId);
      navigate('/demographics');
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    inputRef.current.focus();
  };

  return (
    <Paper elevation={3} sx={{ margin: 'auto', padding: 4, maxWidth: '720px', marginTop: 8, minHeight: '100vh' }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
        }}
      >
        <Typography variant="h5" gutterBottom>
          Panelist Information
        </Typography>
        <Typography 
          variant="body1" 
          component="p" 
          color="error" 
          gutterBottom 
          sx={{ fontSize: '1.4rem', marginBottom: '20px', textAlign: 'center' }}
        >
          Please enter your two or three digit PANELIST ID number.
        </Typography>
        <TextField
          variant="outlined"
          placeholder="Panelist ID"
          margin="normal"
          sx={{
            width: '250px', // Adjust width for better visual balance
            '& .MuiInputBase-input': {
              height: '2.5rem',
              fontSize: '1.2rem',
            },
          }}
          value={panelistId}
          onChange={(e) => setPanelistId(e.target.value)}
          inputRef={inputRef}
        />
        <Button variant="contained" color="primary" onClick={handleContinueClick} sx={{ marginTop: 2, fontSize: '1.2rem' }}>
          Continue
        </Button>

        {/* Dialog component for validation errors */}
        <Dialog
          open={openDialog}
          onClose={handleCloseDialog}
        >
          <DialogTitle>{"Invalid Panelist ID"}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              That's not the number we're looking for. Try again, or ask a team member for help.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="primary">
              Try Again
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Paper>
  );
}

export default PanelistNumber;
