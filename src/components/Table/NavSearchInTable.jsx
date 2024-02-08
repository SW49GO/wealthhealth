import React, { useState } from 'react'
import {entries} from '../../datas/entries'
import { useDispatch, useSelector } from 'react-redux'
import { changeNbEntries,  saveSearch  } from '../../features/store'
import { selectEntries,selectEmployees, selectColumn } from '../../features/selector'

function NavSearchInTable(){
    const dispatch = useDispatch()
    /////////////NB ENTRIES////////////
    const entriesSelected = useSelector(selectEntries)
    const [selectedEntries, setSelectedEntries] = useState(entriesSelected)

    const handleSelectChange = (event) => {
        const newValue = event.target.value
        setSelectedEntries(newValue)
        dispatch(changeNbEntries(newValue))
    }
    ////////////////////////////////////
    ///////////INPUT SEARCH/////////////
     // Tableau des employés
     const allEmployees = useSelector(selectEmployees)
     const filterColumn = useSelector(selectColumn)
     // Définition de la colonne de recherche
     const searchItem = Object.keys(allEmployees[0])[filterColumn]
 
     const handleInputChange=(e)=>{
         const inputSearch = e.target.value.toLowerCase()
         const result = allEmployees.filter((item)=> item[searchItem].toLowerCase().startsWith(inputSearch))
         dispatch(saveSearch(result))
     }

    return (
        <>
         <div className="employee-menus">
            <div>
                <span>Show </span>
                <select name="selectNbEntries" value={selectedEntries} onChange={handleSelectChange}>
                    {entries.map((item,index)=>(
                    <option key={index} >{item.name}</option>
                    ))}
                </select>
                <span> entries</span>
            </div>
            <div>
            Search: <input type="search" name="search"  onChange={handleInputChange}/>
            </div>
        </div>
        </>
    )
}
export default NavSearchInTable