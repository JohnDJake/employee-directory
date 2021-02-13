import React from 'react'

const dateFormat = new Intl.DateTimeFormat('en-US', { month: "long", day: "numeric" });

export default function EmployeeRow({ employee }) {
    return (
        <tr>
            <td><img src={employee.picture.thumbnail} /></td>
            <td>{employee.name.first}</td>
            <td>{employee.name.last}</td>
            <td>{employee.location.city}, {employee.location.state}, {employee.location.country}</td>
            <td>{employee.email}</td>
            <td>{employee.phone}</td>
            <td>{dateFormat.format(new Date(employee.dob.date))}</td>
        </tr>
    );
}
