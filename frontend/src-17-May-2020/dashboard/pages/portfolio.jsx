import React from 'react';
import Header from './header';
import Footer from './footer';
import Sidebar from './sidebar';
import { Helmet } from "react-helmet";
// import {Transact_Icon_Group} from './short-components';
import Axios from 'axios';
import StyleComponent from './styleComponent';
import $ from 'jquery';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import add_purchase_icon from "../../assets/images/icons/transact-add-purchase.png";
import sip_icon from "../../assets/images/icons/simply-sip-2.png";
import switch_icon from "../../assets/images/icons/transact-switch.png";
import redemption_icon from "../../assets/images/icons/redemption.png";
import Swal from 'sweetalert2'

class Portfolio extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            users: []
        };

        this.state = {
            Items: []
        };

        this.state = {
            profilioPan: this.props.location.profilioPan,
            profilioName: this.props.location.profilioName
        };
        // this.getDetails = this.getDetails.bind(this);
    }

    componentDidMount() {
        this.setState({ Paymentlink: "" })
        $("#perpetual_val").val("Y");
        const userData = JSON.parse(localStorage.getItem("loginUserData"))
        this.setState({userIin:userData.iin})
        let pan = '';
        if ((userData.pan_card == '') || (userData.pan_card == null)) {
            pan = localStorage.getItem("userPanNo");
        } else {
            pan = userData.pan_card
        }

        const value = {
            pan_card: pan,
        }

        Axios.post("/prodigypro/api/portfolio", value)
            .then((result) => {
                // console.log("userData",result.data.data.data)
                this.setState({ userData: result.data.data.data })
                this.setState({ portfolioData: result.data.data.data })
                if (this.state.profilioName != undefined) {
                    var pan = ''; var guard_pan = '';
                    if (this.state.profilioPan != '') {
                        pan = this.state.profilioPan;
                        guard_pan = "";
                    } else {
                        pan = "";
                        guard_pan = userData.pan_card;
                    }

                    const data = {
                        pan: pan,
                        name: this.state.profilioName,
                        guard_pan: guard_pan,
                    }

                    Axios.post("/prodigypro/api/portfolioDetailApi", data)
                        .then((res) => {
                            $("#overlay").css("display", "none")
                            this.setState({ userDeatilData: res.data.data.data.portfolio_data })
                            const uniquetype = [...new Set(res.data.data.data.portfolio_data.map(q => q.type))];
                            this.setState({ uniquetype: uniquetype });
                        })
                } else {

                    if (result.data.data.status == 400) {
                        $("#overlay").css("display", "none")
                        this.setState({ uniquetype: [] });
                    } else {
                        const data = {
                            pan: result.data.data.data[0].pan,
                            name: result.data.data.data[0].name,
                            guard_pan: "",
                        }

                        Axios.post("/prodigypro/api/portfolioDetailApi", data)
                            .then((res) => {
                                $("#overlay").css("display", "none")
                                this.setState({ userDeatilData: res.data.data.data.portfolio_data })
                                const uniquetype = [...new Set(res.data.data.data.portfolio_data.map(q => q.type))];
                                this.setState({ uniquetype: uniquetype });
                            })

                    }

                }
            })

        const data = {
            email: userData.email,
        }

        Axios.post("/prodigypro/api/User_profile", data)
            .then((res) => {
                console.log("userData", res.data.data.data)
                this.setState({ userList: res.data.data.data })
            })

    }

    iinNull=e=>{
        Swal.fire({
          html: `Dear Investor, you need to complete a One Time Registration for Investing online. Please contact us ! BFC Capital - <a href="mailto:enquiry@bfccapital.com">enquiry@bfccapital.com</a>`,
          dangerMode: true,
        })
      }

    userProfile = (e) => {
        // $("#additionalPurchase").modal('show');
        const userData = JSON.parse(localStorage.getItem("loginUserData"))
        this.setState({ uniquetype: "" });
        this.setState({ userTotalVal: "" })
        let pan_card = $('select[name="userPro_id"]').val();
        // const data ='';
        if (pan_card == '') {

            const data = {
                pan: "",
                name: $("#userPro_id option:selected").text(),
                guard_pan: userData.pan_card,
            }

            // alert(JSON.stringify(data))
            //$(".wait").css('display','block')
            $(".footer_tr").css('display', 'none')
            $("#overlay").css("display", "block")
            Axios.post("/prodigypro/api/portfolioDetailApi", data)
                .then((res) => {
                    $("#overlay").css("display", "none")
                    //$(".wait").css('display','none');
                    $(".footer_tr").css('display', 'block');
                    this.setState({ userDeatilData: res.data.data.data.portfolio_data })
                    const uniquetype = [...new Set(res.data.data.data.portfolio_data.map(q => q.type))];
                    this.setState({ uniquetype: uniquetype });
                    // console.log("ss",res.data.data.data.portfolio_data)
                })
        } else {

            const data = {
                pan: $('select[name="userPro_id"]').val(),
                name: $("#userPro_id option:selected").text(),
                guard_pan: "",
            }
            // alert(JSON.stringify(data))

            //$(".wait").css('display','block')
            $(".footer_tr").css('display', 'none')
            $("#overlay").css("display", "block")
            Axios.post("/prodigypro/api/portfolioDetailApi", data)
                .then((res) => {
                    $("#overlay").css("display", "none")
                    //$(".wait").css('display','none');
                    $(".footer_tr").css('display', 'block');
                    this.setState({ userDeatilData: res.data.data.data.portfolio_data })
                    const uniquetype = [...new Set(res.data.data.data.portfolio_data.map(q => q.type))];
                    this.setState({ uniquetype: uniquetype });
                    // console.log("ss",res.data.data.data.portfolio_data)
                })
        }

    }


    add_purchase(folio, isin, schemeName) {
        const userData = JSON.parse(localStorage.getItem("loginUserData"))
        $('input[name="add_amt"]').val("")
        $('select[name="add_paymentMode"]').val("")
        $('select[name="add_bankName"]').val("")
        $('select[name="add_mandate"]').val("")
        // $("input:radio[name=add_payType]:checked").val("")
        $('input[name="add_payType"]').prop('checked', false)
        $("#payTypeDiv").css({ "display": "none" });
        $("#bankNameDiv").css({ "display": "none" });
        $("#mandateDiv").css({ "display": "none" });
        this.state.userDeatilData.map(item => {
            if ((folio == item.folio) && (isin == item.isin) && (schemeName == item.scheme)) {
                const substring = "Direct";
                const substring2 = "DIRECT";
                if ((item.scheme.includes(substring) == true) || (item.scheme.includes(substring2) == true)) {
                    window.$("#exampleModalCenter").modal('show');
                    this.setState({ alertMsg: "This order cannot be executed against the selected plan." })
                } else {
                    console.log("nn", item)
                    const data = {
                        folio_No: item.folio,
                        product_code: item.product_code,
                    }
                    Axios.post("/prodigypro/api/portfolio_FolioDetails", data)
                        .then((res) => {
                            console.log("portfolio_FolioDetails", res.data.data.data)
                            let folioData = res.data.data.data;

                            if ((res.data.data.data.status == "M") && (res.data.data.data.status != null)) {
                                this.state.userList.map((user) => {
                                    if (user.fh_pan_no == "undefined") {
                                        window.$("#additionalPurchase").modal('show');
                                        let iin = user.customer_id;
                                        console.log("iin SI join one", iin)
                                        const bankData = {
                                            email: userData.email,
                                            iin: iin,
                                        }

                                        Axios.post("/prodigypro/api/getbankList", bankData)
                                            .then((res) => {
                                                console.log("userBankList", res.data.data.data)
                                                this.setState({ userBankList: res.data.data.data })
                                            })

                                        const mandate = {
                                            email: userData.email,
                                            IIN: user.customer_id,
                                        }

                                        Axios.post("/prodigypro/api/mandateList", mandate)
                                            .then((res) => {
                                                console.log("userMandateList", res.data)
                                                this.setState({ userMandateList: res.data.data.data })
                                            })

                                        const dateData = {
                                            amc_code: folioData.amc,
                                            product_code: folioData.product_code,
                                            isin: folioData.isin
                                        }
                                        console.log("getSipStpSwpDates aa", dateData)
                                        Axios.post("/prodigypro/api/getSipStpSwpDates", dateData)
                                            .then((res) => {
                                                console.log("getSipStpSwpDates", res.data)
                                                this.setState({ userSchemeDates: res.data.data.data })
                                            })

                                        this.setState({ userDetail: bankData })
                                    }

                                })
                            }
                            else if ((res.data.data.data.holder_nature == "SI") || (res.data.data.data.holder_nature == "SINGLE")) {
                                var sr = 1; var ss = 1;
                                this.state.userList.map((user) => {
                                    var sr = 1; var ss = 1;
                                    if ((folioData.pan == user.fh_pan_no) && ((folioData.holder_nature == user.hold_n_code) || (folioData.holder_nature == user.hold_nature_desc))) {
                                        console.log("iin", folioData.pan + " = " + user.fh_pan_no)
                                        window.$("#additionalPurchase").modal('show');
                                        let iin = user.customer_id;
                                        console.log("iin SI join one", iin)
                                        const bankData = {
                                            email: userData.email,
                                            iin: iin,
                                        }

                                        Axios.post("/prodigypro/api/getbankList", bankData)
                                            .then((res) => {
                                                console.log("userBankList", res.data.data.data)
                                                this.setState({ userBankList: res.data.data.data })
                                            })

                                        const mandate = {
                                            email: userData.email,
                                            IIN: user.customer_id,
                                        }

                                        Axios.post("/prodigypro/api/mandateList", mandate)
                                            .then((res) => {
                                                console.log("userMandateList", res.data)
                                                this.setState({ userMandateList: res.data.data.data })
                                            })

                                        const dateData = {
                                            amc_code: folioData.amc,
                                            product_code: folioData.product_code,
                                            isin: folioData.isin
                                        }
                                        // console.log("getSipStpSwpDates",dateData)
                                        Axios.post("/prodigypro/api/getSipStpSwpDates", dateData)
                                            .then((res) => {
                                                console.log("getSipStpSwpDates", res.data)
                                                const swp_date_arr = res.data.data.data.SIP_DATES.split(',');
                                                this.setState({ userSwpDate: swp_date_arr })
                                                this.setState({ userSchemeDates: res.data.data.data })
                                            })
                                        sr++
                                        this.setState({ userDetail: bankData })
                                    }
                                })
                            } else {
                                var sr = 1; var ss = 1;
                                this.state.userList.map((user) => {
                                    if ((res.data.data.data.jh2_name) && (res.data.data.data.jh1_name)) {
                                        if ((folioData.jh2_name == user.jh2_name) && (folioData.jh2_pan == user.jh2_pan_no) && (folioData.jh1_name == user.jh1_name) && (folioData.jh1_pan == user.jh1_pan_no) && (folioData.pan == user.fh_pan_no)) {
                                            window.$("#").modal('show');
                                            let iin = user.customer_id;
                                            console.log("iin join two", iin)
                                            const bankData = {
                                                email: userData.email,
                                                iin: iin,
                                            }

                                            Axios.post("/prodigypro/api/getbankList", bankData)
                                                .then((res) => {
                                                    console.log("userBankList", res.data.data.data)
                                                    this.setState({ userBankList: res.data.data.data })
                                                })

                                            const mandate = {
                                                email: userData.email,
                                                IIN: user.customer_id,
                                            }
                                            Axios.post("/prodigypro/api/mandateList", mandate)
                                                .then((res) => {
                                                    console.log("userMandateList", res.data)
                                                    this.setState({ userMandateList: res.data.data.data })
                                                })

                                            const dateData = {
                                                amc_code: folioData.amc,
                                                product_code: folioData.product_code,
                                                isin: folioData.isin
                                            }
                                            // console.log("getSipStpSwpDates",dateData)
                                            Axios.post("/prodigypro/api/getSipStpSwpDates", dateData)
                                                .then((res) => {
                                                    console.log("getSipStpSwpDates", res.data)
                                                    this.setState({ userSchemeDates: res.data.data.data })
                                                })
                                            sr++;
                                            this.setState({ userDetail: bankData })
                                        }
                                        else {
                                            console.log("AS 2 ss", ss)
                                            if (ss == this.state.userList.length) {
                                                window.$("#exampleModalCenter").modal('show');
                                                this.setState({ alertMsg: "Scheme not registered with IIN!" })
                                            }
                                            ss++
                                        }
                                    } else if (res.data.data.data.jh1_name) {
                                        if ((folioData.jh1_name == user.jh1_name) && (folioData.jh1_pan == user.jh1_pan_no) && (folioData.pan == user.fh_pan_no)) {
                                            window.$("#additionalPurchase").modal('show');
                                            let iin = user.customer_id;
                                            console.log("iin join one", iin)
                                            const bankData = {
                                                email: userData.email,
                                                iin: iin,
                                            }

                                            Axios.post("/prodigypro/api/getbankList", bankData)
                                                .then((res) => {
                                                    console.log("userBankList", res.data.data.data)
                                                    this.setState({ userBankList: res.data.data.data })
                                                })

                                            const mandate = {
                                                email: userData.email,
                                                IIN: user.customer_id,
                                            }

                                            Axios.post("/prodigypro/api/mandateList", mandate)
                                                .then((res) => {
                                                    console.log("userMandateList", res.data)
                                                    this.setState({ userMandateList: res.data.data.data })
                                                })

                                            const dateData = {
                                                amc_code: folioData.amc,
                                                product_code: folioData.product_code,
                                                isin: folioData.isin
                                            }
                                            // console.log("getSipStpSwpDates",dateData)
                                            Axios.post("/prodigypro/api/getSipStpSwpDates", dateData)
                                                .then((res) => {
                                                    console.log("getSipStpSwpDates", res.data)
                                                    this.setState({ userSchemeDates: res.data.data.data })
                                                })
                                            sr++;
                                            this.setState({ userDetail: bankData })
                                        } else {
                                            console.log("AS 2 ss", ss)
                                            if (ss == this.state.userList.length) {
                                                window.$("#exampleModalCenter").modal('show');
                                                this.setState({ alertMsg: "Scheme not registered with IIN!" })
                                            }
                                            ss++
                                        }
                                    } else {
                                        window.$("#exampleModalCenter").modal('show');
                                        this.setState({ alertMsg: "Scheme not registered with IIN!" })
                                        console.log("iin join AS", "Scheme not registered with IIN!")
                                    }
                                })
                            }
                            this.setState({ userSchemeList: item })
                            // window.$("#additionalPurchase").modal('show');
                        })
                }

            }
        });

    }

    getbank = (e) => {
        this.setState({ Paymentlink: "" })
        let payMode = $('select[name="add_paymentMode"]').val();
        if (payMode == "OL") {
            $("#payTypeDiv").css({ "display": "block" });
            $("#bankNameDiv").css({ "display": "block" });
            $("#mandateDiv").css({ "display": "none" });
        } else if (payMode == "TR") {
            $("#payTypeDiv").css({ "display": "none" });
            $("#bankNameDiv").css({ "display": "block" });
            $("#mandateDiv").css({ "display": "none" });
        } else if (payMode == "UPI") {
            $("#payTypeDiv").css({ "display": "block" });
            $("#bankNameDiv").css({ "display": "block" });
            $("#mandateDiv").css({ "display": "none" });
        } else if (payMode == "M") {
            $("#payTypeDiv").css({ "display": "none" });
            $("#bankNameDiv").css({ "display": "none" });
            $("#mandateDiv").css({ "display": "block" });
        } else {
            $("#payTypeDiv").css({ "display": "none" });
            $("#bankNameDiv").css({ "display": "none" });
            $("#mandateDiv").css({ "display": "none" });
        }
    }

    getMandate = (e) => {
        this.setState({ userMandate: "" })
        let mandate = $('select[name="add_mandate"]').val();
        this.state.userMandateList.map(val => {
            if (val.MANDATE_ID == mandate) {
                this.setState({ userMandate: { umrn: val.UMRN_NO, bank_code: val.BANK_CODE, holder_name: val.INVESTOR_NAME, accountNo: val.ACCOUNT_NO, acoount_type: val.AC_TYPE, branch: val.BRANCH, ifsc_code: "" } })
            }
        })
    }

    bankDetail = (e) => {
        let bankCode = $('select[name="add_bankName"]').val();
        //  alert(bankCode)
        this.setState({ userMandate: "" })
        this.state.userBankList.map((val, key) => {
            if (val.bank_code == bankCode) {
                console.log("userMandate", { umrn: "", bank_code: val.bank_code, holder_name: this.state.userSchemeList.name, accountNo: val.ac_no, ifsc_code: val.ifsc_code, branch: val.branch_name })

                this.setState({ userMandate: { umrn: "", bank_code: val.bank_code, holder_name: this.state.userSchemeList.name, accountNo: val.ac_no, ifsc_code: val.ifsc_code, branch: val.branch_name } })
            }
        })
    }

    purchaseFromValidation(data) {
        let dataErr = [];
        if (data.amount == "") {
            var isValid = { amount: "1" }
            dataErr.push(isValid);
            this.setState({ add_amt_err: "Mandatory Field" });
        } else {

            this.setState({ add_amt_err: "" });
        }

        if (data.paymentMode == "") {
            var isValid = { paymentMode: "1" }
            dataErr.push(isValid);
            this.setState({ add_paymentMode_err: "Mandatory Field" });
        } else {
            // var isValid = true;
            this.setState({ add_paymentMode_err: "" });
        }


        if (data.paymentMode == "OL") {
            if (data.payType == undefined) {
                var isValid = { payType: "1" }
                dataErr.push(isValid);
                this.setState({ add_payType_err: "Mandatory Field" });
            } else {
                // var isValid = true;
                this.setState({ add_payType_err: "" });
            }

            if (data.bankName == "") {
                var isValid = { bankName: "1" }
                dataErr.push(isValid);
                this.setState({ add_bankName_err: "Mandatory Field" });
            } else {
                // var isValid = true;
                this.setState({ add_bankName_err: "" });
            }

        } else if (data.paymentMode == "TR") {

            if (data.bankName == "") {
                var isValid = { bankName: "1" }
                dataErr.push(isValid);
                this.setState({ add_bankName_err: "Mandatory Field" });
            } else {
                // var isValid = true;
                this.setState({ add_bankName_err: "" });
            }

        } else if (data.paymentMode == "UPI") {

            if (data.payType == undefined) {
                var isValid = { payType: "1" }
                dataErr.push(isValid);
                this.setState({ add_payType_err: "Mandatory Field" });
            } else {
                // var isValid = true;
                this.setState({ add_payType_err: "" });
            }

            if (data.bankName == "") {
                var isValid = { bankName: "1" }
                dataErr.push(isValid);
                this.setState({ add_bankName_err: "Mandatory Field" });
            } else {
                // var isValid = true;
                this.setState({ add_bankName_err: "" });
            }

        } else if (data.paymentMode == "M") {
            if (data.mandate == "") {
                var isValid = { mandate: "1" }
                dataErr.push(isValid);
                this.setState({ add_mandate_err: "Mandatory Field" });
            } else {
                // var isValid = true;
                this.setState({ add_mandate_err: "" });
            }
        }
        //alert(dataErr.length)
        return dataErr.length;
    }

    addPurchaseOrder = (e) => {
        this.setState({ Paymentlink: "" })
        let data = [];
        const dataInfo = {
            amount: $('input[name="add_amt"]').val(),
            paymentMode: $('select[name="add_paymentMode"]').val(),
            bankName: $('select[name="add_bankName"]').val(),
            mandate: $('select[name="add_mandate"]').val(),
            payType: $("input:radio[name=add_payType]:checked").val(),
        }

        // alert(dataInfo.payType)
        if (this.purchaseFromValidation(dataInfo) == 0) {
            const value = {
                folio: this.state.userSchemeList.folio,
                amc: this.state.userSchemeDates.AMC_CODE,
                product_code: this.state.userSchemeDates.PRODUCT_CODE,
                reinvest: this.state.userSchemeDates.REINVEST_TAG,
                amount: $('input[name="add_amt"]').val(),
                input_ref_no: null,
                perpetual_flag: "",
                sip_paymech: null,
                ach_amt: null,
                transfer_date: null,
                from_date: null,
                to_date: null,
                target_product: null,
                periodicity: null,
                period_day: null,
                sip_from_date: null,
                sip_end_date: null,
                sip_freq: null,
                sip_amount: null,
                amt_unit_type: null,
                amt_unit: null,
                all_unit: null,
                sip_period_day: null
            }

            data.push(value)
            let rtgs_code = "";
            let paytype = $('select[name="add_paymentMode"]').val();
            if (paytype == "TR") {
                rtgs_code = this.state.userMandate.ifsc_code;
            }

            const value2 = {
                debit_amount_type: "",
                input_ref_no: "",
                perpetual_flag: "",
                instrm_date: "",
                email: this.state.userDetail.email,
                iin: this.state.userDetail.iin,
                instrm_amount: $('input[name="add_amt"]').val(),
                bank_code: this.state.userMandate.bank_code,
                holder_name: this.state.userMandate.holder_name,
                accountNo: this.state.userMandate.accountNo,
                branch: this.state.userMandate.branch,
                umrn: this.state.userMandate.umrn,
                fscode: this.state.userMandate.ifsc_code,
                rtgs_code: rtgs_code,
                Return_paymnt_flag: dataInfo.payType,
                payment_mode: $('select[name="add_paymentMode"]').val(),
                sub_trxn_type: "N",
                trxn_acceptance: "ALL",
                ach_exist: "Y",
                client_callback_url: "API URL",
                childArr: data
            }
            console.log("value", value2)
            $("#placeOrder").text("Loading...");
            Axios.post("/prodigypro/api/purchase", value2)
                .then((response) => {
                    window.$('#additionalPurchase').modal('hide');
                    $('input[name="add_amt"]').val("");
                    $('select[name="add_paymentMode"]').val("");
                    $('select[name="add_bankName"]').val("");
                    $('select[name="add_mandate"]').val("");
                    $('input[name="add_payType"]').prop('checked', false);
                    $("#payTypeDiv").css({ "display": "none" });
                    $("#bankNameDiv").css({ "display": "none" });
                    $("#mandateDiv").css({ "display": "none" });

                    $("#placeOrder").text("Place Order");
                    if (response.data.data.status == 400) {
                        // window.$('#exampleModal').modal('show');
                        toast.error(response.data.data.message)
                    } else {
                        let payType = $("input:radio[name=payType]:checked").val();
                        if (dataInfo.payType == "Y") {
                            window.$('#exampleModalCenter').modal('show');
                            this.setState({ alertMsg: "Order Placed - Units will be allotted on successful receipt of payment." })
                            this.setState({ Paymentlink: response.data.data.data[0].Paymentlink })
                        } else {
                            if (paytype == 'M') {
                                this.setState({ orderMsg: "Payment link has been sent on your registered mail id and mobile number.The Link shall remain active for the next 48 hours. Kindly authorize." })
                            } else {
                                this.setState({ orderMsg: "Payment link has been sent on your registered mail id and mobile number.The Link shall remain active for the next 48 hours." })
                            }
                            // toast.success(response.data.data.message)
                            window.$('.bd-example-modal-lg').modal('show');
                            this.setState({ orderData: response.data.data.data });
                        }
                    }
                })
        }
    }

    sip(folio, isin, schemeName) {
        const userData = JSON.parse(localStorage.getItem("loginUserData"))
        this.setState({ userMandateList: "" })
        this.setState({ userSwpDate: "" })
        this.setState({ userSchemeDates: "" })
        this.setState({ userDetail: "" })
        this.setState({ userSchemeList: "" })
        $('input[name="perpetual_val"]').val("")
        $('input[name="sip_amt"]').val("")
        $('select[name="sip_mandate"]').val("")
        $('select[name="sip_date"]').val("")
        $('input[name="month_from"]').val("")
        $('input[name="month_to"]').val("")


        this.state.userDeatilData.map(item => {
            if ((folio == item.folio) && (isin == item.isin) && (schemeName == item.scheme)) {
                const substring = "Direct";
                const substring2 = "DIRECT";
                if ((item.scheme.includes(substring) == true) || (item.scheme.includes(substring2) == true)) {
                    window.$("#exampleModalCenter").modal('show');
                    this.setState({ alertMsg: "This order cannot be executed against the selected plan." })
                } else {
                    console.log("nn", item)
                    const data = {
                        folio_No: item.folio,
                        product_code: item.product_code,
                    }
                    Axios.post("/prodigypro/api/portfolio_FolioDetails", data)
                        .then((res) => {
                            console.log("portfolio_FolioDetails", res.data.data.data)
                            let folioData = res.data.data.data;
                            if ((res.data.data.data.status == "M") && (res.data.data.data.status != null)) {
                                this.state.userList.map((user) => {
                                    if (user.fh_pan_no == "undefined") {
                                        window.$("#sip").modal('show');
                                        let iin = user.customer_id;
                                        console.log("iin SI join one", iin)
                                        const bankData = {
                                            email: userData.email,
                                            iin: iin,
                                        }

                                        Axios.post("/prodigypro/api/getbankList", bankData)
                                            .then((res) => {
                                                console.log("userBankList", res.data.data.data)
                                                this.setState({ userBankList: res.data.data.data })
                                            })

                                        const mandate = {
                                            email: userData.email,
                                            IIN: user.customer_id,
                                        }

                                        Axios.post("/prodigypro/api/mandateList", mandate)
                                            .then((res) => {
                                                console.log("userMandateList", res.data)
                                                this.setState({ userMandateList: res.data.data.data })
                                            })

                                        const dateData = {
                                            amc_code: folioData.amc,
                                            product_code: folioData.product_code,
                                            isin: folioData.isin
                                        }
                                        console.log("getSipStpSwpDates aa", dateData)
                                        Axios.post("/prodigypro/api/getSipStpSwpDates", dateData)
                                            .then((res) => {
                                                console.log("getSipStpSwpDates", res.data)
                                                this.setState({ userSchemeDates: res.data.data.data })
                                            })

                                        this.setState({ userDetail: bankData })
                                    }

                                })
                            }
                            else if ((res.data.data.data.holder_nature == "SI") || (res.data.data.data.holder_nature == "SINGLE")) {
                                this.state.userList.map((user) => {
                                    var sr = 1; var ss = 1;
                                    if ((folioData.pan == user.fh_pan_no) && ((folioData.holder_nature == user.hold_n_code) || (folioData.holder_nature == user.hold_nature_desc))) {
                                        console.log("iin", folioData.pan + " = " + user.fh_pan_no)
                                        window.$("#sip").modal('show');
                                        let iin = user.customer_id;
                                        console.log("iin SI join one", iin)
                                        const bankData = {
                                            email: userData.email,
                                            iin: iin,
                                        }

                                        Axios.post("/prodigypro/api/getbankList", bankData)
                                            .then((res) => {
                                                console.log("userBankList", res.data.data.data)
                                                this.setState({ userBankList: res.data.data.data })
                                            })

                                        const mandate = {
                                            email: userData.email,
                                            IIN: user.customer_id,
                                        }

                                        Axios.post("/prodigypro/api/mandateList", mandate)
                                            .then((res) => {
                                                console.log("userMandateList", res.data)
                                                this.setState({ userMandateList: res.data.data.data })
                                            })

                                        const dateData = {
                                            amc_code: folioData.amc,
                                            product_code: folioData.product_code,
                                            isin: folioData.isin
                                        }
                                        // console.log("getSipStpSwpDates",dateData)
                                        Axios.post("/prodigypro/api/getSipStpSwpDates", dateData)
                                            .then((res) => {
                                                console.log("getSipStpSwpDates", res.data)
                                                const swp_date_arr = res.data.data.data.SIP_DATES.split(',');
                                                this.setState({ userSwpDate: swp_date_arr })
                                                this.setState({ userSchemeDates: res.data.data.data })
                                            })
                                        sr++
                                        this.setState({ userDetail: bankData })
                                    }
                                })
                            } else {
                                var sr = 1; var ss = 1;
                                this.state.userList.map((user) => {
                                    if ((res.data.data.data.jh2_name) && (res.data.data.data.jh1_name)) {
                                        if ((folioData.jh2_name == user.jh2_name) && (folioData.jh2_pan == user.jh2_pan_no) && (folioData.jh1_name == user.jh1_name) && (folioData.jh1_pan == user.jh1_pan_no) && (folioData.pan == user.fh_pan_no)) {
                                            window.$("#sip").modal('show');
                                            let iin = user.customer_id;
                                            console.log("iin join two", iin)
                                            const bankData = {
                                                email: userData.email,
                                                iin: iin,
                                            }

                                            Axios.post("/prodigypro/api/getbankList", bankData)
                                                .then((res) => {
                                                    console.log("userBankList", res.data.data.data)
                                                    this.setState({ userBankList: res.data.data.data })
                                                })

                                            const mandate = {
                                                email: userData.email,
                                                IIN: user.customer_id,
                                            }
                                            Axios.post("/prodigypro/api/mandateList", mandate)
                                                .then((res) => {
                                                    console.log("userMandateList", res.data)
                                                    this.setState({ userMandateList: res.data.data.data })
                                                })

                                            const dateData = {
                                                amc_code: folioData.amc,
                                                product_code: folioData.product_code,
                                                isin: folioData.isin
                                            }
                                            // console.log("getSipStpSwpDates",dateData)
                                            Axios.post("/prodigypro/api/getSipStpSwpDates", dateData)
                                                .then((res) => {
                                                    console.log("getSipStpSwpDates", res.data)
                                                    const swp_date_arr = res.data.data.data.SIP_DATES.split(',');
                                                    this.setState({ userSwpDate: swp_date_arr })
                                                    this.setState({ userSchemeDates: res.data.data.data })
                                                })
                                            sr++;
                                            this.setState({ userDetail: bankData })
                                        } else {
                                            console.log("AS 2 ss", ss)
                                            if (ss == this.state.userList.length) {
                                                window.$("#exampleModalCenter").modal('show');
                                                this.setState({ alertMsg: "Scheme not registered with IIN!" })
                                            }
                                            ss++
                                        }
                                    } else if (res.data.data.data.jh1_name) {
                                        if ((folioData.jh1_name == user.jh1_name) && (folioData.jh1_pan == user.jh1_pan_no) && (folioData.pan == user.fh_pan_no)) {
                                            window.$("#sip").modal('show');
                                            let iin = user.customer_id;
                                            console.log("iin join one", iin)
                                            const bankData = {
                                                email: userData.email,
                                                iin: iin,
                                            }

                                            Axios.post("/prodigypro/api/getbankList", bankData)
                                                .then((res) => {
                                                    console.log("userBankList", res.data.data.data)
                                                    this.setState({ userBankList: res.data.data.data })
                                                })

                                            const mandate = {
                                                email: userData.email,
                                                IIN: user.customer_id,
                                            }

                                            Axios.post("/prodigypro/api/mandateList", mandate)
                                                .then((res) => {
                                                    console.log("userMandateList", res.data)
                                                    this.setState({ userMandateList: res.data.data.data })
                                                })

                                            const dateData = {
                                                amc_code: folioData.amc,
                                                product_code: folioData.product_code,
                                                isin: folioData.isin
                                            }
                                            // console.log("getSipStpSwpDates",dateData)
                                            Axios.post("/prodigypro/api/getSipStpSwpDates", dateData)
                                                .then((res) => {
                                                    console.log("getSipStpSwpDates", res.data)
                                                    const swp_date_arr = res.data.data.data.SIP_DATES.split(',');
                                                    this.setState({ userSwpDate: swp_date_arr })
                                                    this.setState({ userSchemeDates: res.data.data.data })
                                                })
                                            sr++;
                                            this.setState({ userDetail: bankData })
                                        } else {
                                            console.log("AS 2 ss", ss)
                                            if (ss == this.state.userList.length) {
                                                window.$("#exampleModalCenter").modal('show');
                                                this.setState({ alertMsg: "Scheme not registered with IIN!" })
                                            }
                                            ss++
                                        }
                                    } else {
                                        window.$("#exampleModalCenter").modal('show');
                                        this.setState({ alertMsg: "Scheme not registered with IIN!" })
                                        console.log("iin join AS", "Scheme not registered with IIN!")
                                    }
                                })
                            }
                            this.setState({ userSchemeList: item })

                        })

                }
            }
        });
    }

    sipFormValidation(data) {
        let dataErr = [];

        if (data.amt == "") {
            var isValid = { amt: "1" }
            dataErr.push(isValid);
            this.setState({ sip_amt_err: "Mandatory Field" });
        } else {
            this.setState({ sip_amt_err: "" });

        }

        if (data.date == "") {
            var isValid = { date: "1" }
            dataErr.push(isValid);
            this.setState({ sip_date_err: "Mandatory Field" });
        } else {
            var startDay = new Date();
            var endDay = new Date(data.date_from + '-' + data.date);
            var millisBetween = endDay.getTime() - startDay.getTime();
            var days = parseInt(millisBetween / (1000 * 3600 * 24));
            if (days <= 7) {
                var isValid = { date: "1" }
                dataErr.push(isValid);
                this.setState({ sip_date_err: "Difference between current Date and SIP date should be atlest 7 days" });
            } else {
                this.setState({ sip_date_err: "" });
            }
        }

        if (data.date_from == "") {
            var isValid = { date_from: "1" }
            dataErr.push(isValid);
            this.setState({ date_from_err: "Mandatory Field" });
        } else {
            this.setState({ date_from_err: "" });
        }

        if (data.perpetual == "N") {
            if (data.date_to == "") {
                var isValid = { date_to: "1" }
                dataErr.push(isValid);
                this.setState({ date_to_err: "Mandatory Field" });
            } else {
                // var isValid = true;
                this.setState({ date_to_err: "" });
            }

        }

        if (data.mandate == "") {
            var isValid = { mandate: "1" }
            dataErr.push(isValid);
            this.setState({ sip_mandate_err: "Mandatory Field" });
        } else {
            // var isValid = true;
            this.setState({ sip_mandate_err: "" });
        }

        return dataErr.length;
    }

    sipMandate = (e) => {
        this.setState({ userMandate: "" })
        let mandate = $('select[name="sip_mandate"]').val();
        this.state.userMandateList.map(val => {
            if (val.MANDATE_ID == mandate) {
                // console.log("value2",val);
                this.setState({ userMandate: { umrn: val.UMRN_NO, bank_code: val.BANK_CODE, holder_name: val.INVESTOR_NAME, accountNo: val.ACCOUNT_NO, acoount_type: val.AC_TYPE, branch: val.BRANCH, ach_fromdate: val.FROM_DATE, ach_enddate: val.TO_DATE, ifsc_code: "" } })
            }
        })
    }

    sipOderNow = (e) => {
        let DataArr = [];
        const data = {
            perpetual: $('input[name="perpetual_val"]').val(),
            amt: $('input[name="sip_amt"]').val(),
            mandate: $('select[name="sip_mandate"]').val(),
            date: $('select[name="sip_date"]').val(),
            date_from: $('input[name="month_from"]').val(),
            date_to: $('input[name="month_to"]').val(),
        }

        // alert(data.amt.length)

        if (this.sipFormValidation(data) == 0) {
            const swp_from_arr = data.date_from.split('-');
            const swp_to_arr = data.date_to.split('-');
            const from_mn = new Date(swp_from_arr[1]).toString().split(' ')[1];
            const to_mn = new Date(swp_to_arr[1]).toString().split(' ')[1];
            var to_year = "";
            // console.log("val.perpetual", data.perpetual)
            if (data.perpetual == "N") {
                to_year = data.date + "-" + to_mn + "-" + swp_to_arr[0];
            } else {
                to_year = "31-Dec-2099";
            }

            var date = "";
            if (data.date.length == 1) {
                date = "0" + data.date
            } else {
                date = data.date
            }


            const value = {
                folio: this.state.userSchemeList.folio,
                amc: this.state.userSchemeDates.AMC_CODE,
                product_code: this.state.userSchemeDates.PRODUCT_CODE,
                reinvest: this.state.userSchemeDates.REINVEST_TAG,
                amount: data.amt,
                perpetual_flag: data.perpetual,
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
                sip_amount: data.amt,
                sip_period_day: date,
                amt_unit_type: "AMOUNT",
                amt_unit: data.amt,
                all_unit: null,
            }

            DataArr.push(value);
            var until = "";
            if (this.state.userMandate.ach_enddate == "31-DEC-2099") {
                until = "Y";
            } else {
                until = "N";
            }

            const value2 = {
                email: this.state.userDetail.email,
                iin: this.state.userDetail.iin,
                instrm_amount: $('input[name="sip_amt"]').val(),
                bank_code: this.state.userMandate.bank_code,
                holder_name: this.state.userMandate.holder_name,
                accountNo: this.state.userMandate.accountNo,
                acoount_type: this.state.userMandate.acoount_type,
                branch: this.state.userMandate.branch,
                umrn: this.state.userMandate.umrn,
                until_cancelled: until,
                ach_amt: $('input[name="sip_amt"]').val(),
                ach_fromdate: this.state.userMandate.ach_fromdate,
                ach_enddate: this.state.userMandate.ach_enddate,
                childArr: DataArr
            }

            console.log("value2", value2);
            $("#sipPlaceOrder").text("Loading...")
            Axios.post("/prodigypro/api/multi_regularSIP", value2)
                .then((result) => {
                    window.$('#sip').modal('hide');
                    $("#sipPlaceOrder").text("Place Order")
                    console.log(result.data.data);
                    if (result.data.data.status == 400) {
                        toast.error(result.data.data.message)
                    } else {
                        this.setState({ orderMsg: "Payment link has been sent on your registered mail id and mobile number.The Link shall remain active for the next 48 hours. Kindly authorize." })
                        window.$('.bd-example-modal-lg').modal('show');
                        this.setState({ orderData: result.data.data.data })
                        toast.success(result.data.data.message)
                    }
                });
        }
    }




    switch(folio, isin, schemeName) {
        const userData = JSON.parse(localStorage.getItem("loginUserData"))
        this.setState({ userMandateList: "" })
        this.setState({ userSwpDate: "" })
        this.setState({ userSchemeDates: "" })
        this.setState({ userDetail: "" })
        this.setState({ userSchemeList: "" })
        this.setState({ usertargetScheme: "" })
        this.setState({ userSchemeData: "" })
        $("#amt_div").css('display', 'none');
        $("#unit_div").css('display', 'none');
        $("#unit_val").css('display', 'none');
        $('input[name="sw_amt_type"]').prop('checked', false)
        this.state.userDeatilData.map(item => {
            if ((folio == item.folio) && (isin == item.isin) && (schemeName == item.scheme)) {
                const substring = "Direct";
                const substring2 = "DIRECT";
                if ((item.scheme.includes(substring) == true) || (item.scheme.includes(substring2) == true)) {
                    window.$("#exampleModalCenter").modal('show');
                    this.setState({ alertMsg: "This order cannot be executed against the selected plan." })
                } else {
                    console.log("nn", item)
                    const data = {
                        folio_No: item.folio,
                        product_code: item.product_code,
                    }
                    Axios.post("/prodigypro/api/portfolio_FolioDetails", data)
                        .then((res) => {
                            console.log("portfolio_FolioDetails", res.data.data.data)
                            let folioData = res.data.data.data;
                            if ((res.data.data.data.status == "M") && (res.data.data.data.status != null)) {
                                this.state.userList.map((user) => {
                                    if (user.fh_pan_no == "undefined") {
                                        window.$("#switch").modal('show');
                                        let iin = user.customer_id;
                                        console.log("iin SI join one", iin)
                                        const bankData = {
                                            email: userData.email,
                                            iin: iin,
                                        }

                                        Axios.post("/prodigypro/api/getbankList", bankData)
                                            .then((res) => {
                                                console.log("userBankList", res.data.data.data)
                                                this.setState({ userBankList: res.data.data.data })
                                            })

                                        const mandate = {
                                            email: userData.email,
                                            IIN: user.customer_id,
                                        }

                                        Axios.post("/prodigypro/api/mandateList", mandate)
                                            .then((res) => {
                                                console.log("userMandateList", res.data)
                                                this.setState({ userMandateList: res.data.data.data })
                                            })

                                        const dateData = {
                                            amc_code: folioData.amc,
                                            product_code: folioData.product_code,
                                            isin: folioData.isin
                                        }
                                        console.log("getSipStpSwpDates aa", dateData)
                                        Axios.post("/prodigypro/api/getSipStpSwpDates", dateData)
                                            .then((res) => {
                                                console.log("getSipStpSwpDates", res.data)
                                                this.setState({ userSchemeDates: res.data.data.data })
                                            })

                                        this.setState({ userDetail: bankData })
                                    }

                                })
                            }
                            else if ((res.data.data.data.holder_nature == "SI") || (res.data.data.data.holder_nature == "SINGLE")) {
                                this.state.userList.map((user) => {
                                    var sr = 1; var ss = 1;
                                    if ((folioData.pan == user.fh_pan_no) && ((folioData.holder_nature == user.hold_n_code) || (folioData.holder_nature == user.hold_nature_desc))) {
                                        window.$("#switch").modal('show');
                                        console.log("iin", folioData.pan + " = " + user.fh_pan_no)
                                        let iin = user.customer_id;
                                        console.log("iin SI join one", iin)
                                        const bankData = {
                                            email: userData.email,
                                            iin: iin,
                                        }

                                        Axios.post("/prodigypro/api/getbankList", bankData)
                                            .then((res) => {
                                                console.log("userBankList", res.data.data.data)
                                                this.setState({ userBankList: res.data.data.data })
                                            })

                                        const mandate = {
                                            email: userData.email,
                                            IIN: user.customer_id,
                                        }

                                        Axios.post("/prodigypro/api/mandateList", mandate)
                                            .then((res) => {
                                                console.log("userMandateList", res.data)
                                                this.setState({ userMandateList: res.data.data.data })
                                            })

                                        const dateData = {
                                            amc_code: folioData.amc,
                                            product_code: folioData.product_code,
                                            isin: folioData.isin
                                        }
                                        // console.log("getSipStpSwpDates",dateData)
                                        Axios.post("/prodigypro/api/getSipStpSwpDates", dateData)
                                            .then((res) => {
                                                console.log("getSipStpSwpDates", res.data)
                                                const swp_date_arr = res.data.data.data.SIP_DATES.split(',');
                                                this.setState({ userSwpDate: swp_date_arr })
                                                this.setState({ userSchemeDates: res.data.data.data })

                                                const datafolio = {
                                                    folio: item.folio,
                                                    isin: res.data.data.data.ISIN,
                                                    prodcode: res.data.data.data.PRODUCT_CODE,
                                                    amc_code: res.data.data.data.AMC_CODE,
                                                }
                                                console.log("targetScheme", datafolio)
                                                Axios.post("/prodigypro/api/foliodetail", datafolio)
                                                    .then((resss) => {
                                                        console.log("qq", resss.data.data.data[0])
                                                        this.setState({ userSchemeData: { amu: resss.data.data.data[0].AMOUNT, unit: resss.data.data.data[0].UNITS, navdate: resss.data.data.data[0].navdate } })
                                                    });


                                            })

                                        const dataAmc = {
                                            AMC_CODE: folioData.amc,
                                            ASSET_CLASS: "",
                                            DIV_GW: "",
                                        }

                                        Axios.post("/prodigypro/api/targetScheme", dataAmc)
                                            .then((res) => {
                                                console.log("targetScheme", res.data.data.data)
                                                this.setState({ usertargetScheme: res.data.data.data })
                                            })
                                        sr++
                                        this.setState({ userDetail: bankData })
                                    }
                                    else {

                                        console.log("SI ss", ss + " = " + this.state.userList.length)
                                        if (ss == this.state.userList.length) {
                                            window.$("#exampleModalCenter").modal('show');
                                            this.setState({ alertMsg: "Scheme not registered with IIN!" })
                                        }
                                        ss++
                                    }
                                })
                            } else {
                                var sr = 1; var ss = 1;
                                this.state.userList.map((user) => {
                                    if ((res.data.data.data.jh2_name) && (res.data.data.data.jh1_name)) {
                                        if ((folioData.jh2_name == user.jh2_name) && (folioData.jh2_pan == user.jh2_pan_no) && (folioData.jh1_name == user.jh1_name) && (folioData.jh1_pan == user.jh1_pan_no) && (folioData.pan == user.fh_pan_no)) {
                                            window.$("#switch").modal('show');
                                            let iin = user.customer_id;
                                            console.log("iin join two", iin)
                                            const bankData = {
                                                email: userData.email,
                                                iin: iin,
                                            }

                                            Axios.post("/prodigypro/api/getbankList", bankData)
                                                .then((res) => {
                                                    console.log("userBankList", res.data.data.data)
                                                    this.setState({ userBankList: res.data.data.data })
                                                })

                                            const mandate = {
                                                email: userData.email,
                                                IIN: user.customer_id,
                                            }
                                            Axios.post("/prodigypro/api/mandateList", mandate)
                                                .then((res) => {
                                                    console.log("userMandateList", res.data)
                                                    this.setState({ userMandateList: res.data.data.data })
                                                })

                                            const dateData = {
                                                amc_code: folioData.amc,
                                                product_code: folioData.product_code,
                                                isin: folioData.isin
                                            }
                                            // console.log("getSipStpSwpDates",dateData)
                                            Axios.post("/prodigypro/api/getSipStpSwpDates", dateData)
                                                .then((res) => {
                                                    console.log("getSipStpSwpDates", res.data)
                                                    const swp_date_arr = res.data.data.data.SIP_DATES.split(',');
                                                    this.setState({ userSwpDate: swp_date_arr })
                                                    this.setState({ userSchemeDates: res.data.data.data })

                                                    const datafolio = {
                                                        folio: item.folio,
                                                        isin: res.data.data.data.ISIN,
                                                        prodcode: res.data.data.data.PRODUCT_CODE,
                                                        amc_code: res.data.data.data.AMC_CODE,
                                                    }
                                                    console.log("targetScheme", datafolio)
                                                    Axios.post("/prodigypro/api/foliodetail", datafolio)
                                                        .then((resss) => {
                                                            console.log("qq", resss.data.data.data[0])
                                                            this.setState({ userSchemeData: { amu: resss.data.data.data[0].AMOUNT, unit: resss.data.data.data[0].UNITS, navdate: resss.data.data.data[0].navdate } })
                                                        });


                                                })

                                            const dataAmc = {
                                                AMC_CODE: folioData.amc,
                                                ASSET_CLASS: "",
                                                DIV_GW: "",
                                            }

                                            Axios.post("/prodigypro/api/targetScheme", dataAmc)
                                                .then((res) => {
                                                    console.log("targetScheme", res.data.data.data)
                                                    this.setState({ usertargetScheme: res.data.data.data })
                                                })
                                            sr++;
                                            this.setState({ userDetail: bankData })
                                        }
                                        else {
                                            console.log("AS 2 ss", ss)
                                            if (ss == this.state.userList.length) {
                                                window.$("#exampleModalCenter").modal('show');
                                                this.setState({ alertMsg: "Scheme not registered with IIN!" })
                                            }
                                            ss++
                                        }
                                    } else if (res.data.data.data.jh1_name) {
                                        if ((folioData.jh1_name == user.jh1_name) && (folioData.jh1_pan == user.jh1_pan_no) && (folioData.pan == user.fh_pan_no)) {
                                            window.$("#switch").modal('show');
                                            let iin = user.customer_id;
                                            console.log("iin join one", iin)
                                            const bankData = {
                                                email: userData.email,
                                                iin: iin,
                                            }

                                            Axios.post("/prodigypro/api/getbankList", bankData)
                                                .then((res) => {
                                                    console.log("userBankList", res.data.data.data)
                                                    this.setState({ userBankList: res.data.data.data })
                                                })

                                            const mandate = {
                                                email: userData.email,
                                                IIN: user.customer_id,
                                            }

                                            Axios.post("/prodigypro/api/mandateList", mandate)
                                                .then((res) => {
                                                    console.log("userMandateList", res.data)
                                                    this.setState({ userMandateList: res.data.data.data })
                                                })

                                            const dateData = {
                                                amc_code: folioData.amc,
                                                product_code: folioData.product_code,
                                                isin: folioData.isin
                                            }
                                            // console.log("getSipStpSwpDates",dateData)
                                            Axios.post("/prodigypro/api/getSipStpSwpDates", dateData)
                                                .then((res) => {
                                                    console.log("getSipStpSwpDates", res.data)
                                                    const swp_date_arr = res.data.data.data.SIP_DATES.split(',');
                                                    this.setState({ userSwpDate: swp_date_arr })
                                                    this.setState({ userSchemeDates: res.data.data.data })

                                                    const datafolio = {
                                                        folio: item.folio,
                                                        isin: res.data.data.data.ISIN,
                                                        prodcode: res.data.data.data.PRODUCT_CODE,
                                                        amc_code: res.data.data.data.AMC_CODE,
                                                    }
                                                    console.log("targetScheme", datafolio)
                                                    Axios.post("/prodigypro/api/foliodetail", datafolio)
                                                        .then((resss) => {
                                                            console.log("qq", resss.data.data.data[0])
                                                            this.setState({ userSchemeData: { amu: resss.data.data.data[0].AMOUNT, unit: resss.data.data.data[0].UNITS, navdate: resss.data.data.data[0].navdate } })
                                                        });
                                                })


                                            const dataAmc = {
                                                AMC_CODE: folioData.amc,
                                                ASSET_CLASS: "",
                                                DIV_GW: "",
                                            }

                                            Axios.post("/prodigypro/api/targetScheme", dataAmc)
                                                .then((res) => {
                                                    console.log("targetScheme", res.data.data.data)
                                                    this.setState({ usertargetScheme: res.data.data.data })
                                                })
                                            sr++
                                            this.setState({ userDetail: bankData })
                                        } else {

                                            console.log("AS 1 ss", ss)
                                            if (ss == this.state.userList.length) {
                                                window.$("#exampleModalCenter").modal('show');
                                                this.setState({ alertMsg: "Scheme not registered with IIN!" })
                                            }
                                            ss++
                                        }
                                    } else {
                                        window.$("#exampleModalCenter").modal('show');
                                        this.setState({ alertMsg: "Scheme not registered with IIN!" })
                                        console.log("iin join AS", "Scheme not registered with IIN!")
                                    }
                                })
                            }
                            this.setState({ userSchemeList: item })

                        })

                }
            }
        });
    }

    amountType = (e) => {
        let amt_type = $("input:radio[name=sw_amt_type]:checked").val();
        this.setState({ amount_err: "" });
        this.setState({ unit_err: "" });
        if (amt_type == "amt") {
            $("#amt_div").css('display', 'block');
            $("#unit_div").css('display', 'none');
            $("#unit_val").css('display', 'block');
            $('input[name="sw_all_units"]').val("N");
            $('input[name="sw_amt_unit_type"]').val("amount");
            $('input[name="sw_unit"]').val("");
            $("#unit_val").html('Amount:- ' + this.state.userSchemeData.amu + ',<br> As On:- ' + this.state.userSchemeData.navdate);
        } else if (amt_type == "unit") {
            $("#amt_div").css('display', 'none');
            $("#unit_div").css('display', 'block');
            $("#unit_val").css('display', 'block');
            $('input[name="sw_all_units"]').val("N");
            $('input[name="sw_amt_unit_type"]').val("unit");
            $('input[name="sw_amt"]').val("");
            $('input[name="sw_unit"]').val("");
            $("#unit_val").html('unit:- ' + this.state.userSchemeData.unit + ',<br> As On:- ' + this.state.userSchemeData.navdate);
        } else if (amt_type == "all_units") {
            $("#amt_div").css('display', 'none');
            $("#unit_div").css('display', 'none');
            $("#unit_val").css('display', 'block');
            $('input[name="sw_all_units"]').val("Y");
            $('input[name="sw_amt_unit_type"]').val("unit");
            $('input[name="sw_amit"]').val("");
            $('input[name="sw_unit"]').val(this.state.userSchemeData.unit);
            $("#unit_val").html('unit:- ' + this.state.userSchemeData.unit + ',<br> As On:- ' + this.state.userSchemeData.navdate);
        }
    }

    getAmtUnit = (e) => {
        let product_code = $("select[name=sw_target_scheme]").val();
        this.state.usertargetScheme.map(val => {
            console.log("scheme list", val)
            if (val.PRODUCT_CODE == product_code) {
                this.setState({ usertargetSchData: { product_code: val.PRODUCT_CODE, amc: val.PRODUCT_CODE, reinvest: val.REINVEST_TAG } })
            }
        })
    }

    switchFormValidation(data) {
        let dataErr = [];
        if (data.target_scheme == "") {
            var isValid = { target_scheme: "1" }
            dataErr.push(isValid);
            this.setState({ scheme_err: "Mandatory Field" });
        } else {
            // var isValid = true;
            this.setState({ scheme_err: "" });
        }

        if (data.amt_type == undefined) {
            var isValid = { amt_type: "1" }
            dataErr.push(isValid);
            this.setState({ all_type_err: "Mandatory Field" });
        } else {
            // var isValid = true;
            this.setState({ all_type_err: "" });
        }

        if (data.amt_type == "amt") {
            if (data.amt == "") {
                var isValid = { amt: "1" }
                dataErr.push(isValid);
                this.setState({ amount_err: "Mandatory Field" });
            } else {
                this.setState({ amount_err: "" });
            }
        } else if (data.amt_type == "unit") {
            if (data.unit == "") {
                var isValid = { unit: "1" }
                dataErr.push(isValid);
                this.setState({ unit_err: "Mandatory Field" });
            } else {
                this.setState({ unit_err: "" });
            }
        }

        return dataErr.length;

    }

    switchOderNow = (e) => {
        const userData = JSON.parse(localStorage.getItem("loginUserData"))
        const data = {
            target_scheme: $('select[name="sw_target_scheme"]').val(),
            amt_type: $("input:radio[name=sw_amt_type]:checked").val(),
            amt: $('input[name="sw_amt"]').val(),
            unit: $('input[name="sw_unit"]').val(),
        }

        if (this.switchFormValidation(data) == 0) {
            var amount = "";
            if (data.amt != '') {
                amount = $('input[name="sw_amt"]').val();
            } else {
                amount = $('input[name="sw_unit"]').val();
            }

            const value = {
                email: this.state.userDetail.email,
                folio: this.state.userSchemeList.folio,
                amc: this.state.userSchemeDates.AMC_CODE,
                product_code: this.state.userSchemeDates.PRODUCT_CODE,
                iin: this.state.userDetail.iin,
                all_units: $('input[name="sw_all_units"]').val(),
                amt_unit_type: $('input[name="sw_amt_unit_type"]').val(),
                amt_unit: amount,
                target_product_code: $('select[name="sw_target_scheme"]').val(),
                reinvest: this.state.usertargetSchData.reinvest,
                target_ft_acc_no: "",
            }

            console.log("swicth value", value)
            $("#sw_placeOrder").text("Loading...")
            Axios.post("/prodigypro/api/switch", value)
                .then((result) => {
                    window.$("#switch").modal('hide');
                    $("#sw_placeOrder").text("Place Order")
                    console.log(result.data.data.status);
                    if (result.data.data.status == 400) {
                        if (result.data.data.message != '') {
                            toast.error(result.data.data.message)
                        } else {
                            toast.error(result.data.data.message_full.Status_Desc._text)
                        }
                    } else {
                        this.setState({ orderMsg: "Payment link has been sent on your registered mail id and mobile number.The Link shall remain active for the next 48 hours. Kindly authorize." })
                        var data = []
                        data.push(result.data.data.data)
                        this.setState({ orderData: data })
                        window.$('.bd-example-modal-lg').modal('show');
                        // toast.success(result.data.data.message)
                    }
                });
        }

    }

    redemption(folio, isin, schemeName) {
        const userData = JSON.parse(localStorage.getItem("loginUserData"))
        this.setState({ userMandateList: "" })
        this.setState({ userSwpDate: "" })
        this.setState({ userSchemeDates: "" })
        this.setState({ userDetail: "" })
        this.setState({ userSchemeList: "" })
        this.setState({ usertargetScheme: "" })
        this.setState({ userSchemeData: "" })
        $('input[name="rem_amt"]').val("");
        $('input[name="rem_unit"]').val("");
        $("#rem_unit_val").html('');
        this.state.userDeatilData.map(item => {
            if ((folio == item.folio) && (isin == item.isin) && (schemeName == item.scheme)) {
                const substring = "Direct";
                const substring2 = "DIRECT";
                if ((item.scheme.includes(substring) == true) || (item.scheme.includes(substring2) == true)) {
                    window.$("#exampleModalCenter").modal('show');
                    this.setState({ alertMsg: "This order cannot be executed against the selected plan." })
                } else {
                    console.log("nn", item)
                    const data = {
                        folio_No: item.folio,
                        product_code: item.product_code,
                    }
                    Axios.post("/prodigypro/api/portfolio_FolioDetails", data)
                        .then((res) => {
                            console.log("portfolio_FolioDetails", res.data.data.data)
                            let folioData = res.data.data.data;
                            if ((res.data.data.data.status == "M") && (res.data.data.data.status != null)) {
                                this.state.userList.map((user) => {
                                    if (user.fh_pan_no == "undefined") {
                                        window.$("#redemption").modal('show');
                                        let iin = user.customer_iadditionalPurchased;
                                        console.log("iin SI join one", iin)
                                        const bankData = {
                                            email: userData.email,
                                            iin: iin,
                                        }

                                        Axios.post("/prodigypro/api/getbankList", bankData)
                                            .then((res) => {
                                                console.log("userBankList", res.data.data.data)
                                                this.setState({ userBankList: res.data.data.data })
                                            })

                                        const mandate = {
                                            email: userData.email,
                                            IIN: user.customer_id,
                                        }

                                        Axios.post("/prodigypro/api/mandateList", mandate)
                                            .then((res) => {
                                                console.log("userMandateList", res.data)
                                                this.setState({ userMandateList: res.data.data.data })
                                            })

                                        const dateData = {
                                            amc_code: folioData.amc,
                                            product_code: folioData.product_code,
                                            isin: folioData.isin
                                        }
                                        console.log("getSipStpSwpDates aa", dateData)
                                        Axios.post("/prodigypro/api/getSipStpSwpDates", dateData)
                                            .then((res) => {
                                                console.log("getSipStpSwpDates", res.data)
                                                this.setState({ userSchemeDates: res.data.data.data })
                                            })

                                        this.setState({ userDetail: bankData })
                                    }

                                })
                            }
                            else if ((res.data.data.data.holder_nature == "SI") || (res.data.data.data.holder_nature == "SINGLE")) {
                                var sr = 1; var ss = 1;
                                this.state.userList.map((user) => {

                                    if ((folioData.pan == user.fh_pan_no) && ((folioData.holder_nature == user.hold_n_code) || (folioData.holder_nature == user.hold_nature_desc))) {

                                        window.$("#redemption").modal('show');
                                        console.log("iin", folioData.pan + " = " + user.fh_pan_no)
                                        let iin = user.customer_id;
                                        console.log("iin SI join one", iin)
                                        const bankData = {
                                            email: userData.email,
                                            iin: iin,
                                        }

                                        Axios.post("/prodigypro/api/getbankList", bankData)
                                            .then((res) => {
                                                console.log("userBankList", res.data.data.data)
                                                this.setState({ userBankList: res.data.data.data })
                                            })

                                        const mandate = {
                                            email: userData.email,
                                            IIN: user.customer_id,
                                        }

                                        Axios.post("/prodigypro/api/mandateList", mandate)
                                            .then((res) => {
                                                console.log("userMandateList", res.data)
                                                this.setState({ userMandateList: res.data.data.data })
                                            })

                                        const dateData = {
                                            amc_code: folioData.amc,
                                            product_code: folioData.product_code,
                                            isin: folioData.isin
                                        }
                                        // console.log("getSipStpSwpDates",dateData)
                                        Axios.post("/prodigypro/api/getSipStpSwpDates", dateData)
                                            .then((res) => {
                                                console.log("getSipStpSwpDates", res.data)
                                                const swp_date_arr = res.data.data.data.SIP_DATES.split(',');
                                                this.setState({ userSwpDate: swp_date_arr })
                                                this.setState({ userSchemeDates: res.data.data.data })

                                                const datafolio = {
                                                    folio: item.folio,
                                                    isin: res.data.data.data.ISIN,
                                                    prodcode: res.data.data.data.PRODUCT_CODE,
                                                    amc_code: res.data.data.data.AMC_CODE,
                                                }
                                                console.log("targetScheme", datafolio)
                                                Axios.post("/prodigypro/api/foliodetail", datafolio)
                                                    .then((resss) => {
                                                        console.log("qq", resss.data.data.data[0])
                                                        this.setState({ userSchemeData: { amu: resss.data.data.data[0].AMOUNT, unit: resss.data.data.data[0].UNITS, navdate: resss.data.data.data[0].navdate } })
                                                    });
                                            })

                                        this.setState({ userDetail: bankData })
                                        sr++
                                    }
                                    else {

                                        console.log("SI ss", ss + " = " + this.state.userList.length)
                                        if (ss == this.state.userList.length) {
                                            window.$("#exampleModalCenter").modal('show');
                                            this.setState({ alertMsg: "Scheme not registered with IIN!" })
                                        }
                                        ss++
                                    }
                                })
                            } else {
                                var sr = 1; var ss = 1;
                                this.state.userList.map((user) => {
                                    if ((res.data.data.data.jh2_name) && (res.data.data.data.jh1_name)) {
                                        if ((folioData.jh2_name == user.jh2_name) && (folioData.jh2_pan == user.jh2_pan_no) && (folioData.jh1_name == user.jh1_name) && (folioData.jh1_pan == user.jh1_pan_no) && (folioData.pan == user.fh_pan_no)) {
                                            window.$("#redemption").modal('show');
                                            let iin = user.customer_id;
                                            console.log("iin join two", iin)
                                            const bankData = {
                                                email: userData.email,
                                                iin: iin,
                                            }

                                            Axios.post("/prodigypro/api/getbankList", bankData)
                                                .then((res) => {
                                                    console.log("userBankList", res.data.data.data)
                                                    this.setState({ userBankList: res.data.data.data })
                                                })

                                            const mandate = {
                                                email: userData.email,
                                                IIN: user.customer_id,
                                            }
                                            Axios.post("/prodigypro/api/mandateList", mandate)
                                                .then((res) => {
                                                    console.log("userMandateList", res.data)
                                                    this.setState({ userMandateList: res.data.data.data })
                                                })

                                            const dateData = {
                                                amc_code: folioData.amc,
                                                product_code: folioData.product_code,
                                                isin: folioData.isin
                                            }
                                            // console.log("getSipStpSwpDates",dateData)
                                            Axios.post("/prodigypro/api/getSipStpSwpDates", dateData)
                                                .then((res) => {
                                                    console.log("getSipStpSwpDates", res.data)
                                                    const swp_date_arr = res.data.data.data.SIP_DATES.split(',');
                                                    this.setState({ userSwpDate: swp_date_arr })
                                                    this.setState({ userSchemeDates: res.data.data.data })

                                                    const datafolio = {
                                                        folio: item.folio,
                                                        isin: res.data.data.data.ISIN,
                                                        prodcode: res.data.data.data.PRODUCT_CODE,
                                                        amc_code: res.data.data.data.AMC_CODE,
                                                    }
                                                    console.log("targetScheme", datafolio)
                                                    Axios.post("/prodigypro/api/foliodetail", datafolio)
                                                        .then((resss) => {
                                                            console.log("qq", resss.data.data.data[0])
                                                            this.setState({ userSchemeData: { amu: resss.data.data.data[0].AMOUNT, unit: resss.data.data.data[0].UNITS, navdate: resss.data.data.data[0].navdate } })
                                                        });


                                                })
                                            sr++;
                                            this.setState({ userDetail: bankData })
                                        } else {
                                            console.log("AS 2 ss", ss)
                                            if (ss == this.state.userList.length) {
                                                window.$("#exampleModalCenter").modal('show');
                                                this.setState({ alertMsg: "Scheme not registered with IIN!" })
                                            }
                                            ss++
                                        }
                                    } else if (res.data.data.data.jh1_name) {
                                        if ((folioData.jh1_name == user.jh1_name) && (folioData.jh1_pan == user.jh1_pan_no) && (folioData.pan == user.fh_pan_no)) {
                                            window.$("#redemption").modal('show');
                                            let iin = user.customer_id;
                                            console.log("iin join one", iin)
                                            const bankData = {
                                                email: userData.email,
                                                iin: iin,
                                            }

                                            Axios.post("/prodigypro/api/getbankList", bankData)
                                                .then((res) => {
                                                    console.log("userBankList", res.data.data.data)
                                                    this.setState({ userBankList: res.data.data.data })
                                                })

                                            const mandate = {
                                                email: userData.email,
                                                IIN: user.customer_id,
                                            }

                                            Axios.post("/prodigypro/api/mandateList", mandate)
                                                .then((res) => {
                                                    console.log("userMandateList", res.data)
                                                    this.setState({ userMandateList: res.data.data.data })
                                                })

                                            const dateData = {
                                                amc_code: folioData.amc,
                                                product_code: folioData.product_code,
                                                isin: folioData.isin
                                            }
                                            // console.log("getSipStpSwpDates",dateData)
                                            Axios.post("/prodigypro/api/getSipStpSwpDates", dateData)
                                                .then((res) => {
                                                    console.log("getSipStpSwpDates", res.data)
                                                    const swp_date_arr = res.data.data.data.SIP_DATES.split(',');
                                                    this.setState({ userSwpDate: swp_date_arr })
                                                    this.setState({ userSchemeDates: res.data.data.data })

                                                    const datafolio = {
                                                        folio: item.folio,
                                                        isin: res.data.data.data.ISIN,
                                                        prodcode: res.data.data.data.PRODUCT_CODE,
                                                        amc_code: res.data.data.data.AMC_CODE,
                                                    }
                                                    console.log("targetScheme", datafolio)
                                                    Axios.post("/prodigypro/api/foliodetail", datafolio)
                                                        .then((resss) => {
                                                            console.log("qq", resss.data.data.data[0])
                                                            this.setState({ userSchemeData: { amu: resss.data.data.data[0].AMOUNT, unit: resss.data.data.data[0].UNITS, navdate: resss.data.data.data[0].navdate } })
                                                        });
                                                })
                                            this.setState({ userDetail: bankData })
                                            sr++;
                                        }
                                        else {
                                            console.log("AS 1 ss", ss)
                                            if (ss == this.state.userList.length) {
                                                window.$("#exampleModalCenter").modal('show');
                                                this.setState({ alertMsg: "Scheme not registered with IIN!" })
                                            }
                                            ss++
                                        }
                                    } else {
                                        console.log("iin join AS", "Scheme not registered with IIN!")
                                        window.$("#exampleModalCenter").modal('show');
                                        this.setState({ alertMsg: "Scheme not registered with IIN!" })
                                    }
                                })
                            }
                            this.setState({ userSchemeList: item })
                            //window.$("#redemption").modal('show');
                        })

                }
            }
        });
    }

    remAmountType = (e) => {
        let amt_type = $("input:radio[name=rem_amt_type]:checked").val();
        this.setState({ amount_err: "" });
        this.setState({ unit_err: "" });
        if (amt_type == "amt") {
            $("#rem_amt_div").css('display', 'block');
            $("#rem_unit_div").css('display', 'none');
            $("#rem_unit_val").css('display', 'block');
            $('input[name="rem_all_units"]').val("N");
            $('input[name="rem_amt_unit_type"]').val("amount");
            $('input[name="rem_unit"]').val("");
            $("#rem_unit_val").html('Amount:- ' + this.state.userSchemeData.amu + ',<br> As On:- ' + this.state.userSchemeData.navdate);
        } else if (amt_type == "unit") {
            $("#rem_amt_div").css('display', 'none');
            $("#rem_unit_div").css('display', 'block');
            $("#rem_unit_val").css('display', 'block');
            $('input[name="rem_all_units"]').val("N");
            $('input[name="rem_amt_unit_type"]').val("unit");
            $('input[name="rem_amt"]').val("");
            $('input[name="rem_unit"]').val("");
            $("#rem_unit_val").html('unit:- ' + this.state.userSchemeData.unit + ',<br> As On:- ' + this.state.userSchemeData.navdate);
        } else if (amt_type == "all_units") {
            $("#rem_amt_div").css('display', 'none');
            $("#rem_unit_div").css('display', 'none');
            $("#rem_unit_val").css('display', 'block');
            $('input[name="rem_all_units"]').val("Y");
            $('input[name="rem_amt_unit_type"]').val("unit");
            $('input[name="rem_amit"]').val("");
            $('input[name="rem_unit"]').val(this.state.userSchemeData.unit);
            $("#rem_unit_val").html('unit:- ' + this.state.userSchemeData.unit + ',<br> As On:- ' + this.state.userSchemeData.navdate);
        }
    }

    remFormValidation(data) {

        let dataErr = [];
        if (data.amt_type == undefined) {
            var isValid = { amt_type: "1" }
            dataErr.push(isValid);
            this.setState({ rem_amt_type_err: "Mandatory Field" });
        } else {
            // var isValid = true;
            this.setState({ rem_amt_type_err: "" });
        }

        if (data.amt_type == "amt") {
            if (data.amt == "") {
                var isValid = { amt: "1" }
                dataErr.push(isValid);
                this.setState({ rem_amt_err: "Mandatory Field" });
            } else {
                this.setState({ rem_amt_err: "" });
            }
        }

        if (data.amt_type == "unit") {
            if (data.unit == "") {
                var isValid = { unit: "1" }
                dataErr.push(isValid);
                this.setState({ rem_unit_err: "Mandatory Field" });
            } else {
                if (data.unit == 0) {
                    var isValid = { assetunitClass: "1" }
                    dataErr.push(isValid);
                    this.setState({ rem_unit_err: "Minimum Unit 1" });
                } else {
                    // var isValid = true;
                    this.setState({ rem_unit_err: "" });
                }
            }
        }

        return dataErr.length;
    }

    redemptionOderNow = (e) => {
        const userData = JSON.parse(localStorage.getItem("loginUserData"))
        const data = {
            amt_type: $("input:radio[name=rem_amt_type]:checked").val(),
            amt: $('input[name="rem_amt"]').val(),
            unit: $('input[name="rem_unit"]').val(),
        }

        if (this.remFormValidation(data) == 0) {
            var amount = "";
            if (data.amt != '') {
                amount = $('input[name="rem_amt"]').val();
            } else {
                amount = $('input[name="rem_unit"]').val();
            }

            const value = {
                email: this.state.userDetail.email,
                folio: this.state.userSchemeList.folio,
                amc: this.state.userSchemeDates.AMC_CODE,
                product_code: this.state.userSchemeDates.PRODUCT_CODE,
                iin: this.state.userDetail.iin,
                all_units: $('input[name="rem_all_units"]').val(),
                amt_unit_type: $('input[name="rem_amt_unit_type"]').val(),
                amt_unit: amount,
            }

            console.log("rem value", value)
            $("#remPlaceOrder").text("Loading...")
            Axios.post("/prodigypro/api/redeem", value)
                .then((result) => {
                    window.$("#redemption").modal('hide');
                    $("#remPlaceOrder").text("Place Order")
                    console.log(result.data.data.status);
                    if (result.data.data.status == 400) {
                        // window.$('#exampleModal').modal('show');
                        toast.error(result.data.data.message)
                    } else {
                        this.setState({ orderMsg: "Payment link has been sent on your registered mail id and mobile number.The Link shall remain active for the next 48 hours. Kindly authorize." })
                        window.$('.bd-example-modal-lg').modal('show');
                        var data = [];
                        data.push(result.data.data.data)
                        this.setState({ orderData: data })
                        toast.success(result.data.data.message)
                    }
                });
        }

    }


    render() {
        let DataList = []; var date = '';

        if (this.state.Paymentlink) {
            window.open(this.state.Paymentlink, '_blank');
            this.setState({ Paymentlink: "" })
        }

        let data = [];
        let row; let type; let lastRow; let grandTotalRow;

        if (this.state.uniquetype) {
            let grand_total_purchase = 0;  let grand_total_mkt_val = 0 ;
            let grand_total_gaine = 0 ;   let grand_total_bal = 0;  let grand_total_avg = 0 ;
            console.log("length", this.state.userDeatilData)
            for (var i = 0; i < this.state.uniquetype.length; i++) {
                let itemSrNo = 1; let total_purchase = 0;  let total_bal = 0;
                let total_mkt_val = 0; let total_gaine = 0;
                let total_avg = 0; let total_cagr = 0;
                this.state.userDeatilData.map(item => {

                    if (this.state.uniquetype[i] == item.type) {
                        let balance_unit = parseFloat(item.unit);
                        let cnav = parseFloat(item.cnav);
                        total_bal = parseFloat(total_bal)+parseFloat(balance_unit) ;
                        total_purchase = parseFloat(total_purchase) + parseFloat(item.purchase_cost_new);
                        total_mkt_val = parseFloat(total_mkt_val) + parseFloat(item.mkt_value_new);
                        total_gaine = parseFloat(total_gaine) + parseFloat(item.gain);
                        total_avg = parseFloat(total_avg) + parseFloat(item.avg_days);
                        total_cagr = parseFloat(total_cagr) + parseFloat(item.cagr);
                        if (itemSrNo == 1) {
                            type = <tr>
                                <th scope="row" className="text-info">{item.type}</th>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                {/* <td>NA</td> */}
                            </tr>
                            data.push(type);
                        }

                        row = <tr>
                            <th scope="row">{item.scheme}</th>
                            <td className="no-wrap-ws">{item.folio}</td>
                            <td>{balance_unit.toFixed(2)}</td>
                            <td>{item.purchase_cost}</td>
                            <td>{cnav.toFixed(2)}</td>
                            <td>{item.mkt_value}</td>
                            {/* <td>NA</td> */}
                            <td>{item.gain}</td>
                            <td>{item.avg_days}</td>
                            <td>{item.absolute_return}</td>
                            <td>{item.cagr}</td>
                            <td>
                                {/* <Transact_Icon_Group folio={item.folio} isin={item.isin}/> */}
                                <div className="d-flex">
                                    <div className="">
                                        <div className="icon-contain  mr-2" data-toggle="tooltip" data-placement="top" title="Additional Purchase">
                                            <a href="javascript:void(0);" onClick={this.state.userIin?this.add_purchase.bind(this, item.folio,item.isin,item.scheme):this.iinNull.bind()} >
                                                <img src={add_purchase_icon} className="w-100" />
                                            </a>
                                        </div>
                                    </div>

                                    <div className="border-left">
                                        <div className="icon-contain ml-2 mr-2" data-toggle="tooltip" data-placement="top" title="SIP">
                                            <a href="javascript:void(0);"  onClick={this.state.userIin?this.sip.bind(this, item.folio,item.isin,item.scheme):this.iinNull.bind()}>
                                                <img src={sip_icon} className="w-100" />
                                            </a>
                                        </div>
                                    </div>

                                    <div className="border-left">
                                        <div className="icon-contain ml-2 mr-2" data-toggle="tooltip" data-placement="top" title="Switch">
                                            <a href="javascript:void(0);"  onClick={this.state.userIin?this.switch.bind(this, item.folio,item.isin,item.scheme):this.iinNull.bind()}>
                                                <img src={switch_icon} className="w-100" />
                                            </a>
                                        </div>
                                    </div>

                                    <div className="border-left">
                                        <div className="icon-contain ml-2" data-toggle="tooltip" data-placement="top" title="Redemption">
                                            <a href="javascript:void(0);" onClick={this.state.userIin?this.redemption.bind(this, item.folio,item.isin,item.scheme):this.iinNull.bind()} >
                                                <img src={redemption_icon} className="w-100" />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        data.push(row);
                        itemSrNo++;
                    }
                })
                grand_total_purchase = parseFloat(grand_total_purchase)+parseFloat(total_purchase) ;
                grand_total_mkt_val = parseFloat(grand_total_mkt_val)+parseFloat(total_mkt_val) ;
                grand_total_gaine = parseFloat(grand_total_gaine)+parseFloat(total_gaine) ;
                grand_total_bal = parseFloat(grand_total_bal)+parseFloat(total_bal) ;
                grand_total_avg = parseFloat(grand_total_avg)+parseFloat(total_avg) ;
                
                lastRow = <tr>
                    <th className="bg-light text-success" scope="row">Total</th>
                    <th className="bg-light text-success"></th>
                    <th className="bg-light text-success">{total_bal.toFixed(2)}</th>
                    <th className="bg-light text-success">{total_purchase.toFixed(2)}</th>
                    <th className="bg-light text-success"></th>
                    <th className="bg-light text-success">{total_mkt_val.toFixed(2)}</th>
                    {/*<th className="bg-light text-success"></th>*/}
                    <th className="bg-light text-success">{total_gaine.toFixed(2)}</th>
                    <th className="bg-light text-success">{total_avg.toFixed(2)}</th>
                    <th className="bg-light text-success"></th>
                    <th className="bg-light text-success"></th>
                    <th className="bg-light text-success"></th>
                </tr>
                data.push(lastRow);
            }

             grandTotalRow= <tr  className="bg-primary">
                <th scope="col" className="text-white">Grand Total</th>
                <th scope="col" className="text-white"></th>
                <th scope="col" className="text-white">{grand_total_bal.toFixed(2)}</th>
                <th scope="col" className="text-white">{grand_total_purchase.toFixed(2)}</th>
                <th scope="col" className="text-white"></th>
                <th scope="col" className="text-white">{grand_total_mkt_val.toFixed(2)}</th>
                        {/*<th className="bg-light text-success"></th>*/}
                <th scope="col" className="text-white">{grand_total_gaine.toFixed(2)}</th>
                <th scope="col" className="text-white">{grand_total_avg.toFixed(2)}</th>
                <th scope="col" className="text-white"></th>
                <th scope="col" className="text-white"></th>
                <th scope="col" className="text-white"></th>
              </tr>

            data.push(grandTotalRow);
        }else{
        
      }

        // let DataList = []; let date;
        if (this.state.userSwpDate) {
            for (var i = 0; i < this.state.userSwpDate.length; i++) {
                date = <option value={this.state.userSwpDate[i]}>{this.state.userSwpDate[i]}</option>
                DataList.push(date)
            }
        }

        if (this.state.userSwpDate == "") {
            DataList.push("")
        }

        return (
            <>
                <Helmet>
                    <title>Prodigy Pro - Portfolio</title>
                </Helmet>
                <StyleComponent />
                <style>
                    {`

            .swal2-content {
                padding: 17px;
                margin: 22px;
                color: red;
              }
            .mt-input{
                margin-top:3.5%;
            }
            .mt-btn{
                margin-top:12%;
            }
            .filter-card-body{
                padding-top: .5rem;
                padding-bottom: .5rem;
                padding-left: 1.25rem;
                padding-right: 1.25rem;
            }
            th{
                white-space: nowrap;
            }
            .table td, .table th {
                padding: .60rem;
                font-size:14px;
            }

            .no-wrap-ws{
                white-space: nowrap;
            }
            .table-responsive{
                height: 500px !important;
            }
            .table-responsive thead { 
                position: sticky;
                top: 0; 
                z-index: 1;
            }
            .table-responsive tfoot { 
                position: sticky;
                bottom: 0; 
                z-index: 1;
            }
            .icon-contain{
                height:22px;
                width:22px;
            }
            .footer_tr{
              display:none
            }
            .wait{
              display:none
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
            #rem_unit_div{
              display:none;
            }
            #rem_unit_val{
            display:none;
            }
            #rem_amt_val{
            display:none;
            }
            #end_date{
              display:none;
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
             .alert_msg{
              text-align: center;
            }
          `}
                </style>

                {/* Page Wrapper */}
                <div id="wrapper">
                    {/*Loader*/}
                    <div id="overlay" >
                        <div class="spinner"></div>
                        <br /><b className="text-danger">Please Wait...</b>
                    </div>
                    {/* Message model */}
                    <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true" data-keyboard="false" data-backdrop="static">
                        <div class="modal-dialog modal-dialog-centered" role="document">
                            <div class="modal-content">

                                <div class="modal-body alert_msg">
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

                    {/* order model */}
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
                                                <th scope="col">Application No</th>
                                                <th scope="col">Fund</th>
                                                <th scope="col">Scheme</th>
                                                <th scope="col">Scheme Name</th>
                                                <th scope="col">Amount</th>
                                                <th scope="col">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.state.orderData ?
                                                this.state.orderData.map((val) =>
                                                    <tr>
                                                        <th scope="row">{val.Unique_No}</th>
                                                        <td>{val.Trxn_No}</td>
                                                        <td>{val.Application_No}</td>
                                                        <td>{val.Fund}</td>
                                                        <td>{val.Scheme}</td>
                                                        <td>{val.Scheme_Name}</td>
                                                        <td>{val.Amt}</td>
                                                        <td>{val.Status_Desc}</td>
                                                    </tr>
                                                ) : null}

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
                    <Sidebar />
                    {/* End of Sidebar */}
                    {/* Content Wrapper */}
                    <div id="content-wrapper" className="d-flex flex-column">
                        <ToastContainer position="top-right" className="mt-8" />
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
                                        <li className="breadcrumb-item active" aria-current="page">Portfolio </li>
                                    </ol>
                                </nav>

                                <div className="row">
                                    {/* Area Chart */}
                                    <div className="col-xl-12 col-lg-12">
                                        <div className="card shadow mb-3">
                                            {/* Card Header - Dropdown */}
                                            <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                                <h6 className="m-0 font-weight-bold text-danger">{/*Portfolio - */} Report On Unrealized Gains Only</h6>
                                            </div>
                                            {/* Card Body */}
                                            <div className="card-body filter-card-body">
                                                <div className="row">
                                                    <div className="col-lg-3 col-md-4 col-sm-6 ">
                                                        <label>Select Applicant Name</label>
                                                        <select className="form-control input-text" name="userPro_id" id="userPro_id" onChange={this.userProfile}>
                                                            {/*  <option value="">Select Profile</option> */}
                                                            {this.state.userData ?
                                                                this.state.userData.map((item, key) =>
                                                                    <option value={item.pan} selected={this.state.profilioPan == item.pan ? "selected" : null}>{item.name}</option>
                                                                ) : null}
                                                        </select>
                                                    </div>
                                                    {/* <div className="col-lg-3 col-md-3 col-sm-6">
                                <div class="form-group">
                                    <label>As On Date</label>
                                    <div class="input-group">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text">
                                            <i class="far fa-calendar-alt"></i>
                                            </span>
                                        </div>
                                    <input type="date" className="form-control" />
                                        </div>
                                    </div>
                             </div>
                             <div className="col-lg-3 col-md-3 col-sm-6 ">
                                        <label>Select Category</label>
                                        <select className="form-control">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        </select>
                             </div>
                             <div className="col-lg-3 col-md-3 col-sm-6">
                                    <a className="btn btn-danger shadow-sm mt-btn w-100">Show</a>
                             </div> */}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="card shadow mb-3">
                                            <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                                <h6 className="m-0 font-weight-bold text-danger">All Data</h6>
                                            </div>

                                            <div className="card-body">
                                                <div className="table-responsive">
                                                    <table className="table table-hover table-bordered">
                                                        <thead className="bg-primary">
                                                            <tr>
                                                                {/* <th scope="col" className="text-white">Sr.No</th> */}
                                                                <th scope="col" className="text-white">Scheme / Company</th>
                                                                <th scope="col" className="text-white">Folio</th>
                                                                <th scope="col" className="text-white">Balance Units</th>
                                                                <th scope="col" className="text-white">Purchase Cost</th>
                                                                <th scope="col" className="text-white">Current NAV</th>
                                                                <th scope="col" className="text-white">Market Value</th>
                                                                {/*<th scope="col" className="text-white">Div. Paid</th>*/}
                                                                <th scope="col" className="text-white">Gain/Loss</th>
                                                                <th scope="col" className="text-white">Avg. Days</th>
                                                                <th scope="col" className="text-white">Absolute Return %</th>
                                                                <th scope="col" className="text-white">CAGR %</th>
                                                                <th scope="col" className="text-white">Transact</th>

                                                            </tr>
                                                        </thead>
                                                        <tbody className="wait">
                                                            Please Wait...
                                                        </tbody>
                                                        <tbody>
                                                            {data == '' ? "No data Found" : data}
                                                        </tbody>
                                                        
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* End of Main Content */}

                        {/*Addtitional Purchase Modal */}
                        <div className="modal fade" id="additionalPurchase" tabIndex={-1} role="dialog" aria-labelledby="additionalPurchaseTitle" aria-hidden="true">
                            <div className="modal-dialog modal-dialog-centered" role="document">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title text-danger" id="additionalPurchaseTitle">Addtitional Purchase</h5>
                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">×</span>
                                        </button>
                                    </div>
                                    <div className="modal-body">
                                        <form>
                                            <div className="col mb-3">
                                                <div class="alert alert-info" role="alert">
                                                    <h6>{this.state.userSchemeList ? this.state.userSchemeList.name : null}</h6>
                                                    <h6 className="mb-0">{this.state.userSchemeList ? this.state.userSchemeList.scheme : null}</h6>
                                                </div>
                                            </div>
                                            <div className="col mb-3">
                                                <label htmlFor="amt" >Enter Amount   <spna className="text-danger">*</spna></label>
                                                <input className="form-control input-text" id="amt" type="Text" name="add_amt" placeholder="Enter Amount" />
                                                <small className="text-danger">{this.state.add_amt_err}</small>
                                            </div>

                                            <div className="col mb-3" >
                                                <label htmlFor="profile">Select Payment Mode   <spna className="text-danger">*</spna></label>
                                                <select className="form-control input-text" name="add_paymentMode" onChange={this.getbank}>
                                                    <option value="">Select</option>
                                                    <option value="OL">Net Banking</option>
                                                    <option value="UPI">UPI</option>
                                                    <option value="TR">RTGS/NEFT</option>
                                                    <option value="M">Debit Mandate</option>
                                                </select>
                                                <small className="text-danger">{this.state.add_paymentMode_err}</small>
                                            </div>
                                            <div className="col my-2" id="payTypeDiv">
                                                <input className=" input-text" id="emailLink" type="radio" name="add_payType" value="N" />
                                                <label htmlFor="emailLink">Link On Email</label>
                                                <input className="input-text ml-3" id="immediatePay" type="radio" name="add_payType" value="Y" />
                                                <label htmlFor="immediatePay">Immediate Payment</label>
                                                <br></br>
                                                <small className="text-danger">{this.state.add_payType_err}</small>
                                            </div>
                                            <div className="col mb-3" id="bankNameDiv">
                                                <label htmlFor="bank">Select Bank   <spna className="text-danger">*</spna></label>
                                                <select className="form-control" data-live-search="true" name="add_bankName" onChange={this.bankDetail}>
                                                    <option value="">Select</option>
                                                    {this.state.userBankList ?
                                                        this.state.userBankList.map((item, key) =>
                                                            <option value={item.bank_code}>{item.bank_name}</option>
                                                        ) : null}
                                                </select>
                                                <small className="text-danger">{this.state.add_bankName_err}</small>
                                            </div>
                                            <div className="col mb-3" id="mandateDiv">
                                                <label htmlFor="mandate" >Mandate  <spna className="text-danger">*</spna></label>
                                                <select className="form-control" data-live-search="true" name="add_mandate" onChange={this.getMandate}>
                                                    <option value="">Select</option>
                                                    {this.state.userMandateList ?
                                                        this.state.userMandateList.map((item, key) =>
                                                            <option value={item.MANDATE_ID}>{"Bank Name:- " + item.BANK_NAME} | {"A/C No:- " + item.ACCOUNT_NO} | {"A/C Amount:- " + item.AMOUNT}</option>
                                                        ) : null}
                                                </select>
                                                <small className="text-danger">{this.state.add_mandate_err}</small>
                                            </div>
                                        </form>
                                    </div>
                                    <div className="modal-footer">
                                        {/* <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button> */}
                                        <button type="button" className="btn btn-danger shadow-sm" id="placeOrder" onClick={this.addPurchaseOrder.bind()}>Place Order</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/*SIP Modal */}
                        <div className="modal fade" id="sip" tabIndex={-1} role="dialog" aria-labelledby="sipTitle" aria-hidden="true">
                            <div className="modal-dialog modal-dialog-centered" role="document">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title text-danger" id="sipTitle">SIP</h5>
                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">×</span>
                                        </button>
                                    </div>
                                    <div className="modal-body">
                                        <form>
                                            <div className="col mb-3">
                                                <div class="alert alert-info" role="alert">
                                                    <h6>{this.state.userSchemeList ? this.state.userSchemeList.name : null}</h6>
                                                    <h6 className="mb-0">{this.state.userSchemeList ? this.state.userSchemeList.scheme : null}</h6>
                                                </div>
                                            </div>

                                            <div className="col mb-3">
                                                <label htmlFor="mandate" >Mandate  <spna className="text-danger">*</spna></label>
                                                <select className="form-control" data-live-search="true" name="sip_mandate" onChange={this.sipMandate}>
                                                    <option value="">Select</option>
                                                    {this.state.userMandateList ?
                                                        this.state.userMandateList.map((item, key) =>
                                                            <option value={item.MANDATE_ID}>{"Bank Name:- " + item.BANK_NAME} | {"A/C No:- " + item.ACCOUNT_NO} | {"A/C Amount:- " + item.AMOUNT}</option>
                                                        ) : null}
                                                </select>
                                                <small className="text-danger">{this.state.sip_mandate_err}</small>
                                            </div>
                                            <div className="row px-3">
                                                <div className="col-md-6 mb-3">
                                                    <label htmlFor="amt" >Enter Amount  <spna className="text-danger">*</spna></label>
                                                    <input className="form-control input-text" id="amt" type="Text" name="sip_amt" placeholder="Enter Amount" />
                                                    <small className="text-danger">{this.state.sip_amt_err}</small>
                                                </div>
                                                <div className="col-md-6 mb-3">
                                                    <label htmlFor="amt" >SIP Date  <spna className="text-danger">*</spna></label>
                                                    <select className="form-control" name="sip_date" data-live-search="true" >
                                                        <option value="">Select</option>
                                                        {DataList}
                                                    </select>
                                                    <small className="text-danger">{this.state.sip_date_err}</small>
                                                </div>
                                            </div>
                                            <div className="row px-3">
                                                <div className="col-sm-6 mb-3">
                                                    <label htmlFor="date_from">SIP Start Date  <spna className="text-danger">*</spna></label>
                                                    <input className="form-control input-text" id="month_from" name="month_from" type="month" placeholder="Enter Value" />
                                                    <small className="text-danger">{this.state.date_from_err}</small>
                                                </div>
                                                <div className="col-sm-6 mb-3" id="end_date">
                                                    <label htmlFor="date_to">SIP End Date  <spna className="text-danger">*</spna></label>
                                                    <input className="form-control input-text" id="month_to" name="month_to" type="month" placeholder="Enter Value" />
                                                    <small className="text-danger">{this.state.date_to_err}</small>
                                                </div>
                                            </div>
                                            <div className="col mb-3">
                                                <input className="input-text" id="perpetual" type="checkbox" name="perpetual" value="Y" defaultChecked />
                                                <input type="hidden" id="perpetual_val" name="perpetual_val" />
                                                <label htmlFor="perpetual" className="text-label ml-2">Perpetual   <spna className="text-danger">*</spna></label>
                                            </div>
                                        </form>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-danger shadow-sm" id="sipPlaceOrder" onClick={this.sipOderNow.bind()}>Place Order</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/*Switch Modal */}
                        <div className="modal fade" id="switch" tabIndex={-1} role="dialog" aria-labelledby="switchTitle" aria-hidden="true">
                            <div className="modal-dialog modal-dialog-centered" role="document">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title text-danger" id="switchTitle">Switch</h5>
                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">×</span>
                                        </button>
                                    </div>
                                    <div className="modal-body">
                                        <form>
                                            <div className="col mb-3">
                                                <div class="alert alert-info" role="alert">
                                                    <h6>{this.state.userSchemeList ? this.state.userSchemeList.name : null}</h6>
                                                    <h6 className="mb-0">{this.state.userSchemeList ? this.state.userSchemeList.scheme : null}</h6>

                                                </div>
                                            </div>
                                            <div className="col mb-3">
                                                <label htmlFor="target" >Select Target Scheme   <spna className="text-danger">*</spna></label>
                                                <select className="form-control" name="sw_target_scheme" id="target_scheme" onChange={this.getAmtUnit}>
                                                    <option value="">Select</option>
                                                    {this.state.usertargetScheme ?
                                                        this.state.usertargetScheme.map((item, key) =>
                                                            item.SIP_ALLOWED == "Y" ?
                                                                <option value={item.PRODUCT_CODE}>{item.PRODUCT_LONG_NAME}</option>
                                                                : null
                                                        ) : null}
                                                </select>
                                                <small className="text-danger">{this.state.scheme_err}</small>
                                            </div>
                                            <div className="col mb-3">
                                                <p className=" mb-1">Switch Type   <spna className="text-danger">*</spna></p>
                                                <input id="amt" value="amt" type="radio" name="sw_amt_type" onChange={this.amountType} />
                                                <label htmlFor="amt">By Amount</label>
                                                <input className="ml-3" id="units" type="radio" name="sw_amt_type" value="unit" onChange={this.amountType} />
                                                <label htmlFor="units">By Units</label>
                                                <input className=" ml-3" id="all_units" type="radio" name="sw_amt_type" value="all_units" onChange={this.amountType} />
                                                <label htmlFor="all_units">All Units</label>
                                                <br></br>
                                                <small className="text-danger">{this.state.all_type_err}</small>
                                            </div>
                                            <div className="col mb-3" id="amt_div">
                                                <label htmlFor="amt" >Enter Amount   <spna className="text-danger">*</spna></label>
                                                <input className="form-control" name="sw_amt" id="sw_amt" type="Text" placeholder="Enter Amount" />
                                                <small className="text-danger">{this.state.amount_err}</small>
                                            </div>
                                            <div className="col mb-3" id="unit_div">
                                                <label htmlFor="val" >Enter Unit  <spna className="text-danger">*</spna></label>
                                                <input className="form-control" name="sw_unit" id="val" type="Text" placeholder="Enter Unit" />
                                                <small className="text-danger">{this.state.unit_err}</small>
                                            </div>
                                            <div className="col mb-3">
                                                <span className="has-float-label" id="unit_val"></span>
                                                <input id="all_units" type="hidden" name="sw_all_units" />
                                                <input id="amt_unit_type" type="hidden" name="sw_amt_unit_type" />
                                            </div>
                                        </form>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-danger shadow-sm" id="sw_placeOrder" onClick={this.switchOderNow.bind()}>Place Order</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/*Redemption Modal */}
                        <div className="modal fade" id="redemption" tabIndex={-1} role="dialog" aria-labelledby="redemptionTitle" aria-hidden="true">
                            <div className="modal-dialog modal-dialog-centered" role="document">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title text-danger" id="redemptionTitle">Redemption</h5>
                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">×</span>
                                        </button>
                                    </div>
                                    <div className="modal-body">
                                        <form>
                                            <div className="col mb-3">
                                                <div class="alert alert-info" role="alert">
                                                    <h6>{this.state.userSchemeList ? this.state.userSchemeList.name : null}</h6>
                                                    <h6 className="mb-0">{this.state.userSchemeList ? this.state.userSchemeList.scheme : null}</h6>
                                                </div>
                                            </div>
                                            <div className="col mb-3">
                                                <p className=" mb-1">Redemption Type  <spna className="text-danger">*</spna></p>
                                                <input id="amt" value="amt" type="radio" name="rem_amt_type" onChange={this.remAmountType} />
                                                <label htmlFor="amt">By Amount</label>
                                                <input className="ml-3" id="units" type="radio" name="rem_amt_type" value="unit" onChange={this.remAmountType} />
                                                <label htmlFor="units">By Units</label>
                                                <input className=" ml-3" id="all_units" type="radio" name="rem_amt_type" value="all_units" onChange={this.remAmountType} />
                                                <label htmlFor="all_units">All Units</label>
                                                <br></br>
                                                <small className="text-danger">{this.state.rem_amt_type_err}</small>
                                            </div>
                                            <div className="col mb-3" id="rem_amt_div">
                                                <label htmlFor="amt" >Enter Amount   <spna className="text-danger">*</spna></label>
                                                <input className="form-control" name="rem_amt" id="rem_amt" type="Text" placeholder="Enter Amount" />
                                                <small className="text-danger">{this.state.rem_amt_err}</small>
                                            </div>
                                            <div className="col mb-3" id="rem_unit_div">
                                                <label htmlFor="val" >Enter Amount  <spna className="text-danger">*</spna></label>
                                                <input className="form-control" name="rem_unit" id="val" type="Text" placeholder="Enter Unit" />
                                                <small className="text-danger">{this.state.rem_unit_err}</small>
                                            </div>
                                            <div className="col mb-3">
                                                <span className="has-float-label" id="rem_unit_val"></span>
                                                <input id="rem_all_units" type="hidden" name="rem_all_units" />
                                                <input id="rem_amt_unit_type" type="hidden" name="rem_amt_unit_type" />
                                            </div>

                                            {/* <div className="col mb-3">
                        <p className=" mb-1">Redemption Type</p>
                        <input id="amt" type="radio" name="demo" />
                        <label htmlFor="amt">By Amount</label>
                        <input className=" ml-3" id="units" type="radio" name="demo" />
                        <label htmlFor="units">By Units</label>
                        <input className=" ml-3" id="all_units" type="radio" name="demo" />
                        <label htmlFor="all_units">All Units</label>                                         
                  </div>
                    <div className="col mb-3">
                        <label htmlFor="amt" >Enter Amount</label>
                        <input className="form-control" id="amt" type="Text" placeholder="Enter Amount" />
                    </div>  
                 */}
                                        </form>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-danger shadow-sm" id="remPlaceOrder" onClick={this.redemptionOderNow.bind()}>Place Order</button>
                                    </div>
                                </div>
                            </div>
                        </div>

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
export default Portfolio
