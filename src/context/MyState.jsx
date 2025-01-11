import React, { useState } from 'react'
import MyContext from './MyContext'

function MyState(props) {
    
    const [isPopupOpen, setIsPopupOpen] = useState(false)
    const [title, settitle] = useState()

    const handlePopup = ({title}) => {
        // console.log(title)
        setIsPopupOpen(!isPopupOpen)
        settitle(title)
      }

    return (
        <MyContext.Provider value={{
            isPopupOpen,
            handlePopup,
            title,
            setIsPopupOpen
        }}>
            {props.children}
        </MyContext.Provider>
    )
}

export default MyState
