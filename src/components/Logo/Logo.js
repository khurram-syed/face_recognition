import React from 'react'
import 'tachyons'
import brain from './img/brainLogo.png'
import Tilt from 'react-tilt';

const Logo =() => {
  return(
      <div>
        <div className="pa2 h4 ma3" style={{margin:'20px 0px 50px 20px'}}>
        <Tilt className="Tilt" options={{ max : 50, speed:1000, reset:true }}
               style={{ height: 'auto' , width: 100 }} >
                <div className="Tilt-inner ba shadow-2" alt="Logo" >
                   <img src={brain} alt="logo"></img> 
                </div>
        </Tilt>
          
          
        </div>
      </div>
  );
}

export default Logo;