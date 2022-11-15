import React, {component} from 'react';
import Header from './header';
import Footer from './footer';
import Sidebar from './sidebar';
import {Helmet} from "react-helmet";
import StyleComponent from './styleComponent';
import Axios from 'axios';
import $ from 'jquery';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


class Portfolio_Report extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            userDetails: ""
          };
              
    }

    componentDidMount(){
        const parsed =  new URLSearchParams(this.props.location.search);      
        
        const data ={
            folio:parsed.get('folio'),
            pan:parsed.get('pan'),
            scheme:parsed.get('product_code'),
            rta:parsed.get('rta'),
        }

        Axios.post("/prodigypro/api/getschemepersonaldetail", data)
        .then((res) => {
            $("#overlay").css("display","none")
           this.setState({userDetails:res.data.data[0]})
        })

        Axios.post("/prodigypro/api/getschemedetail", data)
        .then((result) => {
             console.log("hello",result.data.data)
           this.setState({userschemeDetails:result.data.data.data})
        })
       
    }
   
    render(){
        //console.log("hello",this.state.userDetails)
        return(
        <>
        <StyleComponent/>
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
        <Sidebar/>
        {/* End of Sidebar */}
         {/*Loader*/}
         <div id="overlay" >
            <div class="spinner"></div>
            <br/><b className="text-danger">Please Wait...</b>
          </div>
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
                                            <td colSpan="1">{this.state.userDetails.INVNAME+" ["+this.state.userDetails.PAN+"]"} </td>
                                            <th>Scheme Name</th>
                                            <td colSpan="3">{this.state.userDetails.SCHEME} </td>
                                        </tr>
                                        <tr>
                                            <th>Folio Number</th>
                                            <td colSpan="1">{this.state.userDetails.FOLIO}</td>
                                            <th>MOH</th>
                                            <td colSpan="3">IND</td>
                                        </tr>

                                         <tr>
                                            <th>Nominee</th>
                                            <td colSpan="1">{this.state.userDetails.NOMINEE}</td>
                                            <th>Bank</th>
                                            <td colSpan="3">{this.state.userDetails.BANK+" "+this.state.userDetails.ACCOUNTNO}</td>
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
                                    {this.state.userschemeDetails?
                                        this.state.userschemeDetails.map((item, key) =>

                                        <tr>
                                            <td>{item.TD_TRDT}</td>
                                            <td>{item.NATURE}</td>
                                            <td>{item.AMOUNT}</td>
                                            <td>{item.TD_NAV}</td>
                                            <td>{item.UNITS}</td>
                                            <td>{item.UNITS}</td>
                                            <td>{item.RTA}</td>                                     
                                        </tr>  
                                        
                                        
                                    ):null}

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
