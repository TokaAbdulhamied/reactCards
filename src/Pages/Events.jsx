import React, { Component } from "react";
import { List,Avatar, Col, Row, Button } from "antd";
import EventCard from '../Components/EventCard'
import client, { refreshAuthHeaders } from "../API_calls/client";
import Loading from '../Components/Loading'
import ReactHtmlParser from 'react-html-parser';
import { connect } from "react-redux";
import {setAuthState,setProfile,setRedirection, setEvent} from "../store/actions";

class EventsPres extends Component {
    state={events:null,loading:true,booth:true}
    componentDidMount(){
        client
      .get("/registration/events/")
      .then(response => {
       this.setState({events:response.data})
       this.setState({loading:false})
      })
      .catch(error => {
        console.log(error);
      });
      client
      .get("/registration/checkboothregistration/")
      .then(response => {
        if(response.data.booth)
       this.setState({booth:true})
      })
      .catch(error => {
        console.log(error);
      });
    }
  render() {
      
      if(!this.state.loading)
    return (
      <div style={{ marginTop: 40, textAlign: "center" }}>
        {this.state.events.map((event)=>
        {
          if(event.event_type ==="E")
          {
        return <EventCard name={event.name} key={event.id} 
        eventId={event.id}
        description={ReactHtmlParser(event.description)} image={event.logo}
        backgroundColor='white'
        eventType={event.event_type}
        isOpen={event.is_open}
        isLoggedin={this.props.isLoggedIn}
        isBooth={this.state.booth} />}
        })}
      </div>
    );
    else 
    return (
        <div style={{ marginTop: 40, textAlign: "center" }}>
          <Loading />
        </div>
      );
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
      console.log(isLoggedIn);
      dispatch(setAuthState(isLoggedIn));
    },
    profileAvailableHandler: profile => {
      console.log(profile);
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

const Events = connect(mapStateToProps, mapDispatchToProps)(EventsPres);


export default Events;

