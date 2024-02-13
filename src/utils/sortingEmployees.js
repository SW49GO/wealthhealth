/**
 * Function to sort the datas
 * @param {array} data 
 * @param {number} index 
 * @param {string} sorts 
 * @returns 
 */
export function sortingEmployees(data ,index , sorts){

    const filterColumn = Object.keys(data[0])[index]
    const newData = [...data]
        if (sorts==='asc'){
            if(filterColumn==='zipCode'){
                return newData.sort((a, b) => parseInt(a.zipCode) - parseInt(b.zipCode))
            }else if (filterColumn==='dateOfBirth' || filterColumn==='startDate'){
                    return newData.sort((a, b) => {
                            const dateA = convertStringToDate(a[filterColumn])
                            const dateB = convertStringToDate(b[filterColumn])
                            return dateA - dateB
                          })
            }else{
                return newData.sort((a, b) => a[filterColumn].localeCompare(b[filterColumn], 'fr'))
            }
        }else {
            if(filterColumn==='zipCode'){
                return newData.sort((a, b) => parseInt(b.zipCode) - parseInt(a.zipCode))
            }else if (filterColumn==='dateOfBirth' || filterColumn==='startDate'){
                    return newData.sort((a, b) => {
                            const dateA = convertStringToDate(a[filterColumn])
                            const dateB = convertStringToDate(b[filterColumn])
                            return dateB - dateA
                          })
            }else{
                return newData.sort((a, b) => b[filterColumn].localeCompare(a[filterColumn], 'fr'))
            }
        }
    }
    /**
     * Function to convert format string Date
     * @param {string} dateString 
     * @returns 
     */
    function convertStringToDate(dateString) {
        const [day, month, year] = dateString.split('/');
        return new Date(year, month - 1, day);
    }