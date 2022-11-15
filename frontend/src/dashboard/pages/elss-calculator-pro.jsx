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
import elsspic from "../../assets/images/icons/New folder (2)/elss (2).png";
import Select from 'react-select';
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
class Elss_Calculator_Pro extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            investment: 25000,
            period: 10,
            final: '3,900',
            loded: true

        }

    }
    handleCategory = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }
    handleParentCategory = (e) => {
        this.setState({ period: e.value });
    }

    calculateELSS = (e) => {
        this.setState({ loded: !this.state.loded })
        const data = {
            investment: this.state.investment,
            period: this.state.period
        };

        axios.post('http://localhost:5010/api/elss', data).then((res) => {
            console.log("lllllll", res.data.data);
            this.setState({
                final: res.data.data,
                loded: true

            })

            console.log("final", this.state.final);
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
    render() {

        const slab = [
            { value: "5", label: "5%" },
            { value: "20", label: "20%" },
            { value: "30", label: "30%" },
        ];
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
                                                        <Link class="nav-link active" to="/prodigypro/dashboard/elss-calculator-pro"><img src={elss} className="new-icon" alt='' /><span>ELSS
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

                                                                            <div className="col-md-6 text-center">
                                                                                <label for="m-saving" className="text-label font-weight-500 py-2">
                                                                                    Investment Amount(₹)
                                                                                </label>
                                                                                <div className="d-flex inputf transcard">
                                                                                    <img src={minus} alt="" className="img-fluid max-27" onClick={this.decInvest}></img>
                                                                                    <input type="number" className="form-control" name="investment" onChange={this.handleCategory} value={this.state.investment} />
                                                                                    <img src={plus} alt="" className="img-fluid max-27" onClick={this.incInvest}></img>
                                                                                </div>
                                                                            </div>
                                                                            <div className="col-md-6 text-center">
                                                                                <label for="year" className="text-label font-weight-500 py-2">
                                                                                    Select Your Tax Slab
                                                                                </label>

                                                                                <Select className='inputf transcard' options={slab} onChange={this.handleParentCategory} />

                                                                            </div>



                                                                        </div>
                                                                        <div className="col-md-12 pt-2 text-right">
                                                                            <button className="new-btn1 mt-3" onClick={this.calculateELSS}> Calculate</button>
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
                                                                        <div className="col-md-4">
                                                                            <div className="result-content">
                                                                                <ul className="text-center">
                                                                                    <li>
                                                                                        <div className="text-label font-weight-500 py-2 mt-5 ">
                                                                                            Total tax saved u/s 80(c)(₹)
                                                                                        </div>
                                                                                        <div className="inputf transcard bg-light-red py-2">{this.state.final}</div>
                                                                                    </li>


                                                                                </ul>
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-md-8">
                                                                            <div className="result-title text-center">
                                                                                <h2>Result</h2>
                                                                            </div>
                                                                            <div className="text-center">
                                                                                <img src={elsspic} className="img-fluid" alt='' />
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
export default Elss_Calculator_Pro