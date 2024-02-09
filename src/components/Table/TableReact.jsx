import { selectEntries, selectTotalEmployees, selectTotalSearch} from '../../features/selector'
import Styles from '../../styles/tableReact.module.css'
import React, { useState, useEffect } from 'react'
import NavSearchInTable from "./NavSearchInTable"
import NavPagingTable from "./NavPagingTable"
import {useSelector } from 'react-redux'
import ColumnTable from "./ColumnTable"
import RowTable from "./RowTable"
import PropTypes from 'prop-types'

function TableReact({dataColumns, dataRows}){
  // Taille des colonnnes
  // const widthColumn = 100 / (dataColumns.length) + 'vw'
  // Pagination
    let totalEntries = useSelector(selectTotalEmployees)
    const totalSearch = useSelector(selectTotalSearch)
    const nbEntries = useSelector(selectEntries)
  
    if (totalSearch>0){
      totalEntries=totalSearch
    }
  
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
  
    // Updating the total number of pages every time the data changes
    useEffect(() => {
      setTotalPages(Math.ceil(dataRows.length / (nbEntries)))
      setCurrentPage(1)
    }, [dataRows, nbEntries])
  
    // Retrieving data for the current page
    const getCurrentPageData = () => {
      const startIndex = parseInt(currentPage - 1) * parseInt(nbEntries)
      // console.log('startIndex:', startIndex)
      const endIndex = parseInt(startIndex) + parseInt(nbEntries)
      // console.log('endIndex:', endIndex)
      // Breaking down the data table
      return dataRows.slice(startIndex, endIndex)
    }



if(dataColumns.length === Object.keys(dataRows[0]).length){
    return(<>
        <NavSearchInTable/>
        <table className={Styles.containerTable}>
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