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
import 'react-toastify/dist/ReactToastify.css';
import { Link, Redirect } from 'react-router-dom';

class Create_Mandate extends React.Component{
    constructor(){
        super();
        this.state = {
          users: []
        };
        this.state = {
          Items: []
        };
    }

    submit =e=>{
		 $("#overlay").css("display","block")
        let to_date;
        const user = JSON.parse(localStorage.getItem("userList"))
        const userData = JSON.parse(localStorage.getItem("loginUserData"))
        const bankDetail = JSON.parse(localStorage.getItem("bankDetail"))
        let to =  $('input[name="to_date"]').val();
        let form =  $('input[name="form_date"]').val();
        let accountType='';
        if(to==""){
            to_date= "31-Dec-2099";
        }else{
            const swp_toarr = to.split('-');
            const to_mn = new Date(swp_toarr[1]).toString().split(' ')[1];
            to_date = swp_toarr[2] + "-" + to_mn + "-" + swp_toarr[0];
            // let to_date= to;
        }

        if(bankDetail.ac_type=="Savings Account"){
            accountType='SB';
        }else if(bankDetail.ac_type=="Cash/Credit"){
            accountType='CC';
        }else if(bankDetail.ac_type=="Current Account"){
            accountType='CA';
        }else if(bankDetail.ac_type=="Foreign Currency Non Resident"){
            accountType='FCNR';
        }else if(bankDetail.ac_type=="Non Resident External Account"){
            accountType='NRE';
        }else if(bankDetail.ac_type=="Non Resident Ordinary"){
            accountType='NRO';
        }else if(bankDetail.ac_type=="Overdraft Account"){
            accountType='OA';
        }else if(bankDetail.ac_type=="Post Office Savings Bank Account"){
            accountType='PSB';
        }

        const swp_from_arr = form.split('-');
        const from_mn = new Date(swp_from_arr[1]).toString().split(' ')[1];
        
        const data = {
            email:userData.email,
            ach_fromdate: swp_from_arr[2] + "-" + from_mn + "-" + swp_from_arr[0],
            ach_todate:to_date,
            ach_amount:$('input[name="amt"]').val(),
            process_mode:"E",
            client_callback_url:"N",
            ifsc_code:bankDetail.ifsc_code,
            bank_code:bankDetail.bank_code,
            acc_no:bankDetail.ac_no,
            acc_type:accountType,
            branch_name:bankDetail.branch_name,
            channel_type: $('select[name="type"]').val(),
            iin:user.customer_id
        }

        // alert(data.ach_fromdate)
        console.log("data",JSON.stringify(data))
        Axios.post("/prodigypro/api/creatMandate", data)
        .then((res) => {
			 $("#overlay").css("display","none")
            //console.log(res.data.data)
            if (res.data.data.status == 400) {
                toast.error(res.data.data.message)
            } else {
                this.setState({link:res.data.data.data.eMandatelink})
                toast.success(res.data.data.message)
            }
        })

    }
   

    render(){
        if(this.state.link){
            window.location.href = this.state.link;
        } 
        return(
        <>
		 <StyleComponent/>
        <Helmet>         
            <title>Create E-Mandate</title>
        </Helmet>
            <style>
          {`
			  .text-color{
				color:#fff !important;
			}
            .card{
                min-height:420px;
            }
            #end_date{
                display:none;
            }
			#overlay{
                display:none;
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
							   <li className="breadcrumb-item "><a href="/prodigypro/dashboard/bank-and-mandate">Bank Details and Mandate</a></li>
                            <li className="breadcrumb-item active" aria-current="page">Create E-Mandate</li>
                        </ol>
                    </nav>

                    <div className="row">
                        <div className="col-xl-8 col-lg-8 offset-md-2">
                            <div className="card shadow mb-3">
                                <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                   {/*  <h6 className="m-0 font-weight-bold text-danger">Create E-Mandate</h6> */}
									<a className="btn btn-danger shadow-sm" href="/prodigypro/dashboard/bank-and-mandate">Back to bank details</a>
                                </div>
                                        {/* Card Body */}
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-md-6 mb-3">
                                            <label>Enter Mandate Amount <spna className="text-danger">*</spna></label>                                
                                            <input type="text" className="form-control"  name="amt"/>
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <label>Select Channel Type</label>                                
                                            <select className="form-control" name="type">
                                                <option value="">Select</option>
                                                <option value="DC">Debit Card</option>
                                                <option value="NET">Net Banking</option>
                                               
                                            </select> 
                                        </div>
                                    </div>
                                       
                                    <div className="row">
                                        <div className="col-md-6 mb-3">
                                            <label>From <spna className="text-danger">*</spna></label>                                
                                            <input type="date" className="form-control" name="form_date"/>
                                        </div>
                                        <div className="col-md-6 mb-3 my-auto">
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" name="until"defaultChecked id="defaultCheck1" />
                                                <label className="form-check-label" htmlFor="defaultCheck1">
                                                Until Cancelled <spna className="text-danger">*</spna>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                        <div className="col-md-6 mb-3" id="end_date">
                                            <label>To <spna className="text-danger">*</spna></label>                                
                                            <input type="date" id="to_date" className="form-control" name="to_date"/>
                                        </div>
										
										  
                                        <div className="col-12 text-right">
                                            <a className="btn btn-danger shadow-sm text-color" onClick={this.submit.bind()}>Submit</a>
                                        </div>                    
										 <div className="row">
                                            <p className='text-danger'>Note:- </p>
                                            <p>Please <a href='https://www.npci.org.in/PDF/nach/live-members-e-mandates/Live-Banks-in-API-E-Mandate.pdf'>click here</a> for a list of eligible banks for E-Mandate. If your bank is not eligible please <a href='/prodigypro/dashboard/contact-us?mandate'>raise a query</a> to initiate the offline process of mandate registration. </p>

                                            <p>The debit mandate amount is the daily maximum limit per transaction i.e, 10 Lakhs </p>
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
export default Create_Mandate
