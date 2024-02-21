import { sortingEmployees, convertStringToDate } from '../utils/sortingEmployees'

describe('Test sortingEmployees function', () => {
  test('Sort ascending by zipCode', () => {
    const data = [{ zipCode: '12345' }, { zipCode: '23456' }, { zipCode: '34567' }]
    const result = sortingEmployees(data, 0, 'asc')
    expect(result).toEqual([{ zipCode: '12345' }, { zipCode: '23456' }, { zipCode: '34567' }])
  })

  test('Sort ascending by dateOfBirth', () => {
    const data = [{ dateOfBirth: '01/01/1990' }, { dateOfBirth: '02/02/1980' }, { dateOfBirth: '03/03/1970' }]
    const result = sortingEmployees(data, 0, 'asc')
    expect(result).toEqual([{ dateOfBirth: '03/03/1970' }, { dateOfBirth: '02/02/1980' }, { dateOfBirth: '01/01/1990' }])
  })
  
  test('Sort ascending by others keys', ()=>{
    const data = [{other:'banane'}, {other:'ananas'}, {other:'creme'}]
    const result = sortingEmployees(data,0,'asc')
    expect(result).toEqual([{other:'ananas'},{other:'banane'},{other:'creme'}])
  })

  test('Sort descending by others keys', ()=>{
    const data = [{other:'banane'}, {other:'ananas'}, {other:'creme'}]
    const result = sortingEmployees(data,0,'desc')
    expect(result).toEqual([{other:'creme'},{other:'banane'},{other:'ananas'}])
  })

  test('Descending sort by zipCode', () => {
    const data = [{ zipCode: '12345' }, { zipCode: '23456' }, { zipCode: '34567' }]
    const result = sortingEmployees(data, 0, 'desc')
    expect(result).toEqual([{ zipCode: '34567' }, { zipCode: '23456' }, { zipCode: '12345' }])
  })

  test('Descending sort by dateOfBirth', () => {
    const data = [{ dateOfBirth: '01/01/1990' }, { dateOfBirth: '02/02/1980' }, { dateOfBirth: '03/03/1970' }]
    const result = sortingEmployees(data, 0, 'desc')
    expect(result).toEqual([{ dateOfBirth: '01/01/1990' }, { dateOfBirth: '02/02/1980' }, { dateOfBirth: '03/03/1970' }])
  })

})

describe('Test convertStringToDate function', () => {
  test('Convert a string Date to Date format', () => {
    const dateString = '21/02/2024'
    const result = convertStringToDate(dateString)
    expect(result).toEqual(new Date(2024, 1, 21))
  })
})
