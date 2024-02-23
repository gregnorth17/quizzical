import { useState } from 'react'
import './App.css'
// import { QueryClientProvider, QueryClient, useQuery } from 'react-query'

function App() {
  const [start, setStart] = useState(true)
  // const queryClient = new QueryClient()
  return (
    start ?
      <div className='intro-page'>
        <h1 className='intro-title'>Quizzical</h1>
        <p className='intro-text'>See if you can answer 5 random questions correctly!</p>
        <button className='intro-btn'>Start Quiz</button>
      </div>
      :
      <div className='quiz-page'>
        <h3 className='quiz-questions'>How </h3>
      </div>
  )
}

export default App
