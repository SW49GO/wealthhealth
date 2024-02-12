import Styles from '../../styles/tableReact.module.css'
import { selectColumn, selectEmployees} from '../../features/selector'
import {useDispatch, useSelector } from 'react-redux'
import {removeEmployee} from '../../features/store'
import PropTypes from 'prop-types'

function RowTable({backgroundRow, getCurrentPageData, widthColumn }) {
  const indexColumn = useSelector(selectColumn)

  //To remove a line of data employee, turn removeEntrieEmployee to 'true'
  const removeEntrieEmployee = false
  const dispatch = useDispatch()
  const employees = useSelector(selectEmployees)
  const handleClickRow=(index)=>{
    if(removeEntrieEmployee){
      const copyEmployee = [...employees]
      copyEmployee.splice(index,1)
      dispatch(removeEmployee(copyEmployee))
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