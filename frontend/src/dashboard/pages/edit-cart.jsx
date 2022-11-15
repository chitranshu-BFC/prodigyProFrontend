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

  }


  componentDidMount(){
  
    const userData = JSON.parse(localStorage.getItem("loginUserData"))
    const data = {
        email:userData.email,
    }
  
    Axios.post("/prodigypro/api/User_profile", data)
    .then((res) => {
        // console.log("dscd",res.data.data.data)
        this.setState({userList:res.data.data.data})
    })

    const data2 = {
      pan_card:userData.pan_card,
    }

    Axios.post("/prodigypro/api/amclist", data2)
    .then((res2) => {
         console.log("amcList",res2.data.data.data)
        this.setState({amcList:res2.data.data.data})
    })

    const schemeList = []; 
    const ItemsData = JSON.parse(localStorage.getItem("Items"));
    console.log("ItemsData",ItemsData)
    this.setState({ userSchemeList: ItemsData })
    const isinList = JSON.parse(localStorage.getItem("isinDATA"))
    isinList.map(val => {
      const data = {
          isin:val.isin,
          amc_code:val.amc_code
      }
    
      Axios.post("/prodigypro/api/ProductViaISIN", data)
      .then((result) => {
          schemeList.push(result.data.data.data[0]);
          this.setState({ userScheme: schemeList })
      })     
    })

}

deleteCart = (e)=>{
  //alert(e)
  const schemeList = []; 
  this.setState({ userSchemeList: "" })
  this.state.userSchemeList.map((val, key) => {
    if(val.isin!=e){
      schemeList.push(val);
      this.setState({ userSchemeList: schemeList })
    }
  })
}

month = (e) =>{
  let pre = $("#perpetual_val_"+e).val();
  
  if(pre=="Y"){ 
    // alert(pre)
    $("#month_div_"+e).show();
    $("#perpetual_val_"+e).val("N");
  }else{
    $("#month_div_"+e).hide();
    $("#perpetual_val_"+e).val("Y");
  }
}

cnfPurchase=(e)=>{
  // scheme_
  this.setState({ Items: [] });
  this.state.userScheme.map((value, key) => {
    this.state.userSchemeList.map((val, key) => {
      if(value.ISIN==val.isin){
        var e_date=''; var year='';
        var mm = $('select[name="month_'+val.isin+'"]').val();
        let pe_val = $('input[name="perpetual_val_'+val.isin+'"]').val();
        var dd=$('input[name="date_'+val.isin+'"]').val();
        const swp_from_arr = dd.split('-');
        const from_mn = new Date(swp_from_arr[1]).toString().split(' ')[1];
        // alert(pe_val)
        if(pe_val==="N"){
          let yy = mm / 12;
          year = parseInt(swp_from_arr[0])+parseInt(yy);
          e_date = year+"-"+swp_from_arr[1] + "-"+swp_from_arr[2];
        }

        const data = {
          scheme:$('input[name="scheme_'+val.isin+'"]').val(),
          date:$('input[name="date_'+val.isin+'"]').val(),
          end_date:e_date,
          amt:$('input[name="amt_'+val.isin+'"]').val(),
          perpetual_val:$('input[name="perpetual_val_'+val.isin+'"]').val(),
          month:$('select[name="month_'+val.isin+'"]').val(),
          folio:$('select[name="folio_'+val.isin+'"]').val(),
          product_code:value.PRODUCT_CODE,
          reinvest:value.REINVEST_TAG,
          amc_code:value.AMC_CODE,
          isin:val.isin,
          SIP_DATES:val.SIP_DATES,
        }
    
        this.setState(prevState => ({
          Items: [...prevState.Items,data]
        }))
      }
    })
  })
  
}

    render(){
       
        // console.log("Items",this.state.Items)
        
        if (this.state.Items!='') {
           localStorage.setItem("Items",JSON.stringify(this.state.Items))
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
                            <li className="breadcrumb-item active" aria-current="page">Edit Investment Details</li>
                        </ol>
                    </nav>

                    <div className="row">
                         <div className="col-xl-12 col-lg-12 mb-3">
                              <div className="card shadow ">
                                  <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                      <h6 className="m-0 font-weight-bold text-danger">Edit Investment Details</h6>
                                  </div>
                              </div>
                          </div>

                          {this.state.userSchemeList ?
                                this.state.userSchemeList.map((item, key) =>
                                
                                <div className="col-xl-12 col-lg-12 mb-3" id={"row_"+item.isin}>
                                <input type="hidden" value={item.scheme} name={"scheme_"+item.isin}  />
                                <div className="card shadow ">
                                    {/* Card Header - Cut */}
                                    <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                        <h6 className="m-0 font-weight-bold text-primary">Scheme : {item.scheme}</h6>
                                          <div>
                                              <a href="javascript:void(0);" onClick={this.deleteCart.bind(this, item.isin)}>
                                              <i className="fas fa-times-circle fa-lg fa-fw text-danger-400" />
                                              </a>
                                          </div>  
                                    </div>
                                            {/* Card Body */}
                                    <div className="card-body">
                                       <div className="row">
                                          <div className="col-md-2 mb-3">
                                              <label>Folio</label>
                                              <select className="form-control" name={"folio_"+item.isin}>
                                                <option value="">New Folio</option>
                                                {this.state.amcList?this.state.amcList.map((val, key) =>
                                                    val.amc_code==item.amc_code?
                                                    <option value={val.folio} selected={val.folio ==item.folio}>{val.folio}</option>
                                                    : null
                                                ):null}  
                                              </select>
                                          </div>
                                          <div className="col-md-2 mb-3">
                                              <label>Amount</label>
                                              <input type="text" className="form-control" placeholder="Enter Amount" name={"amt_"+item.isin} defaultValue={item.amt}/>
                                          </div>
                                          <div className="col-md-3 mb-3">
                                              <label>SIP Start Date</label>
                                              <input type="date" className="form-control" name={"date_"+item.isin} defaultValue={item.date} />
                                          </div>
                                          <div className="col-md-2 mt-auto mb-2 ">
                                            <div className="form-group form-check">
                                              <input type="checkbox" class="form-check-input" id={"exampleCheck_"+item.isin} name={"perpectual_"+item.isin}  onChange={this.month.bind(this, item.isin)}  defaultValue={item.perpetual_val} defaultChecked={item.perpetual_val==="Y"}  />

                                              <input type="hidden" id={"perpetual_val_"+item.isin} name={"perpetual_val_"+item.isin} defaultValue={item.perpetual_val} />

                                              <label className="form-check-label" for={"exampleCheck_"+item.isin}>Perpectual</label>

                                            </div>
                                          </div>
                                          <div className={item.perpetual_val=="Y"?"col-md-3 mb-3 mm":null} id={"month_div_"+item.isin} >
                                              <label>Select Period (Month)</label>
                                              <select className="form-control" name={"month_"+item.isin} >
                                                <option value="">select</option>
                                                <option value="12" selected={item.month == "12"}>12</option>
                                                <option value="24" selected={item.month == "24"}>24</option>
                                                <option value="36" selected={item.month == "36"}>36</option>
                                                <option value="48" selected={item.month == "36"}>36</option>
                                                <option value="60" selected={item.month == "60"}>60</option>
                                                <option value="72" selected={item.month == "72"}>72</option>
                                                <option value="84" selected={item.month == "84"}>84</option>
                                                <option value="96" selected={item.month == "96"}>96</option>
                                                <option value="108" selected={item.month == "108"}>108</option>
                                                <option value="120" selected={item.month == "120"}>120</option>
                                                <option value="132" selected={item.month == "132"}>132</option>
                                                <option value="144" selected={item.month == "144"}>144</option>
                                                <option value="156" selected={item.month == "156"}>156</option>
                                                <option value="168" selected={item.month == "168"}>168</option>
                                                <option value="180" selected={item.month == "180"}>180</option>
                                                <option value="240" selected={item.month == "240"}>240</option>
                                              </select>
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
