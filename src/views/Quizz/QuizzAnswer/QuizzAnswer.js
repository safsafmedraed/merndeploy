import React, { Component } from "react";
import { Card, CardHeader, Form, Col, Label, FormGroup, Input, FormText, Button } from "reactstrap";
import Axios from "axios";

import QuestionBox from "./QuestionBox";
import QuestionBox1 from "./Questionbox1";
import ResultQuizz from "./ResultQuizz";
import "./style.css";
import Timerr from "./Timer";
import ErrorAlert from "../Question/ErrorAlert";

class QuizzAnswer extends Component {
    constructor(props) {
        super(props);
        this.codechange = this.codechange.bind(this);
        //this.getcode=this.getcode.bind(this);
        this.state = {
            questionbank: [],
            code: "",
            score: 0,
            number: 0,
            total: 0,
            exist: false,
            Timer: 0,
            error1: false,
            yes: false,
            id: "",
            quizz: [],
            haha: false,
            idquizz: ''
        }
    }
    getClasses() {
        const id = localStorage.getItem('user1');
        console.log(id)
        Axios.get(`http://localhost:5000/users/userid/${id}`)
            .then(res => {
                this.setState({
                    yes: res.data.quizzexist,
                    quizz: res.data.Quizzs
                })
                console.log(res.data)
            })
    }

    endquizz = () => {
        const id = localStorage.getItem('user1');
        console.log(id)
        Axios.put(`http://localhost:5000/users/usernoquizz/${id}/${this.state.idquizz}/${this.state.score}`)
            .then(res => {
                this.setState({
                    yes: false
                })
            })
    }
    //yncd0r
    getcode(e) {
        e.preventDefault();


        Axios.get(`http://localhost:5000/quizz/quizzcode/${this.state.code}`)

            .then(res => {
                this.state.quizz.forEach(element => {
                    if (element._id === res.data._id) {
                        this.setState({
                            questionbank: res.data.Question,
                            exist: true,
                            Timer: res.data.Timer,
                            error1: false,
                            haha: false,
                            idquizz: res.data._id
                        })
                    }
                    else this.setState({ haha: true })
                    console.log(this.state.haha)
                })
            }).catch(err => this.setState({ error1: true }));

    }
    codechange(e) {
        this.setState({
            code: e.target.value
        })
    }

    computeAnswer = (answer, Correct, points) => {
        this.setState({
            number: this.state.number + 1,
            total: this.state.total + points
        })
        let str1 = answer.toUpperCase().replace(/\s+/g, '');
        let str2 = Correct.toUpperCase().replace(/\s+/g, '');
        if (str1 === str2) {
            this.setState({
                score: this.state.score + points

            })
            console.log("your score is" + this.state.score);
            console.log('you answered' + this.state.number + " questions")
        }
    }

    render() {
        let time = <Timerr Timer={this.state.Timer}></Timerr>;
        return (
            <Card>
                {this.state.yes === false ? <h2>vous n'avez pas de quizz</h2> : null}
                {this.state.questionbank.length === 0 && this.state.yes === true && this.state.number === 0 ? <CardHeader>
                    <Form className="form-horizontal" onSubmit={e => this.getcode(e)}>
                        <FormGroup>
                            <Col md="3">
                                <Label htmlFor="code">Enter the code of the quizz : </Label>
                            </Col>
                            <Col xs="12" md="9">
                                <Input type="text" id="Code" name="desCodecription" placeholder="Enter Code..." autoComplete="Code" value={this.state.code} onChange={this.codechange} />
                                <FormText className="help-block">Please enter your Code</FormText><Button type="submit" size="sm" color="primary"><i className="fa fa-dot-circle-o"></i> Submit</Button>
                            </Col>
                        </FormGroup>
                    </Form>
                </CardHeader> : null}
                {this.state.error1 === true || this.state.haha === true ? <ErrorAlert text={"code inexistant"} /> : null}
                {this.state.exist === true && this.state.questionbank.length !== this.state.number ? time : null}

                {
                    this.state.questionbank.length > 0 &&
                    this.state.number < this.state.questionbank.length
                    && this.state.Timer > 0 &&
                    this.state.questionbank.map(Question => {

                        return Question.alternatives.length > 0 ?
                            <QuestionBox question={Question.description}
                                options={Question.alternatives}
                                key={Question._id}
                                selected={answer => this.computeAnswer(answer, Question.Correct, Question.points)}
                            />
                            : <QuestionBox1 question={Question.description}
                                options={Question.alternatives}
                                key={Question._id}
                                selected={greeting => this.computeAnswer(greeting, Question.Correct, Question.points)}
                            />
                    })

                }
                {
                    (this.state.Timer <= 0 && this.state.number !== this.state.questionbank.length && this.state.exist === true) || (this.state.number === this.state.questionbank.length && this.state.exist === true) ?

                        <ResultQuizz score={this.state.score} total={this.state.total} endquizz={this.endquizz}></ResultQuizz> : null
                }
                {this.state.questionbank === null ? <h6>you entered a wrong code</h6> : null}
            </Card>
        )
    }
    componentDidMount() {
        this.myInterval = setInterval(() => {
            this.setState(prevState => ({
                Timer: prevState.Timer - 1
            }))
        }, 1000)
        this.getClasses();

    }

    componentDidUpdate() {
        if (this.state.Timer < 0 || this.state.questionbank.length === this.state.number) {
            //  this.setState({
            //      exist: false,
            //      Timer: 0
            //  })
            //  console.log(this.state.Timer);

        }
    }
    componentWillUnmount() {
        clearInterval(this.myInterval)
    }
}
export default QuizzAnswer;