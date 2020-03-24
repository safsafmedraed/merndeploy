import React, { Component } from "react";
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
import axios from 'axios';
import { Redirect } from "react-router-dom";

class AddPost extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            isSignedUp: false,
            hide: true,
            title: '',
            description: '',
            extra: '',
            User: '', collapse: true,
            fadeIn: true,
            timeout: 300
        }


        this.toggle = this.toggle.bind(this);
        this.toggleFade = this.toggleFade.bind(this);

        this.Onsubmit = this.Onsubmit.bind(this);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.OnchangeDecription = this.OnchangeDecription.bind(this);
        this.OnchangeExtra = this.OnchangeExtra.bind(this);
        this.OnchangeUser = this.OnchangeUser.bind(this);
        this.togglePrimary = this.togglePrimary.bind(this);
        this.ok = this.ok.bind(this);

    }

    ok() {
        this.setState({
            Alert: this.state.Alert
        });
    }


    togglee() {
        this.setState({
            modal: !this.state.modal,
        });
    }


    onChangeTitle(e) {
        this.setState({
            title: e.target.value
        });
    }
    OnchangeDecription(e) {
        this.setState({
            description: e.target.value
        })
    }
    OnchangeExtra(e) {
        this.setState({
            extra: e.target.value
        })
    }
    OnchangeUser(e) {
        this.setState({
            User: e.target.value
        })
    }
    Onsubmit(e) {
        e.preventDefault();
        const Post = {
            title: this.state.title,
            description: this.state.description,
            extra: this.state.extra,
            User: this.state.User
        };

        axios.post('http://localhost:5000/subjects/Add', Post).then(
            res => {
                if (res.status === 200) {
                    this.setState({ isSignedUp: true })
                }


            }).catch(this.setState({ hide: false }));


        console.log(Post);

    }
    toggle() {
        this.setState({ collapse: !this.state.collapse });
    }

    toggleFade() {
        this.setState((prevState) => { return { fadeIn: !prevState } });
    }
    togglePrimary() {
        this.setState({
            primary: !this.state.primary,
        });
    }
    render() {

        if (this.state.isSignedUp) {
            // redirect to Forum if signed up
            return <Redirect to={{ pathname: "/Forum" }} />;
        }

        return (
            <div>

                <Row>
                    <Col xs="12">
                        <Fade timeout={this.state.timeout} in={this.state.fadeIn}>
                            <Card>
                                <CardHeader>
                                    <i className="fa fa-edit"></i>Form Elements
                  <div className="card-header-actions">

                                        <Button color="link" className="card-header-action btn-minimize" data-target="#collapseExample" onClick={this.toggle}><i className="icon-arrow-up"></i></Button>
                                        <Button color="link" className="card-header-action btn-close" onClick={this.toggleFade}><i className="icon-close"></i></Button>
                                    </div>
                                </CardHeader>
                                <Collapse isOpen={this.state.collapse} id="collapseExample">
                                    <CardBody>
                                        <Form className="form-horizontal" onSubmit={this.Onsubmit}>
                                            <FormGroup>
                                                <Label htmlFor="prependedInput">Post Title </Label>
                                                <div className="controls">
                                                    <InputGroup className="input-prepend">
                                                        <InputGroupAddon addonType="prepend">
                                                            <InputGroupText>Title</InputGroupText>
                                                        </InputGroupAddon>
                                                        <Input id="prependedInput" size="16" type="text" value={this.state.title} onChange={this.onChangeTitle} />
                                                    </InputGroup>

                                                </div>
                                            </FormGroup>
                                            <FormGroup>
                                                <Label htmlFor="appendedInput">Post Description</Label>
                                                <div className="controls">
                                                    <InputGroup>
                                                        <Input id="appendedInput" size="16" type="text" value={this.state.description} onChange={this.OnchangeDecription} />
                                                        <InputGroupAddon addonType="append">
                                                            <InputGroupText>Description</InputGroupText>
                                                        </InputGroupAddon>
                                                    </InputGroup>
                                                </div>
                                            </FormGroup>
                                            <FormGroup>
                                                <Label htmlFor="appendedPrependedInput">Your Code here </Label>
                                                <div className="controls">
                                                    <InputGroup className="input-prepend">
                                                        <InputGroupAddon addonType="prepend">
                                                            <InputGroupText>Your problem</InputGroupText>
                                                        </InputGroupAddon>
                                                        <Input id="appendedPrependedInput" size="16" type="text" value={this.state.extra} onChange={this.OnchangeExtra} />
                                                        <InputGroupAddon addonType="append">
                                                            <InputGroupText>Code</InputGroupText>
                                                        </InputGroupAddon>
                                                    </InputGroup>
                                                </div>
                                            </FormGroup>

                                            <FormGroup>
                                                <Label htmlFor="appendedInputButtons">Key words</Label>
                                                <div className="controls">
                                                    <InputGroup>
                                                        <Input id="appendedInputButtons" size="16" type="text" value={this.state.User} onChange={this.OnchangeUser} />
                                                        <InputGroupAddon addonType="append">
                                                            <Button color="secondary">Search Key words</Button>

                                                        </InputGroupAddon>
                                                    </InputGroup>
                                                </div>
                                            </FormGroup>

                                            <div className="form-actions">

                                                <Button color="primary" onClick={this.togglePrimary}>Submits Post</Button>
                                            </div>
                                            <Modal isOpen={this.state.primary} toggle={this.togglePrimary}
                                                className={'modal-primary ' + this.props.className}  >
                                                <ModalHeader toggle={this.togglePrimary}>Confirmation</ModalHeader>
                                                <ModalBody>
                                                    Publish your Post ?
                                                    Please Confirm your request
                                                    </ModalBody>
                                                <ModalFooter>
                                                    <Button color="primary" onClick={this.Onsubmit} >Submit Post</Button>
                                                    <Button color="secondary" onClick={this.togglePrimary}>Cancel</Button>
                                                </ModalFooter>

                                                <Col xs="20" md="10" hidden={this.state.hide} >

                                                    <Card>
                                                        <CardHeader>
                                                            <i className="fa fa-align-justify"></i><strong color='red'>Alerts </strong>

                                                        </CardHeader>
                                                        <CardBody>
                                                            <Alert color="warning" isOpen={this.state.visible} toggle={this.onDismiss}>
                                                                Subjects exists or Maybe empty field
                                                            </Alert>
                                                        </CardBody>
                                                    </Card>
                                                </Col>


                                            </Modal>
                                        </Form>
                                    </CardBody>
                                </Collapse>
                            </Card>
                        </Fade>
                    </Col>
                </Row>

            </div>
        )
    }
}

export default AddPost;
