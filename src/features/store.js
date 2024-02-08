import { createSlice, configureStore} from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import employeesData from '../datas/employeesData'

// Configuration telling Redux Persist to store Redux store data under the 'root' key in the specified web storage (default localStorage)
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['employees']
}

const employeeSlice = createSlice({
    name: 'employeeSlice',
    initialState: {
      employees: [],
      listEmployeesAdd: [],
      newEmployeeIndex: null
    },
    reducers: {
      createEmployee: (state, action) => {
        const {firstName, lastName, dateOfBirth, startDate, department, street, city, states, zipCode,} = action.payload
        // Ajoute l'employé au tableau de base
        state.employees.push({
          firstName: firstName || '',
          lastName: lastName || '',
          dateOfBirth: dateOfBirth || '',
          startDate: startDate || '',
          department: department || '',
          street: street || '',
          city: city || '',
          states: states || '',
          zipCode: zipCode || ''
        })
      },
      saveListEmployees: (state,action)=>{
        state.listEmployeesAdd = action.payload
      },
      addEmployeeToList: (state, action) => {
        state.listEmployeesAdd.push(action.payload)
        state.newEmployeeIndex = state.employees.length - 1
      },
      clearNewEmployeeIndex: (state) => {
        state.newEmployeeIndex = null
      },
      initializeEmployees: (state) => {
        // Vérifiez si le tableau employees est vide
        if (state.employees.length === 0) {
          employeesData.forEach((employee) => {
            state.employees.push(employee);
          });
        }
      }

    }
  })

const searchSlice = createSlice({
  name: 'searchSlice',
  initialState: {
    results: []
  },
  reducers: {
    saveSearch: (state,action)=>{
      state.results = action.payload
    }
  }
})

const otherSlice = createSlice({
  name: 'otherSlice',
  initialState:{
    columnIndex:0,
    nbEntries:5
  },
  reducers: {
    changeColumnIndex: (state,action)=>{
      state.columnIndex = action.payload
    },
    changeNbEntries:(state,action)=>{
      state.nbEntries = action.payload
    }
  }
})



// Definition of the slice that must persist
const persistedEmployeeSlice = persistReducer(persistConfig, employeeSlice.reducer)

// Export actions from the slice
export const {createEmployee, addEmployeeToList, clearNewEmployeeIndex, saveListEmployees, initializeEmployees} = employeeSlice.actions
export const {saveSearch} = searchSlice.actions
export const {changeColumnIndex, changeNbEntries} = otherSlice.actions

// Store configuration
export const store = configureStore({
    reducer : {
      employeeSlice : persistedEmployeeSlice,
      searchSlice : searchSlice.reducer,
     otherSlice: otherSlice.reducer
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        // Excludes the "persist/PERSIST" action from the serialization check, action is special and managed internally by Redux Persist during the persisted data recovery process
        serializableCheck: {
          ignoredActions: ['persist/PERSIST'],
        },
      })
})
// persist store
export const persistor = persistStore(store)
// Verif et initialisation des employees
store.dispatch(initializeEmployees())