import taskmatelogo from './taskmatelogo.png'
import React from 'react'
import './header.css'
import darkmode from'./darkmode.png'
import lightmode from './lightmode.png'
import user from './user.png'




function Header({theme, settheme}) {


    const lighttheme=()=>{
        settheme("light")
    }

    const darktheme=()=>{
        settheme("dark")
    }



return (
<header>
    <span className="logo">
        <img src={taskmatelogo} alt="taskmatelogo" />
        <span>TaskMate</span>
    </span>
    <span className="themeSelector">
    {theme === "light" ? (
              <img
                src={lightmode}
                alt="Light mode icon"
                onClick={darktheme}
              />
            ) : (
              <img
                src={darkmode}
                alt="Dark mode icon"
                onClick={lighttheme}
              />
            )}
    </span>
    <img className='user' src={user} alt="user"/>
</header>
  )
}

export default Header
