import React, {useState ,useEffect} from 'react'
import api from './ContactComponents/axios';
import { toast } from "react-toastify";
import Tilt from 'react-vanilla-tilt';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import "./index.css"

const Castronomy = () => {

  const [castronomy, setCastronomy] = useState([]);
  

  const getEventHandler =  ()=>{
   
  
    console.log("reclamation is : "+Castronomy.name);
    api.get(`${process.env.REACT_APP_URL}Castronomy` , {
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  }).then((res) => {
    setCastronomy(res.data);
    console.log(res.data);
    //  console.log(images);
  })
  .catch((err) => {
    toast.error(`Error To Your Information `);
  });
  // console.log("reclamation is : "+response.data);
  //  alert(response.data);
  // setCastronomy([...Castronomy , response.data]);
  };

  useEffect(() => {
    getEventHandler();
  }, [])

        const all = castronomy.map((cast) => {
          console.log(cast.nameCastronomy);
            return(
              <>
              <Tilt  options={{ scale: 2, max: 25 }} 
              className="col-md-5 spacedown spaceleft "
              style={{ padding:0 }}
              >
            
              <div  className="color-gray"
             >
              
                <h3>{cast.nameCastronomy}</h3>
                <div class="devider-page-content"></div>
                <LazyLoadImage
                  class="img-cont1"
                  alt={cast.nameCastronomy}
                  src={process.env.PUBLIC_URL +`/uploads/${cast.image}`}
                />
                <p>
                  {cast.descriptionCastronomy}
                </p>
                <div class="btn-content">
                  <a class="detail-page link-class" href="page-discover/exp.html">{cast.nameCastronomy}</a>
                </div>
              </div>
              </Tilt>
              </>
            )
        })

        return (
            <>
         

    <div id="wraperexpedition">
      

     

      <div class="main-content">
        <div class="row">

          <div class="col-md-12 spacedown">
            <h1 >
              All Castronomy
            </h1>
            
            <div class="devider-page " ></div>
          </div>
           
            {all}
       
            
           
                  
                
            
        
       

       

        </div>
      </div>

     

      

      </div>



            </>
        )
    }
    export default Castronomy;