import React, {component,useEffect } from 'react';
import successimg from "../images/success.gif";  
import $ from 'jquery';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Axios from 'axios';
import React_dom from 'react-dom';
import { Link, Redirect } from 'react-router-dom';

class Required_Details_Form extends React.Component{  
  constructor(props) {
    super(props);
    this.state = {
    	users: [{n_name: "", n_dob: "", n_rel: "", n_perc: ""}]
    };
    
    this.onChange = this.onChange.bind(this);
    this.valid = this.valid.bind(this);
    this.update_nominee = this.update_nominee.bind(this);

    Axios.post("/prodigypro/api/getoccupations")
    .then((response) => {
      console.log(response.data.data.data);
      this.setState({getOccupation:response.data.data.data})
    });

    Axios.post("/prodigypro/api/getIncome")
    .then((response) => {
      console.log(response.data.data.data);
      this.setState({get_income:response.data.data.data})
    });

    Axios.post("/prodigypro/api/accountType")
    .then((response) => {
      console.log(response.data.data.data.typeofAccount);
      this.setState({get_AccountType:response.data.data.data.typeofAccount})
    });

    Axios.post("/prodigypro/api/bank_list")
    .then((response) => {
      // console.log("bank_list"+JSON.stringify(response.data.data.data));
      this.setState({get_bank_list:JSON.stringify(response.data.data.data)})
    });

    Axios.post("/prodigypro/api/get_Country")
    .then((response) => {
      console.log("get_country_list"+JSON.stringify(response.data.data.data));
      this.setState({get_country_list:JSON.stringify(response.data.data.data)})
    });

  }

  onChange (e) {
   
    // Personal Details
    const data = {
      email: $("input[name=email]").val(),
      dob: $("input[name=dob]").val(),
      pob: $("input[name=pob]").val(),
      occupation: $('select[name="occupation"]').val(), 
      inc_range: $('select[name="inc_range"]').val(),
      resident: $("input:radio[name=resident]:checked").val(),

      pin: $("input[name=pin]").val(),
      address: $("input[name=address]").val(),
      landmark: $("input[name=landmark]").val(),
      city: $("input[name=city]").val(),
      state: $("input[name=state]").val(),
      country: $("select[name=country]").val(),

      npin: $("input[name=npin]").val(),
      naddress: $("input[name=naddress]").val(),
      nlandmark: $("input[name=nlandmark]").val(),
      ncity: $("input[name=ncity]").val(),
      nstate: $("input[name=nstate]").val(),
      ncountry: $("select[name=ncountry]").val(),

      nri_pin: $("input[name=nri_pin]").val(),
      nri_address: $("input[name=nri_address]").val(),
      nri_landmark: $("input[name=nri_landmark]").val(),
      nri_city: $("input[name=nri_city]").val(),
      nri_state: $("input[name=nri_state]").val(),
      nri_country: $("input[name=nri_country]").val(),
    };

    if (data.email != ''){
      this.setState({ Emailtext: "" });
    }

    if (data.dob != ''){
      this.setState({ Dobtext: "" });
    }

    if (data.pob != ''){
      this.setState({ Pobtext: "" });
    }

    if (data.occupation != ''){
      this.setState({ Occutext: "" });
    }

    if (data.inc_range != ''){
      this.setState({ Incometext: "" });
    }

    if (data.resident != ''){
      this.setState({ residenttext: "" });
    }

    if (data.pin != ''){
      this.setState({ Pintext: "" });
    }
    
    if(data.pin.length>5){

      const data_loc = {
        pincode: data.pin,
      };  

      Axios.post("/prodigypro/api/StateCitybyPincode",data_loc)
      .then((response) => {
       
        if(response.data.status==200){
          $("input[name=city]").val(response.data.data.data.District);
          $("input[name=state]").val(response.data.data.data.State);
          this.setState({ Pintext:""});
          this.setState({ Citytext:""});
          this.setState({ Statetext:""});
        }else{
          this.setState({ Pintext: "Invalid Pin Code" });
        }

      });
    }

    if (data.address != ''){
      this.setState({ Addrext: "" });
    }

    if (data.landmark != ''){
      this.setState({ Landmarkrext: "" });
    }

    if (data.city != ''){
      this.setState({ Citytext: "" });
    }

    if (data.state != ''){
      this.setState({ Statetext: "" });
    }

    if (data.country != ''){
      this.setState({ Countrytext: "" });
    }

    if (data.npin != ''){
      this.setState({ nPintext: "" });
    }

    if(data.npin.length>5){

      const data_loc = {
        pincode: data.npin,
      };  

      $(".npin_load").html('Please Wait...');
      Axios.post("/prodigypro/api/StateCitybyPincode",data_loc)
      .then((response) => {
        $(".npin_load").html('');
        if(response.data.status==200){
          $("input[name=ncity]").val(response.data.data.data.District);
          $("input[name=nstate]").val(response.data.data.data.State);
          this.setState({ nPintext:""});
          this.setState({ nCitytext:""});
          this.setState({ nStatetext:""});
        }else{
          this.setState({ nPintext: "Invalid Pin Code" });
        }

      });
    }

    if (data.naddress != ''){
      this.setState({ nAddrext: "" });
    }

    if (data.nlandmark != ''){
      this.setState({ nLandmarkrext: "" });
    }

    if (data.ncity != ''){
      this.setState({ nCitytext: "" });
    }

    if (data.nstate != ''){
      this.setState({ nStatetext: "" });
    }

    if (data.ncountry != ''){
      this.setState({ nCountrytext: "" });
    }

    if (data.nri_pin != ''){
      this.setState({ nri_Pintext: "" });
    }

    if (data.nri_address != ''){
      this.setState({ nri_Addrext: "" });
    }

    if (data.nri_landmark != ''){
      this.setState({ nri_Landmarkrext: "" });
    }

    if (data.nri_city != ''){
      this.setState({ nri_Citytext: "" });
    }

    if (data.nri_state != ''){
      this.setState({ nri_Statetext: "" });
    }

    if (data.nri_country != ''){
      this.setState({ nri_Countrytext: "" });
    }

    // bank Details
    const bank_data = {
      email: $("input[name=email]").val(),
      acc_num: $("input[name=acc_num]").val(),
      cnf_acc_num: $("input[name=cnf_acc_num]").val(),
      acc_type: $('select[name="acc_type"]').val(),
      ifsc: $('input[name="ifsc"]').val(), 
      bank_name: $('select[name="bank_name"]').val(),
      branch: $("input[name=branch]").val()
    }
    
    
    if (bank_data.acc_num != ''){
      this.setState({ acc_num_err: "" });
    }
    if (bank_data.cnf_acc_num != ''){
      this.setState({ cnf_acc_num_err: "" });
    }
    if (bank_data.acc_type != ''){
      this.setState({ acc_type_err: "" });
    }

    if (bank_data.ifsc != ''){
      this.setState({ ifsc_err: "" });

    }
    
    if(bank_data.ifsc.length>10){
      
      const data_ifsc = {
        ifsc: bank_data.ifsc,
      };
      
      Axios.post("/prodigypro/api/ifsc_verify",data_ifsc)
      .then((response) => {
        console.log(response.data.status);
        if(response.data.status==200){
          $("input[name=branch]").val(response.data.data.data.BRANCH);
          this.setState({ ifsc_err: "" });
        }else{
          this.setState({ ifsc_err: "Invalid IFSC Code" });
        }
      });

    }

    // alert(bank_data.bank_name);
    if (bank_data.bank_name != ''){
      this.setState({ bank_name_err: "" });
      this.setState({ bb_code: bank_data.bank_name });
    }

    if (bank_data.branch != ''){
      this.setState({ branch_err: "" });
    }

  }

  handleFormValidation = (data) => { 
    
    const emailRegex = /^[^@ ]+@[^@ ]+\.[^@ ]+$/;  // Email Validation
    const EmailValid = emailRegex.test(data.email)

    if (data.email == ''){
      var isValid= false;
      this.setState({ Emailtext: "This Field is Requried" });
    }else if(EmailValid==false){
      var isValid= false;
      this.setState({ Emailtext: "Email Id is Invalid" });
    }else{
      var isValid= true;
      this.setState({ Emailtext: "" });
    }

    if (data.dob == ''){
      var isValid= false;
      this.setState({ Dobtext: "This Field is Requried" });
    }else{
      var isValid= true;
      this.setState({ Dobtext: "" });
    }

    if (data.pob == ''){
      var isValid= false;
      this.setState({ Pobtext: "This Field is Requried" });
    }else{
      var isValid= true;
      this.setState({ Pobtext: "" });
    }

    if (data.occupation == ''){
      var isValid= false;
      this.setState({ Occutext: "This Field is Requried" });
    }else{
      var isValid= true;
      this.setState({ Occutext: "" });
    }

    if (data.inc_range == ''){
      var isValid= false;
      this.setState({ Incometext: "This Field is Requried" });
    }else{
      var isValid= true;
      this.setState({ Incometext: "" });
    }

    if (data.resident == undefined){
      var isValid= false;
      this.setState({ residenttext: "This Field is Requried" });
    }else{
      var isValid= true;
      this.setState({ residenttext: "" });
    }
   
    if(data.resident == "0"){
      if(data.npin==''){
        var isValid= false;
        this.setState({ nPintext: "This Field is Requried" });
      }else{
        var isValid= true;
        this.setState({ nPintext: "" });
      }

      if(data.naddress==''){
        var isValid= false;
        this.setState({ nAddrext: "This Field is Requried" });
      }else{
        var isValid= true;
        this.setState({ nAddrext: "" });
      }

      if(data.nlandmark==''){
        var isValid= false;
        this.setState({ nLandmarkrext: "This Field is Requried" });
      }else{
        var isValid= true;
        this.setState({ nLandmarkrext: "" });
      }

      if(data.ncity==''){
        var isValid= false;
        this.setState({ nCitytext: "This Field is Requried" });
      }else{
        var isValid= true;
        this.setState({ nCitytext: "" });
      }

      if(data.nstate==''){
        var isValid= false;
        this.setState({ nStatetext: "This Field is Requried" });
      }else{
        var isValid= true;
        this.setState({ nStatetext: "" });
      }

      if(data.ncountry==''){
        var isValid= false;
        this.setState({ nCountrytext: "This Field is Requried" });
      }else{
        var isValid= true;
        this.setState({ nCountrytext: "" });
      }
      
      if(data.nri_pin==''){
        var isValid= false;
        this.setState({ nri_Pintext: "This Field is Requried" });
      }else{
        var isValid= true;
        this.setState({ nri_Pintext: "" });
      }
  
      if(data.nri_address==''){
        var isValid= false;
        this.setState({ nri_Addrext: "This Field is Requried" });
      }else{
        var isValid= true;
        this.setState({ nri_Addrext: "" });
      }
  
      if(data.nri_landmark==''){
        var isValid= false;
        this.setState({ nri_Landmarkrext: "This Field is Requried" });
      }else{
        var isValid= true;
        this.setState({ nri_Landmarkrext: "" });
      }
  
      if(data.nri_city==''){
        var isValid= false;
        this.setState({ nri_Citytext: "This Field is Requried" });
      }else{
        var isValid= true;
        this.setState({ nri_Citytext: "" });
      }
  
      if(data.nri_state==''){
        var isValid= false;
        this.setState({ nri_Statetext: "This Field is Requried" });
      }else{
        var isValid= true;
        this.setState({ nri_Statetext: "" });
      }
  
      if(data.nri_country==''){
        var isValid= false;
        this.setState({ nri_Countrytext: "This Field is Requried" });
      }else{
        var isValid= true;
        this.setState({ nri_Countrytext: "" });
      }

    }else if(data.resident == "1"){

      if(data.pin==''){
        var isValid= false;
        this.setState({ Pintext: "This Field is Requried" });
      }else{
        var isValid= true;
        this.setState({ Pintext: "" });
      }
  
      if(data.address==''){
        var isValid= false;
        this.setState({ Addrext: "This Field is Requried" });
      }else{
        var isValid= true;
        this.setState({ Addrext: "" });
      }
  
      if(data.landmark==''){
        var isValid= false;
        this.setState({ Landmarkrext: "This Field is Requried" });
      }else{
        var isValid= true;
        this.setState({ Landmarkrext: "" });
      }
  
      if(data.city==''){
        var isValid= false;
        this.setState({ Citytext: "This Field is Requried" });
      }else{
        var isValid= true;
        this.setState({ Citytext: "" });
      }
  
      if(data.state==''){
        var isValid= false;
        this.setState({ Statetext: "This Field is Requried" });
      }else{
        var isValid= true;
        this.setState({ Statetext: "" });
      }
      
      if(data.country==''){
        var isValid= false;
        this.setState({ Countrytext: "This Field is Requried" });
      }else{
        var isValid= true;
        this.setState({ Countrytext: "" });
      }
    };

    return isValid;
  }

  persnalDetail= e => {
    e.preventDefault();
    
    if(localStorage.getItem("jointHolder1")){
      $("#personal_data").css({ "display": "none" });
      $("#joint_holder_1").css({ "display": "block" });
      $("#joint_holder_1").css({ "opacity": 1 });
      $("#jointholder_1").addClass("active");
    }else if(localStorage.getItem("jointHolder2")){
      $("#personal_data").css({ "display": "none" });
      $("#joint_holder_2").css({ "display": "block" });
      $("#joint_holder_2").css({ "opacity": 1 });
      $("#jointholder_2").addClass("active");
    }else{
      $("#personal_data").css({ "display": "none" });
      $("#bank").css({ "display": "block" });
      $("#bank").css({ "opacity": 1 });
      $("#personal").addClass("active");
    }

   

    const data = {
      email: $("input[name=email]").val(),
      dob: $("input[name=dob]").val(),
      pob: $("input[name=pob]").val(),
      occupation: $('select[name="occupation"]').val(), 
      inc_range: $('select[name="inc_range"]').val(),
      resident: $("input:radio[name=resident]:checked").val(),

      pin: $("input[name=pin]").val(),
      address: $("input[name=address]").val(),
      landmark: $("input[name=landmark]").val(),
      city: $("input[name=city]").val(),
      state: $("input[name=state]").val(),
      country: $("select[name=country]").val(),

      npin: $("input[name=npin]").val(),
      naddress: $("input[name=naddress]").val(),
      nlandmark: $("input[name=nlandmark]").val(),
      ncity: $("input[name=ncity]").val(),
      nstate: $("input[name=nstate]").val(),
      ncountry: $("select[name=ncountry]").val(),

      nri_pin: $("input[name=nri_pin]").val(),
      nri_address: $("input[name=nri_address]").val(),
      nri_landmark: $("input[name=nri_landmark]").val(),
      nri_city: $("input[name=nri_city]").val(),
      nri_state: $("input[name=nri_state]").val(),
      nri_country: $("input[name=nri_country]").val(),

    };
        
    if (this.handleFormValidation(data)) {
      $("#nn_1").css({ "display": "none" });
      $("#next_1").css({ "display": "block" });
      Axios.post("/prodigypro/api/user_details",data)
      .then((response) => {
        console.log(response.data.data);
        Axios.post("/prodigypro/api/address_details",data)
        .then((ress) => {
          $("#next_1").css({ "display": "none" });
          $("#nn_1").css({ "display": "block" });
          $("#personal_data").css({ "display": "none" });
          $("#bank").css({ "display": "block" });
          $("#bank").css({ "opacity": 1 });
          $("#personal").addClass("active");
          toast.success("Successfully Updated");
          localStorage.setItem("personal_detail",JSON.stringify(data))
          console.log(ress.data.data);
        });
      });
    }
  }

  holderFormValidation = (data)=>{

    //mobile No validation
    var mobPattern = /^(?:(?:\\+|0{0,2})91(\s*[\\-]\s*)?|[0]?)?[6789]\d{9}$/;
    const PhoneValid = mobPattern.test(data.phone);
    if (data.phone == '') {
      var isValid = false;
      this.setState({ holder_1phontext: "Mandatory Field" });
    } else if (PhoneValid == false) {
      var isValid = false;
      this.setState({ holder_1phontext: "Mobile No is Invalid" });
    } else {
      var isValid = true;
      this.setState({ holder_1phontext: "" });
    }

    // Email Validation
    const emailRegex = /^[^@ ]+@[^@ ]+\.[^@ ]+$/;  
    const EmailValid = emailRegex.test(data.email)
    if (data.email == ''){
      var isValid= false;
      this.setState({ holder_1Emailtext: "This Field is Requried" });
    }else if(EmailValid==false){
      var isValid= false;
      this.setState({ holder_1Emailtext: "Email Id is Invalid" });
    }else{
      var isValid= true;
      this.setState({ holder_1Emailtext: "" });
    }

    if (data.dob == ''){
      var isValid= false;
      this.setState({ holder_1Dobtext: "This Field is Requried" });
    }else{
      var isValid= true;
      this.setState({ holder_1Dobtext: "" });
    }

    if (data.pob == ''){
      var isValid= false;
      this.setState({ holder_1Pobtext: "This Field is Requried" });
    }else{
      var isValid= true;
      this.setState({ holder_1Pobtext: "" });
    }

    if (data.occupation == ''){
      var isValid= false;
      this.setState({ holder_1Occutext: "This Field is Requried" });
    }else{
      var isValid= true;
      this.setState({ holder_1Occutext: "" });
    }

    if (data.inc_range == ''){
      var isValid= false;
      this.setState({ holder_1Incometext: "This Field is Requried" });
    }else{
      var isValid= true;
      this.setState({ holder_1Incometext: "" });
    }

    if (data.resident == undefined){
      var isValid= false;
      this.setState({ holderResidenttext_1: "This Field is Requried" });
    }else{
      var isValid= true;
      this.setState({ holderResidenttext_1: "" });
    }

    if (data.tax_payer == undefined){
      var isValid= false;
      this.setState({ tax_err: "This Field is Requried" });
    }else{
      var isValid= true;
      this.setState({ tax_err: "" });
    }

    if (data.not_politically == undefined){
      var isValid= false;
      this.setState({ not_politically_err: "This Field is Requried" });
    }else{
      var isValid= true;
      this.setState({ not_politically_err: "" });
    }
    
    
    if(data.resident == "0"){
      if(data.npin==''){
        var isValid= false;
        this.setState({ nholderPintext_1: "This Field is Requried" });
      }else{
        var isValid= true;
        this.setState({ nholderPintext_1: "" });
      }

      if(data.naddress==''){
        var isValid= false;
        this.setState({ nholderAddrext_1: "This Field is Requried" });
      }else{
        var isValid= true;
        this.setState({ nholderAddrext_1: "" });
      }

      if(data.nlandmark==''){
        var isValid= false;
        this.setState({ nholderLandmarkrext_1: "This Field is Requried" });
      }else{
        var isValid= true;
        this.setState({ nholderLandmarkrext_1: "" });
      }

      if(data.ncity==''){
        var isValid= false;
        this.setState({ nholderCitytext_1: "This Field is Requried" });
      }else{
        var isValid= true;
        this.setState({ nholderCitytext_1: "" });
      }

      if(data.nstate==''){
        var isValid= false;
        this.setState({ nholderStatetext_1: "This Field is Requried" });
      }else{
        var isValid= true;
        this.setState({ nholderStatetext_1: "" });
      }

      if(data.ncountry==''){
        var isValid= false;
        this.setState({ nholderCountrytext_1: "This Field is Requried" });
      }else{
        var isValid= true;
        this.setState({ nholderCountrytext_1: "" });
      }
      
      if(data.nri_pin==''){
        var isValid= false;
        this.setState({ holder_1nri_Pintext: "This Field is Requried" });
      }else{
        var isValid= true;
        this.setState({ holder_1nri_Pintext: "" });
      }
  
      if(data.nri_address==''){
        var isValid= false;
        this.setState({ holder_1nri_Addrext: "This Field is Requried" });
      }else{
        var isValid= true;
        this.setState({ holder_1nri_Addrext: "" });
      }
  
      if(data.nri_landmark==''){
        var isValid= false;
        this.setState({ nri_Landmarkrext: "This Field is Requried" });
      }else{
        var isValid= true;
        this.setState({ nri_Landmarkrext: "" });
      }
  
      if(data.nri_city==''){
        var isValid= false;
        this.setState({ holder_1nri_Citytext: "This Field is Requried" });
      }else{
        var isValid= true;
        this.setState({ holder_1nri_Citytext: "" });
      }
  
      if(data.nri_state==''){
        var isValid= false;
        this.setState({ holder_1nri_Statetext: "This Field is Requried" });
      }else{
        var isValid= true;
        this.setState({ holder_1nri_Statetext: "" });
      }
  
      if(data.nri_country==''){
        var isValid= false;
        this.setState({ holder_1nri_Countrytext: "This Field is Requried" });
      }else{
        var isValid= true;
        this.setState({ holder_1nri_Countrytext: "" });
      }

    }else if(data.resident == "1"){

      if(data.pin==''){
        var isValid= false;
        this.setState({ holderPintext_1: "This Field is Requried" });
      }else{
        var isValid= true;
        this.setState({ holderPintext_1: "" });
      }
  
      if(data.address==''){
        var isValid= false;
        this.setState({ holderAddrext_1: "This Field is Requried" });
      }else{
        var isValid= true;
        this.setState({ holderAddrext_1: "" });
      }
  
      if(data.landmark==''){
        var isValid= false;
        this.setState({ holderLandmarkrext_1: "This Field is Requried" });
      }else{
        var isValid= true;
        this.setState({ holderLandmarkrext_1: "" });
      }
  
      if(data.city==''){
        var isValid= false;
        this.setState({ holderCitytext_1: "This Field is Requried" });
      }else{
        var isValid= true;
        this.setState({ holderCitytext_1: "" });
      }
  
      if(data.state==''){
        var isValid= false;
        this.setState({ holderStatetext_1: "This Field is Requried" });
      }else{
        var isValid= true;
        this.setState({ holderStatetext_1: "" });
      }
      
      if(data.country==''){
        var isValid= false;
        this.setState({ holderCountrytext_1: "This Field is Requried" });
      }else{
        var isValid= true;
        this.setState({ holderCountrytext_1: "" });
      }
    };

    return isValid;
  }

  valid (e){
    const data = {
      phone: $("input[name=holder_phon_1]").val(),
      email: $("input[name=holderEmail_1]").val(),
      dob: $("input[name=holderDob_1]").val(),
      pob: $("input[name=holderPob_1]").val(),
      occupation: $('select[name="holderOccup_1"]').val(), 
      inc_range: $('select[name="holderInc_range_1"]').val(),
      resident: $("input:radio[name=holderResident_1]:checked").val(),
      
      tax_payer: $("input[name=tax_payer]:checked").val(),
      not_politically: $("input[name=not_politically]:checked").val(),

      pin: $("input[name=holderPin_1]").val(),
      address: $("input[name=holderAddress_1]").val(),
      landmark: $("input[name=holderLandmark_1]").val(),
      city: $("input[name=holderCity_1]").val(),
      state: $("input[name=holderState_1]").val(),
      country: $("select[name=holderCountry_1]").val(),

      npin: $("input[name=nholderPin_1]").val(),
      naddress: $("input[name=nholderAddress_1]").val(),
      nlandmark: $("input[name=nholderLandmark_1]").val(),
      ncity: $("input[name=nholderCity_1]").val(),
      nstate: $("input[name=nholderState_1]").val(),
      ncountry: $("select[name=holderCountry_1]").val(),

      nri_pin: $("input[name=holder_1nri_pin]").val(),
      nri_address: $("input[name=holder_1nri_address]").val(),
      nri_landmark: $("input[name=nri_landmark]").val(),
      nri_city: $("input[name=holder_1nri_city]").val(),
      nri_state: $("input[name=holder_1nri_state]").val(),
      nri_country: $("input[name=holder_1nri_country]").val(),

    };

    if (data.phone != ''){
      this.setState({ holder_1phontext: "" });
    }

    if (data.email != ''){
      this.setState({ holder_1Emailtext: "" });
    }

    if (data.dob != ''){
      this.setState({ holder_1Dobtext: "" });
    }

    if (data.pob != ''){
      this.setState({ holder_1Pobtext: "" });
    }

    if (data.occupation != ''){
      this.setState({ holder_1Occutext: "" });
    }

    if (data.inc_range != ''){
      this.setState({ holder_1Incometext: "" });
    }

    if (data.resident != ''){
      this.setState({ holderResidenttext_1: "" });
    }

    if (data.tax_payer != undefined){
      this.setState({ tax_err: "" });
    }

    if (data.not_politically != undefined){
      this.setState({ not_politically_err: "" });
    }

    if (data.pin != ''){
      this.setState({ holderPintext_1: "" });
    }
    
    if(data.pin.length>5){

      const data_loc = {
        pincode: data.pin,
      };  

      Axios.post("/prodigypro/api/StateCitybyPincode",data_loc)
      .then((response) => {
        if(response.data.status==200){
          $("input[name=holderCity_1]").val(response.data.data.data.District);
          $("input[name=holderState_1]").val(response.data.data.data.State);
          this.setState({holderPintext_1:""});
          this.setState({holderCitytext_1:""});
          this.setState({holderStatetext_1:""});
        }else{
          this.setState({ holderPintext_1: "Invalid Pin Code" });
        }

      });
    }

    if (data.address != ''){
      this.setState({ holderAddrext_1: "" });
    }

    if (data.landmark != ''){
      this.setState({ holderLandmarkrext_1: "" });
    }

    if (data.city != ''){
      this.setState({ holderCitytext_1: "" });
    }

    if (data.state != ''){
      this.setState({ holderStatetext_1: "" });
    }

    if (data.country != ''){
      this.setState({ holderCountrytext_1: "" });
    }

    if (data.npin != ''){
      this.setState({ nholderPintext_1: "" });
    }

    if(data.npin.length>5){

      const data_loc = {
        pincode: data.npin,
      };  

      $(".npin_load").html('Please Wait...');
      Axios.post("/prodigypro/api/StateCitybyPincode",data_loc)
      .then((response) => {
        $(".npin_load").html('');
        if(response.data.status==200){
          $("input[name=nholderCity_1]").val(response.data.data.data.District);
          $("input[name=nholderState_1]").val(response.data.data.data.State);
          this.setState({ nholderPintext_1:""});
          this.setState({ nholderAddrext_1:""});
          this.setState({ nholderLandmarkrext_1:""});
        }else{
          this.setState({ nholderPintext_1: "Invalid Pin Code" });
        }
      });
    }

    if (data.naddress != ''){
      this.setState({ nholderLandmarkrext_1: "" });
    }

    if (data.nlandmark != ''){
      this.setState({ nholderLandmarkrext_1: "" });
    }

    if (data.ncity != ''){
      this.setState({ nholderCitytext_1: "" });
    }

    if (data.nstate != ''){
      this.setState({ nholderStatetext_1: "" });
    }

    if (data.ncountry != ''){
      this.setState({ nholderCountrytext_1: "" });
    }

    if (data.nri_pin != ''){
      this.setState({ holder_1nri_Pintext: "" });
    }

    if (data.nri_address != ''){
      this.setState({ holder_1nri_Addrext: "" });
    }

    if (data.nri_landmark != ''){
      this.setState({ holder_1nri_Landmarkrext: "" });
    }

    if (data.nri_city != ''){
      this.setState({ holder_1nri_Citytext: "" });
    }

    if (data.nri_state != ''){
      this.setState({ holder_1nri_Statetext: "" });
    }

    if (data.nri_country != ''){
      this.setState({ holder_1nri_Countrytext: "" });
    }

  }

  jointHolde_1_Detail = (e) =>{

    // if(localStorage.getItem("jointHolder2")){
    //   $("#joint_holder_1").css({ "display": "none" });
    //   $("#joint_holder_2").css({ "display": "block" });
    //   $("#joint_holder_2").css({ "opacity": 1 });
    //   $("#jointholder_2").addClass("active");
    // }else{
    //   $("#joint_holder_1").css({ "display": "none" });
    //   $("#bank").css({ "display": "block" });
    //   $("#bank").css({ "opacity": 1 });
    //   $("#personal").addClass("active");
    // }

    const data = {

      phone: $("input[name=holder_phon_1]").val(),
      pan: $("input[name=holder_pan_1]").val(),
      holderEmail: $("input[name=holderEmail_1]").val(),
      dob: $("input[name=holderDob_1]").val(),
      pob: $("input[name=holderPob_1]").val(),
      occupation: $('select[name="holderOccup_1"]').val(), 
      inc_range: $('select[name="holderInc_range_1"]').val(),
      resident: $("input:radio[name=holderResident_1]:checked").val(),
      tax_payer: $("input[name=tax_payer]:checked").val(),
      not_politically: $("input[name=not_politically]:checked").val(),

      pin: $("input[name=holderPin_1]").val(),
      address: $("input[name=holderAddress_1]").val(),
      landmark: $("input[name=holderLandmark_1]").val(),
      city: $("input[name=holderCity_1]").val(),
      state: $("input[name=holderState_1]").val(),
      country: $("select[name=holderCountry_1]").val(),

      npin: $("input[name=nholderPin_1]").val(),
      naddress: $("input[name=nholderAddress_1]").val(),
      nlandmark: $("input[name=nholderLandmark_1]").val(),
      ncity: $("input[name=nholderCity_1]").val(),
      nstate: $("input[name=nholderState_1]").val(),
      ncountry: $("select[name=holderCountry_1]").val(),

      nri_pin: $("input[name=holder_1nri_pin]").val(),
      nri_address: $("input[name=holder_1nri_address]").val(),
      nri_landmark: $("input[name=nri_landmark]").val(),
      nri_city: $("input[name=holder_1nri_city]").val(),

    };

    if(this.holderFormValidation(data)){
      Axios.post("/prodigypro/api/joint_holder", data)
      .then((response) => {
        
      })
    }
  }

  jointHolde_2_Detail = (e) =>{
    $("#joint_holder_2").css({ "display": "none" });
    $("#bank").css({ "display": "block" });
    $("#bank").css({ "opacity": 1 });
    $("#personal").addClass("active");
  }

  bankFromValidation = (bank_data)=>{
    var patt = /^([0-9]{10})|([0-9]{2}-[0-9]{3}-[0-9]{6})$/;
    var accValid =  patt.test(bank_data.acc_num); // true
    // alert(accValid)
    if (bank_data.acc_num == ''){
      var isValid= false;
      this.setState({ acc_num_err: "This Field is Requried" });
    }else if(accValid ==false ){
      var isValid= false;
      this.setState({ acc_num_err: "Please enter a valid Account No " });
    }else{
      var isValid= true;
      this.setState({ acc_num_err: "" });
    }

    if (bank_data.cnf_acc_num == ''){
      var isValid= false;
      this.setState({ cnf_acc_num_err: "This Field is Requried" });
    }else if(bank_data.cnf_acc_num != bank_data.acc_num){
      var isValid= false;
      this.setState({ cnf_acc_num_err: "Account No does not Match" });
    }else{
      var isValid= true;
      this.setState({ cnf_acc_num_err: "" });
    }

    if (bank_data.acc_type == ''){
      var isValid= false;
      this.setState({ acc_type_err: "This Field is Requried" });
    }else{
      var isValid= true;
      this.setState({ acc_type_err: "" });
    }

    if (bank_data.ifsc == ''){
      var isValid= false;
      this.setState({ ifsc_err: "This Field is Requried" });
    }else{
      var isValid= true;
      this.setState({ ifsc_err: "" });
    }

    if (bank_data.bank_name == ''){
      var isValid= false;
      this.setState({ bank_name_err: "This Field is Requried" });
    }else{
      var isValid= true;
      this.setState({ bank_name_err: "" });
    }

    if (bank_data.branch == ''){
      var isValid= false;
      this.setState({ branch_err: "This Field is Requried" });
    }else{
      var isValid= true;
      this.setState({ branch_err: "" });
    }

    return isValid;
  }

  bankDetails= e => {
    e.preventDefault();

    $("#bank").css({ "display": "none" });
    $("#nominee").css({ "display": "block" });
    $("#nominee").css({ "opacity": 1 });
    $("#payment").addClass("active");

    const get_nomine = {
      email:$("input[name=email]").val()
    };

    Axios.post("/prodigypro/api/get_nomine",get_nomine)
    .then((response) => {
      console.log(response.data.data.data);
      this.setState({user_nomine:response.data.data.data})
    });

    const bank_data = {
      email: $("input[name=email]").val(),
      acc_num: $("input[name=acc_num]").val(),
      cnf_acc_num: $("input[name=cnf_acc_num]").val(),
      acc_type: $('select[name="acc_type"]').val(),
      ifsc: $('input[name="ifsc"]').val(), 
      bank_name: $('select[name="bank_name"]').val(),
      branch: $("input[name=branch]").val(),
      bank_code: $('input[name="bank_code"]').val(),
      image: $("input[name=image]").val()
    }

    // alert(bank_data.bank_code)
    if(this.bankFromValidation(bank_data)){
      if(bank_data.image==''){
        toast.error("please Upload File");
      }else{
        $("#nn_2").css({ "display": "none" });
        $("#next_2").css({ "display": "block" });
        Axios.post("/prodigypro/api/bank_details",bank_data)
          .then((ress) => {
            $("#nn_2").css({ "display": "block" });
            $("#next_2").css({ "display": "none" });
            $("#bank").css({ "display": "none" });
            $("#nominee").css({ "display": "block" });
            $("#nominee").css({ "opacity": 1 });
            $("#payment").addClass("active");
            toast.success("Successfully Updated");
            console.log(ress.data.data);
        });
      }
    }

  }

  handleChange(i, e) {
    const { name, value } = e.target;
    let users = [...this.state.users];
    users[i] = {...users[i], [name]: value};
    this.setState({ users });
  }

  addClick(){
    if(this.state.users.length<3){
      this.setState(prevState => ({ 
        users: [...prevState.users, {n_name: "", n_dob: "", n_rel: "", n_perc: ""}]
      }))
    }else{
      toast.error("Maximum Allowed 3 Nominee!");
    }
  }
  
  createUI(){
    // console.log(users)
    return this.state.users.map((el, i) => (
      <div key={i}>

              <input value="" id="n_id" name="n_id" type="hidden" />
       				<div className="row">
							<div className="col-md-4 mb-4">
							<span className="has-float-label mb-2">
								  <input className="form-control input-text" id="n_name" name="n_name" value={el.n_name ||''} type="text" placeholder="Enter Nominee Name" required onChange={this.handleChange.bind(this, i)}/>
								  <label for="n_name" className="text-label">Name</label>
							  </span>
                {i == 0 ? <small class="text-danger">{this.state.n_name_err}</small>: null }
							</div>
							<div className="col-md-4 mb-4">
							<span className="has-float-label mb-2">
								  <input className="form-control input-text" id="n_dob" name="n_dob"  value={el.n_dob ||''} type="date" placeholder="Enter Nominee DOB" required onChange={this.handleChange.bind(this, i)}/>
								  <label for="n_dob" className="text-label">Date Of Birth</label>
							  </span>
                {i == 0 ? <small class="text-danger">{this.state.n_dob_err}</small>: null }
							</div>
							<div className="col-md-4 mb-4">
							<span className="has-float-label mb-2">
								  <input className="form-control input-text" name="n_rel" id="n_rel" value={el.n_rel ||''} type="text" placeholder="Enter Relation" onChange={this.handleChange.bind(this, i)}/>
								  <label for="n_rel" className="text-label">Relation</label>
							  </span>
                {i == 0 ? <small class="text-danger">{this.state.n_rel_err}</small>: null }
							</div>
					  </div>
					  <div className="row">
							<div className="col-md-4 mb-4">
							  <span className="has-float-label mb-2">
									<input className="form-control input-text" name="n_perc" id="n_perc" value={el.n_perc ||''} type="text" placeholder="Allocated %" required onChange={this.handleChange.bind(this, i)}/>
									<label for="n_perc" className="text-label">Allocation of Percentage</label>
								</span>
                {i == 0 ? <small class="text-danger">{this.state.n_perc_err}</small>: null }
							</div>
							<div className="col-md-4 mb-4">
							  
							</div>
							<div className="col-md-4 mb-4">
              {i > 0 ? <a href="#" className="btn btn-danger pull-right add_button"  onClick={this.removeClick.bind(this, i)}>- Remove</a>: null }
							</div>  
					</div>
      </div>          
    ))
  }

  removeClick(i){
    let users = [...this.state.users];
    users.splice(i, 1);
    this.setState({ users });
  }

  nomineeFromValidation = (nominee_data)=>{
   
    if(nominee_data.count==0){
      if(nominee_data.name==''){
        var isValid=false;
        this.setState({ n_name_err: "Name is Requried" });
      }else{
        var isValid=true;
        this.setState({ n_name_err: "" });
      }
  
      if(nominee_data.dob==''){
        var isValid=false;
        this.setState({ n_dob_err: "Date of Brith is Requried" });
      }else{
        var isValid=true;
        this.setState({ n_dob_err: "" });
      }
  
      if(nominee_data.rel==''){
        var isValid=false;
        this.setState({ n_rel_err: "Relation is Requried" });
      }else{
        var isValid=true;
        this.setState({ n_rel_err: "" });
      }
      
      var patt = /^[0-9]*$/;
      var accValid =  patt.test(nominee_data.perc);
      if(nominee_data.perc==''){
        var isValid=false;
        this.setState({ n_perc_err: "Allocation of Percentage is Requried" });
      }else if(accValid==false){
        var isValid=false;
        this.setState({ n_perc_err: "Only Digits" });
      }
      else{
        var isValid=true;
        this.setState({ n_perc_err: "" });
      }
    }else{
      var isValid = true;
    }

    return isValid;
  }

  nominee = e =>{
    var number_row = this.state.users.length;
    if(this.state.users.length>0){
      for (var i=0; i < this.state.users.length; i++) {

        const nominee_data={
          count:i,
          name:this.state.users[i].n_name,
          dob:this.state.users[i].n_dob,
          rel:this.state.users[i].n_rel,
          perc:this.state.users[i].n_perc,
          email: $("input[name=email]").val(),
          image: $("input[name=image]").val()
        }
        
        if(this.nomineeFromValidation(nominee_data)){
          var count = 1;
          $("#nn_3").css({ "display": "none" });
          $("#next_3").css({ "display": "block" });
          Axios.post("/prodigypro/api/nominee", nominee_data)
          .then(function (response) {
              console.log(response.data);
              if(count==number_row){
                
                Axios.post("/prodigypro/api/iinCreate", nominee_data)
                .then(function (result_iin) {
                  console.log(result_iin.data);

                  Axios.post("/prodigypro/api/fatca", nominee_data)
                  .then(function (result_fatca) {
                    console.log(result_fatca.data);
                  });

                  Axios.post("/prodigypro/api/uploadImage", nominee_data)
                  .then(function (result_img) {
                    console.log(result_img.data);
                  });

                  $("#nn_3").css({ "display": "block" });
                  $("#next_3").css({ "display": "none" });
                  $("#nominee").css({ "display": "none" });
                  $("#finish").css({ "display": "block" });
                  $("#finish").css({ "opacity": 1 });
                  $("#confirm").addClass("active");
                  toast.success("SuccessFully");
                });
              }
              count++;
          });
        }   
      }
    }else{
      toast.error("Minimum 1 Nominee!");
    }
  }

  delete_nominee(e){
    const del_data = { id:e  }
    // alert(del_data.id);
    Axios.post("/prodigypro/api/delete_nominee", del_data)
    .then(function (response) {
      console.log(response.data);
      $("#"+e).remove();
    });
  }

  edit_nominee(e){
    for (var i=0; i < this.state.user_nomine.length; i++) {
      var id = this.state.user_nomine[i].id;
      if(id==e){
        $("input[name=n_id]").val(e)
        localStorage.setItem("nom_id",e);
        $("input[name=n_name]").val(this.state.user_nomine[i].nomini_name)
        $("input[name=n_dob]").val(this.state.user_nomine[i].dob)
        $("input[name=n_rel]").val(this.state.user_nomine[i].relation)
        $("input[name=n_perc]").val(this.state.user_nomine[i].alocation_percentage)
        $("#nn_3").css({ "display": "none" });
        $(".add_button").css({ "display": "none" });
        $(".update_button").css({ "display": "block" });
        $("#update_btn").css({ "display": "block" }); 
      }
    }
  }

  update_nominee = e =>{
    const nom_data = {
      count:"0",
      id:localStorage.getItem("nom_id"),
      name: $("input[name=n_name]").val(),
      dob:$("input[name=n_dob]").val(),
      rel:$("input[name=n_rel]").val(),
      perc:$("input[name=n_perc]").val(),
      email:$("input[name=email]").val()
    }

    if(this.nomineeFromValidation(nom_data)){
      $(".update_button").html('Loading...');
      Axios.post("/prodigypro/api/update_nominee", nom_data)
      .then(function (response) {
          console.log(response.data);
          $(".update_button").html('Update');
          $(".add_button").css({ "display": "block" });
          $(".update_button").css({ "display": "none" });
          toast.success("SuccessFully Updated");
          localStorage.removeItem("nom_id");
          $("#name_"+nom_data.id).html(nom_data.name);
          $("#dob_"+nom_data.id).html(nom_data.dob);
          $("#rel_"+nom_data.id).html(nom_data.rel);
          $("#prec_"+nom_data.id).html(nom_data.perc);
      });
    }   
  }

  next_nominee = e =>{
    $("#nominee").css({ "display": "none" });
    $("#finish").css({ "display": "block" });
    $("#finish").css({ "opacity": 1 });
    $("#confirm").addClass("active");
  }

  render(){
    
    if (localStorage.getItem("userLoggedId") == null) {
      return <Redirect to='/' />
    }

    let user_data=''; let bank_list=''; let country_list=''; 
  
    // if (localStorage.getItem("personal_detail")) {
    //   user_data = JSON.parse(localStorage.getItem("personal_detail"));
    // }

    if(this.state.get_bank_list){
      bank_list = JSON.parse(this.state.get_bank_list);
    }

    if(this.state.get_country_list){
      country_list = JSON.parse(this.state.get_country_list);
    }
  
    return(
        <>
        <style>
          {`
            .form-control{
                border-radius: 1.25rem;
                height: calc(2.25rem + 6px);
              }
             .form-control:focus {
                color: #495057;
                background-color: #fff;
                border-color: #ced4da !important;
                outline: 0;
                box-shadow: none;
                border-radius: 1.25rem;
                height: calc(2.25rem + 6px);
            }
            #res_none{
              display:none;
            }

            #holderRes1_block{
              display:block;
            }

            #holderRes1_none{
              display:none;
            }

            #res_block{
              display:block;
            }


            #next_1 {
              display:none;
            }
            #next_2 {
              display:none;
            }
            #next_3 {
              display:none;
            }
            #update_btn{
              display:none;
            }
            .update_button{
              display:none;
            }
          `}
          </style>

          <div className="container-fluid bg-theme m-0 p-0 parent-bg">
            <div className="col-12 welcome-div-first"></div>
          </div>
         
          <ToastContainer position="top-right" className="mt-8" />
          <div className="container-fluid">
            <div className="col-md-8 offset-md-2 div-overlay">
            <div className="card ">
            <div className="card-body">
            <form id="msform">
                {/* progressbar */}
                <ul id="progressbar" className="text-center mb-4">
                  <li className="active" id="account"><strong>Personal Details</strong></li>
                  {/* {localStorage.getItem("jointHolder1")?<li id="jointholder_1"><strong>Joint Holder 1</strong></li>:null}
                  {localStorage.getItem("jointHolder2")?<li id="jointholder_2"><strong>Joint Holder 2</strong></li>:null} */}
                  <li id="personal"><strong>Bank Details</strong></li>
                  <li id="payment"><strong>Nomination</strong></li>
                  <li id="confirm"><strong>Success</strong></li>
                </ul>

                {/* 
                  <div className="progress">
                    <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuemin={0} aria-valuemax={100} />
                  </div> 
                */}
                
               {/* Personal Details */}
                <fieldset id="personal_data">
                    <div className="row">
                      <div className="col-md-12 mb-4">
                          <div className="alert alert-danger" role="alert">
                          <span className="para">Personal Details :</span>
                          {/* <span className="para pull-right">Step 1 - 4</span> */}
                    </div>
                    </div>
                    </div>
                   
                        <div className="row">
                        <div className="col-md-4 mb-4">
                            <span className="has-float-label">
                            <input className="form-control input-text" id="mail-id" type="email" name="email" placeholder="Enter Mail Id" value={localStorage.getItem("userEmail")} onKeyUp={this.onChange} required/>
                            <label for="mail-id" className="text-label">Email Id</label>
                            </span>
                            <small className="text-danger pull-left">{this.state.Emailtext}</small>
                        </div>
                      
                        <div className="col-md-4 mb-4">
                            <span className="has-float-label">
                            <input className="form-control input-text" name="dob" id="dob" type="date"  value={user_data.dob} onChange={this.onChange}/>
                            <label for="dob" className="text-label">Date Of Birth</label>
                            </span> 
                            <small className="text-danger pull-left">{this.state.Dobtext}</small>
                        </div>

                        <div className="col-md-4 mb-4">
                            <span className="has-float-label">
                            <input className="form-control input-text" name="pob" id="pob" type="text" value={user_data.pob} placeholder="Place Of Birth" required onKeyUp={this.onChange}/>
                            <label for="pob" className="text-label">Place Of Birth</label>
                            </span>
                            <small className="text-danger pull-left">{this.state.Pobtext}</small>
                        </div>
                        </div>

                        <div className="row">
                        <div className="col-md-4 mb-4">
                          <span className="has-float-label">
                          <select className="form-control input-text" name="occupation" id="occupation" onChange={this.onChange}>
                            <option value="">Select</option> 
                            {this.state.getOccupation?
                              this.state.getOccupation.map((item, key) =>
                              <option value={item.id} selected={item.id == user_data.occupation}>{item.title}</option> 
                              ):null}
                            </select>
                            <label for="occupation" className="text-label">Select Occupation</label>
                          </span>
                          <small className="text-danger pull-left">{this.state.Occutext}</small>
                        </div>
                      
                        <div className="col-md-4 mb-4">
                            <span className="has-float-label">
                            {/* <input className="form-control input-text" id="inc_range" type="text" placeholder="Enter Your DOB"/> */}
                            
                            <select className="form-control input-text" name="inc_range" id="inc_range" onChange={this.onChange}>
                              <option value="">Select</option> 
                              {this.state.get_income?
                              this.state.get_income.map((item, key) =>
                              <option value={item.id} selected={item.id == user_data.inc_range}>{item.range}</option> 
                              ):null}
                            </select>
                            <label for="inc_range" className="text-label">Income Range</label>
                            </span> 
                            <small className="text-danger pull-left">{this.state.Incometext}</small>
                        </div>

                        <div className="col-md-4 mb-4">
                        <p className="text-label mb-1 p-radio">Residential Status </p>
                            <input className="input-text" id="indian" type="radio" name="resident" value="1" onChange={this.onChange} defaultChecked={user_data.resident === '1'} />
                            <label for="indian" className="text-label">Resident Indian</label>
                            <input className="input-text ml-3" value="0" id="nri" type="radio" name="resident" onChange={this.onChange} defaultChecked={user_data.resident === '0'} />
                            <label for="nri" className="text-label">NRI</label>
                            <small className="text-danger pull-left">{this.state.residenttext}</small>
                        </div>
                        </div>

                      <div className="display-check-ind fadeIn" id={user_data.resident=="1"? "res_block":"res_none"}>
                        <div className="row">
                          <div className="col-md-12">
                          <div className="alert alert-info" role="alert">
                            <span className="para">Address As Per KYC</span>
                        </div>
                        </div>
                        <div className="col-md-4 mb-4">
                            <span className="has-float-label">
                            <input className="form-control input-text" id="pin" name="pin" value={user_data.pin?user_data.pin:null} type="text" placeholder="Enter PIN Code" onKeyUp={this.onChange}/>
                            <label for="pin" className="text-label">Enter PIN Code</label>
                            </span>
                            <small className="text-danger pull-left pin_load">{this.state.Pintext}</small>
                        </div>
                      
                        <div className="col-md-4 mb-4">
                            <span className="has-float-label">
                            <input className="form-control input-text" name="address" value={user_data.address?user_data.address:null} id="address" type="text" placeholder="Same Address As Per Documents" onKeyUp={this.onChange}/>
                            <label for="address" className="text-label">Enter Address</label>
                            </span>
                            <small className="text-danger pull-left">{this.state.Addrext}</small>
                        </div>

                        <div className="col-md-4 mb-4">
                            <span className="has-float-label">
                            <input className="form-control input-text" name="landmark" value={user_data.landmark?user_data.landmark:null} id="landmark" type="text" placeholder="Enter Landmark" onKeyUp={this.onChange}/>
                            <label for="landmark" className="text-label">Enter Landmark</label>
                            </span>
                            <small className="text-danger pull-left">{this.state.Landmarkrext}</small>
                        </div>
                        </div>

                        <div className="row">
                        <div className="col-md-4 mb-4">
                            <span className="has-float-label">
                            <input className="form-control input-text" name="city" id="city" value={user_data.city?user_data.city:null} type="text" placeholder="City" onKeyUp={this.onChange}/>
                            <label for="City" className="text-label">City</label>
                            </span>
                            <small className="text-danger pull-left">{this.state.Citytext}</small>
                        </div>
                      
                        <div className="col-md-4 mb-4">
                            <span className="has-float-label">
                            <input className="form-control input-text" name="state"  value={user_data.state?user_data.state:null} id="state" type="text" placeholder="State" onKeyUp={this.onChange}/>
                            <label for="state" className="text-label">State</label>
                            </span>
                            <small className="text-danger pull-left">{this.state.Statetext}</small>
                        </div>

                        <div className="col-md-4 mb-4">
                            <span className="has-float-label">
                            {/* <input className="form-control input-text" name="country"  value={user_data.country?user_data.country:null}  id="country" type="text" placeholder="Country" onKeyUp={this.onChange}/>
                            <label for="country" className="text-label">Country</label> */}

                             <select className="form-control input-text" name="country" id="country" onChange={this.onChange}>
                              <option value="">Select</option> 
                              {country_list?
                              country_list.map((item, key) =>
                              <option value={item.id} selected={item.id == user_data.country}>{item.name}</option> 
                              ):null}
                            </select>

                            </span>
                            <small className="text-danger pull-left">{this.state.Countrytext}</small>
                        </div>
                        </div>
                        
                      </div>

                     <div className="display-check-nri fadeIn" id={user_data.resident=="0"? "res_block":"res_none"}>
                     <div className="row">
                            <div className="col-md-12">
                              <div className="alert alert-info" role="alert">
                                <span className="para">Address As Per KYC</span>
                              </div>
                            </div>
                          <div className="col-md-4 mb-4">
                              <span className="has-float-label">
                              <input className="form-control input-text" id="pin" name="npin" type="text" placeholder="Enter PIN Code" value={user_data.npin?user_data.npin:null} onKeyUp={this.onChange}/>
                              <label for="pin" className="text-label">Enter PIN Code</label>
                              </span>
                              <small className="text-danger pull-left npin_load">{this.state.nPintext}</small>
                          </div>
                        
                          <div className="col-md-4 mb-4">
                              <span className="has-float-label">
                              <input className="form-control input-text" name="naddress" id="address" type="text" placeholder="Same Address As Per Documents" value={user_data.naddress?user_data.naddress:null} onKeyUp={this.onChange}/>
                              <label for="address" className="text-label">Enter Address</label>
                              </span>
                              <small className="text-danger pull-left">{this.state.nAddrext}</small>
                          </div>

                          <div className="col-md-4 mb-4">
                              <span className="has-float-label">
                              <input className="form-control input-text" name="nlandmark" id="landmark" type="text" value={user_data.nlandmark?user_data.nlandmark:null} placeholder="Enter Landmark" onKeyUp={this.onChange}/>
                              <label for="landmark" className="text-label">Enter Landmark</label>
                              </span>
                              <small className="text-danger pull-left">{this.state.nLandmarkrext}</small>
                          </div>
                          </div>

                          <div className="row">
                          <div className="col-md-4 mb-4">
                              <span className="has-float-label">
                              <input className="form-control input-text" name="ncity" id="city" type="text" placeholder="City" value={user_data.ncity?user_data.ncity:null} onKeyUp={this.onChange}/>
                              <label for="City" className="text-label">City</label>
                              </span>
                              <small className="text-danger pull-left">{this.state.nCitytext}</small>
                          </div>
                        
                          <div className="col-md-4 mb-4">
                              <span className="has-float-label">
                              <input className="form-control input-text" name="nstate" id="state" type="text" value={user_data.nstate?user_data.nstate:null} placeholder="State" onKeyUp={this.onChange}/>
                              <label for="state" className="text-label">State</label>
                              </span>
                              <small className="text-danger pull-left">{this.state.nStatetext}</small>
                          </div>

                          <div className="col-md-4 mb-4">
                              <span className="has-float-label">
                              {/* <input className="form-control input-text" name="ncountry" id="country" type="text" value={user_data.ncountry?user_data.ncountry:null} placeholder="Country" onKeyUp={this.onChange}/>
                              <label for="country" className="text-label">Country</label> */}

                              <select className="form-control input-text" name="ncountry" id="country" onChange={this.onChange}>
                              <option value="">Select</option> 
                              {country_list?
                              country_list.map((item, key) =>
                              <option value={item.id} selected={item.id == user_data.ncountry}>{item.name}</option> 
                              ):null}
                              </select>

                              </span>
                              <small className="text-danger pull-left">{this.state.nCountrytext}</small>
                          </div>
                          </div>
                      
                          <div className="row">
                                <div className="col-md-12">
                                <div className="alert alert-info" role="alert">
                                  <span className="para">NRI Address</span>
                              </div>
                              </div>
                              <div className="col-md-4 mb-4">
                                  <span className="has-float-label">
                                  <input className="form-control input-text" id="nri_pin" name="nri_pin" value={user_data.nri_pin?user_data.nri_pin:null} type="text" placeholder="Enter PIN Code" onKeyUp={this.onChange}/>
                                  <label for="nri_pin" className="text-label">Enter PIN Code</label>
                                  </span>
                                  <small className="text-danger pull-left">{this.state.nri_Pintext}</small>
                              </div>
                            
                              <div className="col-md-4 mb-4">
                                  <span className="has-float-label">
                                  <input className="form-control input-text" name="nri_address" id="nri_address" value={user_data.nri_address?user_data.nri_address:null} type="text" placeholder="Same Address As Per Documents" onKeyUp={this.onChange}/>
                                  <label for="nri_address" className="text-label">Enter Address</label>
                                  </span>
                                  <small className="text-danger pull-left">{this.state.nri_Addrext}</small>
                              </div>

                              <div className="col-md-4 mb-4">
                                  <span className="has-float-label">
                                  <input className="form-control input-text" name="nri_landmark" id="nri_landmark" value={user_data.nri_landmark?user_data.nri_landmark:null} type="text" placeholder="Enter Landmark" onKeyUp={this.onChange}/>
                                  <label for="nri_landmark" className="text-label">Enter Landmark</label>
                                  </span>
                                  <small className="text-danger pull-left">{this.state.nri_Landmarkrext}</small>
                              </div>
                              </div>

                          <div className="row">
                              <div className="col-md-4 mb-4">
                                  <span className="has-float-label">
                                  <input className="form-control input-text" name="nri_city" id="nri_city" value={user_data.nri_city?user_data.nri_city:null} type="text" placeholder="City" onKeyUp={this.onChange}/>
                                  <label for="nri_City" className="text-label">City</label>
                                  </span>
                                  <small className="text-danger pull-left">{this.state.nri_Citytext}</small>
                              </div>
                            
                              <div className="col-md-4 mb-4">
                                  <span className="has-float-label">
                                  <input className="form-control input-text" name="nri_state" id="nri_state" value={user_data.nri_state?user_data.nri_state:null} type="text" placeholder="State" onKeyUp={this.onChange}/>
                                  <label for="nri_state" className="text-label">State</label>
                                  </span>
                                  <small className="text-danger pull-left">{this.state.nri_Statetext}</small>
                              </div>

                              <div className="col-md-4 mb-4">
                                  <span className="has-float-label">
                                  <input className="form-control input-text" name="nri_country" id="nri_country" value={user_data.nri_country?user_data.nri_country:null} type="text" placeholder="Country" onKeyUp={this.onChange}/>
                                  <label for="nri_country" className="text-label">Country</label>
                                  
                                  </span>
                                  <small className="text-danger pull-left">{this.state.nri_Countrytext}</small>
                              </div>
                              </div>
                      </div>
                      
                      <a class="btn-theme-1 btn-theme-effect action-button pull-right" id="nn_1" type="button" onClick={this.persnalDetail}>
                          <span class="button-text">Save & Continue</span>
                          <span class="round"><i class="fa fa-chevron-right"></i></span>
                      </a>

                      <a class="btn-theme-1 btn-theme-effect action-button pull-right" id="next_1"  type="button" >
                          <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
                          <span class="button-text"> Loading...</span>
                      </a>
                      
                </fieldset>
               
                {/* Joint holder 1 Details */}
                {localStorage.getItem("jointHolder1")?
                <fieldset id="joint_holder_1">
                  <div className="row">
                    <div className="col-md-12 mb-4">
                      <div className="alert alert-danger" role="alert">
                        <span className="para">Joint Holder 1 Details :</span>
                        {/* <span className="para pull-right">Step 1 - 4</span> */}
                      </div>
                    </div>
                  </div>

                  <div className="row">
                      <div className="col-md-4 mb-4">
                        <span className="has-float-label">
                        <input className="form-control input-text" id="mail-id" type="holder_pan_1" name="holder_pan_1"  value={localStorage.getItem("jointHolder1")} onKeyUp={this.valid} readOnly required/>
                        <label for="mail-id" className="text-label">Pan Number</label>
                        </span>
                      </div>
                      <div className="col-md-4 mb-4">
                        <span className="has-float-label">
                        <input className="form-control input-text" id="mail-id" type="holderName_1" name="holderName_1" value={localStorage.getItem("jointHolderName1")} readOnly required/>
                        <label for="mail-id" className="text-label">Holder Name</label>
                        </span>
                       
                      </div>
                      <div className="col-md-4 mb-4">
                        <span className="has-float-label">
                        <input className="form-control input-text" id="holder_phon_1" type="holder_phon_1" name="holder_phon_1" placeholder="Enter Mobile No" onKeyUp={this.valid}  />
                        <label for="holder_phon_1" className="text-label">Mobile Number</label>
                        </span>
                        <small className="text-danger">{this.state.holder_1phontext}</small>
                      </div>
                  </div>
                      <div className="row">
                        <div className="col-md-4 mb-4">
                            <span className="has-float-label">
                            <input className="form-control input-text" id="holderEmail_1" type="email" name="holderEmail_1" placeholder="Enter Mail Id" onKeyUp={this.valid} required/>
                            <label for="holderEmail_1" className="text-label">Email Id</label>
                            </span>
                            <small className="text-danger pull-left">{this.state.holder_1Emailtext}</small>
                        </div>
                        <div className="col-md-4 mb-4">
                            <span className="has-float-label">
                            <input className="form-control input-text" name="holderDob_1" id="holderDob_1" type="date" onChange={this.valid}/>
                            <label for="holderDob_1" className="text-label">Date Of Birth</label>
                            </span> 
                            <small className="text-danger pull-left">{this.state.holder_1Dobtext}</small>
                        </div>
                        <div className="col-md-4 mb-4">
                            <span className="has-float-label">
                            <input className="form-control input-text" name="holderPob_1" id="holderPob_1" type="text" value={user_data.pob} placeholder="Place Of Birth" required onKeyUp={this.valid}/>
                            <label for="holderPob_1" className="text-label">Place Of Birth</label>
                            </span>
                            <small className="text-danger pull-left">{this.state.holder_1Pobtext}</small>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-4 mb-4">
                          <span className="has-float-label">
                            <select className="form-control input-text" name="holderOccup_1" id="holderOccup_1" onChange={this.onChange}>
                            <option value="">Select</option> 
                            {this.state.getOccupation?
                              this.state.getOccupation.map((item, key) =>
                              <option value={item.id} selected={item.id == user_data.occupation}>{item.title}</option> 
                              ):null}
                            </select>
                            <label for="holderOccup_1" className="text-label">Select Occupation</label>
                          </span>
                          <small className="text-danger pull-left">{this.state.holder_1Occutext}</small>
                        </div>
                        <div className="col-md-4 mb-4">
                          <span className="has-float-label">
                            <select className="form-control input-text" name="holderInc_range_1" id="holderInc_range_1" onChange={this.valid}>
                              <option value="">Select</option> 
                              {this.state.get_income?
                              this.state.get_income.map((item, key) =>
                              <option value={item.id} selected={item.id == user_data.inc_range}>{item.range}</option> 
                              ):null}
                            </select>
                            <label for="holderInc_range_1" className="text-label">Income Range</label>
                            </span> 
                            <small className="text-danger pull-left">{this.state.holder_1Incometext}</small>
                        </div>
                        <div className="col-md-4 mb-4">
                          <p className="text-label mb-1 p-radio">Residential Status </p>
                          <input className="input-text" id="holderIndian_1" type="radio" name="holderResident_1" value="1" onChange={this.valid} />
                          <label for="holderIndian_1" className="text-label">Resident Indian</label>
                          <input className="input-text ml-3" value="0" id="holderNri_1" type="radio" name="holderResident_1" onChange={this.valid} />
                          <label for="holderNri_1" className="text-label">NRI</label>
                          <small className="text-danger pull-left">{this.state.holderResidenttext_1}</small>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-12 md-12">
                          <input id="tax_payer" type="checkbox" name="tax_payer" value="1-ooo" onChange={this.valid} />&nbsp;&nbsp;
                          <label for="tax_payer" className="text-label">I here by declare that i am not a politically exposed person.</label>
                          <small className="text-danger">{this.state.tax_err}</small>
                        </div>
                        <div className="col-md-12 md-12">
                          <input id="not_politically" type="checkbox" name="not_politically" value="1-xsx" onChange={this.valid} />&nbsp;&nbsp;
                          <label for="not_politically" className="text-label">I am not Tax Payer of any other country except india. </label>
                          <small className="text-danger">{this.state.not_politically_err}</small>
                        </div>
                      </div>
                      
                      <div className="display-check-holderInd-1 fadeIn" id={user_data.holderResident_1=="1"? "holderRes1_block":"holderRes1_none"}>
                        <div className="row">
                          <div className="col-md-12">
                            <div className="alert alert-info" role="alert">
                              <span className="para">Address As Per KYC</span>
                            </div>
                          </div>
                          <div className="col-md-4 mb-4">
                            <span className="has-float-label">
                            <input className="form-control input-text" id="holderPin_1" name="holderPin_1"  type="text" placeholder="Enter PIN Code" onKeyUp={this.valid}/>
                            <label for="holderPin_1" className="text-label">Enter PIN Code</label>
                            </span>
                            <small className="text-danger pull-left pin_load">{this.state.holderPintext_1}</small>
                        </div>
                          <div className="col-md-4 mb-4">
                          <span className="has-float-label">
                            <input className="form-control input-text" name="holderAddress_1" id="holderAddress_1" type="text" placeholder="Same Address As Per Documents" onKeyUp={this.valid}/>
                            <label for="holderAddress_1" className="text-label">Enter Address</label>
                          </span>
                          <small className="text-danger pull-left">{this.state.holderAddrext_1}</small>
                        </div>
                          <div className="col-md-4 mb-4">
                          <span className="has-float-label">
                            <input className="form-control input-text" name="holderLandmark_1"id="holderLandmark_1" type="text" placeholder="Enter Landmark" onKeyUp={this.onChange}/>
                            <label for="holderLandmark_1" className="text-label">Enter Landmark</label>
                          </span>
                          <small className="text-danger pull-left">{this.state.holderLandmarkrext_1}</small>
                        </div>
                        </div>
                        <div className="row">
                          <div className="col-md-4 mb-4">
                              <span className="has-float-label">
                              <input className="form-control input-text" name="holderCity_1" id="holderCity_1" type="text" placeholder="City" onKeyUp={this.valid}/>
                              <label for="holderCity_1" className="text-label">City</label>
                              </span>
                              <small className="text-danger pull-left">{this.state.holderCitytext_1}</small>
                          </div>
                          <div className="col-md-4 mb-4">
                              <span className="has-float-label">
                              <input className="form-control input-text" name="holderState_1" id="holderState_1" type="text" placeholder="State" onKeyUp={this.onChange}/>
                              <label for="holderState_1" className="text-label">State</label>
                              </span>
                              <small className="text-danger pull-left">{this.state.holderStatetext_1}</small>
                          </div>
                          <div className="col-md-4 mb-4">
                              <span className="has-float-label">
                              {/* <input className="form-control input-text" name="country"  value={user_data.country?user_data.country:null}  id="country" type="text" placeholder="Country" onKeyUp={this.onChange}/>
                              <label for="country" className="text-label">Country</label> */}

                              <select className="form-control input-text" name="holderCountry_1" id="holderCountry_1" onChange={this.valid}>
                                <option value="">Select</option> 
                                {country_list?
                                country_list.map((item, key) =>
                                <option value={item.id} selected={item.id == user_data.country}>{item.name}</option> 
                                ):null}
                              </select>
                              </span>
                              <small className="text-danger pull-left">{this.state.holderCountrytext_1}</small>
                          </div>
                        </div>
                      </div>

                     <div className="display-check-holderNri-1 fadeIn" id={user_data.holderResident_1=="0"? "holderRes1_block":"holderRes1_none"}>
                     <div className="row">
                        <div className="col-md-12">
                            <div className="alert alert-info" role="alert">
                              <span className="para">Address As Per KYC</span>
                            </div>
                          </div>
                        <div className="col-md-4 mb-4">
                            <span className="has-float-label">
                            <input className="form-control input-text" id="nholderPin_1" name="nholderPin_1"  type="text" placeholder="Enter PIN Code" onKeyUp={this.valid}/>
                            <label for="nholderPin_1" className="text-label">Enter PIN Code</label>
                            </span>
                            <small className="text-danger pull-left pin_load">{this.state.nholderPintext_1}</small>
                        </div>
                        <div className="col-md-4 mb-4">
                          <span className="has-float-label">
                            <input className="form-control input-text" name="nholderAddress_1" id="nholderAddress_1" type="text" placeholder="Same Address As Per Documents" onKeyUp={this.valid}/>
                            <label for="nholderAddress_1" className="text-label">Enter Address</label>
                          </span>
                          <small className="text-danger pull-left">{this.state.nholderAddrext_1}</small>
                        </div>
                        <div className="col-md-4 mb-4">
                          <span className="has-float-label">
                            <input className="form-control input-text" name="nholderLandmark_1"id="nholderLandmark_1" type="text" placeholder="Enter Landmark" onKeyUp={this.onChange}/>
                            <label for="nholderLandmark_1" className="text-label">Enter Landmark</label>
                          </span>
                          <small className="text-danger pull-left">{this.state.nholderLandmarkrext_1}</small>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-4 mb-4">
                              <span className="has-float-label">
                              <input className="form-control input-text" name="nholderCity_1" id="nholderCity_1" type="text" placeholder="City" onKeyUp={this.valid}/>
                              <label for="nholderCity_1" className="text-label">City</label>
                              </span>
                              <small className="text-danger pull-left">{this.state.nholderCitytext_1}</small>
                          </div>
                        <div className="col-md-4 mb-4">
                              <span className="has-float-label">
                              <input className="form-control input-text" name="nholderState_1" id="nholderState_1" type="text" placeholder="State" onKeyUp={this.onChange}/>
                              <label for="nholderState_1" className="text-label">State</label>
                              </span>
                              <small className="text-danger pull-left">{this.state.nholderStatetext_1}</small>
                          </div>
                        <div className="col-md-4 mb-4">
                              <span className="has-float-label">
                              {/* <input className="form-control input-text" name="country"  value={user_data.country?user_data.country:null}  id="country" type="text" placeholder="Country" onKeyUp={this.onChange}/>
                              <label for="country" className="text-label">Country</label> */}

                              <select className="form-control input-text" name="holderCountry_1" id="holderCountry_1" onChange={this.valid}>
                                <option value="">Select</option> 
                                {country_list?
                                country_list.map((item, key) =>
                                <option value={item.id} selected={item.id == user_data.country}>{item.name}</option> 
                                ):null}
                              </select>
                              </span>
                              <small className="text-danger pull-left">{this.state.holderCountrytext_1}</small>
                          </div>
                      </div>
                      
                      <div className="row">
                        <div className="col-md-12">
                                <div className="alert alert-info" role="alert">
                                  <span className="para">NRI Address</span>
                                </div>
                              </div>
                        <div className="col-md-4 mb-4">
                                  <span className="has-float-label">
                                  <input className="form-control input-text" id="holder_1nri_pin" name="holder_1nri_pin" type="text" placeholder="Enter PIN Code" onKeyUp={this.valid}/>
                                  <label for="holder_1nri_pin" className="text-label">Enter PIN Code</label>
                                  </span>
                                  <small className="text-danger pull-left">{this.state.holder_1nri_Pintext}</small>
                              </div>
                        <div className="col-md-4 mb-4">
                                  <span className="has-float-label">
                                  <input className="form-control input-text" name="holder_1nri_address" id="holder_1nri_address" type="text" placeholder="Same Address As Per Documents" onKeyUp={this.valid}/>
                                  <label for="holder_1nri_address" className="text-label">Enter Address</label>
                                  </span>
                                  <small className="text-danger pull-left">{this.state.holder_1nri_Addrext}</small>
                              </div>
                        <div className="col-md-4 mb-4">
                                  <span className="has-float-label">
                                  <input className="form-control input-text" name="holder_1nri_landmark" id="holder_1nri_landmark" type="text" placeholder="Enter Landmark" onKeyUp={this.onChange}/>
                                  <label for="nri_landmark" className="text-label">Enter Landmark</label>
                                  </span>
                                  <small className="text-danger pull-left">{this.state.holder_1nri_Landmarkrext}</small>
                              </div>
                      </div>

                      <div className="row">
                        <div className="col-md-4 mb-4">
                                  <span className="has-float-label">
                                  <input className="form-control input-text" name="holder_1nri_city" id="holder_1nri_city"  type="text" placeholder="City" onKeyUp={this.valid}/>
                                  <label for="holder_1nri_City" className="text-label">City</label>
                                  </span>
                                  <small className="text-danger pull-left">{this.state.holder_1nri_Citytext}</small>
                              </div>
                        <div className="col-md-4 mb-4">
                                  <span className="has-float-label">
                                  <input className="form-control input-text" name="holder_1nri_state" id="holder_1nri_state" type="text" placeholder="State" onKeyUp={this.onChange}/>
                                  <label for="holder_1nri_state" className="text-label">State</label>
                                  </span>
                                  <small className="text-danger pull-left">{this.state.holder_1nri_Statetext}</small>
                              </div>
                        <div className="col-md-4 mb-4">
                                  <span className="has-float-label">
                                  <input className="form-control input-text" name="holder_1nri_country" id="holder_1nri_country" type="text" placeholder="Country" onKeyUp={this.onChange}/>
                                  <label for="holder_1nri_country" className="text-label">Country</label>
                                  
                                  </span>
                                  <small className="text-danger pull-left">{this.state.holder_1nri_Countrytext}</small>
                              </div>
                      </div>
                    </div>
                      
                    <a class="btn-theme-1 btn-theme-effect action-button pull-right" id="nn_1" type="button" onClick={this.jointHolde_1_Detail}>
                      <span class="button-text">Save & Continue</span>
                      <span class="round"><i class="fa fa-chevron-right"></i></span>
                    </a>

                    <a class="btn-theme-3 btn-theme-effect previous action-button-previous" type="submit" disabled>
                      <span class="button-text">Previous</span>
                      <span class="round"><i class="fa fa-chevron-left"></i></span>
                    </a>
                    
                </fieldset>
                :null} 

                {/* Joint holder 2 Details */}
                {localStorage.getItem("jointHolder2")?
                <fieldset id="joint_holder_2">
                  <div className="row">
                    <div className="col-md-12 mb-4">
                      <div className="alert alert-danger" role="alert">
                        <span className="para">Joint Holder 2 Details :</span>
                        {/* <span className="para pull-right">Step 1 - 4</span> */}
                      </div>
                    </div>
                  </div>

                  <div className="row">
                      <div className="col-md-4 mb-4">
                        <span className="has-float-label">
                        <input className="form-control input-text" id="mail-id" type="holder_pan_1" name="holder_pan_1"  value={localStorage.getItem("jointHolder1")} onKeyUp={this.valid} readOnly required/>
                        <label for="mail-id" className="text-label">Pan Number</label>
                        </span>
                      </div>
                      <div className="col-md-4 mb-4">
                        <span className="has-float-label">
                        <input className="form-control input-text" id="mail-id" type="holderName_1" name="holderName_1" value={localStorage.getItem("jointHolderName1")} readOnly required/>
                        <label for="mail-id" className="text-label">Holder Name</label>
                        </span>
                       
                      </div>
                      <div className="col-md-4 mb-4">
                        <span className="has-float-label">
                        <input className="form-control input-text" id="holder_phon_1" type="holder_phon_1" name="holder_phon_1" placeholder="Enter Mobile No" onKeyUp={this.valid}  />
                        <label for="holder_phon_1" className="text-label">Mobile Number</label>
                        </span>
                        <small className="text-danger">{this.state.holder_1phontext}</small>
                      </div>
                  </div>
                      <div className="row">
                        <div className="col-md-4 mb-4">
                            <span className="has-float-label">
                            <input className="form-control input-text" id="holderEmail_1" type="email" name="holderEmail_1" placeholder="Enter Mail Id" onKeyUp={this.valid} required/>
                            <label for="holderEmail_1" className="text-label">Email Id</label>
                            </span>
                            <small className="text-danger pull-left">{this.state.holder_1Emailtext}</small>
                        </div>
                        <div className="col-md-4 mb-4">
                            <span className="has-float-label">
                            <input className="form-control input-text" name="holderDob_1" id="holderDob_1" type="date" onChange={this.valid}/>
                            <label for="holderDob_1" className="text-label">Date Of Birth</label>
                            </span> 
                            <small className="text-danger pull-left">{this.state.holder_1Dobtext}</small>
                        </div>
                        <div className="col-md-4 mb-4">
                            <span className="has-float-label">
                            <input className="form-control input-text" name="holderPob_1" id="holderPob_1" type="text" value={user_data.pob} placeholder="Place Of Birth" required onKeyUp={this.valid}/>
                            <label for="holderPob_1" className="text-label">Place Of Birth</label>
                            </span>
                            <small className="text-danger pull-left">{this.state.holder_1Pobtext}</small>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-4 mb-4">
                          <span className="has-float-label">
                            <select className="form-control input-text" name="holderOccup_1" id="holderOccup_1" onChange={this.onChange}>
                            <option value="">Select</option> 
                            {this.state.getOccupation?
                              this.state.getOccupation.map((item, key) =>
                              <option value={item.id} selected={item.id == user_data.occupation}>{item.title}</option> 
                              ):null}
                            </select>
                            <label for="holderOccup_1" className="text-label">Select Occupation</label>
                          </span>
                          <small className="text-danger pull-left">{this.state.holder_1Occutext}</small>
                        </div>
                        <div className="col-md-4 mb-4">
                          <span className="has-float-label">
                            <select className="form-control input-text" name="holderInc_range_1" id="holderInc_range_1" onChange={this.valid}>
                              <option value="">Select</option> 
                              {this.state.get_income?
                              this.state.get_income.map((item, key) =>
                              <option value={item.id} selected={item.id == user_data.inc_range}>{item.range}</option> 
                              ):null}
                            </select>
                            <label for="holderInc_range_1" className="text-label">Income Range</label>
                            </span> 
                            <small className="text-danger pull-left">{this.state.holder_1Incometext}</small>
                        </div>
                        <div className="col-md-4 mb-4">
                          <p className="text-label mb-1 p-radio">Residential Status </p>
                          <input className="input-text" id="holderIndian_1" type="radio" name="holderResident_1" value="1" onChange={this.valid} />
                          <label for="holderIndian_1" className="text-label">Resident Indian</label>
                          <input className="input-text ml-3" value="0" id="holderNri_1" type="radio" name="holderResident_1" onChange={this.valid} />
                          <label for="holderNri_1" className="text-label">NRI</label>
                          <small className="text-danger pull-left">{this.state.holderResidenttext_1}</small>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-12 md-12">
                          <input id="tax_payer" type="checkbox" name="tax_payer" value="1-ooo" onChange={this.valid} />&nbsp;&nbsp;
                          <label for="tax_payer" className="text-label">I here by declare that i am not a politically exposed person.</label>
                          <small className="text-danger">{this.state.tax_err}</small>
                        </div>
                        <div className="col-md-12 md-12">
                          <input id="not_politically" type="checkbox" name="not_politically" value="1-xsx" onChange={this.valid} />&nbsp;&nbsp;
                          <label for="not_politically" className="text-label">I am not Tax Payer of any other country except india. </label>
                          <small className="text-danger">{this.state.not_politically_err}</small>
                        </div>
                      </div>
                      
                      <div className="display-check-holderInd-1 fadeIn" id={user_data.holderResident_1=="1"? "holderRes1_block":"holderRes1_none"}>
                        <div className="row">
                          <div className="col-md-12">
                            <div className="alert alert-info" role="alert">
                              <span className="para">Address As Per KYC</span>
                            </div>
                          </div>
                          <div className="col-md-4 mb-4">
                            <span className="has-float-label">
                            <input className="form-control input-text" id="holderPin_1" name="holderPin_1"  type="text" placeholder="Enter PIN Code" onKeyUp={this.valid}/>
                            <label for="holderPin_1" className="text-label">Enter PIN Code</label>
                            </span>
                            <small className="text-danger pull-left pin_load">{this.state.holderPintext_1}</small>
                        </div>
                          <div className="col-md-4 mb-4">
                          <span className="has-float-label">
                            <input className="form-control input-text" name="holderAddress_1" id="holderAddress_1" type="text" placeholder="Same Address As Per Documents" onKeyUp={this.valid}/>
                            <label for="holderAddress_1" className="text-label">Enter Address</label>
                          </span>
                          <small className="text-danger pull-left">{this.state.holderAddrext_1}</small>
                        </div>
                          <div className="col-md-4 mb-4">
                          <span className="has-float-label">
                            <input className="form-control input-text" name="holderLandmark_1"id="holderLandmark_1" type="text" placeholder="Enter Landmark" onKeyUp={this.onChange}/>
                            <label for="holderLandmark_1" className="text-label">Enter Landmark</label>
                          </span>
                          <small className="text-danger pull-left">{this.state.holderLandmarkrext_1}</small>
                        </div>
                        </div>
                        <div className="row">
                          <div className="col-md-4 mb-4">
                              <span className="has-float-label">
                              <input className="form-control input-text" name="holderCity_1" id="holderCity_1" type="text" placeholder="City" onKeyUp={this.valid}/>
                              <label for="holderCity_1" className="text-label">City</label>
                              </span>
                              <small className="text-danger pull-left">{this.state.holderCitytext_1}</small>
                          </div>
                          <div className="col-md-4 mb-4">
                              <span className="has-float-label">
                              <input className="form-control input-text" name="holderState_1" id="holderState_1" type="text" placeholder="State" onKeyUp={this.onChange}/>
                              <label for="holderState_1" className="text-label">State</label>
                              </span>
                              <small className="text-danger pull-left">{this.state.holderStatetext_1}</small>
                          </div>
                          <div className="col-md-4 mb-4">
                              <span className="has-float-label">
                              {/* <input className="form-control input-text" name="country"  value={user_data.country?user_data.country:null}  id="country" type="text" placeholder="Country" onKeyUp={this.onChange}/>
                              <label for="country" className="text-label">Country</label> */}

                              <select className="form-control input-text" name="holderCountry_1" id="holderCountry_1" onChange={this.valid}>
                                <option value="">Select</option> 
                                {country_list?
                                country_list.map((item, key) =>
                                <option value={item.id} selected={item.id == user_data.country}>{item.name}</option> 
                                ):null}
                              </select>
                              </span>
                              <small className="text-danger pull-left">{this.state.holderCountrytext_1}</small>
                          </div>
                        </div>
                      </div>

                     <div className="display-check-holderNri-1 fadeIn" id={user_data.holderResident_1=="0"? "holderRes1_block":"holderRes1_none"}>
                     <div className="row">
                        <div className="col-md-12">
                            <div className="alert alert-info" role="alert">
                              <span className="para">Address As Per KYC</span>
                            </div>
                          </div>
                        <div className="col-md-4 mb-4">
                            <span className="has-float-label">
                            <input className="form-control input-text" id="nholderPin_1" name="nholderPin_1"  type="text" placeholder="Enter PIN Code" onKeyUp={this.valid}/>
                            <label for="nholderPin_1" className="text-label">Enter PIN Code</label>
                            </span>
                            <small className="text-danger pull-left pin_load">{this.state.nholderPintext_1}</small>
                        </div>
                        <div className="col-md-4 mb-4">
                          <span className="has-float-label">
                            <input className="form-control input-text" name="nholderAddress_1" id="nholderAddress_1" type="text" placeholder="Same Address As Per Documents" onKeyUp={this.valid}/>
                            <label for="nholderAddress_1" className="text-label">Enter Address</label>
                          </span>
                          <small className="text-danger pull-left">{this.state.nholderAddrext_1}</small>
                        </div>
                        <div className="col-md-4 mb-4">
                          <span className="has-float-label">
                            <input className="form-control input-text" name="nholderLandmark_1"id="nholderLandmark_1" type="text" placeholder="Enter Landmark" onKeyUp={this.onChange}/>
                            <label for="nholderLandmark_1" className="text-label">Enter Landmark</label>
                          </span>
                          <small className="text-danger pull-left">{this.state.nholderLandmarkrext_1}</small>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-4 mb-4">
                              <span className="has-float-label">
                              <input className="form-control input-text" name="nholderCity_1" id="nholderCity_1" type="text" placeholder="City" onKeyUp={this.valid}/>
                              <label for="nholderCity_1" className="text-label">City</label>
                              </span>
                              <small className="text-danger pull-left">{this.state.nholderCitytext_1}</small>
                          </div>
                        <div className="col-md-4 mb-4">
                              <span className="has-float-label">
                              <input className="form-control input-text" name="nholderState_1" id="nholderState_1" type="text" placeholder="State" onKeyUp={this.onChange}/>
                              <label for="nholderState_1" className="text-label">State</label>
                              </span>
                              <small className="text-danger pull-left">{this.state.nholderStatetext_1}</small>
                          </div>
                        <div className="col-md-4 mb-4">
                              <span className="has-float-label">
                              {/* <input className="form-control input-text" name="country"  value={user_data.country?user_data.country:null}  id="country" type="text" placeholder="Country" onKeyUp={this.onChange}/>
                              <label for="country" className="text-label">Country</label> */}

                              <select className="form-control input-text" name="holderCountry_1" id="holderCountry_1" onChange={this.valid}>
                                <option value="">Select</option> 
                                {country_list?
                                country_list.map((item, key) =>
                                <option value={item.id} selected={item.id == user_data.country}>{item.name}</option> 
                                ):null}
                              </select>
                              </span>
                              <small className="text-danger pull-left">{this.state.holderCountrytext_1}</small>
                          </div>
                      </div>
                      
                      <div className="row">
                        <div className="col-md-12">
                                <div className="alert alert-info" role="alert">
                                  <span className="para">NRI Address</span>
                                </div>
                              </div>
                        <div className="col-md-4 mb-4">
                                  <span className="has-float-label">
                                  <input className="form-control input-text" id="holder_1nri_pin" name="holder_1nri_pin" type="text" placeholder="Enter PIN Code" onKeyUp={this.valid}/>
                                  <label for="holder_1nri_pin" className="text-label">Enter PIN Code</label>
                                  </span>
                                  <small className="text-danger pull-left">{this.state.holder_1nri_Pintext}</small>
                              </div>
                        <div className="col-md-4 mb-4">
                                  <span className="has-float-label">
                                  <input className="form-control input-text" name="holder_1nri_address" id="holder_1nri_address" type="text" placeholder="Same Address As Per Documents" onKeyUp={this.valid}/>
                                  <label for="holder_1nri_address" className="text-label">Enter Address</label>
                                  </span>
                                  <small className="text-danger pull-left">{this.state.holder_1nri_Addrext}</small>
                              </div>
                        <div className="col-md-4 mb-4">
                                  <span className="has-float-label">
                                  <input className="form-control input-text" name="holder_1nri_landmark" id="holder_1nri_landmark" type="text" placeholder="Enter Landmark" onKeyUp={this.onChange}/>
                                  <label for="nri_landmark" className="text-label">Enter Landmark</label>
                                  </span>
                                  <small className="text-danger pull-left">{this.state.holder_1nri_Landmarkrext}</small>
                              </div>
                      </div>

                      <div className="row">
                        <div className="col-md-4 mb-4">
                                  <span className="has-float-label">
                                  <input className="form-control input-text" name="holder_1nri_city" id="holder_1nri_city"  type="text" placeholder="City" onKeyUp={this.valid}/>
                                  <label for="holder_1nri_City" className="text-label">City</label>
                                  </span>
                                  <small className="text-danger pull-left">{this.state.holder_1nri_Citytext}</small>
                              </div>
                        <div className="col-md-4 mb-4">
                                  <span className="has-float-label">
                                  <input className="form-control input-text" name="holder_1nri_state" id="holder_1nri_state" type="text" placeholder="State" onKeyUp={this.onChange}/>
                                  <label for="holder_1nri_state" className="text-label">State</label>
                                  </span>
                                  <small className="text-danger pull-left">{this.state.holder_1nri_Statetext}</small>
                              </div>
                        <div className="col-md-4 mb-4">
                                  <span className="has-float-label">
                                  <input className="form-control input-text" name="holder_1nri_country" id="holder_1nri_country" type="text" placeholder="Country" onKeyUp={this.onChange}/>
                                  <label for="holder_1nri_country" className="text-label">Country</label>
                                  
                                  </span>
                                  <small className="text-danger pull-left">{this.state.holder_1nri_Countrytext}</small>
                              </div>
                      </div>
                    </div>
                      
                    <a class="btn-theme-1 btn-theme-effect action-button pull-right" id="nn_1" type="button" onClick={this.jointHolde_2_Detail}>
                      <span class="button-text">Save & Continue</span>
                      <span class="round"><i class="fa fa-chevron-right"></i></span>
                    </a>

                    <a class="btn-theme-3 btn-theme-effect previous action-button-previous" type="submit" disabled>
                      <span class="button-text">Previous</span>
                      <span class="round"><i class="fa fa-chevron-left"></i></span>
                    </a>
                    
                </fieldset>
                :null} 

                {/* Bank Details  */}
                <fieldset id="bank" >
                  <div className="row">
                        <div className="col-md-12 mb-4">
                            <div className="alert alert-danger" role="alert">
                            <span className="para">Bank Details :</span>
                            {/* <span className="para pull-right">Step 2 - 4</span> */}
                      </div>
                      </div>
                    </div>

                    <div className="row">
                          <div className="col-md-4 mb-4">
                              <span className="has-float-label">
                              <input className="form-control input-text" id="acc-num" type="text" name="acc_num" placeholder="Enter Account Number" required  onKeyUp={this.onChange}/>
                              <label for="acc-num" className="text-label">Account Number</label>
                              </span>
                              <small className="text-danger pull-left">{this.state.acc_num_err}</small>
                          </div>
                        
                          <div className="col-md-4 mb-4">
                              <span className="has-float-label">
                              <input className="form-control input-text" id="cnf-acc-num" type="text" name="cnf_acc_num" placeholder="Confirm Account Number" required onKeyUp={this.onChange}/>
                              <label for="cnf-acc-num" className="text-label">Confirm Account Number</label>
                              </span>
                              <small className="text-danger pull-left">{this.state.cnf_acc_num_err}</small>
                          </div>

                          <div className="col-md-4 mb-4">
                              <span className="has-float-label">
                              <select className="form-control input-text" name="acc_type" id="acc-type" onChange={this.onChange}>
                                <option value="">Select</option> 
                                {this.state.get_AccountType?
                                 this.state.get_AccountType.map((item, key) =>
                                  <option value={item.id} selected={item.id == user_data.acc_type}>{item.description}</option> 
                                ):null} 
                              </select>
                              <label for="acc-type" className="text-label">Choose Bank Account Type</label>
                              </span>
                              <small className="text-danger pull-left">{this.state.acc_type_err}</small>
                          </div>
                      </div>

                    <div className="row">
                          <div className="col-md-4 mb-4">
                              <span className="has-float-label">
                              <input className="form-control input-text" name="ifsc" id="ifsc" type="text" placeholder="Enter IFSC Code" onKeyUp={this.onChange}/>
                              <label for="ifsc" className="text-label">IFSC Code</label>
                              </span>
                              <small className="text-danger pull-left">{this.state.ifsc_err}</small>
                          </div>
                          
                          <div className="col-md-4 mb-4">
                              <span className="has-float-label">
                              <select className="form-control input-text" name="bank_name" id="bank-name" onChange={this.onChange}>
                              <option value="">Select</option> 
                              {bank_list?
                                  bank_list.map((item, key) =>
                                  
                                  <option value={item.BANK_NAME} selected={item.BANK_NAME == user_data.bank_name}>{item.BANK_NAME}</option> 
                                ):null} 
                              </select>
                              <label for="bank-name" className="text-label">Choose Bank Name</label>
                              </span>
                              <small className="text-danger pull-left">{this.state.bank_name_err}</small>
                          </div>

                          {bank_list?
                            bank_list.map((item, key) =>
                            item.BANK_NAME==this.state.bb_code?
                            <input value={item.BANK_CODE} name="bank_code" id="bank_code" type="hidden" />
                            :null
                          ):null} 

                          <div className="col-md-4 mb-4">
                              <span className="has-float-label">
                              <input className="form-control input-text" name="branch" id="branch" type="text" placeholder="Branch" onKeyUp={this.onChange}/>
                              <label for="branch" className="text-label">Branch</label>
                              </span>
                              <small className="text-danger pull-left">{this.state.branch_err}</small>
                          </div>
                      </div>

                  <div className="row py-4">
                      <div className="col-lg-6 mx-auto bg-theme p-3 file-container">
                        {/* Upload image input*/}
                          <div className="input-group mb-3 form-control input-text">
                            <input id="upload" type="file" name="image" onchange="readURL(this);" className="form-control" />
                            <label id="upload-label" htmlFor="upload" className="text-muted">Upload Check</label>
                            <div className="input-group-append">
                              <label htmlFor="upload" className="btn m-0 p-0"> <i className="fa fa-cloud-upload mr-2 text-muted" /><small className="text-uppercase font-weight-bold text-muted">Choose file</small></label>
                            </div>
                           
                          </div>

                        {/* Uploaded image area*/}
                          <p className="font-italic text-white text-center">The uploaded image be rendered inside the box below.</p>
                          <div className="image-area mt-4"><img id="imageResult" src="#" alt="" className="img-fluid rounded shadow-sm mx-auto d-block" /></div>
                      </div>
                  </div>

                  <a class="btn-theme-1  btn-theme-effect action-button pull-right" type="submit" id="nn_2" onClick={this.bankDetails}>
                    <span class="button-text">Save & Continue</span>
                    <span class="round"><i class="fa fa-chevron-right"></i></span>
                  </a>

                  <a class="btn-theme-1 btn-theme-effect action-button pull-right" id="next_2"  type="button" >
                          <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
                          <span class="button-text"> Loading...</span>
                  </a>

                  <a class="btn-theme-3 btn-theme-effect previous action-button-previous" type="submit" disabled>
                    <span class="button-text">Previous</span>
                    <span class="round"><i class="fa fa-chevron-left"></i></span>
                  </a>

                </fieldset>

                {/* add nominee */}
                <fieldset id="nominee">
                  <div className="row">
                        <div className="col-md-12 ">
                            <div className="alert alert-danger" role="alert">
                            <span className="para">Add Nominee :</span>
                            {/* <span className="para pull-right">Step 3 - 4</span> */}
                      </div>
                      </div>
                  </div>
                  {this.createUI()}    
                  <div  className="row">
                    <div className="col-md-9 "></div>
                    <div className="col-md-3 ">
                    
                      <input type='button' className="btn btn-danger pull-right add_button" value='Add More' onClick={this.addClick.bind(this)}/>

                      <button type='button' className="btn btn-danger pull-right update_button" value='Update' onClick={this.update_nominee.bind(this)}>Update</button>

                    </div>
                    {/* <input type="submit" value="Submit" /> */}
                  </div>
                  <br></br>
                  <div className="col-md-12">
                  <table class="table table-striped">
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Date Of Birth</th>
                          <th>Relation</th>
                          <th>Allocation of Percentage (%)</th>
                          <th>Remove</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.user_nomine?
                          this.state.user_nomine.map((item, key) =>
                          <tr id={item.id}>
                            <td id={"name_"+item.id}>{item.nomini_name}</td>
                            <td id={"dob_"+item.id}>{item.dob}</td>
                            <td id={"rel_"+item.id}>{item.relation}</td>
                            <td id={"prec_"+item.id}>{item.alocation_percentage}</td>
                            <td>
                              <a href="javascript:void(0)" onClick={this.delete_nominee.bind(this, item.id)}><i className="fa fa-trash text-danger"></i></a>&nbsp;<a href="javascript:void(0)" onClick={this.edit_nominee.bind(this, item.id)}><i className="fa fa-edit text-danger"></i></a>
                            </td>
                          </tr>
                        ):null} 
                      </tbody>
                   </table>
                  </div>
                 
                  <a class="btn-theme-1 btn-theme-effect  action-button pull-right" type="button" id="nn_3" onClick={this.nominee}>
                    <span class="button-text">Save & Continue</span>
                    <span class="round"><i class="fa fa-chevron-right"></i></span>
                  </a>

                  <a class="btn-theme-1 btn-theme-effect  action-button pull-right" type="button" id="update_btn" onClick={this.next_nominee}>
                    <span class="button-text">Save & Continue</span>
                    <span class="round"><i class="fa fa-chevron-right"></i></span>
                  </a>

                  {/* {this.state.nominee_btn} */}
                  <a class="btn-theme-1 btn-theme-effect  action-button pull-right" id="next_3"  type="button" >
                          <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
                          <span class="button-text"> Loading...</span>
                  </a>
                  
                  <a class="btn-theme-3 btn-theme-effect previous action-button-previous" type="submit">
                    <span class="button-text">Previous</span>
                    <span class="round"><i class="fa fa-chevron-left"></i></span>
                  </a>

                </fieldset>

                {/* Finish */}

                <fieldset id="finish">
                <div className="row">
                      <div className="col-md-12">
                          <div className="alert alert-danger" role="alert">
                          <span className="para">Success :</span>
                          {/* <span className="para pull-right">Step 4 - 4</span> */}
                      </div>
                      </div>
                 </div>
                  
                    <h2 className="text-success text-center mb-3"><strong>Congratulations!!!</strong></h2>
                    <div className="row justify-content-center"> 
                      {/* <div className="col-3"> <img src={successimg} className="fit-image" /> </div>*/}
                      <div class="success-checkmark">
                        <div class="check-icon">
                          <span class="icon-line line-tip"></span>
                          <span class="icon-line line-long"></span>
                          <div class="icon-circle"></div>
                          <div class="icon-fix"></div>
                        </div>
                      </div>
                    </div>

                    <div className="alert alert-success text-center" role="alert">
                        <h4>Your application has been submitted successfully.
                        </h4> 
                        <h6>Now you are ready to invest. The application should get  approved within 2-3 working days
                          </h6>
                      </div>

                    <a class="btn-theme-1 btn-theme-effect pull-right">
                    <span class="button-text">Continue</span>
                    <span class="round"><i class="fa fa-chevron-right"></i></span>
                  </a>
                  
                  <a class="btn-theme-3 btn-theme-effect previous action-button-previous">
                    <span class="button-text">Previous</span>
                    <span class="round"><i class="fa fa-chevron-left"></i></span>
                  </a>

                </fieldset>

              </form>
            </div>
            </div>
            </div>
      </div>
     
        </>
      )
    }
    
}
export default Required_Details_Form
