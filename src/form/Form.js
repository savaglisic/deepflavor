import React, { useState, useEffect } from 'react';
import { Paper, Button, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { writeData, readData } from '../database';  
import { v4 as uuidv4 } from 'uuid';


function Form() {
  const [samplesPerPanelist, setSamplesPerPanelist] = useState(0);
  const [panelistProgress, setPanelistProgress] = useState(localStorage.getItem('panelistProgress'));
  const [sensoryQuestions, setSensoryQuestions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    readData('samples_per_panelist', (data) => {
      if (data) {
        setSamplesPerPanelist(data);
        if (!panelistProgress) {
          localStorage.setItem('panelistProgress', '2');
          setPanelistProgress('2');
        }
      }
    });

    readData('sensory_questions', (data) => {
        if (data) {
          setSensoryQuestions(data);
        }
      });
  }, [panelistProgress]);

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

  const handleContinue = () => {
    if (parseInt(panelistProgress, 10) > samplesPerPanelist) {
        uploadLocalStorageData();
        localStorage.clear();
        navigate('/');
    } else {
        uploadLocalStorageData();
        sensoryQuestions.forEach(question => {
            localStorage.removeItem(question.attributeTested);
        });
        localStorage.removeItem("selectedSample");
        navigate('/sample');
        const nextProgress = parseInt(panelistProgress, 10) + 1;
        localStorage.setItem('panelistProgress', nextProgress.toString());
        setPanelistProgress(nextProgress.toString());
    }
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
          {parseInt(panelistProgress, 10) >= samplesPerPanelist ?
            "You have reviewed all samples, please click the red button below to save and exit." :
            `Please activate the red light to let the team know you're ready for sample ${panelistProgress} of ${samplesPerPanelist}.`
          }
        </Typography>
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={handleContinue}
          sx={{ marginTop: 2 }}
        >
          {parseInt(panelistProgress, 10) >= samplesPerPanelist ? "Save and Exit" : "Continue"}
        </Button>
      </Box>
    </Paper>
  );
}

export default Form;
