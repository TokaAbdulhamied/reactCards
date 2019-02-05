import React from 'react'
import './index.css'
import { Card ,Row,Col} from 'antd';
import ResetPasswordForm from './ResetPasswordForm';

  const { Meta } = Card;
const ResetPasswordCard = () => (
  <Row type='flex' justify='center'>
  <Col xl={9} lg={9} md={18} sm={24} xs={24}>
    <Card  
        id="s6"  title={<span style={{color:'white',fontSize: 'x-large ',textAlign:'center',}}>Reset Password</span>}>
    <ResetPasswordForm />
  </Card>
  </Col>
  </Row>
)

export default ResetPasswordCard
