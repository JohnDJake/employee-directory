import React, { Component } from 'react'
import API from '../../utils/API';
import EmployeeRow from '../EmployeeRow';

const sorts = {
    byFirstNameAscending: (a, b) => {
        if (a.name.first > b.name.first) return 1;
        if (a.name.first < b.name.first) return -1;
        return 0;
    },

    byFirstNameDescending: (a, b) => {
        if (a.name.first < b.name.first) return 1;
        if (a.name.first > b.name.first) return -1;
        return 0;
    },

    byLastNameAscending: (a, b) => {
        if (a.name.last > b.name.last) return 1;
        if (a.name.last < b.name.last) return -1;
        return 0;
    },

    byLastNameDescending: (a, b) => {
        if (a.name.last < b.name.last) return 1;
        if (a.name.last > b.name.last) return -1;
        return 0;
    }
}

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
                        <th scope="col" onClick={() => this.setState({ sort: "byFirstNameAscending" })}>First Name</th>
                        <th scope="col" onClick={() => this.setState({ sort: "byLastNameAscending" })}>Last Name</th>
                        <th scope="col">Location</th>
                        <th scope="col">Email</th>
                        <th scope="col">Phone</th>
                        <th scope="col">DOB</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.employees.sort(sorts[this.state.sort]).map(employee => <EmployeeRow key={employee.login.uuid} employee={employee} />)}

                </tbody>
            </table>
        )
    }
}
