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
import $ from "jquery";
import Button from 'react-bootstrap/Button';
import axios from 'axios'
import ClipLoader from "react-spinners/ClipLoader";
import { LineChart } from 'react-chartkick';
import 'chartkick/chart.js';
import LoadingOverlay from "react-loading-overlay";
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

class Retirement_Planning_Pro extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            childAge: 30,
            retirementAge: 60,
            currentLifestyle: 30000,
            inflationRate: 6,
            currentSaving: 5000,
            existingCorpus: 200000,
            expectedPreRetirment: 12,
            expectedPostRetirment: 7,
            lifeExpectancyPostRetirment: 20,
            retirement_yr: 30,
            fv: '1,72,305',
            corpus_month: '1,74,74,820',
            corpus_exist: '50,81,743',
            corpus_ach: '3,76,72,712',
            shortfall_amt: '1,51,16,147',
            sip_amount: '4,953',
            loded: true


        }


    }
    handleCategory = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    calculateRetirment = (e) => {
        this.setState({ popupNegative: null, note: null });

        this.setState({ loded: !this.state.loded })
        console.log("!this.state.loded", !this.state.loded);
        // var lumpsum = this.state.childAge * Math.pow((1 + this.state.tanureYear / 100), this.state.rateIntrest);
        // this.setState({ gains: lumpsum });
        // console.log("gains",this.state.gains);
        const data = {
            childAge: this.state.childAge,
            retirementAge: this.state.retirementAge,
            currentLifestyle: this.state.currentLifestyle,
            inflationRate: this.state.inflationRate,
            currentSaving: this.state.currentSaving,
            existingCorpus: this.state.existingCorpus,
            expectedPreRetirment: this.state.expectedPreRetirment,
            expectedPostRetirment: this.state.expectedPostRetirment,
            lifeExpectancyPostRetirment: this.state.lifeExpectancyPostRetirment,
        };

        axios.post('http://localhost:5010/api/retirment', data).then((res) => {
            // console.log("lllllll", res.data);
            this.setState({
                retirement_yr: res.data.retirement_yr,
                fv: res.data.fv,
                sip_amount: res.data.data,
                corpus_month: res.data.corpus_month,
                corpus_exist: res.data.corpus_exist,
                corpus_ach: res.data.corpus_ach,
                shortfall_amt: res.data.shortfall_amt,
                loded: true

            })
            var withoutComma = this.state.shortfall_amt.replace(/,/g, "")
            var withoutComma = parseInt(withoutComma)
            if (withoutComma < 0) {
                console.log("negative ", withoutComma)
                this.setState({ note: "Note:", popupNegative: " Your existing savings are enough to meet this goal, you can utilize the excess saving to achieve your other goals" });

                console.log(this.state.popupNegative);
            } else {
                console.log("positive ", withoutComma)

            }


        })




    }
    incchildAge = (e) => {
        if (this.state.childAge) {
            this.setState({ childAge: parseInt(this.state.childAge) + 1 })
        } else if (this.state.childAge == 0) {
            this.setState({ childAge: parseInt(this.state.childAge) + 1 })
        }
    }
    decchildAge = (e) => {
        if (this.state.childAge || this.state.childAge == 0) {
            if (this.state.childAge > 0) {
                this.setState({ childAge: parseInt(this.state.childAge) - 1 })
            }
        }
    }
    incretirementAge = (e) => {
        if (this.state.retirementAge || this.state.retirementAge == 0) {
            // if (this.state.retirementAge < 70)
            this.setState({ retirementAge: parseInt(this.state.retirementAge) + 1 })
        }
    }
    decretirementAge = (e) => {
        if (this.state.retirementAge || this.state.retirementAge == 0) {
            if (this.state.retirementAge > 0)
                this.setState({ retirementAge: parseInt(this.state.retirementAge) - 1 })
        }
    }
    inccurrentLifestyle = (e) => {
        if (this.state.currentLifestyle) {
            this.setState({ currentLifestyle: parseInt(this.state.currentLifestyle) + 500 })
        } else if (this.state.currentLifestyle == 0) {
            this.setState({ currentLifestyle: parseInt(this.state.currentLifestyle) + 500 })
        }
    }
    deccurrentLifestyle = (e) => {
        if (this.state.currentLifestyle >= 500) {
            this.setState({ currentLifestyle: parseInt(this.state.currentLifestyle) - 500 })
        } else if (this.state.currentLifestyle < 499) {
            this.setState({ currentLifestyle: 0 })
        }
    }

    incinflationRate = (e) => {
        if (this.state.inflationRate) {
            this.setState({ inflationRate: parseInt(this.state.inflationRate) + 1 })
        } else if (this.state.inflationRate == 0) {
            this.setState({ inflationRate: parseInt(this.state.inflationRate) + 1 })
        }
    }
    decinflationRate = (e) => {
        if (this.state.inflationRate) {
            if (this.state.inflationRate > 0)
                this.setState({ inflationRate: parseInt(this.state.inflationRate) - 1 })
        }
    }

    inccurrentSaving = (e) => {
        if (this.state.currentSaving || this.state.currentSaving == 0) {
            this.setState({ currentSaving: parseInt(this.state.currentSaving) + 500 })
        }
    }
    deccurrentSaving = (e) => {
        if (this.state.currentSaving || this.state.currentSaving == 0) {
            this.setState({ currentSaving: parseInt(this.state.currentSaving) - 500 })
        }
    }

    incexistingCorpus = (e) => {
        if (this.state.existingCorpus) {
            this.setState({ existingCorpus: parseInt(this.state.existingCorpus) + 500 })
        } else if (this.state.existingCorpus == 0) {
            this.setState({ existingCorpus: parseInt(this.state.existingCorpus) + 500 })
        }
    }
    decexistingCorpus = (e) => {
        if (this.state.existingCorpus >= 500) {
            this.setState({ existingCorpus: parseInt(this.state.existingCorpus) - 500 })
        } else if (this.state.existingCorpus < 499) {
            this.setState({ existingCorpus: 0 })
        }
    }

    incexpectedPreRetirment = (e) => {
        if (this.state.expectedPreRetirment || this.state.expectedPreRetirment == 0) {
            if (this.state.expectedPreRetirment < 30)
                this.setState({ expectedPreRetirment: parseInt(this.state.expectedPreRetirment) + 1 })
        }
    }
    decexpectedPreRetirment = (e) => {
        if (this.state.expectedPreRetirment || this.state.expectedPreRetirment == 0) {
            if (this.state.expectedPreRetirment > 0)
                this.setState({ expectedPreRetirment: parseInt(this.state.expectedPreRetirment) - 1 })
        }
    }

    incexpectedPostRetirment = (e) => {
        if (this.state.expectedPostRetirment || this.state.expectedPostRetirment == 0) {
            if (this.state.expectedPostRetirment < 30)
                this.setState({ expectedPostRetirment: parseInt(this.state.expectedPostRetirment) + 1 })
        }
    }
    decexpectedPostRetirment = (e) => {
        if (this.state.expectedPostRetirment || this.state.expectedPostRetirment == 0) {
            if (this.state.expectedPostRetirment > 0)
                this.setState({ expectedPostRetirment: parseInt(this.state.expectedPostRetirment) - 1 })
        }
    }

    inclifeExpectancyPostRetirment = (e) => {
        if (this.state.lifeExpectancyPostRetirment || this.state.lifeExpectancyPostRetirment == 0) {
            if (this.state.lifeExpectancyPostRetirment < 60)
                this.setState({ lifeExpectancyPostRetirment: parseInt(this.state.lifeExpectancyPostRetirment) + 1 })
        }
    }
    declifeExpectancyPostRetirment = (e) => {
        if (this.state.lifeExpectancyPostRetirment || this.state.lifeExpectancyPostRetirment == 0) {
            if (this.state.lifeExpectancyPostRetirment > 0)
                this.setState({ lifeExpectancyPostRetirment: parseInt(this.state.lifeExpectancyPostRetirment) - 1 })
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
 
            
            .result-content.text-center .text-label.font-weight-500.py-2 {
            min-height:65px;
            }
            input::-webkit-outer-spin-button,
                input::-webkit-inner-spin-button {
                  -webkit-appearance: none;
                  margin: 0;
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
                                                        <Link class="nav-link " to="/prodigypro/dashboard/marriage-planning-pro"><img src={ring} className="new-icon" alt='' />  <span>Marriage
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
                                                        <Link class="nav-link active" to="/prodigypro/dashboard/retirement-planning-pro"><img src={retirement} className="new-icon" alt='' /><span>Retirement
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

                                                                        <div className="row" >

                                                                            {/*first*/}

                                                                            <div className="col-md-4 text-center">
                                                                                <label for="m-saving" className="text-label font-weight-500 py-2 fs-14">
                                                                                    Current Age (Years)
                                                                                </label>
                                                                                <div className="d-flex inputf transcard">
                                                                                    <img src={minus} alt="" className="img-fluid max-27" onClick={this.decchildAge}></img>
                                                                                    <input type="number" className="form-control" name="childAge" onChange={this.handleCategory} value={this.state.childAge} />
                                                                                    <img src={plus} alt="" className="img-fluid max-27" onClick={this.incchildAge}></img>
                                                                                </div>
                                                                            </div>
                                                                            <div className="col-md-4 text-center">
                                                                                <label for="year" className="text-label font-weight-500 py-2 fs-14">
                                                                                    Expected retirement age (Years)
                                                                                </label>
                                                                                <div className="d-flex inputf transcard">
                                                                                    <img src={minus} alt="" className="img-fluid max-27" onClick={this.decretirementAge}></img>
                                                                                    <input type="number" className="form-control" name="retirementAge" onChange={this.handleCategory} value={this.state.retirementAge} />
                                                                                    <img src={plus} alt="" className="img-fluid max-27" onClick={this.incretirementAge}></img>
                                                                                </div>
                                                                            </div>
                                                                            <div className="col-md-4 text-center">
                                                                                <label for="return" className="text-label font-weight-500 py-2 fs-14">
                                                                                    Monthly expenses for current lifestyle(₹/M)
                                                                                </label>
                                                                                <div className="d-flex inputf transcard">
                                                                                    <img src={minus} alt="" className="img-fluid max-27" onClick={this.deccurrentLifestyle}></img>
                                                                                    <input type="number" className="form-control" name="currentLifestyle" onChange={this.handleCategory} value={this.state.currentLifestyle} />
                                                                                    <img src={plus} alt="" className="img-fluid max-27" onClick={this.inccurrentLifestyle}></img>
                                                                                </div>
                                                                            </div>

                                                                        </div>


                                                                        {/*second*/}

                                                                        <div className="row" >
                                                                            <div className="col-md-4 text-center">
                                                                                <label for="m-saving" className="text-label font-weight-500 py-2 fs-14">
                                                                                    Expected inflation rate (% p.a)
                                                                                </label>
                                                                                <div className="d-flex inputf transcard">
                                                                                    <img src={minus} alt="" className="img-fluid max-27" onClick={this.decinflationRate}></img>
                                                                                    <input type="number" className="form-control" name="inflationRate" onChange={this.handleCategory} value={this.state.inflationRate} />
                                                                                    <img src={plus} alt="" className="img-fluid max-27" onClick={this.incinflationRate}></img>
                                                                                </div>
                                                                            </div>
                                                                            <div className="col-md-4 text-center">
                                                                                <label for="year" className="text-label font-weight-500 py-2 fs-14">
                                                                                    Current saving per month (₹)
                                                                                </label>
                                                                                <div className="d-flex inputf transcard">
                                                                                    <img src={minus} alt="" className="img-fluid max-27" onClick={this.deccurrentSaving}></img>
                                                                                    <input type="number" className="form-control" name="currentSaving" onChange={this.handleCategory} value={this.state.currentSaving} />
                                                                                    <img src={plus} alt="" className="img-fluid max-27" onClick={this.inccurrentSaving}></img>
                                                                                </div>
                                                                            </div>
                                                                            <div className="col-md-4 text-center">
                                                                                <label for="return" className="text-label font-weight-500 py-2 fs-14">
                                                                                    Existing Corpus(₹)
                                                                                </label>
                                                                                <div className="d-flex inputf transcard">
                                                                                    <img src={minus} alt="" className="img-fluid max-27" onClick={this.decexistingCorpus}></img>
                                                                                    <input type="number" className="form-control" name="existingCorpus" onChange={this.handleCategory} value={this.state.existingCorpus} />
                                                                                    <img src={plus} alt="" className="img-fluid max-27" onClick={this.incexistingCorpus}></img>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="row">
                                                                            <div className="col-md-4 text-center">
                                                                                <label for="m-saving" className="text-label font-weight-500 py-2 fs-14">
                                                                                    Expected pre retirement returns (% p.a)
                                                                                </label>
                                                                                <div className="d-flex inputf transcard">
                                                                                    <img src={minus} alt="" className="img-fluid max-27" onClick={this.decexpectedPreRetirment}></img>
                                                                                    <input type="number" className="form-control" name="expectedPreRetirment" onChange={this.handleCategory} value={this.state.expectedPreRetirment} />
                                                                                    <img src={plus} alt="" className="img-fluid max-27" onClick={this.incexpectedPreRetirment}></img>
                                                                                </div>
                                                                            </div>
                                                                            <div className="col-md-4 text-center">
                                                                                <label for="year" className="text-label font-weight-500 py-2 fs-14">
                                                                                    Expected post retirement returns (% p.a)
                                                                                </label>
                                                                                <div className="d-flex inputf transcard">
                                                                                    <img src={minus} alt="" className="img-fluid max-27" onClick={this.decexpectedPostRetirment}></img>
                                                                                    <input type="number" className="form-control" name="expectedPostRetirment" onChange={this.handleCategory} value={this.state.expectedPostRetirment} />
                                                                                    <img src={plus} alt="" className="img-fluid max-27" onClick={this.incexpectedPostRetirment}></img>
                                                                                </div>
                                                                            </div>
                                                                            <div className="col-md-4 text-center">
                                                                                <label for="return" className="text-label font-weight-500 py-2 fs-14">
                                                                                    Life Expectancy Post retirement(year)
                                                                                </label>
                                                                                <div className="d-flex inputf transcard">
                                                                                    <img src={minus} alt="" className="img-fluid max-27" onClick={this.declifeExpectancyPostRetirment}></img>
                                                                                    <input type="number" className="form-control" name="lifeExpectancyPostRetirment" onChange={this.handleCategory} value={this.state.lifeExpectancyPostRetirment} />
                                                                                    <img src={plus} alt="" className="img-fluid max-27" onClick={this.inclifeExpectancyPostRetirment}></img>
                                                                                </div>
                                                                            </div>


                                                                        </div>

                                                                        <div className="col-md-12  text-right pt-4">
                                                                            <button className="new-btn1" onClick={this.calculateRetirment}>Calculate</button>
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




                                                                        <div className="col-md-12 result-title text-center pt-3">
                                                                            <h3>Result</h3>
                                                                        </div>

                                                                        <div className="col-md-12 px-5 pt-3">
                                                                            <div className="row result-content text-center">
                                                                                <div className="col-md-4">
                                                                                    <div className="text-label font-weight-500 py-2 fs-14">
                                                                                        Year to retirement (Years)
                                                                                    </div>
                                                                                    <div className="inputf transcard bg-light-red py-2">{this.state.retirement_yr}</div>
                                                                                </div>
                                                                                <div className="col-md-4">
                                                                                    <div className="text-label font-weight-500 py-2 fs-14">
                                                                                        Amount Required P.M.-Post <br />Retirement (₹)
                                                                                    </div>
                                                                                    <div className="inputf transcard bg-light-red py-2">{this.state.fv}</div>
                                                                                </div>
                                                                                <div className="col-md-4">
                                                                                    <div className="text-label font-weight-500 py-2 fs-14">
                                                                                        Corpus to be Achived @ <br />Retirement(₹)
                                                                                    </div>
                                                                                    <div className="inputf transcard bg-light-red py-2">{this.state.corpus_ach}</div>
                                                                                </div>
                                                                            </div>


                                                                            <div className="row result-content text-center pt-3">
                                                                                <div className="col-md-4">
                                                                                    <div className="text-label font-weight-500 py-2 fs-14">
                                                                                        Corpus you will accumulate with current savings per month(₹)
                                                                                    </div>
                                                                                    <div className="inputf transcard bg-light-red py-2">{this.state.corpus_month}</div>
                                                                                </div>
                                                                                <div className="col-md-4">
                                                                                    <div className="text-label font-weight-500 py-2 fs-14">
                                                                                        Corpus yoy will accumulate with existing savings (₹)
                                                                                    </div>
                                                                                    <div className="inputf transcard bg-light-red py-2">{this.state.corpus_exist}</div>
                                                                                </div>
                                                                                <div className="col-md-4">
                                                                                    <div className="text-label font-weight-500 py-2 fs-14">
                                                                                        Shortfall in amount(₹)
                                                                                    </div>
                                                                                    <div className="inputf transcard bg-light-red py-2">{this.state.shortfall_amt}</div>

                                                                                </div>
                                                                            </div>
                                                                        </div>

                                                                        <div className="col-md-12 px-5 pt-3">
                                                                            <div className="col-md-12 result-title text-center py-3">
                                                                                <h3>Plan of action required</h3>
                                                                            </div>
                                                                            <div className="result-content text-center">

                                                                                <div className="text-label font-weight-500 py-2 fs-14">
                                                                                    Extra savings per month required(₹)
                                                                                </div>
                                                                                <div className="inputf transcard bg-light-red py-2">{this.state.sip_amount}</div>



                                                                            </div>

                                                                        </div>
                                                                        <div className="text-label font-weight-500 py-2 pt-5 text-danger pl-5" > <b>{this.state.note}</b>
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

export default Retirement_Planning_Pro 