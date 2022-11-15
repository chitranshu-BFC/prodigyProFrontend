import React, { component } from 'react';
import Vishal, { Upperdiv, LoginLogo } from './reusable-content';
import $ from 'jquery';
import Axios from 'axios';
// import cors from 'cors';
import jsonxml from 'jsontoxml';


class Registration extends React.Component {

  getOtp() {
    $(".otp-button").css({ "display": "none" });
    $(".submit-button").css({ "display": "block" });
    $(".otp-input").css({ "display": "block" });
  }
  handleSubmit = e => {
    e.preventDefault();

    const headers = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST',
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Max-Age': '3000',
      'Access-Control-Allow-Headers': ' Origin, Content-Type, X-Auth-Token, Accept, X-Requested-With',
      'Content-Type': 'application/json, charset=utf-8',
    };
    const PROXY_URL = 'https://cors-anywhere.herokuapp.com/';
    const URL = 'https://prodigypro.bfccapital.com/prodigypro/api/registers';

    const data = {
      name: $("input[name=fullname]").val(),
      phone: $("input[name=mob]").val(),
      email: $("input[name=email]").val(),
      password: $("input[name=Password]").val(),
      c_password: $("input[name=CnfPassword]").val()
    };
    // console.log("data ",data);
    Axios
      .post("/prodigypro/api/registers", data, { mode: 'cors' }, headers)
      .then(res => console.log(res))
      .catch(err => console.log(err));
    // Axios.post('/prodigypro/api/registers',
    // {data},
    // {headers:
    //   { 'Access-Control-Allow-Origin' : '*',
    //     'Access-Control-Allow-Methods': 'POST',
    //     'Access-Control-Allow-Credentials' : 'true',
    //     'Access-Control-Max-Age' :'3000',
    //     'Access-Control-Allow-Headers' : ' Origin, Content-Type, X-Auth-Token, Accept, X-Requested-With',
    //     'Content-Type': 'application/json, charset=utf-8',
    //   }
    // }).then((result) => {  
    //   console.log('success data inserted', result)
    //  });


    // Axios({
    //   method: 'post',
    //   url: PROXY_URL + URL,
    //   data: {
    //     "KEY": "VALUE"
    //   }
    // })
    //   .then(response => {
    //     console.log(response);
    //   })
    //   .catch(err => console.log(err));
  };

  render() {

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
              <div className="offset-md-2 col-md-10">
                <div className="row login-box-12">
                  <div className="col-lg-7 col-sm-12 col-pad-0 align-self-center">
                    <LoginLogo />
                    <div className="login-inner-form pt-5">
                      <div className="details">
                        <h3>Create an account</h3>
                        <form action="#" onSubmit={this.handleSubmit}>
                          <div className="form-group">
                            <input type="text" name="fullname" className="input-text" placeholder="Full Name" />
                          </div>
                          <div className="form-group">
                            <input type="email" name="email" className="input-text" placeholder="Email Address" />
                          </div>
                          <div className="form-group">
                            <input type="text" name="mob" className="input-text" placeholder="Mobile Number" />
                          </div>
                          <div className="form-group">
                            <input type="password" name="Password" className="input-text" placeholder="Password" />
                          </div>
                          <div className="form-group">
                            <input type="password" name="CnfPassword" className="input-text" placeholder="Confirm Password" />
                          </div>
                          <div className="checkbox clearfix">
                            <div className="form-check checkbox-theme">
                              <input className="form-check-input" type="checkbox" defaultValue id="rememberMe" />
                              <label className="form-check-label" htmlFor="rememberMe">
                                I agree to the<a href="#" className="terms">Terms & Conditions</a>
                              </label>
                            </div>
                          </div>
                          <div className="form-group otp-input">
                            <input type="text" name="otp" className="input-text" placeholder="Enter OTP" />
                          </div>
                          <div className="form-group">
                            <button type="button" className="btn-md btn-theme btn-block otp-button" onClick={this.getOtp}>Get OTP</button>
                          </div>

                          <div className="form-group">
                            <button type="submit" className="btn-md btn-theme btn-block submit-button">Submit</button>
                          </div>
                          <div className="checkbox clearfix">
                            <a href="#">Didn't Get, Resend OTP</a>
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
