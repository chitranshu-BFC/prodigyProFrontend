import React, { component } from 'react';
import Vishal, { Upperdiv, LoginLogo } from './reusable-content';
import $ from 'jquery';
import Axios from 'axios';
import { Link, Redirect } from 'react-router-dom';
import CryptoJs from 'crypto-js';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// import cors from 'cors';
import jsonxml from 'jsontoxml';


class Registration extends React.Component {

  constructor(props) {
    super(props);
    this.state = { Nametext: '' };
    this.state = { Fieldtext: false };
    this.valid = this.valid.bind(this);
    localStorage.removeItem("status");
  }

  valid(e) {
   
    const data = {
      name: $("input[name=fullname]").val(),
      phone: $("input[name=mob]").val(),
      email: $("input[name=email]").val(),
      password: $("input[name=Password]").val(),
      c_password: $("input[name=CnfPassword]").val()
    };

    if (data.name != ''){
      this.setState({ Nametext: "" });
    }

    if((data.phone != '')){
      this.setState({ Phonetext: "" });
    }

    if((data.email != '')){
      this.setState({ Phonetext: "" });
    }

    
  }

  // valid
  getOtp = e => {
    e.preventDefault();
    const data = {
      name: $("input[name=fullname]").val(),
      phone: $("input[name=mob]").val(),
      email: $("input[name=email]").val(),
      password: $("input[name=Password]").val(),
      c_password: $("input[name=CnfPassword]").val()
    };

    const dataphone = {
      phone: $("input[name=mob]").val(),
      email: $("input[name=email]").val(),
    };

    const emailRegex = /^[^@ ]+@[^@ ]+\.[^@ ]+$/; // Email Validation
    const result1 = emailRegex.test(data.email); // true/false

    var pass = CryptoJs.MD5(data.password).toString(); // Encrption
    var cpass = CryptoJs.MD5(data.c_password).toString() // Encrption

    if (pass != cpass) {
      console.log("pass", pass);
      console.log("cpass", cpass);
    }

    if (data.name == ''){
      this.setState({ Nametext: "This Field is Requried" });
    }else if (data.phone == ''){
      this.setState({ Phonetext: "This Field is Requried" });
    }else if (data.email == ''){
      this.setState({ Emailtext: "This Field is Requried" });
    }else if(result1==false){
      this.setState({ Emailtext: "EmailId is Invalide" });
    }else if (data.password == ''){
      this.setState({ Passtext: "This Field is Requried" });
    }else if (data.password.length < 6) {
      this.setState({ Passtext: "Password Minimum Lenght 6 Digit" });
    }else if (data.c_password == ''){
      this.setState({ Cpasstext: "This Field is Requried" });
    }else if (pass!= cpass) {
      this.setState({ Cpasstext: "Password Does Not Match" });
    }else{
      this.setState({ Nametext: "" });
      this.setState({ Phonetext: "" });
      this.setState({ Emailtext: "" });
      this.setState({ Passtext: "" });
      this.setState({ Cpasstext: "" });
      alert("hello");
      //   $(".otp-button").text("Loading....");
      //   $(".otp-button").attr("disabled", true);
      //   Axios.post("/prodigypro/api/otp", dataphone)
      //   .then(function (response) {
      //     const items = response.data;
      //     // console.log(items);
      //     // alert("OTP send in Mobile No and Email Id");
      //     toast.success("OTP send in Mobile No and Email Id!");
      //     $(".otp-button").css({ "display": "none" });
      //     $(".otp-input").css({ "display": "block" });
      //   });
    }

  };

  verifyOTP = e => {
    e.preventDefault();
    const data = {
      otp: $("input[name=otp]").val(),
    };
    // alert(data.otp);
    if (data.otp.length >= 6) {
      Axios.post("/prodigypro/api/verifyOtp", data)
        .then(function (response) {
          const items = response.data;
          console.log(response);
          if(response.data.status == 400){
            toast.warning("OTP not matched!");
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

    var pass = CryptoJs.MD5(data.password).toString();
    var cpass = CryptoJs.MD5(data.c_password).toString()
    if (pass != cpass) {
      console.log("pass", pass);
      console.log("cpass", cpass);
    }

    if ((data.name == '') || (data.phone == '') || (data.email == '') || (data.password == '') || (data.c_password == '')) {
      // alert("All Field in Requried");
      // this.setState({ Fieldtext: "All Field in Requried" });
      toast.warning("All Field is Requried!");
    }
    // else if (typeof data.phone !== "undefined" && ) {

    //   var pattern = new RegExp(/^[0-9\b]+$/);
    //   if (!pattern.test(data.phone)) {
    //     // isValid = false;
    //     // errors["phone"] = "Please enter only number.";
    //     toast.warning("Please enter only number!");
    //   } else if (data.phone.length != 10) {
    //     // isValid = false;
    //     // errors["phone"] = "Please enter valid phone number.";
    //     toast.warning("Please enter valid phone number!");
    //   }
    // } 
    else if (pass != cpass) {
      // alert("Password Does Not Match");
      // this.setState({ Fieldtext: "Password Does Not Match" });
      toast.warning("Password Does Not Match!");
    } else if (data.password.length < 6) {
      // alert("Minimum Lenght 6 Digit");
      // this.setState({ Fieldtext: "Minimum Lenght 6 Digit" });
      toast.warning("Minimum Lenght 6 Digit!");
    } else {
      this.setState({ Fieldtext: "" });
      Axios.post("/prodigypro/api/registers", data)
        .then(function (response) {
          // console.log("response",response);
          if(response.data.data.status == 400){
            toast.warning(response.data.data.message);
          }else{
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
    // if (this.state.redirect) {
    //   return <Redirect to='/' />
    // }

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
                            <input type="text" name="fullname" className="input-text" placeholder="Full Name" onKeyUp={this.valid}/>
                            <spna className="text-danger pull-left">{this.state.Nametext}</spna>
                          </div>
                          <div className="form-group">
                            <input type="email" name="email" className="input-text" placeholder="Email Address"  onKeyUp={this.valid}/>
                            <spna className="text-danger pull-left">{this.state.Emailtext}</spna>
                          </div>
                          <div className="form-group">
                            <input type="text" name="mob" className="input-text" placeholder="Mobile Number"  onKeyUp={this.valid}/>
                            <spna className="text-danger pull-left">{this.state.Phonetext}</spna>
                          </div>
                          <div className="form-group">
                            <input type="password" name="Password" className="input-text" placeholder="Password"  onKeyUp={this.valid}/>
                            <spna className="text-danger pull-left">{this.state.Passtext}</spna>
                          </div>
                          <div className="form-group">
                            <input type="password" name="CnfPassword" className="input-text" placeholder="Confirm Password"  onKeyUp={this.valid}/>
                            <spna className="text-danger pull-left">{this.state.Cpasstext}</spna>
                          </div>
                          <div className="checkbox clearfix">
                            <div className="form-check checkbox-theme">
                              <input className="form-check-input" type="checkbox" defaultValue id="rememberMe" />
                              <label className="form-check-label" htmlFor="rememberMe">
                                I agree to the<a href="#" className="terms">Terms & Conditions</a>
                              </label>
                            </div>
                          </div>

                          <div className="form-group">
                            <button type="submit" className="btn-md btn-theme btn-block otp-button" onClick={this.getOtp}>Get OTP</button>
                          </div>
                        </form>
                        <form action="#" >
                          <div className="form-group otp-input">
                            <input type="text" name="otp" className="input-text" placeholder="Enter OTP" onKeyUp=
                              {this.verifyOTP} />
                          </div>
                          <div className="form-group">
                            <button type="submit" className="btn-md btn-theme btn-block submit-button" onClick={this.handleFromSubmit}>Submit</button>
                          </div>
                          <div className="checkbox clearfix">
                            <a href="#" onClick={this.getOtp}>Didn't Get, Resend OTP</a>
                          </div>
                        </form>
                        <p>Already a member? <a href="login-options">Login here</a></p>
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
