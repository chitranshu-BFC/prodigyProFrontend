import React, {component} from 'react';
import {Upperdiv,LoginLogo,Loader}  from './reusable-content';
import $ from 'jquery';
import { Link,Redirect } from 'react-router-dom';
import Axios from 'axios';

class Login extends React.Component{
  constructor(props) {
    super(props);
    this.state = {Fieldtext:''};
    
    localStorage.removeItem("userLoggedId");
    localStorage.removeItem("userEmail");
  }
  
  login = e => {
    e.preventDefault();
    
    const data = {
      email: $("input[name=email]").val(),
      password: $("input[name=password]").val(),
    };

    if((data.email=='') || (data.password=='')){

      this.setState({ Fieldtext: "All Field in Requried" });
    }else{
      this.setState({Fieldtext:""});
      Axios.post("/prodigypro/api/login",data)
      .then((response) => {
          localStorage.setItem("userLoggedId",response.data.data.data.userId)
          localStorage.setItem("userEmail",response.data.data.data.email)
          console.log(response.data.data.data);
      })
      .then(() => this.setState(() => ({ redirect: true })))
      
      if(localStorage.getItem("userLoggedId")){
        this.setState({Fieldtext:"Successfully"});
      }else{
        this.setState({Fieldtext:"Invalid Credentials"});
      }
    }
  };

    render(){

      if (this.state.redirect) {
        return <Redirect to='/pan-verification' />
      }
        return(
        <>
          <style>
          {`
          .logo-container{
            top: -20px;
           }
          `}
          </style>
         
      {/*<Loader/>*/}
      <div className={this.state.visible?'fadeIn':'fadeOut'} ></div>
      <div className="login-23"> 
        <div className="container">
            <div className="row">
                <div className="offset-md-2 col-md-10">
                <div className="row login-box-12">
              <div className="col-lg-7 col-sm-12 col-pad-0 align-self-center">
              <LoginLogo/>
              <br/>
                <div className="login-inner-form">
                  <div className="details">
                    <h3>Login With User ID</h3>
                    <spen className="text-danger pull-left">{this.state.Fieldtext}</spen>
                    <form action="#">
                      <div className="form-group">
                        <input type="email" name="email" className="input-text" placeholder="Email Address" />
                      </div>
                      <div className="form-group">
                        <input type="password" name="password" className="input-text" placeholder="Password" />
                      </div>
                      <div className="checkbox clearfix">
                        <div className="form-check checkbox-theme">
                          <input className="form-check-input" type="checkbox" defaultValue id="rememberMe" />
                          <label className="form-check-label" htmlFor="rememberMe">
                            Remember me
                          </label>
                        </div>
                        <Link to="/forget-password" className="">Forgot Password</Link>
                      </div>                   
                      <div className="form-group">
                        <button type="button" className="btn-md btn-theme btn-block" onClick={this.login}>Login</button>
                      </div>
                    </form>
                      <p>Don't have an account? 
                        <Link to="/registration" className=""> Register here</Link>
                      </p>
                  </div>
                </div>
              </div>
              <div className="col-lg-5 col-md-12 col-sm-12 col-pad-0 bg-img align-self-center none-992">
              <Upperdiv/>
              </div>
            </div>
            </div>
            </div>
        </div>
      </div>
        </>
        )
    }
    
}
export default Login
