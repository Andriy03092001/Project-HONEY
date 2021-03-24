import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom'
import { Steps, Button, message } from 'antd';
const { Step } = Steps;


export class Home extends Component {
  static displayName = Home.name;

  state = {
    steps: [
      {
        title: 'Register in system',
        content: 'Register in the system to see all the courses you can take ',
      },
      {
        title: 'Find courses',
        content: 'Find the courses you would like to take',
      },
      {
        title: 'Study',
        content: 'To study on the chosen course and not to stop on it and to develop further with other courses',
      },
    ],
    current: 0
  }


  render() {

    const { current, steps } = this.state;

    const next = () => {
      this.setState({
        current: current + 1
      })
    };

    const prev = () => {
      this.setState({
        current: current - 1
      })
    };

    return (
      <Fragment>
        <div class="jumbotron">
          <h1 class="display-4 base-color">Honey Courses</h1>
          <p class="lead">Find the course that interests you and start developing</p>
          <hr class="my-4" />
          <p class="lead">
            <Link class="btn btn-primary btn-lg" to="/panel" role="button"> <i class="fas fa-search"></i> Find courses</Link>
          </p>
        </div>

        <Steps current={current}>
          {steps.map(item => (
            <Step key={item.title} title={item.title} />
          ))}
        </Steps>

        <div className="steps-content">{steps[current].content}</div>
        <div className="steps-action">
          {current < steps.length - 1 && (
            <Button type="primary" onClick={() => next()}>
              Next
            </Button>
          )}
          {current === steps.length - 1 && (
            <Button type="primary" onClick={() => message.success('Processing complete!')}>
              Done
            </Button>
          )}
          {current > 0 && (
            <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
              Previous
            </Button>
          )}
        </div>


      

      </Fragment>


    );
  }
}
