import React, { Component, Fragment } from 'react';
import { Card, Input, Col, Row } from 'antd';
import "./style.css";
import EclipseWidget from '../eclipse';
import jwt_decode from "jwt-decode";

const { Meta } = Card;


class Profile extends Component {
    state = {
        loading: this.props.loading,
        errors: this.props.errors,
        errorMessage: "",
        courses: [],
        currentPage: this.props.currentPage,
        totalCount: this.props.totalCount,
        sizePage: this.props.sizePage,
        isModal: false,
        selectCourseId: "",
        successMessage: ""
    }

    UNSAFE_componentWillReceiveProps = (nextProps) => {
        this.setState({
            loading: nextProps.loading,
            errorMessage: nextProps.errors,
            courses: nextProps.courses,
            fullName: nextProps.fullName,
            email: nextProps.email,
            age: nextProps.age,
            successMessage: nextProps.successMessage
        }
        );
    }

    componentDidMount() {
        const token = localStorage.getItem("authToken");
        const decode = jwt_decode(token);
        this.props.getProfile(decode.id);
    }

    render() {

        const { loading, currentPage, totalCount, successMessage, sizePage } = this.state;

        const pages = [];
        for (let i = 1; i <= Math.ceil(totalCount / sizePage); i++) {
            pages.push(i);
        }
        return (
            <Fragment>
                <div className="row">
                    <div className="col-3">
                        <Card title="Profile" bordered={true}>
                            <h3>{this.state.fullName}</h3>
                            <h5>Email: </h5>
                            <p>{this.state.email}</p>
                            <h5>Age: </h5>
                            <p>{this.state.age} years</p>
                        </Card>
                    </div>

                    <div className="col-9">
                        <h3>Courses I have subscribed to:</h3>
                        <div className="site-card-wrapper">
                            <div className="row">

                                {this.state.courses.map((course, index) =>
                                    <div className="col-4">
                                        <Card
                                            hoverable
                                            style={{ width: 240, marginTop: 10, height: 300 }}
                                            cover={<img height="200px" alt="example" src={course.image} />}
                                        >
                                           <h4>{course.title}</h4>
                                        </Card>
                                    </div>

                                )}
                            </div>

                            {totalCount > 0 && <div className="pagination text-center">
                                {pages.map((page, index) =>
                                    <span className={currentPage === page ? "active" : "page"}
                                        key={index}
                                        onClick={() => this.props.getData(page)}>
                                        {page}
                                    </span>)}
                            </div>}
                        </div>
                    </div>

                </div>
                {loading && <EclipseWidget />}
            </Fragment >
        );
    }
}


export default Profile