import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import {
  Typography, 
  FormControl, 
  FormControlLabel, 
  RadioGroup, 
  Radio, 
  TextField, 
  Button, 
  Box,
  Paper,
  Dialog,
  DialogTitle, // Make sure to import DialogTitle
  DialogContent,
  DialogActions
} from '@mui/material';

function Demographics() {
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const [ethnicBackground, setEthnicBackground] = useState('');
  const [racialIdentity, setRacialIdentity] = useState('');
  const [blueberryConsumption, setBlueberryConsumption] = useState('');
  const [openErrorDialog, setOpenErrorDialog] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedGender = localStorage.getItem('selectedGender');
    if (storedGender) setGender(storedGender);

    const storedAge = localStorage.getItem('age');
    if (storedAge) setAge(storedAge);

    const storedEthnicity = localStorage.getItem('ethnicity');
    if (storedEthnicity) setEthnicBackground(storedEthnicity);

    const storedRace = localStorage.getItem('race');
    if (storedRace) setRacialIdentity(storedRace);

    const storedBlueberryConsumption = localStorage.getItem('blueberryConsumption');
    if (storedBlueberryConsumption) setBlueberryConsumption(storedBlueberryConsumption);
  }, []);

  const validateForm = () => {
    return gender && age && ethnicBackground && racialIdentity && blueberryConsumption;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      localStorage.setItem('selectedGender', gender);
      localStorage.setItem('age', age);
      localStorage.setItem('ethnicity', ethnicBackground);
      localStorage.setItem('race', racialIdentity);
      localStorage.setItem('blueberryConsumption', blueberryConsumption);

      console.log("Demographics saved:", { gender, age, ethnicBackground, racialIdentity, blueberryConsumption });
      navigate('/camera');
    } else {
      setOpenErrorDialog(true); // Open the error dialog if validation fails
    }
  };

  const handleCloseErrorDialog = () => {
    setOpenErrorDialog(false);
  };

  return (
    <Paper elevation={3} sx={{ margin: 'auto', padding: 4, maxWidth: 600, marginTop: 8 }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          '& .MuiFormControl-root': { margin: '20px 0', width: '100%' },
          '& .MuiButton-root': { margin: '20px 0' },
        }}
      >
        <Typography variant="h5" component="h1" gutterBottom>
          Demographic Information
        </Typography>

        <FormControl component="fieldset" fullWidth>
          <Typography>Please Indicate your gender.</Typography>
          <RadioGroup
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <FormControlLabel value="Male" control={<Radio />} label="Male" />
            <FormControlLabel value="Female" control={<Radio />} label="Female" />
            <FormControlLabel value="I prefer not to say" control={<Radio />} label="I prefer not to say" />
          </RadioGroup>
        </FormControl>

        <TextField
          fullWidth
          label="Please indicate your age."
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          InputProps={{ inputProps: { min: 0 } }}
        />

        <FormControl component="fieldset" fullWidth>
          <Typography>What is your ethnic background?</Typography>
          <RadioGroup
            value={ethnicBackground}
            onChange={(e) => setEthnicBackground(e.target.value)}
          >
            <FormControlLabel value="Hispanic" control={<Radio />} label="Hispanic" />
            <FormControlLabel value="Non-Hispanic" control={<Radio />} label="Non-Hispanic" />
          </RadioGroup>
        </FormControl>

        <FormControl component="fieldset" fullWidth>
          <Typography>Which of the following best describes you?</Typography>
          <RadioGroup
            value={racialIdentity}
            onChange={(e) => setRacialIdentity(e.target.value)}
          >
            <FormControlLabel value="Asian/Pacific Islander" control={<Radio />} label="Asian/Pacific Islander" />
            <FormControlLabel value="Black or African American" control={<Radio />} label="Black or African American" />
            <FormControlLabel value="White or Caucasian" control={<Radio />} label="White or Caucasian" />
            <FormControlLabel value="Native American/Alaska Native/ Aleutian" control={<Radio />} label="Native American/Alaska Native/ Aleutian" />
            <FormControlLabel value="Other" control={<Radio />} label="Other" />
          </RadioGroup>
        </FormControl>

        <FormControl component="fieldset" fullWidth>
          <Typography>How often do you eat fresh blueberries?</Typography>
          <RadioGroup
            value={blueberryConsumption}
            onChange={(e) => setBlueberryConsumption(e.target.value)}
          >
            <FormControlLabel value="Once a day" control={<Radio />} label="Once a day" />
            <FormControlLabel value="2-3 times a week" control={<Radio />} label="2-3 times a week" />
            <FormControlLabel value="Once a week" control={<Radio />} label="Once a week" />
            <FormControlLabel value="2-3 times a month" control={<Radio />} label="2-3 times a month" />
            <FormControlLabel value="Once per month" control={<Radio />} label="Once per month" />
            <FormControlLabel value="Twice per year" control={<Radio />} label="Twice per year" />
            <FormControlLabel value="Once per year" control={<Radio />} label="Once per year" />
            <FormControlLabel value="Never or Almost never" control={<Radio />} label="Never or Almost never" />
          </RadioGroup>
        </FormControl>

        <Button variant="contained" size="large" onClick={handleSubmit}>
          Submit
        </Button>
      </Box>
      <Dialog
        open={openErrorDialog}
        onClose={handleCloseErrorDialog}
      >
        <DialogTitle>
          Incomplete Form
        </DialogTitle>
        <DialogContent>
          <Typography>
            Oops, please fill in all fields before submitting.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseErrorDialog}>Ok</Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
}
export default Demographics;
