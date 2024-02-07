// Selector to access the table of all employees
export const selectEmployees = (state) => state.employeeSlice.employees

// Selector to have the total number of employees
export const selectTotalEmployees = (state) => selectEmployees(state).length