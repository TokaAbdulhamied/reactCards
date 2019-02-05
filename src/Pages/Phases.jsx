import React, { Component } from "react";
import { Button,Tag,Alert } from 'antd';
import Loading from '../Components/Loading'
import client, { refreshAuthHeaders } from "../API_calls/client";
import { connect } from "react-redux";
import {setAuthState,setProfile,setRedirection, setEvent} from "../store/actions";

class PhasesPres extends Component{
    state={loading:true,phases:[],response:false,orderToMap:1,currentPhase:{name:false,id:false},disabled:false
        ,messageType:false,message:'',reservedSlot:null}
    componentDidMount(){
        if(!(this.props.isLoggedIn || this.props.accountProfile)) {
            this.props.redirectionHandler('/profile')
          }    
        client
        .get(`/registration/event/${this.props.match.params.eventId}/phases`)
        .then(response => {
            console.log(response)
          response.data.phases.map(phase => {//Get Current Phase info and Phases states

            if((response.data.state=='W')){
                if(!response.data.finished){//if not last phase 
                    if(phase.order+1 == response.data.next_phase){
                this.setState({disabled:true})
                this.setState({currentPhase:phase})
                //Check for phase type 
                //OFFLINEPHASE
                if (this.state.currentPhase.type == 'OfflinePhase')
                {
                client
                .get(`/registration/phase/${this.state.currentPhase.id}/reservedSlot/`)
                .then(response => {
                    this.setState({reservedSlot:response.data.slot.time})
                    this.setState({messageType:'info',message:`Your ${this.state.currentPhase.name} is on `+(this.state.currentPhase.category=='s'?this.state.reservedSlot:'')})
                   })
                .catch(error => {
                    console.log(error);
                });
            }
            else {
                this.setState({messageType:'info',message:`Your ${this.state.currentPhase.name} is pending review `})

            }

            }
                }
                else {
                    if(phase.order == response.data.next_phase){//if last phase
                        this.setState({disabled:true})
                        this.setState({currentPhase:phase})
                        if (this.state.currentPhase.type == 'OfflinePhase')
                {
                        client
                        .get(`/registration/phase/${this.state.currentPhase.id}/reservedSlot/`)
                        .then(response => {
                            this.setState({reservedSlot:response.data.slot.time})
                            this.setState({messageType:'info',message:`Your ${this.state.currentPhase.name} is on `+this.state.reservedSlot})
                           })
                        .catch(error => {
                            console.log(error);
                        });
                    }
                    else {
                        this.setState({messageType:'info',message:`Your ${this.state.currentPhase.name} is pending review `})
        
                    }
                }
            }
            }
            if(phase.order == response.data.next_phase && (response.data.state==null)){
                this.setState({currentPhase:phase})
                }    
            else if (response.data.state=='A') {
                if(phase.order == response.data.next_phase && !response.data.finished){
            this.setState({currentPhase:phase})
        }
        if(response.data.finished){
            this.setState({disabled:true})
            this.setState({messageType:'success',message:'You successfully passed all the required phases'})
        }
            }
            else if (phase.order == response.data.next_phase && response.data.state=='R') {
                this.setState({disabled:true})
                }
          })
          this.setState({response:response.data})
          this.setState({phases:response.data.phases.sort(function(a, b){return a.order-b.order})})//Set phases in ascending order
          this.setState({loading:false})
        })
        .catch(error => {
          console.log(error);
        });
    }

    handleClick = () => {
        if (this.state.currentPhase.type == 'OfflinePhase') {
            if(this.state.currentPhase.category =='s')
            this.props.history.push(`/events/${this.props.match.params.eventName}/${this.props.match.params.eventId}/${this.props.match.params.preference}/phases/${this.state.currentPhase.name}/${this.state.currentPhase.id}`);
            else 
            this.props.history.push(`/events/${this.props.match.params.eventName}/${this.props.match.params.eventId}/${this.props.match.params.preference}/phases/external`);
        }
        else { //Considering the only available type is OnlinePhase
            this.props.history.push(`/events/${this.props.match.params.eventName}/${this.props.match.params.eventId}/${this.props.match.params.preference}/phases/online/${this.state.currentPhase.name}/${this.state.currentPhase.id}`);
        }
    }

    render() {
        if(!this.state.loading)
        return(
        <div style={{marginTop:80,textAlign:'center'}}>
        <h1 style={{color:'white',backgroundColor:'#008F47',padding:5,borderRadius:5,fontWeight:700}}>{this.props.match.params.eventName}</h1>
        <h2 style={{color:'white',padding:5,borderRadius:5,fontWeight:700}}>{this.props.match.params.preference} Phases</h2>
        <div style={{color:'black',padding:10,borderRadius:10,backgroundColor:'white'}}>
        {this.state.messageType?<Alert message={this.state.message} type={this.state.messageType} style={{margin:10}} />:<span />}
        <hr />
        {this.state.phases.map((phase) => {
             return (<div key={phase.order}><h3 key={phase.order}>{phase.name}
                {this.state.response.next_phase==phase.order+1 && this.state.response.state=='A' && !this.state.response.finished?//Checks if the phase is accepted
                <Tag color="green">passed</Tag>:<span />}
                {this.state.response.next_phase==phase.order+1 && this.state.response.state=='R' && !this.state.response.finished?//Checks if the phase is rejected(not working for last phase)
                <Tag color="red">couldn't pass</Tag>:<span />}
                {this.state.response.next_phase==phase.order && this.state.response.state=='R' && this.state.response.finished?//Checks if the phase is rejected(working for last phase only)
                <Tag color="red">couldn't pass</Tag>:<span />}</h3><hr /></div>
        )})}
        </div>
        <Button disabled={this.state.disabled} style={{margin:15}} type='primary' onClick={this.handleClick}>Continue</Button>
        </div>
        );
        else 
        return (<div style={{ marginTop: 40, textAlign: "center" }}>
        <Loading />
      </div>);
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
  
  const Phases = connect(mapStateToProps, mapDispatchToProps)(PhasesPres);
  
export default Phases;