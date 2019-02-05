import React, { Component } from "react";
import client, { refreshAuthHeaders } from "../../API_calls/client";
import { Form, Icon, Input, Button, Row, Col, Alert, notification } from "antd";
import { NavLink, withRouter } from "react-router-dom";
import { setAuthState, setProfile, setRedirection } from "../../store/actions";
import { connect } from "react-redux";

const FormItem = Form.Item;

class ResetForm extends Component {
  state = {
    message: false,
    messageText: "none"
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (err) {
        console.log(err);
      } else if (!err) {
        client
          .put("/reset_password/", values)
          .then(response => {
            localStorage.setItem("auth_token", response.data.token);
            this.props.authenticationChangedHandler(true);
            refreshAuthHeaders();
            client
              .get("/registration/profile/")
              .then(response => {
                this.props.profileAvailableHandler(response.data);
                notification.success({
                  message: "Successfully Reset",
                  description: "Welcome, " + this.props.accountProfile.name
                });
                this.props.history.push("/");
              })
              .catch(error => {
                this.props.history.push("/profile");
                notification.info({
                  message: "Create Profile",
                  description: "Please create your profile"
                });
                console.log(error);
              });
          })
          .catch(error => {
            if(error.response){
                console.log(error.response.data)
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
    });
  };
  checkPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('new_password')) {
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
        md: { span: 12, pull: 6 },
        lg: { span: 12, pull: 6 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 24 },
        md: { span: 12, pull: 6 },
        lg: { span: 12, pull: 6 }
      }
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0
        },
        sm: {
          span: 16,
          offset: 8
        }
      }
    };
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        {this.state.message ? (
          <Alert type="error" message={this.state.messageText} />
        ) : (
          <span />
        )}

        <FormItem label="Email" {...formItemLayout}>
          {getFieldDecorator("username", {
            rules: [
              {
                type: "email",
                placeholder: "E-mail address",
                message: "The input is not valid E-mail!"
              },
              {
                required: true,
                message: "Please input your E-mail!"
              }
            ]
          })(
            <Input
              prefix={<Icon type="mail" />}
              type="email"
              placeholder="E-mail "
            />
          )}
        </FormItem>
        <FormItem label="New Password" {...formItemLayout}>
          {getFieldDecorator("new_password", {
            rules: [
              {
                min: 8,
                message: "Password should at least be of 8 characters"
              },
              {
                required: true,
                message: "Please input your Password!"
              }
            ]
          })(
            <Input
              prefix={<Icon type="lock" style={{ backgroundColor: "white" }} />}
              type="password"
              placeholder="Password"
            />
          )}
        </FormItem>
        <FormItem label="Confirm Password" {...formItemLayout}>
          {getFieldDecorator("new_password2", {
            rules: [
              { required: true, message: "Please confirm your password!" },
              {
                validator: this.checkPassword
              }
            ]
          })(
            <Input
              prefix={<Icon type="lock" style={{ backgroundColor: "white" }} />}
              type="password"
              onBlur={this.handleConfirmBlur}
              placeholder="Confirm Password"
            />
          )}
        </FormItem>
        <FormItem label="Reset Code" {...formItemLayout}>
          {getFieldDecorator("code", {
            rules: [
              {
                required: true,
                message: "Please input your reset code!"
              }
            ]
          })(
            <Input
              prefix={<Icon type="unlock" />}
              type="text"
              placeholder="Reset Code "
            />
          )}
        </FormItem>
        <FormItem>
          <Button type="primary" htmlType="submit" {...tailFormItemLayout}>
            Reset Password
          </Button>
        </FormItem>
      </Form>
    );
  }
}

const ResetFormPres = Form.create()(ResetForm);

const mapStateToProps = state => {
  return {
    isLoggedIn: state.isAuthenticated,
    accountProfile: state.accountProfile,
    redirectAvailable: state.redirectAvailable
  };
};

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

const ResetPasswordForm = connect(mapStateToProps, mapDispatchToProps)(
  ResetFormPres
);
export default withRouter(ResetPasswordForm);
