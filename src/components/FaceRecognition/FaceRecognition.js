import React from 'react'
import 'tachyons';
import './FaceRecognition.css'


const FaceRecognition =({imgURL,box}) => {
  return(
      <div className="center ma">
        <div className="absolute mt2">
         <img id="faceImg" 
              src={imgURL} 
              alt="" 
              style={{width:'500px', height: 'auto'}}/>
              <div className="boundingBox ba" 
              style={{top:box.topRow, left:box.leftCol, right:box.rightCol, bottom:box.bottomRow}}> 
              {/* {console.log(`top:${box.topRow}, left:${box.leftCol}, right:${box.rightCol}, bottom:${box.bottomRow}`)} */}
              </div>
        </div>     
      </div>
  );
}

export default FaceRecognition;