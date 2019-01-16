import React, {Component} from 'react';

class DumpDataCard extends Component {
    render() {
      let personDataJson = this.props.personData.map(e=>JSON.stringify(e).replace(/|/g,'')).join(',\n');
        return (
          <textarea value={personDataJson} readOnly/>
        );
    }
}

export default DumpDataCard;
