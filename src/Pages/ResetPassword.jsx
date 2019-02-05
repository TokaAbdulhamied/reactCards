import React, { Component } from "react";
import ResetPasswordCard from "../Components/Form/ResetPasswordCard";

class ForgetPassword extends Component{

    render() {
        return(
        <div style={{marginTop:20,textAlign:'center'}}>
        <ResetPasswordCard />
        </div>
        );
    }
}

export default ForgetPassword;