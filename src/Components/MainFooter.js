import Responsive from 'react-responsive';
import React , {Component} from 'react';
import { Layout } from "antd";
import { SocialIcon } from 'react-social-icons';
const {Footer} = Layout;
const Desktop = props => <Responsive {...props} minWidth={992} />;
const Tablet = props => <Responsive {...props} minWidth={700} maxWidth={991} />;
export default class MainFooter extends Component {

    render() {

      return ( 
        <div>
        <Desktop>  
            <div
            style={{
              textAlign: "center",
              position: "fixed",
              marginTop: 6,
              backgroundColor:'#008F47',
              bottom: 0,
              width: "100%",
              height:48,
            }}
          >
            <SocialIcon color='silver' style={{margin:'0.5vw', height: 30, width: 30}} url="https://www.facebook.com/ACESEgypt/" />
            <SocialIcon color='silver' style={{margin:'0.5vw', height: 30, width: 30}} url="https://www.youtube.com/user/aceschannel" />
            <SocialIcon color='silver' style={{margin:'0.5vw', height: 30, width: 30}} url="https://twitter.com/acesegypt" />
            <SocialIcon color='silver' style={{margin:'0.5vw', height: 30, width: 30}} url="https://instagram.com/acesegypt/" />
            <SocialIcon color='silver' style={{margin:'0.5vw', height: 30, width: 30}} url="https://plus.google.com/u/0/105928726390418602102" />
            <SocialIcon color='silver' style={{margin:'0.5vw', height: 30, width: 30}} url="https://www.linkedin.com/company/acesegypt" />
            <span>
            ©<h4 className='aces-txt' style={{display:'inline',color:'silver',margin:3}}>2017-2018</h4>
            <h4 className='aces-txt' style={{display:'inline',color:'silver',margin:3}}>ACES </h4>
            <h4 className='aces-txt' style={{display:'inline',color:'silver',margin:3}}>IT </h4>
            <h4 className='aces-txt' style={{display:'inline',color:'silver',margin:3}}>ALL </h4>
            <h4 className='aces-txt' style={{display:'inline',color:'silver',margin:3}}>RIGHTS </h4>
            <h4 className='aces-txt' style={{display:'inline',color:'silver',margin:3}}>RESERVED</h4>
            </span>
          </div>
          </Desktop>
          <Tablet>     
          <div
            style={{
              textAlign: "center",
              position: "fixed",
              marginTop: 6,
              backgroundColor:'#008F47',
              bottom: 0,
              width: "100%",
              height:48
            }}
          >
            <SocialIcon color='silver' style={{marginTop:'0.5vw', height: 30, width: 30}} url="https://www.facebook.com/ACESEgypt/" />
            <SocialIcon color='silver' style={{margin:'0.5vw', height: 30, width: 30}} url="https://www.youtube.com/user/aceschannel" />
            <SocialIcon color='silver' style={{margin:'0.5vw', height: 30, width: 30}} url="https://twitter.com/acesegypt" />
            <SocialIcon color='silver' style={{margin:'0.5vw', height: 30, width: 30}} url="https://instagram.com/acesegypt/" />
            <SocialIcon color='silver' style={{margin:'0.5vw', height: 30, width: 30}} url="https://plus.google.com/u/0/105928726390418602102" />
            <SocialIcon color='silver' style={{margin:'0.5vw', height: 30, width: 30}} url="https://www.linkedin.com/company/acesegypt" />
            <span>
            ©<h4 className='aces-txt' style={{display:'inline',color:'silver',margin:3}}>2017-2018</h4>
            <h4 className='aces-txt' style={{display:'inline',color:'silver',margin:3}}>ACES </h4>
            <h4 className='aces-txt' style={{display:'inline',color:'silver',margin:3}}>IT </h4>
            <h4 className='aces-txt' style={{display:'inline',color:'silver',margin:3}}>ALL </h4>
            <h4 className='aces-txt' style={{display:'inline',color:'silver',margin:3}}>RIGHTS </h4>
            <h4 className='aces-txt' style={{display:'inline',color:'silver',margin:3}}>RESERVED</h4>
            </span>
          </div>
          </Tablet>
          </div>
        );
    }
}