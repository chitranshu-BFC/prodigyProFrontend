import React, {component} from 'react';
import Header from './header';
import Footer from './footer';
import Sidebar from './sidebar';
import {Helmet} from "react-helmet";
import Axios from 'axios';
import $ from 'jquery';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


class Portfolio_Report extends React.Component{
   
    render(){
        
        return(
        <>
        <Helmet>         
            <title>Portfolio Report</title>
        </Helmet>
            <style>
          {`
          thead.bg-primary th{
                  color:#fff;
          }
          tfoot.bg-primary th{
            color:#fff;
    }
    .details-table.table td, .details-table.table th {
        padding: .20rem .40rem;
    }
          `}
          </style>

        {/* Page Wrapper */}
      <div id="wrapper">
        {/* Sidebar */}
            {/* <Sidebar/> */}
        {/* End of Sidebar */}


        {/* Content Wrapper */}
        <div id="content-wrapper" className="d-flex flex-column">
          {/* Main Content */}
          <div id="content">

            {/* Topbar */}
                {/* <Header/> */}
            {/* End of Topbar */}

            {/* Begin Page Content */}
            <div className="container-fluid">
                {/* Page Heading */}
                <br/>
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><a href="home">Home</a></li>
                            <li className="breadcrumb-item active" aria-current="page">Portfolio Report</li>
                        </ol>
                    </nav>

                    <div className="row">
                        <div className="col-xl-12 col-lg-12">
                            <div className="card shadow mb-3">
                                {/* <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                    <h6 className="m-0 font-weight-bold text-danger">Portfolio Report</h6> 
                                </div> */}
                                {/* Card Body */}
                                <div className="card-body">
                                <table className="table table-bordered details-table"> 
                                    <tbody>
                                        <tr>
                                            <th>Name</th>
                                            <td colSpan="1">Mr Some Name Here</td>
                                            <th>Scheme Name</th>
                                            <td colSpan="3">some scheme name </td>
                                        </tr>
                                        <tr>
                                            <th>Folio Number</th>
                                            <td>Number</td>                                        
                                            <th>Tax Status</th>
                                            <td>status</td>
                                            <th>MOH</th>
                                            <td>mode</td>
                                        </tr>
                                        <tr>
                                            <th>Address</th>
                                            <td colSpan="5">Address Here</td>
                                        </tr>
                                            
                                        <tr>                                        
                                            <th>Mobile Number</th>
                                            <td>00000000000</td>
                                            <th>Email</th>
                                            <td>EmailID</td>
                                            <th>Guardian's Name</th>
                                            <td> Name </td>
                                        </tr>
                                        <tr>                                        
                                            <th>Bank</th>
                                            <td>SBI</td>
                                            <th>Account Number</th>
                                            <td> Demo acc.</td>
                                            <th>IFSC</th>
                                            <td>Demo IFSC </td>
                                        </tr>
                                        <tr>                                        
                                            <th>Nominee 1</th>
                                            <td>Nominee 1</td>
                                            <th>Nominee 2</th>
                                            <td>Nominee 2</td>
                                            <th>Nominee 3</th>
                                            <td>Nominee 3</td>
                                        </tr>
                                        <tr>                                        
                                            <th>Joint Holder 1</th>
                                            <td>Joint Holder 1</td>
                                            <th>Joint Holder 2</th>
                                            <td>Joint Holder 2</td>
                                        </tr>                                 
                                    </tbody>
                                </table>
                                </div>
                            </div>

                            <div className="card shadow">
                                {/* Card Body */}
                                <div className="card-body">
                                <table className="table table-bordered">
                                    <thead className="bg-primary">
                                    <tr>
                                        <th scope="col">Date</th>
                                        <th scope="col">Nature</th>
                                        <th scope="col">Amount</th>
                                        <th scope="col">NAV/Rate</th>
                                        <th scope="col">Units/Nos</th>
                                        <th scope="col">Balance</th>
                                        <th scope="col">RTA</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td>Demo Data</td>
                                        <td>Demo Data</td>
                                        <td>Demo Data</td>
                                        <td>Demo Data</td>
                                        <td>Demo Data</td>
                                        <td>Demo Data</td>
                                        <td>Demo Data</td>                                      
                                    </tr>                                  
                                    </tbody>
                                    <tfoot className="bg-primary">
                                    <tr>
                                        <th>&nbsp;</th>
                                        <th>Current Value</th>
                                        <th>Amount</th>
                                        <th>NAV/Rate</th>
                                        <th>Units/Nos</th>
                                        <th>&nbsp;</th>
                                        <th>&nbsp;</th>
                                    </tr>
                                    </tfoot> 
                                    
                                </table>
                                </div>
                            </div>

                        </div>
                    </div>   
                </div>

      </div>
          {/* End of Main Content */}
 

          {/* Footer */}
          <Footer/>
          {/* End of Footer */}
        </div>
        {/* End of Content Wrapper */}
      </div>
      {/* End of Page Wrapper */}
        </>
        )
    }
    
}
export default Portfolio_Report
