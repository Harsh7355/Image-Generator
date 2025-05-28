import React from 'react'
import { useAuth } from '../store/auth'
import './service.css';

const Services = () => {
 
    const {Service} =useAuth()

  return <>

     <section className='section-services'>
      <div className="container">
          <h1 className="main-heading">Services</h1>
      </div> 

      <div className="contatiner grid grid-three-cols">

        {
          Service.map((curElement,index)=>{
            const{ price,description,provider,service }=curElement;

                return ( <div className="card" key={index}>
            <div className="card-img">
              <img src="/images/design.png" alt="our services info" width="200" />
            </div>
            <div className="card-details">
              <div className='grid grid-two-cols'>
                <p>{provider}</p>
                <p>{price}</p>
              </div>
              <h2>{service}</h2>
              <p>{description}</p>
            </div>
          </div>)
          })}
        

      </div>


      </section>  
    
  </>
}

export default Services