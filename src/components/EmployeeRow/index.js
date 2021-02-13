import React from 'react'

const dateFormat = new Intl.DateTimeFormat('en-US', { month: "long", day: "numeric" });

export default function EmployeeRow({ employee }) {
    return (
        <tr>
            <td><img src={employee.picture.thumbnail} /></td>
            <td>{employee.name.first} {employee.name.last}</td>
            <td>{employee.email}</td>
            <td>{dateFormat.format(new Date(employee.dob.date))}</td>
        </tr>
    );
}
