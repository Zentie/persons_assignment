import React, {Component} from 'react';
import { Button, Input, Form, FormGroup, Label } from 'reactstrap';
import axios from 'axios';

import getConfig from 'next/config';
const {serverRuntimeConfig, publicRuntimeConfig} = getConfig();

class NewPersonForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      job: '',
      age: '',
      nick: '',
      employee: true
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

  handleChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({[name]: value});
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const newPerson = this.state

    axios.post(NewPersonForm.GetPersonsUrl(), newPerson )
    .then(response => {
      this.props.onAddingPerson(response.data)
    })
    this.setState({
      name: '',
      job: '',
      age: '',
      nick: '',
      employee: true
    });
  }

  render() {
    return (
          <Form className="modal--form" onSubmit={this.handleSubmit}>
            <FormGroup>
              <Label>Name:</Label>
              <Input type="text" value={this.state.name} onChange={this.handleChange} name="name" />
            </FormGroup>
            <FormGroup>
              <Label>Job Title:</Label>
              <Input type="text" value={this.state.job} onChange={this.handleChange} name="job" />
            </FormGroup>
            <FormGroup>
              <Label>Age:</Label>
              <Input type="text" value={this.state.age} onChange={this.handleChange} name="age" />
            </FormGroup>
            <FormGroup>
              <Label>Nickname:</Label>
              <Input type="text" value={this.state.nick} onChange={this.handleChange} name="nick" />
            </FormGroup>
            <FormGroup>
              <Label>Employee:</Label>
              <Input type="checkbox" value={this.state.employee} onChange={this.handleChange} name="employee" />
            </FormGroup>
            <Button className="float-left" type="submit" color="success">Ok</Button>
          </Form>
    );
  }
}

export default NewPersonForm;
