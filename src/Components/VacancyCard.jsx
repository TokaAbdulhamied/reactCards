import { Card,Button,Col} from 'antd';
import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import {Tag} from 'antd';

class VacancyCard extends Component {
 render()
 {
    return (
        <Col xl={8} lg={8} md={12} sm={12} xs={24}>
        <div style={{paddingTop:40,margin:20}}>
        <Card 
        title={<span style={{color:'white',fontSize: 'x-large ',textAlign:'center',margin:'auto'}}>{this.props.name}</span>}
        bordered={false} 
        cover={<img width={200} alt="logo" src={this.props.image} />}
        >
        
            {this.props.department.map((department) => <Tag color="#008b43">{department.name}</Tag>)}
            <p>{this.props.creation_date}</p>
        <center>
            <NavLink to={`/ACG/${this.props.id}/`}>
             <u>More</u>
                </NavLink>
                </center>
        
        </Card>
        </div>        
        </Col>
        );
  } 
}
export default VacancyCard ;