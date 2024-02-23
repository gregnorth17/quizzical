import { decode } from 'html-entities'
import { nanoid } from 'nanoid'

const Question = ({questionData}) => {
  console.log(questionData)
    // PUt all answers in same array
    const answers = [...questionData.incorrect_answers, questionData.correct_answer].sort()
    console.log(answers)

    return (
      <div className='question'>
        <h3 className='question-title'>{decode(questionData.question)}</h3>
        <div className='answers'>
          {answers.map(answer => <span className='answer' key={nanoid()}>{answer}</span>)}
        </div>
      </div>
    )
 
}

export default Question