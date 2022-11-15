import React, {component} from 'react';
import Header from './header';
import Footer from './footer';
import Sidebar from './sidebar';
import {Helmet} from "react-helmet";
import Axios from 'axios';
import $ from 'jquery';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


class Tax_lum_Purchase extends React.Component{
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
        const userData = JSON.parse(localStorage.getItem("loginUserData"))
        const data = {
            email:userData.email,
        }
          
        Axios.post("/prodigypro/api/User_profile", data)
        .then((res) => {
            this.setState({userList:res.data.data.data})
        })
       
        const Items = JSON.parse(localStorage.getItem("Items"));
        const result = Items.reduce((total, currentValue) => total =  parseInt(total) +  parseInt(currentValue.amt),0);
        this.setState({Items:Items});

        const user = JSON.parse(localStorage.getItem("user"))
        this.setState({iin:user.customer_id,invester_nm:user.investor_name,holder:user.hold_nature_desc,totalAmt:result})   

        console.log("user",user);
        const mandate = {
            email:userData.email,
            IIN:user.customer_id,
        }

        Axios.post("/prodigypro/api/mandateList", mandate)
        .then((res) => {
            this.setState({userMandateList:res.data.data.data})
            
        })

        const bankData = {
            email:userData.email,
            iin:user.customer_id,
        }
        Axios.post("/prodigypro/api/getbankList", bankData)
        .then((result) => {
          this.setState({userBankList:result.data.data.data})
        })
    }

    getbank = (e)=>{
		 this.setState({Paymentlink:""})
        // console.log("info",this.state.userinfo)
        let payMode = $('select[name="paymentMode"]').val();
        if(payMode=="OL"){
          $("#payTypeDiv").css({ "display": "block" });
          $("#bankNameDiv").css({ "display": "block" });
          $("#mandateDiv").css({ "display": "none" });
        }else if(payMode=="TR"){
          $("#payTypeDiv").css({ "display": "none" });
          $("#bankNameDiv").css({ "display": "block" });
          $("#mandateDiv").css({ "display": "none" });
        }else if(payMode=="M"){
          $("#payTypeDiv").css({ "display": "none" });
          $("#bankNameDiv").css({ "display": "none" });
          $("#mandateDiv").css({ "display": "block" });
        }else if(payMode=="UPI"){
          $("#payTypeDiv").css({ "display": "block" });
          $("#bankNameDiv").css({ "display": "block" });
          $("#mandateDiv").css({ "display": "none" });
        }else{
          $("#payTypeDiv").css({ "display": "none" });
          $("#bankNameDiv").css({ "display": "none" });
          $("#mandateDiv").css({ "display": "none" });
        }
    }
    
    
bankDetail = (e) =>{
    let bankCode = $('select[name="bankName"]').val();
    this.setState({userMandate:""})
    this.state.userBankList.map((val,key) => {
      if(val.bank_code==bankCode){
        // alert(this.state.userSchemeList.investor_name)
        this.setState({userMandate:{umrn:"",bank_code:val.bank_code,holder_name:this.state.invester_nm,accountNo:val.ac_no,ifsc_code:val.ifsc_code,branch:val.branch_name}})
      } 
    })
  }

getMandate = (e) => {
    this.setState({userMandate:""})
    let mandate = $('select[name="mandate"]').val();
    this.state.userMandateList.map(val => {
      if(val.MANDATE_ID==mandate){
       this.setState({userMandate:{umrn:val.UMRN_NO,bank_code:val.BANK_CODE,holder_name:val.INVESTOR_NAME,accountNo:val.ACCOUNT_NO,acoount_type:val.AC_TYPE,branch:val.BRANCH,ifsc_code:""}})
      }
    })
}

    cnfPurchase=(e)=>{
		this.setState({Paymentlink:""})
        const userData = JSON.parse(localStorage.getItem("loginUserData"))
        const uniqueFolio = [...new Set(this.state.Items.map(q => q.folio))];
        uniqueFolio.map(val =>{
          if(val==""){
            let data = []; let total_amt = 0;
            this.state.Items.map((val, key) => {
              if(val.folio==""){
                total_amt = parseInt(total_amt) + parseInt(val.amt);
                // alert(to_year)
                const value = {
                    folio: val.folio,
                    amc: val.amc_code,
                    product_code: val.product_code,
                    reinvest: val.reinvest,
                    amount: val.amt,
                    perpetual_flag:"",
                    input_ref_no: null,
                    sip_paymech: null,
                    ach_amt: null,
                    transfer_date: null,
                    from_date: null,
                    to_date: null,
                    target_product: null,
                    periodicity: null,
                    period_day: null,
                    sip_from_date:null,
                    sip_end_date:null,
                    sip_freq: null,
                    sip_amount: null,
                    sip_period_day: null,
                    amt_unit_type:null,
                    amt_unit: null,
                    all_unit: null,
                }
                data.push(value)
              }
            })

            let  rtgs_code = "";
            let paytype = $('select[name="paymentMode"]').val();
            if(paytype=="TR"){
              rtgs_code = this.state.userMandate.ifsc_code;
            }

            const value2 ={
                email: userData.email,
                iin: this.state.iin,
                instrm_amount: total_amt,
                bank_code: this.state.userMandate.bank_code,
                holder_name: this.state.userMandate.holder_name,
                accountNo: this.state.userMandate.accountNo,
                fscode:this.state.userMandate.ifsc_code,
                rtgs_code:rtgs_code,
                branch: this.state.userMandate.branch,
                umrn: this.state.userMandate.umrn,
                sub_trxn_type:"N",
                trxn_acceptance:"ALL",
                payment_mode:$('select[name="paymentMode"]').val(),
                debit_amount_type:"",
                input_ref_no:"",
                perpetual_flag:"",
                instrm_date:"",
                Client_callback_url:"API URL",
                ach_exist:"Y",
                Return_paymnt_flag:$("input:radio[name=payType]:checked").val(),
                childArr: data
            }
        
            console.log("value",value2);
			$("#overlay").css("display","block")
            Axios.post("/prodigypro/api/purchase", value2)
            .then((result) => {
				$("#overlay").css("display","none")
                if(result.data.data.status==400){
                    toast.error(result.data.data.message)
                }else{
                  console.log("ccc",result.data.data.data[0].Paymentlink);
                   let payType = $("input:radio[name=payType]:checked").val();
                  if(payType=="Y"){
                    window.$('#exampleModalCenter').modal('show');
                    this.setState({alertMsg:"Order Placed - Units will be allotted on successful receipt of payment."})
                    this.setState({Paymentlink: result.data.data.data[0].Paymentlink})
                  }else{
                    if(paytype=='M'){
                      this.setState({orderMsg: "Payment link has been sent on your registered mail id and mobile number.The Link shall remain active for the next 48 hours. Kindly authorize."})
                    }else{
                      this.setState({orderMsg: "Payment link has been sent on your registered mail id and mobile number.The Link shall remain active for the next 48 hours."})
                    }
                    window.$('.bd-example-modal-lg').modal('show');
                    this.setState({orderData: result.data.data.data});
                  }
                }
            })
          }else{
            let data = []; let total_amt = 0;
            this.state.Items.map((val, key) => {
              if(val.folio!=""){
                total_amt = parseInt(total_amt) + parseInt(val.amt);
                // alert(to_year)
                const value = {
                    folio: val.folio,
                    amc: val.amc_code,
                    product_code: val.product_code,
                    reinvest: val.reinvest,
                    amount: val.amt,
                    perpetual_flag:"",
                    input_ref_no: null,
                    sip_paymech: null,
                    ach_amt: null,
                    transfer_date: null,
                    from_date: null,
                    to_date: null,
                    target_product: null,
                    periodicity: null,
                    period_day: null,
                    sip_from_date:null,
                    sip_end_date:null,
                    sip_freq: null,
                    sip_amount: null,
                    sip_period_day: null,
                    amt_unit_type:null,
                    amt_unit: null,
                    all_unit: null,
                }
                data.push(value)
              }
            })

            let  rtgs_code = "";
            let paytype = $('select[name="paymentMode"]').val();
            if(paytype=="TR"){
              rtgs_code = this.state.userMandate.ifsc_code;
            }

            const value2 ={
                email: userData.email,
                iin: this.state.iin,
                instrm_amount: total_amt,
                bank_code: this.state.userMandate.bank_code,
                holder_name: this.state.userMandate.holder_name,
                accountNo: this.state.userMandate.accountNo,
                fscode:this.state.userMandate.ifsc_code,
                rtgs_code:rtgs_code,
                branch: this.state.userMandate.branch,
                umrn: this.state.userMandate.umrn,
                sub_trxn_type:"N",
                trxn_acceptance:"ALL",
                payment_mode:$('select[name="paymentMode"]').val(),
                debit_amount_type:"",
                input_ref_no:"",
                perpetual_flag:"",
                instrm_date:"",
                Client_callback_url:"API URL",
                ach_exist:"Y",
                Return_paymnt_flag:"Y",
                childArr: data
            }
        
            console.log("value",value2);
			$("#overlay").css("display","block")
            Axios.post("/prodigypro/api/purchase", value2)
            .then((result) => {
				$("#overlay").css("display","none")
                if(result.data.data.status==400){
                  toast.error(result.data.data.message)
                }else{
                   console.log("ccc",result.data.data.data[0].Paymentlink)
                    let payType = $("input:radio[name=payType]:checked").val();
                  if(payType=="Y"){
                    window.$('#exampleModalCenter').modal('show');
                    this.setState({alertMsg:"demo content..."})
                    this.setState({Paymentlink: result.data.data.data[0].Paymentlink})
                  }else{
                    if(paytype=='M'){
                      this.setState({orderMsg: "Payment link has been sent on your registered mail id and mobile number.The Link shall remain active for the next 48 hours. Kindly authorize."})
                    }else{
                      this.setState({orderMsg: "Payment link has been sent on your registered mail id and mobile number.The Link shall remain active for the next 48 hours."})
                    }
                    window.$('.bd-example-modal-lg').modal('show');
                    this.setState({orderData: result.data.data.data});
                  }
                }
            })
          }
        })
        
    }
    render(){
      if(this.state.Paymentlink){
        window.open(this.state.Paymentlink, '_blank');
      }
        return(
        <>
        <Helmet>         
            <title>Confirm Purchase</title>
        </Helmet>
            <style>
          {`
          .table td, .table th {
            padding: .60rem;
            

        }
        .title{
          background: #e74a3b;
          color: #fff;
        }
        #sub_title{
          background:#22b57 !important;
          color: #0c6d4e;
        }
        .textFont{
          color: blue;
        }
		#payTypeDiv{
          display:none;
        }
        #bankNameDiv{
          display:none;
        }
        #mandateDiv{
          display:none;
        }
		#overlay{
			display:none;
		}
          `}
          </style>
          <ToastContainer position="top-right" className="mt-8" />
        {/* Page Wrapper */}
      <div id="wrapper">
		{/* Loader Page */}
		<div id="overlay" >
            <div class="spinner"></div>
            <br/><b className="text-danger">Please Wait...</b>
        </div>
        {/* Sidebar */}
            <Sidebar  mainTab="tax"  innertab="tax-planning-lumpsum"/>
        {/* End of Sidebar */}

        {/* Content Wrapper */}
        <div id="content-wrapper" className="d-flex flex-column">
          {/* Main Content */}
          <div id="content">
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


           {/* Order model */}
          <div class="modal fade bd-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
          <div class="modal-dialog modal-lg">
            <div class="modal-content">
            
            <div className="modal-header title">
              <h5 className="modal-title text-center " id="exampleModalLabel">Order Screen</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="table-responsive-lg"> 
            <table class="table">
                <thead class="thead-light">
                  <tr>
                    <th scope="col"> Unique No</th>
                    <th scope="col"> Trxn No</th>
                    {/*<th scope="col">Application No</th>*/}
                    <th scope="col">Fund</th>
                    {/*<th scope="col">Scheme</th>*/}
                    <th scope="col">Scheme Name</th>
                    <th scope="col">Amount</th>
                    <th scope="col">Status</th>
                  </tr>
                </thead>
                <tbody>
                {this.state.orderData?
                  this.state.orderData.map((val)=>
                  <tr>
                    <th scope="row">{val.Unique_No}</th>
                    <td>{val.Trxn_No}</td>
                   {/* <td>{val.Application_No}</td>*/}
                    <td>{val.Fund}</td>
                    {/*<td>{val.Scheme}</td>*/}
                    <td>{val.Scheme_Name}</td>
                    <td>{val.Amt}</td>
                    <td>{val.Status_Desc}</td>
                  </tr>
                ):null}

                </tbody>
            </table>
            </div>
            <div class="modal-body">
              <div className="alert alert-info">
                <h6 className="text-left text-danger">Note:</h6>
                <p>{this.state.orderMsg}</p>
              </div>
            </div>

            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
          
            </div>
      
            </div>
          </div>
        </div>
       
    
            {/* Topbar */}
                <Header/>
            {/* End of Topbar */}

            {/* Begin Page Content */}
            <div className="container-fluid">
                {/* Page Heading */}
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><a href="home">Home</a></li>
                            <li className="breadcrumb-item active" aria-current="page">Confirm Purchase</li>
                        </ol>
                    </nav>

                    <div className="row">
                        <div className="col-xl-12 col-lg-12">
                            <div className="card shadow mb-3">
                            <div className="card-header py-2 d-flex flex-row align-items-center justify-content-between">
                                <h6 className="m-0 font-weight-bold text-danger"></h6>
                                    <div className="dropdown no-arrow">
                                          <a className="btn btn-danger btn-sm shadow-sm" href="tax-lum-edit-cart">
                                          <span className="fas fa-pencil-alt fa-sm fa-fw mr-1"></span>
                                          <span className="">Edit</span>
                                          </a>
                                    </div>   
                            </div>
                            
                            <div className="card-body">
                        <div className="d-flex">
                            <div className="col-xl-6 col-lg-6 bg-light py-2">
                                <span className="font-weight-bold">Selected Profile : </span>
                                <span>{this.state.invester_nm}</span>
                            </div>
                            <div className="col-xl-6 col-lg-6 bg-light py-2 text-right">
                                <span className="font-weight-bold">Mode of Holding : </span>
                                <span>{this.state.holder}</span>
                            </div>
                        </div>
                        <div className="table-responsive">
                        <table className="table table-hover table-bordered">
                            <thead className="bg-primary">
                                <tr>
                                    <th scope="col" className="text-white">Scheme</th>
                                    <th scope="col" className="text-white">Folio</th>                           
                                    <th scope="col" className="text-white">Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                            {this.state.Items?
                                this.state.Items.map((item, key) =>
                                <tr>                                  
                                    <td>{item.scheme}</td>
                                    <td>{item.folio==''?"New Foilio":item.folio}</td>
                                    <td>₹ {item.amt}</td>
                                </tr>
                             ) : null}
                            </tbody>
                            <tfoot className="bg-primary">
                            <tr>
                                <th scope="col" className="text-white">Investment Total</th>
                                <th scope="col"></th>
                                <th scope="col" className="text-white">₹ {this.state.totalAmt}</th>
                            </tr>
                            </tfoot>
                        </table>
                    </div>
                <div className="row">
                  <div className="col-xl-4 col-lg-4 mb-4">
                    <span className="has-float-label">
                    <label htmlFor="payment_mode" className="text-label">Select Payment Mode   <spna className="text-danger">*</spna></label>
                      <select className="form-control input-text" name="paymentMode" onChange={this.getbank}>
                        <option value="">Select</option>
                        <option value="OL">Net banking</option>
                        <option value="UPI">UPI</option>
                        <option value="TR">RTGS/NEFT</option>
                        <option value="M">Debit Mandate</option>
                      </select>
                     
                    </span>
                   
                  </div>
                  <div className="col-xl-4 col-lg-4 mb-4" id="payTypeDiv">    
                  <br></br>
                    <div className="mt-2">                          
                      <input className=" input-text" id="emailLink" type="radio" name="payType" value="N" />
                      <label htmlFor="emailLink" className="text-label">Link On Email</label>
                      <input className="input-text ml-3" id="immediatePay" type="radio" name="payType" value="Y" />
                      <label htmlFor="immediatePay" className="text-label">Immediate Payment</label>                                        
                    </div> 
                  </div> 
                  <div className="col-xl-4 col-lg-4 mb-4" id="bankNameDiv">
                    <span className="has-float-label">
                    <label htmlFor="bank" className="text-label">Select Bank   <spna className="text-danger">*</spna></label>
                      <select className="form-control input-text" data-live-search="true" name="bankName" onChange={this.bankDetail}>
                      <option value="">Select</option>
                        {this.state.userBankList?
                            this.state.userBankList.map((item, key) =>
                            <option value={item.bank_code}>{item.bank_name}</option>
                            ):null}            
                      </select>
                    </span>
                  </div>
                  <div className="col-xl-4 col-lg-4 mb-4"  id="mandateDiv">
                    <span className="has-float-label">
                    <label htmlFor="mandate" className="text-label">Mandate   <spna className="text-danger">*</spna></label>
                      <select className="form-control input-text" data-live-search="true" name="mandate" onChange={this.getMandate}>
                      <option value="">Select</option>
                        {this.state.userMandateList?
                          this.state.userMandateList.map((item, key) =>
                            <option value={item.MANDATE_ID}>{"Bank Name:- "+item.BANK_NAME} | {"A/C No:- "+item.ACCOUNT_NO} | {"A/C Amount:- "+item.AMOUNT}</option>
                          ):null}
                      </select>
                    </span>
                  </div>
                  {/* <input type="text" name="ac_no" value="" />
                    <input type="text" name="bank_code" value="" />
                    <input type="text" name="ifsc_code" value="" />
                    <input type="text" name="branch_name" value="" />
                    <input type="text" name="umrn" value="" /> */}
                </div>
                
                    <div className="row"> 
                      <div className="col-md-2 offset-md-10 mb-3">
                        <a type="button" className="btn btn-danger shadow-sm w-100" href="javascript:void(0);" onClick={this.cnfPurchase.bind(this)}>Order</a>
                      </div>
                    </div>  

                </div>
                </div>


{/* card for SIP Confirmation */}

                



                        </div>
                    </div>   
                </div>
      </div>
          {/* End of Main Content */}
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
export default Tax_lum_Purchase
