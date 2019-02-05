import React, { Component } from "react";
import HomeExpoCard from './HomeExpoCrad';
import HomeWsCard from './HomeWsCard';
import HomeACGCard from './HomeACGCard';
import { Card, Col, Row } from 'antd';
export default class HomeFaceCard extends Component {
  render(){
    return(
      
      <div
        style={{    
          marginTop: "40px",
          padding: "30px",
          height: "100%",
          width: "100%",     
        }}
      >
        <HomeACGCard />
        <HomeExpoCard/>
        <HomeWsCard/>
        
      </div>
    );

  }

}
