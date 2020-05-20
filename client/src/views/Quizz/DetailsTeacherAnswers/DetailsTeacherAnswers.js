import React, { Component } from 'react';
import { Card, CardHeader, CardBody, Table, CardFooter } from 'reactstrap';

import axios from 'axios';


class DetailsTeacherAnswers extends Component {
  constructor(props) {

    super(props);
    this.state = {
      Quizzs: [],
      Quizz1: [],
      firstname: "",
      lastname: '',
      alert_msg: '',
      score: 0
    }
  }

  componentDidMount() {
    const id = this.props.match.params.id;
    axios.get(`/users/userid/${id}`)
      .then(res => {
        this.setState({
          firstname: res.data.Firstname,
          lastname: res.data.Lastname,
          Quizzs: res.data.Quizzs,
          score: res.data.note
        });
        this.state.Quizzs.forEach(element => {
          console.log(element._id)
          var name = "";
          axios.get(`/quizz/quizz/${element._id}`)
            .then(res => {
              name = res.data.name

              const qq = { score: element.score, name: name, id: element._id }
              console.log(qq);
              this.setState({
                Quizz1: [...this.state.Quizz1, qq]
              })
              console.log(this.state.Quizz1)
            })
        })
      })
  }

  rendername(e) {
    axios.get(`/quizz/quizz/${e}`)
      .then(res => { return (res.data.name) })
  }


  render() {
    return (<Card>
      <CardHeader>
        <i className="fa fa-align-justify"></i> {this.state.lastname} {this.state.firstname} {this.state.score}
      </CardHeader>
      <CardBody>
        <Table responsive striped>
          <thead>
            <tr>
              <th>Quizz name</th>
              <th>Points</th>

            </tr>
          </thead>
          <tbody>
            {this.state.Quizz1.map((quizz, index) =>
              <tr key={index}>
                <td>{quizz.name}</td>
                <td>{quizz.score}</td>
              </tr>
            )}
          </tbody>
        </Table>

      </CardBody>
      <CardFooter>

      </CardFooter>
    </Card>)
  }
}
export default DetailsTeacherAnswers;