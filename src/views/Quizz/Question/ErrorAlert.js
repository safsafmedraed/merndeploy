import React from 'react';
import {Alert} from 'reactstrap';
const ErrorAlert = ({text}) => 
{
    
        return(
                <Alert color="danger">
                 {text}
                </Alert>
        )
    
}
export default ErrorAlert;