import React, { component } from 'react';
import Header from './header';
import Footer from './footer';
import Sidebar from './sidebar';
import {Helmet} from "react-helmet";
import StyleComponent from './styleComponent';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactTooltip from 'react-tooltip';
import '../../assets/css/iinstyle.css';
import { Link, Redirect } from 'react-router-dom';
import $ from 'jquery';
import Axios from 'axios';

class Pan_Verification_dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = { Fieldtext: '' };
        this.state = { pan: '' };
        this.state = { iiNData: [] };
        this.guardian_pan = this.guardian_pan.bind(this);
        this.primary_pan = this.primary_pan.bind(this);
        this.holder_1 = this.holder_1.bind(this);
        this.holder_2 = this.holder_2.bind(this);

        this.state = {
            tax_status:this.props.location.tax_status,
            holding:this.props.location.holding,
            kycVerify_holder_1: this.props.location.kycVerify_holder_1,
            kycVerify_holder_2: this.props.location.kycVerify_holder_2,
            kycVerify_holder_1_pan: this.props.location.kycVerify_holder_1_pan,
            kycVerify_holder_2_pan: this.props.location.kycVerify_holder_2_pan,
            kycVerify_guardian:this.props.location.kycVerify_guardian,
            kycVerify_guardian_pan:this.props.location.kycVerify_guardian_pan,
            kycVerify_primary:this.props.location.kycVerify_primary,
            kycVerify_primary_pan:this.props.location.kycVerify_primary_pan,
            investor_name:this.props.location.investor_name,
        };
       
    }

    componentDidMount(e){
        if(this.state.tax_status=="Minor"){
            $("#minor").css({ "display": "block" });
            $("select#holding option[value='1']")[0].selected = true; 
            $('#holding').attr('disabled', true);
            $('input[name="investor_name"]').val(this.state.investor_name)
            $('input[name="guardian_pan"]').val(this.state.kycVerify_guardian_pan)
        }else{
            //$("select#holding option[value='2']")[0].selected = true; 
            $('#holding').attr('disabled', false);
            $("#minor").css({ "display": "none" });
            $('input[name="investor_name"]').val()
            $('input[name="guardian_pan"]').val()
            if(this.state.holding==2){
                $("#single").css({ "display": "block" });
                $("#anyone").css({ "display": "block" });
                $('input[name="primary_pan"]').val(this.state.kycVerify_primary_pan)
                $('input[name="pan_holder_1"]').val(this.state.kycVerify_holder_1_pan)
                $('input[name="pan_holder_2"]').val(this.state.kycVerify_holder_2_pan)
            }else if(this.state.holding==1){
                $("#single").css({ "display": "block" });
                $("#anyone").css({ "display": "none" });
                $('input[name="primary_pan"]').val(this.state.kycVerify_primary_pan)
                $('input[name="pan_holder_1"]').val(this.state.kycVerify_holder_1_pan)
                $('input[name="pan_holder_2"]').val(this.state.kycVerify_holder_2_pan)
            }
        }
        
    }

    minorCase(e) {
        localStorage.setItem("taxStatus",'')
        localStorage.setItem("holding",'')
        localStorage.setItem("holder1_verify",'')
        localStorage.setItem("holder2_verify",'')
        localStorage.setItem("jointHolder1",'')
        localStorage.setItem("jointHolder2",'')
        localStorage.setItem("guardian_verify",'')
        localStorage.setItem("guardian_pan",'')
        localStorage.setItem("primary_verify",'')
        localStorage.setItem("primary_pan",'')
        localStorage.setItem("investor_name",'')    
        
        var tax_status = $('select[name="tax_status"]').val()
        $("#single").css({ "display": "none" });
        $("#anyone").css({ "display": "none" });
        if(tax_status=="Minor"){
            $("#minor").css({ "display": "block" });
            $("select#holding option[value='1']")[0].selected = true; 
            $('#holding').attr('disabled', true);
        }else{
            $("select#holding option[value='']")[0].selected = true; 
            $('#holding').attr('disabled', false);
            $("#minor").css({ "display": "none" });
        }
    }

    holding(){
        //this.setState(this.baseState)
        var holding = $('select[name="holding"]').val()
        if(holding=="1"){
            $("#single").css({ "display": "block" });
            $("#anyone").css({ "display": "none" });
        }
        
        if(holding=="2"){
            $("#single").css({ "display": "block" });
            $("#anyone").css({ "display": "block" });
        }
    }

    guardian_pan(e) {
        const data = {
            pan_numbers: $('input[name="guardian_pan"]').val(),
            investor_name: $('input[name="investor_name"]').val()
        }

        $(".holder1-msg").css({ "display": "none" });
        this.setState({kycVerify_guardian:""})
        this.setState({ guardian_pan_err: "" });
        this.setState({ investor_name_err: "" });
        if (data.pan_numbers.length >= 10) {
            $("#overlay").css("display", "block")
            Axios.post("/prodigypro/api/pen_verify", data)
            .then((response) => {
                $("#overlay").css("display", "none")
                $(".holder1-msg").css({ "display": "block" });
                $(".hold_1").html('');
                localStorage.setItem("investor_name", data.investor_name)
                let kycVerify = response.data.data.data.ValidatePANResult. IsEKYCVerified;
                localStorage.setItem("guardian_verify", kycVerify)
                localStorage.setItem("guardian_pan", data.pan_numbers)

                if (kycVerify == "Y") {
                    localStorage.setItem("guardian_Name", response.data.data.data.ValidatePANResult.NameAsPerPAN)
                }

                this.setState({ kycVerify_guardian: kycVerify });
                this.setState({ kycVerify_guardian_pan: data.pan_numbers });
            });
        }
    }

    primary_pan(e) {
        const data = {
            pan_numbers: $('input[name="primary_pan"]').val()
        }
        $(".primary-msg").css({ "display": "none" });
        
        this.setState({kycVerify_primary:""})
        this.setState({ primary_pan_err: "" });
        this.setState({ pan_holder_1_err: "" });
        this.setState({ pan_holder_2_err: "" });
        if (data.pan_numbers.length >= 10) {
            $("#overlay").css("display", "block")
            Axios.post("/prodigypro/api/pen_verify", data)
                    .then((response) => {
                        $("#overlay").css("display", "none")
                        $(".primary-msg").css({ "display": "block" });
                        $(".hold_1").html('');
                        console.log("ss", response.data.data.data.ValidatePANResult.IsEKYCVerified)
                        let kycVerify = response.data.data.data.ValidatePANResult.IsEKYCVerified;
                        localStorage.setItem("primary_verify", kycVerify)
                        localStorage.setItem("primary_pan", data.pan_numbers)
                        if (kycVerify == "Y") {
                            
                            localStorage.setItem("primary_name", response.data.data.data.ValidatePANResult.NameAsPerPAN)
                        }
                       this.setState({ kycVerify_primary: kycVerify });
                       this.setState({ kycVerify_primary_pan: data.pan_numbers });
                });
        }
    }

    holder_1(e) {
        const data = {
            pan_numbers: $('input[name="pan_holder_1"]').val()
        }
        $(".holder1-msg").css({ "display": "none" });
        this.setState({kycVerify_holder_1:""})
         if (data.pan_numbers.length >= 10) {
            let primary_pan= $('input[name="primary_pan"]').val();
            let pan_holder_2 = $('input[name="pan_holder_2"]').val();

            if(data.pan_numbers.toUpperCase()==primary_pan.toUpperCase()){
                $(".hold_1").css("display", "block")
                $(".hold_1").html("Second Holder's PAN should not be same as primary Holder's PAN");
            }else if(data.pan_numbers.toUpperCase()==pan_holder_2.toUpperCase()){
                $(".hold_1").css("display", "block")
               $(".hold_1").html("Second Holder's Pan should not be same as Third Holder's pan");
            }else{
                $("#overlay").css("display", "block")
               Axios.post("/prodigypro/api/pen_verify", data)
                    .then((response) => {
                        $("#overlay").css("display", "none")
                        $(".hold_1").css("display", "none")
                        $(".holder1-msg").css({ "display": "block" });
                        let kycVerify = response.data.data.data.ValidatePANResult.IsEKYCVerified;
                        localStorage.setItem("holder1_verify", kycVerify)
                        localStorage.setItem("jointHolder1", data.pan_numbers)
                        if (kycVerify == "Y") {
                            
                            localStorage.setItem("jointHolderName1", response.data.data.data.ValidatePANResult.NameAsPerPAN)
                        }
                        this.setState({ kycVerify_holder_1: kycVerify });
                        this.setState({ kycVerify_holder_1_pan: data.pan_numbers });
                });
            }
        }
    }

    holder_2(e) {
        const data = {
            pan_numbers: $('input[name="pan_holder_2"]').val()
        }
        $(".holder2-msg").css({ "display": "none" });

        this.setState({kycVerify_holder_2:""})
        if (data.pan_numbers.length >= 10) {
            let primary_pan= $('input[name="primary_pan"]').val();
            let pan_holder_1 = $('input[name="pan_holder_1"]').val();            
            if(data.pan_numbers.toUpperCase()==primary_pan.toUpperCase()){
                 $(".hold_2").css("display", "block")
                $(".hold_2").html("Third Holder's PAN should not be same as primary Holder's PAN");
            }else if(data.pan_numbers.toUpperCase()==pan_holder_1.toUpperCase()){
                 $(".hold_2").css("display", "block")
                $(".hold_2").html("Third Holder Pan should not be same as Second Holder's pan");
            }else{
                $("#overlay").css("display", "block")
               Axios.post("/prodigypro/api/pen_verify", data)
                    .then((response) => {
                        $("#overlay").css("display", "none")
                        $(".hold_2").css("display", "none")
                        $(".holder2-msg").css({ "display": "block" });
                        let kycVerify = response.data.data.data.ValidatePANResult.IsEKYCVerified;
                        localStorage.setItem("holder2_verify", kycVerify)
                        localStorage.setItem("jointHolder2", data.pan_numbers)
                        if (kycVerify == "Y") {
                           
                            localStorage.setItem("jointHolderName2", response.data.data.data.ValidatePANResult.NameAsPerPAN)
                        }
                        this.setState({ kycVerify_holder_2: kycVerify });
                        this.setState({ kycVerify_holder_2_pan: data.pan_numbers });
                });
            }
        }
    }

    proccedBtn=(e)=>{
        // tax_status
        const data = {
            holding: $('select[name="holding"]').val(),
            tax_status: $('select[name="tax_status"]').val(),
            guardian_pan: $('input[name="guardian_pan"]').val(),
            primary_pan: $('input[name="primary_pan"]').val(),
            pan_holder_1: $('input[name="pan_holder_1"]').val(),
            pan_holder_2: $('input[name="pan_holder_2"]').val(),
            investor_name: $('input[name="investor_name"]').val(),
        }
       
        let dataErr = [];

        if(data.tax_status==""){
            var isValid = { tax_status: "1" }
            dataErr.push(isValid);
            this.setState({ tax_status_err: "Mandatory Field" });
        }else{
            if(data.tax_status=="Minor"){
                if(data.guardian_pan==""){
                    var isValid = { guardian_pan: "1" }
                    dataErr.push(isValid);
                    this.setState({ guardian_pan_err: "Mandatory Field" });
                }else{
                    this.setState({ guardian_pan_err: "" });
                }

                if(data.investor_name==""){
                    var isValid = { investor_name: "1" }
                    dataErr.push(isValid);
                    this.setState({ investor_name_err: "Mandatory Field" });
                }else{
                    this.setState({ investor_name_err: "" });
                }
            }
            this.setState({ holding_err: "" });
        }

        if(data.holding==""){
            var isValid = { holding: "1" }
            dataErr.push(isValid);
            this.setState({ holding_err: "Mandatory Field" });
        }else{
            this.setState({ holding_err: "" });

            if((data.holding==2) && (data.tax_status!="Minor")){
                if(data.primary_pan==""){
                    var isValid = { primary_pan: "1" }
                    dataErr.push(isValid);
                    this.setState({ primary_pan_err: "Mandatory Field" });
                }else{
                    this.setState({ primary_pan_err: "" });
                }
    
                if(data.pan_holder_1==""){
                    var isValid = { pan_holder_1: "1" }
                    dataErr.push(isValid);
                    this.setState({ pan_holder_1_err: "Mandatory Field" });
                }else{
                    this.setState({ pan_holder_1_err: "" });
                }


                // if(data.pan_holder_2==""){
                //     var isValid = { pan_holder_2: "1" }
                //     dataErr.push(isValid);
                //     this.setState({ pan_holder_2_err: "Mandatory Field" });
                // }else{
                //     this.setState({ pan_holder_2_err: "" });
                // }
            }else if((data.holding==1) && (data.tax_status!="Minor")){
                if(data.primary_pan==""){
                    var isValid = { primary_pan: "1" }
                    dataErr.push(isValid);
                    this.setState({ primary_pan_err: "Mandatory Field" });
                }else{
                    this.setState({ primary_pan_err: "" });
                }
            }
        }

        // alert(dataErr.length)
        if(dataErr.length==0){
          
            
            localStorage.setItem("holding", data.holding)
            let tax_status='';

            if(data.tax_status=='Minor'){
                localStorage.setItem("taxStatus", data.tax_status)
                const userdata = {
                    tax_status:"02",
                    hold_nature:"SI",
                    fh_pan:"",
                    jh1_pan:"",
                    jh2_pan:"",
                    guardian_pan:$('input[name="guardian_pan"]').val().toUpperCase(),
                    investor_name: $('input[name="investor_name"]').val(),
                    email:localStorage.getItem("userEmail")
                }

                localStorage.setItem("tax_Status", userdata.tax_status)

                Axios.post("/prodigypro/api/GETIIN", userdata)
                .then((response) => {
                    //console.log("hh",response.data.data.data)
                    if(response.data.data.status==200){
                        window.$('#exampleModalCenter').modal('show');
                        this.setState({ alertMsg: "You are already Registered, If you want to be added in family member then please select 'Add Family Member option" })
                    }else{
                        this.setState({ usertax: "1" });
                        
                    }
                });
            }

            if(data.tax_status=='Individual'){
                localStorage.setItem("taxStatus", data.tax_status)
                tax_status="01"
            }

            if(data.tax_status=='NRI'){
                localStorage.setItem("taxStatus", data.tax_status)
                tax_status="21"
            }

            if(data.tax_status=='NRO'){
                localStorage.setItem("taxStatus", "NRI")
                tax_status="11"
            }

            if((data.holding=='1') && (data.tax_status!='Minor')){
                const userdata = {
                    tax_status:tax_status,
                    hold_nature:"SI",
                    fh_pan: $('input[name="primary_pan"]').val(),
                    jh1_pan:"",
                    jh2_pan:"",
                    guardian_pan:"",
                    investor_name:"",
                    email:localStorage.getItem("userEmail")
                }

                localStorage.setItem("tax_Status", userdata.tax_status)
                console.log("hh",JSON.stringify(userdata))
                Axios.post("/prodigypro/api/GETIIN", userdata)
                .then((response) => {
                    console.log("hh",response.data.data)
                    if(response.data.data.status==200){
                        window.$('#exampleModalCenter').modal('show');
                        this.setState({ alertMsg: "You are already Registered, If you want to be added in family member then please select 'Add Family Member option" })
                    }else{
                        this.setState({ usertax: "1" });                        
                    }
                });

            }


            if(data.holding=='2'){
            
                const userdata = {
                    tax_status:tax_status,
                    hold_nature:"AS",
                    fh_pan: $('input[name="primary_pan"]').val(),
                    jh1_pan:$('input[name="pan_holder_1"]').val(),
                    jh2_pan:$('input[name="pan_holder_2"]').val(),
                    guardian_pan:"",
                    investor_name:"",
                    email:localStorage.getItem("userEmail")
                }

                localStorage.setItem("tax_Status", userdata.tax_status)
                Axios.post("/prodigypro/api/GETIIN", userdata)
                .then((response) => {
                    if(response.data.data.status==200){
                        window.$('#exampleModalCenter').modal('show');
                        this.setState({ alertMsg: "You are already Registered, If you want to be added in family member then please select 'Add Family Member option" })
                    }else{
                        this.setState({ usertax: "1" });
                        
                    }
                });
            }

            // this.setState({ tax_status: data.tax_status , holding:  data.holding, investor_name:  data.investor_name});
        }
    }

    render(){
        console.log("data",this.state.usertax);
        if(this.state.usertax){
            return <Redirect  to={{
                pathname: "/prodigypro/dashboard/required-document-info-yes-dash",
                tax_status:this.state.tax_status,
                holding:this.state.holding,
                kycVerify_holder_1:this.state.kycVerify_holder_1,
                kycVerify_holder_2:this.state.kycVerify_holder_2,
                kycVerify_holder_1_pan:this.state.kycVerify_holder_1_pan,
                kycVerify_holder_2_pan:this.state.kycVerify_holder_2_pan,
                kycVerify_guardian:this.state.kycVerify_guardian,
                kycVerify_guardian_pan:this.state.kycVerify_guardian_pan,
                kycVerify_primary:this.state.kycVerify_primary,
                kycVerify_primary_pan:this.state.kycVerify_primary_pan,
                investor_name:this.state.investor_name,
            }} />
        }

        let guardian_msg,primary_msg,holder_msg;
        if(this.state.kycVerify_guardian=="N"){
            guardian_msg = 
            <div>
                <h6 className="text-left text-danger"> Note: </h6> <p className="text-left" > The KYC of Primary Holder is Not compliant. Complete your KYC first!</p> 
             </div>
        }

        if(this.state.kycVerify_primary=="N"){
            primary_msg = 
            < div className="alert alert-info mt-3"
            role="alert" >
            <div className="pb-2" >
                <h6 className="text-left text-danger" > Note: </h6> <p className="text-left" > The KYC of Primary Holder is Not compliant. Complete your KYC first!</p> 
            </div></div>
        }

        if(this.state.kycVerify_primary=="Y"){
            if (this.state.kycVerify_holder_1 == "N") {
                holder_msg = < div className="alert alert-info mt-3"
                    role="alert" >
                    <div className="pb-2" >
                        <span className="para" >
                            <h6 className="text-left text-danger" > Note: </h6> <p className="text-left" >The KYC of 2nd holder is not complied.Complete your Holder 's KYC, or Continue with KYC complied Holder(s)</p> </span> </div> </div>
            }
    
            if ((this.state.kycVerify_holder_1 == "N") && (this.state.kycVerify_holder_2 == "Y")) {
                holder_msg = < div className="alert alert-info mt-3"
                    role="alert" >
                    <div className="pb-2" >
                        <span className="para" >
                            <h6 className="text-left text-danger" > Note: </h6> <p className="text-left" >The KYC of 2nd holder is not complied.Complete your Holder 's KYC, or Continue with KYC complied Holder(s)</p> </span> </div> </div>
            }
    
            if ((this.state.kycVerify_holder_1 == "Y") && (this.state.kycVerify_holder_2 == "N")) {
                holder_msg = < div className="alert alert-info mt-3"
                    role="alert" >
                    <div className="pb-2" >
                        <span className="para" >
                            <h6 className="text-left text-danger" > Note: </h6> <p className="text-left" >The KYC of 3rd holder is not complied.Complete your Holder 's KYC, or Continue with KYC complied Holder(s)</p> </span> </div> </div>
            }
    
            if ((this.state.kycVerify_holder_1 == "N") && (this.state.kycVerify_holder_2 == "N")) {
                holder_msg = <div className="alert alert-info mt-3" role="alert" >
                    <div className="pb-2" >
                        <span className="para" >
                            <h6 className="text-left text-danger" > Note: </h6> <p className="text-left" > The KYC of Joint holder 's are not complied. Complete your Joint Holder'
                                s KYC, or Continue with Single Holding. </p> </span> </div> </div>
            }
        }
        
        return(
        <>
             <Helmet>         
            <title>Pan Verification Dashboard</title>
        </Helmet>
        <StyleComponent/>
            <style>
          {`
			.text-color{
				color:#fff !important;
			}
           .mt-input{
                margin-top:3.5%;
            }
            .mt-btn{
                margin-top:12%;
            }
            #opt_box{
                display:none;
            }
            #add_member{
                display:none;
            }
            #load{
                display:none;
            }
            .text-info{
                display:none;
            }
            #load1{
                display:none;
            }
			 .panNo{
                text-transform: uppercase;
            }
            .dropdown-item.active
            {
                background-color:#e74a3b !important;
            }
            .container-fluid.m-0.p-0
            {
                background-color:#fff;
            }
            .btn-theme-effect.btn-color-green
            {
                border:none;
            }
            #minor{
                display:none;
            }
            #single{
                display:none;
            }
            #anyone{
                display:none;
            }
            #overlay{
                display:none;
            }
            .hold_1{
                font-size:1rem;
            }
            .hold_2{
               font-size:1rem;
            }
          `}
          </style>
        <div id="overlay" >
            <div class="spinner"></div>
            <br/><b className="text-danger">Please Wait...</b>
        </div>
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
            <Sidebar/>
        {/* End of Sidebar */}


        {/* Content Wrapper */}
        <div id="content-wrapper" className="d-flex flex-column">
          {/* Main Content */}
          <div id="content">
          <ToastContainer position="top-right" className="mt-8" />
            {/* Topbar */}
                <Header/>
            {/* End of Topbar */}
            <div className="container-fluid">
            <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><a href="home">Home</a></li>
                            <li className="breadcrumb-item active" aria-current="page">Pan-Varification-Dashboard</li>
                        </ol>
                    </nav>
           
                    </div>

                    <div className="row">
                        <div className="col-xl-12 col-lg-12">
                            <div className="card shadow mb-3">
                            <div className="card-body">
                                <div className="col-12">
                                 <div className="col-6 offset-md-3 text-center pt-2" >
                                 <span className="has-float-label mb-4" >
                                    <select className="form-control input-text" name="tax_status" id="tax_status" onChange={this.minorCase.bind()}>
                                        <option value=""> Select Tax Status </option> 
                                        <option value="Minor" selected={this.state.tax_status=="Minor"?"selected":null}> On Behalf Of Minor</option> 
                                        <option value="Individual" selected={this.state.tax_status=="Individual"?"selected":null}> Individual </option> 
                                        <option value="NRI" selected={this.state.tax_status=="NRI"?"selected":null}> NRI - Repatriable (NRE) </option>

                                        <option value="NRI" selected={this.state.tax_status=="NRI"?"selected":null}> NRI Through NRO A/c </option>
                                    </select> 
                                       
                                    <label for="tax"  className="text-label" > Select Tax Status  <span className="text-danger">*</span></label>
                                    <small className="text-danger pull-left">{this.state.tax_status_err}</small>
                                    </span>

                                 <span className="has-float-label mb-3" >
                                   <select className="form-control input-text" id="holding" name="holding" onChange={this.holding.bind()}>                                  
                                    <option value=""> Select Holding Nature </option>
                                    <option value="1" selected={this.state.holding=="1"?"selected":null}> Single Holding </option>
                                    <option value="2" selected={this.state.holding=="2"?"selected":null}> Anyone / Survivor </option>
                                    </select>
                                   <label for="holding" className="text-label" > Select Holding Nature <span className="text-danger">*</span></label> 
                                   <small className="text-danger pull-left">{this.state.holding_err}</small>
                                   </span>
                                    
                                   {/* <a href="required-document-info-yes-dash" class="btn-theme-1 btn-theme-effect pull-right btn-color-green proceed">
                               <span class="button-text" > Proceed </span> <span class="round" > < i class="fa fa-chevron-right" > </i></span >
                                </a> */}
                          </div>    
                          <div className="col-6 offset-md-3 text-center pt-2" id="minor">
                                <span className="has-float-label mb-4" >
                                <input className="form-control input-text" id="investor_name" name="investor_name" type="text" placeholder="Enter Investor Name"/>
                                <label for="investor_name"  className="text-label" >Minor Investor Name<span className="text-danger">*</span>
                                </label>
                                <small className="text-danger pull-left">{this.state.investor_name_err}</small></span>

                                <span className="has-float-label mb-3" >
                                <input className="form-control input-text panNo" id="guardian_pan" name="guardian_pan" type="text" placeholder="Guardian PAN"  onKeyUp={this.guardian_pan}/>
                                <label for="guardian_pan" className="text-label" >Guardian PAN <span className="text-danger">*</span></label> 
                                <small className="text-danger pull-left">{this.state.guardian_pan_err}</small>
                                   
                                {
                                        this.state.kycVerify_guardian == "N" ?
                                            <div className="text-left text-danger holder1-msg" >
                                                <span > KYC not complied.To complete KYC < a href={"needed-info?holder-one?"+this.state.kycVerify_guardian_pan}> Click here </a></span >
                                            </div> :
                                            null
                                    }

                                    {
                                        this.state.kycVerify_guardian == "Y" ?
                                            <div className="holder1-msg text-left text-success" >
                                                <span > Awesome!KYC complied </span> </div> :
                                            null
                                    }  </span>   
                                <br></br>
                                {guardian_msg}
                                <h6 className="text-left text-danger  font-weight-bold" > Note: </h6>                            
                                <p className="text-left font-weight-bold" > Please Be ready with these documents before creation of Minor's profile to mention the bank account details and upload the bank & birth proof- </p>
                                <p className="text-left">1. Bank Account should be in the name of Minor, it can either be Jointly or under the guardianship of the same person as you have selected in profile.</p>
                                <p className="text-left">2. Guardian name must be there in the birth proof.</p>
                          </div>   
                            <div className="col-6 offset-md-3 text-center pt-2" id="single">
                                <span className="has-float-label mb-4" >
                                <input className="form-control input-text panNo" id="primary_pan" name="primary_pan" type="text" placeholder="Enter PAN" onKeyUp={this.primary_pan}/>
                                <label for="primary_pan" className="text-label" > Primary Pan<span className="text-danger">*</span></label>
                                <small className="text-danger pull-left">{this.state.primary_pan_err}</small>
                               
                                {
                                        this.state.kycVerify_primary == "N" ?
                                            <div className="text-left text-danger primary-msg" >
                                                <span > KYC not complied.To complete KYC < a href={"needed-info?holder-one?"+this.state.kycVerify_primary_pan}> Click here </a></span >
                                            </div> :
                                            null
                                    }

                                    {
                                        this.state.kycVerify_primary == "Y" ?
                                            <div className="primary-msg text-left text-success" >
                                                <span > Awesome!KYC complied </span> </div> :
                                            null
                                    }  
                                    </span> 
                               
                            </div>  
                          <div className="col-6 offset-md-3 text-center pt-2" id="anyone">
                                <span className="has-float-label mb-4" >
                                <input className="form-control input-text panNo" id="holder-1-pan" name="pan_holder_1" type="text" placeholder="Enter PAN"  onKeyUp={this.holder_1}/>
                                <label for="holder-1-pan"  className="text-label" >  Second Holder's PAN<span className="text-danger">*</span></label>
                                <small className="text-danger pull-left hold_1">{this.state.pan_holder_1_err}</small>
                               
                                {
                                        this.state.kycVerify_holder_1 == "N" ?
                                            <div className="text-left text-danger holder1-msg" >
                                                <span > KYC not complied.To complete KYC < a href={"needed-info?holder-one?"+this.state.kycVerify_holder_1_pan}> Click here </a></span >
                                            </div> :
                                            null
                                    }

                                    {
                                        this.state.kycVerify_holder_1 == "Y" ?
                                            <div className="holder1-msg text-left text-success" >
                                                <span > Awesome!KYC complied </span> </div> :
                                            null
                                    } </span><br></br>
                                <span className="has-float-label mb-3" >
                                <input className="form-control input-text panNo" id="holder-2-pan" name="pan_holder_2" type="text" placeholder="Guardian PAN" onKeyUp={this.holder_2}/>
                                <label for="holder-2-pan" className="text-label" > Third Holder's PAN  <span className="text-danger">*</span></label> 
                                <small className="text-danger pull-left hold_2">{this.state.pan_holder_2_err}</small>
                               
                                        {
                                            this.state.kycVerify_holder_2 == "N" ?
                                                <div className="holder1-msg text-left text-danger" >
                                                    <span > KYC not complied.To complete KYC < a href={"needed-info?holder-two?"+this.state.kycVerify_holder_2_pan} > Click here </a></span >
                                                </div> :
                                                null
                                        }

                                        {
                                            this.state.kycVerify_holder_2 == "Y" ?
                                                < div className="holder1-msg text-left text-success" >
                                                    <span > Awesome!KYC complied </span> </div> :
                                                null
                                        } </span>     
                                        <br />
                          </div>  
                          {primary_msg}
                          {holder_msg}  
                          <div className="col-6 offset-md-3 text-center pt-2" >
                            <a href="javascript:void(0);" class="btn-theme-1 btn-theme-effect pull-right btn-color-green proceed"onClick={this.proccedBtn.bind()} >
                                <span class="button-text" > Proceed </span> <span class="round" > < i class="fa fa-chevron-right" > </i></span >
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
      
      </div>
     
        </>
        )
    }
    
}
export default Pan_Verification_dashboard