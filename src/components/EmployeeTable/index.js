import React, { Component } from 'react'
import API from '../../utils/API';
import EmployeeRow from '../EmployeeRow';

const sorts = {
    // standard ascending sort
    ascending: (a, b) => {
        if (a > b) return 1;
        if (b > a) return -1;
        return 0;
    },

    // ascending sort using name.first
    firstNameAscending: (a, b) => sorts.ascending(a.name.first, b.name.first),

    // descending sort by multiplying ascending by -1
    firstNameDescending: (a, b) => sorts.firstNameAscending(a, b) * -1,

    // ascending sort using name.last
    lastNameAscending: (a, b) => sorts.ascending(a.name.last, b.name.last),

    // descending sort by multiplying ascending by -1
    lastNameDescending: (a, b) => sorts.lastNameAscending(a, b) * -1,

    // ascending sort by country, state, city
    locationAscending: ({ location: a }, { location: b }) => {
        if (a.country > b.country) return 1;
        if (b.country > a.country) return -1;
        // compare country must be 0 so check state
        if (a.state > b.state) return 1;
        if (b.state > a.state) return -1;
        // compare state must also be 0 so check city
        if (a.city > b.city) return 1;
        if (b.city > a.city) return -1;
        // same city, state, country
        return 0;
    },

    // descending sort by multiplying ascending by -1
    locationDescending: (a, b) => sorts.locationAscending(a, b) * -1,

    // ascending sort using dob
    dobAscending: (a, b) => sorts.ascending(a.dob.date, b.dob.date),

    // descending sort by multiplying ascending by -1
    dobDescending: (a, b) => sorts.dobAscending(a, b) * -1
}

export default class EmployeeTable extends Component {
    state = {
        employees: [],
        firstName: "",
        lastName: "",
        location: ""
    };

    // get generated employees
    componentDidMount() {
        API.generate(100).then(({ data: { results } }) => {
            // copy results array and replace each date string with a date object
            const employees = [...results];
            employees.forEach(employee => {
                employee.dob.date = new Date(employee.dob.date);
            });
            return this.setState({ employees });
        });
    }

    // update the sort state
    changeSort(sortBy) {
        // if updating with the current sort method, flip between ascending and descending
        if (this.state.sort === sortBy) this.setState({ sortDirection: this.state.sortDirection === "Ascending" ? "Descending" : "Ascending" });
        // otherwise switch to the new sort, ascending
        else this.setState({ sort: sortBy, sortDirection: "Ascending" });
    }

    // handle input change for filter inputs
    handleInputChange = ({ target: { name, value } }) => {
        this.setState({ [name]: value });
    }

    render() {
        return (
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Picture</th>
                        <th scope="col" onClick={() => this.changeSort("firstName")}>First Name</th>
                        <th scope="col" onClick={() => this.changeSort("lastName")}>Last Name</th>
                        <th scope="col" onClick={() => this.changeSort("location")}>Location</th>
                        <th scope="col">Email</th>
                        <th scope="col">Phone</th>
                        <th scope="col" onClick={() => this.changeSort("dob")}>DOB</th>
                    </tr>
                </thead>
                <thead>
                    <tr>
                        <th scope="col"></th>
                        <th scope="col"><input value={this.state.firstName} name="firstName" onChange={this.handleInputChange} /></th>
                        <th scope="col"><input value={this.state.lastName} name="lastName" onChange={this.handleInputChange} /></th>
                        <th scope="col"><input value={this.state.location} name="location" onChange={this.handleInputChange} /></th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.employees
                        .filter(employee => employee.name.first.toLowerCase().includes(this.state.firstName.toLowerCase()) &&
                            employee.name.last.toLowerCase().includes(this.state.lastName.toLowerCase()) &&
                            `${employee.location.country}${employee.location.state}${employee.location.city}`.toLowerCase().includes(this.state.location.toLowerCase()))
                        .sort(sorts[this.state.sort + this.state.sortDirection]).map(employee => <EmployeeRow key={employee.login.uuid} employee={employee} />)}

                </tbody>
            </table>
        )
    }
}
