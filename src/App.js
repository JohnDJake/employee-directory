import React from 'react'
import EmployeeTable from './components/EmployeeTable'
import Navbar from './components/Navbar'

export default function App() {
    return (
        <div>
            <Navbar />
            <div className="container">
                <EmployeeTable />
            </div>
        </div>
    );
}
