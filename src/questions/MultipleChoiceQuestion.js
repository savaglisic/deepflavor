import React, { useState } from 'react';
import { Typography, Radio, RadioGroup, FormControlLabel, FormControl } from '@mui/material';

const MultipleChoiceQuestion = ({ data, onAnswerSelected }) => {
    const [selectedValue, setSelectedValue] = useState('');

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
        onAnswerSelected(event.target.value); // Notify parent component of the selection
    };

    // Split the customAnswerChoices string into an array of choices
    const choices = data.customAnswerChoices.split(',').map(choice => choice.trim());

    return (
        <FormControl component="fieldset">
            <Typography variant="h6" gutterBottom>
                {data.question}
            </Typography>
            <RadioGroup value={selectedValue} onChange={handleChange}>
                {choices.map((choice, index) => (
                    <FormControlLabel
                        key={index}
                        value={choice}
                        control={<Radio />}
                        label={choice}
                        sx={{ marginY: 0.5 }}
                    />
                ))}
            </RadioGroup>
        </FormControl>
    );
};

export default MultipleChoiceQuestion;
