import React, { Component } from "react";
import { Button, Tag, Alert } from "antd";
import client, { refreshAuthHeaders } from "../API_calls/client";
import AboutCard from '../Components/AboutCard'

class External extends Component {
  HandleClick = () => {
    client
      .post(`/registration/applyforevent/`, {
        event_id: this.props.match.params.eventId
      })
      .then(response => {
        window.location =`https://goo.gl/forms/KrboJmouyuvj05D63`
      })
      .catch(error => {
        console.log(error);
      });
  };
  render() {
    return (
      <div style={{ marginTop: 40, textAlign: "center" }}>
        <h1
          style={{
            color: "white",
            backgroundColor: "#008F47",
            padding: 5,
            borderRadius: 5,
            fontWeight: 700
          }}
        >
          {this.props.match.params.eventName}
        </h1>
        <h2
          style={{
            color: "white",
            padding: 5,
            borderRadius: 5,
            fontWeight: 700
          }}
        >
          Online Test
        </h2>
          <Button
            type="primary"
            style={{ margin: "auto", display: "block", marginTop: 20 }}
            onClick={this.HandleClick}
          >
            Take the test
          </Button>
          <hr />
          <h4
          style={{
            color: "white",
            padding: 5,
            borderRadius: 5,
            fontWeight: 700
          }}
        >
        <AboutCard text={<p>Note: The link is clickable only once , please make sure you click only when you are ready.<br />
          Please make sure you type your ACES E-Mail correctly in the test.<br />
          The duration of this test is 15 minutes.<br />
          Check our Facebook page for the results and deadline for taking the test.</p>}>
          
          </AboutCard>
        </h4>
      </div>
    );
  }
}

export default External;
