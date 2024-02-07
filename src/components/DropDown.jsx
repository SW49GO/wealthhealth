import { useState, useRef, useEffect } from "react"
import { FaCaretUp, FaCaretDown } from 'react-icons/fa'

function DropDown({data, onSelect, ASC, initialOption}){
// console.log('initialOption:', initialOption)

    // console.log('dataDrop:', data)
    const [isOpen, setIsOpen] = useState(false)
    const toggleDropDown = () => setIsOpen(!isOpen)

  // Sort the table alphabetically if necessary
    let datas
    if(ASC){
        datas = data.sort((a,b)=>a.name.localeCompare(b.name, 'fr'))
    }else{
        datas = data
    }
    // State for the option displayed by default
    const [optionSelected, setOptionSelected] = useState(datas ? datas[0].name:'')
    // console.log('optionSelected:', optionSelected)
    useEffect(()=>{
        if(initialOption){
            setOptionSelected(initialOption)
        }
    }, [initialOption])



    // Function to retrieve selection
    const handleOptionSelected=(option)=>{
        // If option is an array (for the option that contains abbreviation and name)
        if(Array.isArray(option)){
            setOptionSelected(option[1])
            onSelect(option[0])
        }else{
            setOptionSelected(option)
            onSelect(option)
        }
        setIsOpen(false)
    }
    // Creating a reference for each option in the list
    const listRef= useRef(null)
    // Each time the drop-down list is opened, the scroll is positioned on the default element (initialOption)
    useEffect(() => {
        if (listRef.current) {
          const selectedOptionElement = listRef.current.querySelector(`[data-option="${optionSelected}"]`);
          if (selectedOptionElement) {
            const scrollTo = selectedOptionElement.offsetTop - listRef.current.offsetTop;
            listRef.current.scrollTo({ top: scrollTo, behavior: 'smooth' });
          }
        }
      }, [isOpen, optionSelected])

    return(
        <>
        <div className="dropdown-container">
            <div className="dropdown-header"  onClick={toggleDropDown}>
                <div>{optionSelected}</div>
                <div>{isOpen ? <FaCaretUp/> : <FaCaretDown/>}</div>
            </div>
            {isOpen &&
            <div ref={listRef} className="dropdown-list">
                {datas.map((item,index)=>(
                    <div data-option={item.name} style={{padding:5}} key={index} onClick={() => {item.abbreviation ? handleOptionSelected([item.abbreviation, item.name]) :handleOptionSelected(item.name)}}
                    onMouseOver={(event) => {
                        event.target.style.backgroundColor = `#d3cdcd`
                      }}
                      onMouseOut={(event) => {
                        event.target.style.backgroundColor = `#fff`
                      }}
                    >{item.name}</div>
                ))}
            </div>
            }
        </div>
        </>
    )
}
export default DropDown