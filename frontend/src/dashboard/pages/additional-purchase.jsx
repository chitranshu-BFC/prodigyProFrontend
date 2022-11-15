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

class Additional_Purchase extends React.Component{

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
    const userData = JSON.parse(localStorage.getItem("loginUserData"));
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
      this.setState({ trasnDataDelete: ""})
      let userPro_id; let schemeList =[];
      userPro_id = $('select[name="userPro_id"]').val();
      $('input[name="existiScheme"]').prop('checked', false);
      $("#exitscheme").css({ "display": "none" });
      $("#newschemes").css({ "display": "none" });
      $("#newschemes1").css({ "display": "none" });
      $("#first_order").css({ "display": "none" });

      const userData = JSON.parse(localStorage.getItem("loginUserData"))
      $('select[name="amc_code"]').val("");
      $('select[name="scheme_name"]').val("");
      $('input[name="amt_new"]').val("");
      $('input[name="asset"]').prop('checked', false);
      $('input[name="growth"]').prop('checked', false);
      $('select[name="new_folio"]').val("");
      //Items
      this.setState({Items:[]})
      this.setState({userSchemeList:''})
      this.state.userList.map(value => {
        if(value.id==userPro_id){
        $("#wait").css('display','block');
        $("#overlay").css('display','block');
          this.setState({userIIN:value.customer_id,investor_name:value.investor_name,fh_pan_no:value.fh_pan_no})
          console.log("invest Name",value)
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

          console.log("amcdata",JSON.stringify(amcdata))
          Axios.post("/prodigypro/api/getAmcFolioViaProfile", amcdata)
          .then((response) => {
           if(response.data.data.status==400){
              $("#overlay").css('display','none');
              $("#wait").css('display', 'none');
              $("#nodata").css('display', 'block');
              this.setState({ userSchemeList: [] })
            }else{
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
                            //if((resss.data.data.data[0].UNITS!=0) && (resss.data.data.data[0].UNITS!=null)){
                              schemeList.push({ scheme_name: key.products.PRODUCT_LONG_NAME, folio_no: data.folio, SWP_DATES: key.products.SWP_DATES, FREQUENCIES: key.products.SYSTEMATIC_FREQUENCIES, amc_code: key.products.AMC_CODE, product_code: key.products.PRODUCT_CODE, reinvest: key.products.REINVEST_TAG, iin: value.customer_id , unit: resss.data.data.data[0].UNITS , amu:resss.data.data.data[0].AMOUNT , isin: key.products.ISIN, investor_name:investNM.investor_name })
                              this.setState({ userSchemeList: schemeList })
                              console.log("Scheme list", schemeList)
                            //}   
              }
                           }                        
                        })
    
                      })
                    })
                  } 
                  
                })
               
              })
            }
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
            if(response.data.data.status==400){
              $("#overlay").css('display','none');
              $("#wait").css('display', 'none');
              $("#nodata").css('display', 'block');
              this.setState({ userSchemeList: [] })
            }else{
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
                            //if((resss.data.data.data[0].UNITS!=0) && (resss.data.data.data[0].UNITS!=null)){
                              schemeList.push({ scheme_name: key.products.PRODUCT_LONG_NAME, folio_no: data.folio, SWP_DATES: key.products.SWP_DATES, FREQUENCIES: key.products.SYSTEMATIC_FREQUENCIES, amc_code: key.products.AMC_CODE, product_code: key.products.PRODUCT_CODE, reinvest: key.products.REINVEST_TAG, iin: value.customer_id , unit: resss.data.data.data[0].UNITS , amu:resss.data.data.data[0].AMOUNT , isin: key.products.ISIN, investor_name:investNM.investor_name })
                              this.setState({ userSchemeList: schemeList })
                              console.log("Scheme list", schemeList)
                            //} 
              }
                           }                        
                        })
    
                      })
                    })
                  } 
                  
                })
               
              })
            }
          })

        }         
          const mandate = {
            email:userData.email,
            IIN:value.customer_id,
          }

          Axios.post("/prodigypro/api/mandateList", mandate)
          .then((res) => {
            console.log("mandate ",res.data.data.data)
            this.setState({userMandateList:res.data.data.data})
          })

        }
      })
  }

  schemes = e => {
    var data = [];
    let existiScheme = $("input:radio[name=existiScheme]:checked").val();
    if (existiScheme == "exit") {
      $("#exitscheme").css({ "display": "block" });
      $("#newschemes").css({ "display": "none" });
      $("#newschemes1").css({ "display": "none" });
      $("#first_order").css({ "display": "block" });
      
     $(".idcw").css('display','none');
    $('select[name="amc_code"]').val("");
      $('select[name="scheme_name"]').val("");
      $('input[name="amt_new"]').val("");
      $('input[name="asset"]').prop('checked', false);
      $('input[name="growth"]').prop('checked', false);
      $('select[name="new_folio"]').val("");
      this.setState({ userSwpDate: "" })
    } else {
      // exampleModalCenter
      // this.setState({msg:"First Installment shall be deducted on current date and subsequent installments shall be deducted on selected SIP Date."})
      // window.$('#exampleModalCenter').modal('show');
      $("#exitscheme").css({ "display": "none" });
      $("#newschemes").css({ "display": "block" });
      $("#newschemes1").css({ "display": "block" });
      $('input[name="key"]').prop('checked', false);
      $("#first_order").css({ "display": "none" });
    $('input[name="amt"]').val("");

      this.setState({ userSwpDate: true })

    this.state.amcList.map(value => {
        console.log("dd",value)
        // this.state.userSchemeList.map(val => {
          const uniquetype = [...new Set(this.state.userSchemeList.map(q => q.amc_code))];
          uniquetype.map(val => {
          // console.log("uniquetype",val)
          if(val==value.amc_code){
            console.log("uniquetype",uniquetype)
            data.push(value);
            this.setState({amcDataList:data})
          }
        })
      })
    }
    this.setState({ Items: [] });
    $('select[name="date"]').val("");
    $('input[name="month_from"]').val("");
    $('input[name="month_to"]').val("");
    $('input[name="amt"]').val("");

  }

  onscheme = e => { 
    this.setState({Paymentlink:""})
    let key = $("input:radio[name=key]:checked").val();
    let folio_no =  $('#folio_no_'+key).val();
    let scheme =  $('#scheme_nm_'+key).val();
    $("#paymentMode_div").css('display','block');
    this.state.userSchemeList.map(val => {
      if((val.scheme_name==scheme) && (val.folio_no==folio_no)){
        console.log("xx",val)
        this.setState({userschemeName:{folio_no:folio_no,scheme:scheme,amc_code:val.amc_code,product_code:val.product_code,reinvest:val.reinvest,iin:this.state.userIIN,holder_name:val.investor_name}})
      }
    })
  }

  getschemedata = e =>{
  
    this.setState({userschemeName:""});
    const data = {
      asset:$("input:radio[name=asset]:checked").val(),
      option:$("input:radio[name=growth]:checked").val(),
    }
  

      let product_code = $('select[name="scheme_name"]').val();
      this.state.usertargetScheme.map(val => {
        console.log("scheme list",val)
        if(val.PRODUCT_CODE==product_code){
      if(val.REINVEST_TAG=="Y"){
            $('input[name="idcw_val"]').val("Reinvest");
          }else{
            $('input[name="idcw_val"]').val("Payout");
          }
          this.setState({userschemeName:{amc_code:val.AMC_CODE,product_code:val.PRODUCT_CODE,reinvest:val.REINVEST_TAG,iin:this.state.userIIN,holder_name:this.state.investor_name}})
        }
      }) 
  } 

 schemeList = e => {
    var dataAmc=[];
    this.setState({ usertargetScheme: '' })
    const data = {
      AMC_CODE: $('select[name="amc_code"]').val(),
      ASSET_CLASS: $("input:radio[name=asset]:checked").val(),
      DIV_GW: $("input:radio[name=growth]:checked").val(),
    }
  
   /*$('select[name="scheme"]').val("");
    $('input[name="asset"][value="Equity"]').prop("checked", true);
    $('input[name="asset"][value="DEBT"]').prop("checked", false);
    $('input[name="growth"][value="GROWTH"]').prop("checked", true);
    $('input[name="growth"][value="Dividend"]').prop("checked", false);
    $(".idcw").css('display','none');*/

    $('select[name="scheme_name"]').val("");
    $('select[name="new_folio"]').val("");
    $('input[name=asset][value=Equity]').prop('checked', true);
    $('input[name=growth][value=GROWTH]').prop('checked', true);
    $(".idcw").css('display','none');
  
    this.setState({folioList:''})
    if(data.AMC_CODE!=''){
      this.state.amc.map((val)=>{
        if(val.amc_code==data.AMC_CODE){
          dataAmc.push(val);
          this.setState({folioList:dataAmc})
        }
      });
    }

    // $("#overlay").css("display", "block")
    /*$("#overlay").css("display", "block")
    if((data.ASSET_CLASS!=undefined) && (data.DIV_GW!=undefined) && (data.AMC_CODE!="")){
      Axios.post("/prodigypro/api/targetScheme", data)
      .then((res) => {
        $("#overlay").css("display", "none")
         console.log("targetScheme",res.data.data.data)
        this.setState({ usertargetScheme: res.data.data.data })
      })
    }*/
  }
  
  targetScheme = e => {
  
    const data = {
      AMC_CODE:$('select[name="amc_code"]').val(),
      ASSET_CLASS:$("input:radio[name=asset]:checked").val(),
      DIV_GW:$("input:radio[name=growth]:checked").val(),
    }
  
   
  
    if(data.DIV_GW=="Dividend"){
      $(".idcw").css('display','block');
    }else{
      $(".idcw").css('display','none');
    }
    $("#overlay").css("display", "block")
    if((data.ASSET_CLASS!=undefined) && (data.DIV_GW!=undefined) && (data.AMC_CODE!="")){
      Axios.post("/prodigypro/api/targetScheme", data)
      .then((res) => {
        $("#overlay").css("display", "none")
         console.log("targetScheme",res.data.data.data)
        this.setState({ usertargetScheme: res.data.data.data })
      })
    }
  
  }


  newFolio=(e)=>{
    // new_folio
    // var dataAmc=[];
    const data = {
      ASSET_CLASS: $("input:radio[name=asset]:checked").val(),
      DIV_GW: $("input:radio[name=growth]:checked").val(),
      AMC_CODE: $('select[name="amc_code"]').val(),
    }
     $("#overlay").css("display", "block")
    if((data.ASSET_CLASS!=undefined) && (data.DIV_GW!=undefined) && (data.AMC_CODE!="")){
      Axios.post("/prodigypro/api/targetScheme", data)
      .then((res) => {
         $("#overlay").css("display", "none")
         console.log("targetScheme",res.data.data.data)
        this.setState({ usertargetScheme: res.data.data.data })
      })
    }

    $("#paymentMode_div").css('display','block');
  }

  

  handleFormValidation(data) {

    if (data.amt == '') {
      var isValid = false;
      this.setState({ amt_err: "Mandatory Field" });
    } else {
      // if (data.amt<5000) {
      //   var isValid = false;
      //   this.setState({ amt_err: "Minimum Amount 5000" });
      // } else {
      //   var isValid = true;
      //   this.setState({ amt_err: "" });
      // }
      var isValid = true;
      this.setState({ amt_err: "" });
    }

    return isValid;
  }

  handleFormValidation_new(data){
    var dataErr = [];
    if (data.amc_code == "") {
      var isValid ={amc_code:"1"}
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


    if (data.folio_no == "") {
      var isValid ={folio_no:"1"}
      dataErr.push(isValid);
      this.setState({ folio_no_err: "Mandatory Field" });
    } else {
      this.setState({ folio_no_err: "" });
    }
  
    if (data.scheme == "") {
      var isValid ={scheme:"1"}
      dataErr.push(isValid);
      this.setState({ tscheme_err: "Mandatory Field" });
    } else {
      // var isValid = true;
      this.setState({ tscheme_err: "" });
    }

    if (data.amt == '') {
      var isValid ={amt:"1"}
      dataErr.push(isValid);
      this.setState({ amt_new_err: "Mandatory Field" });
    } else {
      var isValid = true;
      this.setState({ amt_new_err: "" });
    }

    return dataErr.length;
  }

  addClick = (e)=> {
    let existiScheme = $("input:radio[name=existiScheme]:checked").val();
    let userPro_id = $('select[name="userPro_id"]').val();
    let key = $("input:radio[name=key]:checked").val();
    // alert(userPro_id)
    if(userPro_id==""){
      toast.error("Please Select Profile!")
    }else {
      
      if(existiScheme==undefined){
        this.setState({ existiScheme_err: "Mandatory Field" });
      }else{
        this.setState({ existiScheme_err: "" });
        if(existiScheme=="new"){
          const data_info = {
            amc_code:$('select[name="amc_code"]').val(),
            schemeName:$("#amc_code option:selected").text(),
            scheme_name:$("#scheme_name option:selected").text(),
            scheme: $('select[name="scheme_name"]').val(),
            amt: $('input[name="amt_new"]').val(),
            assetClass:$("input:radio[name=asset]:checked").val(),
            growth:$("input:radio[name=growth]:checked").val(),
            folio_no : $('select[name="new_folio"]').val(),
            existiScheme :$("input:radio[name=existiScheme]:checked").val(),
          }
         
          if (this.handleFormValidation_new(data_info)==0) {
            const data = {
              iin : this.state.userIIN,
              fh_pan_no:this.state.fh_pan_no,
              holder_name : this.state.userSchemeList.holder_name,
              amc_code : this.state.userSchemeList.amc_code,
              product_code : this.state.userschemeName.product_code,
              reinvest : this.state.userschemeName.reinvest,
              amc_code:$('select[name="amc_code"]').val(),
              schemeName:$("#amc_code option:selected").text(),
              scheme_name:$("#scheme_name option:selected").text(),
              scheme: $('select[name="scheme_name"]').val(),
              amt: $('input[name="amt_new"]').val(),
              assetClass:$("input:radio[name=asset]:checked").val(),
              growth:$("input:radio[name=growth]:checked").val(),
              folio_no : $('select[name="new_folio"]').val(),
              existiScheme :$("input:radio[name=existiScheme]:checked").val(),
            }
    
    
       $('select[name="amc_code"]').val("");
        $('select[name="scheme_name"]').val("");
        $('input[name="amt_new"]').val("");
        $('input[name="asset"]').prop('checked', false);
        $('input[name="growth"]').prop('checked', false);
        $('select[name="new_folio"]').val("");
         $(".idcw").css('display','none');
            this.setState(prevState => ({
              Items: [...prevState.Items,data]
            }))
          }
        
        }else{
          if(key==undefined){
            toast.error("Please Select Scheme!")
          }
          else{
              const data = {
                  assetClass:$("input:radio[name=asset]:checked").val(),
                  growth:$("input:radio[name=growth]:checked").val(),
                  scheme:$('select[name="scheme_name"]').val(),
                  scheme_name:$("#scheme_name option:selected").text(),
                  schemeName : this.state.userschemeName.scheme,
                  folio_no : this.state.userschemeName.folio_no,
                  amc_code : this.state.userschemeName.amc_code,
                  product_code : this.state.userschemeName.product_code,
                  reinvest : this.state.userschemeName.reinvest,
                  iin : this.state.userschemeName.iin,
                  fh_pan_no:this.state.fh_pan_no,
                  holder_name : this.state.userschemeName.holder_name,
                  amt:$('input[name="amt"]').val(),
              }
          $('input[name="amt"]').val("");
              if (this.handleFormValidation(data)) {
                this.setState(prevState => ({
                  Items: [...prevState.Items,data]
                }))
              }
          }
        }
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

  getbank = (e)=>{
    // console.log("insertTransactionDetails-1")
    this.setState({Paymentlink:""})
    let payMode = $('select[name="paymentMode"]').val();
    if(payMode=="OL"){
      $("#payTypeDiv").css({ "display": "block" });
      $("#bankNameDiv").css({ "display": "block" });
      $("#mandateDiv").css({ "display": "none" });
    }else if(payMode=="TR"){
      $("#payTypeDiv").css({ "display": "none" });
      $("#bankNameDiv").css({ "display": "block" });
      $("#mandateDiv").css({ "display": "none" });
    }else if(payMode=="M"){
      $("#payTypeDiv").css({ "display": "none" });
      $("#bankNameDiv").css({ "display": "none" });
      $("#mandateDiv").css({ "display": "block" });
    }else if(payMode=="UPI"){
      $("#payTypeDiv").css({ "display": "block" });
      $("#bankNameDiv").css({ "display": "block" });
      $("#mandateDiv").css({ "display": "none" });
    }else{
      $("#payTypeDiv").css({ "display": "none" });
      $("#bankNameDiv").css({ "display": "none" });
      $("#mandateDiv").css({ "display": "none" });
    }

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
          mode : "Transact-Additional Purchase",
          payment_mode : payMode,
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


    const bankData = {
      email:userData.email,
      iin:this.state.userIIN,
    }

    console.log("match list",this.state.userschemeName)
    Axios.post("/prodigypro/api/getbankList", bankData)
    .then((res) => {
      console.log("userBankList",res.data)
      this.setState({userBankList:res.data.data.data})
    })
  }

  getMandate = (e) => {
    this.setState({userMandate:""})
    let mandate = $('select[name="mandate"]').val();
    this.state.userMandateList.map(val => {
      if(val.MANDATE_ID==mandate){
      this.setState({userMandate:{umrn:val.UMRN_NO,bank_code:val.BANK_CODE,holder_name:val.INVESTOR_NAME,accountNo:val.ACCOUNT_NO,acoount_type:val.AC_TYPE,branch:val.BRANCH,ifsc_code:""}})
      }
    })
  }

  bankDetail = (e) =>{
    let bankCode = $('select[name="bankName"]').val();
    this.setState({userMandate:""})
    this.state.userBankList.map((val,key) => {
      if(val.bank_code==bankCode){
        // alert(this.state.userSchemeList.investor_name)
        this.setState({userMandate:{umrn:"",bank_code:val.bank_code,holder_name:this.state.userSchemeList.investor_name,accountNo:val.ac_no,ifsc_code:val.ifsc_code,branch:val.branch_name}})
      } 
    })
  }

  handlevalidation_2(data) {
    let dataErr = [];
    if (data.amount == "") {
      var isValid ={amount:"1"}
      dataErr.push(isValid);
      this.setState({ amt_err: "Mandatory Field" });
    } else {
      // if (data.amount<5000) {
      //   var isValid ={amount:"1"}
      //   dataErr.push(isValid);
      //   this.setState({ amt_err: "Minimum Amount 5000" });
      // } else {
      //   // var isValid = true;
      //   this.setState({ amt_err: "" });
      // }
      this.setState({ amt_err: "" });
    }

    if (data.paymentMode == "") {
      var isValid ={paymentMode:"1"}
      dataErr.push(isValid);
      this.setState({ paymentMode_err: "Mandatory Field" });
    } else {
      // var isValid = true;
      this.setState({ paymentMode_err: "" });
    }


    if(data.paymentMode=="OL"){
      if (data.payType == undefined) {
        var isValid ={payType:"1"}
        dataErr.push(isValid);
        this.setState({ payType_err: "Mandatory Field" });
      } else {
        // var isValid = true;
        this.setState({ payType_err: "" });
      }

      if (data.bankName == "") {
        var isValid ={bankName:"1"}
        dataErr.push(isValid);
        this.setState({ bankName_err: "Mandatory Field" });
      } else {
        // var isValid = true;
        this.setState({ bankName_err: "" });
      }

    }else if(data.paymentMode=="TR"){

      if (data.bankName == "") {
        var isValid ={bankName:"1"}
        dataErr.push(isValid);
        this.setState({ bankName_err: "Mandatory Field" });
      } else {
        // var isValid = true;
        this.setState({ bankName_err: "" });
      }
    
    }else if(data.paymentMode=="UPI"){
      
      if (data.payType == undefined) {
        var isValid ={payType:"1"}
        dataErr.push(isValid);
        this.setState({ payType_err: "Mandatory Field" });
      } else {
        // var isValid = true;
        this.setState({ payType_err: "" });
      }

      if (data.bankName == "") {
        var isValid ={bankName:"1"}
        dataErr.push(isValid);
        this.setState({ bankName_err: "Mandatory Field" });
      } else {
        // var isValid = true;
        this.setState({ bankName_err: "" });
      }

    }else if(data.paymentMode=="M"){
      if (data.mandate == "") {
        var isValid ={mandate:"1"}
        dataErr.push(isValid);
        this.setState({ mandate_err: "Mandatory Field" });
      } else {
        // var isValid = true;
        this.setState({ mandate_err: "" });
      }
    }
    return  dataErr.length;
  }

  handlevalidation_3(data){
    let dataErr = [];
    if (data.paymentMode == "") {
      var isValid ={paymentMode:"1"}
      dataErr.push(isValid);
      this.setState({ paymentMode_err: "Mandatory Field" });
    } else {
      // var isValid = true;
      this.setState({ paymentMode_err: "" });
    }


    if(data.paymentMode=="OL"){
      if (data.payType == undefined) {
        var isValid ={payType:"1"}
        dataErr.push(isValid);
        this.setState({ payType_err: "Mandatory Field" });
      } else {
        // var isValid = true;
        this.setState({ payType_err: "" });
      }

      if (data.bankName == "") {
        var isValid ={bankName:"1"}
        dataErr.push(isValid);
        this.setState({ bankName_err: "Mandatory Field" });
      } else {
        // var isValid = true;
        this.setState({ bankName_err: "" });
      }

    }else if(data.paymentMode=="TR"){

      if (data.bankName == "") {
        var isValid ={bankName:"1"}
        dataErr.push(isValid);
        this.setState({ bankName_err: "Mandatory Field" });
      } else {
        // var isValid = true;
        this.setState({ bankName_err: "" });
      }
    
    }else if(data.paymentMode=="UPI"){
      
      if (data.payType == undefined) {
        var isValid ={payType:"1"}
        dataErr.push(isValid);
        this.setState({ payType_err: "Mandatory Field" });
      } else {
        // var isValid = true;
        this.setState({ payType_err: "" });
      }

      if (data.bankName == "") {
        var isValid ={bankName:"1"}
        dataErr.push(isValid);
        this.setState({ bankName_err: "Mandatory Field" });
      } else {
        // var isValid = true;
        this.setState({ bankName_err: "" });
      }

    }else if(data.paymentMode=="M"){
      if (data.mandate == "") {
        var isValid ={paymentMode:"1"}
        dataErr.push(isValid);
        this.setState({ mandate_err: "Mandatory Field" });
      } else {
        // var isValid = true;
        this.setState({ mandate_err: "" });
      }
    }

    return  dataErr.length;
  }

  handleFormValidation_new_2(data){
    var dataErr = [];
    if (data.amc_code == "") {
      var isValid ={amc_code:"1"}
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


    if (data.folio_no == "") {
      var isValid ={folio_no:"1"}
      dataErr.push(isValid);
      this.setState({ folio_no_err: "Mandatory Field" });
    } else {
      this.setState({ folio_no_err: "" });
    }
  
    if (data.scheme == "") {
      var isValid ={scheme:"1"}
      dataErr.push(isValid);
      this.setState({ tscheme_err: "Mandatory Field" });
    } else {
      // var isValid = true;
      this.setState({ tscheme_err: "" });
    }

    if (data.amt == '') {
      var isValid ={amt:"1"}
      dataErr.push(isValid);
      this.setState({ amt_new_err: "Mandatory Field" });
    } else {
      var isValid = true;
      this.setState({ amt_new_err: "" });
    }

    if (data.paymentMode == "") {
      var isValid ={paymentMode:"1"}
      dataErr.push(isValid);
      this.setState({ paymentMode_err: "Mandatory Field" });
    } else {
      // var isValid = true;
      this.setState({ paymentMode_err: "" });
    }


    if(data.paymentMode=="OL"){
      if (data.payType == undefined) {
        var isValid ={payType:"1"}
        dataErr.push(isValid);
        this.setState({ payType_err: "Mandatory Field" });
      } else {
        // var isValid = true;
        this.setState({ payType_err: "" });
      }

      if (data.bankName == "") {
        var isValid ={bankName:"1"}
        dataErr.push(isValid);
        this.setState({ bankName_err: "Mandatory Field" });
      } else {
        // var isValid = true;
        this.setState({ bankName_err: "" });
      }

    }else if(data.paymentMode=="TR"){

      if (data.bankName == "") {
        var isValid ={bankName:"1"}
        dataErr.push(isValid);
        this.setState({ bankName_err: "Mandatory Field" });
      } else {
        // var isValid = true;
        this.setState({ bankName_err: "" });
      }
    
    }else if(data.paymentMode=="UPI"){
      
      if (data.payType == undefined) {
        var isValid ={payType:"1"}
        dataErr.push(isValid);
        this.setState({ payType_err: "Mandatory Field" });
      } else {
        // var isValid = true;
        this.setState({ payType_err: "" });
      }

      if (data.bankName == "") {
        var isValid ={bankName:"1"}
        dataErr.push(isValid);
        this.setState({ bankName_err: "Mandatory Field" });
      } else {
        // var isValid = true;
        this.setState({ bankName_err: "" });
      }

    }else if(data.paymentMode=="M"){
      if (data.mandate == "") {
        var isValid ={paymentMode:"1"}
        dataErr.push(isValid);
        this.setState({ mandate_err: "Mandatory Field" });
      } else {
        // var isValid = true;
        this.setState({ mandate_err: "" });
      }
    }

    return dataErr.length;
  }

  oderNow = (e) =>{
    this.setState({Paymentlink:""})
    const userData = JSON.parse(localStorage.getItem("loginUserData"))
    let data = []; let total_amt = 0;
    let userPro_id = $('select[name="userPro_id"]').val();
    let key = $("input:radio[name=key]:checked").val();
    let existiScheme = $("input:radio[name=existiScheme]:checked").val();

    if(userPro_id==""){
      toast.error("Please Select Profile!")
    }else {
      if(existiScheme==undefined){
        this.setState({ existiScheme_err: "Mandatory Field" });
      }else{
        if(existiScheme=="new"){
          if(this.state.Items!=''){
            const dataInfo = {
              amount: $('input[name="amt_new"]').val(),
              paymentMode: $('select[name="paymentMode"]').val(),
              bankName: $('select[name="bankName"]').val(),
              mandate: $('select[name="mandate"]').val(),
              payType:$("input:radio[name=payType]:checked").val(),
            }
            if(this.handlevalidation_3(dataInfo)==0){
            
              this.state.Items.map((val,key) => {
                total_amt = parseInt(total_amt) + parseInt(val.amt);
                const value = {
                  folio:val.folio_no,
                  amc:val.amc_code,
                  product_code:val.product_code,
                  reinvest:val.reinvest,
                  amount:val.amt,
                  input_ref_no:null,
                  perpetual_flag:"",
                  sip_paymech:null,
                  ach_amt:null,
                  transfer_date:null,
                  from_date:null,
                  to_date:null,
                  target_product:null,
                  periodicity:null,
                  period_day:null,
                  sip_from_date:null,
                  sip_end_date:null,
                  sip_freq:null,
                  sip_amount:null,
                  amt_unit_type:null,
                  amt_unit:null,
                  all_unit:null,
                  sip_period_day:null
                }
                data.push(value)
              })
          
              let  rtgs_code = "";
              let paytype = $('select[name="paymentMode"]').val();
              if(paytype=="TR"){
                rtgs_code = this.state.userMandate.ifsc_code;
              }
            
              const value2 = {
                debit_amount_type:"",
                input_ref_no:"",
                perpetual_flag:"",
                instrm_date:"",
                email:userData.email,
                iin:this.state.Items[0].iin,
                instrm_amount:total_amt,
                bank_code:this.state.userMandate.bank_code,
                holder_name:this.state.Items[0].holder_name,
                accountNo:this.state.userMandate.accountNo,
                branch:this.state.userMandate.branch,
                umrn:this.state.userMandate.umrn,
                fscode:this.state.userMandate.ifsc_code,
                rtgs_code:rtgs_code,
                Return_paymnt_flag:$("input:radio[name=payType]:checked").val(),
                payment_mode:$('select[name="paymentMode"]').val(),
                sub_trxn_type:"N",
                trxn_acceptance:"ALL",
                ach_exist:"Y",
                client_callback_url:"API URL",
                childArr:data
              }

              console.log("value",value2)
              $("#overlay").css('display','block');
              Axios.post("/prodigypro/api/purchase",value2)
              .then((response) => {
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
                $("#overlay").css('display','none');
                if(response.data.data.status==400){
                  toast.error(response.data.data.message)
                }else{
                   if(this.state.Items != ''){
                    //var transId = [];
                    this.state.Items.map((val, key) => {
                      const current = new Date();
                      const transData = {
                        pan :val.fh_pan_no,
                        iin :val.iin,
                        mode : "Transact-Additional Purchase",
                        payment_mode : $('select[name="paymentMode"]').val(),
                        email: userData.email,
                        date:`${current.getFullYear()}-0${current.getMonth()+1}-${current.getDate()}`,
                        amc: val.amc_code,
                        scheme_code: val.product_code,
                        amt_unit: val.amount,
                        amt_unit_type : "Amount",
                        folio: val.folio_no,
                        scheme_name:val.scheme_name
                      }
    
                      console.log("saveTransactionDetails",transData)
                      Axios.post("/prodigypro/api/saveTransactionDetails", transData)
                      .then((res) => {
                        console.log("saveTransactionDetails",res.data.data)
                        /*  transId.push(res.data.data.id)
                        this.setState({ trasnDataDelete: transId}) */
    
                      })
                    })
                  }
                  console.log("Paymentlink",response.data.data.data)
                  let payType = $("input:radio[name=payType]:checked").val();
                  if(payType=="Y"){
                    window.$('#exampleModalCenter').modal('show');
                    this.setState({alertMsg:"Order Placed - Units will be allotted on successful receipt of payment."})
                    this.setState({Paymentlink: response.data.data.data[0].Paymentlink})
                  }else{
                    if(paytype=='M'){
                      this.setState({orderMsg: "Payment link has been sent on your registered mail id and mobile number.The Link shall remain active for the next 48 hours. Kindly authorize."})
                    }else{
                      this.setState({orderMsg: "Payment link has been sent on your registered mail id and mobile number.The Link shall remain active for the next 48 hours."})
                    }
                    // toast.success(response.data.data.message)
                    window.$('.bd-example-modal-lg').modal('show');
                    this.setState({orderData: response.data.data.data});
                  }
                }
              })
            }
          }else{

            const data_info = {
              amc_code:$('select[name="amc_code"]').val(),
              schemeName:$("#amc_code option:selected").text(),
              scheme_name:$("#scheme_name option:selected").text(),
              scheme: $('select[name="scheme_name"]').val(),
              amt: $('input[name="amt_new"]').val(),
              assetClass:$("input:radio[name=asset]:checked").val(),
              growth:$("input:radio[name=growth]:checked").val(),
              folio_no : $('select[name="new_folio"]').val(),
              existiScheme :$("input:radio[name=existiScheme]:checked").val(),
              amount: $('input[name="amt_new"]').val(),
              paymentMode: $('select[name="paymentMode"]').val(),
              bankName: $('select[name="bankName"]').val(),
              mandate: $('select[name="mandate"]').val(),
              payType:$("input:radio[name=payType]:checked").val(),
            }

            if(this.handleFormValidation_new_2(data_info)==0){
              // alert("hello");
            const value = {
              folio: $('select[name="new_folio"]').val(),
              amc:$('select[name="amc_code"]').val(),
              product_code:this.state.userschemeName.product_code,
              reinvest:this.state.userschemeName.reinvest,
              amount:$('input[name="amt_new"]').val(),
              input_ref_no:null,
              perpetual_flag:"",
              sip_paymech:null,
              ach_amt:null,
              transfer_date:null,
              from_date:null,
              to_date:null,
              target_product:null,
              periodicity:null,
              period_day:null,
              sip_from_date:null,
              sip_end_date:null,
              sip_freq:null,
              sip_amount:null,
              amt_unit_type:null,
              amt_unit:null,
              all_unit:null,
              sip_period_day:null
            }

            data.push(value)
            let  rtgs_code = "";
            let paytype = $('select[name="paymentMode"]').val();
            if(paytype=="TR"){
              rtgs_code = this.state.userMandate.ifsc_code;
            }
          
            const value2 = {
              debit_amount_type:"",
              input_ref_no:"",
              perpetual_flag:"",
              instrm_date:"",
              email:userData.email,
              iin:this.state.userIIN,
              instrm_amount:$('input[name="amt_new"]').val(),
              bank_code:this.state.userMandate.bank_code,
              holder_name:this.state.investor_name,
              accountNo:this.state.userMandate.accountNo,
              branch:this.state.userMandate.branch,
              umrn:this.state.userMandate.umrn,
              fscode:this.state.userMandate.ifsc_code,
              rtgs_code:rtgs_code,
              Return_paymnt_flag:$("input:radio[name=payType]:checked").val(),
              payment_mode:$('select[name="paymentMode"]').val(),
              sub_trxn_type:"N",
              trxn_acceptance:"ALL",
              ach_exist:"Y",
              client_callback_url:"API URL",
              childArr:data
            }
             console.log("value",value2)
            $("#overlay").css('display','block');
            Axios.post("/prodigypro/api/purchase",value2)
            .then((response) => {
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
              $("#overlay").css('display','none');
              if(response.data.data.status==400){
                // window.$('#exampleModal').modal('show');
                toast.error(response.data.data.message)
              }else{
                const current = new Date();
                const transData = {
                  pan :this.state.userSchemeList.fh_pan_no,
                  iin : this.state.userSchemeList.iin,
                  mode : "Transact-Additional Purchase",
                  payment_mode : $('select[name="paymentMode"]').val(),
                  email: userData.email,
                  date:`${current.getFullYear()}-0${current.getMonth()+1}-0${current.getDate()}`,
                  amc:  this.state.userschemeName.amc_code,
                  scheme_code: this.state.userschemeName.product_code,
                  amt_unit: $('input[name="amt"]').val(),
                  amt_unit_type : "Amount",
                  folio: this.state.userschemeName.folio_no,
                  scheme_name:""
                }
                  
                Axios.post("/prodigypro/api/saveTransactionDetails", transData)
                .then((res) => {
                })
                let payType = $("input:radio[name=payType]:checked").val();
                if(payType=="Y"){
                  window.$('#exampleModalCenter').modal('show');
                  this.setState({alertMsg:"Order Placed - Units will be allotted on successful receipt of payment."})
                  this.setState({Paymentlink: response.data.data.data[0].Paymentlink})
                }else{
                  if(paytype=='M'){
                    this.setState({orderMsg: "Payment link has been sent on your registered mail id and mobile number.The Link shall remain active for the next 48 hours. Kindly authorize."})
                  }else{
                    this.setState({orderMsg: "Payment link has been sent on your registered mail id and mobile number.The Link shall remain active for the next 48 hours."})
                  }
                  // toast.success(response.data.data.message)
                  window.$('.bd-example-modal-lg').modal('show');
                  this.setState({orderData: response.data.data.data});
                }
              }
            })
          }
          } 
        }else{
          if(key==undefined){
            toast.error("Please Select Scheme!")
          }
          else{
            const dataInfo = {
              amount: $('input[name="amt"]').val(),
              paymentMode: $('select[name="paymentMode"]').val(),
              bankName: $('select[name="bankName"]').val(),
              mandate: $('select[name="mandate"]').val(),
              payType:$("input:radio[name=payType]:checked").val(),
            }
            
            if(this.state.Items!=''){
              if(this.handlevalidation_3(dataInfo)==0){
              
                this.state.Items.map((val,key) => {
                  total_amt = parseInt(total_amt) + parseInt(val.amt);
                  const value = {
                    folio:val.folio_no,
                    amc:val.amc_code,
                    product_code:val.product_code,
                    reinvest:val.reinvest,
                    amount:val.amt,
                    input_ref_no:null,
                    perpetual_flag:"",
                    sip_paymech:null,
                    ach_amt:null,
                    transfer_date:null,
                    from_date:null,
                    to_date:null,
                    target_product:null,
                    periodicity:null,
                    period_day:null,
                    sip_from_date:null,
                    sip_end_date:null,
                    sip_freq:null,
                    sip_amount:null,
                    amt_unit_type:null,
                    amt_unit:null,
                    all_unit:null,
                    sip_period_day:null
                  }
                  data.push(value)
                })
            
                let  rtgs_code = "";
                let paytype = $('select[name="paymentMode"]').val();
                if(paytype=="TR"){
                  rtgs_code = this.state.userMandate.ifsc_code;
                }
              
                const value2 = {
                  debit_amount_type:"",
                  input_ref_no:"",
                  perpetual_flag:"",
                  instrm_date:"",
                  email:userData.email,
                  iin:this.state.Items[0].iin,
                  instrm_amount:total_amt,
                  bank_code:this.state.userMandate.bank_code,
                  holder_name:this.state.Items[0].holder_name,
                  accountNo:this.state.userMandate.accountNo,
                  branch:this.state.userMandate.branch,
                  umrn:this.state.userMandate.umrn,
                  fscode:this.state.userMandate.ifsc_code,
                  rtgs_code:rtgs_code,
                  Return_paymnt_flag:$("input:radio[name=payType]:checked").val(),
                  payment_mode:$('select[name="paymentMode"]').val(),
                  sub_trxn_type:"N",
                  trxn_acceptance:"ALL",
                  ach_exist:"Y",
                  client_callback_url:"API URL",
                  childArr:data
                }

                console.log("value",value2)
                $("#overlay").css('display','block');
                Axios.post("/prodigypro/api/purchase",value2)
                .then((response) => {
                  $("#overlay").css('display','none');
                  if(response.data.data.status==400){
                    toast.error(response.data.data.message)
                  }else{
                    if(this.state.Items != ''){
                      //var transId = [];
                      this.state.Items.map((val, key) => {
                        const current = new Date();
                        const transData = {
                          pan :val.fh_pan_no,
                          iin :val.iin,
                          mode : "Transact-Additional Purchase",
                          payment_mode : $('select[name="paymentMode"]').val(),
                          email: userData.email,
                          date:`${current.getFullYear()}-0${current.getMonth()+1}-${current.getDate()}`,
                          amc: val.amc_code,
                          scheme_code: val.product_code,
                          amt_unit_type : "Amount",
                          amt_unit: val.amount,
                          folio: val.folio_no,
                          scheme_name:val.scheme_name
                        }
      
                        console.log("saveTransactionDetails",transData)
                        Axios.post("/prodigypro/api/saveTransactionDetails", transData)
                        .then((res) => {
                          console.log("saveTransactionDetails",res.data.data)
                          /*  transId.push(res.data.data.id)
                          this.setState({ trasnDataDelete: transId}) */
      
                        })
                      })
                    }
                    console.log("Paymentlink",response.data.data.data)
                    let payType = $("input:radio[name=payType]:checked").val();
                    if(payType=="Y"){
                      window.$('#exampleModalCenter').modal('show');
                      this.setState({alertMsg:"Order Placed - Units will be allotted on successful receipt of payment."})
                      this.setState({Paymentlink: response.data.data.data[0].Paymentlink})
                    }else{
                      if(paytype=='M'){
                        this.setState({orderMsg: "Payment link has been sent on your registered mail id and mobile number.The Link shall remain active for the next 48 hours. Kindly authorize."})
                      }else{
                        this.setState({orderMsg: "Payment link has been sent on your registered mail id and mobile number.The Link shall remain active for the next 48 hours."})
                      }
                      // toast.success(response.data.data.message)
                      window.$('.bd-example-modal-lg').modal('show');
                      this.setState({orderData: response.data.data.data});
                    }
                  }
                })
              }
            }else{
              if(this.handlevalidation_2(dataInfo)==0){
                  // alert("hello");
                const value = {
                  folio: this.state.userschemeName.folio_no,
                  amc:this.state.userschemeName.amc_code,
                  product_code:this.state.userschemeName.product_code,
                  reinvest:this.state.userschemeName.reinvest,
                  amount:$('input[name="amt"]').val(),
                  input_ref_no:null,
                  perpetual_flag:"",
                  sip_paymech:null,
                  ach_amt:null,
                  transfer_date:null,
                  from_date:null,
                  to_date:null,
                  target_product:null,
                  periodicity:null,
                  period_day:null,
                  sip_from_date:null,
                  sip_end_date:null,
                  sip_freq:null,
                  sip_amount:null,
                  amt_unit_type:null,
                  amt_unit:null,
                  all_unit:null,
                  sip_period_day:null
                }

                data.push(value)
                let  rtgs_code = "";
                let paytype = $('select[name="paymentMode"]').val();
                if(paytype=="TR"){
                  rtgs_code = this.state.userMandate.ifsc_code;
                }
              
                const value2 = {
                  debit_amount_type:"",
                  input_ref_no:"",
                  perpetual_flag:"",
                  instrm_date:"",
                  email:userData.email,
                  iin:this.state.userschemeName.iin,
                  instrm_amount:$('input[name="amt"]').val(),
                  bank_code:this.state.userMandate.bank_code,
                  holder_name:this.state.userschemeName.holder_name,
                  accountNo:this.state.userMandate.accountNo,
                  branch:this.state.userMandate.branch,
                  umrn:this.state.userMandate.umrn,
                  fscode:this.state.userMandate.ifsc_code,
                  rtgs_code:rtgs_code,
                  Return_paymnt_flag:$("input:radio[name=payType]:checked").val(),
                  payment_mode:$('select[name="paymentMode"]').val(),
                  sub_trxn_type:"N",
                  trxn_acceptance:"ALL",
                  ach_exist:"Y",
                  client_callback_url:"API URL",
                  childArr:data
                }
                // console.log("value",value2)
                $("#overlay").css('display','block');
                Axios.post("/prodigypro/api/purchase",value2)
                .then((response) => {
                  $("#overlay").css('display','none');
                  if(response.data.data.status==400){
                    // window.$('#exampleModal').modal('show');
                    toast.error(response.data.data.message)
                  }else{
                    const current = new Date();
                    const transData = {
                      pan :this.state.fh_pan_no,
                      iin : this.state.userSchemeList.iin,
                      mode : "Transact-Additional Purchase",
                      payment_mode : $('select[name="paymentMode"]').val(),
                      email: userData.email,
                      date:`${current.getFullYear()}-0${current.getMonth()+1}-0${current.getDate()}`,
                      amc:  this.state.userschemeName.amc_code,
                      scheme_code: this.state.userschemeName.product_code,
                      amt_unit_type : "Amount",
                      amt_unit:  $('input[name="amt"]').val(),
                      folio: this.state.userschemeName.folio_no,
                      scheme_name:"",
                     
                    }
                      
                    Axios.post("/prodigypro/api/saveTransactionDetails", transData)
                    .then((res) => {
                    })
                    let payType = $("input:radio[name=payType]:checked").val();
                    if(payType=="Y"){
                      window.$('#exampleModalCenter').modal('show');
                      this.setState({alertMsg:"Order Placed - Units will be allotted on successful receipt of payment."})
                      this.setState({Paymentlink: response.data.data.data[0].Paymentlink})
                    }else{
                      if(paytype=='M'){
                        this.setState({orderMsg: "Payment link has been sent on your registered mail id and mobile number.The Link shall remain active for the next 48 hours. Kindly authorize."})
                      }else{
                        this.setState({orderMsg: "Payment link has been sent on your registered mail id and mobile number.The Link shall remain active for the next 48 hours."})
                      }
                      // toast.success(response.data.data.message)
                      window.$('.bd-example-modal-lg').modal('show');
                      this.setState({orderData: response.data.data.data});
                    }
                  }
                })
              }
            }

          }
        }
      }
    }
      
  }

    render(){
      // console.log("kk",this.state.Items)
      if(this.state.Paymentlink){
        window.open(this.state.Paymentlink, '_blank');
      }
        return(
        <>
         <StyleComponent/>
        <Helmet>         
            <title>Prodigy Pro - Additional Purchase</title>
        </Helmet>
          <style>
          {`
          .swal2-content {
            padding: 17px;
            margin: 22px;
            color: red;
          }
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
            #payTypeDiv{
              display:none;
            }
            #bankNameDiv{
              display:none;
            }
            #mandateDiv{
              display:none;
            }
            #paymentMode_div{
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
            #newschemes{
              display:none;
            }
            #newschemes1{
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
            #nodata{
               display:none;
            }
          `}
          </style>
        {/* Page Wrapper */}
      <div id="wrapper">
         <div id="overlay" >
            <div class="spinner"></div>
            <br/><b className="text-danger">Please Wait...</b>
          </div>
{/* Message model */}
<div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true" data-keyboard="false" data-backdrop="static">
            <div class="modal-dialog modal-dialog-centered" role="document">
              <div class="modal-content">
                
                <div class="modal-body">
                  <p className="text-dark font-weight-bold">
                    {this.state.alertMsg}
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

             {/* Order model */}
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
                {/*  <th scope="col">Application No</th>*/}
                  <th scope="col">Fund</th>
                  {/*<th scope="col">Scheme</th>*/}
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
                {/*  <td>{val.Application_No}</td>*/}
                  <td>{val.Fund}</td>
                {/*  <td>{val.Scheme}</td>*/}
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
       <Sidebar  mainTab="transact"  innertab="additional-purchase"/>
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
            <li className="breadcrumb-item active" aria-current="page">Additional Purchase</li>
          </ol>
        </nav>
        <div className="row">
          {/* Area Chart */}
          <div className="col-xl-12 col-lg-12">
            <div className="card shadow mb-4">
              {/* Card Header - Dropdown */}
              <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                {/* <h6 className="m-0 font-weight-bold text-danger">Additional Purchase </h6>  */}
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
                      <label htmlFor="profile" className="text-label">Select Profile <spna className="text-danger">*</spna></label>
                    </span>
                    
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
                     <tr id="nodata">
                              <td colSpan="5" className="text-danger">No Data Found</td>
                            </tr>
                 {this.state.userSchemeList?this.state.userSchemeList.map((item, key) =>
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
                            ) :null}
                  </tbody>
                </table>
                </div>
                <div className="row">
                  <div className="col-xl-4 col-lg-4 mb-4">
                    <span className="has-float-label">
                    <input className="form-control input-text" id="amt" type="Text" name="amt" placeholder="Enter Value" />
                      <label htmlFor="amt" className="text-label">Enter Amount <spna className="text-danger">*</spna></label>
                    </span>
                    <small className="text-danger pull-left">{this.state.amt_err}</small>
                  </div>                                      
                </div>
                {/* <div className="row">
                  {this.state.Items==''?
                    <div className="col-xl-12 col-lg-12 mb-4 text-right">
                      <button className="btn btn-sm btn-danger shadow-sm" onClick={this.addClick.bind(this)}>+ Add </button>
                    </div>
                  : <div className="col-xl-12 col-lg-12 mb-4 text-right">
                      <button className="btn btn-sm btn-danger shadow-sm" onClick={this.addClick.bind(this)}>+ Add More</button>
                    </div>}
                </div> */}
              </div>

                <div id="newschemes1">
                      <div className="row" >
                          <div className="col-xl-4 col-lg-4 mb-4">
                              <span className="has-float-label">
                                <select className="form-control input-text" data-live-search="true" id='amc_code' name="amc_code" onChange={this.schemeList}>
                                  <option value="">Select</option>
                                  {this.state.amcDataList ?
                                    this.state.amcDataList.map((item, key) =>
                                      <option value={item.amc_code}>{item.long_name}</option>
                                    ) : null}
                                </select>
                                <label htmlFor="amc" className="text-label">Select AMC <spna className="text-danger">*</spna></label>
                              </span>
                              <small className="text-danger pull-left">{this.state.amc_code_err}</small>
                            </div>
                            <div className="col-xl-4 col-lg-4 mb-4">
                              <p className="text-label mb-1 p-radio">Asset Class <spna className="text-danger">*</spna></p>
                              <input className=" input-text" id="equity" type="radio" name="asset" value="Equity" onChange={this.targetScheme} />
                              <label htmlFor="equity" className="text-label">Equity</label>
                              <input className="input-text ml-3" id="debt" type="radio" name="asset" value="DEBT" onChange={this.targetScheme} />
                              <label htmlFor="debt" className="text-label">Debt</label>
                              <br></br>  <small className="text-danger pull-left">{this.state.asset_err}</small> 
                            </div>
                            <div className="col-xl-4 col-lg-4 mb-4">
                              <p className="text-label mb-1 p-radio">Option <spna className="text-danger">*</spna></p>
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
                                  <option value="">Select Folio</option>
                                  {this.state.folioList ?
                                    this.state.folioList.map((item, key) =>
                                        <option value={item.folio}>{item.folio}</option>
                                    ) : null}
                                </select>
                                <label htmlFor="source" className="text-label">Folio <spna className="text-danger">*</spna></label>
                              </span>
                              <small className="text-danger pull-left">{this.state.folio_no_err}</small> 
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
                                <label htmlFor="target" className="text-label">Select Scheme <spna className="text-danger">*</spna></label>
                              </span>
                              <small className="text-danger pull-left">{this.state.tscheme_err}</small> 
                            </div>
                            <div className="col-xl-4 col-lg-4 mb-4">
                              <span className="has-float-label">
                              <input className="form-control input-text" id="amt_new" type="Text" name="amt_new" placeholder="Enter Value" />
                                <label htmlFor="amt_new" className="text-label">Enter Amount <spna className="text-danger">*</spna></label>
                              </span>
                              <small className="text-danger pull-left">{this.state.amt_new_err}</small>
                            </div> 
               <div className="col-xl-3 col-lg-3 mb-3 idcw">
                              <span className="has-float-label">
                                <input className="form-control input-text" id="idcw_val" type="Text" placeholder="IDCW Option" name="idcw_val" defaultValue="Not Applicable" readOnly/>
                                <label htmlFor="idcw_val" className="text-label">IDCW Option</label>
                              </span>
                              <small className="text-danger pull-left">{this.state.amount_err}</small>
                            </div> 
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
                      <th scope="col">Amount</th>
                      <th scope="col">Remove</th>
                    </tr>
                  </thead>
                  <tbody>
                  { this.state.Items.map((item, key) =>
                    <tr id={"rowData_"+key}>
                      <th scope="row">{item.iin}</th>
                      <td>{item.schemeName}</td>
                      <td>{item.folio_no?item.folio_no:"New Folio"}</td>
                      <td>{item.amt}</td>                             
                      <td><i className="fa fa-trash text-danger" onClick={this.delete_scheme.bind(this, key)}/></td>
                    </tr>
                    )}
                  </tbody>
                </table>:null}
                <div className="row">
                  <div className="col-xl-4 col-lg-4 mb-4"  id="paymentMode_div">
                    <span className="has-float-label">
                    <select className="form-control input-text" name="paymentMode" onChange={this.getbank}>
                        <option value="">Select</option>
                        <option value="OL">Net Banking</option>
                        <option value="UPI">UPI</option>
                        <option value="TR">RTGS/NEFT</option>
                        <option value="M">Debit Mandate</option>
                      </select>
                      <label htmlFor="payment_mode" className="text-label">Select Payment Mode  <spna className="text-danger">*</spna></label>
                    </span>
                    <small className="text-danger pull-left">{this.state.paymentMode_err}</small>
                  </div>
                  <div className="col-xl-4 col-lg-4 mb-4" id="payTypeDiv">   
                    <div className="mt-2">                          
                      <input className=" input-text" id="emailLink" type="radio" name="payType" value="N" />
                      <label htmlFor="emailLink" className="text-label">Link On Email</label>
                      <input className="input-text ml-3" id="immediatePay" type="radio" name="payType" value="Y" />
                      <label htmlFor="immediatePay" className="text-label">Immediate Payment</label> 
                      <br></br>  
                      <small className="text-danger pull-left">{this.state.payType_err}</small>                                        
                    </div> 
                  </div> 
                  <div className="col-xl-4 col-lg-4 mb-4"  id="bankNameDiv">
                    <span className="has-float-label">
                    <select className="form-control input-text" data-live-search="true" name="bankName" onChange={this.bankDetail}>
                      <option value="">Select</option>
                        {this.state.userBankList?
                            this.state.userBankList.map((item, key) =>
                            <option value={item.bank_code}>{item.bank_name}</option>
                            ):null}            
                      </select>
                      <label htmlFor="bank" className="text-label">Select Bank  <spna className="text-danger">*</spna></label>
                    </span>
                    <small className="text-danger pull-left">{this.state.bankName_err}</small> 
                  </div>
                  <div className="col-xl-4 col-lg-4 mb-4"  id="mandateDiv">
                    <span className="has-float-label">
                      <select className="form-control input-text" data-live-search="true" name="mandate" onChange={this.getMandate}>
                      <option value="">Select</option>
                        {this.state.userMandateList?
                          this.state.userMandateList.map((item, key) =>
                            <option value={item.MANDATE_ID}>{"Bank Name:- "+item.BANK_NAME} | {"A/C No:- "+item.ACCOUNT_NO} | {"A/C Amount:- "+item.AMOUNT}</option>
                          ):null}
                      </select>
                      <label htmlFor="mandate" className="text-label">Mandate  <spna className="text-danger">*</spna></label>
                    </span>
                    <small className="text-danger pull-left">{this.state.mandate_err}</small> 
                  </div>
                </div>
                {/* <div className="row">
                  <div className="col-xl-4 col-lg-4 mb-4">
                    <span className="has-float-label">
                    <select className="form-control input-text" data-live-search="true" name="mandate" onChange={this.getMandate}>
                      <option value="">Select</option>
                        {this.state.userMandateList?
                          this.state.userMandateList.map((item, key) =>
                            <option value={item.MANDATE_ID}>{"Bank Name:- "+item.BANK_NAME} | {"A/C No:- "+item.ACCOUNT_NO} | {"A/C Amount:- "+item.AMOUNT}</option>
                          ):null}
                      </select>
                      <label htmlFor="mandate" className="text-label">Mandate</label>
                    </span>
                  </div>
                </div> */}
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
      </div></div>
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
export default Additional_Purchase
