import React from 'react'
import 'tachyons'
const settings = require('../../setting')

class Register extends React.Component{
   
    constructor(props){
        super(props);
        this.state ={
            signInEmail : '',
            signInPassword : '',
            signInName : '',
            errorMsg:''
        }
      } 
 
    onNameChange = (event) => {
        this.setState({signInName: event.target.value})
      }
    
    onEmailChange = (event) => {
          this.setState({signInEmail: event.target.value})
        }
      
    onPasswordChange = (event) => {
          this.setState({signInPassword: event.target.value})
        }
  
    onSubmitRegister = (event)=> {
          fetch(settings.HEROKUURL+'/register',{
              method : 'post',
              headers : {'Content-Type':'application/json'},
              body : JSON.stringify({
                 name : this.state.signInName,
                 email : this.state.signInEmail,
                 password : this.state.signInPassword 
              })
          })
           .then(response => response.json())
           .then(user =>{
               if(user.id){
                  this.props.onRouteChange('home') 
                  console.log(user)
                  this.props.loadUser(user)
               }else{
                   console.log("User already existed..!")
                   console.log(user)
                   this.setState({errorMsg:user})
               }   
          }).catch(err=>console.log("User Regiteration Error Client Side...!"))
      }
    render(){
           // const {onRouteChange} = this.props;
            return(
                <article className ="tc flex flex-wrap justify-center pa3 ma3 " > 
                        <main className="content-center br3 shadow-5 dib pa4 ba black-80 w-25">
                            <div className="measure center">
                                <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                                    <legend className="f4 fw6 ph0 mh0">Register</legend>
                                    <div className="red">{this.state.errorMsg}</div>
                                    <div className="mt3">
                                        <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                                        <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                            type="text" 
                                            name="name"  
                                            id="name" 
                                            onChange={this.onNameChange}/>
                                        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                        <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                            type="email" 
                                            name="email-address"  
                                            id="email-address" 
                                            onChange = {this.onEmailChange}/>
                                        </div>
                                        <div className="mv3">
                                        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                        <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                            type="password" 
                                            name="password"  
                                            id="password" 
                                            onChange = {this.onPasswordChange}/>
                                    </div>
                                    <label className="pa0 ma0 lh-copy f6 pointer"><input type="checkbox" /> Remember me</label>
                                </fieldset>
                                <div className="flex flex-wrap">
                                    <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                                        type="submit"
                                        value="Register" 
                                        onClick={this.onSubmitRegister}/>
                                </div>
                                            
                            </div>
                        </main>
                </article>   
            );
  }
}

export default Register

