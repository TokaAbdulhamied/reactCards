import React from 'react'
import ProfileForm from './profileForm'
import './index.css'
import { Card } from 'antd';


  const { Meta } = Card;
  const ProfileCard = () => (
 

    <Card id="s6" title={<span style={{color:'white',fontSize: 'xx-large ',textAlign:'center',margin:'auto'}}>Profile</span>}>
        
     <p id="s4"><b>You will be able to use this account to apply for all upcoming ACES events.
     So please use valid information and always update any information changes from your profile page.</b></p>


    <ProfileForm></ProfileForm>
       
  </Card>

)

export default ProfileCard