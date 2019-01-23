import React, {Component} from 'react';
import BarChart from 'react-svg-bar-chart';

class Graph extends React.Component {

  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     personData: props.personData
  //   };
  // }

  render() {

    console.log('persondata', this.props.personData);
    return (
      <BarChart />
    )
  }
}

export default Graph;
