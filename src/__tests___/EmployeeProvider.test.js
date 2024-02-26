import React from 'react'
import { render, screen, fireEvent} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import {saveSearch, store, changeNbEntries} from '../features/store'
import { Provider } from 'react-redux'
import EmployeeCreate from '../pages/EmployeeCreate'
import Router from '../components/Router'
import Error from '../pages/Error'
import EmployeeList from '../pages/EmployeeList'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import NavPagingTable from '../components/Table/NavPagingTable'
import ColumnTable from '../components/Table/ColumnTable'
import * as sortingEmployeesModules  from '../utils/sortingEmployees'
import NavSearchInTable from '../components/Table/NavSearchInTable'
import configureStore  from 'redux-mock-store'

const mockStore = configureStore([])


const AllTheProviders = ({ children }) => {
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

  test('Render ColumnTable',()=>{
    const mockSortingEmployees = jest.fn()
    jest.spyOn(sortingEmployeesModules, 'sortingEmployees').mockImplementation(mockSortingEmployees)
    const columns=['Name','Age','Adresses']
    const dataRows = [{ Name: 'Sonia', Age: 54, Adresses: 'Somewhere over the rainbow' }];
    const sortedDataRows = [{ Name: 'Sonia', Age: 54, Adresses: 'Somewhere over the rainbow'}]
    mockSortingEmployees.mockReturnValue(sortedDataRows)

    customRender(<MemoryRouter><ColumnTable dataColumns={columns} dataRows={dataRows}/></MemoryRouter>)
    
    expect (screen.getByText('Adresses')).toBeInTheDocument()
    expect(screen.getAllByRole('columnheader')).toHaveLength(columns.length)
    fireEvent.click(screen.getByText('Name'))
    expect(mockSortingEmployees).toHaveBeenCalled()
  })

  test('Render NavSearchInTable', async()=>{
    const initialState = {
      employeeSlice:{
        employees: [{firstName: 'Albert'},{firstName: 'Robert'}]
      } ,
      otherSlice: {
        columnIndex:0,
        nbEntries: 5
      },
      searchSlice:{
        results:[]
      }
    }
    const store = mockStore(initialState)

    store.dispatch = jest.fn((action) => {
      if (action.type === saveSearch.type) {
        store.getState().searchSlice.results = action.payload
      }
      if (action.type === changeNbEntries.type){
        store.getState().otherSlice.nbEntries = action.payload      }    
    })
    render (<Provider store={store}><MemoryRouter><NavSearchInTable/></MemoryRouter></Provider>)

    expect(screen.getByTestId('inputSearch')).toBeInTheDocument()
    fireEvent.change(screen.getByTestId('inputSearch'), { target: { value: 'a' } })
    expect(store.dispatch).toHaveBeenCalledWith(saveSearch([{firstName: 'Albert'}]))
    const updatedState = store.getState()
    expect(updatedState.searchSlice.results).toHaveLength(1)

    expect(screen.getByTestId('selectNbEntries')).toBeInTheDocument()
    fireEvent.change(screen.getByTestId('selectNbEntries'), { target: { value: '10' } })
    expect(store.dispatch).toHaveBeenCalledWith(changeNbEntries('10'))
    })

  test('Render NavPagingInTable', ()=>{
    const mockSetCurrentPage = jest.fn()
    customRender(<MemoryRouter><NavPagingTable currentPage={1} totalPages={5} nbEntries={10} totalEntries={50} setCurrentPage={() => { mockSetCurrentPage() } }/></MemoryRouter>)
      expect(screen.getByText('Showing 1 to 10 of 50')).toBeInTheDocument()
      expect(screen.getByText('1')).toBeInTheDocument()
      fireEvent.click(screen.getByText('Next'))
      expect(mockSetCurrentPage).toHaveBeenCalled()
  })

  test('EmployeeList link go to home page',() => {
    customRender(<Router><EmployeeList/></Router>)
    expect (screen.getByText('Current Employees')).toBeInTheDocument()
    expect (screen.getByText('Home')).toBeInTheDocument()
    fireEvent.click(screen.getByText('Home'))
    expect(screen.getByText('View Current Employees')).toBeInTheDocument()
    expect(window.location.pathname).toBe('/')
  })

  test('Router test Routes Error',()=>{
   customRender(
    <MemoryRouter initialEntries={['/unknown']}>
      <Routes>
        <Route path="/" element={<EmployeeCreate />} />
        <Route path="/Employee" element={<EmployeeList />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </MemoryRouter>
    )
    expect(screen.getByText('Une erreur est survenue...')).toBeInTheDocument()
  })
})

describe('Error component',()=>{
  test('Error link go to home page',() => {
    customRender(<MemoryRouter><Error/></MemoryRouter>)
    expect(screen.getByText('Une erreur est survenue...')).toBeInTheDocument()
    expect(screen.getByText('Home')).toBeInTheDocument()
    fireEvent.click(screen.getByText('Home'))
    expect(window.location.pathname).toBe('/')
  })
})