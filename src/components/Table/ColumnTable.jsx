import { changeColumnIndex, saveSearch } from '../../features/store'
import { sortingEmployees } from '../../utils/sortingEmployees'
import Styles from '../../styles/tableReact.module.css'
import { FaCaretUp, FaCaretDown } from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import { useState } from 'react'


function ColumnTable({ dataColumns, dataRows, widthColumn}) {
  const dispatch = useDispatch()

  // Status array for each column initializing to null
  const [isChoice, setIsChoice] = useState(new Array(dataColumns.length).fill(null))
  // Managing the current column
  const [clickedIndex, setClickedIndex] = useState(null)
  // Count 0-1 for toggle function
  const [clickCount, setClickCount] = useState(0)

  /**
   * Function to initialize functions and states when clicked sort icons
   * @param {number} index (the column clicked)
   */
  const toggleIcon = (index) => {
    if (clickedIndex !== index) {
      setClickCount(1)
      // In the same column the 2nd click passed to false
      setIsChoice((prevChoices) =>
        prevChoices.map((i) => (i === index ? false : null))
      )
      // Updating the index of the selected column
      setClickedIndex(index)
      // Alternates between 0 and 1 to start the corresponding function
      setClickCount((prevCount) => (prevCount + 1) % 2)
    }
    // Alternates between true et false
    setIsChoice((prevChoices) =>
      prevChoices.map((prevChoice, i) => (i === index ? !prevChoice : prevChoice))
    )
    // Alternates between 0 and 1 to start the corresponding function
    setClickCount((prevCount) => (prevCount + 1) % 2)
    functionExecuted(index)
  }

  /**
   * Function to load the function to sort datas
   * @param {number} index 
   */
  const functionExecuted = (index) => {
    if (clickCount === 0) {
      handleClickUp(index)
    } else {
      handleClickDown(index)
    }
  }

  // Tableau après le tri des données
  let newData=[]

  const handleClickUp = (index) => {
    newData = sortingEmployees(dataRows, index, 'asc')
    dispatch(saveSearch(newData))
  }

  const handleClickDown = (index) => {
    newData = sortingEmployees(dataRows, index, 'desc')
    dispatch(saveSearch(newData))
  }

  // Managing the clicked column
  const columnIndex = (index) => {
    // Check old value of clickedIndex
    setClickedIndex((prevIndex) => (prevIndex === index ? prevIndex : index))
    dispatch(changeColumnIndex(index))
  }

  return (
    <>
      <tr>
        {dataColumns &&
          dataColumns.map((item, index) => (
            <th className={Styles.thColumn} style={{width: widthColumn,}} key={index} onClick={() => columnIndex(index)}>
              <div className={Styles.tdColumn}>
                <span>{item}</span>
                <div className={Styles.iconColumn} onClick={() => toggleIcon(index)}>
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
