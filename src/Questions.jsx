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
    console.log(answer.length)
    const questionAnswerIndex = `question${questionIndex}answer${answerIndex}`
    
    const submitClass = () => {
      if(
        isSubmitSuccessful &&
        answer === correctAnswers[questionIndex]
      ) {
        return 'correct'
      }
      if (
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
            />
            <label className={`answer ${submitClass()}`} htmlFor={questionAnswerIndex}>
              {decode(answer)}
            </label>
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