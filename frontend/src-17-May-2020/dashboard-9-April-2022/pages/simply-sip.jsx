import React, {component} from 'react';
import Header from './header';
import Footer from './footer';
import Sidebar from './sidebar';
import {Helmet} from "react-helmet";
import Axios from 'axios';
import $ from 'jquery';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactTooltip from 'react-tooltip';

class Simply_Sip extends React.Component{
    constructor(){
        super();
        this.state = {
          users: []
        };
        this.state = {
          Items: []
        };

    }

    componentDidMount(){
        const schemeList = []; const list = '';
        const userData = JSON.parse(localStorage.getItem("loginUserData"))
        const data = {
            email:userData.email,
        }
        // alert(data.email)
        Axios.post("/prodigypro/api/User_profile", data)
        .then((res) => {
            // console.log("dscd",res.data.data.data)
            this.setState({userList:res.data.data.data})
        })
	

       
    }

    getBasket=(e)=>{
      
       let anchoring = $('select[name="anchoring"]').val();
       $("#Wait").css('display','block');
       $("#showData").html("");
       $("#prod_div").css('display','none');
       const bankData = {
            transaction_type:"SIP",
            anchoring:anchoring,
            constellation:"Aggressive"
        }
        
        Axios.post("/prodigypro/api/getBasketList", bankData)
        .then((res) => {
            let isinList =[];
            let isin_no = res.data.data.data[0].isin_no;
            if(isin_no!=""){
                const answer_array = isin_no.split(',');
                for (let index=0;index<answer_array.length;index++) {
                    const element = answer_array[index];
                    var isin_DATA= element.replace(/ /g,'');
                    const data = {
                        isin:isin_DATA,
                    }
                    isinList.push(data);
                    Axios.post("/prodigypro/api/ProductViaISIN", data)
                    .then((result) => {
                        $("#Wait").css('display','none');
                        $("#prod_div").css('display','block');
                        let products = result.data.data.data[0];
                        let htmlDATa='<tr><td>'+products.PRODUCT_LONG_NAME+'</td></tr>';
                        $("#showData").append(htmlDATa);
                       
                    })
                   
                 }
                 console.log("isinList",JSON.stringify(isinList))
                 localStorage.setItem("isinDATA",JSON.stringify(isinList))
            }else{
                $("#Wait").css('display','none');
                $("#showData").html("NO DATA FOUND...");
            }
         
        })
    }

    userProfile = e => {
        let userPro_id; let schemeList =[];
        userPro_id = $('select[name="usersId"]').val();
        const userData = JSON.parse(localStorage.getItem("loginUserData"))
        this.state.userList.map(value => {
            if(value.id==userPro_id){
                localStorage.setItem("user",JSON.stringify(value))
                console.log("user",JSON.stringify(value))
                const mandate = {
                    email:userData.email,
                    IIN:value.customer_id,
                }

                Axios.post("/prodigypro/api/mandateList", mandate)
                .then((res) => {
                   
                    this.setState({userMandateList:res.data.data.data})
                })
            }
        })
    }

    getMandate = (e) => {
        // this.setState({userMandate:""})
        let mandate = $('select[name="mandate"]').val();
        this.state.userMandateList.map(val => {
          if (val.MANDATE_ID == mandate) {
            localStorage.setItem("mandate",JSON.stringify(val))
          }
        })
      }
  
  
   cart=(e)=>{
        let mandate = $('select[name="mandate"]').val();
        let userPro_id = $('select[name="usersId"]').val();
        if(mandate=='' || userPro_id==''){
            if(mandate==''){
                this.setState({mandate_err:"Mandatory Field"})
            }else{
                this.setState({mandate_err:""})
            }

            if(userPro_id==''){
                this.setState({profile_err:"Mandatory Field"})
            }else{
                this.setState({profile_err:""})
            }
        }else{
            window.location.href="/prodigypro/dashboard/cart"
        }

    }

	tooltip=e=>{
        window.$('#tooltipmsg').modal('show');
    }

    render(){
        return(
        <>
        <Helmet>         
            <title>Prodigy Pro - Simply Sip</title>
        </Helmet>
            <style>
          {`
            .card{
                min-height:420px;
            }
            #msg{
                display:none;
            }
            #prod_div{
                display:none;
            }
            #Wait{
                display:none;
            }
			.text-color{
				color:#fff !important;
			}
			#registerTip{
                left: 1060px !important;
                max-width: 202px;
                width:226px;
                padding: 8px 13px;
               }
               .top-text{
                 position: relative;
                 top:  -20px;
               }
          `}
          </style>

        {/* Page Wrapper */}
      <div id="wrapper">
        {/* Sidebar */}
            <Sidebar/>
        {/* End of Sidebar */}
			  <div className="modal fade"  id="tooltipmsg" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true" >
            <div class="modal-dialog modal-dialog-centered" role="document">
              <div class="modal-content">
                
                <div class="modal-body">
                  <p className="text-danger font-weight-bold">
                     Suitable for those investors who wish to generate higher tax adjusted returns.
                  </p>
                  <div className="text-center">
                    <button type="button" class="btn btn-primary" data-dismiss="modal" >OK</button>
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

            {/* Topbar */}
                <Header/>
            {/* End of Topbar */}

            {/* Begin Page Content */}
            <div className="container-fluid">
                {/* Page Heading */}
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><a href="home">Home</a></li>
                            <li className="breadcrumb-item active" aria-current="page">Simply Sip</li>
                        </ol>
                    </nav>

                    <div className="row">
                                {/* Area Chart */}
                        <div className="col-xl-4 col-lg-4">
                            <div className="card shadow mb-4">
                                    {/* Card Header - Dropdown */}
                                        <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                            <h6 className="m-0 font-weight-bold text-danger">Simply Sip</h6> 
                                        </div>
                                        {/* Card Body */}
                                <div className="card-body">
                                    {/* <div className="col-12 mb-3">
                                        <label>Monthly Investment amount <br/><span className="text-xs text-info">( Min. ₹1000.00 )</span></label>
                                        <input type="text" className="form-control" />
                                    </div> */}
                                    <div className="col-12 mb-4">
                                        <label>Anchoring<br/><span className="text-xs text-info">( Select Your Investment Horizon in Years )</span></label>
                                        <select className="form-control" name="anchoring" onChange={this.getBasket}>
                                        <option value="">Select</option>
                                            <option value="Upto 1 Year">Upto 1 Year</option>
                                            <option value="1 - 2 Years">1 - 2 Years</option>
                                            <option value="2 - 3 Years">2 - 3 Years</option>
                                            <option value="3 - 4 Years">3 - 4 Years</option>
                                            <option value="4 - 5 Years">4 - 5 Years</option>
                                            <option value="5 - 6 Years">5 - 6 Years</option>
                                            <option value="6 - 7 Years">6 - 7 Years</option>
                                            <option value="7 - 8 Years">7 - 8 Years</option>
                                            <option value="8 - 9 Years">8 - 9 Years</option>
                                            <option value="9 - 10 Years">9 - 10 Years</option>
                                            <option value="10 Years & above">10 Years & above</option>
                                        </select>
                                    </div>

                                    <div className="col-12 text-right mb-3">
                                        {/* <a className="btn btn-danger shadow-sm">Continue</a> */}
                                    </div>
                                    <br/>
                                    <br/>
                                    <br/>
                                    <br/>
                                        {/* disclaimer */}
                                    <div class="alert alert-secondary mb-0" role="alert" id="msg">
                                        <p className="text-disclaimer mb-0" >Mutual Fund investments are subject to market risks, please read the scheme related documents carefully before investing.</p>  
                                    </div> 
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-8 col-lg-8">
                            <div className="card shadow">
                                <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                    <h6 className="m-0 font-weight-bold text-danger">Product Basket</h6> 
                                </div>
                                        {/* Card Body */}
                                    <div className="card-body" id="Wait">
                                        <div className="col-12" >
                                            Please Wait...
                                        </div>
                                    </div>
                                <div className="card-body" id="prod_div">
                                    <div className="col-12" >
                                    <div class="alert alert-info p-2" role="alert">
                                        <div className="d-flex">  
                                            <span className="font-weight-bold">Equity</span>  

                                             <a href="#" data-tip data-for="registerTip" onClick={this.tooltip.bind()} class="badge badge-danger text-right ml-auto rounded-circle">
                                                <span className="fas fa-info p-1"></span>
                                            </a>

                                                <ReactTooltip id="registerTip" place="top" effect="solid">
                                            <div className="tool_tip">
                                            Suitable for those investors who wish to generate higher tax adjusted returns.
                                            </div>
                                        </ReactTooltip>
                                        </div> 
                                    </div>
                                    <table class="table table-striped table-bordered">
                                        <thead>
                                            <tr>
                                                <th scope="col">Recommended Schemes</th>
                                            </tr>
                                        </thead>
                                        <tbody id="showData">
                                      
                                        </tbody>
                                    </table>
                                    </div>

                                    <div className="col-12 mt-4 text-right">
                                        <a className="btn btn-danger shadow-sm text-color" data-toggle="modal"    data-target="#sip_purchase">Continue</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>   
                </div>

      </div>
          {/* End of Main Content */}
 {/*Purchase Modal */}
 <div className="modal fade" id="sip_purchase" tabIndex={-1} role="dialog" aria-labelledby="sipTitle" aria-hidden="true">
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
                        <label htmlFor="Profile" >Select Profile <span className="text-danger">*</span></label>
                        <select className="form-control" onChange={this.userProfile} name="usersId">
                        <option value="">Select</option> 
                        {this.state.userList?
                            this.state.userList.map((item, key) =>
                            <option value={item.id}>{item.investor_name} {item.jh1_name!="undefined" ? " | "+item.jh1_name:null}{item.jh2_name!="undefined" ? " | "+item.jh2_name:null}</option>
                        ):null}               
                        </select>
						 <small className='text-danger'>{this.state.profile_err}</small>
                    </div> 
                    <div className="col mb-3">
                        <label htmlFor="mandate" >Mandate  <span className="text-danger">*</span></label>
                        <select className="form-control" name="mandate" onChange={this.getMandate}>
                        <option value="">Select</option>
                        {this.state.userMandateList?
                          this.state.userMandateList.map((item, key) =>
                            <option value={item.MANDATE_ID}>{"Bank Name:- "+item.BANK_NAME} | {"A/C No:- "+item.ACCOUNT_NO} | {"A/C Amount:- "+item.AMOUNT}</option>
                          ):null}                  
                        </select>
						   <small className='text-danger'>{this.state.mandate_err}</small>
                    </div>                   
                </form>
              </div>
              <div className="modal-footer">
              <a type="button" className="btn btn-danger shadow-sm" href="javascript:void(0);" onClick={this.cart.bind()}>Continue</a>
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
export default Simply_Sip
