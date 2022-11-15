import React, {component} from 'react';
import Header from './header';
import Footer from './footer';
import Sidebar from './sidebar';
import {Helmet} from "react-helmet";
import StyleComponent from './styleComponent';
import Axios from 'axios';
import $ from 'jquery';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2'


class Simply_Save extends React.Component{
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

    Axios.post("/prodigypro/api/User_profile", data)
    .then((res) => {
        this.setState({userList:res.data.data.data})
    })

    const bankData = {
        transaction_type:"Lumpsum Simply Save",
        anchoring:"",
        constellation:""
    }
    
    Axios.post("/prodigypro/api/getBasketList", bankData)
    .then((res) => {
        let isin_no = res.data.data.data[0].isin_no;
        if(isin_no!=""){
            const answer_array = isin_no.split(',');
            for (let index=0;index<answer_array.length;index++) {
                const element = answer_array[index];
                var isin_DATA= element.replace(/ /g,'');
                const data = {
                    isin:isin_DATA,
                }
                Axios.post("/prodigypro/api/ProductViaISIN", data)
                .then((result) => {
                    let products = result.data.data.data[0];
                    this.setState({recommended:products.PRODUCT_LONG_NAME})
                    this.setState({recommendedList:result.data.data.data})
                    console.log("recommendedList ",result.data.data.data)
                })
            }
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
    userPro_id = $('select[name="userPro_id"]').val();
    const userData = JSON.parse(localStorage.getItem("loginUserData"))
    this.setState({userSchemeList:''})
    this.state.userList.map(value => {
      if(value.id==userPro_id){
        this.setState({userinfo:{userIIN:value.customer_id,investor_name:value.investor_name}})
        const investNM = {
          investor_name:value.investor_name,
        }

        const amcdata = {
          pan_card:value.fh_pan_no,
          IIN:value.customer_id,
        }

        Axios.post("/prodigypro/api/amclist", amcdata)
        .then((response) => {
            this.setState({amc:response.data.data.data})
            response.data.data.data.map(value => {
                this.state.recommendedList.map(value2 => {
                    if(value2.AMC_CODE==value.amc_code){
                        console.log("amc ",value2)
                        const data = {
                            folio:value.folio,
                          }
                          // Axios.post("/prodigypro/api/schemelist", data)
                          // .then((result) => {
                          //   result.data.data.data.map((key) => {
                          //     schemeList.push({ scheme_name: key.products.PRODUCT_LONG_NAME,folio_no: data.folio,SIP_DATES: key.products.SIP_DATES, FREQUENCIES: key.products.SYSTEMATIC_FREQUENCIES , amc_code: key.products.AMC_CODE , product_code: key.products.PRODUCT_CODE, reinvest: key.products.REINVEST_TAG, iin: amcdata.IIN,investor_name:investNM.investor_name })
                          //   })
                          //   this.setState({userSchemeList:schemeList})
                          //   console.log("Scheme list",schemeList)
                          // })
                          schemeList.push({ folio_no: data.folio})
                         
                          this.setState({userSchemeList:schemeList})
                          // console.log("Scheme list",schemeList)
                    }else{
                        console.log("amc ","New Folio")
                    }
                   
                })
            })
        })

        const mandate = {
          email:userData.email,
          IIN:value.customer_id,
        }

        Axios.post("/prodigypro/api/mandateList", mandate)
        .then((res) => {
          console.log("mandate ",res.data.data.data)
          this.setState({userMandateList:res.data.data.data})
        })
      }
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
  }
  
    const userData = JSON.parse(localStorage.getItem("loginUserData"))
    const bankData = {
      email:userData.email,
      iin:this.state.userinfo.userIIN,
    }
    
    Axios.post("/prodigypro/api/getbankList", bankData)
    .then((res) => {
      this.setState({userBankList:res.data.data.data})
    })
}

bankDetail = (e) =>{
    let bankCode = $('select[name="bankName"]').val();
    this.setState({userMandate:""})
    this.state.userBankList.map((val,key) => {
      if(val.bank_code==bankCode){
        // alert(this.state.userSchemeList.investor_name)
        this.setState({userMandate:{umrn:"",bank_code:val.bank_code,holder_name:this.state.userinfo.investor_name,accountNo:val.ac_no,ifsc_code:val.ifsc_code,branch:val.branch_name}})
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


oderNow = (e) =>{
  this.setState({Paymentlink:""})
    const userData = JSON.parse(localStorage.getItem("loginUserData"))
    let  rtgs_code = "";
    let paytype = $('select[name="paymentMode"]').val();
    if(paytype=="TR"){
      rtgs_code = this.state.userMandate.ifsc_code;
      //this.setState({rtgs_code:this.state.userMandate.ifsc_code});
    }

  let  folioNo = "";
    let folio = $('select[name="folioNo"]').val();
    if(folio=="NEW"){
      folioNo ='';
    }else{
      folioNo =folio;
    }


    const value = {
        accountNo:this.state.userMandate.accountNo,
        bank_code:this.state.userMandate.bank_code,
        fscode:this.state.userMandate.ifsc_code,
        rtgs_code:rtgs_code,
        branch:this.state.userMandate.branch,
        email:userData.email,
        sub_trxn_type:"N",
        trxn_acceptance:"ALL",
        payment_mode:$('select[name="paymentMode"]').val(),
        instrm_amount:$('input[name="amt"]').val(),
        amount:$('input[name="amt"]').val(),
        amc:this.state.recommendedList[0].AMC_CODE,
        product_code:this.state.recommendedList[0].PRODUCT_CODE,
        reinvest:this.state.recommendedList[0].REINVEST_TAG,
        umrn:this.state.userMandate.umrn,
        debit_amount_type:"",
        input_ref_no:"",
        perpetual_flag:"",
        instrm_date:"",
        Client_callback_url:"API URL",
        ach_exist:"Y",
        folio:folioNo,
        Return_paymnt_flag:$("input:radio[name=payType]:checked").val(),
        holder_name:this.state.userMandate.holder_name,
        iin:this.state.userinfo.userIIN
    }

    console.log("value",value)
  $("#overlay").css("display","block")
    Axios.post("/prodigypro/api/purchase_save", value)
    .then((result) => {
    $("#overlay").css("display","none")
        if(result.data.data.status==400){
            toast.error(result.data.data.message)
        }else{
          
           const transData = {
              pan :this.state.userinfo.fh_pan_no,
              iin : this.state.userinfo.userIIN,
              mode : "Simply-Save",
              payment_mode : value.payment_mode,
              email: userData.email,
              amc:  value.amc,
              scheme_code: value.product_code,
              amt_unit_type :"Amount",
              amt_unit: value.amount,
              folio: value.folio,
              scheme_name:this.state.recommended
            }
                    
            Axios.post("/prodigypro/api/saveTransactionDetails", transData)
            .then((res) => {
              console.log("saveTransactionDetails",res.data.data)
            })


          let payType = $("input:radio[name=payType]:checked").val();
          if(payType=="Y"){
            window.$('#exampleModalCenter').modal('show');
            this.setState({alertMsg:"Order Placed - Units will be allotted on successful receipt of payment."})
            this.setState({Paymentlink: result.data.data.data.Paymentlink})
          }else{
            if(paytype=='M'){
              this.setState({orderMsg: "Payment link has been sent on your registered mail id and mobile number.The Link shall remain active for the next 48 hours. Kindly authorize."})
            }else{
              this.setState({orderMsg: "Payment link has been sent on your registered mail id and mobile number.The Link shall remain active for the next 48 hours."})
            }
            // toast.success(response.data.data.message)
            window.$('.bd-example-modal-lg').modal('show');
            this.setState({orderData: result.data.data.data});
          }
        }
    })
}
  
  


    render(){
      if(this.state.Paymentlink){
        window.open(this.state.Paymentlink, '_blank');
      }
        
        return(
        <>
        <StyleComponent/>
        <Helmet>         
            <title>Prodigy Pro - Simply Save</title>
        </Helmet>
            <style>
          {`
            .card{
                min-height:420px;
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
            .swal2-content {
                padding: 17px;
                margin: 22px;
                color: red;
            }
          `}
          </style>

        {/* Page Wrapper */}
      <div id="wrapper">
    {/* Loader Page */}
    <div id="overlay" >
            <div class="spinner"></div>
            <br/><b className="text-danger">Please Wait...</b>
        </div>
    
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
                 {/* <th scope="col">Application No</th>*/}
                  <th scope="col">Fund</th>
                 {/* <th scope="col">Scheme</th>*/}
                  <th scope="col">Scheme Name</th>
                  <th scope="col">Amount</th>
                  <th scope="col">Status</th>
                </tr>
              </thead>
              <tbody>
              {this.state.orderData?
               
                <tr>
                  <th scope="row">{this.state.orderData.Unique_No}</th>
                  <td>{this.state.orderData.Trxn_No}</td>
                {/*  <td>{this.state.orderData.Application_No}</td>*/}
                  <td>{this.state.orderData.Fund}</td>
                {/* <td>{this.state.orderData.Scheme}</td>*/}
                  <td>{this.state.orderData.Scheme_Name}</td>
                  <td>{this.state.orderData.Amt}</td>
                  <td>{this.state.orderData.Status_Desc}</td>
                </tr>
              :null}

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
    
        {/* Sidebar */}
            <Sidebar/>
        {/* End of Sidebar */}

        <ToastContainer position="top-right" className="mt-8" />
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
                            <li className="breadcrumb-item active" aria-current="page">Simply Save</li>
                        </ol>
                    </nav>

                    <div className="row">
                        <div className="col-xl-12 col-lg-12">
                            <div className="card shadow mb-4">
                                    {/* Card Header - Dropdown */}
                                        <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                            <h6 className="m-0 font-weight-bold text-danger"></h6> 
                                        </div>
                                        {/* Card Body */}
                                <div className="card-body">
                                <div className="row">
                                    <div className="col-xl-4 col-lg-4 mb-4">
                                        <span className="has-float-label">
                                        <select className="form-control input-text" onChange={this.userProfile} name="userPro_id">
                                        <option value="">Select</option> 
                                        {this.state.userList?
                                                this.state.userList.map((item, key) =>
                                                    <option value={item.id}>{item.investor_name} {item.jh1_name!="undefined" ? " | "+item.jh1_name:null}{item.jh2_name!="undefined" ? " | "+item.jh2_name:null}</option>
                                                ):null}
                                        </select>
                                        <label htmlFor="profile" className="text-label">Select Profile  <spna className="text-danger">*</spna></label>
                                        </span>
                                    </div>
                                    <div className="col-xl-4 col-lg-4 mb-4">
                                        <span className="has-float-label">
                                        <input className="form-control input-text" id="r_scheme" type="Text" placeholder="Recommended Scheme" value={this.state.recommended} readOnly/>
                                        <label htmlFor="r_scheme" className="text-label">Recommended Scheme</label>
                                        </span>
                                    </div>
                                    <div className="col-xl-4 col-lg-4 mb-4">
                                        <span className="has-float-label">
                                        <select className=" form-control input-text">
                                        <option value="">Select</option>
                     <option value="NEW">NEW Folio</option>
                                        {this.state.userSchemeList?
                                                this.state.userSchemeList.map((item, key) =>
                                                    // <option value={item.product_code}>{item.scheme_name}</option>
                                                    <option value={item.folio_no}>{item.folio_no}</option>
                                                ):null}
                                        </select>
                                        <label htmlFor="folio" className="text-label">Select Folio  <spna className="text-danger">*</spna></label>
                                        </span>
                                    </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-xl-4 col-lg-4 mb-4">
                                            <span className="has-float-label">
                                            <input className="form-control input-text" id="amt" type="Text" placeholder="Enter Investment Amount" name="amt"/>
                                            <label htmlFor="amt" className="text-label">Enter Investment Amount  <spna className="text-danger">*</spna></label>
                                            </span>
                                        </div>
                                        <div className="col-xl-4 col-lg-4 mb-4">
                                            <span className="has-float-label">
                                            <select className="form-control input-text" name="paymentMode" onChange={this.getbank}>
                                                <option value="">Select</option>
                                                <option value="OL">Net Banking</option>
                                                <option value="UPI">UPI</option>
                                                <option value="TR">RTGS/NEFT</option>
                                                <option value="M">Debit Mandate</option>
                                            </select>
                                            <label htmlFor="payment_mode" className="text-label">Select Payment Mode  <spna className="text-danger">*</spna></label>
                                            </span>
                                        </div>
                                        <div className="col-xl-4 col-lg-4 mb-4" id="payTypeDiv">    
                                            <div className="mt-2">                          
                                            <input className=" input-text" id="emailLink" type="radio" name="payType" value="N" />
                                            <label htmlFor="emailLink" className="text-label">Link On Email</label>
                                            <input className="input-text ml-3" id="immediatePay" type="radio" name="payType" value="Y" />
                                            <label htmlFor="immediatePay" className="text-label">Immediate Payment</label>                                        
                                            </div> 
                                        </div> 
                                        <div className="col-xl-4 col-lg-4 mb-4" id="bankNameDiv">
                                            <span className="has-float-label">
                                            <select className="form-control input-text" data-live-search="true" name="bankName" onChange={this.bankDetail}>
                                            <option value="">Select</option>
                                                {this.state.userBankList?
                                                    this.state.userBankList.map((item, key) =>
                                                    <option value={item.bank_code}>{item.bank_name}</option>
                                                    ):null}            
                                            </select>
                                            <label htmlFor="bank" className="text-label">Select Bank  <spna className="text-danger">*</spna></label>
                                            </span>
                                        </div>
                                        <div className="col-xl-4 col-lg-4 mb-4" id="mandateDiv">
                                            <span className="has-float-label">
                                            <select className="form-control input-text" data-live-search="true" name="mandate" onChange={this.getMandate}>
                                            <option value="">Select</option>
                                                {this.state.userMandateList?
                                                this.state.userMandateList.map((item, key) =>
                                                    <option value={item.MANDATE_ID}>{"Bank Name:- "+item.BANK_NAME} | {"A/C No:- "+item.ACCOUNT_NO} | {"A/C Amount:- "+item.AMOUNT}</option>
                                                ):null}
                                            </select>
                                            <label htmlFor="mandate" className="text-label">Mandate  <spna className="text-danger">*</spna></label>
                                            </span>
                                        </div>
                                   
                                    </div>
                                    <div className="text-right">
                                        <a href="javascript:void(0);" className="btn-theme-1 btn-theme-effect"  onClick={this.state.userIin?this.oderNow.bind():this.iinNull.bind()} >
                                            <span className="button-text">Order Now</span>
                                            <span className="round"><i className="fa fa-chevron-right" /></span>
                                        </a>
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
                        <label htmlFor="Profile" >Select Profile</label>
                        <select className="form-control" >
                            <option>Applicant 1</option>
                            <option>Applicant 2</option>
                            <option>Applicant 3</option>                
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
                <button type="button" className="btn btn-danger shadow-sm">Go To Cart</button>
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
export default Simply_Save
