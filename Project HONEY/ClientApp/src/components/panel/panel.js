import React, { Component, Fragment } from 'react';
import { Table, Input,Button } from 'antd';
import EclipseWidget from '../eclipse';

const { Search } = Input;


class Panel extends Component {
    state = {
        loading: this.props.loading,
        errors: this.props.errors,
        errorMessage: "",
        students: [],
        filterStudents: []
    }

    //визивається при зміні даних у пропсах
    UNSAFE_componentWillReceiveProps = (nextProps) => {
        console.log('Students: ', nextProps);
        this.setState({
            loading: nextProps.loading,
            errorMessage: nextProps.errors,
            students: nextProps.students,
            filterStudents: nextProps.students,
        }
        );
    }

    onSearch = value => {
            if(value !== "") {
                this.setState({
                    filterStudents: this.state.students.filter(
                        t => t.name.includes(value) 
                        || t.email.includes(value) 
                        || t.lastName.includes(value) 
                        || t.age === value)
                })
            } else {
                this.setState({
                    filterStudents: this.state.students
                })
            }
            
    };

    componentDidMount() {
        this.props.getData();
    }


    convertStringToDate(dateA) {
        var temp = dateA.split(".");

        var date = new Date(temp[2], temp[1] - 1, temp[0])

        return date;

    }


    render() {
        //const { errorMessage, loading } = this.state;

        const columns = [
            {
                title: 'Id',
                dataIndex: 'id',
                sorter: {
                    compare: (a, b) => a.id.length - b.id.length,
                },
            },
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
                },
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
                sorter: {
                    compare: (a, b) => this.convertStringToDate(a.registeredDate) - this.convertStringToDate(b.registeredDate),
                },
            },
            {
                title: 'Study Date',
                dataIndex: 'studyDate',
                sorter: {
                    compare: (a, b) => a.studyDate.length - b.studyDate.length,
                },
                emptyText: "Did not choose the date of study"
            },
            {
                title: 'Action',
                dataIndex: '',
                key: 'x',
                render: (text, record) => (
                  <Button danger
                    // onClick={(e) => { this.onDelete(record.key, e); }}
                  >
                    Edit
                  </Button>
                ),
              }

        ];

        function onChange(pagination, filters, sorter, extra) {
            console.log('params', pagination, filters, sorter, extra);
        }

        const {  loading } = this.state;

        return (
            <Fragment>
                <Search placeholder="Search..." onSearch={this.onSearch} enterButton />
                <Table columns={columns} dataSource={this.state.filterStudents} onChange={onChange} />
                {loading && <EclipseWidget />}

            </Fragment>
        );




    }
}


export default Panel