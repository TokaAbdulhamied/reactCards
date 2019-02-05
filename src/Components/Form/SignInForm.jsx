
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {NavLink,withRouter} from 'react-router-dom';
import { Form, Icon, Input, Button ,Row, Col,Alert,notification} from 'antd';
import { connect } from "react-redux";
import {setAuthState,setProfile,setRedirection} from "../../store/actions";
import client, { refreshAuthHeaders } from "../../API_calls/client";
import jwt_decode from 'jwt-decode';
const FormItem = Form.Item;

class NormalLoginForm extends React.Component {
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
        .post("/login/", values)
        .then(response => {
          localStorage.setItem("auth_token", response.data.token);
          this.props.authenticationChangedHandler(true);
          refreshAuthHeaders();

          var decoded = jwt_decode(localStorage.getItem('auth_token'));
          if(decoded.type == 'AP')
            localStorage.setItem("user_type", 1);
          if(decoded.type == 'C'){
            localStorage.setItem("user_type", 3);
            client
            .post("ACG/legacy/getCompanyId/")
            .then(response => {
              console.log(response.data);
              localStorage.setItem("company_id",response.data.company_id)
              //window.location.href = "/ACG";
            })
          .catch(error => {
            console.log(error)
          })
          }
          if(decoded.type == 'FR')
            localStorage.setItem("user_type", 2);
          localStorage.setItem("user_id",decoded.user_id);


          client
          .get("/registration/profile/")
          .then(response => {
              this.props.profileAvailableHandler(response.data);
              notification.success({
                message: 'Signed in',
                description: 'Welcome, '+ this.props.accountProfile.name,
            })
              this.props.history.push("/");
          })
          .catch(error => {
            this.props.history.push("/profile");
            notification.info({
              message: 'Create Profile',
              description: 'Please create your profile',
          })
            console.log(error);
          });
        })
        .catch(error => {
            if(error.response.data){
            Object.entries(error.response.data).map(sysError => {
              let fieldsWithError={}
              let errorsFromSystem=[]
              sysError[1].map((er) => errorsFromSystem.push(new Error(er)))

              fieldsWithError[sysError[0]] = {errors:errorsFromSystem}
              this.props.form.setFields(fieldsWithError)
              if(sysError[0] =='non_field_errors') {
                this.setState({message:true,messageText:sysError[1]})
              }
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
        <FormItem 
        label='Password'
        {...formItemLayout}>
          {getFieldDecorator('password', {
            rules: [{ 
              required: true, message: 'Please input your Password!'}],
          })(
            <Input prefix={<Icon type="lock" style={{ backgroundColor:'white' }} />} type="password" placeholder="Password" />
          )}
        </FormItem>
        <NavLink to='/forgetpass'>Forgot your password?</NavLink>
        <FormItem>
          <Button type='primary' htmlType='submit' {...tailFormItemLayout}>
          Sign In
          </Button>
        </FormItem>
      </Form>
    );
  }
}

const SignInPres = Form.create()(NormalLoginForm);

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

const SignInForm = connect(mapStateToProps, mapDispatchToProps)(SignInPres);
export default  withRouter(SignInForm) 
