import React, {useState} from 'react';
import { Container, Button, Card } from 'reactstrap';

const Codebox = ({pressed}) => {

    const [code,setCode] = useState();
    const handlechange = event => setCode(event.target.value)
    return(
        <Card>
            <div className={Container}>
                <input type="text" value={code} onChange={handlechange}/>
                <Button onClick={pressed(code)}></Button>
                </div>
                </Card>
    )
}
export default Codebox;