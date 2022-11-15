import React, { component } from "react";
import Header from "./header";
import Footer from "./footer";
import { Helmet } from "react-helmet";
import $ from "jquery";
import axis from "../../assets/images/icons/New folder (2)/axis (2).jpg";
import sunderam from "../../assets/images/icons/New folder (2)/Sundaram_Mutual_Fund.png";
import sbi from "../../assets/images/icons/New folder (2)/sbi mutual fund.png";
import idfc from "../../assets/images/icons/New folder (2)/IDFC.png";
import star from "../../assets/images/icons/New folder (2)/star.png";
// import cross from "../../assets/images/icon/New folder (2)/Union.png";
import { LineChart } from "react-chartkick";
import "chartkick/chart.js";
import Select from "react-select";
import { FaTrash } from "react-icons/fa";
import { DatePickerComponent } from "@syncfusion/ej2-react-calendars";
import Nav_Chart from "./nav-chart";
import Axios from "axios";
import LoadingOverlay from "react-loading-overlay";
import styled, { css } from "styled-components";

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

class Tax_Planning extends React.Component {
  constructor() {
    super();
    this.state = {
      users: [],
    };
    this.state = {
      Items: [],
      bankName: [],
      profileData: [],
    };
  }

  //initializing context
  static contextType = UserContext;

  componentDidMount() {
    const schemeList = [];
    const list = "";
    const userData = JSON.parse(localStorage.getItem("loginUserData"));
    this.setState({ userIin: userData.iin });

    const data = {
      email: userData.email,
    };

    const { setTaxPlanningLumpSum } = this.context;
    // alert(data.email)
    // Axios.post("http://localhost:5010/api/User_profile", data)
    // .then((res) => {
    //     console.log("ssssssssss",res.data.data.data)
    //     this.setState({userList:res.data.data.data})
    // })

    if (this.context.taxPlanningLumpSum.length == 0) {
      //call api and setState

      const bankData = {
        transaction_type: "Lumpsum Tax Planning",
        anchoring: "",
        constellation: "",
      };

      Axios.post("http://localhost:5010/api/getBasketList", bankData).then(
        (res) => {
          let isinList = [];
          let amc_code_list = [];
          let isin_no = res.data.data.data[0].isin_no;
          let amc_code = res.data.data.data[0].amc_code;
          // console.log("aaaaaaaaaaaaaaa", res.data.data.data[0].amc_code);

          if (isin_no != "") {
            const answer_array = isin_no.split(",");
            const amc_array = amc_code.split(",");
            for (let index = 0; index < answer_array.length; index++) {
              const element = answer_array[index];
              const amc_element = amc_array[index];
              var isin_DATA = element.replace(/ /g, "");
              var amc_DATA = amc_element.replace(/ /g, "");
              // console.log("isin_DATA",isin_DATA);
              const data = {
                isin: isin_DATA,
                amc_code: amc_DATA,
              };

              isinList.push(data);
              // amc_code_list.push(data);
              // console.log("isinList", data);

              Axios.post("http://localhost:5010/api/ProductViaISIN", data).then(
                (result) => {
                  let products = result.data.data.data[0];
                  // console.log("products",result);
                  // console.log(
                  //   "products",
                  //   result.data.data.data[0].PRODUCT_LONG_NAME
                  // );

                  this.setState({
                    bankName: [
                      ...this.state.bankName,
                      result.data.data.data[0].PRODUCT_LONG_NAME,
                    ],
                  });

                  if (this.context.taxPlanningLumpSum.length != 4) {
                    setTaxPlanningLumpSum(
                      result.data.data.data[0].PRODUCT_LONG_NAME
                    );
                  }

                  let htmlDATa =
                    "<tr><td>" + products.PRODUCT_LONG_NAME + "</td></tr>";
                  let htmlDATas =
                    "<tr><td>" + products.PRODUCT_LONG_NAME + "</td></tr>";
                  // $("#showData").append(htmlDATa);
                  // $("#showDatas").append(htmlDATas);
                }
              );
            }
            // console.log("userData.email", userData.email);
            let data = {
              email: userData.email,
            };
            Axios.post("http://localhost:5010/api/User_profile", data).then(
              (result) => {
                this.setState({ profileData: result.data.data.data });
                // console.log("result.data.data.data", result.data.data.data);
              }
            );
            // console.log("isinList", JSON.stringify(isinList));
            localStorage.setItem("isinDATA", JSON.stringify(isinList));
          }
        }
      );
    } else {
      // get data from context and setState

      // setTaxPlanningLumpSum(
      //   result.data.data.data[0].PRODUCT_LONG_NAME
      // );
      this.setState({
        bankName: [...this.context.taxPlanningLumpSum],
      });
    }
  }
  userProfile = (e) => {
    // console.log("res.data.data.data");

    let userPro_id;
    let schemeList = [];
    userPro_id = $('select[name="usersId"]').val();
    const userData = JSON.parse(localStorage.getItem("loginUserData"));
    this.state.userList.map((value) => {
      if (value.id == userPro_id) {
        localStorage.setItem("user", JSON.stringify(value));
        // console.log("user", JSON.stringify(value));
        const mandate = {
          email: userData.email,
          IIN: value.customer_id,
        };

        Axios.post("http://localhost:5010/api/mandateList", mandate).then(
          (res) => {
            this.setState({ userMandateList: res.data.data.data });
            // console.log("res.data.data.data", res.data.data.data);
          }
        );
      }
    });
  };

  hideScheme() {
    $("#prod_div").css({ display: "none" });
    $("#single_div").css({ display: "block" });
  }
  hide1() {
    $("#cart").css({ display: "none" });
    $("#formhide").css({ display: "block" });
  }
  hide2() {
    $("#formhide").css({ display: "none" });
    $("#confirm").css({ display: "block" });
  }
  hide3() {
    $("#confirm").css({ display: "none" });
    $("#purchase").css({ display: "block" });
  }
  hides1() {
    $("#carts").css({ display: "none" });
    $("#formf").css({ display: "block" });
  }
  hides4() {
    $("#formf").css({ display: "none" });
    $("#formhides").css({ display: "block" });
  }
  hides2() {
    $("#formhides").css({ display: "none" });
    $("#confirms").css({ display: "block" });
  }
  hides3() {
    $("#confirms").css({ display: "none" });
    $("#purchases").css({ display: "block" });
  }

  render() {
    // console.log("bankName lumpsum list ", this.state.bankName);

    const folio = [
      { value: "1544545454", label: "1544545454" },
      { value: "55588888", label: "55588888" },
    ];
    const date = [
      { value: "1", label: "1" },
      { value: "2", label: "2" },
      { value: "3", label: "3" },
      { value: "4", label: "4" },
    ];
    const profile = [];
    if (this.state.profileData) {
      this.state.profileData.map((s) => {
        let pc = {
          value: s.investor_name,
          label: s.investor_name,
        };
        profile.push(pc);
      });
    }

    const selectperiod = [{ value: "select", label: "select" }];
    const data1 = [
      {
        name: "Market Value",
        data: {
          "1M": 0,
          "3M": 24000,
          "1Y": 34000,
          "3Y": 48000,
          "5Y": 5000,
          All: 58000,
        },
      },
    ];
    return (
      <>
        <Helmet>
          <title>Tax Planning</title>
        </Helmet>
        <style>
          {`
            .card{
                min-height:420px;
            }
           
            #Wait{
                display:none;
            }
            .text-color{
                color:#fff !important;
            }
            .navtop
            {
                display:flex;
                font-size: 14px;
                background-color: hsla(0,0%,100%,.26);
                border: 1px solid #DA6066;
                border-radius: 50px;
                backdrop-filter: blur(26px);
                -webkit-backdrop-filter: blur(26px);
                padding: 4px;
                font-weight:500;
              
            }
            .nav-pills .nav-link {             
                color: #f06d70;
              }
              .nav-pills .nav-item {
                padding: 0px!important;
              }
              .custom-tab-bg {
                background-color: #FAF1F2;
              }
              .table td a, .table th
              {
                color:#000;
              }
              #single_div
              {
                display:none;
              }
              .modal-dialog
 {
  padding-bottom:3em;
 }
 .btn.dropdown-toggle
 {
border:none!important;
 }
 .dropdown-menu.show
 {
border-radius:0.35rem;
 }
 .dropdown-item.active{
    color: #000;
    border-radius: 0.5rem;
    background-color: #FDF0F0;
 }
 #formhide, #confirm,#purchase,#formhides, #confirms,#purchases,#formf
 {
  display:none;
 }
 .shadowcart
              {
                background: #FFFFFF;
box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.2);
border-radius: 15px;
              }
              .shadowcart a
              {
                color:#000;
              }
             
              #ej2-datepicker_3,#ej2-datepicker_2 {
                border: 2px solid #f0f2ff !important;
              }
              
          `}
        </style>

        {/* Page Wrapper */}
        <div id="wrapper">
          {/* Sidebar */}
          {/* <Sidebar mainTab="tax"  innertab="tax-planning-lumpsum"/> */}
          {/* End of Sidebar */}

          {/* Content Wrapper */}
          <div id="content-wrapper" className="d-flex flex-column">
            {/* Main Content */}
            <div id="content">
              {/* Topbar */}
              <Header />
              {/* End of Topbar */}

              {/* Begin Page Content */}
              <div className="container-fluid">
                {/* Loader */}

                {this.state.bankName.length < 4 ? (
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
                ) : (
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
                )}

                {/* Page Heading */}
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <a href="home">Home</a>
                    </li>
                    <li className="breadcrumb-item active">Tax Planning</li>
                  </ol>
                </nav>
                <div id="prod_div">
                  <div className="col-md-6 offset-md-3 mb-3 mt-5">
                    <ul class="nav nav-pills nav-fill navtop">
                      <li class="nav-item">
                        <a
                          class="nav-link active fs-16"
                          href="#menu1"
                          data-toggle="tab"
                        >
                          Lumpsum
                        </a>
                      </li>
                      <li class="nav-item">
                        <a
                          class="nav-link fs-16"
                          href="#menu2"
                          data-toggle="tab"
                        >
                          SIP
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div class="tab-content mt-3 ">
                    <div
                      class="tab-pane show active"
                      id="menu1"
                      role="tabpanel"
                    >
                      <div className="row mt-5">
                        <div className="col-xl-10 col-lg-10 offset-md-1">
                          <div className="card shadow">
                            <div className="card-body custom-tab-bg" id="Wait">
                              <div className="col-12">Please Wait...</div>
                            </div>
                            <div className="card-body custom-tab-bg">
                              <div className="col-12">
                                <table class="table">
                                  <thead>
                                    <tr>
                                      <th scope="col">Recommended Schemes</th>
                                      <th></th>
                                    </tr>
                                  </thead>
                                  <tbody id="showData">
                                    {this.state.bankName.length == 4 &&
                                      this.state.bankName.map(
                                        (fundName, idx) => {
                                          // console.log("from mapped ", fundName);
                                          return (
                                            <tr key={idx}>
                                              <td>
                                                <img
                                                  src={sbi}
                                                  alt=""
                                                  className="img-fluid"
                                                />
                                              </td>
                                              <td className="pt-4">
                                                <a href="!#">{fundName} </a>
                                              </td>
                                            </tr>
                                          );
                                        }
                                      )}
                                    {/* <tr>
                                      <td><img src={idfc} alt="" className='img-fluid' /></td>
                                      <td className='pt-4'><a href='javascript:void(0);' onClick={this.hideScheme}>IDFC Tax Advantage (ELSS)
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
                                    </tr> */}
                                  </tbody>
                                </table>
                                <div className="col-md-12 pb-3">
                                  <a
                                    href="javascript:void(0);"
                                    className="float-right"
                                    data-target="#form-dialog-new-purchase"
                                    data-toggle="modal"
                                    type="button"
                                  >
                                    Looking for another scheme?
                                  </a>
                                </div>
                              </div>

                              <div className="col-12 mt-4 mb-3 text-right">
                                <a
                                  className="btn-custom text-color"
                                  data-toggle="modal"
                                  data-target="#lumpsum"
                                >
                                  Continue
                                </a>
                                {/* <a className="btn btn-danger shadow-sm text-color" data-toggle="modal"    data-target="#sip_purchase">Continue</a> */}
                              </div>
                            </div>
                          </div>
                          {/* disclaimer */}
                          <div class="text-center pt-4 mb-0" role="alert">
                            <p className="text-disclaimer  fs-13 text-black">
                              *Mutual Fund investments are subject to market
                              risks, please read the scheme related documents
                              carefully before investing.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="tab-pane show" id="menu2" role="tabpanel">
                      <div className="row mt-5">
                        <div className="col-xl-10 col-lg-10 offset-md-1">
                          <div className="card shadow">
                            {/* <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                    <h6 className="m-0 font-weight-bold text-danger">Tax Planning - Lumpsum</h6> 
                                </div> */}
                            {/* Card Body */}
                            <div className="card-body custom-tab-bg" id="Wait">
                              <div className="col-12">Please Wait...</div>
                            </div>
                            <div className="card-body custom-tab-bg">
                              <div className="col-12">
                                <table class="table">
                                  <thead>
                                    <tr>
                                      <th scope="col">Recommended Schemes</th>
                                      <th></th>
                                    </tr>
                                  </thead>
                                  <tbody id="showDatas">
                                    {this.state.bankName.length == 4
                                      ? this.state.bankName.map(
                                          (fundName, idx) => {
                                            // console.log("from mapped ", fundName);
                                            return (
                                              <tr key={idx}>
                                                <td>
                                                  <img
                                                    src={sbi}
                                                    alt=""
                                                    className="img-fluid"
                                                  />
                                                </td>
                                                <td className="pt-4">
                                                  <a href="!#">{fundName} </a>
                                                </td>
                                              </tr>
                                            );
                                          }
                                        )
                                      : null}
                                    {/* <tr>
                                      <td><img src={sunderam} alt="" className='img-fluid' /></td>
                                      <td className='pt-4'><a href='!#'>Sundaram Tax Savings Fund (Formerly Principal Tax Savings Fund)-
                                        Regular Growth </a> </td>
                                    </tr>
                                    <tr>
                                      <td><img src={sbi} alt="" className='img-fluid' /></td>
                                      <td className='pt-4'><a href='!#'>SBI Long Term Equity Fund-Regular
                                        Plan-Growth  </a></td>
                                    </tr>
                                    <tr>
                                      <td><img src={idfc} alt="" className='img-fluid' /></td>
                                      <td className='pt-4'><a href='!#'>IDFC Tax Advantage (ELSS)
                                        Fund-Growth-Regular Plan   </a></td>
                                    </tr>
                                    <tr>

                                      <td><img src={sunderam} alt="" className='img-fluid' /></td>
                                      <td className='pt-4'> <a href='!#'>Sundaram Tax Savings Fund (Formerly Principal Tax Savings Fund)-
                                        Regular Growth  </a></td>
                                    </tr> */}
                                  </tbody>
                                </table>
                                <div className="col-md-12 pb-3">
                                  <a
                                    href="javascript:void(0);"
                                    className="float-right"
                                    data-target="#form-dialog-sip"
                                    data-toggle="modal"
                                    type="button"
                                  >
                                    Looking for another scheme?
                                  </a>
                                </div>
                              </div>
                              <div className="col-12 mt-4 mb-3 text-right">
                                <a
                                  className="btn-custom text-color"
                                  data-toggle="modal"
                                  data-target="#sip"
                                >
                                  Continue
                                </a>
                                {/* <a className="btn btn-danger shadow-sm text-color" data-toggle="modal"    data-target="#sip_purchase">Continue</a> */}
                              </div>
                            </div>
                          </div>
                          {/* disclaimer */}
                          <div class="text-center pt-4 mb-0" role="alert">
                            <p className="text-disclaimer  fs-13 text-black">
                              *Mutual Fund investments are subject to market
                              risks, please read the scheme related documents
                              carefully before investing.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="col-md-10 offset-md-1 card shadow my-5"
                  id="single_div"
                >
                  <div className="card-body">
                    <div className="col-md-12 py-3">
                      <table>
                        <tr>
                          <td className="px-4">
                            <img src={idfc} alt="" className="img-fluid" />
                          </td>
                          <td className="px-4">
                            IDFC Tax Advantage (ELSS) Fund-Growth-Regular Plan{" "}
                          </td>
                          <td className="px-4">25%</td>
                          <td className="px-4">3Y annualised</td>
                        </tr>
                      </table>
                    </div>
                    <div className="col-md-12">
                      <div className="pt-4">
                        <Nav_Chart />
                      </div>
                    </div>
                    <div className="col-md-8 offset-md-2">
                      <div className="nav d-flex justify-content-between">
                        <div className="">
                          <a href="#">1M</a>
                        </div>
                        <div className="">
                          <a href="#">6M</a>
                        </div>
                        <div className="">
                          <a href="#">1Y</a>
                        </div>
                        <div className="">
                          <a href="#">3Y</a>
                        </div>
                        <div className="">
                          <a href="#">5Y</a>
                        </div>
                        <div className="">
                          <a href="#">7Y</a>
                        </div>
                        <div className="">
                          <a href="#">All</a>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-12 py-4">
                      <table>
                        <tr>
                          <td className="px-5 text-label">NAV: 12 Aug-2022</td>
                          <td className="px-5 text-label">Rating</td>
                          <td className="px-5 text-label">Min. SIP amount </td>
                          <td className="px-5 text-label">Fund Size</td>
                        </tr>
                        <tr>
                          <td className="px-5 pt-3">₹134.56</td>
                          <td className="px-5 pt-3">
                            4 <img src={star} alt className="pb-1" />{" "}
                          </td>
                          <td className="px-5 pt-3">₹1000</td>
                          <td className="px-5 pt-3">₹1,911 Cr </td>
                        </tr>
                      </table>
                    </div>
                    <div className="col-md-12 py-4">
                      <button className="btn-custom">Add to Cart</button>
                      <button className="btn-custom float-right">
                        Invest Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* End of Main Content */}
            {/* <!-- Form trigger modal SIP --> */}
            <section className="sip">
              <div className="row">
                <div
                  tabindex="-1"
                  className="modal pmd-modal fade"
                  id="form-dialog-sip"
                  aria-hidden="true"
                >
                  <div className="modal-dialog modal-lg">
                    <div className="modal-content b-r p-3 bg-gray">
                      <div className="modal-header border-0">
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
                            <div className="col-md-5">
                              <div className="form-group pmd-textfield pmd-textfield-floating-label">
                                <label for="select-p" className="text-label">
                                  Select Profile
                                  <span className="text-danger">*</span>
                                </label>
                                <br />
                                <select
                                  name="select-p"
                                  id="select-p"
                                  className="form-control border-0 selectpicker"
                                  data-live-search="true"
                                >
                                  <option value="select">--Select--</option>
                                </select>
                              </div>
                            </div>
                            <div className="col-md-7">
                              <div className="pt-4 mt-3">
                                <input
                                  className=" input-text"
                                  id="equity"
                                  type="radio"
                                  name="asset"
                                  value="Equity"
                                />
                                <label htmlFor="equity" className="">
                                  Existing Scheme
                                </label>
                                <input
                                  className="input-text ml-3"
                                  id="debt"
                                  type="radio"
                                  name="asset"
                                  value="DEBT"
                                />
                                <label htmlFor="debt" className="">
                                  New Scheme
                                </label>
                                <br></br>{" "}
                                <small className="text-danger pull-left"></small>
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-4">
                              <div className="form-group pmd-textfield pmd-textfield-floating-label">
                                <label for="invest" className="text-label">
                                  Select AMC
                                  <span className="text-danger">*</span>
                                </label>
                                <br />
                                <select
                                  name="invest"
                                  id="invest"
                                  className="form-control  selectpicker border-0"
                                  data-live-search="true"
                                >
                                  <option value="select">--Select--</option>
                                </select>
                              </div>
                            </div>
                            <div className="col-md-4">
                              <div className="form-group pmd-textfield pmd-textfield-floating-label">
                                <label for="folio" className="text-label">
                                  Select Folio
                                  <span className="text-danger">*</span>
                                </label>
                                <br />
                                <select
                                  name="folio"
                                  id="folio"
                                  className="form-control  selectpicker border-0"
                                  data-live-search="true"
                                >
                                  <option value="select">--Select--</option>
                                </select>
                              </div>
                            </div>

                            <div className="col-md-4">
                              <div className="form-group pmd-textfield pmd-textfield-floating-label">
                                <label for="Scheme" className="text-label">
                                  Select Scheme
                                  <span className="text-danger">*</span>
                                </label>
                                <br />
                                <select
                                  name="Scheme"
                                  id="Scheme"
                                  className="form-control  selectpicker border-0"
                                  data-live-search="true"
                                >
                                  <option value="select">--Select--</option>
                                </select>
                              </div>
                            </div>
                          </div>

                          <div className="row">
                            <div className="col-md-4">
                              <div className="form-group pmd-textfield pmd-textfield-floating-label">
                                <label
                                  className="control-label lb text-label"
                                  for="amount"
                                >
                                  Enter Amount
                                  <span className="text-danger">*</span>
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  name="amount"
                                  placeholder="Enter Amount"
                                />
                              </div>
                            </div>
                            <div className="col-md-4">
                              <div className="form-group pmd-textfield pmd-textfield-floating-label">
                                <label for="sipdate" className="lb  text-label">
                                  SIP Date<span className="text-danger">*</span>
                                </label>
                                <br />
                                <select
                                  name="sipdate"
                                  id="sipdate"
                                  className="form-control selectpicker  border-0"
                                  data-live-search="true"
                                >
                                  <option value="select">--Select--</option>
                                </select>
                              </div>
                            </div>

                            <div className="col-md-4">
                              <div className="form-group pmd-textfield pmd-textfield-floating-label">
                                <label
                                  className="control-label lb text-label"
                                  for="sipf"
                                >
                                  SIP From<span className="text-danger">*</span>
                                </label>
                                {/* <input type="date" className="form-control" name='sipf' placeholder='Enter value' /> */}

                                <DatePickerComponent
                                  format="MMM-yyyy"
                                  className="form-control"
                                  placeholder="MM-YYYY"
                                  start="Year"
                                  depth="Year"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-4">
                              <div className="form-group pmd-textfield pmd-textfield-floating-label">
                                <label
                                  className="control-label lb text-label"
                                  for="sipend"
                                >
                                  SIP To<span className="text-danger">*</span>
                                </label>
                                {/* <input type="date" className="form-control" name='sipend' placeholder='Enter value' /> */}
                                <DatePickerComponent
                                  format="MMM-yyyy"
                                  className="form-control"
                                  placeholder="MM-YYYY"
                                  start="Year"
                                  depth="Year"
                                />
                              </div>
                            </div>
                            <div className="col-md-3 ">
                              <input
                                className="input-text mt-5"
                                id="perpetual"
                                type="checkbox"
                                name="perpetual"
                                value="Y"
                                defaultChecked
                              />
                              <input
                                type="hidden"
                                id="perpetual_val"
                                name="perpetual_val"
                              />
                              <label htmlFor="perpetual" className="ml-2">
                                Perpetual <spna className="text-danger">*</spna>
                              </label>
                            </div>
                          </div>
                          <div className="col-md-12 ">
                            <a
                              href="javascript:void(0)"
                              className="btn btn-danger float-right my-4"
                            >
                              + Add
                            </a>
                          </div>
                          <div className="col-md-12 " id="tbt">
                            <table className="table bg-white mt-5 mb-3">
                              <tr>
                                <th>Profile</th>
                                <th>Scheme Name</th>
                                <th>Folio Number</th>
                                <th>SIP From</th>
                                <th>SIP To</th>
                                <th>Amount</th>
                                <th></th>
                              </tr>
                              <tr>
                                <td>Profile</td>
                                <td>Scheme Name</td>
                                <td>Folio Number</td>
                                <td>20/10/2021</td>
                                <td>20/11/2021</td>
                                <td>3500</td>
                                <td>
                                  {" "}
                                  <a href="javascript:void(0)">
                                    <FaTrash className="red" />
                                  </a>
                                </td>
                              </tr>
                            </table>
                            <div className="row">
                              <div className="col-md-5">
                                <div className="form-group pmd-textfield pmd-textfield-floating-label">
                                  <label
                                    for="mandate"
                                    className="lb text-label"
                                  >
                                    Select Mandate
                                    <span className="text-danger">*</span>
                                  </label>
                                  <br />
                                  <select
                                    name="mandate"
                                    id="mandate"
                                    className="form-control selectpicker  border-0"
                                    data-live-search="true"
                                  >
                                    <option value="select">--Select--</option>
                                  </select>
                                </div>
                                <a href="!#" className="red fs-13">
                                  Create Mandate
                                </a>
                              </div>
                            </div>
                          </div>
                        </form>
                      </div>
                      <div className="modal-footer border-0">
                        <button
                          data-dismiss="modal"
                          className="new-btn1"
                          type="button"
                        >
                          Order Now
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            {/* <!--End Form trigger modal SIP --> */}
            {/* <!-- Form trigger modal new Purchase --> */}
            <section className="new-purchase">
              <div className="row">
                <div
                  tabindex="-1"
                  className="modal pmd-modal fade"
                  id="form-dialog-new-purchase"
                  aria-hidden="true"
                >
                  <div className="modal-dialog modal-lg">
                    <div className="modal-content b-r p-3 bg-gray">
                      <div className="modal-header border-0">
                        {/* <div className="quick-access-title">
                                  <h3>New Purchase</h3>
                                </div> */}
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
                            <div className="col-md-6">
                              <div className="form-group pmd-textfield pmd-textfield-floating-label">
                                <label
                                  for="select-profile"
                                  className="text-label"
                                >
                                  Select Profile
                                  <span className="text-danger">*</span>
                                </label>
                                <br />
                                <select
                                  name="select-profile"
                                  id="select-profile"
                                  className="form-control border-0 selectpicker"
                                  data-live-search="true"
                                >
                                  <option value="select">--Select--</option>
                                </select>
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-group pmd-textfield pmd-textfield-floating-label">
                                <label for="invest" className="text-label">
                                  Select AMC
                                  <span className="text-danger">*</span>
                                </label>
                                <br />
                                <select
                                  name="invest"
                                  id="invest"
                                  className="form-control  selectpicker border-0"
                                  data-live-search="true"
                                >
                                  <option value="select">--Select--</option>
                                </select>
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-6">
                              <p className=" mb-1 mt-1 p-radio lb text-label ml-3">
                                Option <spna className="text-danger">*</spna>
                              </p>
                              <div className="pt-2">
                                <input
                                  className=" input-text ml-3"
                                  id="growth"
                                  type="radio"
                                  name="growth"
                                  value="GROWTH"
                                />
                                <label htmlFor="growth" className="">
                                  Growth
                                </label>
                                <input
                                  className="input-text ml-3"
                                  id="dividend"
                                  type="radio"
                                  name="growth"
                                  value="Dividend"
                                />
                                <label htmlFor="dividend" className="">
                                  IDCW{" "}
                                </label>
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-group pmd-textfield pmd-textfield-floating-label">
                                <label
                                  for="select-scheme"
                                  className="lb text-label"
                                >
                                  Select Scheme
                                  <span className="text-danger">*</span>
                                </label>
                                <br />
                                <select
                                  name="select-scheme"
                                  id="select-scheme"
                                  className="form-control border-0 selectpicker"
                                  data-live-search="true"
                                >
                                  <option value="select">--Select--</option>
                                </select>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group pmd-textfield pmd-textfield-floating-label">
                              <label
                                className="control-label lb text-label"
                                for="amount"
                              >
                                Enter Amount
                                <span className="text-danger">*</span>
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                name="amount"
                                placeholder="Enter Amount"
                              />
                            </div>
                          </div>
                          <div className="col-md-12 ">
                            <a
                              href="javascript:void(0)"
                              className="btn btn-danger float-right my-4"
                            >
                              + Add
                            </a>
                          </div>
                          <div className="col-md-12 " id="tbt">
                            <table className="table bg-white mt-5 mb-3">
                              <tr>
                                <th>Profile</th>
                                <th>Scheme Name</th>
                                <th>Folio Number</th>
                                <th>Amount</th>
                                <th></th>
                              </tr>
                              <tr>
                                <td>Profile</td>
                                <td>Scheme Name</td>
                                <td>Folio Number</td>
                                <td>3500</td>
                                <td>
                                  {" "}
                                  <a href="javascript:void(0)">
                                    <FaTrash className="red" />
                                  </a>
                                </td>
                              </tr>
                            </table>
                            <div className="row">
                              <div className="col-md-5">
                                <div className="form-group pmd-textfield pmd-textfield-floating-label">
                                  <label
                                    htmlFor="payment_mode"
                                    className="text-label"
                                  >
                                    Select Payment Mode{" "}
                                    <spna className="text-danger">*</spna>
                                  </label>
                                  <br />
                                  <select
                                    name="payment_mode"
                                    id="payment_mode"
                                    className="form-control border-0 selectpicker"
                                    data-live-search="true"
                                  >
                                    <option value="OL">Net Banking</option>
                                    <option value="UPI">UPI</option>
                                    <option value="TR">RTGS/NEFT</option>
                                    <option value="M">Debit Mandate</option>
                                  </select>
                                </div>
                              </div>
                              <div className="col-md-7">
                                <div className="pt-4 mt-3">
                                  <input
                                    className=" input-text"
                                    id="emailLink"
                                    type="radio"
                                    name="payType"
                                    value="N"
                                  />
                                  <label htmlFor="emailLink" className="">
                                    Link On Email
                                  </label>
                                  <input
                                    className="input-text ml-3"
                                    id="immediatePay"
                                    type="radio"
                                    name="payType"
                                    value="Y"
                                  />
                                  <label htmlFor="immediatePay" className="">
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
                                    <span className="text-danger">*</span>
                                  </label>
                                  <br />
                                  <select
                                    name="select-bank"
                                    id="select-bank"
                                    className="form-control border-0 selectpicker"
                                    data-live-search="true"
                                  >
                                    <option value="select">--Select--</option>
                                  </select>
                                </div>
                              </div>
                            </div>
                          </div>
                        </form>
                      </div>
                      <div className="modal-footer border-0">
                        <button
                          data-dismiss="modal"
                          className="new-btn1"
                          type="submit"
                        >
                          Order Now
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            {/* <!-- End Form trigger modal new Purchase --> */}
            {/*Purchase Modal lumpsum */}
            <div
              className="modal fade"
              id="lumpsum"
              tabIndex={-1}
              role="dialog"
              aria-labelledby="sipTitle"
              aria-hidden="true"
            >
              <div
                className="modal-dialog modal-dialog-centered"
                role="document"
              >
                <div className="modal-content bg-light-red">
                  <div id="cart">
                    <div className="modal-header">
                      <h5 className="modal-title text-dark" id="sipTitle">
                        My Cart
                      </h5>
                      <button
                        type="button"
                        className="close"
                        data-dismiss="modal"
                        aria-label="Close"
                      >
                        <span aria-hidden="true">×</span>
                      </button>
                    </div>
                    <div className="modal-body">
                      <h6 className="text-black fs-16">Schemes Name</h6>
                      <div class="col-md-12">
                        <div className=" row shadowcart mb-2 p-3">
                          <div className="col-md-2">
                            <img src={idfc} alt="" className="img-fluid" />
                          </div>
                          <div className="col-md-9">
                            <a href="!#"> </a>{" "}
                          </div>
                          <div className="col-md-1 pt-2">
                            <FaTrash />
                          </div>
                        </div>

                        <div className=" row shadowcart mb-2 p-3">
                          <div className="col-md-2">
                            <img src={sunderam} alt="" className="img-fluid" />
                          </div>
                          <div className="col-md-9">
                            <a href="!#">
                              Sundaram Tax Savings Fund (Formerly Principal Tax
                              Savings Fund)- Regular Growth{" "}
                            </a>{" "}
                          </div>
                          <div className="col-md-1 pt-3">
                            <FaTrash />
                          </div>
                        </div>
                        <div className=" row shadowcart mb-2 p-3">
                          <div className="col-md-2">
                            <img src={sunderam} alt="" className="img-fluid" />
                          </div>
                          <div className="col-md-9">
                            <a href="!#">
                              Sundaram Tax Savings Fund (Formerly Principal Tax
                              Savings Fund)- Regular Growth{" "}
                            </a>{" "}
                          </div>
                          <div className="col-md-1 pt-3">
                            <FaTrash />
                          </div>
                        </div>
                        <div className=" row shadowcart mb-2 p-3">
                          <div className="col-md-2">
                            <img src={sbi} alt="" className="img-fluid" />
                          </div>
                          <div className="col-md-9">
                            <a href="!#">
                              SBI Long Term Equity Fund-Regular Plan-Growth{" "}
                            </a>
                          </div>
                          <div className="col-md-1 pt-2">
                            <FaTrash />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="modal-footer border-0">
                      <a
                        type="button"
                        className="btn btn-danger shadow-sm"
                        href="javascript:void(0);"
                        onClick={this.hide1}
                      >
                        Continue
                      </a>
                    </div>
                  </div>
                  {/* form  */}
                  <div id="formhide">
                    <div className="modal-header">
                      <h5 className="modal-title text-black" id="sipTitle">
                        Investment Details
                      </h5>
                      <button
                        type="button"
                        className="close"
                        data-dismiss="modal"
                        aria-label="Close"
                      >
                        <span aria-hidden="true">×</span>
                      </button>
                    </div>
                    <div className="modal-body ">
                      <form>
                        <div className="col mb-3 ">
                          <label htmlFor="Profile" className="text-label">
                            Select Profile{" "}
                            <span className="text-danger">*</span>
                          </label>
                          <Select className="bg-c" options={profile} />
                        </div>
                      </form>
                      <div className="cartitemwith">
                        <div className="row p-4">
                          <div className="col-md-12  red ">
                            SBI Long Term Equity Fund-Regular Plan-Growth{" "}
                          </div>
                        </div>

                        <div className="col bg-white py-3 px-4">
                          <label htmlFor="Profile" className="fs-14">
                            Select Folio <span className="text-danger">*</span>
                          </label>
                          <Select className="border-pop" options={folio} />
                        </div>
                        <div className="col mb-3 bg-white pb-4 px-4 lastin">
                          <label htmlFor="amount" className="fs-14">
                            Enter Amount <span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            className="form-control border-pop "
                            name="amount"
                            placeholder="Enter Amount"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="modal-footer border-0">
                      <a
                        type="button"
                        className="btn btn-danger shadow-sm"
                        href="javascript:void(0);"
                        onClick={this.hide2}
                      >
                        Continue
                      </a>
                    </div>
                  </div>
                  <div id="confirm">
                    <div className="modal-header">
                      <h5 className="modal-title text-black" id="sipTitle">
                        Confirm Purchase
                      </h5>
                      <button
                        type="button"
                        className="close"
                        data-dismiss="modal"
                        aria-label="Close"
                      >
                        <span aria-hidden="true">×</span>
                      </button>
                    </div>
                    <div className="modal-body ">
                      <div className="col mb-3 border-bottom">
                        <h6 className="red">Shivam Shrivastav</h6>
                        <p>
                          Mode of Holding : Single{" "}
                          <a href="#" className="p-4 ml-5">
                            Edit
                          </a>
                        </p>
                      </div>

                      <p className="red">
                        Axis Long Term Equity Fund-Regular-Growth
                      </p>

                      <table className="mx-auto">
                        <tr className="text-center">
                          <td className="pr-4">Folio </td>:
                          <td className="pl-4">124564</td>
                        </tr>
                        <tr className="text-center">
                          <td className="pr-4">Amount </td>:
                          <td className="pl-4">50,000</td>
                        </tr>
                      </table>

                      <p className="text-center pt-5">
                        <b>Total : 55,55882</b>
                      </p>
                    </div>
                    <div className="modal-footer border-0">
                      <a
                        type="button"
                        className="btn btn-danger shadow-sm"
                        href="javascript:void(0);"
                        onClick={this.hide3}
                      >
                        Continue
                      </a>
                    </div>
                  </div>
                  <div id="purchase">
                    <div className="modal-header">
                      <h5 className="modal-title text-black" id="sipTitle">
                        {" "}
                        Purchase
                      </h5>
                      <button
                        type="button"
                        className="close"
                        data-dismiss="modal"
                        aria-label="Close"
                      >
                        <span aria-hidden="true">×</span>
                      </button>
                    </div>
                    <div className="modal-body ">
                      <form>
                        <p className="red">Investment Total : 5000.00</p>
                        <div className="col mb-3 ">
                          <label htmlFor="Profile" className="text-label">
                            Select Payment Mode{" "}
                            <span className="text-danger">*</span>
                          </label>
                          <Select className="bg-c" options={profile} />
                        </div>
                        <div className="col mb-3 ">
                          <label htmlFor="Profile" className="text-label">
                            Select Bank <span className="text-danger">*</span>
                          </label>
                          <Select className="bg-c" options={profile} />
                        </div>
                        <div className="pt-4 mt-3">
                          <input
                            className=" input-text"
                            id="emailLink"
                            type="radio"
                            name="payType"
                            value="N"
                          />
                          <label htmlFor="emailLink" className="">
                            Link On Email
                          </label>
                          <input
                            className="input-text ml-3"
                            id="immediatePay"
                            type="radio"
                            name="payType"
                            value="Y"
                          />
                          <label htmlFor="immediatePay" className="">
                            Immediate Payment
                          </label>
                        </div>
                      </form>
                    </div>
                    <div className="modal-footer border-0">
                      <a
                        type="button"
                        className="btn btn-danger shadow-sm"
                        href="javascript:void(0);"
                      >
                        Order
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* sip */}
            <div
              className="modal fade"
              id="sip"
              tabIndex={-1}
              role="dialog"
              aria-labelledby="sipTitle"
              aria-hidden="true"
            >
              <div
                className="modal-dialog modal-dialog-centered"
                role="document"
              >
                <div className="modal-content bg-light-red">
                  <div id="carts">
                    <div className="modal-header">
                      <h5 className="modal-title text-dark" id="sipTitle">
                        My Cart
                      </h5>
                      <button
                        type="button"
                        className="close"
                        data-dismiss="modal"
                        aria-label="Close"
                      >
                        <span aria-hidden="true">×</span>
                      </button>
                    </div>
                    <div className="modal-body">
                      <h6 className="text-black fs-16">Schemes Name</h6>
                      <div class="col-md-12">
                        <div className=" row shadowcart mb-2 p-3">
                          <div className="col-md-2">
                            <img src={idfc} alt="" className="img-fluid" />
                          </div>
                          <div className="col-md-9">
                            <a href="!#">
                              IDFC Tax Advantage (ELSS) Fund-Growth-Regular Plan{" "}
                            </a>{" "}
                          </div>
                          <div className="col-md-1 pt-2">
                            <FaTrash />
                          </div>
                        </div>
                        <div className=" row shadowcart mb-2 p-3">
                          <div className="col-md-2">
                            <img src={sunderam} alt="" className="img-fluid" />
                          </div>
                          <div className="col-md-9">
                            <a href="!#">
                              Sundaram Tax Savings Fund (Formerly Principal Tax
                              Savings Fund)- Regular Growth{" "}
                            </a>{" "}
                          </div>
                          <div className="col-md-1 pt-3">
                            <FaTrash />
                          </div>
                        </div>
                        <div className=" row shadowcart mb-2 p-3">
                          <div className="col-md-2">
                            <img src={sunderam} alt="" className="img-fluid" />
                          </div>
                          <div className="col-md-9">
                            <a href="!#">
                              Sundaram Tax Savings Fund (Formerly Principal Tax
                              Savings Fund)- Regular Growth{" "}
                            </a>{" "}
                          </div>
                          <div className="col-md-1 pt-3">
                            <FaTrash />
                          </div>
                        </div>
                        <div className=" row shadowcart mb-2 p-3">
                          <div className="col-md-2">
                            <img src={sbi} alt="" className="img-fluid" />
                          </div>
                          <div className="col-md-9">
                            <a href="!#">
                              SBI Long Term Equity Fund-Regular Plan-Growth{" "}
                            </a>
                          </div>
                          <div className="col-md-1 pt-2">
                            <FaTrash />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="modal-footer border-0">
                      <a
                        type="button"
                        className="btn btn-danger shadow-sm"
                        href="javascript:void(0);"
                        onClick={this.hides1}
                      >
                        Continue
                      </a>
                    </div>
                  </div>
                  {/* form  */}
                  <div id="formf">
                    <div className="modal-header">
                      <h5 className="modal-title text-black" id="sipTitle">
                        SIP
                      </h5>
                      <button
                        type="button"
                        className="close"
                        data-dismiss="modal"
                        aria-label="Close"
                      >
                        <span aria-hidden="true">×</span>
                      </button>
                    </div>
                    <div className="modal-body ">
                      <form>
                        <div className="col mb-3 ">
                          <label htmlFor="Profile" className="text-label">
                            Select Profile{" "}
                            <span className="text-danger">*</span>
                          </label>
                          <Select
                            className="bg-c"
                            onChange={this.userProfile}
                            options={profile}
                          />
                        </div>
                        <div className="col mb-3 ">
                          <label htmlFor="Profile" className="text-label">
                            Select Mandate{" "}
                            <span className="text-danger">*</span>
                          </label>
                          <Select className="bg-c" options={profile} />
                        </div>
                        <a href="!#" className="red fs-13">
                          Create Mandate
                        </a>
                      </form>
                    </div>
                    <div className="modal-footer border-0">
                      <a
                        type="button"
                        className="btn btn-danger shadow-sm"
                        href="javascript:void(0);"
                        onClick={this.hides4}
                      >
                        Continue
                      </a>
                    </div>
                  </div>
                  <div id="formhides">
                    <div className="modal-header">
                      <h5 className="modal-title text-black" id="sipTitle">
                        SIP Cart
                      </h5>
                      <button
                        type="button"
                        className="close"
                        data-dismiss="modal"
                        aria-label="Close"
                      >
                        <span aria-hidden="true">×</span>
                      </button>
                    </div>
                    <div className="modal-body ">
                      <div className="cartitemwith">
                        <div className="row p-4">
                          <div className="col-md-12  red ">
                            SBI Long Term Equity Fund-Regular Plan-Growth{" "}
                          </div>
                        </div>

                        <div className="col bg-white py-3 px-4">
                          <label htmlFor="Profile" className="fs-14">
                            Select Folio <span className="text-danger">*</span>
                          </label>
                          <Select className="border-pop" options={folio} />
                        </div>
                        <div className="col  bg-white pb-1 px-4">
                          <label htmlFor="amount" className="fs-14">
                            Enter Amount <span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            className="form-control amount-b"
                            name="amount"
                            placeholder="Enter Amount"
                          />
                        </div>
                        <div className="col bg-white py-3 px-4">
                          <label htmlFor="date" className="fs-14">
                            Select Date <span className="text-danger">*</span>
                          </label>
                          <Select className="border-pop" options={date} />
                        </div>
                        <div className="col bg-white py-3 px-4">
                          <label htmlFor="date" className="fs-14">
                            Select Period <span className="text-danger">*</span>
                          </label>
                          <Select
                            className="border-pop"
                            options={selectperiod}
                          />
                        </div>

                        <div className="col mb-2 lastin">
                          <input
                            className="input-text p-2"
                            id="perpetual"
                            type="checkbox"
                            name="perpetual"
                            value="Y"
                            defaultChecked
                          />
                          <input
                            type="hidden"
                            id="perpetual_val"
                            name="perpetual_val"
                          />
                          <label htmlFor="perpetual" className="ml-2">
                            Perpetual <spna className="text-danger">*</spna>
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="modal-footer border-0">
                      <a
                        type="button"
                        className="btn btn-danger shadow-sm"
                        href="javascript:void(0);"
                        onClick={this.hides2}
                      >
                        Continue
                      </a>
                    </div>
                  </div>
                  <div id="confirms">
                    <div className="modal-header">
                      <h5 className="modal-title text-black" id="sipTitle">
                        SIP Confirmation Purchase
                      </h5>
                      <button
                        type="button"
                        className="close"
                        data-dismiss="modal"
                        aria-label="Close"
                      >
                        <span aria-hidden="true">×</span>
                      </button>
                    </div>
                    <div className="modal-body ">
                      <div className="col mb-3 border-bottom">
                        <h6 className="red">Shivam Shrivastav</h6>
                        <p>
                          Mode of Holding : Single{" "}
                          <a href="#" className="p-4 ml-5">
                            Edit
                          </a>
                        </p>
                      </div>

                      <p className="red">
                        Axis Long Term Equity Fund-Regular-Growth
                      </p>

                      <table className="mx-auto">
                        <tr className="text-center">
                          <td className="pr-4">Folio </td>:
                          <td className="pl-4">124564</td>
                        </tr>
                        <tr className="text-center">
                          <td className="pr-4">Amount </td>:
                          <td className="pl-4">50,000</td>
                        </tr>
                        <tr className="text-center">
                          <td className="pr-4">SIP From </td>:
                          <td className="pl-4">11-sep-2022</td>
                        </tr>
                        <tr className="text-center">
                          <td className="pr-4">SIP To </td>:
                          <td className="pl-4">31-dec-2099</td>
                        </tr>
                        <tr className="text-center">
                          <td className="pr-4">SIP Date </td>:
                          <td className="pl-4">11</td>
                        </tr>
                      </table>

                      <p className="text-center pt-5">
                        <b>Total : 55,55882</b>
                      </p>
                    </div>
                    <div className="modal-footer border-0">
                      <a
                        type="button"
                        className="btn btn-danger shadow-sm"
                        href="javascript:void(0);"
                        onClick={this.hides3}
                      >
                        Order
                      </a>
                    </div>
                  </div>
                  {/* <div id='purchases'>
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
            </div> */}
                </div>
              </div>
            </div>
            {/* Footer */}
            <Footer />
            {/* End of Footer */}
          </div>
          {/* End of Content Wrapper */}
        </div>
        {/* End of Page Wrapper */}
      </>
    );
  }
}
export default Tax_Planning;
