import React, {useState ,useEffect} from 'react'
import api from './ContactComponents/axios';
import { toast } from "react-toastify";
import Tilt from 'react-vanilla-tilt';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import "./index.css"

const GuestHouse = () => {

  const [maison, setMaison] = useState([]);
  

  const getEventHandler =  ()=>{
   
  
    api.get(`${process.env.REACT_APP_URL}maison` , {
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  }).then((res) => {
    setMaison(res.data);
    console.log(res.data);
    //  console.log(images);
  })
  .catch((err) => {
    toast.error(`Error To Your Information `);
  });
  // console.log("reclamation is : "+response.data);
  //  alert(response.data);
  // setMaison([...Maison , response.data]);
  };

  useEffect(() => {
    getEventHandler();
  }, [])

        const all = maison.map((p) => {
          console.log(p.nameMaison);
            return(
              <>
              <Tilt  options={{ scale: 2, max: 25 }} 
              className="col-md-5 spacedown spaceleft "
              style={{ padding:0 }}
              >
            
              <div  className="color-gray "
             >
              
                <h3>{p.nameMaison}</h3>
                <div class="devider-page-content"></div>
                <LazyLoadImage
                  class="img-cont1"
                  alt={p.nameMaison}
                  src={process.env.PUBLIC_URL +`/uploads/${p.image}`}
                />
                <p>
                  {p.descriptionMaison}
                </p>
                <div class="btn-content">
                  <a class="detail-page link-class" href="page-discover/exp.html">{p.nameMaison}</a>
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
              All Maison
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
    export default GuestHouse;