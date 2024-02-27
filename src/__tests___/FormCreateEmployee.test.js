import React from 'react'
import { render , screen, fireEvent, waitFor} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { Provider } from 'react-redux'
import EmployeeCreate from '../pages/EmployeeCreate'
import { createEmployee } from '../features/store'
import configureStore from 'redux-mock-store'
import { MemoryRouter } from 'react-router-dom'

// Simuler scrollTo
window.HTMLElement.prototype.scrollTo = function() {}

describe('EmployeeCreate Form', ()=>{
    test('form submission', async () => {
  
        const mockStore = configureStore([])
        const initialState = {
           employeeSlice:{
             employees: []
           } 
         }
         const store = mockStore(initialState)
     
         store.dispatch = jest.fn((action) => {
           if (action.type === createEmployee.type) {
             store.getState().employeeSlice.employees = action.payload
           }
         })
     
         render ( <React.StrictMode><Provider store={store}><MemoryRouter><EmployeeCreate/></MemoryRouter></Provider></React.StrictMode>)
     
         fireEvent.change(screen.getByLabelText('First Name'), { target: { value: 'Mickael' } })
         fireEvent.change(screen.getByLabelText('Last Name'), { target: { value: 'Jackson' } })
         fireEvent.change(screen.getByLabelText('Street'), { target: { value: 'BelAir' } })
         fireEvent.change(screen.getByLabelText('City'), { target: { value: 'Paris' } })
         fireEvent.change(screen.getByLabelText('Zip Code'), { target: { value: '75000' } })
     
        // DropDown Component
         const dropdownDepartment = screen.getByText('Engineering')
         fireEvent.click(dropdownDepartment)
         expect(screen.getByTestId('option-Engineering')).toHaveTextContent('Engineering')
         const dropdownState = screen.getByText('Alabama')
         fireEvent.click(dropdownState)
         expect(screen.getByTestId('option-Alabama')).toHaveTextContent('Alabama')
     
         // DatePicker Component
           const today = new Date();
           const day = String(today.getDate()).padStart(2, '0')
           const month = String(today.getMonth() + 1).padStart(2, '0')
           const year = today.getFullYear()
           const currentDate = `${day}/${month}/${year}`
     
           const dateInputs = screen.getAllByPlaceholderText('jj / mm / aaaa')
           // Date of Birth
           const datePickerDateOfBirth = dateInputs[0]
           fireEvent.click(datePickerDateOfBirth)
           fireEvent.keyDown(datePickerDateOfBirth,  { key: 'enter', keyCode: 13 })
           expect(datePickerDateOfBirth.value).toBe(currentDate)
           // Start Date
           const datePickerStartDate = dateInputs[1]
           fireEvent.click(datePickerStartDate)
           fireEvent.keyDown(datePickerStartDate,  { key: 'enter', keyCode: 13 })
           expect(datePickerStartDate.value).toBe(currentDate)
     
        //Soumission du formulaire
           fireEvent.submit(screen.getByTestId('create-employee'))
        await waitFor(() => {
            expect(screen.getByText('Employee Created!')).toBeInTheDocument()
          })
          await waitFor(() => {
            const updatedState = store.getState().employeeSlice.employees
            // Testing if number of keys more than 0, so not empty
            expect(Object.keys(updatedState).length).toBeGreaterThan(0)
          })


    })
})