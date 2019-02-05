import React, { Component } from "react";
import { Col } from "antd";
import VacancyInfoCard from "../Components/VacancyInfoCard";
import Loading from "../Components/Loading";
import ReactHtmlParser from "react-html-parser";
import client, { refreshAuthHeaders } from "../API_calls/client";

class VacancyInfo extends Component {
  state = {
    id:this.props.match.params.vacancyId,
    vacancy:null,
    loading: true
  };

  componentDidMount() {
    //testing
    client
      .get(`/ACG/vacancy/${this.state.id}/`) 
      .then(response => {
        console.log("received response");
        console.log(response.data)
        this.setState({
          vacancy: response.data,
          loading: false
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    if (this.state.loading)
      return (
        <div style={{ marginTop: 40, textAlign: "center" }}>
          <Loading />
        </div>
      );
    else
      return (
        <div style={{ marginTop: 20, textAlign: "center" }}>
          <Col
            xl={{ span: 12, push: 6 }}
            lg={{ span: 12, push: 6 }}
            md={{ span: 24 }}
            sm={{ span: 24 }}
            xs={{ span: 24 }}
          >
            <VacancyInfoCard
              vacancyTitle={this.state.vacancy.name}
              vacancyId={this.state.id}
              image={this.state.vacancy.company.logo}
              companyName={this.state.vacancy.company.name}
              text={this.state.vacancy.description}
            />
          </Col>
        </div>
      );
  }
}

export default VacancyInfo;
