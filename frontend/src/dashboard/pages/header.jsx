import React from "react";
// import simply_save from "../../assets/images/icons/simply-save.png";
// import simply_sip from "../../assets/images/icons/simply-sip-small.png";
import notification from "../../assets/images/icons/New folder (2)/notification.png";
import profile_icon from "../../assets/images/undraw_profile.svg";
import logoIcon from "../../assets/images/logonew.png";
import logotext from "../../assets/images/icons/New folder (2)/bfc-capital-text.png";
import cart from "../../assets/images/icons/New folder (2)/shopping-cart.png";
import Right_Icons from "./hover-right-icons";
import { FaTrash } from "react-icons/fa";
import sunderam from "../../assets/images/icons/New folder (2)/Sundaram_Mutual_Fund.png";
import sbi from "../../assets/images/icons/New folder (2)/sbi mutual fund.png";
import idfc from "../../assets/images/icons/New folder (2)/IDFC.png";
import { Link } from "react-router-dom";
// import {FaPen} from "react-icons/fa";
//  import ProfilePic from "../../assets/css/sb-admin-2.min.css"
class Header extends React.Component {
  render() {
    return (
      <>
        <nav
          class="navbar sticky-top bg-white navbar-expand-lg navbar-light s   custom-shadow nav-head"
          style={{ borderRadius: "0 0 35px 35px" }}
        >
          <Link
            to="/prodigypro/dashboard"
            class="navbar-brand"
            // className={
            //   window.location.href.split("/")[3] == "subscription"
            //     ? "nav-link active"
            //     : "nav-link"
            // }
          >
            <img src={logoIcon} alt="" className="logo img-fluid" />
            <span>
              <img src={logotext} alt="" className="img-fluid" />
            </span>
          </Link>
          {/* <a class="navbar-brand" href="/prodigypro/dashboard">
            <img src={logoIcon} alt="" className="logo img-fluid" />
            <span>
              <img src={logotext} alt="" className="img-fluid" />
            </span>
          </a> */}
          <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse topbar" id="navbarNav">
            <ul className="navbar-nav main-menu ml-auto">
              <li className="active">
                <Link
                  to="/prodigypro/dashboard/sip-calculator-pro"
                  // className={
                  //   window.location.href.split("/")[3] == "subscription"
                  //     ? "nav-link active"
                  //     : "nav-link"
                  // }
                >
                  Calculators
                </Link>
                {/* <a href="/prodigypro/dashboard/sip-calculator-pro">
                  Calculators
                </a> */}
              </li>
              <li className="">
                <Link
                  to="/prodigypro/dashboard/tax-planning"
                  // className={
                  //   window.location.href.split("/")[3] == "subscription"
                  //     ? "nav-link active"
                  //     : "nav-link"
                  // }
                >
                  Tax Planning
                </Link>
                {/* <a href="/prodigypro/dashboard/tax-planning">Tax Planning</a> */}
              </li>
              <li className="active menu_has_children">
                <a href="#0">Reports</a>
                <ul className="sub-menu reports">
                  <li>
                    {/* <a href="/prodigypro/dashboard/sipstpswp-report">
                      MY SIP/STP/SWP
                    </a> */}
                    <Link
                      to="/prodigypro/dashboard/sipstpswp-report"
                      // className={
                      //   window.location.href.split("/")[3] == "subscription"
                      //     ? "nav-link active"
                      //     : "nav-link"
                      // }
                    >
                      MY SIP/STP/SWP
                    </Link>
                  </li>
                  <li>
                    {/* <a href="/prodigypro/dashboard/transaction-report">
                      My Transactions
                    </a> */}
                    <Link
                      to="/prodigypro/dashboard/transaction-report"
                      // className={
                      //   window.location.href.split("/")[3] == "subscription"
                      //     ? "nav-link active"
                      //     : "nav-link"
                      // }
                    >
                      My Transactions
                    </Link>
                  </li>
                  <li>
                    {/* <a href="/prodigypro/dashboard/tax-saving-report">
                      Tax Saving Investments
                    </a> */}
                    <Link
                      to="/prodigypro/dashboard/tax-saving-report"
                      // className={
                      //   window.location.href.split("/")[3] == "subscription"
                      //     ? "nav-link active"
                      //     : "nav-link"
                      // }
                    >
                      Tax Saving Investments
                    </Link>
                  </li>
                  <li>
                    {/* <a href="/prodigypro/dashboard/dividend-report">
                      Dividends
                    </a> */}
                    <Link
                      to="/prodigypro/dashboard/dividend-report"
                      // className={
                      //   window.location.href.split("/")[3] == "subscription"
                      //     ? "nav-link active"
                      //     : "nav-link"
                      // }
                    >
                      Dividends
                    </Link>
                  </li>
                </ul>
              </li>
              <li className=" pr-4">
                {/* <a href="/prodigypro/dashboard/advisory-lumpsum">
                  Get Right Scheme
                </a> */}
                <Link
                  to="/prodigypro/dashboard/advisory-lumpsum"
                  // className={
                  //   window.location.href.split("/")[3] == "subscription"
                  //     ? "nav-link active"
                  //     : "nav-link"
                  // }
                >
                  Get Right Scheme
                </Link>
              </li>
            </ul>

            <ul className="navbar-nav ml-auto">
              <div className="topbar-divider"></div>
              {/* Nav Item - User Information */}
              <li className="nav-item dropdown no-arrow">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="userDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <div>
                    <span className="mr-2 d-none d-lg-inline text-gray-600 small">
                      {JSON.parse(localStorage.getItem("loginUserData")).name}
                    </span>
                    <br />
                  </div>
                  <img
                    className="img-profile rounded-circle"
                    src={profile_icon}
                  />
                </a>

                {/* Dropdown - User Information */}
                <div
                  className="dropdown-menu dropdown-menu-right shadow animated--grow-in"
                  aria-labelledby="userDropdown"
                >
                  <Link
                    to="/prodigypro/dashboard/profile"
                    // className={
                    //   window.location.href.split("/")[3] == "subscription"
                    //     ? "nav-link active"
                    //     : "nav-link"
                    // }
                    className="dropdown-item"
                  >
                    <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400" />
                    Profile
                  </Link>
                  {/* <a
                    className="dropdown-item"
                    href="/prodigypro/dashboard/profile"
                  >
                    <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400" />
                    Profile
                  </a> */}
                  <Link
                    to="/prodigypro/dashboard/change-password"
                    // className={
                    //   window.location.href.split("/")[3] == "subscription"
                    //     ? "nav-link active"
                    //     : "nav-link"
                    // }
                    className="dropdown-item"
                  >
                    <i className="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400" />
                    Change Password
                  </Link>
                  {/* <a
                    className="dropdown-item"
                    href="/prodigypro/dashboard/change-password"
                  >
                    <i className="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400" />
                    Change Password
                  </a> */}
                  <Link
                    to="/prodigypro/dashboard/contact-us"
                    // className={
                    //   window.location.href.split("/")[3] == "subscription"
                    //     ? "nav-link active"
                    //     : "nav-link"
                    // }
                    className="dropdown-item"
                  >
                    <i className="fas fa-list fa-sm fa-fw mr-2 text-gray-400" />
                    Contact Us
                  </Link>
                  {/* <a
                    className="dropdown-item"
                    href="/prodigypro/dashboard/contact-us"
                  >
                    <i className="fas fa-list fa-sm fa-fw mr-2 text-gray-400" />
                    Contact Us
                  </a> */}
                  <div className="dropdown-divider" />

                  <a
                    className="dropdown-item"
                    href="/prodigypro/dashboard/logout"
                  >
                    <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400" />
                    Logout
                  </a>
                </div>
              </li>
              {/* divider */}
              <div className="topbar-divider d-none d-sm-block" />

              <li className=" my-auto">
                <ul className="d-flex">
                  {/* notification */}
                  <li className="img-contain-btn mr-4 notify">
                    <a
                      className=""
                      href="#"
                      id="notification"
                      role="button"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <img src={notification} className="w-100" />
                    </a>

                    <div
                      className="dropdown-menu dropdown-menu-right shadow animated--grow-in mr-3 px-3"
                      aria-labelledby="notification"
                    >
                      <div className="row border-bottom">
                        <div className="col-md-9 pt-2">
                          <a className="text-decoration-none" href="#">
                            <h6 className="text-black">
                              Change in folio Nos.-HSBC MF
                            </h6>
                            <p className="red fs-13 ">
                              The folio numbers of HSBC Mutual Funds will be
                              changed to an 8-digit folio number.
                            </p>
                          </a>
                        </div>
                        <div className="col-md-3 pt-4">3 days</div>
                      </div>

                      <div className="row border-bottom ">
                        <div className="col-md-9 pt-2">
                          <a
                            className="text-decoration-none"
                            data-toggle="modal"
                            data-target="#notify-single"
                            href="javascript:void(0);"
                          >
                            <h6 className="text-black">
                              Change in folio Nos.-HSBC MF
                            </h6>
                            <p className="red fs-13 ">
                              The folio numbers of HSBC Mutual Funds will be
                              changed to an 8-digit folio number.
                            </p>
                          </a>
                        </div>
                        <div className="col-md-3 pt-4">3 days</div>
                      </div>
                      <div className="row ">
                        <div className="col-md-9 pt-2">
                          <a className="text-decoration-none" href="#">
                            <h6 className="text-black">
                              Change in folio Nos.-HSBC MF
                            </h6>
                            <p className="red fs-13 ">
                              The folio numbers of HSBC Mutual Funds will be
                              changed to an 8-digit folio number.
                            </p>
                          </a>
                        </div>
                        <div className="col-md-3 pt-4">3 days</div>
                      </div>
                    </div>
                  </li>
                  {/* end notification */}
                  {/* add cart */}
                  <li className="img-contain-btn my-cart-h">
                    <a
                      className=""
                      href="#"
                      id="cart"
                      role="button"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      {" "}
                      <img src={cart} className="w-100" />
                    </a>

                    <div
                      className="dropdown-menu dropdown-menu-right shadow animated--grow-in mr-3 bg-g p-3 bg-gray"
                      aria-labelledby="cart"
                    >
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

                        <div className="col-md-12 text-center py-3">
                          <button className="btn-custom">Continue</button>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </li>
              {/* end cart */}
            </ul>
          </div>
        </nav>
        {/* notification modal */}

        <div
          class="modal fade"
          id="notify-single"
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body text-center">
                <h6 className="red text-center">
                  Change in folio Nos.-HSBC MF
                </h6>
                <p>
                  The folio numbers of HSBC Mutual Fund will be changed to an
                  8-digit folio number. Accordingly, the existing folio number
                  will be pre-fixed with 1 followed by to make it 'O' / 'O's 8
                  digits (excluding check digits).
                </p>
                <p>
                  The change in Folio numbers will be effective from 26 June
                  2022.
                </p>

                <h6 className="text-black text-center"> Example 1 </h6>
                <p>Old Folio No - 12345 /88</p>
                <p>New Folio No - 10012345 /88</p>

                <h6 className="text-black text-center"> Example 2 </h6>
                <p>Old Folio No - 1234 /99</p>
                <p>New Folio No - 10001234 /99</p>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn-custom">
                  Ok
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* notification modal End */}
        <section>
          <Right_Icons />
        </section>
      </>
    );
  }
}
export default Header;
