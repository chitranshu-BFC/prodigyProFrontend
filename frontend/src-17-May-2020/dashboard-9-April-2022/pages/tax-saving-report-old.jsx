import React, {component} from 'react';
import Header from './header';
import Footer from './footer';
import Sidebar from './sidebar';
import {Helmet} from "react-helmet";

class Tax_Saving_Investments extends React.Component{
    render(){
        
        return(
        <>
        <Helmet>         
            <title>Prodigy Pro - Tax Saving Investments</title>
        </Helmet>
            <style>
          {`
.mt-input{
    margin-top:3.5%;
}
.mt-btn{
    margin-top:12%;
}
.filter-card-body{
    padding-top: .5rem;
    padding-bottom: .5rem;
    padding-left: 1.25rem;
    padding-right: 1.25rem;
}
th{
    white-space: nowrap;
}
          `}
          </style>

        {/* Page Wrapper */}
      <div id="wrapper">
        {/* Sidebar */}
            <Sidebar/>
        {/* End of Sidebar */}


        {/* Content Wrapper */}
        <div id="content-wrapper" className="d-flex flex-column">
          {/* Main Content */}
          <div id="content">

            {/* Topbar */}
                <Header/>
            {/* End of Topbar */}

            {/* Begin Page Content */}
            <div className="container-fluid">
                {/* Page Heading */}
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><a href="home">Home</a></li>
                            <li className="breadcrumb-item active" aria-current="page">Tax Saving Investments </li>
                        </ol>
                    </nav>

        <div className="row">
                    {/* Area Chart */}
            <div className="col-xl-12 col-lg-12">
                <div className="card shadow mb-4">
                        {/* Card Header - Dropdown */}
                            <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                <h6 className="m-0 font-weight-bold text-danger">Tax Saving Investments Report</h6> 
                            </div>
                            {/* Card Body */}
                    <div className="card-body filter-card-body">
                        <div className="row">
                            <div className="col-lg-3 col-md-4 col-sm-6 ">
                                <div class="form-group">
                                    <label>Select Financial Year</label>
                                    <div class="input-group">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text">
                                            <i class="far fa-calendar-alt"></i>
                                            </span>
                                        </div>
                                        <select className="form-control">
                                        <option>2020-2021</option>
                                        <option>2019-2020</option>
                                        <option>2018-2019</option>
                                        </select>                          
                                    </div>
                                </div>
                             </div>
                             <div className="col-lg-3 col-md-3 col-sm-6 mt-input">
                                    <div className="form-check form-check-inline mr-4">
                                        <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" defaultValue="option1" />
                                        <label className="form-check-label" htmlFor="inlineRadio1">All</label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                        <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" defaultValue="option2" />
                                        <label className="form-check-label" htmlFor="inlineRadio2">Clientwise</label>
                                    </div>
                             </div>
                             <div className="col-lg-3 col-md-3 col-sm-6 ">
                                        <label>Select Client</label>
                                        <select className="form-control">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        </select>
                             </div>
                             <div className="col-lg-3 col-md-3 col-sm-6">
                                    <a className="btn btn-danger shadow-sm mt-btn w-100">Show</a>
                             </div>
                        </div>
                    </div>
                </div>

                <div className="card shadow mb-4">
                            <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                <h6 className="m-0 font-weight-bold text-danger">All Data</h6> 
                            </div>
                            {/* Card Body */}
                    <div className="card-body">
                        <div className="table-responsive">
                        <table className="table table-striped table-bordered">
                            <thead>
                            <tr>
                                <th scope="col">Sr. No.</th>
                                <th scope="col">Date</th>
                                <th scope="col">Folio No.</th>
                                <th scope="col">Scheme</th>
                                <th scope="col">Amount</th>
                                <th scope="col">Trxn. Type</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <th scope="row">1</th>
                                <td>10-06-2021</td>
                                <td>413152859944</td>
                                <td>NIPPON INDIA SMALL CAP FUND - GROWTH PLAN GROWTH OPTION</td>
                                <td>7999.6</td>
                                <td>SIP</td>
                            </tr>
                            <tr>
                                <th scope="row">2</th>
                                <td>10-06-2021</td>
                                <td>413152859944</td>
                                <td>NIPPON INDIA SMALL CAP FUND - GROWTH PLAN GROWTH OPTION</td>
                                <td>7999.6</td>
                                <td>SIP</td>
                            </tr>
                            <tr>
                                <th scope="row">3</th>
                                <td>10-06-2021</td>
                                <td>413152859944</td>
                                <td>NIPPON INDIA SMALL CAP FUND - GROWTH PLAN GROWTH OPTION</td>
                                <td>7999.6</td>
                                <td>SIP</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
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
export default Tax_Saving_Investments
