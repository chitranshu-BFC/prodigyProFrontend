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
import Select from 'react-select';
class My_Order extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
          users: []
        };
    }

	// numberFormat = (value) =>
    // new Intl.NumberFormat('en-IN', {
    //     style: 'currency',
    //     currency: 'INR'
    // }).format(value);

    // componentDidMount() {
    //     const schemeList = []; const list = '';
    //     const userData = JSON.parse(localStorage.getItem("loginUserData"))
    //     const data = {
    //       email: userData.email,
    //     }
    
    //     Axios.post("http://localhost:5010/api/User_profile", data)
    //       .then((res) => {
    //         this.setState({ userList: res.data.data.data })
    //     })
    // }

    // userProfile = e =>{
    //     $('input[name="trxn_status"]').prop('checked', false); 
    //     const userData = JSON.parse(localStorage.getItem("loginUserData"));
    //     let userPro_id = $('select[name="userPro_id"]').val();
    //     this.setState({ orderList: "" })
    //     this.state.userList.map(value => {
    //         if (value.id == userPro_id) {
    //             let newDate = new Date();
    //             let to_date = new Date().toString().split(' ')[2];
               

    //             let to_month =new Date().toString().split(' ')[1];
    //             let to_year = newDate.getFullYear();

    //             let formdays = new Date(newDate.setDate(newDate.getDate() - 2))
    //             let from_date = formdays.toString().split(' ')[2];
    //             // console.log("ssss",from_date);
    //             let from_month =formdays.toString().split(' ')[1];
    //             let from_year = formdays.getFullYear();
               
    //             const data1 = {
    //               email: userData.email,
    //               from_date: from_date+"-"+from_month+"-"+from_year,
    //               to_date:to_date+"-"+to_month+"-"+to_year,
    //               trxn_type: "SIP",
    //               iin: value.customer_id,
    //             }
                
                
                
    //             Axios.post("http://localhost:5010/api/sip_stp_swp_report", data1)
    //             .then((res) => {
    //                 if(res.data.data.status==200){
    //                     console.log("orderSIPList",res.data.data)
    //                     this.setState({ orderSIPList: res.data.data.data })
    //                 }
    //             })


    //             const data2 = {
    //                 email: userData.email,
    //                 from_date: from_date+"-"+from_month+"-"+from_year,
    //                 to_date:to_date+"-"+to_month+"-"+to_year,
    //                 trxn_type: "SWP",
    //                 iin: value.customer_id,
    //             }
                  
    //             Axios.post("http://localhost:5010/api/sip_stp_swp_report", data2)
    //             .then((res) => {
    //                 if(res.data.data.status==200){
    //                     console.log("orderSWPList",res.data.data)
    //                     this.setState({ orderSWPList: res.data.data.data })
    //                 }
    //             })

    //             const data3 = {
    //                 email: userData.email,
    //                 from_date: from_date+"-"+from_month+"-"+from_year,
    //                 to_date:to_date+"-"+to_month+"-"+to_year,
    //                 trxn_type: "STP",
    //                 iin: value.customer_id,
    //             }
                  
    //             Axios.post("http://localhost:5010/api/sip_stp_swp_report", data3)
    //             .then((res) => {
    //                 if(res.data.data.status==200){
    //                     console.log("orderSTPList",res.data.data.data)
    //                     this.setState({ orderSTPList: res.data.data.data })
    //                 }
    //             })
    //         }
    //     })
    // }

    // getOrder = e => {
    //     let userPro_id;  let taxnStatus=''; let dataList=[]; 
    //     this.setState({ orderList: "" })
    //     const userData = JSON.parse(localStorage.getItem("loginUserData"));
    //     userPro_id = $('select[name="userPro_id"]').val();
		
    //     if(userPro_id==""){
    //         toast.error("please Select Profile");
    //     }else{
	// 		$("#overlay").css("display","block")
	// 		$(".table").css("display","block")
    //         let status = $("input:radio[name=trxn_status]:checked").val()
    //         if(status=="P"){
    //             taxnStatus ="SIP-Pending";
    //         }

    //         if(this.state.orderSIPList){
    //             this.state.orderSIPList.map(item => {
    //                 if(item.TRXN_STATUS.split(' ')[0]==taxnStatus){
    //                     item.TRXN_STATUS="Pending";
    //                     console.log("MyOrder",taxnStatus)
    //                     dataList.push(item)
    //                 }else{
    //                     dataList.push(item)
    //                 }
    //             })
    //         }

    //         if(this.state.orderSWPList){
    //             this.state.orderSWPList.map(item => {
    //                 if(item.TRXN_STATUS.split(' ')[0]==taxnStatus){
    //                     console.log("orderSWPList",taxnStatus)
    //                     dataList.push(item)
    //                 }else{
    //                     dataList.push(item)
    //                 }
    //             })
    //         }

    //         if(this.state.orderSTPList){
    //             this.state.orderSTPList.map(item => {
    //                 if(item.TRXN_STATUS.split(' ')[0]==taxnStatus){
    //                     console.log("orderSTPList",taxnStatus)
    //                     dataList.push(item)
    //                 }else{
    //                     dataList.push(item)
    //                 }
    //             })
    //         }

    //         $("#wait").css('display', 'block');
    //         $("#wait").html("Please Wait...");
    //         this.state.userList.map(value => {
    //             if (value.id == userPro_id) {
    //                 let newDate = new Date();
    
    //                 let to_date = newDate.toString().split(' ')[2];
    //                 let to_month =new Date().toString().split(' ')[1];
    //                 let to_year = newDate.getFullYear();
                    
    //                 let formdays = new Date(newDate.setDate(newDate.getDate() - 2))
    //                 let from_date = formdays.toString().split(' ')[2];
               
    //                 let from_month = formdays.toString().split(' ')[1];
    //                 let from_year = formdays.getFullYear();
                   
    //                 const data = {
    //                   email: userData.email,
    //                   from_date: from_date+"-"+from_month+"-"+from_year,
    //                   to_date:to_date+"-"+to_month+"-"+to_year,
    //                   trxn_type: "A",
    //                   iin: value.customer_id,
    //                   trxn_status:$("input:radio[name=trxn_status]:checked").val(),
    //                 }
                    


    //                 Axios.post("http://localhost:5010/api/myOrder", data)
    //                 .then((res) => {
	// 					 $("#overlay").css("display","none")
    //                     $("#wait").html("");
    //                     if(res.data.data.status==400){
    //                         $("#wait").html("No Data Found");
    //                     }else{
    //                         $("#wait").css('display', 'none');
    //                         res.data.data.data.map((val)=>{
    //                             dataList.push(val)
    //                             this.setState({ orderList:dataList })
    //                             console.log("dataList",dataList)
    //                         })
    //                     }
    //                 })
    //             }
    //         })
    //     } 
    // }

    render(){
       
          const profile = [
            { value: 'select', label: 'select' },
         
           
          ];
        return(
        <>
        <Helmet>         
            <title>My Orders</title>
        </Helmet>
            <style>
          {`
           .mt-input{
            margin-top:3.5%;
        }
        .mt-btn{
            margin-top:12%;
        }
        #wait{
            display:none;
          }
		   #overlay{
            display:none;
        }
		// .table{
        //     display:none;
        // }
          `}
          </style>

        {/* Page Wrapper */}
      <div id="wrapper">
	   {/* Loader Page */}
	  {/* <div id="overlay" >
            <div class="spinner"></div>
            <br/><b className="text-danger">Please Wait...</b>
        </div> */}
        {/* Sidebar */}
            {/* <Sidebar/> */}
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
                            <li className="breadcrumb-item active" aria-current="page">My Orders</li>
                        </ol>
                    </nav>

                    <div className="row">
                        <div className="col-xl-12 col-lg-12">
                            <div className="mb-3">
                                
                                        {/* Card Body */}
                                         <div className="col-12">
                                    <div className="row  px-4 pt-3 mx-4">
                                        <div className="col-lg-4 col-md-4 col-sm-6 ">
                                            <label>Select Applicant Name</label>                                
                                            <Select className='orderprofile ' options={profile} />
                                        </div>
                                        <div className="col-lg-3 col-md-3 col-sm-6 mt-input">
                                            <div className="form-check form-check-inline mr-4">
                                                <input className="form-check-input" type="radio" name="trxn_status" id="inlineRadio1" value="P" defaultValue="option1" onChange={this.getOrder}/>
                                                <label className="form-check-label" htmlFor="inlineRadio1">Pending</label>
                                            </div>
                                            <div className="form-check form-check-inline">
                                                <input className="form-check-input" type="radio" name="trxn_status" id="inlineRadio2" value="A"  defaultValue="option2" onChange={this.getOrder}/>
                                                <label className="form-check-label" htmlFor="inlineRadio2">Authorized</label>
                                            </div>
                                        </div>
                                        <div className="col-lg-3 col-md-3 col-sm-6">
                                                {/* <a className="btn btn-danger shadow-sm mt-btn w-100">Show</a> */}
                                        </div>
                                    </div>
                                                             
                                </div>
                            </div>


                            <div className=" m-5">
                           
                            
                    <div className="card-body">
                        {/* <div className="table-responsive">
                        <table className="table table-hover table-bordered">
                            <thead className="bg-primary">
                            <tr>
                                <th scope="col" className="text-white">Date </th>
                                <th scope="col" className="text-white">Source Scheme</th>
                                <th scope="col" className="text-white">Target Scheme</th>
                                <th scope="col" className="text-white">Folio</th>
                                <th scope="col" className="text-white">Transaction Status</th>
                                <th scope="col" className="text-white">Transaction Type</th>
                                <th scope="col" className="text-white">Amount</th>
                                <th scope="col" className="text-white">Unit</th>
                                <th scope="col" className="text-white">Ref. No.</th>                            
                            </tr>
                            </thead>
                            <tbody> */}
                            {/* <tr id="wait">
                                <td colSpan="8" className="text-danger">Please Wait...</td>
                            </tr> */}
                            {/* {this.state.orderList ?
                                  this.state.orderList.map((item, key) =>
                                    <tr>
                                        <td>{item.ENTRY_DATE}</td>
                                        <td>{(item.SCHEME_NAME.split("/").length > 1)? item.SCHEME_NAME.split("/")[1] : item.SCHEME_NAME }</td>
                                        <td>{item.TARGET_PRODUCT}</td>
                                        <td>{item.FOLIO_NO}</td>
                                        <td>{item.TRXN_STATUS}</td>
                                        <td>{item.TRXN_TYPE}</td>
                                        <td>{this.numberFormat(item.AMOUNT)}</td>
                                        <td>{item.UNITS!='0'?item.UNITS:null}{item.ALL_UNITS=="Yes"?"All Units":null}</td>
                                        <td>{item.PAYMENT_REF_NO}</td>
                                    </tr>
                                  ) :null}
                                */}
                                <div className="col-md-12 custom-tab-bg bg-white p-4 mb-4">
                                    <div className='col-md-12'>
                                <h6 className='text-black'>201G/Aditya Birla Sun Life Equity Advantage Fund</h6>
                                </div>
                        <table className="table">
                  
                            <thead className="">
                            <tr className="red">
                                <th scope="col" >Date </th>                               
                                <th scope="col">Target Scheme</th>                             
                                <th scope="col" >Folio</th>
                                <th scope="col">Amount</th>
                                <th scope="col">Type</th>
                                <th scope="col">Unit</th>
                                <th scope="col">Ref. No.</th> 
                                <th scope="col" >Action</th>                           
                            </tr>
                            </thead>
                            <tbody>
                                    <tr className='text-black'>
                                    <td>29-Jul-2022</td>
                                        <td>Aditya Birla Sun Life Equity Advantage Fund</td>
                                       
                                        <td>12345678</td>
                                        <td>₹500</td>
                                        <td>Fresh Purchase</td>
                                        <td>n/a</td>
                                        <td>123456790</td>
                                        <td><a href="#" className='font-weight-600'> Authorize</a></td>
                                       
                                    </tr>
                                
                            </tbody>
                        </table>
                    </div>

                    <div className="col-md-12 custom-tab-bg bg-white p-4">
                                    <div className='col-md-12'>
                                <h6 className='text-black'>201G/Aditya Birla Sun Life Equity Advantage Fund</h6>
                                </div>
                        <table className="table">
                  
                            <thead className="">
                            <tr className="red">
                                <th scope="col" >Date </th>                               
                                <th scope="col">Target Scheme</th>
                               
                                <th scope="col" >Folio</th>
                                <th scope="col">Amount</th>
                                <th scope="col">Type</th>
                                <th scope="col">Unit</th>
                                <th scope="col">Ref. No.</th>    
                                                     
                            </tr>
                            </thead>
                            <tbody>
                                    <tr className='text-black'>
                                        <td>29-Jul-2022</td>
                                        <td>Aditya Birla Sun Life Equity Advantage Fund</td>
                                       
                                        <td>12345678</td>
                                        <td>₹500</td>
                                        <td>Fresh Purchase</td>
                                        <td>n/a</td>
                                        <td>123456790</td>
                                       
                                    </tr>
                                
                            </tbody>
                        </table>
                    </div>

                </div>
                </div>
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
export default My_Order
