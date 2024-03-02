import { decode } from 'html-entities'
// import { nanoid } from 'nanoid'

const Question = ({
  question, 
  answers, 
  questionIndex, 
  register, 
  errors,
  isSubmitSuccessful,
  buttonColors,
  correctAnswers,
  userAnswers
}) => {

  const inputIndex = `answer${questionIndex + 1}`

  const answerInputs = answers.map((answer, answerIndex) => {
    const questionAnswerIndex = `question${questionIndex}answer${answerIndex}`
    // const addColor = userAnswers[answerIndex] === correctAnswers[answerIndex] && 'correct'
    // console.log(userAnswers[answerIndex], correctAnswers[answerIndex])
    // const addColor = userAnswers[answerIndex] === answer
    // const addColor = isSubmitSuccessful && userAnswers[answerIndex] === answer ? 'correct' : ''
    // console.log(addColor)
    
      return (
          <>
            <input
              {...register}
              value={answer} 
              type='radio'
              id={questionAnswerIndex}
              // checked={false}
            />
            <label className={`answer ${buttonColors[answerIndex]}`} htmlFor={questionAnswerIndex}>{decode(answer)}</label>
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