import React from 'react'
import WrappedNormalLoginForm from './form.js'
import './index.css'
import { Card ,Row,Col} from 'antd';

  const { Meta } = Card;
const FormCard = () => (
  <Row type='flex' justify='center'>
  <Col xl={9} lg={9} md={18} sm={24} xs={24}>
    <Card  
        id="s6"  title={<span style={{color:'white',fontSize: 'x-large ',textAlign:'center'}}>Sign Up</span>}>
    <WrappedNormalLoginForm />
  </Card>
  </Col>
  </Row>
)

export default FormCard
