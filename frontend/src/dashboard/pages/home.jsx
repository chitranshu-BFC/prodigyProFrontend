import React, { component } from "react";
import Header from "./header";
import Footer from "./footer";
// import {UserAuth} from './short-components';

// import Sidebar from './sidebar';
import { Helmet } from "react-helmet";
import StyleComponent from "./styleComponent";
import Axios from "axios";
import $ from "jquery";
import { Link, Redirect, useHistory } from "react-router-dom";
import CanvasJSReact from "../../canvasjs/canvasjs.react";
import portfolio from "../../assets/images/icons/new-icons/suitcase.png";
import advisory from "../../assets/images/icons/new-icons/completed-task.png";
import shopingcart from "../../assets/images/icons/new-icons/shopping-cart.png";
import exchange from "../../assets/images/icons/new-icons/exchange.png";
import retirement from "../../assets/images/icons/new-icons/retirement.png";
import child from "../../assets/images/icons/new-icons/education.png";
import house from "../../assets/images/icons/new-icons/discount.png";
import car from "../../assets/images/icons/new-icons/purchase.png";
import vacation from "../../assets/images/icons/new-icons/sunbed.png";
import home from "../../assets/images/icons/new-icons/renovation.png";
import wealth from "../../assets/images/icons/new-icons/money.png";
import marriage from "../../assets/images/icons/new-icons/wedding-couple.png";
import quant2 from "../../assets/images/icons/New folder (2)/quant2.png";
import rupee from "../../assets/images/icons/New folder (2)/rupee.png";
import pgim from "../../assets/images/icons/New folder (2)/pgim.png";
import boi from "../../assets/images/icons/New folder (2)/boi.png";
import canera from "../../assets/images/icons/New folder (2)/Canera1.png";

import { Doughnut } from "react-chartjs-2";
import LoadingOverlay from "react-loading-overlay";
import styled, { css } from "styled-components";
// import { FaSlidersH, FaAngleLeft, FaAngleRight } from "react-icons/fa";
import "animate.css";
import "./styles.css";

//importing context
import UserContext from "../../contexts/userContext";

//Loader Animation
const DarkBackground = styled.div`
  display: none; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 999; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */

  ${(props) =>
    props.disappear &&
    css`
      display: block; /* show */
    `}
`;

var CanvasJSChart = CanvasJSReact.CanvasJSChart;
var api_url_wms = "https://wms.bfccapital.com";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
    };

    this.state = {
      Items: [],
      loaded: true,
      newoaded: true,
      wmsloaded: false,
      familyDataLoaded: false,
    };
  }

  static contextType = UserContext;

  componentDidMount() {
    if (localStorage.getItem("loginUserData") == null) {
      return <Redirect to="/prodigypro/" />;
    }

    // console.log("this.context.snapshot.length ", this.context.snapshot.length);

    // console.log(
    //   "this.context.portfolioData.length ",
    //   this.context.portfolioData.length
    // );

    const { setSnapshot, setPortfolioData, setUserProfile } = this.context;

    // console.log("value from context null ", this.context.snapshot);
    // console.log("portfolioData from context null ", this.context.portfolioData);

    if (
      this.context.snapshot.length == 0 &&
      this.context.portfolioData.length == 0
    ) {
      // this.setState({ loaded: !this.state.loaded });

      var logingData = JSON.parse(window.localStorage.getItem("loginUserData"));
      // console.log("logingData", logingData);
      this.setState({ name: logingData.name });
      // ----------------------------Market Value API --------------------------//
      const udata = {
        name: logingData.name,
        pan: logingData.pan_card,
        guard_pan: "",
      };
      Axios.post(api_url_wms + "/api/snapshot", udata).then((res) => {
        // console.log("Show All Data", res.data.data);
        this.setState({ currentvalue: res.data.data.currentvalue });
        this.setState({ purchasecost: res.data.data.purchasecost });
        this.setState({ dividend: res.data.data.dividend });
        this.setState({ days_change: res.data.data.days_change });
        this.setState({ cagr: res.data.data.cagr });
        this.setState({ gain: res.data.data.gain });
        this.setState({ gold_perc: res.data.data.gold_perc });
        this.setState({ debt_perc: res.data.data.debt_perc });
        this.setState({ equity_perc: res.data.data.equity_perc });
        this.setState({ wmsloaded: !this.state.wmsloaded });

        setSnapshot(res.data.data);

        // console.log("value from context null 1", this.context.snapshot);
      });

      const userData = JSON.parse(localStorage.getItem("loginUserData"));
      // console.log("user", userData);
      //-------------------------

      // ----------------------------Family Portfolio API --------------------------//

      const portfolioData = {
        name: logingData.name,
        pan: logingData.pan_card,
        guard_pan: "",
      };
      // console.log("portfolioData", portfolioData);
      //https://mfprodigy.bfccapital.com/wmsapi/api/portfolio_api_data
      Axios.post(api_url_wms + "/api/portfolio_api_data", portfolioData).then(
        (res) => {
          // console.log("Show All Portfolio", res.data.data);
          this.setState({ familyData: res.data.data });
          this.setState({ loaded: !this.state.loaded });
          this.setState({ familyDataLoaded: !this.state.familyDataLoaded });
          // this.setState({currentvalue: res.data.data.currentvalue})
          // this.setState({gain: res.data.data.gain})
          // this.setState({cagr: res.data.data.cagr})

          setPortfolioData(res.data.data);

          // console.log(
          //   "portfolioData from context null 1",
          //   this.context.portfolioData
          // );
        }
      );

      // ---------------------------------------
      const data = {
        email: userData.email,
        token: userData.token,
      };

      Axios.post("http://localhost:5010/api/User_profile", data).then((res) => {
        // console.log("userData", res.data.data.data)
        this.setState({ userList: res.data.data.data });
        setUserProfile(res.data.data.data);
      });

      let pan = "";
      if (userData.pan_card == "" || userData.pan_card == null) {
        pan = localStorage.getItem("userPanNo");
      } else {
        pan = userData.pan_card;
      }

      const value = {
        pan: pan,
        name: userData.name,
      };

      Axios.post("http://localhost:5010/api/snapShot", value).then((result) => {
        $("#overlay").css("display", "none");
        // console.log("userData", result.data.data.data);
        this.setState({ dataList: result.data.data.data });
        this.setState({ loaded: !this.state.loaded });
      });

      const value2 = {
        pan_card: pan,
      };

      $(".div_profile").css("display", "block");
      Axios.post("http://localhost:5010/api/portfolio", value2).then(
        (result) => {
          //$("#overlay").css("display","none")
          $(".div_profile").css("display", "none");
          // console.log("userDataddd", result.data.data.data);
          this.setState({ userprotfolio: result.data.data.data });

          Axios.post(
            "http://localhost:5010/api/userProfileMemberList",
            value
          ).then((result) => {
            // console.log("userProfileMemberList", result.data);
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
                  inv_name: val.INVNAME,
                };

                Axios.post("http://localhost:5010/api/getIINStatus", data).then(
                  (res) => {
                    // console.log("getIINStatus", res.data);
                    if (res.data.data.status == 200) {
                      res.data.data.data.map((val1) => {
                        const data2 = {
                          iin: val1.CUSTOMER_ID,
                          email: userData.email,
                        };
                        Axios.post(
                          "http://localhost:5010/api/GETIINDETAILSWMS",
                          data2
                        ).then((resss) => {
                          const data = {
                            email: userData.email,
                          };

                          Axios.post(
                            "http://localhost:5010/api/User_profile",
                            data
                          ).then((res) => {
                            // console.log("amc",res.data.data.data)
                            this.setState({ userList: res.data.data.data });
                          });
                        });
                      });
                    }
                  }
                );
              });
            } else {
              const data = {
                pan_numbers: pan,
              };

              Axios.post("http://localhost:5010/api/getIINStatus", data).then(
                (res) => {
                  // console.log("getIINStatus", res.data);
                  if (res.data.data.status == 200) {
                    res.data.data.data.map((val1) => {
                      const data2 = {
                        iin: val1.CUSTOMER_ID,
                        email: userData.email,
                      };
                      Axios.post(
                        "http://localhost:5010/api/GETIINDETAILSWMS",
                        data2
                      ).then((resss) => {
                        const data = {
                          email: userData.email,
                        };

                        Axios.post(
                          "http://localhost:5010/api/User_profile",
                          data
                        ).then((res) => {
                          // console.log("amc",res.data.data.data)
                          this.setState({ userList: res.data.data.data });
                        });
                        // console.log("GETIINDETAILSWMS", resss.data);
                      });
                    });
                  }
                }
              );
            }
          });
        }
      );
    } else {
      // console.log("data filled");
      //set snapshot data
      this.setState({ currentvalue: this.context.snapshot[0].currentvalue });
      this.setState({ purchasecost: this.context.snapshot[0].purchasecost });
      this.setState({ dividend: this.context.snapshot[0].dividend });
      this.setState({ days_change: this.context.snapshot[0].days_change });
      this.setState({ cagr: this.context.snapshot[0].cagr });
      this.setState({ gain: this.context.snapshot[0].gain });
      this.setState({ gold_perc: this.context.snapshot[0].gold_perc });
      this.setState({ debt_perc: this.context.snapshot[0].debt_perc });
      this.setState({ equity_perc: this.context.snapshot[0].equity_perc });
      this.setState({ wmsloaded: !this.state.wmsloaded });

      //set Portfolio Data
      this.setState({ familyData: this.context.portfolioData[0] });
      this.setState({ loaded: !this.state.loaded });
      this.setState({ familyDataLoaded: !this.state.familyDataLoaded });
    }
  }

  profilioDetail = (pan, name) => {
    this.setState({ profilioPan: pan, profilioName: name });
  };

  render() {
    // console.log("this.state.loaded ", this.state.loaded);
    const data = {
      labels: ["Debt", "Equity", "Gold"],
      datasets: [
        {
          label: "Hours Studied in Geeksforgeeks",
          data: [
            this.state.debt_perc,
            this.state.equity_perc,
            this.state.gold_perc,
          ],
          backgroundColor: ["#F06D70", "#97C5FB", "#FBDE80"],
        },
      ],
    };

    if (this.state.profilioName) {
      return (
        <Redirect
          to={{
            pathname: "/prodigypro/dashboard/portfolio",
            profilioPan: this.state.profilioPan,
            profilioName: this.state.profilioName,
          }}
        />
      );
    }

    if (localStorage.getItem("loginUserData") == null) {
      return <Redirect to="/prodigypro/" />;
    }

    let e;
    let d;
    let g;
    const u = [];

    if (this.state.dataList) {
      if (this.state.dataList.equity_perc > 0) {
        e = { y: this.state.dataList.equity_perc, label: "Equity" };
        u.push(e);
      }

      if (this.state.dataList.debt_perc > 0) {
        d = { y: this.state.dataList.debt_perc, label: "Debt" };
        u.push(d);
      }

      if (this.state.dataList.gold_perc > 0) {
        g = { y: this.state.dataList.gold_perc, label: "Gold" };
        u.push(g);
      }
    }

    const options = {
      //exportEnabled: true,
      animationEnabled: true,
      // title: {
      //   text: "Website Traffic Sources"
      // },
      data: [
        {
          type: "doughnut",
          radius: "70%",
          startAngle: 75,
          toolTipContent: "<b>{label}</b>: {y}%",
          showInLegend: "true",
          legendText: "{label}",
          indexLabelFontSize: 16,
          indexLabel: "{label} - {y}%",
          dataPoints: u,
        },
      ],
    };
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
padding: 25px 37px;
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

.p-portfolio
{
  padding: 16px;
}
.col-m
{
  margin: auto 22px!important;
}
.goal-card h4 {
  
  font-size: 13px;
  width: 116px;
}
.modal-content {
  background-color: #F0F2FF;
}
.schemew
{
  width:33em;
}
.yearw
{
  width:10em;
}
.bw
{
  width:25em;
}
.maxw
{
  max-width: 70px !important;
}
.maxw9
{
  max-width: 92px !important;
}
         
          `}
        </style>

        {/* Page Wrapper */}
        <div id="wrapper">
          {/* <div id="overlay" >
            <div className="spinner"></div>
            <br />Loading...
          </div> */}
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
              <div className="container-fluid px-5">
                {this.state.familyDataLoaded && this.state.wmsloaded ? (
                  <DarkBackground disappear={false}>
                    <LoadingOverlay
                      active={true}
                      style={{ color: "red" }}
                      // spinner={<BounceLoader />}
                      spinner={true}
                    >
                      {/* <p>Some content or children or something.</p> */}
                    </LoadingOverlay>
                  </DarkBackground>
                ) : (
                  <DarkBackground disappear={true}>
                    <LoadingOverlay
                      active={true}
                      style={{ color: "red" }}
                      // spinner={<BounceLoader />}
                      spinner={true}
                    >
                      {/* <p>Some content or children or something.</p> */}
                    </LoadingOverlay>
                  </DarkBackground>
                )}

                <div className="row px-5 pb-5">
                  <div className="col md-12">
                    {/* Page Heading */}
                    <div className="d-sm-flex align-items-center justify-content-between mb-4">
                      {/* <h1 className="h3 mb-0 text-gray-800">Dashboard</h1> */}
                      {/* <a href="#" className="d-none d-sm-inline-block btn btn-sm btn-danger shadow-sm"><i className="fas fa-download fa-sm text-white-50" /> Generate Report</a> */}
                    </div>
                    {/* Content Row */}
                    <section className="pb-4">
                      <div className="row">
                        <div className="col-md-8">
                          <div className="row portfolio-s p-portfolio">
                            <div className="col-md-6  pl-3 py-3 ">
                              <div className="row">
                                <div className="col-md-12">
                                  <h5 className="gray lc gray-color">
                                    Market Value
                                  </h5>
                                  <h3>
                                    <img
                                      src={rupee}
                                      alt=""
                                      srcset=""
                                      className="new-icon"
                                    />
                                    <span className="lc text-dark">
                                      {this.state.currentvalue}
                                    </span>
                                  </h3>
                                  <hr className="border-bottom" />
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-md-6 border-right">
                                  <span className="gray lc fs-13 gray-color">
                                    Purchase Cost
                                  </span>
                                  <br />
                                  <h5>
                                    <img
                                      src={rupee}
                                      alt=""
                                      srcset=""
                                      className="new-icon"
                                    />
                                    <span className="lc text-dark">
                                      {this.state.purchasecost}
                                    </span>
                                  </h5>
                                </div>
                                <div className="col-md-6">
                                  <span className="gray lc fs-13 pb-2 gray-color">
                                    GAIN/LOSS
                                  </span>{" "}
                                  <br />
                                  <span className="lc text-dark">
                                    {this.state.gain}
                                    <span className="fa fa-arrow-up text-success"></span>
                                  </span>
                                </div>
                              </div>
                              <hr className="border-bottom" />
                              <div className="row">
                                <div className="col-md-4 border-right">
                                  <span className="gray lc fs-13 gray-color">
                                    Dividend
                                  </span>
                                  <br />
                                  <h5>
                                    <span className="lc text-dark">
                                      {this.state.dividend}
                                    </span>
                                  </h5>
                                </div>
                                <div className="col-md-5 border-right">
                                  <span className="gray lc fs-13 pb-2  gray-color">
                                    Day's Change
                                  </span>{" "}
                                  <br />
                                  <span className="lc  text-dark">
                                    {this.state.days_change}
                                    <span className="fa fa-arrow-up text-success"></span>
                                  </span>
                                </div>
                                <div className="col-md-3">
                                  <span className="gray lc fs-13 pb-2  gray-color">
                                    CAGR
                                  </span>{" "}
                                  <br />
                                  <span className="lc   text-dark">
                                    {this.state.cagr}
                                  </span>
                                </div>
                              </div>
                            </div>

                            <div className="col-md-6 pt-5 text-center">
                              <Doughnut data={data} />
                              <h5 className="pt-3">Asset Allocation</h5>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="quick-invest">
                            {/* <!-- Button trigger modal --> */}

                            <div className="quick-access-title mt-1">
                              <h3>Quick Invest</h3>
                            </div>
                            <a
                              href="#"
                              className="text-decoration-none"
                              data-target="#form-dialog"
                              data-toggle="modal"
                              type="button"
                            >
                              <div className="row">
                                <div className="col-md-12">
                                  <div className="quick-c py-3">
                                    Avoid the hassle and Deploy your funds in
                                    less than a Minute !
                                  </div>
                                  <input
                                    type="button"
                                    className="new-btn1 my-4"
                                    value="Invest Now"
                                  />
                                </div>
                              </div>
                            </a>
                            {/* <!============== Form Modal ================> */}
                            <div
                              tabindex="-1"
                              className="modal pmd-modal animate__animated animate__zoomIn animate__fast"
                              id="form-dialog"
                              aria-hidden="true"
                            >
                              <div className="modal-dialog modal-lg">
                                <div className="modal-content b-r p-3">
                                  <div className="modal-header border-0">
                                    <div className="quick-access-title">
                                      <h3>Quick Invest</h3>
                                    </div>
                                    <button
                                      aria-hidden="true"
                                      data-dismiss="modal"
                                      className="close"
                                      type="button"
                                    >
                                      ×
                                    </button>
                                  </div>
                                  <div className="modal-body">
                                    <form>
                                      <div className="row">
                                        <div className="col-md-4">
                                          <div className="form-group pmd-textfield pmd-textfield-floating-label">
                                            <label
                                              for="select-s"
                                              className="lb"
                                            >
                                              Select Profile
                                              <span className="text-danger">
                                                *
                                              </span>
                                            </label>
                                            <br />
                                            <select
                                              name="select-s"
                                              id="select-s"
                                              className="form-control border-0 selectpicker"
                                              data-live-search="true"
                                            >
                                              <option value="select">
                                                --Select--
                                              </option>
                                            </select>
                                          </div>
                                        </div>
                                        <div className="col-md-4">
                                          <div className="form-group pmd-textfield pmd-textfield-floating-label">
                                            <label for="invest" className="lb">
                                              Select AMC
                                              <span className="text-danger">
                                                *
                                              </span>
                                            </label>
                                            <br />
                                            <select
                                              name="invest"
                                              id="invest"
                                              className="form-control border-0 selectpicker"
                                              data-live-search="true"
                                            >
                                              <option value="select">
                                                --Select--
                                              </option>
                                            </select>
                                          </div>
                                        </div>
                                        <div className="col-md-4">
                                          <p className="text-label mb-1 mt-1 p-radio lb">
                                            Asset Class{" "}
                                            <spna className="text-danger">
                                              *
                                            </spna>
                                          </p>
                                          <div className="pt-2">
                                            <input
                                              className=" input-text"
                                              id="equity"
                                              type="radio"
                                              name="asset"
                                              value="Equity"
                                              onChange={this.targetScheme}
                                            />
                                            <label
                                              htmlFor="equity"
                                              className=""
                                            >
                                              Equity
                                            </label>
                                            <input
                                              className="input-text ml-3"
                                              id="debt"
                                              type="radio"
                                              name="asset"
                                              value="DEBT"
                                              onChange={this.targetScheme}
                                            />
                                            <label htmlFor="debt" className="">
                                              Debt
                                            </label>
                                            <br></br>{" "}
                                            <small className="text-danger pull-left">
                                              {this.state.asset_err}
                                            </small>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="row">
                                        <div className="col-md-4">
                                          <p className="text-label mb-1 mt-1 p-radio lb">
                                            Option{" "}
                                            <spna className="text-danger">
                                              *
                                            </spna>
                                          </p>
                                          <div className="pt-2">
                                            <input
                                              className=" input-text"
                                              id="growth"
                                              type="radio"
                                              name="growth"
                                              value="GROWTH"
                                              onChange={this.targetScheme}
                                            />
                                            <label
                                              htmlFor="growth"
                                              className=""
                                            >
                                              Growth
                                            </label>
                                            <input
                                              className="input-text ml-3"
                                              id="dividend"
                                              type="radio"
                                              name="growth"
                                              value="Dividend"
                                              onChange={this.targetScheme}
                                            />
                                            <label
                                              htmlFor="dividend"
                                              className=""
                                            >
                                              IDCW{" "}
                                            </label>
                                          </div>
                                        </div>
                                        <div className="col-md-4">
                                          <div className="form-group pmd-textfield pmd-textfield-floating-label">
                                            <label for="sip-t" className="lb">
                                              Select Scheme
                                              <span className="text-danger">
                                                *
                                              </span>
                                            </label>
                                            <br />
                                            <select
                                              name="sip-t"
                                              id="sip-t"
                                              className="form-control border-0 selectpicker"
                                              data-live-search="true"
                                            >
                                              <option value="select">
                                                --Select--
                                              </option>
                                            </select>
                                          </div>
                                        </div>
                                        <div className="col-md-4">
                                          <div className="form-group pmd-textfield pmd-textfield-floating-label">
                                            <label
                                              className="control-label lb"
                                              for="amount"
                                            >
                                              Enter Amount
                                              <span className="text-danger">
                                                *
                                              </span>
                                            </label>
                                            <input
                                              type="text"
                                              className="form-control border-0"
                                              name="amount"
                                              placeholder="Enter Amount"
                                            />
                                          </div>
                                        </div>
                                      </div>
                                      <div className="row">
                                        <div className="col-md-5">
                                          <div className="form-group pmd-textfield pmd-textfield-floating-label">
                                            <label
                                              htmlFor="payment_mode"
                                              className="text-label"
                                            >
                                              Select Payment Mode{" "}
                                              <span className="text-danger">
                                                *
                                              </span>
                                            </label>
                                            <br />
                                            <select
                                              name="payment_mode"
                                              id="payment_mode"
                                              className="form-control border-0 selectpicker"
                                              data-live-search="true"
                                            >
                                              <option value="OL">
                                                Net Banking
                                              </option>
                                              <option value="UPI">UPI</option>
                                              <option value="TR">
                                                RTGS/NEFT
                                              </option>
                                              <option value="M">
                                                Debit Mandate
                                              </option>
                                            </select>
                                          </div>
                                        </div>
                                        <div className="col-md-7">
                                          <div className="pt-4 mt-2">
                                            <input
                                              className=" input-text"
                                              id="emailLink"
                                              type="radio"
                                              name="payType"
                                              value="N"
                                            />
                                            <label
                                              htmlFor="emailLink"
                                              className=""
                                            >
                                              Link On Email
                                            </label>
                                            <input
                                              className="input-text ml-3"
                                              id="immediatePay"
                                              type="radio"
                                              name="payType"
                                              value="Y"
                                            />
                                            <label
                                              htmlFor="immediatePay"
                                              className=""
                                            >
                                              Immediate Payment
                                            </label>
                                          </div>
                                        </div>
                                        <div className="col-md-5">
                                          <div className="form-group pmd-textfield pmd-textfield-floating-label">
                                            <label
                                              for="select-bank"
                                              className="lb text-label"
                                            >
                                              Select Bank
                                              <span className="text-danger">
                                                *
                                              </span>
                                            </label>
                                            <br />
                                            <select
                                              name="select-bank"
                                              id="select-bank"
                                              className="form-control border-0 selectpicker"
                                              data-live-search="true"
                                            >
                                              <option value="select">
                                                --Select--
                                              </option>
                                            </select>
                                          </div>
                                        </div>
                                        <div className="col-md-7 pt-4 mt-2">
                                          <button
                                            data-dismiss="modal"
                                            className="new-btn1 float-right"
                                            type="button"
                                          >
                                            Invest Now
                                          </button>
                                        </div>
                                      </div>
                                    </form>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </section>
                    {/* ====================family Porfolio====================== */}
                    <section className="family-portfolio-s py-4">
                      <div className="quick-access-title pb-4">
                        <h3>Family Portfolio</h3>
                      </div>
                      <div className="family-portfolio">
                        <table className="table text-center">
                          <tr className="red">
                            <th className="pl-4">Name</th>
                            <th>Purchase Cost (₹)</th>
                            <th>Market Value(₹)</th>
                            <th>Gain/Loss</th>
                            <th>CAGR(%)</th>
                          </tr>
                          {this.state.familyData
                            ? this.state.familyData.map((item, key) => (
                                <tr>
                                  <td className="pl-4">
                                    <a href="!#">{item.name}</a>
                                  </td>
                                  <td>{item.purchasecost}</td>
                                  <td>{item.currentvalue}</td>
                                  <td>
                                    {" "}
                                    {item.gain}
                                    <span className="fa fa-arrow-up text-success"></span>{" "}
                                  </td>
                                  <td>{item.cagr}</td>
                                </tr>
                              ))
                            : null}
                        </table>
                      </div>
                    </section>

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
                            <a
                              className="quick-link"
                              href="/prodigypro/dashboard/portfolio"
                            >
                              <img
                                src={advisory}
                                className="mr-2 new-icon"
                                alt=""
                              />
                              <span>Portfolio Review</span>
                            </a>
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div className="quick-card">
                            <a
                              className="quick-link"
                              href="/prodigypro/dashboard/portfolio"
                            >
                              <img
                                src={advisory}
                                className="mr-2 new-icon"
                                alt=""
                              />
                              <span>NFO Live</span>
                            </a>
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div className="quick-card">
                            <a
                              className="quick-link"
                              href="/prodigypro/dashboard/simply-sip"
                            >
                              <img
                                src={portfolio}
                                className="mr-2 img-fluid new-icon"
                                alt=""
                              />
                              <span>Simply Sip</span>
                            </a>
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div className="quick-card">
                            <a
                              className="quick-link"
                              href="/prodigypro/dashboard/simply-save"
                            >
                              <img
                                src={portfolio}
                                className="mr-2 img-fluid new-icon"
                                alt=""
                              />
                              <span>Simply Save</span>
                            </a>
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
                        <div className="col-md-1 col-m">
                          <a className=" bg-white goal-link" href="!#">
                            <div className="goal-card text-center">
                              <img
                                src={retirement}
                                className="mx-3 new-icon bg-c p-3"
                                alt=""
                              />
                              <br />
                              <h4 className="pt-4">Retirement</h4>
                            </div>
                          </a>
                        </div>
                        <div className="col-md-1 col-m">
                          <a className="bg-white goal-link" href="!#">
                            <div className="goal-card text-center">
                              <img
                                src={child}
                                className="mx-3 new-icon bg-c p-3"
                                alt=""
                              />
                              <h4 className="pt-4">Child Education</h4>
                            </div>
                          </a>
                        </div>
                        <div className="col-md-1 col-m">
                          <a className="bg-white goal-link" href="!#">
                            <div className="goal-card text-center">
                              <img
                                src={house}
                                className="mx-3 new-icon bg-c p-3"
                                alt=""
                              />
                              <h4 className="pt-4">House Purchase</h4>
                            </div>
                          </a>
                        </div>
                        <div className="col-md-1 col-m">
                          <a className="bg-white goal-link" href="!#">
                            <div className="goal-card text-center">
                              <img
                                src={car}
                                className="mx-3 new-icon bg-c p-3"
                                alt=""
                              />
                              <h4 className="pt-4">Car Purchase</h4>
                            </div>
                          </a>
                        </div>

                        <div className="col-md-1 col-m">
                          <a className="bg-white goal-link" href="!#">
                            <div className="goal-card text-center">
                              <img
                                src={wealth}
                                className="mx-3 new-icon bg-c p-3"
                                alt=""
                              />
                              <h4 className="pt-4">Wealth Creation</h4>
                            </div>
                          </a>
                        </div>
                        <div className="col-md-1 col-m">
                          <a className="bg-white goal-link" href="!#">
                            <div className="goal-card text-center">
                              <img
                                src={home}
                                className="mx-3 new-icon bg-c p-3"
                              />
                              <h4 className="pt-4">Home Renovation</h4>
                            </div>
                          </a>
                        </div>
                        <div className="col-md-1 col-m">
                          <a className=" bg-white goal-link" href="!#">
                            <div className="goal-card text-center">
                              <img
                                src={vacation}
                                className="mx-3 new-icon bg-c p-3"
                              />
                              <h4 className="pt-4">Vacation</h4>
                            </div>
                          </a>
                        </div>
                        <div className="col-md-1 col-m">
                          <a className="bg-white goal-link " href="!#">
                            <div className="goal-card text-center">
                              <img
                                src={marriage}
                                className="mx-3 new-icon bg-c p-3"
                              />
                              <h4 className="pt-4">Child Marriage</h4>
                            </div>
                          </a>
                        </div>
                      </div>
                    </section>

                    {/* =============All mutual funds Section=============== */}
                    <section className="all-mf-s">
                      <div className="row">
                        <div className="col-md-12">
                          <div className="goal-plan-title pb-5 pt-5">
                            <h3>All Mutual Funds</h3>
                          </div>
                        </div>

                        {/* =============Tabs for mf================ */}
                        <div className="col-md-8 offset-md-2 filter-all-mf">
                          <ul class="nav nav-pills navtop  ">
                            <li class="nav-item border-right">
                              <a
                                class="nav-link active"
                                data-toggle="tab"
                                href="#tab1"
                              >
                                {" "}
                                <span>Equity</span>
                              </a>
                            </li>
                            <li class="nav-item border-right">
                              <a
                                class="nav-link"
                                data-toggle="tab"
                                href="#tab2"
                              >
                                <span>Tax Saving</span>
                              </a>
                            </li>
                            <li class="nav-item border-right">
                              <a
                                class="nav-link"
                                data-toggle="tab"
                                href="#tab3"
                              >
                                <span>Hybrid</span>
                              </a>
                            </li>
                            <li class="nav-item">
                              <a
                                class="nav-link "
                                data-toggle="tab"
                                href="#tab4"
                              >
                                <span>Debt</span>
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="row text-center">
                        <div className="col-md-12 ">
                          <div className="col-md-4 offset-md-4 py-4">
                            <ul class="nav nav-pills nav-fill navtop longshort">
                              <li class="nav-item">
                                <a
                                  class="nav-link active fs-16"
                                  href="#menu1"
                                  data-toggle="tab"
                                >
                                  Short Term
                                </a>
                              </li>
                              <li class="nav-item">
                                <a
                                  class="nav-link fs-16"
                                  href="#menu2"
                                  data-toggle="tab"
                                >
                                  Long Term
                                </a>
                              </li>
                            </ul>
                          </div>

                          {/* <div className='col-md-6 '>
                              <button className='filter-btn float-left'>Filter / Sort <FaSlidersH className='fa' /></button>
                            </div>
                            <div className='col-md-6'>

                              <button className='year-btn float-right'><FaAngleLeft className='fa' /><FaAngleRight className='fa' /> 3Y Returns </button>
                            </div> */}

                          <table className="table text-center">
                            <tr className="bg-gray">
                              <th></th>
                              <th className="schemew">Scheme Name</th>
                              <th style={{ width: "10em" }}>1Y Return</th>
                              <th style={{ width: "10em" }}>3Y Return</th>
                              <th style={{ width: "10em" }}>5Y Return</th>
                              <th style={{ width: "10em" }}>7Y Return</th>
                              <th style={{ width: "23em" }}></th>
                            </tr>
                          </table>

                          <div class="tab-content mt-3 ">
                            <div
                              class="tab-pane show active"
                              id="tab1"
                              role="tabpanel"
                            >
                              <table className="table text-center">
                                <tr>
                                  <td>
                                    {" "}
                                    <img src={quant2} alt="" className="maxw" />
                                  </td>
                                  <td className="pt-4 schemew">
                                    Quant Small Cap Fund Direct Plan Growth
                                  </td>
                                  <td className="pt-4 yearw">37.54%</td>
                                  <td className="pt-4 yearw">37.54%</td>
                                  <td className="pt-4 yearw">37.54%</td>
                                  <td className="pt-4 yearw">37.54%</td>
                                  <td className="bw">
                                    <button className="btn-outline">
                                      Invest
                                    </button>
                                    <button className="btn-outline">
                                      Add To Cart
                                    </button>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    {" "}
                                    <img src={quant2} alt="" className="maxw" />
                                  </td>
                                  <td className="pt-4 schemew">
                                    Quant Small Cap Fund Direct Plan Growth
                                  </td>
                                  <td className="pt-4">37.54%</td>
                                  <td className="pt-4">37.54%</td>
                                  <td className="pt-4">37.54%</td>
                                  <td className="pt-4">37.54%</td>
                                  <td>
                                    <button className="btn-outline">
                                      Invest
                                    </button>
                                    <button className="btn-outline">
                                      Add To Cart
                                    </button>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    {" "}
                                    <img src={quant2} alt="" className="maxw" />
                                  </td>
                                  <td className="pt-4 schemew">
                                    Quant Small Cap Fund Direct Plan Growth
                                  </td>
                                  <td className="pt-4">37.54%</td>
                                  <td className="pt-4">37.54%</td>
                                  <td className="pt-4">37.54%</td>
                                  <td className="pt-4">37.54%</td>
                                  <td>
                                    <button className="btn-outline">
                                      Invest
                                    </button>
                                    <button className="btn-outline">
                                      Add To Cart
                                    </button>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    {" "}
                                    <img src={quant2} alt="" className="maxw" />
                                  </td>
                                  <td className="pt-4 schemew">
                                    Quant Small Cap Fund Direct Plan Growth
                                  </td>
                                  <td className="pt-4">37.54%</td>
                                  <td className="pt-4">37.54%</td>
                                  <td className="pt-4">37.54%</td>
                                  <td className="pt-4">37.54%</td>
                                  <td>
                                    <button className="btn-outline">
                                      Invest
                                    </button>
                                    <button className="btn-outline">
                                      Add To Cart
                                    </button>
                                  </td>
                                </tr>
                              </table>
                            </div>
                            <div class="tab-pane " id="tab2" role="tabpanel">
                              <table className="table text-center">
                                {/* <tr className='bg-gray'>
                                  <th></th>
                                  <th className='schemew'>Scheme Name</th>
                                  <th>3Y Return</th>
                                  <th>5Y Return</th>
                                  <th></th>
                                </tr> */}

                                <tr>
                                  <td>
                                    {" "}
                                    <img src={pgim} alt="" className="maxw" />
                                  </td>
                                  <td className="pt-4 schemew">
                                    PGMI India Midcap Opportunities Fund Direct
                                    Growth
                                  </td>
                                  <td className="pt-4 yearw">27.54%</td>
                                  <td className="pt-4 yearw">27.54%</td>
                                  <td className="pt-4 yearw">27.54%</td>
                                  <td className="pt-4 yearw">27.54%</td>
                                  <td className="bw">
                                    <button className="btn-outline">
                                      Invest
                                    </button>
                                    <button className="btn-outline">
                                      Add To Cart
                                    </button>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    {" "}
                                    <img src={pgim} alt="" className="maxw" />
                                  </td>
                                  <td className="pt-4 schemew">
                                    PGMI India Midcap Opportunities Fund Direct
                                    Growth
                                  </td>
                                  <td className="pt-4">27.54%</td>
                                  <td className="pt-4">27.54%</td>
                                  <td className="pt-4">27.54%</td>
                                  <td className="pt-4">27.54%</td>

                                  <td>
                                    <button className="btn-outline">
                                      Invest
                                    </button>
                                    <button className="btn-outline">
                                      Add To Cart
                                    </button>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    {" "}
                                    <img src={pgim} alt="" className="maxw" />
                                  </td>
                                  <td className="pt-4 schemew">
                                    PGMI India Midcap Opportunities Fund Direct
                                    Growth
                                  </td>
                                  <td className="pt-4">27.54%</td>
                                  <td className="pt-4">27.54%</td>
                                  <td className="pt-4">27.54%</td>
                                  <td className="pt-4">27.54%</td>
                                  <td>
                                    <button className="btn-outline">
                                      Invest
                                    </button>
                                    <button className="btn-outline">
                                      Add To Cart
                                    </button>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    {" "}
                                    <img src={pgim} alt="" className="maxw" />
                                  </td>
                                  <td className="pt-4 schemew">
                                    PGMI India Midcap Opportunities Fund Direct
                                    Growth
                                  </td>
                                  <td className="pt-4">27.54%</td>
                                  <td className="pt-4">27.54%</td>
                                  <td className="pt-4">27.54%</td>
                                  <td className="pt-4">27.54%</td>
                                  <td>
                                    <button className="btn-outline">
                                      Invest
                                    </button>
                                    <button className="btn-outline">
                                      Add To Cart
                                    </button>
                                  </td>
                                </tr>
                              </table>
                            </div>
                            <div class="tab-pane " id="tab3" role="tabpanel">
                              <table className="table text-center">
                                {/* <tr className='bg-gray'>
                                  <th></th>
                                  <th className='schemew'>Scheme Name</th>
                                  <th>3Y Return</th>
                                  <th>5Y Return</th>
                                  <th></th>
                                </tr> */}

                                <tr>
                                  <td>
                                    {" "}
                                    <img src={boi} alt="" className="maxw" />
                                  </td>
                                  <td className="pt-4 schemew">
                                    Bank of India Small Cap Fund Direct Growth
                                  </td>
                                  <td className="pt-4 yearw">30.04%</td>
                                  <td className="pt-4 yearw">30.04%</td>
                                  <td className="pt-4 yearw">30.04%</td>
                                  <td className="pt-4 yearw">30.04%</td>
                                  <td className="bw">
                                    <button className="btn-outline">
                                      Invest
                                    </button>
                                    <button className="btn-outline">
                                      Add To Cart
                                    </button>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    {" "}
                                    <img src={boi} alt="" className="maxw" />
                                  </td>
                                  <td className="pt-4 schemew">
                                    Bank of India Small Cap Fund Direct Growth
                                  </td>
                                  <td className="pt-4">30.04%</td>
                                  <td className="pt-4">30.04%</td>
                                  <td className="pt-4">30.04%</td>
                                  <td className="pt-4">30.04%</td>
                                  <td>
                                    <button className="btn-outline">
                                      Invest
                                    </button>
                                    <button className="btn-outline">
                                      Add To Cart
                                    </button>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    {" "}
                                    <img src={boi} alt="" className="maxw" />
                                  </td>
                                  <td className="pt-4 schemew">
                                    Bank of India Small Cap Fund Direct Growth
                                  </td>
                                  <td className="pt-4">30.04%</td>
                                  <td className="pt-4">30.04%</td>
                                  <td className="pt-4">30.04%</td>
                                  <td className="pt-4">30.04%</td>
                                  <td>
                                    <button className="btn-outline">
                                      Invest
                                    </button>
                                    <button className="btn-outline">
                                      Add To Cart
                                    </button>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    {" "}
                                    <img src={boi} alt="" className="maxw" />
                                  </td>
                                  <td className="pt-4 schemew">
                                    Bank of India Small Cap Fund Direct Growth
                                  </td>
                                  <td className="pt-4">30.04%</td>
                                  <td className="pt-4">
                                    <span>30.04%</span>
                                  </td>
                                  <td className="pt-4">30.04%</td>
                                  <td className="pt-4">30.04%</td>
                                  <td>
                                    <button className="btn-outline">
                                      Invest
                                    </button>
                                    <button className="btn-outline">
                                      Add To Cart
                                    </button>
                                  </td>
                                </tr>
                              </table>
                            </div>
                            <div class="tab-pane " id="tab4" role="tabpanel">
                              <table className="table text-center">
                                {/* <tr className='bg-gray'>
                                  <th></th>
                                  <th className='schemew'>Scheme Name</th>
                                  <th>3Y Return</th>
                                  <th>5Y Return</th>
                                  <th></th>
                                </tr> */}

                                <tr>
                                  <td>
                                    {" "}
                                    <img
                                      src={canera}
                                      alt=""
                                      className="maxw9"
                                    />
                                  </td>
                                  <td className=" schemew">
                                    Canara Robeco Small Cap Fund Direct Growth
                                  </td>
                                  <td className="pt-4 yearw">7.54%</td>
                                  <td className="pt-4 yearw">
                                    <span>7.54%</span>
                                  </td>
                                  <td className="pt-4 yearw">7.54%</td>
                                  <td className="pt-4 yearw">7.54%</td>
                                  <td className="bw">
                                    <button className="btn-outline">
                                      Invest
                                    </button>
                                    <button className="btn-outline">
                                      Add To Cart
                                    </button>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    {" "}
                                    <img
                                      src={canera}
                                      alt=""
                                      className="maxw9"
                                    />
                                  </td>
                                  <td className=" schemew">
                                    Canara Robeco Small Cap Fund Direct Growth
                                  </td>
                                  <td className="pt-4">7.54%</td>
                                  <td className="pt-4">
                                    <span>7.54%</span>
                                  </td>
                                  <td className="pt-4">7.54%</td>
                                  <td className="pt-4">
                                    <span>7.54%</span>
                                  </td>
                                  <td>
                                    <button className="btn-outline">
                                      Invest
                                    </button>
                                    <button className="btn-outline">
                                      Add To Cart
                                    </button>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    {" "}
                                    <img
                                      src={canera}
                                      alt=""
                                      className="maxw9"
                                    />
                                  </td>
                                  <td className=" schemew">
                                    Canara Robeco Small Cap Fund Direct Growth
                                  </td>
                                  <td className="pt-4">7.54%</td>
                                  <td className="pt-4">
                                    <span>7.54%</span>
                                  </td>
                                  <td className="pt-4">7.54%</td>
                                  <td className="pt-4">
                                    <span>7.54%</span>
                                  </td>
                                  <td>
                                    <button className="btn-outline">
                                      Invest
                                    </button>
                                    <button className="btn-outline">
                                      Add To Cart
                                    </button>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    {" "}
                                    <img
                                      src={canera}
                                      alt=""
                                      className="maxw9"
                                    />
                                  </td>
                                  <td className=" schemew">
                                    Canara Robeco Small Cap Fund Direct Growth
                                  </td>
                                  <td className="pt-4">7.54%</td>
                                  <td className="pt-4">
                                    <span>7.54%</span>
                                  </td>
                                  <td className="pt-4">7.54%</td>
                                  <td className="pt-4">
                                    <span>7.54%</span>
                                  </td>
                                  <td>
                                    <button className="btn-outline">
                                      Invest
                                    </button>
                                    <button className="btn-outline">
                                      Add To Cart
                                    </button>
                                  </td>
                                </tr>
                              </table>
                            </div>
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
            </div>
          </div>
          {/* End of Content Wrapper */}
        </div>
        {/* End of Page Wrapper */}
      </>
    );
  }
}
export default Home;
