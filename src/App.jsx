import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import './App.css'
import Quizzical from './Quizzical'

const queryClient = new QueryClient()
// "deploy": "vite build && gh-pages -d dist"
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
