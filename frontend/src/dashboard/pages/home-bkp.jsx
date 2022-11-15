import React, { component } from 'react';
import Header from './header';
import Footer from './footer';
// import {UserAuth} from './short-components';
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
import { PieChart } from 'react-minimal-pie-chart';
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
      token:userData.token,
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
		.hide_tr{
            width: 98px;
            height: 53px;
            background: #ffffff;
            z-index: 1;
            margin-top: -79px;
            position: relative;
            margin-left: 2px;
          }
          `}
        </style>


        {/* Page Wrapper */}
        <div id="wrapper">
          <div id="overlay" >
            <div class="spinner"></div>
            <br />Loading...
          </div>
          {/* Sidebar */}
          <Sidebar />
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
              <div className="container">
                {/* Page Heading */}
                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                  {/* <h1 className="h3 mb-0 text-gray-800">Dashboard</h1> */}
                  {/* <a href="#" className="d-none d-sm-inline-block btn btn-sm btn-danger shadow-sm"><i className="fas fa-download fa-sm text-white-50" /> Generate Report</a> */}

                </div>
                {/* Content Row */}
                <div className="row">
                  {/* Purchase Cost */}
                  <div className="col-xl-4 col-md-3 mb-4">
                    <div className="card bg-c  h-100 py-2 ">
                      <div className="card-body">
                        <div className="row no-gutters align-items-center">
                          <div className="col mr-2 text-center">
                          <img src={shopingcart} className="mr-2 new-icon" />
                            <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                              Purchase Cost</div>
                            <div className="h5 mb-0 font-weight-bold text-gray-800">₹{this.state.dataList ? this.state.dataList.purchasecost : "0"}</div>
                          </div>
                          {/* <div className="col-auto">
                          <i className="fas fa-rupee-sign fa-2x text-gray-300" />
                        </div> */}
                        </div>
                      </div>
                    </div>
                   
                   {/* <div class="counter-wrapper">
                        <div class="counter-item">
                            <div class="counter-inner">
                                <h2 class="counter-sign">$ </h2>
                                <span class="title odometer odometer-auto-theme" data-odometer-final="557"><div class="odometer-inside"><span class="odometer-digit"><span class="odometer-digit-spacer">8</span><span class="odometer-digit-inner"><span class="odometer-ribbon"><span class="odometer-ribbon-inner"><span class="odometer-value">5</span></span></span></span></span><span class="odometer-digit"><span class="odometer-digit-spacer">8</span><span class="odometer-digit-inner"><span class="odometer-ribbon"><span class="odometer-ribbon-inner"><span class="odometer-value">5</span></span></span></span></span><span class="odometer-digit"><span class="odometer-digit-spacer">8</span><span class="odometer-digit-inner"><span class="odometer-ribbon"><span class="odometer-ribbon-inner"><span class="odometer-value">7</span></span></span></span></span></div></span>
                            </div>
                        </div>
                        <span class="info">Invested in pitches</span>
                    </div> */}
               
                  </div>
                  {/* Market Value */}
                  <div className="col-xl-4 col-md-3 mb-4">
                    <div className="card bg-c  h-100 py-2 ">
                      <div className="card-body">
                        <div className="row no-gutters align-items-center">
                          <div className="col mr-2 text-center">
                          <img src={exchange} className="mr-2 new-icon" />
                            <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                              Market Value</div>
                            <div className="h5 mb-0 font-weight-bold text-gray-800">₹{this.state.dataList ? this.state.dataList.currentvalue : "0"}</div>
                          </div>
                          {/* <div className="col-auto">
                          <i className="fas fa-rupee-sign fa-2x text-gray-300" />
                        </div> */}
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Day's Change */}
                  <div className="col-xl-4 col-md-3 mb-4">
                    <div className="card bg-c  h-100 py-2 ">
                      <div className="card-body">
                        <div className="row no-gutters align-items-center">
                          <div className="col mr-2 text-center">
                            <div className="text-xs font-weight-bold text-info text-uppercase mb-1">Day's Change
                            </div>
                            <div className="h5 mb-0 mr-3 font-weight-bold text-gray-800">{this.state.dataList ? this.state.dataList.days_change_str : "0"}
                              {this.state.dataList ? this.state.dataList.days_change < 0 ?
                                <span className="fa fa-arrow-down text-danger"></span> :
                                <span className="fa fa-arrow-up text-success"></span> : null}</div>
                            {/* <div className="row no-gutters align-items-center">
                            <div className="col-auto">
                              <div className="h5 mb-0 mr-3 font-weight-bold text-gray-800">50%</div>
                            </div>
                            <div className="col">
                              <div className="progress progress-sm mr-2">
                                <div className="progress-bar bg-info" role="progressbar" style={{width: '50%'}} aria-valuenow={50} aria-valuemin={0} aria-valuemax={100} />
                              </div>
                            </div>
                          </div> */}
                          </div>
                          {/* <div className="col-auto">
                          <i className="fas fa-clipboard-list fa-2x text-gray-300" />
                        </div> */}
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Dividend */}
                  <div className="col-xl-4 col-md-3 mb-4">
                    <div className="card bg-c  h-100 py-2 ">
                      <div className="card-body">
                        <div className="row no-gutters align-items-center">
                          <div className="col mr-2 text-center">
                            <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">
                              Dividend</div>
                            <div className="h5 mb-0 font-weight-bold text-gray-800">{this.state.dataList ? this.state.dataList.dividend : "0"}</div>
                          </div>
                          {/* <div className="col-auto">
                          <i className="fas fa-comments fa-2x text-gray-300" />
                        </div> */}
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Gain/Loss */}
                  <div className="col-xl-4 col-md-3 mb-4">
                    <div className="card bg-c  h-100 py-2 ">
                      <div className="card-body">
                        <div className="row no-gutters align-items-center">
                          <div className="col mr-2 text-center">
                            <div className="text-xs font-weight-bold text-danger text-uppercase mb-1">
                              Gain/Loss</div>
                            <div className="h5 mb-0 font-weight-bold text-gray-800">{this.state.dataList ? this.state.dataList.gain_str : "0"}
                              {this.state.dataList ?
                                this.state.dataList.gain < 0 ?
                                  <span className="fa fa-arrow-down text-danger"></span> :
                                  <span className="fa fa-arrow-up text-success"></span> : null
                              }
                            </div>
                          </div>
                          {/* <div className="col-auto">
                          <i className="fas fa-comments fa-2x text-gray-300" />
                        </div> */}
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* CAGR */}
                  <div className="col-xl-4 col-md-3 mb-4">
                    <div className="card bg-c  h-100 py-2 ">
                      <div className="card-body">
                        <div className="row no-gutters align-items-center">
                          <div className="col mr-2 text-center">
                            <div className="text-xs font-weight-bold text-purple text-uppercase mb-1">
                              CAGR</div>
                            <div className="h5 mb-0 font-weight-bold text-gray-800">{this.state.dataList ? this.state.dataList.cagr : "0"} %</div>
                          </div>
                          {/* <div className="col-auto">
                          <i className="fas fa-comments fa-2x text-gray-300" />
                        </div> */}
                        </div>
                      </div>
                    </div>
                  </div>

                </div>


                {/* <div className="chart"></div> */}
        <section className="quick-access">
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
        <img src={advisory} className="mr-2 new-icon" />
            <span>Portfolio Review</span></a>
        </div>
        </div>
        <div className="col-md-3">
        <div className="quick-card">
        <a className="quick-link" href="/prodigypro/dashboard/portfolio">
        <img src={advisory} className="mr-2 new-icon" />
            <span>NFO Live</span></a>
        </div>
        </div>
        <div className="col-md-3">
        <div className="quick-card">
        <a className="quick-link" href="/prodigypro/dashboard/portfolio">
            <img src={portfolio} className="mr-2 img-fluid new-icon" />
            <span>Simply Sip</span></a>
        </div>
        </div>
        <div className="col-md-3">
        <div className="quick-card">
        <a className="quick-link" href="/prodigypro/dashboard/portfolio">
            <img src={portfolio} className="mr-2 img-fluid new-icon" />
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
        <div className="col-md-2">
        <div className="goal-card text-center">
        <a className="shadow bg-white goal-link text-de" href="/prodigypro/dashboard/portfolio">
        <img src={retirement} className="mr-2 new-icon" /></a>
        <h4 className="pt-4">Retirement</h4>
        </div>
        </div>
        <div className="col-md-2">
        <div className="goal-card text-center">
        <a className="shadow bg-white goal-link" href="/prodigypro/dashboard/portfolio">
        <img src={child} className="mr-2 new-icon" /></a>
        <h4 className="pt-4">Child Education</h4>
        </div>
        </div>
        <div className="col-md-2">
        <div className="goal-card text-center">
        <a className="shadow bg-white goal-link" href="/prodigypro/dashboard/portfolio">
        <img src={house} className="mr-2 new-icon" /></a>
        <h4 className="pt-4">House Purchase</h4>
        </div>
        </div>
        <div className="col-md-2">
        <div className="goal-card text-center">
        <a className="shadow bg-white goal-link" href="/prodigypro/dashboard/portfolio">
        <img src={car} className="mr-2 new-icon" /></a>
        <h4 className="pt-4">Car Purchase</h4>
        </div>
        </div>
        <div className="col-md-2 ">
        <div className="goal-card text-center">
        <a className="shadow bg-white goal-link" href="/prodigypro/dashboard/portfolio">
        <img src={wealth} className="mr-2 new-icon" /></a>
        <h4 className="pt-4">Wealth Creation</h4>
        </div>
        </div>
        <div className="col-md-2">
        <div className="goal-card text-center">
        <a className="shadow bg-white goal-link" href="/prodigypro/dashboard/portfolio">
        <img src={home} className="mr-2 new-icon" /></a>
        <h4 className="pt-4">Home Renovation</h4>
        </div>
        </div>
        <div className="col-md-2 pt-5">
        <div className="goal-card text-center">
        <a className="shadow bg-white goal-link" href="/prodigypro/dashboard/portfolio">
        <img src={vacation} className="mr-2 new-icon" /></a>
        <h4 className="pt-4">Vacation</h4>
        </div>
        </div>
        <div className="col-md-2 pt-5">
        <div className="goal-card text-center">
        <a className="shadow bg-white goal-link" href="/prodigypro/dashboard/portfolio">
        <img src={marriage} className="mr-2 new-icon" /></a>
        <h4 className="pt-4">Child Marriage</h4>
        </div>
        </div>

        </div>
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
          {/* End of Content Wrapper */}
        </div>
        {/* End of Page Wrapper */}

      </>
    )
  }

}
export default Home
