import React, { Component, Fragment } from 'react';
import { Form, Input, Button, Alert } from 'antd';
import "../../../custom.css";
import EclipseWidget from '../../eclipse';
import '../form.css';
import FacebookLogin from 'react-facebook-login';


class Login extends Component {
  state = {
    loading: this.props.loading,
    errors: this.props.errors,
    errorMessage: ""
  }

  //визивається при зміні даних у пропсах
  UNSAFE_componentWillReceiveProps = (nextProps) => {
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
      var model = {
        first_name: response.first_name,
        last_name: response.last_name,
        email: response.email,
        accessToken: response.accessToken
      }

      this.props.loginFacebook(model);
    }


    const { errorMessage, loading } = this.state;

    return (
      <Fragment>

        <div class="login-page">
          <div class="form">
            <h2 className="base-color">Login </h2>
            <Form

              name="basic"
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
            >
              <label>Email:</label>

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
              {errorMessage ? (<Alert message={errorMessage} type="error" className="m10" showIcon />) : (<p></p>)}

              <Form.Item >
                <button className="my-btn" type="submit">
                  Submit
              </button>
              </Form.Item>
              <label className="text-center">OR</label>

            </Form>

            <FacebookLogin
              appId="702276423773435"
              autoLoad={false}
              fields="first_name,last_name,picture,email"
              callback={responseFacebook}
              cssClass="my-btn"
            />

          </div>
        </div>
        {loading && <EclipseWidget />}
      </Fragment>
    );


  }
}


export default Login