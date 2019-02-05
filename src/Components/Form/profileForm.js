import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import {
  Form,
  Input,
  Tooltip,
  Icon,
  Cascader,
  Select,
  Row,
  Col,
  Checkbox,
  Button,
  AutoComplete,
  Alert,
  Upload,
  message,
  notification
} from "antd";
import { connect } from "react-redux";
import { setAuthState, setProfile, setRedirection } from "../../store/actions";
import client, { refreshAuthHeaders } from "../../API_calls/client";
import ReactHtmlParser from "react-html-parser";
import {Redirect} from 'react-router-dom'
import jsxToString from 'jsx-to-string';

const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;



class RegistrationForm extends React.Component {
  state = {
    autoCompleteResult: [],
    departments: [],
    message: false,
    messageText:'none',
    fileList: [],
    disabled:false
  };
  componentDidMount = () => {
    client
      .get("/registration/department/")
      .then(response => {
        this.setState({ departments: response.data });
      })
      .catch(error => {
        console.log(error);
      });
        /* if(this.props.accountProfile){
        
        this.props.form.setFieldsValue({
        'name': this.props.accountProfile.name});
        this.props.form.setFieldsValue({
        'mobile': this.props.accountProfile.mobile});
        this.props.form.setFieldsValue({
        'faculty': this.props.accountProfile.faculty});
        this.props.form.setFieldsValue({
        'department': this.props.accountProfile.department});
        this.props.form.setFieldsValue({
        'faculty': this.props.accountProfile.faculty});
        this.props.form.setFieldsValue({
        'grad_year': this.props.accountProfile.grad_year});
        this.props.form.setFieldsValue({
        'prev_experience': this.props.accountProfile.prev_experience});
        this.props.form.setFieldsValue({
        'overall_grade': this.props.accountProfile.overall_grade});
    } */
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      let formData=new FormData();
      if(values.cv)
      values.cv=values.cv.file
      Object.entries(values).map(value => {
        if(value[1] != undefined)
        formData.append(value[0],value[1])
      })
      if (err) {
        console.log(err);
      } else if (!err) {
        if (this.props.accountProfile) {
        client
          .put("/registration/profile/", formData)
          .then(response => {
            this.setState({fileList: []})
            this.setState({disabled:false})
            this.setState({ messageText: "Successfully updated profile" ,message:true});
            this.props.profileAvailableHandler(response.data.data);
          })
          .catch(error => {
            this.setState({message:false});
            if(error.response.data){
            Object.entries(error.response.data.errors).map(sysError => {
            
              let fieldsWithError={}
              let errorsFromSystem=[]
              sysError[1].map((er) => errorsFromSystem.push(new Error(er)))
              if(sysError[0] == 'cv'){
                this.setState({fileList:[]})
              } 
              fieldsWithError[sysError[0]] = {errors:errorsFromSystem}
              this.props.form.setFields(fieldsWithError)
              
            });}
          });
        
        }//end if
        else {
          client
          .post("/registration/profile/", formData)
          .then(response => {
            this.props.profileAvailableHandler(response.data.data);
            notification.success({
              message: 'Profile Created!',
              description: 'You successfully created your profile',
            });
            this.props.redirectionHandler('/')
          })
          .catch(error => {
            this.setState({message:false});
            if(error.response.data){
            Object.entries(error.response.data.errors).map(sysError => {
              let fieldsWithError={}
              let errorsFromSystem=[]
              sysError[1].map((er) => errorsFromSystem.push(new Error(er)))
              if(sysError[0] == 'cv'){
                this.setState({fileList:[]})
              } 
              fieldsWithError[sysError[0]] = {errors:errorsFromSystem}
              this.props.form.setFields(fieldsWithError)
              
            });}
          });
        }
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { autoCompleteResult } = this.state;

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

    const props = {
      disabled:this.state.disabled,
      beforeUpload: (file) => {
        this.setState(({ fileList }) => ({
          fileList: [...fileList, file],
        }));
        this.setState({disabled:true})
        return false},
        fileList: this.state.fileList,
        onRemove: () => {
          this.setState({disabled:false})
          this.setState({fileList: []})
        }
    };

    const websiteOptions = autoCompleteResult.map(website => (
      <AutoCompleteOption key={website}>{website}</AutoCompleteOption>
    ));
    const Option = Select.Option;
    if(this.props.isLoggedIn)
    return (
      <Form onSubmit={this.handleSubmit}>
        {this.state.message?<Alert type='success' message={this.state.messageText} />:<span />}

        <FormItem form={Form} {...formItemLayout} label="Name">
          {getFieldDecorator("name", {
            rules: [
              {
                required: true,
                message: "Please input your name!"
              },
              {
                max: 20,
                message: "Your name must not exceed 20 characters"
              }
            ],
            initialValue:this.props.accountProfile.name
          })(<Input />)}
        </FormItem>

        <FormItem {...formItemLayout} label="Mobile Number">
          {getFieldDecorator("mobile", {
            rules: [
              { len: 11 },
              { required: true, message: "Please input your Mobile number!" }
            ], initialValue:this.props.accountProfile.mobile
          })(<Input type="number" style={{ width: "100%" }} />)}
        </FormItem>
        <FormItem {...formItemLayout} label="University">
          {getFieldDecorator("university", {
            rules: [
              {
                required: false
              },
              {
                max: 30,
                message: "Your university name must not exceed 30 characters"
              }
            ],initialValue:this.props.accountProfile.university
          })(<Input />)}
        </FormItem>
        <FormItem {...formItemLayout} label="Faculty">
          {getFieldDecorator("faculty", {
            rules: [
              {
                required: false
              },
              {
                max: 30,
                message: "Your faculty name must not exceed 30 characters"
              }
            ],initialValue:this.props.accountProfile.faculty
          })(<Input />)}
        </FormItem>
        <FormItem {...formItemLayout} label="Department" hasFeedback>
          {getFieldDecorator("department", {
            rules: [
              { required: true, message: "Please select your Department!" }
            ],initialValue:this.props.accountProfile.department
          })(
            <Select placeholder="Please select your Department">
              {/*TO MAP FROM DATABASE*/}
              {this.state.departments.map(department => {
                return (
                  <Option key={department.id} value={department.id}>
                    {department.name}
                  </Option>
                );
              })}
            </Select>
          )}
        </FormItem>

        <FormItem {...formItemLayout} label="Graduation Year">
          {getFieldDecorator("grad_year", {
            rules: [
              { len: 4 },
              {
                required: false,
                message: "Please input your Graduation Year !"
              }
            ],initialValue:this.props.accountProfile.grad_year
          })(<Input type="number" style={{ width: "100%" }} />)}
        </FormItem>
        <FormItem {...formItemLayout} label="Overall Grade">
          {getFieldDecorator("overall_grade", {
            rules: [
              {
                max: 20,
                message: "Your grade can't be more than 20 characters"
              },
              { required: false }
            ],initialValue:this.props.accountProfile.overall_grade
          })(<Input />)}
        </FormItem>

        <FormItem {...formItemLayout} label="Previous Experience">
          {getFieldDecorator("prev_experience", {
            rules: [{ required: false }],initialValue:this.props.accountProfile.prev_experience
          })(
            <Input.TextArea
              type="text"
              placeholder="Tell us more about your previous experience..."
            />
          )}
        </FormItem>

        <FormItem {...formItemLayout} label="Curriculum Vitae (CV)">
          {getFieldDecorator("cv", {
            rules: [{ required: false }],
          })(<Upload {...props}>
            <Button>
              <Icon type="upload" /> Click to Upload
            </Button>
          </Upload>)}
        </FormItem>

        <FormItem {...tailFormItemLayout}>
          <Button
            type="primary"
            style={{ color: "white", float: "left" }}
            htmlType="submit"
          >
            Submit
          </Button>
        </FormItem>
      </Form>
    );
    else {
      return <Redirect to='/signin' />
    }
  }
}

const ProfileFormPres = Form.create()(RegistrationForm);
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

const ProfileForm = connect(mapStateToProps, mapDispatchToProps)(
  ProfileFormPres
);

export default ProfileForm;
