import React from 'react';
import {Alert} from 'reactstrap';

const successAlert = ({text}) => 
{
    
        return(
                <Alert color="success">
                 {text}
                </Alert>
        )
    
}
export default successAlert;