import React, { useState, useEffect } from 'react'
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
import axios from 'axios';
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

const SipCalculatorPro = () => {
    const [monthlySavings, setMonthlySavings] = useState(2500);
    const [investmentPeriod, setInvestmentPeriod] = useState(5);
    const [expectedRateReturn, setExpectedRateReturn] = useState(6);
    const [monthly, setMonthly] = useState('');
    const [totalMonth, setTotalMonth] = useState('5');
    const [invested, setInvested] = useState('1,50,000');
    const [gainss, setGainss] = useState('1,75,297');
    const [total, setTotal] = useState('');
    const [err, setErr] = useState('');
    const [loaded, setLoaded] = useState(true);





    const [data2, setData2] = useState([{ name: "Amount Invested", data: { "0 Year": 0, "1 Year": 30000, "2 Year": 60000, "3 Year": 90000, "4 Year": 120000, "5 Year": monthlySavings * investmentPeriod * 12 } },
    { name: "Market Value", data: { "0 Year": 0, "1 Year": 30993, "2 Year": 63898, "3 Year": 98832, "4 Year": 135921, "5 Year": 175297.20 } }]);



    const Register = async (e) => {
        e.preventDefault();
        setLoaded(!loaded)


        if (monthlySavings != 0) {
            console.log("Monthly", monthlySavings);
            const data = {
                monthlySavings: monthlySavings,
                investmentPeriod: investmentPeriod,
                expectedRateReturn: expectedRateReturn
            }
            try {
                await axios.post('http://localhost:5010/api/sip', data).then((res) => {
                    console.log("qqqqq", res.data);
                    console.log("ssss", res.data.gains);
                    setGainss(res.data.gainss);
                    setInvested(res.data.totalSaving);
                    setTotal(res.data.mainresults);
                    setTotalMonth(res.data.totalMonth);

                    setLoaded(loaded)


                })

            }
            catch (error) {
                // if (error.response) {
                //   setMsg(error.response.data.msg);

                // }
            }

            var monthlyRate = expectedRateReturn / 12 / 100;
            var months = investmentPeriod * 12;
            var futureValue = 0;


            let mainArray = [];
            let firstObj = { name: "Amount Invested" };
            let secondObj = { name: "Market Value" };
            let obj1 = {}
            let obj2 = {}
            if (parseInt(investmentPeriod) <= 10) {
                for (let i = 0; i < parseInt(investmentPeriod) + 1; i++) {

                    console.log("objppppppppp", investmentPeriod + 'Year');

                    if (i == 0) {
                        obj1[i + 'Year'] = 0;
                    } else {
                        obj1[i + 'Year'] = (monthlySavings * i * 12).toFixed()
                    }

                    if (i == 0) {
                        obj2[i + 'Year'] = 0;
                    } else {
                        let marketData = monthlySavings * ((1 + monthlyRate) * ((Math.pow((1 + monthlyRate), i * 12)) - 1) / monthlyRate)
                        let marketDataooo = marketData / 12 //(marketData + monthlySavings * i * 12)/ 12
                        obj2[i + 'Year'] = (marketDataooo * 12).toFixed()
                    }

                }
            } else if (parseInt(investmentPeriod) >= 10 && parseInt(investmentPeriod) <= 20) {
                for (let i = 0; i < parseInt(investmentPeriod) + 1; i += 2) {

                    console.log("objppppppppp", investmentPeriod + 'Year');

                    if (i == 0) {
                        obj1[i + 'Year'] = 0;
                    } else {
                        obj1[i + 'Year'] = (monthlySavings * i * 12).toFixed()
                    }

                    if (i == 0) {
                        obj2[i + 'Year'] = 0;
                    } else {
                        let marketData = monthlySavings * ((1 + monthlyRate) * ((Math.pow((1 + monthlyRate), i * 12)) - 1) / monthlyRate)
                        let marketDataooo = marketData / 12 //(marketData + monthlySavings * i * 12)/ 12
                        obj2[i + 'Year'] = (marketDataooo * 12).toFixed()
                    }

                }
            }
            else if (parseInt(investmentPeriod) >= 20 ) {
                for (let i = 0; i < parseInt(investmentPeriod) + 1; i += 3) {

                    console.log("objppppppppp", investmentPeriod + 'Year');

                    if (i == 0) {
                        obj1[i + 'Year'] = 0;
                    } else {
                        obj1[i + 'Year'] = (monthlySavings * i * 12).toFixed()
                    }

                    if (i == 0) {
                        obj2[i + 'Year'] = 0;
                    } else {
                        let marketData = monthlySavings * ((1 + monthlyRate) * ((Math.pow((1 + monthlyRate), i * 12)) - 1) / monthlyRate)
                        let marketDataooo = marketData / 12 //(marketData + monthlySavings * i * 12)/ 12
                        obj2[i + 'Year'] = (marketDataooo * 12).toFixed()
                    }

                }
            }
            console.log("obj==", obj1);
            firstObj.data = obj1;
            secondObj.data = obj2;
            mainArray.push(firstObj)
            mainArray.push(secondObj)

            setData2(mainArray)
            console.log("dd", mainArray);


        } else {
            setErr('Saving Amount Required..');

        }

    }

    let incNum = () => {
        if (monthlySavings) {
            setMonthlySavings(Number(monthlySavings) + 500);
        }
        else if (monthlySavings == 0) {
            setMonthlySavings(Number(monthlySavings) + 500);
        }

    };
    let decNum = () => {
        if (monthlySavings >= 500) {

            setMonthlySavings(monthlySavings - 500);
        }
        else if (monthlySavings < 499) {
            setMonthlySavings(0);
        }
    }
    let incMonth = () => {
        if (investmentPeriod < 60) {
            setInvestmentPeriod(Number(investmentPeriod) + 1);
        }
    };
    let decMonth = () => {
        if (investmentPeriod > 1) {
            setInvestmentPeriod(investmentPeriod - 1);
        }
    }
    let incPer = () => {
        if (expectedRateReturn < 60) {
            setExpectedRateReturn(Number(expectedRateReturn) + .5);
        }
    };
    let decPer = () => {
        if (expectedRateReturn > 1) {
            setExpectedRateReturn(expectedRateReturn - .5);
        }
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
                .calculator .navtop .nav-link {
                    
                    color:#F06D70;
                    border: 1px solid;
                border-radius: 77px;
                }
                .calculator .navtop .nav-link.active
                {
                    color: #fff !important;
                background-color: #F06D70;
                box-shadow: 0px 4px 5px rgba(0, 0, 0, 0.2);
                border-radius: 77px;
                border:none;
                }
                .nav-item
                {
                    padding:0px !important; 
                }
                .navtop {
                    display: inline-flex;
                    font-size: 16px;
                    background-color: hsla(0,0%,100%,.26);
                    // border: 1px solid #DA6066;
                    border-radius: 50px;
                    backdrop-filter: blur(26px);
                    -webkit-backdrop-filter: blur(26px);
                    padding: 4px;
                }
                .new-icon {
                    max-width: 25px !important;
                }
                .calculator .navtop span
                {
                    padding-left: 2px;
                }
                .new-btn1 {
                    padding: 10px 27px !important;
                    box-shadow: 0 5px 10px 5px rgb(0 0 0 / 5%) !important;
                }
                
                .form-control::placeholder
                {
                    color:#000!important;
                    text-align:center;
                }
                .img-fluid{
                    cursor: pointer;
                }
                .results .form-control{
                    height:0 !important;
                    padding: 1.1rem 0.75rem !important;
                    text-align: center !important;
                }
                .error{
                    color:red;
                    font-size: 18px;
                }
             
             }
               
                
                

     
      `}
            </style>

            {/* Page Wrapper */}
            <div id="wrapper">


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
                            {/* <ClipLoader /> */}

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

                                                    <Link class="nav-link active" to="/prodigypro/dashboard/sip-calculator-pro">

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

                                                                    <div className="row">



                                                                        <div className="col-md-4 text-center">


                                                                            <label for="m-saving" className="text-label font-weight-500 py-2">
                                                                                Monthly Savings(₹)
                                                                            </label>
                                                                            <div className="d-flex inputf transcard">
                                                                                <img src={minus} alt="" onClick={decNum} className="img-fluid max-27"></img>
                                                                                <input id="months" type="number" className="form-control " name="m-saving" value={monthlySavings} onChange={(e) => setMonthlySavings(e.target.value)} />
                                                                                <img src={plus} alt="" onClick={incNum} className="img-fluid max-27 "></img>
                                                                            </div>
                                                                            <span className='error'>{err}</span>
                                                                        </div>
                                                                        <div className="col-md-4 text-center">
                                                                            <label for="year" className="text-label font-weight-500 py-2">
                                                                                Investment Period (Years)

                                                                            </label>
                                                                            <div className="d-flex inputf transcard">
                                                                                <img src={minus} alt="" onClick={decMonth} className="img-fluid max-27"></img>
                                                                                <input type="number" className="form-control" name="year" value={investmentPeriod} onChange={(e) => setInvestmentPeriod(e.target.value)} />
                                                                                <img src={plus} alt="" onClick={incMonth} className="img-fluid max-27"></img>
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-md-4 text-center">
                                                                            <label for="return" className="text-label font-weight-500 py-2">
                                                                                Expected Rate of Return (% p.a)
                                                                            </label>
                                                                            <div className="d-flex inputf transcard">
                                                                                <img src={minus} alt="" onClick={decPer} className="img-fluid max-27"></img>
                                                                                <input type="number" className="form-control" name="return" value={expectedRateReturn} onChange={(e) => setExpectedRateReturn(e.target.value)} />
                                                                                <img src={plus} alt="" onClick={incPer} className="img-fluid max-27"></img>
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-md-12 pt-2 mt-1 text-right">
                                                                            <button onClick={Register} className="new-btn1 mt-3"> Calculate</button>

                                                                        </div>
                                                                        <DarkBackground disappear={!loaded}>
                                                                          
                                                                            <LoadingOverlay
                                                                                active={true}
                                                                                style={{color:"red"}}
                                                                                // spinner={<BounceLoader />}
                                                                                spinner={true}
                                                                               
                                                                            >
                                                                                {/* <p>Some content or children or something.</p> */}
                                                                            </LoadingOverlay>
                                                                        </DarkBackground>

                                                                    </div>
                                                                </section>

                                                                <div className="row shadowc br-50 mx-3">
                                                                    <div className="col-md-4">
                                                                        <div className="result-content result-content-shadow">
                                                                            <ul className="text-center">
                                                                                <li>

                                                                                    <div className="text-label font-weight-500 py-2">
                                                                                        Amount Invested(₹)
                                                                                    </div>
                                                                                    <div className="inputf transcard bg-white py-2"> {invested}</div>
                                                                                </li>
                                                                                <li>
                                                                                    <div className="text-label font-weight-500 py-2">
                                                                                        Period (Year)
                                                                                    </div>
                                                                                    <div className="inputf transcard bg-white py-2">{totalMonth}</div>
                                                                                </li>
                                                                                <li>
                                                                                    <div className="text-label font-weight-500 py-2">
                                                                                        Gains(₹)
                                                                                    </div>
                                                                                    <div className="inputf transcard bg-white py-2">{gainss}</div>
                                                                                </li>
                                                                            </ul>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-md-8  py-5">
                                                                        <div className="result-title text-center">
                                                                            <h2>Results</h2>
                                                                        </div>
                                                                        <div className="pt-4">
                                                                            <LineChart data={data2} />
                                                                        </div>
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

export default SipCalculatorPro

