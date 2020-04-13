import React, { useState } from "react";
import {
    Alert,
    Button,
    Card,
    CardBody,
    CardHeader,
    Col,
    Collapse,
    Fade,
    Form,
    FormGroup,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Label,
    Modal, ModalBody, ModalFooter, ModalHeader,
    Row,
} from 'reactstrap';
import { connect } from 'react-redux'
import { addPost } from '../../../actions/post'
import PropTypes from "prop-types";
const AddPost = ({ addPost }) => {
    const [text, setText] = useState('');
    const Onsubmit = () => {

    }

    return (
        <div>

            <Row>
                <Col xs="12">
                    <Fade >
                        <Card>
                            <CardHeader>
                                <i className="fa fa-edit"></i>Add a Post
                              <div className="card-header-actions">

                                    <Button color="link" className="card-header-action btn-minimize" data-target="#collapseExample" ><i className="icon-arrow-up"></i></Button>
                                    <Button color="link" className="card-header-action btn-close" ><i className="icon-close"></i></Button>
                                </div>
                            </CardHeader>

                            <CardBody>
                                <Form className="form-horizontal" onSubmit={e => {
                                    e.preventDefault();
                                    addPost({ text });
                                    setText('')
                                }}>
                                    <FormGroup>
                                        <Label htmlFor="prependedInput">Post Title </Label>
                                        <div className="controls">
                                            <InputGroup className="input-prepend">
                                                <InputGroupAddon addonType="prepend">
                                                    <InputGroupText>Title</InputGroupText>
                                                </InputGroupAddon>
                                                <Input id="prependedInput" size="16" type="text" value={text} onChange={e => setText(e.target.value)} />
                                            </InputGroup>

                                        </div>
                                    </FormGroup>




                                    <Button color="primary" >Submits Post</Button>







                                </Form>
                            </CardBody>

                        </Card>
                    </Fade>
                </Col>
            </Row>

        </div>
    )
}

AddPost.propTypes = {
    addPost: PropTypes.func.isRequired,
}

export default connect(null, { addPost })(AddPost);
