import React, { useState } from 'react';
import { Typography, TextField, Box, FormControl } from '@mui/material';

const LongFormTextResponse = ({ data, onAnswerSelected }) => {
    const [textValue, setTextValue] = useState('');

    const handleChange = (event) => {
        setTextValue(event.target.value);
        onAnswerSelected(event.target.value);  // Notify parent component of the selection
    };

    return (
        <FormControl component="fieldset" fullWidth>
            <Typography variant="h6" gutterBottom sx={{ textAlign: 'center' }}>
                {data.question}
            </Typography>
            <Box sx={{ padding: 2 }}>
                <TextField
                    fullWidth
                    multiline
                    rows={4}
                    variant="outlined"
                    value={textValue}
                    onChange={handleChange}
                    placeholder="Type your response here..."
                    sx={{
                        '& .MuiInputBase-input': {
                            fontSize: '1.25rem', // Large font size for the input area
                        }
                    }}
                />
            </Box>
        </FormControl>
    );
};

export default LongFormTextResponse;
