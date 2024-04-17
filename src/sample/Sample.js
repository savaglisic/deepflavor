import React, { useState, useEffect } from 'react';
import { Paper, Button, Box, Typography, TextField } from '@mui/material';
import { readData } from '../database';
import { useNavigate } from 'react-router-dom'; 

function Sample() {
  const [sampleNumbers, setSampleNumbers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSample, setSelectedSample] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const requiredKeys = ["panelistId", "ethnicity", "age", "race", "blueberryConsumption", "selectedGender"];
    const allItemsPresent = requiredKeys.every(key => localStorage.getItem(key) !== null);

    if (!allItemsPresent) {
      localStorage.clear();
      navigate('/panelist');
    } else {
      readData('sensory_sample_nums', (data) => {
        const samples = data ? data.split(',') : [];
        setSampleNumbers(samples);
      });
      const storedSelectedSample = localStorage.getItem('selectedSample');
      if (storedSelectedSample) {
        setSelectedSample(storedSelectedSample);
      }
    }
  }, [navigate]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSampleSelect = (number) => {
    setSelectedSample(number);
  };

  const handleContinue = () => {
    localStorage.setItem('selectedSample', selectedSample);
    navigate('/questions');
  };

  const filteredSamples = sampleNumbers.filter((number) =>
    number.includes(searchTerm)
  );

  return (
    <Paper elevation={3} sx={{ margin: 'auto', padding: 4, maxWidth: '720px', marginTop: 8 }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
        }}
      >
        <Typography variant="h5" gutterBottom>
          Sample Selection
        </Typography>
        <Typography variant="h6" gutterBottom>
          Select the sample number written on the cup you received.
        </Typography>
        <TextField
          variant="outlined"
          placeholder="Search Sample Number"
          sx={{ marginBottom: 4 }}
          value={searchTerm}
          onChange={handleSearchChange}
          fullWidth
        />
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: 2,
            marginBottom: '20px',
          }}
        >
          {filteredSamples.map((number) => (
            <Button
              key={number}
              variant={selectedSample === number ? 'contained' : 'outlined'}
              color={selectedSample === number ? 'primary' : 'secondary'}
              size="large"
              sx={{ fontSize: '1.25rem' }}
              onClick={() => handleSampleSelect(number)}
            >
              {number}
            </Button>
          ))}
        </Box>
        <Button 
          variant="contained" 
          size="large" 
          disabled={!selectedSample}
          onClick={handleContinue}
        >
          Continue
        </Button>
      </Box>
    </Paper>
  );
}

export default Sample;


