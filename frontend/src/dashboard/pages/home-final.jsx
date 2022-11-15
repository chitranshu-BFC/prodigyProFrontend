import React, { component } from 'react';
import Header from './header';
import Footer from './footer';
// import {UserAuth} from './short-components';
import Right_Icons from './hover-right-icons';
import Sidebar from './sidebar';
import { Helmet } from "react-helmet";
import StyleComponent from './styleComponent';
import Axios from 'axios';
import $ from 'jquery';
import { Link, Redirect, useHistory } from 'react-router-dom';
import CanvasJSReact from '../../canvasjs/canvasjs.react';
import portfolio from "../../assets/images/icons/new-icons/suitcase.png";
import advisory from "../../assets/images/icons/new-icons/completed-task.png";
import shopingcart from "../../assets/images/icons/new-icons/shopping-cart.png";
import exchange from "../../assets/images/icons/new-icons/exchange.png"
import retirement from "../../assets/images/icons/new-icons/retirement.png";
import child from "../../assets/images/icons/new-icons/education.png";
import house from "../../assets/images/icons/new-icons/discount.png";
import car from "../../assets/images/icons/new-icons/purchase.png";
import vacation from "../../assets/images/icons/new-icons/sunbed.png";
import home from "../../assets/images/icons/new-icons/renovation.png";
import wealth from "../../assets/images/icons/new-icons/money.png";
import marriage from "../../assets/images/icons/new-icons/wedding-couple.png";
import quant2 from "../../assets/images/icons/New folder (2)/quant2.png"
import rupee from "../../assets/images/icons/New folder (2)/rupee.png"
import { Doughnut } from "react-chartjs-2";
import {FaSlidersH,FaAngleLeft,FaAngleRight} from "react-icons/fa";
import 'animate.css';


var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    };

    this.state = {
      Items: []
    };
  }

  componentDidMount() {
    // const { authTokens } = UserAuth();
    // let history = useHistory();
    // console.log("qq",localStorage.getItem("loginUserData"))
    if (localStorage.getItem("loginUserData") == null) {
      return <Redirect to='/prodigypro/' />
    }


    const userData = JSON.parse(localStorage.getItem("loginUserData"))
    // console.log("user", userData);

    const data = {
      email: userData.email,
      token: userData.token,
    }

    Axios.post("http://localhost:5010/api/User_profile", data)
      .then((res) => {
        // console.log("userData", res.data.data.data)
        this.setState({ userList: res.data.data.data })
      })


    let pan = '';
    if ((userData.pan_card == '') || (userData.pan_card == null)) {
      pan = localStorage.getItem("userPanNo");
    } else {
      pan = userData.pan_card
    }

    const value = {
      pan: pan,
      name: userData.name
    }

    Axios.post("http://localhost:5010/api/snapShot", value)
      .then((result) => {
        $("#overlay").css("display", "none")
        console.log("userData", result.data.data.data)
        this.setState({ dataList: result.data.data.data })
      })

    const value2 = {
      pan_card: pan,
    }

    $(".div_profile").css("display", "block")
    Axios.post("http://localhost:5010/api/portfolio", value2)
      .then((result) => {

        //$("#overlay").css("display","none")
        $(".div_profile").css("display", "none")
        console.log("userDataddd", result.data.data.data)
        this.setState({ userprotfolio: result.data.data.data })

        Axios.post("http://localhost:5010/api/userProfileMemberList", value)
          .then((result) => {
            console.log("userProfileMemberList", result.data)
            if (result.data.data.status == 200) {
              result.data.data.data.map((val) => {
                // let data ='';
                // if(val.PAN==''){
                //   data = {
                //     pan_numbers: userData.pan_card,
                //     inv_name:val.INVNAME
                //   }
                // }else{
                //   data = {
                //     pan_numbers:val.PAN
                //   }
                // }

                let data = {
                  pan_numbers: val.PAN,
                  inv_name: val.INVNAME
                }

                Axios.post("http://localhost:5010/api/getIINStatus", data)
                  .then((res) => {
                    console.log("getIINStatus", res.data)
                    if (res.data.data.status == 200) {
                      res.data.data.data.map((val1) => {
                        const data2 = {
                          iin: val1.CUSTOMER_ID,
                          email: userData.email,
                        }
                        Axios.post("http://localhost:5010/api/GETIINDETAILSWMS", data2)
                          .then((resss) => {
                            const data = {
                              email: userData.email,
                            }

                            Axios.post("http://localhost:5010/api/User_profile", data)
                              .then((res) => {
                                // console.log("amc",res.data.data.data)
                                this.setState({ userList: res.data.data.data })
                              })

                          })
                      })
                    }
                  })

              })
            } else {
              const data = {
                pan_numbers: pan
              }

              Axios.post("http://localhost:5010/api/getIINStatus", data)
                .then((res) => {
                  console.log("getIINStatus", res.data)
                  if (res.data.data.status == 200) {
                    res.data.data.data.map((val1) => {
                      const data2 = {
                        iin: val1.CUSTOMER_ID,
                        email: userData.email,
                      }
                      Axios.post("http://localhost:5010/api/GETIINDETAILSWMS", data2)
                        .then((resss) => {
                          const data = {
                            email: userData.email,
                          }

                          Axios.post("http://localhost:5010/api/User_profile", data)
                            .then((res) => {
                              // console.log("amc",res.data.data.data)
                              this.setState({ userList: res.data.data.data })
                            })
                          console.log("GETIINDETAILSWMS", resss.data)
                        })
                    })
                  }
                })
            }

          })
      })
  }

  profilioDetail = (pan, name) => {
    this.setState({ profilioPan: pan, profilioName: name })
  }

  render() {
    const data = {
      labels: ["Debt", "Equity", "Gold"],
      datasets: [
        {
          label: "Hours Studied in Geeksforgeeks",
          data: [70, 20, 10],
          backgroundColor: ["#F06D70", "#97C5FB", "#FBDE80"],
        }
      ]
    }

    if (this.state.profilioName) {

      return <Redirect to={{
        pathname: "/prodigypro/dashboard/portfolio",
        profilioPan: this.state.profilioPan,
        profilioName: this.state.profilioName,
      }} />

    }



    if (localStorage.getItem("loginUserData") == null) {
      return <Redirect to='/prodigypro/' />
    }

    let e; let d; let g; const u = [];

    if (this.state.dataList) {
      if (this.state.dataList.equity_perc > 0) {
        e = { y: this.state.dataList.equity_perc, label: "Equity" };
        u.push(e)
      }

      if (this.state.dataList.debt_perc > 0) {
        d = { y: this.state.dataList.debt_perc, label: "Debt" };
        u.push(d)
      }

      if (this.state.dataList.gold_perc > 0) {
        g = { y: this.state.dataList.gold_perc, label: "Gold" };
        u.push(g)
      }
    }

    const options = {
      //exportEnabled: true,
      animationEnabled: true,
      // title: {
      //   text: "Website Traffic Sources"
      // },
      data: [{
        type: "doughnut",
        radius: "70%",
        startAngle: 75,
        toolTipContent: "<b>{label}</b>: {y}%",
        showInLegend: "true",
        legendText: "{label}",
        indexLabelFontSize: 16,
        indexLabel: "{label} - {y}%",
        dataPoints: u,


      }]
    }
    return (
      <>
        <Helmet>
          <title>Dashboard - Prodigy Pro</title>
        </Helmet>
        <style>
          {`
          .card-body {
            flex: 1 1 auto;
            min-height: 1px;
            padding-left:.5rem;
            padding-right:.5rem;
            padding-top:1rem;
            padding-bottom:1rem;
          }
          .chart-ht{
            padding-bottom: 12rem !important;
          }
          .canvasjs-chart-credit{
            display:none;
          }
	   #loader_profile {
            position: absolute;
            left: 50%;
            top: 80%;
            z-index: 1;
            width: 100px;
            height: 100px;
            margin: -76px 0 0 -76px;
            border: 16px solid #f3f3f3;
            border-radius: 50%;
            border-top: 16px solid #3498db;
            -webkit-animation: spin 2s linear infinite;
            animation: spin 2s linear infinite;
          }
          
          @-webkit-keyframes spin {
            0% { -webkit-transform: rotate(0deg); }
            100% { -webkit-transform: rotate(360deg); }
          }
          
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          
          /* Add animation to "page content" */
          .animate-bottom {
            position: relative;
            -webkit-animation-name: animatebottom;
            -webkit-animation-duration: 1s;
            animation-name: animatebottom;
            animation-duration: 1s
          }
          
          @-webkit-keyframes animatebottom {
            from { bottom:-100px; opacity:0 } 
            to { bottom:0px; opacity:1 }
          }
          
          @keyframes animatebottom { 
            from{ bottom:-100px; opacity:0 } 
            to{ bottom:0; opacity:1 }
          }
          .div_profile {
            display: none;
          }
          .form-control{
            border-radius: 0rem;
            height: calc(2.25rem + 6px);
            border-color: #939393 !important;
            border:none;
            border-bottom: 1px solid #939393 !important;
            color:#3A3A3A;
            // background-color: #f9fafa;
 
         }
         
         .form-control:focus {
             color: #495057;
             background-color:#fff;
             border-color: #939393 !important;
             border-bottom: 2px solid #939393 !important;
             outline: 0;
             box-shadow: none;
             border-radius: 0rem;
             height: calc(2.25rem + 6px);
         }
		.hide_tr{
            width: 98px;
            height: 53px;
            background: #ffffff;
            z-index: 1;
            margin-top: -79px;
            position: relative;
            margin-left: 2px;
          }
          .lc
          {
            letter-spacing: 1px;
            
          }
.border-bottom-c
{
    border-bottom: 1px solid #838383;
    width:100%;

}
.table td, .table th {
  
  vertical-align: top;
  border-bottom: 1px solid #CDD4FE;
  border-top: none!important;
}
.chartjs-render-monitor
{
  width: 347px!important;
height: 176px!important;
}
.quick-invest
{
  margin-left: 25px;
box-shadow: 0 5px 10px 5px rgb(0 0 0 / 5%);
padding: 25px;
border-radius: 10px;
}
.new-btn1
{
  padding: 10px 27px !important;
box-shadow: 0 5px 10px 5px rgb(0 0 0 / 5%)!important;
}
.lb
{

padding-top: 15px;
color:#939393;
}
#form-dialog
{
  display:none;
}
#form-dialog .lb
{
  padding-top:3px!important; 
}
label {
 
  margin-bottom: 0rem;
}
.ptb
{
padding-top: 26px;
padding-bottom: 17px;
}

.modal
{
  top: 5em!important;
left: 13em!important;
}
.b-r
{
  border: 1px solid #F06D70;
}

         
          `}
        </style>


        {/* Page Wrapper */}
        <div id="wrapper">
          <div id="overlay" >
            <div className="spinner"></div>
            <br />Loading...
          </div>
          {/* Sidebar */}
          {/* <Sidebar /> */}
          {/* End of Sidebar */}


          {/* Content Wrapper */}
          <div id="content-wrapper" className="d-flex flex-column">
            {/* Main Content */}
            <div id="content">

              {/* Topbar */}
              <Header />
              {/* End of Topbar */}

              {/* Begin Page Content */}
              {/* <div className="container-fluid"> */}
              <div className="container-fluid px-5 pb-5">
                <div className='row px-5 pb-5'>
                  <div className="col md-12">
                {/* Page Heading */}
                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                  {/* <h1 className="h3 mb-0 text-gray-800">Dashboard</h1> */}
                  {/* <a href="#" className="d-none d-sm-inline-block btn btn-sm btn-danger shadow-sm"><i className="fas fa-download fa-sm text-white-50" /> Generate Report</a> */}

                </div>
                {/* Content Row */}
                <section className="pb-4">
                  <div className="row">
                    <div className='col-md-8'>

                      <div className="row portfolio-s">
                        <div className="col-md-6  pl-3 py-3 ">
                          <div className="row">
                            <div className="col-md-12">
                              <h5 className='gray lc gray-color'>Market Value</h5>
                              <h3 ><img src={rupee} alt="" srcset="" className='new-icon' /><span className='lc text-dark'>122,936</span></h3>
                              

                              <hr className='border-bottom' />
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-6 border-right">
                              <span className='gray lc fs-13 gray-color'>Purchase Cost</span>
                              <br />
                              <h5><img src={rupee} alt="" srcset="" className='new-icon' /><span className='lc text-dark'>115,495</span></h5>
                            </div>
                            <div className="col-md-6">
                              <span className='gray lc fs-13 pb-2 gray-color'>GAIN/LOSS</span> <br />
                              <span className='lc text-dark'>10,074<span className="fa fa-arrow-up text-success"></span></span>
                            </div>
                          </div>
                          <hr className='border-bottom' />
                          <div className="row">

                            <div className="col-md-4 border-right">
                              <span className='gray lc fs-13 gray-color'>Dividend</span>
                              <br />
                              <h5><span className='lc text-dark'>0</span></h5>
                            </div>
                            <div className="col-md-5 border-right">
                              <span className='gray lc fs-13 pb-2  gray-color'>Day's Change</span> <br />
                              <span className='lc  text-dark'>112<span className="fa fa-arrow-up text-success"></span></span>
                            </div>
                            <div className="col-md-3">
                              <span className='gray lc fs-13 pb-2  gray-color'>CAGR</span> <br />
                              <span className='lc   text-dark'>8.4%</span>
                            </div>
                          </div>
                        </div>

                        <div className="col-md-6 pt-5 text-center">

                          <Doughnut data={data} />
                          <h5 className='pt-3'>Asset Allocation</h5>
                        </div>
                      </div>
                    </div>
                    <div className='col-md-4'>
                      <div className="quick-invest">
                        {/* <!-- Button trigger modal --> */}

                        <div className="quick-access-title">
                          <h3>Quick Invest</h3>
                        </div>
                        <a href='#' className="text-decoration-none" data-target="#form-dialog" data-toggle="modal" type="button">
                          <div className='row'>
                            <div className="col-md-12">
                              <form>
                                <label for="select-s" className='lb'>Select Scheme</label><br />
                                <select name="select-s" id="select-s" className='form-control border-0'>
                                  <option value="select">--Select--</option>
                                  <option value="saab">Saab</option>
                                  <option value="opel">Opel</option>
                                  <option value="audi">Audi</option>
                                </select>
                                <label for="invest" className='lb'>Investing In</label><br />
                                <select name="invest" id="invest" className='form-control border-0'>
                                  <option value="select"> SIP</option>
                                  <option value="saab">Saab</option>
                                  <option value="opel">Opel</option>
                                  <option value="audi">Audi</option>
                                </select>
                                <input type="button" className='new-btn1 mt-4' value="Invest Now" />
                              </form>
                            </div>

                          </div>
                        </a>


                        {/* <!-- Form Modal --> */}

                        <div tabindex="-1" className="modal pmd-modal animate__animated animate__zoomIn animate__fast" id="form-dialog" aria-hidden="true">

                          <div className="modal-dialog modal-lg">
                            <div className="modal-content b-r">
                              <div className="modal-header border-0">
                              <div className="quick-access-title">
                          <h3>Quick Invest</h3>
                        </div>
                                <button aria-hidden="true" data-dismiss="modal" className="close" type="button">×</button>
                              </div>
                              <div className="modal-body">



                                <form>
                                  <div className='row'>
                                    <div className='col-md-3'>
                                      <div className="form-group pmd-textfield pmd-textfield-floating-label">
                                        <label for="select-s" className='lb'>Select Scheme</label><br />
                                        <select name="select-s" id="select-s" className='form-control border-0'>
                                          <option value="select">--Select--</option>
                                          <option value="saab">Saab</option>
                                          <option value="opel">Opel</option>
                                          <option value="audi">Audi</option>
                                        </select>
                                      </div>
                                    </div>
                                    <div className='col-md-3'>
                                      <div className="form-group pmd-textfield pmd-textfield-floating-label">
                                        <label for="invest" className='lb'>Investing In</label><br />
                                        <select name="invest" id="invest" className='form-control border-0'>
                                          <option value="select"> SIP</option>
                                          <option value="saab">Saab</option>
                                          <option value="opel">Opel</option>
                                          <option value="audi">Audi</option>
                                        </select>
                                      </div>
                                    </div>
                                    <div className='col-md-3'>
                                      <div className="form-group pmd-textfield pmd-textfield-floating-label">
                                        <label for="folio" className='lb'>Select Folio</label><br />
                                        <select name="folio" id="folio" className='form-control border-0'>
                                          <option value="select">985642371000</option>
                                          <option value="saab">987489454554456</option>
                                          <option value="opel">5656565</option>
                                          <option value="audi">4454545454544</option>
                                        </select>
                                      </div>
                                    </div>
                                    <div className='col-md-3'>
                                      <div className="form-group pmd-textfield pmd-textfield-floating-label">
                                        <label for="invest-mode" className='lb'>Investment Mode</label><br />
                                        <select name="invest-mode" id="invest-mode" className='form-control border-0'>
                                          <option value="select">Self / Direct</option>
                                          <option value="saab">Saab</option>
                                          <option value="opel">Opel</option>
                                          <option value="audi">Audi</option>
                                        </select>
                                      </div>
                                    </div>
                                  </div>
                                  <div className='row'>
                                    <div className='col-md-3'>
                                      <div className="form-group pmd-textfield pmd-textfield-floating-label">

                                        <label className="control-label lb" for="amount">Amount</label>
                                        <input type="text" className="form-control" name='amount' placeholder='Enter Amount' />

                                      </div>
                                    </div>
                                    <div className='col-md-3'>
                                      <div className="form-group pmd-textfield pmd-textfield-floating-label">
                                        <label for="date" className="control-label lb">SIP Date</label>
                                        <input type="date" className="form-control" name="date" id="date" />

                                      </div>
                                    </div>
                                    <div className='col-md-3'>
                                      <div className="form-group pmd-textfield pmd-textfield-floating-label">
                                        <label for="sip-t" className='lb'>SIP Tenure</label><br />
                                        <select name="sip-t" id="sip-t" className='form-control border-0'>
                                          <option value="select">Cancelled</option>
                                          <option value="saab">Saab</option>
                                          <option value="opel">Opel</option>
                                          <option value="audi">Audi</option>
                                        </select>
                                      </div>
                                    </div>
                                    <div className='col-md-3'>
                                      <div className="form-group pmd-textfield pmd-textfield-floating-label">
                                        <label for="plan" className='lb'>Plan Option</label><br />
                                        <select name="plan" id="plan" className='form-control border-0'>
                                          <option value="select">Growth</option>
                                          <option value="saab">Saab</option>
                                          <option value="opel">Opel</option>
                                          <option value="audi">Audi</option>
                                        </select>
                                      </div>
                                    </div>
                                  </div>
                                </form>
                              </div>
                              <div className="modal-footer border-0">
                                <button data-dismiss="modal" className="new-btn1" type="button">Reset</button>
                                <button data-dismiss="modal" className="new-btn1" type="button">Invest Now</button>
                              </div>
                            </div>
                          </div>

                        </div>

                      </div>
                    </div>
                  </div>
                </section>
                {/* family Porfolio */}
                <section className='family-portfolio-s py-4'>
                  <div className="quick-access-title pb-4">
                    <h3>Family Portfolio</h3>
                  </div>
                  <div className='family-portfolio'>
                    <table className='table '>
                      <tr className='red'>
                        <th className='pl-4'>Name</th>
                        <th>Purchase Cost (₹)</th>
                        <th>Market Value(₹)</th>
                        <th>CAGR(%)</th>

                      </tr>
                      <tr>

                        <td className='pl-4'><a href='!#'>Shivam Shrivastav</a></td>
                        <td>11,450</td>
                        <td>11,450</td>
                        <td>0</td>

                      </tr>

                      <tr>

                        <td className='pl-4'><a href='!#'>Shivam Shrivastav</a></td>
                        <td>11,450</td>
                        <td>11,450</td>
                        <td>0</td>

                      </tr>
                      <tr>

                        <td className='pl-4'><a href='#'>Shivam Shrivastav</a></td>
                        <td>11,450</td>
                        <td>11,450</td>
                        <td>0</td>

                      </tr>
                    </table>
                  </div>

                </section>
                {/* <div className="chart"></div> */}
                <section className="quick-access  pt-4">
                  <div className="row">
                    <div className="col-md-12">
                      <div className="quick-access-title pb-4">
                        <h3>Quick Access</h3>
                      </div>
                    </div>

                  </div>
                  <div className="row">
                    <div className="col-md-3">
                      <div className="quick-card">
                        <a className="quick-link" href="/prodigypro/dashboard/portfolio">
                          <img src={advisory} className="mr-2 new-icon" alt='' />
                          <span>Portfolio Review</span></a>
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="quick-card">
                        <a className="quick-link" href="/prodigypro/dashboard/portfolio">
                          <img src={advisory} className="mr-2 new-icon" alt='' />
                          <span>NFO Live</span></a>
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="quick-card">
                        <a className="quick-link" href="/prodigypro/dashboard/portfolio">
                          <img src={portfolio} className="mr-2 img-fluid new-icon" alt='' />
                          <span>Simply Sip</span></a>
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="quick-card">
                        <a className="quick-link" href="/prodigypro/dashboard/portfolio">
                          <img src={portfolio} className="mr-2 img-fluid new-icon" alt='' />
                          <span>Simply Save</span></a>
                      </div>
                    </div>
                  </div>

                </section>

                <section className="goal-plan">
                  <div className="row">
                    <div className="col-md-12">
                      <div className="goal-plan-title pb-5 pt-5">
                        <h3>Goal Planning</h3>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-3">

                      <a className=" bg-white goal-link" href="/prodigypro/dashboard/portfolio">
                        <div className="goal-card text-center bg-c ptb">
                          <img src={retirement} className="mr-2 new-icon" alt='' /><br />
                          <h4 className="pt-4">Retirement</h4>
                        </div>
                      </a>
                    </div>
                    <div className="col-md-3">

                      <a className="bg-white goal-link" href="/prodigypro/dashboard/portfolio">
                        <div className="goal-card text-center bg-c ptb">
                          <img src={child} className="mr-2 new-icon" alt='' />
                          <h4 className="pt-4">Child Education</h4>
                        </div>
                      </a>
                    </div>
                    <div className="col-md-3">

                      <a className="bg-white goal-link" href="/prodigypro/dashboard/portfolio">
                        <div className="goal-card text-center bg-c ptb">
                          <img src={house} className="mr-2 new-icon" alt='' />
                          <h4 className="pt-4">House Purchase</h4>
                        </div>
                      </a>
                    </div>
                    <div className="col-md-3">
                      <a className="bg-white goal-link" href="/prodigypro/dashboard/portfolio">
                        <div className="goal-card text-center bg-c ptb">
                          <img src={car} className="mr-2 new-icon" alt='' />
                          <h4 className="pt-4">Car Purchase</h4>
                        </div>
                      </a>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-3 pt-5">

                      <a className="bg-white goal-link" href="/prodigypro/dashboard/portfolio">
                        <div className="goal-card text-center bg-c ptb" >
                          <img src={wealth} className="mr-2 new-icon" alt='' />
                          <h4 className="pt-4">Wealth Creation</h4>
                        </div>
                      </a>
                    </div>
                    <div className="col-md-3 pt-5">

                      <a className="bg-white goal-link" href="/prodigypro/dashboard/portfolio">
                        <div className="goal-card text-center bg-c ptb">
                          <img src={home} className="mr-2 new-icon" />
                          <h4 className="pt-4">Home Renovation</h4>
                        </div>
                      </a>
                    </div>
                    <div className="col-md-3 pt-5">

                      <a className=" bg-white goal-link" href="/prodigypro/dashboard/portfolio">
                        <div className="goal-card text-center bg-c ptb">
                          <img src={vacation} className="mr-2 new-icon" />
                          <h4 className="pt-4">Vacation</h4>
                        </div>
                      </a>
                    </div>
                    <div className="col-md-3 pt-5">
                      <a className="bg-white goal-link " href="/prodigypro/dashboard/portfolio">
                        <div className="goal-card text-center bg-c ptb">

                          <img src={marriage} className="mr-2 new-icon" />
                          <h4 className="pt-4">Child Marriage</h4>
                        </div>
                      </a>
                    </div>

                  </div>

                </section>
                <section className='all-mf-s'>
                <div className="row">
                    <div className="col-md-12">
                      <div className="goal-plan-title pb-5 pt-5">
                        <h3>All Mutual Funds</h3>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 border-right">
                      <div className='row'>
                        <div className='col-md-6 '>
                          <button className='filter-btn float-left'>Filter / Sort <FaSlidersH className='fa'/></button>
                        </div>
                        <div className='col-md-6'>

                        <button className='year-btn float-right'><FaAngleLeft className='fa'/><FaAngleRight className='fa'/> 3Y Returns </button>
                        </div>
                      </div>
                      <div className='row border-bottom pt-4'>
                        <div className="col-md-3">
                          <img src={quant2} alt=""/>
                        </div>
                        <div className="col-md-6"><span className='fs-13'>Quant Small Cap Fund Direct           
Plan Growth</span></div>
                        <div className="col-md-3 text-center"><span>37.54%</span></div>

                      </div>
                      </div>
                      <div className='col-md-6'>
                      <div className='row'>
                        <div className='col-md-6'>
                          <button className='filter-btn float-left'>Filter / Sort <FaSlidersH className='fa'/></button>
                        </div>
                        <div className='col-md-6'>

                        <button className='year-btn float-right'><FaAngleLeft className='fa'/><FaAngleRight className='fa'/> 3Y Returns </button>
                        </div>
                      </div>
                      <div className='row border-bottom pt-4'>
                        <div className="col-md-3">
                          <img src={quant2} alt=""/>
                        </div>
                        <div className="col-md-6"><span className='fs-13'>Quant Small Cap Fund Direct           
Plan Growth</span></div>
                        <div className="col-md-3 text-center"><span>37.54%</span></div>

                      </div>

                      </div>

                      <div className='col-md-6 border-right'>
                     
                      <div className='row border-bottom pt-4'>
                        <div className="col-md-3">
                          <img src={quant2} alt=""/>
                        </div>
                        <div className="col-md-6"><span className='fs-13'>Quant Small Cap Fund Direct           
Plan Growth</span></div>
                        <div className="col-md-3 text-center"><span>37.54%</span></div>

                      </div>

                      </div>
                      <div className='col-md-6'>
                     
                      <div className='row border-bottom pt-4'>
                        <div className="col-md-3">
                          <img src={quant2} alt=""/>
                        </div>
                        <div className="col-md-6"><span className='fs-13'>Quant Small Cap Fund Direct           
Plan Growth</span></div>
                        <div className="col-md-3 text-center"><span>37.54%</span></div>

                      </div>

                      </div>
                      <div className='col-md-6 border-right'>
                     
                      <div className='row border-bottom pt-4'>
                        <div className="col-md-3">
                          <img src={quant2} alt=""/>
                        </div>
                        <div className="col-md-6"><span className='fs-13'>Quant Small Cap Fund Direct           
Plan Growth</span></div>
                        <div className="col-md-3 text-center"><span>37.54%</span></div>

                      </div>

                      </div>
                      <div className='col-md-6'>
                     
                      <div className='row border-bottom pt-4'>
                        <div className="col-md-3">
                          <img src={quant2} alt=""/>
                        </div>
                        <div className="col-md-6"><span className='fs-13'>Quant Small Cap Fund Direct           
Plan Growth</span></div>
                        <div className="col-md-3 text-center"><span>37.54%</span></div>

                      </div>

                      </div>
                    </div>




                </section>
                <section>
                <Right_Icons/>
                  {/* <ul _ngcontent-serverapp-c168="" class="services_wrpdiv1 ng-star-inserted" style="margin-top: 3.4em; width: 48px;"><li _ngcontent-serverapp-c168="" id="rightmenu" class="li1"><a _ngcontent-serverapp-c168=""><ion-img _ngcontent-serverapp-c168="" class="img-set1 lazyloaded md hydrated"></ion-img><div _ngcontent-serverapp-c168="" class="over-text1">Send Hi on WhatsApp number 7506771113</div></a></li></ul>
                  <ul _ngcontent-serverapp-c168="" class="services_wrpdiv1 ng-star-inserted" style="margin-top: 6.8em; width: 48px;"><li _ngcontent-serverapp-c168="" id="rightmenu" class="li1"><a _ngcontent-serverapp-c168=""><ion-img _ngcontent-serverapp-c168="" class="img-set1 custom-padding lazyloaded md hydrated"></ion-img><div _ngcontent-serverapp-c168="" class="over-text1">Recently viewed schemes</div></a></li></ul>
                  <ul _ngcontent-serverapp-c168="" class="services_wrpdiv1 ng-star-inserted" style="margin-top: 10.2em; width: 48px;"><li _ngcontent-serverapp-c168="" id="rightmenu" class="li1"><a _ngcontent-serverapp-c168=""><ion-badge _ngcontent-serverapp-c168="" class="cart-badge ng-star-inserted md hydrated"> 0</ion-badge><ion-img _ngcontent-serverapp-c168="" class="img-set1 lazyloaded md hydrated"></ion-img><div _ngcontent-serverapp-c168="" class="over-text1">Cart</div></a></li></ul>
                  </div></div></div> */}
             
              </section>
                {/* Content Row */}
                <div className="row">
                  {/* Area Chart */}

                  {/* Pie Chart */}

                </div>
              </div>
              {/* /.container-fluid */}
            </div>
            {/* End of Main Content */}

            {/* Footer */}
            <Footer />
            {/* End of Footer */}
          </div>
          </div>
                </div>
          {/* End of Content Wrapper */}
        </div>
        {/* End of Page Wrapper */}

      </>
    )
  }

}
export default Home
