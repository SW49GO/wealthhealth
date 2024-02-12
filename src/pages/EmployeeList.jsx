import { selectSearch, selectEmployees } from "../features/selector"
import TableReact from "../components/Table/TableReact"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

function EmployeeList(){

  // Retrieve result of a search
    const resultSearch = useSelector(selectSearch)
    const allEmployees = useSelector(selectEmployees)

  //Definition of table header elements
  const columns = ['First Name','Last Name', 'Start Date','Date of Birth', 'Department','Street','City','State','Zip Code']

    return (
         <div id="employee-div" className="employee-container">
            <h2>Current Employees</h2>
            <Link to={`/`}>Home</Link>
                { allEmployees.length>0 && 
                <TableReact dataColumns={columns} dataRows={resultSearch.length>0 ? resultSearch:allEmployees} />
                }
        </div>
    )
}
export default EmployeeList

