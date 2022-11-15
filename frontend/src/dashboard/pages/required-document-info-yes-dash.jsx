import React, { component } from 'react';
import { Link,Redirect } from 'react-router-dom';
import Header from './header';
import Footer from './footer';

import { ToastContainer, toast } from 'react-toastify';
import '../../assets/css/iinstyle.css';
import {Helmet} from "react-helmet";
import {FaUsers, FaUniversity, FaUser} from "react-icons/fa";


class Required_Document_Yes_Dash extends React.Component {
  constructor(props) {
    super(props);
    this.state = { userQuery: '' };  
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
    console.log("data",this.state.kycVerify_guardian_pan);
  }

  goBack = e => {
    // window.history.back();
    this.setState({ usertax: "1" });
  }
  render() {
   
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
          <title> Required Document Yes</title>
        </Helmet>
        <style>
          {`
          .doc-img{
            max-width: 90px;
            padding: 10px;
          }
          .doc-text {
            padding: 0 10px;
          }
          .container-fluid.m-0.p-0
            {
                background-color:#fff;
            }
            .shadow-theme
            {
              position: relative;
    overflow: hidden;
    box-shadow: 5px 5px 10px #bfbfbf, -5px -5px 10px #ffffff;

            }
              
              .shadow-theme .layer {
                position:absolute;
                top:calc(100% - 2px);
                left:0;
                height:100%;
                width:100%;
                background:#fdf0f0;
                
                z-index:1;
                transition:0.5s;
              }
              
             
              .shadow-theme:hover .layer{
                top:0;
               
              }
              .shadow-theme:hover {
               
                
                color:#3A3A3A;
              
              }
              .cont-wrap
              {
                position:relative;
              z-index:2;
              }
            .image-and-name
            {
              text-align:center;
            }
            .col-12.offset-md-1.welcome-div-upper
            {
              right:82px;
            }
            .bgform .breadcrumb-nav
            {
              background-color:none!important;
            }
          `}
        </style>
         {/* Page Wrapper */}
      <div id="wrapper">
       


        {/* Content Wrapper */}
        <div id="content-wrapper" className="d-flex flex-column">
          {/* Main Content */}
          <div id="content">
          <ToastContainer position="top-right" className="mt-8" />
            {/* Topbar */}
                <Header/>
            {/* End of Topbar */}
            <div className="container-fluid">
            <nav aria-label="breadcrumb">
                        <ol className="breadcrumb-nav d-flex py-3">
                            <li className="breadcrumb-item"><a href="home">Home</a></li>
                            <li className="breadcrumb-item active" aria-current="page">Required Steps</li>
                        </ol>
                    </nav>
           
                   
           
                    
                                   
      
        
          <div className="col-10 offset-md-1 ">
              <div className="alert alert-cust mt-4 text-center" role="alert">
                <span className="para">Please submit your details below and you’ll be set to invest.
                </span>
              </div>
            </div>
            <div className="col-md-12">
            <div className="parent-doc-dash pt-2 px-4">
             
              {this.state.tax_status!="Minor"?
                <div className="row p-3 mb-4">
                <div className="col-4 col-md-4">
                <div className="shadow-theme border-0 ">
                    <div className='con-card'>
                  <div class="layer"></div>
                  <div className='cont-wrap'>
                    <div className="text-center">
                     



                    <FaUser className='fa-4x pt-3'/>
                     
                      <h5 className='font-weight-bold'>Personal Details</h5>
                    </div>
                    <p className="doc-text fs-14">Submit here, the details needed to get you started. As per the pre-laid norms, submission of holders' personal details, such as his/her name, address, etc., is mandatory for registration.</p>
                  </div>
                  </div>
                  </div>
                </div>

                <div className="col-4 col-md-4">
                <div className="shadow-theme border-0 ">
                  <div className='con-card'>
                  <div class="layer"></div>
                  <div className='cont-wrap'>
                    <div className="text-center">
                    <FaUniversity className='fa-4x pt-3'/>
                    
                      <h5 className='font-weight-bold pt-2'>Bank Details</h5>
                    </div>
                    <p className="doc-text fs-14">Submission of bank details is mandatory for facilitating online transactions & redemption request. These include your bank account number, bank name, IFSC, etc. The primary holder is required to upload cheque with name printed or latest bank statement/bank passbook for verification.</p>
                  </div>
                </div>
                </div>
                </div>

                <div className="col-4 col-md-4">
                <div className="shadow-theme border-0">
                  <div className='con-card'>
                  <div class="layer"></div>
                  <div className='cont-wrap'>
                    <div className="text-center">
                      <FaUsers className='fa-4x pt-3'/>
                      {/* <img src="assets/images/nomination.png" className="doc-img" /> */}
                      <h5 className='font-weight-bold'>Nomination</h5>
                    </div>
                    <p className="doc-text fs-14">Nomination facilitates smooth transaction of units held in a folio in case of unfortunate demise of units holders.
It is advisable to make a nomination for all investment folios.</p>
                  </div>
                </div>
                </div>
                </div>
                </div>
                :<div className="row p-5">
                <div className="col-6 col-md-6">
                <div className="shadow-theme border-0 ">
                    <div className='con-card'>
                  <div class="layer"></div>
                  <div className='cont-wrap'>
                    <div className="text-center">
                     



                    <FaUser className='fa-4x pt-3'/>
                      {/* <img src="assets/images/personal-detail.png" className="doc-img" /> */}
                      <h5 className='font-weight-bold'>Personal Details</h5>
                    </div>
                    <p className="doc-text fs-14">Submit here, the details needed to get you started. As per the pre-laid norms, submission of holders' personal details, such as his/her name, address, etc., is mandatory for registration.</p>
                  </div>
                  </div>
                  </div>
                </div>

                <div className="col-6 col-md-6">
                <div className="shadow-theme border-0 ">
                  <div className='con-card'>
                  <div class="layer"></div>
                  <div className='cont-wrap'>
                    <div className="text-center">
                    <FaUniversity className='fa-4x pt-3'/>
                      {/* <img src="assets/images/bank-2.png" className="doc-img" /> */}
                      <h5 className='font-weight-bold pt-2'>Bank Details</h5>
                    </div>
                    <p className="doc-text fs-14">Submission of bank details is mandatory for facilitating online transactions & redemption request. These include your bank account number, bank name, IFSC, etc. The primary holder is required to upload cheque with name printed or latest bank statement/bank passbook for verification.</p>
                  </div>
                </div>
                </div>
                </div>

                
                </div>}
<div className="row p-4">
  <div className="col-md-12">
              <div className="pull-left mr-3">
                <a href="javascript:void(0);" class="btn-custom" onClick={this.goBack}>
                  <span class="button-text fs-16">Back</span>
                 
                </a>
              </div>
             
              <div className="pull-right mr-3">
               {/*  <Link to="/prodigypro/dashboard/required-details-form-dash" class="btn-theme-2 btn-theme-effect btn-color-green">
                  <span class="button-text">Proceed</span>
                  <span class="round"><i class="fa fa-chevron-right"></i></span>
                </Link> */}
                <a href="/prodigypro/dashboard/required-details-form-dash" class="btn-custom">
                  <span class="button-text fs-16">Proceed</span>
                 
                </a>
              </div>
            </div>
            </div>
            </div>
        </div>
      </div>
      </div>
        <Footer/>

</div>
</div>


      </>
    )
  }

}
export default Required_Document_Yes_Dash
