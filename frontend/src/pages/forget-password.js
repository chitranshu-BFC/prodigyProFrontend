import React, {component} from 'react';
import $ from 'jquery';
import {LoginLogo,UpperdivOthers}  from './reusable-content';
import Axios from 'axios';
import { Link,Redirect } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CryptoJs from 'crypto-js';
import ReactTooltip from 'react-tooltip';

class Forget_Password extends React.Component{

  constructor(props) {
    super(props);
    this.state = {EmailErr:''};
    this.state = { massege: '' };
    this.state = { OTPmsgErr: '' };
    this.valid = this.valid.bind(this);
  }

  valid(e){
    const data = {
      email: $("input[name=email]").val(),
      otp: $("input[name=otp]").val(),
      password: $("input[name=password]").val(),
      cpassword: $("input[name=cpassword]").val(),
    };

    if (data.email != ''){
      this.setState({ EmailErr: "" });
    }

    if (data.otp != ''){
      this.setState({ OTPErr: "" });
    }

    if (data.password != ''){
      this.setState({ Passtext: "" });
    }

    if (data.cpassword != ''){
      this.setState({ Cpasstext: "" });
    }

  }

  formValidation = (data) =>{

    const emailRegex = /^[^@ ]+@[^@ ]+\.[^@ ]+$/;  // Email Validation
    const EmailValid = emailRegex.test(data.email)
    if (data.email == ''){
      var isValid= false;
      this.setState({ EmailErr: "Mandatory Field" });
    }else if(EmailValid==false){
      var isValid= false;
      this.setState({ EmailErr: "Email Id is Invalid" });
    }else{
      var isValid= true;
      this.setState({ EmailErr: "" });
    }

    return isValid;
  } 

  getOtp= e => {
    e.preventDefault();
    // $(".email-box").css({ "display": "none" });
    // $(".otp-box").css({ "display": "block" });

    const data = {
      email: $("input[name=email]").val(),
    };

    if(this.formValidation(data)){
      $(".otp_btn").html('Loading...');
      Axios.post("/prodigypro/api/forgetpassword",data)
      .then((response) => {
        $(".otp_btn").html('Sent OTP');
        const items = response.data.status;
        if(items==200){
          localStorage.setItem("userOTP",response.data.data.data.otp)
          console.log(response.data);
          this.setState({ massege_sccuess: "OTP has been sent on Email Id & Mobile No" });
          $(".email-box").css({ "display": "none" });
          $(".otp-box").css({ "display": "block" });
        }else{
          // alert("Email does not exits");
          // toast.error("Email does not exist in our records");
          this.setState({ EmailErr: "Email does not exist in our records" });
          //+ this.setState({ EmailErr: "Email is not exit our record" });
        }
      })
      
    }

  }

  OTPformValidation = (data) => {
    
    if (data.otp == ''){
      var isValid= false;
      this.setState({ OTPErr: "Mandatory Field" });
    }else{
      var isValid= true;
      this.setState({ OTPErr: "" });
    }

    return isValid;    
  }

  verifyOTP = e => {
    e.preventDefault(); 
    // $(".otp-box").css({ "display": "none" });
    // $(".pass-box").css({ "display": "block" });

    const data = {
      email: $("input[name=email]").val(),
      otp: $("input[name=otp]").val(),
      userotp: localStorage.getItem("userOTP"),
    };

    if(this.OTPformValidation(data)){
      this.setState({ massege: "" });
      this.setState({ massege_sccuess: "" });
      $(".sub_btn").html('Loading...');
      Axios.post("/prodigypro/api/OTPverify",data)
      .then((response) => {
          $(".sub_btn").html('Submit');
          const items = response.data.status;
          console.log(items);
          if(items==200){
            localStorage.removeItem("userOTP");
            toast.success("OTP verified successfully");
            $(".otp-box").css({ "display": "none" });
            $(".pass-box").css({ "display": "block" });
          }else{
           //  toast.error("OTP Not Matched!");
           this.setState({OTPErr:"Invalid OTP!"})
          }
      })
    }else{
      this.setState({ massege: "" });
    }
  };

  passFromValid = (data) => {
    let data_arr = [];
    var pass = CryptoJs.MD5(data.password).toString(); // Encrption
    var cpass = CryptoJs.MD5(data.cpassword).toString() // Encrption

    if (pass != cpass) {
      console.log("pass", pass);
      console.log("cpass", cpass);
    }


    var char = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).*$/;
    const charValid = char.test(data.password);
    
    if (data.password == ''){
      var isValid= {Passtext:"1"}
      data_arr.push(isValid);
      this.setState({ Passtext: "Mandatory Field" });
    }else if (data.password.length < 6) {
      var isValid= {Passtext:"1"}
      data_arr.push(isValid);
      this.setState({ Passtext: "Password Minimum Lenght 6 Digit" });
    }else if (charValid == false) {
      var isValid = {password:"1"};
      data_arr.push(isValid);
      this.setState({ Passtext: "The password should Alpha-numeric with atleast 1 Capital & Special character" });
    } else{
      //var isValid= true;
      this.setState({ Passtext: "" });
    } 

    if (data.cpassword == ''){
      var isValid= {Cpasstext:"1"}
      data_arr.push(isValid);
      this.setState({ Cpasstext: "Mandatory Field" });
    }else if (pass != cpass) {
      var isValid= {Cpasstext:"1"}
      data_arr.push(isValid);
      this.setState({ Cpasstext: "Password Not Matched" });
    }else{
      // var isValid= true;
      this.setState({ Cpasstext: "" });
    }

    return data_arr.length;
  }

  passupdate = e => {
    e.preventDefault(); 

    const data = {
      email: $("input[name=email]").val(),
      password: $("input[name=password]").val(),
      cpassword: $("input[name=cpassword]").val(),
    };

    if(this.passFromValid(data)==0){
      $(".up_btn").html('Loading...');
      Axios.post("/prodigypro/api/passupdate",data)
     .then((response)=>{
        $(".up_btn").html('Update Password');
        const items = response.data.status;
        console.log(items);
        localStorage.setItem("msg","Your Password has been Updated Successfully.")
        this.setState({msg:"Your Password has been Updated Successfully."})
      })
    };
  };

    render(){
      
      if (this.state.msg) {
        return <Redirect  to={{
                pathname: "/prodigypro",
                msg:this.state.msg,
            }} />
        //return  window.location.href = "https://bfccapital.com/prodigypro/"
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
         .d-icon{
          float: right;
          top: -35px;
          position: relative;
          width: 24px;
          height: 24px;
          right: 10px;
          cursor: pointer;
         }
         .wd{
           width:100%;
         }
         .fa-info{
          color:#fff;
          margin-left: 0px;
        }
         
         #registerTip{
          left: 600px !important;
          max-width: 162px;
          padding: 8px 13px;
         }
         .top-text{
           position: relative;
           top:  -20px;
         }
          `}
          </style>
            
             {/* registration 23 start */}
           
             <div className="login-23">
        <div className="container">
            <div className="row">
            <ToastContainer position="top-right" className="mt-8" />
                <div className="offset-md-2 col-md-10">
                <div className="row login-box-12">
                <div className="col-lg-7 col-sm-12 col-pad-0 align-self-center">
                <LoginLogo/>
        <div className="login-inner-form">
          <div className="details">
            <h3>Recover your password</h3>
            <small className="text-success pull-left">{this.state.massege}</small>
            <small className="text-success pull-left">{this.state.OTPmsgErr}</small>
            <form action="#">
              <div className="email-box">
                <div className="form-group">
                  <input type="email" name="email" className="input-text" placeholder="Enter Registered Email Address *" onKeyUp={this.valid}/>
                  <small className="text-danger pull-left">{this.state.EmailErr}</small>
                </div>
                <div className="form-group">
                  <button type="button" className="btn-md btn-theme btn-block otp_btn" onClick={this.getOtp}>Sent OTP</button>
                </div>
              </div>
              <div className="otp-box">
                <div className="form-group">
                  <input type="text" name="otp" className="input-text" placeholder="Enter OTP *" onKeyUp={this.valid}/>
                  <small className="text-danger pull-left">{this.state.OTPErr}</small>
                  <small className="text-success pull-left">{this.state.massege_sccuess}</small>
                  </div> 
                  <div className="form-group">
                  <button type="submit" className="btn-md btn-theme btn-block sub_btn" onClick={this.verifyOTP}>Submit</button>
                </div>
                <div className="checkbox clearfix">
                  <a href="#" onClick={this.getOtp}>Didn't Get, Resend OTP</a>
                </div>
              </div>
                 {/* input for pin password Setup */} 
              <div className="pass-box">
                 <div className="form-group">
                	<div className="d-flex">
                    	<input type="password" name="password"  className="input-text" placeholder="Enter New Password *" onKeyUp={this.valid}/>
                    </div>
                  	<div className="bg-info rounded-circle d-icon" >
                      <i class="fa fa-info" data-tip data-for="registerTip" ></i>
                    </div>
                    <ReactTooltip id="registerTip" place="top" effect="solid">
                      <div className="tool_tip">
                        The password should Alpha-numeric with atleast 1 Capital & Special character ( Ex- Abc123@ )
                      </div>
                    </ReactTooltip>
                <small className="text-danger pull-left">{this.state.Passtext}</small>
              </div>
              <div className="form-group">
                <div className="d-flex wd">
                	<input type="password" name="cpassword" id="new_pass" className="input-text" placeholder="Corfirm New Password *"  onKeyUp={this.valid}/>
                </div>
                <div className="rounded-circle d-icon" >
                    <i class="fa fa-fw fa-eye-slash field_icon toggle-password" toggle="#password-field" ></i>
                </div>
                <small className="text-danger pull-left">{this.state.Cpasstext}</small>
              </div>
              <div className="form-group">
                <button type="submit" className="btn-md btn-theme btn-block up_btn" onClick={this.passupdate}>Update Password</button>
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
