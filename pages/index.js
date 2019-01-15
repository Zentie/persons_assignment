import React, {Component} from 'react';
import axios from 'axios';
import PersonCard from '../components/personCard'
import DumpDataCard from '../components/dumpDataCard'
import Modal from '../components/modal'

class Datagrid extends React.Component {

  static async getInitialProps () {
    var promise = axios.get('http://localhost:4000/persons')
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
      return promise;
  }

  constructor(props) {
    super(props);
    this.state = {
      hasErrored: props.hasErrored,
      message: props.message,
      personData: props.personData,
      isOpen: false
    }
  };

  onUpdate = (response) => {
    const personData = [
      ...this.state.personData,
      response
    ];
    this.setState({
      personData
    })
  }

  toggleModal = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  // componentDidMount() {

  // }

  // componentWillUnmount() {

  // }

  render() {
    return (
      <div className="container--main">
        <section className="section">
          <h1>Persons Grid</h1>
          <button className="button button--primary" onClick={this.toggleModal}>Add</button>
          <Modal onUpdate={this.onUpdate} show={this.state.isOpen}
            onClose={this.toggleModal}>
          </Modal>
          <div className="section--container">
            <div className="section--header flex">
              <div className="section--subtitle flex--nine">
                <h2>Name</h2>
                <h2>(Job Title)</h2>
              </div>
              <h2 className="section--subtitle flex--one">Age</h2>
              <h2 className="section--subtitle flex--three">Nickname</h2>
              <h2 className="section--subtitle flex--two">Employee</h2>
              <div className="flex--two"></div>
            </div>
            <ul>
            {this.state.personData.map((person) =>
              <li className="section--list-item" key={person.id}>
                <PersonCard person={person} />
              </li>
            )}
            </ul>
          </div>
        </section>
        <section className="section">
          <h1>Data Dump</h1>
          <div className="section--container">
            <DumpDataCard />
          </div>
        </section>
      </div>
    )
  }
}

export default Datagrid;
