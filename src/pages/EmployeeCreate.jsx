import { useUpperCaseFistLetter } from '../hooks/useUpperCaseFirstLetter'
import { createEmployee} from '../features/store'
import DatePicker from '../components/DatePicker'
import {departments} from '../datas/departments'
import {ModalReact} from 'modal-react-sw49go'
import DropDown from '../components/DropDown'
import { useForm}  from 'react-hook-form'
import { useDispatch} from 'react-redux'
import { Link } from 'react-router-dom'
import {states} from '../datas/states'
import React, { useState } from 'react'

function EmployeeCreate(){
    const { register, handleSubmit, reset, setValue} = useForm()
    const dispatch =useDispatch()

    // Custom hook to capitalize first letter
    const upperCaseFirstLetter= useUpperCaseFistLetter

    /**
     * Function to save employee in persist store
     * @param {object} data 
     */
    function SaveEmployee(data){
         // Default values
         if (!('states' in data)) { data.states = 'AL'}
         if (!('department' in data)) { data.department = 'Engineering'}

        // Le nouvel employee crée
        const newEmployee = {
            firstName: data.firstName,
            lastName: data.lastName,
            dateOfBirth: data.dateOfBirth,
            startDate: data.startDate,
            department: data.department,
            street: data.street,
            city: data.city,
            states: data.states,
            zipCode: data.zipCode
          }
        // Adding the new employee to the original array [employees]
        dispatch(createEmployee(newEmployee))
        setIsOpen(true)
        reset()
    }
    
    // Saving values ​​in the form from DropDown
    const handleOptionDepartment=(selectOption)=>{
        setValue('department', upperCaseFirstLetter(selectOption))
     }
    const handleOptionState=(selectOption)=>{
         setValue('states', upperCaseFirstLetter(selectOption))
     }
     // Saving values ​​in the form from DatePicker
     const handleDateSelectedBirth=(dateChoose)=>{
        setValue('dateOfBirth', dateChoose)
    }
    const handleDateSelectedStart=(dateChoose)=>{
        setValue('startDate', dateChoose)
    }
    const [isOpen,setIsOpen]=useState(false)

    return(
        <>
        <ModalReact  isOpen={isOpen}
            isOverlay={true}
            styleOverlay={{opacity:'0.7'}}
            themeName={'headerAndButtonTheme'}
            styleContainerHeader={{borderBottom:'2px solid #000', backgroundColor:'rgb(66 214 188)'}}
            styleButton={{border:'1px solid blue',backgroundColor:'rgb(66 214 188)'}}
            modalTitle={'HRnet'}
            styleContainerContent={{textAlign:'center', color:'blue'}}
            contentModal={'Employee Created!'}
            textButton={'Ok'}
            actionOnClose={function () {setIsOpen(false)}}/>

        <div className="container-createEmployee">
            <h2>Create Employee</h2>
            <Link to={`/Employee`}>View Current Employees</Link>
            <form id="create-employee" onSubmit={handleSubmit(SaveEmployee)} data-testid='create-employee'>
                <div className='createEmployee'>
                    <fieldset>
                        <legend>Identity</legend>
                        <label htmlFor="firstName">First Name</label>
                        <input type="text" id="firstName"  {...register('firstName', {setValueAs: (value) => upperCaseFirstLetter(value)})}/>

                        <label htmlFor="lastName">Last Name</label>
                        <input type="text" id="lastName" required  {...register('lastName', {setValueAs: (value) => upperCaseFirstLetter(value)})}/>
                        <DatePicker idInput={'dateOfBirth'}  textLabel={'Date of Birth'} onSelect={handleDateSelectedBirth}/>
                        <DatePicker idInput={'startDate'}  textLabel={'Start Date'} onSelect={handleDateSelectedStart}/>
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
                        <input id="zipCode" type="number"  required {...register('zipCode', { validate: value => value.length === 5 && /^\d+$/.test(value) })}/>
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