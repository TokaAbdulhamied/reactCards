import React from 'react'
import './index.css'
import { Card ,Row,Col} from 'antd';
import ForgetPasswordForm from './ForgetPasswordForm';

  const { Meta } = Card;
const ForgetPasswordCard = () => (
  <Row type='flex' justify='center'>
  <Col xl={9} lg={9} md={18} sm={24} xs={24}>
    <Card  
        id="s6"  title={<span style={{color:'white',fontSize: 'x-large ',textAlign:'center',}}>Forget Password</span>}>
    <ForgetPasswordForm />
  </Card>
  </Col>
  </Row>
)

export default ForgetPasswordCard
