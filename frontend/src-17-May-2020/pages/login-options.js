import React, { component } from 'react';
import { LoginLogo, UpperdivOthers } from './reusable-content';
import { Link } from 'react-router-dom';

class Login_Options extends React.Component {
render() {

return (
<>
  <style>
    {
      ` .logo-container {
        top: -10px;
      }

      .text-sm {
        font-size: 14px;
        // color: #ff574d;
      }
	  .top-logo{
		margin-top: 20px;
	  }

      `
    }
  </style>

  {/* Login 23 start */}

  <div className="login-23">
    <div className="container">
      <div className="row">
        <div className="offset-md-2 col-md-10">
          <div className="row login-box-12">
            <div className="col-lg-7 col-sm-12 col-pad-0 align-self-center top-logo">
              <LoginLogo />
              <br />
              <br />
              <div className="login-inner-form">
                <div className="details">
                  <div className="form-group">
                    <Link to="/prodigypro/login-with-mobile" className="btn-md btn-theme btn-block text-white">Login With Mobile</Link>
                  </div>
                  {/* <div className="checkbox clearfix mb-0">
                    <a href="recover-credentials">Change PIN</a>
                  </div> */}
                  <h3>OR</h3>
                  <div className="form-group">
                    <Link to="/prodigypro/login" className="btn-md btn-theme btn-block text-white">Login With User ID</Link>
                  </div>

                  <p>Don't have an account?
                    <Link to="/prodigypro/registration" className="text-black" style={{"color":"#000"}}><b> Register here</b></Link>
                  </p>
                  <div className="text-left mt-2">
                    <span className="text-sm font-italic ">*Here you can monitor your MF Portfolio, Execute Transactions and select a suitable Mutual Fund scheme for yourself.
                    </span>
                  </div>
                </div>

              </div>
            </div>
            <div className="col-lg-5 col-md-12 col-sm-12 col-pad-0 bg-img align-self-center none-992">
              <UpperdivOthers />
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
  {/* Login 23 end */}

</>
)
}

}
export default Login_Options