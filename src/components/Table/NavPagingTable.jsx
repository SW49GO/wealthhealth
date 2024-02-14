
import Styles from '../../styles/tableReact.module.css'
import PropTypes from 'prop-types'
function NavPagingTable({currentPage,totalPages,nbEntries,totalEntries,setCurrentPage}){
  //Function to manage paging
    const handlePrevPage = () => {
      if (currentPage > 1) {
        setCurrentPage(currentPage - 1)
      }
    }
    const handleNextPage = () => {
      if (currentPage < totalPages) {
        setCurrentPage(currentPage + 1)
      }
    }
    return( <>
        <div className={Styles.navContainerPage}>
          <div>
          Showing {((currentPage - 1) * nbEntries) + 1} to {Math.min(currentPage * nbEntries, totalEntries)} of {totalEntries}
          </div>
          <div>
            <button className={Styles.btnPages} onClick={handlePrevPage}>Preview</button>
            <span className={Styles.nbPages}>{currentPage}</span>
            <button className={Styles.btnPages} onClick={handleNextPage}>Next</button>
          </div>
        </div>
      </>)
}


NavPagingTable.propTypes = {
  currentPage: PropTypes.number,
  totalPages: PropTypes.number,
  nbEntries: PropTypes.number,
  totalEntries: PropTypes.number,
  setCurrentPage: PropTypes.func
  }

export default NavPagingTable