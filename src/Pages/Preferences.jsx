import React, { Component } from "react";
import PreferenceCard from '../Components/PreferenceCard'
import {Select, Row,Col,Button,message} from 'antd';
import client, { refreshAuthHeaders } from "../API_calls/client";
import Loading from '../Components/Loading'
import { connect } from "react-redux";
import {setAuthState,setProfile,setRedirection, setEvent} from "../store/actions";
const Option = Select.Option;

class PreferencesPres extends Component{
state={eventName:this.props.match.params.eventName,entities:[],loading:true,preferencesSelected:[],selectedPreference1:false
    ,selectedPreference2:false,preferencesNames:[]}

componentDidMount() {
    if(!(this.props.isLoggedIn || this.props.accountProfile)) {
        this.props.redirectionHandler('/profile')
      }
    
    if(this.props.match.params.eventId)
     client
      .get(`/registration/event/${this.props.match.params.eventId}/entities/`)
      .then(response => {
       this.setState({preferencesSelected:[response.data.entities[0].id,response.data.entities[1].id]})
       this.setState({preferencesNames:[response.data.entities[0].name,response.data.entities[1].name]})
       response.data.entities.map(entity => {
           if(entity.applied_as_first)
           this.setState({selectedPreference1:entity})
           else if(entity.applied_as_second)
           this.setState({selectedPreference2:entity})
       }) 
       this.setState({entities:response.data.entities})
       this.setState({loading:false})
      })
      .catch(error => {
        console.log(error);
      });
    }

handleChangeFirst = (e,key) => {
    let array = this.state.preferencesSelected;
    let arrayName = this.state.preferencesNames;
    array[0] = e;
    this.state.entities.map(entity => {
        if (entity.id == e) {
            arrayName[0]=entity.name
        }
    })
    this.setState({preferencesNames: arrayName})
    this.setState({preferencesSelected: array})

  }
handleChangeSecond = (e) => {
    let array = this.state.preferencesSelected;
    let arrayName = this.state.preferencesNames;
    array[1] = e;
    this.state.entities.map(entity => {
        if (entity.id == e) {
            arrayName[0]=entity.name
        }
    })
    this.setState({preferencesNames: arrayName})
    this.setState({preferencesSelected: array})
  }

handleClick = () => {
    if(this.state.selectedPreference1 && this.state.selectedPreference2){
        // this.props.redirectionHandler(`/events/${this.props.match.params.eventName}/${this.props.match.params.eventId}/${this.state.selectedPreference1.name}/phases`)
        this.props.history.push(`/events/${this.props.match.params.eventName}/${this.props.match.params.eventId}/${this.state.selectedPreference1.name}/phases`);
    } 

    else if(this.state.preferencesSelected[0] != this.state.preferencesSelected[1]){
    client
    .post('/registration/applyforentity/',{entity_id:this.state.preferencesSelected})
      .then(response => {
      // this.props.redirectionHandler(`/events/${this.props.match.params.eventName}/${this.props.match.params.eventId}/${this.state.preferencesNames[0]}/phases`)
       this.props.history.push(`/events/${this.props.match.params.eventName}/${this.props.match.params.eventId}/${this.state.preferencesNames[0]}/phases`);
      })
      .catch(error => {
        console.log(error.response);
      });
    }

    else {
      message.error('Please choose another second preference');
    }
}

    render() {
        if(!this.state.loading && !this.state.selected){
            if(this.state.selectedPreference1 && this.state.selectedPreference2) 
            return(
                <div style={{marginTop:20,textAlign:'center'}}>
                <h1 style={{color:'white',backgroundColor:'#008F47',padding:5,borderRadius:5,fontWeight:700}}>{this.state.eventName}</h1>
                <h2 style={{color:'white',padding:5,borderRadius:5,fontWeight:700}}>Preference Selection</h2>
                <Button style={{margin:5}} type='primary' onClick={this.handleClick}>Continue</Button>
                <Row gutter={16}>
                <Col xl={7} lg={7} md={7} sm={0} xs={0} />
                <Col xl={5} lg={5} md={5} sm={12} xs={24} >
                <h3 style={{color:'white'}}>First Preference</h3>
                <h3 style={{color:'white',backgroundColor:'#008F47',padding:5,borderRadius:5,fontWeight:700}}>{this.state.selectedPreference1.name}</h3>
                </Col>
                <Col xl={5} lg={5} md={5} sm={12} xs={24} >
                <h3 style={{color:'white'}}>Second Preference</h3>
                <h3 style={{color:'white',backgroundColor:'#008F47',padding:5,borderRadius:5,fontWeight:700}}>{this.state.selectedPreference2.name}</h3>
                </Col>
                </Row>
                </div>
                );
        else
        return(
        <div style={{marginTop:60,textAlign:'center'}}>
        <h1 style={{color:'white',backgroundColor:'#008F47',padding:5,borderRadius:5,fontWeight:700}}>{this.state.eventName}</h1>
        <h2 style={{color:'white',padding:5,borderRadius:5,fontWeight:700}}>Preference Selection</h2>
        <Button style={{margin:5}} type='primary' onClick={this.handleClick}>Continue</Button>
        <Row gutter={16}>
        <Col xl={7} lg={7} md={7} sm={0} xs={0} />
        <Col xl={5} lg={5} md={5} sm={12} xs={24} >
        <h3 style={{color:'white'}}>First Preference</h3>
        <Select dropdownMatchSelectWidth={true} style={{display:'inline'}} defaultValue={this.state.entities[0].id} onChange={this.handleChangeFirst}>
        {this.state.entities.map(entity => {
            if(entity.is_visible) return <Option key={entity.name} value={entity.id}>{entity.name}</Option>    
           })} 
        </Select>
        </Col>
        <Col xl={5} lg={5} md={5} sm={12} xs={24} >
        <h3 style={{color:'white'}}>Second Preference</h3>
        <Select dropdownMatchSelectWidth={true} style={{display:'inline'}} defaultValue={this.state.entities[1].id} onChange={this.handleChangeSecond}>
           {this.state.entities.map(entity => {
            if(entity.is_visible) return <Option key={entity.name} value={entity.id}>{entity.name}</Option>  
           })} 
        </Select>
        </Col>
        </Row>
        <Row style={{marginTop:5}} gutter={16}>
        {this.state.entities.map(entity => {
           if(entity.is_visible) return <PreferenceCard image ={entity.logo} key={entity.id} name={entity.name} description={entity.description} />
        })} 
           </Row>
        </div>
        );
    }
        else
        return(
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
  
  const Preferences = connect(mapStateToProps, mapDispatchToProps)(PreferencesPres);
  
export default Preferences;