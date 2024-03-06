import { DevTool } from '@hookform/devtools'
import axios from 'axios'
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
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
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
            </form>
            <DevTool control={control} />
          </div>
        :
          <div className='intro-page'>
            <h1 className='intro-title'>Quizzical</h1>
            <p className='intro-text'>See if you can answer 5 random questions correctly!</p>
            <button onClick={fetchData} className='btn'>Start Quiz</button>
          </div>
        }
    </main>
  )
}

export default App
