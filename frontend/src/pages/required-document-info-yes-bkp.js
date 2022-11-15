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
          .p{
            padding-top: 20px;
          }
          .doc-text1 {
           
            font-size: 16px;
          }
        .shadow-theme
        {
        box-shadow: 5px 5px 10px #bfbfbf, -5px -5px 10px #ffffff;
        padding:40px;
        height:auto;
        margin:20px;
        }
          
       h4
       {
        color: #e06567;
       }
          `}
        </style>
        <div className="container-fluid m-0 p-0">
          <div className="col-12 bg-theme welcome-div-first text-center pt-2">
          <span className="para text-white font-weight-bold fs-16">Please submit your details below and you’ll be set to invest.
                </span>
          </div>
          <div className="col-12  welcome-div-upper ">
            {/* <div className="col-8 offset-md-2 ">
              <div className="alert alert-info mt-4 text-center" role="alert">
               
              </div>
            </div> */}
            <div className="parent-doc">
                <div className='container'>
              <div className="row p-3">
              {/* <div className= "col-md-1"></div> */}
                <div className= "col-md-12">
                  <div className="shadow-theme border-0">
                    <div className='row'>
                    <div className="col-md-5">
                      <img src="assets/images/Personal-Details-i.png" className="doc-img1 img-fluid" />
                      </div>
                      <div className='col-md-7'>
                      <h4 className='font-weight-bold p'>Personal Details</h4>
                    
                    <p className="doc-text1">Submit here, the details needed to get you started. As per the pre-laid norms, submission of holder’s personal details, such as his/her name, address, etc., is mandatory for registration.</p>
                  </div>
                  </div>
                  </div>
                  <div className="shadow-theme border-0">
                    <div className='row'>
                    <div className="col-md-5">
                    <img src="assets/images/bank2.png" className="doc-img1 img-fluid" /> 
                      </div>
                      <div className='col-md-7'>
                      <h4 className='font-weight-bold p'>Bank Details</h4>
                    
                      <p className="doc-text1">Submission of bank details is mandatory for facilitating online transactions. These include your bank account number, the name of your bank, the branch IFSC Code, etc. No redemption requests, or fund transfers can be processed without these. Primary holder is required to upload cheque with name printed or bank statement/bank passbook for verification.</p>
                  </div>
                  </div>
                  </div>
                  <div className="shadow-theme border-0">
                    <div className='row'>
                    <div className="col-md-5">
                    <img src="assets/images/nomin1.png" className="doc-img1 img-fluid" />
                      </div>
                      <div className='col-md-7'>
                      <h4 className='font-weight-bold p'>Nomination</h4>
                    
                      <p className="doc-text1">By naming a nominee in your investment you appoint a person to take care of the assets in your portfolio in the event of your demise. This is advisable to nominate for any new folios,wherein the holding is Single/Any one or survivor.</p>
                  </div>
                  </div>
                  </div>
                  </div>
                  </div>
                  {/* <div className= "col-md-1"></div> */}

              
              </div>
              <div className="pull-left mr-3">
                <a href="javascript:void(0);" class="btn-theme-1 btn-theme-effect btn-color-red" onClick={this.goBack}>
                  <span class="button-text">Back</span>
                  <span class="round"><i class="fa fa-chevron-left"></i></span>
                </a>
              </div>
             
              <div className="pull-right mr-3">
                <a href="required-details-form" class="btn-theme-1 btn-theme-effect btn-color-green">
                  <span class="button-text">Proceed</span>
                  <span class="round"><i class="fa fa-chevron-right"></i></span>
                </a>
              </div>
            </div>
            </div>
          </div>
      </>
    )
  }

}
export default Required_Document_Yes