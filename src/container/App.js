import React from 'react';
import './App.css';
import Navigation from '../components/Navigation/Navigation'
import Logo from '../components/Logo/Logo'
import FaceRecognition from '../components/FaceRecognition/FaceRecognition'
import Rank from '../components/Rank/Rank'
import ImageLinkForm from '../components/ImageLinkForm/ImageLinkForm'
import Particles from 'react-particles-js'

import Signin from '../components/Signin/Signin'
import Register from '../components/Register/Register';
const  settings = require('../setting');
//const herokuURL = 'https://lit-plateau-25547.herokuapp.com'

const  params1={
  "particles": {
    "number": {
    "value": 90
    },
    "size": {
    "value": 2.5
    }
},
  "interactivity": {
    "events": {
    "onhover": {
    "enable": true,
    "mode": "repulse"
    }
    }
    }
} 
const initialState = {   input : '',
       imgUrl : '',
       box : {},
       isSignedIn : false,
       route : 'signin',
       errorMsg:'',
       user :{
        id : '',
        name : '',
        email : '',
        password : '',
        entries : 0,
        joined : new Date()
       }
    };
class App extends React.Component {
  constructor(){
    super();
    this.state =  initialState 
  } 
  onChangeEvent=(event)=>{
    console.log(event.target.value)
 //    this.setState({imgUrl : event.target.value})
    this.setState({input : event.target.value})
   // console.log("On Change Event Image : "+this.state.imgUrl)
  }
 
  loadUser = (data)=>{
    // this.setState({imgUrl:''});
    // this.setState({input:''});
    // this.setState({box:{}});
    this.setState({
       user : {
         id : data.id,
         name : data.name,
         email : data.email,
         password : data.password,
         entries : data.entries,
         joined : data.joined
       }
     })
  }
  calculateFaceLocation=(data)=>{
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const img = document.getElementById("faceImg")
    let width = Number(img.width);
    let height = Number(img.height);
    console.log(`height : ${height} - width : ${width}`)
     let box1 = {
      topRow :  clarifaiFace.top_row * height,
      leftCol : clarifaiFace.left_col * width,
      rightCol :  width - (clarifaiFace.right_col * width),
      bottomRow : height - (clarifaiFace.bottom_row * height)
    }
    console.log(`topRow : ${box1.topRow} - leftCol : ${box1.leftCol} - rightCol : ${box1.rightCol} - bottomRow : ${box1.bottomRow}`)
    this.setState({box : box1})
  }
  
onClickEvent=(event)=>{
    console.log("Clicking..!");
    console.log("input :",this.state.input)
    console.log("imgUrl :",this.state.imgUrl)
    if(this.state.input===''){
      this.setState({errorMsg : "You need to add proper image..!!"})
      return 0;
    }
    this.setState({errorMsg : ""})
    this.setState({imgUrl : this.state.input});
    let img = this.state.imgUrl;
    console.log("On Click Event Image : "+img)
    //this.setState({imgUrl:input})
   //app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
     fetch(settings.HEROKUURL+'/imageurl',{
        method : 'post',
        headers : {'Content-Type':'application/json'},
        body : JSON.stringify({input: this.state.input})
     }).then(response => response.json())
       .then(response => {
        console.log("Clarifie Response",response);
        console.log(response.outputs[0].data.regions[0].region_info.bounding_box)
        if(response){
          fetch(settings.HEROKUURL+'/image',{
             method : 'put',
             headers : {'Content-Type':'application/json'},
             body : JSON.stringify({ id : this.state.user.id})
          }).then(res => res.json())
          .then(count=>{
             console.log(`count : ${count}`);
             this.setState(prevState=>({
                user : {...prevState.user,
                entries: count
                } 
             }))
             console.log("user",this.state.user.name)
             Object.assign(this.state.user, {entries : count})
          })
        }
        this.calculateFaceLocation(response)
      })
      .catch(err => {
        console.log(err);
    });
  }
 
  onRouteChange = (routeText)=>{
        console.log("Link Text : "+routeText)
        if(routeText === "signout" ){
            this.setState(initialState)
        }else if(routeText === "home"){
           this.setState({isSignedIn: true})
        }else {
          console.log("On Link click : it doens't recognise..!!")
        }
        this.setState({route: routeText})    
   }
  
  render(){
      const {route,isSignedIn} = this.state;
      return (
            <div>
              <Particles params={params1} className="particlesClass"/>  
              <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}  />
                { route=== 'home'
                  ? <div>
                      <Logo />
                      <Rank user={this.state.user}/>
                      <ImageLinkForm onChangeEvent={this.onChangeEvent} onClickEvent={this.onClickEvent} errorMsg={this.state.errorMsg}/>
                      <FaceRecognition imgURL={this.state.imgUrl} box={this.state.box}/>
                    </div>
                    
                : (
                    route === 'signin'
                      ? <Signin loadUser= {this.loadUser} onRouteChange={this.onRouteChange} className="tc"/>
                      : <Register loadUser= {this.loadUser} onRouteChange={this.onRouteChange}   className="tc"/>
                    ) 
                }
            </div> 
        );
     }
  }
export default App
