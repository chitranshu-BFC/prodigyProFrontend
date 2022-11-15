import React, {component} from 'react';
import simply_save from "../../assets/images/icons/simply-save.png";
import simply_sip from "../../assets/images/icons/simply-sip-small.png";
import notification from "../../assets/images/icons/New folder (2)/notification.png";
import profile_icon from "../../assets/images/undraw_profile.svg";
import logoIcon from "../../assets/images/logonew.png";
import logotext from "../../assets/images/icons/New folder (2)/bfc-capital-text.png"

//  import ProfilePic from "../../assets/css/sb-admin-2.min.css"

class Header extends React.Component{
    render(){
        
        return(
        <>
        
            <style>
          {`
       .img-contain-btn {
        height: 23px;
        width: 24px;
      }
      .logo{
        max-width: 70px !important;
      }
          `}
          </style>
             
          <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top bh">
          {/* <a class="navbar-brand" href="#"></a> */}
        {/* Sidebar Toggle (Topbar) */}
        <button id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle mr-3">
          <i className="fa fa-bars" />
        </button>
             {/* <div className=" my-auto">
                <a href="#" className="btn btn-sm btn-danger shadow-sm mr-2">Simply SIP</a>
                <a href="#" className="btn btn-sm btn-danger shadow-sm">Simply Save</a>
            </div> */}
        {/* Topbar Search */}
        {/* <form className="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
          <div className="input-group">
            <input type="text" className="form-control bg-light border-0 small" placeholder="Search for..." aria-label="Search" aria-describedby="basic-addon2" />
            <div className="input-group-append">
              <button className="btn btn-danger" type="button">
                <i className="fas fa-search fa-sm" />
              </button>
            </div>
          </div>
        </form> */}
        {/* Topbar Navbar */}

        <ul className="navbar-nav ml-auto">
       
           
          {/* Nav Item - Search Dropdown (Visible Only XS) */}
          {/* <li className="nav-item dropdown no-arrow d-sm-none">
            <a className="nav-link dropdown-toggle" href="#" id="searchDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <i className="fas fa-search fa-fw" />
            </a>
            <div className="dropdown-menu dropdown-menu-right p-3 shadow animated--grow-in" aria-labelledby="searchDropdown">
              <form className="form-inline mr-auto w-100 navbar-search">
                <div className="input-group">
                  <input type="text" className="form-control bg-light border-0 small" placeholder="Search for..." aria-label="Search" aria-describedby="basic-addon2" />
                  <div className="input-group-append">
                    <button className="btn btn-danger" type="button">
                      <i className="fas fa-search fa-sm" />
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </li> */}
          {/* Nav Item - Alerts */}
          {/* <li className=" my-auto">
               
                <a href="/prodigypro/dashboard/simply-sip" className="btn btn-sm bg-c mr-2 ">
                  <div className="d-flex">
                  <div className="img-contain-btn mr-2">
                  <img src={simply_sip} className="w-100" />
                  </div>
                  <span>Simply SIP</span>
                  </div>
                  </a>
                <a href="/prodigypro/dashboard/simply-save" className="btn btn-sm bg-c ">
                  <div className="d-flex">
                  <div className="img-contain-btn mr-2">
                  <img src={simply_save} className="w-100" />
                  </div>
                  <span>Simply Save</span>
                  </div>
                  </a>
            </li> */}
             
          <li className="nav-item dropdown no-arrow mx-1">
            {/*  <a className="nav-link dropdown-toggle" href="#" id="alertsDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <i className="fas fa-bell fa-fw" />
             Counter - Alerts 
              <span className="badge badge-danger badge-counter">3+</span>
            </a>*/}
            {/* Dropdown - Alerts */}
            <div className="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="alertsDropdown">
              <h6 className="dropdown-header">
                Alerts Center
              </h6>
              <a className="dropdown-item d-flex align-items-center br-0" href="#">
                <div className="mr-3">
                  <div className="icon-circle bg-danger">
                    <i className="fas fa-file-alt text-white" />
                  </div>
                </div>
                <div>
                  <div className="small text-gray-500">December 12, 2019</div>
                  <span className="font-weight-bold">A new monthly report is ready to download!</span>
                </div>
              </a>
              <a className="dropdown-item d-flex align-items-center" href="#">
                <div className="mr-3">
                  <div className="icon-circle bg-success">
                    <i className="fas fa-donate text-white" />
                  </div>
                </div>
                <div>
                  <div className="small text-gray-500">December 7, 2019</div>
                  $290.29 has been deposited into your account!
                </div>
              </a>
              <a className="dropdown-item d-flex align-items-center" href="#">
                <div className="mr-3">
                  <div className="icon-circle bg-warning">
                    <i className="fas fa-exclamation-triangle text-white" />
                  </div>
                </div>
                <div>
                  <div className="small text-gray-500">December 2, 2019</div>
                  Spending Alert: We've noticed unusually high spending for your account.
                </div>
              </a>
              <a className="dropdown-item text-center small text-gray-500" href="#">Show All Alerts</a>
            </div>
          </li>
          {/* Nav Item - Messages */}
         
          
          {/* Nav Item - User Information */}
          <li className="nav-item dropdown no-arrow">
            <a className="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <div>
              <span className="mr-2 d-none d-lg-inline text-gray-600 small">{JSON.parse(localStorage.getItem("loginUserData")).name}</span><br/>
              {/* <span className="mr-2 d-none d-lg-inline text-gray-600 small">Last Login : 10/03/21, 18:30</span> */}
              </div>
              <img className="img-profile rounded-circle" src={profile_icon} />
            </a>
            
            {/* Dropdown - User Information */}
            <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="userDropdown">
              <a className="dropdown-item" href="/prodigypro/dashboard/profile">
                <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400" />
                Profile
              </a>
              <a className="dropdown-item" href="/prodigypro/dashboard/change-password">
                <i className="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400" />
                Change Password
              </a>
              <a className="dropdown-item" href="/prodigypro/dashboard/contact-us">
                <i className="fas fa-list fa-sm fa-fw mr-2 text-gray-400" />
                Contact Us
              </a>
              <div className="dropdown-divider" />
              <a className="dropdown-item" href="/prodigypro/dashboard/logout" >
                <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400" />
                Logout
              </a>
            </div>
          </li>
          {/* divider */}
          <div className="topbar-divider d-none d-sm-block" />
          {/* notification */}
          <li className=" my-auto">
              
              <a href="#" className="btn btn-sm  ">
                <div className="d-flex">
                <div className="img-contain-btn mr-2">
                <img src={notification} className="w-100" />
                </div>                 
                </div>
                </a>
          </li>
            {/* notification */}
        </ul>
      </nav>

        </>
        )
    }
    
}
export default Header
