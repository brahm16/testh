import React, {useState ,useEffect} from 'react'
import api from './ContactComponents/axios';
import { toast } from "react-toastify";
import Tilt from 'react-vanilla-tilt';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import "./index.css"


const Products = () => {

  const [products, setProducts] = useState([]);
  

  const getProductHandler =  ()=>{
   
  
    api.get(`${process.env.REACT_APP_URL}products` , {
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  }).then((res) => {
    setProducts(res.data);
    console.log(res.data);
    //  console.log(images);
  })
  .catch((err) => {
    toast.error(`Error To Your Information `);
  });
  // console.log("reclamation is : "+response.data);
  //  alert(response.data);
  // setEvents([...events , response.data]);
  };

  useEffect(() => {
    getProductHandler();
  }, [])
        const all = products.map((product) => {
            return(
              <>
              <Tilt  options={{ scale: 2, max: 25 }} 
              className="col-md-5 spacedown spaceleft "
              style={{ padding:0 }}
              >
            
              <div  className="color-gray "
             >
              
                <h3>{product.name}</h3>
                <div class="devider-page-content"></div>
                <LazyLoadImage
                  class="img-cont1"
                  alt={product.name}
                  src={process.env.PUBLIC_URL +`/uploads/${product.image}`}
                />
                <p>
                  {product.desc}
                </p>
                <div class="btn-content">
                  <a class="detail-page link-class" href="page-discover/exp.html">{product.name}</a>
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
            <h1>
              All products
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
export default Products
