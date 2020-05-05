import React, { useState } from "react";
import {

    Button,
    Card,
    CardBody,
    CardHeader,
    Col,

    Fade,
    Form,
    FormGroup,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Label,

    Row,
} from 'reactstrap';
import { connect } from 'react-redux'
import { addPost } from '../../../actions/post'
import PropTypes from "prop-types";


import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';


const AddPost = ({ addPost }) => {

    const [formData, setFormData] = useState({
        title: ''
    })
    const [text, setText] = useState('')

    const { title } = formData;
    const onchange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
    const handlechange = (e, editor) => {
        const data = editor.getData();
        console.log(data)
        setText(data)
    }
    const Onsubmit = e => {
        e.preventDefault();
        addPost({ text, title });
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
                                <Form className="form-horizontal" onSubmit={e => { Onsubmit(e) }}>
                                    <FormGroup>
                                        <Label htmlFor="prependedInput">Post Title </Label>
                                        <div className="controls">
                                            <InputGroup className="input-prepend">
                                                <InputGroupAddon addonType="prepend">
                                                    <InputGroupText>Title</InputGroupText>
                                                </InputGroupAddon>
                                                <Input id="prependedInput" size="16" type="text" name="title" value={title} onChange={e => { onchange(e) }} />
                                            </InputGroup>
                                            <InputGroup className="input-prepend">
                                                <InputGroupAddon addonType="prepend">
                                                    <InputGroupText>Description</InputGroupText>
                                                </InputGroupAddon>
                                                <CKEditor
                                                    editor={ClassicEditor}
                                                    name='text'
                                                    value={text}
                                                    onChange={handlechange}


                                                />
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
