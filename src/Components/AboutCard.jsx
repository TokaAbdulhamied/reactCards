import React, { Component } from "react";
import Responsive from 'react-responsive'

export default class AboutCard extends Component {
  render() {
    return (
      <div
        style={{
          background:
            "linear-gradient(to bottom right,rgba(35, 107, 74, 0.8),rgba(6, 38, 35, 0.8))",
          marginTop: "40px",
          padding: "20px",
          height: "100%",
          width: "100%",
          borderRadius: "20px"
        }}
      >
        <h2
          style={{
            color: "white",
            fontSize: "22pt",
            textAlign: "center",
            fontWeight: "bold"
          }}
        >
          {this.props.title}
        </h2>
        <Responsive minWidth={700}>
        <p
          style={{
            color: "white",
            fontSize: "18pt"
          }}
        >
          {this.props.text}
        </p>
        </Responsive>
        <Responsive maxWidth={700}>
        <p
          style={{
            color: "white",
            fontSize: "12pt"
          }}
        >
          {this.props.text}
        </p>
        </Responsive>
      </div>
    );
  }
}
