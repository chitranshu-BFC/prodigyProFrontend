import React, {component} from 'react';
import {Upperdiv,LoginLogo,Loader}  from './reusable-content';
import $ from 'jquery';
import { Link,Redirect } from 'react-router-dom';
import Axios from 'axios';
import pdf from "../assets/doc/SEBI-Circular-on-KYC.pdf";

class Needed_Info extends React.Component{
    constructor(props) {
        super(props);
        this.state = {Emailtext:''};
        //this.valid = this.valid.bind(this);
        this.submitForm = this.submitForm.bind(this);
    }

    // valid(e) {
    //     const data = { 
    //         pan: $("input[name=pan]").val(),
    //         email: $("input[name=email]").val(),
    //         mobile: $("input[name=mobile]").val(),
    //     };

    //     if (data.pan != '') {
    //         this.setState({ Pantext: "" });
    //     }
      
    //     if (data.email != '') {
    //         this.setState({ Emailtext: "" });
    //     }
      
    //     if (data.mobile != '') {
    //         this.setState({ Phonetext: "" });
    //     }
    // }

    componentDidMount(){
        const fullpath = window.location.href;
        const answer_array = fullpath.split('?');
        
        if(answer_array[1]=='kyc-registration'){
            this.setState({IsEKYCVerified:"N"})
        }

        if(answer_array[1]=='holder-one'){
            this.setState({IsEKYCHoder_1:answer_array[2]})
            this.setState({pan:answer_array[2]})
            this.setState({IsEKYCVerified:"Y"})
        }

        if(answer_array[1]=='holder-two'){
            this.setState({pan:answer_array[2]})
            this.setState({IsEKYCHoder_2:answer_array[2]})
            this.setState({IsEKYCVerified:"Y"})
        }
    }

    formValidation = (data) => {
        let dataErr = [];
        if (data.pan == '') {
            var isValid = {email:"1"};
            dataErr.push(isValid);
            this.setState({ Pantext: "Mandatory Field" });
        } else if (data.pan.length < 10) {
             var isValid = {email:"1"};
             dataErr.push(isValid);
            this.setState({ Pantext: "Please enter valid Pan!" });
        } else {
            var isValid = true;
            this.setState({ Pantext: "" });
        }
          
        const emailRegex = /^[^@ ]+@[^@ ]+\.[^@ ]+$/;  // Email Validation
        const EmailValid = emailRegex.test(data.email)
        if (data.email == ''){
            var isValid = {email:"1"};
            dataErr.push(isValid);
            this.setState({ Emailtext: "Mandatory Field" });
        }else if(EmailValid==false){
            var isValid = {email:"1"};
            dataErr.push(isValid);
            this.setState({ Emailtext: "Email Id is Invalid" });
        }else{
            var isValid= true;
            this.setState({ Emailtext: "" });
        }

        //mobile No validation
        var mobPattern = /^(?:(?:\\+|0{0,2})91(\s*[\\-]\s*)?|[0]?)?[6789]\d{9}$/;
        const PhoneValid = mobPattern.test(data.mobile);
        if (data.mobile == '') {
            var isValid = {email:"1"};
            dataErr.push(isValid);
            this.setState({ Phonetext: "Mandatory Field" });
        } else if (PhoneValid == false) {
            var isValid = {email:"1"};
            dataErr.push(isValid);
            this.setState({ Phonetext: "Please enter Valid Mobile No!" });
        } else {
            var isValid = true;
            this.setState({ Phonetext: "" });
        }

     return dataErr.length;
    }

    submitForm(e) {
        e.preventDefault();
       
        const userPan = { 
            pan: $("input[name=pan]").val(),
            email: $("input[name=email]").val(),
            mobile: $("input[name=mobile]").val(),
        };

        // alert(JSON.stringify(userPan));
        const userData = JSON.parse(localStorage.getItem("loginUserData"))
   
        if(this.formValidation(userPan)==0){
            $(".sub_btn").html('Loading...');
            Axios.post("/prodigypro/api/eKYC", userPan)
            .then((response) => {
                $(".sub_btn").html('Submit');
                let data = response.data.data;
                if(data.status==200){
                    window.$('#exampleModalCenter').modal('show');
                    this.setState({alertMsg:"Hi....("+userData.name+"), You shall get  an intimation regarding  KYC REGISTRATION  on your  registered mail id in next 24 hours,  in case the  KYC procedure was successfully completed .  Following which, you can start your investment journey"})
                    this.setState({ message: data.message });
                    this.setState({ link: data.data.link});
                }else{
                    this.setState({ message: "Invalide Data" });
                }
                console.log(response.data.data);
            })
        }
    }

    goBack = e => {
        // window.history.back();
        this.setState({link:""})
        this.setState({ usertax: "1" });
    }



    render(){
        if (localStorage.getItem("userLoggedId") == null) {
            return <Redirect to='/prodigypro' />
        }



        let link;
        const isLink = this.state.link;
        const message = this.state.message;
        if(isLink){
            link = <div className="alert alert-info mt-4 text-center" role="alert"><span className="para">{message}</span></div>;
            window.open(this.state.link, '_blank');
        }   


         if(this.state.usertax){
            return <Redirect  to={{
                pathname: "/prodigypro/pan-verification",
                IsEKYCVerified:this.state.IsEKYCVerified,
                IsEKYCHoder_1:this.state.IsEKYCHoder_1,
                IsEKYCHoder_2:this.state.IsEKYCHoder_2,
            }} />
        }



        return(
        <>
        <style>
        {`
        body{
          background-color:#f2f3f7;    
        }
        .welcome-div-upper{
            background-color:#fff;
        }
        
            .form-control{
            border-radius: 1.25rem;
            height: calc(2.25rem + 6px);
            }
        .form-control:focus {
            color: #495057;
            background-color: #fff;
            border-color: #ced4da !important;
            outline: 0;
            box-shadow: none;
            border-radius: 1.25rem;
            height: calc(2.25rem + 6px);
        }
        
        .content-center{
            margin-top:2rem;
            margin-bottom:2rem;
        }
        .font-circle i{
            font-size: 7px;
            margin-right: 10px;
        }
        `}
        </style>
           {/* Message model */}
       <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true" data-keyboard="false" data-backdrop="static">
            <div class="modal-dialog modal-dialog-centered" role="document">
              <div class="modal-content">
                
                <div class="modal-body">
                  <p className="text-dark font-weight-bold">
                    {this.state.alertMsg}
                  </p>
                  <div className="text-center">
                    <button type="button" class="btn btn-primary" data-dismiss="modal">OK</button>
                  </div>
                </div>
                {/* <div class="modal-footer">
                
                </div> */}
              </div>
            </div>
          </div>


        <div className="container-fluid m-0 p-0">
            <div className="col-12 bg-theme welcome-div-first"></div>
            <div className="col-10 offset-md-1 welcome-div-upper ">  
                <div className="col-12 ">
                    <div className="alert alert-info mt-4 text-center" role="alert">
                        <span className="para">
                            {/* <h3>eKYC Registration</h3> */}
                            <h3>KYC (Know Your Client)</h3>
                            <h6 className="text-left text-danger">Note:</h6>
                            <p className="text-left"><span className="font-circle"><i class="fa fa-circle" aria-hidden="true"></i></span>As per regulatory provisions, KYC is a one time mandatory process of identifying and verifying a client's identity and his/her related details before start investing. For more detail <span><a href={pdf} target="_blank">Click Here</a></span>.</p>
                            <p className="text-left"><span className="font-circle"><i class="fa fa-circle" aria-hidden="true"></i></span>Kyc Updation is required everytime in case of change in address, contact details, Marital Status & Tax. Residential Status.</p>
                             <p className="text-left"><span className="font-circle"><i class="fa fa-circle" aria-hidden="true"></i></span>While completing KYC process "Kotak Mutual Fund' acts as a facilitator".</p>
                            <h6 className="text-left text-danger">Points to be kept in mind when submitting KYC:</h6>
                            <p className="text-left"><span className="font-circle"><i class="fa fa-circle" aria-hidden="true"></i></span>Aadhaar Linked Mobile Number should be active for authentication.</p>
                            <p className="text-left"><span className="font-circle"><i class="fa fa-circle" aria-hidden="true"></i></span>This process is only for First Time Kyc User, and should be completed in one go. To check KYC status <span><a href="https://www.karvykra.com/UPanSearchGlobalWithPanExempt.aspx" target="_blank">Click Here</a></span>.</p>
                            <p className="text-left"><span className="font-circle"><i class="fa fa-circle" aria-hidden="true"></i></span>For registering through the Non-Aadhaar option, the User needs to upload an Aadhaar’s masked copy. Also, the last 4 digits of the Aadhaar need to be mentioned in Document Number column to avoid rejection</p>
                        </span>   
                    </div>
                    {/* {link} */}
                </div>
          
                <div className="parent-doc">
                    <form action="#" method="Post" onSubmit={this.submitForm} >
                    <div className="row p-3">
                    <div className="col-4 col-md-4 offset-md-4"> 
                        <span className="has-float-label mb-4">
                            <input className="form-control input-text" name="pan" id="pan" type="text" value={this.state.pan?this.state.pan:localStorage.getItem("userPanNo")}  placeholder="Enter PAN"  readOnly/>
                            <label for="pan" className="text-label">PAN <span className="text-danger">*</span></label>
                            <small className="text-danger">{this.state.Pantext}</small>
                        </span> 
                        <span className="has-float-label mb-4">
                            <input className="form-control input-text" name="email" id="email" type="text" placeholder="Enter Email"  />
                            <label for="email" className="text-label">Email <span className="text-danger">*</span></label>
                            <small className="text-danger">{this.state.Emailtext}</small>
                        </span>
                        <span className="has-float-label mb-4">
                            <input className="form-control input-text" name="mobile" id="mobileNo" type="text" maxLength="10" placeholder="Enter Mobile Number" onKeyPress={(event) => {
                                    if (!/[0-9]/.test(event.key)) {
                                    event.preventDefault();
                                    }
                                }}  />
                            <label for="pmobilean" className="text-label">Mobile Number <span className="text-danger">*</span></label>
                            <small className="text-danger">{this.state.Phonetext}</small>
                        </span>
                        
                    </div>  
                    </div>
                    <div className="pull-left mr-3">
                        <a class="btn-theme-1 btn-theme-effect previous action-button-previous"   onClick={this.goBack}>
                            <span class="button-text">Back</span>
                            <span class="round"><i class="fa fa-chevron-left"></i></span>
                        </a>
                    </div>
                    <div className="pull-right mr-3">
                        <button  class="btn-theme-1 btn-theme-effect sub_btn btn-color-green">
                            <span class="button-text">Submit</span>
                            <span class="round"><i class="fa fa-chevron-right"></i></span>
                        </button>
                    </div>
                </form>
                </div>
            </div>
        </div>
        </>
        )
    }
    
}
export default Needed_Info
