import React from 'react'
import { render, screen, fireEvent, waitFor} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { store,} from '../features/store'
import { Provider } from 'react-redux'
import EmployeeCreate from '../pages/EmployeeCreate'
import Router from '../components/Router'
import Error from '../pages/Error'
import Footer from '../components/Footer'
import EmployeeList from '../pages/EmployeeList'
import { MemoryRouter } from 'react-router-dom'
import NavPagingTable from '../components/Table/NavPagingTable'
import TableReact from '../components/Table/TableReact'
import employeesData from '../datas/employeesData'
const columns = ['First Name','Last Name', 'Start Date','Date of Birth', 'Department','Street','City','State','Zip Code']


const AllTheProviders = ({ children }) => {
    // console.log("Children:", children);
    return (
      <Provider store={store}>
        {children && React.Children.map(children, child => {
          return React.cloneElement(child);
        })}
      </Provider>
    )
 }
  
  const customRender = (ui, options) =>
    render(ui, {wrapper: AllTheProviders, ...options})

describe('EmployeeCreate component', () => {
  test('render EmployeeList when clicked link',async ()=>{
    customRender(<Router><EmployeeCreate/></Router>)
    const employeeCreateLink = screen.getByText('View Current Employees')
    expect(employeeCreateLink).toBeInTheDocument()
    fireEvent.click(employeeCreateLink)
    expect(screen.getByText('Current Employees')).toBeInTheDocument()
    expect(window.location.pathname).toBe('/Employee')
  })
})

describe('EmployeeList component',()=>{
  test('Render EmployeeList', ()=>{
    customRender(<Router><EmployeeList/></Router>)
    expect (screen.getByText('First Name')).toBeInTheDocument()
    expect (screen.getByText('Zip Code')).toBeInTheDocument()
    expect (screen.getByText('Show')).toBeInTheDocument()
    expect (screen.getByText('entries')).toBeInTheDocument()
    expect (screen.getByText('Search:')).toBeInTheDocument()
    expect (screen.getByText('Next')).toBeInTheDocument()
  })
  test('Render NavPagingInTable', ()=>{
    const mockSetCurrentPage = jest.fn()
    customRender(<MemoryRouter><NavPagingTable currentPage={1} totalPages={5} nbEntries={10} totalEntries={50} setCurrentPage={() => { mockSetCurrentPage() } }/></MemoryRouter>)
      expect(screen.getByText('Showing 1 to 10 of 50')).toBeInTheDocument()
      expect(screen.getByText('1')).toBeInTheDocument()
      fireEvent.click(screen.getByText('Next'))
      expect(mockSetCurrentPage).toHaveBeenCalled()
  })

  test('EmployeeList link go to home page',async () => {
    customRender(<Router><EmployeeList/></Router>)
    expect (screen.getByText('Current Employees')).toBeInTheDocument()
    expect (screen.getByText('Home')).toBeInTheDocument()
    fireEvent.click(screen.getByText('Home'))
    expect(screen.getByText('View Current Employees')).toBeInTheDocument()
    expect(window.location.pathname).toBe('/')
  })
})

describe('Error component',()=>{
  test('Error link go to home page',async () => {
    // customRender(<Router><EmployeeList/></Router>)
    customRender(<MemoryRouter initialEntries={['/unknown']}><Error/></MemoryRouter>)
    expect(screen.getByText('Une erreur est survenue...')).toBeInTheDocument()
    expect(screen.getByText('Home')).toBeInTheDocument()
    fireEvent.click(screen.getByText('Home'))
    expect(window.location.pathname).toBe('/')
  })
})