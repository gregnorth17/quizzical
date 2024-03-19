import { DevTool } from '@hookform/devtools'
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
  const [questions, setQuestions] = useState(undefined)
  const [correctAnswers, setCorrectAnswers] = useState(undefined)
  const [userAnswers, setUserAnswers] = useState([])
  const [score, setScore] = useState(0)

  // findout how to neaten up framer
  // Check moving css after answers
  
  const { 
    register, 
    handleSubmit, 
    control, 
    formState: {errors, isSubmitSuccessful},
    reset,
  } = useForm()

  const fetchData = async () => {
    return await axios.get('https://opentdb.com/api.php?amount=5&type=multiple')
                        .then(response => response.data.results)
  }

  const { data, refetch, isPending, isError } = useQuery({
    queryKey: ['question'],
    queryFn: () => fetchData(),
    queryOptions: { enabled: false }
  })
  
  const useStartGame = () => {
    refetch()
    reset()
    setStart(true)
    setScore(0)   
    setQuestions(data)
    setCorrectAnswers(data?.map(answer => decode(answer.correct_answer)))
  }

  const onSubmit = data => {
    setUserAnswers(data)
    correctAnswers?.map((answer, index) => {
      const userAnswer = decode(data[`answer${index + 1}`])
      if(userAnswer === answer) {
        setScore(prevScore => prevScore + 1)
      }
    })
  }

  const scoreString = score === 1 ? 'answer' : 'answers'

  if(isPending && start) { return 'Loading...'}

  if(isError && start) { return 'Hmmm, something went wrong!'}

  return (
    <main>
      {
        start ? 
          <div className='quiz-page'>
            <motion.form
              initial={{ opacity: 0 }}
              animate={{ opacity: 1}}
              transition={{ duration: 1 }}
              onSubmit={handleSubmit(onSubmit)} noValidate
            >
              {questions?.map(({question, incorrect_answers, correct_answer}, questionIndex) => 
                
                <Questions
                  register={
                    register(`answer${questionIndex + 1}`, {
                      required: 'Please select an answer'
                    })
                  }
                  question={question}
                  answers={[...incorrect_answers, correct_answer].sort()}
                  questionIndex={questionIndex}
                  key={nanoid()}
                  errors={errors}
                  isSubmitSuccessful={isSubmitSuccessful}
                  correctAnswers={correctAnswers}
                />)}
              {
                isSubmitSuccessful ?
                  <motion.div className='score'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: .1}}
                   >
                    <motion.p 
                    className='score-message'
                   
                    >{isSubmitSuccessful && `You scored ${score}/5 correct ${scoreString}`}</motion.p>
                    <motion.button 
                      onClick={useStartGame}
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
            </motion.form>
            <DevTool control={control} />
          </div>
        :
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
              onClick={useStartGame}
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
    </main>
  )
}

export default Quizzical