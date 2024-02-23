import { decode } from 'html-entities'

const Question = ({questionData}) => {
  console.log(questionData)
    // PUt all answers in same array
    const answers = 
    return (
      <div className='question'>
        <h3 className='question-title'>{decode(questionData.question)}</h3>
        {/* {questionHTML} */}
        
      </div>
    )
 
}

export default Question