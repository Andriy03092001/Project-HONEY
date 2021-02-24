import React, { Component } from 'react';
import { Form, Input, Button } from 'antd';

class Login extends Component {

    state = {}


    render() {

        const onFinish = (values) => {
            console.log('Success:', values);
          };
        
          const onFinishFailed = (errorInfo) => {
            console.log('Failed:', errorInfo);
          };
        
          return (
          
                  <Form
            
            name="basic"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >

            <h2>Login </h2>
            <label className="text-center">Email:</label>

            <Form.Item
              
              name="email"
              rules={[
                {
                  required: true,
                  message: 'Please input your email!',
                },
              ]}
            >
              <Input />
            </Form.Item>
      
              <label>Password:</label>
            <Form.Item
              
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
              ]}
            >
              <Input.Password />
            </Form.Item>
      
            <Form.Item >
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
           
          );

       
    }
}


export default Login