import React, { component } from 'react';
import Header from './header';
import Footer from './footer';
import Sidebar from './sidebar';
import { Helmet } from "react-helmet";
import StyleComponent from './styleComponent';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactTooltip from 'react-tooltip';
import '../../assets/css/iinstyle.css';
import { Link, Redirect } from 'react-router-dom';
import pdf from "../../assets/doc/SEBI-Circular-on-KYC.pdf";
import $ from 'jquery';
import Axios from 'axios';

class Needed_Info extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.submitForm = this.submitForm.bind(this);
        this.state = {
            tax_status: localStorage.getItem("taxStatus"),
            holding: localStorage.getItem("holding"),
            kycVerify_holder_1: localStorage.getItem("holder1_verify"),
            kycVerify_holder_2: localStorage.getItem("holder2_verify"),
            kycVerify_holder_1_pan: localStorage.getItem("jointHolder1"),
            kycVerify_holder_2_pan: localStorage.getItem("jointHolder2"),
            kycVerify_guardian: localStorage.getItem("guardian_verify"),
            kycVerify_guardian_pan: localStorage.getItem("guardian_pan"),
            kycVerify_primary: localStorage.getItem("primary_verify"),
            kycVerify_primary_pan: localStorage.getItem("primary_pan"),
            investor_name:localStorage.getItem("investor_name"),
          };
       
    }

    componentDidMount(){
        const fullpath = window.location.href;
        const answer_array = fullpath.split('?');
        
        if(answer_array[1]=='kyc-registration'){
            this.setState({IsEKYCVerified:"N"})
        }
        // guardian-one

        if(answer_array[1]=='guardian-one'){
            this.setState({kycVerify_guardian_pan:answer_array[2]})
            // this.setState({pan:answer_array[2]})
            this.setState({kycVerify_guardian:"N"})
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

            const userPanData = { 
                // primary_email: userData.email,
                pan: $("input[name=pan]").val(),
                email: $("input[name=email]").val(),
                mobile: $("input[name=mobile]").val(),
                kyc_sts: 0,
            };
            $("#overlay").css("display","block")
           Axios.post("/prodigypro/api/eKYC", userPan)
            .then((response) => {
                Axios.post("/prodigypro/api/detailsInsertionKycHolderTbl", userPanData)
                .then((result) => {
                    
                });

                $("#overlay").css("display","none")
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


    
   
    render() {

        let link;
        const isLink = this.state.link;
        const message = this.state.message;
        if(isLink){
            link = <div className="alert alert-info mt-4 text-center" role="alert"><span className="para">{message}</span></div>;
            window.open(this.state.link, '_blank');
        }   


        if(this.state.usertax){
            return <Redirect  to={{
                pathname: "/prodigypro/dashboard/pan-verification-dashboard",
                tax_status:this.state.tax_status,
                holding:this.state.holding,
                kycVerify_holder_1:this.state.kycVerify_holder_1,
                kycVerify_holder_2:this.state.kycVerify_holder_2,
                kycVerify_holder_1_pan:this.state.kycVerify_holder_1_pan,
                kycVerify_holder_2_pan:this.state.kycVerify_holder_2_pan,
                kycVerify_guardian:this.state.kycVerify_guardian,
                kycVerify_guardian_pan:this.state.kycVerify_guardian_pan,
                kycVerify_primary:this.state.kycVerify_primary,
                kycVerify_primary_pan:this.state.kycVerify_primary_pan,
                investor_name:this.state.investor_name,
            }} />
        }
        

        return (
            <>
                <Helmet>
                    <title>Pan Verification Dashboard</title>
                </Helmet>
                <StyleComponent />
                <style>
                    {`
			.text-color{
				color:#fff !important;
			}
           .mt-input{
                margin-top:3.5%;
            }
            .mt-btn{
                margin-top:12%;
            }
            #opt_box{
                display:none;
            }
            #add_member{
                display:none;
            }
            #load{
                display:none;
            }
            .text-info{
                display:none;
            }
            #load1{
                display:none;
            }
			 .panNo{
                text-transform: uppercase;
            }
            .dropdown-item.active
            {
                background-color:#e74a3b !important;
            }
            .container-fluid.m-0.p-0
            {
                background-color:#fff;
            }
            .btn-theme-effect.btn-color-green
            {
                border:none;
            }
            #minor{
                display:none;
            }
            #single{
                display:none;
            }
            #anyone{
                display:none;
            }
            #overlay{
                display:none;
            }
            .hold_1{
                font-size:1rem;
            }
            .content-center{
                margin-top:2rem;
                margin-bottom:2rem;
            }
            .font-circle i{
                font-size: 7px;
                margin-right: 10px;
            } p{
                font-size: 13px;
            }
          `}
                </style>
                <div id="overlay" >
                    <div class="spinner"></div>
                    <br /><b className="text-danger">Please Wait...</b>
                </div>
                {/* Page Wrapper */}
                <div id="wrapper">

                {/* Loader */}
                <div id="overlay" >
                    <div class="spinner"></div>
                    <br/>Loading...
                </div> 


                    {/* Sidebar */}
                    <Sidebar />
                    {/* End of Sidebar */}

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
                    {/* Content Wrapper */}
                    <div id="content-wrapper" className="d-flex flex-column">
                        {/* Main Content */}
                        <div id="content">
                            <ToastContainer position="top-right" className="mt-8" />
                            {/* Topbar */}
                            <Header />
                            {/* End of Topbar */}
                            <div className="container-fluid">
                                <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item"><a href="home">Home</a></li>
                                        <li className="breadcrumb-item active" aria-current="page">Needed Info</li>
                                    </ol>
                                </nav>


                                <div className="row">
                                    {/* Area Chart */}
                                    <div className="col-xl-12 col-lg-12">
                                        <div className="card shadow mb-3">
                                            <div className="card-body">
                                                <div className="col-12">
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
                                                    <div className="col-lg-4 col-md-4 offset-md-4 ">
                                                        <form action="#" method="Post" onSubmit={this.submitForm} >
                                                            <div className="col-12 mb-3">
                                                                <label>Enter PAN</label>
                                                                <input type="text" className="form-control " name="pan" placeholder="Enter Pan Number"  value={this.state.pan?this.state.pan:null}  readOnly/>
                                                                <small className="text-danger">{this.state.Pantext}</small>
                                                            </div>
                                                            <div className="col-12 mb-3">
                                                                <label>Enter Email</label>
                                                                <input type="text" className="form-control " name="email" placeholder="Enter Email Id" />
                                                                <small className="text-danger">{this.state.Emailtext}</small>
                                                            </div>
                                                            <div className="col-12 mb-3">
                                                                <label>Enter Mobile</label>
                                                                <input type="text" className="form-control " name="mobile" maxLength="10" placeholder="Enter Mobile Number" onKeyPress={(event) => {
                                                                    if (!/[0-9]/.test(event.key)) {
                                                                    event.preventDefault();
                                                                    }
                                                                }}   />
                                                                <small className="text-danger">{this.state.Phonetext}</small>
                                                            </div>
                                                            {/*  <div className="col-12 mb-3">
                                                        <a className="btn btn-danger shadow-sm w-100 text-color" id="getotp">Submit</a>      
                                                    </div> */}
                                                     <div className="pull-left mr-3">
                                                            <a class="btn-theme-1 btn-theme-effect previous action-button-previous" onClick={this.goBack}>
                                                                <span class="button-text">Back</span>
                                                                <span class="round"><i class="fa fa-chevron-left"></i></span>
                                                            </a>
                                                        </div>
                                                        <div className="pull-right mr-3">
                                                            <button class="btn-theme-1 btn-theme-effect sub_btn btn-color-green">
                                                                <span class="button-text">Submit</span>
                                                                <span class="round"><i class="fa fa-chevron-right"></i></span>
                                                            </button>
                                                        </div>
                                                        </form>
                                                       
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>


                        </div>

                        {/* End of Main Content */}
                        {/* Footer */}
                        <Footer />
                        {/* End of Footer */}
                    </div>

                </div>

            </>
        )
    }

}
export default Needed_Info