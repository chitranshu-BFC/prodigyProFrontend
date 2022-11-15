import React from "react";
import Header from './header';
import Footer from './footer';
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import sipc from "../../assets/images/icons/New folder (2)/budget.png";
import ring from "../../assets/images/icons/New folder (2)/rings.png";
import education from "../../assets/images/icons/New folder (2)/education.png";
import emi from "../../assets/images/icons/New folder (2)/calculatorfuture.png";
import retirement from "../../assets/images/icons/New folder (2)/retirement.png";
import futurec from "../../assets/images/icons/New folder (2)/calculator.png";
import minus from "../../assets/images/icons/New folder (2)/minus_3(1).png";
import plus from "../../assets/images/icons/New folder (2)/add_3(1).png";
import fd from "../../assets/images/icons/New folder (2)/fd.png";
import elss from "../../assets/images/icons/New folder (2)/elss.png";
import axios from 'axios'
import $ from "jquery";
import Button from 'react-bootstrap/Button';
import LoadingOverlay from "react-loading-overlay";

import { LineChart } from 'react-chartkick';
import 'chartkick/chart.js';
import "./styles.css";

import styled, { css } from "styled-components";

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

  ${props =>
    props.disappear &&
    css`
      display: block; /* show */
    `}
`;
class Marriage_Planning_Pro extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      childAgeToday: 15,
      childAgeAfterMarried: 25,
      amountRequirmentWedToday: 250000,
      annualSaving: 10000,
      rateReturn: 12,
      inflationRate: 5,
      inflaction: '4,07,223',
      futureValue: '1,91,698',
      af: '2,15,525',
      lumpsum: '65,302',
      sip_amount: 937,
      loded: true

    }


  }
  handleCategory = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  calculateMarrige = (e) => {
    this.setState({ popupNegative: null,note:null });

    this.setState({ loded: !this.state.loded });
    console.log("!this.state.loded",!this.state.loded);
    // console.log("ds",this.state.loded)
    // var lumpsum = this.state.childAgeToday * Math.pow((1 + this.state.tanureYear / 100), this.state.rateIntrest);
    // this.setState({ gains: lumpsum });
    // console.log("gains",this.state.gains);
    const data = {
      childAgeToday: this.state.childAgeToday,
      childAgeAfterMarried: this.state.childAgeAfterMarried,
      amountRequirmentWedToday: this.state.amountRequirmentWedToday,
      annualSaving: this.state.annualSaving,
      rateReturn: this.state.rateReturn,
      inflationRate: this.state.inflationRate
    };

    axios.post('http://localhost:5010/api/marrige', data).then((res) => {
      console.log("lllllll", res.data);
      this.setState({
        inflaction: res.data.inflaction,
        futureValue: res.data.futureValue,
        af: res.data.af,
        lumpsum: res.data.lumpsum,
        sip_amount: res.data.data,
        loded:true


      })
     var withoutComma = this.state.af.replace(/,/g, "")
     var withoutComma=parseInt(withoutComma)
      if(withoutComma<0){
        console.log("negative ",withoutComma)
        this.setState({note:"Note:",popupNegative:" Your existing savings are enough to meet this goal, you can utilize the excess saving to achieve your other goals"});
        // setTimeout(() => this.setState({popupNegative:""}), 5000)

        console.log(this.state.popupNegative);
      }else{
        console.log("positive ",withoutComma)

      }

    })




  }

  incChildAgeToday = (e) => {
    if (this.state.childAgeToday) {
      this.setState({ childAgeToday: parseInt(this.state.childAgeToday) + 1 })
    } else if (this.state.childAgeToday == 0) {
      this.setState({ childAgeToday: parseInt(this.state.childAgeToday) + 1 })
    }
  }
  decChildAgeToday = (e) => {
    if (this.state.childAgeToday || this.state.childAgeToday == 0) {
      if (this.state.childAgeToday > 0) {
        this.setState({ childAgeToday: parseInt(this.state.childAgeToday) - 1 })
      }
    }
  }
  incChildAgeAfterMarried = (e) => {
    if (this.state.childAgeAfterMarried || this.state.childAgeAfterMarried == 0) {
      if (this.state.childAgeToday < 35)
        this.setState({ childAgeAfterMarried: parseInt(this.state.childAgeAfterMarried) + 1 })
    }
  }
  decChildAgeAfterMarried = (e) => {
    if (this.state.childAgeAfterMarried || this.state.childAgeAfterMarried == 0) {
      this.setState({ childAgeAfterMarried: parseInt(this.state.childAgeAfterMarried) - 1 })
    }
  }
  incAmountRequirmentWedToday = (e) => {
    if (this.state.amountRequirmentWedToday) {
      this.setState({ amountRequirmentWedToday: parseInt(this.state.amountRequirmentWedToday) + 500 })
    } else if (this.state.amountRequirmentWedToday == 0) {
      this.setState({ amountRequirmentWedToday: parseInt(this.state.amountRequirmentWedToday) + 500 })
    }
  }
  decAmountRequirmentWedToday = (e) => {
    if (this.state.amountRequirmentWedToday >= 500) {
      this.setState({ amountRequirmentWedToday: parseInt(this.state.amountRequirmentWedToday) - 500 })
    } else if (this.state.amountRequirmentWedToday < 499) {
      this.setState({ amountRequirmentWedToday: 0 })
    }
  }

  incAnnualSaving = (e) => {
    if (this.state.annualSaving) {
      this.setState({ annualSaving: parseInt(this.state.annualSaving) + 500 })
    } else if (this.state.annualSaving == 0) {
      this.setState({ annualSaving: parseInt(this.state.annualSaving) + 500 })
    }
  }
  decAnnualSaving = (e) => {
    if (this.state.annualSaving >= 500) {
      this.setState({ annualSaving: parseInt(this.state.annualSaving) - 500 })
    } else if (this.state.annualSaving < 499) {
      this.setState({ annualSaving: 0 })
    }
  }

  incRateReturn = (e) => {
    if (this.state.rateReturn || this.state.rateReturn == 0) {
      if (this.state.rateReturn < 30)
        this.setState({ rateReturn: parseInt(this.state.rateReturn) + 1 })
    }
  }
  decRateReturn = (e) => {
    if (this.state.rateReturn || this.state.rateReturn == 0) {
      if (this.state.rateReturn > 0)
        this.setState({ rateReturn: parseInt(this.state.rateReturn) - 1 })
    }
  }

  incInflationRate = (e) => {
    if (this.state.inflationRate || this.state.inflationRate == 0) {
      if (this.state.inflationRate < 30)
        this.setState({ inflationRate: parseInt(this.state.inflationRate) + 1 })
    }
  }
  decInflationRate = (e) => {
    if (this.state.inflationRate || this.state.inflationRate == 0) {
      if (this.state.inflationRate > 0)
        this.setState({ inflationRate: parseInt(this.state.inflationRate) - 1 })
    }
  }


  render() {

    return (
      <>
        <Helmet>
          <title>Calculators - Prodigy Pro</title>
        </Helmet>
        <style>
          {`

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.form-control::placeholder
{
color:#000!important;
text-align:center;
}
#marriage-2
{
display:none;
}
.result-content.text-center .text-label.font-weight-500.py-2 {
min-height:65px;
}


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
                  <li className="breadcrumb-item"><a href="home">Home</a></li>
                  <li className="breadcrumb-item active" aria-current="page">Calculators</li>
                </ol>
              </nav>
              <div className="container-fluid  px-5 pb-5 calculator">
                <div className="row">
                  <div className="col-md-12">
                    {/* <div className="row">
                <div className="col-md-12">
                  <div className="page-heading pb-2 text-center">
                    <h3>Calculators</h3>
                  </div>
                </div>
              </div> */}
                    {/* =============Calculators Nav Start================ */}
                    <div class="container-calculator pb-5">
                      <ul class="nav navtop text-center">
                        <div className="col-md-3">
                          <li class="nav-item">
                            <Link class="nav-link " to="/prodigypro/dashboard/sip-calculator-pro">
                              <img src={sipc} className="new-icon" alt='' />  <span>   SIP Calculator</span>
                            </Link>
                          </li>
                        </div>
                        <div className="col-md-3">
                          <li class="nav-item">
                            <Link class="nav-link active" to="/prodigypro/dashboard/marriage-planning-pro"><img src={ring} className="new-icon" alt='' />  <span>Marriage
                              Planning</span></Link>
                          </li>
                        </div>
                        <div className="col-md-3">
                          <li class="nav-item">
                            <Link class="nav-link" to="/prodigypro/dashboard/education-planning-pro"><img src={education} className="new-icon" alt='' /> <span>Education
                              Planning</span></Link>
                          </li>
                        </div>
                        <div className="col-md-3 ">
                          <li class="nav-item">
                            <Link class="nav-link" to="/prodigypro/dashboard/future-value-calculator-pro"><img src={futurec} className="new-icon" alt='' /><span>Future Value
                              Calculator</span></Link>
                          </li>
                        </div>
                        <div className="col-md-3 mt-3">
                          <li class="nav-item">
                            <Link class="nav-link" to="/prodigypro/dashboard/retirement-planning-pro"><img src={retirement} className="new-icon" alt='' /><span>Retirement
                              Planning</span></Link>
                          </li>
                        </div>
                        <div className="col-md-3 mt-3">
                          <li class="nav-item">
                            <Link class="nav-link " to="/prodigypro/dashboard/emi-calculator-pro"><img src={emi} className="new-icon" alt='' /><span>EMI
                              Calculator</span></Link>
                          </li>
                        </div>
                        <div className="col-md-3 mt-3">
                          <li class="nav-item">
                            <Link class="nav-link" to="/prodigypro/dashboard/fd-calculator-pro"><img src={fd} className="new-icon" alt='' /><span>FD
                              Calculator</span></Link>
                          </li>
                        </div>
                        <div className="col-md-3 mt-3">
                          <li class="nav-item">
                            <Link class="nav-link" to="/prodigypro/dashboard/elss-calculator-pro"><img src={elss} className="new-icon" alt='' /><span>ELSS
                              Calculator</span></Link>
                          </li>
                        </div>
                      </ul>
                      {/* =============Calculators Nav End================ */}
                      <div class=" mt-3 ">
                        <div class="" role="tabpanel">
                          <section>
                            <div className="results pt-5">
                              <div className="px-5">
                                <div className="shadowc br-50 px-4 pb-5">
                                  <section className="pt-5 pb-5">
                                    <div className="row" id="marriage-1">
                                      {/*first*/}
                                      <div className="col-md-4 text-center">
                                        <label for="m-saving" className="text-label font-weight-500 py-2 fs-14">
                                          Child's age today (Years)
                                        </label>
                                        <div className="d-flex inputf transcard">
                                          <img src={minus} alt="" className="img-fluid max-27" onClick={this.decChildAgeToday}></img>
                                          <input type="number" className="form-control" name="childAgeToday" onChange={this.handleCategory} value={this.state.childAgeToday} />
                                          <img src={plus} alt="" className="img-fluid max-27" onClick={this.incChildAgeToday}></img>
                                        </div>
                                      </div>
                                      <div className="col-md-4 text-center">
                                        <label for="year" className="text-label font-weight-500 py-2 fs-14">
                                          Child will get married at the age of (Years)
                                        </label>
                                        <div className="d-flex inputf transcard">
                                          <img src={minus} alt="" className="img-fluid max-27" onClick={this.decChildAgeAfterMarried}></img>
                                          <input type="number" className="form-control" name="childAgeAfterMarried" onChange={this.handleCategory} value={this.state.childAgeAfterMarried} />
                                          <img src={plus} alt="" className="img-fluid max-27" onClick={this.incChildAgeAfterMarried}></img>
                                        </div>
                                      </div>
                                      <div className="col-md-4 text-center">
                                        <label for="return" className="text-label font-weight-500 py-2 fs-14">
                                          Amount required for wedding as on today(₹)
                                        </label>
                                        <div className="d-flex inputf transcard">
                                          <img src={minus} alt="" className="img-fluid max-27" onClick={this.decAmountRequirmentWedToday}></img>
                                          <input type="number" className="form-control" name="amountRequirmentWedToday" onChange={this.handleCategory} value={this.state.amountRequirmentWedToday} />
                                          <img src={plus} alt="" className="img-fluid max-27" onClick={this.incAmountRequirmentWedToday}></img>
                                        </div>
                                      </div>
                                    </div>
                                    {/*second*/}
                                    <div className="row" >
                                      <div className="col-md-4 text-center">
                                        <label for="m-saving" className="text-label font-weight-500 py-2 fs-14">
                                          Annual Saving(₹)
                                        </label>
                                        <div className="d-flex inputf transcard">
                                          <img src={minus} alt="" className="img-fluid max-27" onClick={this.decAnnualSaving}></img>
                                          <input type="number" className="form-control" name="annualSaving" onChange={this.handleCategory} value={this.state.annualSaving} />
                                          <img src={plus} alt="" className="img-fluid max-27" onClick={this.incAnnualSaving}></img>
                                        </div>
                                      </div>
                                      <div className="col-md-4 text-center">
                                        <label for="year" className="text-label font-weight-500 py-2 fs-14">
                                          Expected rate of return(%)
                                        </label>
                                        <div className="d-flex inputf transcard">
                                          <img src={minus} alt="" className="img-fluid max-27" onClick={this.decRateReturn}></img>
                                          <input type="number" className="form-control" name="rateReturn" onChange={this.handleCategory} value={this.state.rateReturn} />
                                          <img src={plus} alt="" className="img-fluid max-27" onClick={this.incRateReturn}></img>
                                        </div>
                                      </div>
                                      <div className="col-md-4 text-center">
                                        <label for="return" className="text-label font-weight-500 py-2 fs-14">
                                          Expected inflation rate (% p.a)
                                        </label>
                                        <div className="d-flex inputf transcard">
                                          <img src={minus} alt="" className="img-fluid max-27" onClick={this.decInflationRate}></img>
                                          <input type="number" className="form-control" name="inflationRate" onChange={this.handleCategory} value={this.state.inflationRate} />
                                          <img src={plus} alt="" className="img-fluid max-27" onClick={this.incInflationRate}></img>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-md-12 mt-3  text-right">
                                      <button className="new-btn1" onClick={this.calculateMarrige}>Calculate</button>
                                    </div>
                                    <DarkBackground disappear={!this.state.loded}>

                                      <LoadingOverlay
                                        active={true}
                                        // spinner={<BounceLoader />}
                                        spinner={true}
                                       
                                      >
                                        {/* <p>Some content or children or something.</p> */}
                                      </LoadingOverlay>
                                    </DarkBackground>
                                  </section>
                                  <div className="row shadowc br-50 mx-3 p-5">
                                    <div className="col-md-12 px-5 pt-5 ">
                                      <div className="col-md-12 result-title text-center">
                                        <h3>Result</h3>
                                      </div>
                                      <div className="result-content text-center">
                                        <div className="row pt-3">
                                          <div className="col-md-4">
                                            <div className="text-label font-weight-500 py-2 ">
                                              Inflation Adjusted Cost(₹)
                                            </div>
                                            <div className="inputf transcard  py-2 bg-light-red">{this.state.inflaction}</div>
                                          </div>
                                          <div className="col-md-4">
                                            <div className="text-label font-weight-500 py-2 ">
                                              Future value of saving (₹)
                                            </div>
                                            <div className="inputf transcard py-2 bg-light-red">{this.state.futureValue}</div>
                                          </div>
                                          <div className="col-md-4">

                                            <div className="text-label font-weight-500 py-2">
                                              Additional funds required to meet expenses(₹)
                                            </div>
                                            <div className="inputf transcard bg-light-red py-2">{this.state.af}</div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-md-12 px-5 pt-5">
                                      <div className="col-md-12 result-title text-center ">
                                        <h3>Plan of action Required</h3>
                                      </div>
                                      <div className=" row result-content text-center">
                                        <div className="col-md-5">
                                          <div className="text-label font-weight-500 py-2">
                                            One time investment required(₹)
                                          </div>
                                          <div className="inputf transcard bg-light-red py-2">{this.state.lumpsum}</div>
                                        </div>
                                        <div className="col-md-2"><div className="text-label font-weight-500 py-2"><strong className="text-black">OR</strong></div></div>
                                        <div className="col-md-5">
                                          <div className="text-label font-weight-500 py-2">
                                            Monthly investment required(₹)
                                          </div>
                                          <div className="inputf transcard bg-light-red py-2">{this.state.sip_amount}</div>
                                        </div>
                                   
                                      </div>
                                    </div>
                                    <div className="text-label font-weight-500 py-2 pt-5 text-danger pl-5" > <b sytle={{color:"black"}}>{this.state.note}</b>
                                         {this.state.popupNegative}
                                            </div>
                                  </div>
                                  <div className="row px-5 pt-3">

                                    <div className="col-md-12 text-right">
                                      <button className="btn-custom ">Invest Now</button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </section>
                        </div>
                      </div>

                    </div>
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
    )
  }
}
export default Marriage_Planning_Pro