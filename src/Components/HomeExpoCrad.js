import React, { Component } from "react";
import {Button} from 'antd';
import { Card, Col, Row } from 'antd';

export default class HomeExpoCard extends Component  {
  render(){
    return(
      <Col
        span={24} 
        style={{
          marginTop:"20px"
        }}>
      <Card 
        title={<span style={{ fontSize:"25pt"}}>ACES Expo</span> }
        style={{
          borderRadius: "10px",   
        }} >
        <div >
          <p 
            style={{
              overflow:"hidden" ,
              fontSize:"15pt", 
              color: "#00512C"
            }}>
                For the 5th year in a row,
              ACES introduces ACES Expo, which is 
              one of our main projects and the compassthat guides
              engineering students on their wayto raise their 
              technical capabilities through
              a real life exposure. With the cooperation of many
              multinational companies, ACES Expo offers technically
              cored sessions followed by practical case studies in 
              the plants or firms of each corporate.   
          </p>
        </div>
        <div 
          style={{
            height:"2px" ,
            margin:"auto",
            width:"75%" , 
            backgroundColor:"#9999"
          }}>\
        </div>
        <div>
          <Button type="primary larg" disabled 
            style={{marginTop:"15px"}}>
            Find out
          </Button>
  
        </div>
      

      </Card>
      </Col>
    )
  }
}