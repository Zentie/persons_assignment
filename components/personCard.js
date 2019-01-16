import React, {Component} from 'react';
import axios from 'axios';

import getConfig from 'next/config';
const {serverRuntimeConfig, publicRuntimeConfig} = getConfig();

class PersonCard extends React.Component {

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

      axios.delete(PersonCard.GetPersonsUrl() + '/' + personId)
      .then(response => {
        this.props.onDeletePerson(personId)
      })
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
              <button onClick={this.deletePerson} className="button button--danger">Delete</button>
            </div>
          </div>
        );
    }
}

export default PersonCard;
