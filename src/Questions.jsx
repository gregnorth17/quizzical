import { motion } from 'framer-motion'
import { decode } from 'html-entities'
import { nanoid } from 'nanoid'

const Question = ({
  question, 
  answers, 
  questionIndex, 
  register, 
  errors,
  isSubmitSuccessful,
  correctAnswers
}) => {

  const inputIndex = `answer${questionIndex + 1}`

  const decodedAnswers = answers.map(answer => decode(answer))
  
  const answerInputs = decodedAnswers.map((answer, answerIndex) => {
    const questionAnswerIndex = `question${questionIndex}answer${answerIndex}`
    
    const submitClass = () => {
      if(
        isSubmitSuccessful &&
        answer === correctAnswers[questionIndex]
        ) {
          return 'correct'
        }
      if(
        isSubmitSuccessful &&
        answer !== correctAnswers[questionIndex] 
        ) {
          return 'user-wrong'
        }
    }

      return (
          <>
            <input
              {...register}
              value={answer}
              type='radio'
              id={questionAnswerIndex}
              disabled={isSubmitSuccessful}
              key={nanoid()}
            />
            <motion.label
              className={`answer ${submitClass()}`} 
              htmlFor={questionAnswerIndex}
              whileHover={{ scale: isSubmitSuccessful ? null : 1.1 }}
              transition={{ duration: 2, type: 'spring' }}
            >
              {answer}
            </motion.label>
          </>
        )
      })

  return (
    <div className='question'>
      <h3 className='question-title'>{decode(question)}</h3>
      <motion.div 
        className='answers'
        initial={{ opacity: isSubmitSuccessful ? 0 : null}}
        animate={{ opacity: isSubmitSuccessful ? 1 : null}}
        transition={{ duration: 2 }}
      >
        {answerInputs}
      </motion.div>
      <p className='error-message'>{errors[inputIndex]?.message}</p>
    </div>
  )
}

export default Question