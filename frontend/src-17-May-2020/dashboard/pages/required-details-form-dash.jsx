import React, { component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Header from './header';
import Footer from './footer';
import Sidebar from './sidebar';
import { ToastContainer, toast } from 'react-toastify';
import { Helmet } from "react-helmet";
import '../../assets/css/iinstyle.css';
import $ from 'jquery';

import Axios from 'axios';

class Required_Details_Form_Dash extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      users: [{ n_name: "", n_dob: "", n_rel: "", n_perc: "",n_gud:"" }]
    };
    // localStorage.clear();
    this.onChange = this.onChange.bind(this);
    this.valid = this.valid.bind(this);
    this.valid2 = this.valid2.bind(this);
    this.datehandle = this.datehandle.bind(this);
    this.update_nominee = this.update_nominee.bind(this);
     this.handleShow = this.handleShow.bind(this);

   Axios.post("/prodigypro/api/getoccupations")
      .then((response) => {
        console.log(response.data.data.data);
        this.setState({ getOccupation: response.data.data.data })
      });

   Axios.post("/prodigypro/api/getIncome")
      .then((response) => {
        console.log(response.data.data.data);
        this.setState({ get_income: response.data.data.data })
      });

   Axios.post("/prodigypro/api/accountType")
      .then((response) => {
        console.log(response.data.data.data.typeofAccount);
        this.setState({ get_AccountType: response.data.data.data.typeofAccount })
      });

   Axios.post("/prodigypro/api/bank_list")
      .then((response) => {
        // console.log("bank_list"+JSON.stringify(response.data.data.data));
        this.setState({ get_bank_list: JSON.stringify(response.data.data.data) })
      });

   Axios.post("/prodigypro/api/get_Country")
      .then((response) => {
        // console.log("get_country_list" + JSON.stringify(response.data.data.data));
        this.setState({ get_country_list: JSON.stringify(response.data.data.data) })
      });

      // console.log("hello",)
      
  }

  handleChange = (e) => {
    e.preventDefault();
  };

  onChange(e) {
   
    const data = {
      email: $("input[name=email]").val(),
      dob: $("input[name=dob]").val(),
      pob: $("input[name=pob]").val(),
      occupation: $('select[name="occupation"]').val(),
      inc_range: $('select[name="inc_range"]').val(),
      resident: $("input:radio[name=resident]:checked").val(),
      mobileNo: $('input[name="mobileNo"]').val(),

      guardian_name: $("input[name=guardian_name]").val(),
      guardian_dob: $("input[name=guardian_dob]").val(),
      relation_with_admin: $("select[name=relation_with_admin]").val(),

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
      not_politically:$("input[name=not_politically_N]:checked").val(),
    };

    if (data.email != '') {
      this.setState({ Emailtext: "" });
    }

    if (data.dob != '') {
      // alert(data.dob)
      this.setState({ Dobtext: "" });
    }

    if (data.pob != '') {
      
      this.setState({ Pobtext: "" });
    }

    if (data.mobileNo != '') {
      this.setState({ mobileNotext: "" });
    }

    if(localStorage.getItem("taxStatus")=="Minor"){
      if (data.guardian_name != '') {
        this.setState({ guardian_nametext: "" });
      }

      if (data.guardian_dob != '') {
        this.setState({ guardian_dobtexr: "" });
      }
    }

    if (data.occupation != '') {
      this.setState({ Occutext: "" });
    }

    if (data.relation_with_admin != '') {
      this.setState({ relationText: "" });
    }

    if (data.inc_range != '') {
      this.setState({ Incometext: "" });
    }

    if (data.resident != '') {
      this.setState({ residenttext: "" });
    }

    if (data.pin != '') {
      this.setState({ Pintext: "" });
    }

    if (data.not_politically != undefined) {
      this.setState({ not_politically_err_n: "" });
    }

    if (data.pin.length > 5) {

      const data_loc = {
        pincode: data.pin,
      };

     Axios.post("/prodigypro/api/StateCitybyPincode", data_loc)
        .then((response) => {

          if (response.data.status == 200) {
            $("input[name=city]").val(response.data.data.data.District);
            $("input[name=state]").val(response.data.data.data.State);
            this.setState({ Country: response.data.data.data.Country });
            // console.log("response.data.data.data.Country",response.data.data.data.Country)
            this.setState({ Pintext: "" });
            this.setState({ Citytext: "" });
            this.setState({ Statetext: "" });
          } else {
            this.setState({ Pintext: "Invalid Pin Code" });
          }

        });
    }

    if (data.address != '') {
      this.setState({ Addrext: "" });
    }

    if (data.landmark != '') {
      this.setState({ Landmarkrext: "" });
    }

    if (data.city != '') {
      this.setState({ Citytext: "" });
    }

    if (data.state != '') {
      this.setState({ Statetext: "" });
    }

    if (data.country != '') {
      this.setState({ Countrytext: "" });
    }

    if (data.npin != '') {
      this.setState({ nPintext: "" });
    }

    if (data.npin.length > 5) {

      const data_loc = {
        pincode: data.npin,
      };

      $(".npin_load").html('Please Wait...');
     Axios.post("/prodigypro/api/StateCitybyPincode", data_loc)
        .then((response) => {
          $(".npin_load").html('');
          if (response.data.status == 200) {
            $("input[name=ncity]").val(response.data.data.data.District);
            $("input[name=nstate]").val(response.data.data.data.State);
            this.setState({ nCountry: response.data.data.data.Country });
            this.setState({ nPintext: "" });
            this.setState({ nCitytext: "" });
            this.setState({ nStatetext: "" });
          } else {
            this.setState({ nPintext: "Invalid Pin Code" });
          }

        });
    }

    if (data.naddress != '') {
      this.setState({ nAddrext: "" });
    }

    if (data.nlandmark != '') {
      this.setState({ nLandmarkrext: "" });
    }

    if (data.ncity != '') {
      this.setState({ nCitytext: "" });
    }

    if (data.nstate != '') {
      this.setState({ nStatetext: "" });
    }

    if (data.ncountry != '') {
      this.setState({ nCountrytext: "" });
    }

    if (data.nri_pin != '') {
      this.setState({ nri_Pintext: "" });
    }

    if (data.nri_address != '') {
      this.setState({ nri_Addrext: "" });
    }

    if (data.nri_landmark != '') {
      this.setState({ nri_Landmarkrext: "" });
    }

    if (data.nri_city != '') {
      this.setState({ nri_Citytext: "" });
    }

    if (data.nri_state != '') {
      this.setState({ nri_Statetext: "" });
    }

    if (data.nri_country != '') {
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


    if (bank_data.acc_num != '') {
      this.setState({ acc_num_err: "" });
    }
    if (bank_data.cnf_acc_num != '') {
      this.setState({ cnf_acc_num_err: "" });
    }
    if (bank_data.acc_type != '') {
      this.setState({ acc_type_err: "" });
    }

    if (bank_data.ifsc != '') {
      this.setState({ ifsc_err: "" });

    }

    if (bank_data.ifsc.length > 10) {

      const data_ifsc = {
        ifsc: bank_data.ifsc,
      };

     Axios.post("/prodigypro/api/ifsc_verify", data_ifsc)
        .then((response) => {
          console.log(response.data.status);
          if (response.data.status == 200) {
            $("input[name=branch]").val(response.data.data.data.BRANCH);
            this.setState({ ifsc_err: "" });
          } else {
            this.setState({ ifsc_err: "Invalid IFSC Code" });
          }
        });

    }

    // alert(bank_data.bank_name);
    if (bank_data.bank_name != '') {
      this.setState({ bank_name_err: "" });
      this.setState({ bb_code: bank_data.bank_name });
    }

    if (bank_data.branch != '') {
      this.setState({ branch_err: "" });
    }

  }

  handleFormValidation = (data) => {
    let dataErr = [];
    const emailRegex = /^[^@ ]+@[^@ ]+\.[^@ ]+$/;  // Email Validation
    const EmailValid = emailRegex.test(data.email)

    if (data.email == '') {
      var isValid = {email:"1"};
      dataErr.push(isValid);
      this.setState({ Emailtext: "Mandatory Field" });
    } else if (EmailValid == false) {
      var isValid = {email:"1"};
      dataErr.push(isValid);
      this.setState({ Emailtext: "Email Id is Invalid" });
    } else {
      // var isValid = true;
      this.setState({ Emailtext: "" });
    }

    

    if (data.pob == '') {
      var isValid = {pob:"1"};
      dataErr.push(isValid);
      this.setState({ Pobtext: "Mandatory Field" });
    } else {
      // var isValid = true;
      this.setState({ Pobtext: "" });
    }

    var mobPattern = /^(?:(?:\\+|0{0,2})91(\s*[\\-]\s*)?|[0]?)?[6789]\d{9}$/;
    const PhoneValid = mobPattern.test(data.mobileNo);
    if (data.mobileNo == '') {
      var isValid = {mobileNo:"1"};
      dataErr.push(isValid);
      this.setState({ mobileNotext: "Mandatory Field" });
    }else if (PhoneValid == false) {
      var isValid = {mobileNo:"1"};
      dataErr.push(isValid);
      this.setState({ mobileNotext: "Mobile No is Invalid" });
    } else {
      // var isValid = true;
      this.setState({ mobileNotext: "" });
    }

    if(localStorage.getItem("taxStatus")=="Minor"){
      if (data.dob == '') {
        var isValid = {dob:"1"};
        dataErr.push(isValid);
        this.setState({ Dobtext: "Mandatory Field" });
      }else{
        // var isValid = true;
        this.setState({ Dobtext: "" });
      }

      if (data.guardian_name == '') {
        var isValid = {guardian_name:"1"};
        dataErr.push(isValid);
        this.setState({ guardian_nametext: "Mandatory Field" });
      }else {
        // var isValid = true;
        this.setState({ guardian_nametext: "" });
      }

      if (data.guardian_dob == '') {
        var isValid = {guardian_dob:"1"};
        dataErr.push(isValid);
        this.setState({ guardian_dobtexr: "Mandatory Field" });
      }else{
        var today = new Date();
        var birthDate = new Date(data.guardian_dob); 
        // create a date object directly from `dob1` argument
        var age_now = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) 
        {
            age_now--;
        }
        // console.log("dob",age_now);
        if(age_now<18){
          var isValid = {guardian_dob:"1"};
          dataErr.push(isValid);
          this.setState({ guardian_dobtexr: "Minimum age should be 18 Year and above" });
        }else{
          // var isValid = true;
          this.setState({ guardian_dobtexr: "" });
        }                                                                 
      }

      if (data.relation_with_admin == '') {
        var isValid = {relation_with_admin:"1"};
        dataErr.push(isValid);
        this.setState({ relationText: "Mandatory Field" });
      } else {
        // var isValid = true;
        this.setState({ relationText: "" });
      }


    }else{
      if (data.dob == '') {
        var isValid = {dob:"1"};
        dataErr.push(isValid);
        this.setState({ Dobtext: "Mandatory Field" });
      }else{
        // var isValid = true;
        var today = new Date();
        var birthDate = new Date(data.dob);  // create a date object directly from `dob1` argument
        var age_now = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) 
        {
            age_now--;
        }
        // console.log("dob",age_now);
        if(age_now<18){
          var isValid = {dob:"1"};
          dataErr.push(isValid);
          this.setState({ Dobtext: "Minimum age should be 18 Year and above" });
        }else{
          // var isValid = true;
          this.setState({ Dobtext: "" });
        }
        
      }
    }    

    if (data.occupation == '') {
      var isValid = {occupation:"1"};
      dataErr.push(isValid);
      this.setState({ Occutext: "Mandatory Field" });
    } else {
      // var isValid = true;
      this.setState({ Occutext: "" });
    }

    if (data.inc_range == '') {
      var isValid = {inc_range:"1"};
      dataErr.push(isValid);
      this.setState({ Incometext: "Mandatory Field" });
    } else {
      // var isValid = true;
      this.setState({ Incometext: "" });
    }

   

    if (data.resident == undefined) {
      var isValid = {resident:"1"};
      dataErr.push(isValid);
      this.setState({ residenttext: "Mandatory Field" });
    } else {
      // var isValid = true;
      this.setState({ residenttext: "" });
    }

    if (data.resident == "0") {
      if (data.npin == '') {
        var isValid = {npin:"1"};
        dataErr.push(isValid);
        this.setState({ nPintext: "Mandatory Field" });
      } else {
        // var isValid = true;
        this.setState({ nPintext: "" });
      }

      if (data.naddress == '') {
        var isValid = {naddress:"1"};
        dataErr.push(isValid);
        this.setState({ nAddrext: "Mandatory Field" });
      } else {
        // var isValid = true;
        this.setState({ nAddrext: "" });
      }

      // if (data.nlandmark == '') {
      //   var isValid = false;
      //   this.setState({ nLandmarkrext: "Mandatory Field" });
      // } else {
      //   var isValid = true;
      //   this.setState({ nLandmarkrext: "" });
      // }

      if (data.ncity == '') {
        var isValid = {ncity:"1"};
        dataErr.push(isValid);
        this.setState({ nCitytext: "Mandatory Field" });
      } else {
        // var isValid = true;
        this.setState({ nCitytext: "" });
      }

      if (data.nstate == '') {
        var isValid = {nstate:"1"};
        dataErr.push(isValid);
        this.setState({ nStatetext: "Mandatory Field" });
      } else {
        // var isValid = true;
        this.setState({ nStatetext: "" });
      }

      if (data.ncountry == '') {
        var isValid = {ncountry:"1"};
        dataErr.push(isValid);
        this.setState({ nCountrytext: "Mandatory Field" });
      } else {
        // var isValid = true;
        this.setState({ nCountrytext: "" });
      }

      if (data.nri_pin == '') {
        var isValid = {nri_pin:"1"};
        dataErr.push(isValid);
        this.setState({ nri_Pintext: "Mandatory Field" });
      } else {
        // var isValid = true;
        this.setState({ nri_Pintext: "" });
      }

      if (data.nri_address == '') {
        var isValid = {nri_address:"1"};
        dataErr.push(isValid);
        this.setState({ nri_Addrext: "Mandatory Field" });
      } else {
        // var isValid = true;
        this.setState({ nri_Addrext: "" });
      }

      // if (data.nri_landmark == '') {
      //   var isValid = false;
      //   this.setState({ nri_Landmarkrext: "Mandatory Field" });
      // } else {
      //   var isValid = true;
      //   this.setState({ nri_Landmarkrext: "" });
      // }

      if (data.nri_city == '') {
        var isValid = {nri_city:"1"};
        dataErr.push(isValid);
        this.setState({ nri_Citytext: "Mandatory Field" });
      } else {
        // var isValid = true;
        this.setState({ nri_Citytext: "" });
      }

      if (data.nri_state == '') {
        var isValid = {nri_state:"1"};
        dataErr.push(isValid);
        this.setState({ nri_Statetext: "Mandatory Field" });
      } else {
        // var isValid = true;
        this.setState({ nri_Statetext: "" });
      }

      if (data.nri_country == '') {
        var isValid = {nri_country:"1"};
        dataErr.push(isValid);
        this.setState({ nri_Countrytext: "Mandatory Field" });
      } else {
        // var isValid = true;
        this.setState({ nri_Countrytext: "" });
      }

    } else if (data.resident == "1") {

      if (data.pin == '') {
        var isValid = {pin:"1"};
        dataErr.push(isValid);
        this.setState({ Pintext: "Mandatory Field" });
      } else {
        // var isValid = true;
        this.setState({ Pintext: "" });
      }

      if (data.address == '') {
        var isValid = {sdcds:"1"};
        dataErr.push(isValid);
        this.setState({ Addrext: "Mandatory Field" });
      } else {
        // var isValid = true;
        this.setState({ Addrext: "" });
      }

      // if (data.landmark == '') {
      //   var isValid = false;
      //   this.setState({ Landmarkrext: "Mandatory Field" });
      // } else {
      //   var isValid = true;
      //   this.setState({ Landmarkrext: "" });
      // }

      if (data.city == '') {
        var isValid = {city:"1"};
        dataErr.push(isValid);
        this.setState({ Citytext: "Mandatory Field" });
      } else {
        // var isValid = true;
        this.setState({ Citytext: "" });
      }

      if (data.state == '') {
        var isValid = {state:"1"};
        dataErr.push(isValid);
        this.setState({ Statetext: "Mandatory Field" });
      } else {
        // var isValid = true;
        this.setState({ Statetext: "" });
      }

      if (data.country == '') {
        var isValid = {country:"1"};
        dataErr.push(isValid);
        this.setState({ Countrytext: "Mandatory Field" });
      } else {
        // var isValid = true;
        this.setState({ Countrytext: "" });
      }
    };


    if (data.not_politically == undefined) {
        var isValid = {not_politically:"1"};
        dataErr.push(isValid);
        this.setState({ not_politically_err_n: "Mandatory Field" });
      } else {
        // var isValid = true;
        this.setState({ not_politically_err_n: "" });
      }
      console.log("dd",dataErr)
    return dataErr.length;
  }

  persnalDetail = e => {
    e.preventDefault();
    let user_pan_card;  let user_name;
    if(localStorage.getItem("guardian_pan")!=''){
      //console.log("dd",localStorage.getItem("guardian_pan"))
       user_pan_card= localStorage.getItem("guardian_pan") 
    }else{
      // console.log("dd-1",localStorage.getItem("primary_pan"))
      user_pan_card= localStorage.getItem("primary_pan")
    }

    // console.log("dd-0",localStorage.getItem("guardian_pan"))
    if(localStorage.getItem("investor_name")!=''){
      // console.log("dd-0",localStorage.getItem("guardian_pan"))
      user_name= localStorage.getItem("investor_name") 
    }else{
      // console.log("dd-1",localStorage.getItem("primary_pan"))
      user_name= localStorage.getItem("primary_name")
    }
    
    const data = {
      pan: user_pan_card.toUpperCase(),
      email: $("input[name=email]").val(),
      dob: $("input[name=dob]").val(),
      pob: $("input[name=pob]").val(),
      occupation: $('select[name="occupation"]').val(),
      inc_range: $('select[name="inc_range"]').val(),
      resident: $("input:radio[name=resident]:checked").val(),
      mobileNo: $('input[name="mobileNo"]').val(),

      parent_email: localStorage.getItem("userEmail"),
      name: user_name,
      holding: localStorage.getItem("holding"),
      tax_status: localStorage.getItem("tax_Status"),
      guardian_name: $("input[name=guardian_name]").val(),
      guardian_dob: $("input[name=guardian_dob]").val(),
      relation_with_admin: $("select[name=relation_with_admin]").val(),

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

      not_politically:$("input[name=not_politically_N]:checked").val(),
      tax_payer:$("input[name=tax_payer]:checked").val(),
    };

    // if(localStorage.getItem("jointHolder1")){
    //   $("#personal_data").css({ "display": "none" });
    //   $("#joint_holder_1").css({ "display": "block" });
    //   $("#joint_holder_1").css({ "opacity": 1 });
    //   $("#jointholder_1").addClass("active");
    // }else if(localStorage.getItem("jointHolder2")){
    //   $("#personal_data").css({ "display": "none" });
    //   $("#joint_holder_2").css({ "display": "block" });
    //   $("#joint_holder_2").css({ "opacity": 1 });
    //   $("#jointholder_2").addClass("active");
    // }else{
    //   $("#personal_data").css({ "display": "none" });
    //   $("#bank").css({ "display": "block" });
    //   $("#bank").css({ "opacity": 1 });
    //   $("#personal").addClass("active");
    // }

    // console.log("dd",data)
    // alert(this.handleFormValidation(data))
    if (this.handleFormValidation(data)==0) {
      $("#nn_1").css({ "display": "none" });
     // $("#next_1").css({ "display": "block" });
     Axios.post("/prodigypro/api/additional_iin_personalDetails", data)
      .then((response) => {
        console.log("dd",response.data.data.status);
        if(response.data.data.status==422){
          $("#nn_1").css({ "display": "block" });
          window.$('#exampleModalCenter').modal('show');
          this.setState({ alertMsg: "You are already Registered, If you want to be added in family member then please select 'Add Family Member option" })
        }else{
          $("#next_1").css({ "display": "none" });
          $("#nn_1").css({ "display": "block" });
          this.setState({user_id:response.data.data.data.user_id})
          const address_data = {
            user_id: response.data.data.data.user_id,
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
      
            not_politically:$("input[name=not_politically_N]:checked").val(),
            tax_payer:$("input[name=tax_payer]:checked").val(),
          }
          
          Axios.post("/prodigypro/api/additional_iin_address_details", address_data)
          .then((ress) => {           
            if (localStorage.getItem("jointHolder1")) {
              $("#personal_data").css({ "display": "none" });
              $("#joint_holder_1").css({ "display": "block" });
              $("#joint_holder_1").css({ "opacity": 1 });
              $("#jointholder_1").addClass("active");
            } else if (localStorage.getItem("jointHolder2")) {
              $("#personal_data").css({ "display": "none" });
              $("#joint_holder_2").css({ "display": "block" });
              $("#joint_holder_2").css({ "opacity": 1 });
              $("#jointholder_2").addClass("active");
            } else {
              $("#personal_data").css({ "display": "none" });
              $("#bank").css({ "display": "block" });
              $("#bank").css({ "opacity": 1 });
              $("#personal").addClass("active");
            }
            //toast.success("Successfully Updated");
            localStorage.setItem("personal_detail", JSON.stringify(response.data.data.data))
            console.log(ress.data.data);
          });

          Axios.post("/prodigypro/api/additional_iin_declaration_journy_pc", address_data)
          .then((ress) => {   
            console.log(ress.data.data);
          });
        }
       // $("#next_1").css({ "display": "none" });
       
         // this.setState({user_id:response.data.data.data.user_id})
      });
    }
  }

  holderFormValidation = (data) => {
    let dataErr = [];
    //mobile No validation
    var mobPattern = /^(?:(?:\\+|0{0,2})91(\s*[\\-]\s*)?|[0]?)?[6789]\d{9}$/;
    const PhoneValid = mobPattern.test(data.phone);
    if (data.phone == '') {
      var isValid = {phone:"1"};
      dataErr.push(isValid);
      this.setState({ holder_1phontext: "Mandatory Field" });
    } else if (PhoneValid == false) {
      var isValid = {phone:"1"};
      dataErr.push(isValid);
      this.setState({ holder_1phontext: "Mobile No is Invalid" });
    } else {
      // var isValid = true;
      this.setState({ holder_1phontext: "" });
    }

    // Email Validation
    const emailRegex = /^[^@ ]+@[^@ ]+\.[^@ ]+$/;
    const EmailValid = emailRegex.test(data.holderEmail)
    if (data.holderEmail == '') {
      var isValid = {holderEmail:"1"};
      dataErr.push(isValid);
      this.setState({ holder_1Emailtext: "Mandatory Field" });
    } else if (EmailValid == false) {
      var isValid = {holderEmail:"1"};
      dataErr.push(isValid);
      this.setState({ holder_1Emailtext: "Email Id is Invalid" });
    } else if (data.holderEmail == localStorage.getItem("userEmail")) {
      var isValid = {holderEmail:"1"};
      dataErr.push(isValid);
      this.setState({ holder_1Emailtext: "Second Holder's Email Id should not be same as Primary Holder's Email Id" });
    } else {
      // var isValid = true; localStorage.getItem("userEmail")
      this.setState({ holder_1Emailtext: "" });
    }

    if (data.dob == '') {
      var isValid = {dob:"1"};
      dataErr.push(isValid);
      this.setState({ holder_1Dobtext: "Mandatory Field" });
    } else {
      // var isValid = true;
      var today = new Date();
      var birthDate = new Date(data.dob);  // create a date object directly from `dob1` argument
      var age_now = today.getFullYear() - birthDate.getFullYear();
      var m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) 
      {
          age_now--;
      }
      // console.log("dob",age_now);
      if(age_now<18){
        var isValid = {dob:"1"};
        dataErr.push(isValid);
        this.setState({ holder_1Dobtext: "Minimum age should be 18 Year and above" });
      }else{
        // var isValid = true;
        this.setState({ holder_1Dobtext: "" });
      }

      // this.setState({ holder_1Dobtext: "" });
    }

    if (data.pob == '') {
      var isValid = {pob:"1"};
      dataErr.push(isValid);
      this.setState({ holder_1Pobtext: "Mandatory Field" });
    } else {
      // var isValid = true;
      this.setState({ holder_1Pobtext: "" });
    }

    if (data.occupation == '') {
      var isValid = {occupation:"1"};
      dataErr.push(isValid);
      this.setState({ holder_1Occutext: "Mandatory Field" });
    } else {
      // var isValid = true;
      this.setState({ holder_1Occutext: "" });
    }

    if (data.inc_range == '') {
      var isValid = {inc_range:"1"};
      dataErr.push(isValid);
      this.setState({ holder_1Incometext: "Mandatory Field" });
    } else {
      // var isValid = true;
      this.setState({ holder_1Incometext: "" });
    }

    if (data.resident == undefined) {
      var isValid = {resident:"1"};
      dataErr.push(isValid);
      this.setState({ holderResidenttext_1: "Mandatory Field" });
    } else {
      // var isValid = true;
      this.setState({ holderResidenttext_1: "" });
    }

    if (data.tax_payer == undefined) {
      var isValid = {tax_payer:"1"};
      dataErr.push(isValid);
      this.setState({ tax_err: "Mandatory Field" });
    } else {
      // var isValid = true;
      this.setState({ tax_err: "" });
    }

    if (data.not_politically == undefined) {
      var isValid = {not_politically:"1"};
      dataErr.push(isValid);
      this.setState({ not_politically_err: "Mandatory Field" });
    } else {
      // var isValid = true;
      this.setState({ not_politically_err: "" });
    }
    return dataErr.length;
  }

  valid(e) {
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
      ncountry: $("select[name=nholderCountry_1]").val(),

      nri_pin: $("input[name=holder_1nri_pin]").val(),
      nri_address: $("input[name=holder_1nri_address]").val(),
      nri_landmark: $("input[name=holder_1nri_landmark]").val(),
      nri_city: $("input[name=holder_1nri_city]").val(),
      nri_state: $("input[name=holder_1nri_state]").val(),
      nri_country: $("input[name=holder_1nri_country]").val(),

    };

    if (data.phone != '') {
      this.setState({ holder_1phontext: "" });
    }

    if (data.email != '') {
      this.setState({ holder_1Emailtext: "" });
    }

    if (data.dob != '') {
      this.setState({ holder_1Dobtext: "" });
    }

    if (data.pob != '') {
      this.setState({ holder_1Pobtext: "" });
    }

    if (data.occupation != '') {
      this.setState({ holder_1Occutext: "" });
    }

    if (data.inc_range != '') {
      this.setState({ holder_1Incometext: "" });
    }

    if (data.resident != '') {
      this.setState({ holderResidenttext_1: "" });
    }

    if (data.tax_payer != undefined) {
      this.setState({ tax_err: "" });
    }

    if (data.not_politically != undefined) {
      this.setState({ not_politically_err: "" });
    }

  }

  jointHolde_1_Detail = (e) => {
    // holderName_2
    const data = {
      joint_holder: $("input[name=joint_holder_1]").val(),
      holderName: $("input[name=holderName_1]").val(),
      user_id: this.state.user_id,
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
    };

    if (this.holderFormValidation(data)==0) {
      // jointnn_1
      $("#jointnn_1").html('Loading...');
     Axios.post("/prodigypro/api/additional_iin_joint_holder", data)
        .then((response) => {
          $("#jointnn_1").html('Save and Continue');
          if (localStorage.getItem("jointHolder2")) {
            $("#joint_holder_1").css({ "display": "none" });
            $("#joint_holder_2").css({ "display": "block" });
            $("#joint_holder_2").css({ "opacity": 1 });
            $("#jointholder_2").addClass("active");
          } else {
            $("#joint_holder_1").css({ "display": "none" });
            $("#bank").css({ "display": "block" });
            $("#bank").css({ "opacity": 1 });
            $("#personal").addClass("active");
          }
        })
    }
  }

  holderFormValidation2 = (data) => {
    let dataErr = [];
    //mobile No validation
    var mobPattern = /^(?:(?:\\+|0{0,2})91(\s*[\\-]\s*)?|[0]?)?[6789]\d{9}$/;
    const PhoneValid = mobPattern.test(data.phone);
    if (data.phone == '') {
      var isValid = {phone:"1"};
      dataErr.push(isValid);
      this.setState({ holder_2phontext: "Mandatory Field" });
    } else if (PhoneValid == false) {
      var isValid = {phone:"1"};
      dataErr.push(isValid);
      this.setState({ holder_2phontext: "Mobile No is Invalid" });
    } else {
      // var isValid = true;
      this.setState({ holder_2phontext: "" });
    }

    // Email Validation
    const emailRegex = /^[^@ ]+@[^@ ]+\.[^@ ]+$/;
    const EmailValid = emailRegex.test(data.holderEmail)
    if (data.holderEmail == '') {
      var isValid = {holderEmail:"1"};
      dataErr.push(isValid);
      this.setState({ holder_2Emailtext: "Mandatory Field" });
    } else if (EmailValid == false) {
      var isValid = {holderEmail:"1"};
      dataErr.push(isValid);
      this.setState({ holder_2Emailtext: "Email Id is Invalid" });
    }else if (data.holderEmail == localStorage.getItem("userEmail")) {
      var isValid = {holderEmail:"1"};
      dataErr.push(isValid);
      this.setState({ holder_2Emailtext: "Third Holder's Email Id should not be same as Primary Holder's Email Id" });
    } else {
      // var isValid = true;
      this.setState({ holder_2Emailtext: "" });
    }

    if (data.dob == '') {
      var isValid = {dob:"1"};
      dataErr.push(isValid);
      this.setState({ holder_2Dobtext: "Mandatory Field" });
    } else {
      // var isValid = true;
      this.setState({ holder_2Dobtext: "" });
    }

    if (data.pob == '') {
      var isValid = {pob:"1"};
      dataErr.push(isValid);
      this.setState({ holder_2Pobtext: "Mandatory Field" });
    } else {
      // var isValid = true;
      this.setState({ holder_2Pobtext: "" });
    }

    if (data.occupation == '') {
      var isValid = {occupation:"1"};
      dataErr.push(isValid);
      this.setState({ holder_2Occutext: "Mandatory Field" });
    } else {
      // var isValid = true;
      this.setState({ holder_2Occutext: "" });
    }

    if (data.inc_range == '') {
      var isValid = {inc_range:"1"};
      dataErr.push(isValid);
      this.setState({ holder_2Incometext: "Mandatory Field" });
    } else {
      // var isValid = true;
      this.setState({ holder_2Incometext: "" });
    }

    if (data.resident == undefined) {
      var isValid = {resident:"1"};
      dataErr.push(isValid);
      this.setState({ holderResidenttext_2: "Mandatory Field" });
    } else {
      // var isValid = true;
      this.setState({ holderResidenttext_2: "" });
    }

    if (data.tax_payer == undefined) {
      var isValid = {tax_payer:"1"};
      dataErr.push(isValid);
      this.setState({ tax_err2: "Mandatory Field" });
    } else {
      // var isValid = true;
      this.setState({ tax_err2: "" });
    }

    if (data.not_politically == undefined) {
      var isValid = {not_politically:"1"};
      dataErr.push(isValid);
      this.setState({ not_politically_err2: "Mandatory Field" });
    } else {
      // var isValid = true;
      this.setState({ not_politically_err2: "" });
    }

    return dataErr.length;
  }

  valid2(e) {
    const data = {
      phone: $("input[name=holder_phon_2]").val(),
      email: $("input[name=holderEmail_2]").val(),
      dob: $("input[name=holderDob_2]").val(),
      pob: $("input[name=holderPob_2]").val(),
      occupation: $('select[name="holderOccup_2"]').val(),
      inc_range: $('select[name="holderInc_range_2"]').val(),
      resident: $("input:radio[name=holderResident_2]:checked").val(),

      tax_payer: $("input[name=tax_payer2]:checked").val(),
      not_politically: $("input[name=not_politically2]:checked").val(),

    };

    if (data.phone != '') {
      this.setState({ holder_2phontext: "" });
    }

    if (data.email != '') {
      this.setState({ holder_2Emailtext: "" });
    }

    if (data.dob != '') {
      this.setState({ holder_2Dobtext: "" });
    }

    if (data.pob != '') {
      this.setState({ holder_2Pobtext: "" });
    }

    if (data.occupation != '') {
      this.setState({ holder_2Occutext: "" });
    }

    if (data.inc_range != '') {
      this.setState({ holder_2Incometext: "" });
    }

    if (data.resident != '') {
      this.setState({ holderResidenttext_2: "" });
    }

    if (data.tax_payer != undefined) {
      this.setState({ tax_err2: "" });
    }

    if (data.not_politically != undefined) {
      this.setState({ not_politically_err2: "" });
    }

  }

  jointHolde_2_Detail = (e) => {

    const data = {
      holderName: $("input[name=holderName_2]").val(),
      joint_holder: $("input[name=joint_holder_2]").val(),
      user_id: this.state.user_id,
      phone: $("input[name=holder_phon_2]").val(),
      pan: $("input[name=holder_pan_2]").val(),
      holderEmail: $("input[name=holderEmail_2]").val(),
      dob: $("input[name=holderDob_2]").val(),
      pob: $("input[name=holderPob_2]").val(),
      occupation: $('select[name="holderOccup_2"]').val(),
      inc_range: $('select[name="holderInc_range_2"]').val(),
      resident: $("input:radio[name=holderResident_2]:checked").val(),
      tax_payer: $("input[name=tax_payer2]:checked").val(),
      not_politically: $("input[name=not_politically2]:checked").val(),

    };

    if (this.holderFormValidation2(data)==0) {
      $("#jointnn_2").html('Loading...');
     Axios.post("/prodigypro/api/additional_iin_joint_holder", data)
        .then((response) => {
          $("#jointnn_2").html('Save and Continue');
          $("#joint_holder_2").css({ "display": "none" });
          $("#bank").css({ "display": "block" });
          $("#bank").css({ "opacity": 1 });
          $("#personal").addClass("active");
        })
    }
  }

  bankFromValidation = (bank_data) => {
    let dataErr = [];
    var patt = /^([0-9]{10})|([0-9]{2}-[0-9]{3}-[0-9]{6})$/;
    var accValid = patt.test(bank_data.acc_num); // true
    // alert(accValid)
    if (bank_data.acc_num == '') {
      var isValid = {acc_num:"1"};
      dataErr.push(isValid);
      this.setState({ acc_num_err: "Mandatory Field" });
    } else if (accValid == false) {
      var isValid = {acc_num:"1"};
      dataErr.push(isValid);
      this.setState({ acc_num_err: "Please enter a valid Account No " });
    } else {
      // var isValid = true;
      this.setState({ acc_num_err: "" });
    }

    if (bank_data.cnf_acc_num == '') {
      var isValid = {cnf_acc_num:"1"};
      dataErr.push(isValid);
      this.setState({ cnf_acc_num_err: "Mandatory Field" });
    } else if (bank_data.cnf_acc_num != bank_data.acc_num) {
      var isValid = {cnf_acc_num:"1"};
      dataErr.push(isValid);
      this.setState({ cnf_acc_num_err: "Account No does not Match" });
    } else {
      // var isValid = true;
      this.setState({ cnf_acc_num_err: "" });
    }

    if (bank_data.acc_type == '') {
      var isValid = {acc_type:"1"};
      dataErr.push(isValid);
      this.setState({ acc_type_err: "Mandatory Field" });
    } else {
      var isValid = true;
      this.setState({ acc_type_err: "" });
    }

    if (bank_data.ifsc == '') {
      var isValid = {ifsc:"1"};
      dataErr.push(isValid);
      this.setState({ ifsc_err: "Mandatory Field" });
    } else {
      // var isValid = true;
      this.setState({ ifsc_err: "" });
    }

    if (bank_data.bank_name == '') {
      var isValid = {bank_name:"1"};
      dataErr.push(isValid);
      this.setState({ bank_name_err: "Mandatory Field" });
    } else {
      // var isValid = true;
      this.setState({ bank_name_err: "" });
    }

    if (bank_data.branch == '') {
      var isValid = {image:"1"};
      dataErr.push(isValid);
      this.setState({ branch_err: "Mandatory Field" });
    } else {
      // var isValid = true;
      this.setState({ branch_err: "" });
    }


    if (bank_data.upload_type == '') {
      var isValid = {upload_type:"1"};
      dataErr.push(isValid);
      this.setState({ upload_type_err: "Mandatory Field" });
    } else {
      // var isValid = true;
      this.setState({ upload_type_err: "" });
    }

    if (bank_data.image == '') {
      var isValid = {image:"1"};
      dataErr.push(isValid);
      this.setState({ image_err: "Mandatory Field" });
    } else {
      // var isValid = true;
       if((bank_data.image.split('.').pop()=="pdf") || (bank_data.image.split('.').pop()=="jpg") || (bank_data.image.split('.').pop()=="jpeg") || (bank_data.image.split('.').pop()=="png")){
       this.setState({ image_err: "" });
       
      }else{
        this.setState({ image_err: "Invalid File Formate!" });
      }
    }

    return dataErr.length;
  }

  bankDetails= e => {
    e.preventDefault();
    
    // $("#bank").css({ "display": "none" });
    // $("#nominee").css({ "display": "block" });
    // $("#nominee").css({ "opacity": 1 });
    // $("#payment").addClass("active");
    
    const get_nomine = {
      user_id: this.state.user_id,
    };

   Axios.post("/prodigypro/api/additional_iin_get_nomine",get_nomine)
    .then((response) => {
      console.log("qq",response.data.data.status);
      if(response.data.data.status==400){
        this.setState({user_nomine:''})
        this.setState({nomine_count: 0})
      }else{
        this.setState({user_nomine:response.data.data.data})
        this.setState({nomine_count: response.data.data.data.length})
      }
    });

    const bank_data = {
      user_id: this.state.user_id,
      acc_num: $("input[name=acc_num]").val(),
      cnf_acc_num: $("input[name=cnf_acc_num]").val(),
      acc_type: $('select[name="acc_type"]').val(),
      upload_type: $('select[name="upload_type"]').val(),
      ifsc: $('input[name="ifsc"]').val(), 
      bank_name: $('select[name="bank_name"]').val(),
      branch: $("input[name=branch]").val(),
      bank_code: $('input[name="bank_code"]').val(),
      image: $("input[name=image]").val()
    }

    // alert(bank_data.image);
    console.log("dd",bank_data)
    if(this.bankFromValidation(bank_data)==0){
      // if(bank_data.image==''){
      //   // toast.error("please Upload File");
      // }else{
        $("#nn_2").css({ "display": "none" });
        $("#next_2").css({ "display": "block" });
       Axios.post("/prodigypro/api/additional_iin_bank_details",bank_data)
          .then((ress) => {
            // this.setState({ modalState: true });
            this.setState({nominee_div:1});
            // window.$('#exampleModalCenter').modal('show');
            $("#nn_2").css({ "display": "block" });
              $("#next_2").css({ "display": "none" });

            if(localStorage.getItem("taxStatus")!="Minor"){
              $("#bank").css({ "display": "none" });
              $("#nominee").css({ "display": "block" });
              $("#nominee").css({ "opacity": 1 });
              $("#payment").addClass("active");
            }else{
              const data = {
                user_id: this.state.user_id,
              }
              
              Axios.post("/prodigypro/api/additional_iinCreate", data)
              .then(function (result_iin) {
               
                console.log("result_iin",result_iin.data.data.status);
                if(result_iin.data.data.status==200){
                 Axios.post("/prodigypro/api/additional_iin_fatca", data)
                  .then(function (result_fatca) {
                    console.log("result_fatca",result_fatca.data);
                  });
        
                  $("#bank").css({ "display": "none" });
                  $("#finish").css({ "display": "block" });
                  $("#finish").css({ "opacity": 1 });
                  $("#confirm").addClass("active");
                  // toast.success("Successfully");
                }else{
                  toast.error(result_iin.data.data.data.error);
                }
              });
             
            }
                      
           
            //toast.success("Successfully Updated");
            console.log("dd",ress.data.data);
        });
      // }
    }

  }

  datehandle(e) {

    const data = {
      dob: $("input[name=n_dob]").val(),
    };
    // var dob= $("input[name=n_dob]").val();
    var today = new Date();
    var birthDate = new Date(data.dob);  
    var age_now = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) 
    {
      age_now--;
    }
    
    if(age_now<18){
      $("#gud_name").css('display','block')
    }else{
      $("#gud_name").css('display','none')
    }
    
  }

  nomineeFromValidation = (nominee_data) => {
    let data_arr = [];
      if (nominee_data.name == '') {
        var isValid= {nametext:"1"}
        data_arr.push(isValid);
        this.setState({ n_name_err: "Mandatory Field" });
      } else {
        // var isValid = true;
        this.setState({ n_name_err: "" });
      }

      if (nominee_data.dob == '') {
        var isValid= {dobtext:"1"}
        data_arr.push(isValid);
        this.setState({ n_dob_err: "Mandatory Field" });
      } else {
        // var isValid = true;
        this.setState({ n_dob_err: "" });
      }

      if (nominee_data.rel == '') {
        var isValid= {reltext:"1"}
        data_arr.push(isValid);
        this.setState({ n_rel_err: "Mandatory Field" });
      } else {
        this.setState({ n_rel_err: "" });
      }

      var patt = /^[0-9]*$/;
      var accValid = patt.test(nominee_data.perc);
      
      if (nominee_data.perc == '') {
        var isValid= {perctext:"1"}
        data_arr.push(isValid);
        this.setState({ n_perc_err: "Mandatory Field" });
      } else if (accValid == false) {
        var isValid= {perctext:"1"}
        data_arr.push(isValid);
        this.setState({ n_perc_err: "Only Digits" });
      }
      else {
        if(nominee_data.perc > 100) {
          var isValid= {perctext:"1"}
          data_arr.push(isValid);
          this.setState({ n_perc_err: "Please enter a Valid Percentage" });
        }else{
          // var isValid = true;
          this.setState({ n_perc_err: "" });
        }
        // this.setState({ n_perc_err: "" });
      }

      var today = new Date();
      var birthDate = new Date(nominee_data.dob);  
      var age_now = today.getFullYear() - birthDate.getFullYear();
      var m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) 
      {
        age_now--;
      }
   
      if(age_now<18){ 
        if (nominee_data.gud == '') {
          var isValid= {gudtext:"1"}
          data_arr.push(isValid);
          this.setState({ n_gud_err: "Mandatory Field" });
        } else {
          this.setState({ n_gud_err: "" });
        }
      }else{
        this.setState({ n_gud_err: "" });
      }

    return data_arr.length;
  }

  addnominee = e =>{
    // alert(this.state.user_nomine.length)
    const nominee_data = {
          count: 0,
          name:  $("input[name=n_name]").val(),
          dob:  $("input[name=n_dob]").val(),
          rel: $("select[name=n_rel]").val(),
          perc: $("input[name=n_perc]").val(),
          gud: $("input[name=n_gud]").val(),
          user_id:this.state.user_id,
          image: $("input[name=image]").val()
    }

    if (this.nomineeFromValidation(nominee_data)==0) {
        var total = '';
        var data = this.state.user_nomine;
        if(data){
          var total_percentage = data.reduce((a,v) =>  a = a + v.alocation_percentage , 0 );
          var perc = $("input[name=n_perc]").val();
          total = parseInt(perc)+parseInt(total_percentage)
        }
        
        if(total<=100){
          if(this.state.user_nomine.length>2){
            toast.error("Limit Exceeded! Only three Nominee can be added.");
          }else{
            
           Axios.post("/prodigypro/api/additional_iin_nominee", nominee_data)
            .then((res) => { 
              console.log("ss",res.data.data.errors)
              if(res.data.data.errors){
                toast.error(res.data.data.errors[0]);
              }else{
                // this.setState({user:""})
                $("#gud_name").css({ "display": "none" });
                $("input[name=n_name]").val("");
                $("input[name=n_dob]").val("");
                $("select[name=n_rel]").val("");
                $("input[name=n_perc]").val("");
                $("input[name=n_gud]").val("");
                this.setState({user_nomine: res.data.data.data})
                 this.setState({nomine_count: res.data.data.data.length})
              }
            });
          }
        }else{
          toast.error("Total Allocation should be equal to 100%");
        }

    }
  }

  delete_nominee(e) {
    var hh = window.confirm("Do you want to delete");
    if(hh==true){
      const del_data = { id: e }
    
     Axios.post("/prodigypro/api/delete_nominee", del_data)
      .then((response) => {
          console.log(response.data);
          const get_nomine = {
            user_id:this.state.user_id,
          };
      
         Axios.post("/prodigypro/api/additional_iin_get_nomine",get_nomine)
          .then((res) => {
            if(res.data.data.status==400){
              this.setState({user_nomine:''})
              this.setState({nomine_count:0})
            }else{
              this.setState({user_nomine:res.data.data.data})
              this.setState({nomine_count: res.data.data.data.length})
            }
          });
        });
    }
  }

  edit_nominee(e) {

    for (var i = 0; i < this.state.user_nomine.length; i++) {
      console.log("user_nomine",this.state.user_nomine)
      var id = this.state.user_nomine[i].id;
      if (id == e) {
        $("input[name=n_id]").val(e)
        localStorage.setItem("nom_id", e);
        $("input[name=n_name]").val(this.state.user_nomine[i].nomini_name)
        $("input[name=n_dob]").val(this.state.user_nomine[i].dob)
        $("select#n_rel option[value='"+this.state.user_nomine[i].relation+"']")[0].selected = true; 
        $("input[name=n_perc]").val(this.state.user_nomine[i].alocation_percentage)
        
        if(this.state.user_nomine[i].guardian_name!=null){
          $("#gud_name").css({ "display": "block" });
          $("input[name=n_gud]").val(this.state.user_nomine[i].guardian_name)
        }else{
          $("#gud_name").css({ "display": "none" });
        }

        // $("#nn_3").css({ "display": "none" });
        $(".add_button").css({ "display": "none" });
        $(".update_button").css({ "display": "block" });
        $("#update_btn").css({ "display": "block" });
      }
    }
  }

  update_nominee = e => {
    const nom_data = {
      count: "0",
      id: localStorage.getItem("nom_id"),
      name: $("input[name=n_name]").val(),
      dob: $("input[name=n_dob]").val(),
      rel: $("select[name=n_rel]").val(),
      perc: $("input[name=n_perc]").val(),
      user_id: this.state.user_id,
      gud: $("input[name=n_gud]").val(),
    }

    if (this.nomineeFromValidation(nom_data)==0) {
      var data = this.state.user_nomine;
      if(data){
       var total =0;
       data.map((val) =>{
         if(val.id!=nom_data.id){
          // alert(val.alocation_percentage)
          total = parseInt(total)+parseInt(val.alocation_percentage)
         }
       })
      
        // var perc = $("input[name=n_perc]").val();
        total = parseInt(total)+parseInt(nom_data.perc)
       // alert(total);
      }

      if(total<=100){
      $(".update_button").html('Loading...');
     Axios.post("/prodigypro/api/additional_iin_update_nominee", nom_data)
      .then((response) => {

          const get_nomine = {
            user_id: this.state.user_id,
          };
      
         Axios.post("/prodigypro/api/additional_iin_get_nomine",get_nomine)
          .then((res) => {
             $("#gud_name").css({ "display": "none" });
            $("input[name=n_name]").val("");
            $("input[name=n_dob]").val("");
            $("select[name=n_rel]").val("");
            $("input[name=n_perc]").val("");
            $("input[name=n_gud]").val("");
            $(".update_button").html('Update');
            $(".add_button").css({ "display": "block" });
            $(".update_button").css({ "display": "none" });
            toast.success("Sucessfully Updated");
            localStorage.removeItem("nom_id");
            this.setState({user_nomine:res.data.data.data})
          });
          
        })
        .catch(err => console.log("err",err));
      }else{
        // $("#nn_3").css({ "display": "block" });
        toast.error("Total Allocation should be equal to 100%.");
      }
    }
  }

  next_nominee = e => {
    $("#nominee").css({ "display": "none" });
    $("#finish").css({ "display": "block" });
    $("#finish").css({ "opacity": 1 });
    $("#confirm").addClass("active");
  }

  nominee = e => {
    
    if (this.state.user_nomine.length > 0) {
     
      var total = '';
      var data = this.state.user_nomine;
      if(data){
        var total = data.reduce((a,v) =>  a = a + v.alocation_percentage , 0 );
      }
     
       if((total<100) || (total>100)){
        toast.error("Total Allocation should be equal to 100%");
      }else{
        const data = {
          user_id: this.state.user_id,
        }
        $("#nn_3").css({ "display": "none" });
        $("#next_3").css({ "display": "block" });
       Axios.post("/prodigypro/api/additional_iinCreate", data)
        .then(function (result_iin) {
          $("#nn_3").css({ "display": "block" });
          $("#next_3").css({ "display": "none" });
          console.log("result_iin",result_iin.data.data.status);
          if(result_iin.data.data.status==200){
           Axios.post("/prodigypro/api/additional_iin_fatca", data)
            .then(function (result_fatca) {
              console.log("result_fatca",result_fatca.data);
            });
  
            $("#nn_3").css({ "display": "block" });
            $("#next_3").css({ "display": "none" });
            $("#nominee").css({ "display": "none" });
            $("#finish").css({ "display": "block" });
            $("#finish").css({ "opacity": 1 });
            $("#confirm").addClass("active");

            if(localStorage.getItem("primary_pan")!=''){

              const userData = JSON.parse(localStorage.getItem("loginUserData"))          
              const data = {
                adminPan: userData.pan_card,
                memberPan:localStorage.getItem("primary_pan").toUpperCase(),
                email:userData.email,
                memberRelation: "Other",
              }

              Axios.post("/prodigypro/api/addIINFamilyGroup", data)
              .then(function (result) {
                console.log("result",result.data);
              });
            }
            // toast.success("Successfully");
          }else{
            toast.error(result_iin.data.data.data.error);
          }
        });
      }

    }else{
      toast.error("Minimum 1 Nominee!");
    }
    
  }

  nomineeValid(e){
    
    const nominee_data = {
     name:  $("input[name=n_name]").val(),
    }

    if (nominee_data.name != '') {
      toast.error("Limit Exceeded! Only three Nominee can be added.");
    }
    
  }

  handleShow() {
    //not_politically_err_n
    const get_nomine = {
      user_id:this.state.user_id,
      not_politically:$("input[name=not_politically_N]:checked").val(),
    };


    if(get_nomine.not_politically==1){
     Axios.post("/prodigypro/api/additional_iin_get_nomine",get_nomine)
      .then((response) => {
        this.setState({not_politically_err_n: ""})
        console.log("qq",response.data.data.status);
        $("#bank").css({ "display": "none" });
        $("#nominee").css({ "display": "block" });
        $("#nominee").css({ "opacity": 1 });
        $("#payment").addClass("active");
        this.setState({ modalState: false });
        if(response.data.data.status==400){
          this.setState({user_nomine:''})
          this.setState({nomine_count: 0})
        }else{
          this.setState({user_nomine:response.data.data.data})
          this.setState({nomine_count: response.data.data.data.length})
        }
      });
    }else{
     
      this.setState({not_politically_err_n: "Mandatory Field"})
    }
  }

  render() {
   
    let user_data = ''; let bank_list = ''; let country_list = '';

    
    if (this.state.get_bank_list) {
      bank_list = JSON.parse(this.state.get_bank_list);
    }

    if (this.state.get_country_list) {
      country_list = JSON.parse(this.state.get_country_list);
    }

    console.log("test",localStorage.getItem("taxStatus"))
    return (
      <>
        <Helmet>
          <title> Required Details Form</title>
        </Helmet>
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

            #holderRes2_block{
              display:block;
            }

            #holderRes2_none{
              display:none;
            }

            #res_block{
              display:block;
            }
            #gud_name{
              display:none;
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
            .alert-danger {
              color: #05270c;
              background-color: #28a74559;
              border-color: #28a74559;
            }
            #progressbar .active {
              color: #28a745;
            }
            #progressbar li.active:before, #progressbar li.active:after {
              background: #28a745;
            }
            .alert {
              position: relative;
              padding: .25rem 1.25rem;
            }
            .img-preview{
              border: 2px solid green;
              padding: 1px;
            }
            #img{
              display:none;
            }
             #pdf{
              display:none;
            }
            #brith_img{
              display:none;
            }
            #brith_pdf{
              display:none;
            }            
            #res{
              display:none;
            }
            #personal_data{
              float:left;
            }
            #joint_holder_1
            {
            float:left;
            }

            #joint_holder_2
            {
            float:left;
            }

            #bank
            {
            float:left;
            }

            #nominee
            {
            float:left;
            }

            #finish
            {
            float:left;
            }
            .form-bg{
              height:62em !important;
            }
             .progressBar{
              margin-right:-199px;
            }
              `}
            }
        </style>

        <ToastContainer position="top-right" className="mt-8" /> 
        {/* Page Wrapper */}
        <div id="wrapper">
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
          {/* Sidebar */}
          <Sidebar />
          {/* End of Sidebar */}
          {/* Content Wrapper */}
          <div id="content-wrapper" className="d-flex flex-column">
            {/* Main Content */}
            <div id="content">
              <ToastContainer position="top-right" className="mt-8" />
              {/* Topbar */}
              <Header />
              {/* End of Topbar */}
              <div className="container-fluid">
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item"><a href="home">Home</a></li>
                    <li className="breadcrumb-item active" aria-current="page">Required Details Form</li>
                  </ol>
                </nav>

              </div>
              <div className="row">
                <div className="col-xl-12 col-lg-12">
                  <div className="card shadow mb-3">
                    <div className="card-body form-bg">
                      <div className="col-12">

                        <div className="container-fluid m-0 p-0 parent-bg">
                          <div className="col-12 welcome-div-first"></div>
                        </div>
                        <div className="container-fluid">
                          <div className="col-md-8 offset-md-2 div-overlay">
                            <div className="card formbody">
                              <div className="card-body">
                                <form id="msform">
                                  {/* progressbar */}
                                  <ul id="progressbar" className={localStorage.getItem("taxStatus")=="Minor"?"text-center mb-4 progressBar":"text-center mb-4"}>
                                    <li className="active" id="account"><strong>Personal Details</strong></li>
                                    <li id="personal"><strong>Bank Details</strong></li>
                                    {localStorage.getItem("taxStatus")=="Minor"?null:<li id="payment"><strong>Nomination</strong></li>}
                                    
                                    <li id="confirm"><strong>Success</strong></li>
                                  </ul>


                  {/* Personal Details */}
                  <fieldset id="personal_data">
                    <div className="row">
                      <div className="col-md-12 mb-4">
                        <div className="alert alert-danger" role="alert">
                          <span className="para">Primary Holder's Details :</span>
                          {/* <span className="para pull-right">Step 1 - 4</span> */}
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-4 mb-4">
                        <span className="has-float-label">
                          <input className="form-control input-text" id="mail-id" type="email" name="email" placeholder="Enter Mail Id"  onKeyUp={this.onChange} required />
                          <label for="mail-id" className="text-label">Email Id</label>
                        </span>
                        <small className="text-danger pull-left">{this.state.Emailtext}</small>
                      </div>

                      <div className="col-md-4 mb-4">
                        <span className="has-float-label">
                          <input className="form-control input-text" name="dob" id="dob" type="date" value={user_data.dob} onChange={this.onChange} />
                          <label for="dob" className="text-label">Date Of Birth</label>
                        </span>
                        <small className="text-danger pull-left">{this.state.Dobtext}</small>
                      </div>

                      <div className="col-md-4 mb-4">
                        <span className="has-float-label">
                          <input className="form-control input-text" name="pob" id="pob" type="text" value={user_data.pob} placeholder="Place Of Birth" required onKeyUp={this.onChange} />
                          <label for="pob" className="text-label">Place Of Birth</label>
                        </span>
                        <small className="text-danger pull-left">{this.state.Pobtext}</small>
                      </div>
                    </div>
                    <div id={localStorage.getItem("taxStatus") == "Minor" ? "res_block": "res_none" } >
                      <div className="row">
                       

                        <div className="col-md-4 mb-4">
                          <span className="has-float-label">
                            <input className="form-control input-text" name="guardian_name" id="guardian_name" type="text"  onChange={this.onChange}  placeholder="Enter Guardian Name"/>
                            <label for="guardian_name" className="text-label">Guardian Name</label>
                          </span>
                          <small className="text-danger pull-left">{this.state.guardian_nametext}</small>
                        </div>

                        <div className="col-md-4 mb-4">
                          <span className="has-float-label">
                            <input className="form-control input-text" name="guardian_dob" id="guardian_dob" type="date"  placeholder="Guardian Date Of Birth" required onKeyUp={this.onChange} />
                            <label for="guardian_dob" className="text-label">Guardian Date Of Birth</label>
                          </span>
                          <small className="text-danger pull-left">{this.state.guardian_dobtexr}</small>
                        </div>
                        <div className="col-md-4 mb-4">
                      <span className="has-float-label">
                          {/* <input className="form-control input-text" id="inc_range" type="text" placeholder="Enter Your DOB"/> */}
                          <select className="form-control input-text" name="relation_with_admin" id="relation_with_admin" onChange={this.onChange}>
                            <option value="">Select</option>
                            <option value="Father">Father</option>
                            <option value="Mother">Mother</option>
                            <option value="Legal Guardian">Legal Guardian</option>
                          </select>
                          <label for="relation_with_admin" className="text-label">Relationship With Minor</label>
                        </span>
                        <small className="text-danger pull-left">{this.state.relationText}</small>
                      </div>
                      </div>
                    </div>

                    <div className="row">
                    <div className="col-md-4 mb-4">
                          <span className="has-float-label">
                            <input className="form-control input-text" id="mobileNo" type="text" name="mobileNo" placeholder="Enter Mobile No" onKeyUp={this.onChange} required />
                            <label for="mobileNo" className="text-label">Mobile No</label>
                          </span>
                          <small className="text-danger pull-left">{this.state.mobileNotext}</small>
                        </div>

                      <div className="col-md-4 mb-4">
                        <span className="has-float-label">
                          <select className="form-control input-text" name="occupation" id="occupation" onChange={this.onChange}>
                            <option value="">Select</option>
                            {this.state.getOccupation ?
                              this.state.getOccupation.map((item, key) =>
                                <option value={item.id} selected={item.id == user_data.occupation}>{item.title}</option>
                              ) : null}
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
                            {this.state.get_income ?
                              this.state.get_income.map((item, key) =>
                                <option value={item.id} selected={item.id == user_data.inc_range}>{item.range}</option>
                              ) : null}
                          </select>
                          <label for="inc_range" className="text-label">Income Range</label>
                        </span>
                        <small className="text-danger pull-left">{this.state.Incometext}</small>
                      </div>

                      
                      <div className="col-md-4 mb-4">
                        <p className="text-label mb-1 p-radio">Residential Status </p>                                             
                        <label for="indian" className="text-label" id={ localStorage.getItem("taxStatus") == "NRI" ? "res": "null" }> <input className="input-text" id="indian" type="radio" name="resident" value="1" onChange={this.onChange} defaultChecked={(localStorage.getItem("taxStatus") == "Individual") || (localStorage.getItem("taxStatus") == "Minor")  ? "checked": "null" }  />
                       Resident Indian</label>

                       <label for="nri" className="text-label" id={ localStorage.getItem("taxStatus") == "Individual" ||  localStorage.getItem("taxStatus") == "Minor" ? "res": "null" }> <input className="input-text ml-3" value="0" id="nri" type="radio"  name="resident" onChange={this.onChange} defaultChecked={ localStorage.getItem("taxStatus") == "NRI" ? "checked": null }  />
                       NRI</label>
                        <small className="text-danger pull-left">{this.state.residenttext}</small>
                      </div>
                    </div>

                    <div className={localStorage.getItem("taxStatus") == "NRI" && localStorage.getItem("taxStatus") == "Minor" ? "display-check-ind fadeIn": "null" } id={user_data.resident == "1" ? "res_block" : ""}  >
                      <div className="row">
                        <div className="col-md-12">
                          <div className="alert alert-info" role="alert">
                            <span className="para">Address As Per KYC</span>
                          </div>
                        </div>
                        <div className="col-md-4 mb-4">
                          <span className="has-float-label">
                            <input className="form-control input-text" id="numberField" name="pin" maxLength="6" value={user_data.pin ? user_data.pin : null} type="text" placeholder="Enter PIN Code" onKeyUp={this.onChange} />
                            <label for="pin" className="text-label">Enter PIN Code</label>
                          </span>
                          <small className="text-danger pull-left pin_load">{this.state.Pintext}</small>
                        </div>

                        <div className="col-md-4 mb-4">
                          <span className="has-float-label">
                            <input className="form-control input-text" name="address" value={user_data.address ? user_data.address : null} id="address" type="text" placeholder="Same Address As Per Documents" onKeyUp={this.onChange} />
                            <label for="address" className="text-label">Enter Address</label>
                          </span>
                          <small className="text-danger pull-left">{this.state.Addrext}</small>
                        </div>

                        <div className="col-md-4 mb-4">
                          <span className="has-float-label">
                            <input className="form-control input-text" name="landmark" value={user_data.landmark ? user_data.landmark : null} id="landmark" type="text" placeholder="Enter Landmark" onKeyUp={this.onChange} />
                            <label for="landmark" className="text-label">Enter Landmark</label>
                          </span>
                          <small className="text-danger pull-left">{this.state.Landmarkrext}</small>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-4 mb-4">
                          <span className="has-float-label">
                            <input className="form-control input-text" name="city" id="city" value={user_data.city ? user_data.city : null} type="text" placeholder="City" onKeyUp={this.onChange} />
                            <label for="City" className="text-label">City</label>
                          </span>
                          <small className="text-danger pull-left">{this.state.Citytext}</small>
                        </div>

                        <div className="col-md-4 mb-4">
                          <span className="has-float-label">
                            <input className="form-control input-text" name="state" value={user_data.state ? user_data.state : null} id="state" type="text" placeholder="State" onKeyUp={this.onChange} />
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
                              {country_list ?
                                country_list.map((item, key) =>
                                  <option value={item.id} selected={this.state.Country == item.name}>{item.name}</option>
                                ) : null}
                            </select>

                          </span>
                          <small className="text-danger pull-left">{this.state.Countrytext}</small>
                        </div>
                      </div>

                    </div>

                    <div className={localStorage.getItem("taxStatus") == "Individual" ||  localStorage.getItem("taxStatus") == "Minor"  ? "display-check-nri fadeIn": "null" } id={user_data.resident == "1" ? "res_block" : "res_none"} id={user_data.resident == "0" ? "res_block" : ""}>
                      <div className="row">
                        <div className="col-md-12">
                          <div className="alert alert-danger" role="alert">
                            <span className="para">Address As Per KYC</span>
                          </div>
                        </div>
                        <div className="col-md-4 mb-4">
                          <span className="has-float-label">
                            <input className="form-control input-text" id="pin" name="npin" type="text"  maxLength="6" placeholder="Enter PIN Code" value={user_data.npin ? user_data.npin : null} onKeyUp={this.onChange} />
                            <label for="pin" className="text-label">Enter PIN Code</label>
                          </span>
                          <small className="text-danger pull-left npin_load">{this.state.nPintext}</small>
                        </div>

                        <div className="col-md-4 mb-4">
                          <span className="has-float-label">
                            <input className="form-control input-text" name="naddress" id="address" type="text" placeholder="Same Address As Per Documents" value={user_data.naddress ? user_data.naddress : null} onKeyUp={this.onChange} />
                            <label for="address" className="text-label">Enter Address</label>
                          </span>
                          <small className="text-danger pull-left">{this.state.nAddrext}</small>
                        </div>

                        <div className="col-md-4 mb-4">
                          <span className="has-float-label">
                            <input className="form-control input-text" name="nlandmark" id="landmark" type="text" value={user_data.nlandmark ? user_data.nlandmark : null} placeholder="Enter Landmark" onKeyUp={this.onChange} />
                            <label for="landmark" className="text-label">Enter Landmark</label>
                          </span>
                          <small className="text-danger pull-left">{this.state.nLandmarkrext}</small>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-4 mb-4">
                          <span className="has-float-label">
                            <input className="form-control input-text" name="ncity" id="city" type="text" placeholder="City" value={user_data.ncity ? user_data.ncity : null} onKeyUp={this.onChange} />
                            <label for="City" className="text-label">City</label>
                          </span>
                          <small className="text-danger pull-left">{this.state.nCitytext}</small>
                        </div>

                        <div className="col-md-4 mb-4">
                          <span className="has-float-label">
                            <input className="form-control input-text" name="nstate" id="state" type="text" value={user_data.nstate ? user_data.nstate : null} placeholder="State" onKeyUp={this.onChange} />
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
                              {country_list ?
                                country_list.map((item, key) =>
                                  <option value={item.id} selected={this.state.nCountry == item.name}>{item.name}</option>
                                ) : null}
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
                            <input className="form-control input-text" id="nri_pin" name="nri_pin" value={user_data.nri_pin ? user_data.nri_pin : null} type="text" placeholder="Enter PIN Code" maxlength="6" onKeyUp={this.onChange} />
                            <label for="nri_pin" className="text-label">Enter PIN Code</label>
                          </span>
                          <small className="text-danger pull-left">{this.state.nri_Pintext}</small>
                        </div>

                        <div className="col-md-4 mb-4">
                          <span className="has-float-label">
                            <input className="form-control input-text" name="nri_address" id="nri_address" value={user_data.nri_address ? user_data.nri_address : null} type="text" placeholder="Same Address As Per Documents" onKeyUp={this.onChange} />
                            <label for="nri_address" className="text-label">Enter Address</label>
                          </span>
                          <small className="text-danger pull-left">{this.state.nri_Addrext}</small>
                        </div>

                        <div className="col-md-4 mb-4">
                          <span className="has-float-label">
                            <input className="form-control input-text" name="nri_landmark" id="nri_landmark" value={user_data.nri_landmark ? user_data.nri_landmark : null} type="text" placeholder="Enter Landmark" onKeyUp={this.onChange} />
                            <label for="nri_landmark" className="text-label">Enter Landmark</label>
                          </span>
                          <small className="text-danger pull-left">{this.state.nri_Landmarkrext}</small>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-4 mb-4">
                          <span className="has-float-label">
                            <input className="form-control input-text" name="nri_city" id="nri_city" value={user_data.nri_city ? user_data.nri_city : null} type="text" placeholder="City" onKeyUp={this.onChange} />
                            <label for="nri_City" className="text-label">City</label>
                          </span>
                          <small className="text-danger pull-left">{this.state.nri_Citytext}</small>
                        </div>

                        <div className="col-md-4 mb-4">
                          <span className="has-float-label">
                            <input className="form-control input-text" name="nri_state" id="nri_state" value={user_data.nri_state ? user_data.nri_state : null} type="text" placeholder="State" onKeyUp={this.onChange} />
                            <label for="nri_state" className="text-label">State</label>
                          </span>
                          <small className="text-danger pull-left">{this.state.nri_Statetext}</small>
                        </div>

                        <div className="col-md-4 mb-4">
                          <span className="has-float-label">
                            <input className="form-control input-text" name="nri_country" id="nri_country" value={user_data.nri_country ? user_data.nri_country : null} type="text" placeholder="Country" onKeyUp={this.onChange} />
                            <label for="nri_country" className="text-label">Country</label>

                          </span>
                          <small className="text-danger pull-left">{this.state.nri_Countrytext}</small>
                        </div>
                      </div>
                    </div>

                    
                     <div className="row">
                        <div className="col-md-12 md-12">
                          <input id="tax_payer" type="checkbox" name="tax_payer" value="1"  />&nbsp;&nbsp;
                          <label for="tax_payer" className="text-label">I am not Tax Payer of any other country except india.</label>
                         
                        </div>
                        <div className="col-md-12 md-12">
                          <input id="not_politically" type="checkbox" name="not_politically_N" value="1" onKeyUp={this.onChange} />&nbsp;&nbsp;
                          <label for="not_politically" className="text-label">I here by declare that i am not a politically exposed person. </label><br></br>
                          <small className="text-danger">{this.state.not_politically_err_n}</small>
                        </div>
                      </div>
                      <Link to="/prodigypro/dashboard/required-document-info-yes-dash" class="btn-theme-1 btn-theme-effect action-button pull-left btn-color-red">
                      <span class="button-text">Back</span>
                      <span class="round"><i class="fa fa-chevron-left"></i></span>
                    </Link>

                    &nbsp;
                    &nbsp;

                    <a href='/prodigypro/dashboard' class="btn-theme-1 btn-theme-effect action-button pull-left btn-color-red" >
                      <span class="button-text">Home</span>
                      <span class="round"><i class="fa fa-chevron-left"></i></span>
                    </a>


                    <a class="btn-theme-1 btn-theme-effect action-button pull-right btn-color-green" id="nn_1" type="button" onClick={this.persnalDetail}>
                      <span class="button-text">Save & Continue</span>
                      <span class="round"><i class="fa fa-chevron-right"></i></span>
                    </a>

                    <a class="btn-theme-1 btn-theme-effect action-button pull-right btn-color-green" id="next_1" type="button" >
                      <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
                      <span class="button-text"> Loading...</span>
                    </a>
                   

                  </fieldset>

                  {/* Joint holder 1 Details */}
                  {localStorage.getItem("jointHolder1") ?
                    <fieldset id="joint_holder_1">
                      <div className="row">
                        <div className="col-md-12 mb-4">
                          <div className="alert alert-danger" role="alert">
                            <span className="para">Second Holder,s Details :</span>
                            <input type="hidden" name="joint_holder_1" value="1" />
                            {/* <span className="para pull-right">Step 1 - 4</span> */}
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-4 mb-4">
                          <span className="has-float-label">
                            <input className="form-control input-text" id="mail-id" type="holder_pan_1" name="holder_pan_1" value={localStorage.getItem("jointHolder1").toUpperCase()} onKeyUp={this.valid} readOnly required />
                            <label for="mail-id" className="text-label">Pan Number</label>
                          </span>
                        </div>
                        <div className="col-md-4 mb-4">
                          <span className="has-float-label">
                            <input className="form-control input-text" id="mail-id" type="holderName_1" name="holderName_1" value={localStorage.getItem("jointHolderName1")} readOnly required />
                            <label for="mail-id" className="text-label">Holder Name</label>
                          </span>

                        </div>
                        <div className="col-md-4 mb-4">
                          <span className="has-float-label">
                            <input className="form-control input-text" id="holder_phon_1" type="holder_phon_1" name="holder_phon_1" placeholder="Enter Mobile No" onKeyUp={this.valid} />
                            <label for="holder_phon_1" className="text-label">Mobile Number</label>
                          </span>
                          <small className="text-danger">{this.state.holder_1phontext}</small>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-4 mb-4">
                          <span className="has-float-label">
                            <input className="form-control input-text" id="holderEmail_1" type="email" name="holderEmail_1" placeholder="Enter Mail Id" onKeyUp={this.valid} required />
                            <label for="holderEmail_1" className="text-label">Email Id</label>
                          </span>
                          <small className="text-danger pull-left">{this.state.holder_1Emailtext}</small>
                        </div>
                        <div className="col-md-4 mb-4">
                          <span className="has-float-label">
                            <input className="form-control input-text" name="holderDob_1" id="holderDob_1" type="date" onChange={this.valid} />
                            <label for="holderDob_1" className="text-label">Date Of Birth</label>
                          </span>
                          <small className="text-danger pull-left">{this.state.holder_1Dobtext}</small>
                        </div>
                        <div className="col-md-4 mb-4">
                          <span className="has-float-label">
                            <input className="form-control input-text" name="holderPob_1" id="holderPob_1" type="text" value={user_data.pob} placeholder="Place Of Birth" required onKeyUp={this.valid} />
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
                              {this.state.getOccupation ?
                                this.state.getOccupation.map((item, key) =>
                                  <option value={item.id} selected={item.id == user_data.occupation}>{item.title}</option>
                                ) : null}
                            </select>
                            <label for="holderOccup_1" className="text-label">Select Occupation</label>
                          </span>
                          <small className="text-danger pull-left">{this.state.holder_1Occutext}</small>
                        </div>
                        <div className="col-md-4 mb-4">
                          <span className="has-float-label">
                            <select className="form-control input-text" name="holderInc_range_1" id="holderInc_range_1" onChange={this.valid}>
                              <option value="">Select</option>
                              {this.state.get_income ?
                                this.state.get_income.map((item, key) =>
                                  <option value={item.id} selected={item.id == user_data.inc_range}>{item.range}</option>
                                ) : null}
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
                          <input id="tax_payer" type="checkbox" name="tax_payer" value="1" onChange={this.valid} />&nbsp;&nbsp;
                          <label for="tax_payer" className="text-label">I here by declare that i am not a politically exposed person.</label>
                          <small className="text-danger">{this.state.tax_err}</small>
                        </div>
                        <div className="col-md-12 md-12">
                          <input id="not_politically" type="checkbox" name="not_politically" value="1" onChange={this.valid} />&nbsp;&nbsp;
                          <label for="not_politically" className="text-label">I am not Tax Payer of any other country except india. </label>
                          <small className="text-danger">{this.state.not_politically_err}</small>
                        </div>
                      </div>

                      <a class="btn-theme-1 btn-theme-effect action-button pull-right btn-color-green"  type="button" onClick={this.jointHolde_1_Detail}>
                        <span class="button-text" id="jointnn_1">Save & Continue</span>
                        <span class="round"><i class="fa fa-chevron-right"></i></span>
                      </a>

                      <a class="btn-theme-1 btn-theme-effect previous action-button-previous" type="submit" disabled>
                        <span class="button-text">Previous</span>
                        <span class="round"><i class="fa fa-chevron-left"></i></span>
                      </a>

                    </fieldset>
                    : null}

                  {/* Joint holder 2 Details */}
                  {localStorage.getItem("jointHolder2")?
                    <fieldset id="joint_holder_2">
                      <div className="row">
                        <div className="col-md-12 mb-4">
                          <div className="alert alert-danger" role="alert">
                            <span className="para">Third Holder,s Details :</span>

                            {localStorage.getItem("jointHolder1") ? <input type="hidden" name="joint_holder_2" value="2" /> : <input type="hidden" name="joint_holder_2" value="1" />}
                            {/* <span className="para pull-right">Step 1 - 4</span> */}
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-4 mb-4">
                          <span className="has-float-label">
                            <input className="form-control input-text" id="mail-id" type="holder_pan_2" name="holder_pan_2" value={localStorage.getItem("jointHolder2").toUpperCase()} readOnly required />
                            <label for="mail-id" className="text-label">Pan Number</label>
                          </span>
                        </div>
                        <div className="col-md-4 mb-4">
                          <span className="has-float-label">
                            <input className="form-control input-text" id="mail-id" type="holderName_2" name="holderName_2" value={localStorage.getItem("jointHolderName2")} readOnly required />
                            <label for="mail-id" className="text-label">Holder Name</label>
                          </span>
                        </div>
                        <div className="col-md-4 mb-4">
                          <span className="has-float-label">
                            <input className="form-control input-text" id="holder_phon_2" type="holder_phon_2" name="holder_phon_2" placeholder="Enter Mobile No" onKeyUp={this.valid2} />
                            <label for="holder_phon_2" className="text-label">Mobile Number</label>
                          </span>
                          <small className="text-danger">{this.state.holder_2phontext}</small>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-4 mb-4">
                          <span className="has-float-label">
                            <input className="form-control input-text" id="holderEmail_2" type="email" name="holderEmail_2" placeholder="Enter Mail Id" onKeyUp={this.valid2} required />
                            <label for="holderEmail_2" className="text-label">Email Id</label>
                          </span>
                          <small className="text-danger pull-left">{this.state.holder_2Emailtext}</small>
                        </div>
                        <div className="col-md-4 mb-4">
                          <span className="has-float-label">
                            <input className="form-control input-text" name="holderDob_2" id="holderDob_2" type="date" onChange={this.valid2} />
                            <label for="holderDob_2" className="text-label">Date Of Birth</label>
                          </span>
                          <small className="text-danger pull-left">{this.state.holder_2Dobtext}</small>
                        </div>
                        <div className="col-md-4 mb-4">
                          <span className="has-float-label">
                            <input className="form-control input-text" name="holderPob_2" id="holderPob_2" type="text" value={user_data.pob} placeholder="Place Of Birth" required onKeyUp={this.valid2} />
                            <label for="holderPob_2" className="text-label">Place Of Birth</label>
                          </span>
                          <small className="text-danger pull-left">{this.state.holder_2Pobtext}</small>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-4 mb-4">
                          <span className="has-float-label">
                            <select className="form-control input-text" name="holderOccup_2" id="holderOccup_2" onChange={this.valid2}>
                              <option value="">Select</option>
                              {this.state.getOccupation ?
                                this.state.getOccupation.map((item, key) =>
                                  <option value={item.id} selected={item.id == user_data.occupation}>{item.title}</option>
                                ) : null}
                            </select>
                            <label for="holderOccup_2" className="text-label">Select Occupation</label>
                          </span>
                          <small className="text-danger pull-left">{this.state.holder_2Occutext}</small>
                        </div>
                        <div className="col-md-4 mb-4">
                          <span className="has-float-label">
                            <select className="form-control input-text" name="holderInc_range_2" id="holderInc_range_2" onChange={this.valid2}>
                              <option value="">Select</option>
                              {this.state.get_income ?
                                this.state.get_income.map((item, key) =>
                                  <option value={item.id} selected={item.id == user_data.inc_range}>{item.range}</option>
                                ) : null}
                            </select>
                            <label for="holderInc_range_2" className="text-label">Income Range</label>
                          </span>
                          <small className="text-danger pull-left">{this.state.holder_2Incometext}</small>
                        </div>
                        <div className="col-md-4 mb-4">
                          <p className="text-label mb-1 p-radio">Residential Status </p>
                          <input className="input-text" id="holderIndian_2" type="radio" name="holderResident_2" value="1" onChange={this.valid2} />
                          <label for="holderIndian_2" className="text-label">Resident Indian</label>
                          <input className="input-text ml-3" value="0" id="holderNri_2" type="radio" name="holderResident_2" onChange={this.valid2} />
                          <label for="holderNri_2" className="text-label">NRI</label>
                          <small className="text-danger pull-left">{this.state.holderResidenttext_2}</small>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-12 md-12">
                          <input id="tax_payer2" type="checkbox" name="tax_payer2" value="1" onChange={this.valid2} />&nbsp;&nbsp;
                          <label for="tax_payer2" className="text-label">I here by declare that i am not a politically exposed person.</label>
                          <small className="text-danger">{this.state.tax_err2}</small>
                        </div>
                        <div className="col-md-12 md-12">
                          <input id="not_politically2" type="checkbox" name="not_politically2" value="1" onChange={this.valid2} />&nbsp;&nbsp;
                          <label for="not_politically2" className="text-label">I am not Tax Payer of any other country except india. </label>
                          <small className="text-danger">{this.state.not_politically_err2}</small>
                        </div>
                      </div>

                      <a class="btn-theme-1 btn-theme-effect action-button pull-right btn-color-green" id="jointnn_2" type="button" onClick={this.jointHolde_2_Detail}>
                        <span class="button-text">Save & Continue</span>
                        <span class="round"><i class="fa fa-chevron-right"></i></span>
                      </a>

                      <a class="btn-theme-1 btn-theme-effect previous action-button-previous" type="submit" disabled>
                        <span class="button-text">Previous</span>
                        <span class="round"><i class="fa fa-chevron-left"></i></span>
                      </a>
                    </fieldset>
                    : null}

                  {/* Bank Details  */}
                  <fieldset id="bank" >
                    <div className="row">
                      <div className="col-md-12 mb-4">
                        <div className="alert alert-danger" role="alert">
                          <span className="para">Bank Details of Primary Holder :</span>
                          {/* <span className="para pull-right">Step 2 - 4</span> */}
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-4 mb-4">
                        <span className="has-float-label">
                          <input className="form-control input-text" id="acc-num" type="text" name="acc_num" placeholder="Enter Account Number" required onKeyUp={this.onChange} 
                            onCut={this.handleChange}
                            onCopy={this.handleChange}
                            onPaste={this.handleChange}/>
                          <label for="acc-num" className="text-label">Account Number</label>
                        </span>
                        <small className="text-danger pull-left">{this.state.acc_num_err}</small>
                      </div>

                      <div className="col-md-4 mb-4">
                        <span className="has-float-label">
                          <input className="form-control input-text" id="cnf-acc-num" type="text" name="cnf_acc_num" placeholder="Confirm Account Number" required onKeyUp={this.onChange} onCut={this.handleChange}
                            onCopy={this.handleChange}
                            onPaste={this.handleChange}/>
                          <label for="cnf-acc-num" className="text-label">Confirm Account Number</label>
                        </span>
                        <small className="text-danger pull-left">{this.state.cnf_acc_num_err}</small>
                      </div>

                      <div className="col-md-4 mb-4">
                        <span className="has-float-label">
                          <select className="form-control input-text" name="acc_type" id="acc-type" onChange={this.onChange}>
                            <option value="">Select</option>
                            {this.state.get_AccountType ?
                              this.state.get_AccountType.map((item, key) =>
                                <option value={item.id} selected={item.id == user_data.acc_type}>{item.description}</option>
                              ) : null}
                          </select>
                          <label for="acc-type" className="text-label">Choose Bank Account Type</label>
                        </span>
                        <small className="text-danger pull-left">{this.state.acc_type_err}</small>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-4 mb-4">
                        <span className="has-float-label">
                          <input className="form-control input-text" name="ifsc" id="ifsc" type="text" placeholder="Enter IFSC Code" onKeyUp={this.onChange} 
                          onCut={this.handleChange}
                          onCopy={this.handleChange}
                          onPaste={this.handleChange}/>
                          <label for="ifsc" className="text-label">IFSC Code</label>
                        </span>
                        <small className="text-danger pull-left">{this.state.ifsc_err}</small>
                      </div>

                      <div className="col-md-4 mb-4">
                        <span className="has-float-label">
                          <select className="form-control input-text" name="bank_name" id="bank-name" onChange={this.onChange}>
                            <option value="">Select</option>
                            {bank_list ?
                              bank_list.map((item, key) =>

                                <option value={item.BANK_NAME} selected={item.BANK_NAME == user_data.bank_name}>{item.BANK_NAME}</option>
                              ) : null}
                          </select>
                          <label for="bank-name" className="text-label">Choose Bank Name</label>
                        </span>
                        <small className="text-danger pull-left">{this.state.bank_name_err}</small>
                      </div>

                      {bank_list ?
                        bank_list.map((item, key) =>
                          item.BANK_NAME == this.state.bb_code ?
                            <input value={item.BANK_CODE} name="bank_code" id="bank_code" type="hidden" />
                            : null
                        ) : null}

                      <div className="col-md-4 mb-4">
                        <span className="has-float-label">
                          <input className="form-control input-text" name="branch" id="branch" type="text" placeholder="Branch" onKeyUp={this.onChange} />
                          <label for="branch" className="text-label">Branch</label>
                        </span>
                        <small className="text-danger pull-left">{this.state.branch_err}</small>
                      </div>
                    </div>

                    <div className="row py-4">
                        {/* Upload image input*/}
                        {/* <div className="input-group mb-3 form-control input-text">
                          <input id="upload" type="file" name="image" onchange={this.onFileChange} className="form-control" />
                          <label id="upload-label" htmlFor="upload" className="text-muted">Upload Cancelled Cheque/Bank Statement/Passbook</label>

                          <div className="input-group-append">
                            <label htmlFor="upload" className="btn m-0 p-0"> <i className="fa fa-cloud-upload mr-2 text-muted" /><small className="text-uppercase font-weight-bold text-muted">Choose file</small></label>
                          </div>
                        </div> */}

                        {/* Uploaded image area*/}
                        {/* <p className="font-italic text-white text-center">The uploaded image be rendered inside the box below.</p>
                        <div className="image-area mt-4"><img id="imageResult" src="#" alt="" className="img-fluid rounded shadow-sm mx-auto d-block" /></div> */}
                      <div className="col-lg-4 mb-3">
                        {/* <label for="branch" className="text-label">Upload Cheque</label> */}
                         <span className="has-float-label">
                          <select className="form-control input-text" name="upload_type" id="upload_type" onChange={this.onChange}>
                            <option value="">Select</option>
                           
                            <option value="CH"> Upload Cancelled Cheque</option>
                            <option value="S"> Bank Statement</option>
                            <option value="PH"> Passbook</option>
                            
                          </select>
                          <label for="acc-type" className="text-label">Upload Cancel Cheque</label>
                        </span>
                        <small className="text-danger pull-left">{this.state.upload_type_err}</small>
                        <br></br>

                        <input type="file" id="filePhoto" class="form-control required borrowerImageFile" name="image" />
                        <small>Allowed File Type: </small> <small class="font-weight-bold"> JPG,JPEG,PNG,PDF</small>
                        <small className="text-danger pull-left">{this.state.image_err}</small>
                      </div>

                      <div className="col-lg-8 mb-3" id="img">
                        <div className="img-preview-container">
                          <a href="#" data-toggle="modal" data-target="#previewImgPopup"><img id="previewHolder" class="img-preview w-100" height="180px"/></a>
                        </div>
                      </div>


                      <div className="col-lg-8 mb-3" id="pdf">
                        <div className="img-preview-container">
                         <embed src="" id="previewHolderpdf" type="application/pdf" width="100%"/><br></br>
                          <a href="#" data-toggle="modal"  class="btn-theme-1 btn-theme-effect action-button  btn-color-blue" data-target="#previewImgPopuppdf">   
                          <span class="button-text">View Pdf</span>
                          <span class="round"><i class="fa fa-chevron-right"></i></span>
                          </a>
                        </div>
                      </div>

                    </div>


                    {localStorage.getItem("taxStatus")=="Minor"?
                    <div className="row py-4">
                        
                      <div className="col-lg-4 mb-3">
                        {/* <label for="branch" className="text-label">Upload Cheque</label> */}
                         <span className="has-float-label">
                          <select className="form-control input-text" name="upload_type" id="upload_type" onChange={this.onChange}>
                            <option value="">Select</option>
                           
                            <option value="AA">Aadhar card</option>
                            <option value="AA"> Birth Certificate</option>
                            <option value="PA"> Passport</option>
                            
                          </select>
                          <label for="acc-type" className="text-label">Brith Proof</label>
                        </span>
                         {/* <small className="text-danger pull-left">{this.state.upload_type_err}</small> */}
                        <br></br>

                        <input type="file" id="brith_filePhoto" class="form-control required borrowerImageFile" name="brith_image" />
                        <small>Allowed File Type: </small> <small class="font-weight-bold"> JPG,JPEG,PNG,PDF</small>
                       {/* <small className="text-danger pull-left">{this.state.image_err}</small> */}
                      </div>

                      <div className="col-lg-8 mb-3" id="brith_img">
                        <div className="img-preview-container">
                          <a href="#" data-toggle="modal" data-target="#previewImgPopup"><img id="brith_previewHolder" class="img-preview w-100" height="180px"/></a>
                        </div>
                      </div>


                      <div className="col-lg-8 mb-3" id="brith_pdf">
                        <div className="img-preview-container">
                         <embed src="" id="brith_previewHolderpdf" type="application/pdf" width="100%"/><br></br>
                          <a href="#" data-toggle="modal"  class="btn-theme-1 btn-theme-effect action-button  btn-color-blue" data-target="#previewImgPopuppdf">   
                          <span class="button-text">View Pdf</span>
                          <span class="round"><i class="fa fa-chevron-right"></i></span>
                          </a>
                        </div>
                      </div>

                    </div>
                    :null}

                    <a class="btn-theme-1  btn-theme-effect action-button pull-right btn-color-green" type="submit" id="nn_2" onClick={this.bankDetails}>
                      <span class="button-text">Save & Continue</span>
                      <span class="round"><i class="fa fa-chevron-right"></i></span>
                    </a>

                    <a class="btn-theme-1 btn-theme-effect action-button pull-right btn-color-green" id="next_2" type="button" >
                      <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
                    </a>

                    <a class="btn-theme-1 btn-theme-effect previous action-button-previous" type="submit" disabled>
                      <span class="button-text">Previous</span>
                      <span class="round"><i class="fa fa-chevron-left"></i></span>
                    </a>


                {/*Preview Image popup Modal */}
                <div className="modal fade" id="previewImgPopup" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog">
                          <div className="modal-content">
                            <div className="modal-header">
                              {/* <h5 className="modal-title" id="exampleModalLabel">Modal title</h5> */}
                              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                              </button>
                            </div>
                            <div className="modal-body">
                            {/* <img src="https://us.123rf.com/450wm/jovanas/jovanas1607/jovanas160700565/64248526-demo-sign-icon.jpg?ver=6" className="w-100"/> */}
                            <img id="modalpreviewHolder" class="img-preview" className="w-100"/>
                            </div>
                          </div>
                        </div>
                      </div>

                       {/* Preview pdf popup Modal */}
                <div className="modal fade" id="previewImgPopuppdf" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog">
                          <div className="modal-content">
                            <div className="modal-header">
                              {/* <h5 className="modal-title" id="exampleModalLabel">Modal title</h5> */}
                              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                              </button>
                            </div>
                            <div className="modal-body">
                            {/* <img src="https://us.123rf.com/450wm/jovanas/jovanas1607/jovanas160700565/64248526-demo-sign-icon.jpg?ver=6" className="w-100"/> */}
                           
                            <embed src="" id="modalpreviewHolderpdf" type="application/pdf" width="100%" height="600px" />
                            </div>
                          </div>
                        </div>
                      </div>
                  </fieldset>
                 
                  {/* add nominee */}
                  {localStorage.getItem("taxStatus")!="Minor"?
                  <fieldset id="nominee"  >
                    <div className="row">
                      <div className="col-md-12 ">
                        <div className="alert alert-danger" role="alert">
                          <span className="para">Nominee :</span>
                          {/* <span className="para pull-right">Step 3 - 4</span> */}
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-4 mb-4">
                        {(this.state.nomine_count==3)?
                            <span className="has-float-label mb-2">
                              <input className="form-control input-text" id="n_name" name="n_name" type="text" placeholder="Enter Nominee Name"  onKeyUp={this.nomineeValid}/>
                              <label for="n_name" className="text-label">Name</label>
                            </span>
                        : <span className="has-float-label mb-2">
                        <input className="form-control input-text" id="n_name" name="n_name" type="text" placeholder="Enter Nominee Name"  />
                        <label for="n_name" className="text-label">Name</label>
                      </span>}
                        <small class="text-danger">{this.state.n_name_err}</small> 
                      </div>
                      <div className="col-md-4 mb-4">
                        <span className="has-float-label mb-2">
                          <input className="form-control input-text" id="n_dob" name="n_dob"  type="date" placeholder="Enter Nominee DOB" onChange={this.datehandle}/>
                          <label for="n_dob" className="text-label">Date Of Birth</label>
                        </span>
                        <small class="text-danger">{this.state.n_dob_err}</small>
                      </div>
                      <div className="col-md-4 mb-4">
                        <span className="has-float-label mb-2">
                          <select className="form-control input-text" name="n_rel" id="n_rel">
                          <option value=""> Select</option>
                            <option value="FATHER"> Father</option>
                            <option value="MOTHER"> Mother</option>
                            <option value="SON"> Son</option>
                            <option value="DAUGHTER"> daughter</option>
                            <option value="SISTER"> Sister</option>
                            <option value="BROTHER"> Brother</option>
                            <option value="OTHER"> Other</option>
                          </select>
                          <label for="n_rel" className="text-label">Relation</label>
                        </span>
                      <small class="text-danger">{this.state.n_rel_err}</small> 
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-4 mb-4">
                        <span className="has-float-label mb-2">
                          <input className="form-control input-text" name="n_perc" id="n_perc" type="text" placeholder="Allocated %"  />
                          <label for="n_perc" className="text-label">Allocation Percentage</label>
                        </span>
                        <small class="text-danger">{this.state.n_perc_err}</small>
                      </div>
                      <div className="col-md-4 mb-4" id="gud_name">
                        <span className="has-float-label mb-2">
                          <input className="form-control input-text" name="n_gud" id="n_gud" type="text" placeholder="Enter Guardian"/>
                          <label for="n_gud" className="text-label">Guardian Name</label>
                        </span>
                        <small class="text-danger">{this.state.n_gud_err}</small> 
                      </div>
                      
                    </div>
            
                    <div className="row">
                      <div className="col-md-9 "></div>
                      <div className="col-md-3 ">
                      {(this.state.nomine_count<3)&& (this.state.nomine_count>0)?
                        <input type='button' className="btn btn-danger pull-right add_button" value='Add More' onClick={this.addnominee.bind(this)} />
                      :null}

                      {this.state.user_nomine==''?<input type='button' className="btn btn-danger pull-right add_button" value='Add ' onClick={this.addnominee.bind(this)}/>:null}

                        <button type='button' className="btn btn-danger pull-right update_button" value='Update' onClick={this.update_nominee.bind(this)}>Update</button>
                      </div>
                      {/* <input type="submit" value="Submit" /> */}
                    </div>
                    <br></br>
                    <div className="col-md-12">
                    {this.state.user_nomine ?
                      <table class="table table-striped">
                        <thead>
                          <tr>
                            <th>Name</th>
                            <th>Date Of Birth</th>
                            <th>Relation</th>
                            <th>Percentage of  Allocation(%)</th>
                            <th>Guardian Name</th>
                            <th>Remove</th>
                          </tr>
                        </thead>
                        <tbody>
                          {this.state.user_nomine.map((item, key) =>
                              <tr id={item.id}>
                                <td id={"name_"+item.id}>{item.nomini_name}</td>
                                <td id={"dob_"+item.id}>{item.dob}</td>
                                <td id={"rel_"+item.id}>{item.relation}</td>
                                <td id={"prec_"+item.id}>{item.alocation_percentage}</td>
                                <td id={"prec_"+item.id}>{item.guardian_name?item.guardian_name:null}</td>
                                <td>
                                  <a href="javascript:void(0)" onClick={this.delete_nominee.bind(this, item.id)}><i className="fa fa-trash text-danger"></i></a>&nbsp;
                                  <a href="javascript:void(0)" onClick={this.edit_nominee.bind(this, item.id)}><i className="fa fa-edit text-danger"></i></a>
                                </td>
                              </tr>
                            ) }
                        </tbody>
                      </table>: null}
                    </div>
                    <a class="btn-theme-1 btn-theme-effect action-button pull-right btn-color-green" type="button" id="nn_3" onClick={this.nominee}>
                      <span class="button-text">Save & Continue</span>
                      <span class="round"><i class="fa fa-chevron-right"></i></span>
                    </a>
                    {/* {this.state.nominee_btn} */}
                    <a class="btn-theme-1 btn-theme-effect  action-button pull-right btn-color-green" id="next_3" type="button" >
                      <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
                      <span class="button-text"> Loading...</span>
                    </a>
                    <a class="btn-theme-1 btn-theme-effect previous action-button-previous" type="submit">
                      <span class="button-text">Previous</span>
                      <span class="round"><i class="fa fa-chevron-left"></i></span>
                    </a>

                  </fieldset>
                   : null}
              
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
                      <h6>Now, to activate your IIN, you need to approve IIN & FATCA
authorization link for all the holder(s) sent on respective mail id(s)
                      </h6><br></br>
                       <h6>The application will get approved within 2 working days.
                      </h6>
                    </div>

                          {/*Preview Brith popup Modal */}
                <div className="modal fade" id="previewImgPopup" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog">
                          <div className="modal-content">
                            <div className="modal-header">
                              {/* <h5 className="modal-title" id="exampleModalLabel">Modal title</h5> */}
                              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                              </button>
                            </div>
                            <div className="modal-body">
                            {/* <img src="https://us.123rf.com/450wm/jovanas/jovanas1607/jovanas160700565/64248526-demo-sign-icon.jpg?ver=6" className="w-100"/> */}
                            <img id="brith_modalpreviewHolder" class="img-preview" className="w-100"/>
                            </div>
                          </div>
                        </div>
                      </div>

                       {/* Preview Brith pdf popup Modal */}
                <div className="modal fade" id="previewImgPopuppdf" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog">
                          <div className="modal-content">
                            <div className="modal-header">
                              {/* <h5 className="modal-title" id="exampleModalLabel">Modal title</h5> */}
                              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                              </button>
                            </div>
                            <div className="modal-body">
                            {/* <img src="https://us.123rf.com/450wm/jovanas/jovanas1607/jovanas160700565/64248526-demo-sign-icon.jpg?ver=6" className="w-100"/> */}
                           
                            <embed src="" id="brith_modalpreviewHolderpdf" type="application/pdf" width="100%" height="600px" />
                            </div>
                          </div>
                        </div>
                      </div>

                    <a class="btn-theme-1 btn-theme-effect pull-right btn-color-green">
                      <span class="button-text">Continue</span>
                      <span class="round"><i class="fa fa-chevron-right"></i></span>
                    </a>

                    <a class="btn-theme-1 btn-theme-effect previous action-button-previous">
                      <span class="button-text">Previous</span>
                      <span class="round"><i class="fa fa-chevron-left"></i></span>
                    </a>

                  </fieldset>


                                  {/* Finish */}
                                  {/* <div id="div4"> */}

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
                                        <h6>Now, to activate your IIN, you need to approve IIN & FATCA
                                          authorization link for all the holder(s) sent on respective mail id(s)
                                        </h6><br></br>
                                        <h6>The application will get approved within 2 working days.
                                        </h6>
                                      </div>

                                      <a href="/dashboard/" class="btn-theme-1 btn-theme-effect pull-right btn-color-green">
                                        <span class="button-text">Continue</span>
                                        <span class="round"><i class="fa fa-chevron-right"></i></span>
                                      </a>

                                      <a class="btn-theme-1 btn-theme-effect previous action-button-previous" onClick={this.showNominee}>
                                        <span class="button-text">Previous</span>
                                        <span class="round"><i class="fa fa-chevron-left"></i></span>
                                      </a>

                                    </fieldset>
                                  {/* </div> */}
                                </form>

                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>




              <Footer />
            </div>


          </div>
        </div>



      </>
    )
  }

}



export default Required_Details_Form_Dash