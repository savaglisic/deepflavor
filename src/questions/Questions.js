import React, { useState, useEffect } from 'react';
import { readData } from '../database';
import { Paper, Button, Box, Typography } from '@mui/material';
import RatingQuestion from './RatingQuestion';
import MultipleChoiceQuestion from './MultipleChoiceQuestion';
import SliderQuestion from './SliderQuestion';
import LongFormTextResponse from './LongFormTextResponse';
import PanelistInstruction from './PanelistInstruction';

function Questions() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const panelistId = localStorage.getItem('panelistId');
  const selectedSample = localStorage.getItem('selectedSample');
  const [selectedAnswer, setSelectedAnswer] = useState('');

  useEffect(() => {
    readData('sensory_questions', (data) => {
      setQuestions(data);
    });
  }, []);

  const handleContinue = () => {
    if (selectedAnswer) {
      // When continuing, save the answer to local storage
      const currentQuestion = questions[currentQuestionIndex];
      localStorage.setItem(currentQuestion.attributeTested, selectedAnswer);
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setSelectedAnswer(''); // Reset the selected answer for the next question
      console.log(currentQuestion.attributeTested + " = " + localStorage.getItem(currentQuestion.attributeTested));
    }
  };

  const handleAnswerSelected = (value) => {
    setSelectedAnswer(value);
  };

  const renderQuestion = (questionData) => {
    switch (questionData.selectedQuestionType) {
      case 'Rating 1-9 - Dislike to Like':
        return <RatingQuestion key={`rating-${currentQuestionIndex}`} data={questionData} onAnswerSelected={handleAnswerSelected} />;
      case 'Custom Multiple Choice':
        return <MultipleChoiceQuestion data={questionData} />;
      case 'Slider 0-100 - Low to High':
        return <SliderQuestion data={questionData} />;
      case 'Long Form Text Response':
        return <LongFormTextResponse data={questionData} />;
      case 'Non Question Panelist Instruction':
        return <PanelistInstruction data={questionData} />;
      default:
        return <Typography variant="body1">Unknown Question Type</Typography>;
    }
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <Paper elevation={3} sx={{ margin: 'auto', padding: 4, maxWidth: '720px', marginTop: 8 }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          paddingBottom: 4, // Added to ensure spacing at the bottom of the screen
        }}
      >
        <Typography variant="subtitle1" gutterBottom sx={{ width: '100%', textAlign: 'center' }}>
          Panelist ID: {panelistId} | Answer Based on Sample{' '}
          <span style={{ color: 'red' }}>{selectedSample}</span>
        </Typography>

        {currentQuestion && renderQuestion(currentQuestion)}
          {currentQuestionIndex < questions.length - 1 && (
            <Button 
              variant="contained" 
              size="large" 
              onClick={handleContinue}
              sx={{ marginTop: 2 }}
              disabled={!selectedAnswer} // Disable the button if no answer is selected
            >
              Continue
            </Button>
          )}
      </Box>
    </Paper>
  );
}

export default Questions;

