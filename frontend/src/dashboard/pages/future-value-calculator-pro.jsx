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
import axios from "axios";
// import futurevalue from "../../assets/images/icons/New folder (2)/future_value.png";
import { Doughnut } from "react-chartjs-2";


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


class Future_Value_Calculator_Pro extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            investment: 25000,
            period: 10,
            returnValue: 12,
            lumpsum: 77646.00,
            gains: 52646,
            loded: true

        }


    }


    handleCategory = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }
    calculateFD = (e) => {
        this.setState({ loded: !this.state.loded });

        const data = {
            investment: this.state.investment,
            period: this.state.period,
            returnValue: this.state.returnValue
        };

        axios.post('http://localhost:5010/api/lumpsum', data).then((res) => {
            console.log("lllllll", res.data.data);
            this.setState({
                lumpsum: res.data.data.lumpsum,
                gains: res.data.data.gains,
                loded: true
            })


        })




    }
    incInvest = (e) => {
        if (this.state.investment) {
            this.setState({ investment: parseInt(this.state.investment) + 500 })
        } else if (this.state.investment == 0) {
            this.setState({ investment: parseInt(this.state.investment) + 500 })
        }
    }
    decInvest = (e) => {
        if (this.state.investment >= 500) {
            this.setState({ investment: parseInt(this.state.investment) - 500 })
        } else if (this.state.investment < 499) {
            this.setState({ investment: 0 })
        }
    }

    incPeriod = (e) => {
        if (this.state.period < 50) {
            this.setState({ period: parseInt(this.state.period) + 1 })
        }
    }
    decPeriod = (e) => {
        if (this.state.period >= 1) {
            this.setState({ period: parseInt(this.state.period) - 1 })
        }
    }

    incReturnValue = (e) => {
        if (this.state.returnValue) {
            this.setState({ returnValue: parseInt(this.state.returnValue) + 1 })
        }
    }
    decReturnValue = (e) => {
        if (this.state.returnValue > 1) {
            this.setState({ returnValue: parseInt(this.state.returnValue) - 1 })
        }
    }


    render() {

        const data = {

            datasets: [
                {
                    data: [this.state.investment, this.state.gains.toFixed(2)],
                    backgroundColor: ["#F06D70", "#97C5FB"],
                }
            ],
            labels: ["Present Value", "Gain"]
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
                    {/* <div id="overlay">
            <div className="spinner"></div>
            <br />Loading...
        </div> */}

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

                                                            <img src={sipc} className="new-icon" alt='' /> <span> SIP Calculator</span>


                                                        </Link>
                                                    </li>
                                                </div>
                                                <div className="col-md-3">
                                                    <li class="nav-item">
                                                        <Link class="nav-link " to="/prodigypro/dashboard/marriage-planning-pro">
                                                            <img src={ring} className="new-icon" alt='' /> <span>Marriage
                                                                Planning</span></Link>
                                                    </li>
                                                </div>
                                                <div className="col-md-3">
                                                    <li class="nav-item">
                                                        <Link class="nav-link" to="/prodigypro/dashboard/education-planning-pro">
                                                            <img src={education} className="new-icon" alt='' /> <span>Education
                                                                Planning</span></Link>
                                                    </li>
                                                </div>
                                                <div className="col-md-3 ">
                                                    <li class="nav-item">
                                                        <Link class="nav-link active"
                                                            to="/prodigypro/dashboard/future-value-calculator-pro"><img
                                                                src={futurec} className="new-icon" alt='' /><span>Future Value
                                                                    Calculator</span></Link>
                                                    </li>
                                                </div>
                                                <div className="col-md-3 mt-3">
                                                    <li class="nav-item">
                                                        <Link class="nav-link" to="/prodigypro/dashboard/retirement-planning-pro">
                                                            <img src={retirement} className="new-icon" alt='' /><span>Retirement
                                                                Planning</span></Link>
                                                    </li>
                                                </div>
                                                <div className="col-md-3 mt-3">
                                                    <li class="nav-item">
                                                        <Link class="nav-link " to="/prodigypro/dashboard/emi-calculator-pro"><img
                                                            src={emi} className="new-icon" alt='' /><span>EMI
                                                                Calculator</span></Link>
                                                    </li>
                                                </div>
                                                <div className="col-md-3 mt-3">
                                                    <li class="nav-item">
                                                        <Link class="nav-link" to="/prodigypro/dashboard/fd-calculator-pro"><img
                                                            src={fd} className="new-icon" alt='' /><span>FD
                                                                Calculator</span></Link>
                                                    </li>
                                                </div>
                                                <div className="col-md-3 mt-3">
                                                    <li class="nav-item">
                                                        <Link class="nav-link" to="/prodigypro/dashboard/elss-calculator-pro"><img
                                                            src={elss} className="new-icon" alt='' /><span>ELSS
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
                                                                                <label for="m-saving"
                                                                                    className="text-label font-weight-500 py-2">
                                                                                    Investment(₹)
                                                                                </label>
                                                                                <div className="d-flex inputf transcard">
                                                                                    <img src={minus} alt="" onClick={this.decInvest}
                                                                                        className="img-fluid max-27"></img>
                                                                                    <input type="number" className="form-control" onChange={this.handleCategory} value={this.state.investment}
                                                                                        name="investment" />
                                                                                    <img src={plus} alt="" onClick={this.incInvest}
                                                                                        className="img-fluid max-27"></img>
                                                                                </div>
                                                                            </div>
                                                                            <div className="col-md-4 text-center">
                                                                                <label for="year"
                                                                                    className="text-label font-weight-500 py-2">
                                                                                    Period (Years)
                                                                                </label>
                                                                                <div className="d-flex inputf transcard">
                                                                                    <img src={minus} alt="" onClick={this.decPeriod}
                                                                                        className="img-fluid max-27"></img>
                                                                                    <input type="number" className="form-control" onChange={this.handleCategory} value={this.state.period}
                                                                                        name="period" />
                                                                                    <img src={plus} alt="" onClick={this.incPeriod}
                                                                                        className="img-fluid max-27"></img>
                                                                                </div>
                                                                            </div>
                                                                            <div className="col-md-4 text-center">
                                                                                <label for="return"
                                                                                    className="text-label font-weight-500 py-2">
                                                                                    Expected Rate of Return (% p.a)
                                                                                </label>
                                                                                <div className="d-flex inputf transcard">
                                                                                    <img src={minus} alt="" onClick={this.decReturnValue}
                                                                                        className="img-fluid max-27"></img>
                                                                                    <input type="number" className="form-control" onChange={this.handleCategory} value={this.state.returnValue}
                                                                                        name="returnValue" />
                                                                                    <img src={plus} alt="" onClick={this.incReturnValue}
                                                                                        className="img-fluid max-27"></img>
                                                                                </div>
                                                                            </div>


                                                                        </div>
                                                                        <div className="col-md-12 pt-2 mt-1 text-right">
                                                                            <button className="new-btn1 mt-3" onClick={this.calculateFD}> Calculate</button>
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

                                                                    <div className="row shadowc  br-50 mx-3">
                                                                        <div className="col-md-4">
                                                                            <div className="result-content result-content-shadow">
                                                                                <ul className="text-center">
                                                                                    <li>
                                                                                        <div
                                                                                            className="text-label font-weight-500 py-2">
                                                                                            Present Value(₹)
                                                                                        </div>
                                                                                        <div
                                                                                            className="inputf transcard bg-white py-2">
                                                                                            {this.state.investment}</div>
                                                                                    </li>
                                                                                    <li>
                                                                                        <div
                                                                                            className="text-label font-weight-500 py-2">
                                                                                            Gain(₹)
                                                                                        </div>
                                                                                        <div
                                                                                            className="inputf transcard bg-white py-2">
                                                                                            {this.state.gains}</div>
                                                                                    </li>
                                                                                    <li>
                                                                                        <div
                                                                                            className="text-label font-weight-500 py-2">
                                                                                            Future Value(₹)
                                                                                        </div>
                                                                                        <div
                                                                                            className="inputf transcard bg-white py-2">
                                                                                            {this.state.lumpsum}</div>
                                                                                    </li>

                                                                                </ul>
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-md-8  pt-5">
                                                                            <div className="result-title text-center">
                                                                                <h2>Result</h2>
                                                                            </div>
                                                                            <div className="pt-4">
                                                                                <Doughnut data={data} />
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

export default Future_Value_Calculator_Pro