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


// import 'animate.css';

import { LineChart } from 'react-chartkick';
import 'chartkick/chart.js';
class Sip_Calculator_Pro extends React.Component {
    render() {
        const data1 = [
            { name: "Market Value", data: { "0 Year":0, "2 Year": 24000, "3 Year": 34000, "4 Year": 48000, "5 Year": 58000 } },
            { name: "Amount Invested", data: { "0 Year":0, "2 Year": 30000, "3 Year": 40000, "4 Year": 50000, "5 Year": 60000 } }
        ];
        return (
            <>

                <Helmet>
                    <title>Calculators - Prodigy Pro</title>
                </Helmet>
                <style>
                    {`
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

                                                    <Link class="nav-link active" to="/prodigypro/dashboard/sip-calculator-pro">

                                                        <img src={sipc} className="new-icon" alt='' />  <span>   SIP Calculator</span>


                                                    </Link>
                                                </li>
                                                </div>
                                                <div className="col-md-3">
                                                <li class="nav-item">
                                                    <Link class="nav-link "  to="/prodigypro/dashboard/marriage-planning-pro"><img src={ring} className="new-icon" alt='' />  <span>Marriage
                                                        Planning</span></Link>
                                                </li>
                                                </div>
                                                <div className="col-md-3">
                                                <li class="nav-item">
                                                    <Link class="nav-link"  to="/prodigypro/dashboard/education-planning-pro"><img src={education} className="new-icon" alt='' /> <span>Education
                                                        Planning</span></Link>
                                                </li>
                                                </div>
                                                <div className="col-md-3 ">
                                                <li class="nav-item">
                                                    <Link class="nav-link"  to="/prodigypro/dashboard/future-value-calculator-pro"><img src={futurec} className="new-icon" alt='' /><span>Future Value
                                                        Calculator</span></Link>
                                                </li>
</div>
<div className="col-md-3 mt-3">
                                                <li class="nav-item">
                                                    <Link class="nav-link"  to="/prodigypro/dashboard/retirement-planning-pro"><img src={retirement} className="new-icon" alt='' /><span>Retirement
                                                        Planning</span></Link>
                                                </li>
                                                </div>
                                                <div className="col-md-3 mt-3">
                                                <li class="nav-item">
                                                    <Link class="nav-link "  to="/prodigypro/dashboard/emi-calculator-pro"><img src={emi} className="new-icon" alt='' /><span>EMI
                                                        Calculator</span></Link>
                                                </li>
                                                </div>
                                                <div className="col-md-3 mt-3">
                                                <li class="nav-item">
                                                    <Link class="nav-link"  to="/prodigypro/dashboard/fd-calculator-pro"><img src={fd} className="new-icon" alt='' /><span>FD
                                                        Calculator</span></Link>
                                                </li>
                                                </div>
                                                <div className="col-md-3 mt-3">
                                                <li class="nav-item">
                                                    <Link class="nav-link"  to="/prodigypro/dashboard/elss-calculator-pro"><img src={elss} className="new-icon" alt='' /><span>ELSS
                                                        Calculator</span></Link>
                                                </li>
                                                </div>
                                            </ul>
                                            {/* =============Calculators Nav End================ */}
                                            <div class=" mt-3 ">
                                                <div class=""  role="tabpanel">

                                                    <section>
                                                        <div className="results pt-5">
                                                            <div className="px-5">
                                                                <div className="shadowc br-50 px-4 pb-5">
                                                                    <section className="pt-5 pb-5">
                                                                        <div className="row">
                                                                           


                                                                                <div className="col-md-4 text-center">
                                                                                    <label for="m-saving" className="text-label font-weight-500 py-2">
                                                                                        Monthly Savings(In ₹)
                                                                                    </label>
                                                                                    <div className="d-flex inputf transcard">
                                                                                    <img src={minus} alt="" className="img-fluid max-27"></img>
                                                                                    <input type="text" className="form-control" name="m-saving" placeholder="200" />
                                                                          <img src={plus} alt="" className="img-fluid max-27"></img>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="col-md-4 text-center">
                                                                                    <label for="year" className="text-label font-weight-500 py-2">
                                                                                        Investment Period (In Years)
                                                                                    </label>
                                                                                    <div className="d-flex inputf transcard">
                                                                                    <img src={minus} alt="" className="img-fluid max-27"></img>
                                                                                    <input type="text" className="form-control" name="year" placeholder="5" />
                                                                          <img src={plus} alt="" className="img-fluid max-27"></img>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="col-md-4 text-center">
                                                                                    <label for="return" className="text-label font-weight-500 py-2">
                                                                                        Expected Rate of Return (% p.a)
                                                                                    </label>
                                                                                    <div className="d-flex inputf transcard">
                                                                                    <img src={minus} alt="" className="img-fluid max-27"></img>
                                                                                    <input type="text" className="form-control" name="return" placeholder="7" />
                                                                          <img src={plus} alt="" className="img-fluid max-27"></img>
                                                                                    </div>
                                                                                </div>
                                                                               
                                                                            
                                                                        </div>
                                                                        <div className="col-md-12 pt-2 mt-1 text-right">
                                                                                    <button className="new-btn1 mt-3"> Calculate</button>
                                                                                </div>
                                                                    </section>

                                                                    <div className="row shadowc br-50 mx-3">
                                                                        <div className="col-md-4">
                                                                            <div className="result-content result-content-shadow">
                                                                                <ul className="text-center">
                                                                                    <li>
                                                                                        <div className="text-label font-weight-500 py-2">
                                                                                            Amount Invested(In ₹)
                                                                                        </div>
                                                                                        <div className="inputf transcard bg-white py-2">10000</div>
                                                                                    </li>
                                                                                    <li>
                                                                                        <div className="text-label font-weight-500 py-2">
                                                                                            Period (In Year)
                                                                                        </div>
                                                                                        <div className="inputf transcard bg-white py-2">1</div>
                                                                                    </li>
                                                                                    <li>
                                                                                        <div className="text-label font-weight-500 py-2">
                                                                                            Gains(In ₹)
                                                                                        </div>
                                                                                        <div className="inputf transcard bg-white py-2">10500</div>
                                                                                    </li>
                                                                                </ul>
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-md-8  py-5">
                                                                            <div className="result-title text-center">
                                                                                <h2>Results</h2>
                                                                            </div>
                                                                            <div className="pt-4">
                                                                                <LineChart data={data1} />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="row px-5 pt-3">
                                                                    <div className="col-md-6">

                                                                          <button className="btn-custom text-left">Add To Cart</button> 
                                                                        </div>
                                                                        <div className="col-md-6 text-right">

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

export default Sip_Calculator_Pro 