import React, { component } from 'react';
import Header from './header';
import Footer from './footer';
import Sidebar from './sidebar';
import { Helmet } from "react-helmet";
import StyleComponent from './styleComponent';
import Axios from 'axios';
import $ from 'jquery';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class STP extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    };

    this.state = {
      Items: []
    };
  }


  componentDidMount() {
    const schemeList = []; const list = '';
    const userData = JSON.parse(localStorage.getItem("loginUserData"))
    const data = {
      email: userData.email,
    }

    Axios.post("/prodigypro/api/User_profile", data)
      .then((res) => {
        // console.log("dscd",res.data.data.data)
        this.setState({ userList: res.data.data.data })
      })

    Axios.post("/prodigypro/api/amc")
      .then((response) => {
        // console.log(response.data.data.data)
        this.setState({ amcList: response.data.data.data })
      })
  }


  userProfile = e => {
    let userPro_id; let schemeList = [];
    userPro_id = $('select[name="userPro_id"]').val();
    $("#wait").css('display', 'block');
    this.setState({ userSchemeList: '' })
    this.state.userList.map(value => {
      if (value.id == userPro_id) {
        const amcdata = {
          pan_card: value.fh_pan_no,
          IIN: value.customer_id,
        }

        Axios.post("/prodigypro/api/amclist", amcdata)
          .then((response) => {
            this.setState({ amc: response.data.data.data })
            //let count = 1;
            response.data.data.data.map(value => {
              this.state.amcList.map(value2 => {
                if (value2.amc_code == value.amc_code) {
                  const data = {
                    folio: value.folio,
                  }
                  Axios.post("/prodigypro/api/schemelist", data)
                    .then((result) => {
                    
                      result.data.data.data.map((key) => {
                        const data = {
                          folio: value.folio,
                          isin:key.products.ISIN,
                          prodcode:key.products.PRODUCT_CODE,
                          amc_code: key.products.AMC_CODE,
                        }

                        Axios.post("/prodigypro/api/foliodetail", data)
                        .then((resss) => {
                          $("#wait").css('display', 'none');//  height: 300px;
                          $(".my-custom-scrollbar").css('height', '300px');
                           console.log("folioVal", resss.data.data.data[0].UNITS)
                          let folioVal =  resss.data.data.data;
                          schemeList.push({ scheme_name: key.products.PRODUCT_LONG_NAME, folio_no: data.folio, SWP_DATES: key.products.SWP_DATES, FREQUENCIES: key.products.SYSTEMATIC_FREQUENCIES, amc_code: key.products.AMC_CODE, product_code: key.products.PRODUCT_CODE, reinvest: key.products.REINVEST_TAG, iin: amcdata.IIN , unit: resss.data.data.data[0].UNITS , amu:resss.data.data.data[0].AMOUNT })
                          this.setState({ userSchemeList: schemeList })
                          console.log("Scheme list", schemeList)
                        })
                      })
                     
                    })
                }
              })
            })
          })
      }
    })
  }

  onscheme = e => { // folio_no
    let key = $("input:radio[name=key]:checked").val();
    let folio_no = $('#folio_no_' + key).val();
    let scheme = $('#scheme_nm_' + key).val();

    // alert(key+" - "+folio_no+" - "+scheme)
    this.state.userSchemeList.map(val => {
      console.log("scheme list", val)
      if ((val.scheme_name == scheme) && (val.folio_no == folio_no)) {

        if (val.FREQUENCIES != null) {
          const FREQUENCIES_arr = val.FREQUENCIES.split(',');
          this.setState({ userFREQUENCIES_arr: FREQUENCIES_arr })
        } else {
          this.setState({ userFREQUENCIES_arr: "" })
        }

        const data = {
          AMC_CODE: val.amc_code,
          ASSET_CLASS: $("input:radio[name=asset]:checked").val(),
          DIV_GW: $("input:radio[name=growth]:checked").val(),
        }

        Axios.post("/prodigypro/api/targetScheme", data)
          .then((res) => {
            this.setState({ usertargetScheme: res.data.data.data })
          })

        const swp_date_arr = val.SWP_DATES.split(',');
        this.setState({ userSwpDate: swp_date_arr })
        this.setState({ userschemeName: { folio_no: folio_no, scheme: scheme, amc_code: val.amc_code, product_code: val.product_code, reinvest: val.reinvest, iin: val.iin } })
      }
    })
  }

  targetScheme = e => {

    const data = {
      AMC_CODE: this.state.userschemeName.amc_code,
      ASSET_CLASS: $("input:radio[name=asset]:checked").val(),
      DIV_GW: $("input:radio[name=growth]:checked").val(),
    }
    // alert(JSON.stringify(data));
    Axios.post("/prodigypro/api/targetScheme", data)
      .then((res) => {
        console.log("targetScheme", res.data.data.data)
        this.setState({ usertargetScheme: res.data.data.data })
      })

  }

  handleFormValidation(data) {

    if (data.assetClass == undefined) {
      var isValid = false;
      this.setState({ assetClass_err: "Mandatory Field" });
    } else {
      var isValid = true;
      this.setState({ assetClass_err: "" });
    }

    if (data.growth == undefined) {
      var isValid = false;
      this.setState({ growth_err: "Mandatory Field" });
    } else {
      var isValid = true;
      this.setState({ growth_err: "" });
    }

    if (data.target_scheme == "") {
      var isValid = false;
      this.setState({ target_scheme_err: "Mandatory Field" });
    } else {
      var isValid = true;
      this.setState({ target_scheme_err: "" });
    }

    if (data.date == "") {
      var isValid = false;
      this.setState({ date_err: "Mandatory Field" });
    } else {
      var isValid = true;
      this.setState({ date_err: "" });
    }

    if (data.date_from == '') {
      var isValid = false;
      this.setState({ date_from_err: "Mandatory Field" });
    } else {
      var isValid = true;
      this.setState({ date_from_err: "" });
    }

    if (data.date_to == '') {
      var isValid = false;
      this.setState({ date_to_err: "Mandatory Field" });
    } else {
      var isValid = true;
      this.setState({ date_to_err: "" });
    }

    // if (data.frequency == "") {
    //   var isValid = false;
    //   this.setState({ frequency_err: "Mandatory Field" });
    // } else {
    //   var isValid = true;
    //   this.setState({ frequency_err: "" });
    // }

    if (data.amt == '') {
      var isValid = false;
      this.setState({ amt_err: "Mandatory Field" });
    } else {
      var isValid = true;
      this.setState({ amt_err: "" });
    }

    return isValid;

  }

  addClick = (e) => {
    let userPro_id = $('select[name="userPro_id"]').val();
    let key = $("input:radio[name=key]:checked").val();
   
    if(userPro_id==""){
      toast.error("Please Select Profile!")
    }
    else if(key==undefined){
      toast.error("Please Select Scheme!")
    }
    else{
      const data = {
        // customer_id : this.state.userList,
        scheme: $("input:radio[name=key]:checked").val(),
        assetClass: $("input:radio[name=asset]:checked").val(),
        growth: $("input:radio[name=growth]:checked").val(),
        target_scheme: $('select[name="target_scheme"]').val(),
        target_scheme_nm: $("#target_scheme option:selected").text(),
        schemeName: this.state.userschemeName.scheme,
        folio_no: this.state.userschemeName.folio_no,
        amc_code: this.state.userschemeName.amc_code,
        product_code: this.state.userschemeName.product_code,
        reinvest: this.state.userschemeName.reinvest,
        iin: this.state.userschemeName.iin,
        date: $('select[name="date"]').val(),
        date_from: $('input[name="month_from"]').val(),
        date_to: $('input[name="month_to"]').val(),
        frequency: $('select[name="frequency"]').val(),
        amt: $('input[name="amt"]').val()
      }
  
      if (this.handleFormValidation(data)) {
        this.setState(prevState => ({
          Items: [...prevState.Items, data]
        }))
      }
    }
    

  }

  delete_scheme(itemId) {
    // alert(itemId);
    this.setState({ Items: [] });
    this.state.Items.map((val, key) => {
      console.log(key);
      if (key != itemId) {
        this.setState(prevState => ({
          Items: [...prevState.Items, val]
        }))
      }
    })
  }

  oderNow = (e) => {
    const userData = JSON.parse(localStorage.getItem("loginUserData"))
    let data = []; let total_amt = 0;
      this.state.Items.map((val, key) => {
        total_amt = parseInt(total_amt) + parseInt(val.amt);
        const swp_from_arr = val.date_from.split('-');
        const swp_to_arr = val.date_to.split('-');
        const from_mn = new Date(swp_from_arr[1]).toString().split(' ')[1];
        const to_mn = new Date(swp_to_arr[1]).toString().split(' ')[1];
        var to_year = "";
      
        
        const value = {
          folio: val.folio_no,
          amc: val.amc_code,
          product_code: val.product_code,
          reinvest: val.reinvest,
          amount: val.amt,
          perpetual_flag:"N",
          input_ref_no: "",
          sip_paymech: "M",
          ach_amt: null,
          transfer_date: "",
          from_date: val.date + "-" + from_mn + "-" + swp_from_arr[0],
          to_date:  val.date + "-" + to_mn + "-" + swp_to_arr[0],
          target_product: null,
          periodicity: "OM",
          period_day: val.date,
          sip_from_date: null,
          sip_end_date: null,
          sip_freq: null,
          sip_amount: val.amt,
          sip_period_day: val.date,
          amt_unit_type: "AMOUNT",
          amt_unit: "N",
          all_unit: "N",
        }
        data.push(value)
      })

      const value2 = {
        email: userData.email,
        iin: this.state.userschemeName.iin,
        instrm_amount: total_amt,
        bank_code: "",
        holder_name:"",
        accountNo: "",
        acoount_type: "",
        branch: "",
        umrn: "",
        until_cancelled: "N",
        ach_amt: "",
        ach_fromdate: "",
        ach_enddate: "",
        childArr: data
      }
      
      console.log("value2",value2);
      Axios.post("/prodigypro/api/multi_regularSIP", value2)
      .then((result) => {
          console.log(result.data.data);
          if (result.data.data.status == 400) {
            toast.error(result.data.data.message)
          } else {
            //window.$('#exampleModal').modal('show');
            this.setState({orderData: result.data.data.message})
            // toast.success(result.data.data.message)
          }
      });
  }
  render() {
    let data = []; let temp; let DataList = []; let date;

    if (this.state.userFREQUENCIES_arr) {
      for (var i = 0; i < this.state.userFREQUENCIES_arr.length; i++) {
        if (this.state.userFREQUENCIES_arr[i] == "D") {
          temp = <option value="D">Daily</option>
        } else if (this.state.userFREQUENCIES_arr[i] == "WD") {
          temp = <option value="WD">Weekly</option>
        } else if (this.state.userFREQUENCIES_arr[i] == "OW") {
          temp = <option value="OW">Once in a week</option>
        } else if (this.state.userFREQUENCIES_arr[i] == "OM") {
          temp = <option value="OM">Monthly</option>
        } else if (this.state.userFREQUENCIES_arr[i] == "Q") {
          temp = <option value="Q">Quatrly</option>
        } else if (this.state.userFREQUENCIES_arr[i] == "H") {
          temp = <option value="H">Half-Yearly</option>
        } else if (this.state.userFREQUENCIES_arr[i] == "Y") {
          temp = <option value="Y">Yearly</option>
        } else if (this.state.userFREQUENCIES_arr[i] == "TW") {
          temp = <option value="TW">Twice a month</option>
        } else if (this.state.userFREQUENCIES_arr[i] == "BZ") {
          temp = <option value="BZ">Business Daye</option>
        }
        data.push(temp)
      }
    }

    if (this.state.userSwpDate) {
      for (var i = 0; i < this.state.userSwpDate.length; i++) {
        date = <option value={this.state.userSwpDate[i]}>{this.state.userSwpDate[i]}</option>
        DataList.push(date)
      }
    }
    return (
      <>
        <StyleComponent />
        <Helmet>
          <title>Prodigy Pro - STP</title>
        </Helmet>
        <style>
          {`
             #wait{
              display:none;
            }
            .my-custom-scrollbar {
              position: relative;
              overflow: auto;
              }
              .table-wrapper-scroll-y {
              display: block;
              }
          `}
        </style>

        {/* Page Wrapper */}
        <div id="wrapper">
          {/* Sidebar */}
          <Sidebar />
          {/* End of Sidebar */}

          <ToastContainer position="top-right" className="mt-8" />
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
                    <li className="breadcrumb-item active" aria-current="page">STP</li>
                  </ol>
                </nav>
                <div className="row">
                  {/* Area Chart */}
                  <div className="col-xl-12 col-lg-12">
                    <div className="card shadow mb-4">
                      {/* Card Header - Dropdown */}
                      <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                        <h6 className="m-0 font-weight-bold text-danger">STP</h6>
                      </div>
                      {/* Card Body */}
                      <div className="card-body">
                        <div className="row">
                          <div className="col-xl-4 col-lg-4 mb-4">
                            <span className="has-float-label">
                              <select className="form-control input-text" name="userPro_id" onChange={this.userProfile}>
                                <option value=''>Select Profile</option>
                                {this.state.userList ?
                                  this.state.userList.map((item, key) =>
                                    <option value={item.id}>{item.investor_name} {item.jh1_name != "undefined" ? " | " + item.jh1_name : null}{item.jh2_name != "undefined" ? " | " + item.jh2_name : null}</option>
                                  ) : null}
                              </select>
                              <label htmlFor="profile" className="text-label">Select Profile</label>
                            </span>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-xl-12 col-lg-12 mb-4 table-wrapper-scroll-y my-custom-scrollbar">
                            <label htmlFor="source" className="text-label">Select Source Scheme</label>
                            <table className="table">
                              <thead className="thead-light">
                                <tr>
                                  <th scope="col">Select</th>
                                  <th scope="col">Scheme Name</th>
                                  <th scope="col">Folio Number</th>
                                  <th scope="col">Total Units</th>
                                  <th scope="col">AUM</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr id="wait">
                                  <td colSpan="5" className="text-danger">Please Wait...</td>
                                </tr>
                                {this.state.userSchemeList ?
                                  this.state.userSchemeList.map((item, key) =>
                                    <tr>
                                      <th scope="row"><input type="radio" name="key" value={key} onChange={this.onscheme} />
                                        <input type="hidden" id={"folio_no_" + key} name="folio_no" value={item.folio_no} />
                                        <input type="hidden" id={"scheme_nm_" + key} name="scheme_nm_${key}" value={item.scheme_name} />
                                      </th>
                                      <td>{item.scheme_name}</td>
                                      <td>{item.folio_no}</td>
                                      <td>{item.unit}</td>
                                      <td>{item.amu}</td>  
                                    </tr>
                                  ) : null}
                              </tbody>
                            </table>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-xl-4 col-lg-4 mb-4">
                            <p className="text-label mb-1 p-radio">Asset Class</p>
                            <input className=" input-text" id="equity" type="radio" name="asset" value="Equity" onChange={this.targetScheme} />
                            <label htmlFor="equity" className="text-label">Equity</label>
                            <input className="input-text ml-3" id="debt" type="radio" name="asset" value="DEBT" onChange={this.targetScheme} />
                            <label htmlFor="debt" className="text-label">Debt</label><br></br>
                            <small className="text-danger pull-left">{this.state.assetClass_err}</small>
                          </div>
                          <div className="col-xl-4 col-lg-4 mb-4">
                            <p className="text-label mb-1 p-radio">Option</p>
                            <input className=" input-text" id="growth" type="radio" name="growth" value="GROWTH" onChange={this.targetScheme} />
                            <label htmlFor="growth" className="text-label">Growth</label>
                            <input className="input-text ml-3" id="dividend" type="radio" name="growth" value="Dividend" onChange={this.targetScheme} />
                            <label htmlFor="dividend" className="text-label">IDCW</label><br></br>
                            <small className="text-danger pull-left">{this.state.growth_err}</small>
                          </div>
                          <div className="col-xl-4 col-lg-4 mb-4">
                            <span className="has-float-label">
                              <select className="form-control input-text" data-live-search="true" name="target_scheme" id="target_scheme">
                                <option value="">Select</option>
                                {this.state.usertargetScheme ?
                                  this.state.usertargetScheme.map((item, key) =>
                                    item.STP_ALLOWED == "Y" ?
                                      <option value={item.PRODUCT_CODE}>{item.PRODUCT_LONG_NAME}</option>
                                      : null
                                  ) : null}
                              </select>
                              <label htmlFor="target" className="text-label">Select Target Scheme</label>
                              <small className="text-danger pull-left">{this.state.target_scheme_err}</small>
                            </span>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-xl-4 col-lg-4 mb-4">
                            <span className="has-float-label">
                              <input className="form-control input-text" id="amt" name="amt" type="Text" placeholder="Enter Value" />
                              <label htmlFor="amt" className="text-label">Enter Amount</label>
                              <small className="text-danger pull-left">{this.state.amt_err}</small>
                            </span>
                          </div>
                          <div className="col-xl-4 col-lg-4 mb-4">
                            <span className="has-float-label">
                              <select className="form-control input-text" name="frequency" data-live-search="true" >
                                <option value="">Select</option>
                                {data}
                              </select>
                              <label htmlFor="Frequency" className="text-label">Select Frequency</label>

                            </span>
                          </div>
                          <div className="col-xl-4 col-lg-4 mb-4">
                            <span className="has-float-label">
                              <select className="form-control input-text" name="date" data-live-search="true" >
                                <option value="">Select</option>
                                {DataList}
                              </select>
                              <label htmlFor="Frequency" className="text-label">Select Date</label>
                              <small className="text-danger pull-left">{this.state.date_err}</small>
                            </span>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-xl-4 col-lg-4 mb-4">
                            <span className="has-float-label">
                              <input className="form-control input-text" id="month_from" name="month_from" type="month" placeholder="Enter Value" />
                              <label htmlFor="date_from" className="text-label">STP Start </label>
                              <small className="text-danger pull-left">{this.state.date_from_err}</small>
                            </span>
                          </div>
                          <div className="col-xl-4 col-lg-4 mb-4">
                            <span className="has-float-label">
                              <input className="form-control input-text" id="month_to" name="month_to" type="month" placeholder="Enter Value" />
                              <label htmlFor="date_to" className="text-label">STP End </label>
                              <small className="text-danger pull-left">{this.state.date_to_err}</small>
                            </span>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-xl-12 col-lg-12 mb-4 text-right">
                            <button className="btn btn-sm btn-danger shadow-sm" onClick={this.addClick.bind(this)} >+ Add More</button>
                          </div>
                        </div>
                        {this.state.Items!='' ?
                              
                        <table className="table mb-5">
                          <thead className="thead-light">
                            <tr>
                              <th scope="col">IIN</th>
                              <th scope="col">Source Scheme</th>
                              <th scope="col">Folio Number</th>
                              <th scope="col">Target Scheme</th>
                              <th scope="col">STP Start Date</th>
                              <th scope="col">STP End Date</th>
                              <th scope="col">Frequency</th>
                              <th scope="col">Amount</th>
                              <th scope="col">Remove</th>
                            </tr>
                          </thead>
                          <tbody>

                            {this.state.Items.map((item, key) =>
                                <tr id={"rowData_" + key}>
                                  <th scope="row">{item.iin}</th>
                                  <td>{item.schemeName}</td>
                                  <td>{item.folio_no}</td>
                                  <td>{item.target_scheme_nm}</td>
                                  <td>{item.date}-{item.date_from}</td>
                                  <td>{item.date}-{item.date_to}</td>
                                  <td>
                                    {item.frequency == "D" ? "Daily" : null}
                                    {item.frequency == "WD" ? "Weekly" : null}
                                    {item.frequency == "OW" ? "Once in a week" : null}
                                    {item.frequency == "OM" ? "Monthly" : null}
                                    {item.frequency == "Q" ? "Quatrly" : null}
                                    {item.frequency == "H" ? "Half-Yearly" : null}
                                    {item.frequency == "Y" ? "Yearly" : null}
                                    {item.frequency == "TW" ? "Twice a month" : null}
                                    {item.frequency == "BZ" ? "Business Daye" : null}
                                  </td>
                                  <td>{item.amt}</td>
                                  <td><i className="fa fa-trash text-danger" onClick={this.delete_scheme.bind(this, key)} /></td>
                                </tr>
                              ) }


                          </tbody>
                        </table>: null}
                        <div className="text-right">
                          <a href="javascript:void(0);" className="btn-theme-1 btn-theme-effect" onClick={this.oderNow.bind()}>
                            <span className="button-text"  >Order Now</span>
                            <span className="round"><i className="fa fa-chevron-right" /></span>
                          </a>
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
export default STP
