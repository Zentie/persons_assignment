import React from 'react';
import axios from 'axios';

class Index extends React.Component {

  static async getInitialProps () {

    var promise  =  axios.get('http://localhost:4000/persons')
      .then(response => {
        return {
          hasErrored: false,
          personData: response.data
        };
      })
      .catch(error => {
        return {
          hasErrored: true,
          message: error.message
        }
      });
      return  promise;
  }

  constructor(props) {
    super(props);
    console.log('Index constructor called');
    this.state = {
      hasErrored: props.hasErrored,
      message: props.message,
      personData: props.personData
    }
  };

  componentDidMount() {

  }

  componentWillUnmount() {

  }

  render() {
    return (
      <ul>
        {this.state.personData.map((person, index) =>
          <li key={index}>
            {person.name}, {person.job}, {person.age}, {person.nick}, {person.employee}
          </li>
        )}
      </ul>
    )
  }
}

export default Index;
