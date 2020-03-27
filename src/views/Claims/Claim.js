import React, { Component } from 'react';
import faker from 'faker';
import { Card, CardHeader, CardBody , Modal, ModalBody, ModalFooter, ModalHeader , Button } from 'reactstrap';
import { Editor } from '@tinymce/tinymce-react';
import ReactHtmlParser from 'react-html-parser';

class Claim extends Component {
    state = {
        title : faker.lorem.sentence(),
        description : faker.lorem.paragraph(),
        user : faker.name.findName(),
        email : faker.internet.email(),
        solved : faker.random.number(1) ? true : false ,
        date : faker.date.past(10),
        response : faker.lorem.paragraph(),

        editorInput : '', 
        confirmation : false
    }

    handleEditorChange = (content, editor) => {
        this.setState({
            editorInput : content
        });
      }

    render(){
        return (
            <div>
                <Card>
                    <CardHeader>
                        <strong>Title: </strong>{this.state.title} &nbsp; 
                        { this.state.solved ? <span className="badge badge-success">Solved</span> : null}<br/>
                        <span style={{fontSize:11 , color:'grey'}}>{this.state.date.toLocaleString()}</span>
                    </CardHeader>
                    <CardBody>
                        <div>
                            <p>
                                <strong>User: </strong>{this.state.user}<br/>
                                <strong>Email: </strong>{this.state.email}
                            </p>
                            <div><strong>Description: </strong>{ReactHtmlParser(this.state.description)}</div><br/>
                            <div>{this.state.solved ? <div><strong>Response: </strong> {ReactHtmlParser(this.state.response)}</div>  : null}</div>
                        </div>
                    </CardBody>
                </Card>
                { !this.state.solved ? <Card>
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
       <button className="btn btn-info" style={{color : 'white'}} onClick={()=>this.setState({confirmation : true})}>Post the answer</button>
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
                    <Button color="primary" onClick={()=>this.setState({response : this.state.editorInput , confirmation:false ,solved :true})}>OK</Button>{' '}
                    <Button color="secondary" onClick={()=>this.setState({confirmation : false})}>Cancel</Button>
                  </ModalFooter>
                </Modal>
            </div>
          );
    }
 
}

export default Claim;