import React, {component} from 'react';
import Header from './header';
import Footer from './footer';
import Sidebar from './sidebar';
import {Helmet} from "react-helmet";
import Axios from 'axios';
import $ from 'jquery';

class Dividend_Report_Detail extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
          items: [],
          isLoaded: false,
        };
    }

    componentDidMount(){
        const scheme =this.props.match.url.split('/')[3];
        const pan = this.props.match.params.id;
        const year = localStorage.getItem("userScheme");
        const answer_array = year.split(',');
        
        const data = {
            fromyear:answer_array[0],
            toyear:answer_array[1],
            pan:pan,
            scheme:scheme,
        }
        
        $("#wait").html("Loading...");
        Axios.post("/prodigypro/api/dividendscheme", data)
        .then((response) => {
            console.log("hello",response.data)
            $("#wait").html( "" );
            if(response.data.status==400){
                $("#wait").html( "No Data Found" );
            }else{
                $("#wait").html( "" );
                console.log(response.data.data.data)
                this.setState({  isLoaded: true, items: response.data.data.data });
            }
        })
    }

    render(){
        let data = [] ; let scheme ; let temp;  let inname;
        let heading = [] ;
        if(this.state.items){
            let itemSrNo = 1;
            this.state.items.map(item => {
                if(itemSrNo==1){
                    inname = <tr>
                                <th colSpan="6">Invester Name:- <b>{item.INVNAME}</b></th>
                            </tr>
                    scheme = <tr>
                                <th colSpan="6">Scheme Name:- <b>{item.SCHEME}</b></th>
                            </tr>   
                    heading.push(inname);
                    heading.push(scheme);
                }
            temp = (<tr>
                        <th scope="row">{itemSrNo++}</th>
                        <td>{item.TRADDATE}</td>
                        <td>&#8377; {item.AMOUNT}</td>
                        <td>{item.TRXN_NATUR}</td>
                    </tr>)
                data.push(temp);
            })
            
        }
        return(
        <>
        <Helmet>         
            <title>Prodigy Pro - Dividend Report</title>
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
            <Sidebar mainTab="reports"  innertab="dividend-report"/>
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
                            <li className="breadcrumb-item active" aria-current="page">Dividend Report Details</li>
                        </ol>
                    </nav>

        <div className="row">
                    {/* Area Chart */}
            <div className="col-xl-12 col-lg-12">
                <div className="card shadow mb-4">
                </div>

                <div className="card shadow mb-4">
                    <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                        <h6 className="m-0 font-weight-bold text-danger">Dividend Payout / Reinvested</h6> 
                    </div>
                    {/* Card Body */}
                    <div className="card-body">
                        <div className="table-responsive">
                        <table className="table table-striped table-bordered">
                            
                            <thead>
                            {heading}
                            <tr>
                                <th scope="col">Sr. No.</th>
                                <th scope="col">Date</th>
                                <th scope="col">Total Amount</th>
                                <th scope="col">Trxn. Type</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td colspan="6"  id="wait">Loading..</td>
                            </tr>
                           {data}
                            {/* <tr>
                                <th scope="row">1</th>
                                <td>10-06-2021</td>
                                <td>413152859944</td>
                                <td>NIPPON INDIA SMALL CAP FUND - GROWTH PLAN GROWTH OPTION</td>
                                <td>7999.6</td>
                                <td>SIP</td>
                            </tr> */}
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
export default Dividend_Report_Detail
