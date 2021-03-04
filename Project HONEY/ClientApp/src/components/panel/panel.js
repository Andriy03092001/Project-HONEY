import React, { Component, Fragment } from 'react';
import { Table, Input, Button, Modal } from 'antd';
import EclipseWidget from '../eclipse';
import "./style.css";
const { Search } = Input;



class Panel extends Component {
    state = {
        loading: this.props.loading,
        errors: this.props.errors,
        errorMessage: "",
        students: [],
        currentPage: this.props.currentPage,
        totalCount: this.props.totalCount,
        sizePage: this.props.sizePage,
        isEditModal: false
    }


    //визивається при зміні даних у пропсах
    UNSAFE_componentWillReceiveProps = (nextProps) => {
        console.log('Students: ', nextProps);
        this.setState({
            loading: nextProps.loading,
            errorMessage: nextProps.errors,
            students: nextProps.students,
            currentPage: nextProps.currentPage,
            totalCount: nextProps.totalCount,
        }
        );
    }

    onSearch = value => {
        this.props.getData(this.state.currentPage, value)
    };

    componentDidMount() {
        this.props.getData(this.state.currentPage);
    }


    setPage = value => {
        console.log("loh " + value)
        // this.props.getData(page);
    }

    handleOk = () => {
        this.setState({
            isEditModal: false
        })
        alert("Save changes...")
    };

    handleCancel = () => {
        this.setState({
            isEditModal: false
        })
    };

    showModel = (id) => {
        this.setState({
            isEditModal: true
        })
        alert(id)
    };


    render() {
        const columns = [
            {
                title: 'Id',
                dataIndex: 'id'
            },
            {
                title: 'Name',
                dataIndex: 'name'
            },
            {
                title: 'Last Name',
                dataIndex: 'lastName'
            },
            {
                title: 'Age',
                dataIndex: 'age'
            },
            {
                title: 'Email',
                dataIndex: 'email'
            },
            {
                title: 'Registered Date',
                dataIndex: 'registeredDate'
            },
            {
                title: 'Study Date',
                dataIndex: 'studyDate'
            },
            {
                title: 'Action',
                dataIndex: 'id',
                render: (id) => (
                    <Button onClick={(e) => { this.showModel(id); }}  type="primary" danger>
                        Edit
                    </Button>
                ),
            }

        ];
        const { loading, currentPage, totalCount } = this.state;

        console.log(this.state.totalCount)
        const pages = [];
        for (let i = 1; i <= Math.ceil(this.state.totalCount / this.state.sizePage); i++) {
            pages.push(i);
        }
        return (
            <Fragment>
                <div className="main-panel">
                    <Search placeholder="Search..." onSearch={this.onSearch} enterButton ></Search>
                    <Table columns={columns} dataSource={this.state.students} pagination={false} ></Table>
                </div>
                {totalCount>0 && <div className="pagination text-center">
                    {pages.map((page, index) =>
                        <span className={currentPage === page ? "active" : "page"}
                            key={index}
                            onClick={() => this.props.getData(page)}>
                            {page}
                        </span>)}
                </div>}

                <Modal title="Basic Modal" visible={this.state.isEditModal} onOk={this.handleOk} onCancel={this.handleCancel}>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                </Modal>

                {loading && <EclipseWidget />}

            </Fragment>
        );
    }
}


export default Panel