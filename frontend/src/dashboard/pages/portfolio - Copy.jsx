import React from 'react';
import Header from './header';
import Footer from './footer';
import Sidebar from './sidebar';
import {Helmet} from "react-helmet";
import {Transact_Icon_Group} from './short-components';
import Axios from 'axios';
import $ from 'jquery';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class Portfolio extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      users: []
    };

    this.state = {
      Items: []
    };
  }

  componentDidMount(){
    const userData = JSON.parse(localStorage.getItem("loginUserData"))
    let data = [];
    const value = {
      pan_card:userData.pan_card,
    }
    Axios.post("/prodigypro/api/portfolio", value)
    .then((result) => {
      console.log("userData",result.data.data.data)
      this.setState({userData:result.data.data.data})
      result.data.data.data.map((val)=>{
        const data2 = {
          panCard:val.pan,
          name:val.name,
        }

        Axios.post("/prodigypro/api/portfolioDetailApi", data2)
        .then((res) => {
          console.log("userData",res.data.data.data.portfolio_data)
          res.data.data.data.portfolio_data.map((val)=>{
            data.push(val)
            this.setState({userDetailData:data})
          })
        
        })

      })
    })
  }

    render(){
        let data=[];  let table='';  let table2='';
      // console.log("sdcds",this.state.userDetailData)
      
      if(this.state.userData){
        for (var i = 0; i < this.state.userData.length; i++) {
           table = <tr>
                               <th scope="row" className="text-primary">{this.state.userData[i].name} [ PAN : {this.state.userData[i].pan} ]</th>
                               <td></td>
                               <td></td>
                               <td></td>
                               <td></td>
                               <td></td>
                               <td></td>
                               <td></td>
                               <td></td>
                               <td></td>
                               <td></td>
                               <td></td>
                    </tr>
      // if(this.state.userDetailData){
      //   this.state.userDetailData.map((key)=>{
      //     if(key.pan==this.state.userData[i].pan){
      //       // console.log("type",key.type)
      //       if(key.type=="DEBT"){
      //         table2 =  <tr>
      //         <th scope="row" className="text-info">{key.type}</th>
      //         <td></td>
      //         <td></td>
      //         <td></td>
      //         <td></td>
      //         <td></td>
      //         <td></td>
      //         <td></td>
      //         <td></td>
      //         <td></td>
      //         <td></td>
      //         <td></td>
      //       </tr>
      //        data.push(table2)
      //       }else{
      //         table2 =  <tr>
      //         <th scope="row" className="text-info">{key.type}</th>
      //         <td></td>
      //         <td></td>
      //         <td></td>
      //         <td></td>
      //         <td></td>
      //         <td></td>
      //         <td></td>
      //         <td></td>
      //         <td></td>
      //         <td></td>
      //         <td></td>
      //     </tr>
      //      data.push(table2)
      //       }
      //     }
      //   })
      // }
        data.push(table)
              
       }
      }
        return(
        <>
        <Helmet>         
            <title>Prodigy Pro - Portfolio</title>
        </Helmet>
            <style>
          {`
.mt-input{
    margin-top:3.5%;
}
.mt-btn{
    margin-top:12%;
}
.filter-card-body{
    padding-top: .5rem;
    padding-bottom: .5rem;
    padding-left: 1.25rem;
    padding-right: 1.25rem;
}
th{
    white-space: nowrap;
}
.table td, .table th {
    padding: .60rem;
    font-size:14px;
}

.no-wrap-ws{
    white-space: nowrap;
}
.table-responsive{
    height: 500px !important;
}
.table-responsive thead { 
    position: sticky;
     top: 0; 
     z-index: 1;
 }
 .table-responsive tfoot { 
    position: sticky;
     bottom: 0; 
     z-index: 1;
 }
 .icon-contain{
    height:22px;
    width:22px;
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

            {/* Topbar */}
                <Header/>
            {/* End of Topbar */}

            {/* Begin Page Content */}
            <div className="container-fluid">
                {/* Page Heading */}
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><a href="home">Home</a></li>
                            <li className="breadcrumb-item active" aria-current="page">Portfolio </li>
                        </ol>
                    </nav>

        <div className="row">
                    {/* Area Chart */}
            <div className="col-xl-12 col-lg-12">
                <div className="card shadow mb-3">
                        {/* Card Header - Dropdown */}
                            <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                <h6 className="m-0 font-weight-bold text-danger">Portfolio -  Report On Unrealized Gains Only</h6> 
                            </div>
                            {/* Card Body */}
                    <div className="card-body filter-card-body">
                        <div className="row">
                            <div className="col-lg-3 col-md-4 col-sm-6 ">
                                <label>Select Applicant Name</label>                                
                                <select className="form-control input-text" name="userPro_id" onChange={this.userProfile}>
                                <option value="">Select Profile</option>
                                {this.state.userList?
                                      this.state.userList.map((item, key) =>
                                          <option value={item.id}>{item.investor_name} {item.jh1_name!="undefined" ? " | "+item.jh1_name:null}{item.jh2_name!="undefined" ? " | "+item.jh2_name:null}</option>
                                        ):null}
                                </select>
                             </div>
                             <div className="col-lg-3 col-md-3 col-sm-6">
                                <div class="form-group">
                                    <label>As On Date</label>
                                    <div class="input-group">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text">
                                            <i class="far fa-calendar-alt"></i>
                                            </span>
                                        </div>
                                    <input type="date" className="form-control" />
                                        </div>
                                    </div>
                             </div>
                             <div className="col-lg-3 col-md-3 col-sm-6 ">
                                        <label>Select Category</label>
                                        <select className="form-control">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        </select>
                             </div>
                             <div className="col-lg-3 col-md-3 col-sm-6">
                                    <a className="btn btn-danger shadow-sm mt-btn w-100">Show</a>
                             </div>
                        </div>
                    </div>
                </div>

                <div className="card shadow mb-3">
                            <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                <h6 className="m-0 font-weight-bold text-danger">All Data</h6> 
                            </div>
                            
                    <div className="card-body">
                        <div className="table-responsive">
                        <table className="table table-hover table-bordered">
                            <thead className="bg-primary">
                            <tr>
                                <th scope="col" className="text-white">Scheme / Company</th>
                                <th scope="col" className="text-white">Folio</th>
                                <th scope="col" className="text-white">Balance Units</th>
                                <th scope="col" className="text-white">Purchase Cost</th>
                                <th scope="col" className="text-white">Current NAV</th>
                                <th scope="col" className="text-white">Market Value</th>
                                <th scope="col" className="text-white">Div. Paid/Interest</th>
                                <th scope="col" className="text-white">Gain/Loss</th>
                                <th scope="col" className="text-white">Avg. Days</th>
                                <th scope="col" className="text-white">Absolute Return %</th>
                                <th scope="col" className="text-white">CAGR %</th>
                                <th scope="col" className="text-white">Transact</th>
                                
                            </tr>
                            </thead>
                            <tbody>
                           {data}
                           
                            <tr>
                                <th scope="row" className="text-info">DEBT MF</th>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <th scope="row">Can Robeco - Liquid Fund (G) Direct</th>
                                <td className="no-wrap-ws">CAS-19925018733</td>
                                <td>2.034</td>
                                <td>2458.0672</td>
                                <td>5,000</td>
                                <td>2484.7380</td>
                                <td>5,054</td>
                                <td>124</td>
                                <td>54</td>
                                <td>1.09</td>
                                <td>3.19</td>
                                <td> 
                                    <Transact_Icon_Group/>
                                </td>
                            </tr>
                          
                            <tr>
                                <th scope="row" className="text-info">EQUITY MF</th>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <th scope="row">Axis - Bluechip Fund (G) Direct</th>
                                <td className="no-wrap-ws">CAS-91097844926</td>
                                <td>2.034</td>
                                <td>2458.0672</td>
                                <td>5,000</td>
                                <td>2484.7380</td>
                                <td>5,054</td>
                                <td>124</td>
                                <td>54</td>
                                <td>1.09</td>
                                <td>3.19</td>
                                <td><Transact_Icon_Group/></td>
                            </tr>
                            <tr>
                                <th className="bg-light text-success" scope="row">Total</th>
                                <th className="bg-light text-success"></th>
                                <th className="bg-light text-success"></th>
                                <th className="bg-light text-success">1,82,018</th>
                                <th className="bg-light text-success"></th>
                                <th className="bg-light text-success">197</th>
                                <th className="bg-light text-success"></th>
                                <th className="bg-light text-success">124</th>
                                <th className="bg-light text-success">11</th>
                                <th className="bg-light text-success">1.09</th>
                                <th className="bg-light text-success">3.19</th>
                                <th className="bg-light text-success"></th>
                            </tr>
                          
                            </tbody>
                            <tfoot className="bg-primary">
                            <tr>
                                <th scope="col" className="text-white">Total (All Applicants)</th>
                                <th scope="col"></th>
                                <th scope="col"></th>
                                <th scope="col" className="text-white">1,82,018</th>
                                <th scope="col" className="text-white"></th>
                                <th scope="col" className="text-white">1,93,210</th>
                                <th scope="col" className="text-white"></th>
                                <th scope="col" className="text-white">197</th>
                                <th scope="col" className="text-white">11,192</th>
                                <th scope="col" className="text-white">6.15</th>
                                <th scope="col" className="text-white">11.38</th>
                                <th scope="col" className="text-white"></th>
                                
                            </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>
                </div>
            </div>
        </div>     
    </div>

      </div>
          {/* End of Main Content */}



        {/*Addtitional Purchase Modal */}
        <div className="modal fade" id="additionalPurchase" tabIndex={-1} role="dialog" aria-labelledby="additionalPurchaseTitle" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title text-danger" id="additionalPurchaseTitle">Addtitional Purchase</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">
                <form>
                    <div className="col mb-3">
                      <div class="alert alert-info" role="alert">
                        <h6>Vertika Singh</h6>
                        <h6 className="mb-0">Scheme Name</h6>
                      </div>
                    </div>
                    <div className="col mb-3">
                        <label htmlFor="amt" >Enter Amount</label>
                        <input className="form-control input-text" id="amt" type="Text" placeholder="Enter Amount" />
                    </div>  
                    <div className="col mb-3">
                        <label htmlFor="profile">Select Payment Mode</label>
                        <select className=" form-control input-text">
                        <option>Net Banking</option>
                        <option>RTGS/NEFT</option>
                        <option>Debit Mandate</option>
                        </select>
                    </div> 
                    <div className="col my-2">                                           
                        <input className=" input-text" id="emailLink" type="radio" name="demo" />
                        <label htmlFor="emailLink">Link On Email</label>
                        <input className="input-text ml-3" id="immediatePay" type="radio" name="demo" />
                        <label htmlFor="immediatePay">Immediate Payment</label>                                        
                    </div> 
                    <div className="col mb-3">
                        <label htmlFor="bank">Select Bank</label>
                        <select className="form-control" data-live-search="true">
                            <option>Bank 1</option>
                            <option>Bank 2</option>
                            <option>Bank 3</option>                       
                        </select>
                    </div> 
                    <div className="col mb-3">
                        <label htmlFor="mandate" >Mandate</label>
                        <select className="form-control" >
                            <option>Select</option>
                            <option>Mandate 1</option>
                            <option>Mandate 1</option>
                            <option>Mandate 1</option>                   
                        </select>
                    </div> 
                </form>
              </div>
              <div className="modal-footer">
                {/* <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button> */}
                <button type="button" className="btn btn-danger shadow-sm">Place Order</button>
              </div>
            </div>
          </div>
        </div>


        {/*SIP Modal */}
        <div className="modal fade" id="sip" tabIndex={-1} role="dialog" aria-labelledby="sipTitle" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title text-danger" id="sipTitle">SIP</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">
                <form>
                    <div className="col mb-3">
                    <div class="alert alert-info" role="alert">
                      <h6>Vertika Singh</h6>
                      <h6 className="mb-0">Scheme Name</h6>
                    </div>
                    </div>
                   
                    <div className="col mb-3">
                        <label htmlFor="mandate" >Mandate</label>
                        <select className="form-control" >
                            <option>Select</option>
                            <option>Mandate 1</option>
                            <option>Mandate 1</option>
                            <option>Mandate 1</option>                   
                        </select>
                    </div> 
                    <div className="col mb-3">
                        <label htmlFor="amt" >Enter Amount</label>
                        <input className="form-control input-text" id="amt" type="Text" placeholder="Enter Amount" />
                    </div> 
                    <div className="row px-3">                 
                    <div className="col-sm-6 mb-3">
                        <label htmlFor="date_from">SIP Start Date</label>
                        <input className="form-control" id="date_from" type="date"/>                     
                    </div>  
                    <div className="col-sm-6 mb-3">
                        <label htmlFor="date_to">SIP End Date</label>
                        <input className="form-control" id="date_to" type="date"/>                     
                    </div> 
                    </div> 
                    <div className="col mb-3">
                        <input className=" input-text" id="perpetual" type="checkbox" />
                        <label htmlFor="perpetual" className="ml-2">Perpetual</label>                     
                    </div>                 
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-danger shadow-sm">Place Order</button>
              </div>
            </div>
          </div>
        </div>


        {/*Switch Modal */}
        <div className="modal fade" id="switch" tabIndex={-1} role="dialog" aria-labelledby="switchTitle" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title text-danger" id="switchTitle">Switch</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">
                <form>
                    <div className="col mb-3">
                      <div class="alert alert-info" role="alert">
                        <h6>Vertika Singh</h6>
                        <h6 className="mb-0">Scheme Name</h6>
                      </div>
                    </div>
                    <div className="col mb-3">
                        <label htmlFor="target" >Select Target Scheme</label>
                        <select className="form-control">
                            <option>Scheme 1</option>
                            <option>Scheme 2</option>
                        </select>
                  </div>
                  <div className="col mb-3">
                        <p className=" mb-1">Switch Type</p>
                        <input id="amt" type="radio" name="demo" />
                        <label htmlFor="amt">By Amount</label>
                        <input className=" ml-3" id="units" type="radio" name="demo" />
                        <label htmlFor="units">By Units</label>
                        <input className=" ml-3" id="all_units" type="radio" name="demo" />
                        <label htmlFor="all_units">All Units</label>                                         
                  </div>
                    <div className="col mb-3">
                        <label htmlFor="amt" >Enter Amount</label>
                        <input className="form-control" id="amt" type="Text" placeholder="Enter Amount" />
                    </div>  
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-danger shadow-sm">Place Order</button>
              </div>
            </div>
          </div>
        </div>

        {/*Redemption Modal */}
        <div className="modal fade" id="redemption" tabIndex={-1} role="dialog" aria-labelledby="redemptionTitle" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title text-danger" id="redemptionTitle">Redemption</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">
              <form>
               <div className="col mb-3">
                      <div class="alert alert-info" role="alert">
                        <h6>Vertika Singh</h6>
                        <h6 className="mb-0">Scheme Name</h6>
                      </div>
                    </div>
                  <div className="col mb-3">
                        <p className=" mb-1">Redemption Type</p>
                        <input id="amt" type="radio" name="demo" />
                        <label htmlFor="amt">By Amount</label>
                        <input className=" ml-3" id="units" type="radio" name="demo" />
                        <label htmlFor="units">By Units</label>
                        <input className=" ml-3" id="all_units" type="radio" name="demo" />
                        <label htmlFor="all_units">All Units</label>                                         
                  </div>
                    <div className="col mb-3">
                        <label htmlFor="amt" >Enter Amount</label>
                        <input className="form-control" id="amt" type="Text" placeholder="Enter Amount" />
                    </div>  
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-danger shadow-sm">Place Order</button>
              </div>
            </div>
          </div>
        </div>




        

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
export default Portfolio
