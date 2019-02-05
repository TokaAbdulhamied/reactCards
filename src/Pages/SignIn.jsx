import React, { Component } from "react";
import SignInCard from '../Components/Form/SignInCard';

class SignIn extends Component {
    state={loading:true}
    componentDidMount(){
        this.setState({loading:false})
    }
    render() {
       return(
       <div style={{ marginTop: 40, textAlign: "center" }}>
       <SignInCard />
       </div>);
    }
}

export default SignIn;