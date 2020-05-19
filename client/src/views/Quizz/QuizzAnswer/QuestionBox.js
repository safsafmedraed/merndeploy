import React,{useState} from 'react';

const QuestionBox = ({question,options,selected})=> {
    const [answer,setAnswer] = useState(options);
    
    return(
        
        <div className="questionBox">
            <div className='question'>{question}</div>
            {answer.map((answeer,index) =>
            (
            <button className="answerBtn" 
            key={index}
            
            onClick={() => {
                setAnswer([answeer]);
                selected(answeer.text);
              }}>
                  {answeer.text}
                  </button>)
                  )
            
            }
          
        </div>
        
    )
}
export default QuestionBox;