import { DevTool } from '@hookform/devtools'
import axios from 'axios'
import { decode } from 'html-entities'
import { nanoid } from 'nanoid'
import { useState } from 'react'
import { useForm } from "react-hook-form"
import './App.css'
import Questions from './Questions'


function App() {
  // colours after submitted, right and wrong
  // score text and play again button

  const [start, setStart] = useState(false)
  const [questions, setQuestions] = useState(undefined)
  const [correctAnswers, setCorrectAnswers] = useState(undefined)
  const [score, setScore] = useState(0)

  const { register, handleSubmit, control } = useForm()

  const fetchData = async () => {
    const data = await axios.get('https://opentdb.com/api.php?amount=5&type=multiple').then(response => response.data.results)
    setStart(true)
    setQuestions(data)
    setCorrectAnswers(data.map(answer => decode(answer.correct_answer)))
  }

  const onSubmit = data => {
    correctAnswers.map((answer, index) => {
    const userAnswer = decode(data[`answer${index + 1}`])
      userAnswer === answer && setScore(prevScore => prevScore + 1)
    })
  }

  console.log(score)
  console.log(questions)
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
                  answers={[...incorrect_answers, correct_answer]}
                  questionIndex={questionIndex}
                  key={nanoid()}
                />)}
              <button className='check-answers-btn btn'>Check Answers</button>
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
