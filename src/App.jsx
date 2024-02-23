import axios from 'axios'
import { nanoid } from 'nanoid'
import { useState } from 'react'
import Question from './Question'
// import { 
//   createBrowserRouter, 
//   createRoutesFromElements,
//   RouterProvider
// } from 'react-router-dom'
import './App.css'
// import { QueryClientProvider, QueryClient, useQuery } from 'react-query'
// const queryClient = new QueryClient()

function App() {
  const [start, setStart] = useState(false)
  const [questions, setQuestions] = useState(undefined)
  
  // useEffect(() => {

  // },[questions])

  const handleClick = async () => {
    const data = await axios.get('https://opentdb.com/api.php?amount=1&type=multiple').then(response => response.data.results)
    setStart(true)
    setQuestions(data)
  }
  
  console.log(questions)
  // const questionsHTML = questions.map(question => <Question key={nanoid()} questionData={question} />)
  
  return (
    <main>
      {
        start ?
        <div className='quiz-page'>
          {questions.map(question => <Question key={nanoid()} questionData={question} />)}
        </div>
        :
          <div className='intro-page'>
            <h1 className='intro-title'>Quizzical</h1>
            <p className='intro-text'>See if you can answer 5 random questions correctly!</p>
            <button onClick={handleClick} className='intro-btn'>Start Quiz</button>
          </div>
        }
    </main>
  )
}

export default App
