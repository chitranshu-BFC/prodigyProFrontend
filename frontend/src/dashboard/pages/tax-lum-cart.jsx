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


class TaxLumCart extends React.Component{
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
    const isinList = JSON.parse(localStorage.getItem("isinDATA"))
    isinList.map(val => {
      const data = {
          isin:val.isin,
          amc_code:val.amc_code
      }
    
      Axios.post("/prodigypro/api/ProductViaISIN", data)
      .then((result) => {
          schemeList.push(result.data.data.data[0]);
          this.setState({ userSchemeList: schemeList })
      })     
    })

}



deleteCart = (e)=>{
  const schemeList = []; 
  this.setState({ userSchemeList: "" })
  this.state.userSchemeList.map((val, key) => {
    if(val.ISIN!=e){
      schemeList.push(val);
      this.setState({ userSchemeList: schemeList })
    }
  })
}

validationFrom(data,sr,dataErr){
  var count = this.state.userSchemeList.length;
  if(data.amt==""){
    var isValid=false
    $("#amt_err_"+data.isin).html("Mandatory Field")
  }else{
   if(data.amt<5000){
        var isValid=false
		
        window.$('#exampleModalCenter').modal('show');
        this.setState({ validMsg:"Minimum Investment Amount should be 5000 & in multiple of 500" })
        $("#amt_err_"+data.isin).html("")
      }else{
        var dd ={dd:sr}
        dataErr.push(dd);
        var isValid=true
        $("#amt_err_"+data.isin).html("")
      }
  }
  
  if(count==sr){
    return dataErr.length;
  }
  
}

cnfPurchase=(e)=>{
  this.setState({ Items: [] });
  var count = this.state.userSchemeList.length;
  var sr=1; var dataList = [];   let dataErr = [];
  this.state.userSchemeList.map((val, key) => {
    const data = {
      scheme:$('input[name="scheme_'+val.ISIN+'"]').val(),
      amt:$('input[name="amt_'+val.ISIN+'"]').val(),
      folio:$('select[name="folio_'+val.ISIN+'"]').val(),
      product_code:val.PRODUCT_CODE,
      reinvest:val.REINVEST_TAG,
      amc_code:val.AMC_CODE,
      isin:val.ISIN,
      sip_date:val.SIP_DATES,
    }

    dataList.push(data)
    if(this.validationFrom(data,sr,dataErr)==count){
      const result = dataList.reduce((total, data) => total =  parseInt(total) +  parseInt(data.amt),0);
      console.log("dataList",result);
	   this.setState({ Items:dataList });
      //if(result>=5000){
        //this.setState({ Items:dataList });
      //}else{
       // window.$('#exampleModalCenter').modal('show');
       // this.setState({ validMsg:"Minimum Investment Amount should be 5000 & in multiple of 500" });
      //}
    }
    sr++;
    // this.setState(prevState => ({
    //   Items: [...prevState.Items,data]
    // }))
  })
}

    render(){
      localStorage.setItem("Items",JSON.stringify(this.state.Items))
      console.log("Items",this.state.Items)
      
      if (this.state.Items!='') {
        return <Redirect to='/prodigypro/dashboard/tax-lum-purchase' />
      }

        return(
        <>
        <Helmet>         
            <title>Prodigy Pro - Investment Details</title>
        </Helmet>
            <style>
          {`
          
          `}
          </style>

        {/* Page Wrapper */}
      <div id="wrapper">
      <div className="modal fade"  id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true" >
            <div class="modal-dialog modal-dialog-centered" role="document">
              <div class="modal-content">
                
                <div class="modal-body">
                  <p className="text-danger font-weight-bold">
                  {this.state.validMsg}
                  </p>
                  <div className="text-center">
                    <button type="button" class="btn btn-primary" data-dismiss="modal" >OK</button>
                  </div>
                </div>
                {/* <div class="modal-footer">
                
                </div> */}
              </div>
            </div>
          </div>
      
        {/* Sidebar */}
            <Sidebar  mainTab="tax"  innertab="tax-planning-lumpsum"/>
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
                              {/* <div className="card shadow ">
                                  <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                      <h6 className="m-0 font-weight-bold text-danger">Investment Details</h6>
                                  </div>
                              </div> */}
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
                                 <div className="col-md-6 mb-3">
                                     <label>Folio  <spna className="text-danger">*</spna></label>
                                     <select className="form-control"  name={"folio_"+item.ISIN}>
                                     <option value="">New Folio</option>
                                       {this.state.amcList?this.state.amcList.map((val, key) =>
                                          val.amc_code==item.AMC_CODE?
                                          <option value={val.folio}>{val.folio}</option>
                                          : null
                                      ):null}   
                                     </select>
                                 </div>
                                 <div className="col-md-6 mb-3">
                                     <label>Amount  <spna className="text-danger">*</spna></label>
                                     <input type="text" className="form-control" placeholder="Enter Amount" name={"amt_"+item.ISIN} />
                                     <small className="text-danger" id={"amt_err_"+item.ISIN}>{this.state.amt_err}</small>
                                 </div>
                                </div>

                           </div>
                           {/* <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                               <h6 className="m-0 text-defult">SIP Date : {item.SIP_DATES}</h6>
                           </div> */}
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
export default TaxLumCart
