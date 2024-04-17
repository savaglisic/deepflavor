import React, { useState } from 'react';
import { Typography, Radio, RadioGroup, FormControlLabel, FormControl } from '@mui/material';

const RatingQuestion = ({ data, onAnswerSelected }) => {
    const [selectedValue, setSelectedValue] = useState('');

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
    onAnswerSelected(event.target.value); // Notify parent component of the selection
  };

  const ratingLabels = [
    "Dislike Extremely",
    "Dislike Very Much",
    "Dislike Moderately",
    "Dislike Slightly",
    "Neither Like nor Dislike",
    "Like Slightly",
    "Like Moderately",
    "Like Very Much",
    "Like Extremely"
  ];

  return (
    <FormControl component="fieldset">
      <Typography variant="h6" gutterBottom>
        {data.question}
      </Typography>
      <RadioGroup value={selectedValue} onChange={handleChange}>
        {ratingLabels.map((label, index) => (
          <FormControlLabel
            key={index}
            value={String(index + 1)}
            control={<Radio />}
            label={`(${index + 1}) - ${label}`}
            sx={{ marginY: 0.5 }}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};

export default RatingQuestion;
