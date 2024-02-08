import { Link } from "react-router-dom"
import { selectSearch, selectEmployees,  selectNewEmployeeIndex } from "../features/selector"
import { useDispatch, useSelector } from "react-redux"
import { saveListEmployees, clearNewEmployeeIndex } from "../features/store"
import { useEffect , useMemo} from "react"
import TableReact from "../components/Table/TableReact"


function EmployeeList(){
    const dispatch = useDispatch()

    const resultSearch = useSelector(selectSearch)
    const allEmployees = useSelector(selectEmployees)
    // const employeesFinalArray = [...useSelector(selectListEmployees)]
    const employeesFinalArray = useMemo(() => [...allEmployees], [allEmployees])
    employeesFinalArray.length===0 && dispatch(saveListEmployees(allEmployees))

    const newEmployeeIndex = useSelector(selectNewEmployeeIndex)
// useMemo pour mémoriser la valeur de employeesFinalArray entre les rendus
  const memoizedEmployeesFinalArray = useMemo(() => employeesFinalArray,[employeesFinalArray])
  // console.log('memoizedEmployeesFinalArray:', memoizedEmployeesFinalArray)

  useEffect(() => {
    if (newEmployeeIndex !== null) {
      console.log('Nouvel Employee :', memoizedEmployeesFinalArray[newEmployeeIndex])

      // Réinitialisation de l'index 
      dispatch(clearNewEmployeeIndex());
    }
  }, [newEmployeeIndex, memoizedEmployeesFinalArray, dispatch])

  // Définition des éléments d'entête du tableau
  const columns = ['First Name','Last Name', 'Start Date','Date of Birth', 'Department','Street','City','State','Zip Code']

    return (
         <div id="employee-div" className="employee-container">
            <h2>Current Employees</h2>
            <Link to={`/`}>Home</Link>
                { employeesFinalArray.length>0 && 
                <TableReact dataColumns={columns} dataRows={resultSearch.length>0 ? resultSearch:allEmployees}/>
                }
        </div>
    )
}
export default EmployeeList

