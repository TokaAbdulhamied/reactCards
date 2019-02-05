import React, { Component } from "react";
import AboutCard from '../Components/AboutCard'
import{Col} from 'antd'
import image from '../images/conference.jpg'

class Conference extends Component{

    render() {
        return(
        <div style={{marginTop:20,textAlign:'center'}}>
         <Col xl={5} lg={5} md={2} sm={0} xs={0} />
        <Col xl={14} lg={14} md={20} sm={24} xs={24}>
            <img src={image} width='100%' />
            <AboutCard style={{margin:0,padding:0}} text="It's our main event which is held at the closure of the year in April. Both technical and non technical tracks merge where participants of Expo get awarded by the companies and participants of Workshops get their certificates. Also public speakers attend and give motivational speeches."/>
            
            </Col>
        </div>
        );
    }
}

export default Conference;