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
import ReactTooltip from 'react-tooltip';
import Swal from 'sweetalert2'


class Switch_Comp extends React.Component{
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
    this.setState({userIin:userData.iin})
    if(userData.iin==null){
      // $('html').off('click');
      // $("#overlay").css("display", "block")
      Swal.fire({
        html: `Dear Investor, you need to complete a One Time Registration for Investing online. Please contact us ! BFC Capital - <a href="mailto:enquiry@bfccapital.com">enquiry@bfccapital.com</a>`,
        dangerMode: true,
      })
    }


    const data = {
        email:userData.email,
    }
    
    Axios.post("/prodigypro/api/User_profile", data)
    .then((res) => {
      // console.log("dscd",res.data.data.data)
      this.setState({userList:res.data.data.data})
    })

    Axios.post("/prodigypro/api/amc")
    .then((response) => {
      // console.log(response.data.data.data)
      this.setState({amcList:response.data.data.data})
    })
  }

  iinNull=e=>{
    Swal.fire({
      html: `Dear Investor, you need to complete a One Time Registration for Investing online. Please contact us ! BFC Capital - <a href="mailto:enquiry@bfccapital.com">enquiry@bfccapital.com</a>`,
      dangerMode: true,
    })
  }


  userProfile = e => {
    let userPro_id; let schemeList =[];
    userPro_id = $('select[name="userPro_id"]').val();
    $("#wait").css('display','block');
    $(".table-head").css('display','block');
    this.setState({userSchemeList:''})
    this.setState({ Items: [] });
$('input[name="asset"]').prop('checked', false);
    $('input[name="growth"]').prop('checked', false);
    $("select[name=target_scheme]").val("")
    $('input[name="all_units"]').val();
    $('input[name="amt_unit_type"]').val("");
    $('input[name="amt_unit"]').val("");
    $('input[name="amt"]').val("");
    $('input[name="unit"]').val("");
    $('select[name="scheme_name"]').val("");
    $("#unit_val").css('display','none');
    $('input[name="amt_type"]').prop('checked', false);

  const userData = JSON.parse(localStorage.getItem("loginUserData"))
    this.state.userList.map(value => {
      if(value.id==userPro_id){
        this.setState({userIIN:value.customer_id})
        //console.log("invest Name",value)
        const investNM = {
          investor_name:value.investor_name,
        }
        if(value.fh_pan_no=="undefined"){
          let jh1 = ''; let jh2 = '';
          if(value.jh1_pan_no=="undefined"){
            jh1="";
          }else{
            jh1=value.jh1_pan_no;
          }

          if(value.jh2_pan_no=="undefined"){
            jh2="";
          }else{
            jh2=value.jh2_pan_no;
          }

          const amcdata = {
            investor_pan:"",
            guard_pan:userData.pan_card,
            jh1_pan:jh1,
            jh2_pan:jh2,
          }

          //console.log("amcdata",JSON.stringify(amcdata))
          Axios.post("/prodigypro/api/getAmcFolioViaProfile", amcdata)
          .then((response) => {
            this.setState({amc:response.data.data.data})
            response.data.data.data.map(value => {
              this.state.amcList.map(value2 => {
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
                        $("#overlay").css('display','none');
                         if(resss.data.data.status==200){
                          let folioVal =  resss.data.data.data;
               if( (key.products.PRODUCT_LONG_NAME.includes("Direct")!=true) && (key.products.PRODUCT_LONG_NAME.includes("DIRECT")!=true)){
               if((resss.data.data.data[0].UNITS!=0) && (resss.data.data.data[0].UNITS!=null)){

                schemeList.push({ scheme_name: key.products.PRODUCT_LONG_NAME, folio_no: data.folio, SWP_DATES: key.products.SWP_DATES, FREQUENCIES: key.products.SYSTEMATIC_FREQUENCIES, amc_code: key.products.AMC_CODE, product_code: key.products.PRODUCT_CODE, reinvest: key.products.REINVEST_TAG, iin: amcdata.IIN , unit: resss.data.data.data[0].UNITS , amu:resss.data.data.data[0].AMOUNT ,navdate:resss.data.data.data[0].navdate , isin: key.products.ISIN })
                this.setState({ userSchemeList: schemeList })
                //console.log("Scheme list", resss.data.data.data[0].UNITS) 
               }    
              }
                         }                        
                      })
  
                    })
                  })
                } 
                
              })
             
            })
          })

        }else{
          let jh1 = ''; let jh2 = '';
          if(value.jh1_pan_no=="undefined"){
            jh1="";
          }else{
            jh1=value.jh1_pan_no;
          }

          if(value.jh2_pan_no=="undefined"){
            jh2="";
          }else{
            jh2=value.jh2_pan_no;
          }


          const amcdata = {
            investor_pan:value.fh_pan_no,
            guard_pan:"",
            jh1_pan:jh1,
            jh2_pan:jh2,
          }

          console.log("amcdata",JSON.stringify(amcdata))
          Axios.post("/prodigypro/api/getAmcFolioViaProfile", amcdata)
          .then((response) => {
            this.setState({amc:response.data.data.data})
            response.data.data.data.map(value => {
             
              this.state.amcList.map(value2 => {
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
                        $("#overlay").css('display','none');
                         if(resss.data.data.status==200){
                          let folioVal =  resss.data.data.data;
              if( (key.products.PRODUCT_LONG_NAME.includes("Direct")!=true) && (key.products.PRODUCT_LONG_NAME.includes("DIRECT")!=true)){
               if((resss.data.data.data[0].UNITS!=0) && (resss.data.data.data[0].UNITS!=null)){
                schemeList.push({ scheme_name: key.products.PRODUCT_LONG_NAME, folio_no: data.folio, SWP_DATES: key.products.SWP_DATES, FREQUENCIES: key.products.SYSTEMATIC_FREQUENCIES, amc_code: key.products.AMC_CODE, product_code: key.products.PRODUCT_CODE, reinvest: key.products.REINVEST_TAG, iin: value.customer_id , unit: resss.data.data.data[0].UNITS , amu:resss.data.data.data[0].AMOUNT ,navdate:resss.data.data.data[0].navdate , isin: key.products.ISIN, investor_name:investNM.investor_name })
                this.setState({ userSchemeList: schemeList })
                //console.log("Scheme list", schemeList)
                } 
              }
                         }                        
                      })
  
                    })
                  })
                } 
                
              })
             
            })
          })

        } 

      }
    })
  }

onscheme = e => { // folio_no
  $("#unit_val").css('display','none');
  $('input[name="amt_type"]').prop('checked', false);
 $('input[name="asset"][value="Equity"]').prop("checked", true);
  $('input[name="asset"][value="DEBT"]').prop("checked", false);
  $('input[name="growth"][value="GROWTH"]').prop("checked", true);
  $('input[name="growth"][value="Dividend"]').prop("checked", false);
  $("select[name=target_scheme]").val("");
  this.setState({usertargetScheme:""})

  let key = $("input:radio[name=key]:checked").val();
  let folio_no =  $('#folio_no_'+key).val();
  let scheme =  $('#scheme_nm_'+key).val();

  this.state.userSchemeList.map(val => {
    console.log("scheme list",val)
    if((val.scheme_name==scheme) && (val.folio_no==folio_no)){

    const data = {
      AMC_CODE:val.amc_code,
      ASSET_CLASS:$("input:radio[name=asset]:checked").val(),
      DIV_GW:$("input:radio[name=growth]:checked").val(),
    }

    if((data.ASSET_CLASS!=undefined) && (data.DIV_GW!=undefined)){
    Axios.post("/prodigypro/api/targetScheme", data)
    .then((res) => {
      this.setState({usertargetScheme:res.data.data.data})
    })
  }

    this.setState({userSchemeUnits:{AMOUNT:val.amu,UNITS:val.unit,navdate:val.navdate}}) 
    this.setState({userschemeName:{folio_no:folio_no,scheme:scheme,amc_code:val.amc_code,product_code:val.product_code,reinvest:val.reinvest,iin:val.iin}})
    }
  })
}

targetScheme = e => {
  const data = {
    AMC_CODE:this.state.userschemeName.amc_code,
    ASSET_CLASS:$("input:radio[name=asset]:checked").val(),
    DIV_GW:$("input:radio[name=growth]:checked").val(),
  }
  // alert(JSON.stringify(data));
    if((data.ASSET_CLASS!=undefined) && (data.DIV_GW!=undefined)){
    Axios.post("/prodigypro/api/targetScheme", data)
    .then((res) => {
    console.log("targetScheme",res.data.data.data)
    this.setState({usertargetScheme:res.data.data.data})
    })
  }

    if(data.DIV_GW=="Dividend"){
    $(".idcw").css('display','block');
    }else{
    $(".idcw").css('display','none');
    }
}



optionvalidation (data) {
  let dataErr = [];
  if (data.asset == undefined) {
    var isValid ={asset:"1"}
    dataErr.push(isValid);
    this.setState({ asset_err: "Mandatory Field" });
  } else {
    // var isValid = true;
    this.setState({ asset_err: "" });
  }

  if (data.option == undefined) {
    var isValid ={option:"1"}
    dataErr.push(isValid);
    this.setState({ gw_err: "Mandatory Field" });
  } else {
    // var isValid = true;
    this.setState({ gw_err: "" });
  }

  return  dataErr.length;

}

getAmtUnit = (e) =>{
  const data = {
    asset:$("input:radio[name=asset]:checked").val(),
    option:$("input:radio[name=growth]:checked").val(),
  }

  if(this.optionvalidation(data)==0){
    let product_code = $("select[name=target_scheme]").val();
    this.state.usertargetScheme.map(val => {
    console.log("scheme list",val)
    if(val.PRODUCT_CODE==product_code){
      if(val.REINVEST_TAG=="Y"){
        $('input[name="idcw_val"]').val("Reinvest");
        }else{
        $('input[name="idcw_val"]').val("Payout");
        }
     this.setState({usertargetSchData:{target_product_code:val.PRODUCT_CODE,reinvest:val.REINVEST_TAG}})
    }
    })
  }
}



amountType = (e) => {
  let amt_type = $("input:radio[name=amt_type]:checked").val();
  this.setState({ amount_err: "" });
  this.setState({ unit_err: "" });
  if(amt_type=="amt"){
    $("#amt_div").css('display','block');
    $("#unit_div").css('display','none');
    $("#unit_val").css('display','block');
    $('input[name="all_units"]').val("N");
    $('input[name="amt_unit_type"]').val("amount");
    $('input[name="unit"]').val("");
    $("#unit_val").html('Amount:- '+this.state.userSchemeUnits.AMOUNT+',<br> As On:- '+this.state.userSchemeUnits.navdate);
  }else if(amt_type=="unit"){
    $("#amt_div").css('display','none');
    $("#unit_div").css('display','block');
    $("#unit_val").css('display','block');
    $('input[name="all_units"]').val("N");
    $('input[name="amt_unit_type"]').val("unit");
    $('input[name="amt"]').val("");
    $('input[name="unit"]').val("");
    $("#unit_val").html('unit:- '+this.state.userSchemeUnits.UNITS+',<br> As On:- '+this.state.userSchemeUnits.navdate);
  }else if(amt_type=="all_units"){
    $("#amt_div").css('display','none');
    $("#unit_div").css('display','none');
    $("#unit_val").css('display','block');
    $('input[name="all_units"]').val("Y");
    $('input[name="amt_unit_type"]').val("unit");
    $('input[name="amit"]').val("");
    $('input[name="unit"]').val(this.state.userSchemeUnits.UNITS);
    $("#unit_val").html('unit:- '+this.state.userSchemeUnits.UNITS+',<br> As On:- '+this.state.userSchemeUnits.navdate);
  }
}

handleFormValidation(data) {

  let dataErr=[];
  if (data.asset == undefined) {
    var isValid ={asset:"1"}
    dataErr.push(isValid);
    this.setState({ asset_err: "Mandatory Field" });
  } else {
    // var isValid = true;
    this.setState({ asset_err: "" });
  }

  if (data.option == undefined) {
    var isValid ={option:"1"}
    dataErr.push(isValid);
    this.setState({ gw_err: "Mandatory Field" });
  } else {
    var isValid = true;
    this.setState({ gw_err: "" });
  }

  if (data.target_product_code == "") {
    var isValid ={target_product_code:"1"}
    dataErr.push(isValid);
    this.setState({ scheme_err: "Mandatory Field" });
  } else {
    // var isValid = true;
    this.setState({ scheme_err: "" });
  }

  if (data.amt_type == undefined) {
    var isValid ={amt_type:"1"}
    dataErr.push(isValid);
    this.setState({ all_type_err: "Mandatory Field" });
  } else {
    // var isValid = true;
    this.setState({ all_type_err: "" });
  }

  if(data.amt_type=="amt"){
    if (data.amt == "") {
      var isValid ={amt:"1"}
      dataErr.push(isValid);
      this.setState({ amount_err: "Mandatory Field" });
    } else {
      this.setState({ amount_err: "" });
    }
  }else if(data.amt_type=="unit"){
    if (data.unit == "") {
      var isValid ={unit:"1"}
      dataErr.push(isValid);
      this.setState({ unit_err: "Mandatory Field" });
    } else {
      this.setState({ unit_err: "" });
    }
  }

  return  dataErr.length;
}

addClick = (e)=> { 
  let userPro_id = $('select[name="userPro_id"]').val();
  let key = $("input:radio[name=key]:checked").val();

  if(userPro_id==""){
    toast.error("Please Select Profile!")
  }else if(key==undefined){
    toast.error("Please Select Scheme!")
  }else{

    var amount = $('input[name="amt"]').val();
    if(amount==''){
       amount = $('input[name="unit"]').val();
    }

    const data = {
      
      schemeName : this.state.userschemeName.scheme,
      folio_no : this.state.userschemeName.folio_no,
      target_scheme:$('select[name="target_scheme"]').val(),
      target_scheme_nm:$("#target_scheme option:selected").text(),
      reinvest : this.state.usertargetSchData?this.state.usertargetSchData.reinvest:'',
      target_product_code : this.state.usertargetSchData?this.state.usertargetSchData.target_product_code:'',
      amc_code : this.state.userschemeName.amc_code,
      product_code : this.state.userschemeName.product_code,
     iin:this.state.userIIN,
      amt_type:$("input:radio[name=amt_type]:checked").val(),
      all_units:$('input[name="all_units"]').val(),
      amt_unit_type:$('input[name="amt_unit_type"]').val(),
      amt_unit:$('input[name="amt_unit"]').val(),
      amt:$('input[name="amt"]').val(),
      unit:$('input[name="unit"]').val(),
      amount:amount,
      asset:$("input:radio[name=asset]:checked").val(),
      option:$("input:radio[name=growth]:checked").val()
    }

    console.log("aaa",JSON.stringify(data))

    if (this.handleFormValidation(data)==0) {
    this.setState({usertargetScheme:''})
      $('input[name="asset"]').prop('checked', false);
      $('input[name="growth"]').prop('checked', false);
      $('input[name="amt_type"]').prop('checked', false);
      $('input[name="amt"]').val("");
      $("#amt_div").css('display','none');
      $("#unit_div").css('display','none');
      $("#unit_val").css('display','none');
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
  if(this.state.Items!=''){

     let data = [];  let total_amt = 0;
    this.state.Items.map((val,key) => {
      total_amt = parseInt(total_amt) + parseInt(val.amount);
      const value = {
        amc:val.amc_code,
        product_code:val.product_code,
        folio:val.folio_no,
        all_units:val.all_units,
        amt_unit_type:val.amt_unit_type,
        amt_unit:val.amount,
        target_product_code:val.target_product_code,
        reinvest:val.reinvest,
        target_ft_acc_no:"",
        remark:"",
        input_ref_no:"",
        trxn_execution:"",
      }

      data.push(value)
    })

    const value2 = {
      email:userData.email,
      iin:this.state.userIIN,
      trxn_acceptance:"ALL",
      childArr:data,
    }

    console.log("dd",JSON.stringify(value2));
    $("#overlay").css("display","block")
    Axios.post("/prodigypro/api/multi_switch",value2)
    .then((result) => {
    $("#overlay").css("display","none")
        console.log("dd",result.data.data);
        if(result.data.data.status==400){
          // this.setState({orderData: dd})
          // window.$('#exampleModal').modal('show');
          if(result.data.data.message!=''){
            toast.error(result.data.data.message)
          }else{
            toast.error(result.data.data.message_full.Status_Desc._text)
          }
          
        }else{
          // var dta=[]
          // dta.push(result.data.data.data)
          this.setState({orderData:result.data.data.data})
          this.setState({orderMsg: "Payment link has been sent on your registered mail id and mobile number.The Link shall remain active for the next 48 hours. Kindly authorize."})
          window.$('.bd-example-modal-lg').modal('show');
        }
    });

  }else{
    let userPro_id = $('select[name="userPro_id"]').val();
    let key = $("input:radio[name=key]:checked").val();
    if(userPro_id==""){
      toast.error("Please Select Profile!")
    }else if(key==undefined){
      toast.error("Please Select Scheme!")
    }else{
      const data = {
      
        schemeName : this.state.userschemeName.scheme,
        folio_no : this.state.userschemeName.folio_no,
        target_scheme:$('select[name="target_scheme"]').val(),
        target_scheme_nm:$("#target_scheme option:selected").text(),
        reinvest : this.state.usertargetSchData?this.state.usertargetSchData.reinvest:'',
        target_product_code : this.state.usertargetSchData?this.state.usertargetSchData.target_product_code:'',
        amc_code : this.state.userschemeName.amc_code,
        product_code : this.state.userschemeName.product_code,
        iin:this.state.userIIN,
        amt_type:$("input:radio[name=amt_type]:checked").val(),
        all_units:$('input[name="all_units"]').val(),
        amt_unit_type:$('input[name="amt_unit_type"]').val(),
        amt_unit:$('input[name="amt_unit"]').val(),
        amt:$('input[name="amt"]').val(),
        unit:$('input[name="unit"]').val(),
        asset:$("input:radio[name=asset]:checked").val(),
        option:$("input:radio[name=growth]:checked").val()
      }
      // console.log(data)
      if (this.handleFormValidation(data)==0) {
        var amount = "";
        if(data.amt!=''){
          amount = $('input[name="amt"]').val();
        }else{
          amount = $('input[name="unit"]').val();
        }
  
        const value = {
          email:userData.email,
          amc:this.state.userschemeName.amc_code,
          product_code:this.state.userschemeName.product_code,
          iin:this.state.userIIN,
          folio:this.state.userschemeName.folio_no,
          all_units:$('input[name="all_units"]').val(),
          amt_unit_type:$('input[name="amt_unit_type"]').val(),
          amt_unit:amount,
          target_product_code:this.state.usertargetSchData.target_product_code,
          reinvest:this.state.usertargetSchData.reinvest,
          target_ft_acc_no:"",
        }
    
    $("#overlay").css("display","block")
        Axios.post("/prodigypro/api/switch",value)
        .then((result) => {
      $("#overlay").css("display","none")
          console.log(result.data.data.status);
          if(result.data.data.status==400){
            if(result.data.data.message!=''){
              toast.error(result.data.data.message)
            }else{
              toast.error(result.data.data.message_full.Status_Desc._text)
            }
          }else{
           var dta=[]
            dta.push(result.data.data.data)
            this.setState({orderData:dta})
            // this.setState({orderData: result.data.data.data})
            window.$('.bd-example-modal-lg').modal('show');
            this.setState({orderMsg: "Payment link has been sent on your registered mail id and mobile number.The Link shall remain active for the next 48 hours. Kindly authorize."})
            window.$('.bd-example-modal-lg').modal('show');
            // toast.success(result.data.data.message)
          }
        });
      }
    }
  }
}
    render(){
        
        return(
        <>
         <StyleComponent/>
        <Helmet>         
            <title>Prodigy Pro - Switch</title>
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
      .idcw{
              display:none;
            }
      .table-head{
              display:none;
            }
      .info-icon{
              position: relative;
              left: 3px;
              text-align: center;
            }
            .fa-info-icon{
              background:#387de4;
              position: relative;
              font-size: 8px !important;
              padding: 3px 8px 3px 6px;
              border-radius: 50%;
              bottom: 7px;
              cursor: pointer;
            }
            .swal2-content {
                padding: 17px;
                margin: 22px;
                color: red;
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
    
    
    {/* order Detail Model */}
    <div class="modal fade bd-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
          
          <div className="modal-header title">
            <h5 className="modal-title text-center " id="exampleModalLabel">Order Screen</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="table-responsive-lg "> 
          <table class="table">
              <thead class="thead-light">
                <tr>
                  <th scope="col"> Unique No</th>
                  <th scope="col"> Trxn No</th>
                 {/* <th scope="col">Application No</th>*/}
                  <th scope="col">Fund</th>
                  <th scope="col">Scheme Name</th>
                  <th scope="col">Target Name</th>
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
                 {/* <td>{val.Application_No}</td>*/}
                  <td>{val.Fund}</td>
                 <td>{val.Source_Scheme_Name}</td>
                  <td>{val.Target_Scheme_Name}</td>
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
            <Sidebar mainTab="transact"  innertab="switch"/>
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
            <li className="breadcrumb-item active" aria-current="page">Switch</li>
          </ol>
        </nav>
        <div className="row">
          {/* Area Chart */}
          <div className="col-xl-12 col-lg-12">
            <div className="card shadow mb-4">
              {/* Card Header - Dropdown */}
              <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                {/* <h6 className="m-0 font-weight-bold text-danger">Switch</h6>  */}
              </div>
              {/* Card Body */}
              <div className="card-body">
                <div className="row">
                  <div className="col-xl-4 col-lg-4 mb-4">
                    <span className="has-float-label">
                      <select className="form-control input-text" name="userPro_id" onChange={this.userProfile}>
                      <option>Select Profile</option>
                        {this.state.userList?
                            this.state.userList.map((item, key) =>
                                <option value={item.id}>{item.investor_name} {item.jh1_name!="undefined" ? " | "+item.jh1_name:null}{item.jh2_name!="undefined" ? " | "+item.jh2_name:null}</option>
                              ):null}
                      </select>
                      <label htmlFor="profile" className="text-label">Select Profile <spna className="text-danger">*</spna></label>
                    </span>
                  </div>                                 
                </div>
                <div className="row  table-head">
                <div className="col-xl-12 col-lg-12 mb-4 table-wrapper-scroll-y my-custom-scrollbar">
                    <label htmlFor="source" className="text-label">Select Source Scheme <spna className="text-danger">*</spna></label>
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
                    <p className="text-label mb-1 p-radio">Asset Class <spna className="text-danger">*</spna></p>
                    <input className=" input-text" id="equity" type="radio" name="asset" value="Equity" onChange={this.targetScheme}/>
                    <label htmlFor="equity" className="text-label">Equity</label>
                    <input className="input-text ml-3" id="debt" type="radio" name="asset" value="DEBT" onChange={this.targetScheme}/>
                    <label htmlFor="debt" className="text-label">Debt</label>   
                    <br></br>  <small className="text-danger pull-left">{this.state.asset_err}</small>                              
                  </div>
                  <div className="col-xl-4 col-lg-4 mb-4">
                    <p className="text-label mb-1 p-radio">Option <spna className="text-danger">*</spna></p>
                    <input className=" input-text" id="growth" type="radio" name="growth" value="GROWTH"  onChange={this.targetScheme}/>
                    <label htmlFor="growth" className="text-label">Growth</label>
                    <input className="input-text ml-3" id="dividend" type="radio" name="growth" value="Dividend" onChange={this.targetScheme}/>
                    <label htmlFor="dividend" className="text-label">IDCW
            <span className='info-icon'><i className="fas fa-info fa-sm fa-fw text-white fa-info-icon" data-tip data-for="registerTip"/></span>
                              <ReactTooltip id="registerTip" place="top" effect="solid">
                                <div className="tool_tip">
                                  Income Distribution cum Capital Withdrawal
                                </div>
                              </ReactTooltip>
          </label>  
                    <br></br>  <small className="text-danger pull-left">{this.state.gw_err}</small>                                    
                  </div>
                  <div className="col-xl-4 col-lg-4 mb-4">
                    <span className="has-float-label">
                    <select className="form-control input-text" name="target_scheme" id="target_scheme" onClick={this.getAmtUnit}>
                        <option value="">Select</option>
                        {this.state.usertargetScheme?
                            this.state.usertargetScheme.map((item, key) =>
                            item.SIP_ALLOWED=="Y"?
                                <option value={item.PRODUCT_CODE}>{item.PRODUCT_LONG_NAME}</option>
                              :null
                              ):null}
                      </select>
                      <label htmlFor="target" className="text-label">Select Target Scheme <spna className="text-danger">*</spna></label>
                    </span>
                    <small className="text-danger pull-left">{this.state.scheme_err}</small> 
                  </div>
           <div className="col-xl-3 col-lg-3 mb-3 idcw">
                              <span className="has-float-label">
                                <input className="form-control input-text" id="idcw_val" type="Text" placeholder="IDCW Option" name="idcw_val" defaultValue="Not Applicable"/>
                                <label htmlFor="idcw_val" className="text-label">IDCW Option</label>
                              </span>
                             
                            </div> 
                </div>
                <div className="row">
                <div className="col-xl-4 col-lg-4 mb-4">
                    <p className="text-label mb-1 p-radio">Switch Type <spna className="text-danger">*</spna></p>
                    <input className=" input-text" id="amt" type="radio" name="amt_type" value="amt" onChange={this.amountType}/>
                    <label htmlFor="amt" className="text-label">By Amount</label>
                    <input className="input-text ml-3" id="units" type="radio" name="amt_type" value="unit"  onChange={this.amountType}/>
                    <label htmlFor="units" className="text-label">By Units</label>
                    <input className="input-text ml-3" id="all_units" type="radio" name="amt_type" value="all_units"  onChange={this.amountType}/>
                    <label htmlFor="all_units" className="text-label">All Units</label>  
                    <br></br>  <small className="text-danger pull-left">{this.state.all_type_err}</small>                                            
                  </div>
                  <div className="col-xl-4 col-lg-4 mb-4">
                    <span className="has-float-label" id="amt_div">
                      <input className="form-control input-text" id="val" type="Text" name="amt" placeholder="Amount" />
                      <label htmlFor="val" className="text-label">Enter Amount <spna className="text-danger">*</spna></label>
                    </span>
                    <small className="text-danger pull-left">{this.state.amount_err}</small> 
                    <span className="has-float-label" id="unit_div">
                      <input className="form-control input-text" id="val" type="Text"  name="unit"  placeholder="Amount" />
                      <label htmlFor="val" className="text-label">Enter Unit <spna className="text-danger">*</spna></label>
                    </span>
                    <small className="text-danger pull-left">{this.state.unit_err}</small> 
                   
                  </div>   
                  <div className="col-xl-4 col-lg-4 mb-4">
                  <span className="has-float-label" id="unit_val"></span>
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
                      <th scope="col">Source Scheme</th>
                      <th scope="col">Folio Number</th>
                      <th scope="col">Target Scheme</th>
                      <th scope="col">Switch Type</th>
                      <th scope="col">Amount/Unit</th>
                      <th scope="col">Remove</th>
                    </tr>
                  </thead>
                  <tbody>
                  {this.state.Items.map((item, key) =>
                    <tr id={"rowData_"+key}>
                      <th scope="row">{item.iin}</th>
                      <td>{item.schemeName}</td>
                      <td>{item.folio_no}</td>
                      <td>{item.target_scheme_nm}</td>
                      <td>
                        {item.amt_type=="amt"?"By Amount":null}
                        {item.amt_type=="unit"?"By Units":null}
                        {item.amt_type=="all_units"?"All Units":null}
                      </td>
                      <td>
                        {item.amt?item.amt:null}
                        {item.unit?item.unit:null}
                      </td>                             
                      <td><i className="fa fa-trash text-danger" onClick={this.delete_scheme.bind(this, key)}/></td>
                    </tr>
                  )}
                  </tbody>
                </table>:null}
                <div className="text-right">
                  <a href="javascript:void(0);" className="btn-theme-1 btn-theme-effect" onClick={this.state.userIin?this.oderNow.bind():this.iinNull.bind()}>
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
export default Switch_Comp
