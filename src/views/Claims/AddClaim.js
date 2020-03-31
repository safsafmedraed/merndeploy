import React, { Component, Fragment } from 'react';
import { CardHeader, Card, CardBody, Col, Input, FormGroup, Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { Editor } from '@tinymce/tinymce-react';
import ReactHtmlParser from 'react-html-parser';
import { toast } from 'react-toastify';

class AddClaim extends Component {
    state = {
        confirmation : false,
            title : '',
            editorInput: '',
            error : false,
            errorMessage : '',

            
    }

    handleEditorChange = (content, editor) => {
        this.setState({
            editorInput : content
        });
      }

    setTitle = e =>{
        this.setState({title: e.target.value})
    }
    notifySuccess = ()=> toast.success(' ✔ Claim Added!', {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
        });

    render(){
        return <Fragment>
            <Card>
                <CardHeader style={{textAlign : "center" , fontSize:"30px"}}>
                    <strong >Add new claim</strong>
                </CardHeader>
                <CardBody>
                    <FormGroup row>
                        <Col md="2" style={{textAlign:"center" , fontSize :"25px"}}>
                            <strong>Title:</strong>
                        </Col>
                        <Col>
                            <Input type="text" value={this.state.title} onChange={this.setTitle.bind(this)} placeholder="The title of your claim"/>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Col md="2" style={{textAlign:"center" , fontSize :"25px"}}>
                            <strong>Description:</strong>
                        </Col>
                        <Col>
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
                            onEditorChange={this.handleEditorChange}/>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Col  style={{textAlign :"center"}}>
                            <button onClick={()=>{
                                window.scrollTo(0,document.body.scrollHeight);
                            !this.state.title ? this.setState({error : true , errorMessage:'Title cannot be empty!'}) : 
                            !this.state.editorInput?  this.setState({error : true , errorMessage:'Description cannot be empty!'}) :this.setState({confirmation : true})
                                }} style={{color:"white" , width:"200px"}} className="btn btn-info">Add Claim</button>
                                {this.state.error ? <div style={{color : "red"}}>{this.state.errorMessage}</div> : null}
                        </Col>
                    </FormGroup>
                </CardBody>
            </Card>
            <Modal isOpen={this.state.confirmation} toggle={this.togglePrimary}
                       className={'modal-primary ' + this.props.className}>
                  <ModalHeader toggle={this.togglePrimary}>Confirmation</ModalHeader>
                  <ModalBody>
                    <p style={{fontSize : "25px"}}><strong>Your claim:</strong></p>
                    <strong>Title:</strong> {this.state.title} <br/>
                    <strong>Description:</strong>
                     {ReactHtmlParser(this.state.editorInput) } 
                  </ModalBody>
                  <ModalFooter>
                    <Button color="primary" onClick={()=>{
                      this.setState({confirmation:false});
                      this.notifySuccess();
                      this.props.history.push("/UserClaims")
                    }}>OK</Button>
                    <Button color="secondary" onClick={()=>this.setState({confirmation : false})}>Cancel</Button>
                  </ModalFooter>
                </Modal>
        </Fragment>
    }
}

export default AddClaim;