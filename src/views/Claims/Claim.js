import React, { Component, Fragment } from 'react';
import { Card, CardHeader, CardBody , Modal, ModalBody, ModalFooter, ModalHeader , Button } from 'reactstrap';
import { Editor } from '@tinymce/tinymce-react';
import ReactHtmlParser from 'react-html-parser';
import {connect} from 'react-redux';

class Claim extends Component {
    state = {
        editorInput : '', 
        confirmation : false
    }

    handleEditorChange = (content, editor) => {
        this.setState({
            editorInput : content
        });
      }

    render(){
      const {claim} = this.props;
        return (
            <Fragment>
              {claim ? 
                <div>
                <Card>
                    <CardHeader>
                        <strong>Title: </strong>{claim.title} &nbsp; 
                        { claim.solved ? <span className="badge badge-success">Solved</span> : null}<br/>
                        <span style={{fontSize:11 , color:'grey'}}>{claim.date.toLocaleString()}</span>
                    </CardHeader>
                    <CardBody>
                        <div>
                                <strong>User: </strong>{claim.user}<br/>
                                <strong>Email: </strong>{claim.email}
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
                              <strong>Response</strong>
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
                    <Button color="primary" onClick={()=>{
                      this.setState({confirmation:false});
                      claim.response = this.state.editorInput;
                      claim.solved = true;
                    }}>OK</Button>
                    <Button color="secondary" onClick={()=>this.setState({confirmation : false})}>Cancel</Button>
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
      claim : state.claims.SuperClaims.find(claim => claim.id === id)
  }
};

export default connect(stateToProps)(Claim);