import React, { Component } from "react";
import Responsive from "react-responsive";
import HomeCard from '../Components/HomeCard'
import {Button,Col} from 'antd';
import HomeFaceCard from '../Components/HomeFaceCard'

class Home extends Component{
   

    render() {
        return(
        <div style={{marginTop:80,textAlign:'center'}}>
        <Responsive minWidth={700}>
            <h1 className="aces-txt" style={{color:'white',marginRight:20,display:'inline',fontSize:35}}>15 Years</h1>
            <h1 className="aces-txt" style={{color:'white',marginRight:20,display:'inline',fontSize:35}}>of</h1>
            <h1 className="aces-txt" style={{color:'white',marginRight:20,display:'inline',fontSize:35}}>life</h1>
            <h1 className="aces-txt" style={{color:'white',marginRight:20,display:'inline',fontSize:35}}>Changing</h1>
            <h1 className="aces-txt" style={{color:'white',marginRight:20,display:'inline',fontSize:35}}>Experience</h1>
            <br /> <br /> 
            
            <Col xl={5} lg={5} md={2} sm={0} xs={0} />
            <Col xl={14} lg={15} md={20} sm={24} xs={24}>
            
            <HomeFaceCard  />
            </Col>


        </Responsive>
        <Responsive maxWidth={700}>
            <h1 className="aces-txt" style={{color:'white',marginRight:10,display:'inline',fontSize:18}}>15 Years</h1>
            <h1 className="aces-txt" style={{color:'white',marginRight:10,display:'inline',fontSize:18}}>of</h1>
            <h1 className="aces-txt" style={{color:'white',marginRight:10,display:'inline',fontSize:18}}>LIFE</h1>
            <h1 className="aces-txt" style={{color:'white',marginRight:10,display:'inline',fontSize:18}}>Changing</h1>
            <br />
            <h1 className="aces-txt" style={{color:'white',marginRight:10,display:'inline',fontSize:18}}>Experience</h1>
            <br /> <br /> <br />
            <br /> <br /> <br />
            <Col xl={5} lg={5} md={2} sm={0} xs={0} />
            <Col xl={14} lg={14} md={20} sm={24} xs={24}>
            <HomeFaceCard  />
            </Col>

        </Responsive>

        </div>

        );
    }
}

export default Home;
