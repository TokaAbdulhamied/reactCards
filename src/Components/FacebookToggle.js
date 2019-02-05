import React, { Component } from "react";
import FacebookProvider, { Page } from 'react-facebook';
import AnimakitExpander from 'animakit-expander';

export default class FacebookToggle extends Component {
    state={    
        expand:false
     }
    render() {
        return(
            <div>
            <h2 className='aces-txt' style={{writingMode: 'tb-rl',float:'left',color:'#003925',cursor:'pointer',
            backgroundColor:'#008F47',margin:0,padding:10}} onClick={() => this.setState(prevState => ({expand : !prevState.expand}))}>Facebook</h2>
  
            <AnimakitExpander
              expanded={this.state.expand}
              horizontal
              align="left"
            >
            <FacebookProvider appId="151802695540011">
             <Page href="https://www.facebook.com/ACESEgypt/" tabs="timeline" />
            </FacebookProvider>   
            </AnimakitExpander>
            </div>
        );
    }
}