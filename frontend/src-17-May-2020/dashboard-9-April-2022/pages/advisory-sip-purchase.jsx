import React, {component} from 'react';
import Header from './header';
import Footer from './footer';
import Sidebar from './sidebar';
import {Helmet} from "react-helmet";
import Axios from 'axios';
import $ from 'jquery';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { format } from "date-fns";

class Advisory_sip_Purchase extends React.Component{
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

 
    cnfPurchase=(e)=>{
        const user = JSON.parse(localStorage.getItem("user"))
        const userData = JSON.parse(localStorage.getItem("loginUserData"))
        const userMandate = JSON.parse(localStorage.getItem("mandate"))
        let data = []; let total_amt = 0;
        const uniqueFolio = [...new Set(this.state.Items.map(q => q.folio))];
        //console.log("userMandate",userMandate)
        uniqueFolio.map(val =>{
          if(val==""){
            let data = []; let total_amt = 0;
            this.state.Items.map((val, key) => {
              if(val.folio==""){
                total_amt = parseInt(total_amt) + parseInt(val.amt);
                const swp_from_arr = val.date.split('-');
                const from_mn = new Date(swp_from_arr[1]).toString().split(' ')[1];
                var to_year = "";
                if (val.perpetual_val == "Y") {
                    to_year = "31-Dec-2099";
                } else {
                    let yy = val.month / 12;
                    let year = parseInt(swp_from_arr[0])+parseInt(yy);
                    to_year = swp_from_arr[2] + "-" + from_mn + "-" + year;
                }
                // alert(to_year)
                const value = {
                  folio: val.folio,
                  amc: val.amc_code,
                  product_code: val.product_code,
                  reinvest: val.reinvest,
                  amount: val.amt,
                  perpetual_flag: val.perpetual_val,
                  input_ref_no: "",
                  sip_paymech: "M",
                  ach_amt: null,
                  transfer_date: "",
                  from_date: null,
                  to_date: null,
                  target_product: null,
                  periodicity: null,
                  period_day: null,
                  sip_from_date: swp_from_arr[2] + "-" + from_mn + "-" + swp_from_arr[0],
                  sip_end_date: to_year,
                  sip_freq: "OM",
                  sip_amount: val.amt,
                  sip_period_day: swp_from_arr[2],
                  amt_unit_type:null,
                  amt_unit: null,
                  all_unit: null,
                }
                data.push(value)
              }
                
            })

            let until='';
            if (userData.TO_DATE == "31-DEC-2099") {
                until="Y";
            } else {
                until= "N";
            }

            const value2 ={
                email: userData.email,
                iin: user.customer_id,
                instrm_amount: total_amt,
                ach_amt:  userMandate.AMOUNT,
                until_cancelled: until,
                bank_code: userMandate.BANK_CODE,
                holder_name: userMandate.INVESTOR_NAME,
                accountNo: userMandate.ACCOUNT_NO,
                acoount_type: userMandate.AC_TYPE,
                branch: userMandate.BRANCH,
                umrn: userMandate.UMRN_NO,
                ach_fromdate: userMandate.FROM_DATE,
                ach_enddate:userMandate.TO_DATE,
                childArr: data
            }

            console.log(value2);
			$("#overlay").css("display","block")
            Axios.post("/prodigypro/api/multi_purchase_sip", value2)
            .then((result) =>{
				$("#overlay").css("display","none")
                console.log(result.data.data);
                if (result.data.data.status == 400) {
                toast.error(result.data.data.message)
                } else {
					 console.log("orderData",result.data.data.data);
                    window.$('.bd-example-modal-lg').modal('show');
					this.setState({orderMsg:"Payment link has been sent on your registered mail id and mobile number.The Link shall remain active for the next 48 hours. Kindly authorize."})
                    this.setState({orderData: result.data.data.data})
                }
            });
          
          }else{
            let data = []; let total_amt = 0;
            this.state.Items.map((val, key) => {
              if(val.folio!=''){
                total_amt = parseInt(total_amt) + parseInt(val.amt);
                const swp_from_arr = val.date.split('-');
                const from_mn = new Date(swp_from_arr[1]).toString().split(' ')[1];
                var to_year = "";
                if (val.perpetual_val == "Y") {
                    to_year = "31-Dec-2099";
                } else {
                    let yy = val.month / 12;
                    let year = parseInt(swp_from_arr[0])+parseInt(yy);
                    to_year = swp_from_arr[2] + "-" + from_mn + "-" + year;
                }
                // alert(to_year)
                const value = {
                  folio: val.folio,
                  amc: val.amc_code,
                  product_code: val.product_code,
                  reinvest: val.reinvest,
                  amount: val.amt,
                  perpetual_flag: val.perpetual_val,
                  input_ref_no: "",
                  sip_paymech: null,
                  ach_amt: null,
                  transfer_date: "",
                  from_date: swp_from_arr[2] + "-" + from_mn + "-" + swp_from_arr[0],
                  to_date: to_year,
                  target_product: null,
                  periodicity: "OM",
                  period_day: swp_from_arr[2],
                  sip_from_date: null,
                  sip_end_date: null,
                  sip_freq: null,
                  sip_amount: val.amt,
                  sip_period_day: swp_from_arr[2],
                  amt_unit_type: "AMOUNT",
                  amt_unit: val.amt,
                  all_unit: null,
                }
                data.push(value)
              }
            })

            let until='';
            if (userData.TO_DATE == "31-DEC-2099") {
                until="Y";
            } else {
                until= "N";
            }

            const value2 ={
                email: userData.email,
                iin: user.customer_id,
                instrm_amount: total_amt,
                ach_amt:  userMandate.AMOUNT,
                until_cancelled: until,
                bank_code: userMandate.BANK_CODE,
                holder_name: userMandate.INVESTOR_NAME,
                accountNo: userMandate.ACCOUNT_NO,
                acoount_type: userMandate.AC_TYPE,
                branch: userMandate.BRANCH,
                umrn: userMandate.UMRN_NO,
                ach_fromdate: userMandate.FROM_DATE,
                ach_enddate:userMandate.TO_DATE,
                childArr: data
            }

            console.log(value2);
			$("#overlay").css("display","block")
            Axios.post("/prodigypro/api/multi_regularSIP", value2)
            .then((result) => {
				$("#overlay").css("display","none")
                console.log(result.data.data);
                if (result.data.data.status == 400) {
                toast.error(result.data.data.message)
                } else {
                    window.$('.bd-example-modal-lg').modal('show');
					this.setState({orderMsg:"Payment link has been sent on your registered mail id and mobile number.The Link shall remain active for the next 48 hours. Kindly authorize."})
                    this.setState({orderData: result.data.data.data})
                }
            });          
          }
        })

    }

    render(){
        
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
                    {/*<td>{val.Application_No}</td>*/}
                    <td>{val.Fund}</td>
                  {/*  <td>{val.Scheme}</td>*/}
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
        
        {/* Sidebar */}
            <Sidebar mainTab="advisory"  innertab="advisory-sip"/>
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
                            <li className="breadcrumb-item active" aria-current="page">Confirm SIP</li>
                        </ol>
                    </nav>

                    <div className="row">
                        <div className="col-xl-12 col-lg-12">
                            <div className="card shadow mb-3">
                            <div className="card-header py-2 d-flex flex-row align-items-center justify-content-between">
                                <h6 className="m-0 font-weight-bold text-danger"></h6>
                                    <div className="dropdown no-arrow">
                                          <a className="btn btn-danger btn-sm shadow-sm" href="advisory-sip-edit-cart">
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
                                    <th scope="col" className="text-white">Start Date</th>                           
                                    <th scope="col" className="text-white">End date</th>
                                    <th scope="col" className="text-white">Sip date</th>
                                    <th scope="col" className="text-white">Folio</th>                           
                                    <th scope="col" className="text-white">Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                            {this.state.Items?
                                this.state.Items.map((item, key) =>
                                <tr>                                  
                                    <td>{item.scheme}</td>
                                    <td>{format(new Date(item.date), 'dd/MM/yyyy')}</td>
                                    <td>
                                        {item.end_date ? format(new Date(item.end_date), 'dd/MM/yyyy'): null}
                                        {item.end_date == "" ? "31/12/2099" : null}
                                    </td>
                                    <td>{item.date.split('-')[2]}</td>
                                    <td>{item.folio==''?"New Foilio":item.folio}</td>
                                    <td>₹ {item.amt}</td>
                                </tr>
                             ) : null}
                            </tbody>
                            <tfoot className="bg-primary">
                            <tr>
                                <th scope="col" className="text-white">Investment Total</th>
                                <th scope="col"></th>
                                <th scope="col"></th>
                                <th scope="col"></th>
                                <th scope="col"></th>
                                <th scope="col" className="text-white">₹ {this.state.totalAmt}</th>
                            </tr>
                            </tfoot>
                        </table>
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
export default Advisory_sip_Purchase
