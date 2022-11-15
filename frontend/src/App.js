import logo from './logo.svg';
import './App.css';
import Header from "./pages/header";
import Footer from "./pages/footer";

import Login from './pages/login';
import Registration from './pages/registration';
import Forget_Password from './pages/forget-password';
// import KYC_Check from './pages/kyc-check';
import Login_Options from './pages/login-options';
import Login_With_Pin from './pages/login-with-pin';
import Pan_Verification from './pages/pan-verification';
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
// import Document_Info from './pages/document-info';
import Required_Document_Yes from './pages/required-document-info-yes';
import Required_Details_Form from './pages/required-details-form';
import Needed_Info from './pages/needed-info';
import Recover_Credentials from './pages/recover-credentials';
import Set_Pin from './pages/set-pin';
import Query from './pages/query';
import Mobileno from './pages/mobileno';
// import KYC_Form from './pages/kyc-form';
// import Homedash from './dashboard/home';
// import Aboutdash from './dashboard/about';
// import Headerdash from './dashboard/headerdash';


import Props from './theme-library/props';


//For dashboard page
import './assets/css/sb-admin-2.min.css';

// fonts Awesome
import './assets/vendor/fontawesome-free/css/all.min.css';

import './assets/css/bootstrap-select.css';

import { Helmet } from "react-helmet";

import Home from "./dashboard/pages/home";
import Transact from './dashboard/pages/transact';
import New_Purchase from "./dashboard/pages/new-purchase";
import Additional_Purchase from "./dashboard/pages/additional-purchase";
import Switch_Comp from "./dashboard/pages/switch";
import SIP from "./dashboard/pages/sip";
import STP from "./dashboard/pages/stp";
import Redemption from "./dashboard/pages/redemption";
import SWP from "./dashboard/pages/swp";
import SSS_Report from "./dashboard/pages/sipstpswp-report";
import Transaction_Report from "./dashboard/pages/transaction-report";
import Tax_Saving_Investments from "./dashboard/pages/tax-saving-report";
import Dividend_Report from "./dashboard/pages/dividend-report";
import Dividend_Report_Details from "./dashboard/pages/dividend-report-details";
import Portfolio from "./dashboard/pages/portfolio";
import Scheme_report from "./dashboard/pages/scheme-report";
import TP_Lumpsum from "./dashboard/pages/tax-planning-lumpsum";
import TaxLumCart from "./dashboard/pages/tax-lum-cart";
import Tax_lum_Purchase from "./dashboard/pages/tax-lum-purchase";
import Tax_lum_Edit_Cart from "./dashboard/pages/tax-lum-edit-cart";

import Tax_Planning from './dashboard/pages/tax-planning';
//

import TP_SIP from "./dashboard/pages/tax-planning-sip";
import Contact from "./dashboard/pages/contact-us";
import Simply_Sip from "./dashboard/pages/simply-sip";
import Simply_Save from "./dashboard/pages/simply-save";
import My_Order from "./dashboard/pages/my-order";
import Add_Family_Member from "./dashboard/pages/add-family-member";
import Cart from "./dashboard/pages/cart";
import EditCart from "./dashboard/pages/edit-cart";
import Profile from "./dashboard/pages/profile";

import Bank_Mandate from "./dashboard/pages/bank-and-mandate";
import Advisory_Lumpsum from "./dashboard/pages/advisory-lumpsum";
import Advisory_SIP from "./dashboard/pages/advisory-sip";
import Goal_Wise_Recommendation from "./dashboard/pages/goal-wise-recommendation";
import Add_Bank from "./dashboard/pages/add-bank";
import Create_Mandate from "./dashboard/pages/create-mandate";
import Cnf_Purchase from "./dashboard/pages/cnf-purchase";

import TaxSipCart from "./dashboard/pages/tax-sip-cart";
import Tax_sip_Purchase from "./dashboard/pages/tax-sip-purchase";
import Tax_sip_Edit_Cart from "./dashboard/pages/tax-sip-edit-cart";
// import EditCart from "./dashboard/pages/edit-cart";
import AdvisoryLumCart from "./dashboard/pages/advisory-lum-cart";
import Advisory_lum_Purchase from "./dashboard/pages/advisory-lum-purchase";
import Advisory_lum_Edit_Cart from "./dashboard/pages/advisory-lum-edit-cart";
import Advisory_lum from "./dashboard/pages/advisory-lum";
import AdvisorySipCart from "./dashboard/pages/advisory-sip-cart";
import Advisory_sip_Purchase from "./dashboard/pages/advisory-sip-purchase";
import Advisory_sip_Edit_Cart from "./dashboard/pages/advisory-sip-edit-cart";
import Portfolio_Report from "./dashboard/pages/portfolio-report";
import Logout from "./dashboard/pages/logout";
import change_password from './dashboard/pages/change-password';
import Pan_verification_dashboard from "./dashboard/pages/pan-verification-dashboard";
import Required_document from "./dashboard/pages/required-document-info-yes-dash";
import Required_details from './dashboard/pages/required-details-form-dash';
import Needed_info from './dashboard/pages/needed-info';
import SIP_Calculator from './dashboard/pages/sip-calculator';
import Sip_Calculator_Pro from './dashboard/pages/SipCalculatorPro';
import EMI_Calculator_Pro from './dashboard/pages/emi-calculator-pro';
import Marriage_Planning_Pro from './dashboard/pages/marriage-planning-pro';
import Future_Value_Calculator_Pro from './dashboard/pages/future-value-calculator-pro';
import FD_Calculator_Pro from './dashboard/pages/fd-calculator-pro';
import Education_Planning_Pro from './dashboard/pages/education-planning-pro';
import Retirement_Planning_Pro from './dashboard/pages/retirement-planning-pro';
import Elss_Calculator_Pro from './dashboard/pages/elss-calculator-pro';
import Know_Your_Risk from './dashboard/pages/kyr-profile';
// import { UserProvider } from './contexts/userContext';
//portfolio-report
/* var pathname = window.location.href;
  // var pathname = window.location.pathname;
  var n = pathname.lastIndexOf('/');
  var result = pathname.substring(n + 1);
	
  if(result == "dashboard"){
  } */

const App = () => {
  return (
    // <UserProvider.Consumer>
    <>

      <Helmet>
        {/* <link href="../assets/css/sb-admin-2.min.css" rel="stylesheet" />      */}
        <script src="../prodigypro/assets/vendor/jquery.min.js"></script>
        <script src="../prodigypro/assets/vendor/jquery-easing/jquery.easing.min.js"></script>
        <script src="../prodigypro/assets/vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
        <script src="../assets/js/sb-admin-2.min.js"></script>
        <script src="../assets/vendor/chart.js/Chart.min.js"></script>
        <script src="../prodigypro/assets/js/demo/chart-pie-demo.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap-select@1.13.14/dist/js/bootstrap-select.min.js"></script>

        {/* <script src="/js/demo/chart-pie-demo.js"></script> */}
      </Helmet>

      <Helmet>
        {/* <link href="../assets/css/sb-admin-2.min.css" rel="stylesheet" />      */}
        <script src="../assets/vendor/jquery.min.js"></script>
        <script src="../assets/vendor/jquery-easing/jquery.easing.min.js"></script>
        <script src="../assets/vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
        <script src="../assets/js/sb-admin-2.min.js"></script>
        <script src="../assets/vendor/chart.js/Chart.min.js"></script>
        <script src="../assets/js/demo/chart-pie-demo.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap-select@1.13.14/dist/js/bootstrap-select.min.js"></script>

        {/* <script src="/js/demo/chart-pie-demo.js"></script> */}
      </Helmet>




      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Login_Options} />
          <Route exact path="/prodigypro/mobileno" component={Mobileno} />
          <Route exact path="/prodigypro/registration" component={Registration} />
          <Route exact path="/prodigypro/forget-password" component={Forget_Password} />
          {/* <Route exact path="/kyc-check" component={KYC_Check} /> */}
          <Route exact path="/prodigypro/login" component={Login} />
          <Route exact path="/prodigypro/login-with-mobile" component={Login_With_Pin} />
          <Route exact path="/prodigypro/set-pin" component={Set_Pin} />
          <Route exact path="/prodigypro/pan-verification" component={Pan_Verification} />
          {/* <Route exact path="/document-info" component={Document_Info} /> */}
          <Route exact path="/prodigypro/required-document-info-yes" component={Required_Document_Yes} />
          <Route exact path="/prodigypro/required-details-form" component={Required_Details_Form} />
          <Route exact path="/prodigypro/needed-info" component={Needed_Info} />
          <Route exact path="/prodigypro/recover-credentials" component={Recover_Credentials} />
          <Route exact path="/prodigypro/query" component={Query} />
          {/* <Route exact path="/kyc-form" component={KYC_Form} /> */}

          {/* For Dashboard pages */}
          <Route exact path="/prodigypro/dashboard" component={Home} />
          <Route exact path="/prodigypro/dashboard/home" component={Home} />
          <Route exact path="/prodigypro/dashboard/logout" component={Logout} />
          <Route exact path="/prodigypro/dashboard/change-password" component={change_password} />
          <Route exact path="/prodigypro/dashboard/new-purchase" component={New_Purchase} />
          <Route exact path="/prodigypro/dashboard/additional-purchase" component={Additional_Purchase} />
          <Route exact path="/prodigypro/dashboard/switch" component={Switch_Comp} />
          <Route exact path="/prodigypro/dashboard/sip" component={SIP} />
          <Route exact path="/prodigypro/dashboard/stp" component={STP} />
          <Route exact path="/prodigypro/dashboard/redemption" component={Redemption} />
          <Route exact path="/prodigypro/dashboard/swp" component={SWP} />
          <Route exact path="/prodigypro/dashboard/sipstpswp-report" component={SSS_Report} />
          <Route exact path="/prodigypro/dashboard/transaction-report" component={Transaction_Report} />
          <Route exact path="/prodigypro/dashboard/tax-saving-report" component={Tax_Saving_Investments} />
          <Route exact path="/prodigypro/dashboard/dividend-report" component={Dividend_Report} />
          <Route exact path="/prodigypro/dashboard/dividend-report-details/:id/:id" component={Dividend_Report_Details} />
          <Route exact path="/prodigypro/dashboard/scheme-report" component={Scheme_report} />
          <Route exact path="/prodigypro/dashboard/portfolio" component={Portfolio} />
          <Route exact path="/prodigypro/dashboard/tax-planning-lumpsum" component={TP_Lumpsum} />
          <Route exact path="/prodigypro/dashboard/tax-lum-cart" component={TaxLumCart} />
          <Route exact path="/prodigypro/dashboard/tax-lum-purchase" component={Tax_lum_Purchase} />
          <Route exact path="/prodigypro/dashboard/tax-lum-edit-cart" component={Tax_lum_Edit_Cart} />
          <Route exact path="/prodigypro/dashboard/tax-planning-sip" component={TP_SIP} />
          <Route exact path="/prodigypro/dashboard/contact-us" component={Contact} />
          <Route exact path="/prodigypro/dashboard/simply-sip" component={Simply_Sip} />
          <Route exact path="/prodigypro/dashboard/simply-save" component={Simply_Save} />
          <Route exact path="/prodigypro/dashboard/my-order" component={My_Order} />
          <Route exact path="/prodigypro/dashboard/add-family-member" component={Add_Family_Member} />
          <Route exact path="/prodigypro/dashboard/cart" component={Cart} />
          <Route exact path="/prodigypro/dashboard/edit-cart" component={EditCart} />
          <Route exact path="/prodigypro/dashboard/profile" component={Profile} />
          <Route exact path="/prodigypro/dashboard/sip-calculator" component={SIP_Calculator} />

          {/* New Route 29 July 2021 */}
          <Route exact path="/prodigypro/dashboard/bank-and-mandate" component={Bank_Mandate} />
          <Route exact path="/prodigypro/dashboard/advisory-lumpsum" component={Advisory_Lumpsum} />
          <Route exact path="/prodigypro/dashboard/advisory-sip" component={Advisory_SIP} />
          <Route exact path="/prodigypro/dashboard/goal-wise-recommendation" component={Goal_Wise_Recommendation} />
          <Route exact path="/prodigypro/dashboard/add-bank" component={Add_Bank} />
          <Route exact path="/prodigypro/dashboard/create-mandate" component={Create_Mandate} />
          <Route exact path="/prodigypro/dashboard/cnf-purchase" component={Cnf_Purchase} />
          <Route exact path="/prodigypro/dashboard/tax-sip-cart" component={TaxSipCart} />

          <Route exact path="/prodigypro/dashboard/tax-sip-purchase" component={Tax_sip_Purchase} />
          <Route exact path="/prodigypro/dashboard/tax-sip-edit-cart" component={Tax_sip_Edit_Cart} />
          {/* <Route exact path="/dashboard/edit-cart" component={EditCart} /> */}
          <Route exact path="/prodigypro/dashboard/advisory-lum-cart" component={AdvisoryLumCart} />
          <Route exact path="/prodigypro/dashboard/advisory-lum-purchase" component={Advisory_lum_Purchase} />
          <Route exact path="/prodigypro/dashboard/advisory-lum-edit-cart" component={Advisory_lum_Edit_Cart} />
          <Route exact path="/prodigypro/dashboard/advisory-lum" component={Advisory_lum} />
          <Route exact path="/prodigypro/dashboard/advisory-sip-cart" component={AdvisorySipCart} />
          <Route exact path="/prodigypro/dashboard/advisory-sip-purchase" component={Advisory_sip_Purchase} />
          <Route exact path="/prodigypro/dashboard/advisory-sip-edit-cart" component={Advisory_sip_Edit_Cart} />
          <Route exact path="/prodigypro/dashboard/portfolio-report" component={Portfolio_Report} />
          <Route exact path="/prodigypro/dashboard/pan-verification-dashboard" component={Pan_verification_dashboard} />
          <Route exact path="/prodigypro/dashboard/required-document-info-yes-dash" component={Required_document} />
          <Route exact path="/prodigypro/dashboard/required-details-form-dash" component={Required_details} />
          <Route exact path="/prodigypro/dashboard/needed-info" component={Needed_info} />
          <Route exact path="/prodigypro/dashboard/transact" component={Transact} />
          <Route exact path="/prodigypro/dashboard/sip-calculator-pro" component={Sip_Calculator_Pro} />
          <Route exact path="/prodigypro/dashboard/emi-calculator-pro" component={EMI_Calculator_Pro} />
          <Route exact path="/prodigypro/dashboard/marriage-planning-pro" component={Marriage_Planning_Pro} />
          <Route exact path="/prodigypro/dashboard/future-value-calculator-pro" component={Future_Value_Calculator_Pro} />
          <Route exact path="/prodigypro/dashboard/fd-calculator-pro" component={FD_Calculator_Pro} />
          <Route exact path="/prodigypro/dashboard/education-planning-pro" component={Education_Planning_Pro} />
          <Route exact path="/prodigypro/dashboard/retirement-planning-pro" component={Retirement_Planning_Pro} />
          <Route exact path="/prodigypro/dashboard/elss-calculator-pro" component={Elss_Calculator_Pro} />
          <Route exact path="/prodigypro/dashboard/KYP" component={Know_Your_Risk} />
          <Route exact path="/prodigypro/dashboard/tax-planning" component={Tax_Planning} />

          <Redirect to="/" />

        </Switch>
      </BrowserRouter>

    </>
    // </UserProvider.Consumer>
  );
};
export default App;
