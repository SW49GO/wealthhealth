import { Link } from 'react-router-dom'
import { useForm}  from 'react-hook-form'
import { useUpperCaseFistLetter } from '../hooks/useUpperCaseFirstLetter'


function EmployeeCreate(){
    const { register, handleSubmit} = useForm()
    // Custom hook to capitalize first letter
    const upperCaseFirstLetter= useUpperCaseFistLetter
    function SaveEmployee (data){
        console.log(data)
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
                        <select name="state" id="state"></select>
                        <label htmlFor="zipCode">Zip Code</label>
                        <input id="zipCode" type="number" required {...register('zipCode')}/>
                    </fieldset>
                    <fieldset>
                        <legend>Others</legend>
                        <label>Department</label>
                        <select name="department" id="department">
                            <option>Sales</option>
                            <option>Marketing</option>
                            <option>Engineering</option>
                            <option>Human Resources</option>
                            <option>Legal</option>
                        </select>
                    </fieldset>
                </div>
                <button className="employee-button">Save</button>
            </form>
        </div>
        </>
    )
}
export default EmployeeCreate