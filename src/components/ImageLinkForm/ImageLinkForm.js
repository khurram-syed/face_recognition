import React from 'react'
import 'tachyons'
import './ImageLinkForm.css'

const ImageLinkForm =({onChangeEvent, onClickEvent, errorMsg}) => {
  return(
      <div >
        <p className="tc pa2"> This magic brain will detect faces in your picture.</p>
        <div className="form1 br2 center shadow-5" >
          <div className="pa2 red">{errorMsg}</div>
          <div className=" w-90 pa4 br3 "> 
              <input  type="text"  className="w-80 br2 f4 pa2 pv2" onChange={onChangeEvent}  />
              <button onClick={onClickEvent} className="w-20 f4 ph3 pv2 grow bg-light-purple white dib br2 pointer"
                      type="button" value="Detect" >Detect</button>
            </div> 
        </div>
      </div>
  );
}

export default ImageLinkForm;