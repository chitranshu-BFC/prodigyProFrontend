import React, {component} from 'react';
import {LoginLogo,UpperdivOthers}  from './reusable-content';

class Recover_Credentials extends React.Component{
    render(){
        
        return(
        <>
            <style>
          {`
         .logo-container{
          top: 10px;
         }
          `}
          </style>

             <div className="login-23">
        <div className="container">
            <div className="row">
                <div className="offset-md-2 col-md-10">
                <div className="row login-box-12">
                <div className="col-lg-7 col-sm-12 col-pad-0 align-self-center">
                <LoginLogo/>
        <div className="login-inner-form mt-5">
          <div className="details">
            <h3>Change Your Credentials</h3>
            <form action="#" method="Post">
                 {/* input for pin password Setup */} 
              <div className="form-group">
                <input type="password" name="password" className="input-text" placeholder="Enter New Password" />
              </div>
              <div className="form-group">
                <input type="password" name="password" className="input-text" placeholder="Corfirm New Password" />
              </div>
              <div className="form-group">
                <button type="submit" className="btn-md btn-theme btn-block">Update Password</button>
              </div>
             
             {/* input for pin setup */}
                <div className="form-group">
                    <input type="password" name="password" className="input-text" placeholder="Enter New Pin" />
                </div>
                <div className="form-group">
                <input type="password" name="password" className="input-text" placeholder="Corfirm New Pin" />
              </div>

                <div className="form-group">
                    <button type="submit" className="btn-md btn-theme btn-block">Submit</button>
                </div>
            </form>
          </div>
        </div>
      </div>
              <div className="col-lg-5 col-md-12 col-sm-12 col-pad-0 bg-img align-self-center none-992">
              <UpperdivOthers/>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
      {/* registration 23 end */}
        </>
        )
    }
    
}
export default Recover_Credentials
