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
import { format } from "date-fns";
import ReactTooltip from 'react-tooltip';
import Swal from 'sweetalert2'


class SIP extends React.Component {

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
    $("#perpetual_val").val("Y");
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
      email: userData.email,
    }
    // console.log("userData",userData);

    Axios.post("/prodigypro/api/User_profile", data)
      .then((res) => {
        // console.log("user profile",res.data.data.data)
        this.setState({ userList: res.data.data.data })
      })

    Axios.post("/prodigypro/api/amc")
      .then((response) => {
        // console.log(response.data.data.data)
        this.setState({ amcList: response.data.data.data })
      })
  }

  iinNull=e=>{
    Swal.fire({
      html: `Dear Investor, you need to complete a One Time Registration for Investing online. Please contact us ! BFC Capital - <a href="mailto:enquiry@bfccapital.com">enquiry@bfccapital.com</a>`,
      dangerMode: true,
    })
  }

  userProfile = e => {
    this.setState({ trasnDataDelete: ""})
    this.setState({ Items: [] });
    this.setState({ userMandateList: [] });
    //exitscheme
    $('select[name="date"]').val("");
    $('input[name="month_from"]').val("");
    $('input[name="month_to"]').val("");
    $('input[name="amt"]').val("");
    $('select[name="amc_code"]').val("");
    $('select[name="scheme_name"]').val("");
    $('input[name="asset"][value="Equity"]').prop("checked", true);
    $('input[name="asset"][value="DEBT"]').prop("checked", false);
    $('input[name="growth"][value="GROWTH"]').prop("checked", true);
    $('input[name="growth"][value="Dividend"]').prop("checked", false);
    $('input[name="existiScheme"]').prop('checked', false);
    $("#exitscheme").css('display', 'none');

    let userPro_id; let schemeList = [];
    userPro_id = $('select[name="userPro_id"]').val();
    const userData = JSON.parse(localStorage.getItem("loginUserData"))
    $("#wait").css('display', 'block');
    this.setState({ userSchemeList: '' })
    this.state.userList.map(value => {
      if (value.id == userPro_id) {
        this.setState({ userIIN: value.customer_id,fh_pan_no:value.fh_pan_no })
        let amcdata='';
        if(value.tax_status_code=="02"){
          amcdata = {
            guard_pan: userData.pan_card,
            pan_card: "",
            IIN: value.customer_id,
          }
        }else{
          amcdata = {
            guard_pan: "",
            pan_card: value.fh_pan_no,
            IIN: value.customer_id,
          }
        }

        Axios.post("/prodigypro/api/amclist", amcdata)
          .then((response) => {
            this.setState({ amc: response.data.data.data })
            // let count = 1;
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
                          //  console.log("folioVal", resss.data.data.data)
                          // let folioVal =  resss.data.data.data;
                          if(resss.data.data.status==200){
                            let folioVal =  resss.data.data.data;
                           // if((resss.data.data.data[0].UNITS!=0) && (resss.data.data.data[0].UNITS!=null)){
                              schemeList.push({ scheme_name: key.products.PRODUCT_LONG_NAME, folio_no: data.folio, SIP_DATES: key.products.SIP_DATES, FREQUENCIES: key.products.SYSTEMATIC_FREQUENCIES, amc_code: key.products.AMC_CODE, product_code: key.products.PRODUCT_CODE, reinvest: key.products.REINVEST_TAG, iin: amcdata.IIN , unit: resss.data.data.data[0].UNITS , amu:resss.data.data.data[0].AMOUNT , isin: key.products.ISIN })
                              this.setState({ userSchemeList: schemeList })
                              console.log("Scheme list", schemeList)
                           // }
                           }
                        })
                      })
                     
                    })
                }
              })
            })
          })

        const mandate = {
          email: userData.email,
          IIN: value.customer_id,
        }

        Axios.post("/prodigypro/api/mandateList", mandate)
          .then((res) => {
            console.log("mandate ", res.data.data.data)
            this.setState({ userMandateList: res.data.data.data })
          })

      }
    })
  }

  schemes = e => {
    let existiScheme = $("input:radio[name=existiScheme]:checked").val();
   $('select[name="date"]').val("");
    $('input[name="month_from"]').val("");
    $('input[name="month_to"]').val("");
    $('input[name="amt"]').val("");
    $('select[name="amc_code"]').val("");
    $('select[name="scheme_name"]').val("");
    $('input[name="asset"]').prop('checked', false);
    $('input[name="growth"]').prop('checked', false);
    //$('input[name="existiScheme"]').prop('checked', false);


    if (existiScheme == "exit") {
      $("#exitscheme").css({ "display": "block" });
      $("#newschemes").css({ "display": "none" });
      $("#newschemes1").css({ "display": "none" });
      $("#first_order").css({ "display": "block" });
      //
      this.setState({ userSwpDate: "" })
    } else {
      // exampleModalCenter
      this.setState({msg:"First Installment shall be deducted on current date and subsequent installments shall be deducted on selected SIP Date."})
      window.$('#exampleModalCenter').modal('show');
      $("#exitscheme").css({ "display": "none" });
      $("#newschemes").css({ "display": "block" });
      $("#newschemes1").css({ "display": "block" });
      $('input[name="key"]').prop('checked', false);
      $("#first_order").css({ "display": "none" });
      this.setState({ userSwpDate: true })
    }
  this.setState({ Items: [] });
    $('select[name="date"]').val("");
    $('input[name="month_from"]').val("");
    $('input[name="month_to"]').val("");
    $('input[name="amt"]').val("");
  }

  onscheme = e => {
    let key = $("input:radio[name=key]:checked").val();
    let folio_no = $('#folio_no_' + key).val();
    let scheme = $('#scheme_nm_' + key).val();

    //alert(key+" - "+folio_no+" - "+scheme)
    //this.setState({userschemeName:""})
    this.state.userSchemeList.map(val => {
      console.log("scheme list", val)
      if ((val.scheme_name == scheme) && (val.folio_no == folio_no)) {
        const swp_date_arr = val.SIP_DATES.split(',');
        // alert(val.SIP_DATES)
        this.setState({ userSwpDate: swp_date_arr })
        this.setState({ userschemeName: { folio_no: folio_no, scheme: scheme, amc_code: val.amc_code, product_code: val.product_code, reinvest: val.reinvest, iin: val.iin } })
      }
    })
  }

  schemeList = e => {
    
  $('select[name="scheme"]').val("");
    $('input[name=asset][value=Equity]').prop('checked', true);
    $('input[name=growth][value=GROWTH]').prop('checked', true);
    $(".idcw").css('display','none');
    
    var dataAmc=[];
    const data = {
      ASSET_CLASS: $("input:radio[name=asset]:checked").val(),
      DIV_GW: $("input:radio[name=growth]:checked").val(),
      AMC_CODE: $('select[name="amc_code"]').val(),
    }
  
   if((data.ASSET_CLASS!=undefined) && (data.DIV_GW!=undefined) && (data.AMC_CODE!="")){
    Axios.post("/prodigypro/api/targetScheme", data)
    .then((res) => {
      // console.log("targetScheme",res.data.data.data)
      this.setState({ usertargetScheme: res.data.data.data })
    })
    }

    this.setState({folioList:''})
    if(data.AMC_CODE!=''){
      this.state.amc.map((val)=>{
        if(val.amc_code==data.AMC_CODE){
          dataAmc.push(val);
          this.setState({folioList:dataAmc})
        }
      });
    }

  }


   targetScheme = e => {
    const data = {
      AMC_CODE:$('select[name="AMCId"]').val(),
      ASSET_CLASS:$("input:radio[name=asset]:checked").val(),
      DIV_GW:$("input:radio[name=growth]:checked").val(),
    }
    
    if(data.DIV_GW=="Dividend"){
      $(".idcw").css('display','block');
    }else{
      $(".idcw").css('display','none');
    }
   }

  newFolio=(e)=>{
    // new_folio
    let new_folio = $('select[name="new_folio"]').val();
    if(new_folio!=""){
      $("#first_order").css({ "display": "block" });
    }else{
      $("#first_order").css({ "display": "none" });
    }

  }

  genFirst=(e)=>{
    let gen_first = $('select[name="gen_first"]').val();
    // alert(gen_first);
    if(gen_first=="Yes"){
      this.setState({msg:"First Installment shall be deducted on current date and subsequent installments shall be deducted on selected SIP Date."})
      window.$('#exampleModalCenter').modal('show');
    }
    if(gen_first=="No"){
      this.setState({msg:"Difference between Current Date and SIP Start date should be atleats 7 days."})
      window.$('#exampleModalCenter').modal('show');
    }
  } 

 optionvalidation (data) {
    let dataErr = [];
    if (data.ASSET_CLASS == undefined) {
      var isValid ={assetClass:"1"}
      dataErr.push(isValid);
      this.setState({ asset_err: "Mandatory Field" });
    } else {
      // var isValid = true;
      this.setState({ asset_err: "" });
    }
  
    if (data.DIV_GW == undefined) {
      var isValid ={growth:"1"}
      dataErr.push(isValid);
      this.setState({ gw_err: "Mandatory Field" });
    } else {
      // var isValid = true;
      this.setState({ gw_err: "" });
    }
    return  dataErr.length;
  }

  getschemedata = e => {
   const data = {
      ASSET_CLASS: $("input:radio[name=asset]:checked").val(),
      DIV_GW: $("input:radio[name=growth]:checked").val(),
      AMC_CODE: $('select[name="amc_code"]').val(),
    }

    this.setState({ userschemeName: "" })
   if(this.optionvalidation(data)==0){
    let product_code = $('select[name="scheme_name"]').val();
    this.state.usertargetScheme.map(val => {
      console.log("scheme list", val)
      if (val.PRODUCT_CODE == product_code) {
        if(val.REINVEST_TAG=="Y"){
        $('input[name="idcw_val"]').val("Reinvest");
        }else{
        $('input[name="idcw_val"]').val("Payout");
        }
      const swp_date_arr = val.SIP_DATES.split(',');
      this.setState({ userSwpDate: swp_date_arr })
      this.setState({ userschemeName: { folio_no: "", scheme: val.PRODUCT_LONG_NAME, amc_code: val.AMC_CODE, product_code: val.PRODUCT_CODE, reinvest: val.REINVEST_TAG, iin: this.state.userIIN } })
      }
    })
  }
  }

  handleFormValidation(data){
    let dataErr=[];
    if (data.userPro_id == "") {
      var isValid ={userPro_id:"1"}
      dataErr.push(isValid);
      this.setState({ iin_err: "Mandatory Field" });
    } else {
      // var isValid = true;
      this.setState({ iin_err: "" });
    }

    if (data.existiScheme == undefined) {
      var isValid ={existiScheme:"1"}
      dataErr.push(isValid);
      this.setState({ existiScheme_err: "Mandatory Field" });
    } else {
      // var isValid = true;
      this.setState({ existiScheme_err: "" });
    }

    if (data.existiScheme == "exit") {
      if (data.key == undefined) {
        var isValid ={key:"1"}
        dataErr.push(isValid);
        this.setState({ scheme_err: "Mandatory Field" });
      }else{
        // var isValid = true;
        this.setState({ scheme_err: "" });
      }
    } else {
      if (data.amc == "") {
        var isValid ={amc:"1"}
        dataErr.push(isValid);
        this.setState({ amc_code_err: "Mandatory Field" });
      } else {
        // var isValid = true;
        this.setState({ amc_code_err: "" });
      }
    
      if (data.assetClass == undefined) {
        var isValid ={assetClass:"1"}
        dataErr.push(isValid);
        this.setState({ asset_err: "Mandatory Field" });
      } else {
        // var isValid = true;
        this.setState({ asset_err: "" });
      }
    
      if (data.growth == undefined) {
        var isValid ={growth:"1"}
        dataErr.push(isValid);
        this.setState({ gw_err: "Mandatory Field" });
      } else {
        // var isValid = true;
        this.setState({ gw_err: "" });
      }
    
      if (data.scheme == "") {
        var isValid ={scheme:"1"}
        dataErr.push(isValid);
        this.setState({ tscheme_err: "Mandatory Field" });
      } else {
        // var isValid = true;
        this.setState({ tscheme_err: "" });
      }
    }
    
    if (data.amt == "") {
      var isValid ={amt:"1"}
      dataErr.push(isValid);
      this.setState({ amt_err: "Mandatory Field" });
    } else {
      // if(data.amt<500){
      //   var isValid ={amt:"1"}
      //   dataErr.push(isValid);
      //   this.setState({ amt_err: "Minimum Amount Should be 500" });
      // }else{
      //   // var isValid = true;
      //   this.setState({ amt_err: "" });
      // }
      this.setState({ amt_err: "" });
    }

    if (data.date == "") {
      var isValid ={date:"1"}
      dataErr.push(isValid);
      this.setState({ date_err: "Mandatory Field" });
    } else {
      var startDay = new Date();  
      var endDay = new Date(data.date_from+'-'+data.date); 
      var millisBetween = endDay.getTime() - startDay.getTime(); 
      var days = parseInt(millisBetween / (1000 * 3600 * 24));    
      if (days <6) {
        var isValid ={date:"1"}
        dataErr.push(isValid);
        this.setState({ date_err: "Difference between current Date and SIP date should be atlest 7 days" });
      } else {
        this.setState({ date_err: "" });
      }
    }

    if (data.date_from == "") {
      var isValid ={date_from:"1"}
      dataErr.push(isValid);
      this.setState({ date_from_err: "Mandatory Field" });
    } else {
      // var isValid = true;
      this.setState({ date_from_err: "" });
    }

    if (data.perpetual == "N") {
      if (data.date_to == "") {
        var isValid ={date_to:"1"}
        dataErr.push(isValid);
        this.setState({ date_to_err: "Mandatory Field" });
      } else {
        // var isValid = true;
        this.setState({ date_to_err: "" });
      }
    } 
    return dataErr.length;
  }

  addClick = (e) => {

    const data = {
      assetClass: $("input:radio[name=asset]:checked").val(),
      growth: $("input:radio[name=growth]:checked").val(),
      scheme: $('select[name="scheme_name"]').val(),
      scheme_name: $("#scheme_name option:selected").text(),
      schemeName: this.state.userschemeName?this.state.userschemeName.scheme:'',
      folio_no:  this.state.userschemeName?this.state.userschemeName.folio_no:'',
      amc_code:  this.state.userschemeName?this.state.userschemeName.amc_code:'',
      product_code:  this.state.userschemeName?this.state.userschemeName.product_code:'',
      reinvest:  this.state.userschemeName?this.state.userschemeName.reinvest:'',
      iin:  this.state.userschemeName?this.state.userschemeName.iin:'',
       fh_pan_no:this.state.fh_pan_no,
      date: $('select[name="date"]').val(),
      date_from: $('input[name="month_from"]').val(),
      date_to: $('input[name="month_to"]').val(),
      amt: $('input[name="amt"]').val(),
      perpetual: $('input[name="perpetual_val"]').val(),
      existiScheme:$("input:radio[name=existiScheme]:checked").val(),
      key :$("input:radio[name=key]:checked").val(),
      amc : $('select[name="amc_code"]').val(),
      userPro_id : $('select[name="userPro_id"]').val()
    }
    // alert(data.perpetual)
    
    if (this.handleFormValidation(data)==0) {
      this.setState(prevState => ({
        Items: [...prevState.Items, data]
      }))
  
     $('select[name="date"]').val("");
    $('input[name="month_from"]').val("");
    $('input[name="month_to"]').val("");
    $('input[name="amt"]').val("");
    $('select[name="amc_code"]').val("");
    $('select[name="scheme_name"]').val("");
    $('input[name="asset"]').prop('checked', false);
    $('input[name="growth"]').prop('checked', false);
    // $('input[name="existiScheme"]').prop('checked', false);
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

  getMandate = (e) => {
    // this.setState({userMandate:""})
    let mandate = $('select[name="mandate"]').val();

    this.state.userMandateList.map(val => {
      //console.log("scheme list",val)
      if (val.MANDATE_ID == mandate) {
        // alert(mandate);
        this.setState({ userMandate: { umrn: val.UMRN_NO, bank_code: val.BANK_CODE, holder_name: val.INVESTOR_NAME, accountNo: val.ACCOUNT_NO, acoount_type: val.AC_TYPE, branch: val.BRANCH, ach_fromdate: val.FROM_DATE, ach_enddate: val.TO_DATE } })
      }
    })


    const userData = JSON.parse(localStorage.getItem("loginUserData"))

    if(this.state.trasnDataDelete != ''){
      this.state.trasnDataDelete.map((val, key) => {
        const transDel ={
          id:val
        }
        Axios.post("/prodigypro/api/deleteTransactionDetails", transDel)
        .then((res) => {
        })
      })
    }

    if(this.state.Items != ''){
      var transId = [];
      this.state.Items.map((val, key) => {
        const current = new Date();
        const transData = {
          pan :val.fh_pan_no,
          iin :val.iin,
          mode : "Transact-SIP",
          payment_mode : "Mandate",
          email: userData.email,
          date:`${current.getFullYear()}-0${current.getMonth()+1}-0${current.getDate()}`,
          amc: val.amc_code,
          scheme_code: val.product_code,
          amount: val.amt,
          folio: val.folio_no,
          scheme_name:val.scheme_name
        }
        console.log("insertTransactionDetails",transData)
        Axios.post("/prodigypro/api/insertTransactionDetails", transData)
        .then((res) => {
          transId.push(res.data.data.id)
          console.log("insertTransactionDetails",res.data.data)
          this.setState({ trasnDataDelete: transId})
        })
      })
    }
  }

  handleFormValidation_2(data){
    let dataErr=[];
    if (data.userPro_id == "") {
      var isValid ={userPro_id:"1"}
      dataErr.push(isValid);
      this.setState({ iin_err: "Mandatory Field" });
    } else {
      // var isValid = true;
      this.setState({ iin_err: "" });
    }

    if (data.existiScheme == undefined) {
      var isValid ={existiScheme:"1"}
      dataErr.push(isValid);
      this.setState({ existiScheme_err: "Mandatory Field" });
    } else {
      // var isValid = true;
      this.setState({ existiScheme_err: "" });
    }

    if (data.existiScheme == "exit") {
      if (data.key == undefined) {
        var isValid ={key:"1"}
        dataErr.push(isValid);
        this.setState({ scheme_err: "Mandatory Field" });
      }else{
        this.setState({ scheme_err: "" });
      }
    } else {
      if (data.amc == "") {
        var isValid ={amc:"1"}
        dataErr.push(isValid);
        this.setState({ amc_code_err: "Mandatory Field" });
      } else {
        this.setState({ amc_code_err: "" });
      }
    
      if (data.assetClass == undefined) {
        var isValid ={assetClass:"1"}
        dataErr.push(isValid);
        this.setState({ asset_err: "Mandatory Field" });
      } else {
        // var isValid = true;
        this.setState({ asset_err: "" });
      }
    
      if (data.growth == undefined) {
        var isValid ={growth:"1"}
        dataErr.push(isValid);
        this.setState({ gw_err: "Mandatory Field" });
      } else {
        // var isValid = true;
        this.setState({ gw_err: "" });
      }
    
      if (data.scheme == "") {
        var isValid ={scheme:"1"}
        dataErr.push(isValid);
        this.setState({ tscheme_err: "Mandatory Field" });
      } else {
        // var isValid = true;
        this.setState({ tscheme_err: "" });
      }
    }
    
    if (data.amt == "") {
      var isValid ={amt:"1"}
      dataErr.push(isValid);
      this.setState({ amt_err: "Mandatory Field" });
    } else {
      // if(data.amt<500){
      //   var isValid ={amt:"1"}
      //   dataErr.push(isValid);
      //   this.setState({ amt_err: "Minimum Amount Should be 500" });
      // }else{
      //   // var isValid = true;
      //   this.setState({ amt_err: "" });
      // }
      this.setState({ amt_err: "" });
     
    }

    if (data.date == "") {
      var isValid ={date:"1"}
      dataErr.push(isValid);
      this.setState({ date_err: "Mandatory Field" });
    } else {
      var startDay = new Date();  
      var endDay = new Date(data.date_from+'-'+data.date); 
      var millisBetween = endDay.getTime() - startDay.getTime(); 
      var days = parseInt(millisBetween / (1000 * 3600 * 24));    
      if (days <=7) {
        var isValid ={date:"1"}
        dataErr.push(isValid);
        this.setState({ date_err: "Difference between current Date and SIP date should be atlest 7 days" });
      } else {
        this.setState({ date_err: "" });
      }
    }

    if (data.date_from == "") {
      var isValid ={date_from:"1"}
      dataErr.push(isValid);
      this.setState({ date_from_err: "Mandatory Field" });
    } else {
      // var isValid = true;
      this.setState({ date_from_err: "" });
    }


    if (data.perpetual == "N") {

      if (data.date_to == "") {
        var isValid ={date_to:"1"}
        dataErr.push(isValid);
        this.setState({ date_to_err: "Mandatory Field" });
      } else {
        // var isValid = true;
        this.setState({ date_to_err: "" });
      }

    } 
    
    if (data.mandate == "") {
      var isValid ={mandate:"1"}
      dataErr.push(isValid);
      this.setState({ mandate_err: "Mandatory Field" });
    } else {
      // var isValid = true;
      this.setState({ mandate_err: "" });
    }

    return dataErr.length;
  }

  oderNow = (e) => {

    const userData = JSON.parse(localStorage.getItem("loginUserData"))
    let existiScheme = $("input:radio[name=existiScheme]:checked").val();
    
    const data = {
      assetClass: $("input:radio[name=asset]:checked").val(),
      growth: $("input:radio[name=growth]:checked").val(),
      scheme: $('select[name="scheme_name"]').val(),
      date: $('select[name="date"]').val(),
      date_from: $('input[name="month_from"]').val(),
      date_to: $('input[name="month_to"]').val(),
      amt: $('input[name="amt"]').val(),
      perpetual: $('input[name="perpetual_val"]').val(),
      existiScheme:$("input:radio[name=existiScheme]:checked").val(),
      key :$("input:radio[name=key]:checked").val(),
      amc : $('select[name="amc_code"]').val(),
      userPro_id : $('select[name="userPro_id"]').val(),
      mandate : $('select[name="mandate"]').val(),
      gen_first : $('select[name="gen_first"]').val(),
      new_folio : $('select[name="new_folio"]').val()
    }


    
    // alert(data.new_folio)
    if (this.handleFormValidation_2(data)==0) {
      if ((existiScheme != "exit") && (data.new_folio=="") ) {
        let data = [];  let total_amt = 0;
        if(this.state.Items!=''){
        // if (this.handleFormValidation_2(data)==0) {
          this.state.Items.map((val, key) => {
            total_amt = parseInt(total_amt) + parseInt(val.amt);
            const swp_from_arr = val.date_from.split('-');
            const swp_to_arr = val.date_to.split('-');
            const from_mn = new Date(swp_from_arr[1]).toString().split(' ')[1];
            const to_mn = new Date(swp_to_arr[1]).toString().split(' ')[1];
            var to_year = "";
            console.log("val.perpetual", val.perpetual)
            if (val.perpetual == "Y") {
              to_year = "31-Dec-2099";
            } else {
              to_year = val.date + "-" + to_mn + "-" + swp_to_arr[0];
            }
            // alert(to_year)
            const value = {
              amc: val.amc_code,
              product_code: val.product_code,
              reinvest: val.reinvest,
              amount: val.amt,
              perpetual_flag: val.perpetual,
              input_ref_no: "",
              sip_paymech: "M",
              ach_amt: val.amt,
              transfer_date: "",
              from_date: null,
              to_date: null,
              target_product: null,
              periodicity: null,
              period_day: null,
              sip_from_date: val.date + "-" + from_mn + "-" + swp_from_arr[0],
              sip_end_date: to_year,
              sip_freq: "OM",
              sip_amount: val.amt,
              sip_period_day: val.date,
              folio: val.folio_no,
              amt_unit_type: null,
              amt_unit: null,
              all_unit: null,
            }
    
            data.push(value)
          })
    
          var until = "";
          if (this.state.userMandate.ach_enddate == "31-DEC-2099") {
            until = "Y";
          } else {
            until = "N";
          }
    
          const value2 = {
            email: userData.email,
            iin: this.state.Items[0].iin,
            instrm_amount:total_amt,
            bank_code: this.state.userMandate.bank_code,
            holder_name: this.state.userMandate.holder_name,
            accountNo: this.state.userMandate.accountNo,
            acoount_type: this.state.userMandate.acoount_type,
            branch: this.state.userMandate.branch,
            umrn: this.state.userMandate.umrn,
            until_cancelled:until,
            ach_amt: this.state.Items[0].amt,
            ach_fromdate: this.state.userMandate.ach_fromdate,
            ach_enddate: this.state.userMandate.ach_enddate,
            childArr: data
          }
     $("#overlay").css("display","block")
          Axios.post("/prodigypro/api/multi_purchase_sip", value2)
          .then((result) => {
             if(this.state.trasnDataDelete != ''){
                this.state.trasnDataDelete.map((val, key) => {
                  const transDel ={
                    id:val
                  }
                  Axios.post("/prodigypro/api/deleteTransactionDetails", transDel)
                  .then((res) => {
                  })
                })
              }
        $("#overlay").css("display","none")
              console.log(result.data.data);
              if (result.data.data.status == 400) {
                
                toast.error(result.data.data.message)
              } else {
                this.setState({orderMsg:"Payment link has been sent on your registered mail id and mobile number.The Link shall remain active for the next 48 hours. Kindly authorize."})
                toast.success(result.data.data.message)
                window.$('.bd-example-modal-lg').modal('show');
                this.setState({orderData: result.data.data.data})
              }
          });
           
        }else{

          let perpetual = $('input[name="perpetual_val"]').val();
          let date= $('select[name="date"]').val();
          let date_from= $('input[name="month_from"]').val();
          let  date_to= $('input[name="month_to"]').val();
          const swp_from_arr = date_from.split('-');
          const swp_to_arr = date_to.split('-');
          const from_mn = new Date(swp_from_arr[1]).toString().split(' ')[1];
          const to_mn = new Date(swp_to_arr[1]).toString().split(' ')[1];
          var to_year = "";
          
          if (perpetual == "Y") {
            to_year = "31-Dec-2099";
          } else {
            to_year = date + "-" + to_mn + "-" + swp_to_arr[0];
          }
          // alert(to_year)
          const value = {
            amc: this.state.userschemeName.amc_code,
            product_code: this.state.userschemeName.product_code,
            reinvest:this.state.userschemeName.reinvest,
            amount:$('input[name="amt"]').val(),
            perpetual_flag: $('input[name="perpetual_val"]').val(),
            input_ref_no: "",
            sip_paymech: "M",
            ach_amt: $('input[name="amt"]').val(),
            transfer_date: "",
            from_date: null,
            to_date: null,
            target_product: null,
            periodicity: null,
            period_day: null,
            sip_from_date: date + "-" + from_mn + "-" + swp_from_arr[0],
            sip_end_date: to_year,
            sip_freq: "OM",
            sip_amount: $('input[name="amt"]').val(),
            sip_period_day: date,
            folio: this.state.userschemeName.folio_no,
            amt_unit_type: null,
            amt_unit: null,
            all_unit: null,
          }
  
          data.push(value)
          
          var until = "";
          if (this.state.userMandate.ach_enddate == "31-DEC-2099") {
            until = "Y";
          } else {
            until = "N";
          }
  
          const value2 = {
            email: userData.email,
            iin: this.state.userschemeName.iin,
            instrm_amount:$('input[name="amt"]').val(),
            bank_code: this.state.userMandate.bank_code,
            holder_name: this.state.userMandate.holder_name,
            accountNo: this.state.userMandate.accountNo,
            acoount_type: this.state.userMandate.acoount_type,
            branch: this.state.userMandate.branch,
            umrn: this.state.userMandate.umrn,
            until_cancelled:until,
            ach_amt: $('input[name="amt"]').val(),
            ach_fromdate: this.state.userMandate.ach_fromdate,
            ach_enddate: this.state.userMandate.ach_enddate,
            childArr: data
          } 
     $("#overlay").css("display","block")
          Axios.post("/prodigypro/api/multi_purchase_sip", value2)
          .then((result) => {
            if(this.state.trasnDataDelete != ''){
                this.state.trasnDataDelete.map((val, key) => {
                  const transDel ={
                    id:val
                  }
                  Axios.post("/prodigypro/api/deleteTransactionDetails", transDel)
                  .then((res) => {
                  })
                })
              }
        $("#overlay").css("display","none")
              console.log(result.data.data);
              if (result.data.data.status == 400) {
                toast.error(result.data.data.message)
              } else {
                this.setState({orderMsg:"Payment link has been sent on your registered mail id and mobile number.The Link shall remain active for the next 48 hours. Kindly authorize."})
                toast.success(result.data.data.message)
                window.$('.bd-example-modal-lg').modal('show');
                this.setState({orderData: result.data.data.data})
              }
          });
        }

      }else{
        if(data.gen_first=="Yes"){
          let data = [];  let total_amt = 0;
          if(this.state.Items!=''){ // alert("hello-5")
            this.state.Items.map((val, key) => {
              total_amt = parseInt(total_amt) + parseInt(val.amt);
              const swp_from_arr = val.date_from.split('-');
              const swp_to_arr = val.date_to.split('-');
              const from_mn = new Date(swp_from_arr[1]).toString().split(' ')[1];
              const to_mn = new Date(swp_to_arr[1]).toString().split(' ')[1];
              var to_year = "";
              console.log("val.perpetual", val.perpetual)
              if (val.perpetual == "Y") {
                to_year = "31-Dec-2099";
              } else {
                to_year = val.date + "-" + to_mn + "-" + swp_to_arr[0];
              }
              // alert(to_year)
              const value = {
                amc: val.amc_code,
                product_code: val.product_code,
                reinvest: val.reinvest,
                amount: val.amt,
                perpetual_flag: val.perpetual,
                input_ref_no: "",
                sip_paymech: "M",
                ach_amt: val.amt,
                transfer_date: "",
                from_date: null,
                to_date: null,
                target_product: null,
                periodicity: null,
                period_day: null,
                sip_from_date: val.date + "-" + from_mn + "-" + swp_from_arr[0],
                sip_end_date: to_year,
                sip_freq: "OM",
                sip_amount: val.amt,
                sip_period_day: val.date,
                folio: val.folio_no,
                amt_unit_type: null,
                amt_unit: null,
                all_unit: null,
              }
      
              data.push(value)
            })
      
            var until = "";
            if (this.state.userMandate.ach_enddate == "31-DEC-2099") {
              until = "Y";
            } else {
              until = "N";
            }
      
            const value2 = {
              email: userData.email,
              iin: this.state.Items[0].iin,
              instrm_amount:total_amt,
              bank_code: this.state.userMandate.bank_code,
              holder_name: this.state.userMandate.holder_name,
              accountNo: this.state.userMandate.accountNo,
              acoount_type: this.state.userMandate.acoount_type,
              branch: this.state.userMandate.branch,
              umrn: this.state.userMandate.umrn,
              until_cancelled:until,
              ach_amt: this.state.Items[0].amt,
              ach_fromdate: this.state.userMandate.ach_fromdate,
              ach_enddate: this.state.userMandate.ach_enddate,
              childArr: data
            }
      $("#overlay").css("display","block")
            Axios.post("/prodigypro/api/multi_purchase_sip", value2)
            .then((result) => {
                if(this.state.trasnDataDelete != ''){
                    this.state.trasnDataDelete.map((val, key) => {
                      const transDel ={
                        id:val
                      }
                      Axios.post("/prodigypro/api/deleteTransactionDetails", transDel)
                      .then((res) => {
                      })
                    })
                  }
        $("#overlay").css("display","none")
                console.log(result.data.data);
                if (result.data.data.status == 400) {
                  toast.error(result.data.data.message)
                } else {
                  this.setState({orderMsg:"Payment link has been sent on your registered mail id and mobile number.The Link shall remain active for the next 48 hours. Kindly authorize."})
                  toast.success(result.data.data.message)
                  window.$('.bd-example-modal-lg').modal('show');
                  this.setState({orderData: result.data.data.data})
                }
            });
            
          }else{
            // alert("hello-6")
            let perpetual = $('input[name="perpetual_val"]').val();
            let date= $('select[name="date"]').val();
            let date_from= $('input[name="month_from"]').val();
            let  date_to= $('input[name="month_to"]').val();
            const swp_from_arr = date_from.split('-');
            const swp_to_arr = date_to.split('-');
            const from_mn = new Date(swp_from_arr[1]).toString().split(' ')[1];
            const to_mn = new Date(swp_to_arr[1]).toString().split(' ')[1];
            var to_year = "";
            
            if (perpetual == "Y") {
              to_year = "31-Dec-2099";
            } else {
              to_year = date + "-" + to_mn + "-" + swp_to_arr[0];
            }
            // alert(to_year)
            const value = {
              amc: this.state.userschemeName.amc_code,
              product_code: this.state.userschemeName.product_code,
              reinvest:this.state.userschemeName.reinvest,
              amount:$('input[name="amt"]').val(),
              perpetual_flag: $('input[name="perpetual_val"]').val(),
              input_ref_no: "",
              sip_paymech: "M",
              ach_amt: $('input[name="amt"]').val(),
              transfer_date: "",
              from_date: null,
              to_date: null,
              target_product: null,
              periodicity: null,
              period_day: null,
              sip_from_date: date + "-" + from_mn + "-" + swp_from_arr[0],
              sip_end_date: to_year,
              sip_freq: "OM",
              sip_amount: $('input[name="amt"]').val(),
              sip_period_day: date,
              folio: this.state.userschemeName.folio_no,
              amt_unit_type: null,
              amt_unit: null,
              all_unit: null,
            }
    
            data.push(value)
            
            var until = "";
            if (this.state.userMandate.ach_enddate == "31-DEC-2099") {
              until = "Y";
            } else {
              until = "N";
            }
    
            const value2 = {
              email: userData.email,
              iin: this.state.userschemeName.iin,
              instrm_amount:$('input[name="amt"]').val(),
              bank_code: this.state.userMandate.bank_code,
              holder_name: this.state.userMandate.holder_name,
              accountNo: this.state.userMandate.accountNo,
              acoount_type: this.state.userMandate.acoount_type,
              branch: this.state.userMandate.branch,
              umrn: this.state.userMandate.umrn,
              until_cancelled:until,
              ach_amt: $('input[name="amt"]').val(),
              ach_fromdate: this.state.userMandate.ach_fromdate,
              ach_enddate: this.state.userMandate.ach_enddate,
              childArr: data
            } 
            $("#overlay").css("display","block")
            Axios.post("/prodigypro/api/multi_purchase_sip", value2)
            .then((result) => {
                if(this.state.trasnDataDelete != ''){
                    this.state.trasnDataDelete.map((val, key) => {
                      const transDel ={
                        id:val
                      }
                      Axios.post("/prodigypro/api/deleteTransactionDetails", transDel)
                      .then((res) => {
                      })
                    })
                  }
        $("#overlay").css("display","none")
                console.log(result.data.data);
                if (result.data.data.status == 400) {
                  toast.error(result.data.data.message)
                } else {
                  this.setState({orderMsg:"Payment link has been sent on your registered mail id and mobile number.The Link shall remain active for the next 48 hours. Kindly authorize."})
                  toast.success(result.data.data.message)
                  window.$('.bd-example-modal-lg').modal('show');
                  this.setState({orderData: result.data.data.data})
                }
            });
          }
        }else{
          if(this.state.Items!=''){
            // alert("hello-7")
            let data = []; let total_amt = 0;
            this.state.Items.map((val, key) => {
              total_amt = parseInt(total_amt) + parseInt(val.amt);
              const swp_from_arr = val.date_from.split('-');
              const swp_to_arr = val.date_to.split('-');
              const from_mn = new Date(swp_from_arr[1]).toString().split(' ')[1];
              const to_mn = new Date(swp_to_arr[1]).toString().split(' ')[1];
              var to_year = "";
              console.log("val.perpetual", val.perpetual)
              if (val.perpetual == "Y") {
                to_year = "31-Dec-2099";
              } else {
                to_year = val.date + "-" + to_mn + "-" + swp_to_arr[0];
              }
              let  new_folio= $('select[name="new_folio"]').val();
              var folio_no = "";
              if(new_folio==''){
                folio_no =  val.folio_no;
              }else{
                folio_no = new_folio ;
              }
              
              // alert(to_year)
              const value = {
                folio: folio_no,
                amc: val.amc_code,
                product_code: val.product_code,
                reinvest: val.reinvest,
                amount: val.amt,
                perpetual_flag: val.perpetual,
                input_ref_no: "",
                sip_paymech: null,
                ach_amt: null,
                transfer_date: "",
                from_date: val.date + "-" + from_mn + "-" + swp_from_arr[0],
                to_date: to_year,
                target_product: null,
                periodicity: "OM",
                period_day: val.date,
                sip_from_date: null,
                sip_end_date: null,
                sip_freq: null,
                sip_amount: val.amt,
                sip_period_day: val.date,
                amt_unit_type: "AMOUNT",
                amt_unit: val.amt,
                all_unit: null,
              }
      
              data.push(value)
            })
      
            var until = "";
            if (this.state.userMandate.ach_enddate == "31-DEC-2099") {
              until = "Y";
            } else {
              until = "N";
              // this.setState({ until: "" });
            }
      
            const value2 = {
              email: userData.email,
              iin: this.state.Items[0].iin,
              instrm_amount: total_amt,
              bank_code: this.state.userMandate.bank_code,
              holder_name: this.state.userMandate.holder_name,
              accountNo: this.state.userMandate.accountNo,
              acoount_type: this.state.userMandate.acoount_type,
              branch: this.state.userMandate.branch,
              umrn: this.state.userMandate.umrn,
              until_cancelled: until,
              ach_amt: this.state.Items[0].amt,
              ach_fromdate: this.state.userMandate.ach_fromdate,
              ach_enddate: this.state.userMandate.ach_enddate,
              childArr: data
            }
            
            console.log("value2",value2);
      $("#overlay").css("display","block")
            Axios.post("/prodigypro/api/multi_regularSIP", value2)
            .then((result) => {
                if(this.state.trasnDataDelete != ''){
                    this.state.trasnDataDelete.map((val, key) => {
                      const transDel ={
                        id:val
                      }
                      Axios.post("/prodigypro/api/deleteTransactionDetails", transDel)
                      .then((res) => {
                      })
                    })
                  }
        $("#overlay").css("display","none")
                console.log(result.data.data);
                if (result.data.data.status == 400) {
                  if(result.data.data.message==""){
                    toast.error(result.data.data.message)
                  }else{
                    toast.error(result.data.data.message)
                  }
                  
                } else {
                  this.setState({orderMsg:"Payment link has been sent on your registered mail id and mobile number.The Link shall remain active for the next 48 hours. Kindly authorize."})
                  window.$('.bd-example-modal-lg').modal('show');
                  this.setState({orderData: result.data.data.data})
                  toast.success(result.data.data.message)
                }
              });
          }else{
            // alert("hello-8")
            let data = []; 
            let perpetual = $('input[name="perpetual_val"]').val();
            let date= $('select[name="date"]').val();
            let date_from= $('input[name="month_from"]').val();
            let  date_to= $('input[name="month_to"]').val();
            let  new_folio= $('select[name="new_folio"]').val();
            const swp_from_arr = date_from.split('-');
            const swp_to_arr = date_to.split('-');
            const from_mn = new Date(swp_from_arr[1]).toString().split(' ')[1];
            const to_mn = new Date(swp_to_arr[1]).toString().split(' ')[1];
            var to_year = "";
            if (perpetual == "Y") {
              to_year = "31-Dec-2099";
            } else {
              to_year = date + "-" + to_mn + "-" + swp_to_arr[0];
            }
            var folio_no = "";
            if(new_folio==''){
              folio_no =  this.state.userschemeName.folio_no;
            }else{
              folio_no = new_folio ;
            }


            const value = {
              folio: folio_no,
              amc: this.state.userschemeName.amc_code,
              product_code: this.state.userschemeName.product_code,
              reinvest:this.state.userschemeName.reinvest,
              amount:$('input[name="amt"]').val(),
              perpetual_flag: $('input[name="perpetual_val"]').val(),
              input_ref_no: "",
              sip_paymech: null,
              ach_amt: null,
              transfer_date: "",
              from_date: date + "-" + from_mn + "-" + swp_from_arr[0],
              to_date: to_year,
              target_product: null,
              periodicity: "OM",
              period_day: date,
              sip_from_date: null,
              sip_end_date: null,
              sip_freq: null,
              sip_amount: $('input[name="amt"]').val(),
              sip_period_day: date,
              amt_unit_type: "AMOUNT",
              amt_unit: $('input[name="amt"]').val(),
              all_unit: null,
            }
          data.push(value)
          var until = "";
          if (this.state.userMandate.ach_enddate == "31-DEC-2099") {
            until = "Y";
          } else {
            until = "N";
          }
  
          const value2 = {
            email: userData.email,
            iin: this.state.userschemeName.iin,
            instrm_amount:$('input[name="amt"]').val(),
            bank_code: this.state.userMandate.bank_code,
            holder_name: this.state.userMandate.holder_name,
            accountNo: this.state.userMandate.accountNo,
            acoount_type: this.state.userMandate.acoount_type,
            branch: this.state.userMandate.branch,
            umrn: this.state.userMandate.umrn,
            until_cancelled:until,
            ach_amt: $('input[name="amt"]').val(),
            ach_fromdate: this.state.userMandate.ach_fromdate,
            ach_enddate: this.state.userMandate.ach_enddate,
            childArr: data
          } 
  
          console.log("value2",value2);
      $("#overlay").css("display","block")
          Axios.post("/prodigypro/api/multi_regularSIP", value2)
          .then((result) => {
            if(this.state.trasnDataDelete != ''){
                this.state.trasnDataDelete.map((val, key) => {
                  const transDel ={
                    id:val
                  }
                  Axios.post("/prodigypro/api/deleteTransactionDetails", transDel)
                  .then((res) => {
                  })
                })
              }
        $("#overlay").css("display","none")
              console.log(result.data.data);
              if (result.data.data.status == 400) {
                toast.error(result.data.data.message)
              } else {
                this.setState({orderMsg:"Payment link has been sent on your registered mail id and mobile number.The Link shall remain active for the next 48 hours. Kindly authorize."})
                window.$('.bd-example-modal-lg').modal('show');
                this.setState({orderData: result.data.data.data})
                toast.success(result.data.data.message)
              }
            });
          }
        }
      }
    }     
  }

  render() {
    // console.log("userMandate ", this.state.userMandate)
    let DataList = []; let date;
    if (this.state.userSwpDate) {
      for (var i = 0; i < this.state.userSwpDate.length; i++) {
        date = <option value={this.state.userSwpDate[i]}>{this.state.userSwpDate[i]}</option>
        DataList.push(date)
      }
    } if (this.state.userSwpDate == "") {

      DataList.push("")

    } if (this.state.userSwpDate == true) {
      for (var i = 1; i < 31; i++) {
        date = <option value={i}>{i}</option>
        DataList.push(date)
      }
    }

    return (
      <>
        <StyleComponent />
        <Helmet>
          <title>Prodigy Pro - SIP</title>
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
            #exitscheme{
              display:none;
            }
            #end_date{
              display:none;
            }
            .toast{
              width:800px;
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
            #newschemes{
              display:none;
            }
            #newschemes1{
              display:none;
            }
            #first_order{
              display:none;
            }
      #overlay{
        display:none;
      }
      .idcw{
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
                 {/*<th scope="col">Application No</th>*/}
                    <th scope="col">Fund</th>
                    {/*  <th scope="col">Scheme</th>*/}
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
                     {/* <td>{val.Application_No}</td>*/}
                    <td>{val.Fund}</td>
                     {/* <td>{val.Scheme}</td>*/}
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
          {/* Message model */}
          <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true" data-keyboard="false" data-backdrop="static">
            <div class="modal-dialog modal-dialog-centered" role="document">
              <div class="modal-content">
                
                <div class="modal-body">
                  <p className="text-dark font-weight-bold">
                    {this.state.msg}
                  </p>
                  <div className="text-center">
                    <button type="button" class="btn btn-primary" data-dismiss="modal">OK</button>
                  </div>
                </div>
                {/* <div class="modal-footer">
                
                </div> */}
              </div>
            </div>
          </div>
          {/* Sidebar */}
          <Sidebar mainTab="transact"  innertab="sip"/>
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
                    <li className="breadcrumb-item active" aria-current="page">SIP</li>
                  </ol>
                </nav>
                <div className="row">
                  {/* Area Chart */}
                  <div className="col-xl-12 col-lg-12">
                    <div className="card shadow mb-4">
                      {/* Card Header - Dropdown */}
                      <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                        {/* <h6 className="m-0 font-weight-bold text-danger">SIP</h6> */}
                      </div>
                      {/* Card Body */}
                      <div className="card-body">
                        <div className="row">
                          <div className="col-xl-4 col-lg-4 mb-4">
                            <span className="has-float-label">
                              <select className="form-control input-text" name="userPro_id" onChange={this.userProfile}>
                                <option value="">Select Profile</option>
                                {this.state.userList ?
                                  this.state.userList.map((item, key) =>
                                    <option value={item.id}>{item.investor_name} {item.jh1_name != "undefined" ? " | " + item.jh1_name : null}{item.jh2_name != "undefined" ? " | " + item.jh2_name : null}</option>
                                  ) : null}
                              </select>
                              <label htmlFor="profile" className="text-label">Select Profile <spna className="text-danger">*</spna></label>
                            </span>
                            <small className="text-danger pull-left">{this.state.iin_err}</small>
                          </div>
                          <div className="col-xl-4 col-lg-4 mb-4">
                            <div className="mt-2">
                              <input className=" input-text" id="existingScheme" type="radio" value="exit" name="existiScheme" onChange={this.schemes} />
                              <label htmlFor="existingScheme" className="text-label">Existing Scheme</label>
                              <input className="input-text ml-3" id="newScheme" type="radio" name="existiScheme" value="new" onChange={this.schemes} />
                              <label htmlFor="newScheme" className="text-label">New Scheme</label><br></br>
                              <small className="text-danger pull-left">{this.state.existiScheme_err}</small>
                            </div>
                          </div>
                        </div>
                      
                        <div id="exitscheme">
                        <small className="text-danger pull-left">{this.state.scheme_err}</small>
             <div className="row">
                <div className="col-xl-12 col-lg-12 mb-4 table-wrapper-scroll-y my-custom-scrollbar">
            <table className="table mb-5">
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
                        </div>
              <div id="newschemes1">
                          <div className="row" >
              <div className="col-xl-4 col-lg-4 mb-4">
                              <span className="has-float-label">
                                <select className="form-control input-text" data-live-search="true" name="amc_code" onChange={this.schemeList}>
                                  <option value="">Select</option>
                                  {this.state.amcList ?
                                    this.state.amcList.map((item, key) =>
                                      <option value={item.amc_code}>{item.long_name}</option>
                                    ) : null}
                                </select>
                                <label htmlFor="amc" className="text-label">Select AMC  <spna className="text-danger">*</spna></label>
                              </span>
                              <small className="text-danger pull-left">{this.state.amc_code_err}</small>
                            </div>
                            <div className="col-xl-4 col-lg-4 mb-4">
                              <p className="text-label mb-1 p-radio">Asset Class  <spna className="text-danger">*</spna></p>
                              <input className=" input-text" id="equity" type="radio" name="asset" value="Equity" onChange={this.targetScheme} />
                              <label htmlFor="equity" className="text-label">Equity</label>
                              <input className="input-text ml-3" id="debt" type="radio" name="asset" value="DEBT" onChange={this.targetScheme} />
                              <label htmlFor="debt" className="text-label">Debt</label>
                              <br></br>  <small className="text-danger pull-left">{this.state.asset_err}</small> 
                            </div>
                            <div className="col-xl-4 col-lg-4 mb-4">
                              <p className="text-label mb-1 p-radio">Option  <spna className="text-danger">*</spna></p>
                              <input className=" input-text" id="growth" type="radio" name="growth" value="GROWTH" onChange={this.targetScheme} />
                              <label htmlFor="growth" className="text-label">Growth</label>
                              <input className="input-text ml-3" id="dividend" type="radio" name="growth" value="Dividend" onChange={this.targetScheme} />
                              <label htmlFor="dividend" className="text-label">IDCW
                 <span className='info-icon'><i className="fas fa-info fa-sm fa-fw text-white fa-info-icon" data-tip data-for="registerTip"/></span>
                              <ReactTooltip id="registerTip" place="top" effect="solid">
                                <div className="tool_tip">
                                  Income Distribution cum Capital Withdrawal
                                </div>
                              </ReactTooltip>
                </label>
                              <br></br><small className="text-danger pull-left">{this.state.gw_err}</small>   
                            </div>
                          </div>
                        </div>
                        <div id="newschemes">
                          <div className="row">
                            
                            <div className="col-xl-4 col-lg-4 mb-4">
                              <span className="has-float-label">
                                <select className="form-control input-text" data-live-search="true" name="new_folio" onChange={this.newFolio}>
                                  <option value="">New Folio</option>
                                  {this.state.folioList ?
                                    this.state.folioList.map((item, key) =>
                                        <option value={item.folio}>{item.folio}</option>
                                    ) : null}
                                </select>
                                <label htmlFor="source" className="text-label">Select Folio  <spna className="text-danger">*</spna></label>
                              </span>
                            </div>
                            <div className="col-xl-4 col-lg-4 mb-4">
                              <span className="has-float-label">
                                <select className="form-control input-text" id="scheme_name" name="scheme_name" onClick={this.getschemedata} >
                                  <option value="">Select</option>
                                  {this.state.usertargetScheme ?
                                    this.state.usertargetScheme.map((item, key) =>
                                      item.SIP_ALLOWED == "Y" ?
                                        <option value={item.PRODUCT_CODE}>{item.PRODUCT_LONG_NAME}</option>
                                        : null
                                    ) : null}
                                </select>
                                <label htmlFor="target" className="text-label">Select Scheme  <spna className="text-danger">*</spna></label>
                              </span>
                              <small className="text-danger pull-left">{this.state.tscheme_err}</small> 
                            </div>
              <div className="col-xl-4 col-lg-4 mb-4 idcw">
                              <span className="has-float-label">
                                <input className="form-control input-text" id="idcw_val" type="Text" placeholder="IDCW Option" name="idcw_val" defaultValue="Not Applicable"/>
                                <label htmlFor="idcw_val" className="text-label">IDCW Option</label>
                              </span>
                              
                            </div> 
                          </div>
                        </div>
                        <div className="row">
                        <div className="col-xl-3 col-lg-3 mb-3" id="first_order">
                            <span className="has-float-label">
                              <select className="form-control input-text" data-live-search="true" name="gen_first" onChange={this.genFirst} >
                                <option value="">Select</option>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                              </select>
                              <label htmlFor="date_from" className="text-label">Generate First Order  <spna className="text-danger">*</spna></label>
                            </span>
                            {/* <small className="text-danger pull-left">{this.state.date_err}</small> */}
                          </div>
                          <div className="col-xl-3 col-lg-3 mb-3">
                            <span className="has-float-label">
                              <input className="form-control input-text" id="amt" type="Text" name="amt" placeholder="Enter Value" />
                              <label htmlFor="amt" className="text-label">Enter Amount  <spna className="text-danger">*</spna></label>
                            </span>
                            <small className="text-danger pull-left">{this.state.amt_err}</small>
                          </div>
                          <div className="col-xl-3 col-lg-3 mb-3">
                            <span className="has-float-label">
                              <select className="form-control input-text" name="date" data-live-search="true" >
                                <option value="">Select</option>
                                {DataList}
                              </select>
                              <label htmlFor="date_from" className="text-label">SIP  Date  <spna className="text-danger">*</spna></label>
                            </span>
                            <small className="text-danger pull-left">{this.state.date_err}</small>
                          </div>
                          <div className="col-xl-3 col-lg-3 mb-3">
                            <span className="has-float-label">
                              <input className="form-control input-text" id="month_from" name="month_from" type="month" placeholder="Enter Value" />
                              <label htmlFor="date_to" className="text-label">SIP From  <spna className="text-danger">*</spna> </label>
                            </span>
                          <small className="text-danger pull-left">{this.state.date_from_err}</small>
                          </div>
                          <div className="col-xl-3 col-lg-3 mb-3" id="end_date">
                            <span className="has-float-label">
                              <input className="form-control input-text" id="month_to" name="month_to" type="month" placeholder="Enter Value" />
                              <label htmlFor="date_to" className="text-label">SIP End  <spna className="text-danger">*</spna></label>
                            </span>
                            <small className="text-danger pull-left">{this.state.date_to_err}</small>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-xl-4 col-lg-4 mb-4 mt-2">
                            <input className="input-text" id="perpetual" type="checkbox" name="perpetual" value="Y" defaultChecked />
                            <input type="hidden" id="perpetual_val" name="perpetual_val" />
                            <label htmlFor="perpetual" className="text-label ml-2">Perpetual  <spna className="text-danger">*</spna></label>
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
                              <th scope="col">SIP Start Date</th>
                              <th scope="col">SIP End Date</th>
                              <th scope="col">Amount/Unit</th>
                              <th scope="col">Remove</th>
                            </tr>
                          </thead>
                          <tbody>
                            {this.state.Items.map((item, key) =>
                                <tr id={"rowData_" + key}>
                                  <th scope="row">{item.iin}</th>
                                  <td>{item.schemeName}</td>
                                  <td>{item.folio_no ? item.folio_no : "New Folio"}</td>
                                  <td>{format(new Date(item.date_from+'-'+item.date), 'dd/MM/yyyy')}</td>
                                  <td>
                                    {item.date_to ? format(new Date(item.date_to+'-'+item.date), 'dd/MM/yyyy'): null}
                                    {item.date_to == "" ? "31/12/2099" : null}
                                  </td>
                                  <td>{item.amt}</td>
                                  <td><i className="fa fa-trash text-danger" onClick={this.delete_scheme.bind(this, key)} /></td>
                                </tr>
                              ) }
                          </tbody>
                        </table>: null}
                        <div className="row">
                          <div className="col-xl-4 col-lg-4 mb-4">
                            <span className="has-float-label">
                              <select className="form-control input-text mandate" name="mandate" onChange={this.getMandate}>
                                <option value="">Select</option>
                                {this.state.userMandateList ?
                                  this.state.userMandateList.map((item, key) =>
                                    <option value={item.MANDATE_ID}>{"Bank Name:- " + item.BANK_NAME} | {"A/C No:- " + item.ACCOUNT_NO} | {"A/C Type:- " + item.AC_TYPE}</option>
                                  ) : null}
                              </select>
                              <label htmlFor="mandate" className="text-label">Select Mandate  <spna className="text-danger">*</spna></label>
                            </span>
                            <small className="text-danger pull-left">{this.state.mandate_err}</small>
                          </div>
                        </div>
                        <div className="text-right">
                          <a href="javascript:void(0)" className="btn-theme-1 btn-theme-effect" onClick={this.state.userIin?this.oderNow.bind():this.iinNull.bind()}>
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
export default SIP
