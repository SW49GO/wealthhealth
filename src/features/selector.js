// Selector to access the array of all employees
export const selectEmployees = (state) => state.employeeSlice.employees

// Selector to have the total number of employees
export const selectTotalEmployees = (state) => selectEmployees(state).length

// Selector to retrieve the array corresponding to the search
export const selectSearch = (state)=>state.searchSlice.results
export const selectTotalSearch = (state)=>selectSearch(state).length

// Selector to know which column is selected
export const selectColumn = (state)=>state.otherSlice.columnIndex

// Selector to know the number of entries for the list of employees table
export const selectEntries = (state)=>state.otherSlice.nbEntries