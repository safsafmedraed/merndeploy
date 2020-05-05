import React,{useState} from 'react';
import { Input } from 'reactstrap';

const QuestionBox1 = ({question,options,selected})=> {
    
    const [greeting, setGreeting] = useState();
     
    const handleChange = event => setGreeting(event.target.value);
   
    return(
        
        <div className="questionBox">
            <div className='question'>{question}</div>
            <Input type="text" name="answer" id="answer" value={greeting} onChange={handleChange}></Input>
            <button className="answerBtn"             
            onClick={() => {
                setGreeting([greeting]);
                selected(greeting);
              }}>
                  {greeting}
                  </button>
                  
            
            
          
        </div>
        
    )
}
export default QuestionBox1;