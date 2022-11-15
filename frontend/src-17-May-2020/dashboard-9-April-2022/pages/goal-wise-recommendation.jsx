import React, {component} from 'react';
import Header from './header';
import Footer from './footer';
import Sidebar from './sidebar';
import {Helmet} from "react-helmet";
import Axios from 'axios';
import $ from 'jquery';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class Goal_Wise_Recommendation extends React.Component{
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
        const mandList = []; const list = '';
        const userData = JSON.parse(localStorage.getItem("loginUserData"))
        const data = {
            email:userData.email,
        }
        
        Axios.post("/prodigypro/api/User_profile", data)
        .then((res) => {
            console.log("aa",res.data.data)
            res.data.data.data.map((dataVal)=>{
                const mandate = {
                    email:userData.email,
                    IIN:dataVal.customer_id,
                }

                console.log("cc",JSON.stringify(mandate));
                Axios.post("/prodigypro/api/mandateList", mandate)
                .then((result) => {
                    console.log("aa",result.data.data)
                    if(result.data.data.status==200){
                        result.data.data.data.map((Val)=>{
                            Val.IIN = dataVal.customer_id;
                            mandList.push(Val)
                           // console.log("cc",mandList)
                            this.setState({userMandateData:mandList})
                        })
                    }
                })
            })

            this.setState({userList:res.data.data.data})
        })

        const usergoalData = JSON.parse(localStorage.getItem("goalData"))
        console.log("goalData asxsa",usergoalData)
         var bankData ='';
			if(usergoalData.tenure>10){
				bankData = {
					transaction_type:"SIP",
					anchoring:10,
					constellation:"Aggressive"
				}
			}else{
				bankData = {
					transaction_type:"SIP",
					anchoring:usergoalData.tenure,
					constellation:"Aggressive"
				}
			}
        $("#Wait").css('display','block');
        $("#showData").html("");
        $("#prod_div").css('display','none');

        Axios.post("/prodigypro/api/getBasketList", bankData)
        .then((res) => {
            let isinList =[]; let isin_no ='';
			if(usergoalData.tenure>10){
            isin_no = res.data.data.data[1].isin_no;
           }else{
            isin_no = res.data.data.data[0].isin_no;
           }
            if(isin_no!=""){
                const answer_array = isin_no.split(',');
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

    userProfile = e => {
        let userPro_id; let mandList =[];
        this.setState({userMandateList:""})
        userPro_id = $('select[name="usersId"]').val();
        const userData = JSON.parse(localStorage.getItem("loginUserData"))
        this.state.userList.map(value => {
            if(value.id==userPro_id){
                //customer_id
                localStorage.setItem("user",JSON.stringify(value))
                this.state.userMandateData.map((val)=>{
                    console.log("user",JSON.stringify(val))
                    if(val.IIN==value.customer_id){
                        mandList.push(val)
                        this.setState({userMandateList:mandList})
                    }
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
            window.location.href="/prodigypro/dashboard/advisory-sip-cart"
        }

    }

    render(){
        
        return(
        <>
        <Helmet>         
            <title>Goal Wise Recommedation</title>
        </Helmet>
            <style>
          {`
			  .text-color{
				color:#fff !important;
			}
            .card{
                min-height:420px;
            }
            #prod_div{
                display:none;
            }
            #Wait{
                display:none;
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

            {/* Topbar */}
                <Header/>
            {/* End of Topbar */}

            {/* Begin Page Content */}
            <div className="container-fluid">
                {/* Page Heading */}
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><a href="home">Home</a></li>
                            <li className="breadcrumb-item">Advisory</li>
                            <li className="breadcrumb-item active" aria-current="page">SIP</li>
                            <li className="breadcrumb-item active" aria-current="page">Goal Wise Recommendation</li>
                        </ol>
                    </nav>

                    <div className="row">
                        <div className="col-xl-12 col-lg-12">
                            <div className="card shadow">
                                <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                    <h6 className="m-0 font-weight-bold text-danger">Portfolio Mix</h6> 
                                </div>
                                        {/* Card Body */}
                                <div className="card-body" id="Wait">
                                    <div className="col-12" >
                                        Please Wait...
                                    </div>
                                </div>
                                <div className="card-body"  id="prod_div">
                                    <div className="col-12">
                                    <table class="table table-striped table-bordered">
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
                                        <a className="btn btn-danger shadow-sm text-color" data-toggle="modal"    data-target="#sip_purchase">Continue</a>
                                    </div>
                                    
                                     {/* disclaimer */}
                                     <div class="alert alert-secondary mb-0" role="alert">
                                        <p className="text-disclaimer mb-0">Mutual Fund investments are subject to market risks, please read the scheme related documents carefully before investing.</p>  
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
                <h5 className="modal-title text-danger" id="sipTitle">Investment Details</h5>
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
                    <div className="col mb-3">
                        <label htmlFor="Profile" >Select Mandate <span className='text-danger'>*</span></label>
                        <select className="form-control" name="mandate" onChange={this.getMandate}>
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
              <div className="modal-footer">
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
export default Goal_Wise_Recommendation
