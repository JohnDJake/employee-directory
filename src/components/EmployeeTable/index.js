import React, { Component } from 'react'
import API from '../../utils/API';
import EmployeeRow from '../EmployeeRow';

export default class EmployeeTable extends Component {
    state = { employees: [] };

    componentDidMount() {
        API.generate(100).then(({ data: { results } }) => this.setState({ employees: results }));
    }

    render() {
        return (
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Picture</th>
                        <th scope="col">First Name</th>
                        <th scope="col">Last Name</th>
                        <th scope="col">Location</th>
                        <th scope="col">Email</th>
                        <th scope="col">Phone</th>
                        <th scope="col">DOB</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.employees.map(employee => <EmployeeRow key={employee.login.uuid} employee={employee} />)}

                </tbody>
            </table>
        )
    }
}
