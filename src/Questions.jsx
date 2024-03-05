import { decode } from 'html-entities'
import { useState } from 'react'
// import { FormLabel, Radio, RadioGroup } from '@mui/material'
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

  const [checked, setChecked] = useState(false)
  const inputIndex = `answer${questionIndex + 1}`
  // console.log(userAnswers, correctAnswers)
  //  const addCorrect = isSubmitSuccessful && userAnswers[inputIndex] === correctAnswers[answerIndex] ? 
  //                       'correct' : 
  //                       ''

  
  const answerInputs = answers.map((answer, answerIndex) => {
    const questionAnswerIndex = `question${questionIndex}answer${answerIndex}`
    // console.log(`answer${answerIndex + 1}`)
    console.log(userAnswers[`answer${answerIndex + 1}`], correctAnswers[answerIndex])
    
    const checkScoreClass = () => {
      if(
        isSubmitSuccessful &&
        answer === correctAnswers[questionIndex]
      ) {
        return 'correct'
      } else if (
        isSubmitSuccessful &&
        correctAnswers[questionIndex] !== userAnswers[`answer${answerIndex + 1}`]
      ) {
        return 'wrong'
      } else {
        'user-wrong'
      }
    }
    
    const addCorrect = isSubmitSuccessful &&
                       answer === correctAnswers[questionIndex] ?
                        'correct' : ''

    // const addWrong = isSubmitSuccessful &&
    //                   correctAnswers[answerIndex] !== userAnswers[`answer${answerIndex + 1}`] ?
                      
    //                   'wrong' : ''

    // const addUserWrong = isSubmitSuccessful &&
    //                      answer !== correctAnswers[questionIndex] &&
    //                      userAnswers[`answer${answerIndex + 1}`] !== correctAnswers[answerIndex] ?
    //                       'user-wrong' : ''

    // const addUserWrong = isSubmitSuccessful &&
    //                       !addCorrect !addWrong

    const addWrong = ''
    const addUserWrong = ''
    console.log(document.onchange)
      return (
          <>
            <input
              {...register}
              value={answer}
              type='radio'
              id={questionAnswerIndex}
            />
            <label className={`answer ${addUserWrong} ${addWrong} ${addCorrect}`} htmlFor={questionAnswerIndex}>
              {decode(answer)}
            </label>
            {/* <FormLabel>{decode(answer)}</FormLabel>
            <RadioGroup>
              <Radio
                value={decode(answer)}
                
                id={questionAnswerIndex}
                // slotProps={{
                //   label: ({ checked }) => ({
                //     sx: {
                //       color: checked ?
                //     }
                //   })
                // }}
              />
            </RadioGroup> */}
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