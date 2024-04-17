import React, { useState, useEffect } from 'react';
import { readData, writeData } from '../database';
import { Paper, Button, Box, Typography } from '@mui/material';
import RatingQuestion from './RatingQuestion';
import MultipleChoiceQuestion from './MultipleChoiceQuestion';
import SliderQuestion from './SliderQuestion';
import LongFormTextResponse from './LongFormTextResponse';
import PanelistInstruction from './PanelistInstruction';
import { useNavigate } from 'react-router-dom';

function Questions() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const panelistId = localStorage.getItem('panelistId');
  const selectedSample = localStorage.getItem('selectedSample');
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const navigate = useNavigate();
  const [stopwatchStartTime, setStopwatchStartTime] = useState(null);
  const [interactionTimestamps, setInteractionTimestamps] = useState([]);

  useEffect(() => {
    const panelistId = localStorage.getItem('panelistId');
    const selectedSample = localStorage.getItem('selectedSample');

    if (!panelistId || !selectedSample) {
      localStorage.clear();
      navigate('/');
    } else {
      readData('sensory_questions', (data) => {
        setQuestions(data);
      });
    }
  }, [navigate]);

  const formatDate = () => {
    const date = new Date();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    const yyyy = date.getFullYear();
    return `${mm}${dd}${yyyy}`;
  };

  const handleContinue = () => {
    const currentQuestion = questions[currentQuestionIndex];
    const currentTimestamp = new Date().getTime() - stopwatchStartTime;
  
    if (currentQuestion.selectedQuestionType === 'Non Question Panelist Instruction' || selectedAnswer) {
      if (selectedAnswer) {
        localStorage.setItem(currentQuestion.attributeTested, selectedAnswer);
        console.log(currentQuestion.attributeTested + " = " + localStorage.getItem(currentQuestion.attributeTested));
  
        if (currentQuestion.videoCapture) {
          writeData(`sensory_times_${formatDate()}/${currentQuestion.attributeTested}_${localStorage.getItem('panelistId')}_${localStorage.getItem('selectedSample')}`, {
            interactionTimestamps: interactionTimestamps.join(', '),
            timeSpent: currentTimestamp.toString(),
          });
        }
      }
      if (currentQuestionIndex >= questions.length - 1) {
        navigate('/form');
      } else {
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
        setSelectedAnswer('');
        startStopwatch();
      }
    }
  };
  

  const handleAnswerSelected = (value) => {
    const currentTimestamp = new Date().getTime() - stopwatchStartTime;
    setInteractionTimestamps([...interactionTimestamps, currentTimestamp.toString()]);
    setSelectedAnswer(value);
  };

  const startStopwatch = () => {
    setStopwatchStartTime(new Date().getTime());
    setInteractionTimestamps([]);
  };

  const renderQuestion = (questionData) => {
    switch (questionData.selectedQuestionType) {
      case 'Rating 1-9 - Dislike to Like':
        return <RatingQuestion key={`rating-${currentQuestionIndex}`} data={questionData} onAnswerSelected={handleAnswerSelected} />;
      case 'Custom Multiple Choice':
        return <MultipleChoiceQuestion key={`multiple-choice-${currentQuestionIndex}`} data={questionData} onAnswerSelected={handleAnswerSelected} />;
      case 'Slider 0-100 - Low to High':
        return <SliderQuestion key={`slider-${currentQuestionIndex}`} data={questionData} onAnswerSelected={handleAnswerSelected} />;
      case 'Long Form Text Response':
        return <LongFormTextResponse key={`long-form-${currentQuestionIndex}`} data={questionData} onAnswerSelected={handleAnswerSelected} />;
      case 'Non Question Panelist Instruction':
        return <PanelistInstruction key={`instruction-${currentQuestionIndex}`} data={questionData} />;
      default:
        return <Typography variant="body1">Unknown Question Type</Typography>;
    }
  };

  const currentQuestion = questions[currentQuestionIndex];
  const isPanelistInstruction = currentQuestion?.selectedQuestionType === 'Non Question Panelist Instruction';

  useEffect(() => {
    if (currentQuestionIndex === 0) {
      startStopwatch();
    }
  }, [currentQuestionIndex]);

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
        <Button
          variant="contained"
          size="large"
          onClick={handleContinue}
          sx={{ marginTop: 2 }}
          disabled={!selectedAnswer && !isPanelistInstruction}
        >
          {currentQuestionIndex < questions.length - 1 ? "Continue" : "Finish"}
        </Button>
      </Box>
    </Paper>
  );
}

export default Questions;

