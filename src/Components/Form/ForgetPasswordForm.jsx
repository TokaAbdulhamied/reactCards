import React, { Component } from "react";
import client, { refreshAuthHeaders } from "../../API_calls/client";
import { Form, Icon, Input, Button ,Row, Col,Alert,notification} from 'antd';
import {NavLink,withRouter} from 'react-router-dom';


const FormItem = Form.Item;

class ForgetForm extends Component{
        state={message:false,
            messageText:'none'}
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (err) {
        console.log(err);
      }
      else if (!err) {
        client
        .post("/send_mail/", values)
        .then(response => {
              notification.success({
                message: 'Sent Successfully',
                description: 'Check your Email for password reset code',
            })
              this.props.history.push("/");
          })
        .catch(error => {
            console.log(error.response)
            if(error.response){
            error.response.data.errors.email.map(sysError => {
                console.log(sysError)
                this.setState({message:true,messageText:sysError})
          })
      }
    });
  }
})
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 24 },
        md: { span: 12,pull:6 },
        lg: { span: 12,pull:6 },

      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 24 },
        md: { span: 12,pull:6 },
        lg: { span: 12,pull:6 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
    {this.state.message?<Alert type='error' message={this.state.messageText} />:<span />}

       <FormItem    
       label='Email'
       {...formItemLayout}>
          {getFieldDecorator('username', {
            rules: [{
              type: 'email', placeholder:"E-mail address", message: 'The input is not valid E-mail!',
            }, {
              required: true, message: 'Please input your E-mail!',
            }],
          })(
            <Input prefix={<Icon type="mail" />} type="email" placeholder="E-mail "  />
          )}
          </FormItem>
        
        <FormItem>
          <Button type='primary' htmlType='submit' {...tailFormItemLayout}>
          Send Reset Code
          </Button>
        </FormItem>
      </Form>
    );
  }
}

const ForgetPasswordForm = Form.create()(ForgetForm);
export default withRouter(ForgetPasswordForm);