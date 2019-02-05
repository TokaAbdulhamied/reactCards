import React, { Component } from "react";
import AboutCard from '../Components/AboutCard'
import{Col} from 'antd'
class About extends Component{

    render() {
        return(
        <div style={{marginTop:20,textAlign:'center'}}>
         <Col xl={5} lg={5} md={2} sm={0} xs={0} />
        <Col xl={14} lg={14} md={20} sm={24} xs={24}>
            <AboutCard title='About us' text='ACES stands for  the Annual Conference for Engineering Students. ACES is a leading student organization in the engineering community, it was first founded in 2004 in Faculty of Engineering Ain Shams University, to be the first student activity in the governmental faculties in Egypt.'/>
            <AboutCard title='' text='Since then, ACES has started its journey aiming to have a community of influencial leaders; who can actually compete in the job market and stand out of the crowd by giving them the opportunity to increase their capabilities technically as well as non-technically and unleash their hidden potentials.'/>
            <AboutCard title='' text='Doing our best to pay forward such a Life Changing Experience and have our impact on the surrounding society hoping ACES Journey will never come to an end..'/>
            </Col>
        </div>
        );
    }
}

export default About;