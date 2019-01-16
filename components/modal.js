import React, {Component} from 'react';
import axios from 'axios';

import getConfig from 'next/config';
const {serverRuntimeConfig, publicRuntimeConfig} = getConfig();

class Modal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      job: '',
      age: '',
      nick: '',
      employee: false
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

    axios.post(Modal.GetPersonsUrl(), newPerson )
    .then(response => {
      this.props.onAddingPerson(response.data)
      this.props.onClose()
    })
    this.setState({
      name: '',
      job: '',
      age: '',
      nick: '',
      employee: false
    });
  }

  render() {
    if (!this.props.show) {
      return null;
    }

    return (
      <div className="modal--backdrop">
        <div className="modal">
          {this.props.children}
          <form className="modal--form" onSubmit={this.handleSubmit}>
            <label>
              Name:
              <input type="text" value={this.state.name} onChange={this.handleChange} name="name" />
            </label>
            <label>
              Job Title:
              <input type="text" value={this.state.job} onChange={this.handleChange} name="job" />
            </label>
            <label>
              Age:
              <input type="text" value={this.state.age} onChange={this.handleChange} name="age" />
            </label>
            <label>
              Nickname:
              <input type="text" value={this.state.nick} onChange={this.handleChange} name="nick" />
            </label>
            <label>
              Employee:
              <input type="checkbox" value={this.state.employee} onChange={this.handleChange} name="employee" />
            </label>
            <div className="modal--footer">
              <button type="submit" className="button button--success">Ok</button>
              <button className="button button--warning" onClick={this.props.onClose}>Cancel</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Modal;
