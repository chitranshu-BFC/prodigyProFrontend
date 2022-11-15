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

class STP extends React.Component {
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
    const schemeList = []; const list = '';
    const userData = JSON.parse(localStorage.getItem("loginUserData"))
    const data = {
      email: userData.email,
    }

    Axios.post("/prodigypro/api/User_profile", data)
      .then((res) => {
        // console.log("dscd",res.data.data.data)
        this.setState({ userList: res.data.data.data })
      })

    Axios.post("/prodigypro/api/amc")
      .then((response) => {
        // console.log(response.data.data.data)
        this.setState({ amcList: response.data.data.data })
      })
  }

  userProfile = e => {
    let userPro_id; let schemeList = [];
    userPro_id = $('select[name="userPro_id"]').val();
    $("#wait").css('display', 'block');
	$(".table-head").css('display', 'block');
    this.setState({ userSchemeList: '' })
    const userData = JSON.parse(localStorage.getItem("loginUserData"))
    this.state.userList.map(value => {
      if(value.id==userPro_id){
        this.setState({userIIN:value.customer_id})
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
							  console.log("Scheme list", schemeList)
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
							  schemeList.push({ scheme_name: key.products.PRODUCT_LONG_NAME, folio_no: data.folio, SWP_DATES: key.products.SWP_DATES, FREQUENCIES: key.products.SYSTEMATIC_FREQUENCIES, amc_code: key.products.AMC_CODE, product_code: key.products.PRODUCT_CODE, reinvest: key.products.REINVEST_TAG, iin: value.customer_id , unit: resss.data.data.data[0].UNITS , amu:resss.data.data.data[0].AMOUNT , isin: key.products.ISIN, investor_name:investNM.investor_name })
							  this.setState({ userSchemeList: schemeList })
							  console.log("Scheme list", schemeList)
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

  onscheme = e => { // folio_no
    let key = $("input:radio[name=key]:checked").val();
    let folio_no = $('#folio_no_' + key).val();
    let scheme = $('#scheme_nm_' + key).val();
	$('select[name="scheme"]').val("");
    $('input[name="asset"][value="Equity"]').prop("checked", true);
  $('input[name="asset"][value="DEBT"]').prop("checked", false);
  $('input[name="growth"][value="GROWTH"]').prop("checked", true);
  $('input[name="growth"][value="Dividend"]').prop("checked", false);
    $(".idcw").css('display','none');

    //alert(key+" - "+folio_no+" - "+scheme)
    this.state.userSchemeList.map(val => {
      if ((val.scheme_name == scheme) && (val.folio_no == folio_no)) {
        console.log("scheme list", val)
        if (val.FREQUENCIES != null) {
          const FREQUENCIES_arr = val.FREQUENCIES.split(',');
          this.setState({ userFREQUENCIES_arr: FREQUENCIES_arr })
        } else {
          this.setState({ userFREQUENCIES_arr: "" })
        }

        const data = {
          AMC_CODE: val.amc_code,
          ASSET_CLASS: $("input:radio[name=asset]:checked").val(),
          DIV_GW: $("input:radio[name=growth]:checked").val(),
        }

             
        if((data.ASSET_CLASS!=undefined) && (data.DIV_GW!=undefined)){
          Axios.post("/prodigypro/api/targetScheme", data)
          .then((res) => {
            console.log("usertargetScheme",res.data.data.data)
            this.setState({ usertargetScheme: res.data.data.data })
          })
        }

        const swp_date_arr = val.SWP_DATES.split(',');
        this.setState({ userSwpDate: swp_date_arr })
        this.setState({ userschemeName: { folio_no: folio_no, scheme: scheme, amc_code: val.amc_code, product_code: val.product_code, reinvest: val.reinvest, iin: val.iin } })
      }
    })
  }

  targetScheme = e => {
    const data = {
      AMC_CODE: this.state.userschemeName.amc_code,
      ASSET_CLASS: $("input:radio[name=asset]:checked").val(),
      DIV_GW: $("input:radio[name=growth]:checked").val(),
    }
    console.log("dd",data)  
    if((data.ASSET_CLASS!=undefined) && (data.DIV_GW!=undefined)){
      Axios.post("/prodigypro/api/targetScheme", data)
      .then((res) => {
        console.log("targetScheme", res.data.data.data)
        this.setState({ usertargetScheme: res.data.data.data })
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
      var isValid ={assetClass:"1"}
      dataErr.push(isValid);
      this.setState({ assetClass_err: "Mandatory Field" });
    } else {
      this.setState({ assetClass_err: "" });
    }

    if (data.option == undefined) {
      var isValid ={growth:"1"}
      dataErr.push(isValid);
      this.setState({ growth_err: "Mandatory Field" });
    } else {
      this.setState({ growth_err: "" });
    }

    return  dataErr.length;
  }

  getScheme=e=>{
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

  handleFormValidation(data) {
    let dataErr=[];
    if (data.assetClass == undefined) {
      var isValid ={assetClass:"1"}
      dataErr.push(isValid);
      this.setState({ assetClass_err: "Mandatory Field" });
    } else {
      this.setState({ assetClass_err: "" });
    }

    if (data.growth == undefined) {
      var isValid ={growth:"1"}
      dataErr.push(isValid);
      this.setState({ growth_err: "Mandatory Field" });
    } else {
      this.setState({ growth_err: "" });
    }

    if (data.target_scheme == "") {
      var isValid ={target_scheme:"1"}
      dataErr.push(isValid);
      this.setState({ target_scheme_err: "Mandatory Field" });
    } else {
      this.setState({ target_scheme_err: "" });
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

    if (data.date_from == '') {
      var isValid ={date_from:"1"}
      dataErr.push(isValid);
      this.setState({ date_from_err: "Mandatory Field" });
    } else {
      this.setState({ date_from_err: "" });
    }

    if (data.date_to == '') {
      var isValid ={date_to:"1"}
      dataErr.push(isValid);
      this.setState({ date_to_err: "Mandatory Field" });
    } else {
      this.setState({ date_to_err: "" });
    }

    // if (data.frequency == "") {
    //   var isValid = false;
    //   this.setState({ frequency_err: "Mandatory Field" });
    // } else {
    //   var isValid = true;
    //   this.setState({ frequency_err: "" });
    // }

    if (data.amt == '') {
      var isValid ={amt:"1"}
      dataErr.push(isValid);
      this.setState({ amt_err: "Mandatory Field" });
    } else {
      // if(data.amt<1000){
      //   var isValid ={amt:"1"}
      //   dataErr.push(isValid);
      //   this.setState({ amt_err: "Amount must be greater and multiple of 1000" });
      // }else{
      //   this.setState({ amt_err: "" });
      // }
      this.setState({ amt_err: "" });
    }

    return dataErr.length;

  }

  addClick = (e) => {
    let userPro_id = $('select[name="userPro_id"]').val();
    let key = $("input:radio[name=key]:checked").val();
   
    if(userPro_id==""){
      toast.error("Please Select Profile!")
    }
    else if(key==undefined){
      toast.error("Please Select Scheme!")
    }
    else{
      const data = {
        // customer_id : this.state.userList,
        scheme: $("input:radio[name=key]:checked").val(),
        assetClass: $("input:radio[name=asset]:checked").val(),
        growth: $("input:radio[name=growth]:checked").val(),
        target_scheme: $('select[name="target_scheme"]').val(),
        target_scheme_nm: $("#target_scheme option:selected").text(),
        schemeName: this.state.userschemeName.scheme,
        folio_no: this.state.userschemeName.folio_no,
        amc_code: this.state.userschemeName.amc_code,
        product_code: this.state.userschemeName.product_code,
        reinvest: this.state.userschemeName.reinvest,
        iin: this.state.userschemeName.iin,
        date: $('select[name="date"]').val(),
        date_from: $('input[name="month_from"]').val(),
        date_to: $('input[name="month_to"]').val(),
        frequency: $('select[name="frequency"]').val(),
        amt: $('input[name="amt"]').val()
      }
  
      if (this.handleFormValidation(data)==0) {
        this.setState(prevState => ({
          Items: [...prevState.Items, data]
        }))
      }
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

  oderNow = (e) => {
    const userData = JSON.parse(localStorage.getItem("loginUserData"))
    let userPro_id = $('select[name="userPro_id"]').val();
    let key = $("input:radio[name=key]:checked").val();

    if(userPro_id==""){
      toast.error("Please Select Profile!")
    }
    else if(key==undefined){
      toast.error("Please Select Scheme!")
    }
    else{
      const data = {
        // customer_id : this.state.userList,
        scheme: $("input:radio[name=key]:checked").val(),
        assetClass: $("input:radio[name=asset]:checked").val(),
        growth: $("input:radio[name=growth]:checked").val(),
        target_scheme: $('select[name="target_scheme"]').val(),
        target_scheme_nm: $("#target_scheme option:selected").text(),
        schemeName: this.state.userschemeName.scheme,
        folio_no: this.state.userschemeName.folio_no,
        amc_code: this.state.userschemeName.amc_code,
        product_code: this.state.userschemeName.product_code,
        reinvest: this.state.userschemeName.reinvest,
        iin : this.state.userIIN,
        date: $('select[name="date"]').val(),
        date_from: $('input[name="month_from"]').val(),
        date_to: $('input[name="month_to"]').val(),
        frequency: $('select[name="frequency"]').val(),
        amt: $('input[name="amt"]').val()
      }
  
      if (this.handleFormValidation(data)==0) {
        if (this.state.Items!=''){
          let data =[];  let total_amt = 0;
          this.state.Items.map((val, key) => {
            total_amt = parseInt(total_amt) + parseInt(val.amt);
            const swp_from_arr = val.date_from.split('-');
            const swp_to_arr = val.date_to.split('-');
            const from_mn = new Date(swp_from_arr[1]).toString().split(' ')[1];
            const to_mn = new Date(swp_to_arr[1]).toString().split(' ')[1];
            var to_year='';

            const value = {

              folio: val.folio_no,
              amc: val.amc_code,
              product_code: val.product_code,
              reinvest: val.reinvest,
              amount: val.amt,
              input_ref_no:"",
              perpetual_flag:"N",
              transfer_date:"",
              from_date:val.date + "-" + from_mn + "-" + swp_from_arr[0],
              to_date:val.date + "-" + to_mn + "-" + swp_to_arr[0],
              target_product:val.target_scheme,
              periodicity:val.frequency,
              period_day:val.date,
              sip_from_date: val.date + "-" + from_mn + "-" + swp_from_arr[0],
              sip_end_date:val.date + "-" + to_mn + "-" + swp_to_arr[0],
              sip_freq:val.frequency,
              sip_amount:val.amt,
              amt_unit_type:"AMOUNT",
              amt_unit:val.amt,
              all_unit:"",
              sip_period_day:""
              
            }
    
            data.push(value)
            const value2 = {
              email: userData.email,
              payment_mode:"M",
              trxn_type:"STP",
              trxn_acceptance:"ALL",
              ach_exist:"Y",
              sip_paymech:"M",
              umrn:"",
              ach_amt:"",
              ach_fromdate:"",
              frequency:"ONCE A MONTH",
              until_cancelled:"Y",
              ach_enddate:"",
              transfer_date:"",
              debit_amount_type:"",
              return_paymnt_flag:"N",
              client_callback_url:"API URL",
              instrm_date:"",
              iin: this.state.userIIN,
              holder_name:"",
              accountNo:"",
              bank_code:"",
              branch:"",
              instrm_amount:total_amt,
              childArr: data
            } 
    
            console.log("value2",value2);
            Axios.post("/prodigypro/api/multi_regularSTP", value2)
            .then((result) => {
                console.log(result.data.data);
                if (result.data.data.status == 400) {
                  toast.error(result.data.data.message)
                } else {
                  this.setState({orderMsg:"Payment link has been sent on your registered mail id and mobile number.The Link shall remain active for the next 48 hours. Kindly authorize."})
                  window.$('.bd-example-modal-lg').modal('show');
                  this.setState({orderData: result.data.data.data})
                }
            });

        })
      }else{
          let data = []; 
          let perpetual = $('input[name="perpetual_val"]').val();
          let date= $('select[name="date"]').val();
          let date_from= $('input[name="month_from"]').val();
          let date_to= $('input[name="month_to"]').val();
          const swp_from_arr = date_from.split('-');
          const swp_to_arr = date_to.split('-');
          const from_mn = new Date(swp_from_arr[1]).toString().split(' ')[1];
          const to_mn = new Date(swp_to_arr[1]).toString().split(' ')[1];
          var to_year='';

          const value = {
            folio: this.state.userschemeName.folio_no,
            amc: this.state.userschemeName.amc_code,
            product_code: this.state.userschemeName.product_code,
            reinvest: this.state.userschemeName.reinvest,
            amount: $('input[name="amt"]').val(),
            input_ref_no:"",
            perpetual_flag:"N",
            transfer_date:"",
            from_date:date+ "-" + from_mn + "-" + swp_from_arr[0],
            to_date:date+ "-" + to_mn + "-" + swp_to_arr[0],
            target_product:this.state.usertargetSchData.target_product_code,
            periodicity: $('select[name="frequency"]').val(),
            period_day:date,
            sip_from_date: date + "-" + from_mn + "-" + swp_from_arr[0],
            sip_end_date:date + "-" + to_mn + "-" + swp_to_arr[0],
            sip_freq: $('select[name="frequency"]').val(),
            sip_amount:$('input[name="amt"]').val(),
            amt_unit_type:"AMOUNT",
            amt_unit:$('input[name="amt"]').val(),
            all_unit:"",
            sip_period_day:""
          }
  
          data.push(value)
          
          const value2 = {
            email: userData.email,
            payment_mode:"M",
            trxn_type:"STP",
            trxn_acceptance:"ALL",
            ach_exist:"Y",
            sip_paymech:"M",
            umrn:"",
            ach_amt:"",
            ach_fromdate:"",
            frequency:"ONCE A MONTH",
            until_cancelled:"Y",
            ach_enddate:"",
            transfer_date:"",
            debit_amount_type:"",
            return_paymnt_flag:"N",
            client_callback_url:"API URL",
            instrm_date:"",
            iin : this.state.userIIN,
            holder_name:"",
            accountNo:"",
            bank_code:"",
            branch:"",
            instrm_amount:$('input[name="amt"]').val(),
            childArr: data
          } 
  
          console.log("value2",value2);
          Axios.post("/prodigypro/api/multi_regularSTP", value2)
          .then((result) => {
              console.log(result.data.data);
              if (result.data.data.status == 400) {
                toast.error(result.data.data.message)
              } else {
                this.setState({orderMsg:"Payment link has been sent on your registered mail id and mobile number.The Link shall remain active for the next 48 hours. Kindly authorize."})
                window.$('.bd-example-modal-lg').modal('show');
                this.setState({orderData: result.data.data.data})
              }
          });
        }
      }
    }
  }
  render() {
    let data = []; let temp; let DataList = []; let date;

    if (this.state.userFREQUENCIES_arr) {
      for (var i = 0; i < this.state.userFREQUENCIES_arr.length; i++) {
        if (this.state.userFREQUENCIES_arr[i] == "D") {
          temp = <option value="D">Daily</option>
        } else if (this.state.userFREQUENCIES_arr[i] == "WD") {
          temp = <option value="WD">Weekly</option>
        } else if (this.state.userFREQUENCIES_arr[i] == "OW") {
          temp = <option value="OW">Once in a week</option>
        } else if (this.state.userFREQUENCIES_arr[i] == "OM") {
          temp = <option value="OM">Monthly</option>
        } else if (this.state.userFREQUENCIES_arr[i] == "Q") {
          temp = <option value="Q">Quatrly</option>
        } else if (this.state.userFREQUENCIES_arr[i] == "H") {
          temp = <option value="H">Half-Yearly</option>
        } else if (this.state.userFREQUENCIES_arr[i] == "Y") {
          temp = <option value="Y">Yearly</option>
        } else if (this.state.userFREQUENCIES_arr[i] == "TW") {
          temp = <option value="TW">Twice a month</option>
        } else if (this.state.userFREQUENCIES_arr[i] == "BZ") {
          temp = <option value="BZ">Business Daye</option>
        }
        data.push(temp)
      }
    }

    if (this.state.userSwpDate) {
      for (var i = 0; i < this.state.userSwpDate.length; i++) {
        date = <option value={this.state.userSwpDate[i].length==1?"0"+this.state.userSwpDate[i]:this.state.userSwpDate[i]}>{this.state.userSwpDate[i].length==1?"0"+this.state.userSwpDate[i]:this.state.userSwpDate[i]}</option>
        DataList.push(date)
      }
    }
    return (
      <>
        <StyleComponent />
        <Helmet>
          <title>Prodigy Pro - STP</title>
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
          `}
        </style>

        {/* Page Wrapper */}
        <div id="wrapper">
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
          {/* Sidebar */}
          <Sidebar mainTab="transact"  innertab="stp" />
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
                    <li className="breadcrumb-item active" aria-current="page">STP</li>
                  </ol>
                </nav>
                <div className="row">
                  {/* Area Chart */}
                  <div className="col-xl-12 col-lg-12">
                    <div className="card shadow mb-4">
                      {/* Card Header - Dropdown */}
                      <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                        {/* <h6 className="m-0 font-weight-bold text-danger">STP</h6> */}
                      </div>
                      {/* Card Body */}
                      <div className="card-body">
                        <div className="row">
                          <div className="col-xl-4 col-lg-4 mb-4">
                            <span className="has-float-label">
                              <select className="form-control input-text" name="userPro_id" onChange={this.userProfile}>
                                <option value=''>Select Profile</option>
                                {this.state.userList ?
                                  this.state.userList.map((item, key) =>
                                    <option value={item.id}>{item.investor_name} {item.jh1_name != "undefined" ? " | " + item.jh1_name : null}{item.jh2_name != "undefined" ? " | " + item.jh2_name : null}</option>
                                  ) : null}
                              </select>
                              <label htmlFor="profile" className="text-label">Select Profile  <spna className="text-danger">*</spna></label>
                            </span>
                          </div>
                        </div>
                        <div className="row table-head">
                          <div className="col-xl-12 col-lg-12 mb-4 table-wrapper-scroll-y my-custom-scrollbar">
                            <label htmlFor="source" className="text-label">Select Source Scheme  <spna className="text-danger">*</spna></label>
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
                        <div className="row">
                          <div className="col-xl-4 col-lg-4 mb-4">
                            <p className="text-label mb-1 p-radio">Asset Class  <spna className="text-danger">*</spna></p>
                            <input className=" input-text" id="equity" type="radio" name="asset" value="Equity" onChange={this.targetScheme} />
                            <label htmlFor="equity" className="text-label">Equity</label>
                            <input className="input-text ml-3" id="debt" type="radio" name="asset" value="DEBT" onChange={this.targetScheme} />
                            <label htmlFor="debt" className="text-label">Debt</label><br></br>
                            <small className="text-danger pull-left">{this.state.assetClass_err}</small>
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
							</label><br></br>
                            <small className="text-danger pull-left">{this.state.growth_err}</small>
                          </div>
                          <div className="col-xl-4 col-lg-4 mb-4">
                            <span className="has-float-label">
                              <select className="form-control input-text" data-live-search="true" name="target_scheme" id="target_scheme" onClick={this.getScheme}>
                                <option value="">Select</option>
                                {this.state.usertargetScheme ?
                                  this.state.usertargetScheme.map((item, key) =>
                                    item.STP_ALLOWED == "Y" ?
                                      <option value={item.PRODUCT_CODE}>{item.PRODUCT_LONG_NAME}</option>
                                      : null
                                  ) : null}
                              </select>
                              <label htmlFor="target" className="text-label">Select Target Scheme  <spna className="text-danger">*</spna></label>
                              <small className="text-danger pull-left">{this.state.target_scheme_err}</small>
                            </span>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-xl-4 col-lg-4 mb-4">
                            <span className="has-float-label">
                              <input className="form-control input-text" id="amt" name="amt" type="Text" placeholder="Enter Value" />
                              <label htmlFor="amt" className="text-label">Enter Amount  <spna className="text-danger">*</spna></label>
                              <small className="text-danger pull-left">{this.state.amt_err}</small>
                            </span>
                          </div>
                          <div className="col-xl-4 col-lg-4 mb-4">
                            <span className="has-float-label">
                              <select className="form-control input-text" name="frequency" data-live-search="true" >
                                <option value="">Select</option>
                                {data}
                              </select>
                              <label htmlFor="Frequency" className="text-label">Select Frequency  <spna className="text-danger">*</spna></label>

                            </span>
                          </div>
                          <div className="col-xl-4 col-lg-4 mb-4">
                            <span className="has-float-label">
                              <select className="form-control input-text" name="date" data-live-search="true" >
                                <option value="">Select</option>
                                {DataList}
                              </select>
                              <label htmlFor="Frequency" className="text-label">Select Date  <spna className="text-danger">*</spna></label>
                              <small className="text-danger pull-left">{this.state.date_err}</small>
                            </span>
                          </div>
                        </div>
                        <div className="row">
						 <div className="col-xl-4 col-lg-4 mb-4 idcw">
                              <span className="has-float-label">
                                <input className="form-control input-text" id="idcw_val" type="Text" placeholder="IDCW Option" name="idcw_val" defaultValue="Not Applicable"/>
                                <label htmlFor="idcw_val" className="text-label">IDCW Option</label>
                              </span>
                              
                            </div> 
                          <div className="col-xl-4 col-lg-4 mb-4">
                            <span className="has-float-label">
                              <input className="form-control input-text" id="month_from" name="month_from" type="month" placeholder="Enter Value" />
                              <label htmlFor="date_from" className="text-label">STP From  <spna className="text-danger">*</spna></label>
                              <small className="text-danger pull-left">{this.state.date_from_err}</small>
                            </span>
                          </div>
                          <div className="col-xl-4 col-lg-4 mb-4">
                            <span className="has-float-label">
                              <input className="form-control input-text" id="month_to" name="month_to" type="month" placeholder="Enter Value" />
                              <label htmlFor="date_to" className="text-label">STP To  <spna className="text-danger">*</spna></label>
                              <small className="text-danger pull-left">{this.state.date_to_err}</small>
                            </span>
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
                        {this.state.Items!='' ?
                              
                        <table className="table mb-5">
                          <thead className="thead-light">
                            <tr>
                              <th scope="col">IIN</th>
                              <th scope="col">Source Scheme</th>
                              <th scope="col">Folio Number</th>
                              <th scope="col">Target Scheme</th>
                              <th scope="col">STP Start Date</th>
                              <th scope="col">STP End Date</th>
                              <th scope="col">Frequency</th>
                              <th scope="col">Amount</th>
                              <th scope="col">Remove</th>
                            </tr>
                          </thead>
                          <tbody>

                            {this.state.Items.map((item, key) =>
                                <tr id={"rowData_" + key}>
                                  <th scope="row">{item.iin}</th>
                                  <td>{item.schemeName}</td>
                                  <td>{item.folio_no}</td>
                                  <td>{item.target_scheme_nm}</td>
                                  <td>{format(new Date(item.date_from+'-'+item.date), 'dd/MM/yyyy')}</td>
                                  <td>
                                    {item.date_to ? format(new Date(item.date_to+'-'+item.date), 'dd/MM/yyyy'): null}
                                    {item.date_to == "" ? "31/12/2099" : null}
                                  </td>
                                  <td>
                                    {item.frequency == "D" ? "Daily" : null}
                                    {item.frequency == "WD" ? "Weekly" : null}
                                    {item.frequency == "OW" ? "Once in a week" : null}
                                    {item.frequency == "OM" ? "Monthly" : null}
                                    {item.frequency == "Q" ? "Quatrly" : null}
                                    {item.frequency == "H" ? "Half-Yearly" : null}
                                    {item.frequency == "Y" ? "Yearly" : null}
                                    {item.frequency == "TW" ? "Twice a month" : null}
                                    {item.frequency == "BZ" ? "Business Daye" : null}
                                  </td>
                                  <td>{item.amt}</td>
                                  <td><i className="fa fa-trash text-danger" onClick={this.delete_scheme.bind(this, key)} /></td>
                                </tr>
                              ) }


                          </tbody>
                        </table>: null}
                        <div className="text-right">
                          <a href="javascript:void(0);" className="btn-theme-1 btn-theme-effect" onClick={this.oderNow.bind()}>
                            <span className="button-text"  >Order Now</span>
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
export default STP
