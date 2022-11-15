import React, {component} from 'react';
import Header from './header';
import Footer from './footer';
import Sidebar from './sidebar';
import {Helmet} from "react-helmet";
import { stringify } from 'querystring';
import Axios from 'axios';
import $ from 'jquery';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class Add_Family_Member extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
          users: []
        };
    }

    panCard = e =>{
       // alert("he")
        $("#add_member").css('display', 'none');
        $("#opt_box").css('display', 'none');
        $("#getotp").css('display', 'block');
        $(".text-info").css('display', 'none');
    }

    getOtp = e =>{
        const userData = JSON.parse(localStorage.getItem("loginUserData"));
        //alert(userData.pan_card);
        const data = {
            adminPan:userData.pan_card,
            memberPan:$('input[name="memberPan"]').val().toUpperCase(),
        }

        // alert(data.pan_numbers)
        $("#load").css('display', 'block');
        $("#getotp").css('display', 'none');

        Axios.post("/prodigypro/api/PANVerification", data)
        .then((res) => {
            $("#load").css('display', 'none');
            // console.log("PANVerification",res.data.data.status) getotp
            if(res.data.data.status==400){
                  toast.error(res.data.data.message);
                $("#getotp").css('display', 'block');
            }else{
              //  toast.success("OTP has been sent on MobileNo & Email ID!");
                $(".text-info").css('display', 'block');
                $("#add_member").css('display', 'block');
                $("#opt_box").css('display', 'block');
                $("#getotp").css('display', 'none');
            }
        })
    }

    resentOtp = e =>{
        const userData = JSON.parse(localStorage.getItem("loginUserData"));
        //alert(userData.pan_card);
        const data = {
            adminPan:userData.pan_card,
            memberPan:$('input[name="memberPan"]').val().toUpperCase()
        }

        $("#load1").css('display', 'block');
        $("#add_member").css('display', 'none');

        Axios.post("/prodigypro/api/PANVerification", data)
        .then((res) => {
            $("#load1").css('display', 'none');
            $("#add_member").css('display', 'block');
            if(res.data.data.status==400){
                toast.error(res.data.data.message);
            }else{
                //toast.success("OTP Sent on Email and Mobile No!!");
            }
        })
    }

    addMember = e =>{
        const userData = JSON.parse(localStorage.getItem("loginUserData"));
        // alert(userData.pan_card); otp
        const data = {
            memberPan:$('input[name="memberPan"]').val().toUpperCase(),
            memberRelation:$('select[name="memberRelation"]').val(),
            otp:$('input[name="otp"]').val(),
            adminPan:userData.pan_card
        }

        $("#load1").css('display', 'block');
        $("#add_member").css('display', 'none');
        // alert(JSON.stringify(data))
        Axios.post("/prodigypro/api/AddFamily", data)
        .then((res) => {
            $("#load1").css('display', 'none');
            if(res.data.data.status==400){
                $("#add_member").css('display', 'block');
                toast.error(res.data.data.message);
            }else{
				data = {
				  pan_numbers:$('input[name="memberPan"]').val().toUpperCase()
				}
				 Axios.post("/prodigypro/api/getIINStatus", data)
				  .then((res) => {
					console.log("getIINStatus",res.data)
					if(res.data.data.status==200){
					  res.data.data.data.map((val1)=>{
						const data2 = {
						  iin:val1.CUSTOMER_ID,
						  email:userData.email,
						}
						Axios.post("/prodigypro/api/GETIINDETAILSWMS", data2)
						.then((resss) => {
						  console.log("GETIINDETAILSWMS",resss.data)
						  const data = {
							  email:userData.email,
						  }
						
						  Axios.post("/prodigypro/api/User_profile", data)
						  .then((res) => {
							// console.log("amc",res.data.data.data)
							this.setState({userList:res.data.data.data})
						  })
						})
					  })
					}
				  })
			  
			  
                $('input[name="memberPan"]').val("");
                $('select[name="memberRelation"]').val("");
                $("#getotp").css('display','block');
                $("#opt_box").css('display', 'none');
                $("#add_member").css('display', 'none');
                $(".text-info").css('display', 'none');
                toast.success("Family Member Added Successfully!");
            }
        })
    }

    render(){
        
        return(
        <>
        <Helmet>         
            <title>Add Family Member</title>
        </Helmet>
            <style>
          {`
			.text-color{
				color:#fff !important;
			}
           .mt-input{
                margin-top:3.5%;
            }
            .mt-btn{
                margin-top:12%;
            }
            #opt_box{
                display:none;
            }
            #add_member{
                display:none;
            }
            #load{
                display:none;
            }
            .text-info{
                display:none;
            }
            #load1{
                display:none;
            }
			 .panNo{
                text-transform: uppercase;
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
          <ToastContainer position="top-right" className="mt-8" />
            {/* Topbar */}
                <Header/>
            {/* End of Topbar */}

            {/* Begin Page Content */}
            <div className="container-fluid">
                {/* Page Heading */}
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><a href="home">Home</a></li>
                            <li className="breadcrumb-item active" aria-current="page">Add Family Member</li>
                        </ol>
                    </nav>

                    <div className="row">
                        <div className="col-xl-12 col-lg-12">
                            <div className="card shadow mb-3">
                                <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                    {/* <h6 className="m-0 font-weight-bold text-danger">Add Family Member</h6>  */}
                                </div>
                                {/* Card Body */}
                                <div className="card-body">
                                    <div className="col-12">
                                        <div className="col-lg-4 col-md-4 offset-md-4 ">
                                            <div className="col-12 mb-3">
                                                <label>Enter PAN  <spna className="text-danger">*</spna></label>                                
                                                <input type="text" className="form-control panNo" name="memberPan" onKeyUp={this.panCard}/>
                                            </div>
                                            <div className="col-12 mb-4">
                                                <label>Relation  <spna className="text-danger">*</spna></label>                                
                                                <select className="form-control" name="memberRelation">
                                                    <option value="">Select</option>
                                                    <option value="Father">Father</option>
                                                    <option value="Mother">Mother</option>
                                                    <option value="Wife">Wife</option>
                                                    <option value="Husband">Husband</option>
													 <option value="SISTER"> Sister</option>
														<option value="BROTHER"> Brother</option>
                                                    <option value="Son">Son</option>
                                                    <option value="Daughter">Daughter</option>
                                                    <option value="Other">Other</option>         
                                                </select> 
                                            </div>
                                            <div className="col-12 mb-3">
                                                <a className="btn btn-danger shadow-sm w-100 text-color" id="getotp" onClick={this.getOtp.bind()}>Generate OTP</a>                                      <a className="btn btn-danger shadow-sm w-100" id="load">Loading...</a>    

                                                <span className="text-xs text-info">OTP has been sent on your registered Email Id & Mobile number.</span>
                                            </div>
                                            <div className="col-12 mb-3" id="opt_box">
                                                <label>Enter OTP  <spna className="text-danger">*</spna></label>                                
                                                <input type="text" className="form-control" name="otp"/>
                                                <div class="text-right mt-2"><a href="#" onClick={this.resentOtp.bind()}>Didn't Get OTP? Resend</a></div>
                                            </div>
                                            <div className="col-12" id="add_member">
                                            <a className="btn btn-danger shadow-sm w-100 text-color" onClick={this.addMember.bind()}>Add Family Member</a>
                                            </div>
                                            <div className="col-12" id="load1">
                                            <a className="btn btn-danger shadow-sm w-100">Loading...</a>
                                            </div>
                                        </div>
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
export default Add_Family_Member
