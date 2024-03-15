import { motion } from 'framer-motion'
import { decode } from 'html-entities'

const Question = ({
  question, 
  answers, 
  questionIndex, 
  register, 
  errors,
  isSubmitSuccessful,
  correctAnswers,
}) => {

  const inputIndex = `answer${questionIndex + 1}`
  
  const answerInputs = answers.map((answer, answerIndex) => {
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
              value={decode(answer)}
              type='radio'
              id={questionAnswerIndex}
              disabled={isSubmitSuccessful}
            />
            <motion.label
              className={`answer ${submitClass()}`} 
              htmlFor={questionAnswerIndex}
              whileHover={{ scale: isSubmitSuccessful ? null : 1.1 }}
              transition={{ duration: 2, type: 'spring'}}
            >
              {decode(answer)}
            </motion.label>
          </>
        )
      })

  return (
    <div className='question'>
      <h3 className='question-title'>{decode(question)}</h3>
      <div className='answers'>
        {answerInputs}
      </div>
      <p className='error-message'>{errors[inputIndex]?.message}</p>
    </div>
  )
}

export default Question