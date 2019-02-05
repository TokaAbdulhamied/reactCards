import React from 'react'
import SignInForm from './SignInForm'
import './index.css'
import { Card ,Row,Col} from 'antd';

  const { Meta } = Card;
const SignInCard = () => (
  <Row type='flex' justify='center'>
  <Col xl={9} lg={9} md={18} sm={24} xs={24}>
    <Card  
        id="s6"  title={<span style={{color:'white',fontSize: 'x-large ',textAlign:'center',}}>Sign In</span>}>
    <SignInForm ></SignInForm>
  </Card>
  </Col>
  </Row>
)

export default SignInCard
