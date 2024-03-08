import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import './App.css'
import Quizzical from './Quizzical'

const queryClient = new QueryClient()

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Quizzical />
      </QueryClientProvider>
    </>
  )
}

export default App
