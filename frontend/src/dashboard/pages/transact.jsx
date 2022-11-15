import React from "react";
import Header from "./header";
import Footer from "./footer";
import { Helmet } from "react-helmet";
import Axios from "axios";
import "animate.css";
import $ from "jquery";
import New_purchase from "../../assets/images/icons/New folder (2)/new_puchase.png";
import Additional_puchase from "../../assets/images/icons/New folder (2)/add_puchase.png";
import switch1 from "../../assets/images/icons/New folder (2)/switch.png";
import sip from "../../assets/images/icons/New folder (2)/bar_chart.png";
import stp from "../../assets/images/icons/New folder (2)/STP.png";
import swp from "../../assets/images/icons/New folder (2)/withdraw.png";
import redemption from "../../assets/images/icons/New folder (2)/redemption.png";
import { FaTrash } from "react-icons/fa";
import { DatePickerComponent } from "@syncfusion/ej2-react-calendars";
//importing context
import UserContext from "../../contexts/userContext";

class Transact extends React.Component {
  // hide = () => {};
  constructor(props) {
    super(props);
    this.state = {
      userListFetched: [],
    };
  }

  static contextType = UserContext;

  componentDidMount() {
    const { setUserProfile } = this.context;

    const userData = JSON.parse(localStorage.getItem("loginUserData"));

    const data = {
      email: userData.email,
      token: userData.token,
    };

    if (this.context.userProfile.length == 0) {
      Axios.post("http://localhost:5010/api/User_profile", data).then((res) => {
        // console.log("userData", res.data.data.data)
        this.setState({ userListFetched: res.data.data.data });
        setUserProfile(res.data.data.data);
      });
    } else {
      this.setState({ userListFetched: this.context.userProfile });
    }
  }

  render() {
    console.log("userListFetched ", this.state.userListFetched);

    return (
      <>
        <Helmet>
          <title>Transact - Prodigy Pro</title>
        </Helmet>
        <style>
          {`
 
 .modal-dialog
 {
  padding-bottom:3em;
 }
 .modal-content
 {
    background-color:#F0F2FF;
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
 .tp
 {
  border-radius: 15px;
padding: 3em 2em;
background: #faf1f2;
  }
//  .form-group {
//   margin-bottom: 0.5rem;
// }


 
         
          `}
        </style>

        {/* Page Wrapper */}
        <div id="wrapper">
          {/* <div id="overlay" >
            <div className="spinner"></div>
            <br />Loading...
          </div>          */}

          {/* Content Wrapper */}
          <div id="content-wrapper" className="d-flex flex-column">
            {/* Main Content */}
            <div id="content">
              {/* Topbar */}
              <Header />
              {/* End of Topbar */}
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <a href="home">Home</a>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Transact
                  </li>
                </ol>
              </nav>
              <div className="container-fluid px-5 pb-5 transact">
                <div className="row px-5">
                  <div className="col-md-12">
                    <div className="container border tp">
                      <div className="row">
                        <div className="col-md-3">
                          <div
                            className=" transactcard  py-5 mx-3  roundedc"
                            style={{ marginTop: "4rem" }}
                          >
                            <a
                              className=" bg-white transact-link"
                              data-target="#form-dialog-sip"
                              data-toggle="modal"
                              type="button"
                            >
                              <div className="goal-card text-center">
                                <img
                                  src={sip}
                                  className="mr-2 new-icon  p-3"
                                  alt=""
                                />
                                <br />
                                <h4 className="pt-4">SIP</h4>
                              </div>
                            </a>
                          </div>
                        </div>
                        <div className="col-md-9">
                          <div className="row">
                            <div className="col-md-4 ">
                              <div className="transactcard py-3 mx-3 roundedc">
                                <a
                                  className=" bg-white transact-link"
                                  data-target="#form-dialog-new-purchase"
                                  data-toggle="modal"
                                  type="button"
                                >
                                  <div className="goal-card text-center">
                                    <img
                                      src={New_purchase}
                                      className="mr-2 new-icon p-3"
                                      alt=""
                                    />
                                    <br />
                                    <h4 className="pt-4">New Purchase</h4>
                                  </div>
                                </a>
                              </div>
                            </div>
                            <div className="col-md-4">
                              <div className="transactcard py-3 mx-3 roundedc">
                                <a
                                  className=" bg-white transact-link"
                                  data-target="#form-dialog-additional-purchase"
                                  data-toggle="modal"
                                  type="button"
                                >
                                  <div className="goal-card text-center">
                                    <img
                                      src={Additional_puchase}
                                      className="mr-2 new-icon  p-3"
                                      alt=""
                                    />
                                    <br />
                                    <h4 className="pt-4">
                                      Additional Purchase
                                    </h4>
                                  </div>
                                </a>
                              </div>
                            </div>
                            <div className="col-md-4">
                              <div className=" transactcard py-3 mx-3 roundedc">
                                <a
                                  className=" bg-white transact-link"
                                  data-target="#form-dialog-switch"
                                  data-toggle="modal"
                                  type="button"
                                >
                                  <div className="goal-card text-center">
                                    <img
                                      src={switch1}
                                      className="mr-2 new-icon  p-3"
                                      alt=""
                                    />
                                    <br />
                                    <h4 className="pt-4">Switch</h4>
                                  </div>
                                </a>
                              </div>
                            </div>
                            <div className="col-md-4 pt-4">
                              <div className="transactcard py-3 mx-3 roundedc">
                                <a
                                  className=" bg-white transact-link"
                                  data-target="#form-dialog-stp"
                                  data-toggle="modal"
                                  type="button"
                                >
                                  <div className="goal-card text-center">
                                    <img
                                      src={stp}
                                      className="mr-2 new-icon  p-3"
                                      alt=""
                                    />
                                    <br />
                                    <h4 className="pt-4">STP</h4>
                                  </div>
                                </a>
                              </div>
                            </div>
                            <div className="col-md-4 pt-4">
                              <div className="transactcard py-3 mx-3 roundedc">
                                <a
                                  className=" bg-white transact-link"
                                  data-target="#form-dialog-swp"
                                  data-toggle="modal"
                                  type="button"
                                >
                                  <div className="goal-card text-center">
                                    <img
                                      src={swp}
                                      className="mr-2 new-icon  p-3"
                                      alt=""
                                    />
                                    <br />
                                    <h4 className="pt-4">SWP</h4>
                                  </div>
                                </a>
                              </div>
                            </div>
                            <div className="col-md-4 pt-4">
                              <div className="transactcard py-3 mx-3 roundedc">
                                <a
                                  className=" bg-white transact-link"
                                  data-target="#form-dialog-redemption"
                                  data-toggle="modal"
                                  type="button"
                                >
                                  <div className="goal-card text-center">
                                    <img
                                      src={redemption}
                                      className="mr-2 new-icon  p-3"
                                      alt=""
                                    />
                                    <br />
                                    <h4 className="pt-4">Redemption</h4>
                                  </div>
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
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
                            <div className="modal-content b-r p-3">
                              <div className="modal-header border-0">
                                <div className="quick-access-title">
                                  <h3>New Purchase</h3>
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
                                          <option
                                            value={this.state.userListFetched}
                                          >
                                            --Select--
                                          </option>
                                        </select>
                                      </div>
                                    </div>
                                    <div className="col-md-4">
                                      <div className="form-group pmd-textfield pmd-textfield-floating-label">
                                        <label
                                          for="invest"
                                          className="text-label"
                                        >
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
                                          <option value="select">
                                            --Select--
                                          </option>
                                        </select>
                                      </div>
                                    </div>
                                    <div className="col-md-4">
                                      <p className="text-label mb-1 mt-1 p-radio lb">
                                        Asset Class{" "}
                                        <spna className="text-danger">*</spna>
                                      </p>
                                      <div className="pt-2">
                                        <input
                                          className=" input-text"
                                          id="equity"
                                          type="radio"
                                          name="asset"
                                          value="Equity"
                                        />
                                        <label htmlFor="equity" className="">
                                          Equity
                                        </label>
                                        <input
                                          className="input-text ml-3"
                                          id="debt"
                                          type="radio"
                                          name="asset"
                                          value="DEBT"
                                        />
                                        <label htmlFor="debt" className="">
                                          Debt
                                        </label>
                                        <br></br>{" "}
                                        <small className="text-danger pull-left"></small>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="row">
                                    <div className="col-md-4">
                                      <p className=" mb-1 mt-1 p-radio lb text-label">
                                        Option{" "}
                                        <spna className="text-danger">*</spna>
                                      </p>
                                      <div className="pt-2">
                                        <input
                                          className=" input-text"
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
                                    <div className="col-md-4">
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
                                          <option value="select">
                                            --Select--
                                          </option>
                                        </select>
                                      </div>
                                    </div>
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
                                            <spna className="text-danger">
                                              *
                                            </spna>
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
                                        <div className="pt-4 mt-3">
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

                    {/* <!-- Form trigger modal additional Purchase --> */}
                    <section className="additional-purchase">
                      <div className="row">
                        <div
                          tabindex="-1"
                          className="modal pmd-modal fade"
                          id="form-dialog-additional-purchase"
                          aria-hidden="true"
                        >
                          <div className="modal-dialog modal-lg">
                            <div className="modal-content b-r p-3">
                              <div className="modal-header border-0">
                                <div className="quick-access-title">
                                  <h3>Additional Purchase</h3>
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
                                    <div className="col-md-5">
                                      <div className="form-group pmd-textfield pmd-textfield-floating-label">
                                        <label
                                          for="select-p"
                                          className="text-label"
                                        >
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
                                          <option value="select">
                                            --Select--
                                          </option>
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
                                    <div className="col-md-5">
                                      <div className="form-group pmd-textfield pmd-textfield-floating-label">
                                        <label
                                          for="invest"
                                          className="lb  text-label"
                                        >
                                          Select AMC
                                          <span className="text-danger">*</span>
                                        </label>
                                        <br />
                                        <select
                                          name="invest"
                                          id="invest"
                                          className="form-control selectpicker  border-0"
                                          data-live-search="true"
                                        >
                                          <option value="select">
                                            --Select--
                                          </option>
                                          <option value="s1">Amc</option>
                                        </select>
                                      </div>
                                    </div>

                                    <div className="col-md-3">
                                      <p className="text-label mb-1 mt-1 p-radio lb">
                                        Asset Class{" "}
                                        <spna className="text-danger">*</spna>
                                      </p>
                                      <div className="pt-2">
                                        <input
                                          className=" input-text"
                                          id="equity"
                                          type="radio"
                                          name="asset"
                                          value="Equity"
                                        />
                                        <label htmlFor="equity" className="">
                                          Equity
                                        </label>
                                        <input
                                          className="input-text ml-3"
                                          id="debt"
                                          type="radio"
                                          name="asset"
                                          value="DEBT"
                                        />
                                        <label htmlFor="debt" className="">
                                          Debt
                                        </label>
                                        <br></br>{" "}
                                        <small className="text-danger pull-left"></small>
                                      </div>
                                    </div>
                                    <div className="col-md-3">
                                      <p className="text-label mb-1 mt-1 p-radio lb">
                                        Option{" "}
                                        <spna className="text-danger">*</spna>
                                      </p>
                                      <div className="pt-2">
                                        <input
                                          className=" input-text"
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
                                  </div>
                                  <div className="row">
                                    <div className="col-md-4">
                                      <div className="form-group pmd-textfield pmd-textfield-floating-label">
                                        <label
                                          for="folio"
                                          className="lb text-label"
                                        >
                                          Select Folio
                                          <span className="text-danger">*</span>
                                        </label>
                                        <br />
                                        <select
                                          name="folio"
                                          id="folio"
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
                                          for="sip-t"
                                          className="lb text-label"
                                        >
                                          Select Scheme
                                          <span className="text-danger">*</span>
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
                                            <spna className="text-danger">
                                              *
                                            </spna>
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
                                        <div className="pt-4 mt-3">
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
                    {/* <!--End Form trigger modal additional Purchase --> */}

                    {/* <!-- Form trigger modal Switch --> */}
                    <section className="switch">
                      <div className="row">
                        <div
                          tabindex="-1"
                          className="modal pmd-modal fade"
                          id="form-dialog-switch"
                          aria-hidden="true"
                        >
                          <div className="modal-dialog modal-lg">
                            <div className="modal-content b-r p-3">
                              <div className="modal-header border-0">
                                <div className="quick-access-title">
                                  <h3>Switch</h3>
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
                                          for="select-p"
                                          className="text-label"
                                        >
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
                                          <option value="select">
                                            --Select--
                                          </option>
                                        </select>
                                      </div>
                                    </div>
                                    <div className="col-md-4">
                                      <div className="form-group pmd-textfield pmd-textfield-floating-label">
                                        <label
                                          for="invest"
                                          className="text-label"
                                        >
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
                                          <option value="select">
                                            --Select--
                                          </option>
                                        </select>
                                      </div>
                                    </div>
                                    <div className="col-md-4">
                                      <div className="form-group pmd-textfield pmd-textfield-floating-label">
                                        <label
                                          for="folio"
                                          className="text-label"
                                        >
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
                                          <option value="select">
                                            --Select--
                                          </option>
                                        </select>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="row">
                                    <div className="col-md-5">
                                      <div className="form-group pmd-textfield pmd-textfield-floating-label">
                                        <label
                                          for="source"
                                          className="text-label"
                                        >
                                          Select Source Scheme
                                          <span className="text-danger">*</span>
                                        </label>
                                        <br />
                                        <select
                                          name="source"
                                          id="source"
                                          className="form-control  selectpicker border-0"
                                          data-live-search="true"
                                        >
                                          <option value="select">
                                            --Select--
                                          </option>
                                        </select>
                                      </div>
                                    </div>
                                    <div className="col-md-3">
                                      <p className="text-label mb-1 mt-1 p-radio lb">
                                        Asset Class{" "}
                                        <spna className="text-danger">*</spna>
                                      </p>
                                      <div className="pt-2">
                                        <input
                                          className=" input-text"
                                          id="equity"
                                          type="radio"
                                          name="asset"
                                          value="Equity"
                                        />
                                        <label htmlFor="equity" className="">
                                          Equity
                                        </label>
                                        <input
                                          className="input-text ml-3"
                                          id="debt"
                                          type="radio"
                                          name="asset"
                                          value="DEBT"
                                        />
                                        <label htmlFor="debt" className="">
                                          Debt
                                        </label>
                                        <br></br>{" "}
                                        <small className="text-danger pull-left"></small>
                                      </div>
                                    </div>
                                    <div className="col-md-3">
                                      <p className="text-label mb-1 mt-1 p-radio lb">
                                        Option{" "}
                                        <spna className="text-danger">*</spna>
                                      </p>
                                      <div className="pt-2">
                                        <input
                                          className=" input-text"
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
                                  </div>
                                  <div className="row">
                                    <div className="col-md-5">
                                      <div className="form-group pmd-textfield pmd-textfield-floating-label">
                                        <label
                                          for="target"
                                          className="lb  text-label"
                                        >
                                          Select Target Scheme
                                          <span className="text-danger">*</span>
                                        </label>
                                        <br />
                                        <select
                                          name="target"
                                          id="target"
                                          className="form-control selectpicker  border-0"
                                          data-live-search="true"
                                        >
                                          <option value="select">
                                            --Select--
                                          </option>
                                          <option value="s1">Amc</option>
                                        </select>
                                      </div>
                                    </div>

                                    <div className="col-md-7">
                                      <p className="text-label mb-1 mt-1 p-radio">
                                        Switch Type{" "}
                                        <spna className="text-danger">*</spna>
                                      </p>
                                      <input
                                        className=" input-text"
                                        id="amt"
                                        type="radio"
                                        name="amt_type"
                                        value="amt"
                                      />
                                      <label htmlFor="amt" className="">
                                        By Amount
                                      </label>
                                      <input
                                        className="input-text ml-3"
                                        id="units"
                                        type="radio"
                                        name="amt_type"
                                        value="unit"
                                      />
                                      <label htmlFor="units" className="">
                                        By Units
                                      </label>
                                      <input
                                        className="input-text ml-3"
                                        id="all_units"
                                        type="radio"
                                        name="amt_type"
                                        value="all_units"
                                      />
                                      <label htmlFor="all_units" className="">
                                        All Units
                                      </label>
                                      <br></br>{" "}
                                      <small className="text-danger pull-left"></small>
                                    </div>
                                  </div>
                                  <div className="row">
                                    <div className="col-md-5">
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
                                        <th>Target Scheme</th>
                                        <th>Switch Type</th>
                                        <th>Amount/Unit</th>
                                        <th></th>
                                      </tr>
                                      <tr>
                                        <td>Profile</td>
                                        <td>Scheme Name</td>
                                        <td>Folio Number</td>
                                        <td>Target Scheme</td>
                                        <td>switch type</td>
                                        <td>3500</td>
                                        <td>
                                          {" "}
                                          <a href="javascript:void(0)">
                                            <FaTrash className="red" />
                                          </a>
                                        </td>
                                      </tr>
                                    </table>
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
                    {/* <!--End Form trigger modal Switch --> */}
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
                            <div className="modal-content b-r p-3">
                              <div className="modal-header border-0">
                                <div className="quick-access-title">
                                  <h3>SIP</h3>
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
                                    <div className="col-md-5">
                                      <div className="form-group pmd-textfield pmd-textfield-floating-label">
                                        <label
                                          for="select-p"
                                          className="text-label"
                                        >
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
                                          <option
                                            value={this.state.userListFetched}
                                          >
                                            --Select--
                                          </option>
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
                                        <label
                                          for="invest"
                                          className="text-label"
                                        >
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
                                          <option value="select">
                                            --Select--
                                          </option>
                                        </select>
                                      </div>
                                    </div>
                                    <div className="col-md-4">
                                      <div className="form-group pmd-textfield pmd-textfield-floating-label">
                                        <label
                                          for="folio"
                                          className="text-label"
                                        >
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
                                          <option value="select">
                                            --Select--
                                          </option>
                                        </select>
                                      </div>
                                    </div>

                                    <div className="col-md-4">
                                      <div className="form-group pmd-textfield pmd-textfield-floating-label">
                                        <label
                                          for="Scheme"
                                          className="text-label"
                                        >
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
                                          <option value="select">
                                            --Select--
                                          </option>
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
                                        <label
                                          for="sipdate"
                                          className="lb  text-label"
                                        >
                                          SIP Date
                                          <span className="text-danger">*</span>
                                        </label>
                                        <br />
                                        <select
                                          name="sipdate"
                                          id="sipdate"
                                          className="form-control selectpicker  border-0"
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
                                          className="control-label lb text-label"
                                          for="sipf"
                                        >
                                          SIP From
                                          <span className="text-danger">*</span>
                                        </label>

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
                                          SIP To
                                          <span className="text-danger">*</span>
                                        </label>
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
                                      <label
                                        htmlFor="perpetual"
                                        className="ml-2"
                                      >
                                        Perpetual{" "}
                                        <spna className="text-danger">*</spna>
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
                                            <span className="text-danger">
                                              *
                                            </span>
                                          </label>
                                          <br />
                                          <select
                                            name="mandate"
                                            id="mandate"
                                            className="form-control selectpicker  border-0"
                                            data-live-search="true"
                                          >
                                            <option value="select">
                                              --Select--
                                            </option>
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
                    {/* <!-- Form trigger modal STP --> */}
                    <section className="stp">
                      <div className="row">
                        <div
                          tabindex="-1"
                          className="modal pmd-modal fade"
                          id="form-dialog-stp"
                          aria-hidden="true"
                        >
                          <div className="modal-dialog modal-lg">
                            <div className="modal-content b-r p-3">
                              <div className="modal-header border-0">
                                <div className="quick-access-title">
                                  <h3>STP</h3>
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
                                          for="select-p"
                                          className="text-label"
                                        >
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
                                          <option value="select">
                                            --Select--
                                          </option>
                                        </select>
                                      </div>
                                    </div>
                                    <div className="col-md-4">
                                      <div className="form-group pmd-textfield pmd-textfield-floating-label">
                                        <label
                                          for="invest"
                                          className="text-label"
                                        >
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
                                          <option value="select">
                                            --Select--
                                          </option>
                                        </select>
                                      </div>
                                    </div>
                                    <div className="col-md-4">
                                      <div className="form-group pmd-textfield pmd-textfield-floating-label">
                                        <label
                                          for="folio"
                                          className="text-label"
                                        >
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
                                          <option value="select">
                                            --Select--
                                          </option>
                                        </select>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="row">
                                    <div className="col-md-5">
                                      <div className="form-group pmd-textfield pmd-textfield-floating-label">
                                        <label
                                          for="source"
                                          className="text-label"
                                        >
                                          Select Source Scheme
                                          <span className="text-danger">*</span>
                                        </label>
                                        <br />
                                        <select
                                          name="source"
                                          id="source"
                                          className="form-control  selectpicker border-0"
                                          data-live-search="true"
                                        >
                                          <option value="select">
                                            --Select--
                                          </option>
                                        </select>
                                      </div>
                                    </div>
                                    <div className="col-md-3">
                                      <p className="text-label mb-1 mt-1 p-radio lb">
                                        Asset Class{" "}
                                        <spna className="text-danger">*</spna>
                                      </p>
                                      <div className="pt-2">
                                        <input
                                          className=" input-text"
                                          id="equity"
                                          type="radio"
                                          name="asset"
                                          value="Equity"
                                        />
                                        <label htmlFor="equity" className="">
                                          Equity
                                        </label>
                                        <input
                                          className="input-text ml-3"
                                          id="debt"
                                          type="radio"
                                          name="asset"
                                          value="DEBT"
                                        />
                                        <label htmlFor="debt" className="">
                                          Debt
                                        </label>
                                        <br></br>{" "}
                                        <small className="text-danger pull-left"></small>
                                      </div>
                                    </div>
                                    <div className="col-md-3">
                                      <p className="text-label mb-1 mt-1 p-radio lb">
                                        Option{" "}
                                        <spna className="text-danger">*</spna>
                                      </p>
                                      <div className="pt-2">
                                        <input
                                          className=" input-text"
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
                                  </div>
                                  <div className="row">
                                    <div className="col-md-4">
                                      <div className="form-group pmd-textfield pmd-textfield-floating-label">
                                        <label
                                          for="target"
                                          className="lb  text-label"
                                        >
                                          Select Target Scheme
                                          <span className="text-danger">*</span>
                                        </label>
                                        <br />
                                        <select
                                          name="target"
                                          id="target"
                                          className="form-control selectpicker  border-0"
                                          data-live-search="true"
                                        >
                                          <option value="select">
                                            --Select--
                                          </option>
                                          <option value="s1">Amc</option>
                                        </select>
                                      </div>
                                    </div>

                                    <div className="col-md-4">
                                      <div className="form-group pmd-textfield pmd-textfield-floating-label">
                                        <label
                                          className="control-label lb text-label"
                                          for="to"
                                        >
                                          STP From
                                          <span className="text-danger">*</span>
                                        </label>
                                        <DatePickerComponent
                                          format="MMM-yyyy"
                                          className="form-control"
                                          placeholder="MM-YYYY"
                                          start="Year"
                                          depth="Year"
                                        />
                                      </div>
                                    </div>
                                    <div className="col-md-4">
                                      <div className="form-group pmd-textfield pmd-textfield-floating-label">
                                        <label
                                          for="from"
                                          className="lb  text-label"
                                        >
                                          STP To
                                          <span className="text-danger">*</span>
                                        </label>
                                        <br />

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
                                          for="selectp"
                                          className="lb  text-label"
                                        >
                                          Select Frequency
                                          <span className="text-danger">*</span>
                                        </label>
                                        <br />
                                        <select
                                          name="selectp"
                                          id="selectp"
                                          className="form-control selectpicker  border-0"
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
                                    <table className="table table-responsive bg-white mt-5 mb-3">
                                      <tr>
                                        <th>Profile</th>
                                        <th> Source Scheme</th>
                                        <th> Folio Number</th>
                                        <th>Target Scheme</th>
                                        <th>STP From</th>
                                        <th>STP To</th>
                                        <th>Frequency</th>
                                        <th>Amount</th>

                                        <th></th>
                                      </tr>
                                      <tr>
                                        <td>Profile</td>
                                        <td>Source Scheme </td>
                                        <td>Folio number</td>

                                        <td>Target Scheme</td>
                                        <td>5/2/22</td>
                                        <td>10/3/22</td>
                                        <td>Frequency</td>
                                        <td>6000</td>
                                        <td>
                                          {" "}
                                          <a href="javascript:void(0)">
                                            <FaTrash className="red" />
                                          </a>
                                        </td>
                                      </tr>
                                    </table>
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
                    {/* <!--End Form trigger modal STP --> */}
                    {/* <!-- Form trigger modal SWP --> */}
                    <section className="swp">
                      <div className="row">
                        <div
                          tabindex="-1"
                          className="modal pmd-modal fade"
                          id="form-dialog-swp"
                          aria-hidden="true"
                        >
                          <div className="modal-dialog modal-lg">
                            <div className="modal-content b-r p-3">
                              <div className="modal-header border-0">
                                <div className="quick-access-title">
                                  <h3>SWP</h3>
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
                                          for="select-p"
                                          className="text-label"
                                        >
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
                                          <option value="select">
                                            --Select--
                                          </option>
                                        </select>
                                      </div>
                                    </div>
                                    <div className="col-md-4">
                                      <div className="form-group pmd-textfield pmd-textfield-floating-label">
                                        <label
                                          for="invest"
                                          className="text-label"
                                        >
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
                                          <option value="select">
                                            --Select--
                                          </option>
                                        </select>
                                      </div>
                                    </div>
                                    <div className="col-md-4">
                                      <div className="form-group pmd-textfield pmd-textfield-floating-label">
                                        <label
                                          for="folio"
                                          className="text-label"
                                        >
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
                                          <option value="select">
                                            --Select--
                                          </option>
                                        </select>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="row">
                                    <div className="col-md-4">
                                      <div className="form-group pmd-textfield pmd-textfield-floating-label">
                                        <label
                                          for="sScheme"
                                          className="lb  text-label"
                                        >
                                          Select Scheme
                                          <span className="text-danger">*</span>
                                        </label>
                                        <br />
                                        <select
                                          name="sScheme"
                                          id="sScheme"
                                          className="form-control selectpicker  border-0"
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
                                          className="control-label lb text-label"
                                          for="sipf"
                                        >
                                          SWP From
                                          <span className="text-danger">*</span>
                                        </label>
                                        <DatePickerComponent
                                          format="MMM-yyyy"
                                          className="form-control"
                                          placeholder="MM-YYYY"
                                          start="Year"
                                          depth="Year"
                                        />
                                      </div>
                                    </div>

                                    <div className="col-md-4">
                                      <div className="form-group pmd-textfield pmd-textfield-floating-label">
                                        <label
                                          className="control-label lb text-label"
                                          for="sipend"
                                        >
                                          SWP To
                                          <span className="text-danger">*</span>
                                        </label>
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
                                          for="selectp"
                                          className="lb  text-label"
                                        >
                                          Select Frequency
                                          <span className="text-danger">*</span>
                                        </label>
                                        <br />
                                        <select
                                          name="selectp"
                                          id="selectp"
                                          className="form-control selectpicker  border-0"
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
                                        <th>SWP From</th>
                                        <th>SWP To</th>
                                        <th>Frequency</th>
                                        <th>Amount</th>
                                        <th></th>
                                      </tr>
                                      <tr>
                                        <td>Profile</td>
                                        <td>Scheme Name</td>
                                        <td>folio number</td>
                                        <td>5/12/20</td>
                                        <td>6/1/21</td>
                                        <td>frequency</td>
                                        <td>4500</td>
                                        <td>
                                          {" "}
                                          <a href="javascript:void(0)">
                                            <FaTrash className="red" />
                                          </a>
                                        </td>
                                      </tr>
                                    </table>
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
                    {/* <!--End Form trigger modal SWP --> */}
                    {/* <!-- Form trigger modal Redemption--> */}
                    <section className="redemption">
                      <div className="row">
                        <div
                          tabindex="-1"
                          className="modal pmd-modal fade"
                          id="form-dialog-redemption"
                          aria-hidden="true"
                        >
                          <div className="modal-dialog modal-lg">
                            <div className="modal-content b-r p-3">
                              <div className="modal-header border-0">
                                <div className="quick-access-title">
                                  <h3>Redemption</h3>
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
                                          for="select-p"
                                          className="text-label"
                                        >
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
                                          <option value="select">
                                            --Select--
                                          </option>
                                        </select>
                                      </div>
                                    </div>
                                    <div className="col-md-4">
                                      <div className="form-group pmd-textfield pmd-textfield-floating-label">
                                        <label
                                          for="invest"
                                          className="text-label"
                                        >
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
                                          <option value="select">
                                            --Select--
                                          </option>
                                        </select>
                                      </div>
                                    </div>
                                    <div className="col-md-4">
                                      <div className="form-group pmd-textfield pmd-textfield-floating-label">
                                        <label
                                          for="folio"
                                          className="text-label"
                                        >
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
                                          <option value="select">
                                            --Select--
                                          </option>
                                        </select>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="row">
                                    <div className="col-md-5">
                                      <div className="form-group pmd-textfield pmd-textfield-floating-label">
                                        <label
                                          for="scheme"
                                          className="lb  text-label"
                                        >
                                          Select Scheme
                                          <span className="text-danger">*</span>
                                        </label>
                                        <br />
                                        <select
                                          name="scheme"
                                          id="scheme"
                                          className="form-control selectpicker  border-0"
                                          data-live-search="true"
                                        >
                                          <option value="select">
                                            --Select--
                                          </option>
                                          <option value="s1">Amc</option>
                                        </select>
                                      </div>
                                    </div>

                                    <div className="col-md-7">
                                      <p className="text-label mb-1 mt-1 p-radio">
                                        Redemption Type{" "}
                                        <spna className="text-danger">*</spna>
                                      </p>
                                      <input
                                        className=" input-text"
                                        id="amt"
                                        type="radio"
                                        name="amt_type"
                                        value="amt"
                                      />
                                      <label htmlFor="amt" className="">
                                        By Amount
                                      </label>
                                      <input
                                        className="input-text ml-3"
                                        id="units"
                                        type="radio"
                                        name="amt_type"
                                        value="unit"
                                      />
                                      <label htmlFor="units" className="">
                                        By Units
                                      </label>
                                      <input
                                        className="input-text ml-3"
                                        id="all_units"
                                        type="radio"
                                        name="amt_type"
                                        value="all_units"
                                      />
                                      <label htmlFor="all_units" className="">
                                        All Units
                                      </label>
                                      <br></br>{" "}
                                      <small className="text-danger pull-left"></small>
                                    </div>
                                  </div>
                                  <div className="col-md-5">
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
                                        <th>Redemption Type</th>
                                        <th>Amount</th>
                                        <th></th>
                                      </tr>
                                      <tr>
                                        <td>Profile</td>
                                        <td>Scheme Name</td>
                                        <td>Folio Number</td>
                                        <td>Redemption Type</td>
                                        <td>3500</td>
                                        <td>
                                          {" "}
                                          <a href="javascript:void(0)">
                                            <FaTrash className="red" />
                                          </a>
                                        </td>
                                      </tr>
                                    </table>
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
                    {/* <!--End Form trigger modal Redemption
                             --> */}
                  </div>
                </div>
              </div>
              {/* Footer */}
              <Footer />
              {/* End of Footer */}
            </div>
          </div>
        </div>
      </>
    );
  }
}
export default Transact;
