import React, { Component } from "react";
import Vacancy from './Vacancy'
import ReactHtmlParser from 'react-html-parser';

class ACG extends Component {
  render() {
    return (
      <div style={{marginTop:20,textAlign:'center'}}>
            <Vacancy />
      </div>
    );
  }
}

export default ACG;
