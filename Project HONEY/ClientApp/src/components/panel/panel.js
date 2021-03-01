import React, { Component, Fragment } from 'react';
import { Table, Button, Space } from 'antd';

class Panel extends Component {
    state = {
        loading: this.props.loading,
        errors: this.props.errors,
        errorMessage: "",
        students: []
    }

    //визивається при зміні даних у пропсах
    UNSAFE_componentWillReceiveProps = (nextProps) => {
        console.log('Students: ', nextProps);
        this.setState({
            loading: nextProps.loading,
            errorMessage: nextProps.errors,
            students: nextProps.students
        }
        );
    }


    componentDidMount() {
        this.props.getData();
    }


    render() {
        //const { errorMessage, loading } = this.state;

        let { students } = this.state;
        students = students || {};
        const columns = [
            {
                title: 'title',
                dataIndex: 'title',
                sorter: {
                    compare: (a, b) => a.title.length - b.title.length,
                },
            },
            {
                title: 'body',
                dataIndex: 'body',
                sorter: {
                    compare: (a, b) => a.body.length - b.body.length,
                },
            }
        ];

        function onChange(pagination, filters, sorter, extra) {
            console.log('params', pagination, filters, sorter, extra);
        }


        return (
            <Table columns={columns} dataSource={this.state.students} onChange={onChange} />
        );




    }
}


export default Panel