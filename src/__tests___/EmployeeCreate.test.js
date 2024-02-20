import React from 'react'
import { render , screen, fireEvent, waitFor} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
// import { Router } from '../components/Router'
// import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from '../features/store'
import { Provider } from 'react-redux'
// import { configureStore } from '@reduxjs/toolkit'
import EmployeeCreate from '../pages/EmployeeCreate'
// import EmployeeList from '../pages/EmployeeList'
import { MemoryRouter, Routes, Route} from 'react-router-dom'
 import { unmountComponentAtNode } from 'react-dom'
// import { useSelector} from 'react-redux'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Error from '../pages/Error'
import Router from '../components/Router'
// import { PersistGate } from 'redux-persist/lib/integration/react'
// import EmployeeList from '../pages/EmployeeList'
// import {persistedEmployeeSlice,searchSlice,otherSlice } from '../features/store'
// import configureMockStore from 'redux-mock-store'
// const mockStore = configureMockStore();
// const store = mockStore({});
// function renderWithProviders(
//    ui,
//    {
//      preloadedState = {},
//      // Automatically create a store instance if no store was passed in
//      store = configureStore({ reducer: { employeeSlice: persistedEmployeeSlice, 
//       searchSlice: searchSlice ? searchSlice.reducer :(state = { results: [] }) => state, 
//       otherSlice: otherSlice ? otherSlice.reducer : (state = { columnIndex: 0, nbEntries: 5 }) => state }, preloadedState }),
//      ...renderOptions
//    } = {}
//  ) {
//    const Wrapper = ({ children }) => {
//      return <Provider store={store}>{children}</Provider>
//    }
 
//    // Return an object with the store and all of RTL's query functions
//    return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
//  }
// const AllTheProviders = ({ children }) => {
//   // console.log("Children:", children);
//   return (
//     <Provider store={store}>
//       {children && React.Children.map(children, child => {
//         return React.cloneElement(child);
//       })}
//     </Provider>
//   )
// }

// const customRender = (ui, options) =>
//   render(ui, {wrapper: AllTheProviders, ...options})
// //Mock du useDispatch
jest.mock('react-redux', () => ({
useDispatch: jest.fn(),
}))
// Mock store
// const mockStore = configureMockStore([])
//Mock Selector
// const mockSelector = jest.fn()
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

//   test('form submission', async () => {
//    // State of Store
//    const state = store.getState()
//    render (<MemoryRouter><EmployeeCreate/></MemoryRouter>)

//     fireEvent.change(screen.getByLabelText('First Name'), { target: { value: 'Mickael' } })
//     fireEvent.change(screen.getByLabelText('Last Name'), { target: { value: 'Jackson' } })
//     fireEvent.change(screen.getByLabelText('Street'), { target: { value: 'BelAir' } })
//     fireEvent.change(screen.getByLabelText('City'), { target: { value: 'Paris' } })
//     fireEvent.change(screen.getByLabelText('Zip Code'), { target: { value: '75000' } })

//    // DropDown Component
//     const dropdownDepartment = screen.getByText('Engineering')
//     fireEvent.click(dropdownDepartment)
//     expect(screen.getByTestId('option-Engineering')).toHaveTextContent('Engineering')
//     const dropdownState = screen.getByText('Alabama')
//     fireEvent.click(dropdownState)
//     expect(screen.getByTestId('option-Alabama')).toHaveTextContent('Alabama')

//     // DatePicker Component
//       const today = new Date();
//       const day = String(today.getDate()).padStart(2, '0')
//       const month = String(today.getMonth() + 1).padStart(2, '0')
//       const year = today.getFullYear()
//       const currentDate = `${day}/${month}/${year}`

//       const dateInputs = screen.getAllByPlaceholderText('jj / mm / aaaa')
//       // Date of Birth
//       const datePickerDateOfBirth = dateInputs[0]
//       fireEvent.click(datePickerDateOfBirth)
//       fireEvent.keyDown(datePickerDateOfBirth,  { key: 'enter', keyCode: 13 })
//       expect(datePickerDateOfBirth.value).toBe(currentDate)
//       // Start Date
//       const datePickerStartDate = dateInputs[1]
//       fireEvent.click(datePickerStartDate)
//       fireEvent.keyDown(datePickerStartDate,  { key: 'enter', keyCode: 13 })
//       expect(datePickerStartDate.value).toBe(currentDate)

//    //Soumission du formulaire
//       fireEvent.submit(screen.getByTestId('create-employee'))
//       // expect(state.employeeSlice.employees).toHaveLength(5)
//       // await waitFor(() => {
//       //    const expectedAction = { type: 'createEmployee', payload: { firstName: 'Mickael', lastName: 'Jackson', street:'BelAir', city:'Paris', zipCode:'75000', dateOfBirth:'16/02/2024' } };
//       //    expect(store.getActions()).toContainEqual(expectedAction);
//       //  })
//     })

  //  test('Error link go to home page',async () => {
  //     render(<MemoryRouter initialEntries={['/unknown']}><Error/></MemoryRouter>,container)
  //     const homeLink = screen.getByText('Home')
  //     expect(homeLink).toBeInTheDocument()
  //     fireEvent.click(homeLink)
  //     expect(window.location.pathname).toBe('/')
  //  })
   
   test('header',async ()=>{
      render(<Header/>,container)
      expect(screen.getByTestId('header')).toBeInTheDocument()
   })
   test('footer',async ()=>{
      render(<Footer/>,container)
      expect(screen.getByText('Wealth Health')).toBeInTheDocument()
   })
})
