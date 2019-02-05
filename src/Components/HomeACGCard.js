import React, { Component } from "react";
import {Button} from 'antd';
import { Card, Col, Row } from 'antd';

export default class HomeACGCard extends Component  {
  onClick = () => {
    var url="/ACG"
    window.location.href = url;
  }
  render(){
    return( 
      
      <Col span={24}>
      <Card title={<span style={{ fontSize:"25pt"}}> ACES Career Gate </span> }
        style={{
          borderRadius: "10px", 
        }} >

        <div >
          
          <p style={{
              overflow:"hidden" ,
              fontSize:"15pt", 
              color: "#00512C"
              }}>
          ACES is now offering one of the most precious opportunity and
           important step in your career through ACG (ACES Career Gate).
          ACG is an online job fair aims to increase employment
           opportunities for students and alumni and offer wider choice
            for selection to the recruiters.
          </p>
          
        </div>
        <div>
            <Button
            type='primary'
            onClick={this.onClick}
            style={{marginTop:"15px"
            }}>
            Find out
            </Button>
        </div>
      
      </Card>
      </Col>
      
    )
  }
} 