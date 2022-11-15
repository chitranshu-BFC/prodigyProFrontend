import React, { component } from 'react';
import Vishal, { Upperdiv, LoginLogo } from './reusable-content';
import $ from 'jquery';
import Axios from 'axios';
import { Link, Redirect } from 'react-router-dom';
import CryptoJs from 'crypto-js';
import ReactTooltip from 'react-tooltip';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// import cors from 'cors';
import jsonxml from 'jsontoxml';


class Registration extends React.Component {

  constructor(props) {
    super(props);
    this.state = { Nametext: '' };
    // this.state = { isValid: false };
    this.onChange = this.onChange.bind(this);
    localStorage.removeItem("status");
  }

  onChange(e) {
    const data = {
      name: $("input[name=fullname]").val(),
      phone: $("input[name=mob]").val(),
      email: $("input[name=email]").val(),
      password: $("input[name=Password]").val(),
      c_password: $("input[name=CnfPassword]").val(),
      tac:$("input[name=tac]:checked").val()
    };

    
    if (data.name != '') {
      this.setState({ Nametext: "" });
    }

    if (data.email != '') {
      this.setState({ Emailtext: "" });
    }

    if (data.phone != '') {
      this.setState({ Phonetext: "" });
    }

    if (data.password != '') {
      this.setState({ Passtext: "" });
    }

    if (data.c_password != '') {
      this.setState({ Cpasstext: "" });
    }

    if (data.tac == 1) {
      this.setState({ tactext: "" });
    }

  }

	handleFormValidation = (e) => {
    let data_err=[];
    const data = {
      name: $("input[name=fullname]").val(),
      phone: $("input[name=mob]").val(),
      email: $("input[name=email]").val(),
      password: $("input[name=Password]").val(),
      c_password: $("input[name=CnfPassword]").val(),
      tac:$("input[name=tac]:checked").val()
    };


    var pass = CryptoJs.MD5(data.password).toString(); // Encrption
    var cpass = CryptoJs.MD5(data.c_password).toString() // Encrption

    if (pass != cpass) {
      console.log("pass", pass);
      console.log("cpass", cpass);
    }

    if (data.name == '') {
      var isValid = {name:"1"};
      data_err.push(isValid);
      this.setState({ Nametext: "Mandatory Field" });
    } else {
      // var isValid = true;
      this.setState({ Nametext: "" });
    }

    const emailRegex = /^[^@ ]+@[^@ ]+\.[^@ ]+$/;  // Email Validation
    const EmailValid = emailRegex.test(data.email)
    if (data.email == '') {
      var isValid = {email:"1"};
      data_err.push(isValid);
      this.setState({ Emailtext: "Mandatory Field" });
    } else if (EmailValid == false) {
      var isValid = {email:"1"};
      data_err.push(isValid);
      this.setState({ Emailtext: "Email Id is Invalid" });
    } else {
      // var isValid = true;
      this.setState({ Emailtext: "" });
    }

    //mobile No validation
    var mobPattern = /^(?:(?:\\+|0{0,2})91(\s*[\\-]\s*)?|[0]?)?[6789]\d{9}$/;
    const PhoneValid = mobPattern.test(data.phone);
    if (data.phone == '') {
      var isValid = {phone:"1"};
      data_err.push(isValid);
      this.setState({ Phonetext: "Mandatory Field" });
    } else if (PhoneValid == false) {
      var isValid = {phone:"1"};
      data_err.push(isValid);
      this.setState({ Phonetext: "Mobile No is Invalid" });
    } else {
      // var isValid = true;
      this.setState({ Phonetext: "" });
    }

    var char = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).*$/;
    const charValid = char.test(data.password);
    //alert(charValid);
    if (data.password == '') {
      var isValid = {password:"1"};
      data_err.push(isValid);
      this.setState({ Passtext: "Mandatory Field" });
    }else if (data.password.length < 6) {
      var isValid = {password:"1"};
      data_err.push(isValid);
      this.setState({ Passtext: "Password must be more than 6 digit!" });
    }else if (charValid == false) {
      var isValid = {password:"1"};
      data_err.push(isValid);
      this.setState({ Passtext: "The password should Alpha-numeric with atleast 1 Capital & Special character" });
    } else {
      // var isValid = true;
      this.setState({ Passtext: "" });
    }

    if (data.c_password == '') {
      var isValid = {c_password:"1"};
      data_err.push(isValid);
      this.setState({ Cpasstext: "Mandatory Field" });
    } else if (pass != cpass) {
      var isValid = {c_password:"1"};
      data_err.push(isValid);
      this.setState({ Cpasstext: "Password Does Not Match" });
    } else {
      // var isValid = true;
      this.setState({ Cpasstext: "" });
    }

    if (data.tac == undefined) {
      var isValid = {tac:"1"};
      data_err.push(isValid);
      this.setState({ tactext: "Please agree Terms & Conditions" });
    } else {
      // var isValid = true;
      this.setState({ tactext: "" });
    }

    return data_err.length;
  }

  getOtp = e => {
    e.preventDefault();
    const dataphone = {
      phone: $("input[name=mob]").val(),
      email: $("input[name=email]").val(),
      tac: $("input[name=tac]:checked").val()
    };

    if (this.handleFormValidation()==0) {
      if (dataphone.tac == undefined) {
        toast.error("Please agree Terms & Conditions ");
      } else {
        $(".otp-button").text("Loading...");
        $(".otp-button").attr("disabled", true);
        Axios.post("/prodigypro/api/otp", dataphone)
          .then(function (response) {
            const items = response.data;
            $(".otp-button").css({ "display": "none" });
            $(".otp-input").css({ "display": "block" });
          })
          .then(() => this.setState(() => ({ otptext: "OTP has been sent on Mobile & Email!" })));
      }
    }
  };

  verifyOTP = e => {
    e.preventDefault();
    const data = {
      otp: $("input[name=otp]").val(),
    };
    this.setState(() => ({ otptext: "" }));
    // console.log(data)
    if (data.otp.length >= 6) {
      Axios.post("/prodigypro/api/verifyOtp", data)
        .then(function (response) {
          const items = response.data;
          // console.log(response);
          // this.setState(() => ({ otptext: "OTP does not matched!" }));
          if (response.data.status == 400 || response.data.error == 1) {
            toast.warning("OTP does not matched!");
          }else{
            $(".otp-input").css({ "display": "none" });
            $(".submit-button").css({ "display": "block" });
          }
          // alert(response.data.data.message);
          // toast.success(response.data.data.message);
          // if (response.data.data.error == 0) {
          //   $(".otp-input").css({ "display": "none" });
          //   $(".submit-button").css({ "display": "block" });
          // }
        });
    }
  };

  handleFromSubmit = e => {
    e.preventDefault();

    const data = {
      name: $("input[name=fullname]").val(),
      phone: $("input[name=mob]").val(),
      email: $("input[name=email]").val(),
      password: $("input[name=Password]").val(),
      c_password: $("input[name=CnfPassword]").val()
    };

    if (this.handleFormValidation()) {
      Axios.post("/prodigypro/api/registers", data)
        .then(function (response) {
          // console.log("response",response);
          if (response.data.data.status == 400) {
            toast.warning(response.data.data.message);
          } else {
            const items = response.data.data.status;
            localStorage.setItem("status", "items");
            toast.success(response.data.data.message);
          }
        })
        .then(() => this.setState(() => ({ redirect: true })));
      // if (localStorage.getItem("status")) {
      //   toast.warning("Successfully Registreted!");
      //   // this.setState({ Fieldtext: "Successfully Registreted" });
      // }
      // if (localStorage.getItem("status") == '') {
      //   this.setState({ Fieldtext: "Email Id or Mobile no is Already Exits!" });
      // }
    }
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to='/' />
    }

    // if(localStorage.getItem("userLoggedId")){
    //   setTimeout(function(){
    //     // return <Redirect to='/pan-verification' />
    //     window.location.href = '/';
    //  }, 2000);
    // }
    return (
      <>
        <style>
          {`
         .logo-container{
          top: 15px;
         }
         .otp-input, .submit-button{
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
         .fa-info{
           color:#fff;
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
                    <LoginLogo />
                    <div className="login-inner-form pt-5">
                      <div className="details">
                        <h3>Create an account</h3>
                        <form action="#" >
                          <div className="form-group">
                            <input type="text" name="fullname" className="input-text" placeholder="Full Name" ref="fullname" tab-index="-1" autoFocus onKeyUp={this.onChange} />
                            <small className="text-danger pull-left">{this.state.Nametext}</small>
                          </div>
                          <div className="form-group">
                            <input type="email" name="email" ref="email" className="input-text" placeholder="Email Address" onKeyUp={this.onChange} />
                            <small className="text-danger pull-left">{this.state.Emailtext}</small>
                          </div>
                          <div className="form-group">
                            <input type="text" name="mob" className="input-text" placeholder="Mobile Number" onKeyUp={this.onChange} />
                            <small className="text-danger pull-left">{this.state.Phonetext}</small>
                          </div>
                          <div className="form-group">
                            <div className="d-flex">
                              <input type="password" name="Password"  class="input-text w-100" placeholder="Password" onKeyUp={this.onChange}/>
                            </div>
                            <div className="bg-info rounded-circle d-icon" >
                              <i class="fa fa-info" data-tip data-for="registerTip" ></i>
                            </div>
                            <ReactTooltip id="registerTip" place="top" effect="solid">
                              <div className="tool_tip">
                                The password should Alpha-numeric with atleast 1 Capital & Special character ( Ex- Abc123@ )
                              </div>
                            </ReactTooltip>
                            
                            <small className="text-danger pull-left top-text">{this.state.Passtext}</small> 
                          </div>
                          <div className="form-group">
                            <input type="password" name="CnfPassword" className="input-text" placeholder="Confirm Password" onKeyUp={this.onChange} />
                            <small className="text-danger pull-left">{this.state.Cpasstext}</small>
                          </div>
                          <div className="checkbox clearfix">
                            <div className="form-check checkbox-theme">
                              <input className="form-check-input" value="1" name="tac" type="checkbox" defaultValue id="rememberMe" onChange={this.onChange}/>
                              <label className="form-check-label" htmlFor="rememberMe">
                                I agree to the<a href="#" className="terms">Terms & Conditions</a>
                              </label><br></br>
                              <small className="text-danger pull-left">{this.state.tactext}</small>
                            </div>
                          </div>

                          <div className="form-group">
                            <button type="submit" className="btn-md btn-theme btn-block otp-button" onClick={this.getOtp}>GENERATE OTP</button>
                          </div>
                        </form>
                        <form action="#" >
                          <div className="form-group otp-input">
                            <input type="text" name="otp" className="input-text" placeholder="Enter OTP" onKeyUp=
                              {this.verifyOTP} />
                            <small className="text-danger pull-left">{this.state.otptext}</small>
                          </div>
                          <div className="form-group">
                            <button type="submit" className="btn-md btn-theme btn-block submit-button" onClick={this.handleFromSubmit}>Submit</button>
                          </div>
                          <div className="checkbox clearfix">
                            <a href="#" onClick={this.getOtp}>Didn't Get OTP? Resend</a>
                          </div>
                        </form>
                        <p>Already Registered? <a href="login-options">Login here</a></p>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-5 col-md-12 col-sm-12 col-pad-0 bg-img align-self-center none-992">
                    <Upperdiv />
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
export default Registration
