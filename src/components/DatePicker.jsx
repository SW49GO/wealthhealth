import { useState, useEffect } from "react"
import { FaCaretLeft, FaCaretRight,  FaHome, FaCalendarDay} from "react-icons/fa"
import DropDown from "./DropDown"

function DatePicker({onSelect, textLabel, idInput}){

    const objMonth =[{'name':'Janvier'},{'name':'Février'},{'name':'Mars'},{'name':'Avril'},{'name':'Mai'},{'name':'Juin'},{'name':'Juillet'},{'name':'Août'},{'name':'Septembre'},{'name':'Octobre'},{'name':'Novembre'},{'name':'Décembre'}]
    const days = ['Dimanche','Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi']

    // Valeur par défaut des States
    const date = new Date()
    const todayDate = date.getDate()
    console.log('todayDate:', todayDate)
    const currentMonth = date.getMonth()
    const currentYear = date.getFullYear()

 
    // States pour le jour / mois / année
    const [currentDate, setCurrentDate]= useState(todayDate)
    const [choiceMonth, setChoiceMonth] = useState(currentMonth)
    const [choiceYear, setChoiceYear] = useState(currentYear)

    // Nombre de Jours dans le mois et l'année choisis
    const nbDaysofMonth = new Date(choiceYear, choiceMonth + 1, 0).getDate()

    /**
     * Function to change the Month and Year after December or before January
     * @param {string} choice 
     */
    const ChangeMonth=(choice)=>{
        let newMonth
        let newYear = choiceYear
        if(choice==='next'){ 
            newMonth = (choiceMonth + 1) % 12
            if (newMonth === 0) {
                newYear++
            }
            }else{
            newMonth = (choiceMonth - 1 + 12) % 12
            if (newMonth === 11) {
                newYear--
            }
        }
        setChoiceMonth(newMonth)
        setChoiceYear(newYear)
    }
    // State for the firt day of the month chosed
    const [firstDaysMonth, setFirstDaysMonth]= useState()
    useEffect(()=>{
        const firstDayOfMonth = new Date(choiceYear, choiceMonth, 1)
        const dayOfWeek = firstDayOfMonth.getDay()
        setFirstDaysMonth(dayOfWeek) 
    }, [choiceYear, choiceMonth])

    // State pour stocker un tableau d'années
    const [yearsDrop, setYearsDrop] = useState([])
    // console.log('yearArray:',yearsDrop)
    const startYear = 1950
    useEffect(() => {
        const yearArray = []
        for (let i = startYear; i <= currentYear + 50; i++) {
        yearArray.push({ name: `${i}` })
        }
        setYearsDrop(yearArray)
    }, [currentYear])

    // State for the selected day
    const [selectedDay, setSelectedDay] = useState(todayDate)
    console.log('selectedDay:', selectedDay)
    // State ouverture du DatePicker
    const [isDateOpen, setIsDateOpen]=useState(false)
    console.log('isDateOpen:', isDateOpen)

    const HandleDayClick=(dayIndex)=>{
        console.log('dayIndex:', dayIndex)
        setSelectedDay(dayIndex === selectedDay ? selectedDay : dayIndex)
        setCurrentDate(dayIndex)
    }
    const handleMonth=(selectOption)=>{
        const selectedMonthIndex = objMonth.findIndex(month => month.name === selectOption)
        setChoiceMonth(selectedMonthIndex)
    }
    const handleYear=(selectOption)=>{
        setChoiceYear(selectOption)
    }
    const StartHomeDate=()=>{
        setChoiceMonth(currentMonth)
        setChoiceYear(currentYear)
        setCurrentDate(todayDate)
        setSelectedDay(todayDate)
    }
    const CloseDatePicker=()=>{
        setIsDateOpen(false)
        StartHomeDate()
    }
    // State placeholder de l'Input
    const [dateChoose, setDateChoose]=useState('jj / mm / aaaa')
    const ValidDatePicker=()=>{
        console.log('selectedDay:', selectedDay)
        const currentMonth = choiceMonth +1
        const validDate = `${selectedDay< 10 ? '0' + selectedDay : selectedDay}/${currentMonth< 10 ? '0' + currentMonth : currentMonth}/${choiceYear}`
        setDateChoose(validDate)
        onSelect(validDate)
        setIsDateOpen(false)
        StartHomeDate()
    }


    return (<>
        <div className="datepickerInputContainer">
             <label htmlFor={idInput}>{textLabel}</label>
             <div className={"datepickerInput"}>
                <input id={idInput} type="text" placeholder={dateChoose}  onClick={()=>setIsDateOpen(true)}/>
                <FaCalendarDay className="datepickerIcon"/>
            </div>
        </div>
       {isDateOpen && <div className="datepickerContainer">
            <div className="datepickerHeader">
                <FaCaretLeft onClick={() =>ChangeMonth('preview')} style={{paddingRight:5}}/>
                <DropDown data={objMonth} initialOption={objMonth[choiceMonth].name}  onSelect={handleMonth} style={{width:'8rem',paddingRight:5}}/>
                {yearsDrop.length>0 && <DropDown data={yearsDrop}  initialOption={choiceYear} onSelect={handleYear} style={{width:'7rem'}}/>}
                <FaHome style={{padding:5, fontSize:'2rem'}} onClick={()=>StartHomeDate()}/>
                <FaCaretRight onClick={() =>ChangeMonth('next')}/>
            </div>
            <div className="datepickerBody">
                <table className="dateCalendar">
                    <thead className="dateCalendarHeader">
                        <tr>
                        {days.map((item,index)=>(
                            <th key={index}>{item.slice(0,2).toLowerCase()} </th>
                        ))}
                        </tr>
                    </thead>
                    <tbody>
                    {(() => {
                        const rows = []

                        // Boucle pour chaque semaine ->0 to firstDaysMonth = case vide
                        for (let i = 0; i < Math.ceil((firstDaysMonth + nbDaysofMonth) / 7); i++) {
                            const rowItems = []

                            // Boucle pour chaque jour de la semaine
                            for (let j = 0; j < 7; j++) {

                                const dayIndex = i * 7 + j - firstDaysMonth + 1

                                // Vérifie si c'est un jour valide du mois
                                if (dayIndex > 0 && dayIndex <= nbDaysofMonth) {
                                rowItems.push(
                                    <td key={dayIndex} style={{
                                        color: dayIndex === currentDate ? '#fff' : '#000',
                                        backgroundColor: dayIndex === currentDate ? '#3fb0b8' : dayIndex === selectedDay ? '#3fb0b8' : '#fff',
                                        borderRadius: '5px',
                                        fontWeight: dayIndex === currentDate || dayIndex === selectedDay ? 'bold' : 'normal',
                                      }}
                                      onClick={() => HandleDayClick(dayIndex)}
                                      onMouseOver={(event) => {
                                        event.target.style.backgroundColor = '#3fb0b8';
                                        event.target.style.color = '#fff';
                                      }}
                                      onMouseOut={(event) => {
                                        event.target.style.backgroundColor = dayIndex === selectedDay ? '#3fb0b8' : '#fff';
                                        event.target.style.color = dayIndex === selectedDay ? '#fff' : '#000';
                                      }}
                                    >
                                      {dayIndex}</td>
                                )
                                } else {
                                rowItems.push(<td key={`empty-${j}`} style={{backgroundColor:'transparent'}}></td>)
                                }
                            }
                            rows.push(<tr key={i}>{rowItems}</tr>)
                        }
                        return rows
                    })()}
                    </tbody>
                </table>
                <div className="footerCalendar"><button onClick={()=>CloseDatePicker()}>Annuler</button><button onClick={()=>ValidDatePicker()}>Ok</button></div>
            </div>
        </div>
        }
    </>)
}
export default DatePicker