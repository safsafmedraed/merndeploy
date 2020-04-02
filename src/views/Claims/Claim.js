import React, { Component, Fragment } from 'react';
import { Card, CardHeader, CardBody , Modal, ModalBody, ModalFooter, ModalHeader , Button, Row, Col } from 'reactstrap';
import { Editor } from '@tinymce/tinymce-react';
import ReactHtmlParser from 'react-html-parser';
import {connect} from 'react-redux';
import { toast } from 'react-toastify';
import axios from 'axios';

class Claim extends Component {
    state = {
        editorInput : '', 
        confirmation : false,
        confirmationBlock : false,
        error : false,
        errorMessage : ''
    }

    handleEditorChange = (content, editor) => {
        this.setState({
            editorInput : content
        });
      }
      notifyBlock = ()=> toast.error(' ⛔ Claim Blocked!', {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
        });
        notifySuccess = ()=> toast.success(' ✔ Claim Solved!', {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true
          });
    render(){
      const {claim} = this.props;
        return (
            <Fragment>
              {claim ? 
                <div>
                <Card>
                    <CardHeader>
                      <Row>
                        <Col>
                          <strong>Title: </strong>{claim.title} &nbsp; 
                          { claim.solved ? <span className="badge badge-success">Solved</span> : 
                            claim.removed ? <span className="badge badge-danger">Blocked</span> : null
                          }<br/>
                          <span style={{fontSize:11 , color:'grey'}}>{new Date(claim.date).toLocaleString('en-US')}</span>
                        </Col >
                        {!claim.solved && !claim.removed ?<Col style={{textAlign:"right"}}>
                          <Button onClick={()=>{
                            this.setState({confirmationBlock:true});
                          }} className="btn btn-danger">Block</Button>
                        </Col> : null}
                      </Row>
                    </CardHeader>
                    <CardBody>
                        <div>
                                <strong>User: </strong>{claim.user.Firstname} {claim.user.Lastname}<br/>
                                <strong>Email: </strong>{claim.user.email}
                        </div>
                    </CardBody>
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
                { !claim.solved ? <Card>
                    <CardHeader><strong>Response</strong></CardHeader>
                    <CardBody>
                    <Editor
         initialValue=""
         apiKey="g1cecqu6i01rgqxbrrz1udjm591cn74xai0zlwzwtbt9ry3y"
         init={{
           height: 300,
           menubar: false,
           plugins: [
             'advlist autolink lists link image charmap print preview anchor',
             'searchreplace visualblocks code fullscreen',
             'insertdatetime media table paste code help'
           ],
           toolbar:
             'undo redo | fontsizeselect | formatselect | bold underline italic forecolor backcolor | link | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | fullscreen help'
         }}
         onEditorChange={this.handleEditorChange}
       />
       <br/>
       <button className="btn btn-info" style={{color : 'white'}} onClick={()=>{
         if(this.state.editorInput)  this.setState({confirmation : true , error :false}) ;
         else
         {
          window.scrollTo(0,document.body.scrollHeight); 
          this.setState({error:true,errorMessage:'Response cannot be empty!'});
         }
         }}>Post the answer</button><br/>
         {this.state.error ? <p style={{color : "red"}}>{this.state.errorMessage}</p> : null}
                    </CardBody>
                </Card>: null}
                <Modal isOpen={this.state.confirmation} toggle={this.togglePrimary}
                       className={'modal-primary ' + this.props.className}>
                  <ModalHeader toggle={this.togglePrimary}>Confirmation</ModalHeader>
                  <ModalBody>
                    <strong>Your response:</strong><br/>
                    {ReactHtmlParser(this.state.editorInput) }
                  </ModalBody>
                  <ModalFooter>
                    <Button color="primary" onClick={()=>{
                      this.setState({confirmation:false});
                      claim.response = this.state.editorInput;
                      claim.solved = true;
                      axios.put("http://localhost:5000/claims/answer" , claim)
                      this.props.history.push("/Claims");
                      this.notifySuccess();
                      claim.removed = false;
                    }}>OK</Button>
                    <Button color="secondary" onClick={()=>this.setState({confirmation : false})}>Cancel</Button>
                  </ModalFooter>




                </Modal>
                <Modal isOpen={this.state.confirmationBlock} toggle={this.toggleDanger}
                       className={'modal-danger ' + this.props.className}>
                  <ModalHeader toggle={this.toggleDanger}>Confirm Block</ModalHeader>
                  <ModalBody>
                    <p style={{fontSize:"30px"}}>Do you want to block this claim ?</p>
                    <p><span style={{fontWeight:"bold" , fontSize : "20px"}}>Title: </span>{claim.title}</p>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="danger" onClick={()=>{
                      this.setState({confirmationBlock : false});
                      claim.removed = true;
                      axios.put("http://localhost:5000/claims/block/"+claim._id);
                      this.notifyBlock();
                      this.props.history.push("/Claims");
                    }}>Block</Button>{' '}
                    <Button color="secondary" onClick={()=>{
                      this.setState({confirmationBlock : false});
                    }}>Cancel</Button>
                  </ModalFooter>
                </Modal>
                </div> : <p> Undefined</p>
    }
            </Fragment>
          );
    }
 
}
const stateToProps = (state,props) =>{
  const id = props.match.params.id;
  return {
      claim : state.claims.SuperClaims.find(claim => claim._id === id)
  }
};

export default connect(stateToProps)(Claim);