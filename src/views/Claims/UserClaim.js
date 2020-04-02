import React, { Component, Fragment } from 'react';
import {connect} from 'react-redux';
import { Card, CardHeader, CardBody } from 'reactstrap';
import ReactHtmlParser from 'react-html-parser';


class UserClaim extends Component {
render(){
    const {claim} = this.props;
    console.log(this.props)
    return  <Fragment>
                {claim?
                    <div><Card>
                        <CardHeader>
                            <strong>Title:</strong> {claim.title} &nbsp;
                            {claim.solved ? <span className="badge badge-success">Solved</span> : null}<br/>
                            <span style={{fontSize:11 , color:'grey'}}>{new Date(claim.date).toLocaleString('en-US')}</span>
                        </CardHeader>
                    </Card>
                    <Card>
                        <CardHeader>
                            <strong>Description</strong>
                        </CardHeader>
                        <CardBody>
                            {ReactHtmlParser(claim.description)}
                        </CardBody>
                    </Card>
                    {claim.solved ?
                        <Card>
                        <CardHeader>
                            <strong>Response</strong><br/>
                            <span style={{fontSize:11 , color:'grey'}}>{new Date(claim.dateResponse).toLocaleString('en-US')}</span>
                        </CardHeader>
                        <CardBody>
                            {ReactHtmlParser(claim.response)}
                        </CardBody>
                    </Card> : null
                    }
                    </div>
                    : <p>Undefined</p>
                }    
            </Fragment>
}
}
const stateToProps = (state,props) =>{
    const id = props.match.params.id;
    return {
        claim : state.claims.UserClaims.find(claim => claim._id === id)
    }
};
export default connect(stateToProps)(UserClaim);
