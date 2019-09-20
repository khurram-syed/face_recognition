import React from 'react'

const Rank =({user}) => {
  return(
    <div className="f3 b pa2 flex flex-wrap justify-center">
      <div  className="tc" style={{width:'500px'}}>
        {`${user.name}, Your current Entry Count is ... #${user.entries}`}
      </div>
      </div> 
  );
}

export default Rank;