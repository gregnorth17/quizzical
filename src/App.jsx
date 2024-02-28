import { DevTool } from '@hookform/devtools'
import axios from 'axios'
import { nanoid } from 'nanoid'
import { useState } from 'react'
import { useForm } from "react-hook-form"
import './App.css'
import Questions from './Questions'

function App() {
  const [start, setStart] = useState(false)
  const [questions, setQuestions] = useState(undefined)
  const { register, handleSubmit, control } = useForm()

  const fetchData = async () => {
    const data = await axios.get('https://opentdb.com/api.php?amount=2&type=multiple').then(response => response.data.results)
    setStart(true)
    setQuestions(data)
  }

  const onSubmit = data => {
    console.log('Form Submitted', data)
  }
  
  return (
    <main>
      {
        start ?
          <div className='quiz-page'>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              {questions.map(({question, incorrect_answers, correct_answer}, questionIndex) => 
              <Questions 
                key={nanoid()} 
                register={register} 
                question={question}
                answers={[...incorrect_answers, correct_answer]} 
                questionIndex={questionIndex + 1} 
                />)}
              <button className='submit-btn'>Check Answers</button>
            </form>
            <DevTool control={control} />
          </div>
        :
          <div className='intro-page'>
            <h1 className='intro-title'>Quizzical</h1>
            <p className='intro-text'>See if you can answer 5 random questions correctly!</p>
            <button onClick={fetchData} className='intro-btn'>Start Quiz</button>
          </div>
        }
    </main>
  )
}

export default App
