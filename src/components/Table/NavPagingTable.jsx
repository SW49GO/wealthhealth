
function NavPagingTable({currentPage,totalPages,nbEntries,totalEntries,setCurrentPage}){
  
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
      </>)
}
export default NavPagingTable