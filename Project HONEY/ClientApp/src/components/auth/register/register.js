import React, { Component } from 'react';
import { Form, Input, Button, InputNumber, Alert  } from 'antd';
import "../../../custom.css";
import EclipseWidget from '../../eclipse';
class Register extends Component {

    state = {
        errorMessage: "",
        loading: this.props.loading,
        errors: this.props.errors,
    }


    //визивається при зміні даних у пропсах
    UNSAFE_componentWillReceiveProps = (nextProps) => {
        console.log('Change props', nextProps);

        this.setState({
            loading: nextProps.loading,
            errorMessage: nextProps.errors
        });

        console.log(this.state.errors)
    }
    render() {
        const onFinish = (values) => {
            console.log('Success:', values);
            this.props.registerUser(values);
        };

        const onFinishFailed = (errorInfo) => {
            console.log('Failed:', errorInfo);
        };
        const {errorMessage,loading} = this.state;
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
                {errorMessage ? ( <Alert message={errorMessage} type="error" showIcon />) : (<p></p>)}
                {loading && <EclipseWidget />}

            </Form>

        );


    }

}

export default Register