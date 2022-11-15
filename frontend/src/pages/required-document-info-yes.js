
import React, { component } from 'react';
import { Link,Redirect } from 'react-router-dom';
import {FaUsers, FaUniversity, FaUser} from "react-icons/fa";

class Required_Document_Yes extends React.Component {

 constructor(props) {
    super(props);
    this.state = { userQuery: '' };
    this.state = {
        holder_type: this.props.location.holder_type,
        kycVerify_holder_1: this.props.location.kycVerify_holder_1,
        kycVerify_holder_2: this.props.location.kycVerify_holder_2,
        IsEKYCHoder_1: this.props.location.IsEKYCHoder_1,
        IsEKYCHoder_2: this.props.location.IsEKYCHoder_2
    };
  }

  componentDidMount(){
    console.log("holder_type",this.state.holder_type)
  }

  goBack = e => {
    // window.history.back();
    this.setState({ usertax: "1" });
  }


  render() {
    // console.log("taxStatus",localStorage.getItem("taxStatus"))
     if(this.state.usertax){
      return <Redirect  to={{
          pathname: "/prodigypro/pan-verification",
          IsEKYCVerified:"Y",
          holder_type:this.state.holder_type,
          kycVerify_holder_1:this.state.kycVerify_holder_1,
          kycVerify_holder_2:this.state.kycVerify_holder_2,
          IsEKYCHoder_1:this.state.IsEKYCHoder_1,
          IsEKYCHoder_2:this.state.IsEKYCHoder_2,
      }} />
  }


    return (
      <>
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
        <div className="container-fluid">
        <div className="mx-4">
         <div className='row'>
          
          <div className="col-md-12">
            
            <div className="col-8 offset-md-2 ">
              <div className="alert alert-cust mt-4 text-center" role="alert">
                <span className="para">Please submit your details below and you’ll be set to invest.
                </span>
              </div>
            </div>

            <div className="parent-doc">
              <div className="row p-3">
                <div className="col-4 col-md-4">
                  <div className="shadow-theme border-0">
                    <div className='con-card'>
                  <div class="layer"></div>
                  <div className='cont-wrap'>
                    <div className="text-center">
                     



                    <FaUser className='fa-4x pt-3'/>
                      {/* <img src="assets/images/personal-detail.png" className="doc-img" /> */}
                      <h5 className='font-weight-bold'>Personal Details</h5>
                    </div>
                    <p className="doc-text fs-13">Submit here, the details needed to get you started. As per the pre-laid norms, submission of holders' personal details, such as his/her name, address, etc., is mandatory for registration.</p>
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
                    <FaUniversity className='fa-4x pt-3'/>
                      {/* <img src="assets/images/bank-2.png" className="doc-img" /> */}
                      <h5 className='font-weight-bold pt-2'>Bank Details</h5>
                    </div>
                    <p className="doc-text fs-13">Submission of bank details is mandatory for facilitating online transactions & redemption request. These include your bank account number, bank name, IFSC, etc. The primary holder is required to upload cheque with name printed or latest bank statement/bank passbook for verification.</p>
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
                    <p className="doc-text fs-13">Nomination facilitates smooth transaction of units held in a folio in case of unfortunate demise of units holders.
It is advisable to make a nomination for all investment folios.</p>
                  </div>
                </div>
                </div>
                </div>
              </div>
              <div className="pull-left mr-3 mt-5">
                <a href="javascript:void(0);" class="new-btn1" onClick={this.goBack}>
                  Back
                  
                </a>
              </div>
             
              <div className="pull-right mr-3 mt-5">
                <a href="required-details-form" class=" new-btn1">
                  Proceed
                  
                </a>
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
export default Required_Document_Yes
