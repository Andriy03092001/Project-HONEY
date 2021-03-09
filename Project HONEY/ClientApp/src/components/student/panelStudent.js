import React, { Component, Fragment } from 'react';
import { Card, Col, Row, Button, Input, Modal, Form, DatePicker } from 'antd';
import "./style.css";
import EclipseWidget from '../eclipse';


const { Meta } = Card;
const { Search } = Input;


class PanelStudent extends Component {
    state = {
        loading: this.props.loading,
        errors: this.props.errors,
        errorMessage: "",
        courses: [],
        currentPage: this.props.currentPage,
        totalCount: this.props.totalCount,
        sizePage: this.props.sizePage,
        isModal: false,
        selectCourseId: ""
    }

    UNSAFE_componentWillReceiveProps = (nextProps) => {
        this.setState({
            loading: nextProps.loading,
            errorMessage: nextProps.errors,
            courses: nextProps.courses,
            currentPage: nextProps.currentPage,
            totalCount: nextProps.totalCount,
        }
        );
    }

    componentDidMount() {
        this.props.getCourse();
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
        this.props.getCourse(this.state.currentPage, value)
    };


    subCourse = (e) => {
        const id = e.target.value;
        this.setState({
            selectCourseId: id
        })
        this.showModel();
    }

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
            const sub = {
                idCourse: this.state.selectCourseId,
                date: values.date._d
            }
            console.log(sub)
            // const newCourse = {
            //     title: values.title,
            //     image: values.image

            // }
            // this.props.addCourse(newCourse);
             this.handleCancel();
            // this.props.getData(this.state.currentPage);
        };

        const onFinishFailed = (errorInfo) => {
            console.log('Failed:', errorInfo);
        };

        

        const { loading, currentPage, totalCount } = this.state;
        const dateFormat = 'DD/MM/YYYY';


        const pages = [];
        for (let i = 1; i <= Math.ceil(this.state.totalCount / this.state.sizePage); i++) {
            pages.push(i);
        }
        return (
            <Fragment>
                <h2>Choose course:</h2>
                <Search placeholder="Search..." onSearch={this.onSearch} enterButton  ></Search>

                <div className="site-card-wrapper">
                    <Row gutter={16}>
                        {this.state.courses.map((course, index) =>
                            <Col span={6} key={index}>
                                <Card
                                    hoverable
                                    style={{ width: 240, marginTop: 10, height: 300 }}
                                    cover={<img height="200px" alt="example" src={course.image} />}
                                >
                                    <div className="row" value={course.id}>
                                        <Meta className="col-12" title={course.title} value={course.id} />
                                        <button className="btn btn-info col-12 btnSub" type="primary" value={course.id} onClick={this.subCourse} htmlType="submit">Subscribe</button>
                                    </div>
                                </Card>
                            </Col>
                        )}
                    </Row>
                </div>

                {totalCount > 0 && <div className="pagination text-center">
                    {pages.map((page, index) =>
                        <span className={currentPage === page ? "active" : "page"}
                            key={index}
                            onClick={() => this.props.getCourse(page)}>
                            {page}
                        </span>)}
                </div>}
                {loading && <EclipseWidget />}


                <Modal title="Subscribe on course" visible={this.state.isModal} cancelButtonProps={{ style: { display: 'none' } }}>
                    <Form {...layout} name="basic" initialValues={{
                        remember: true,
                    }} onFinish={onFinish} onFinishFailed={onFinishFailed} >

                        <Form.Item label="Choose date:" name="date"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please choose date!',
                                },
                            ]}
                        >
                              <DatePicker format={dateFormat}/>

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


export default PanelStudent