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
import { Link, Redirect } from 'react-router-dom';
import Swal from 'sweetalert2'


class Advisory_Lumpsum extends React.Component{
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
        Axios.post("/prodigypro/api/User_profile", data)
        .then((res) => {
            // console.log("dscd",res.data.data.data)
            this.setState({userList:res.data.data.data})
        })
    }

     iinNull=e=>{
        Swal.fire({
          html: `Dear Investor, you need to complete a One Time Registration for Investing online. Please contact us ! BFC Capital - <a href="mailto:enquiry@bfccapital.com">enquiry@bfccapital.com</a>`,
          dangerMode: true,
        })
      }

    handleValidation(){
        let anchoring = $('select[name="anchoring"]').val();
        let constellation = $('select[name="constellation"]').val();

        if(anchoring==""){
            var isValid =false;
            this.setState({anchoring_err:"Mandatory Field"})
        }else{
            var isValid =true;
            this.setState({anchoring_err:""})
        }

        if(constellation==""){
            var isValid =false;
            this.setState({constellation_err:"Mandatory Field"})
        }else{
            var isValid =true;
            this.setState({constellation_err:""})
        }

        return isValid
    }

    getBasket=(e)=>{
       
        if(this.handleValidation()){
            let anchoring = $('select[name="anchoring"]').val();
            let constellation = $('select[name="constellation"]').val();
            $("#Wait").css('display','block');
            $("#showData").html("");
            $("#prod_div").css('display','none');
            const bankData = {
                 transaction_type:"Lumpsum",
                 anchoring:anchoring,
                 constellation:constellation
            }
            
            Axios.post("/prodigypro/api/getBasketList", bankData)
            .then((res) => {
                let isinList =[];  let equityList =[];  let debtList =[];  
                res.data.data.data.map(value => {
                if(value.isin_no!=""){
                    const answer_array = value.isin_no.split(',');
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
                            if(value.option=="Debt"){
                                debtList.push(products);
                                this.setState({debt:debtList})
                            }else{
                               let htmlDATa='<tr><td>'+products.PRODUCT_LONG_NAME+'</td></tr>';
                                $("#showData").append(htmlDATa);
                                equityList.push(products);
                                localStorage.setItem("schemeList",JSON.stringify(equityList))
                                this.setState({equity:equityList})
                            }
                        })
                     }
                
                    localStorage.setItem("isinDATA",JSON.stringify(isinList))

                }else{
                    $("#Wait").css('display','none');
                    $("#showData").html("NO DATA FOUND...");
                }
              })
            })
        }
        

        
    }

    equity=(e)=>{
        let equity =[];
        $("#showData").html("");
		  $(".tool_tip").html(" Suitable for those investors who wish to generate higher tax adjusted returns.");
		   $(".tool-msg").html(" Suitable for those investors who wish to generate higher tax adjusted returns.");
        this.state.equity.map(value => {
            let htmlDATa='<tr><td>'+value.PRODUCT_LONG_NAME+'</td></tr>';
            $("#showData").append(htmlDATa);
            equity.push(value);
            localStorage.setItem("schemeList",JSON.stringify(equity))
            
        })
    }

    debt=(e)=>{
        let debt=[];
        $("#showData").html("");
		  $(".tool_tip").html("Suitable for those investors who wish to earn a stable and regular income with lesser amount of risk");
		  $(".tool-msg").html("Suitable for those investors who wish to earn a stable and regular income with lesser amount of risk");
        this.state.debt.map(value => {
            let htmlDATa='<tr><td>'+value.PRODUCT_LONG_NAME+'</td></tr>';
            $("#showData").append(htmlDATa);
            debt.push(value);
            localStorage.setItem("schemeList",JSON.stringify(debt))
           
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
            }
        })
    }

    AnwQue=e=>{
        //const data = [];
        let optradio1 = $("input:radio[name=optradio1]:checked").val();
        let optradio2 = $("input:radio[name=optradio2]:checked").val();
        let optradio3 = $("input:radio[name=optradio3]:checked").val();
        let optradio4 = $("input:radio[name=optradio4]:checked").val();
        const data = [{
            optradio1,
            optradio2,
            optradio3,
            optradio4
        }]

        this.setState({optradio:data})
        console.log("optradio",JSON.stringify(data))
        ///localStorage.setItem("optradio",JSON.stringify(data))

    }

	cart=(e)=>{
       
        let userPro_id = $('select[name="usersId"]').val();
        if(userPro_id==''){
            this.setState({profile_err:"Mandatory Field"})
        }else{
            this.setState({profile_err:""})
            window.location.href="/prodigypro/dashboard/advisory-lum-cart"
        }
       
    }

	tooltip=e=>{
        window.$('#tooltipmsg').modal('show');
    }

    render(){
        //console.log("schemeList",localStorage.getItem("schemeList"))
        if(this.state.optradio){
            localStorage.setItem("optradio",JSON.stringify(this.state.optradio))
            return <Redirect to='/prodigypro/dashboard/advisory-lum' />
        }
        return(
        <>
        <Helmet>         
            <title>Prodigy Pro - Get Right Schemes-Lumpsum</title>
        </Helmet>
            <style>
          {`
            .card{
                min-height:420px;
            }
            .nav-link{
                padding: .25rem .5rem;
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
                left: 1080px !important;
                max-width: 202px;
                width:226px;
                padding: 8px 13px;
               }
               .top-text{
                 position: relative;
                 top:  -20px;
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
            <Sidebar mainTab="advisory"  innertab="advisory-lumpsum"/>
        {/* End of Sidebar */}

	  <div className="modal fade"  id="tooltipmsg" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true" >
            <div class="modal-dialog modal-dialog-centered" role="document">
              <div class="modal-content">
                
                <div class="modal-body">
                  <p className="text-danger font-weight-bold tool-msg">
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
                            <li className="breadcrumb-item">Get Right Schemes</li>
                            <li className="breadcrumb-item active" aria-current="page">Lumpsum</li>
                        </ol>
                    </nav>

                    <div className="row">
                                {/* Area Chart */}
                        <div className="col-xl-4 col-lg-4 mt-5">
                            <div className="card shadow mb-4">
                                    {/* Card Header - Dropdown */}
                                        <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                            <h6 className="m-0 font-weight-bold text-danger">Get Right Schemes - Lumpsum</h6> 
                                             
                                        </div>
                                        {/* Card Body */}
                                <div className="card-body">
                                    <div className="col-12 mb-4">
                                        <label>Anchoring  <spna classname="text-danger">*</spna><br/><span className="text-xs text-info">( Select Your Investment Horizon in Years )</span></label>
                                        <select className="form-control" name="anchoring">
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
                                        <small className="text-danger pull-left">{this.state.anchoring_err}</small>
                                    </div>
                                    <div className="col-12 mb-4">
                                        <label>Constellation  <spna classname="text-danger">*</spna><br/><span className="text-xs text-info">( Select Your Risk Profile )</span></label>
                                        <select className="form-control" name="constellation">
                                            <option value="">Select</option>
                                            <option value="Conservative">Conservative</option>
                                            <option value="Moderate">Moderate</option>
                                            <option value="Aggressive">Aggressive</option>
                                        </select>
                                        <small className="text-danger pull-left">{this.state.constellation_err}</small>
                                    </div>
                                    <div className="col-12 mb-3">
                                        <a href="" data-toggle="modal"  data-target="#riskProfile">Know Your Risk Profile</a>
                                    </div>
                                    <div className="col-12 text-right">
                                        <a className="btn btn-danger shadow-sm text-color" onClick={this.getBasket.bind()}>Continue</a>
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-8 col-lg-8">
                        <div className="col-md-6 offset-md-3 mb-3">
                                <ul class="nav nav-pills nav-fill navtop">
                                    <li class="nav-item">
                                        <a class="nav-link active btn btn-sm btn-outline-primary shadow-sm" href="#menu1" data-toggle="tab" onClick={this.equity.bind()}>Equity</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link btn btn-sm btn-outline-primary ml-2 shadow-sm" href="#menu2" data-toggle="tab" onClick={this.debt.bind()}>Debt</a>
                                    </li>
                                </ul>
                            </div>
                            <div className="card shadow">
                                <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                    <h6 className="m-0 font-weight-bold text-danger">Product Basket</h6> 
                                     <div className="px-1 bg-info rounded-circle" >
                                        {/* <i class="fa fa-info" data-tip data-for="registerTip" ></i> */}
                                        <i className="fas fa-info fa-sm fa-fw text-white" data-tip data-for="registerTip" onClick={this.tooltip.bind()}/>
                                    </div>
                                    <ReactTooltip id="registerTip" place="top" effect="solid">
                                        <div className="tool_tip">
                                        Suitable for those investors who wish to generate higher tax adjusted returns.
                                        </div>
                                    </ReactTooltip> 
                                </div>
                                        {/* Card Body */}
                                    <div className="card-body" id="Wait">
                                        <div className="col-12" >
                                            Please Wait...
                                        </div>
                                    </div>
                                <div className="card-body" id="prod_div">
                                    <div className="col-12" >
                                    {/* <div class="alert alert-info p-2" role="alert">
                                        <div className="d-flex">  
                                            <span className="font-weight-bold">Equity</span>  
                                             <a href="#" data-toggle="tooltip" data-placement="top" title="Suitable for those investors who wish to generate higher tax adjusted returns." class="badge badge-danger text-right ml-auto rounded-circle">
                                                <span className="fas fa-info p-1"></span>
                                            </a>
                                        </div> 
                                    </div> */}
                                    <table class="table table-striped table-bordered">
                                        <thead>
                                            <tr>
                                                <th scope="col">Recommended Schemes</th>
                                            </tr>
                                        </thead>
                                        <tbody id="showData">
                                      
                                        </tbody>
                                    </table>
                                    <div class="alert alert-info mb-0" role="alert">
                                        <p className="text-disclaimer mb-0">Mutual Fund investments are subject to market risks, please read the scheme related documents carefully before investing.</p>  
                                    </div> 
                                    </div>
                                    
                                    <div className="col-12 mt-4 text-right">
                                      {this.state.userIin?<a className="btn btn-danger shadow-sm text-color" data-toggle="modal" data-target="#sip_purchase">Continue</a>: <a className="btn btn-danger shadow-sm text-color" onClick={this.iinNull.bind()}>Continue</a>}          
                                        {/* <a className="btn btn-danger shadow-sm text-color" data-toggle="modal"    data-target="#sip_purchase">Continue</a> */}
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
                <h5 className="modal-title text-danger" id="sipTitle">Get Right Schemes - Lumpsum</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">
                <form>
                    <div className="col mb-3">
                        <label htmlFor="Profile" >Select Profile <span className='text-danger'>*</span></label>
                        <select className="form-control" onChange={this.userProfile} name="usersId">
                        <option value="">Select</option> 
                        {this.state.userList?
                            this.state.userList.map((item, key) =>
                            <option value={item.id}>{item.investor_name} {item.jh1_name!="undefined" ? " | "+item.jh1_name:null}{item.jh2_name!="undefined" ? " | "+item.jh2_name:null}</option>
                        ):null}               
                        </select>
						 <small className='text-danger'>{this.state.profile_err}</small>
                    </div> 
                                  
                </form>
              </div>
              <div className="modal-footer">
               <a type="button" className="btn btn-danger shadow-sm" href="javascript:void(0);" onClick={this.cart.bind()}>Continue</a>
              </div>
            </div>
          </div>
        </div>

 {/*Risk Profile*/}
 <div className="modal fade" id="riskProfile" tabIndex={-1} role="dialog" aria-labelledby="riskProfileTitle" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title text-danger" id="riskProfileTitle">Risk Profile</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">
                <form>
                    <div className="col-12 mb-4">
                        <p className="mb-2 font-weight-bold">1. I seek above average returns from my investments</p>
                        <div className="form-check-inline">
                            <label className="form-check-label">
                                <input type="radio" className="form-check-input" name="optradio1" value="Aggressive" /> Agree
                            </label>
                        </div>
                        <div className="form-check-inline">
                            <label className="form-check-label">
                                <input type="radio" className="form-check-input" name="optradio1" value="Moderate" /> Somewhat Agree
                            </label>
                        </div>
                        <div className="form-check-inline disabled">
                            <label className="form-check-label">
                                <input type="radio" className="form-check-input" name="optradio1" value="Conservative" /> Disagree
                            </label>
                        </div>
                    </div> 

                    <div className="col-12 mb-4">
                        <p className="mb-2 font-weight-bold" >2. I am patient with my investments and can bear short term volatility in my portfolio</p>
                        <div className="form-check-inline">
                            <label className="form-check-label">
                                <input type="radio" className="form-check-input" name="optradio2" value="Aggressive" /> Agree
                            </label>
                        </div>
                        <div className="form-check-inline">
                            <label className="form-check-label">
                                <input type="radio" className="form-check-input" name="optradio2" value="Moderate"/> Somewhat Agree
                            </label>
                        </div>
                        <div className="form-check-inline disabled">
                            <label className="form-check-label">
                                <input type="radio" className="form-check-input" name="optradio2" value="Conservative" /> Disagree
                            </label>
                        </div>
                    </div> 

                    <div className="col-12 mb-4">
                        <p className="mb-2 font-weight-bold">3. I have regular and stable source of income</p>
                        <div className="form-check-inline">
                            <label className="form-check-label">
                                <input type="radio" className="form-check-input" name="optradio3" value="Aggressive" /> Agree
                            </label>
                        </div>
                        <div className="form-check-inline">
                            <label className="form-check-label">
                                <input type="radio" className="form-check-input" name="optradio3" value="Moderate"/> Somewhat Agree
                            </label>
                        </div>
                        <div className="form-check-inline disabled">
                            <label className="form-check-label">
                                <input type="radio" className="form-check-input" name="optradio3" value="Conservative" /> Disagree
                            </label>
                        </div>
                    </div> 

                    <div className="col-12 mb-4">
                        <p className="mb-2 font-weight-bold" >4. My outstanding debt/loan is low or that has been provisioned for</p>
                        <div className="form-check-inline">
                            <label className="form-check-label">
                                <input type="radio" className="form-check-input" name="optradio4" value="Aggressive" /> Agree
                            </label>
                        </div>
                        <div className="form-check-inline">
                            <label className="form-check-label">
                                <input type="radio" className="form-check-input" name="optradio4" value="Moderate"/> Somewhat Agree
                            </label>
                        </div>
                        <div className="form-check-inline disabled">
                            <label className="form-check-label">
                                <input type="radio" className="form-check-input" name="optradio4" value="Conservative"/> Disagree
                            </label>
                        </div>
                    </div> 
                    {/* <div className="text-right">
                        <a href="#" className="btn btn-sm btn-danger w-100 shadow-sm col-3">Next</a>
                    </div> */}
                </form>
              </div>
              <div className="modal-footer">
                <a type="button" className="btn btn-danger shadow-sm" href="javascript:void(0);" data-dismiss="modal"  onClick={this.AnwQue.bind()}>Continue</a>
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
export default Advisory_Lumpsum
