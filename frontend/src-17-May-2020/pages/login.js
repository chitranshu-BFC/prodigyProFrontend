import React, { component } from 'react';
import { Upperdiv, LoginLogo, Loader } from './reusable-content';
import $ from 'jquery';
import { Link, Redirect } from 'react-router-dom';
import Axios from 'axios';
// import { render } from 'react-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = { Emailtext: '' };
    this.valid = this.valid.bind(this);
    
    localStorage.removeItem("userLoggedId");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userPass");
    localStorage.removeItem("loginUserData");
    localStorage.removeItem("userPanNo");
    this.state = {
        msg: this.props.location.msg,
    };
    // if(localStorage.getItem("msg")!=''){
    //   toast.success(localStorage.getItem("msg"));
    // }
    // localStorage.setItem("msg","");

  }

   componentDidMount(){
    console.log("ss",this.state.msg);
    toast.success(this.state.msg);
  }

  valid(e) {
    
    const data = {
      email: $("input[name=email]").val(),
      password: $("input[name=password]").val(),
    };

    if (data.email != ''){
      this.setState({ Emailtext: "" });
    }

    if (data.password != ''){
      this.setState({ Passtext: "" });
    }

  }

  handleFormValidation = (data) => { 
  
    const emailRegex = /^[^@ ]+@[^@ ]+\.[^@ ]+$/;  // Email Validation
    const EmailValid = emailRegex.test(data.email)
    if (data.email == ''){
      var isValid= false;
      this.setState({ Emailtext: "Mandatory Field" });
    }else if(EmailValid==false){
      var isValid= false;
      this.setState({ Emailtext: "Email Id is Invalid" });
    }else{
      var isValid= true;
      this.setState({ Emailtext: "" });
    }

    if (data.password == ''){
      var isValid= false;
      this.setState({ Passtext: "Mandatory Field" });
    }else{
      var isValid= true;
      this.setState({ Passtext: "" });
    } 

    return isValid;
  }

  login = e => {
    e.preventDefault();

    // alert(hh);
    const data = {
      email: $("input[name=email]").val(),
      password: $("input[name=password]").val(),
      rememberMe: $('input[name="rememberMe"]:checked').val(),
    };

    if(this.handleFormValidation(data)){
      $(".login-btn").text("Loading....");
      $(".login-btn").attr("disabled", true);
      Axios.post("/prodigypro/api/login", data)
      .then((response) => {
        // localStorage.username = response.data.data.data.email;
        if (response.data.data.status == 200) {

          if(data.rememberMe=="R"){
            localStorage.setItem("rememberData",JSON.stringify(data));
          }else{
            localStorage.setItem("rememberData","");
          }

          localStorage.setItem("userLoggedId", response.data.data.data.userId)
          localStorage.setItem("userEmail", response.data.data.data.email)
          localStorage.setItem("loginUserData",JSON.stringify(response.data.data.data));
          localStorage.setItem("userPass", data.password)
          if(response.data.data.data.iin){
            console.log("userdata", response.data.data.data.iin);
            this.setState({iin:response.data.data})
          }else if(response.data.data.data.show_portfolio==1){
            this.setState({iin:response.data.data})
          }else{
            this.setState({pan:response.data.data})
          }

          toast.success(response.data.data.message)
        } else {
          // toast.error(response.data.data.message)
          if(response.data.data.message=="Invalid Password."){
            this.setState({Passtext:response.data.data.message})
          }else{
            this.setState({Emailtext:response.data.data.message})
          }
         
          $(".login-btn").text("Login");
          $(".login-btn").attr("disabled", false);
        }
        // console.log(response.data.data.data);
      })
      .then(() => this.setState(() => ({ redirect: true })))
    }
  };

  goBack = e => {
    window.history.back();
  }

  render() {

    // console.log("iin",JSON.parse(localStorage.getItem("rememberData")).email);
    if(this.state.iin){
      return <Redirect to='/prodigypro/dashboard' />
    }

    if(this.state.pan) {
      return <Redirect to='/prodigypro/pan-verification' />
    }
    
    return (
      <>
        <style>
          {`
          .logo-container{
            top: 10px;
           }
          .back-btn{
              position: relative;
              float: left;
              margin-left: 10px;
              top: 10px;
              background: #ff574d;
              color: #fff;
            }
            .btn-light:hover {
              background: #ec4a40;
              box-shadow: 0 0 35px rgb(0 0 0 / 10%);
              color: #fff;
            }
            .text-sm{
              font-size:14px;
              // color:#ff574d;
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
          `}
        </style>

        {/*<Loader/>*/}

        <div className={this.state.visible ? 'fadeIn' : 'fadeOut'} ></div>
        <div className="login-23">
          <div className="container">
            <div className="row">
              <ToastContainer position="top-right" className="mt-8" />
              <div className="offset-md-2 col-md-10">
                <div className="row login-box-12">
                  <div className="col-lg-7 col-sm-12 col-pad-0 align-self-center">
                    <LoginLogo />

                    {/* <button class="btn btn-light back-btn" onClick={this.goBack}><i className="fas fa-arrow-left"></i></button> */}
                    <button class="btn btn-light back-btn " onClick={this.goBack}>Back</button>
                    <br />
                    <br />
                    <div className="login-inner-form">
                      <div className="details">
                        <h3>Login With Email/User ID</h3>
                        {/* <spen className="text-danger pull-left">{this.state.Fieldtext}</spen> */}
                        <form action="#">
                          <div className="form-group">
                            <input type="email" name="email" className="input-text" placeholder="Email/User ID *"  defaultValue = {localStorage.getItem("rememberData")?JSON.parse(localStorage.getItem("rememberData")).email:null} onKeyUp={this.valid}/>
                            <small className="text-danger pull-left">{this.state.Emailtext}</small>
                          </div>
                          {/*<div className="form-group">
                            <input type="password" name="password" className="input-text"  defaultValue = {localStorage.getItem("rememberData")?JSON.parse(localStorage.getItem("rememberData")).password:null}   placeholder="Password *" onKeyUp={this.valid}/>
                            <small className="text-danger pull-left">{this.state.Passtext}</small>
                          </div> */}

                          
                           <div className="form-group">
                            <input type="password" name="password" className="input-text"  defaultValue = {localStorage.getItem("rememberData")?JSON.parse(localStorage.getItem("rememberData")).password:null}   placeholder="Password *" id='new_pass' onKeyUp={this.valid}/>
                            <div className="rounded-circle d-icon" >
                              <i class="fa fa-fw fa-eye-slash field_icon toggle-password" toggle="#password-field" ></i>
                            </div>
                            <small className="text-danger pull-left">{this.state.Passtext}</small>
                          </div>


                          <div className="checkbox clearfix">
                            <div className="form-check checkbox-theme">
                              <input className="form-check-input" type="checkbox" id="rememberMe" name="rememberMe" defaultChecked={localStorage.getItem("rememberData")?"Checked":null}  value="R" />
                              <label className="form-check-label" htmlFor="rememberMe">
                                Remember me
                          </label>
                            </div>
                            <Link to="/prodigypro/forget-password" className="">Forgot Password</Link>
                          </div>
                          <div className="form-group">
                            <button type="submit" className="btn-md btn-theme btn-block login-btn" onClick={this.login}>Login</button>
                          </div>
                        </form>
                        <p>Don't have an account?
                        <Link to="/prodigypro/registration" className=""><b>Register here</b></Link>
                        </p>
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
      </>
    )
  }

}
export default Login
