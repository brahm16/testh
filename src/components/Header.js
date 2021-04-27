import React, { useState, useEffect,Component } from 'react';

import { NavLink, Redirect  } from "react-router-dom";
import { getCookie } from '../helpers/auth';
import LanguageSelect from './LanguageSelect';
import { useTranslation } from 'react-i18next';


let url1="http://localhost:5000/map"
let url2="http://localhost:5000/intro"


let url="http://localhost:3000/login"
let url4="http://localhost:3000/"

const deplace=()=>{
  window.location.replace(url);
}
const deplace1=()=>{
window.location.replace(url4)
}
const user =getCookie("user");
const username=getCookie("username");
const role=getCookie("role");
const Header=({history})=>{
  const { t } = useTranslation();

    return(
        <header>
<div id="main-menu" className="menu-init"> 
<nav>
        <ul>
          <li>
            <LanguageSelect />
          </li>
      
            <li className=" "><a  href="/myhomee">
            {t('Home')}
              </a> 
           
            </li>
            <li ><a  href="/m/about">
            {t('About Us')}

              </a></li>
            <li  ><a  href="/m/services">
            {t('Services')}

             </a>
            
            </li>
            <li  ><a  href="/m/places">
            {t('Places')}

              </a>
           
            </li>
            <li ><a  href="/m/contact">
            {t('Contact')}
              </a></li>
            <li >

{
         username? (<a  style={{textDecoration:"none"}} href={`/${role}`}>{username}</a>): (<a style={{textDecoration:"none"  }} href="/login">            {t('Login')}
         </a>)
       }
</li>
            <li >

{
         role!=="subscriber"&&role!==null? (<a  style={{textDecoration:"none",}} href={`/${role}`}>{role}</a>): null
       }
</li>

          
           
        </ul>
</nav>   
</div>
     <div className="anim-nav" id="nav-icon">
         <div className="menu-line"></div>
         <div className="menu-line1"></div>
         <div className="menu-line2"></div>
     </div>
</header>
    )
}
export default Header;