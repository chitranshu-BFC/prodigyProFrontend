import React, { component } from 'react';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import { Link, useHistory  } from 'react-router-dom';
import Axios from 'axios';

// SignUp,SignIn upper div
export function Upperdiv(props) {

    const responseGoogle = (response) => {
       
        console.log("gmail",response.profileObj);
        const data = {
            name:response.profileObj.name,
            email:response.profileObj.email,
            social_id:response.profileObj.googleId
        }
        Axios.post("/prodigypro/api/social_registers", data)
        .then((result) => {
            console.log("gmail",result.data);
            localStorage.setItem("socialEmail", response.profileObj.email)
            // localStorage.setItem("userLoggedId", 259202)
            window.location.href = '/prodigypro/mobileno'
        })
    }

    const responseFacebook = (response) => {
        console.log("facebook",response);
    }
 
    return (

        <>

            <h4 className="text-white font-weight-bold">Prodigy Pro*</h4>
            <p>Having trouble signing in? We’re here to help. Just hit the button below. </p>
            <a href="https://bfccapital.com/request-a-callback" className="btn-outline" target="_blank">Request Call Back</a>
            
            <br />
            <br />
            <span className="text-white font-weight-bold">Or Sign In With</span>

            <ul className="social-list clearfix">
                 {/*<li><a href="#"><i className="fab fa-apple" /></a></li>*/}
                 {/*<li>
                <FacebookLogin
                    appId="874841519856093" //APP ID NOT CREATED YET
                    fields="name,email"
                    cssClass="fab fa-facebook"
                    textButton =""
                    callback={responseFacebook}
                /></li>*/}
               
                <li>
                <GoogleLogin
                clientId="489062839648-3m1e996ri2fehsil89recl6t9oqu2sc7.apps.googleusercontent.com" //CLIENTID NOT CREATED YET
                buttonText=""
                //className="fab fa-google"
                render={renderProps => (
                    <a href="#" onClick={renderProps.onClick}> <i className="fab fa-google" /></a>
                )}
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
            />    
                </li>
               
            </ul>
        </>
    )
}


// pin, forget password and other upper div
export function UpperdivOthers() {
    return (
        <>
            <h4 className="text-white font-weight-bold">Prodigy Pro*</h4>
            <p>Having trouble signing in? We’re here to help. Just hit the button below. </p>
            <a href="https://bfccapital.com/request-a-callback" className="btn-outline" target="_blank">Request Call Back</a>

        </>
    )
}


// Top header logo for login/signup module
export function LoginLogo() {
    return (
        <>
            <div className="logo-container ">
                <a href="https://bfccapital.com/" target="_blank"><img src="assets/img/logos/logo-icon.png" className="text-center" alt="logo" /></a>
            </div>
        </>
    )
}

// Loader
export function Loader() {
    return (
        <>
            <div className="container">
                <img src="assets/img/logos/loader.gif" className="text-center center loader_img" alt="loader" />
            </div>
        </>
    )
}
