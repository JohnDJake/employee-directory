import React, { Component } from 'react'
import API from '../../utils/API';
import EmployeeRow from '../EmployeeRow';

export default class EmployeeTable extends Component {
    state = { employees: [] };

    componentDidMount() {
        API.generate(100).then(({ data: { results } }) => this.setState({ employees: results }));
    }

    sortByFirstNameAscending(a, b) {
        if (a.name.first > b.name.first) return 1;
        if (a.name.first < b.name.first) return -1;
        return 0;
    }

    sortByLastNameAscending(a, b) {
        if (a.name.last > b.name.last) return 1;
        if (a.name.last < b.name.last) return -1;
        return 0;
    }

    render() {
        return (
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Picture</th>
                        <th scope="col" onClick={() => this.setState({sort: this.sortByFirstNameAscending})}>First Name</th>
                        <th scope="col" onClick={() => this.setState({sort: this.sortByLastNameAscending})}>Last Name</th>
                        <th scope="col">Location</th>
                        <th scope="col">Email</th>
                        <th scope="col">Phone</th>
                        <th scope="col">DOB</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.employees.sort(this.state.sort).map(employee => <EmployeeRow key={employee.login.uuid} employee={employee} />)}

                </tbody>
            </table>
        )
    }
}
