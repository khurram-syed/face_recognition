import React from 'react'

class Rank extends React.Component {
  
constructor(){
  super()
  this.state = {rankEmoji:''}
}
 
getEmojiForRank= async(rank)=>{
    console.log('****getEmojiForRank - Rank :',rank)
    return fetch(`https://8uc8zulwue.execute-api.us-east-1.amazonaws.com/dev/rank?rank=${rank}`)
         .then(resp=>resp.json())
         .then(data=>{
            this.setState({rankEmoji:data.input})
            // return data;
          })
         .catch(error=> console.log(error))
  }
 
  componentDidMount(){
        this.getEmojiForRank(this.props.user.entries)
  }
  
  componentDidUpdate(prevProps){
    if(prevProps!=this.props){
        this.getEmojiForRank(this.props.user.entries)
    }
  }
 
   render() {
      const {user} =this.props;
      return(
            <div className="f3 b pa2 flex flex-wrap justify-center">
              <div  className="tc" style={{width:'500px'}}>
                {`${user.name}, Your current Entry Count is ... #${user.entries}`}
              <h3> Badge : {this.state.rankEmoji}</h3>
              </div>
           
            </div> 
      )
    }
}

export default Rank;