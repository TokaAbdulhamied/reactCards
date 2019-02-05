import React, { Component } from "react";
import { Button,Alert} from 'antd';
import Loading from '../Components/Loading'
import QuestionCard from '../Components/QuestionCard'
import client, { refreshAuthHeaders } from "../API_calls/client";
import Timer from "../Components/Timer";



class OnlineTest extends Component{
    state={loading:true,state:false,sec_remaining:0,model_id:0,questions:[],values:{},error:"Your online phase is submitted and pending review",errorType:'info',emptyFields:null,}

    renderer = ({ hours, minutes, seconds, completed }) => {
        if (completed) {
          this.setState({state:'f'})
          this.setState({errorType:'warning'})
          this.setState({error:"You've exceeded the time limit. Last answers will be used"})
          //Submit last answers
          client
        .post(`/registration/model/${this.state.model_id}/submit/`,this.state.values)
        .then(response => {
        })
        .catch(error => {
          console.log(error.data)
        });
          return null
        } else {
          // Render a countdown
          return <h2 style={{color:'white',backgroundColor:'#008F47',padding:5,borderRadius:5,fontWeight:700}}>{hours}:{minutes}:{seconds}</h2>;
        }
      };
    componentDidMount(){
        client
      .get(`/registration/phase/${this.props.match.params.phaseId}/model/meta/`)
      .then(response => {
        this.setState({model_id:response.data.id})
        this.setState({sec_remaining:response.data.remaining_time})
       if (response.data.remaining_time > 0) {
           if (response.data.duration - response.data.remaining_time == 0) {
           } // Keep the state false indicating the model wasn't started yet
            else {
                client
                .get(`/registration/phase/${this.props.match.params.phaseId}/model/questions/`)
                .then(response => {
                this.setState({state:'r',questions:response.data.questions})
                //Initiallize Answer values
                this.state.questions.map((question)=> {
                    this.setState((prevState) => ({
                        values: Object.assign(prevState.values,{[question.id]:"null"})
                      }));
                    })
                // End
                })
                .catch(error => {
                console.log(error.data)
                });
            }
       }
       else {
            this.setState({state:'f',sec_remaining:0}) // the model is finished

       }
      })
      .catch(error => {

        console.log(error.response)
        if (error.response) {
            this.setState({state:'f'})
            if(error.response.data.errors)
            {
                this.setState({errorType:'warning',error:"There is no " + this.props.match.params.phaseName + " available"})
            }
        }
      });

      this.setState({loading:false})
    }

    handleClick = ()=>
	{
        client
        .get(`/registration/phase/${this.props.match.params.phaseId}/model/questions/`)
        .then(response => {
         this.setState({state:'r',questions:response.data.questions})
         //Initiallize Answer values
         this.state.questions.map((question)=> {
            this.setState((prevState) => ({
                values: Object.assign(prevState.values,{[question.id]:"null"})
              }));
            })
        // End
        })
        .catch(error => {
          console.log(error.data)
        });
    }

    changeAnswerValues = (questionId,answer)=>{

        let values = this.state.values
        values[[questionId]] = answer
       this.setState({values:values})
          console.log("Changed " + questionId + " to " + this.state.values[[questionId]])
          console.log(this.state.values)

    }

    submitAnswers= (emptyFields) => {
        console.log(emptyFields)
        if(this.state.emptyFields == false) {
            client
            .post(`/registration/model/${this.state.model_id}/submit/`,this.state.values)
            .then(response => {
            this.setState({state:'f'})
            this.setState({error:"Successfully submitted your online phase"})
            })
            .catch(error => {
            console.log(error.data)
            });
        }
    }

    handleSave = () => {
        let keys = Object.keys(this.state.values)
        for(let i =0; i<keys.length;i++) {
            if (this.state.values[keys[i]] == "null") {
                this.setState({emptyFields:true},() => {
                    this.submitAnswers(this.state.emptyFields)})
                return;
            }
        }
        this.setState({emptyFields:false},() => {
            this.submitAnswers(this.state.emptyFields)})


    }
    render() {
        if(!this.state.loading)
        {
            if(this.state.state == false)
                return(
                <div style={{marginTop:80,textAlign:'center'}}>
                <h1 style={{color:'white',backgroundColor:'#008F47',padding:5,borderRadius:5,fontWeight:700}}>{this.props.match.params.eventName}</h1>
                <h2 style={{color:'white',padding:5,borderRadius:5,fontWeight:700}}>{this.props.match.params.phaseName}</h2>
                <h3 style={{color:'white',backgroundColor:'#008F47',padding:5,borderRadius:5,fontWeight:700}}>You are about to begin your online phase<br />
                Please read the instructions carefully to avoid further problems<br />
                1.ONCE YOU CLICK START TIMER WILL START AND WILL COUNTDOWN EVEN IF YOU EXIT THE SITE<br />
                2.DO NOT SUBMIT THE ONLINE PHASE UNTILL YOU ARE SURE ABOUT YOUR ANSWERS AS YOU CAN'T MODIFY YOUR ANSWERS AFTER THAT <br />
                3.CLOSING THE SITE AND REOPENING IT WILL CAUSE YOUR ANSWERS TO RESET<br />
                4.IF YOU EXCEED THE TIME LIMIT THE ONLINE PHASE WILL BE CLOSED AND YOUR LAST ANSWERS WILL BE SUBMITTED<br />
                5.CONTACT US IMMEDIATELLY IF YOU HAVE ANY PROBLEM<br />
                6.IF YOU DON'T PUT YOUR <strong>CV LINK</strong> YOU Will BE <strong>REJECTED</strong> <br />

                <br />
                Duration : {this.state.sec_remaining/60} Minutes
                </h3>
                <Button style={{margin:15}} type='primary' onClick={this.handleClick}>Start</Button>

                </div>
                );
            else if(this.state.state == 'r')
            return(
                <div style={{marginTop:80,textAlign:'center'}}>
                <h1 style={{color:'white',backgroundColor:'#008F47',padding:5,borderRadius:5,fontWeight:700}}>{this.props.match.params.eventName}</h1>
                <h2 style={{color:'white',padding:5,borderRadius:5,fontWeight:700}}>{this.props.match.params.phaseName}</h2>
                <Timer daysInHours={true} date={this.state.sec_remaining*1000} renderer={this.renderer} />
                <div style={{color:'white',padding:5,borderRadius:5,fontWeight:700}}>
                <Button style={{display:'inline'}} onClick={this.handleSave} style={{margin:'auto',display:'block',marginTop:20}}>Submit</Button>
                <h4 style={{color:'white'}}> Don't Click Unless You Are Finished</h4>
                {this.state.emptyFields?<Alert type='error' message='Please answer all questions' />:<span />}
                </div>
                {this.state.questions.map((question)=> {
                    return <QuestionCard changeAnswerValues={this.changeAnswerValues} key={question.id.toString()} question={question} />
                })}
                </div>
                );
            else if(this.state.state == 'f')
            return(
                <div style={{marginTop:80,textAlign:'center'}}>
                <h1 style={{color:'white',backgroundColor:'#008F47',padding:5,borderRadius:5,fontWeight:700}}>{this.props.match.params.eventName}</h1>
                <h2 style={{color:'white',padding:5,borderRadius:5,fontWeight:700}}>{this.props.match.params.phaseName}</h2>
                <Alert type={this.state.errorType} message={this.state.error} />

                </div>
                );



    }
        else
        return <div style={{ marginTop: 40, textAlign: "center" }}>
        <Loading />
      </div>
    }
}


export default OnlineTest;
