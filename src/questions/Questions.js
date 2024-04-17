import React, { useState, useEffect, useCallback } from 'react';
import { readData, writeData, uploadFile } from '../database';
import { Paper, Button, Box, Typography } from '@mui/material';
import RatingQuestion from './RatingQuestion';
import MultipleChoiceQuestion from './MultipleChoiceQuestion';
import SliderQuestion from './SliderQuestion';
import LongFormTextResponse from './LongFormTextResponse';
import PanelistInstruction from './PanelistInstruction';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

function Questions() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const panelistId = localStorage.getItem('panelistId');
  const selectedSample = localStorage.getItem('selectedSample');
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const navigate = useNavigate();
  const [stopwatchStartTime, setStopwatchStartTime] = useState(null);
  const [interactionTimestamps, setInteractionTimestamps] = useState([]);
  const [mediaRecorder, setMediaRecorder] = useState(null);

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

  const handleContinue = async () => {
    const currentQuestion = questions[currentQuestionIndex];
    const currentTimestamp = new Date().getTime() - stopwatchStartTime;
  
    if (currentQuestion.selectedQuestionType === 'Non Question Panelist Instruction' || selectedAnswer) {
      if (selectedAnswer) {
        localStorage.setItem(currentQuestion.attributeTested, selectedAnswer);
        console.log(currentQuestion.attributeTested + " = " + localStorage.getItem(currentQuestion.attributeTested));
  
        if (currentQuestion.videoCapture) {
          await stopRecording();
          // Start uploading the video in the background
          uploadVideo(currentQuestion, currentTimestamp, interactionTimestamps);
        }
      }
      if (currentQuestionIndex >= questions.length - 1) {
        navigate('/form');
      } else {
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
        setSelectedAnswer('');
        startStopwatch();
        if (questions[currentQuestionIndex + 1]?.videoCapture) {
          startRecording();
        } else {
          stopRecording();
        }
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

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      // videoRef.current.srcObject = stream; // This line can be removed to stop showing the preview
      const recorder = new MediaRecorder(stream);
      setMediaRecorder(recorder);
      recorder.start();
    } catch (error) {
      console.error('Error starting video recording:', error);
    }
  };

  const stopRecording = useCallback(async () => {
    if (mediaRecorder && mediaRecorder.state === 'recording') {
      mediaRecorder.stop();
      mediaRecorder.stream.getTracks().forEach(track => track.stop()); // Stop each track on the stream
    }
  }, [mediaRecorder]); // Dependency on mediaRecorder  

  const uploadVideo = async (currentQuestion, currentTimestamp, interactionTimestamps) => {
    try {
      const blob = await new Promise((resolve) => {
        const chunks = [];
        mediaRecorder.addEventListener('dataavailable', (event) => {
          chunks.push(event.data);
        });
        mediaRecorder.addEventListener('stop', () => {
          resolve(new Blob(chunks, { type: mediaRecorder.mimeType }));
        });
      });
  
      uploadFile(`SensoryVideos_${formatDate()}/${currentQuestion.attributeTested}_${panelistId}_${selectedSample}_${uuidv4()}.webm`, blob)
        .then(videoUrl => {
          // Update the database entry with the video URL after successful upload
          writeData(`sensory_times_${formatDate()}/${currentQuestion.attributeTested}_${localStorage.getItem('panelistId')}_${localStorage.getItem('selectedSample')}`, {
            interactionTimestamps: interactionTimestamps.join(', '),
            timeSpent: currentTimestamp.toString(),
            videoUrl: videoUrl,
          });
        })
        .catch(error => {
          console.error('Error uploading video:', error);
        });
    } catch (error) {
      console.error('Error preparing video for upload:', error);
    }
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
      if (questions[currentQuestionIndex]?.videoCapture) {
        startRecording();
      }
    } else if (questions[currentQuestionIndex - 1]?.videoCapture && !questions[currentQuestionIndex]?.videoCapture) {
      stopRecording();
    }
  }, [currentQuestionIndex, questions, stopRecording]);

  return (
    <Paper elevation={3} sx={{ margin: 'auto', padding: 4, maxWidth: '720px', marginTop: 8 }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          paddingBottom: 4,
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
          {currentQuestionIndex < questions.length - 1 ? 'Continue' : 'Finish'}
        </Button>

        
      </Box>
    </Paper>
  );
}

export default Questions;