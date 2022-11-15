import React, {component} from 'react';
import { Link, Redirect } from 'react-router-dom';
import Header from './header';
import Footer from './footer';
import Sidebar from './sidebar';
import {Helmet} from "react-helmet";
import Axios from 'axios';
import $ from 'jquery';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


class Cart extends React.Component{
  constructor(){
    super();
    this.state = {
      users: []
    };
    this.state = {
      Items: []
    };

    this.handleShow = this.handleShow.bind(this);

  }


  componentDidMount(){
   
    this.setState({ modalState: true });
    const userData = JSON.parse(localStorage.getItem("loginUserData"))
    const data = {
        email:userData.email,
    }

    Axios.post("/prodigypro/api/User_profile", data)
    .then((res) => {
        // console.log("dscd",res.data.data.data)
        this.setState({userList:res.data.data.data})
    })

	const userPro = JSON.parse(localStorage.getItem("user"))
    // console.log("dscd",userPro)
    const data2 = {
      pan_card:userPro.fh_pan_no,
    }

    Axios.post("/prodigypro/api/amclist", data2)
    .then((res2) => {
        console.log("amcList",res2.data.data.data)
        this.setState({amcList:res2.data.data.data})
    })

    const schemeList = []; 
    const isinList = JSON.parse(localStorage.getItem("isinDATA"))
    isinList.map(val => {
      const data = {
          isin:val.isin,
          amc_code:val.amc_code
      }
    
      Axios.post("/prodigypro/api/ProductViaISIN", data)
      .then((result) => {
          console.log("ISIN",result.data.data.data[0].ISIN)
          schemeList.push(result.data.data.data[0]);
          this.setState({ userSchemeList: schemeList })
      })   

    })

  }

deleteCart = (e)=>{
  // alert(e)
  const schemeList = []; 
  this.setState({ userSchemeList: "" })
  this.state.userSchemeList.map((val, key) => {
    if(val.ISIN!=e){
      schemeList.push(val);
      this.setState({ userSchemeList: schemeList })
    }
  })
}

month = (e) =>{
  let pre = $("#perpetual_val_"+e).val();
  if(pre=="Y"){ 
    $("#month_div_"+e).show();
    $("#perpetual_val_"+e).val("N");
  }else{
    $("#month_div_"+e).hide();
    $("#perpetual_val_"+e).val("Y");
  }
}

validationFrom(data,sr,dataErr){
  
  var count = this.state.userSchemeList.length;
  if(data.amt==""){
    var dd ={amt:sr}
    dataErr.push(dd);
   $("#amt_err_"+data.isin).html("Mandatory Field")
  }else{
    
      if(data.amt<1000){
      var isValid=false
      var dd ={dd:sr}
      dataErr.push(dd);
      window.$('#OrderMsg').modal('show');
      this.setState({ validMsg:"Minimum SIP Amount should be 1000 & in multiple of 500" })
      $("#amt_err_"+data.isin).html("")
    }else{
     
      var isValid=true
      $("#amt_err_"+data.isin).html("")

    }
  }

  if(data.date==""){
    var dd ={dd:sr}
    dataErr.push(dd);
    $("#date_err_"+data.isin).html("Mandatory Field")
  }else{
    var startDay = new Date();  
    var endDay = new Date(data.date); 
    var millisBetween = endDay.getTime() - startDay.getTime(); 
    var days = parseInt(millisBetween / (1000 * 3600 * 24)); 
    // alert(days);   
    if (days <6) {
      var dd ={dd:sr}
      dataErr.push(dd);
      $("#date_err_"+data.isin).html("Difference between current Date and SIP date should be atlest 7 days");
    } else {
      $("#date_err_"+data.isin).html("");
    }
  }
  
  let perpetual_val = $('input[name="perpetual_val_'+data.isin+'"]').val();
  if((data.month=="") && (perpetual_val=="N") ){
    var dd ={mm:sr}
    dataErr.push(dd);
    // $('input[name="perpetual_val_'+data.isin+'"]').val("N");
    $("#perpetual_val_"+data.isin).val("N");
    $("#month_err_"+data.isin).html("Mandatory Field")
  }else{
    $("#month_err_"+data.isin).html("")
  }

  // if((data.perpetual_val=="N")){
  // }else{
  //  $("#month_err_"+data.isin).html("")
  // }

  // alert(perpetual_val)
  if(count==sr){
    return dataErr.length;
  }
  
}

cnfPurchase=(e)=>{
  // scheme_
  this.setState({ Items: [] });
  var sr=1; var dataList = [];   let dataErr = [];
  this.state.userSchemeList.map((val, key) => {
    var e_date=''; var year='';
    var mm = $('select[name="month_'+val.ISIN+'"]').val();
    let pe_val = $('input[name="perpetual_val_'+val.ISIN+'"]').val();
    var dd=$('input[name="date_'+val.ISIN+'"]').val();
    const swp_from_arr = dd.split('-');
    const from_mn = new Date(swp_from_arr[1]).toString().split(' ')[1];
    
    // alert(pe_val)
    if(pe_val=="N"){
      let yy = mm / 12;
      year = parseInt(swp_from_arr[0])+parseInt(yy);
      e_date = year+"-"+swp_from_arr[1] + "-"+swp_from_arr[2];
    }

    const data = {
      scheme:$('input[name="scheme_'+val.ISIN+'"]').val(),
      date:$('input[name="date_'+val.ISIN+'"]').val(),
      end_date:e_date,
      amt:$('input[name="amt_'+val.ISIN+'"]').val(),
      perpetual_val:$('input[name="perpetual_val_'+val.ISIN+'"]').val(),
      month:$('select[name="month_'+val.ISIN+'"]').val(),
      folio:"",
      product_code:val.PRODUCT_CODE,
      reinvest:val.REINVEST_TAG,
      amc_code:val.AMC_CODE,
      isin:val.ISIN,
      SIP_DATES:val.SIP_DATES,
    }

    dataList.push(data)
    if(this.validationFrom(data,sr,dataErr)==0){
      const result = dataList.reduce((total, data) => total =  parseInt(total) +  parseInt(data.amt),0);
      console.log("dataList",result);
	    this.setState({ Items:dataList });
      // if(result>=1000){
      //   this.setState({ Items:dataList });
      // }else{
      //   window.$('#OrderMsg').modal('show');
      //   this.setState({ validMsg:"Minimum Investment Amount should be 1000 & in multiple of 500" });
      // }
    }
    sr++;    
  })
}

handleShow() {
  this.setState({ modalState: false });
}
    render(){
        localStorage.setItem("Items",JSON.stringify(this.state.Items))
        console.log("Items",this.state.Items)
        
        if (this.state.Items!='') {
          return <Redirect to='/prodigypro/dashboard/cnf-purchase' />
        }

        return(
        <>
        <Helmet>         
            <title>Prodigy Pro - Investment Details</title>
        </Helmet>
            <style>
          {`
            .mm{
              display:none;
            }
            .perpetual-div{
              display:none;
            }
			.modal-content{
              width:1000px !important;
            }
			.text-msg{
              width:465px !important;
            }
            .modal-body{
              text-align: center;
            }.text-size{
              font-size:x-small;
            }
          `}
          </style>

        {/* Page Wrapper */}
      <div id="wrapper">

      <div className={"modal fade" + (this.state.modalState ? " show d-block" : " d-none")}  id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true" >
            <div class="modal-dialog modal-dialog-centered" role="document">
              <div class="modal-content">
                
                <div class="modal-body">
                  <p className="text-dark font-weight-bold">
                    New Folio: 'First Installment shall be deducted on current date and subsequent installments shall be deducted on selected SIP date'.
                  </p>
                  <p className="text-dark font-weight-bold">
                    Exiting Folio: 'Your SIP installments shall be deducted on the selected SIP date'.
                  </p>
                  <div className="text-center">
                    <button type="button" class="btn btn-primary" data-dismiss="modal"  onClick={this.handleShow}>OK</button>
                  </div>
                </div>
                {/* <div class="modal-footer">
                
                </div> */}
              </div>
            </div>
          </div>
      

          <div className="modal fade"  id="OrderMsg" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true" >
            <div class="modal-dialog modal-dialog-centered" role="document">
              <div class="modal-content">
                
                <div class="modal-body">
                  <p className="text-dark font-weight-bold text-msg">
                  {this.state.validMsg}
                  </p>
                  <div className="text-center">
                    <button type="button" class="btn btn-primary  text-size" data-dismiss="modal" >OK</button>
                  </div>
                </div>
                {/* <div class="modal-footer">
                
                </div> */}
              </div>
            </div>
          </div>
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
                            <li className="breadcrumb-item active" aria-current="page">Investment Details</li>
                        </ol>
                    </nav>

                    <div className="row">
                         <div className="col-xl-12 col-lg-12 mb-3">
                              <div className="card shadow ">
                                  <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                      <h6 className="m-0 font-weight-bold text-danger">Investment Details</h6>
                                  </div>
                              </div>
                          </div>

                          {this.state.userSchemeList ?
                                this.state.userSchemeList.map((item, key) =>
                                <div className="col-xl-12 col-lg-12 mb-3" id={"row_"+item.ISIN}>
                                 <input type="hidden" value={item.PRODUCT_LONG_NAME} name={"scheme_"+item.ISIN}  />
                                <div className="card shadow ">
                                    {/* Card Header - Cut */}
                                    <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                        <h6 className="m-0 font-weight-bold text-primary">Scheme : {item.PRODUCT_LONG_NAME}</h6>
                                          <div>
                                              <a href="javascript:void(0);" onClick={this.deleteCart.bind(this, item.ISIN)}>
                                              <i className="fas fa-times-circle fa-lg fa-fw text-danger-400" />
                                              </a>
                                          </div>  
                                    </div>
                                    {/* Card Body */}
                                    <div className="card-body">
                                       <div className="row">
                                          <div className="col-md-2 mb-3">
                                              <label>Folio  <spna className="text-danger">*</spna></label>
                                              <select className="form-control">
                                                <option value="new">New Folio</option>
                                                {this.state.amcList?this.state.amcList.map((val, key) =>
                                                      val.amc_code==item.AMC_CODE?
                                                      <option value={val.folio}>{val.folio}</option>
                                                      : null
                                                  ):null}   
                                              </select>
											  
                                          </div>
                                          <div className="col-md-2 mb-3">
                                              <label>Amount  <spna className="text-danger">*</spna></label>
                                              <input type="text" className="form-control" placeholder="Enter Amount"  name={"amt_"+item.ISIN} />
                                              <small className="text-danger" id={"amt_err_"+item.ISIN}>{this.state.amt_err}</small>
                                          </div>
                                          <div className="col-md-3 mb-3">
                                              <label>SIP Start Date <spna className="text-danger">*</spna></label>
                                              <input type="date" className="form-control" name={"date_"+item.ISIN} />
                                              <small className="text-danger" id={"date_err_"+item.ISIN}>{this.state.amt_err}</small>
                                          </div>
                                          <div className="col-md-2 mt-auto mb-2 ">
                                            <div className="form-group form-check text-right">
                                              
                                              <input type="checkbox" class="form-check-input" id={"exampleCheck_"+item.id} name={"perpectual_"+item.ISIN}  onChange={this.month.bind(this, item.ISIN)}  defaultValue="Y" defaultChecked />

                                              <div className="perpetual-div">
                                                <input type="text" id={"perpetual_val_"+item.ISIN} name={"perpetual_val_"+item.ISIN} defaultValue="Y" autocomplete="off"/>
                                              </div>

                                              <label className="form-check-label" for={"exampleCheck_"+item.id}>Perpetual  </label>
                                            </div>
                                          </div>

                                          <div className="col-md-3 mb-3 mm" id={"month_div_"+item.ISIN} >
                                              <label>Select Period (Month)  <spna className="text-danger">*</spna></label>
                                              <select className="form-control" name={"month_"+item.ISIN} >
                                                <option value="">select</option>
                                                <option value="12">12</option>
                                                <option value="24">24</option>
                                                <option value="36">36</option>
                                                <option value="48">48</option>
                                                <option value="60">60</option>
                                                <option value="72">72</option>
                                                <option value="84">84</option>
                                                <option value="96">96</option>
                                                <option value="108">108</option>
                                                <option value="120">120</option>
                                                <option value="132">132</option>
                                                <option value="144">144</option>
                                                <option value="156">156</option>
                                                <option value="168">168</option>
                                                <option value="180">180</option>
                                                <option value="240">240</option>
                                              </select>
                                              <small className="text-danger" id={"month_err_"+item.ISIN}></small>
                                          </div>
                                        </div>
    
                                    </div>
                                    <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                        <h6 className="m-0 text-defult">SIP Date : {item.SIP_DATES}</h6>
                                    </div>
                                </div>
                               
                            </div>
                          ) : null}
                        
                        
                    </div> 

                    <div className="row"> 
                      <div className="col-md-2 offset-md-10 mb-3">
                        <a type="button" className="btn btn-danger shadow-sm w-100" href="javascript:void(0);" onClick={this.cnfPurchase.bind(this)}>Continue</a>
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
export default Cart
