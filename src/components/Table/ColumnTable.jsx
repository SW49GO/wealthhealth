import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { FaCaretUp, FaCaretDown } from 'react-icons/fa'
import { changeColumnIndex, saveSearch } from '../../features/store'
import { sortingEmployees } from '../../utils/sortingEmployees'

function ColumnTable({ dataColumns, dataRows }) {
//   const widthColumn = 100 / (dataColumns.length - 1) + '%'
  const dispatch = useDispatch()

  // Tableau d'état pour chaque colonne
  const [isChoice, setIsChoice] = useState(new Array(dataColumns.length).fill(null))
  // Gestion de la colonne en cours
  const [clickedIndex, setClickedIndex] = useState(null)
  console.log('clickedIndex:', clickedIndex)
  // Gestion de la colonne précédente
  const [previousClickedIndex, setPreviousClickedIndex] = useState(null)
  console.log('previousClickedIndex:', previousClickedIndex)


  const [clickCount, setClickCount] = useState(0)

  const toggleIcon = (index) => {
    setIsChoice((prevChoices) =>
      prevChoices.map((prevChoice, i) => (i === index ? !prevChoice : prevChoice))
    )
    //Alterne entre 0 et 1
    setClickCount((prevCount) => (prevCount + 1) % 2)
    functionExecuted(index)
  }

  const functionExecuted = (index) => {
    if (clickCount === 0) {
      handleClickUp(index)
    } else {
      handleClickDown(index)
    }
  }

  let newData

  const handleClickUp = (index) => {
    newData = sortingEmployees(dataRows, index, 'asc')
    dispatch(saveSearch(newData))
  }

  const handleClickDown = (index) => {
    newData = sortingEmployees(dataRows, index, 'desc')
    dispatch(saveSearch(newData))
  }

  // Gestion de la colonne cliqué
  const columnIndex = (index) => {
    setPreviousClickedIndex(clickedIndex)
    // Vérifie l'ancienne valeur de clickedIndex
    setClickedIndex((prevIndex) => (prevIndex === index ? prevIndex : index))
    dispatch(changeColumnIndex(index))
    resetPreviousChoice()
  }
  // Remise à null de isChoice
  const resetPreviousChoice = () => {
    if (previousClickedIndex !== null) {
      // Vérifie l'état précédent du tableau isChoice
      setIsChoice((prevChoices) =>
        prevChoices.map((prevChoice, i) => (i === previousClickedIndex ? null : prevChoice))
      )
    }
  }

  return (
    <>
      <tr style={{ width: '100%' }}>
        {dataColumns &&
          dataColumns.map((item, index) => (
            <th className="thStyle"  key={index} onClick={() => columnIndex(index)}>
                {/* style={{ minWidth: widthColumn }} */}
              <div className="tdContent">
                <span>{item}</span>
                <div className="iconSortContainer" onClick={() => toggleIcon(index)}>
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

export default ColumnTable
