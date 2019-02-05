import React, { Component } from "react";
import Spinner from 'react-spinkit'

class Loading extends Component {
    render(){
        return (
            <Spinner name='three-bounce' color='#008F47' fadeIn="none"/>
        );
    }
}

export default Loading;