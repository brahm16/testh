import React, { Component,useEffect,useState } from 'react'
import Landing from './Landing';
import "./index.css"
import {
    Carousel,
    CarouselItem,
    CarouselControl,
    CarouselIndicators,
    CarouselCaption
  } from 'reactstrap';
import Axios from 'axios';
  
 

const Home=()=>{
    const [activeIndex, setActiveIndex] = useState(0);
    const [animating, setAnimating] = useState(false);
    const [images, setImages] = useState([]);

    let arr=["/img1.jpg","/img2.jpg","/img.jpg"];
    const items = [
      {
        src: '/img1.jpg',
        altText: 'Slide 1',
        caption: 'Slide 1'
      },
      {
        src: '/img2.jpg',
        altText: 'Slide 2',
        caption: 'Slide 2'
      },
      {
        src: '/img3.jpg',
        altText: 'Slide 3',
        caption: 'Slide 3'
      }
    ];


  
    const loadImages = () => {
      Axios.get(`${process.env.REACT_APP_URL}images`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          setImages(res.data);
          console.log(res.data);
          //  console.log(images);
        })
        .catch((err) => {
        });
    };
    useEffect(() => {
      loadImages();
    }, []);
    var all;

    if(images.length!=0){
      all= images.map((x) => {
        return(
          <CarouselItem
          onExiting={() => setAnimating(true)}
          onExited={() => setAnimating(false)}
          className="myitem"
          key={x._id}
        >
          <img src={process.env.PUBLIC_URL + `/uploads/${x.myImage}`} alt={x.name} />
        </CarouselItem>
         
        )
    })
    }
    else
    {
     all= arr.map((x)=>{
       return(
        <CarouselItem
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        className="myitem"
      >
        <img src={x} alt="hawasbia" />
      </CarouselItem>
       )
     })
    }
  
    const next = () => {
      if (animating) return;
      const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
      setActiveIndex(nextIndex);
    }
  
    const previous = () => {
      if (animating) return;
      const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
      setActiveIndex(nextIndex);
    }
  
    const goToIndex = (newIndex) => {
      if (animating) return;
      setActiveIndex(newIndex);
    }
  
    const slides = items.map((item) => {
      return (
        <CarouselItem
          onExiting={() => setAnimating(true)}
          onExited={() => setAnimating(false)}
          className="myitem"
          key={item.src}
        >
          <img src={item.src} alt={item.altText} />
        </CarouselItem>
      );
    });
    return (
        <Carousel
          activeIndex={activeIndex}
          next={next}
          previous={previous}
        >

          <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={goToIndex} />
          {all}
          <Landing />
          

          <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
          <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
        </Carousel>
      );
  
}
export default Home;
