import React, { Component } from 'react'
import API from '../../utils/API';
import EmployeeRow from '../EmployeeRow';

const sorts = {
    firstNameAscending: (a, b) => sorts.ascending(a.name.first, b.name.first),

    firstNameDescending: (a, b) => sorts.firstNameAscending(a, b) * -1,

    lastNameAscending: (a, b) => sorts.ascending(a.name.last, b.name.last),

    lastNameDescending: (a, b) => sorts.lastNameAscending(a, b) * -1,

    ascending: (a, b) => {
        if (a > b) return 1;
        if (b > a) return -1;
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
