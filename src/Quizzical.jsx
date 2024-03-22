import { DevTool } from '@hookform/devtools'
import CircularProgress from '@mui/material/CircularProgress'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { motion } from 'framer-motion'
import { decode } from 'html-entities'
import { nanoid } from 'nanoid'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import './App.css'
import Questions from './Questions'

const Quizzical = () => {
  const [start, setStart] = useState(false)
  const [correctAnswers, setCorrectAnswers] = useState(undefined)
  const [score, setScore] = useState(0)
  
  const { 
    register, 
    handleSubmit, 
    control, 
    formState: {errors, isSubmitSuccessful},
    reset,
  } = useForm()

  const fetchData = async () => {
    return await axios.get('https://opentdb.com/api.php?amount=5&type=multiple')
                        .then(response => {
                          setCorrectAnswers(response.data.results?.map(answer => decode(answer.correct_answer)))
                          return response.data.results
                        })
  }

  const { data, refetch, isPending, isRefetching } = useQuery({
    queryKey: ['question'],
    queryFn: fetchData,
    enabled: false
  })
  
  const startGame = () => {
    reset()
    refetch()
    setStart(true)
    setScore(0)  
  }

  const onSubmit = data => {
    correctAnswers?.map((answer, index) => {
      const userAnswer = decode(data[`answer${index + 1}`])
      if(userAnswer === answer) {
        setScore(prevScore => prevScore + 1)
      }
    })
  }

  const scoreString = score === 1 ? 'answer' : 'answers'

  if(isPending && start) {return <div className='quizzical'><CircularProgress /></div>}

  if(isRefetching) {return <div className='quizzical'><CircularProgress /></div>}

  const questionsHTML = data?.map(({question, incorrect_answers, correct_answer}, questionIndex) =>        
    <Questions
      key={nanoid()}
      register={
        register(`answer${questionIndex + 1}`, {
          required: 'Please select an answer'
        })
      }
      question={question}
      answers={[...incorrect_answers, correct_answer].sort()}
      questionIndex={questionIndex}
      errors={errors}
      isSubmitSuccessful={isSubmitSuccessful}
      correctAnswers={correctAnswers}
    />
  )

  return (
    <main>
      <div className='quizzical'>      
      {
        !start && 
          <motion.div
            className='intro-page'>
            <motion.h1 className='intro-title'
              transition={{ duration: 2 }}
              initial={{ y: -400 }}
              animate={{ y: 0 }}
            >Quizzical
            </motion.h1>
            <motion.p
                className='intro-text'
                transition={{ duration: 4 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
            >See if you can answer 5 random questions correctly!</motion.p>
            <motion.button 
              className='btn'
              onClick={startGame}
              whileHover={{
                scale: 1.04,
                boxShadow: '0px 0px 8px #9e8f4d'
              }}
              initial={{ y: 400 }}
              animate={{ y: 0 }}
              transition={{ duration: 2 }}
            >
              Start Quiz
            </motion.button>
          </motion.div>
      }
      {
        start &&
          <div className='quiz-page'>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <motion.div 
                className='questions'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1}}
                transition={{ duration: 2 }}
              >
                {questionsHTML}
              </motion.div>
              {
                isSubmitSuccessful ?
                  <motion.div className='score'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 2 }}
                   >
                    <motion.p 
                    className='score-message'
                   
                    >{isSubmitSuccessful && `You scored ${score}/5 correct ${scoreString}`}</motion.p>
                    <motion.button 
                      onClick={startGame}
                      className='play-again-btn check-answers-btn btn'
                      whileHover={{
                      scale: 1.1,
                      textShadow: '0px 0px 8px rbg(255, 255, 255)',
                      boxShadow: '0px 0px 8px rbg(255, 255, 255)'
                    }}
                    transition={{ type: 'spring', stiffness: 50}}
                    >Play Again</motion.button>
                  </motion.div>
                  :
                  <motion.button 
                    className='btn check-answers-btn'
                    whileHover={{
                    scale: 1.1,
                    textShadow: '0px 0px 8px rbg(255, 255, 255)',
                    boxShadow: '0px 0px 8px rbg(255, 255, 255)'
                  }}
                    transition={{ type: 'spring', stiffness: 50}}
                  >
                    Check Answers
                  </motion.button>
              } 
            </form>
            <DevTool control={control} />
          </div>
      }
      </div>
    </main>
  )
}

export default Quizzical