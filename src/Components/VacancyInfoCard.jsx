import React, { Component } from "react";
import Responsive from "react-responsive";
import { Col, Row, Button, notification } from "antd";
import ReactHtmlParser from "react-html-parser";
import client, { refreshAuthHeaders } from "../API_calls/client";
import {
  setAuthState,
  setProfile,
  setRedirection,
  setEvent
} from "../store/actions";
import { connect } from "react-redux";

class VacancyInfoCardPres extends Component {
  state = {
    id: this.props.vacancyId,
  };

  handleClick = e => {
    e.preventDefault();
    if (this.props.isLoggedIn) {
      client
        .post("/ACG/reservevacancy/", { vacancy_id: this.state.id })
        .then(response => {
          if (response.status == "201") {
            notification.success({
              message: "Applied successfully",
              description: "You applied to " + this.props.vacancyTitle
            });
            this.props.redirectionHandler("/ACG/");
          }
        })
        .catch(error => {
          if (error.response.status == "302") {
            console.log("response data: " + error.response.data);
            console.log("response headers: " + error.response.headers);
            notification.success({
              message: "Redirecting you"
            });
            //redirect to external link! NOT WORKING!
            window.location = error.response.data.url;
          }
          else{
            console.log(error.response);
          }
        });
    } else {
      console.log("USER IS NOT LOGGED IN!");
    }
  };

  render() {
    return (
      <Row
        style={{
          background:
            "linear-gradient(to bottom right,rgba(255, 255, 255, 0.9),rgba(255, 255, 255, 0.9))",
          padding: "20px",
          height: "100%",
          width: "100%",
          borderRadius: "20px",
          marginBottom: "20px"
        }}
      >
        <Row>
          <Col xl={8} lg={8} md={24} sm={24} xs={24}>
            <h2
              style={{
                color: "Black",
                fontSize: "20pt",
                textAlign: "left",
                fontWeight: "bold"
              }}
            >
              {this.props.vacancyTitle}
            </h2>
            <h3
              style={{
                color: "Grey",
                textAlign: "left"
              }}
            >
              {this.props.companyName}
            </h3>
          </Col>
          <Col
            xl={{ span: 8, push: 8 }}
            lg={{ span: 8, push: 8 }}
            md={24}
            sm={24}
            xs={24}
          >
            <img src={this.props.image} width="100%" />
          </Col>
        </Row>
        <Row>
          <Responsive minWidth={700}>
            <p
              style={{
                color: "Black",
                fontSize: "14pt",
                textAlign: "left",
                marginTop: "30px"
              }}
            >
              {ReactHtmlParser(this.props.text)}
            </p>
          </Responsive>
          <Responsive maxWidth={700}>
            <p
              style={{
                color: "Black",
                fontSize: "10pt",
                textAlign: "left",
                marginTop: "20px"
              }}
            >
              {ReactHtmlParser(this.props.text)}
            </p>
          </Responsive>
        </Row>
        <Row>
          <Button type="primary" onClick={this.handleClick}>
            Apply
          </Button>
        </Row>
      </Row>
    );
  }
}

const mapStateToProps = state => {
  return {
    isLoggedIn: state.isAuthenticated,
    accountProfile: state.accountProfile,
    redirectAvailable: state.redirectAvailable,
    appliedEvent: state.appliedEvent
  };
};

const mapDispatchToProps = dispatch => {
  return {
    authenticationChangedHandler: isLoggedIn => {
      dispatch(setAuthState(isLoggedIn));
    },
    profileAvailableHandler: profile => {
      dispatch(setProfile(profile));
    },
    redirectionHandler: redirect => {
      dispatch(setRedirection(redirect));
    },
    appliedEventHandler: event => {
      dispatch(setEvent(event));
    }
  };
};

const VacancyInfoCard = connect(mapStateToProps, mapDispatchToProps)(
  VacancyInfoCardPres
);

export default VacancyInfoCard;
