import React, { useState } from 'react';
import { Typography, Slider, Box, FormControl } from '@mui/material';

const SliderQuestion = ({ data, onAnswerSelected }) => {
    const [value, setValue] = useState(0);

    const handleSliderChange = (event, newValue) => {
        setValue(newValue);
        onAnswerSelected(newValue); // Notify parent component of the selection
    };

    const sliderMarks = [
        {
            value: 10,
            label: `Low ${data.attributeTested}`,
        },
        {
            value: 50,
            label: `Neutral ${data.attributeTested}`,
        },
        {
            value: 90,
            label: `High ${data.attributeTested}`,
        },
    ];

    return (
        <FormControl component="fieldset" fullWidth>
            <Typography variant="h6" gutterBottom sx={{ textAlign: 'center' }}>
                {data.question}
            </Typography>
            <Box sx={{ padding: 2 }}>
                <Slider
                    value={value}
                    onChange={handleSliderChange}
                    aria-labelledby="slider-question"
                    valueLabelDisplay="auto"
                    step={1}
                    marks={sliderMarks}
                    min={0}
                    max={100}
                />
            </Box>
        </FormControl>
    );
};

export default SliderQuestion;
