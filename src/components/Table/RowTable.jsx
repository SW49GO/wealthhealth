import PropTypes from 'prop-types'
import {useSelector } from 'react-redux'
import { selectColumn} from '../../features/selector'


function RowTable({ data, backgroundRow, getCurrentPageData }) {
  // let totalEntries = useSelector(selectTotalEmployees)
  // const totalSearch = useSelector(selectTotalSearch)
  const indexColumn = useSelector(selectColumn)
  // const nbEntries = useSelector(selectEntries)

  // if (totalSearch>0){
  //   totalEntries=totalSearch
  // }

  // const [currentPage, setCurrentPage] = useState(1)
  // const [totalPages, setTotalPages] = useState(1)

  // // Mise à jour du nombre total de pages chaque fois que les données changent
  // useEffect(() => {
  //   setTotalPages(Math.ceil(data.length / (nbEntries)))
  //   setCurrentPage(1)
  // }, [data, nbEntries])

  // // Récupération des données pour la page en cours
  // const getCurrentPageData = () => {
  //   const startIndex = parseInt(currentPage - 1) * parseInt(nbEntries)
  //   // console.log('startIndex:', startIndex)
  //   const endIndex = parseInt(startIndex) + parseInt(nbEntries)
  //   // console.log('endIndex:', endIndex)
  //   // Découpage des données
  //   return data.slice(startIndex, endIndex)
  // }

  // const handlePrevPage = () => {
  //   if (currentPage > 1) {
  //     setCurrentPage(currentPage - 1)
  //   }
  // };

  // const handleNextPage = () => {
  //   if (currentPage < totalPages) {
  //     setCurrentPage(currentPage + 1)
  //   }
  // }

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
            <td
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
        {/* <>
          <div className="navContainerPage">
            <div>
            Showing {((currentPage - 1) * nbEntries) + 1} to {Math.min(currentPage * nbEntries, totalEntries)} of {totalEntries}
            </div>
            <div>
              <button className="btnPages" onClick={handlePrevPage}>Preview</button>
              <span className="nbPages">{currentPage}</span>
              <button className="btnPages" onClick={handleNextPage}>Next</button>
            </div>
          </div>
        </> */}
    </>
  )
}


RowTable.propTypes = {
    data: PropTypes.array.isRequired
  }

export default RowTable