import React from 'react';
import { Typography, Box } from '@mui/material';

const PanelistInstruction = ({ data }) => {
  return (
    <Box sx={{ width: '100%', textAlign: 'center', my: 2 }}>
      <Typography variant="h4">
        {data.question}
      </Typography>
    </Box>
  );
};

export default PanelistInstruction;
