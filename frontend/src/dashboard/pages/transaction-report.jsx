import React, { component } from "react";
import Header from "./header";
import Footer from "./footer";
import Sidebar from "./sidebar";
import { Helmet } from "react-helmet";
import Axios from "axios";
import $ from "jquery";
import { DatePickerComponent } from "@syncfusion/ej2-react-calendars";

class Transaction_Report extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      isLoaded: false,
    };
    this.onData = this.onData.bind();
  }

  componentDidMount() {
    var d = new Date();
    $(".waitdata").css({ display: "table-row" });
    let mon = d.getMonth() + 1;

    const data = {
      month: "0" + mon,
      year: d.getFullYear(),
      pan: JSON.parse(localStorage.getItem("loginUserData")).pan_card,
    };
    console.log("response", JSON.stringify(data));
    $('input[name="time"]').val(data.year + "-" + data.month);
    Axios.post("/prodigypro/api/transactionuserwise", data).then((response) => {
      $("#wait").html("");
      $(".waitdata").css({ display: "none" });
      console.log("response", response.data);
      if (response.data.data.status == 400) {
        $("#wait").html("No Data Found");
        $(".waitdata").css({ display: "table-row" });
      } else {
        this.setState({ isLoaded: true, items: response.data.data.data });
        const uniquePan = [
          ...new Set(response.data.data.data.map((q) => q.PAN)),
        ];
        this.setState({ isLoaded: true, uniquePan: uniquePan });
      }
    });
  }

  onData = (e) => {
    $(".waitdata").css({ display: "table-row" });
    var time = $('input[name="time"]').val();
    const answer_array = time.split("-");

    if (time) {
      const data = {
        month: answer_array[1],
        year: answer_array[0],
        pan: JSON.parse(localStorage.getItem("loginUserData")).pan_card,
      };

      // alert(data.pan);
      this.setState({ isLoaded: true, uniquePan: "" });
      $("#wait").html("Loading...");
      Axios.post("/prodigypro/api/transactionuserwise", data).then(
        (response) => {
          $("#wait").html("");
          $(".waitdata").css({ display: "none" });
          console.log(response.data);
          if (response.data.data.status == 400) {
            $(".waitdata").css({ display: "table-row" });
            console.log("no data");
            $("#wait").html("No Data Found");
          } else {
            this.setState({ isLoaded: true, items: response.data.data.data });
            const uniquePan = [
              ...new Set(response.data.data.data.map((q) => q.PAN)),
            ];
            this.setState({ isLoaded: true, uniquePan: uniquePan });
          }
        }
      );
    } else {
      alert("Please Select Month and Year");
    }
  };

  render() {
    let data = [];
    let invName = [];
    let temp;
    let inname;

    if (this.state.uniquePan) {
      for (var i = 0; i < this.state.uniquePan.length; i++) {
        // console.log(this.state.uniquePan[i])
        let itemSrNo = 1;
        this.state.items.map((item) => {
          if (this.state.uniquePan[i] == item.PAN) {
            if (itemSrNo == 1) {
              inname = (
                <tr style={{ "background-color": "rgb(0 0 0 / 3%)" }}>
                  <td colSpan="6">
                    <b>{item.INVNAME}</b>
                  </td>
                </tr>
              );
              data.push(inname);
            }

            if (item.AMOUNT != 0) {
              temp = (
                <tr>
                  <th scope="row">{itemSrNo++}</th>
                  <td>{item.TRADDATE}</td>
                  <td>{item.FOLIO_NO}</td>
                  <td>{item.SCHEME}</td>
                  <td>&#8377; {item.AMOUNT}</td>
                  <td>{item.TRXN_NATUR}</td>
                </tr>
              );
              data.push(temp);
            }
          }
        });
      }
    } else {
      inname = "";
      temp = "";
      data.push(temp);
    }
    return (
      <>
        <Helmet>
          <title>Prodigy Pro - Transaction Report</title>
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
          {/* <Sidebar mainTab="reports"  innertab="transaction-report"/> */}
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
                    <li className="breadcrumb-item">
                      <a href="home">Home</a>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      Transaction Report
                    </li>
                  </ol>
                </nav>

                <div className="row justify-content-center">
                  {/* Area Chart */}
                  <div className="col-xl-11 col-lg-11 py-5">
                    <div className=" shadow mb-4">
                      <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                        <div className="col-lg-4 col-md-4 col-sm-6 "></div>
                        <div className="col-lg-4 col-md-4 col-sm-6 ">
                          <DatePickerComponent
                            format="MMM-yyyy"
                            className="form-control datep"
                            placeholder="MM-YYYY"
                            start="Year"
                            depth="Year"
                          />
                        </div>
                        <div className="col-lg-4 col-md-4 col-sm-6 "></div>
                      </div>
                      {/* Card Body */}
                      <div className="card-body">
                        <div className="table-responsive">
                          <table className="table text-center">
                            <thead>
                              <tr className="red">
                                <th scope="col">Sr. No.</th>
                                <th scope="col">Date</th>
                                <th scope="col">Folio No.</th>
                                <th scope="col">Scheme</th>
                                <th scope="col">Amount</th>
                                <th scope="col">Trxn. Type</th>
                              </tr>
                            </thead>
                            <tbody className="text-black">
                              {/* <tr className="waitdata">
                                                                <td colspan="6" id="wait">Loading...</td>
                                                            </tr> */}
                              {/* {data} */}
                              <tr>
                                <th scope="row">1</th>
                                <td>10-06-2021</td>
                                <td>413152859944</td>
                                <td>
                                  NIPPON INDIA SMALL CAP FUND - GROWTH PLAN
                                  GROWTH OPTION
                                </td>
                                <td>7999.6</td>
                                <td>SIP</td>
                              </tr>
                              <tr>
                                <th scope="row">2</th>
                                <td>10-06-2021</td>
                                <td>413152859944</td>
                                <td>
                                  NIPPON INDIA SMALL CAP FUND - GROWTH PLAN
                                  GROWTH OPTION
                                </td>
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
            <Footer />
            {/* End of Footer */}
          </div>
          {/* End of Content Wrapper */}
        </div>
        {/* End of Page Wrapper */}
      </>
    );
  }
}
export default Transaction_Report;
