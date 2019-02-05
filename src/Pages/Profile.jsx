import React, { Component } from "react";
import ProfileCard from '../Components/Form/profileCard';

class Profile extends Component {
    state={loading:true}
    componentDidMount(){
        this.setState({loading:false})
    }
    render(){
        return (
            <div style={{ marginTop: 40, textAlign: "center" }}>
            <ProfileCard />
            </div>
        );
    }
}

export default Profile;