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
// import 'animate.css';
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
class Education_Planning_Pro extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            childAge: 12,
            collegeAge: 18,
            educationTime: 5,
            currentCost: 250000,
            expReturnRate: 12,
            inflationRate: 5,
            lumpsum: '7,25,722',
            sip_amount: '13,505',
            totalAmtRequired: '13,86,012',
            loded: true


        }
    }

    handleCategory = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    calculateEducation = (e) => {
        this.setState({ loded: !this.state.loded });

        // var lumpsum = this.state.childAge * Math.pow((1 + this.state.tanureYear / 100), this.state.rateIntrest);
        // this.setState({ gains: lumpsum });
        // console.log("gains",this.state.gains);
        const data = {
            childAge: this.state.childAge,
            collegeAge: this.state.collegeAge,
            educationTime: this.state.educationTime,
            currentCost: this.state.currentCost,
            expReturnRate: this.state.expReturnRate,
            inflationRate: this.state.inflationRate
        };

        axios.post('http://localhost:5010/api/education', data).then((res) => {
            console.log("lllllll", res.data);
            this.setState({
                sip_amount: res.data.data,
                totalAmtRequired: res.data.totalAmtRequired,
                lumpsum: res.data.lumpsum,
                loded: true


            })


        })




    }
    incChildAge = (e) => {
        if (this.state.childAge) {
            this.setState({ childAge: parseInt(this.state.childAge) + 1 })
        } else if (this.state.childAge == 0) {
            this.setState({ childAge: parseInt(this.state.childAge) + 1 })
        }
    }
    decChildAge = (e) => {
        if (this.state.childAge) {
            this.setState({ childAge: parseInt(this.state.childAge) - 1 })
        }
    }
    incCollegeAge = (e) => {
        if (this.state.collegeAge) {
            this.setState({ collegeAge: parseInt(this.state.collegeAge) + 1 })
        } else if (this.state.collegeAge == 0) {
            this.setState({ collegeAge: parseInt(this.state.collegeAge) + 1 })
        }
    }
    decCollegeAge = (e) => {
        if (this.state.collegeAge) {
            this.setState({ collegeAge: parseInt(this.state.collegeAge) - 1 })
        } else if (this.state.collegeAge < 499) {
            this.setState({ collegeAge: 0 })
        }
    }
    incEducationTime = (e) => {
        if (this.state.educationTime || this.state.educationTime == 0) {
            if (this.state.educationTime < 35)
                this.setState({ educationTime: parseInt(this.state.educationTime) + 1 })
        }
    }
    decEducationTime = (e) => {
        if (this.state.educationTime) {
            this.setState({ educationTime: parseInt(this.state.educationTime) - 1 })
        }
    }

    incCurrentCost = (e) => {
        if (this.state.currentCost) {
            this.setState({ currentCost: parseInt(this.state.currentCost) + 500 })
        } else if (this.state.currentCost == 0) {
            this.setState({ currentCost: parseInt(this.state.currentCost) + 500 })
        }
    }
    decCurrentCost = (e) => {
        if (this.state.currentCost >= 500) {
            this.setState({ currentCost: parseInt(this.state.currentCost) - 500 })
        } else if (this.state.currentCost < 499) {
            this.setState({ currentCost: 0 })
        }
    }

    incExpReturnRate = (e) => {
        if (this.state.expReturnRate || this.state.expReturnRate == 0) {
            this.setState({ expReturnRate: parseInt(this.state.expReturnRate) + 1 })
        }
    }
    decExpReturnRate = (e) => {
        if (this.state.expReturnRate) {
            this.setState({ expReturnRate: parseInt(this.state.expReturnRate) - 1 })
        }
    }

    incInflationRate = (e) => {
        if (this.state.inflationRate) {
            this.setState({ inflationRate: parseInt(this.state.inflationRate) + 1 })
        } else if (this.state.inflationRate == 0) {
            this.setState({ inflationRate: parseInt(this.state.inflationRate) + 1 })
        }
    }
    decInflationRate = (e) => {
        if (this.state.inflationRate) {
            this.setState({ inflationRate: parseInt(this.state.inflationRate) - 1 })
        } else if (this.state.inflationRate < 499) {
            this.setState({ inflationRate: 0 })
        }
    }


    render() {

        return (
            <>
                <Helmet>
                    <title>Calculators - Prodigy Pro</title>
                </Helmet> <style>
                    {`
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
                                                        <Link class="nav-link active" to="/prodigypro/dashboard/education-planning-pro"><img src={education} className="new-icon" alt='' /> <span>Education
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
                                                        <Link class="nav-link " to="/prodigypro/dashboard/retirement-planning-pro"><img src={retirement} className="new-icon" alt='' /><span>Retirement
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
                                                                                    <img src={minus} alt="" className="img-fluid max-27" onClick={this.decChildAge}></img>
                                                                                    <input type="number" className="form-control" name="childAge" onChange={this.handleCategory} value={this.state.childAge} />
                                                                                    <img src={plus} alt="" className="img-fluid max-27" onClick={this.incChildAge}></img>
                                                                                </div>
                                                                            </div>
                                                                            <div className="col-md-4 text-center">
                                                                                <label for="year" className="text-label font-weight-500 py-2 fs-14">
                                                                                    Start college at age (Years)
                                                                                </label>
                                                                                <div className="d-flex inputf transcard">
                                                                                    <img src={minus} alt="" className="img-fluid max-27" onClick={this.decCollegeAge} ></img>
                                                                                    <input type="number" className="form-control" name="collegeAge" onChange={this.handleCategory} value={this.state.collegeAge} />
                                                                                    <img src={plus} alt="" className="img-fluid max-27" onClick={this.incCollegeAge}></img>
                                                                                </div>
                                                                            </div>
                                                                            <div className="col-md-4 text-center">
                                                                                <label for="return" className="text-label font-weight-500 py-2 fs-14">
                                                                                    Duration of education(Years)
                                                                                </label>
                                                                                <div className="d-flex inputf transcard">
                                                                                    <img src={minus} alt="" className="img-fluid max-27" onClick={this.decEducationTime}></img>
                                                                                    <input type="number" className="form-control" name="educationTime" onChange={this.handleCategory} value={this.state.educationTime} />
                                                                                    <img src={plus} alt="" className="img-fluid max-27" onClick={this.incEducationTime}></img>
                                                                                </div>
                                                                            </div>

                                                                        </div>

                                                                        {/*second*/}

                                                                        <div className="row" >
                                                                            <div className="col-md-4 text-center">
                                                                                <label for="m-saving" className="text-label font-weight-500 py-2 fs-14">
                                                                                    Approx current cost per year(₹)
                                                                                </label>
                                                                                <div className="d-flex inputf transcard">
                                                                                    <img src={minus} alt="" className="img-fluid max-27" onClick={this.decCurrentCost}></img>
                                                                                    <input type="number" className="form-control" name="currentCost" onChange={this.handleCategory} value={this.state.currentCost} />
                                                                                    <img src={plus} alt="" className="img-fluid max-27" onClick={this.incCurrentCost}></img>
                                                                                </div>
                                                                            </div>
                                                                            <div className="col-md-4 text-center">
                                                                                <label for="year" className="text-label font-weight-500 py-2 fs-14">
                                                                                    Expected rate of return(%)
                                                                                </label>
                                                                                <div className="d-flex inputf transcard">
                                                                                    <img src={minus} alt="" className="img-fluid max-27" onClick={this.decExpReturnRate}></img>
                                                                                    <input type="number" className="form-control" name="expReturnRate" onChange={this.handleCategory} value={this.state.expReturnRate} />
                                                                                    <img src={plus} alt="" className="img-fluid max-27" onClick={this.incExpReturnRate}></img>
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
                                                                        <div className="col-md-12  text-right mt-3">

                                                                            <button className="new-btn1" onClick={this.calculateEducation}>Calculate</button>

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

                                                                        <div className="col-md-12 px-5 pt-4">
                                                                            <div className="col-md-12 result-title text-center py-3">
                                                                                <h3>Result</h3>
                                                                            </div>
                                                                            <div className="result-content col-md-12 text-center">

                                                                                <div className="text-label font-weight-500 py-2">
                                                                                    Corpus required at start of college (₹)
                                                                                </div>
                                                                                <div className="inputf transcard bg-light-red py-2">{this.state.totalAmtRequired}</div>

                                                                            </div>
                                                                        </div>
                                                                        <div className="col-md-12 px-5 pt-4">
                                                                            <div className="col-md-12 result-title text-center py-3">
                                                                                <h3>Plan of action required</h3>
                                                                            </div>
                                                                            <div className="row result-content text-center">
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
export default Education_Planning_Pro