import React, { component } from 'react';
import Header from './header';
import Footer from './footer';
import Sidebar from './sidebar';
import { Helmet } from "react-helmet";
import Axios from 'axios';
import $ from 'jquery';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactTooltip from 'react-tooltip';
import { Link, Redirect } from 'react-router-dom';
// import SelectPicker from "react-select-picker";
import Select from 'react-select';
import riskp from "../../assets/images/icons/New folder (2)/risk-profile-vector.png";

import sunderam from "../../assets/images/icons/New folder (2)/Sundaram_Mutual_Fund.png";
import sbi from "../../assets/images/icons/New folder (2)/sbi mutual fund.png";
import idfc from "../../assets/images/icons/New folder (2)/IDFC.png";
import { FaTrash } from "react-icons/fa";



class Advisory_Lumpsum extends React.Component {
    hide1() {
        $("#formhide").css({ "display": "none" });
        $("#confirm").css({ "display": "block" });

    }
    hide2() {
        $("#confirm").css({ "display": "none" });
        $("#purchase").css({ "display": "block" });

    }
    constructor() {
        super();
        this.state = {
            users: []
        };
        this.state = {
            Items: []
        };
    }

    componentDidMount() {
        const schemeList = []; const list = '';
        const userData = JSON.parse(localStorage.getItem("loginUserData"))
        const data = {
            email: userData.email,
        }
        // alert(data.email)
        Axios.post("http://localhost:5010/api/User_profile", data)
            .then((res) => {
                // console.log("dscd",res.data.data.data)
                this.setState({ userList: res.data.data.data })
            })
    }

    handleValidation() {
        let data_Err = [];
        let anchoring = $('select[name="anchoring"]').val();
        let constellation = $('select[name="constellation"]').val();

        if (anchoring == "") {
            var isValid = { anchoring: 1 };
            data_Err.push(isValid);
            this.setState({ anchoring_err: "Mandatory Field" })
        } else {
            var isValid = true;
            this.setState({ anchoring_err: "" })
        }

        if (constellation == "") {
            var isValid = { constellation: 1 };
            data_Err.push(isValid);
            this.setState({ constellation_err: "Mandatory Field" })
        } else {
            var isValid = true;
            this.setState({ constellation_err: "" })
        }

        return data_Err.length;
    }

    getBasket = (e) => {

        if (this.handleValidation() == 0) {
            let anchoring = $('select[name="anchoring"]').val();
            let constellation = $('select[name="constellation"]').val();
            $("#Wait").css('display', 'block');
            $("#showData").html("");
            $("#prod_div").css('display', 'none');
            const bankData = {
                transaction_type: "Lumpsum",
                anchoring: anchoring,
                constellation: constellation
            }

            Axios.post("http://localhost:5010/api/getBasketList", bankData)
                .then((res) => {
                    let isinList = []; let equityList = []; let debtList = [];
                    res.data.data.data.map(value => {
                        if (value.isin_no != "") {
                            const answer_array = value.isin_no.split(',');
                            const amc_array = value.amc_code.split(',');
                            for (let index = 0; index < answer_array.length; index++) {
                                const element = answer_array[index];
                                const elementAMC = amc_array[index];
                                var isin_DATA = element.replace(/ /g, '');
                                var amc_code = elementAMC.replace(/ /g, '');

                                const data = {
                                    isin: isin_DATA,
                                    amc_code: amc_code
                                }


                                isinList.push(data);
                                Axios.post("http://localhost:5010/api/ProductViaISIN", data)
                                    .then((result) => {
                                        $("#Wait").css('display', 'none');
                                        $("#prod_div").css('display', 'block');
                                        let products = result.data.data.data[0];
                                        if (value.option == "Debt") {
                                            debtList.push(products);
                                            this.setState({ debt: debtList })
                                        } else {
                                            let htmlDATa = '<tr><td>' + products.PRODUCT_LONG_NAME + '</td></tr>';
                                            $("#showData").append(htmlDATa);
                                            equityList.push(products);
                                            localStorage.setItem("schemeList", JSON.stringify(equityList))
                                            this.setState({ equity: equityList })
                                        }
                                    })
                            }

                            localStorage.setItem("isinDATA", JSON.stringify(isinList))

                        } else {
                            $("#Wait").css('display', 'none');
                            $("#showData").html("NO DATA FOUND...");
                        }
                    })
                })
        }



    }

    equity = (e) => {
        let equity = [];
        $("#showData").html("");
        $(".tool_tip").html(" Suitable for those investors who wish to generate higher tax adjusted returns.");
        $(".tool-msg").html(" Suitable for those investors who wish to generate higher tax adjusted returns.");
        this.state.equity.map(value => {
            let htmlDATa = '<tr><td>' + value.PRODUCT_LONG_NAME + '</td></tr>';
            $("#showData").append(htmlDATa);
            equity.push(value);
            localStorage.setItem("schemeList", JSON.stringify(equity))

        })
    }

    debt = (e) => {
        let debt = [];
        $("#showData").html("");
        $(".tool_tip").html("Suitable for those investors who wish to earn a stable and regular income with lesser amount of risk");
        $(".tool-msg").html("Suitable for those investors who wish to earn a stable and regular income with lesser amount of risk");
        this.state.debt.map(value => {
            let htmlDATa = '<tr><td>' + value.PRODUCT_LONG_NAME + '</td></tr>';
            $("#showData").append(htmlDATa);
            debt.push(value);
            localStorage.setItem("schemeList", JSON.stringify(debt))

        })
    }

    userProfile = e => {
        let userPro_id; let schemeList = [];
        userPro_id = $('select[name="usersId"]').val();
        const userData = JSON.parse(localStorage.getItem("loginUserData"))
        this.state.userList.map(value => {
            if (value.id == userPro_id) {
                localStorage.setItem("user", JSON.stringify(value))
                console.log("user", JSON.stringify(value))
            }
        })
    }

    AnwQue = e => {
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

        if ((optradio1 == undefined) || (optradio2 == undefined) || (optradio3 == undefined) || (optradio4 == undefined)) {
            this.setState({ optradioValid: "All Fields are Requried" })
        } else {
            window.$('#riskProfile').modal('hide');
            this.setState({ optradio: data })
            console.log("optradio", JSON.stringify(data))
        }

        ///localStorage.setItem("optradio",JSON.stringify(data))

    }

    cart = (e) => {
        let userPro_id = $('select[name="usersId"]').val();
        if (userPro_id == '') {
            this.setState({ profile_err: "Mandatory Field" })
        } else {
            this.setState({ profile_err: "" })
            window.location.href = "/prodigypro/dashboard/advisory-lum-cart"
        }
    }

    riskProfile = (e) => {
        let data = {
            anchoring: $('select[name="anchoring"]').val(),
            constellation: $('select[name="constellation"]').val(),
        }
        if (this.handleValidation() == 0) {
            this.setState({ risk: data })
            window.$('#riskProfile').modal('show');
        }
    }



    tooltip = e => {
        window.$('#tooltipmsg').modal('show');
    }

    render() {
        const years = [
            { value: '1 - 2 Years', label: '1 - 2 Years' },
            { value: '2 - 3 Years', label: '2 - 3 Years' },
            { value: '3 - 4 Years', label: '3 - 4 Years' }
        ];

        const risk = [
            { value: "Conservative", label: "Conservative" },
            { value: "Moderate", label: "Moderate" },
            { value: "Aggressive", label: "Aggressive" },
        ];
        const folio = [
            { value: '1544545454', label: '1544545454' },
            { value: '55588888', label: '55588888' },

        ];
        const profile = [
            { value: 'select', label: 'select' },


        ];

        if (this.state.optradio) {
            localStorage.setItem("optradio", JSON.stringify(this.state.optradio))
            localStorage.setItem("risk", JSON.stringify(this.state.risk))
            return <Redirect to='/prodigypro/dashboard/advisory-lum' />
        }
        return (
            <>
                <Helmet>
                    <title>Prodigy Pro - Advisory-Lumpsum</title>
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
            .nav-item {
                padding: 0 1px!important;
            }
            .navtop .nav-link
            {
color:#DA6066;
            }
            .new-btn1 {
                padding: 10px 27px !important;
                box-shadow: 0 5px 10px 5px rgb(0 0 0 / 5%) !important;
                cursor:pointer;
              }
              .br-38 {
                border-radius: 38px;
              }
              .bootstrap-select > .dropdown-toggle
              {
                border-radius:6px;
                border-color:none!important;
                border:none; 
              }
             .risk-shadow
             {
                background: #FFFFFF;
box-shadow: 0px 1px 8px rgba(0, 0, 0, 0.2);
border-radius: 15px;
padding: 13px 16px;
             } 
            
.table td a, .table th
              {
                color:#000;
              }
              #confirm,#purchase
              {
                display:none;
              }
.shadowcart
              {
                background: #FFFFFF;
box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.2);
border-radius: 15px;
              }

          `}
                </style>

                {/* Page Wrapper */}
                <div id="wrapper">
                    {/* Sidebar */}
                    {/* <Sidebar mainTab="advisory"  innertab="advisory-lumpsum"/> */}
                    {/* End of Sidebar */}

                    <div className="modal fade" id="tooltipmsg" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true" >
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
                            <Header />
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

                                <div className="row px-4 pt-4">
                                    {/* Area Chart */}
                                    <div className="col-xl-12 col-lg-12 mt-2">
                                        <div className="card shadowc bg-eag mb-4 p-18 br-38">
                                            {/* Card Header - Dropdown */}
                                            {/* <div className="text-center  py-3 d-flex flex-row align-items-center justify-content-between">
                                            <h6 className="m-0 font-weight-bold text-danger">Advisory - Lumpsum</h6> 
                                             
                                        </div> */}
                                            {/* Card Body */}
                                            <div className="card-body">
                                                <div className='row '>
                                                    <div className="col-4 mb-4">
                                                        <label>Anchoring<br /><span className="text-xs text-info">( Select Your Investment Horizon in Years )</span></label>
                                                        <Select className='bg-c' options={years} />
                                                        {/* <select className="form-control selectpicker bg-c" name="anchoring" data-live-search="true">
                                            <option value="">--Select--</option>
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
                                        </select> */}
                                                        {/* <small className="text-danger pull-left">{this.state.anchoring_err}</small> */}
                                                    </div>
                                                    <div className="col-4 ">
                                                        <label>Constellation<br /><span className="text-xs text-info">( Select Your Risk Profile )</span></label>
                                                        <Select className='bg-c' options={risk} />

                                                        {/* <select className="form-control selectpicker bg-c" name="constellation"data-live-search="true">
                                            <option value="">--Select--</option>
                                            <option value="Conservative">Conservative</option>
                                            <option value="Moderate">Moderate</option>
                                            <option value="Aggressive">Aggressive</option>
                                        </select>
                                        <small className="text-danger pull-left">{this.state.constellation_err}</small> */}
                                                    </div>
                                                    <div className="col-2 mt-5 pt-3">
                                                        <a href="/prodigypro/dashboard/KYP"  >Know Your Risk Profile</a>
                                                        {/* <a href="javascript:void(0);" onClick={this.riskProfile.bind()} >Know Your Risk Profile</a> */}
                                                    </div>
                                                    <div className="col-2 text-right mt-5 pt-3">
                                                        <a className=" new-btn1" onClick={this.getBasket.bind()}>Continue</a>
                                                    </div>
                                                </div>
                                                <div className='row'>
                                                    <div className="col-xl-10 col-lg-10 offset-md-1">
                                                        <div className="col-md-6 offset-md-3 mb-3 mt-5">
                                                            <ul class="nav nav-pills nav-fill navtop">
                                                                <li class="nav-item">
                                                                    <a class="nav-link active fs-16" href="#menu1" data-toggle="tab" onClick={this.equity.bind()}>Equity</a>
                                                                </li>
                                                                <li class="nav-item">
                                                                    <a class="nav-link fs-16" href="#menu2" data-toggle="tab" onClick={this.debt.bind()}>Debt</a>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                        <div className="card shadowc br-50">
                                                            <div className="border-bottom py-4 px-5 d-flex flex-row align-items-center justify-content-between">
                                                                <h6 className="m-0 font-weight-bold text-danger">Product Basket</h6>
                                                                <div className="px-1 bg-info rounded-circle" >
                                                                    {/* <i class="fa fa-info" data-tip data-for="registerTip" ></i> */}
                                                                    <i className="fas fa-info fa-sm fa-fw text-white" data-tip data-for="registerTip" onClick={this.tooltip.bind()} />
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
                                                                <div className="col-12 px-4" >
                                                                    {/* <div class="alert alert-info p-2" role="alert">
                                        <div className="d-flex">  
                                            <span className="font-weight-bold">Equity</span>  
                                             <a href="#" data-toggle="tooltip" data-placement="top" title="Suitable for those investors who wish to generate higher tax adjusted returns." class="badge badge-danger text-right ml-auto rounded-circle">
                                                <span className="fas fa-info p-1"></span>
                                            </a>
                                        </div> 
                                    </div> */}
                                                                    <table class="table">
                                                                        <thead>
                                                                            <tr>
                                                                                <th scope="col">Recommended Schemes</th>
                                                                                <th></th>
                                                                            </tr>
                                                                        </thead>
                                                                        <tbody>
                                                                            <tr>
                                                                                <td><img src={idfc} alt="" className='img-fluid' /></td>
                                                                                <td className='pt-4'><a href='!#'>IDFC Tax Advantage (ELSS)
                                                                                    Fund-Growth-Regular Plan  </a> </td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td><img src={sunderam} alt="" className='img-fluid' /></td>
                                                                                <td className='pt-4'><a href='!#'>Sundaram Tax Savings Fund (Formerly Principal Tax Savings Fund)-
                                                                                    Regular Growth </a> </td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td><img src={sunderam} alt="" className='img-fluid' /></td>
                                                                                <td className='pt-4'><a href='!#'>Sundaram Tax Savings Fund (Formerly Principal Tax Savings Fund)-
                                                                                    Regular Growth </a> </td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td><img src={sbi} alt="" className='img-fluid' /></td>
                                                                                <td className='pt-4'><a href='!#'>SBI Long Term Equity Fund-Regular
                                                                                    Plan-Growth  </a></td>
                                                                            </tr>

                                                                        </tbody>
                                                                    </table>

                                                                </div>

                                                                <div className="col-12 mt-4 text-right">
                                                                    <a className="btn-custom text-color" data-toggle="modal" data-target="#sip_purchase">Continue</a>
                                                                </div>
                                                            </div>
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
                        {/*Purchase Modal */}
                        <div className="modal fade" id="sip_purchase" tabIndex={-1} role="dialog" aria-labelledby="sipTitle" aria-hidden="true">
                            <div className="modal-dialog modal-dialog-centered" role="document">

                                <div className="modal-content  bg-gray">


                                    {/* form */}
                                    <div id='formhide' >
                                        <div className="modal-header">
                                            <h5 className="modal-title text-black" id="sipTitle">Investment Details</h5>
                                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                <span aria-hidden="true">×</span>
                                            </button>
                                        </div>
                                        <div className="modal-body ">
                                            <form>
                                                <div className="col mb-3 ">
                                                    <label htmlFor="Profile" className='text-label' >Select Profile <span className='text-danger'>*</span></label>
                                                    <Select className='bg-c' options={profile} />

                                                </div>

                                            </form>
                                            <div className='cartitemwith'>
                                                <div className='row p-4'>
                                                    <div className='col-md-10  red '>SBI Long Term Equity Fund-Regular
                                                        Plan-Growth </div><div className='col-md-2'><h3><a href="javascript:void(0);" className='red'>×</a></h3></div></div>

                                                <div className="col bg-white py-3 px-4">
                                                    <label htmlFor="Profile" className='fs-14' >Select Folio <span className='text-danger'>*</span></label>
                                                    <Select className='border-pop' options={folio} />

                                                </div>
                                                <div className="col mb-3 bg-white pb-4 px-4 lastin">
                                                    <label htmlFor="amount" className='fs-14' >Enter Amount <span className='text-danger'>*</span></label>
                                                    <input type="text" className="form-control border-pop" name="amount" placeholder='Enter Amount' />

                                                </div>
                                            </div>
                                        </div>
                                        <div className="modal-footer border-0">
                                            <a type="button" className="btn btn-danger shadow-sm" href="javascript:void(0);" onClick={this.hide1}>Continue</a>
                                        </div>
                                    </div>
                                    <div id="confirm">
                                        <div className="modal-header">
                                            <h5 className="modal-title text-black" id="sipTitle">Confirm Purchase</h5>
                                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                <span aria-hidden="true">×</span>
                                            </button>
                                        </div>
                                        <div className="modal-body ">

                                            <div className="col mb-3 border-bottom">
                                                <h6 className='red'>Shivam Shrivstav</h6>
                                                <p>Mode of Holding :  Single <a href="#" className='p-4 ml-5'>Edit</a></p>

                                            </div>



                                            <p className='red'>Axis Long Term Equity Fund-Regular-Growth</p>

                                            <table className='mx-auto'>
                                                <tr className='text-center'>
                                                    <td className='pr-4'>Folio  </td>:
                                                    <td className='pl-4'>124564</td>
                                                </tr>
                                                <tr className='text-center'>
                                                    <td className='pr-4'>Amount  </td>:
                                                    <td className='pl-4'>50,000</td>
                                                </tr>
                                            </table>

                                            <p className='text-center pt-5'><b>Total  :  55,55882</b></p>

                                        </div>
                                        <div className="modal-footer border-0">
                                            <a type="button" className="btn btn-danger shadow-sm" href="javascript:void(0);" onClick={this.hide2}>Continue</a>
                                        </div>

                                    </div>
                                    <div id='purchase'>
                                        <div className="modal-header">
                                            <h5 className="modal-title text-black" id="sipTitle"> Purchase</h5>
                                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                <span aria-hidden="true">×</span>
                                            </button>
                                        </div>
                                        <div className="modal-body ">
                                            <form>
                                                <p className='red'>Investment Total : 5000.00</p>
                                                <div className="col mb-3 ">
                                                    <label htmlFor="Profile" className='text-label' >Select Payment Mode <span className='text-danger'>*</span></label>
                                                    <Select className='bg-c' options={profile} />

                                                </div>
                                                <div className="col mb-3 ">
                                                    <label htmlFor="Profile" className='text-label' >Select Bank <span className='text-danger'>*</span></label>
                                                    <Select className='bg-c' options={profile} />

                                                </div>
                                                <div className="pt-4 mt-3">
                                                    <input className=" input-text" id="emailLink" type="radio" name="payType" value="N" />
                                                    <label htmlFor="emailLink" className="">Link On Email</label>
                                                    <input className="input-text ml-3" id="immediatePay" type="radio" name="payType" value="Y" />
                                                    <label htmlFor="immediatePay" className="">Immediate Payment</label>


                                                </div>

                                            </form>
                                        </div>
                                        <div className="modal-footer border-0">
                                            <a type="button" className="btn btn-danger shadow-sm" href="javascript:void(0);" >Order</a>
                                        </div>
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
                                        <span className='text-danger'> {this.state.optradioValid ? this.state.optradioValid : null}</span>
                                        <form>
                                            <div className='col-md-12'>

                                                <img src={riskp} alt="" className='img-fluid' />
                                            </div>
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
                                                        <input type="radio" className="form-check-input" name="optradio2" value="Moderate" /> Somewhat Agree
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
                                                        <input type="radio" className="form-check-input" name="optradio3" value="Moderate" /> Somewhat Agree
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
                                                        <input type="radio" className="form-check-input" name="optradio4" value="Moderate" /> Somewhat Agree
                                                    </label>
                                                </div>
                                                <div className="form-check-inline disabled">
                                                    <label className="form-check-label">
                                                        <input type="radio" className="form-check-input" name="optradio4" value="Conservative" /> Disagree
                                                    </label>
                                                </div>
                                            </div>
                                            {/* <div className="text-right">
                        <a href="#" className="btn btn-sm btn-danger w-100 shadow-sm col-3">Next</a>
                    </div> */}
                                        </form>
                                    </div>
                                    <div className="modal-footer">
                                        <a type="button" className="btn btn-danger shadow-sm" href="javascript:void(0);" onClick={this.AnwQue.bind()}>Continue</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="" role="alert">
                            <p className="text-disclaimer text-black text-center fs-13">*Mutual Fund investments are subject to market risks, please read the scheme related documents carefully before investing.</p>
                        </div>
                        {/* Footer */}
                        <Footer />
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
