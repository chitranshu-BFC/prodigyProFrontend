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

    // Email Validation
    const emailRegex = /^[a-zA-Z0-9_!#$%&'*+/=?`{|}~^.-]+@[a-zA-Z0-9.-]+$/;  
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
         .then((response) =>  {
            console.log("response",response.data.data.status);
            const items = response.data;
            if(response.data.data.status==400){
              $(".otp-button").text("GENERATE OTP");
              $(".otp-button").attr("disabled", false);

              if(response.data.data.emailErr){
                this.setState({ Emailtext: response.data.data.emailErr });
              }

              if(response.data.data.MobileErr){
                this.setState({ Phonetext: response.data.data.MobileErr });
              }
              
            }else{
              $(".otp-button").css({ "display": "none" });
              $(".otp-input").css({ "display": "block" });
              this.setState({ otptext: "OTP has been sent on Mobile Number & Email Id!" })
            }
            
          })
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
        .then((response)=> {
          const items = response.data;
          // console.log(response);
          
          if (response.data.status == 400 || response.data.error == 1) {
            this.setState({ otptext: "Invalid OTP" })
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

    if (this.handleFormValidation()==0) {
      Axios.post("/prodigypro/api/registers", data)
        .then((response) =>{
          console.log("response",response);
          if (response.data.data.status == 400) {
            toast.warning(response.data.data.message);
          } else {
            this.setState({ redirect: true });
            const items = response.data.data.status;
            localStorage.setItem("msg", "Your Email ID successfully registered");
            this.setState({msg:"Registration Sucessful."})
            // toast.success(response.data.data.message);
          }
        })
        //.then(() => this.setState(() => ({ redirect: true })));
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
    //   return  window.location.href = "https://bfccapital.com/prodigypro/"
    // }

      if (this.state.msg) {
        return <Redirect  to={{
                pathname: "/prodigypro/",
                msg:this.state.msg,
            }} />
        //return  window.location.href = "https://bfccapital.com/prodigypro/"
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
         
        .wd{
          width:100%;
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
         .text-color{
           color:#000000;
         }

          `}
        </style>

          {/* T&C Modal */}
        <div class="modal fade bd-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
          <div class="modal-dialog modal-lg">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLongTitle" className="text-color text-bold">Terms & Conditions</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
			  {/* <p className="text-color">'BFC Capital is an AMFI registered distributor and advisor of mutual funds and enables Users to purchase units of various mutual funds, details of which shall be made available on the mobile app, from time to time.</p> */}
			  <p className="text-color">BFC Capital is an MFD which enables Users to purchase units of various mutual funds, details of which shall be made available on this platform, from time to time.</p>

                <p className="text-color">User investment Account will be activated after BFC Capital completes the verification process on the personal information provided at the time of enrolment and in accordance with the Know Your Client (“KYC“) guidelines issued by the Securities and Exchange Board of India (“SEBI”).</p>

                <p className="text-color">The software and hardware underlying the Websites as well as other internet related software which is required for accessing the Website are the legal property of the respective vendors. The permission given by BFC Capital to access the Mobile App will not convey any proprietary or ownership rights in the above software/ hardware. User agrees that user shall not attempt to modify, translate, disassemble, decompile or reverse engineer the software/hardware underlying the Website or create any derivative product based on the software / hardware.</p>

                <p className="text-color">BFC Capital has the absolute discretion to amend or supplement any of the Terms and Conditions at any time without prior notice for such changes. Any such amendment shall be effective immediately. It shall be Users responsibility to review the Terms and Conditions periodically for any updates/changes.</p>

                <p className="text-color">User hereby irrevocably and unconditionally grants no objection to BFC Capital and the respective mutual funds / RTAs to collate the transaction details relating to the investments in mutual fund units done by user on the online technology platform of BFC Capital and provide such transaction data to BFC Capital for further processing of user transactions.</p>


                <p className="text-color">There may be an exit load applicable to certain mutual fund schemes which is mentioned in the respective offer documents including Scheme Information Document (SID) /Key Information Memorandum (KIM) and addendums issued thereto from time to time collectively referred to as "Scheme Related Documents".User shall read all the Scheme Related Documents before making any transaction on this mobile app.</p>

                <p className="text-color">While we will make every effort to have its computer systems available at all times, BFC Capital makes no guarantees with respect to the availability of such systems. We will make every effort to resolve availability issues such as network problems, virus attacks etc. in an expeditious manner. Notwithstanding these, BFC Capital will as such not be liable for any loss, damage, cost, charges or expenses directly or indirectly caused by reasons of lack of such availability.</p>

                <p className="text-color">All disputes and differences arising out of, under or in connection with the Terms and Conditions or anything done hereunder shall be within the exclusive jurisdiction of the courts at Lucknow. The Terms and Conditions are subject to and shall be construed in accordance with the laws prevalent in India.</p>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>

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
                            <input type="text" name="fullname" id='regfullname' className="input-text" placeholder="Full Name *" ref="fullname" tab-index="-1" autoFocus onKeyUp={this.onChange} />
                            <small className="text-danger pull-left">{this.state.Nametext}</small>
                          </div>
                          <div className="form-group">
                            <input type="email" name="email" ref="email" className="input-text" placeholder="Email Address *" onKeyUp={this.onChange} />
                            <small className="text-danger pull-left">{this.state.Emailtext}</small>
                          </div>
                          <div className="form-group">
                            <input type="text" name="mob" className="input-text" placeholder="Mobile Number *" onKeyUp={this.onChange} />
                            <small className="text-danger pull-left">{this.state.Phonetext}</small>
                          </div>
                          <div className="form-group">
                            <div className="d-flex">
                              <input type="password" name="Password"  class="input-text w-100" placeholder="Password *" onKeyUp={this.onChange}/>
                            </div>
                            <div className="bg-info rounded-circle d-icon" >
                              <i class="fa fa-info" data-tip data-for="registerTip" ></i>
                            </div>
                            <ReactTooltip id="registerTip" place="top" effect="solid">
                              <div className="tool_tip">
                                The password should Alpha-numeric with atleast 1 Capital & Special character ( Ex- Abc123@ )
                              </div>
                            </ReactTooltip>
                            
                            <small className="text-danger pull-left top-text"><br></br>{this.state.Passtext}</small> 
                          </div>
                          <div className="form-group">
                            <div className="d-flex wd">
                              <input type="password" name="CnfPassword" id="new_pass" className="input-text" placeholder="Confirm Password *" onKeyUp={this.onChange} />
                            </div>
                            <div className="rounded-circle d-icon" >
                              <i class="fa fa-fw fa-eye-slash field_icon toggle-password" toggle="#password-field" ></i>
                            </div>
                            <small className="text-danger pull-left">{this.state.Cpasstext}</small>
                          </div>
                          <div className="checkbox clearfix">
                            <div className="form-check checkbox-theme">
                              <input className="form-check-input" value="1" name="tac" type="checkbox" defaultValue id="rememberMe" onChange={this.onChange}/>
                              <label className="form-check-label" htmlFor="rememberMe">
                                I agree to the<a href="#"  data-toggle="modal" data-target=".bd-example-modal-lg"  className="terms">Terms & Conditions</a>
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
                            <input type="text" name="otp" className="input-text" placeholder="Enter OTP *" onKeyUp=
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
                        <p>Already Registered? <a href="prodigypro/">Login here</a></p>
						<div className="text-left mt-2">
							<span className="text-sm font-italic ">*Here you can monitor your MF Portfolio, Execute Transactions and select a suitable Mutual Fund scheme for yourself.
							</span>
						</div>
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
