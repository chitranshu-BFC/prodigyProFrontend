import React from "react";
import { Link } from "react-router-dom";
import Header from './header';
import Footer from './footer';
import { Helmet } from "react-helmet";
import sipc from "../../assets/images/icons/New folder (2)/budget.png";
import ring from "../../assets/images/icons/New folder (2)/rings.png";
import education from "../../assets/images/icons/New folder (2)/education.png";
import emi from "../../assets/images/icons/New folder (2)/calculatorfuture.png";
import retirement from "../../assets/images/icons/New folder (2)/retirement.png";
import futurec from "../../assets/images/icons/New folder (2)/calculator.png";
import minus from "../../assets/images/icons/New folder (2)/minus_3(1).png";
import plus from "../../assets/images/icons/New folder (2)/add_3(1).png";
import { Doughnut } from "react-chartjs-2";
import fd from "../../assets/images/icons/New folder (2)/fd.png";
import elss from "../../assets/images/icons/New folder (2)/elss.png";
import Request_A_Call_Back from "../request-a-call-back";
import axios from 'axios';
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
class EMI_Calculator_Pro extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loanAmount: 25000,
            rateIntrest: 10,
            tanureYear: 12,
            lumpsum: 77646.00,
            gains: 52646,
            loan_amount: 0,
            loded: true

        }


    }

    handleCategory = (e) => {
        console.log("e.target.value",e.target.value);
        this.setState({ [e.target.name]: e.target.value });
    }
    calculateEMI = (e) => {
        this.setState({ loded: !this.state.loded })
        // var lumpsum = this.state.loanAmount * Math.pow((1 + this.state.tanureYear / 100), this.state.rateIntrest);
        // this.setState({ gains: lumpsum });
        // console.log("gains",this.state.gains);
        const data = {
            loanAmount: this.state.loanAmount,
            rateIntrest: this.state.rateIntrest,
            tanureYear: this.state.tanureYear
        };

        axios.post('http://localhost:5010/api/emi', data).then((res) => {
            console.log("lllllll", res.data.data);
            this.setState({
                emi: res.data.data.emi,
                loan_amount: res.data.data.loan_amount,
                total_interest: res.data.data.total_interest,
                total_amount: res.data.data.total_amount,
                loded: true

            })


        })




    }
    incInvest = (e) => {
        if (this.state.loanAmount) {
            this.setState({ loanAmount: parseInt(this.state.loanAmount) + 500 })
        } else if (this.state.loanAmount == 0) {
            this.setState({ loanAmount: parseInt(this.state.loanAmount) + 500 })
        }
    }
    decInvest = (e) => {
        if (this.state.loanAmount >= 500) {
            this.setState({ loanAmount: parseInt(this.state.loanAmount) - 500 })
        } else if (this.state.loanAmount < 499) {
            this.setState({ loanAmount: 0 })
        }
    }

    incrateIntrest = (e) => {
        if (this.state.rateIntrest < 50) {
            this.setState({ rateIntrest: parseInt(this.state.rateIntrest) + 1 })
        }
    }
    decrateIntrest = (e) => {
        if (this.state.rateIntrest >= 1) {
            this.setState({ rateIntrest: parseInt(this.state.rateIntrest) - 1 })
        }
    }

    inctanureYear = (e) => {
        if (this.state.tanureYear) {
            this.setState({ tanureYear: parseInt(this.state.tanureYear) + 1 })
        }
    }
    dectanureYear = (e) => {
        if (this.state.tanureYear > 1) {
            this.setState({ tanureYear: parseInt(this.state.tanureYear) - 1 })
        }
    }
    render() {
        const data1 = {

            datasets: [
                {
                    label: "Hours Studied in Geeksforgeeks",
                    data: [this.state.total_interest ? this.state.total_interest : 18056, this.state.loan_amount ? this.state.loan_amount : 25000],
                    backgroundColor: ["#F06D70", "#97C5FB"],
                }
            ],
            labels: ["Total Interest", "Principle Amount"]
        }
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
                                                        <Link class="nav-link" to="/prodigypro/dashboard/sip-calculator-pro">
                                                            <img src={sipc} className="new-icon" alt='' />  <span>   SIP Calculator</span>
                                                        </Link>
                                                    </li>
                                                </div>
                                                <div className="col-md-3">
                                                    <li class="nav-item">
                                                        <Link class="nav-link" to="/prodigypro/dashboard/marriage-planning-pro"><img src={ring} className="new-icon" alt='' />  <span>Marriage
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
                                                        <Link class="nav-link active" to="/prodigypro/dashboard/emi-calculator-pro"><img src={emi} className="new-icon" alt='' /><span>EMI
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
                                                                        <div className="row">

                                                                            <div className="col-md-4 text-center">
                                                                                <label for="m-saving" className="text-label font-weight-500 py-2">
                                                                                    Enter loan amount (₹)
                                                                                </label>
                                                                                <div className="d-flex inputf transcard">
                                                                                    <img src={minus} alt="" onClick={this.decInvest}
                                                                                        className="img-fluid max-27"></img>
                                                                                    <input type="number" className="form-control" onChange={this.handleCategory} value={this.state.loanAmount}
                                                                                        name="loanAmount" />
                                                                                    <img src={plus} alt="" onClick={this.incInvest}
                                                                                        className="img-fluid max-27"></img>
                                                                                </div>
                                                                            </div>
                                                                            <div className="col-md-4 text-center">
                                                                                <label for="year" className="text-label font-weight-500 py-2">
                                                                                    Enter Interest rate (%)
                                                                                </label>
                                                                                <div className="d-flex inputf transcard">
                                                                                    <img src={minus} alt="" onClick={this.decrateIntrest}
                                                                                        className="img-fluid max-27"></img>
                                                                                    <input type="number" className="form-control" onChange={this.handleCategory} value={this.state.rateIntrest}
                                                                                        name="rateIntrest" />
                                                                                    <img src={plus} alt="" onClick={this.incrateIntrest}
                                                                                        className="img-fluid max-27"></img>
                                                                                </div>
                                                                            </div>
                                                                            <div className="col-md-4 text-center">
                                                                                <label for="return" className="text-label font-weight-500 py-2">
                                                                                    Tenure (years)
                                                                                </label>
                                                                                <div className="d-flex inputf transcard">
                                                                                    <img src={minus} alt="" onClick={this.dectanureYear}
                                                                                        className="img-fluid max-27"></img>
                                                                                    <input type="number" className="form-control" onChange={this.handleCategory} value={this.state.tanureYear}
                                                                                        name="tanureYear" />
                                                                                    <img src={plus} alt="" onClick={this.inctanureYear}
                                                                                        className="img-fluid max-27"></img>
                                                                                </div>
                                                                            </div>


                                                                        </div>
                                                                        <div className="col-md-12 pt-2 text-right">
                                                                            <button className="new-btn1 mt-3" onClick={this.calculateEMI}> Calculate</button>
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
                                                                    <div className="row shadowc br-50 mx-3">
                                                                        <div className="col-md-4">
                                                                            <div className="result-content result-content-shadow">
                                                                                <ul className="text-center">
                                                                                    <li>
                                                                                        <div className="text-label font-weight-500 py-2">
                                                                                            EMI (₹)
                                                                                        </div>
                                                                                        <div className="inputf transcard bg-white py-2">{this.state.emi ? this.state.emi : 299}</div>
                                                                                    </li>
                                                                                    <li>
                                                                                        <div className="text-label font-weight-500 py-2">
                                                                                            Principal(₹)
                                                                                        </div>
                                                                                        <div className="inputf transcard bg-white py-2">{this.state.loan_amount ? this.state.loan_amount : 25000} </div>
                                                                                    </li>
                                                                                    <li>
                                                                                        <div className="text-label font-weight-500 py-2">
                                                                                            Total Interest(₹)
                                                                                        </div>
                                                                                        <div className="inputf transcard bg-white py-2">{this.state.total_interest ? this.state.total_interest : 18056}</div>
                                                                                    </li>
                                                                                    <li>
                                                                                        <div className="text-label font-weight-500 py-2">
                                                                                            Total Amount(₹)
                                                                                        </div>
                                                                                        <div className="inputf transcard bg-white py-2">{this.state.total_amount ? this.state.total_amount : 43056}</div>
                                                                                    </li>
                                                                                </ul>
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-md-8  py-5">
                                                                            <div className="result-title text-center">
                                                                                <h2>Result</h2>
                                                                            </div>
                                                                            <div className="pt-4">
                                                                                <Doughnut data={data1} />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="row px-5 pt-3">

                                                                        <div className="col-md-12 text-right">
                                                                            <a href="javascript:void(0);" className="btn-custom " data-target="#request-a-call" data-toggle="modal" type="button">Request a call back</a>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </section>
                                                    <section id="request-a-call-back">
                                                        <Request_A_Call_Back />
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
export default EMI_Calculator_Pro