import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addComment } from '../../actions/post'
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
const Addcomment = ({ postId, addComment }) => {
    const [text, setText] = useState('')
    return (
        <div>
            <Row>
                <Col xs="12">
                    <Fade >
                        <Card>
                            <CardHeader>
                                <i className="fa fa-edit"></i>Leave a comment
                              <div className="card-header-actions">


                                </div>
                            </CardHeader>

                            <CardBody>
                                <Form className="form-horizontal" onSubmit={e => {
                                    e.preventDefault();
                                    addComment(postId, { text });
                                    setText('')
                                }}>
                                    <FormGroup>
                                        <Label htmlFor="prependedInput">Comment </Label>
                                        <div className="controls">
                                            <InputGroup className="input-prepend">
                                                <InputGroupAddon addonType="prepend">
                                                    <InputGroupText>X</InputGroupText>
                                                </InputGroupAddon>
                                                <Input id="prependedInput" size="16" type="text" value={text} onChange={e => setText(e.target.value)} required />
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

Addcomment.propTypes = {
    addComment: PropTypes.func.isRequired,
}

export default connect(null, { addComment })(Addcomment)
