export function sortingEmployees(data ,index, sorts){
    console.log('indexSorting:', index)
    console.log('sorts:', sorts)
    console.log('data:', data)
    console.log('tabKey',Object.keys(data[0])[index])
    const filterColumn = Object.keys(data[0])[index]
    const newData = [...data]
        if (sorts==='asc'){
            if(filterColumn==='zipCode'){
                console.log('dans Zip')
                return newData.sort((a, b) => parseInt(a.zipCode) - parseInt(b.zipCode))
            }else if (filterColumn==='dateOfBirth' || filterColumn==='startDate'){
                    return newData.sort((a, b) => {
                            const dateA = new Date(a[filterColumn])
                            const dateB = new Date(b[filterColumn])
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
                            const dateA = new Date(a[filterColumn])
                            const dateB = new Date(b[filterColumn])
                            return dateB - dateA
                          })
            }else{
                return newData.sort((a, b) => b[filterColumn].localeCompare(a[filterColumn], 'fr'))
            }
        }
    }