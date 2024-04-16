import React, { useState } from 'react';
import Webcam from 'react-webcam';
import { Button, Box, Paper, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom'; 

function Camera() {
  const [isCameraReady, setIsCameraReady] = useState(false);
  const navigate = useNavigate();

  const videoConstraints = {
    width: 720,
    height: 720,
    facingMode: "user"
  };

  const handleCameraStart = () => {
    setIsCameraReady(true);
  };

  const handleSubmit = () => {
    navigate('/sample');
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
          Camera View
        </Typography>
        <Typography variant="body1" sx={{ textAlign: 'center', marginBottom: '20px' }}>
          Please make sure your face is centered in the camera view, if not, 
          please adjust your seating position or the monitor.
        </Typography>
        <Webcam
          audio={false}
          height={videoConstraints.height / 1.3} // Reduce scale by 2
          width={videoConstraints.width / 1.3} // Reduce scale by 2
          videoConstraints={videoConstraints}
          onUserMedia={handleCameraStart}
          screenshotFormat="image/jpeg"
          style={{ borderRadius: '10px', marginBottom: '20px' }}
        />
        <Button variant="contained" size="large" disabled={!isCameraReady} onClick={handleSubmit}>
          Continue
        </Button>
      </Box>
    </Paper>
  );
}

export default Camera;
