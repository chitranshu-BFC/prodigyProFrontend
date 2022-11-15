import React, {component} from 'react';
import { Link } from 'react-router-dom';

import logoIcon from "../../assets/images/logo48.png";
import portfolio from "../../assets/images/icons/portfolio.png";
import transact from "../../assets/images/icons/transact.png";
import advisory from "../../assets/images/icons/advisory.png";
import tax from "../../assets/images/icons/tax.png";
import report from "../../assets/images/icons/reports.png";
import myorder from "../../assets/images/icons/order.png";
import addfamily from "../../assets/images/icons/add-member.png";
import bank from "../../assets/images/icons/bank.png";


class Sidebar extends React.Component{
    render(props){
        
        return(
        <>
            <style>
          {`
         .nav-date{
           bottom:0;
           position:sticky;
         }.child-nav{
          background: #eaecf4;
         }
          `}
          </style>
       
          <ul className="navbar-nav bg-gradient-danger sidebar sidebar-dark accordion" id="accordionSidebar">
        {/* Sidebar - Brand */}
        <a className="sidebar-brand d-flex align-items-center justify-content-center" href="/prodigypro/dashboard">
          <div className="sidebar-brand-icon bg-light rounded-circle">
            <img src={logoIcon} className />
            {/* <i class="fas fa-laugh-wink"></i> */}
          </div>
          {/* <div className="sidebar-brand-text mx-3">Prodigy Pro</div> */}
        </a>
        {/* Divider */}
        <hr className="sidebar-divider my-0" />
        {/* Nav Item - Dashboard */}
        <li className="nav-item active">
          <a className="nav-link" href="/prodigypro/dashboard">
            <i className="fas fa-fw fa-tachometer-alt mr-2" />
            <span>Dashboard</span></a>
        </li>
        {/* Divider */}
        <hr className="sidebar-divider" />
        {/* Heading */}
        {/* <div className="sidebar-heading">
          Interface
        </div> */}
        {/* Portfolio */}
        <li className="nav-item">
          <a className="nav-link" href="/prodigypro/dashboard/portfolio">
            <img src={portfolio} className="mr-2" />
            <span>Portfolio</span></a>
        </li>
        {/* Transact */}
        <li className="nav-item">
          <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">
            <img src={transact} className="mr-2" />
            <span>Transact</span>
          </a>
          <div id="collapseTwo" className={this.props.mainTab=="transact"?"collapse show":"collapse"} aria-labelledby="headingTwo" data-parent="#accordionSidebar">
            <div className="bg-white py-2 collapse-inner rounded">
              {/* <h6 className="collapse-header">Transact Components:</h6> */}
              {/* <Link to="transaction/new-purchase" className="collapse-item">New Purchase</Link> */}
			 <a className={this.props.innertab=="new-purchase"?"collapse-item child-nav":"collapse-item"} href="/prodigypro/dashboard/new-purchase">New Purchase</a>
              <a className={this.props.innertab=="additional-purchase"?"collapse-item child-nav":"collapse-item"}  href="/prodigypro/dashboard/additional-purchase">Additional Purchase</a>
              <a className={this.props.innertab=="switch"?"collapse-item child-nav":"collapse-item"} href="/prodigypro/dashboard/switch">Switch</a>
              <a className={this.props.innertab=="sip"?"collapse-item child-nav":"collapse-item"} href="/prodigypro/dashboard/sip">SIP</a>
              <a className={this.props.innertab=="stp"?"collapse-item child-nav":"collapse-item"} href="/prodigypro/dashboard/stp">STP</a>
              <a className={this.props.innertab=="redemption"?"collapse-item child-nav":"collapse-item"} href="/prodigypro/dashboard/redemption">Redemption</a>
              <a className={this.props.innertab=="swp"?"collapse-item child-nav":"collapse-item"} href="/prodigypro/dashboard/swp">SWP</a>
            </div>
          </div>
        </li>
        {/* Simply SIP */}
        {/* <li className="nav-item">
          <a className="nav-link" href="#">
            <i className="fas fa-fw fa-tachometer-alt" />
            <span>Simply SIP</span></a>
        </li> */}
        {/* Simply Save */}
        {/* <li className="nav-item">
          <a className="nav-link" href="#">
            <i className="fas fa-fw fa-tachometer-alt" />
            <span>Simply Save</span></a>
        </li> */}
        {/* Advisory */}
        <li className="nav-item">
          <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseAdvisory" aria-expanded="true" aria-controls="collapseAdvisory">
            <img src={advisory} className="mr-2" />
            <span>Get Right Schemes</span>
          </a>
          <div id="collapseAdvisory" className={this.props.mainTab=="advisory"?"collapse show":"collapse"}  aria-labelledby="headingAdvisory" data-parent="#accordionSidebar">
            <div className="bg-white py-2 collapse-inner rounded">
              {/* <h6 className="collapse-header">Advisory Components:</h6> */}
              <a className={this.props.innertab=="advisory-lumpsum"?"collapse-item child-nav":"collapse-item"}  href="/prodigypro/dashboard/advisory-lumpsum">Lumpsum</a>
              <a className={this.props.innertab=="advisory-sip"?"collapse-item child-nav":"collapse-item"}  href="/prodigypro/dashboard/advisory-sip">SIP</a>
            </div>
          </div>
        </li>
        {/* Tax Planning */}
        <li className="nav-item">
          <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseTaxPlanning" aria-expanded="true" aria-controls="collapseTaxPlanning">
            <img src={tax} className="mr-2" /> 
            <span>Tax Planning</span>
          </a>
          <div id="collapseTaxPlanning"  className={this.props.mainTab=="tax"?"collapse show":"collapse"}  aria-labelledby="headingTaxPlanning" data-parent="#accordionSidebar">
            <div className="bg-white py-2 collapse-inner rounded">
              {/* <h6 className="collapse-header">Tax Planning Components:</h6> */}
              <a className={this.props.innertab=="tax-planning-lumpsum"?"collapse-item child-nav":"collapse-item"} href="/prodigypro/dashboard/tax-planning-lumpsum">Lumpsum</a>
              <a className={this.props.innertab=="tax-planning-sip"?"collapse-item child-nav":"collapse-item"} href="/prodigypro/dashboard/tax-planning-sip">SIP</a>
            </div>
          </div>
        </li>
        
        {/* Divider */}
        <hr className="sidebar-divider" />
        {/* Heading */}
        {/* <div className="sidebar-heading">
          Addons
        </div> */}
        {/* Nav Item - Pages Collapse Menu */}
        <li className="nav-item">
          <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapsePages" aria-expanded="true" aria-controls="collapsePages">
            <img src={report} className="mr-2" />
            <span>Reports</span>
          </a>
          <div id="collapsePages" className={this.props.mainTab=="reports"?"collapse show":"collapse"} aria-labelledby="headingPages" data-parent="#accordionSidebar">
            <div className="bg-white py-2 collapse-inner rounded">
              {/* <h6 className="collapse-header">Reports Components:</h6> */}
              <a className={this.props.innertab=="sipstpswp-report"?"collapse-item child-nav":"collapse-item"} href="/prodigypro/dashboard/sipstpswp-report">MY SIP/STP/SWP</a>
              <a className={this.props.innertab=="transaction-report"?"collapse-item child-nav":"collapse-item"} href="/prodigypro/dashboard/transaction-report">My Transactions</a>
              <a className={this.props.innertab=="tax-saving-report"?"collapse-item child-nav":"collapse-item"} href="/prodigypro/dashboard/tax-saving-report">Tax Saving Investments</a>
              <a className={this.props.innertab=="dividend-report"?"collapse-item child-nav":"collapse-item"} href="/prodigypro/dashboard/dividend-report">Dividends</a>
              <div className="collapse-divider" />
              {/* <h6 className="collapse-header">Other Pages:</h6>
              <a className="collapse-item" href="404.html">404 Page</a>
              <a className="collapse-item" href="blank.html">Blank Page</a> */}
            </div>
          </div>
        </li>
        <hr className="sidebar-divider d-none d-md-block my-2" />
        {/* My Order */}
        <li className="nav-item">
          <a className="nav-link" href="/prodigypro/dashboard/my-order">
            <img src={myorder} className="mr-2" />
            <span>My Orders</span></a>
        </li>
        {/* Add Family Member */}
        <li className="nav-item">
          <a className="nav-link" href="/prodigypro/dashboard/add-family-member">
            <img src={addfamily} className="mr-2" /> 
            <span>Add Family Member</span></a>
        </li>
        {/* Bank Details & Mandate */}
        <li className="nav-item">
          <a className="nav-link" href="/prodigypro/dashboard/bank-and-mandate">
            <img src={bank} className="mr-2" />
            <span>Bank Details & Mandate</span></a>
        </li>
         {/* Divider */}
         <hr className="sidebar-divider d-none d-md-block my-2" />
        {/* Heading */}
        {/* <div className="sidebar-heading text-center nav-date mt-auto">
          <span>NAV rates updated on</span><br/>
          <span>10/03/2021</span>
           <span className="text-nav-date text-light"></span> 
        </div> */}
        {/* Divider */}
        {/* Sidebar Toggler (Sidebar) */}
        {/* <div className="text-center d-none d-md-inline">
          <button className="rounded-circle border-0" id="sidebarToggle" />
        </div> */}
      </ul>
        </>
        )
    }
    
}
export default Sidebar
