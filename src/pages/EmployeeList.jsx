import { Link } from "react-router-dom"

function EmployeeList(){
    return(
        <>
         <div id="employee-div" className="employee-container">
            <h2>Current Employees</h2>
            <Link to={`/`}>Home</Link>
        </div>
        </>
    )
}
export default EmployeeList