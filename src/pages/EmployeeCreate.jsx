import { useUpperCaseFistLetter } from '../hooks/useUpperCaseFirstLetter'
import { useDispatch} from 'react-redux'
import { createEmployee} from '../features/store'
import { useForm}  from 'react-hook-form'
import { Link } from 'react-router-dom'
import DropDown from '../components/DropDown'
import {states} from '../datas/states'
import {departments} from '../datas/departments'

function EmployeeCreate(){
    const { register, handleSubmit, reset, setValue} = useForm()
    const dispatch =useDispatch()

    // Custom hook to capitalize first letter
    const upperCaseFirstLetter= useUpperCaseFistLetter

    /**
     * Function to save employee in persist store
     * @param {object} data 
     */
    function SaveEmployee (data){
        console.log(data)
         // Default values
         if (!('states' in data)) { data.states = 'AL'}
         if (!('department' in data)) { data.department = 'Engineering'}
         // Adding the new employee to the original table
         dispatch(createEmployee(data))
         reset()
    }
    // Saving values ​​in the form
    const handleOptionDepartment=(selectOption)=>{
        setValue('department', upperCaseFirstLetter(selectOption))
     }
    const handleOptionState=(selectOption)=>{
         setValue('states', selectOption)
     }

    return(
        <>
        <div className="container-createEmployee">
            <h2>Create Employee</h2>
            <Link to={`/Employee`}>View Current Employees</Link>
            <form id="create-employee" onSubmit={handleSubmit(SaveEmployee)}>
                <div className='createEmployee'>
                    <fieldset>
                        <legend>Identity</legend>
                        <label htmlFor="firstName">First Name</label>
                        <input type="text" id="firstName"  {...register('firstName', {setValueAs: (value) => upperCaseFirstLetter(value)})}/>

                        <label htmlFor="lastName">Last Name</label>
                        <input type="text" id="lastName" required  {...register('lastName', {setValueAs: (value) => upperCaseFirstLetter(value)})}/>
                        <label htmlFor="date-of-birth">Date of Birth</label>
                        <input id="date-of-birth" type="text"/>

                        <label htmlFor="start-date">Start Date</label>
                        <input id="start-date" type="text" />
                    </fieldset>
                    <fieldset className="address">
                        <legend>Address</legend>
                        <label htmlFor="street">Street</label>
                        <input id="street" type="text" required {...register('street', {setValueAs: (value) => upperCaseFirstLetter(value)})}/>
                        <label htmlFor="city">City</label>
                        <input id="city" type="text" required {...register('city', {setValueAs: (value) => upperCaseFirstLetter(value)})}/>
                        <label>State</label>
                        <DropDown data={states} onSelect={handleOptionState} ASC={true}/>
                        <label htmlFor="zipCode">Zip Code</label>
                        <input id="zipCode" type="number" required {...register('zipCode')}/>
                    </fieldset>
                    <fieldset>
                        <legend>Others</legend>
                        <label>Department</label>
                        <DropDown data={departments} onSelect={handleOptionDepartment} ASC={true}/>
                    </fieldset>
                </div>
                <button className="employee-button">Save</button>
            </form>
        </div>
        </>
    )
}
export default EmployeeCreate