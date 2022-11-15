import React, { component } from 'react';
import Header from './header';
import Footer from './footer';
import Sidebar from './sidebar';
import { Helmet } from "react-helmet";
import Axios from 'axios';
import $ from 'jquery';
import { DatePickerComponent } from "@syncfusion/ej2-react-calendars";
class Dividend_Report extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            isLoaded: false,
        };
        this.state = {
            uniquePan: [],
            isLoaded: false,
        };
        // this.reprtDetail = this.reprtDetail.bind();
        this.onData = this.onData.bind();
    }
    componentDidMount() {
        const userData = JSON.parse(localStorage.getItem("loginUserData"))
        var d = new Date();
        const data = {
            fromyear: d.getFullYear() - 1,
            toyear: d.getFullYear(),
            pan: userData.pan_card,
        }
        // alert(data.fromyear+'-'+data.toyear)
        Axios.post("/prodigypro/api/dividend", data)
            .then((response) => {
                $("#wait").html("");
                $(".waitdata").css({ "display": "none" });
                if (response.data.data.status == 400) {
                    $("#wait").html("No Data Found");
                    $(".waitdata").css({ "display": "table-row" });
                } else {
                    this.setState({ isLoaded: true, items: response.data.data.data });
                    const uniquePan = [...new Set(response.data.data.data.map(q => q.PAN))];
                    this.setState({ isLoaded: true, uniquePan: uniquePan });
                }
            })
            .catch((err) => {
                $(".waitdata").css({ "display": "table-row" });
                $("#wait").html("No Data Found");
            })
    }
    onData = e => {
        const userData = JSON.parse(localStorage.getItem("loginUserData"))
        var time = $('select[name="year"]').val()
        const answer_array = time.split('-');
        $(".waitdata").css({ "display": "table-row" });
        // alert(time);
        if (time) {
            const data = {
                fromyear: answer_array[0],
                toyear: answer_array[1],
                pan: userData.pan_card,
            }
            // alert(data.pan);
            this.setState({ isLoaded: true, uniquePan: '' });
            $("#wait").html("Loading...");
            Axios.post("/prodigypro/api/dividend", data)
                .then((response) => {
                    $("#wait").html("");
                    $(".waitdata").css({ "display": "none" });
                    if (response.data.data.status == 400) {
                        $("#wait").html("No Data Found");
                        $(".waitdata").css({ "display": "table-row" });
                    } else {
                        localStorage.setItem("userScheme", answer_array)
                        this.setState({ isLoaded: true, items: response.data.data.data });
                        const uniquePan = [...new Set(response.data.data.data.map(q => q.PAN))];
                        this.setState({ isLoaded: true, uniquePan: uniquePan });
                    }
                })
                .catch((err) => {
                    $(".waitdata").css({ "display": "table-row" });
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
                // console.log(this.state.uniquePan[i])
                let itemSrNo = 1;
                this.state.items.map(item => {
                    if (this.state.uniquePan[i] == item.PAN) {
                        if (itemSrNo == 1) {
                            inname = <tr>
                                <td colSpan="6"><b>{item.INVNAME}</b></td>
                            </tr>
                            data.push(inname);
                        }
                        temp = (<tr>
                            <th scope="row">{itemSrNo++}</th>
                            <td>{item.FOLIO_NO}</td>
                            <td><a href={"dividend-report-details/" + item.SCHEME + "/" + item.PAN}>{item.SCHEME}</a></td>
                            <td>&#8377; {item.AMOUNT}</td>
                            <input type="hidden" name="pan" value />
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
                                        <li className="breadcrumb-item active" aria-current="page">Dividend </li>
                                    </ol>
                                </nav>
                                <div className="row justify-content-center">
                                    {/* Area Chart */}
                                    <div className="col-xl-11 col-lg-11 py-5">

                                        <div className="shadow-custom mb-4">
                                            <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                                {/* <h6 className="m-0 font-weight-bold text-danger">All Data</h6>  */}
                                                <div className="col-lg-4 col-md-4 col-sm-6 "></div>
                                                <div className="col-lg-4 col-md-4 col-sm-6 ">
                                                    <div class="form-group">
                                                        {/* <label>Select Financial Year</label> */}
                                                        {/* <div class="input-group">
                                                            <div class="input-group-prepend">
                                                                <span class="input-group-text">
                                                                    <i class="far fa-calendar-alt"></i>
                                                                </span>
                                                            </div>
                                                            <select id='years' name="year" className="form-control" onChange={this.onData}></select>
                                                        </div> */}
                                                           <DatePickerComponent format='yyyy' className="form-control datep" placeholder='FY-YYYY' start='Year' depth='Year'/>
                                                    </div>
                                                </div>
                                                <div className="col-lg-4 col-md-4 col-sm-6"></div>
                                            </div>
                                            {/* Card Body */}
                                            <div className="card-body">
                                                <div className="table-responsive">
                                                    <table className="table">
                                                        <thead>
                                                            <tr className='red'>
                                                                <th scope="col">Sr. No.</th>
                                                                <th scope="col">Folio No.</th>
                                                                <th scope="col">Scheme</th>
                                                                <th scope="col">Total Amount</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody className='text-black'>
                                                            {/* <tr className="waitdata">
                                            <td colspan="6" id="wait">Loading...</td>
                                        </tr>
                                        {data} */}
                                                            <tr>
                                                                <th scope="row">1</th>
                                                                <td>413152859944</td>
                                                                <td>NIPPON INDIA SMALL CAP FUND - GROWTH PLAN GROWTH OPTION</td>
                                                                <td>7999.6</td>

                                                            </tr>
                                                            <tr>
                                                                <th scope="row">2</th>
                                                                <td>413152859944</td>
                                                                <td>NIPPON INDIA SMALL CAP FUND - GROWTH PLAN GROWTH OPTION</td>
                                                                <td>7999.6</td>
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
export default Dividend_Report