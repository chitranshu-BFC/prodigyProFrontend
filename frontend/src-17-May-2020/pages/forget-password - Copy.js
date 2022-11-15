import React, {component} from 'react';
import $ from 'jquery';
import {LoginLogo,UpperdivOthers}  from './reusable-content';
import Axios from 'axios';
import { Link,Redirect } from 'react-router-dom';


class Forget_Password extends React.Component{

  constructor(props) {
    super(props);
    this.state = {Fieldtext:''};
  }

  

  getOtp= e => {
    e.preventDefault();
      const data = {
        email: $("input[name=email]").val(),
      };
      // $(".email-box").css({ "display": "none" });
      // $(".otp-box").css({ "display": "block" });

      console.log(data.email);
      if(data.email==''){
        this.setState({ Fieldtext: "Email Field is Requried" });
      }else{
        this.setState({Fieldtext:""});
        
      }
  };

  verifyOTP = e => {
    e.preventDefault(); 
    const data = {
      email: $("input[name=email]").val(),
      otp: $("input[name=otp]").val(),
      userotp: localStorage.getItem("userOTP"),
    };

    // $(".otp-box").css({ "display": "none" });
    // $(".pass-box").css({ "display": "block" });

    if(data.otp==''){
      this.setState({ Fieldtext: "OTP Field is Requried" });
    }else{
      Axios.post("/prodigypro/api/OTPverify",data)
      .then(function(response){
          const items = response.data.status;
          console.log(items);
          if(items==200){
            localStorage.removeItem("userOTP");
            console.log(response.data);
            alert(response.data.data.message);
            $(".otp-box").css({ "display": "none" });
            $(".pass-box").css({ "display": "block" });
          }else{
           // alert("OTP Dose Not Match");
          }
      })
    }

  };


  passupdate = e => {
    e.preventDefault(); 
    const data = {
      email: $("input[name=email]").val(),
      password: $("input[name=password]").val(),
      cpassword: $("input[name=cpassword]").val(),
    };

  
    if((data.password=='') || (data.cpassword=='')){
      // alert("All Field in Requried");
       this.setState({ Fieldtext: "All Field in Requried" });
    }else if(data.password!=data.cpassword){
      // alert("Password Does Not Match");
      this.setState({ Fieldtext: "Password Does Not Match" });
    }else if(data.password.length<6){  
      // alert("Minimum Lenght 6 Digit");
      this.setState({ Fieldtext: "Minimum Lenght 6 Digit" });
    }else{
      this.setState({ Fieldtext: "" });
      Axios.post("/prodigypro/api/passupdate",data)
      .then(function(response){
          const items = response.data.status;
          console.log(items);
          alert("Your Password has been Updated");
      })
      .then(() => this.setState(() => ({ redirect: true })));

    }

  };

    render(){
      if (this.state.redirect) {
        return <Redirect to='/' />
      }
        return(
        <>
            <style>
          {`
         .logo-container{
          top: -44px;
         }
         .otp-box{
          display: none;
        }
        .pass-box{
          display: none;
        }
          `}
          </style>
            
             {/* registration 23 start */}
             <div className="login-23">
        <div className="container">
            <div className="row">
                <div className="offset-md-2 col-md-10">
                <div className="row login-box-12">
                <div className="col-lg-7 col-sm-12 col-pad-0 align-self-center">
                <LoginLogo/>
        <div className="login-inner-form">
          <div className="details">
            <h3>Recover your password</h3>
            <spen className="text-danger pull-left">{this.state.Fieldtext}</spen>
            <form action="#">
              <div className="email-box">
                <div className="form-group">
                  <input type="email" name="email" className="input-text" placeholder="Enter Registered Email Address" />
                </div>
                <div className="form-group">
                  <button type="button" className="btn-md btn-theme btn-block" onClick={this.getOtp}>Send OTP</button>
                </div>
                
                </div>
              <div className="otp-box">
                <div className="form-group">
                  <input type="text" name="otp" className="input-text" placeholder="Enter OTP" />
                  </div> 
                  <div className="form-group">
                  <button type="submit" className="btn-md btn-theme btn-block" onClick=
                            {this.verifyOTP}>Submit</button>
                </div>
                <div className="checkbox clearfix">
                  <a href="#" onClick={this.getOtp}>Didn't Get, Resend OTP</a>
                </div>
              </div>
                 {/* input for pin password Setup */} 
              <div className="pass-box">
                 <div className="form-group">
                <input type="password" name="password" className="input-text" placeholder="Enter New Password" />
              </div>
              <div className="form-group">
                <input type="password" name="cpassword" className="input-text" placeholder="Corfirm New Password" />
              </div>
              <div className="form-group">
                <button type="submit" className="btn-md btn-theme btn-block" onClick={this.passupdate}>Update Password</button>
              </div>
              </div>
            </form>
          </div>
        </div>
      </div>
              <div className="col-lg-5 col-md-12 col-sm-12 col-pad-0 bg-img align-self-center none-992">
              <UpperdivOthers/>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
      {/* registration 23 end */}
        </>
        )
    }
    
}
export default Forget_Password
