import React, {component} from 'react';
import Header from './header';
import Footer from './footer';

import {Helmet} from "react-helmet";

import 'react-toastify/dist/ReactToastify.css';
// import Conservative from "../../assets/images/icons/New folder (2)/Riskometer.png";
// import Moderate from "../../assets/images/icons/New folder (2)/Riskometer.png";
 import Aggressive from "../../assets/images/icons/New folder (2)/Riskometer.png";
import { Link } from 'react-router-dom';
import riskp from "../../assets/images/icons/New folder (2)/risk-profile-vector.png";

class Know_Your_Risk extends React.Component{
   

   

    render(){
      
        return(
        <>
        <Helmet>         
            <title>Tax Planning - Lumpsum</title>
        </Helmet>
            <style>
          {`
            .card{
                min-height:420px;
            }
            #prod_div{
                display:none;
            }
            #Wait{
                display:none;
            }
            .center {
                display: block;
                margin-left: auto;
                margin-right: auto;
                width: 50%;
            }
			.text-color{
				color:#fff !important;
			}
            .navtop
            {
                display: inline-flex;
                font-size: 14px;
                background-color: hsla(0,0%,100%,.26);
                border: 1px solid #DA6066;
                border-radius: 50px;
                backdrop-filter: blur(26px);
                -webkit-backdrop-filter: blur(26px);
                padding: 4px;
              
            }
            .risk-shadow
             {
                background: #FFFFFF;
box-shadow: 0px 1px 8px rgba(0, 0, 0, 0.2);
border-radius: 15px;
padding: 15px 16px;
             } 
          `}
          </style>

        {/* Page Wrapper */}
      <div id="wrapper">
      
        {/* End of Sidebar */}


        {/* Content Wrapper */}
        <div id="content-wrapper" className="d-flex flex-column">
          {/* Main Content */}
          <div id="content">

            {/* Topbar */}
                <Header/>
            {/* End of Topbar */}

            {/* Begin Page Content */}
            
            <div className="container-fluid">
                {/* Page Heading */}
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><a href="home">Home</a></li>
                            <li className="breadcrumb-item">Advisory</li>
                            <li className="breadcrumb-item active" aria-current="page">Know Your Risk Profile</li>
                        </ol>
                    </nav>
<div className='container'>
                    <div className="row p-5 bg-c bg-light-red">
                        <div className='col-md-6'>
                        <form>
                    
                    <div className="col-12 mb-4 risk-shadow">
                        <p className="mb-2 font-weight-bold">1. I seek above average returns from my investments</p>
                        <div className="form-check-inline">
                            <label className="form-check-label">
                                <input type="radio" className="form-check-input" name="optradio1" value="Aggressive" /> Agree
                            </label>
                        </div>
                        <div className="form-check-inline">
                            <label className="form-check-label">
                                <input type="radio" className="form-check-input" name="optradio1" value="Moderate" /> Somewhat Agree
                            </label>
                        </div>
                        <div className="form-check-inline disabled">
                            <label className="form-check-label">
                                <input type="radio" className="form-check-input" name="optradio1" value="Conservative" /> Disagree
                            </label>
                        </div>
                    </div> 

                    <div className="col-12 mb-4 risk-shadow">
                        <p className="mb-2 font-weight-bold" >2. I am patient with my investments and can bear short term volatility in my portfolio</p>
                        <div className="form-check-inline">
                            <label className="form-check-label">
                                <input type="radio" className="form-check-input" name="optradio2" value="Aggressive" /> Agree
                            </label>
                        </div>
                        <div className="form-check-inline">
                            <label className="form-check-label">
                                <input type="radio" className="form-check-input" name="optradio2" value="Moderate"/> Somewhat Agree
                            </label>
                        </div>
                        <div className="form-check-inline disabled">
                            <label className="form-check-label">
                                <input type="radio" className="form-check-input" name="optradio2" value="Conservative" /> Disagree
                            </label>
                        </div>
                    </div> 

                    <div className="col-12 mb-4 risk-shadow">
                        <p className="mb-2 font-weight-bold">3. I have regular and stable source of income</p>
                        <div className="form-check-inline">
                            <label className="form-check-label">
                                <input type="radio" className="form-check-input" name="optradio3" value="Aggressive" /> Agree
                            </label>
                        </div>
                        <div className="form-check-inline">
                            <label className="form-check-label">
                                <input type="radio" className="form-check-input" name="optradio3" value="Moderate"/> Somewhat Agree
                            </label>
                        </div>
                        <div className="form-check-inline disabled">
                            <label className="form-check-label">
                                <input type="radio" className="form-check-input" name="optradio3" value="Conservative" /> Disagree
                            </label>
                        </div>
                    </div> 

                    <div className="col-12 mb-4 risk-shadow">
                        <p className="mb-2 font-weight-bold" >4. My outstanding debt/loan is low or that has been provisioned for</p>
                        <div className="form-check-inline">
                            <label className="form-check-label">
                                <input type="radio" className="form-check-input" name="optradio4" value="Aggressive" /> Agree
                            </label>
                        </div>
                        <div className="form-check-inline">
                            <label className="form-check-label">
                                <input type="radio" className="form-check-input" name="optradio4" value="Moderate"/> Somewhat Agree
                            </label>
                        </div>
                        <div className="form-check-inline disabled">
                            <label className="form-check-label">
                                <input type="radio" className="form-check-input" name="optradio4" value="Conservative"/> Disagree
                            </label>
                        </div>
                    </div> 
                    <div className="text-right">
                        <a href="#" className="btn-custom w-100  col-3">Submit</a>
                    </div>
                </form>

                        </div>
                        <div className="col-xl-6 col-lg-6">
                        <div className='col-md-12'>

<img src={riskp} alt="" className='img-fluid'/>
</div>
                            <div className="">
                               
                                <div className="card-body" id="img">
                               
                                    <div className="col-12 text-center" >                                    
                                    <img src={Aggressive} alt="" className='img-fluid'/>

                                      <h5 className='text-center py-4'>Your Risk Profile : Moderate</h5>
                                    </div>
                                   
                                </div>

                                <div className="card-body " id="Wait">
                                    <div className="col-12" >
                                        Please Wait...
                                    </div>
                                </div>
                              
                            </div>
                        </div>
                        
                    </div> 
                    <div className="row">
                                        <div className="col-6 mt-4 mb-3 text-left">
                                            <Link className="new-btn1 shadow-sm" to="/prodigypro/dashboard/advisory-lumpsum" >Back</Link>
                                        </div>
                                        <div className="col-6 mt-4 mb-3 text-right">
                                            <a className="new-btn1 shadow-sm" href="javascript:void(0);">Continue</a>
                                        </div>
                                    </div>  
                    </div>
                </div>

      </div>
          {/* End of Main Content */}
 {/*Purchase Modal */}
 {/* <div className="modal fade" id="sip_purchase" tabIndex={-1} role="dialog" aria-labelledby="sipTitle" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title text-danger" id="sipTitle">Investment Details</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">
                <form>
                    <div className="col mb-3">
                        <label htmlFor="Profile" >Select Profile</label>
                        <select className="form-control" onChange={this.userProfile} name="usersId">
                        <option value="">Select</option> 
                                     
                        </select>
                    </div>                 
                </form>
              </div>
              <div className="modal-footer">
                <a type="button" className="btn btn-danger shadow-sm" href="/prodigypro/dashboard/advisory-lum-cart">Continue</a>
              </div>
            </div>
          </div>
        </div> */}


          {/* Footer */}
          <Footer/>
          {/* End of Footer */}
        </div>
        {/* End of Content Wrapper */}
      </div>
      {/* End of Page Wrapper */}
        </>
        )
    }
    
}
export default Know_Your_Risk
