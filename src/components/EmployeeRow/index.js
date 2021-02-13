import React from 'react'

export default function EmployeeRow({ employee }) {
    return (
        <tr>
            <td><img src={employee.picture.thumbnail} /></td>
            <td>{employee.name.first}</td>
            <td>{employee.name.last}</td>
            <td>{employee.location.city}, {employee.location.state}, {employee.location.country}</td>
            <td>{employee.email}</td>
            <td>{employee.phone}</td>
            <td>{employee.dob.date.toLocaleDateString()}</td>
        </tr>
    );
}
