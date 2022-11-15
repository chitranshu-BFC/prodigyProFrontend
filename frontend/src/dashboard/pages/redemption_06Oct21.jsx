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


class Redemption extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      users: []
    };

    this.state = {
      Items: []
    };
  }

  componentDidMount(){
    const schemeList = []; const list = '';
    const userData = JSON.parse(localStorage.getItem("loginUserData"))
    const data = {
        email:userData.email,
    }
    
    Axios.post("/prodigypro/api/User_profile", data)
    .then((res) => {
      this.setState({userList:res.data.data.data})
    })

    Axios.post("/prodigypro/api/amc")
    .then((response) => {
      this.setState({amcList:response.data.data.data})
    })
  }

  userProfile = e => {
    let userPro_id; let schemeList =[];
    userPro_id = $('select[name="userPro_id"]').val();
    $("#wait").css('display','block');
    this.setState({userSchemeList:''})
    this.setState({ Items: [] });
    $('input[name="all_units"]').val();
    $('input[name="amt_unit_type"]').val("");
    $('input[name="amt_unit"]').val("");
    $('input[name="amt"]').val("");
    $('input[name="unit"]').val("");
    $('select[name="scheme_name"]').val("");
    $("#unit_val").css('display','none');
    $('input[name="amt_type"]').prop('checked', false);
    
    this.state.userList.map(value => {
      if(value.id==userPro_id){
        const amcdata = {
          pan_card:value.fh_pan_no,
          IIN:value.customer_id,
        }

        Axios.post("/prodigypro/api/amclist", amcdata)
        .then((response) => {
          this.setState({amc:response.data.data.data})
          //let count = 1;
          response.data.data.data.map(value => {
            this.state.amcList.map(value2 => { console.log("folio",value.folio)
              if(value2.amc_code==value.amc_code){
                const data = {
                  folio:value.folio,
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
                      if(resss.data.data.status==200){
                        let folioVal =  resss.data.data.data;
                      if((resss.data.data.data[0].UNITS!=0) && (resss.data.data.data[0].UNITS!=null)){
                          schemeList.push({ scheme_name: key.products.PRODUCT_LONG_NAME, folio_no: data.folio, SWP_DATES: key.products.SWP_DATES, FREQUENCIES: key.products.SYSTEMATIC_FREQUENCIES, amc_code: key.products.AMC_CODE, product_code: key.products.PRODUCT_CODE, reinvest: key.products.REINVEST_TAG, iin: amcdata.IIN , unit: resss.data.data.data[0].UNITS , amu:resss.data.data.data[0].AMOUNT , isin: key.products.ISIN })
                          this.setState({ userSchemeList: schemeList })
                          console.log("Scheme list", schemeList)
                        }
                      }
                    })
                  })
                  // this.setState({userSchemeList:schemeList})
                  // console.log("Scheme list",schemeList)
                })
              } 
            })
          })
        })
      }
    })
  }

  onscheme = e => { // folio_no
    
    $("#unit_val").css('display','none');
    $('input[name="amt_type"]').prop('checked', false);

    let key = $("input:radio[name=key]:checked").val();
    let folio_no =  $('#folio_no_'+key).val();
    let scheme =  $('#scheme_nm_'+key).val();
    
    // alert(key+" - "+folio_no+" - "+scheme)
    this.state.userSchemeList.map(val => {
      console.log("scheme list",val)
      if((val.scheme_name==scheme) && (val.folio_no==folio_no)){
       this.setState({userSchemeUnits:{AMOUNT:val.amu,UNITS:val.unit}}) 
       this.setState({userschemeName:{folio_no:folio_no,scheme:scheme,amc_code:val.amc_code,prodcode:val.product_code,iin:val.iin}})
       //console.log("FREQUENCIES_arr",FREQUENCIES_arr)
      }
    })
  }

  amountType = (e) => {
    let amt_type = $("input:radio[name=amt_type]:checked").val();
    this.setState({ amt_type_err: "" });
    if(amt_type=="amt"){
      $("#amt_div").css('display','block');
      $("#unit_div").css('display','none');
      $("#unit_val").css('display','block');
      $('input[name="all_units"]').val("n");
      $('input[name="amt_unit_type"]').val("amount");
      $('input[name="unit"]').val("");
      $("#unit_val").html('Amount:- '+this.state.userSchemeUnits.AMOUNT+',<br> As On:- '+this.state.userSchemeUnits.navdate);
    }else if(amt_type=="unit"){
      $("#amt_div").css('display','none');
      $("#unit_div").css('display','block');
      $("#unit_val").css('display','block');
      $('input[name="all_units"]').val("n");
      $('input[name="amt_unit_type"]').val("unit");
      $('input[name="amt"]').val("");
      $('input[name="unit"]').val("");
      $("#unit_val").html('unit:- '+this.state.userSchemeUnits.UNITS+',<br> As On:- '+this.state.userSchemeUnits.navdate);
    }else if(amt_type==""){
      $("#amt_div").css('display','none');
      $("#unit_div").css('display','none');
      $("#unit_val").css('display','block');
      $('input[name="all_units"]').val("y");
      $('input[name="amt_unit_type"]').val("unit");
      $('input[name="amit"]').val("");
      $('input[name="unit"]').val(this.state.userSchemeUnits.UNITS);
      $("#unit_val").html('unit:- '+this.state.userSchemeUnits.UNITS+',<br> As On:- '+this.state.userSchemeUnits.navdate);
    }
  }

  handleFormValidation(data) {
    let dataErr=[];
    if (data.amt_type == undefined) {
      var isValid ={amt_type:"1"}
      dataErr.push(isValid);
      this.setState({ amt_type_err: "Mandatory Field" });
    } else {
      // var isValid = true;
      this.setState({ amt_type_err: "" });
    }


    if(data.amt_type=="amt"){
      if (data.amt == "") {
        var isValid ={amt:"1"}
        dataErr.push(isValid);
        this.setState({ amt_err: "Mandatory Field" });
      } else {
        this.setState({ amt_err: "" });
      }
    }

    if(data.amt_type=="unit"){
      if (data.unit == "") {
        var isValid ={unit:"1"}
        dataErr.push(isValid);
        this.setState({ unit_err: "Mandatory Field" });
      } else {
        if (data.unit == 0) {
          var isValid ={assetunitClass:"1"}
          dataErr.push(isValid);
          this.setState({ unit_err: "Minimum Unit 1" });
        } else {
          // var isValid = true;
          this.setState({ unit_err: "" });
        }
      }
    }

    return dataErr.length;
  }

  addClick = (e)=> {
    let userPro_id = $('select[name="userPro_id"]').val();
    let key = $("input:radio[name=key]:checked").val();
   
    if(userPro_id==""){
      toast.error("Please Select Profile!")
    }
    else if(key==undefined){
      toast.error("Please Select Scheme!")
    }
    else{

      var amount = $('input[name="amt"]').val();
      if(amount==''){
         amount = $('input[name="unit"]').val();
      }


      const data = {
        // customer_id : this.state.userList,
        schemeName : this.state.userschemeName.scheme,
        folio_no : this.state.userschemeName.folio_no,
        amc_code : this.state.userschemeName.amc_code,
        product_code : this.state.userschemeName.prodcode,
        iin : this.state.userschemeName.iin,
        amt_type:$("input:radio[name=amt_type]:checked").val(),
        all_units:$('input[name="all_units"]').val(),
        amt_unit_type:$('input[name="amt_unit_type"]').val(),
        amt_unit:$('input[name="amt_unit"]').val(),
        amt:$('input[name="amt"]').val(),
        amount:amount,
        unit:$('input[name="unit"]').val()
      }
    
      if (this.handleFormValidation(data)==0) {
        this.setState(prevState => ({
          Items: [...prevState.Items,data]
        }))
      }
    }
    
    
  }

  delete_scheme(itemId){
    // alert(itemId);
    this.setState({ Items: [] });
    this.state.Items.map((val,key) => {
        console.log(key);
        if(key!=itemId){
          this.setState(prevState => ({
            Items: [...prevState.Items,val]
          }))
        }
    })
  }

  oderNow = (e) => {
    const userData = JSON.parse(localStorage.getItem("loginUserData"))
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
        schemeName : this.state.userschemeName.scheme,
        folio_no : this.state.userschemeName.folio_no,
        amc_code : this.state.userschemeName.amc_code,
        product_code : this.state.userschemeName.prodcode,
        iin : this.state.userschemeName.iin,
        amt_type:$("input:radio[name=amt_type]:checked").val(),
        all_units:$('input[name="all_units"]').val(),
        amt_unit_type:$('input[name="amt_unit_type"]').val(),
        amt_unit:$('input[name="amt_unit"]').val(),
        amt:$('input[name="amt"]').val(),
        unit:$('input[name="unit"]').val()
      }
    
      if (this.handleFormValidation(data)==0) {
        if(this.state.Items==''){
         
            let amt = $('input[name="amt"]').val();
            var amount = "";
            if(amt){
              amount = $('input[name="amt"]').val();
            }else{
              amount =$('input[name="unit"]').val();
            }
      
            const value = {
              email:userData.email,
              amc:this.state.userschemeName.amc_code,
              product_code:this.state.userschemeName.prodcode,
              iin:this.state.userschemeName.iin,
              folio:this.state.userschemeName.folio_no,
              all_units:$('input[name="all_units"]').val(),
              amt_unit_type:$('input[name="amt_unit_type"]').val(),
              amt_unit:amount,
            }
			
			 $("#overlay").css("display","block")
              Axios.post("/prodigypro/api/redeem",value)
              .then((result) => {
				 $("#overlay").css("display","none")
                console.log(result.data.data.status);
                if(result.data.data.status==400){
                  // window.$('#exampleModal').modal('show');
                  toast.error(result.data.data.message)
                }else{
                  window.$('#exampleModal').modal('show');
                  this.setState({orderData: result.data.data.data})
                  toast.success(result.data.data.message)
                }
              });
        }else{
          this.state.Items.map((val,key) => {
              // var amount = "";
              // if(val.amt){
              //   amount = val.amt;
              // }else{
              //   amount = val.unit;
              // }
        
              const value = {
                email:userData.email,
                amc:val.amc_code,
                product_code:val.product_code,
                iin:val.iin,
                folio:val.folio_no,
                all_units:val.all_units,
                amt_unit_type:val.amt_unit_type,
                amt_unit:val.amount,
              } 

              console.log("gg",JSON.stringify(value))
			  $("#overlay").css("display","block")
              Axios.post("/prodigypro/api/redeem",value)
              .then((result) => {
				$("#overlay").css("display","none")
                console.log("gg",result.data.data.message);
                if(result.data.data.status==400){
                  if(result.data.data.message!=''){
                    toast.error(result.data.data.message)
                  }else{
                    toast.error(result.data.data.message_full.Status_Desc._text)
                  }
                }else{
                  window.$('.bd-example-modal-lg').modal('show');
                  this.setState({orderData: result.data.data.data})
                  // toast.success(result.data.data.message)
                }
              });
            })
        }
      }
    }

    


  }

    render(){
        
        return(
        <>
         <StyleComponent/>
        <Helmet>         
            <title>Prodigy Pro - Redemption</title>
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
            #unit_div{
               display:none;
            }
            #unit_val{
              display:none;
            }
            #amt_val{
              display:none;
            }
            .title{
              background: #e74a3b;
              color: #fff;
            }
            #sub_title{
              background:#22b57 !important;
              color: #0c6d4e;
            }
            .textFont{
              color: blue;
            }
			#overlay{
				display:none;
			}
          `}
          </style>

        {/* Page Wrapper */}
      <div id="wrapper">
	  
		{/* Loader Page */}
		<div id="overlay" >
            <div class="spinner"></div>
            <br/><b className="text-danger">Please Wait...</b>
        </div>
		
		
      <div class="modal fade bd-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
          
          <div className="modal-header title">
            <h5 className="modal-title text-center " id="exampleModalLabel">Order Screen</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="table-responsive-lg"> 
          <table class="table">
              <thead class="thead-light">
                <tr>
                  <th scope="col"> Unique No</th>
                  <th scope="col"> Trxn No</th>
                  <th scope="col">Application No</th>
                  <th scope="col">Fund</th>
                  <th scope="col">Scheme</th>
                  <th scope="col">Scheme Name</th>
                  <th scope="col">Amount</th>
                  <th scope="col">Status</th>
                </tr>
              </thead>
              <tbody>
              {this.state.orderData?
                this.state.orderData.map((val)=>
                <tr>
                  <th scope="row">{val.Unique_No}</th>
                  <td>{val.Trxn_No}</td>
                  <td>{val.Application_No}</td>
                  <td>{val.Fund}</td>
                  <td>{val.Scheme}</td>
                  <td>{val.Scheme_Name}</td>
                  <td>{val.Amt}</td>
                  <td>{val.Status_Desc}</td>
                </tr>
              ):null}

              </tbody>
          </table>
          </div>
          <div class="modal-body">
            <div className="alert alert-info">
              <h6 className="text-left text-danger">Note:</h6>
              <p>{this.state.orderMsg}</p>
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
        
          </div>
     
          </div>
        </div>
      </div>
  
        {/* Sidebar */}
            <Sidebar/>
        {/* End of Sidebar */}

        <ToastContainer position="top-right" className="mt-8" />
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
            <li className="breadcrumb-item active" aria-current="page">Redemption</li>
          </ol>
        </nav>
        <div className="row">
          {/* Area Chart */}
          <div className="col-xl-12 col-lg-12">
            <div className="card shadow mb-4">
              {/* Card Header - Dropdown */}
              <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                {/* <h6 className="m-0 font-weight-bold text-danger">Redemption</h6>  */}
              </div>
              {/* Card Body */}
              <div className="card-body">
                <div className="row">
                  <div className="col-xl-4 col-lg-4 mb-4">
                    <span className="has-float-label">
                      <select className="form-control input-text" name="userPro_id" onChange={this.userProfile}>
                      <option value="">Select Profile</option>
                      {this.state.userList?
                            this.state.userList.map((item, key) =>
                                <option value={item.id}>{item.investor_name} {item.jh1_name!="undefined" ? " | "+item.jh1_name:null}{item.jh2_name!="undefined" ? " | "+item.jh2_name:null}</option>
                              ):null}
                      </select>
                      <label htmlFor="profile" className="text-label">Select Profile</label>
                    </span>
                  </div>
                </div>
                <div className="row">
                  <div className="col-xl-12 col-lg-12 mb-4 table-wrapper-scroll-y my-custom-scrollbar">
                    <label htmlFor="source" className="text-label">Select Scheme</label>
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
                      {this.state.userSchemeList?
                            this.state.userSchemeList.map((item, key) =>
                            <tr>
                              <th scope="row"><input type="radio" name="key" value={key} onChange={this.onscheme}/>
                              <input type="hidden" id={"folio_no_"+key} name="folio_no" value={item.folio_no} />
                              <input type="hidden" id={"scheme_nm_"+key}  name="scheme_nm_${key}" value={item.scheme_name} />
                              </th>
                              <td>{item.scheme_name}</td>
                              <td>{item.folio_no}</td>
                              <td>{item.unit}</td>
                              <td>{item.amu}</td>                                       
                            </tr>        
                            ):null}                                           
                      </tbody>
                    </table>                                      
                  </div>
                </div>
                <div className="row">
                  <div className="col-xl-4 col-lg-4 mb-4">
                    <p className="text-label mb-1 p-radio">Redemption Type</p>
                    <input className=" input-text" id="amt" type="radio" name="amt_type" value="amt" onChange={this.amountType}/>
                    <label htmlFor="amt" className="text-label">By Amount</label>
                    <input className="input-text ml-3" id="units" type="radio" name="amt_type" value="unit"  onChange={this.amountType}/>
                    <label htmlFor="units" className="text-label">By Units</label>
                    <input className="input-text ml-3" id="all_units" type="radio" name="amt_type" value=""  onChange={this.amountType}/>
                    <label htmlFor="all_units" className="text-label">All Units</label>     
                    <small className="text-danger pull-left">{this.state.amt_type_err}</small>                                    
                  </div>
                  <div className="col-xl-4 col-lg-4 mb-4" id="amt_div">
                    <span className="has-float-label" >
                      <input className="form-control input-text" id="val" type="Text" name="amt" placeholder="Amount" />
                      <label htmlFor="val" className="text-label">Enter Amount</label>
                    </span>
                    <small className="text-danger pull-left">{this.state.amt_err}</small>
                  </div>    
                  <div className="col-xl-4 col-lg-4 mb-4"  id="unit_div">
                    <span className="has-float-label">
                      <input className="form-control input-text" id="val" type="Text"  name="unit"  placeholder="Amount" />
                      <label htmlFor="val" className="text-label">Enter Unit</label>
                    </span>
                    <small className="text-danger pull-left">{this.state.unit_err}</small>
                  </div>
                 
                   <div className="col-xl-4 col-lg-4 mb-4">
                   <span className="has-float-label" id="unit_val">
                   
                   </span>
                   <input id="all_units" type="hidden" name="all_units" />
                   <input id="amt_unit_type" type="hidden" name="amt_unit_type" />
                  </div>                               
                </div>
                <div className="row">
                {this.state.Items==''?
                          <div className="col-xl-12 col-lg-12 mb-4 text-right">
                            <button className="btn btn-sm btn-danger shadow-sm" onClick={this.addClick.bind(this)}>+ Add </button>
                          </div>
                          :<div className="col-xl-12 col-lg-12 mb-4 text-right">
                            <button className="btn btn-sm btn-danger shadow-sm" onClick={this.addClick.bind(this)}>+ Add More</button>
                        </div>}
                </div>
                {this.state.Items!=''?
                <table className="table mb-5">
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">IIN</th>
                      <th scope="col">Scheme Name</th>
                      <th scope="col">Folio Number</th>
                      <th scope="col">Redemption Type</th>
                      <th scope="col">Amount/unit</th>
                      <th scope="col">Remove</th>
                    </tr>
                  </thead>
                  <tbody>
                  {this.state.Items.map((item, key) =>
                    <tr id={"rowData_"+key}>
                      <th scope="row">{item.iin}</th>
                      <td>{item.schemeName}</td>
                      <td>{item.folio_no}</td>
                      <td>
                        {item.amt_type=="amt"?"By Amount":null}
                        {item.amt_type=="unit"?"By Units":null}
                        {item.amt_type==""?"All Units":null}
                      </td>
                      <td>
                        {item.amt?item.amt:item.unit}
                      </td>                             
                      <td><i className="fa fa-trash text-danger" onClick={this.delete_scheme.bind(this, key)}/></td>
                    </tr>
                  )}
                  </tbody>
                </table>:null}
                <div className="text-right">
                  <a href="javascript:void(0)" className="btn-theme-1 btn-theme-effect" onClick={this.oderNow.bind()}>
                    <span className="button-text">Order Now</span>
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
export default Redemption
