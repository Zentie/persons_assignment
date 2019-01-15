import {Component} from "react";
import React from "react";

class DumpDataCard extends Component {
    render() {
        return (
          <div className="flex">
            <div>Data from - 13.01.2019. 13:20:20</div>
            <button className="button button--primary">Download</button>
          </div>
        );
    }
}

export default DumpDataCard;
