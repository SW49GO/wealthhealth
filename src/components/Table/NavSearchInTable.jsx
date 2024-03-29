import React, { useState } from 'react'
import { selectEntries,selectEmployees, selectColumn } from '../../features/selector'
import { changeNbEntries,  saveSearch  } from '../../features/store'
import Styles from '../../styles/tableReact.module.css'
import { useDispatch, useSelector } from 'react-redux'
import {entries} from '../../datas/entries'


function NavSearchInTable(){
    const dispatch = useDispatch()
// For the number of entries
    const entriesSelected = useSelector(selectEntries)
    const [selectedEntries, setSelectedEntries] = useState(entriesSelected)

    const handleSelectChangeEntries = (event) => {
        const newValue = event.target.value
        setSelectedEntries(newValue)
        dispatch(changeNbEntries(newValue))
    }
// For the Input Search
     // Employees array
     const allEmployees = useSelector(selectEmployees)
     const filterColumn = useSelector(selectColumn)
     // Definition of the search column
     const searchItem = Object.keys(allEmployees[0])[filterColumn]
     
 /**
  * Function to search word in the column selected
  * @param {object} e 
  */
     const handleInputChange=(e)=>{
         const inputSearch = e.target.value.toLowerCase()
         const result = allEmployees.filter((item)=> item[searchItem].toLowerCase().startsWith(inputSearch))
         // Store the result
         dispatch(saveSearch(result))
     }

    return (
        <>
         <div className={Styles.employeeSearch}>
            <div>
                <span>Show </span>
                <select aria-label="Show entries" name="selectNbEntries" value={selectedEntries} onChange={handleSelectChangeEntries} data-testid="selectNbEntries">
                    {entries.map((item,index)=>(
                    <option key={index} >{item.name}</option>
                    ))}
                </select>
                <span> entries</span>
            </div>
            <div>
                    <label htmlFor="inputSearch" className="sr-only">Champ de recherche d'un employée</label>
            Search: <input id="inputSearch" type="search" name="search"  onChange={handleInputChange} data-testid="inputSearch"/>
            </div>
        </div>
        </>
    )
}
export default NavSearchInTable