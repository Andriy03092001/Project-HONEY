import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom'
import { Steps, Button, message, Carousel } from 'antd';
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

  onChange(a, b, c) {
    console.log(a, b, c);
  }

  render() {




    const contentStyle = {
      height: '360px',
      color: '#fff',
      lineHeight: '160px',
      textAlign: 'center',
      background: '#364d79',
    };

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


        <Carousel afterChange={this.onChange}>
          <div>
            <img className="imgCarousel" src="https://media.geeksforgeeks.org/wp-content/cdn-uploads/20200309202057/How-To-Learn-ReactJS-A-Complete-Guide-For-Beginners.jpg"></img>
          </div>
          <div>
            <img className="imgCarousel" src="https://hackr.io/blog/why-should-you-learn-angular/thumbnail/large"></img>
          </div>
          <div>
            <img className="imgCarousel" src="http://jason-jones.co.uk/wp-content/uploads/2017/02/aspnetcoreblog_header-1140x571.png"></img>
          </div>
        </Carousel>,


        <div className="p100">
          <h2 className="base-color text-center">Steps for study on course</h2>
          <Steps current={current}>
            {steps.map(item => (
              <Step key={item.title} title={item.title} />
            ))}
          </Steps>

          <h2 className="steps-content">{steps[current].content}</h2>
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
        </div>



      </Fragment>


    );
  }
}
