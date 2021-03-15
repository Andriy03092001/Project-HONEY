import React, { Component, Fragment } from 'react';
import { Card, Col, Row, Button, Input,Modal, Form } from 'antd';
import "./style.css";
import EclipseWidget from '../eclipse';

const { Meta } = Card;
const { Search } = Input;


class PanelCourses extends Component {
    state = {
        loading: this.props.loading,
        errors: this.props.errors,
        errorMessage: "",
        courses: [],
        currentPage: this.props.currentPage,
        totalCount: this.props.totalCount,
        sizePage: this.props.sizePage,
        isModal: false
    }

    UNSAFE_componentWillReceiveProps  = (nextProps) => {
        this.setState({
            loading: nextProps.loading,
            errorMessage: nextProps.errors,
            courses: nextProps.courses,
            currentPage: nextProps.currentPage,
            totalCount: nextProps.totalCount,
        }
        );
        console.log('Courses from state: ', nextProps.courses);
    }

    componentDidMount() {
        this.props.getData();
    }

    handleCancel = () => {
        this.setState({
            isModal: false
        })
    };

    showModel = () => {
        this.setState({
            isModal: true,
        })
    };



    onSearch = value => {
        this.props.getData(this.state.currentPage, value)
    };

    render() {

        const layout = {
            labelCol: {
                span: 8,
            },
            wrapperCol: {
                span: 16,
            },
        };
        const tailLayout = {
            wrapperCol: {
                offset: 8,
                span: 16,
            },
        };


        const onFinish = (values) => {
            const newCourse = {
                title: values.title,
                image: values.image
              
            }
            this.props.addCourse(newCourse);
            this.handleCancel();
            this.props.getData(this.state.currentPage);
        };

        const onFinishFailed = (errorInfo) => {
            console.log('Failed:', errorInfo);
        };


        const { loading, currentPage, totalCount } = this.state;

        const pages = [];
        for (let i = 1; i <= Math.ceil(this.state.totalCount / this.state.sizePage); i++) {
            pages.push(i);
        }
        return (
            <Fragment>
                <h2>Course manager:</h2>
                <div className="row">
                    <Search className="col-10" placeholder="Search..." onSearch={this.onSearch} enterButton  ></Search>
                    <Button className="col-2" type="primary"  onClick={() => this.showModel()}>Add new course</Button>
                </div>

                <div className="site-card-wrapper">
                    <Row gutter={16}>

                        {this.state.courses.map((course, index) =>
                            <Col span={6}>
                                <Card
                                    hoverable
                                    style={{ width: 240, marginTop: 10, height: 300 }}
                                    cover={<img height="200px" alt="example" src={course.image} />}
                                >
                                    <Meta title={course.title} />
                                </Card>
                            </Col>

                        )}
                    </Row>
                </div>

                {totalCount > 0 && <div className="pagination text-center">
                    {pages.map((page, index) =>
                        <span className={currentPage === page ? "active" : "page"}
                            key={index}
                            onClick={() => this.props.getData(page)}>
                            {page}
                        </span>)}
                </div>}
                {loading && <EclipseWidget />}


                <Modal title="Add new course" visible={this.state.isModal} onCancel={this.handleCancel}>
                    <Form {...layout} name="basic" initialValues={{
                            remember: true,
                        }} onFinish={onFinish} onFinishFailed={onFinishFailed} >

                        <Form.Item label="Course title:" name="title" 
                         rules={[
                            {
                              required: true,
                              message: 'Please input title!',
                            },
                          ]}
                        >
                            <Input />
                        </Form.Item>


                        <Form.Item label="Image URL:" name="image" 
                         rules={[
                            {
                              required: true,
                              message: 'Please input image URL!',
                            },
                          ]}
                        >
                            <Input/>
                        </Form.Item>


                        <Form.Item {...tailLayout}>
                            <Button type="primary" htmlType="submit">Submit</Button>
                        </Form.Item>
                    </Form>

                </Modal>

            </Fragment>
        );
    }
}


export default PanelCourses