import React, { useState, useEffect, Component } from "react";

import { NavLink, Redirect } from "react-router-dom";
import { getCookie } from "../helpers/auth";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import Header from "./Header";
import BottomPage from "./BottomPage";
import { withTranslation } from "react-i18next";


let url1 = "http://localhost:5000/map";
let url2 = "http://localhost:5000/intro";

let url = "http://localhost:3000/login";
let url4 = "http://localhost:3000/";

const deplace = () => {
  window.location.replace(url);
};
const deplace1 = () => {
  window.location.replace(url1);
};
/*
const [isToggled, setIsToggled] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);
  const toggle = React.useCallback(() => setIsToggled(!isToggled));

*/

const user = getCookie("user");
const username = getCookie("username");

 class Landing extends Component {
  constructor(props) {
    super(props);
    this.handleMap = this.handleMap.bind(this);
    this.handleIntro = this.handleIntro.bind(this);
  }

  handleMap() {
    console.log("aaaaaaaaaaaaa");
    window.location.replace(url1);
  }
  handleIntro() {
    console.log("aaaaaaaaaaaaa");
    window.location.replace(url2);
  }
  render() {
    const { t } = this.props;

    const style1 = {
      backgroundImage: "url('img/zagh/0.jpg')",
    };
    const style2 = {
      backgroundImage: "url('img/zriba.jpg')",
    };
    const style3 = {
      backgroundImage: "url('img/temple.jpg')",
    };
    return (
      <>
       

        <div id="wraperexpedition">
          <div className="bgexpedition">
            <div id="owl-slider-home" className="owl-carousel">
              <div className="item imgbg" style={style1}></div>
              <div className="item imgbg" style={style2}></div>
              <div className="item imgbg" style={style3}></div>
            </div>
          </div>
        </div>

        <div
          id="logo"
          className="brand-expedition noselect"
          
        >
          <a href="/myhomee">
          <img src="/logo.png" alt="hawasBia" style={{width:"5rem"}}  />
          </a>
        </div>
        <Header />


        <div className="contentexpedition">
          <div className="row">
            <div className="col-md-12">
              <h1  style={{color:"orange"}}>
              {t('Zaghouane')}
                
              </h1>
              <div
                className="devider-center "
              ></div>
              <div id="slidertext" >
                <div className="main-text">{t('intro')}</div>
            
              </div>

              <div  >
                <div>
                <span><img src="/marker1.png" style={{width: "3rem",color:"orange"}} /></span>
                <span id="curentLoc" style={{color:"orange"}} ></span>

                </div>
                    

                   
          
              </div>

              <div className="btn-home ">
                <a className="link-className" style={{color:"orange"}} onClick={this.handleMap}>
                {t('Take tour')}
                </a>
              </div>
              <div className="btn-home " >
                <a className="link-className" style={{color:"orange",fontSize:"1rem",fontWeight:"1rem"}} onClick={this.handleIntro}>
                {t('Discover')}
                </a>
              </div>
            </div>
            <div style={{marginTop:"3rem"}}>
            <BottomPage />

            </div>

            <div
              id="subwrap"
              className="white-popup-block mfp-hide "
              data-time="0"
            >
              <h5>Please fill your email below</h5>
              <form
                id="subscribe"
                action="http://on3-step.com/tf/expedition/expedition-v1/expedition-v2/subscribe.php"
                method="post"
                name="subscribe"
              >
                <input
                  className="subscribfield subscribeemail"
                  id="subscribeemail"
                  name="subscribeemail"
                  type="text"
                />
                <button id="submit-2" className="btn-form" type="submit">
                  Subscribe
                </button>
              </form>
              <div className="subscribesuccess">
                Thank you for fill your email
              </div>
            </div>
          </div>
        </div>

     

    
      </>
    );
  }
}
export default withTranslation()(Landing);