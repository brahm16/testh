import React, { Component } from 'react'
import "./index.css"

export default class Services extends Component {
    render() {
        return (
            <>
         

    <div id="wraperexpedition">
      

     

      <div class="main-content">
        <div class="row">

          <div class="col-md-12 spacedown">
            <h1 >
              All services
            </h1>
            
            <div class="devider-page " ></div>
          </div>

          <div
            class="col-md-12 color-gray spacedown "
          >
            <h3>Games</h3>
            <div class="devider-page-content"></div>
            <img
              class="img-cont"
              alt="discoverimage"
              src="/img/game.jpg"
            />
            <p>
              All jeux in zaghouan
            </p>
            <div class="btn-content">
              <a class="dlink-class" href={process.env.PUBLIC_URL+ `/m/games` }>Games</a>
            </div>
          </div>
          <div
            class="col-md-12 color-gray spacedown"
            data-time="1300"
          >
            <h3>Events</h3>
            <div class="devider-page-content"></div>
            <img
              class="img-cont"
              alt="discoverimage"
              src="/img/zagh/festival.jpg"
            />
            <p>
              All events in zaghouan
            </p>
            <div class="btn-content">
              <a class="link-class" href="/m/events">Events</a>
            </div>
          </div>
          <div
            class="col-md-12 color-gray spacedown "
          >
            <h3>Guest House</h3>
            <div class="devider-page-content"></div>
            <img
              class="img-cont"
              alt="discoverimage"
              src="/img/dar.jpg"
            />
            <p>
              All maison d'hotes  in zaghouan
            </p>
            <div class="btn-content">
              <a class="link-class" href="/m/maison">Maison d'hotes</a>
            </div>
          </div>
          <div
            class="col-md-12 color-gray spacedown "
          >
            <h3>Products</h3>
            <div class="devider-page-content"></div>
            <img
              class="img-cont"
              alt="discoverimage"
              src="/img/nesri.jpg"
            />
            <p>
              All products  in zaghouan
            </p>
            <div class="btn-content">
              <a class="link-class" href="/m/products">Products</a>
            </div>
          </div>
          <div
            class="col-md-12 color-gray spacedown"
          >
            <h3>Gastronomy</h3>
            <div class="devider-page-content"></div>
            <img
              class="img-cont"
              alt="discoverimage"
              src="/img/gast.jpg"
            />
            <p>
              All Gastronomy  in zaghouan
            </p>

            <div class="btn-content">
              <a class="link-class" href="/m/castronomy">Gastronomy</a>
            </div>
          </div>

       

        </div>
      </div>

     

      

      </div>



            </>
        )
    }
}
