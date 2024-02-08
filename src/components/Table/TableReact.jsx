import ColumnTable from "./ColumnTable"
import RowTable from "./RowTable"
import PropTypes from 'prop-types'
import NavSearchInTable from "./NavSearchInTable"
import React, { useState, useEffect } from 'react'
import {useSelector } from 'react-redux'
import { selectEntries, selectTotalEmployees, selectTotalSearch} from '../../features/selector'
import NavPagingTable from "./NavPagingTable"


function TableReact({dataColumns, dataRows}){

//////////////////////PAGINATION/////////////////////////////
    let totalEntries = useSelector(selectTotalEmployees)
    const totalSearch = useSelector(selectTotalSearch)
    const nbEntries = useSelector(selectEntries)
  
    if (totalSearch>0){
      totalEntries=totalSearch
    }
  
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
  
    // Mise à jour du nombre total de pages chaque fois que les données changent
    useEffect(() => {
      setTotalPages(Math.ceil(dataRows.length / (nbEntries)))
      setCurrentPage(1)
    }, [dataRows, nbEntries])
  
    // Récupération des données pour la page en cours
    const getCurrentPageData = () => {
      const startIndex = parseInt(currentPage - 1) * parseInt(nbEntries)
      // console.log('startIndex:', startIndex)
      const endIndex = parseInt(startIndex) + parseInt(nbEntries)
      // console.log('endIndex:', endIndex)
      // Découpage des données
      return dataRows.slice(startIndex, endIndex)
    }
///////////////////////////////////////////////////////////////////////////


if(dataColumns.length === Object.keys(dataRows[0]).length){
    return(<>
        <NavSearchInTable/>
        <table>
            <thead>
                {dataColumns.length>0 &&<ColumnTable dataColumns={dataColumns} dataRows={dataRows} backgroundRow={'234, 234, 234'}/>}
            </thead>
            <tbody>
                <RowTable data={dataRows} backgroundRow={'234, 234, 234'} getCurrentPageData={getCurrentPageData}/>
            </tbody>
            <tfoot></tfoot>
        </table>
        <NavPagingTable currentPage={currentPage} totalPages={totalPages} nbEntries={nbEntries} totalEntries={totalEntries} setCurrentPage={setCurrentPage}/>
    </>)
}

}

TableReact.propTypes = {
    dataColumns: PropTypes.array.isRequired,
    dataRows:PropTypes.array.isRequired
  }
export default TableReact