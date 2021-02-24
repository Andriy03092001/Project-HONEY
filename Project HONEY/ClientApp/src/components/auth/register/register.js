import React, { Component } from 'react';
import { Form, Input, Button, InputNumber } from 'antd';

class Register extends Component {

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

                <h2>Register </h2>
                <label className="text-center">Name:</label>

                <Form.Item

                    name="name"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your name!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <label className="text-center">Last name:</label>

                <Form.Item

                    name="lastName"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your last name!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>


                <label className="text-center">Age:</label>
                <Form.Item
                    name="age"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your age!',
                        },
                    ]}
                >
                    <InputNumber />
                </Form.Item>



                <label className="text-center">Email:</label>
                <Form.Item
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your email!',
                            type: 'email'
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <label className="text-center">Password:</label>
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


                
                <label className="text-center">Confirm password:</label>
                <Form.Item
                    name="confirm"
                    label=""
                    dependencies={['password']}
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: 'Please confirm your password!',
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject('The two passwords that you entered do not match!');
                            },
                        }),
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

export default Register