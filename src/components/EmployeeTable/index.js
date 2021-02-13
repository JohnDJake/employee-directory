import React, { Component } from 'react'
import API from '../../utils/API';
import EmployeeRow from '../EmployeeRow';

const sorts = {
    firstNameAscending: (a, b) => {
        if (a.name.first > b.name.first) return 1;
        if (a.name.first < b.name.first) return -1;
        return 0;
    },

    firstNameDescending: (a, b) => {
        if (a.name.first < b.name.first) return 1;
        if (a.name.first > b.name.first) return -1;
        return 0;
    },

    lastNameAscending: (a, b) => {
        if (a.name.last > b.name.last) return 1;
        if (a.name.last < b.name.last) return -1;
        return 0;
    },

    lastNameDescending: (a, b) => {
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

    changeSort(sortBy) {
        if (this.state.sort === sortBy) this.setState({ sortDirection: this.state.sortDirection === "Ascending" ? "Descending" : "Ascending" });
        else this.setState({ sort: sortBy, sortDirection: "Ascending" });
    }

    render() {
        return (
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Picture</th>
                        <th scope="col" onClick={() => this.changeSort("firstName")}>First Name</th>
                        <th scope="col" onClick={() => this.changeSort("lastName")}>Last Name</th>
                        <th scope="col">Location</th>
                        <th scope="col">Email</th>
                        <th scope="col">Phone</th>
                        <th scope="col">DOB</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.employees.sort(sorts[this.state.sort + this.state.sortDirection]).map(employee => <EmployeeRow key={employee.login.uuid} employee={employee} />)}

                </tbody>
            </table>
        )
    }
}
