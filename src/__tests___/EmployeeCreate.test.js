import React from 'react'
import { render , screen, fireEvent} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import EmployeeCreate from '../pages/EmployeeCreate'
import { MemoryRouter} from 'react-router-dom'
 import { unmountComponentAtNode } from 'react-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'

jest.mock('react-redux', () => ({
useDispatch: jest.fn(),
useSelector: jest.fn(),
}))

// Simuler scrollTo
window.HTMLElement.prototype.scrollTo = function() {}


describe('EmployeeCreate component', () => {
   let container = null
   beforeEach(() => {
   container = document.createElement("div")
   document.body.appendChild(container)
   })

   afterEach(() => {
   unmountComponentAtNode(container)
   container.remove()
   container = null
   })

  test('renders form fields',async () => {
    render ( <MemoryRouter><EmployeeCreate/></MemoryRouter>, container)
    expect(screen.getByLabelText('First Name')).toBeInTheDocument()
    expect(screen.getByLabelText('Last Name')).toBeInTheDocument()
    expect(screen.getByLabelText('Street')).toBeInTheDocument()
    expect(screen.getByLabelText('City')).toBeInTheDocument()
    expect(screen.getByLabelText('Zip Code')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Save' })).toBeInTheDocument()
  })

  test('DropDown render selected option',async ()=>{
      render (<MemoryRouter><EmployeeCreate/></MemoryRouter>, container)
      // Department
      const dropdownDepartment = screen.getByText('Engineering')
      fireEvent.click(dropdownDepartment)
      expect(screen.getByTestId('option-Engineering')).toHaveTextContent('Engineering')
      // States
      const dropdownState = screen.getByText('Alabama')
      fireEvent.click(dropdownState)
      expect(screen.getByTestId('option-Alabama')).toHaveTextContent('Alabama')
  })
  
  test('DatePicker render selected Date',async ()=>{
      render (<MemoryRouter><EmployeeCreate/></MemoryRouter>, container)
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
   })
  test('header',async ()=>{
   render(<Header/>,container)
   expect(screen.getByTestId('header')).toBeInTheDocument()
   })
   test('footer',async ()=>{
      render(<Footer/>,container)
      expect(screen.getByText('Wealth Health')).toBeInTheDocument()
   })

 })
