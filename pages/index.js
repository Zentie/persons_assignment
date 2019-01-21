import React, {Component} from 'react';
import { Container, Row, Col, Button, Modal, ModalBody } from 'reactstrap';
import axios from 'axios';
import Person from '../components/person';
import DumpDataCard from '../components/dumpDataCard';
import NewPersonForm from '../components/newPersonForm';

import getConfig from 'next/config';
const {serverRuntimeConfig, publicRuntimeConfig} = getConfig();

class Datagrid extends React.Component {

  static GetPersonsUrl() {
    if (process.env.NODE_ENV === "production") {
        return process.env.RESTURL_PERSONS_PROD
            || publicRuntimeConfig.RESTURL_PERSONS_PROD;
    } else {
        return process.env.RESTURL_PERSONS_DEV;
    }
  }

  static async getInitialProps () {
    const promise = axios.get(Datagrid.GetPersonsUrl())
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
      modal: false
    }
  };

  onAddingPerson = (response) => {
    const personData = [...this.state.personData, response];
    this.toggle();
    this.setState({
      personData
    })
  }

  onDeletePerson = (personId) => {
    const personData = this.state.personData;
    const removeIndex = personData.map((item) => { return item.id; }).indexOf(personId);
    personData.splice(removeIndex, 1);
    this.setState({
      personData
    })
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  }

  render() {
    return (
      <Container>
        <Row>
          <Col>
            <h1>Persons Grid</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <Button color="primary" onClick={this.toggle}>Add</Button>
          </Col>
        </Row>
        <Row>
          <Col lg="5">
            <h2>Name</h2>
            <h2>(Job Title)</h2>
          </Col>
          <Col lg="1">
            <h2>Age</h2>
          </Col>
          <Col lg="3">
            <h2>Nickname</h2>
          </Col>
          <Col lg="2">
            <h2>Employee</h2>
          </Col>
          <Col lg="1"></Col>
        </Row>
        {this.state.personData.map((person) =>
          <Person key={person.id} onDeletePerson={this.onDeletePerson} person={person} />
        )}
        <Row>
          <Col><h1>Data Dump</h1></Col>
        </Row>
        <Row>
          <Col>
            <DumpDataCard personData={this.state.personData}/>
          </Col>
        </Row>

        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalBody>
            <NewPersonForm onAddingPerson={this.onAddingPerson} toggle={this.toggle}/>
            <Button className="float-right" color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalBody>
        </Modal>
      </Container>
    )
  }
}

export default Datagrid;
