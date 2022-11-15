import React, {component} from 'react';
import Header from './header';
import Footer from './footer';
import Sidebar from './sidebar';
import {Helmet} from "react-helmet";

import Axios from 'axios';
import $ from 'jquery';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, Redirect } from 'react-router-dom';
import Swal from 'sweetalert2'

class Advisory_SIP extends React.Component{
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

        $("#wait").css('display','block');
        let tenure ="";
        Axios.post("http://localhost:5010/api/usergoaldata", data)
        .then((res) => {
            let list = [];
            if(res.data.data.data==undefined){
                this.setState({userGoal:[]})
               // $("#wait").css('display','none');
                $("#wait").html('No Data Found');
            }else{

                this.setState({userGoal:res.data.data.data})
                res.data.data.data.map(value => {
                    let tenure_arr = value.tenure.split(' ');
                    let period = parseInt(tenure_arr[0])
                        const data2 = {
                            period:period,
                            wealth_amount:value.purchase_cost,
                        }

                        Axios.post("http://localhost:5010/api/sipData", data2)
                        .then((res) => {
                            $("#wait").css('display','none');
                            let p = value.purchase_cost;
                            let future_cost = p * Math.pow((1 + 12 / 100), period);
                           
                            list.push({goal_name:value.goal_name,tenure:value.tenure,purchase_cost:value.purchase_cost,sip_amount:res.data.data.sip_amount,goaluserid:value.goaluserid,future_cost:future_cost})
                            this.setState({userGoalList:list})
                        })
                })
            }
        })
    }


    
  iinNull=e=>{
    Swal.fire({
      html: `Dear Investor, you need to complete a One Time Registration for Investing online. Please contact us ! BFC Capital - <a href="mailto:enquiry@bfccapital.com">enquiry@bfccapital.com</a>`,
      dangerMode: true,
    })
  }


    validation(data){
        let dataErr = [];
        if(data.goal_name==''){
            var err ={goel_err:"1"}
            dataErr.push(err);
            this.setState({goel_err:"Mandatory Field"})
        }else{
            this.setState({goel_err:""})
        }

        if(data.tenure==''){
            var err ={tenure_err:"1"}
            dataErr.push(err);
            this.setState({tenure_err:"Mandatory Field"})
        }else{

            this.setState({tenure_err:""})
        }

        var patt = /^[0-9]*$/;
        var accValid = patt.test(data.purchase_cost);
        if(data.purchase_cost==''){
            var err ={purchase_cost_err:"1"}
            dataErr.push(err);
            this.setState({purchase_cost_err:"Mandatory Field"})
        }else if (accValid == false) {
            var err ={purchase_cost_err:"1"}
            dataErr.push(err);
            this.setState({ purchase_cost_err: "Only Digits" });
        }else{
            this.setState({purchase_cost_err:""})
        }

        return dataErr.length;
    }

    save = e =>{
        const userData = JSON.parse(localStorage.getItem("loginUserData"))
        const data = {
            email:userData.email,
            goal_name:$('select[name="goal_name"]').val(),
            tenure:$('input[name="tenure"]').val(),
            purchase_cost:$('input[name="purchase_cost"]').val(),
        }

        // alert(Object.entries(data).length)
        if(this.validation(data)==0){
            this.setState({userGoalList:""})
            $("#wait").css('display','block');
            Axios.post("http://localhost:5010/api/saveusergoaldata", data)
            .then((res) => {
                console.log("res",res.data)
                $('select[name="goal_name"]').val("");
                $('input[name="tenure"]').val("");
                $('input[name="purchase_cost"]').val("");
                // this.setState({userGoalList:list})
                const dd = {
                    email:userData.email,
                }
        
                let tenure ="";
                Axios.post("http://localhost:5010/api/usergoaldata", dd)
                .then((res) => {
                    let list = [];
                    this.setState({userGoal:res.data.data.data})
                    res.data.data.data.map(value => {
                        let tenure_arr = value.tenure.split(' ');
                        let period = parseInt(tenure_arr[0])
                            const data2 = {
                                period:period,
                                wealth_amount:value.purchase_cost,
                            }
        
                            Axios.post("http://localhost:5010/api/sipData", data2)
                            .then((res) => {
                                $("#wait").css('display','none');
                                let p = value.purchase_cost;
                                const future_cost = p * Math.pow((1 + 12 / 100), period);
                                console.log("Math",future_cost)
                                list.push({goal_name:value.goal_name,tenure:value.tenure,purchase_cost:value.purchase_cost,sip_amount:res.data.data.sip_amount,goaluserid:value.goaluserid,future_cost:future_cost})
                                this.setState({userGoalList:list})
                            })
                    })
                })
            })
        }
    }
    
    delete(id) {
        $("#wait").css('display','block');
        this.setState({userGoalList:""})
        const userData = JSON.parse(localStorage.getItem("loginUserData"))
        const data = {
            goal_userId:id,
        }

        Axios.post("http://localhost:5010/api/delete_goal", data)
        .then((res) => {
            const dd = {
                email:userData.email,
            }
            toast.error("Deleted Successfully");
            let tenure ="";
            Axios.post("http://localhost:5010/api/usergoaldata", dd)
            .then((res) => {
                let list = [];
                if(res.data.data.data==undefined){
                    this.setState({userGoal:[]})
                   // $("#wait").css('display','none');
                    $("#wait").html('No Data Found');
                }else{
                    this.setState({userGoal:res.data.data.data})
                    res.data.data.data.map(value => {
                        let tenure_arr = value.tenure.split(' ');
                        if(tenure_arr[0]=="Upto"){
                            let period = 1;
                            const data2 = {
                                period:period,
                                wealth_amount:value.purchase_cost,
                            }
                        
                            Axios.post("http://localhost:5010/api/sipData", data2)
                            .then((res) => {
                                $("#wait").css('display','none');
                                
                                let p = value.purchase_cost;
                                const future_cost = p * Math.pow((1 + 12 / 100), period);
                                console.log("Math",future_cost)
                                list.push({goal_name:value.goal_name,tenure:value.tenure,purchase_cost:value.purchase_cost,sip_amount:res.data.data.sip_amount,goaluserid:value.goaluserid,future_cost:future_cost})
                                this.setState({userGoalList:list})
                            })
        
                        }else{
                            let period = parseInt(1)+parseInt(tenure_arr[0])
                            const data2 = {
                                period:period,
                                wealth_amount:value.purchase_cost,
                            }
        
                            Axios.post("http://localhost:5010/api/sipData", data2)
                            .then((res) => {
                                $("#wait").css('display','none');
                                
                                let p = value.purchase_cost;
                                const future_cost = p * Math.pow((1 + 12 / 100), period);
                                console.log("Math",future_cost)
                                list.push({goal_name:value.goal_name,tenure:value.tenure,purchase_cost:value.purchase_cost,sip_amount:res.data.data.sip_amount,goaluserid:value.goaluserid,future_cost:future_cost})
                                this.setState({userGoalList:list})
                            })
                        }
                    })
                }
            })
        })
    }

    cartdata(id){ 
        this.state.userGoalList.map(val => {
            if (val.goaluserid == id) {
              this.setState({usergoalData:val})
            }
        })
    }   

    render(){
        // console.log("goalData",localStorage.getItem("goalData"))
        if(this.state.usergoalData){
            localStorage.setItem("goalData",JSON.stringify(this.state.usergoalData))
            return <Redirect to='/prodigypro/dashboard/goal-wise-recommendation' />
        }
        return(
        <>
        <Helmet>         
            <title>Prodigy Pro - Advisory-SIP</title>
        </Helmet>
            <style>
          {`
           .text-color{
				color:#fff !important;
			}
            .nav-link{
                padding: .25rem .5rem;
            }

            th{
                white-space: nowrap;
            }
            .table td, .table th {
                padding: .60rem;
                font-size:14px;
                vertical-align: top;
                border-bottom: 1px solid #CDD4FE;
                border-top: none !important;
            }
            #wait{
                display:none;
            }
           

          `}
          </style>

        {/* Page Wrapper */}
      <div id="wrapper">
        {/* Sidebar */}
            {/* <Sidebar mainTab="advisory"  innertab="advisory-sip"/> */}
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
            <div className="container-fluid ads">
                {/* Page Heading */}
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><a href="home">Home</a></li>
                            <li className="breadcrumb-item">Advisory</li>
                            <li className="breadcrumb-item active" aria-current="page">SIP</li>
                        </ol>
                    </nav>
                    <div className="row p-26">
                        {/* Card Header - Dropdown */}
                       
            <div className="col-xl-12 col-lg-12">
                <div className=" mb-3">
                <div className=" py-3 align-items-center justify-content-between">
                                <h6 className="m-0 heading-cust">Set Your Goal</h6> 
                            </div>
                            {/* Card Body */}
                    <div className=" filter-card-body">
                        <div className="row">
                       
                            <div className="col-lg-3 col-md-3 col-sm-6">
                                <div class="form-group">
                                        <label>Select Your Goal  <spna className="text-danger">*</spna></label>
                                        <select className="form-control selectpicker" name="goal_name" data-live-search="true">
                                            <option value="">Select</option>
                                            <option value="1">Child Education</option>
                                            <option value="2">Retirement</option>
                                            <option value="3">House Purchase</option>
                                            <option value="4">Car Purchase</option>
                                            <option value="5">Vacation</option>
                                            <option value="6">Home Renovation</option>
                                            <option value="7">Wealth Creation</option>
                                            <option value="8">Child Marriage</option>
                                            <option value="9">Other</option>
                                        </select>
                                        <small className="text-danger">{this.state.goel_err}</small>
                                    </div>
                             </div>
                            <div className="col-lg-3 col-md-4 col-sm-6 ">
                                        <label>Tenure  <spna className="text-danger">*</spna><br/></label>
                                        {/* <span className="text-xs text-info">( Select Your Investment Horizon in Years )</span> */}
                                       <input type="text" className="form-control adsi" maxLength="2" name="tenure" onKeyPress={(event) => {
                                                if (!/[0-9]/.test(event.key)) {
                                                event.preventDefault();
                                                }
                                            }}/>
                                        <small className="text-danger">{this.state.tenure_err}</small>
                             </div>
                             
                             <div className="col-lg-3 col-md-3 col-sm-6 ">
                                        <label>Present Cost  <spna className="text-danger">*</spna></label>
                                        <input type="text" className="form-control adsi" name="purchase_cost"/>
                                        <small className="text-danger">{this.state.purchase_cost_err}</small>
                             </div>
                             <div className="col-lg-3 col-md-3 col-sm-6 my-auto pt-2">
                                    <a className="new-btn1 shadow-sm mt-btn w-100 text-color" onClick={this.save.bind()}>Save</a>
                             </div>
                        </div>
                    </div>
                </div>
                <div className=" py-3 align-items-center justify-content-between">
                                <h6 className="m-0 heading-cust">Goal Summary</h6> 
                            </div>
                <div className="card shadow tab-pane active" role="tabpanel" id="menu1">
                                {/* <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                    <h6 className="m-0 font-weight-bold text-danger"></h6>
                                </div> */}
                                        {/* Card Body */}
                                <div className="card-body goal-s">
                                    <table class="table">
                                 
                                        <thead className="">
                                            <tr>
                                                <th scope="col" className="red">Goal</th>
                                                <th scope="col" className="red">Tenure (in Years)</th>
                                                <th scope="col" className="red">Present Cost</th>
                                                <th scope="col" className="red">Future Cost</th>
                                                <th scope="col" className="red">SIP (Per Month)</th>
                                                <th scope="col" className="red">Delete</th>
                                                <th scope="col" className="red">Continue</th>
                                            </tr>
                                        </thead>
                                        <tbody id="wait">  Please Wait...</tbody>
                                        <tbody>
                                      
                                         {this.state.userGoalList?
                                            this.state.userGoalList.map((item, key) =>
                                                <tr id={"row_"+item.goaluserid}>
                                                    <td>{item.goal_name}</td>
                                                    <td>{item.tenure}</td>
                                                    <td>₹{item.purchase_cost}</td>
                                                    <td>₹{Number((item.future_cost).toFixed(1))}</td>
                                                    <td>₹{item.sip_amount}</td>
                                                    <td><a className="btn btn-danger btn-sm shadow-sm" href="javascript:void(0);" onClick={this.delete.bind(this,item.goaluserid)}><i className="fas fa-trash"></i></a></td>
                                                    <td><a className="btn btn-danger btn-sm shadow-sm" href="javascript:void(0);" onClick={this.state.userIin?this.cartdata.bind(this,item.goaluserid):this.iinNull.bind()}>Continue</a></td>
                                                </tr>  
                                            ):null
                                          }                              
                                        </tbody>
                                    </table>
                                </div>
                            </div>
            </div>
        </div>
    
                </div>

      </div>
          {/* End of Main Content */}
 {/*POPUP Modal */}
 {/* <div className="modal fade" id="sip_purchase" tabIndex={-1} role="dialog" aria-labelledby="sipTitle" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title text-danger" id="sipTitle">Advisory - SIP</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">
                <form>
                    <div className="col mb-3">
                        <label htmlFor="Profile" >Monthly Inflow</label>
                        <input type="text" className="form-control" />
                    </div>
                    <div className="col mb-3">
                        <label htmlFor="Profile" >Monthly Outflow</label>
                        <input type="text" className="form-control" />
                    </div>  
                                  
                </form>
              </div>
              <div className="modal-footer">
                <a type="button" className="btn btn-secondary shadow-sm" data-dismiss="modal" aria-label="Close">Skip</a>
                <a type="button" className="btn btn-danger shadow-sm" href="">Continue</a>
              </div>
            </div>
          </div>
        </div> */}


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
<script></script>
export default Advisory_SIP
