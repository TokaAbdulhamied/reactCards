import React, { Component } from "react";
import SlotChoice from '../Components/SlotChoice'
import { notification,Button,Select,Alert} from 'antd';
import Loading from '../Components/Loading'
import client, { refreshAuthHeaders } from "../API_calls/client";
const Option = Select.Option;

class Slots extends Component{
    state={loading:true,dates:[],slot:null,slotName:'',systemError:false,errorMessage:''}
    componentDidMount(){
        client
      .get(`/registration/phase/${this.props.match.params.phaseId}/slots/`)
      .then(response => {
       this.setState({dates:response.data.slots})
      })
      .catch(error => {
        if(error.response.data){
            this.setState({systemError:true})
            Object.entries(error.response.data).map(sysError => {//sysError[1] is the error data
            this.setState({errorMessage:Object.entries(sysError[1])[0][1]})
            })
      }});
      
      this.setState({loading:false})
    }
    handleClick = ()=>
	{
		if (this.state.slot != null){
             client
            .post(`/registration/reserveslot/`,{slot_id : this.state.slot})
            .then(response => {
             notification.success({
                message: 'Saved!',
                description: 'You reserved: '+ this.state.slotName,
            })
            this.props.history.push("/");
        })
            .catch(error => {
                if(error.response.data){
                    this.setState({systemError:true})
                    Object.entries(error.response.data).map(sysError => {//sysError[1] is the error data
                    this.setState({errorMessage:Object.entries(sysError[1])[0][1]})
                    })
              }           
             }); 	  		
  		}
  		else {
			notification.warning({
	    	message: 'No slot selected',
	    	description: 'Please choose a slot then reserve',
	    });
  		}
    }
    onChange = (event) => 
    {
        console.log(event)
        this.state.dates.map(date => {if(date.id == event)
            {
            console.log("found" + date.time)
            this.setState({slotName: date.time})
        }})
        this.setState({slot: event})
}

    render() {
        if(!this.state.loading)
        {
        if(!this.state.systemError)
        return(
        <div style={{marginTop:80,textAlign:'center'}}>
        <h1 style={{color:'white',backgroundColor:'#008F47',padding:5,borderRadius:5,fontWeight:700}}>{this.props.match.params.eventName}</h1>
        <h2 style={{color:'white',padding:5,borderRadius:5,fontWeight:700}}>{this.props.match.params.phaseName} Slot Selection</h2>
        <SlotChoice dates={this.state.dates} onChange={this.onChange} />
        <Button style={{margin:'auto',display:'block',marginTop:20}} onClick={this.handleClick}>Reserve</Button>
        </div>
        );
        else 
        return(
        <div style={{marginTop:80,textAlign:'center'}}>
        <h1 style={{color:'white',backgroundColor:'#008F47',padding:5,borderRadius:5,fontWeight:700}}>{this.props.match.params.eventName}</h1>
        <h2 style={{color:'white',padding:5,borderRadius:5,fontWeight:700}}>{this.props.match.params.phaseName} Slot Selection</h2>
        {this.state.systemError?<Alert message={this.state.errorMessage} type='error' style={{margin:10}} />:<span />}
        </div>
        )
    }
        else 
        return <div style={{ marginTop: 40, textAlign: "center" }}>
        <Loading />
      </div>
    }
}


export default Slots;