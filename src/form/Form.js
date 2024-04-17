import React, { useState, useEffect } from 'react';
import { Paper, Button, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { writeData, readData } from '../database';  
import { v4 as uuidv4 } from 'uuid';

function Form() {
  const [samplesPerPanelist, setSamplesPerPanelist] = useState(0);
  const [sensoryQuestions, setSensoryQuestions] = useState([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    readData('samples_per_panelist', (data) => {
      if (data) {
        setSamplesPerPanelist(data);
      }
    });
    readData('sensory_questions', setSensoryQuestions);
  }, []);

  const formatDate = () => {
    const date = new Date();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    const yyyy = date.getFullYear();
    return `${mm}${dd}${yyyy}`;
  };

  const uploadLocalStorageData = () => {
    const keysToUpload = ["panelistId", "ethnicity", "selectedSample", "age", "race", "blueberryConsumption", "selectedGender"];
    const dataToUpload = {};
  
    keysToUpload.forEach(key => {
      const value = localStorage.getItem(key);
      if (value !== null) {
        dataToUpload[key] = value;
      }
    });
  
    sensoryQuestions.forEach(question => {
      const attributeValue = localStorage.getItem(question.attributeTested);
      if (attributeValue) {
        dataToUpload[question.attributeTested] = attributeValue;
      }
    });
  
    const dateKey = `sensorypanel_${formatDate()}/${uuidv4()}`; 
    writeData(dateKey, dataToUpload);
  };  

  const handleNextSample = () => {
    uploadLocalStorageData();
    navigate('/sample');
    sensoryQuestions.forEach(question => {
        localStorage.removeItem(question.attributeTested);
    });
    localStorage.removeItem("selectedSample");
  };

  const handleCompleteAll = () => {
    uploadLocalStorageData();
    localStorage.clear();
    navigate('/');
  };

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
          Progress Check
        </Typography>
        <Typography variant="h4" sx={{ textAlign: 'center', marginBottom: '20px' }}>
          You have just completed the review of sample {localStorage.getItem('selectedSample')}. Today you are scheduled to review {samplesPerPanelist} samples in total.
        </Typography>
        <Typography variant="h4" sx={{ textAlign: 'center', marginBottom: '20px' }}>
          If you are ready for your next sample, turn on the red light in your booth to let the team know.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={handleNextSample}
          sx={{ marginTop: 2 }}
        >
          Next Sample
        </Button>
        <Button
          variant="contained"
          color="secondary"
          size="large"
          onClick={handleCompleteAll}
          sx={{ marginTop: 11 }}
        >
          I've completed all {samplesPerPanelist} sample reviews
        </Button>
      </Box>
    </Paper>
  );
}

export default Form;
