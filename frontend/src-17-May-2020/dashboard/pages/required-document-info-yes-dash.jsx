import React, { component } from 'react';
import { Link,Redirect } from 'react-router-dom';
import Header from './header';
import Footer from './footer';
import Sidebar from './sidebar';
import { ToastContainer, toast } from 'react-toastify';
import '../../assets/css/iinstyle.css';
import {Helmet} from "react-helmet";


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
            .image-and-name
            {
              text-align:center;
            }
            .col-12.offset-md-1.welcome-div-upper
            {
              right:82px;
            }
          `}
        </style>
         {/* Page Wrapper */}
      <div id="wrapper">
        {/* Sidebar */}
            <Sidebar/>
        {/* End of Sidebar */}


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
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><a href="home">Home</a></li>
                            <li className="breadcrumb-item active" aria-current="page">Required Document Info yes</li>
                        </ol>
                    </nav>
           
                    </div>
           
                    <div className="row">
                        <div className="col-xl-12 col-lg-12">
                            <div className="card shadow mb-3">
                            <div className="card-body">
                                    <div className="col-12">
                                   
          {/* <div className="col-12 bg-theme welcome-div-first"></div> */}
          <div className="col-12 offset-md-1 welcome-div-upper ">
            <div className="col-8 offset-md-2 ">
              <div className="alert alert-info mt-4 text-center" role="alert">
                <span className="para">Please submit your details below and you’ll be set to invest.
                </span>
              </div>
            </div>

            <div className="parent-doc">
              <div className="row p-3">
                <div className="col-4 col-md-4">
                  <div className="shadow-theme">
                    <div className="image-and-name">
                      <img src="../assets/images/personal-detail.png" className="doc-img" />
                      <h5>Personal Details</h5>
                    </div>
                    <p className="doc-text">Submit here, the details needed to get you started. As per the pre-laid norms, submission of holder’s personal details, such as his/her name, address, etc., is mandatory for registration.</p>
                  </div>
                </div>

                <div className="col-4 col-md-4">
                  <div className="shadow-theme">
                    <div className="image-and-name">
                      <img src="../assets/images/bank-details.png" className="doc-img" />
                      <h5>Bank Details</h5>
                    </div>
                    <p className="doc-text">Submission of bank details is mandatory for facilitating online transactions. These include your bank account number, the name of your bank, the branch IFSC Code, etc. No redemption requests, or fund transfers can be processed without these. Primary holder is required to upload cheque with name printed or bank statement/bank passbook for verification.</p>
                  </div>
                </div>

                <div className="col-4 col-md-4">
                  <div className="shadow-theme">
                    <div className="image-and-name">
                      <img src="../assets/images/nomination.png" className="doc-img" />
                      <h5>Nomination</h5>
                    </div>
                    <p className="doc-text">By naming a nominee in your investment you appoint a person to take care of the assets in your portfolio in the event of your demise. This is advisable to nominate for any new folios,wherein the holding is Single/Any one or survivor.</p>
                  </div>
                </div>
              </div>
              <div className="pull-left mr-3">
                <a href="javascript:void(0);" class="btn-theme-1 btn-theme-effect btn-color-red" onClick={this.goBack}>
                  <span class="button-text">Back</span>
                  <span class="round"><i class="fa fa-chevron-left"></i></span>
                </a>
              </div>
             
              <div className="pull-right mr-3">
                <Link to="/prodigypro/dashboard/required-details-form-dash" class="btn-theme-2 btn-theme-effect btn-color-green">
                  <span class="button-text">Proceed</span>
                  <span class="round"><i class="fa fa-chevron-right"></i></span>
                </Link>
              </div>
            </div>
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
