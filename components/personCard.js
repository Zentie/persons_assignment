import React, {Component} from 'react';
import axios from 'axios';

class PersonCard extends React.Component {

    deletePerson = (person) => {
      debugger;
      event.preventDefault();
    }

    render() {
        return (
          <div className="flex">
            <div className="flex--nine">
              <div>{this.props.person.name}</div>
              <div>{this.props.person.job}</div>
            </div>
            <div className="flex--one">{this.props.person.age}</div>
            <div className="flex--three">{this.props.person.nick}</div>
            <div className="flex--two">
              <input disabled type="checkbox" checked={this.props.person.employee} />
            </div>
            <div className="flex--two">
              <button onClick={() => {this.deletePerson(this.props.person)}} className="">Delete</button>
            </div>
          </div>
        );
    }
}

export default PersonCard;