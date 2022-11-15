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
    this.state = {holder_1phontext:''};
  }

  componentDidMount(){
    const data = {
        email:localStorage.getItem("socialEmail"),
    };
    Axios.post("/prodigypro/api/user_details",data)
    .then((response) => {
        if (response.data.data.status == 200) {
            if((response.data.data.data.phone!=null) && (response.data.data.data.phone!="")){
                localStorage.setItem("userLoggedId", response.data.data.data.userId)
                localStorage.setItem("userEmail", response.data.data.data.email)
                localStorage.setItem("loginUserData",JSON.stringify(response.data.data.data));
                localStorage.setItem("userPass", data.password)
                console.log("userdata", response.data.data.data.iin);
                this.setState({pan:response.data.data})

                if(response.data.data.data.iin){
                  console.log("userdata", response.data.data.data.iin);
                  this.setState({iin:response.data.data})
                }
                else{
                  this.setState({pan:response.data.data})
                }
            }        
        } 
    })
  }


  formValidation = (data) =>{
    var mobPattern = /^(?:(?:\\+|0{0,2})91(\s*[\\-]\s*)?|[0]?)?[6789]\d{9}$/;
    const PhoneValid = mobPattern.test(data.phone);
    if (data.phone == '') {
      var isValid = false;
      this.setState({ holder_1phontext: "Mandatory Field" });
    } else if (PhoneValid == false) {
      var isValid = false;
      this.setState({ holder_1phontext: "Mobile No is Invalid" });
    } else {
       var isValid = true;
      this.setState({ holder_1phontext: "" });
    }
    return isValid;
  } 

  updateNo= e => {
    e.preventDefault();
    
    const data = {
        email:localStorage.getItem("socialEmail"),
        phone:$("input[name=mobileNo]").val(),
    };

    if(this.formValidation(data)){
     Axios.post("/prodigypro/api/user_details",data)
      .then((response) => {
        if (response.data.data.status == 200) {
          
            localStorage.setItem("userLoggedId", response.data.data.data.userId)
            localStorage.setItem("userEmail", response.data.data.data.email)
            localStorage.setItem("loginUserData",JSON.stringify(response.data.data.data));
            localStorage.setItem("userPass", data.password)
  
            if(response.data.data.data.iin){
              console.log("userdata", response.data.data.data.iin);
              this.setState({iin:response.data.data})
            }
            else if(data.email=="Veeru.harry2529@gmail.com"){
              this.setState({userVeeru:response.data.data})
            }
            else{
              this.setState({pan:response.data.data})
            }
            toast.success(response.data.data.message)
  
            
          } 
      })
      
    }

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

         .d-icon-tool{
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
                    <h3>Mobile No Update</h3>
                    <form action="#">
                      <div className="email-box">
                        <div className="form-group">
                          <input type="text" name="mobileNo" className="input-text" placeholder="Enter Mobile No *" onKeyUp={this.valid}/>
                          <small className="text-danger pull-left">{this.state.holder_1phontext}</small>
                        </div>
                        <div className="form-group">
                          <button type="button" className="btn-md btn-theme btn-block otp_btn" onClick={this.updateNo}>Submit</button>
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
