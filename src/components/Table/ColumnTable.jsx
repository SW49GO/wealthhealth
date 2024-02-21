import { changeColumnIndex, saveSearch } from '../../features/store'
import { sortingEmployees } from '../../utils/sortingEmployees'
import Styles from '../../styles/tableReact.module.css'
import { FaCaretUp, FaCaretDown } from 'react-icons/fa'
import { useDispatch} from 'react-redux'
import { useState } from 'react'
import PropTypes from 'prop-types'

function ColumnTable({ dataColumns, dataRows, widthColumn}) {
  const dispatch = useDispatch()

  // Status array for each column initializing to null
  const [isChoice, setIsChoice] = useState(new Array(dataColumns.length).fill(null))

  /**
   * Function to initialize functions and states when clicked on column
   * @param {number} index (the column clicked)
   */
  const toggleIcon = (index) => {
    dispatch(changeColumnIndex(index))

    // Upgrade [isChoice] for the clicked column
    setIsChoice((prevChoices) =>
      prevChoices.map((prevChoice, i) =>
        i === index ? (prevChoice === null ? true : !prevChoice) : false
      )
    )
    // Upgrade [isChoice] for the others columns
    setIsChoice((prevChoices) =>
      prevChoices.map((prevChoice, i) =>
        i !== index ? null : prevChoice
      )
    )
    // Call function with column index 
     functionExecuted(index)
  }


  /**
   * Function to load the function to sort datas
   * @param {number} index 
   */
  const functionExecuted = (index) => {

    if (isChoice[index]===null || isChoice[index]===false) {
      handleClickUp(index)
    } else {
      handleClickDown(index)
    }
  }

  // Array ti received datas after sorting
  let newData=[]

  const handleClickUp = (index) => {
    newData = sortingEmployees(dataRows, index, 'asc')
    dispatch(saveSearch(newData))
  }

  const handleClickDown = (index) => {
    newData = sortingEmployees(dataRows, index, 'desc')
    dispatch(saveSearch(newData))
  }

  return (
    <>
      <tr>
        {dataColumns &&
          dataColumns.map((item, index) => (
            <th className={Styles.thColumn} style={{width: widthColumn,}} key={index} onClick={() => toggleIcon(index)}>
              <div className={Styles.tdColumn}>
                <span>{item}</span>
                <div className={Styles.iconColumn}>
                  <FaCaretUp style={{ opacity: isChoice[index] === null ? 0.3 : isChoice[index] ? 1 : 0.3 }} />
                  <FaCaretDown style={{ opacity: isChoice[index] === null ? 0.3 : isChoice[index] ? 0.3 : 1 }} />
                </div>
              </div>
            </th>
          ))}
      </tr>
    </>
  )
}

ColumnTable.propTypes = {
  dataColumns: PropTypes.array,
  dataRows: PropTypes.array,
  widthColumn: PropTypes.string
  }
export default ColumnTable
