import React, { Component } from "react";
import FormCard from '../Components/Form/formCard';
import Loading from '../Components/Loading'

class SignUp extends Component {
    state={loading:true}
    componentDidMount(){
        this.setState({loading:false})
    }
    render() {
       
       return( 
    <div style={{ marginTop: 40, textAlign: "center" }}>
       <FormCard />
       </div>)
       
    }
}

export default SignUp;