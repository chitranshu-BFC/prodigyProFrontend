import React, { component } from 'react';
import Header from './header';
import Footer from './footer';
import Sidebar from './sidebar';
import { Helmet } from "react-helmet";
import Axios from 'axios';
import $ from 'jquery';

class SSS_Report extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            isLoaded: false,
        };

        this.onData = this.onData.bind();
    }

    componentDidMount() {
        var d   = new Date();
        $(".waitdata").css({"display":"table-row"});
        let mon = d.getMonth() + 1;
       
        const data = {
            month: "0"+mon,
            year: d.getFullYear(),
            pan: JSON.parse(localStorage.getItem("loginUserData")).pan_card,
        }


        $('input[name="time"]').val(data.year + '-' + data.month)
        Axios.post("/prodigypro/api/sipstpuserwise", data)
            .then((response) => {
                $("#wait").html("");
                $(".waitdata").css({"display":"none"});
                if(response.data.data.status==400){
                    $("#wait").html( "No Data Found" );
                    $(".waitdata").css({"display":"table-row"});
                }else{
                    this.setState({ isLoaded: true, items: response.data.data.data });
                    const uniquePan = [...new Set(response.data.data.data.map(q => q.PAN))];
                    this.setState({ isLoaded: true, uniquePan: uniquePan });
                }
            })
            .catch((err)=>{
                $(".waitdata").css({"display":"table-row"});
                $("#wait").html("No Data Found")
            })

    }



    onData = e => {
        var time = $('input[name="time"]').val()
        const answer_array = time.split('-');
        $(".waitdata").css({"display":"table-row"});
        if (time) {
            
            const data = {
                month: answer_array[1].substr(1, 1),
                year: answer_array[0],
                pan: JSON.parse(localStorage.getItem("loginUserData")).pan_card,
            }

            // alert(data.pan);
            this.setState({ isLoaded: true, uniquePan: '' });
            $("#wait").html("Loading...");
            $("#result").css("display", "none");
            Axios.post("/prodigypro/api/sipstpuserwise", data)
                .then((response) => {
                    $("#wait").html("");
                    $(".waitdata").css({"display":"none"});
                    if (response.data.status == 400) {
                        $("#wait").html("No Data Found");
                        $(".waitdata").css({"display":"table-row"});
                    }
                    if (response.data.data.status == 400) {
                        $("#wait").html("No Data Found");
                        $(".waitdata").css({"display":"table-row"});
                    } else {
                        $("#result").css("display", "block");
                        this.setState({ isLoaded: true, items: response.data.data.data });
                        const uniquePan = [...new Set(response.data.data.data.map(q => q.PAN))];
                        this.setState({ isLoaded: true, uniquePan: uniquePan });
                    }
                })
                .catch((err)=>{
                    $(".waitdata").css({"display":"table-row"});
                    $("#wait").html("No Data Found");
                })
        } else {
            alert("Please Select Month and Year")
        }

    }

    render() {

        let data = []; let invName = []; let temp; let inname;

        if (this.state.uniquePan) {
            for (var i = 0; i < this.state.uniquePan.length; i++) {
                let itemSrNo = 1;
                this.state.items.map(item => {
                    if (this.state.uniquePan[i] == item.PAN) {
                        if (itemSrNo == 1) {
                            inname = <tr style={{"background-color": "rgb(0 0 0 / 3%)"}}>
                                <td colSpan="6"><b>{item.INVNAME}</b></td>
                            </tr>
                            data.push(inname);
                        }

                        temp = (<tr>
                            <th scope="row">{itemSrNo++}</th>
                            <td>{item.TRADDATE}</td>
                            <td>{item.FOLIO_NO}</td>
                            <td>{item.SCHEME}</td>
                            <td>&#8377; {item.AMOUNT}</td>
                            <td>{item.TRXN_NATUR}</td>
                        </tr>)
                        data.push(temp);
                    }
                })
            }
        } else {
            inname = '';
            temp = '';
            data.push(temp);
        }

        return (
            <>
                <Helmet>
                    <title>Prodigy Pro - My SIP/STP/SWP Report</title>
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
                    .select-month{
                        margin-bottom: 0px !important;
                    }
                    .waitdata{
                        display: none;
                    }

                `}
                </style>

                {/* Page Wrapper */}
                <div id="wrapper">
                    {/* Sidebar */}
                    <Sidebar mainTab="reports"  innertab="sipstpswp-report"/>
                    {/* End of Sidebar */}


                    {/* Content Wrapper */}
                    <div id="content-wrapper" className="d-flex flex-column">
                        {/* Main Content */}
                        <div id="content">

                            {/* Topbar */}
                            <Header />
                            {/* End of Topbar */}

                            {/* Begin Page Content */}
                            <div className="container-fluid">
                                {/* Page Heading */}
                                <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item"><a href="home">Home</a></li>
                                        <li className="breadcrumb-item active" aria-current="page">My SIP / STP / SWP Report</li>
                                    </ol>
                                </nav>

                                <div className="row">
                                    {/* Area Chart */}
                                    <div className="col-xl-12 col-lg-12">
                                        {/* <div className="card shadow mb-4"> */}
                                        {/* Card Header - Dropdown */}
                                        {/* <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                <h6 className="m-0 font-weight-bold text-danger">My SIP / STP / SWP Report</h6> 
                            </div> */}
                                        {/* Card Body */}
                                        {/* <div className="card-body filter-card-body">
                                                <div className="row">
                                                    <div className="col-lg-3 col-md-4 col-sm-6 ">
                                                        <div class="form-group">
                                                            <label>Select Month</label>
                                                            <div class="input-group">
                                                                <div class="input-group-prepend">
                                                                    <span class="input-group-text">
                                                                        <i class="far fa-calendar-alt"></i>
                                                                    </span>
                                                                </div>
                                                                <input name="time" type="month" class="form-control" onChange={this.onData} />
                                                            </div>
                                                        </div>
                                                    </div> */}
                                        {/* <div className="col-lg-3 col-md-3 col-sm-6 mt-input">
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
                                    <a className="btn btn-danger shadow-sm mt-btn w-100" onClick={this.onData}>Show</a>
                             </div> */}
                                        {/* </div>
                                            </div>
                                        </div> */}

                                        <div className="card shadow mb-4">
                                            <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                                {/* <h6 className="m-0 font-weight-bold text-danger">All Data</h6> */}
                                                <div className="col-lg-4 col-md-4 col-sm-6 "></div>
                                                <div className="col-lg-4 col-md-4 col-sm-6 ">
                                                    <div class="form-group select-month">
                                                        {/* <label>Select Month</label> */}
                                                        <div class="input-group">
                                                            <div class="input-group-prepend">
                                                                <span class="input-group-text">
                                                                    <i class="far fa-calendar-alt"></i>
                                                                </span>
                                                            </div>
                                                            <input name="time" type="month" class="form-control" onChange={this.onData} />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-lg-4 col-md-4 col-sm-6 "></div>
                                            </div>
                                            {/* Card Body */}
                                            <div className="card-body">
                                                {/* {this.state.isLoaded?:null}  */}
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
                                                            <tr class="waitdata">
                                                                <td colspan="6" id="wait">Loading...</td>
                                                            </tr>
                                                            {/* </tbody>
                            <tbody id="result"> */}
                                                            {data}
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
                        <Footer />
                        {/* End of Footer */}
                    </div>
                    {/* End of Content Wrapper */}
                </div>
                {/* End of Page Wrapper */}
            </>
        )
    }

}
export default SSS_Report
