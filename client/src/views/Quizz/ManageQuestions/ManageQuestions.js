import React, { Component } from 'react';
import { Card, CardHeader, CardBody, Table, Button, CardFooter } from 'reactstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import SuccessAlert from '../Question/successAlert';
import ErrorAlert from '../Question/ErrorAlert';

class ManageQuestions extends Component {
  constructor(props) {

    super(props);
    this.state = {
      Questions: [],
      questionLink: '/DetailsQuestion/',
      alert_msg: '',
    }
  }
  ondelete(ide) {
    const id = ide;
    if (window.confirm('Are you sure you want to delete this Question?')) {
      axios.delete(`/Questions/questions/${id}`)
        .then(res => { this.setState({ alert_msg: 'success' }) })
        .catch(error => {
          this.setState({
            alert_msg: 'error'
          })
        });
    }
  }
  getlist() {
    axios.get('/Questions/questions')
      .then(res => {
        const Questions = res.data;
        this.setState({ Questions });
        console.log(Questions);
      })

  }
  componentDidMount() {
    this.getlist();
  }
  componentDidUpdate() {
    this.getlist();
  }
  render() {
    return (<Card>
      <CardHeader>
        <i className="fa fa-align-justify"></i> List of all Questions
        </CardHeader>
      <CardBody>
        <Table responsive striped>
          <thead>
            <tr>
              <th>The Question</th>
              <th>Points</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {
              this.state.Questions.map(question =>
                <tr key={question._id}>
                  <td><Link to={this.state.questionLink + question._id}> {question.description}</Link></td>
                  <td>{question.points}</td>
                  <td> <Button className="fa fa-trash" onClick={() => this.ondelete(question._id)}></Button></td>
                </tr>
              )
            }
          </tbody>
        </Table>

      </CardBody>
      <CardFooter>
        {this.state.alert_msg === "success" ? <SuccessAlert text={'successful'} /> : null}
        {this.state.alert_msg === "error" ? <ErrorAlert /> : null}
      </CardFooter>
    </Card>)
  }
}
export default ManageQuestions;