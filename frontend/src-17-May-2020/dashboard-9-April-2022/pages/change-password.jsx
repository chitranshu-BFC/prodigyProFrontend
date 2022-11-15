import React, {component} from 'react';
import Header from './header';
import Footer from './footer';
import Sidebar from './sidebar';
import {Helmet} from "react-helmet";
import Axios from 'axios';
import $ from 'jquery';
import CryptoJs from 'crypto-js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactTooltip from 'react-tooltip';
import { Link,Redirect } from 'react-router-dom';

class change_password extends React.Component{

    constructor(props) {
        super(props);
        this.state = { userQuery: '' };
    }
    
    componentDidMount(){
        const userData = JSON.parse(localStorage.getItem("loginUserData"))
        const data = {
            email:userData.email,
            phone:userData.phone,
        }
        this.setState({userDataList:data})
    
    }

    handleFormValidation(data){
        let data_arr = [];

        var pass = CryptoJs.MD5(data.new_pass).toString(); // Encrption
        var cpass = CryptoJs.MD5(data.conf_pass).toString() // Encrption

        
        if (data.exit_pass=='') {
            var isValid= {exit_pass:"1"}
            data_arr.push(isValid);
            this.setState({ exit_pass_err: "Mandatory Field" });
        } else {
            // var isValid = true;
            this.setState({ exit_pass_err: "" });
        }
        
        var char = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).*$/;
        const charValid = char.test(data.new_pass);
        //alert(charValid);
        if (data.new_pass == '') {
          var isValid = {new_pass:"1"};
          data_arr.push(isValid);
          this.setState({ new_pass_err: "Mandatory Field" });
        }else if (data.new_pass.length < 6) {
          var isValid = {new_pass:"1"};
          data_arr.push(isValid);
          this.setState({ new_pass_err: "Password must be more than 6 digit!" });
        }else if (charValid == false) {
          var isValid = {new_pass:"1"};
          data_arr.push(isValid);
          this.setState({ new_pass_err: "The password should Alpha-numeric with atleast 1 Capital & Special character" });
        } else {
          // var isValid = true;
          this.setState({ new_pass_err: "" });
        }


        if (data.conf_pass == '') {
            var isValid = {conf_pass:"1"};
            data_arr.push(isValid);
            this.setState({ conf_pass_err: "Mandatory Field" });
        } else if (pass != cpass) {
            var isValid = {conf_pass:"1"};
            data_arr.push(isValid);
            this.setState({ conf_pass_err: "Password Does Not Match" });
        } else {
            // var isValid = true;
            this.setState({ conf_pass_err: "" });
        }

        return data_arr.length;        
    }

    submit=(e)=>{
        const userData = JSON.parse(localStorage.getItem("loginUserData"))
        const data={
            email:userData.email,
            exit_pass: $("input[name=exit_pass]").val(),
            new_pass: $("input[name=new_pass]").val(),
            conf_pass: $("input[name=conf_pass]").val(),
        }

        if(this.handleFormValidation(data)==0){
            $(".load").css('display','block');
            $(".sub").css('display','none');
            Axios.post("/prodigypro/api/updateExistingPassword", data)
            .then((res) => {
                $(".load").css('display','none');
                $(".sub").css('display','block');
            //    this.setState({userDataList:data})
                console.log("query",res.data.data.status)
                if(res.data.data.status==200){
					 $("input[name=exit_pass]").val("");
				     $("input[name=new_pass]").val("");
				     $("input[name=conf_pass]").val("");
					 toast.error("Your Password has been Updated Successfully.");
                     // this.setState({msg:"Your Password has been Updated Successfully."})
                }else{
                    toast.error(res.data.data.message);
                }
                // this.setState({userQuery:res.data.data.data})
            })
        }
    }

    render(){
		
		//if (this.state.msg) {
			//return <Redirect  to={{
				//	pathname: "/",
				//	msg:this.state.msg,
				//}} />
			//return  window.location.href = "https://bfccapital.com/prodigypro/"
		// }
  
  
        return(
            <>
            <Helmet>         
                <title>Prodigy Pro - Change Password</title>
            </Helmet>
                <style>
              {`
                .px-row{
                    padding:0 .8rem;
                }
                .load{
                  display:none;
              }
				.eye-button{
                margin-left:-0px;
              }
			   .d-icon{
					float: right;
					top: -35px;
					position: relative;
					width: 24px;
					height: 24px;
					right: 10px;
					cursor: pointer;
               }
               .fa-info{
                 color:#fff;
                 margin-left: 8px;
               }
               #registerTip{
					left: 885px !important;
					max-width: 162px;
					padding: 8px 13px;
               }
               .top-text{
					 position: relative;
					 top:  -20px;
               }
              `}
              </style>
            {/* Page Wrapper */}

         <ToastContainer position="top-right" className="mt-8" />
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
                <li className="breadcrumb-item active" aria-current="page"> Change Password</li>
              </ol>
            </nav>
            <div className="row">
              {/* Area Chart */}
              <div className="col-xl-12 col-lg-12">
                <div className="card shadow mb-4">
                  {/* Card Header - Dropdown */}
                  <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                    <h6 className="m-0 font-weight-bold text-danger"></h6> 
                  </div>
                  {/* Card Body */}
                  <div className="card-body">
                    <div className="">
                      
                        {/* <div class="alert alert-info" role="alert">
                            Please send us your query or feedback. We shall revert to you as soon as possible. Thank You..!
                        </div> */}
                        
                            <div className="col-lg-5 col-md-4 mb-3 mx-auto">
                                <label>Exiting Password <spna classname="text-danger">*</spna></label>
                                <input className="form-control input-text" type="text" placeholder="Enter Exiting Password" name="exit_pass" defaultValue=""/>
                                <small className="text-danger">{this.state.exit_pass_err}</small>
                            </div>
                            <div className="col-lg-5 col-md-4 mb-3 mx-auto">
                                <label>New Password <spna classname="text-danger">*</spna></label>
								{/* <input className="form-control input-text" type="text" placeholder="Enter New Password" name="new_pass" id="new_pass" defaultValue=""/> */}
								 <div className="d-flex">
                                <input id="pass" type="password" placeholder="Enter New Password" className="form-control input-text"  name="new_pass" />

                              </div>
                              <div className="bg-info rounded-circle d-icon" >
                              <i class="fa fa-info" data-tip data-for="registerTip" ></i>
                            </div>
                            <ReactTooltip id="registerTip" place="top" effect="solid">
                              <div className="tool_tip">
                                The password should Alpha-numeric with atleast 1 Capital & Special character ( Ex- Abc123@ )
                              </div>
                            </ReactTooltip>
								<small className="text-danger">{this.state.new_pass_err}</small>
                            </div>
                            <div className="col-lg-5 col-md-4 mb-3 mx-auto">
                            <label>Confirm Password <spna classname="text-danger">*</spna></label>
                                {/*<input className="form-control input-text" type="text" placeholder="Enter Confirm Password" name="conf_pass" defaultValue=""/> */}
								<div className="d-flex">
                                  <input className="form-control input-text" type="password" placeholder="Enter Confirm Password" id="new_pass" name="conf_pass" defaultValue=""/>
                              </div>
                                <div className="rounded-circle d-icon" >
                                <i class="fa fa-fw fa-eye-slash field_icon toggle-password" toggle="#password-field" ></i>
                              </div>
                                <small className="text-danger">{this.state.conf_pass_err}</small>
                            </div>
                            
                            {/* <div className="col-lg-12 col-md-12 mb-4">
                                    <label>Query Message</label>
                                    <textarea className="form-control" name="query_msg"></textarea>
                                   
                            </div> */}
                           
                            <div className="text-center sub">
                            <a href="javascript:void(0);" class="btn btn-danger "  onClick={this.submit.bind()}>
                                Submit 
                            </a>
                            </div>
    
                            <div className="text-center load">
                            <a href="javascript:void(0);" class="btn btn-danger">
                              Loading...
                            </a>
                                {/* <a href="#" className="btn btn-danger shadow-sm">Submit</a> */}
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
export default change_password



