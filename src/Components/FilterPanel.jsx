import React, { Component } from "react";
import { Select, Row, Col, Form, Button } from "antd";
import Responsive from "react-responsive";
import client from "../API_calls/client";
const Option = Select.Option;
const FormItem = Form.Item;

export default class FilterPanel extends Component {
//   state = {
//     departments: []
//   };

//   componentDidMount = () => {
//     client
//       .get("/registration/department/")
//       .then(response => {
//         this.setState({ departments: response.data });
//       })
//       .catch(error => {
//         console.log(error);
//       });
//   };

  render() {
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 24 },
        md: { span: 7 },
        lg: { span: 7 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 24 },
        md: { span: 12 },
        lg: { span: 12 }
      }
    };

    return (
      <div
        style={{
          backgroundColor: "white",
          height: "100%",
          width: "100%",
          paddingTop: "15px",
          paddingBottom: "5px",
          paddingLeft: "10px",
          paddingRight: "10px",
          borderRadius: "10px"
        }}
      >
        <Form>
          <FormItem {...formItemLayout} label="Major" colon>
            <Select size="default" defaultValue="All">
              <Option value="All">All</Option>
              <Option value="Computer">Computer</Option>
              <Option value="Mechanical">Mechanical</Option>
            </Select>
          </FormItem>
          <FormItem {...formItemLayout} label="Job type" colon>
            <Select size="default" defaultValue="All">
              <Option value="All">All</Option>
              <Option value="Internship">Internship</Option>
              <Option value="Full time">Full time</Option>
            </Select>
          </FormItem>
          <FormItem {...formItemLayout} label="Location" colon>
            <Select size="default" defaultValue="All">
              <Option value="All">All</Option>
              <Option value="Cairo">Cairo</Option>
              <Option value="Alexandria">Alexandria</Option>
            </Select>
          </FormItem>
          <FormItem {...formItemLayout}>
            <Button type="primary" htmlType="submit">
              Apply
            </Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}
