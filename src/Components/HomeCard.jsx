import React, { Component } from "react";
import {Button} from 'antd';
import Responsive from 'react-responsive'
import image from '../images/Expo.png'


export default class HomeCard extends Component {
  onClick = () => {
      var url="/events"
      window.location.href = url;
  }
  render() {

    return (
      <div
        style={{
          background:
            "linear-gradient(to bottom right,rgba(191, 191, 191, 0.7),rgba(255, 255, 255, 0.7))",
          marginTop: "40px",
          padding: "20px",
          height: "100%",
          width: "100%",
          borderRadius: "20px"
        }}
      >
        <p
          style={{
            textAlign: "center",
          }}
        >
          <img src={image} width='10%' />
        </p>
        <Responsive minWidth={700}>
        <p
          style={{
            color: "#00512C" ,
            fontSize: "18pt"
          }}
        >
          {this.props.text}
        </p>
        </Responsive>
        <Responsive maxWidth={700}>
        <p
          style={{
            color: "#00512C",
            fontSize: "12pt"
          }}
        >
          {this.props.text}
        </p>
        </Responsive>
        <p
          style={{
            textAlign: "center"
          }}
        >
        <Button type='primary' onClick={this.onClick}>Find out</Button>
        </p>
      </div>
    );
  }
}
