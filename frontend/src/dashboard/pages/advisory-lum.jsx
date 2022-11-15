import React, {component} from 'react';
import Header from './header';
import Footer from './footer';
// import Sidebar from './sidebar';
import {Helmet} from "react-helmet";
import Axios from 'axios';
import $ from 'jquery';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Conservative from "../../assets/images/icons/New folder (2)/Riskometer.png";
import Moderate from "../../assets/images/icons/New folder (2)/Riskometer.png";
import Aggressive from "../../assets/images/icons/New folder (2)/Riskometer.png";
import { Link } from 'react-router-dom';
import riskp from "../../assets/images/icons/New folder (2)/risk-profile-vector.png";

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

        Axios.post("http://localhost:5010/api/User_profile", data)
        .then((res) => {
            this.setState({userList:res.data.data.data})
        })

        const optradio = JSON.parse(localStorage.getItem("optradio"))
         let chartVal = '';
        optradio.map(value => {
            console.log("value",value)
            if((value.optradio1=="Aggressive") && (value.optradio2=="Aggressive") && (value.optradio3=="Aggressive") && (value.optradio3=="Aggressive")){
               let img =   <img src={Aggressive} className="" />
                //    this.setState({chartVal:"Aggressive"})
                chartVal = 'Aggressive';
               this.setState({chartimg:img})
            }
            else if((value.optradio1=="Conservative") && (value.optradio2=="Conservative") && (value.optradio3=="Conservative") && (value.optradio3=="Conservative")){
            //    this.setState({chartVal:"Conservative"})
               chartVal = 'Conservative';
               let img =   <img src={Conservative} className="" />
               this.setState({chartimg:img})
            }
            else {
                // this.setState({chartVal:"Moderate"})
                chartVal = 'Moderate';
               let img =   <img src={Moderate} className="" />
               this.setState({chartimg:img})
            }
        })

        const risk = JSON.parse(localStorage.getItem("risk"));
        console.log("risk",risk);

        const bankData = {
            transaction_type:"Lumpsum",
             anchoring:risk.anchoring,
            constellation:chartVal
        }

        // alert(JSON.stringify(bankData))

        Axios.post("http://localhost:5010/api/getBasketList", bankData)
        .then((res) => {
           let equityList =[];  let debtList =[];  
           //let equityVal =[];   let debtVal =[];  
            res.data.data.data.map(value => {
              if(value.option=="Equity"){
                // this.setState({equityVal:value.isin_no})
                this.setState({equityVal:value.isin_no,equityAMC:value.amc_code})
              }else{
                // this.setState({debtVal:value.isin_no})
                this.setState({debtVal:value.isin_no,debtAMC:value.amc_code})
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
        const amc_array = this.state.equityAMC.split(',');
        for (let index=0;index<answer_array.length;index++) {
            const element = answer_array[index];
            const elementAMC = amc_array[index];
            var isin_DATA= element.replace(/ /g,'');
            var amc_code= elementAMC.replace(/ /g,'');

            const data = {
                isin:isin_DATA,
                amc_code:amc_code
            }

             // alert(JSON.stringify(data))
            Axios.post("http://localhost:5010/api/ProductViaISIN", data)
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
         const amc_array_debt = this.state.debtAMC.split(',');
        for (let index=0;index<answer_array_debt.length;index++) {
            const element = answer_array_debt[index];
            // var isin_DATA= element.replace(/ /g,'');
            const elementAMC = amc_array_debt[index];
            var isin_DATA= element.replace(/ /g,'');
            var amc_code= elementAMC.replace(/ /g,'');


            const data = {
                isin:isin_DATA,
                amc_code:amc_code
            }

            Axios.post("http://localhost:5010/api/ProductViaISIN", data)
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
            .navtop
            {
                display: inline-flex;
                font-size: 14px;
                background-color: hsla(0,0%,100%,.26);
                border: 1px solid #DA6066;
                border-radius: 50px;
                backdrop-filter: blur(26px);
                -webkit-backdrop-filter: blur(26px);
                padding: 4px;
              
            }
            .risk-shadow
             {
                background: #FFFFFF;
box-shadow: 0px 1px 8px rgba(0, 0, 0, 0.2);
border-radius: 15px;
padding: 15px 16px;
             } 
          `}
          </style>

        {/* Page Wrapper */}
      <div id="wrapper">
        {/* Sidebar */}
            {/* <Sidebar mainTab="advisory"  innertab="advisory-lumpsum"/> */}
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
<div className='container'>
                    <div className="row p-5 bg-c bg-light-red">
                        <div className='col-md-6'>
                        <form>
                    
                    <div className="col-12 mb-4 risk-shadow">
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

                    <div className="col-12 mb-4 risk-shadow">
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

                    <div className="col-12 mb-4 risk-shadow">
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

                    <div className="col-12 mb-4 risk-shadow">
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
                    <div className="text-right">
                        <a href="#" className="btn-custom w-100  col-3">Submit</a>
                    </div>
                </form>

                        </div>
                        <div className="col-xl-6 col-lg-6">
                        <div className='col-md-12'>

<img src={riskp} alt="" className='img-fluid'/>
</div>
                            <div className="">
                                {/* <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                    <h6 className="m-0 font-weight-bold text-danger">Advisory - Lumpsum</h6> 
                                </div> */}
                                        {/* Card Body */}
                                <div className="card-body" id="img">
                               
                                    <div className="col-12 text-center" >
                                      {this.state.chartimg}


                                      <h5 className='text-center py-4'>Your Risk Profile : Moderate</h5>
                                    </div>
                                   
                                </div>

                                <div className="card-body " id="Wait">
                                    <div className="col-12" >
                                        Please Wait...
                                    </div>
                                </div>
                              
                            </div>
                        </div>
                        
                    </div> 
                    <div className="row">
                                        <div className="col-6 mt-4 mb-3 text-left">
                                            <Link className="new-btn1 shadow-sm" to="/prodigypro/dashboard/advisory-lumpsum" >Back</Link>
                                        </div>
                                        <div className="col-6 mt-4 mb-3 text-right">
                                            <a className="new-btn1 shadow-sm" href="javascript:void(0);">Continue</a>
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
