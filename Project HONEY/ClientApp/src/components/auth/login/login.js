import React, { Component,Fragment } from 'react';
import { Form, Input, Button, Alert } from 'antd';
import "../../../custom.css";
import EclipseWidget from '../../eclipse';

import FacebookLogin from 'react-facebook-login';


class Login extends Component {
  state = {
    loading: this.props.loading,
    errors: this.props.errors,
    errorMessage: ""
  }

  //визивається при зміні даних у пропсах
  UNSAFE_componentWillReceiveProps  = (nextProps) => {
    console.log('Change props', nextProps);
    this.setState({
      loading: nextProps.loading,
      errorMessage: nextProps.errors
    }
    );
  }

 

  render() {

    const onFinish = (values) => {
      console.log('Success:', values);
      this.props.loginUser(values);
    };

    const onFinishFailed = (errorInfo) => {
      console.log('Failed:', errorInfo);
    };

    const responseFacebook = (response) => {
      console.log(response);
    }

    const { errorMessage, loading } = this.state;

    return (
      <Fragment>
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

          {errorMessage ? (<Alert message={errorMessage} type="error" showIcon />) : (<p></p>)}
          {loading && <EclipseWidget />}


        </Form>

        <FacebookLogin
    appId="702276423773435"
    autoLoad={true}
    fields="first_name,last_name,picture,email"
    callback={responseFacebook} />


      </Fragment>
    );


  }
}


export default Login