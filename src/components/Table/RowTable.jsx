import Styles from '../../styles/tableReact.module.css'
import { selectColumn, selectEmployees} from '../../features/selector'
import {useDispatch, useSelector } from 'react-redux'
import {removeEmployee} from '../../features/store'
import PropTypes from 'prop-types'
import { useState } from 'react'
import { states } from '../../datas/states'

function RowTable({backgroundRow, getCurrentPageData, widthColumn }) {
  const indexColumn = useSelector(selectColumn)

  //To remove a line of data employee, turn removeEntrieEmployee to 'true' (for Dev)
  const removeEntrieEmployee = false
  
  const dispatch = useDispatch()
  const employees = useSelector(selectEmployees)
  // State to show datas of one employee on media Mobile
  const [showData, setShowData]= useState(null)

  /**
   * Function to allow delete an employee for Dev
   * or function to show Employee informations under media querie <=768px
   * @param {number} index 
   * @param {*} event 
   */
  const handleClickRow=(index, event)=>{
    if(removeEntrieEmployee){
      const copyEmployee = [...employees]
      copyEmployee.splice(index,1)
      dispatch(removeEmployee(copyEmployee))
    }else{
      const screenWidth = window.innerWidth
      if (screenWidth <= 768) {
        setShowData(index)
        if (event) {
          event.stopPropagation()
        }
      }
    }
  }


  return (
    <>
      {getCurrentPageData().map((item, index) => (
        <tr
          key={index}
          className={Styles.show}
          style={{
            backgroundColor: index % 2 === 0 ? `rgba(${backgroundRow}, 0.4)` : `rgba(${backgroundRow}, 0.2)`,
            borderTop: index ===0 && '1px solid #000',  borderBottom: index === getCurrentPageData().length - 1 && '1px solid #000'
          }}
          onMouseOver={(event) => {
            event.target.parentElement.style.backgroundColor = `rgba(${backgroundRow}, 1)`
          }}
          onMouseOut={(event) => {
            event.target.parentElement.style.backgroundColor = index % 2 === 0 ? `rgba(${backgroundRow}, 0.4)` : `rgba(${backgroundRow}, 0.2)`
          }}
          onClick={()=>{handleClickRow(index)}}
        >
          {Object.keys(item).map((key, tdIndex) => (
            <td className={Styles.tdRow}
              key={key}
              style={{
                width: widthColumn,
                backgroundColor:
                  indexColumn === tdIndex ? (index % 2 === 0 ? `rgba(${backgroundRow}, 1)` : `rgba(${backgroundRow}, 0.4)`) : 'inherit'
              }}
            >
              {item[key]}
            </td>
          ))}
           {showData === index && (
          <td colSpan={Object.keys(item).length} >
            <div className={Styles.infosEmployee}>
              <p className={Styles.closeInfosEmployee}  onClick={(event) => {event.stopPropagation(); setShowData(null)}}>X</p>
              <p>Employee : {item.firstName} {item.lastName}</p>
              <p>Dates : S:{item.startDate} B:{item.dateOfBirth}</p>
              <p>Department: {item.department}</p>
              <p>Adresses: {item.street} </p>
              <p>&emsp;&emsp; {item.zipCode} {item.city}</p>
              <p>State: {states.find(state => state.abbreviation === item.states)?.name} </p>
            </div>
          </td>
        )}
        </tr>
      ))}
    </>
  )
}

RowTable.propTypes = {
  getCurrentPageData: PropTypes.func.isRequired,
  widthColumn: PropTypes.string,
  backgroundRow: PropTypes.string
  }

export default RowTable