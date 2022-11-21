import React from "react";
import Header from "./header";
import Footer from "./footer";
import { Helmet } from "react-helmet";
import Axios from "axios";
import "animate.css";
import $ from "jquery";
import New_purchase from "../../assets/images/icons/New folder (2)/new_puchase.png";
import Additional_puchase from "../../assets/images/icons/New folder (2)/add_puchase.png";
import switch1 from "../../assets/images/icons/New folder (2)/switch.png";
import sip from "../../assets/images/icons/New folder (2)/bar_chart.png";
import stp from "../../assets/images/icons/New folder (2)/STP.png";
import swp from "../../assets/images/icons/New folder (2)/withdraw.png";
import success from "../../assets/images/icons/New folder (2)/successfully.png";
import failure from "../../assets/images/icons/New folder (2)/add.png"
import redemption from "../../assets/images/icons/New folder (2)/redemption.png";
import opps from "../../assets/images/icons/New folder (2)/oops.png";
import { FaTrash } from "react-icons/fa";
import { DatePickerComponent } from "@syncfusion/ej2-react-calendars";
import Select from 'react-select';
import styled, { css } from "styled-components";

//importing context
import UserContext from "../../contexts/userContext";
import { parse } from "date-fns/esm";

//Loader Animation
const DarkBackground = styled.div`
  display: none; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 999; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */

  ${(props) =>
    props.disappear &&
    css`
      display: block; /* show */
    `}
`;

class Transact extends React.Component {
  // hide = () => {};
  constructor(props) {
    super(props);
    this.state = {
      userListFetched: [],
      profileListSelect: [],
      amcList: [],
      amcListSelect: [],
      userMandateList: [],
      userMandateListSelect: [],
      userSchemeList: [],
      newPurchaseSchemeList: [],
      newPurchaseSchemeListSelect: [],
      newPurchaseShowList: [],
      bankShowList: [],
      newPurchaseBankDetails: [],
      purchaseSuccessList: [],
      AmcFolioViaProfile: [],
      AdditionalPurchaseMandateList: [],
      additionalPurchaseSchemeList: [],
      additionalPurchaseFolioDetail: [],
      additonalPurchaseAddSelectedSchemeList: [],
      additionalPurchaseFolioDetailList: [],
      assetClass: 'Equity',
      investmentOptionType: 'GROWTH',
      existingSelected: false,
      selectedProfile: '',
      selectedAMC: '',
      perpetualSelected: true,
      selectedProfile: '',
      amountNewPurchase: 0,
      newPurchasePaymentMethod: '',
      selectedPyamentRadio: 'N',
      paymentBankSelected: '',
      selectedAmcCode: '',
      paymentMethodType: 'N',
      selectedNewPurchaseScheme: '',
      errorMsg: '',
      schemeLoading: false,
      purchaseSuccess: false,
      orderDetailsfilled: true,
      bankLoading: false,
      AmcFolioViaProfileLoading: false,
      additionalPurchaseSchemeType: "Existing"
    };

    this.newOrderPlaced = this.newOrderPlaced.bind(this)
    this.getAmcFolioViaProfile = this.getAmcFolioViaProfile.bind(this)
    this.additonalPurchaseAddSelectedScheme = this.additonalPurchaseAddSelectedScheme.bind(this)

  }

  static contextType = UserContext;

  componentDidMount() {
    const { setUserProfile, setAmcListTransactPage } = this.context;

    const userData = JSON.parse(localStorage.getItem("loginUserData"));

    const data = {
      email: userData.email,
      token: userData.token,
    };



    if (this.context.userProfile.length == 0 || this.state.userListFetched.length == 0) {
      console.log("blank data")
      Axios.post("http://localhost:5010/api/User_profile", data).then((res) => {
        // console.log("userData", res.data.data.data)
        this.setState({ userListFetched: res.data.data.data });
        setUserProfile(res.data.data.data);
        let data = [];
        res.data.data.data.map(name => {
          data.push({ value: name.investor_name, label: name.investor_name })
          // this.setState({profileListSelect:[...this.state.profileListSelect, {value:name.investor_name,label:name.investor_name}]})
        })
        this.setState({ profileListSelect: [...data] })
      });


      Axios.post("https://bfccapital.com/prodigypro/api/amc").then((res) => {
        // console.log("amc List ", res.data.data.data)
        this.setState({ amcList: res.data.data.data })
        // console.log("amcList state set from api call ", this.state.amcList)
        setAmcListTransactPage(res.data.data.data)
        let data1 = []
        res.data.data.data.map(name => {
          data1.push({ value: name.long_name, label: name.long_name })
        })
        this.setState({ amcListSelect: [...data1] })
      });

    } else {
      console.log("fetched from context")
      this.setState({ userListFetched: this.context.userProfile });

      this.setState({ amcList: [...this.context.amcListTransactPage] })

      let data = []
      this.context.userProfile.map(name => {
        data.push({ value: name.investor_name, label: name.investor_name })
      })

      this.setState({ profileListSelect: [...data] })

      let data1 = []
      this.context.amcListTransactPage.map(name => {
        data1.push({ value: name.long_name, label: name.long_name })
      })
      this.setState({ amcListSelect: [...data1] })

    }
  }

  additonalPurchaseAddSelectedScheme = () => {
    return console.log("additonalPurchaseAddSelectedScheme this");
    console.log("additonalPurchaseAddSelectedScheme  ", this.state.additionalPurchaseFolioDetail.filter(data => { if (data.SCHEMEISIN == this.state.additionalPurchaseFolioSelect) { return data } }));

  }


  getAmcFolioViaProfile = (selected) => {
    // console.log("getAmcFolioViaProfile ", selected);
    // console.log("filtered user details ",this.context.userProfile.filter(user => {if(user.investor_name == selected.value){return user}}))
    this.setState({ AmcFolioViaProfileLoading: true, selectedProfile: selected.value })

    let filteredUser = this.context.userProfile.filter(user => { if (user.investor_name == selected.value) { return user } })[0]

    const userData = JSON.parse(localStorage.getItem("loginUserData"));

    console.log("filteredUser from additional purchase ", filteredUser, "snapshot value ", this.context.snapshot);

    let postData = {
      guard_pan: '',
      investor_pan: filteredUser['fh_pan_no'] != undefined && filteredUser['fh_pan_no'] != 'undefined' ? filteredUser['fh_pan_no'] : '',
      jh1_pan: filteredUser['jh1_pan_no'] != undefined && filteredUser['jh1_pan_no'] != 'undefined' ? filteredUser['jh1_pan_no'] : '',
      jh2_pan: filteredUser['jh2_pan_no'] != undefined && filteredUser['jh2_pan_no'] != 'undefined' ? filteredUser['jh2_pan_no'] : ''
    }

    // return console.log("postData ", postData, filteredUser['jh2_pan_no'] != undefined, filteredUser['jh2_pan_no'] != 'undefined');

    Axios.post("https://bfccapital.com/prodigypro/api/getAmcFolioViaProfile", postData)
      .then(res => {
        // console.log("data from getAmcFolioViaProfile ", res.data.data.data);
        this.setState({ AmcFolioViaProfile: [...res.data.data.data] })
        let additionalPurchaseSchemeList = []

        res.data.data.data.map(data => {
          let folioNumberForFolioDetail = data.folio;

          Axios.post("https://bfccapital.com/prodigypro/api/schemelist", { folio: data.folio })
            .then(res => {

              // console.log("additionalPurchaseSchemeList from res ", res.data.data.data);
              additionalPurchaseSchemeList.push(...res.data.data.data)

              res.data.data.data.map(data => {

                let foliodetailPayload = {
                  amc_code: data.products.AMC_CODE, folio: folioNumberForFolioDetail, isin: data.products.ISIN, prodcode: data.products.PRODUCT_CODE
                }

                // return console.log("foliodetailPayload ", foliodetailPayload);
                Axios.post("https://bfccapital.com/prodigypro/api/foliodetail", foliodetailPayload)
                  .then(res => {

                    console.log("this.state.additionalPurchaseFolioDetail before update ", this.state.additionalPurchaseFolioDetail);

                    // this.setState({ additionalPurchaseFolioDetail: [...this.state.additionalPurchaseFolioDetail, ...res.data.data.data.filter((v, i, a) => a.indexOf(v) == i)], additionalPurchaseFolioDetailList: res.data.data.data })
                    if (this.state.additionalPurchaseFolioDetail.length > 0) {
                      console.log("additionalPurchaseFolioDetail length greater than 0");
                      this.state.additionalPurchaseFolioDetail.map(data => {
                        if (data.INVNAME == res.data.data.data[0].INVNAME && data.UNITS == res.data.data.data[0].UNITS && data.cnav == res.data.data.data[0].cnav) {
                          console.log("data here additionalPurchaseFolioDetail ", data);
                          return;
                        }
                        // console.log("triggered additionalPurchaseFolioDetail");
                        this.setState({ additionalPurchaseFolioDetail: [...this.state.additionalPurchaseFolioDetail, ...res.data.data.data] })

                      })
                    } else {
                      this.setState({ additionalPurchaseFolioDetail: [...this.state.additionalPurchaseFolioDetail, ...res.data.data.data] })
                    }

                    // additionalPurchaseFolioDetail.push(res.data.data.data[0])
                    // console.log("res additionalPurchaseFolioDetail ", this.state.additionalPurchaseFolioDetail);
                  })
                  .catch(err => {
                    console.log("err from foliodetail ", err);
                  })
              })

              // console.log("additionalPurchaseFolioDetail from array", additionalPurchaseFolioDetail);

            })
            .catch(err => {
              console.log("err from schemelist ", err);
            })
        })

        // console.log("additionalPurchaseSchemeList array ", additionalPurchaseSchemeList[0]);
        // this.setState({ additionalPurchaseSchemeList: [...this.state.additionalPurchaseSchemeList, ...additionalPurchaseSchemeList] });
        // console.log("additionalPurchaseSchemeList state ", this.state.additionalPurchaseSchemeList);
      })
      .catch(err => {
        console.log("err from getAmcFolioViaProfile ", err);
      })

    //Get Mandate List
    let mandatePayload = {
      IIN: filteredUser.customer_id,
      email: userData.email
    }

    Axios.post("https://bfccapital.com/prodigypro/api/mandateList", mandatePayload)
      .then(res => {
        console.log("data from mandateList ", res.data);
        this.setState({ AdditionalPurchaseMandateList: [...res.data.data.data] })
        // console.log("AdditionalPurchaseMandateList state ", this.state.AdditionalPurchaseMandateList);
        // this.setState({ AmcFolioViaProfileLoading: true })
      })
      .catch(err => {
        console.log("err from getAmcFolioViaProfile ", err);
      })

    // onChange Loading set to false
    this.setState({ AmcFolioViaProfileLoading: false })

  }

  NewPurchase = (selected) => {

    // return console.log("NewPurchase this.state.assetClass ",this.state.assetClass);

    this.setState({ selectedAMC: selected })



    let amcCode = this.state.amcList.filter((data, idx) => { if (data.long_name == selected.value) { return data.amc_code } })

    // return console.log("amccode selected ", amcCode)

    this.setState({ selectedAmcCode: amcCode[0].amc_code })


    let postData = {
      AMC_CODE: amcCode[0].amc_code,
      ASSET_CLASS: this.state.assetClass,
      DIV_GW: this.state.investmentOptionType
    }

    this.setState({ schemeLoading: true })

    Axios.post("https://bfccapital.com/prodigypro/api/targetScheme", postData)
      .then(res => {
        // newPurchaseSchemeList:[],
        this.setState({ newPurchaseSchemeList: [...res.data.data.data] })
        let datalist = []
        res.data.data.data.map(name => datalist.push({ value: name.PRODUCT_LONG_NAME, label: name.PRODUCT_LONG_NAME }))

        this.setState({ newPurchaseSchemeListSelect: [...datalist] })

        this.setState({ schemeLoading: false })

        //   console.log("data from targetScheme ", res.data.data.data)
      })
      .catch(err => {
        console.log("err from targetScheme ", err)
      })
  }

  NewPurchaseOptionsHandler = (asset, investmentOption) => {

    //     if(v !=0 && s == 0){
    //       this.setState({assetClass:v})
    //     }else if( s != 0){
    //       this.setState({investmentOptionType:s})
    //     }

    //     this.setState({assetClass:v,investmentOptionType:s})
    // return console.log("value investmentOptionType", investmentOption, "value this.state.assetClass ", asset );
    this.setState({ schemeLoading: !this.state.schemeLoading })

    let optionType;
    let selectedAsset;

    if (investmentOption || investmentOption.length > 1) {
      optionType = investmentOption
    } else {
      optionType = this.state.investmentOptionType
    }

    if (asset || asset.length > 1) {
      selectedAsset = asset
    } else {
      selectedAsset = this.state.assetClass
    }

    // return console.log("selectedAsset ", selectedAsset, "optionType ", optionType);
    //     // this.setState({investmentOptionType:e.target.value}
    // return
    //  return console.log('assetClass from newpurchase handler ', this.state.assetClass);


    // return this.NewPurchase()


    // return console.log("this.state.selectedAMC.value ", this.state.selectedAMC);

    let amcCode = this.state.amcList.filter((data, idx) => { if (data.long_name == this.state.selectedAMC.value) { return data.amc_code } })


    // return console.log("amcCode ", amcCode);

    // let assetClass; 
    // if(v != 0){
    //   assetClass = "DEBT";
    // }else{
    //   assetClass = "Equity"
    // }


    let postData = {
      AMC_CODE: amcCode[0].amc_code,
      ASSET_CLASS: selectedAsset,
      DIV_GW: optionType
    }
    // return console.log("NewPurchaseOptionsHandler triggered selectedAMC ", postData)

    Axios.post("https://bfccapital.com/prodigypro/api/targetScheme", postData)
      .then(res => {
        // newPurchaseSchemeList:[],
        // return console.log("data from targetScheme NewPurchaseOptionsHandler ", res.data.data.data)
        this.setState({ newPurchaseSchemeList: [...res.data.data.data] })
        let datalist = []
        res.data.data.data.map(name => datalist.push({ value: name.PRODUCT_LONG_NAME, label: name.PRODUCT_LONG_NAME }))

        this.setState({ newPurchaseSchemeListSelect: [...datalist] })

        this.setState({ schemeLoading: !this.state.schemeLoading })

      })
      .catch(err => {
        console.log("err from targetScheme NewPurchaseOptionsHandler ", err)
      })
  }

  handleBank = (select) => {

    // console.log("select from handleBank ", select)
    this.setState({ bankLoading: true })

    // console.log("this.state.selectedProfile ", this.state.selectedProfile)
    this.setState({ newPurchasePaymentMethod: select.value })
    const userData = JSON.parse(localStorage.getItem("loginUserData"));
    // console.log("this.context.userProfile ", this.context.userProfile);
    let iin = this.context.userProfile.filter((data, idx) => { if (data.investor_name == this.state.selectedProfile) { return data.customer_id } })

    // return console.log("iin ", iin);
    let postData = {

      email: userData.email,
      iin: iin[0].customer_id,
    }
    Axios.post("https://bfccapital.com/prodigypro/api/getbankList", postData).then(res => {
      console.log("res data from getbankList ", res.data.data.data)
      let bankNames = [];

      this.setState({ newPurchaseBankDetails: [...res.data.data.data] })

      res.data.data.data.map(bank => {
        bankNames.push({ value: `${bank.bank_name} | ${bank.ifsc_code}`, label: bank.bank_name })
      })
      this.setState({ bankShowList: [...bankNames] })
      this.setState({ bankLoading: false })
    }).catch(err => console.log("err from getbankList ", err))
  }

  newOrderPlaced = () => {

    // console.log("this.state.selectedProfile ", this.state.selectedProfile, "this.state.selectedAMC ", this.state.selectedAMC, "this.state.selectedNewPurchaseScheme ", this.state.selectedNewPurchaseScheme, "this.state.paymentBankSelected ", this.state.paymentBankSelected, "this.state.newPurchasePaymentMethod ",this.state.newPurchasePaymentMethod, "this.state.amountNewPurchase ", this.state.amountNewPurchase);

    if (this.state.selectedProfile == '' || this.state.selectedAMC == '' || this.state.selectedNewPurchaseScheme == '' || this.state.paymentBankSelected == '' || this.state.newPurchasePaymentMethod == '' || this.state.amountNewPurchase == 0) {

      return this.setState({ errorMsg: 'All Fields are required', orderDetailsfilled: false })
    }

    const userData = JSON.parse(localStorage.getItem("loginUserData"));

    // return console.log("newPurchasePaymentMethod ", this.state.newPurchasePaymentMethod)

    // return console.log("this.state.selectedProfile.value ", this.state.selectedProfile.value)
    // return console.log("newPurchaseSchemeList ", this.state.newPurchaseSchemeList) 

    let total = 0;
    let schemeName = []
    // let SchemeAmountwithname = []



    // return console.log("SchemeAmountwithname ", SchemeAmountwithname)
    // Amount

    // console.log("this.state.newPurchaseShowList before ", this.state.newPurchaseShowList);

    let schemeDataRequired = []
    if (this.state.newPurchaseShowList.length > 0) {

      this.state.newPurchaseShowList.map(d => {
        // return console.log("d ",parseInt(d.Amount));
        // SchemeAmountwithname.push(d)
        schemeName.push(d.SchemeName)
        total += parseInt(d.Amount)
      })

      this.state.newPurchaseSchemeList.filter(d => {
        if (schemeName.includes(d.PRODUCT_LONG_NAME)) {
          schemeDataRequired.push({ amount: this.state.newPurchaseShowList.filter(s => { if (s.SchemeName == d.PRODUCT_LONG_NAME) { return s.Amount } })[0].Amount, ach_amt: null, all_unit: null, amt_unit: null, amt_unit_type: null, folio: '', from_date: null, input_ref_no: null, period_day: null, periodicity: null, sip_amount: null, sip_end_date: null, sip_freq: null, sip_from_date: null, sip_paymech: null, sip_period_day: null, target_product: null, to_date: null, transfer_date: null, amc: d.AMC_CODE, product_code: d.PRODUCT_CODE, reinvest: d.REINVEST_TAG })
        }
      })
    } else {
      // console.log("selectedNewPurchaseScheme ", this.state.selectedNewPurchaseScheme, "newPurchaseSchemeList ", this.state.newPurchaseSchemeList);

      // console.log("newPurchaseSchemeList ", this.state.newPurchaseSchemeList.filter(scheme => {if(scheme.PRODUCT_LONG_NAME == this.state.selectedNewPurchaseScheme){return console.log("PRODUCT_LONG_NAME ", scheme.PRODUCT_LONG_NAME, "REINVEST_TAG ", scheme.REINVEST_TAG, "AMC_CODE ", scheme.AMC_CODE);}}));
      total = parseInt(this.state.amountNewPurchase);
      schemeDataRequired.push({
        amount: this.state.amountNewPurchase,
        ach_amt: null,
        all_unit: null,
        amt_unit: null,
        amt_unit_type: null,
        folio: '',
        from_date: null,
        input_ref_no: null,
        period_day: null,
        periodicity: null,
        sip_amount: null,
        sip_end_date: null,
        sip_freq: null,
        sip_from_date: null,
        sip_paymech: null,
        sip_period_day: null,
        target_product: null,
        to_date: null,
        transfer_date: null,
        amc: this.state.newPurchaseSchemeList.filter(scheme => { if (scheme.PRODUCT_LONG_NAME == this.state.selectedNewPurchaseScheme) { return scheme.AMC_CODE } })[0].AMC_CODE,
        product_code: this.state.newPurchaseSchemeList.filter(scheme => { if (scheme.PRODUCT_LONG_NAME == this.state.selectedNewPurchaseScheme) { return scheme.PRODUCT_CODE } })[0].PRODUCT_CODE,
        reinvest: this.state.newPurchaseSchemeList.filter(scheme => { if (scheme.PRODUCT_LONG_NAME == this.state.selectedNewPurchaseScheme) { return scheme.REINVEST_TAG } })[0].REINVEST_TAG
      })
    }

    // return console.log("schemeDataRequired ", schemeDataRequired)

    //  return console.log("schemeName ", schemeName)
    let iin = this.context.userProfile.filter((data, idx) => { if (data.investor_name == this.state.selectedProfile) { return data.customer_id } })

    // return console.log("iin newOrderPlaced ", iin)
    // return console.log("paymentBankSelected ", this.state.paymentBankSelected, "newPurchaseBankDetails ", this.state.newPurchaseBankDetails)

    // return console.log("newOrderPlaced func ",this.state.paymentBankSelected.split('|')[1].trim())

    let selectedBankDetails = this.state.newPurchaseBankDetails.filter((data) => {

      if (data.ifsc_code == this.state.paymentBankSelected.split('|')[1].trim()) {
        return data
      }
    })

    // return console.log("newOrderPlaced selectedBankDetails ",selectedBankDetails);

    let postData = {
      Return_paymnt_flag: this.state.paymentMethodType,
      accountNo: selectedBankDetails[0].ac_no,
      ach_exist: "Y",
      bank_code: selectedBankDetails[0].bank_code,
      branch: selectedBankDetails[0].branch_name,
      childArr: [...schemeDataRequired],
      client_callback_url: "API URL",
      debit_amount_type: "",
      email: userData.email,
      fscode: selectedBankDetails[0].ifsc_code,
      holder_name: this.state.selectedProfile,
      iin: iin[0].customer_id,
      input_ref_no: "",
      instrm_amount: total,
      instrm_date: "",
      payment_mode: this.state.newPurchasePaymentMethod,
      perpetual_flag: "",
      rtgs_code: "",
      sub_trxn_type: "N",
      trxn_acceptance: "ALL",
      umrn: "",
    }

    Axios.post("https://bfccapital.com/prodigypro/api/purchase", postData).then(res => {

      // return console.log("res data from purchase ", res.data.data)
      if (res.data.data.status == 400) {
        // return console.log("failure purchase ", res.data.data.data.message);
        this.setState({ errorMsg: res.data.data.message, orderDetailsfilled: false })
      }

      this.setState({ purchaseSuccessList: [...res.data.data.data] })

      this.setState({ purchaseSuccess: true })
      // let bankNames=[];
      // res.data.data.data.map(bank => {
      //   bankNames.push({value:bank.bank_name,label:bank.bank_name})
      // })
      // this.setState({bankShowList:[...bankNames]})
    }).catch(err => {
      console.log("err from api/purchase ", err)
      // return this.setState({ errorMsg: "Server Error please Reload page", orderDetailsfilled: false })
    })

  }

  newPurchaseAddDetails = () => {
    if (this.state.selectedProfile == '' || this.state.selectedAMC == '' || this.state.selectedNewPurchaseScheme == '' || this.state.amountNewPurchase == 0) {
      return this.setState({ errorMsg: 'Please fill required details to add Scheme', orderDetailsfilled: false })
    }

    this.setState({ newPurchaseShowList: [...this.state.newPurchaseShowList, { profil: this.state.selectedProfile, SchemeName: this.state.selectedNewPurchaseScheme, Amount: this.state.amountNewPurchase }] });

  }

  getMandateList = (selected) => {
    console.log("getMandateList triggered ", selected)
    this.setState({ selectedProfile: selected })

    //Get mandate list
    const userData = JSON.parse(localStorage.getItem("loginUserData"));

    let iin = this.context.userProfile.filter((data, idx) => { if (data.investor_name == selected.value) { return data.customer_id } })

    let mandateData = {
      email: userData.email,
      IIN: iin[0].customer_id
    }
    Axios.post("https://bfccapital.com/prodigypro/api/mandateList", mandateData).then((res) => {
      // console.log("userData", res.data.data.data)
      // console.log("data from mandatelist ", res.data.data.data)
      this.setState({ userMandateList: res.data.data.data })
      let data = []
      res.data.data.data.map(mandate => {
        data.push({ value: `BankName: ${mandate.BANK_NAME} | A/C No: ${mandate.ACCOUNT_NO} | A/C Type: ${mandate.AC_TYPE}`, label: `BankName: ${mandate.BANK_NAME} | A/C No: ${mandate.ACCOUNT_NO} | A/C Type: ${mandate.AC_TYPE}` })
      })

      this.setState({ userMandateList: [...data] })
    }).catch(err => console.log("err from mandateList ", err));

    let amcList = {
      IIN: iin[0].customer_id,
      pan_card: iin[0].fh_pan_no
    }

    Axios.post("https://bfccapital.com/prodigypro/api/amclist", amcList).then(async (res) => {
      console.log("amclist", res.data.data.data)

      let selectSchemeData = []
      await res.data.data.data.map(folio => {
        Axios.post("https://bfccapital.com/prodigypro/api/schemelist", { folio: folio.folio }).then(async res => {
          await res.data.data.data.map(product => {

            // return console.log("schemelist mapped ",product.products)
            let payload = {
              amc_code: product.products.AMC_CODE, folio: folio.folio, isin: product.products.ISIN, prodcode: product.products.PRODUCT_CODE
            }
            Axios.post("https://bfccapital.com/prodigypro/api/foliodetail", payload).then(async res => {
              selectSchemeData.push(res.data.data.data)
              this.setState({ userSchemeList: [...this.state.userSchemeList, ...res.data.data.data] })
              // console.log("foliodetail ", res.data.data.data[0])
            })

          })


        }).catch(err => console.log("err from schemelist", err))
      })
      // console.log("data from mandatelist ", res.data.data.data)
      // this.setState({userMandateList:res.data.data.data})
      // let data = []
      // res.data.data.data.map(mandate => {
      //   data.push({value:`BankName: ${mandate.BANK_NAME} | A/C No: ${mandate.ACCOUNT_NO} | A/C Type: ${mandate.AC_TYPE}`, label:`BankName: ${mandate.BANK_NAME} | A/C No: ${mandate.ACCOUNT_NO} | A/C Type: ${mandate.AC_TYPE}`})
      // })

      // this.setState({userMandateList:[...data]})
      console.log("1q ", selectSchemeData)
    }).catch(err => console.log("err from amclist ", err));
  }

  render() {

    // console.log("this.state.AmcFolioViaProfileLoading ", this.state.AmcFolioViaProfileLoading);
    // console.log("this.state.additionalPurchaseFolioSelect ", this.state.additionalPurchaseFolioSelect);
    console.log("this.state.additionalPurchaseFolioDetail ", this.state.additionalPurchaseFolioDetail);
    // console.log("this.state.userSchemeList ", this.state.additionalPurchaseFolioDetail.filter(user => { if (user.INVNAME == this.state.selectedProfile) { return user } }))

    // console.log("this.state.selectedProfile ", this.state.selectedProfile);

    // console.log("this.state.additionalPurchaseFolioDetailList ", this.state.additionalPurchaseFolioDetailList);

    // console.log("additionalPurchaseFolioDetail");

    const profile = [
      // { value: "--select--", label: "--select--" },
      { value: "--2--", label: "--s5255--" },
    ];

    const folio = [
      { value: "--select--", label: "--select--" },
    ];

    const date = [
      { value: "--select--", label: "--select--" },
    ];
    const mandate = [
      { value: "--select--", label: "--select--" },
    ];
    const amc = [
      { value: "--select--", label: "--select--" },
    ];
    const scheme = [
      { value: "--select--", label: "--select--" },
    ];
    const sourcescheme = [
      { value: "--select--", label: "--select--" },
    ];
    const targetscheme = [
      { value: "--select--", label: "--select--" },
    ];
    const payment_mode = [
      { value: "OL", label: "Net Banking" },
      { value: "UPI", label: "UPI" },
      { value: "RTGS/NEFT", label: "RTGS/NEFT" },
      { value: "Debit Mandate", label: "Debit Mandate" },
    ];
    const bankname = [
      { value: "--select--", label: "--select--" },
    ];
    const frequency = [
      { value: "--select--", label: "--select--" },
    ];

    return (
      <>
        <Helmet>
          <title>Transact - Prodigy Pro</title>
        </Helmet>
        <style>
          {`
 
 .modal-dialog
 {
  padding-bottom:3em;
 }
 .modal-content
 {
    background-color:#F0F2FF;
 }
 .btn.dropdown-toggle
 {
border:none!important;
 }
 .dropdown-menu.show
 {
border-radius:0.35rem;
 }
 .dropdown-item.active{
    color: #000;
    border-radius: 0.5rem;
    background-color: #FDF0F0;
 }
 .tp
 {
  border-radius: 15px;
padding: 3em 2em;
background: #faf1f2;
  }
//  .form-group {
//   margin-bottom: 0.5rem;
// }

.modal-body{
  text-align: center;
}
.modal-body img{
max-width: 130px !important;
}
.modal-header {
  border-bottom: none;
}
#failure-tag{
  transform: rotate(45deg);
}
 
         
          `}
        </style>

        {/* Page Wrapper */}
        <div id="wrapper">
          {/* <div id="overlay" >
    <div className="spinner"></div>
    <br />Loading...
  </div>          */}
          {/* Content Wrapper */}
          <div id="content-wrapper" className="d-flex flex-column">
            {/* Main Content */}
            <div id="content">
              {/* Topbar */}
              <Header />
              {/* End of Topbar */}
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item"><a href="home">Home</a></li>
                  <li className="breadcrumb-item active" aria-current="page">Transact</li>
                </ol>
              </nav>
              <div className="container-fluid px-lg-5 pb-5 transact">
                <div className="row px-lg-5">
                  <div className="col-md-12">
                    <div className="container border tp">
                      <div className="row">
                        <div className="col-md-3">
                          <div className=" transactcard  py-lg-5 py-3 mx-lg-3  roundedc" style={{ marginTop: "4rem" }}>
                            <a className=" bg-white transact-link" data-target="#form-dialog-sip" data-toggle="modal" type="button">
                              <div className="goal-card text-center">
                                <img src={sip} className="mr-2 new-icon  p-3" alt='' /><br />
                                <h4 className="pt-4">SIP</h4>
                              </div>
                            </a>
                          </div>
                        </div>
                        <div className="col-md-9">
                          <div className="row">
                            <div className="col-md-4 pt-xs-2">
                              <div className="transactcard py-3 mx-lg-3 roundedc">
                                <a className=" bg-white transact-link" data-target="#form-dialog-new-purchase" data-toggle="modal" type="button">
                                  <div className="goal-card text-center">
                                    <img src={New_purchase} className="mr-2 new-icon p-3" alt='' /><br />
                                    <h4 className="pt-4">New Purchase</h4>
                                  </div>
                                </a>
                              </div>
                            </div>
                            <div className="col-md-4 pt-xs-2">
                              <div className="transactcard py-3 mx-lg-3 roundedc">
                                <a className=" bg-white transact-link" data-target="#form-dialog-additional-purchase" data-toggle="modal" type="button">
                                  <div className="goal-card text-center">
                                    <img src={Additional_puchase} className="mr-2 new-icon  p-3" alt='' /><br />
                                    <h4 className="pt-4">Additional Purchase</h4>
                                  </div>
                                </a>
                              </div>
                            </div>
                            <div className="col-md-4 pt-xs-2">
                              <div className=" transactcard py-3 mx-lg-3 roundedc">
                                <a className=" bg-white transact-link" data-target="#form-dialog-switch" data-toggle="modal" type="button">
                                  <div className="goal-card text-center">
                                    <img src={switch1} className="mr-2 new-icon  p-3" alt='' /><br />
                                    <h4 className="pt-4">Switch</h4>
                                  </div>
                                </a>
                              </div>
                            </div>
                            <div className="col-md-4 pt-4">
                              <div className="transactcard py-3 mx-lg-3 roundedc">
                                <a className=" bg-white transact-link" data-target="#form-dialog-stp" data-toggle="modal" type="button">
                                  <div className="goal-card text-center">
                                    <img src={stp} className="mr-2 new-icon  p-3" alt='' /><br />
                                    <h4 className="pt-4">STP</h4>
                                  </div>
                                </a>
                              </div>
                            </div>
                            <div className="col-md-4 pt-4">
                              <div className="transactcard py-3 mx-lg-3 roundedc">
                                <a className=" bg-white transact-link" data-target="#form-dialog-swp" data-toggle="modal" type="button">
                                  <div className="goal-card text-center">
                                    <img src={swp} className="mr-2 new-icon  p-3" alt='' /><br />
                                    <h4 className="pt-4">SWP</h4>
                                  </div>
                                </a>
                              </div>
                            </div>
                            <div className="col-md-4 pt-4">
                              <div className="transactcard py-3 mx-lg-3 roundedc">
                                <a className=" bg-white transact-link" data-target="#form-dialog-redemption" data-toggle="modal" type="button">
                                  <div className="goal-card text-center">
                                    <img src={redemption} className="mr-2 new-icon  p-3" alt='' /><br />
                                    <h4 className="pt-4">Redemption</h4>
                                  </div>
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* <!-- Form trigger modal new Purchase --> */}
                    <section className="new-purchase">
                      <div className="row">
                        <div tabindex="-1" className="modal pmd-modal fade" id="form-dialog-new-purchase" aria-hidden="true">
                          <div className="modal-dialog modal-lg">
                            <div className="modal-content b-r p-3">
                              <div className="modal-header border-0">
                                <div className="quick-access-title">
                                  <h3>New Purchase</h3>
                                </div>
                                <button aria-hidden="true" data-dismiss="modal" className="close" type="button">×</button>
                              </div>
                              <div className="modal-body">
                                <form>
                                  <div className='row'>
                                    <div className='col-lg-4 col-md-6'>
                                      <div className="form-group pmd-textfield pmd-textfield-floating-label">
                                        <label for="select-profile" className='text-label'>Select Profile<span className="text-danger">*</span></label><br />
                                        <Select className='' options={this.state.profileListSelect} onChange={(selected) => { this.setState({ selectedProfile: selected.value }) }} />
                                      </div>
                                    </div>
                                    <div className='col-lg-4 col-md-6'>
                                      <div className="form-group pmd-textfield pmd-textfield-floating-label">
                                        <label for="invest" className='text-label'>Select AMC<span className="text-danger">*</span></label><br />
                                        <Select className='' options={this.state.amcListSelect} onChange={(selected) => { this.NewPurchase(selected) }} />
                                      </div>
                                    </div>
                                    <div className='col-lg-4 col-md-6'>
                                      <p className="text-label mb-1 mt-1 p-radio lb">Asset Class <spna className="text-danger">*</spna></p>
                                      <div className='pt-2'
                                        onChange={(e) => {
                                          this.NewPurchaseOptionsHandler(e.target.value, 0);
                                          this.setState({ assetClass: e.target.value })
                                        }}
                                      >
                                        <input className=" input-text" id="equity" type="radio" name="asset" value="Equity" checked={this.state.assetClass == "Equity"}
                                        // onClick={this.NewPurchaseOptionsHandler("Equity")}
                                        />
                                        <label htmlFor="equity" className="">Equity</label>
                                        <input className="input-text ml-3" id="debt" type="radio" name="asset1" value="DEBT" checked={this.state.assetClass == "DEBT"}
                                        //  onClick={this.NewPurchaseOptionsHandler("DEBT")}
                                        />
                                        <label htmlFor="debt" className="">Debt</label>
                                        <br></br>  <small className="text-danger pull-left"></small>
                                      </div>
                                    </div>
                                  </div>
                                  <div className='row'>
                                    <div className='col-lg-4 col-md-6'>
                                      <p className=" mb-1 mt-1 p-radio lb text-label">Option <spna className="text-danger">*</spna></p>
                                      <div className='pt-2' onChange={(e) => {
                                        this.NewPurchaseOptionsHandler(0, e.target.value);
                                        this.setState({ investmentOptionType: e.target.value })
                                      }}>
                                        <input className=" input-text" id="growth" type="radio" name="growth" value="GROWTH" checked={this.state.investmentOptionType == "GROWTH"}
                                        // onChange={this.NewPurchaseOptionsHandler}
                                        />
                                        <label htmlFor="growth" className="">Growth</label>
                                        <input className="input-text ml-3" id="dividend" type="radio" name="growth" value="Dividend" checked={this.state.investmentOptionType == "Dividend"}
                                        // onChange={this.NewPurchaseOptionsHandler}
                                        />
                                        <label htmlFor="dividend" className="">IDCW  </label>
                                      </div>
                                    </div>
                                    <div className='col-lg-4 col-md-6'>
                                      <div className="form-group pmd-textfield pmd-textfield-floating-label">
                                        <label for="select-scheme" className='lb text-label'>Select Scheme<span className="text-danger">*</span></label><br />
                                        {this.state.schemeLoading ? 'Loading...' : <Select className=''
                                          options={this.state.newPurchaseSchemeListSelect}
                                          onChange={(select) => this.setState({ selectedNewPurchaseScheme: select.value })}
                                          isLoading={this.state.schemeLoading}
                                        />}
                                      </div>
                                    </div>
                                    <div className='col-lg-4 col-md-6'>
                                      <div className="form-group pmd-textfield pmd-textfield-floating-label">
                                        <label className="control-label lb text-label" for="amount">Enter Amount<span className="text-danger">*</span></label>
                                        <input type="text" className="form-control" name='amount' placeholder='Enter Amount' onChange={(e) => this.setState({ amountNewPurchase: e.target.value })} />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="row">
                                    <div className="col-md-12 ">
                                      <a href="javascript:void(0)" className="btn btn-danger float-right my-4"
                                        onClick={() => {
                                          this.newPurchaseAddDetails();
                                        }}>+ Add</a>
                                      {/* <button className="btn btn-danger float-right my-4" onClick={() => console.log("add btn clicked")}>+ Add</button> */}
                                    </div>

                                  </div>
                                  <div className="col-md-12 " id="tbt">
                                    <div className="table-responsive">
                                      {
                                        this.state.newPurchaseShowList.length > 0 &&
                                        <table className="table bg-white mt-5 mb-3">
                                          <tr>
                                            <th>Profile</th>
                                            <th>Scheme Name</th>
                                            <th>Amount</th>
                                            <th></th>
                                          </tr>
                                          {
                                            this.state.newPurchaseShowList.map((data, idx) => {
                                              return (
                                                <tr>
                                                  <td>{data.profil}</td>
                                                  <td>{data.SchemeName}</td>
                                                  <td>{data.Amount}</td>
                                                  <td> <a href="javascript:void(0)" onClick={() => {
                                                    this.setState({ newPurchaseShowList: this.state.newPurchaseShowList.filter(values => { return data.SchemeName != values.SchemeName }) })
                                                    // console.log("delete added clicked ", )
                                                  }
                                                  }><FaTrash className="red" /></a></td>
                                                </tr>

                                              )
                                            })
                                          }
                                        </table>
                                      }
                                    </div>
                                    <div className="row">
                                      <div className='col-md-5'>
                                        <div className="form-group pmd-textfield pmd-textfield-floating-label">
                                          <label htmlFor="payment_mode" className="text-label">Select Payment Mode  <spna className="text-danger">*</spna></label><br />
                                          <Select className='' options={payment_mode} onChange={(select) => { this.handleBank(select) }} />
                                        </div>
                                      </div>
                                      <div className='col-md-7'>
                                        <div className="pt-4 mt-3" onChange={(e) => this.setState({ paymentMethodType: e.target.value })}>
                                          <input className=" input-text" id="emailLink" type="radio" name="payType" value="N" checked={this.state.paymentMethodType == "N"} />
                                          <label htmlFor="emailLink" className="">Link On Email</label>
                                          <input className="input-text ml-3" id="immediatePay" type="radio" name="payType" value="Y" checked={this.state.paymentMethodType == "Y"} />
                                          <label htmlFor="immediatePay" className="">Immediate Payment</label>
                                        </div>
                                      </div>
                                      <div className='col-md-5'>
                                        <div className="form-group pmd-textfield pmd-textfield-floating-label">
                                          <label for="select-bank" className='lb text-label'>Select Bank<span className="text-danger">*</span></label><br />
                                          <Select className='' options={this.state.bankShowList} isLoading={this.state.bankLoading} onChange={(selected) => {
                                            // console.log("selected ", selected)
                                            this.setState({ paymentBankSelected: selected.value })

                                          }} />
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </form>
                              </div>
                              <div className="modal-footer border-0">
                                <a
                                  // data-dismiss="modal"
                                  className="new-btn1"
                                  //  data-target="#success-transaction" 
                                  //  data-toggle="modal"
                                  type="button"
                                  // onClick={() => {this.newOrderPlaced()}}
                                  onClick={this.newOrderPlaced}
                                >Order Now</a>
                              </div>
                              {
                                this.state.purchaseSuccess ?
                                  <DarkBackground disappear={true}>
                                    <div className="modal-dialog modal-lg justify-content-center">
                                      <div className="modal-content">
                                        <div className="modal-header">
                                          <button type="button" className="close"
                                            data-dismiss="modal"
                                            aria-label="Close"
                                            onClick={() => { this.setState({ purchaseSuccess: false }) }}
                                          >
                                            <span aria-hidden="true">&times;</span>
                                          </button>
                                        </div>
                                        <div className="modal-body py-0 ">
                                          <img className="img-fluid pb-3" src={success} alt="" />
                                          <h3 className="success-c font-weight-500 py-3">Successful Transaction with
                                            Following Details</h3>
                                          {
                                            this.state.purchaseSuccessList.map(data => {
                                              return (
                                                <div className="row">
                                                  <div className="col-md-5 border-right">
                                                    <div className="row">
                                                      <div className="col-md-6 text-left text-black">Unique Number </div>
                                                      <div className="col-md-1">:</div>
                                                      <div className="col-md-4 text-left">{data.Unique_No}</div>


                                                      <div className="col-md-6 text-left text-black">Trxn Number </div>
                                                      <div className="col-md-1">:</div>
                                                      <div className="col-md-4 text-left">{data.Trxn_No}</div>

                                                      <div className="col-md-6 text-left text-black">Amount   </div>
                                                      <div className="col-md-1">:</div>
                                                      <div className="col-md-4 text-left">{data.Amt}</div>


                                                      <div className="col-md-6 text-left text-black">Status   </div>
                                                      <div className="col-md-1">:</div>
                                                      <div className="col-md-4 text-left">{data.Status_Desc}</div>


                                                    </div>
                                                  </div>

                                                  <div className="col-md-7 ">
                                                    <div className="row">
                                                      <div className="col-md-4 text-left text-black">Folio Number </div>
                                                      <div className="col-md-1">:</div>
                                                      <div className="col-md-7 text-left">{data.Application_No}</div>
                                                    </div>
                                                    <div className="row ">

                                                      <div className="col-md-4 text-left text-black">Fund </div>
                                                      <div className="col-md-1">:</div>
                                                      <div className="col-md-7 text-left">{data.Fund}</div>
                                                    </div>
                                                    <div className="row">
                                                      <div className="col-md-4 text-left text-black">Scheme Name </div>
                                                      <div className="col-md-1">:</div>
                                                      <div className="col-md-7 text-left">{data.Scheme_Name}</div>


                                                    </div>

                                                  </div>


                                                </div>

                                              )
                                            })
                                          }

                                          <hr />
                                          <div className="py-2">

                                            <p className="text-black fs-13">
                                              <span className="red text-left font-weight-500 fs-16">Note:</span>  Payment link has been sent on your registered mail id and mobile number.The Link shall remain active for the next 48 hours.
                                            </p>
                                          </div>
                                        </div>
                                      </div>
                                    </div> </DarkBackground> : <DarkBackground disappear={false}></DarkBackground>
                              }
                              {
                                !this.state.orderDetailsfilled ?
                                  <DarkBackground disappear={true}>
                                    <div className="modal-dialog modal-lg justify-content-center">
                                      <div className="modal-content">
                                        <div className="modal-header">
                                          <button type="button" className="close"
                                            data-dismiss="modal"
                                            aria-label="Close"
                                            onClick={() => { this.setState({ orderDetailsfilled: true }) }}
                                          >
                                            <span aria-hidden="true">&times;</span>
                                          </button>
                                        </div>

                                        <div className="modal-body py-0 ">
                                          <img className="img-fluid pb-3" src={failure} alt="" id="failure-tag" />
                                          {/* <h3 className="success-c font-weight-500 py-3">Successful Transaction with
                                            Following Details</h3> */}
                                          <div className="py-2">
                                            <label for="select-bank" className='lb text-label'>
                                              {this.state.errorMsg}
                                            </label>
                                          </div>
                                          {/* {
                                            this.state.purchaseSuccessList.map(data => {
                                              return (
                                                <div className="row">
                                                  <div className="col-md-5 border-right">
                                                    <div className="row">
                                                      <div className="col-md-6 text-left text-black">Unique Number </div>
                                                      <div className="col-md-1">:</div>
                                                      <div className="col-md-4 text-left">{data.Unique_No}</div>


                                                      <div className="col-md-6 text-left text-black">Trxn Number </div>
                                                      <div className="col-md-1">:</div>
                                                      <div className="col-md-4 text-left">{data.Trxn_No}</div>

                                                      <div className="col-md-6 text-left text-black">Amount   </div>
                                                      <div className="col-md-1">:</div>
                                                      <div className="col-md-4 text-left">{data.Amt}</div>


                                                      <div className="col-md-6 text-left text-black">Status   </div>
                                                      <div className="col-md-1">:</div>
                                                      <div className="col-md-4 text-left">{data.Status_Desc}</div>


                                                    </div>
                                                  </div>

                                                  <div className="col-md-7 ">
                                                    <div className="row">
                                                      <div className="col-md-4 text-left text-black">Folio Number </div>
                                                      <div className="col-md-1">:</div>
                                                      <div className="col-md-7 text-left">{data.Application_No}</div>
                                                    </div>
                                                    <div className="row ">

                                                      <div className="col-md-4 text-left text-black">Fund </div>
                                                      <div className="col-md-1">:</div>
                                                      <div className="col-md-7 text-left">{data.Fund}</div>
                                                    </div>
                                                    <div className="row">
                                                      <div className="col-md-4 text-left text-black">Scheme Name </div>
                                                      <div className="col-md-1">:</div>
                                                      <div className="col-md-7 text-left">{data.Scheme_Name}</div>


                                                    </div>

                                                  </div>


                                                </div>

                                              )
                                            })
                                          } */}

                                          <hr />
                                          {/* <div className="py-2">

                                            <p className="text-black fs-13">
                                              <span className="red text-left font-weight-500 fs-16">Note:</span>  Payment link has been sent on your registered mail id and mobile number.The Link shall remain active for the next 48 hours.
                                            </p>
                                          </div> */}
                                        </div>
                                      </div>
                                    </div> </DarkBackground> : <DarkBackground disappear={false}></DarkBackground>
                              }
                            </div>
                          </div>
                        </div>
                      </div>
                    </section>
                    {/* <!-- End Form trigger modal new Purchase --> */}
                    {/* <!-- Form trigger modal additional Purchase --> */}
                    <section className="additional-purchase">
                      <div className="row">
                        <div tabindex="-1" className="modal pmd-modal fade" id="form-dialog-additional-purchase" aria-hidden="true">
                          <div className="modal-dialog modal-lg">
                            <div className="modal-content b-r p-3">
                              <div className="modal-header border-0">
                                <div className="quick-access-title">
                                  <h3>Additional Purchase</h3>
                                </div>
                                <button aria-hidden="true" data-dismiss="modal" className="close" type="button">×</button>
                              </div>
                              <div className="modal-body">
                                <form>
                                  <div className="row">
                                    <div className='col-md-5'>
                                      <div className="form-group pmd-textfield pmd-textfield-floating-label">
                                        <label for="select-p" className='text-label'>Select Profile<span className="text-danger">*</span></label><br />
                                        <Select className='' options={this.state.profileListSelect} onChange={selected => this.getAmcFolioViaProfile(selected)} />
                                      </div>
                                    </div>
                                    <div className='col-md-7'>
                                      <div className='pt-4 mt-3' onChange={(e) => this.setState({ additionalPurchaseSchemeType: e.target.value })}>
                                        <input className=" input-text" id="existing" type="radio" name="assetAdditional" value="Existing" checked={this.state.additionalPurchaseSchemeType == "Existing"} />
                                        <label htmlFor="existing" className="">Existing Scheme</label>
                                        <input className="input-text ml-3" id="newScheme" type="radio" name="assetAdditional1" value="New" checked={this.state.additionalPurchaseSchemeType == "New"} />
                                        <label htmlFor="newScheme" className="">New Scheme</label>
                                        <br></br>  <small className="text-danger pull-left"></small>
                                      </div>
                                    </div>
                                  </div>
                                  <div className='row'>
                                    {
                                      this.state.additionalPurchaseSchemeType == "New" &&
                                      <>
                                        <div className='col-md-5'>
                                          <div className="form-group pmd-textfield pmd-textfield-floating-label">
                                            <label for="amc" className='lb  text-label'>Select AMC<span className="text-danger">*</span></label><br />
                                            <Select className='' options={amc} />
                                          </div>
                                        </div>
                                        <div className='col-md-3'>
                                          <p className="text-label mb-1 mt-1 p-radio lb">Asset Class <spna className="text-danger">*</spna></p>
                                          <div className='pt-2'>
                                            <input className=" input-text" id="equity" type="radio" name="asset" value="Equity" />
                                            <label htmlFor="equity" className="">Equity</label>
                                            <input className="input-text ml-3" id="debt" type="radio" name="asset" value="DEBT" />
                                            <label htmlFor="debt" className="">Debt</label>
                                            <br></br>  <small className="text-danger pull-left"></small>
                                          </div>
                                        </div>
                                        <div className='col-md-3'>
                                          <p className="text-label mb-1 mt-1 p-radio lb">Option <spna className="text-danger">*</spna></p>
                                          <div className='pt-2'>
                                            <input className=" input-text" id="growth" type="radio" name="growth" value="GROWTH" />
                                            <label htmlFor="growth" className="">Growth</label>
                                            <input className="input-text ml-3" id="dividend" type="radio" name="growth" value="Dividend" />
                                            <label htmlFor="dividend" className="">IDCW  </label>
                                          </div>
                                        </div>

                                      </>
                                    }
                                    {
                                      this.state.additionalPurchaseSchemeType == "New" &&
                                      //  <div className='row'>
                                      <>
                                        {/* col-lg-4 */}
                                        <div className=' col-md-6'>
                                          <div className="form-group pmd-textfield pmd-textfield-floating-label">
                                            <label for="folio" className='lb text-label'>Select Folio<span className="text-danger">*</span></label><br />
                                            <Select className='' options={folio} />
                                          </div>
                                        </div>
                                        {/* col-lg-4 */}
                                        <div className=' col-md-6'>
                                          <div className="form-group pmd-textfield pmd-textfield-floating-label">
                                            <label for="scheme" className='lb text-label'>Select Scheme<span className="text-danger">*</span></label><br />
                                            <Select className='' options={scheme} />
                                          </div>
                                        </div>
                                      </>
                                      // </div>

                                    }

                                  </div>
                                  <div className='row'>
                                    {/* col-lg-4  */}
                                    <div className='col-md-5'>
                                      <div className="form-group pmd-textfield pmd-textfield-floating-label">
                                        <label className="control-label lb text-label" for="amount">Enter Amount<span className="text-danger">*</span></label>
                                        <input type="text" className="form-control" name='amount' placeholder='Enter Amount' />
                                      </div>
                                    </div>
                                  </div>

                                  {/* Folio List */}
                                  {
                                    this.state.AmcFolioViaProfileLoading ? 'Loading...' :
                                      <div className="table-responsive">
                                        <table className="table bg-white mt-5 mb-3">
                                          <tr>
                                            <th>Select</th>
                                            <th>Scheme Name</th>
                                            <th>Folio Number</th>
                                            <th>Total Units</th>
                                            <th>Amount</th>
                                            <th></th>
                                          </tr>
                                          {
                                            console.log("this.state.userSchemeList ", this.state.additionalPurchaseFolioDetail.filter(user => { if (user.INVNAME == this.state.selectedProfile) { return user } }))
                                            // this.state.AmcFolioViaProfileLoading == false && this.state.additionalPurchaseFolioDetail.filter(user => { if (user.INVNAME == this.state.selectedProfile) { return user } }).map((user, id) => {
                                            //   // console.log("user userscheme mapped ", user);
                                            //   return <tr onChange={(e) => { this.setState({ additionalPurchaseFolioSelect: e.target.value }) }}>
                                            //     <td><input className=" input-text" id={id} type="radio" value={user.SCHEMEISIN} checked={this.state.additionalPurchaseFolioSelect == user.SCHEMEISIN} />
                                            //       <label htmlFor={id} className="">Select</label></td>
                                            //     <td>{user.SCHEME}</td>
                                            //     <td>{user.FOLIO}</td>
                                            //     <td>{user.UNITS}</td>
                                            //     <td>{user.AMOUNT}</td>
                                            //   </tr>

                                            // })
                                          }

                                        </table>
                                      </div>
                                  }

                                  <div className="col-md-12 " id="tbt">
                                    <div className="col-md-12 ">
                                      <a href="javascript:void(0)" className="btn btn-danger float-right my-4" onClick={() => this.additonalPurchaseAddSelectedScheme()}>+ Add</a>
                                    </div>
                                    <div className="table-responsive">
                                      <table className="table bg-white mt-5 mb-3">
                                        <tr>
                                          <th>Profile</th>
                                          <th>Scheme Name</th>
                                          <th>Folio Number</th>
                                          <th>Total Units</th>
                                          <th>Amount</th>
                                          <th></th>
                                        </tr>
                                        <tr>
                                          <td>Profile</td>
                                          <td>Scheme Name</td>
                                          <td>Folio Number</td>
                                          <td>3500</td>
                                          <td> <a href="javascript:void(0)" ><FaTrash className="red" /></a></td>
                                        </tr>

                                      </table>
                                    </div>
                                    <div className="row">
                                      <div className='col-md-5'>
                                        <div className="form-group pmd-textfield pmd-textfield-floating-label">
                                          <label htmlFor="payment_mode" className="text-label">Select Payment Mode  <spna className="text-danger">*</spna></label><br />
                                          <Select className='' options={payment_mode} />
                                        </div>
                                      </div>
                                      <div className='col-md-7'>
                                        <div className="pt-4 mt-3">
                                          <input className=" input-text" id="emailLink" type="radio" name="payType" value="N" />
                                          <label htmlFor="emailLink" className="">Link On Email</label>
                                          <input className="input-text ml-3" id="immediatePay" type="radio" name="payType" value="Y" />
                                          <label htmlFor="immediatePay" className="">Immediate Payment</label>
                                        </div>
                                      </div>
                                      <div className='col-md-5'>
                                        <div className="form-group pmd-textfield pmd-textfield-floating-label">
                                          <label for="select-bank" className='lb text-label'>Select Bank<span className="text-danger">*</span></label><br />
                                          <Select className='' options={bankname} />
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </form>
                              </div>
                              <div className="modal-footer border-0">
                                <button data-dismiss="modal" className="new-btn1" data-target="#wrong" data-toggle="modal" type="button">Order Now</button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </section>
                    {/* <!--End Form trigger modal additional Purchase --> */}
                    {/* <!-- Form trigger modal Switch --> */}
                    <section className="switch">
                      <div className="row">
                        <div tabindex="-1" className="modal pmd-modal fade" id="form-dialog-switch" aria-hidden="true">
                          <div className="modal-dialog modal-lg">
                            <div className="modal-content b-r p-3">
                              <div className="modal-header border-0">
                                <div className="quick-access-title">
                                  <h3>Switch</h3>
                                </div>
                                <button aria-hidden="true" data-dismiss="modal" className="close" type="button">×</button>
                              </div>
                              <div className="modal-body">
                                <form>
                                  <div className="row">
                                    <div className='col-lg-4 col-md-6'>
                                      <div className="form-group pmd-textfield pmd-textfield-floating-label">
                                        <label for="select-p" className='text-label'>Select Profile<span className="text-danger">*</span></label><br />
                                        <Select className='' options={profile} />
                                      </div>
                                    </div>
                                    <div className='col-lg-4 col-md-6'>
                                      <div className="form-group pmd-textfield pmd-textfield-floating-label">
                                        <label for="amc" className='text-label'>Select AMC<span className="text-danger">*</span></label><br />
                                        <Select className='' options={amc} />
                                      </div>
                                    </div>
                                    <div className='col-lg-4 col-md-6'>
                                      <div className="form-group pmd-textfield pmd-textfield-floating-label">
                                        <label for="folio" className='text-label'>Select Folio<span className="text-danger">*</span></label><br />
                                        <Select className='' options={folio} />
                                      </div>
                                    </div>
                                  </div>
                                  <div className='row'>
                                    <div className='col-md-5'>
                                      <div className="form-group pmd-textfield pmd-textfield-floating-label">
                                        <label for="source" className='text-label'>Select Source Scheme<span className="text-danger">*</span></label><br />
                                        <Select className='' options={sourcescheme} />
                                      </div>
                                    </div>
                                    <div className='col-md-3'>
                                      <p className="text-label mb-1 mt-1 p-radio lb">Asset Class <spna className="text-danger">*</spna></p>
                                      <div className='pt-2'>
                                        <input className=" input-text" id="equity" type="radio" name="asset" value="Equity" />
                                        <label htmlFor="equity" className="">Equity</label>
                                        <input className="input-text ml-3" id="debt" type="radio" name="asset" value="DEBT" />
                                        <label htmlFor="debt" className="">Debt</label>
                                        <br></br>  <small className="text-danger pull-left"></small>
                                      </div>
                                    </div>
                                    <div className='col-md-3'>
                                      <p className="text-label mb-1 mt-1 p-radio lb">Option <spna className="text-danger">*</spna></p>
                                      <div className='pt-2'>
                                        <input className=" input-text" id="growth" type="radio" name="growth" value="GROWTH" />
                                        <label htmlFor="growth" className="">Growth</label>
                                        <input className="input-text ml-3" id="dividend" type="radio" name="growth" value="Dividend" />
                                        <label htmlFor="dividend" className="">IDCW  </label>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="row">
                                    <div className='col-md-5'>
                                      <div className="form-group pmd-textfield pmd-textfield-floating-label">
                                        <label for="target" className='lb  text-label'>Select Target Scheme<span className="text-danger">*</span></label><br />
                                        <Select className='' options={targetscheme} />
                                      </div>
                                    </div>
                                    <div className="col-md-7">
                                      <p className="text-label mb-1 mt-1 p-radio">Switch Type <spna className="text-danger">*</spna></p>
                                      <input className=" input-text" id="amt" type="radio" name="amt_type" value="amt" />
                                      <label htmlFor="amt" className="">By Amount</label>
                                      <input className="input-text ml-3" id="units" type="radio" name="amt_type" value="unit" />
                                      <label htmlFor="units" className="">By Units</label>
                                      <input className="input-text ml-3" id="all_units" type="radio" name="amt_type" value="all_units" />
                                      <label htmlFor="all_units" className="">All Units</label>
                                      <br></br>  <small className="text-danger pull-left"></small>
                                    </div>
                                  </div>
                                  <div className='row'>
                                    <div className='col-md-5'>
                                      <div className="form-group pmd-textfield pmd-textfield-floating-label">
                                        <label className="control-label lb text-label" for="amount">Enter Amount<span className="text-danger">*</span></label>
                                        <input type="text" className="form-control" name='amount' placeholder='Enter Amount' />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-md-12 ">
                                    <a href="javascript:void(0)" className="btn btn-danger float-right my-4" >+ Add</a>
                                  </div>
                                  <div className="col-md-12 " id="tbt">
                                    <div className="table-responsive">
                                      <table className="table bg-white mt-5 mb-3">
                                        <tr>
                                          <th>Profile</th>
                                          <th>Scheme Name</th>
                                          <th>Folio Number</th>
                                          <th>Target Scheme</th>
                                          <th>Switch Type</th>
                                          <th>Amount/Unit</th>
                                          <th></th>
                                        </tr>
                                        <tr>
                                          <td>Profile</td>
                                          <td>Scheme Name</td>
                                          <td>Folio Number</td>
                                          <td>Target Scheme</td>
                                          <td>switch type</td>
                                          <td>3500</td>
                                          <td> <a href="javascript:void(0)" ><FaTrash className="red" /></a></td>
                                        </tr>
                                      </table>
                                    </div>
                                  </div>
                                </form>
                              </div>
                              <div className="modal-footer border-0">
                                <button data-dismiss="modal" className="new-btn1" type="button">Order Now</button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </section>
                    {/* <!--End Form trigger modal Switch --> */}
                    {/* <!-- Form trigger modal SIP --> */}
                    <section className="sip">
                      <div className="row">
                        <div tabindex="-1" className="modal pmd-modal fade" id="form-dialog-sip" aria-hidden="true">
                          <div className="modal-dialog modal-lg">
                            <div className="modal-content b-r p-3">
                              <div className="modal-header border-0">
                                <div className="quick-access-title">
                                  <h3>SIP</h3>
                                </div>
                                <button aria-hidden="true" data-dismiss="modal" className="close" type="button">×</button>
                              </div>
                              <div className="modal-body">
                                <form>
                                  <div className="row">
                                    <div className='col-md-5'>
                                      <div className="form-group pmd-textfield pmd-textfield-floating-label">
                                        <label for="select-p" className='text-label'>Select Profile<span className="text-danger">*</span></label><br />
                                        <Select className='' onChange={(selected) => { this.getMandateList(selected) }} options={this.state.profileListSelect} />
                                      </div>
                                    </div>
                                    <div className='col-md-7'>
                                      <div className='pt-4 mt-3'>
                                        <input className=" input-text" id="equity" type="radio" name="asset" value="Equity" onClick={() => { this.setState({ existingSelected: true }) }} />
                                        <label htmlFor="equity" className="">Existing Scheme</label>
                                        <input className="input-text ml-3" id="debt" type="radio" name="asset" value="DEBT" onClick={() => { this.setState({ existingSelected: false }) }} />
                                        <label htmlFor="debt" className="">New Scheme</label>
                                        <br></br>  <small className="text-danger pull-left"></small>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="row">
                                    {
                                      this.state.existingSelected == false &&
                                      <div className='col-lg-4 col-md-6'>
                                        <div className="form-group pmd-textfield pmd-textfield-floating-label">
                                          <label for="amc" className='text-label'>Select AMC<span className="text-danger">*</span></label><br />
                                          <Select className='' onChange={(selected) => { this.setState({ selectedAMC: selected }) }} options={this.state.amcListSelect} />
                                        </div>
                                      </div>
                                    }
                                    {
                                      this.state.existingSelected == false && <div className='col-lg-4 col-md-6'>
                                        <div className="form-group pmd-textfield pmd-textfield-floating-label">
                                          <label for="folio" className='text-label'>Select Folio<span className="text-danger">*</span></label><br />
                                          <Select className='' options={folio} />
                                        </div>
                                      </div>
                                    }
                                    {this.state.existingSelected == false && <div className='col-lg-4 col-md-6'>
                                      <div className="form-group pmd-textfield pmd-textfield-floating-label">
                                        <label for="Scheme" className='text-label'>Select  Scheme<span className="text-danger">*</span></label><br />
                                        <Select className='' options={scheme} />
                                      </div>
                                    </div>}
                                  </div>
                                  <div className='row'>
                                    <div className='col-lg-4 col-md-6'>
                                      <div className="form-group pmd-textfield pmd-textfield-floating-label">
                                        <label className="control-label lb text-label" for="amount">Enter Amount<span className="text-danger">*</span></label>
                                        <input type="text" className="form-control" name='amount' placeholder='Enter Amount' />
                                      </div>
                                    </div>
                                    <div className='col-lg-4 col-md-6'>
                                      <div className="form-group pmd-textfield pmd-textfield-floating-label">
                                        <label for="sipdate" className='lb  text-label'>SIP Date<span className="text-danger">*</span></label><br />
                                        <Select className='' options={date} />
                                      </div>
                                    </div>
                                    <div className='col-lg-4 col-md-6'>
                                      <div className="form-group pmd-textfield pmd-textfield-floating-label">
                                        <label className="control-label lb text-label" for="sipf">SIP From<span className="text-danger">*</span></label>
                                        <DatePickerComponent format='MMM-yyyy' className="form-control" placeholder='MM-YYYY' start='Year' depth='Year' />
                                      </div>
                                    </div>
                                  </div>
                                  <div className='row'>
                                    <div className='col-lg-4 col-md-6'>
                                      <div className="form-group pmd-textfield pmd-textfield-floating-label">
                                        <label className="control-label lb text-label" for="sipend">SIP To<span className="text-danger">*</span></label>
                                        <DatePickerComponent format='MMM-yyyy' className="form-control" placeholder='MM-YYYY' start='Year' depth='Year' />
                                      </div>
                                    </div>
                                    <div className='col-md-3 '>
                                      <input className="input-text mt-5" id="perpetual" type="checkbox" name="perpetual" value="Y" defaultChecked onChange={() => this.setState({ perpetualSelected: !this.state.perpetualSelected })} />
                                      <input type="hidden" id="perpetual_val" name="perpetual_val" />
                                      <label htmlFor="perpetual" className="ml-2">Perpetual  <spna className="text-danger">*</spna></label>
                                    </div>
                                  </div>

                                  <div className="col-md-12 " id="tbt">

                                    <div className="table-responsive">
                                      {
                                        this.state.existingSelected && (<>
                                          <h5 className="red font-weight-500">Select scheme</h5>
                                          <table className="table bg-white mt-5 mb-3">

                                            <tr>
                                              <th>Select</th>
                                              <th>Profile</th>
                                              <th>Scheme Name</th>
                                              <th>Folio Number</th>
                                              {/* <th>SIP From</th> */}
                                              <th>Total Units</th>
                                              <th>AUM</th>
                                              <th></th>
                                            </tr>
                                            <tr>
                                              <td> <input className="input-text" type="radio" name="select" /></td>
                                              <td>Profile</td>
                                              <td>Scheme Name</td>
                                              <td>Folio Number</td>
                                              <td>total Units</td>
                                              {/* <td>20/11/2021</td> */}
                                              <td>3500</td>
                                              <td> <a href="javascript:void(0)" ><FaTrash className="red" /></a></td>
                                            </tr>
                                          </table></>)
                                      }

                                      {/* Selected Scheme table */}
                                      <div className="col-md-12 ">
                                        <a href="javascript:void(0)" className="btn btn-danger float-right my-4" >+ Add</a>
                                      </div>
                                      <table className="table bg-white mt-5 mb-3">
                                        <tr>

                                          <th>Profile</th>
                                          <th>Scheme Name</th>
                                          <th>Folio Number</th>
                                          <th>SIP From</th>
                                          <th>SIP To</th>
                                          <th>Amount</th>
                                          <th></th>
                                        </tr>
                                        <tr>

                                          <td>Profile</td>
                                          <td>Scheme Name</td>
                                          <td>Folio Number</td>
                                          <td>20/10/2021</td>
                                          <td>20/11/2021</td>
                                          <td>3500</td>
                                          <td> <a href="javascript:void(0)" ><FaTrash className="red" /></a></td>
                                        </tr>
                                      </table>

                                    </div>
                                    <div className="row">
                                      <div className='col-md-5'>
                                        <div className="form-group pmd-textfield pmd-textfield-floating-label">
                                          <label for="mandate" className='lb text-label'>Select Mandate<span className="text-danger">*</span></label><br />
                                          <Select className='' options={this.state.userMandateList} />
                                        </div>
                                        <a href="/prodigypro/dashboard/bank-and-mandate" className="red fs-13">Create Mandate</a>
                                      </div>
                                    </div>
                                  </div>
                                </form>
                              </div>
                              <div className="modal-footer border-0">
                                <button data-dismiss="modal" className="new-btn1" type="button">Order Now</button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </section>
                    {/* <!--End Form trigger modal SIP --> */}
                    {/* <!-- Form trigger modal STP --> */}
                    <section className="stp">
                      <div className="row">
                        <div tabindex="-1" className="modal pmd-modal fade" id="form-dialog-stp" aria-hidden="true">
                          <div className="modal-dialog modal-lg">
                            <div className="modal-content b-r p-3">
                              <div className="modal-header border-0">
                                <div className="quick-access-title">
                                  <h3>STP</h3>
                                </div>
                                <button aria-hidden="true" data-dismiss="modal" className="close" type="button">×</button>
                              </div>
                              <div className="modal-body">
                                <form>
                                  <div className="row">
                                    <div className='col-lg-4 col-md-6'>
                                      <div className="form-group pmd-textfield pmd-textfield-floating-label">
                                        <label for="select-p" className='text-label'>Select Profile<span className="text-danger">*</span></label><br />
                                        <Select className='' options={profile} />
                                      </div>
                                    </div>
                                    <div className='col-lg-4 col-md-6'>
                                      <div className="form-group pmd-textfield pmd-textfield-floating-label">
                                        <label for="invest" className='text-label'>Select AMC<span className="text-danger">*</span></label><br />
                                        <Select className='' options={amc} />
                                      </div>
                                    </div>
                                    <div className='col-lg-4 col-md-6'>
                                      <div className="form-group pmd-textfield pmd-textfield-floating-label">
                                        <label for="folio" className='text-label'>Select Folio<span className="text-danger">*</span></label><br />
                                        <Select className='' options={folio} />
                                      </div>
                                    </div>
                                  </div>
                                  <div className='row'>
                                    <div className='col-md-5'>
                                      <div className="form-group pmd-textfield pmd-textfield-floating-label">
                                        <label for="source" className='text-label'>Select Source Scheme<span className="text-danger">*</span></label><br />
                                        <Select className='' options={sourcescheme} />
                                      </div>
                                    </div>
                                    <div className='col-md-3'>
                                      <p className="text-label mb-1 mt-1 p-radio lb">Asset Class <spna className="text-danger">*</spna></p>
                                      <div className='pt-2'>
                                        <input className=" input-text" id="equity" type="radio" name="asset" value="Equity" />
                                        <label htmlFor="equity" className="">Equity</label>
                                        <input className="input-text ml-3" id="debt" type="radio" name="asset" value="DEBT" />
                                        <label htmlFor="debt" className="">Debt</label>
                                        <br></br>  <small className="text-danger pull-left"></small>
                                      </div>
                                    </div>
                                    <div className='col-md-3'>
                                      <p className="text-label mb-1 mt-1 p-radio lb">Option <spna className="text-danger">*</spna></p>
                                      <div className='pt-2'>
                                        <input className=" input-text" id="growth" type="radio" name="growth" value="GROWTH" />
                                        <label htmlFor="growth" className="">Growth</label>
                                        <input className="input-text ml-3" id="dividend" type="radio" name="growth" value="Dividend" />
                                        <label htmlFor="dividend" className="">IDCW  </label>
                                      </div>
                                    </div>
                                  </div>
                                  <div className='row'>
                                    <div className='col-lg-4 col-md-6'>
                                      <div className="form-group pmd-textfield pmd-textfield-floating-label">
                                        <label for="target" className='lb  text-label'>Select Target Scheme<span className="text-danger">*</span></label><br />
                                        <Select className='' options={targetscheme} />
                                      </div>
                                    </div>
                                    <div className="col-lg-4 col-md-6">
                                      <div className="form-group pmd-textfield pmd-textfield-floating-label">
                                        <label className="control-label lb text-label" for="to">STP From<span className="text-danger">*</span></label>
                                        <DatePickerComponent format='MMM-yyyy' className="form-control" placeholder='MM-YYYY' start='Year' depth='Year' />
                                      </div>
                                    </div>
                                    <div className='col-lg-4 col-md-6'>
                                      <div className="form-group pmd-textfield pmd-textfield-floating-label">
                                        <label for="from" className='lb  text-label'>STP To<span className="text-danger">*</span></label><br />
                                        <DatePickerComponent format='MMM-yyyy' className="form-control" placeholder='MM-YYYY' start='Year' depth='Year' />
                                      </div>
                                    </div>
                                  </div>
                                  <div className='row'>
                                    <div className='col-lg-4 col-md-6'>
                                      <div className="form-group pmd-textfield pmd-textfield-floating-label">
                                        <label for="selectp" className='lb  text-label'>Select Frequency<span className="text-danger">*</span></label><br />
                                        <Select className='' options={frequency} />
                                      </div>
                                    </div>
                                    <div className="col-lg-4 col-md-6">
                                      <div className="form-group pmd-textfield pmd-textfield-floating-label">
                                        <label className="control-label lb text-label" for="amount">Enter Amount<span className="text-danger">*</span></label>
                                        <input type="text" className="form-control" name='amount' placeholder='Enter Amount' />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-md-12 ">
                                    <a href="javascript:void(0)" className="btn btn-danger float-right my-4" >+ Add</a>
                                  </div>
                                  <div className="col-md-12 " id="tbt">
                                    <div className="table-responsive">
                                      <table className="table table-responsive bg-white mt-5 mb-3">
                                        <tr>
                                          <th>Profile</th>
                                          <th> Source Scheme</th>
                                          <th> Folio Number</th>
                                          <th>Target Scheme</th>
                                          <th>STP From</th>
                                          <th>STP To</th>
                                          <th>Frequency</th>
                                          <th>Amount</th>
                                          <th></th>
                                        </tr>
                                        <tr>
                                          <td>Profile</td>
                                          <td>Source Scheme </td>
                                          <td>Folio number</td>
                                          <td>Target Scheme</td>
                                          <td>5/2/22</td>
                                          <td>10/3/22</td>
                                          <td>Frequency</td>
                                          <td>6000</td>
                                          <td> <a href="javascript:void(0)" ><FaTrash className="red" /></a></td>
                                        </tr>
                                      </table>
                                    </div>
                                  </div>
                                </form>
                              </div>
                              <div className="modal-footer border-0">
                                <button data-dismiss="modal" className="new-btn1" type="button">Order Now</button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </section>
                    {/* <!--End Form trigger modal STP --> */}
                    {/* <!-- Form trigger modal SWP --> */}
                    <section className="swp">
                      <div className="row">
                        <div tabindex="-1" className="modal pmd-modal fade" id="form-dialog-swp" aria-hidden="true">
                          <div className="modal-dialog modal-lg">
                            <div className="modal-content b-r p-3">
                              <div className="modal-header border-0">
                                <div className="quick-access-title">
                                  <h3>SWP</h3>
                                </div>
                                <button aria-hidden="true" data-dismiss="modal" className="close" type="button">×</button>
                              </div>
                              <div className="modal-body">
                                <form>
                                  <div className="row">
                                    <div className='col-lg-4 col-md-6'>
                                      <div className="form-group pmd-textfield pmd-textfield-floating-label">
                                        <label for="select-p" className='text-label'>Select Profile<span className="text-danger">*</span></label><br />
                                        <Select className='' options={profile} />
                                      </div>
                                    </div>
                                    <div className='col-lg-4 col-md-6'>
                                      <div className="form-group pmd-textfield pmd-textfield-floating-label">
                                        <label for="amc" className='text-label'>Select AMC<span className="text-danger">*</span></label><br />
                                        <Select className='' options={amc} />
                                      </div>
                                    </div>
                                    <div className='col-lg-4 col-md-6'>
                                      <div className="form-group pmd-textfield pmd-textfield-floating-label">
                                        <label for="folio" className='text-label'>Select Folio<span className="text-danger">*</span></label><br />
                                        <Select className='' options={folio} />
                                      </div>
                                    </div>
                                  </div>
                                  <div className='row'>
                                    <div className='col-lg-4 col-md-6'>
                                      <div className="form-group pmd-textfield pmd-textfield-floating-label">
                                        <label for="sScheme" className='lb  text-label'>Select Scheme<span className="text-danger">*</span></label><br />
                                        <Select className='' options={scheme} />
                                      </div>
                                    </div>
                                    <div className='col-lg-4 col-md-6'>
                                      <div className="form-group pmd-textfield pmd-textfield-floating-label">
                                        <label className="control-label lb text-label" for="sipf">SWP From<span className="text-danger">*</span></label>
                                        <DatePickerComponent format='MMM-yyyy' className="form-control" placeholder='MM-YYYY' start='Year' depth='Year' />
                                      </div>
                                    </div>
                                    <div className='col-lg-4 col-md-6'>
                                      <div className="form-group pmd-textfield pmd-textfield-floating-label">
                                        <label className="control-label lb text-label" for="sipend">SWP To<span className="text-danger">*</span></label>
                                        <DatePickerComponent format='MMM-yyyy' className="form-control" placeholder='MM-YYYY' start='Year' depth='Year' />
                                      </div>
                                    </div>
                                  </div>
                                  <div className='row'>
                                    <div className='col-lg-4 col-md-6'>
                                      <div className="form-group pmd-textfield pmd-textfield-floating-label">
                                        <label for="selectf" className='lb  text-label'>Select Frequency<span className="text-danger">*</span></label><br />
                                        <Select className='' options={frequency} />
                                      </div>
                                    </div>
                                    <div className="col-lg-4 col-md-6">
                                      <div className="form-group pmd-textfield pmd-textfield-floating-label">
                                        <label className="control-label lb text-label" for="amount">Enter Amount<span className="text-danger">*</span></label>
                                        <input type="text" className="form-control" name='amount' placeholder='Enter Amount' />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-md-12 ">
                                    <a href="javascript:void(0)" className="btn btn-danger float-right my-4" >+ Add</a>
                                  </div>
                                  <div className="col-md-12 " id="tbt">
                                    <div className="table-responsive">
                                      <table className="table bg-white mt-5 mb-3">
                                        <tr>
                                          <th>Profile</th>
                                          <th>Scheme Name</th>
                                          <th>Folio Number</th>
                                          <th>SWP From</th>
                                          <th>SWP To</th>
                                          <th>Frequency</th>
                                          <th>Amount</th>
                                          <th></th>
                                        </tr>
                                        <tr>
                                          <td>Profile</td>
                                          <td>Scheme Name</td>
                                          <td>folio number</td>
                                          <td>5/12/20</td>
                                          <td>6/1/21</td>
                                          <td>frequency</td>
                                          <td>4500</td>
                                          <td> <a href="javascript:void(0)" ><FaTrash className="red" /></a></td>
                                        </tr>
                                      </table>
                                    </div>
                                  </div>
                                </form>
                              </div>
                              <div className="modal-footer border-0">
                                <button data-dismiss="modal" className="new-btn1" type="button">Order Now</button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </section>
                    {/* <!--End Form trigger modal SWP --> */}
                    {/* <!-- Form trigger modal Redemption--> */}
                    <section className="redemption">
                      <div className="row">
                        <div tabindex="-1" className="modal pmd-modal fade" id="form-dialog-redemption" aria-hidden="true">
                          <div className="modal-dialog modal-lg">
                            <div className="modal-content b-r p-3">
                              <div className="modal-header border-0">
                                <div className="quick-access-title">
                                  <h3>Redemption</h3>
                                </div>
                                <button aria-hidden="true" data-dismiss="modal" className="close" type="button">×</button>
                              </div>
                              <div className="modal-body">
                                <form>
                                  <div className="row">
                                    <div className='col-lg-4 col-md-6'>
                                      <div className="form-group pmd-textfield pmd-textfield-floating-label">
                                        <label for="select-p" className='text-label'>Select Profile<span className="text-danger">*</span></label><br />
                                        <Select className='' options={profile} />
                                      </div>
                                    </div>
                                    <div className='col-lg-4 col-md-6'>
                                      <div className="form-group pmd-textfield pmd-textfield-floating-label">
                                        <label for="amc" className='text-label'>Select AMC<span className="text-danger">*</span></label><br />
                                        <Select className='' options={amc} />
                                      </div>
                                    </div>
                                    <div className='col-lg-4 col-md-6'>
                                      <div className="form-group pmd-textfield pmd-textfield-floating-label">
                                        <label for="folio" className='text-label'>Select Folio<span className="text-danger">*</span></label><br />
                                        <Select className='' options={folio} />
                                      </div>
                                    </div>
                                  </div>
                                  <div className='row'>
                                    <div className='col-md-5'>
                                      <div className="form-group pmd-textfield pmd-textfield-floating-label">
                                        <label for="scheme" className='lb  text-label'>Select Scheme<span className="text-danger">*</span></label><br />
                                        <Select className='' options={scheme} />
                                      </div>
                                    </div>
                                    <div className="col-md-7">
                                      <p className="text-label mb-1 mt-1 p-radio">Redemption Type <spna className="text-danger">*</spna></p>
                                      <input className=" input-text" id="amt" type="radio" name="amt_type" value="amt" />
                                      <label htmlFor="amt" className="">By Amount</label>
                                      <input className="input-text ml-3" id="units" type="radio" name="amt_type" value="unit" />
                                      <label htmlFor="units" className="">By Units</label>
                                      <input className="input-text ml-3" id="all_units" type="radio" name="amt_type" value="all_units" />
                                      <label htmlFor="all_units" className="">All Units</label>
                                      <br></br>  <small className="text-danger pull-left"></small>
                                    </div>
                                  </div>
                                  <div className='col-md-5'>
                                    <div className="form-group pmd-textfield pmd-textfield-floating-label">
                                      <label className="control-label lb text-label" for="amount">Enter Amount<span className="text-danger">*</span></label>
                                      <input type="text" className="form-control" name='amount' placeholder='Enter Amount' />
                                    </div>
                                  </div>
                                  <div className="col-md-12 ">
                                    <a href="javascript:void(0)" className="btn btn-danger float-right my-4" >+ Add</a>
                                  </div>
                                  <div className="col-md-12 " id="tbt">
                                    <div className="table-responsive">
                                      <table className="table bg-white mt-5 mb-3">
                                        <tr>
                                          <th>Profile</th>
                                          <th>Scheme Name</th>
                                          <th>Folio Number</th>
                                          <th>Redemption Type</th>
                                          <th>Amount</th>
                                          <th></th>
                                        </tr>
                                        <tr>
                                          <td>Profile</td>
                                          <td>Scheme Name</td>
                                          <td>Folio Number</td>
                                          <td>Redemption Type</td>
                                          <td>3500</td>
                                          <td> <a href="javascript:void(0)" ><FaTrash className="red" /></a></td>
                                        </tr>
                                      </table>
                                    </div>
                                  </div>
                                </form>
                              </div>
                              <div className="modal-footer border-0">
                                <button data-dismiss="modal" className="new-btn1" data-target="#success-transaction-redem" data-toggle="modal" type="button">Order Now</button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </section>
                    {/* <!--End Form trigger modal Redemption
                        --> */}
                    {/* successful transaction  purchase*/}
                    <section className="success-trans">
                      <div className="row">
                        <div tabindex="-1" className="modal pmd-modal fade" id="success-transaction" aria-hidden="true">
                          <div className="modal-dialog modal-lg modal-dialog-centered">
                            <div className="modal-content b-r px-2 bg-white text-center">
                              <div className="text-right pt-2">
                                <button aria-hidden="true" data-dismiss="modal" className="close" type="button">×</button>
                              </div>
                              <div className="modal-body py-0">
                                <img className="img-fluid" src={success} alt="" />
                                <h3 className="success-c font-weight-500 py-3">Successful Transaction with
                                  Following Details</h3>
                                <div className="row">
                                  <div className="col-md-5 border-right">
                                    <div className="row">
                                      <div className="col-md-6 text-left text-black">Unique Number </div>
                                      <div className="col-md-1">:</div>
                                      <div className="col-md-4 text-left">12345678</div>


                                      <div className="col-md-6 text-left text-black">Trxn Number </div>
                                      <div className="col-md-1">:</div>
                                      <div className="col-md-4 text-left">12346195</div>

                                      <div className="col-md-6 text-left text-black">Amount   </div>
                                      <div className="col-md-1">:</div>
                                      <div className="col-md-4 text-left">1,000</div>


                                      <div className="col-md-6 text-left text-black">Status   </div>
                                      <div className="col-md-1">:</div>
                                      <div className="col-md-4 text-left">Ok</div>


                                    </div>
                                  </div>

                                  <div className="col-md-7 ">
                                    <div className="row">
                                      <div className="col-md-4 text-left text-black">Folio Number </div>
                                      <div className="col-md-1">:</div>
                                      <div className="col-md-7 text-left">12345678</div>
                                    </div>
                                    <div className="row ">

                                      <div className="col-md-4 text-left text-black">Fund </div>
                                      <div className="col-md-1">:</div>
                                      <div className="col-md-7 text-left">Axis Mutual Fund</div>
                                    </div>
                                    <div className="row">
                                      <div className="col-md-4 text-left text-black">Scheme Name </div>
                                      <div className="col-md-1">:</div>
                                      <div className="col-md-7 text-left">Axis Arbitrage Fund - Regular Growth</div>


                                    </div>

                                  </div>


                                </div>

                                <hr />
                                <div className="py-2">

                                  <p className="text-black fs-13">
                                    <span className="red text-left font-weight-500 fs-16">Note:</span>  Payment link has been sent on your registered mail id and mobile number.The Link shall remain active for the next 48 hours.
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </section>
                    {/* successful transaction  end */}
                    {/* successful transaction  redemption*/}
                    <section className="success-trans">
                      <div className="row">
                        <div tabindex="-1" className="modal pmd-modal" id="success-transaction-redem" aria-hidden="true">
                          <div className="modal-dialog modal-lg modal-dialog-centered">
                            <div className="modal-content b-r px-2 bg-white text-center">
                              <div className="text-right pt-2">
                                <button aria-hidden="true" data-dismiss="modal" className="close" type="button">×</button>
                              </div>
                              <div className="modal-body py-0">
                                <img className="img-fluid" src={success} alt="" />
                                <h3 className="success-c font-weight-500 py-3">Successful Transaction with
                                  Following Details</h3>
                                <div className="row">
                                  <div className="col-md-5 border-right">
                                    <div className="row">
                                      <div className="col-md-6 text-left text-black">Unique Number </div>
                                      <div className="col-md-1">:</div>
                                      <div className="col-md-4 text-left">12345678</div>


                                      <div className="col-md-6 text-left text-black">Trxn Number </div>
                                      <div className="col-md-1">:</div>
                                      <div className="col-md-4 text-left">12346195</div>

                                      <div className="col-md-6 text-left text-black">Amount   </div>
                                      <div className="col-md-1">:</div>
                                      <div className="col-md-4 text-left">1,000</div>


                                      <div className="col-md-6 text-left text-black">Status   </div>
                                      <div className="col-md-1">:</div>
                                      <div className="col-md-4 text-left">Ok</div>


                                    </div>
                                  </div>

                                  <div className="col-md-7 ">
                                    <div className="row">
                                      <div className="col-md-4 text-left text-black">Folio Number </div>
                                      <div className="col-md-1">:</div>
                                      <div className="col-md-7 text-left">12345678</div>
                                    </div>
                                    <div className="row ">

                                      <div className="col-md-4 text-left text-black">Fund </div>
                                      <div className="col-md-1">:</div>
                                      <div className="col-md-7 text-left">Axis Mutual Fund</div>
                                    </div>
                                    <div className="row">
                                      <div className="col-md-4 text-left text-black">Scheme Name </div>
                                      <div className="col-md-1">:</div>
                                      <div className="col-md-7 text-left">Axis Arbitrage Fund - Regular Growth</div>


                                    </div>

                                  </div>


                                </div>

                                <hr />
                                <div className="py-2">

                                  <p className="text-black fs-13">
                                    <span className="red text-left font-weight-500 fs-16">Note:</span>  Authorization link has been sent on your registered mail id and mobile number.The Link shall remain active for the next 48 hours.Kindly authorize.
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </section>
                    {/* successful transaction-redemption  end */}


                    {/*========== something went wrong=========== */}

                    <section className="wrong">
                      <div className="row">
                        <div tabindex="-1" className="modal pmd-modal fade" id="wrong" aria-hidden="true">
                          <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content  bg-white text-center br-15">
                              <div className="modal-body text-center">
                                <img className="img-fluid" src={opps} alt="" />
                                <h3 className="text-black font-weight-500 py-3"> Something went wrong</h3>
                                <p className="">
                                  Please try again after sometime.
                                </p>
                              </div>
                              <div className="bg-red text-center pt-2 order-b">
                                <a href='#' className="text-white font-weight-bold" data-dismiss="modal" >
                                  <h4>OK</h4>
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </section>


                    {/* ============something went wrong end============= */}
                  </div>
                </div>
              </div>
              {/* Footer */}
              <Footer />
              {/* End of Footer */}
            </div>
          </div>
        </div>
      </>
    );
  }
}
export default Transact;
