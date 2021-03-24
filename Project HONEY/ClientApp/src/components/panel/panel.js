import React, { Component, Fragment } from 'react';
import { Table, Input, Button, Modal, Form, InputNumber,Card } from 'antd';
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
        isEditModal: false,
        editStudent: {}
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

    handleCancel = () => {
        this.setState({
            isEditModal: false
        })
    };




    showModel = (id) => {
        var student = this.state.students.find(x => x.id === id);
        console.log(student)
        this.setState({
            isEditModal: true,
            editStudent: student
        })
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
            const editedStudent = {
                id: this.state.editStudent.id,
                name: (values.name ? values.name : this.state.editStudent.name),
                lastName: (values.lastName ? values.lastName : this.state.editStudent.lastName),
                email: (values.email ? values.email : this.state.editStudent.email),
                age: (values.age ? values.age : this.state.editStudent.age)
            }
            this.props.editStudent(editedStudent);
            this.setState({
                isEditModal: false
            })
            this.props.getData(this.state.currentPage);
        };

        const onFinishFailed = (errorInfo) => {
            console.log('Failed:', errorInfo);
        };

        const columnsCourses = [
            {
                title: 'This student is enrolled in courses:',
                dataIndex: 'title',
               
            }
        ]
           

        const columns = [
            {
                title: 'Name',
                dataIndex: 'name',
                sorter: {
                    compare: (a, b) => a.name.length - b.name.length,
                },
            },
            {
                title: 'Last Name',
                dataIndex: 'lastName',
                sorter: {
                    compare: (a, b) => a.lastName.length - b.lastName.length,
                }
            },
            {
                title: 'Age',
                dataIndex: 'age',
                sorter: {
                    compare: (a, b) => a.age - b.age,
                },
            },
            {
                title: 'Email',
                dataIndex: 'email',
                sorter: {
                    compare: (a, b) => a.email.length - b.email.length,
                },
            },
            {
                title: 'Registered Date',
                dataIndex: 'registeredDate',

            },
            {
                title: 'Study Date',
                dataIndex: 'studyDate',
                emptyText: "Did not choose the date of study"
            },
            {
                title: 'Action',
                dataIndex: 'id',
                render: (id) => (
                    <Button onClick={(e) => { this.showModel(id); }} type="primary" danger>
                        Edit
                    </Button>
                ),
            }

        ];
        const { loading, currentPage, totalCount } = this.state;

        const pages = [];
        for (let i = 1; i <= Math.ceil(this.state.totalCount / this.state.sizePage); i++) {
            pages.push(i);
        }

        const tableProps = {
            expandedRowRender: record => (console.log(record.courses),
              <Table  columns={columnsCourses} dataSource={record.courses} pagination={false}/>
            )
          };

        return (
            <Fragment>
                <h2>Students manager:</h2>
                <div className="main-panel">
                    <Search placeholder="Search..." onSearch={this.onSearch} enterButton ></Search>
                    
                    <Table {...tableProps} columns={columns} dataSource={this.state.students} pagination={false} ></Table>

                </div>
                {totalCount > 0 && <div className="pagination text-center">
                    {pages.map((page, index) =>
                        <span className={currentPage === page ? "active" : "page"}
                            key={index}
                            onClick={() => this.props.getData(page)}>
                            {page}
                        </span>)}
                </div>}

                <Modal title="Edit student" visible={this.state.isEditModal} onCancel={this.handleCancel}>
                    <Form {...layout} name="basic" initialValues={{
                        remember: true,
                    }} onFinish={onFinish} onFinishFailed={onFinishFailed} >

                        <Form.Item label="Email" name="email" >
                            <Input placeholder={this.state.editStudent.email} />
                        </Form.Item>


                        <Form.Item label="Name" name="name" >
                            <Input placeholder={this.state.editStudent.name} />
                        </Form.Item>

                        <Form.Item label="Last Name" name="lastName" >
                            <Input placeholder={this.state.editStudent.lastName} />
                        </Form.Item>

                        <Form.Item label="Age" name="age" >
                            <InputNumber placeholder={this.state.editStudent.age} />
                        </Form.Item>


                        <Form.Item {...tailLayout}>
                            <Button type="primary" htmlType="submit">Submit</Button>
                        </Form.Item>
                    </Form>

                </Modal>
                {loading && <EclipseWidget />}
            </Fragment>
        );
    }
}


export default Panel