import React, { Component } from "react";
import { connect } from "react-redux";
import {setAuthState,setProfile,setRedirection, setEvent} from "../store/actions";
import { Card, Row, Col, Button,Tag } from "antd";
import Responsive from 'react-responsive';
import client, { refreshAuthHeaders } from "../API_calls/client";
import {NavLink} from 'react-router-dom';
import Loading from "./Loading";

class EventCardPres extends Component {
  state={order:0,id:this.props.eventId,available:false,applied:this.props.appliedEvent,loading:true,booth:this.props.isBooth}
  componentDidMount() {
    if(this.props.isLoggedIn && this.props.accountProfile)
    if(this.props.isOpen && this.state.booth) {
      this.setState({available:true})
    }
    this.setState({loading:false})
  }
  render() {
    if(!this.state.loading)
      return (
        <Row type='flex' justify='center'>
        <Col xl={16} lg={20} md={24} sm={24} xs={24}>
        <Card bodyStyle={{padding:10}} style={{backgroundColor:this.props.backgroundColor}} bordered={true}>
          <Row gutter={10}>
            <Col xl={11} lg={11} md={9} sm={24} xs={24} >
              <img style={{top:0}} src={this.props.image} width="50%" />
            </Col>
            <Col xl={13} lg={13} md={15} sm={24} xs={24}>
              <Row>
                <h4 style={{ color: "#008F47", fontSize: "200%" }}>
                  {this.props.name}
                </h4>
              </Row>
              <Row style={{color:'#008F47'}}>
                <p>{this.props.description}</p>
              </Row>
              <Row>
                <Tag style={{cursor:'default'}} color={this.state.available && this.props.isLoggedIn && this.state.booth?'#00A859':'red'}>
                {this.state.booth? //Check if the user is booth applicant
                (!this.props.isLoggedIn || !this.props.accountProfile? //Check if user is logged in and the event is open
                  'You must have a profile to apply':
                  this.state.available && this.props.isLoggedIn?'Available!':"This event isn't available right now"):
                  'Online registration is coming soon'
                  }
                </Tag>

              </Row>
              <div style={{ top:10 }}>
              <NavLink to={`/events/${this.props.name}/${this.state.id}/preferences`}>
              <Button disabled={!this.state.available} className='aces-txt' type="primary" onClick={this.HandleApply} style={{margin:10}}>
              Apply
                  </Button></NavLink>
          </div>
            </Col>
          </Row>
        </Card>
        </Col>
        </Row>
      );
      else
      return <Loading />
  }
}


const mapStateToProps = state => {
  return {
    isLoggedIn: state.isAuthenticated,
    accountProfile:state.accountProfile,
    redirectAvailable:state.redirectAvailable,
    appliedEvent:state.appliedEvent
  }
}

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

const EventCard = connect(mapStateToProps, mapDispatchToProps)(EventCardPres);

export default EventCard;
