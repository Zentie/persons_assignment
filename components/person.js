import React, {Component} from 'react';
import { Row, Col, Button, Input } from 'reactstrap';
import axios from 'axios';

import getConfig from 'next/config';
const {serverRuntimeConfig, publicRuntimeConfig} = getConfig();

class person extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      id: props.person.id
    };
  }

  static GetPersonsUrl() {
    if (process.env.NODE_ENV === "production") {
        return process.env.RESTURL_PERSONS_PROD
            || publicRuntimeConfig.RESTURL_PERSONS_PROD;
    } else {
        return process.env.RESTURL_PERSONS_DEV;
    }
  }

    deletePerson = (event) => {
      event.preventDefault();

      const personId = this.state.id

      axios.delete(person.GetPersonsUrl() + '/' + personId)
      .then(response => {
        this.props.onDeletePerson(personId)
      })
    }

    render() {
        return (
          <Row className="person">
            <Col lg="5">
              <h4>{this.props.person.name}</h4>
              <h4>{this.props.person.job}</h4>
            </Col>
            <Col lg="1">
              <h4>{this.props.person.age}</h4>
            </Col>
            <Col lg="3">
              <h4>{this.props.person.nick}</h4>
            </Col>
            <Col lg="2">
              <Input disabled type="checkbox" checked={this.props.person.employee} />
            </Col>
            <Col lg="1">
              <Button color="danger" onClick={this.deletePerson} className="button button--danger">Delete</Button>
            </Col>
          </Row>
        );
    }
}

export default person;
