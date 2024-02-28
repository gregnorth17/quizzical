import { decode } from 'html-entities'

const Question = ({question, answers, questionIndex, register}) => {
    return (
      <div className='question'>
        <h3 className='question-title'>{decode(question)}</h3>
        <div className='answers'>
          {answers.map((answer, index) => {
            return (
              <>
                <input {...register(`answer${questionIndex}`)} value={answer} type='radio' id={`answer${index}`} />
                <label htmlFor={`answer${index}`}>{decode(answer)}</label>
              </>
            )
          })}
        </div>
      </div>
    )
 
}

export default Question