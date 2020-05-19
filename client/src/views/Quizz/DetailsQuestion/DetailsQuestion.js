import React, { Component } from 'react';
import {Card,CardHeader,CardBody,Table, ListGroupItem} from 'reactstrap';
import axios from 'axios';
class DetailsQuestion extends Component {  
    constructor(props){
        super(props);
       
       this.state = {
         description : '',
         alternatives : [],
         points : '',
       }
      }
      componentDidMount() {
        const id = this.props.match.params.id;
        axios.get(`http://localhost:5000/Questions/questions/${id}`)
        .then(res => {
            this.setState({
            description : res.data.description,
            alternatives : res.data.alternatives,
            points : res.data.points
          });
          console.log(this.state);
        })
      } 
    render(){
      const getBadge = (isCorrect) => {
        return isCorrect === true ? 'success' :
        isCorrect === false ? 'danger' :
            
                'primary'
      }
      return(
      <Card>
        <CardHeader>
          <i className="fa fa-align-justify"></i> Details of the question 
        </CardHeader>
        <CardBody>
          <Table responsive striped>
            <thead>
            <tr>
              <th> The question is : {this.state.description} ?</th>              
            </tr>
            </thead>
            <tbody>
            {
              this.state.alternatives.map(alt =>
              <tr key={alt.text}><td><ListGroupItem color={getBadge(alt.isCorrect)}>{alt.text}</ListGroupItem></td></tr>)
            }
            
            </tbody>
          </Table>
          
        </CardBody>
      </Card>)
    }
}
export default DetailsQuestion;