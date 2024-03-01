import { decode } from 'html-entities'
// import { nanoid } from 'nanoid'

const Question = ({
  question, 
  answers, 
  questionIndex, 
  register, 
  errors,
  isSubmitSuccessful
}) => {

  const inputIndex = `answer${questionIndex + 1}`

  const answerInputs = answers.map((answer, answerIndex) => {
    const questionAnswerIndex = `question${questionIndex}answer${answerIndex}`
      return (
          <>
            <input
              {...register}
              value={answer} 
              type='radio'
              id={questionAnswerIndex}
            />
            <label className='answer' htmlFor={questionAnswerIndex}>{decode(answer)}</label>
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