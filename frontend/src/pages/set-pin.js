import React, {component} from 'react';
import {Upperdiv,LoginLogo,Loader}  from './reusable-content';
import $ from 'jquery';
import { Link,Redirect } from 'react-router-dom';
import Axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

class Set_Pin extends React.Component{

    constructor(props) {
        super(props);
        this.state = {Fieldtext:''};
        this.onChange = this.onChange.bind(this);
        this.submitForm = this.submitForm.bind(this);
    }

    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }


    fromValidation = (data) =>{

        var patt = /^[0-9]*$/;
        var accValid =  patt.test(data.new_pin);
        if (data.new_pin == ''){
            var isValid= false;
            this.setState({ NewPin_err: "This Field is Requried" });
        }else if(data.new_pin ==undefined){
            var isValid=false;
            this.setState({ NewPin_err: "This Field is Requried" });
        }else if(data.new_pin.length<4){
            var isValid=false;
            this.setState({ NewPin_err: "Minimum Lenght 4 Digit" });
        }else if(accValid==false){
            var isValid=false;
            this.setState({ NewPin_err: "Only 4 Digits" });
        }else{
            var isValid= true;
            this.setState({ NewPin_err: "" });
        }

        var patt = /^[0-9]*$/;
        var accValid1 =  patt.test(data.con_pin);
        if (data.con_pin == ''){
            var isValid= false;
            this.setState({ con_pin_err: "This Field is Requried" });
        }else if(data.con_pin ==undefined){
            var isValid=false;
            this.setState({ con_pin_err: "This Field is Requried" });
        }else if(accValid1==false){
            var isValid=false;
            this.setState({ con_pin_err: "Only Digits" });
        }else if(data.con_pin.length<4){
            var isValid=false;
            this.setState({ con_pin_err: "Minimum Lenght 4 Digit" });
        }else if(data.con_pin!=data.new_pin){
            var isValid=false;
            this.setState({ con_pin_err: "Pin dose not match!" });
        }else{
            var isValid= true;
            this.setState({ con_pin_err: "" });
        }
        return isValid;
    }

    submitForm(e) {
        e.preventDefault();
       
        const userPin = { 
            new_pin: this.state.new_pin,
            con_pin: this.state.con_pin,
            email: localStorage.getItem("userEmail"),
            password: localStorage.getItem("userPass")
        };

        // alert(this.fromValidation(userPin));
        if(this.fromValidation(userPin)){
            $(".sub_btn").html('Loading...');
            Axios.post("/prodigypro/api/set_pin", userPin)
            .then((response) => {
                $(".sub_btn").html('Submit');
               console.log(response.data);
               toast.success("Pin updated successfully.");
            })
        }      

    }

    render(){
        if (localStorage.getItem("userLoggedId") == null) {
            return <Redirect to='/' />
        }
        return(
        <>
            <style>
          {`
        body{
          background-color:#f2f3f7;    
        }
        .welcome-div-upper{
            background-color:#fff;
        }
        
            .form-control{
            border-radius: 1.25rem;
            height: calc(2.25rem + 6px);
            }
        .form-control:focus {
            color: #495057;
            background-color: #fff;
            border-color: #ced4da !important;
            outline: 0;
            box-shadow: none;
            border-radius: 1.25rem;
            height: calc(2.25rem + 6px);
        }
        
        .content-center{
            margin-top:2rem;
            margin-bottom:2rem;
        }
     
          `}
          </style>
       <div className="container-fluid m-0 p-0">
            <div className="col-12 bg-theme welcome-div-first"></div>
            <div className="col-10 offset-md-1 welcome-div-upper ">  
            <div className="col-8 offset-md-2 ">
            <div className="alert alert-info mt-4 text-center" role="alert">
            <span className="para"> <h5>Set 4 Digit Pin</h5>
            </span>               
            </div>
          </div>
          <ToastContainer position="top-right" className="mt-8" />
            <div className="parent-doc">
            <form action="#" method="Post" onSubmit={this.submitForm} >
                <div className="row p-3">
                  <div className="col-4 col-md-4 offset-md-4">
                    <span className="has-float-label mb-4">
                        <input className="form-control input-text" name="new_pin" id="new_pin" type="text" value={this.state.new_pin}  placeholder="Enter Pin"  maxlength="4" onChange={this.onChange}  />
                        <label for="new_pin" className="text-label">Enter Pin</label>
                        <small className="text-danger pull-left">{this.state.NewPin_err}</small>
                    </span> 
                    
                    <span className="has-float-label mb-4">
                        <input className="form-control input-text" name="con_pin" id="con_pin" type="text" value={this.state.con_pin}  placeholder="Enter Confirm Pin" maxlength="4" onChange={this.onChange} />
                        <label for="con_pin" className="text-label">Confirm Pin</label>
                        <small className="text-danger pull-left">{this.state.con_pin_err}</small>
                    </span>
                  </div>  
                </div>
                <div className="pull-right mr-3">
                    <button  class="btn-theme-1 btn-theme-effect sub_btn">
                        <span class="button-text">Submit</span>
                        <span class="round"><i class="fa fa-chevron-right"></i></span>
                    </button>
                </div>
            </form>
            </div>
             </div>
               
        </div>
        </>
        )
    }
    
}
export default Set_Pin
