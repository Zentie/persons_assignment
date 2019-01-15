import React, {Component} from 'react';
import axios from 'axios';

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

  handleChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({[name]: value});
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const newPerson = this.state

    axios.post('http://localhost:4000/persons', { newPerson })
    .then(response => {
      this.props.onUpdate(response.data)
      this.props.onClose()
    })

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
              <input type="submit" value="Ok" className="button button--success"/>
              <button className="button button--warning" onClick={this.props.onClose}>Cancel</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Modal;
