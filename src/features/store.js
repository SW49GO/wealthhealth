import { createSlice, configureStore} from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

// Configuration telling Redux Persist to store Redux store data under the 'root' key in the specified web storage (default localStorage)
const persistConfig = {
    key: 'root',
    storage
}
const employeeSlice = createSlice({
    name: 'employeeSlice',
    initialState: {
      employees: []
    },
    reducers: {
      createEmployee: (state, action) => {
        const {firstName, lastName, dateOfBirth, startDate, department, street, city, states, zipCode,} = action.payload
        // Add employee to array
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
      }
    }
})

// Definition of the slice that must persist
const persistedEmployeeSlice = persistReducer(persistConfig, employeeSlice.reducer)
// Export actions from the slice
export const {createEmployee} = employeeSlice.actions

// Store configuration
export const store = configureStore({
    reducer : {
      employeeSlice : persistedEmployeeSlice
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
