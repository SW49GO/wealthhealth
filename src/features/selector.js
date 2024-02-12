// Sélecteur pour accéder au tableau de tout les employés
export const selectEmployees = (state) => state.employeeSlice.employees

// Sélecteur pour avoir le nombre total d'employés
export const selectTotalEmployees = (state) => selectEmployees(state).length

// Sélecteur pour un employé via l'index
export const selectEmployeeByIndex = (index) => (state) => {
  const employees = selectEmployees(state);
  return employees[index]
}

// Sélécteur pour récupérer le tableau d'index correspondant à la recherche
export const selectSearch = (state)=>state.searchSlice.results
export const selectTotalSearch = (state)=>selectSearch(state).length

export const selectColumn = (state)=>state.otherSlice.columnIndex
export const selectEntries = (state)=>state.otherSlice.nbEntries