import React, {component} from 'react';
import {UpperdivOthers,LoginLogo}  from './reusable-content';
import { Link,Redirect } from 'react-router-dom';
import $ from 'jquery';
import Axios from 'axios';

class Login_With_Pin extends React.Component{
  constructor(props) {
    super(props);
    this.state = { Emailtext: '' };
    // this.valid = this.valid.bind(this);
  }

  
  getOtp=(e)=>{
    this.setState({msg:""})
    const data = {
      mobile: $("input[name=mobile]").val(),
    };

    if (data.mobile == ''){
      var isValid= false;
      $(".mobile_err").html("Mandatory Field")
    }else{
      var isValid= true;
      $(".mobile_err").html("")
    } 

    if(isValid==true){
      $(".otp-btn").text("Loading...");
      Axios.post("/prodigypro/api/mobileLogin", data)
      .then((response) => {
       
        if(response.data.status==200){
          $(".login-btn").css({"display":"block"});
          $(".otp-input").css({"display":"block"});
          $(".resend-otp").css({"display":"block"});
          $(".otp-btn").css({"display":"none"});
          $(".no-input").css({"display":"none"});
          this.setState({msg:"OTP has been sent on Mobile No"})
          this.setState({userData:response.data.data.data})
          
        }else{
          $(".otp-btn").text("Get OTP");
          $(".mobile_err").html("Mobile No does not exist in our records")
          // this.setState({ EmailErr: "Email does not exist in our records" });
        }
      });
    }
  }

  loginOtp=(e)=>{
    this.setState({msg:""})
    const data = {
      otp: $("input[name=otp]").val(),
      email: this.state.userData.email
    };

    // alert(data.email)
    if (data.otp == ''){
      var isValid= false;
      $(".otp_err").html("Mandatory Field")
    }else{
      var isValid= true;
      $(".otp_err").html("")
    } 

    if(isValid==true){
      $(".login-btn").text("Loading...");
      Axios.post("/prodigypro/api/mobileLoginOtp", data)
      .then((response) => {
        $(".login-btn").text("Login");
        console.log("11",response.data.status);
        if(response.data.status==200){
          localStorage.setItem("userLoggedId", response.data.data.data.userId)
          localStorage.setItem("userEmail", response.data.data.data.email)
          localStorage.setItem("loginUserData",JSON.stringify(response.data.data.data));
          // localStorage.setItem("userPass", data.password)
          if(response.data.data.data.iin){
            console.log("userdata", response.data.data.data.iin);
            this.setState({iin:response.data.data})
          }else{
            console.log("pan", response.data.data);
            this.setState({pan:response.data.data})
          }
        }else{
          $(".otp_err").html("Invalid OTP!")
        }
      })
    }

  }
  goBack = e => {
    window.history.back();
  }
  
    render(){
      if(this.state.iin){
        return <Redirect to='/prodigypro/dashboard' />
      }
  
      if(this.state.pan) {
        return <Redirect to='/prodigypro/pan-verification' />
      }
        return(
        <>
            <style>
            {`
            .logo-container{
              top: 0px;
            }
            .otp-input, .login-btn, .resend-otp{
              display:none;
            }
			.back-btn{
              position: relative;
              float: left;
              margin-left: 10px;
              top: 10px;
              background: #ff574d;
              color: #fff;
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
				<button class="btn btn-light back-btn " onClick={this.goBack}>Back</button>
                <br/>
                <br/>
        <div className="login-inner-form">
          <div className="details">
            <h3>Login With Mobile OTP</h3>
            <form action="#" method="Post">
                    <div className="form-group no-input">
                      <input type="text" name="mobile" className="input-text" placeholder="Enter Your Mobile Number *"  />
                      <small className="text-danger mobile_err pull-left"></small>
                    </div>
                    <div className="form-group">
                      <button type="button" className="btn-md btn-theme btn-block otp-btn" onClick={this.getOtp}>Get OTP</button>
                    </div>
                    {/* <div className="checkbox clearfix"> 
                      <Link to="/forget-password-pin" className="">Forgot PIN</Link>
                    </div> */}
                    <div className="form-group otp-input">
                      <input type="text" name="otp" className="input-text" placeholder="Enter OTP *" />
                      <small className="text-danger otp_err pull-left"></small>
                      <small className="text-success pull-left">{this.state.msg}</small>
                    </div>
                   
                    <div className="checkbox clearfix resend-otp"> 
                      {/* <Link to="" className="">Resend OTP</Link> */}
                      <a href="javascript:void(0)" onClick={this.getOtp}>Resend OTP</a>
                    </div>
                    <div className="form-group">
                      <button type="button" className="btn-md btn-theme btn-block login-btn" onClick={this.loginOtp}>Login</button>
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
export default Login_With_Pin
