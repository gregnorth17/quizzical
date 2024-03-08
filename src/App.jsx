import { DevTool } from '@hookform/devtools'
import axios from 'axios'
import { motion } from "framer-motion"
import { decode } from 'html-entities'
import { nanoid } from 'nanoid'
import { useState } from 'react'
import { useForm } from "react-hook-form"
import './App.css'
import Questions from './Questions'


function App() {
  
  // make transitions smoother

  const [start, setStart] = useState(false)
  const [questions, setQuestions] = useState(undefined)
  const [correctAnswers, setCorrectAnswers] = useState(undefined)
  const [userAnswers, setUserAnswers] = useState([])
  const [score, setScore] = useState(0)

  const { 
    register, 
    handleSubmit, 
    control, 
    formState: {errors, isSubmitSuccessful},
    reset
  } = useForm()

  const fetchData = async () => {
    const data = await axios.get('https://opentdb.com/api.php?amount=5&type=multiple').then(response => response.data.results)
    reset()
    setStart(true)
    setScore(0)
    setQuestions(data)
    setCorrectAnswers(data.map(answer => decode(answer.correct_answer)))
  }

  const onSubmit = data => {
    setUserAnswers(data)
    correctAnswers.map((answer, index) => {
      const userAnswer = decode(data[`answer${index + 1}`])
      if(userAnswer === answer) {
        setScore(prevScore => prevScore + 1)
      }
    })
  }

  const scoreString = score === 1 ? 'answer' : 'answers'

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
              {questions.map(({question, incorrect_answers, correct_answer}, questionIndex) => 
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
                  userAnswers={userAnswers}
                  correctAnswers={correctAnswers}
                />)}
              {
                isSubmitSuccessful ?
                  <div className='score'>
                    <p className='score-message'>{isSubmitSuccessful && `You scored ${score}/5 correct ${scoreString}`}</p>
                    <button onClick={fetchData} className='play-again-btn check-answers-btn btn'>Play Again</button>
                  </div>
                  :
                  <button className='btn check-answers-btn'>Check Answers</button>
              }
            </motion.form>
            <DevTool control={control} />
          </div>
        :
          <motion.div
            
            className='intro-page'>
            <motion.h1 className='intro-title'
              transition={{ type: 'spring', stiffness: 80}}
              initial={{ y: -500 }}
              animate={{ y: 0 }}
            >Quizzical
            </motion.h1>
            <motion.p
                className='intro-text'
                transition={{ delay: 1, duration: 2 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
            >See if you can answer 5 random questions correctly!</motion.p>
            <motion.button 
              initial={{ y: 500 }}
              animate={{ y: 0 }}
              transition={{ type: 'spring', stiffness: 80}}
              onClick={fetchData} 
              className='btn'
            >
              Start Quiz
            </motion.button>
          </motion.div>
        }
    </main>
  )
}

export default App
