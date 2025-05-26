import React, { useState,useEffect } from 'react'
import './nav.css'
export default function Nav() {
  let [scroll,scrollState] = useState(false);

  useEffect( ()=>{
    window.addEventListener('scroll',()=>{
      if(scrollY>50){
      scrollState(true)
    }
      else{
      scrollState(false)
      }});

    return()=>{
      window.removeEventListener('scroll',()=>{});
    };
  },[]);
  
  return (
    <div>
        <nav className={'nav ${scroll && nav_black}'}>
        <img 
        alt='netflix logo'
        src='https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1198px-Netflix_2015_logo.svg.png'
        className='logo'
        onClick={()=>window.location.reload()}/>
        <img
        alt='user login'
        src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNigA18ww25lAZWi1JIiL_iowyF8rOhMtZxA&s'
        className='UserLogin'/>
        </nav>
    </div>
  )
}
