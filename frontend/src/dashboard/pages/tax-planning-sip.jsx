import React, {component} from 'react';
import Header from './header';
import Footer from './footer';
import Sidebar from './sidebar';
import {Helmet} from "react-helmet";
import Axios from 'axios';
import $ from 'jquery';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2'

class TP_SIP extends React.Component{
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
        this.setState({userIin:userData.iin})
        if(userData.iin==null){
            // $('html').off('click');
            // $("#overlay").css("display", "block")
            Swal.fire({
                html: `Dear Investor, you need to complete a One Time Registration for Investing online. Please contact us ! BFC Capital - <a href="mailto:enquiry@bfccapital.com">enquiry@bfccapital.com</a>`,
                dangerMode: true,
            })
        }
        const data = {
            email:userData.email,
        }
        // alert(data.email)
        Axios.post("http://localhost:5010/api/User_profile", data)
        .then((res) => {
            // console.log("dscd",res.data.data.data)
            this.setState({userList:res.data.data.data})
        })

        const bankData = {
            transaction_type:"Lumpsum Tax Planning",
            anchoring:"",
            constellation:""
        }
        $("#Wait").css('display','block');
        $("#showData").html("");
        $("#prod_div").css('display','none');

        Axios.post("http://localhost:5010/api/getBasketList", bankData)
        .then((res) => {
            let isinList =[];
            // let isin_no = res.data.data.data[0].isin_no;
            let isin_no = res.data.data.data[0].isin_no;
            let amc = res.data.data.data[0].amc_code;
            if(isin_no!=""){
                const answer_array = isin_no.split(',');
                const amc_array = amc.split(',');
                for (let index=0;index<answer_array.length;index++) {
                    const element = answer_array[index];
                    const elementAmc = amc_array[index];
                    var isin_DATA= element.replace(/ /g,'');
                    var amc_code= elementAmc.replace(/ /g,'');
                    const data = {
                        isin:isin_DATA,
                        amc_code:amc_code
                    }
                    
                    isinList.push(data);
                    Axios.post("http://localhost:5010/api/ProductViaISIN", data)
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


    iinNull=e=>{
        Swal.fire({
          html: `Dear Investor, you need to complete a One Time Registration for Investing online. Please contact us ! BFC Capital - <a href="mailto:enquiry@bfccapital.com">enquiry@bfccapital.com</a>`,
          dangerMode: true,
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

                Axios.post("http://localhost:5010/api/mandateList", mandate)
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
            window.location.href="/prodigypro/dashboard/tax-sip-cart"
        }

    }

    render(){
        
        return(
        <>
        <Helmet>         
            <title>Tax Planning - SIP</title>
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
			.text-color{
				color:#fff !important;
			}
              .swal2-content {
                padding: 17px;
                margin: 22px;
                color: red;
              }
              
            
            
          `}
          </style>

        {/* Page Wrapper */}
      <div id="wrapper">
        {/* Sidebar */}
            {/* <Sidebar  mainTab="tax"  innertab="tax-planning-sip"/> */}
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
                            <li className="breadcrumb-item">Tax Planning</li>
                            <li className="breadcrumb-item active" aria-current="page">SIP</li>
                        </ol>
                    </nav>

                    <div className="row mt-5">
                        <div className="col-xl-10 col-lg-10 offset-md-1">
                            <div className="card ">
                                {/* <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                    <h6 className="m-0 font-weight-bold text-danger"></h6> 
                                </div> */}
                                        {/* Card Body */}
                                <div className="card-body custom-tab-bg" id="Wait">
                                    <div className="col-12" >
                                        Please Wait...
                                    </div>
                                </div>
                                <div className="card-body custom-tab-bg" id="prod_div">
                                    <div className="col-12">
                                    <table class="table">
                                        <thead>
                                            <tr>
                                                <th scope="col">Recommended Schemes</th>
                                            </tr>
                                        </thead>
                                        <tbody id="showData">
                                      
                                        </tbody>
                                    </table>
                                    </div>
                                    <div className="col-12 mt-4 mb-3 text-right">
                                    {this.state.userIin?<a className="btn btn-danger shadow-sm text-color" data-toggle="modal" data-target="#sip_purchase">Continue</a>: <a className="btn btn-danger shadow-sm text-color" onClick={this.iinNull.bind()}>Continue</a>} 
                                         {/*  <a className="btn btn-danger shadow-sm text-color" data-toggle="modal"    data-target="#sip_purchase">Continue</a> */}
                                    </div>
                                    
                                    

                                </div>
                                 
                            </div>
                              {/* disclaimer */}
<div class="text-center py-4 red" role="alert">
                                        <p className="text-disclaimer mb-0 fs-16">Mutual Fund investments are subject to market risks, please read the scheme related documents carefully before investing.</p>  
                                    </div>
                        </div>
                      
                    </div>   
                </div>

      </div>
          {/* End of Main Content */}
 {/*Purchase Modal */}
 <div className="modal fade" id="sip_purchase" tabIndex={-1} role="dialog" aria-labelledby="sipTitle" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content bg-light-red">
              <div className="modal-header">
                <h5 className="modal-title text-dark" id="sipTitle">Tax Planning - SIP</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">
                <form>
                    <div className="col mb-3">
                        <label htmlFor="Profile" className='text-label' >Select Profile <span className="text-danger">*</span></label>
                        <select className="form-control selectpicker" data-live-search="true" onChange={this.userProfile} name="usersId">
                        <option value="">Select</option> 
                        {this.state.userList?
                            this.state.userList.map((item, key) =>
                            <option value={item.id}>{item.investor_name} {item.jh1_name!="undefined" ? " | "+item.jh1_name:null}{item.jh2_name!="undefined" ? " | "+item.jh2_name:null}</option>
                        ):null}               
                        </select>
						 <small className='text-danger'>{this.state.profile_err}</small>
                    </div> 
                    <div className="col mb-3">
                        <label htmlFor="mandate"className='text-label' >Mandate <span className="text-danger">*</span></label>
                        <select className="form-control selectpicker" data-live-search="true" name="mandate" onChange={this.getMandate}>
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
              <div className="modal-footer border-0">
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
export default TP_SIP
