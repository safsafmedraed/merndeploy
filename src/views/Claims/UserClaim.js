import React, { Component, Fragment } from 'react';
import { Card, CardHeader, CardBody } from 'reactstrap';
import ReactHtmlParser from 'react-html-parser';
import Axios from 'axios';
import { LoopCircleLoading  } from 'react-loadingg';


class Claim extends Component {
    constructor(props){
        super(props);
        this.state={
            claim : ""
        }
        Axios.get("http://localhost:5000/claims/"+props.match.params.id)
        .then(res => this.setState({claim : res.data}));
    }
render(){
    return  <Fragment>
                {this.state.claim?
                    <div><Card>
                        <CardHeader>
                            <strong>Title:</strong> {this.state.claim.title} &nbsp;
                            {this.state.claim.solved ? <span className="badge badge-success">Solved</span> : null}<br/>
                            <span style={{fontSize:11 , color:'grey'}}>{new Date(this.state.claim.date).toLocaleString('en-US')}</span>
                        </CardHeader>
                    </Card>
                    <Card>
                        <CardHeader>
                            <strong>Description</strong>
                        </CardHeader>
                        <CardBody>
                            {ReactHtmlParser(this.state.claim.description)}
                        </CardBody>
                    </Card>
                    {this.state.claim.solved ?
                        <Card>
                        <CardHeader>
                            <strong>Response</strong><br/>
                            <span style={{fontSize:11 , color:'grey'}}>{new Date(this.state.claim.dateResponse).toLocaleString('en-US')}</span>
                        </CardHeader>
                        <CardBody>
                            {ReactHtmlParser(this.state.claim.response)}
                        </CardBody>
                    </Card> : null
                    }
                    </div>
                    : <LoopCircleLoading  />
                }    
            </Fragment>
}
}
export default Claim;
