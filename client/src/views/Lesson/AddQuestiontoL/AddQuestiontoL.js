import React, { Component } from 'react';
import { Card, CardHeader, CardBody, Form, FormGroup, Col, Label, Input, FormText, CardFooter, Button, NavLink, Nav } from 'reactstrap';
import axios from 'axios';
import SuccessAlert from '../../Quizz/Question/successAlert';
import ErrorAlert from '../../Quizz/Question/ErrorAlert';

class AddQuestiontoL extends Component {
  constructor(props) {
    super(props);
    this.Onchangedesc = this.Onchangedesc.bind(this);
    this.Onchangedesc1 = this.Onchangedesc1.bind(this);
    this.Onchangepoints = this.Onchangepoints.bind(this);
    this.Onchangepoints1 = this.Onchangepoints1.bind(this);
    this.OnchangeCorrect = this.OnchangeCorrect.bind(this);
    this.OnchangeCorrect1 = this.OnchangeCorrect1.bind(this);
    this.handlechange = this.handlechange.bind(this);
    this.Onsubmit = this.Onsubmit.bind(this);
    this.onsubmit1 = this.onsubmit1.bind(this);
    this.state = {
      description: '',
      d1: '',
      alternatives: [{ text: '', isCorrect: false }],
      alternatives1: [{ text: '', isCorrect: false }],
      Correct: '',
      Correct1: '',
      points: '',
      points1: '',
      alert_msg: '',
      idd: '',
      choicetype: 'multiple',
      module : []
    };
  }

  Onchangedesc(e) {
    this.setState({
      description: e.target.value
    });
  }
  Onchangedesc1(e) {
    this.setState({
      d1: e.target.value
    });
  }
  handlechange(e, index) {
    this.state.alternatives[index].text = e.target.value
    //aezaea
    this.setState({ alternatives: this.state.alternatives })
  }
  handleremove(index) {
    this.state.alternatives.splice(index, 1)
    this.setState({ alternatives: this.state.alternatives })
  }
  OnchangeCorrect(e) {
    this.setState({
      Correct: e.target.value
    });
  }
  OnchangeCorrect1(e) {
    this.setState({
      Correct1: e.target.value
    });
  }
  addAnswer() {
    const item = { text: "", isCorrect: false }
    this.setState({ alternatives: [...this.state.alternatives, item] })
  }
  Onchangepoints(e) {
    this.setState({
      points: e.target.value
    });
  }
  Onchangepoints1(e) {
    this.setState({
      points1: e.target.value
    });
  }
  Onsubmit(e) {
    const id = this.props.match.params.id;
    e.preventDefault();
    const alternative = {
      text: this.state.Correct,
      isCorrect: true,
    }
    axios.get(`http://localhost:5000/Module/ModuleLesson/${this.props.match.params.id}`)
    .then(res => {this.setState({module : res.data})})
    let aa = [...this.state.alternatives, alternative];
    const Question = {
      description : this.state.description,
      alternatives : aa,
      points : this.state.points,
      Correct : this.state.Correct,
      module : this.state.module._id,
      lesson : this.props.match.params.id
      };

    axios.post(`http://localhost:5000/Questions/questions`, Question)
      .then(res => {
        this.setState({ alert_msg: 'success', idd: res.data })
        console.log(res)
        axios.put(`http://localhost:5000/Lesson/addQTo/${id}/${res.data._id}`).then(res => { console.log(res.data) });
      }).catch(error => {
        this.setState({ alert_msg: 'error' });
      })

  }
  onsubmit1(e) {
    const id = this.props.match.params.id;
    e.preventDefault();
    const alternative = {
      text: this.state.Correct1,
      isCorrect: true,
    }
    console.log(this.props.match.params.id)
    axios.get(`http://localhost:5000/Module/ModuleLesson/${this.props.match.params.id}`)
    .then(res => {this.setState({module : res.data})
  console.log(this.state.module)})
  const Questionsingle ={
    description : this.state.d1,
    alternative : alternative,
    points: this.state.points1,
    Correct : this.state.Correct1,
    module : this.state.module._id,
    lesson : this.props.match.params.id
  }
    console.log(Questionsingle)
    axios.post(`http://localhost:5000/Questions/questions`, Questionsingle)
      .then(res => {
        this.setState({ alert_msg: 'success', idd: res.data._id })
        console.log(res)
        axios.put(`http://localhost:5000/Lesson/addQTo/${id}/${res.data._id}`).then(res => { console.log(res.data) });
      }).catch(error => {
        this.setState({ alert_msg: 'error' });
      })
  }
  render() {
    return (
      <Card>
        <CardHeader>
          {this.state.alert_msg === "success" ? <SuccessAlert text={"successfully added"} /> : null}
          {this.state.alert_msg === "error" ? <ErrorAlert text={"something went wrong"} /> : null}

          <div className="div-radio">
            <label><input className="radio" type="radio" name="choicetype" onChange={() => this.setState({ choicetype: 'multiple' })} />Single answer</label>
            <label><input className="radio" defaultChecked="true" type="radio" name="choicetype" onChange={() => this.setState({ choicetype: 'single' })} />Multiple answer</label>
          </div>

        </CardHeader>
        {this.state.choicetype !== 'multiple' ?
          <CardBody>
            <Form onSubmit={this.Onsubmit} className="form-horizontal">
              <FormGroup row>
                <Col md="3">
                  <Label htmlFor="description">Text of the Question : </Label>
                </Col>
                <Col xs="12" md="9">
                  <Input type="text" id="description" name="description" placeholder="Enter description..." autoComplete="description" value={this.state.description} onChange={this.Onchangedesc} />
                  <FormText className="help-block">Please enter your Question</FormText>
                </Col>
              </FormGroup>
              {
                this.state.alternatives.map((Wronganswer, index) => {
                  return (
                    <FormGroup row key={index}>
                      <Col md="3">
                        <Label htmlFor="hf-password">Wrong Answer number {index + 1} : </Label>
                      </Col>
                      <Col xs="12" md="8">
                        <div className="input-group">
                          <Input id="appendedInputButton" size="16" className="form-control" type="text" placeholder="Answer..." autoComplete="Answer" value={Wronganswer.text} onChange={(e) => this.handlechange(e, index)} />
                          <div className="input-group-append">
                            <button className="fa fa-trash" onClick={() => this.handleremove(index)}></button>
                          </div>
                          <FormText className="help-block">Please enter your Answer</FormText>
                        </div>
                      </Col>
                    </FormGroup>
                  )
                })
              }



              <Button onClick={(e) => this.addAnswer(e)} size="sm" color="primary"><i className="fa fa-dot-circle-o"></i>Add answer</Button>
              <FormGroup row>
                <Col md="3">
                  <Label htmlFor="hf-password">Correct Answer : </Label>
                </Col>
                <Col xs="12" md="9">
                  <Input type="text" id="Answer" name="Answer" placeholder="Answer..." autoComplete="Answer" value={this.state.Correct} onChange={this.OnchangeCorrect} />
                  <FormText className="help-block">Please enter your Answer</FormText>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col md="3">
                  <Label htmlFor="hf-password">Points : </Label>
                </Col>
                <Col xs="12" md="9">
                  <Input type="Number" id="Points" name="Points" placeholder="Points..." autoComplete="Points" value={this.state.points} onChange={this.Onchangepoints} />
                  <FormText className="help-block">Please enter How many points for this Question</FormText>
                </Col>
              </FormGroup>
              <CardFooter>
                <Nav>
                  <NavLink><Button type="submit" size="sm" color="primary"><i className="fa fa-dot-circle-o"></i> Submit</Button></NavLink>

                </Nav>

              </CardFooter>
            </Form>
          </CardBody> : null}
        {this.state.choicetype === 'multiple' ?
          <CardBody>
            <Form onSubmit={this.onsubmit1} className="form-horizontal">
              <FormGroup row>
                <Col md="3">
                  <Label htmlFor="description">Text of the Question : </Label>
                </Col>
                <Col xs="12" md="9">
                  <Input type="text" id="description" name="description" placeholder="Enter description..." autoComplete="description" value={this.state.d1} onChange={this.Onchangedesc1} />
                  <FormText className="help-block">Please enter your Question</FormText>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col md="3">
                  <Label htmlFor="hf-password">Correct Answer : </Label>
                </Col>
                <Col xs="12" md="9">
                  <Input type="text" id="Answer" name="Answer" placeholder="Answer..." autoComplete="Answer" value={this.state.Correct1} onChange={this.OnchangeCorrect1} />
                  <FormText className="help-block">Please enter your Answer</FormText>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col md="3">
                  <Label htmlFor="hf-password">Points : </Label>
                </Col>
                <Col xs="12" md="9">
                  <Input type="Number" id="Points" name="Points" placeholder="Points..." autoComplete="Points" value={this.state.points1} onChange={this.Onchangepoints1} />
                  <FormText className="help-block">Please enter How many points for this Question</FormText>
                </Col>
              </FormGroup>
              <CardFooter>
                <Nav>
                  <NavLink><Button type="submit" size="sm" color="primary"><i className="fa fa-dot-circle-o"></i> Submit</Button></NavLink>

                </Nav>

              </CardFooter>
            </Form>
          </CardBody> : null}

      </Card>
    )
  }
}
export default AddQuestiontoL;