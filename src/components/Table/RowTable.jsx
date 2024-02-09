import PropTypes from 'prop-types'
import {useSelector } from 'react-redux'
import { selectColumn} from '../../features/selector'
import Styles from '../../styles/tableReact.module.css'


function RowTable({backgroundRow, getCurrentPageData }) {
  const indexColumn = useSelector(selectColumn)

  return (
    <>
      {getCurrentPageData().map((item, index) => (
        <tr
          key={index}
          className="show"
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
        >
          {Object.keys(item).map((key, tdIndex) => (
            <td className={Styles.tdRow}
              key={key}
              style={{
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
    data: PropTypes.array.isRequired
  }

export default RowTable