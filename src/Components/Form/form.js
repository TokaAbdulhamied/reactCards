
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {withRouter} from 'react-router'
import { Form, Icon, Input, Button, Checkbox ,Cascader,Row, Col,notification} from 'antd';
import { connect } from "react-redux";
import {setAuthState,setProfile,setRedirection} from "../../store/actions";
import client, { refreshAuthHeaders } from "../../API_calls/client";
import jwt_decode from 'jwt-decode';

const FormItem = Form.Item;

class NormalLoginForm extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (err) {
        console.log(err);
      }
      else if (!err) {
        client
        .post("/signup/", values)
          .then(response => {
            localStorage.setItem("auth_token", response.data.token);
            var decoded = jwt_decode(localStorage.getItem('auth_token'));
            if(decoded.type == 'AP')
              localStorage.setItem("user_type", 1);
            if(decoded.type == 'C')
              localStorage.setItem("user_type", 3);
            if(decoded.type == 'FR')
              localStorage.setItem("user_type", 2);
            localStorage.setItem("user_id",decoded.user_id);
    
            this.props.authenticationChangedHandler(true);
            refreshAuthHeaders();
            this.props.history.push("/profile");
            notification.info({
              message: 'Create Profile',
              description: 'Please create your profile',
          })
        })
        .catch(error => {
            if(error.response){
            Object.entries(error.response.data.errors).map(sysError => {
              let fieldsWithError={}
              let errorsFromSystem=[]
              sysError[1].map((er) => errorsFromSystem.push(new Error(er)))

              fieldsWithError[sysError[0]] = {errors:errorsFromSystem}
              this.props.form.setFields(fieldsWithError)
          })
      }
    });
  }
})
  }
  checkPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
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
        <FormItem 
        label='Password'
        {...formItemLayout}>
          {getFieldDecorator('password', {
            rules: [{ min:8 ,message:"Password should at least be of 8 characters"},{ 
              required: true, message: 'Please input your Password!'}],
          })(
            <Input prefix={<Icon type="lock" style={{ backgroundColor:'white' }} />} type="password" placeholder="Password" />
          )}
        </FormItem>
        <FormItem 
        label='Confirm Password'
        {...formItemLayout}>
          {getFieldDecorator('password2', {
            rules: [{ required: true, message: 'Please confirm your password!',},{ 
              validator: this.checkPassword,}],
          })(
            <Input prefix={<Icon type="lock" style={{ backgroundColor:'white' }} />} type="password" 
            onBlur={this.handleConfirmBlur}
            placeholder="Confirm Password" />
          )}
        </FormItem>
        <FormItem>
          <Button type='primary' htmlType='submit' {...tailFormItemLayout}>
          Sign Up
          </Button>
        </FormItem>
      </Form>
    );
  }
}

const WrappedNormalLoginFormPres = Form.create()(NormalLoginForm);

const mapStateToProps = state => {
  return {
    isLoggedIn: state.isAuthenticated,
    accountProfile:state.accountProfile,
    redirectAvailable:state.redirectAvailable
  }
}

const mapDispatchToProps = dispatch => {
  return {
    authenticationChangedHandler: isLoggedIn => {
      dispatch(setAuthState(isLoggedIn));
    },
    profileAvailableHandler: profile => {
      dispatch(setProfile(profile));
    },
    redirectionHandler: redirect => {
      dispatch(setRedirection(redirect));
    }
  };
};

const WrappedNormalLoginForm = connect(mapStateToProps, mapDispatchToProps)(WrappedNormalLoginFormPres);
export default  withRouter(WrappedNormalLoginForm);
