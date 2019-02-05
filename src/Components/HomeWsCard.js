import React, { Component } from "react";
import {Button} from 'antd';
import { Card, Col, Row } from 'antd';

export default class HomeWsCard extends Component  {
  onClick = () => {
    var url="/events"
    window.location.href = url;
  } 
  render(){
    return(
      <Col span={24} style={{marginTop:"20px"}}>
      <Card title={<span style={{ fontSize:"25pt"}}>Workshops </span> }
        style={{
          borderRadius: "10px", 
        }} > >
        <div >
          <p 
            style={{
              overflow:"hidden" ,
              fontSize:"15pt", 
              color: "#00512C"
            }}>
          Raising the capabilities of the engineering community through
           technical, nontechnical and personal
           approaches delivered through a real life exposure. 
          </p>
          
        </div>
        <div 
          style={{
            height:"2px" ,
            margin:"auto",
             width:"75%" , 
             backgroundColor:"#9999"
          }}></div>
           <div 
          style={{
            height:"2px" ,
            margin:"auto",
             width:"75%" , 
             backgroundColor:"#9999"
            }}>
            </div>
        <div>
            <Button 
              type='primary'
              style={{marginTop:"15px"}}
              onClick={this.onClick} >
              Find out
            </Button>
        </div>
      
     
      </Card>
      </Col>
    )
  }
} 