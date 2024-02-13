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
  const [clickedIndex, setClickedIndex] = useState(0)
  // Count 0-1 for toggle function
  const [clickCount, setClickCount] = useState(0)

  /**
   * Function to initialize functions and states when clicked sort icons
   * @param {number} index (the column clicked)
   */
  const toggleIcon = (index) => {
    // Update state of isChoice (null/true/false)
    setIsChoice((prevChoices) =>
      prevChoices.map((prevChoice, i) => (i === index ? !prevChoice : prevChoice))
    )
    console.log(isChoice)
  
    // If column already clicked or not
    if (clickedIndex !== index) {
      setClickedIndex(index);
      setClickCount(0)
      // Initialize icons
      setIsChoice((prevChoices) =>
        prevChoices.map((i) => (i === index ? true : null))
      )
    } else {
      // Alternate between 0 or 1 to load function
      setClickCount((prevCount) => (prevCount + 1) % 2)
    }
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

  // Array ti received datas after sorting
  let newData=[]

  const handleClickUp = (index) => {
    newData = sortingEmployees(dataRows, index, 'asc')
    console.log('newDataAPR7S:', newData)
    dispatch(saveSearch(newData))
  }

  const handleClickDown = (index) => {
    newData = sortingEmployees(dataRows, index, 'desc')
    console.log('newDataAPR7S:', newData)
    dispatch(saveSearch(newData))
  }

  // Managing the clicked column
  const columnIndex = (index) => {
    // Check old value of clickedIndex
    setClickedIndex(index)
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
