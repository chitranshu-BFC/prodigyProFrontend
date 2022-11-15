import React, {component} from 'react';
import Header from './header';
import Footer from './footer';
import Sidebar from './sidebar';
import {Helmet} from "react-helmet";
import Axios from 'axios';
import $ from 'jquery';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Conservative from "../../assets/images/icons/1.png";
import Moderate from "../../assets/images/icons/2.png";
import Aggressive from "../../assets/images/icons/3.png";
import { Link } from 'react-router-dom';

class Advisory_lum extends React.Component{
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
        console.log("user",userData)
        const data = {
            email:userData.email,
        }

        Axios.post("/prodigypro/api/User_profile", data)
        .then((res) => {
            this.setState({userList:res.data.data.data})
        })

        const optradio = JSON.parse(localStorage.getItem("optradio"))
       
        optradio.map(value => {
            console.log("value",value)
            if((value.optradio1=="Aggressive") && (value.optradio2=="Aggressive") && (value.optradio3=="Aggressive") && (value.optradio3=="Aggressive")){
               let img =   <img src={Aggressive} className="w-50 center" />
               this.setState({chartVal:"Aggressive"})
               this.setState({chartimg:img})
            }
            else if((value.optradio1=="Conservative") && (value.optradio2=="Conservative") && (value.optradio3=="Conservative") && (value.optradio3=="Conservative")){
               this.setState({chartVal:"Conservative"})
               let img =   <img src={Conservative} className="w-50 center" />
               this.setState({chartimg:img})
            }
            else {
                this.setState({chartVal:"Moderate"})
               let img =   <img src={Moderate} className="w-50 center" />
               this.setState({chartimg:img})
            }
        })

        const bankData = {
            transaction_type:"Lumpsum",
            anchoring:"",
            constellation:this.state.chartVal
        }

        // alert(JSON.stringify(bankData))

        Axios.post("/prodigypro/api/getBasketList", bankData)
        .then((res) => {
           let equityList =[];  let debtList =[];  
           //let equityVal =[];   let debtVal =[];  
            res.data.data.data.map(value => {
              if(value.option=="Equity"){
                this.setState({equityVal:value.isin_no})
              }else{
                this.setState({debtVal:value.isin_no})
              }
            })
        })
    }

    continue = e => {       

        $("#img").css('display','none');
        $("#Wait").css('display','block');
        // $("#showData").html("");
        $("#prod_div").css('display','none');
        let equityList =[];  let debtList =[];  
        const answer_array = this.state.equityVal.split(',');
        for (let index=0;index<answer_array.length;index++) {
            const element = answer_array[index];
            var isin_DATA= element.replace(/ /g,'');
            const data = {
                isin:isin_DATA,
            }

            Axios.post("/prodigypro/api/ProductViaISIN", data)
            .then((result) => {
                $("#Wait").css('display','none');
                $("#prod_div").css('display','block');
                let products = result.data.data.data[0];
                let htmlDATa='<tr><td>'+products.PRODUCT_LONG_NAME+'</td></tr>';
                $("#showData").append(htmlDATa);
                equityList.push(products);
                localStorage.setItem("schemeList",JSON.stringify(equityList))
                this.setState({equity:equityList})
            })
         }

        const answer_array_debt = this.state.debtVal.split(',');
        for (let index=0;index<answer_array_debt.length;index++) {
            const element = answer_array_debt[index];
            var isin_DATA= element.replace(/ /g,'');
            const data = {
                isin:isin_DATA,
            }

            Axios.post("/prodigypro/api/ProductViaISIN", data)
            .then((result) => {
                let products = result.data.data.data[0];
                debtList.push(products);
                this.setState({debt:debtList})
            })
         }
    }

    equity=(e)=>{
        let equity =[];
        $("#showData").html("");
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
            }
        })
    }

    render(){
      
        return(
        <>
        <Helmet>         
            <title>Tax Planning - Lumpsum</title>
        </Helmet>
            <style>
          {`
            .card{
                min-height:420px;
            }
            #prod_div{
                display:none;
            }
            #Wait{
                display:none;
            }
            .center {
                display: block;
                margin-left: auto;
                margin-right: auto;
                width: 50%;
            }
			.text-color{
				color:#fff !important;
			}
          `}
          </style>

        {/* Page Wrapper */}
      <div id="wrapper">
        {/* Sidebar */}
            <Sidebar mainTab="advisory"  innertab="advisory-lumpsum"/>
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
                            <li className="breadcrumb-item active" aria-current="page">Lumpsum</li>
                        </ol>
                    </nav>

                    <div className="row">
                        <div className="col-xl-12 col-lg-12">
                       
                            <div className="card shadow">
                                <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                    <h6 className="m-0 font-weight-bold text-danger">Advisory - Lumpsum</h6> 
                                </div>
                                        {/* Card Body */}
                                <div className="card-body" id="img">
                                    <div className="col-12" >
                                      {this.state.chartimg}
                                    </div>
                                    <div className="row">
                                        <div className="col-6 mt-4 mb-3 text-left">
                                            <Link className="btn btn-danger shadow-sm" to="/prodigypro/dashboard/advisory-lumpsum" >Back</Link>
                                        </div>
                                        <div className="col-6 mt-4 mb-3 text-right">
                                            <a className="btn btn-danger shadow-sm" href="javascript:void(0);" onClick={this.continue.bind()}>Continue</a>
                                        </div>
                                    </div>
                                </div>

                                <div className="card-body" id="Wait">
                                    <div className="col-12" >
                                        Please Wait...
                                    </div>
                                </div>
                                <div className="card-body" id="prod_div">
                                <div className="col-5 pull-right" >
                                    <ul class="nav nav-pills nav-fill navtop">
                                        <li class="nav-item">
                                            <a class="nav-link active btn btn-sm btn-outline-primary shadow-sm" href="#menu1" data-toggle="tab" onClick={this.equity.bind()}>Equity</a>
                                        </li>
                                        <li class="nav-item">
                                            <a class="nav-link btn btn-sm btn-outline-primary ml-2 shadow-sm" href="#menu2" data-toggle="tab" onClick={this.debt.bind()}>Debt</a>
                                        </li>
                                    </ul>
                                </div>
                                <br></br>
                                <br></br>
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
                                        <a className="btn btn-danger shadow-sm" data-toggle="modal"    data-target="#sip_purchase">Continue</a>
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
                        <label htmlFor="Profile" >Select Profile</label>
                        <select className="form-control" onChange={this.userProfile} name="usersId">
                        <option value="">Select</option> 
                        {this.state.userList?
                            this.state.userList.map((item, key) =>
                            <option value={item.id}>{item.investor_name} {item.jh1_name!="undefined" ? " | "+item.jh1_name:null}{item.jh2_name!="undefined" ? " | "+item.jh2_name:null}</option>
                        ):null}               
                        </select>
                    </div>                 
                </form>
              </div>
              <div className="modal-footer">
                <a type="button" className="btn btn-danger shadow-sm" href="/prodigypro/dashboard/advisory-lum-cart">Continue</a>
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
export default Advisory_lum
