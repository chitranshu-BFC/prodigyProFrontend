import React from 'react';
import { Redirect } from 'react-router-dom';
import StyleComponent from '../dashboard/pages/styleComponent';
import "../assets/css/style2.css";
import Axios from 'axios';
import $ from 'jquery';
import pdf from "../assets/doc/SEBI-Circular-on-KYC.pdf";
import Select from 'react-select';
class Pan_Verification extends React.Component {
    constructor(props) {
        super(props);
        // const userLoggedId = localStorage.getItem("userLoggedId");
        this.state = { Fieldtext: '' };
        this.state = { pan: '' };
        this.state = { iiNData: [] };
        this.onChange = this.onChange.bind(this);
        this.userHolder = this.userHolder.bind(this);
        this.join_holding = this.join_holding.bind(this);
        this.holder_1 = this.holder_1.bind(this);
        this.holder_2 = this.holder_2.bind(this);
        this.submitForm = this.submitForm.bind(this);
        this.state = {
            nonIndKyc: this.props.location.nonIndKyc,
            case_3: this.props.location.case_3,
            IsEKYCVerified: this.props.location.IsEKYCVerified,
            kycVerify_holder_1_pan: this.props.location.IsEKYCHoder_1,
            kycVerify_holder_2_pan: this.props.location.IsEKYCHoder_2,
            kycVerify_holder_1: this.props.location.kycVerify_holder_1,
            kycVerify_holder_2: this.props.location.kycVerify_holder_2,
            holder_type: this.props.location.holder_type
        };
        // localStorage.removeItem("jointHolder1");
        // localStorage.removeItem("jointHolder2");
    }
    componentDidMount(e) {
        console.log("qqq", localStorage.getItem("userPanNo"))
        if (localStorage.getItem("userPanNo") !== '') {
            this.setState({ userPanNo: localStorage.getItem("userPanNo") })
        }
        localStorage.setItem("userPanNo", "");
        if (this.state.IsEKYCVerified === "Y") {
            console.log("nnn", localStorage.getItem("jointHolder1"))
            this.setState({ iinLength: "0" })
            $(".check_btn").html('Check Now');
            $(".join-holder").css({ "display": "block" });
            if (this.state.holder_type === 2) {
                $("select#holding option[value='2']")[0].selected = true;
                $(".join_hold").css({ "display": "block" });
            } else {
                $("select#holding option[value='1']")[0].selected = true;
                $(".join_hold").css({ "display": "none" });
            }
        }
    }
    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    userHolder(e) {
        $(".check_btn").html('Check Now');
        $(".join-holder").css({ "display": "block" });
        localStorage.removeItem("jointHolder2")
        localStorage.removeItem("jointHolder1")
    }
    join_holding(e) {
        const data = {
            holding: $('select[name="holding"]').val()
        }
        localStorage.removeItem("jointHolder2")
        localStorage.removeItem("jointHolder1")
        $(".hold_1").html('');
        $(".hold_2").html('');
        $('input[name="pan_holder_1"]').val("")
        $('input[name="pan_holder_2"]').val("")
        this.setState({ kycVerify_holder_1: "" })
        this.setState({ kycVerify_holder_2: "" })
        if (data.holding === 2) {
            $(".join_hold").css({ "display": "block" });
        } else {
            $(".join_hold").css({ "display": "none" });
        }
    }
    holder_1(e) {
        const data = {
            pan_numbers: $('input[name="pan_holder_1"]').val()
        }
        $(".holder1-msg").css({ "display": "none" });
        this.setState({ kycVerify_holder_1: "" })
        if (data.pan_numbers.length >= 10) {
            let primary_pan = $('input[name="pan"]').val();
            let pan_holder_2 = $('input[name="pan_holder_2"]').val();
            // alert(data.pan_numbers.length+"-"+primary_pan+"-"+data.pan_numbers.toUpperCase()+"-"+pan_holder_2.toUpperCase())
            if (data.pan_numbers.toUpperCase() == primary_pan) {
                $(".hold_1").html("<small>Second Holder's PAN should not be same as primary Holder's PAN</small>");
            } else if (data.pan_numbers.toUpperCase() == pan_holder_2.toUpperCase()) {
                $(".hold_1").html("<small>Second Holder's Pan should not be same as Third Holder's pan</small>");
            } else {
                $(".hold_1").html('Please Wait...');
                $("#overlay").css('display', 'block');
                Axios.post("http://localhost:5010/api/pen_verify", data)
                    .then((response) => {
                        $("#overlay").css('display', 'none');
                        $(".holder1-msg").css({ "display": "block" });
                        $(".hold_1").html('');
                        localStorage.setItem("jointHolder1", '')
                        localStorage.setItem("jointHolderName1", '')
                        let kycVerify = response.data.data.data.ValidatePANResult.IsEKYCVerified;
                        if (kycVerify === "Y") {
                            localStorage.setItem("jointHolder1", data.pan_numbers)
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
        this.setState({ kycVerify_holder_2: "" })
        if (data.pan_numbers.length >= 10) {
            let primary_pan = $('input[name="pan"]').val();
            let pan_holder_1 = $('input[name="pan_holder_1"]').val();
            if (data.pan_numbers.toUpperCase() === primary_pan) {
                $(".hold_2").html("<small>Third Holder's PAN should not be same as primary Holder's PAN</small>");
            } else if (data.pan_numbers.toUpperCase() === pan_holder_1.toUpperCase()) {
                $(".hold_2").html("<small>Third Holder Pan should not be same as Second Holder's pan</small>");
            } else {
                $(".hold_2").html('Please Wait...');
                $("#overlay").css('display', 'block');
                Axios.post("http://localhost:5010/api/pen_verify", data)
                    .then((response) => {
                        $(".hold_2").html('');
                        $("#overlay").css('display', 'none');
                        $(".holder2-msg").css({ "display": "block" });
                        localStorage.setItem("jointHolder2", '')
                        localStorage.setItem("jointHolderName2", '')
                        let kycVerify = response.data.data.data.ValidatePANResult.IsEKYCVerified;
                        if (kycVerify === "Y") {
                            localStorage.setItem("jointHolder2", data.pan_numbers)
                            localStorage.setItem("jointHolderName2", response.data.data.data.ValidatePANResult.NameAsPerPAN)
                        }
                        this.setState({ kycVerify_holder_2: kycVerify });
                        this.setState({ kycVerify_holder_2_pan: data.pan_numbers });
                    });
            }
        }
    }
    getTaxStatus = (e) => {
        let holding = $('select[name="holding"]').val()
        const data = {
            pan_numbers: $('input[name="pan_holder_1"]').val()
        }
        if (holding == 2) {
            if (data.pan_numbers != '') {
                $(".hold_2").html('Please Wait...');
                var taxstatus = $('#tax').val();
                localStorage.setItem("taxStatus", taxstatus);
                this.setState({ usertax: taxstatus, holder_type: "2" });
            } else {
                $(".hold_1").html("Mandatory Field");
            }
        } else {
            var taxstatus = $('#tax').val();
            localStorage.setItem("taxStatus", taxstatus);
            this.setState({ usertax: taxstatus, holder_type: "1" });
        }
    }
    submitForm(e) {
        e.preventDefault();
        var pannumber = this.state.pan;
        const userPan = { pan_numbers: pannumber.toUpperCase() };
        const userData = JSON.parse(localStorage.getItem("loginUserData"))
        const user_data = { pan_numbers: pannumber.toUpperCase(), email: userData.email };
        this.setState({ checkan: "" });
        this.setState({ existingIintext: "" });
        $(".showIINData").html("");
        // $(".check_btn").html('Loading...');
        // $("#overlay").css('display', 'block');
        //  $(".check_btn").html('Check Now');
        $(".join-holder").css({ "display": "block" });
        Axios.post("http://localhost:5010/api/existingPanKyc", user_data)
            .then((resss) => {
                console.log("hh", resss.data.data)
                if (resss.data.data.status == 200) {
                    var fourthChar = userPan.pan_numbers.charAt(3);
                    if (fourthChar == "P") {
                        this.setState({ nonIndKyc: "" });
                        this.setState({ IsEKYCVerified: "" });
                        this.setState({ existingIintext: "" });
                        this.setState({ case_3: "" });
                        this.setState({ case_4: "" });
                        $(".congrats-msg").css({ "display": "none" });
                        $(".check_btn").html('Loading...');
                        Axios.post("http://localhost:5010/api/pen_verify", userPan)
                            .then((response) => {
                                //console.log("hh");
                                localStorage.setItem("userPanNo", userPan.pan_numbers);
                                let IsEKYCVerified = response.data.data.data.ValidatePANResult.IsEKYCVerified;
                                let IsKYCUnderprocess = response.data.data.data.ValidatePANResult.IsKYCUnderprocess;
                                let NameAsPerPAN = response.data.data.data.ValidatePANResult.NameAsPerPAN;
                                this.setState({ IsEKYCVerified: IsEKYCVerified, IsKYCUnderprocess: IsKYCUnderprocess });
                                this.setState({ NameAsPerPAN: NameAsPerPAN });
                                var htmldata = "";
                                if ((this.state.IsEKYCVerified === "Y") && (this.state.IsKYCUnderprocess === "Y")) {
                                }
                                if ((this.state.IsEKYCVerified == "Y") && (this.state.IsKYCUnderprocess == "N")) {
                                    const userdata = { pan_numbers: userPan.pan_numbers, inv_name: NameAsPerPAN };
                                    Axios.post("http://localhost:5010/api/getIINStatus", userdata)
                                        .then((res) => {
                                            $("#overlay").css('display', 'none');
                                            let email = localStorage.getItem("userEmail");
                                            let userStatus = res.data.data.data;
                                            let iinLength = userStatus.length;
                                            this.setState({ iinLength: iinLength });
                                            $(".existing-iin").css("display", "none");
                                            if (userStatus.length > 0) {
                                                $(".existing-iin").css("display", "block");
                                                $(".showIINData").html("");
                                                this.setState({ existingIintext: 'Great ! "' + userStatus[0].INVESTOR_NAME + '", You are already registered with us. Go ahead, you can start investing' });
                                                // let iinarray = [];
                                                for (var i = 0; i < userStatus.length; i++) {
                                                    const userIIN = { iin: userStatus[i].CUSTOMER_ID, email: email };
                                                    Axios.post("http://localhost:5010/api/GETIINDETAILS", userIIN)
                                                        .then((resIIN) => {
                                                            this.setState({ pageLink: "/prodigypro/dashboard" })
                                                            let dd = resIIN.data.data.data;
                                                            $(".check_btn").html('Check Now');
                                                            htmldata = '<div class="alert alert-secondary text-color" role="alert"><div class="row margin-bottom-10"><div class="col-md-2"><strong>Name</strong></div><div class="col-md-4"><strong>' + dd.INVESTOR_NAME + '</strong></div><div class="col-md-2"><strong>IIN</strong></div><div class="col-md-4"><strong>' + dd.CUSTOMER_ID + '</strong></div></div><div class="row"><div class="col-md-2"><strong>Tax Status</strong></div><div class="col-md-4"><strong>' + dd.TAX_STATUS_DESC + '</strong></div><div class="col-md-2"><strong>Holding Nature</strong></div><div class="col-md-4"><strong>' + dd.HOLD_NATURE_DESC + '</strong></div></div></div>';
                                                            $(".showIINData").append(htmldata);
                                                        });
                                                }
                                                this.setState({ iiNData: htmldata });
                                            } else {
                                                $(".check_btn").html('Check Now');
                                                $(".congrats-msg").css({ "display": "block" });
                                            }
                                        });
                                } else {
                                    $("#overlay").css('display', 'none');
                                    if (response.data.data.data.ValidatePANResult.ReturnCode == "-1") {
                                        //console.log("nnnnnn",this.state.IsEKYCVerified)
                                        this.setState({ ErrorMsg: response.data.data.data.ValidatePANResult.ReturnMsg });
                                    }
                                    console.log("nnnnnn", this.state.IsEKYCVerified)
                                    $(".check_btn").html('Check Now');
                                    $(".join-holder").css({ "display": "none" });
                                    $(".existing-iin").css({ "display": "none" });
                                }
                            });
                    } else {
                        $(".showIINData").html("");
                        this.setState({ nonIndKyc: "" });
                        this.setState({ IsEKYCVerified: "" });
                        this.setState({ existingIintext: "" });
                        this.setState({ case_3: "" });
                        this.setState({ case_4: "" });
                        $(".congrats-msg").css({ "display": "none" });
                        $(".check_btn").html('Loading...');
                        $(".existing-iin").css({ "display": "none" });
                        Axios.post("http://localhost:5010/api/pen_verify", userPan)
                            .then((response) => {
                                localStorage.setItem("userPanNo", userPan.pan_numbers);
                                let IsEKYCVerified = response.data.data.data.ValidatePANResult.IsEKYCVerified;
                                let NameAsPerPAN = response.data.data.data.ValidatePANResult.NameAsPerPAN;
                                this.setState({ nonIndKyc: IsEKYCVerified });
                                this.setState({ NameAsPerPAN: NameAsPerPAN });
                                var htmldata = "";
                                if (this.state.nonIndKyc == "Y") {
                                    Axios.post("http://localhost:5010/api/isPANexist", userPan)
                                        .then((response) => {
                                            Axios.post("http://localhost:5010/api/getIINStatus", userPan)
                                                .then((res) => {
                                                    $("#overlay").css('display', 'none');
                                                    $(".check_btn").html('Check Now');
                                                    let wms = response.data.data.status
                                                    let iin = res.data.data.status
                                                    let email = localStorage.getItem("userEmail");
                                                    $(".existing-iin").css("display", "none");
                                                    if ((iin == 200) && (wms == 200)) {
                                                        $(".existing-iin").css("display", "block");
                                                        $(".showIINData").html("");
                                                        let userStatus = res.data.data.data
                                                        this.setState({ existingIintext: 'Great ! "' + userStatus[0].INVESTOR_NAME + '", You are already registered with us. Go ahead, you can start investing' });
                                                        let iinarray = [];
                                                        for (var i = 0; i < userStatus.length; i++) {
                                                            const userIIN = { iin: userStatus[i].CUSTOMER_ID, email: email };
                                                            Axios.post("http://localhost:5010/api/GETIINDETAILSWMS", userIIN)
                                                                .then((resIIN) => {
                                                                    this.setState({ pageLink: "/dashboard" })
                                                                    let dd = resIIN.data.data.data;
                                                                    $(".check_btn").html('Check Now');
                                                                    htmldata = '<div class="alert alert-secondary text-color" role="alert"><div class="row margin-bottom-10"><div class="col-md-2"><strong>Name</strong></div><div class="col-md-4"><strong>' + dd.INVESTOR_NAME + '</strong></div><div class="col-md-2"><strong>IIN</strong></div><div class="col-md-4"><strong>' + dd.CUSTOMER_ID + '</strong></div></div><div class="row"><div class="col-md-2"><strong>Tax Status</strong></div><div class="col-md-4"><strong>' + dd.TAX_STATUS_DESC + '</strong></div><div class="col-md-2"><strong>Holding Nature</strong></div><div class="col-md-4"><strong>' + dd.HOLD_NATURE_DESC + '</strong></div></div></div>';
                                                                    $(".showIINData").append(htmldata);
                                                                });
                                                        }
                                                        this.setState({ iiNData: htmldata });
                                                    }
                                                    if ((iin == 400) && (wms == 200)) {
                                                        this.setState({ case_3: "1" })
                                                        console.log("wms", "case_3")
                                                    }
                                                    if ((iin == 400) && (wms == 400)) {
                                                        this.setState({ case_4: "1" })
                                                        console.log("wms", "case_4")
                                                    }
                                                });
                                        });
                                } else {
                                    $("#overlay").css('display', 'none');
                                    $(".check_btn").html('Check Now');
                                    $(".join-holder").css({ "display": "none" });
                                    $(".existing-iin").css({ "display": "none" });
                                }
                            });
                    }
                } else {
                    $("#overlay").css('display', 'none');
                    this.setState({ pageLink: "" })
                    $(".check_btn").html('Check Now');
                    this.setState({ checkan: resss.data.data.message });
                }
            })
    }
    render() {
        // if(this.state.usertax){
        //     return <Redirect to='/prodigypro/required-document-info-yes' />
        // }
        if (this.state.usertax) {
            return <Redirect to={{
                pathname: "/prodigypro/required-document-info-yes",
                holder_type: this.state.holder_type,
                kycVerify_holder_1: this.state.kycVerify_holder_1,
                kycVerify_holder_2: this.state.kycVerify_holder_2,
                IsEKYCHoder_1: this.state.kycVerify_holder_1_pan,
                IsEKYCHoder_2: this.state.kycVerify_holder_2_pan,
            }} />
        }
        if (localStorage.getItem("userLoggedId") == null) {
            return <Redirect to='/prodigypro' />
        }
        const isnonIndKyc = this.state.nonIndKyc;
        const isLoggedIn = this.state.IsEKYCVerified;
        // console.log("111", isLoggedIn)
        const iinLengthdata = this.state.iinLength;
        let massage = '';
        let hadding;
        let holder_msg;
        const case_3 = this.state.case_3;
        const case_4 = this.state.case_4;
        if (this.state.checkan) {
            massage = < div className="alert alert-cust mt-5"
                role="alert" >
                {/* <h4 className="alert-heading" > OOPS! </h4>  */}
                <div className="pb-2" >
                    <span className="para" > {this.state.checkan} </span>
                </div>
            </div>;
        }
        if (this.state.ErrorMsg) {
            massage = < div className="alert alert-cust mt-5"
                role="alert" >
                {/* <h4 className="alert-heading" > OOPS! </h4>  */}
                <div className="pb-2" >
                    <span className="para" > {this.state.ErrorMsg} </span>
                </div>
            </div>;
        }
        if ((this.state.IsEKYCVerified == "Y") && (this.state.IsKYCUnderprocess == "Y")) {
            massage = < div className="alert alert-cust mt-5"
                role="alert" >
                {/* <h4 className="alert-heading" > OOPS! </h4>  */}
                <div className="pb-2" >
                    <span className="para" >Your KYC is under process, only fresh KYC can be done.<br></br>
                        For more details please contact - <a href="mailto:enquiry@bfccapital.com">enquiry@bfccapital.com</a> </span>
                </div>
            </div>;
        }
        if (isnonIndKyc == "N") {
            massage = < div className="alert alert-cust mt-5"
                role="alert" >
                {/* <h4 className="alert-heading" > OOPS! </h4>  */}
                <div className="pb-2" >
                    <span className="para" > Non-Individual KYC will require some additional formalities. Please <a href="/prodigypro/query?Non-Individual-KYC"
                        className="text-info font-weight-bold" >  click here </a>. </span>
                </div>
            </div>;
        }
        if (case_3 == "1") {
            massage = < div className="alert alert-cust mt-3"
                role="alert" >
                <div className="pb-2" >
                    <span className="para" >
                        <h6 className="text-left text-danger" > Note: </h6> <p className="text-left" >  As per your PAN, we have your investment details with us.To view your portfolio click on proceed</p>
                        <p>OR</p>
                        <p>If you want to complete a One Time Registration to start investing online please <a href="/prodigypro/query?one-time" className="text-info font-weight-bold" >  click here </a>.</p></span>
                    <div className="text-right">
                        <a href="/prodigypro/dashboard" className="btn btn-success btn-sm " >Proceed </a>
                    </div>
                </div> </div>
        }
        if (case_4 == "1") {
            massage = < div className="alert alert-cust mt-5"
                role="alert" >
                {/* <h4 className="alert-heading" > OOPS! </h4>  */}
                <div className="pb-2" >
                    <span className="para">As per your PAN, it seems that you are not registered with us. You need to complete a One Time Registration to start investing online please <a href="/prodigypro/required-document-info-yes" className="text-info font-weight-bold" >  click here </a>. </span>
                </div>
            </div>;
        }
        if (isLoggedIn == "Y" && iinLengthdata == 0) {
            hadding = <h5 className="font-weight-600" > Welcome {this.state.NameAsPerPAN}! </h5>;
            massage = <div className="alert alert-cust mt-3 congrats-msg"
                role="alert" >
                < h4 className="alert-heading" > Congrats {this.state.NameAsPerPAN}! </h4> <div className="pb-2"> {
                    /* <span className="para">
                    We do not have your details with us. You need to register to start your investment journey Please share your details and you are all set for investing
                    </span> */
                } <span className="para" >
                        You are KYC complied. </span> <span className="pull-right pb-3 mt-1" >
                        <a href="javascript:void(0)"
                            onClick={this.userHolder}
                            className="btn btn-danger" > Continue </a> </span> </div> </div>;
        } else if (isLoggedIn == "N") {
            // console.log("111","isLoggedIn")
            massage = < div className="alert alert-cust mt-5"
                role="alert" >
                <h4 className="alert-heading" > OOPS! </h4> <div className="pb-2" >
                    <span className="para" > Seems like you are yet to complete your KYC formalities. </span> <span className="pull-right" > <a href="/prodigypro/needed-info?kyc-registration"
                        className="btn btn-danger" > Complete your KYC </a></span >
                </div> <hr /> <p className="para" > Note: As per regulatory provisions, you need to complete the one - time KYC registration process before proceeding.For more details < a href={pdf} target="_blank" > Click Here </a></p >
            </div>;
            // console.log("massage",massage)
        }
        if (this.state.kycVerify_holder_1 === "N") {
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

        const taxstatus = [
            { value: 'Select Tax Status', label: 'Select Tax Status' },
          
            { value: ' NRI', label: ' NRI' },
           
            ];
            const holding = [
           
            { value: 'Single Holding ', label: 'Single Holding ' },
            { value: 'Anyone / Survivor', label: 'Anyone / Survivor' },
            ];
        return (
            <>
                <StyleComponent />
                <style > {`
                        body{
                        background-color:#f2f3f7;
                        }
                        .welcome-div-upper{
                        background-color:#fff;
                        }
                        .form-control{
                        border-radius: 0rem;
                        height: calc(2.25rem + 6px);
                        border-color: #939393 !important;
                        border:none;
                        border-radius: 0rem!important;
                        border-bottom: 2px solid #939393 !important;
                        }
                        
                        .form-control:focus {
                        color: #495057;
                        background-color: #fff;
                        border-color: #939393 !important;
                        border-bottom: 2px solid #939393 !important;
                        transition: all 0.2s ease 0s;
                        outline: 0;
                        box-shadow: none;
                        border-radius: 0rem;
                        height: calc(2.25rem + 6px);
                        }
                        .content-center{
                        margin-top:-2rem;
                        margin-bottom:1rem;
                        }
                        .existing-iin{
                        display:none;
                        }
                        .join_hold{
                        display:none;
                        }
                        .join-holder{
                        display:none;
                        }
                        .join-holder ..alert-info{
                        color: #000000;
                        background-color: transparent;
                        border-color: transparent;
                        margin-top: 1rem!important;
                        }
                        .join-holder ..alert-info{
                        font-size: 16px !important;
                        }
                        // .pan-form #pan, #holder-1-pan, #holder-2-pan {
                        //     text-transform: lowercase;
                        // }
                        .errormsg {
                        text-align: left;
                        color: #ff0202;
                        }
                        .successmsg{
                        text-align: left;
                        color: #0f6848;
                        }
                        .para {
                        font-size: 16px;
                        color: #000;
                        }
                        .join-holder .alert.alert-info {
                        background: transparent;
                        border: transparent;
                        margin-top: 5px !important;
                        }
                        button{
                        outline: none !important;
                        }
                        .col-8.offset-md-2.welcome-div-upper {
                        min-height: 350px !important;
                        }
                        .btn-color-green{
                        background-color:#00d09c !important;
                        }
                        .btn-color-green .round{
                        background-color: #00ac81 !important;
                        }
                        .text-color{
                        color: #858796;
                        }
                        .margin-bottom-10{
                        margin-bottom: 10px;
                        }
                        #overlay{
                        display:none;
                        }
                        .text-label {
                        color: #000;
                        }
                        .mxw
                        {
                        max-width:252px;
                        }
                        .btn-pf
                        {
                        padding: 11px 32px !important;
                        font-size: 13px!important;
                        }
                        
                        
                        ` }
                </style>
                <div id="overlay" >
                    <div class="spinner"></div>
                    <br /><b className="text-danger">Please Wait...</b>
                </div>
                <div className="container-fluid m-0 p-0 r-form"  >
                    <div className='row '>

                        <div className="col-8 offset-md-2 welcome-div-upper text-center shadow-custom bgform" >

                            <img className="logo" src="assets/images/brand.png" alt='' />


                            <div className="col-12  pt-2" >
                                <div className='row'>
                                    <div className='col-md-6 '>
                                        <p className="pt-4  kyc-p" > We are eager to get you going. Let’s start by checking
                                            if you are KYC compliant. Just fill in your PAN in the box below </p>

                                        <div className="align-self-center">

                                            <spen className="text-danger pull-left" > {this.state.Fieldtext} </spen>
                                            <form action="#"
                                                method="Post"
                                                className="form-inline pan-form my-auto"
                                                onSubmit={this.submitForm} >
                                                <div className='row'>
                                                    <div className='col-md-6'>
                                                        <span className="has-float-label" >
                                                            <input className="form-control border-bottom1 mxw"
                                                                id="pan"
                                                                type="text"
                                                                maxLength="10"
                                                                placeholder="Enter PAN card number"
                                                                name="pan"
                                                                defaultValue={this.state.userPanNo == "" ? this.state.pan : this.state.userPanNo}
                                                                onChange={this.onChange}
                                                                required />
                                                            {/* <label
                                                                        for="pan"
                                                                        className="text-label" > Enter PAN <span className="text-danger">*</span> </label> */}

                                                        </span>
                                                    </div>
                                                    <div className='col-md-1'></div>
                                                    <div className="col-md-5 " >
                                                        <button className="new-btn1 border-0 btn-pf"
                                                            id="btnFetch" >
                                                            Check Now
                                                        </button>
                                                    </div></div> </form> </div> </div>
                                    <div className='col-md-6'>
                                        <img className="img-fluid" src="assets/images/kyc.png" />
                                    </div>
                                </div>
                            </div>
                            {massage}
                            { /* if visiter have existing IIN. */} <div className="existing-iin" >
                                {this.state.existingIintext ?
                                    < div className="alert alert-info mt-5"
                                        role="alert" >
                                        <span className="para existingIintext" > {this.state.existingIintext} </span> </div>
                                    : null}
                                {
                                    /* {this.state.iiNData.map((item, index) => (
                                    <div>hello</div>
                                    ))} */
                                } { /* {this.state.iiNData} */}
                                <div className="showIINData" >
                                </div>
                                {this.state.pageLink !== '' ?
                                    <a href={this.state.pageLink != '' ? this.state.pageLink : null}
                                        class="new-btn1 pp" >
                                        Proceed
                                    </a>
                                    : null}
                                {
                                    /* <a class="btn-theme-1 btn-theme-effect pull-right" href="">
                                        <span class="button-text">Proceed for KYC</span>
                                        <span class="round"><i class="fa fa-chevron-right"></i></span>
                                    </a> */
                                } </div>
                            { /* if visiter have no existing IIN. */} <div className="join-holder" >
                                <div className="alert alert-cust mt-5"
                                    role="alert" >
                                    <span className="para" > As per your PAN, we do not have your details with us.You need to register to start your investment journey.Please provide your details. </span> </div> <div className="col-6 offset-md-3 text-center pt-2" >
                                    <span className="has-float-label " >
                                        {/* <select className="form-control input-text"
                                            id="tax" >
                                            <option >-- Individual-- </option> <option > NRI </option> </select>  */}
                                            <label
                                                for="tax"
                                                className="text-label" > Select Tax Status </label> <span className="text-danger">*</span></span>
                                    <Select className='' options={taxstatus} />
                                  
                                    <span className="has-float-label mt-4" >
                                        {/* <select className="form-control input-text"
                                            id="holding"
                                            name="holding"
                                            onChange={this.join_holding} >
                                            <option value="1" selected={this.state.holder_type == "1" ? "selected" : null} > --Single Holding-- </option>
                                            <option value="2" selected={this.state.holder_type == "2" ? "selected" : null}> Anyone / Survivor </option>
                                        </select> */}
                                        <label for="holding" className="text-label" > Select Holding Nature <span className="text-danger">*</span></label> </span>
                                        <Select className='' options={holding} />
                                </div>
                                <div className="join_hold" > { /* PAN of Joint Holder 2 */} <div className="col-6 offset-md-3 text-center pt-2" >
                                    <form action="#"
                                        method="Post"
                                        className="mb-3" >
                                        <span className="has-float-label" >
                                            <input className="form-control input-text"
                                                id="holder-1-pan"
                                                name="pan_holder_1"
                                                type="text"
                                                placeholder="Enter PAN *"
                                                defaultValue={this.state.kycVerify_holder_1_pan ? this.state.kycVerify_holder_1_pan : localStorage.getItem("jointHolder1")}
                                                onKeyUp={this.holder_1}
                                            /> <label
                                                for="holder-1-pan"
                                                className="text-label" >  Second Holder's PAN </label> <span className="text-danger">*</span></span> < span className="hold_1 pull-left text-danger" > </span> {
                                            this.state.kycVerify_holder_1 == "N" ?
                                                <div className="errormsg holder1-msg" >
                                                    <span > KYC not complied.To complete KYC < a href={"needed-info?holder-one?" + this.state.kycVerify_holder_1_pan}> Click here </a></span >
                                                </div> :
                                                null
                                        }
                                        {
                                            this.state.kycVerify_holder_1 == "Y" ?
                                                <div className="successmsg holder1-msg" >
                                                    <span > Awesome!KYC complied </span> </div> :
                                                null
                                        } </form> </div>
                                    <br></br>
                                    <div className="col-6 offset-md-3 text-center pt-2" >
                                        <form action="#"
                                            method="Post"
                                            className="mb-3" >
                                            <span className="has-float-label" >
                                                <input className="form-control input-text"
                                                    id="holder-2-pan"
                                                    name="pan_holder_2"
                                                    type="text"
                                                    placeholder="Enter PAN"
                                                    defaultValue={this.state.kycVerify_holder_2_pan ? this.state.kycVerify_holder_2_pan : localStorage.getItem("jointHolder2")}
                                                    onKeyUp={this.holder_2}
                                                /> <label
                                                    for="holder-2-pan"
                                                    className="text-label" > Third Holder's PAN  </label> </span> <
                                                        span className="hold_2 pull-left text-danger" > </span>
                                            {
                                                this.state.kycVerify_holder_2 == "N" ?
                                                    <div className="errormsg holder2-msg" >
                                                        <span > KYC not complied.To complete KYC < a href={"needed-info?holder-two?" + this.state.kycVerify_holder_2_pan} > Click here </a></span >
                                                    </div> :
                                                    null
                                            }
                                            {
                                                this.state.kycVerify_holder_2 == "Y" ?
                                                    < div className="successmsg holder2-msg" >
                                                        <span > Awesome!KYC complied </span> </div> :
                                                    null
                                            } </form> </div>
                                </div>
                                <br />
                                {holder_msg}
                                <a href="javascript:void(0);"
                                    class="new-btn1 float-right" onClick={this.getTaxStatus} >
                                    Proceed
                                </a> {
                                    /* <a class="btn-theme-3 btn-theme-effect">
                                        <span class="button-text">Proceed with single Holding</span>
                                        <span class="round"><i class="fa fa-chevron-right"></i></span>
                                    </a> */
                                } </div>


                            <br />

                        </div>
                    </div>
                </div>
            </>
        )
    }
}
export default Pan_Verification