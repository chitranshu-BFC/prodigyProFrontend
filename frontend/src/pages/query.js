import React, {component} from 'react';
import {Upperdiv,LoginLogo,Loader}  from './reusable-content';
import $ from 'jquery';
import { Link,Redirect } from 'react-router-dom';
import Axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class Query extends React.Component{
    constructor(props) {
        super(props);
        this.state = { userQuery: '' };
    }



    componentDidMount(){

        const fullpath = window.location.href;
        const answer_array = fullpath.split('?');
        console.log("lastItem",answer_array[1]);

        if(answer_array[1]=='Non-Individual-KYC'){
           this.setState({query:4,nonIndKyc:"N"})
        }

        if(answer_array[1]=='IIN-Related'){
            this.setState({query:3})
        }

        if(answer_array[1]=='one-time'){
          this.setState({query:7,case_3:"1"})
        }

        const userData = JSON.parse(localStorage.getItem("loginUserData"))
        const data = {
            email:userData.email,
            phone:userData.phone,
        }
    
        Axios.post("/prodigypro/api/getQueryTopics", data)
        .then((res) => {
            this.setState({userDataList:data})
            // console.log("query",res.data.data.data)
            this.setState({userQuery:res.data.data.data})
        })

    }

    handleFormValidation(data){
        let data_arr = [];

        if (data.query_name == '') {
            var isValid= {nametext:"1"}
            data_arr.push(isValid);
            this.setState({ query_name_err: "Mandatory Field" });
        } else {
            // var isValid = true;
            this.setState({ query_name_err: "" });
        }

        var mobPattern = /^(?:(?:\\+|0{0,2})91(\s*[\\-]\s*)?|[0]?)?[6789]\d{9}$/;
        const PhoneValid = mobPattern.test(data.mobile);
        if (data.mobile == '') {
            var isValid= {nametext:"1"}
            data_arr.push(isValid);
            this.setState({ mobile_err: "Mandatory Field" });
        } else if (PhoneValid == false) {
            var isValid= {nametext:"1"}
            data_arr.push(isValid);
            this.setState({ mobile_err: "Mobile No is Invalid" });
        } else {
            // var isValid = true;
            this.setState({ mobile_err: "" });
        }

        const emailRegex = /^[^@ ]+@[^@ ]+\.[^@ ]+$/;  // Email Validation
        const EmailValid = emailRegex.test(data.emailId)
        if (data.emailId == '') {
            var isValid= {nametext:"1"}
            data_arr.push(isValid);
            this.setState({ emailId_err: "Mandatory Field" });
        } else if (EmailValid == false) {
            var isValid= {nametext:"1"}
            data_arr.push(isValid);
            this.setState({ emailId_err: "Email Id is Invalid" });
          } else {
            // var isValid = true;
            this.setState({ emailId_err: "" });
        }

        if (data.query_msg == '') {
            var isValid= {nametext:"1"}
            data_arr.push(isValid);
            this.setState({ query_msg_err: "Mandatory Field" });
        } else {
            // var isValid = true;
            this.setState({ query_msg_err: "" });
        }

        return data_arr.length;        
    }

    submit=(e)=>{

        const data = {
            query_name: $("select[name=query_name]").val(),
            mobile: $("input[name=mobile]").val(),
            emailId: $("input[name=emailId]").val(),
            query_msg: $('textarea[name="query_msg"]').val(),
        }

      
        
        if (this.handleFormValidation(data)==0) {
            $(".load").css('display','block');
            $(".sub").css('display','none');
            Axios.post("/prodigypro/api/raise_query", data)
            .then((res) => {
                console.log("query",res.data.data)
                $(".load").css('display','none');
                 $(".sub").css('display','block');
                if(res.data.data.status==200){
                    // $("select[name=query_name]").val("");
                    // $("input[name=mobile]").val("");
                    // $("input[name=emailId]").val("");
                    $('textarea[name="query_msg"]').val("");
                     window.$('#exampleModalCenter').modal('show');
                    this.setState({msg:res.data.data.message})
                }  else{
                    toast.error(res.data.data.message);
                } 
               
            })
        }

    }   

    goBack = e => {
        // window.history.back();
        this.setState({ usertax: "1" });
    }

    render(){
 
  		if(this.state.usertax){
            return <Redirect  to={{
                pathname: "/prodigypro/pan-verification",
                nonIndKyc:this.state.nonIndKyc,
                case_3:this.state.case_3,
            }} />
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
        .font-circle i{
            font-size: 7px;
            margin-right: 10px;
        }
        .has-float-label textarea{
            height:175px;
        }
        textarea.form-control:focus{
            height:175px;
        }
        .load{
            display:none;
        }
        .back-btn{
            position: relative;
            float: left;
            margin-left: 10px;
            top: 10px;
            background: #ff574d;
            color: #fff;
          }
          .btn-light:hover {
            background: #ec4a40;
            box-shadow: 0 0 35px rgb(0 0 0 / 10%);
            color: #fff;
          }
          .text-sm{
            font-size:14px;
            // color:#ff574d;
          }
        `}
        </style>
        <ToastContainer position="top-right" className="mt-8" />
        <div className="container-fluid m-0 p-0">
         <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div className="alert alert-info">
                            {this.state.msg}
                        </div>
                    </div>
                    {/* <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary">Save changes</button>
                    </div> */}
                </div>
            </div>
            </div>
        
            <div className="col-12 bg-theme welcome-div-first"></div>
            <div className="col-10 offset-md-1 welcome-div-upper ">  
                <div className="col-12 p-3">
                    <div className="alert alert-info text-center">
                        <span className="h4 font-weight-bold">Raise a Query</span>
                    </div>
                    {/* {this.state.msg?
                    <div className="alert alert-success" id="closeablecard">
                        <div className="d-flex " >
                        <div>
                            <span>{this.state.msg}</span>
                        </div>
                        <div class="ml-auto">
                            <a href="#" className="" data-dismiss="alert" data-target="#closeablecard" type="button" class=" fas fa-close" aria-label="Close"></a>
                        </div>
                        </div>
                    </div>
                    :null}*/}
                     
                    <div className="row mt-5">
                        <div className="col-md-4">
                            <div className="mb-4">
                                <span className="has-float-label" >
                                    <select className="form-control input-text" name="query_name">
                                        <option value="">Choose Query</option>
                                        {this.state.userQuery!=''?
                                        this.state.userQuery.map((item, key) =>
                                            <option value={item.id} selected={item.id == this.state.query}>{item.topic}</option>
                                        ) : null}
                                    </select>
                                    <label for="Query" className="text-label" >Query <span className="text-danger">*</span></label>
                                </span>
                                <small class="text-danger">{this.state.query_name_err}</small>
                            </div>
                            <div className="mb-4">
                                <span className="has-float-label" >
                                    <input className="form-control input-text" type="text" placeholder="Enter Mobile Number" name="mobile" defaultValue={this.state.userDataList?this.state.userDataList.phone:null}  readOnly= {this.state.nonIndKyc=="N"?"readOnly":null}/>
                                    <label for="Mobile" className="text-label" >Mobile Number <span className="text-danger">*</span></label>
                                </span>
                                <small class="text-danger">{this.state.mobile_err}</small>
                            </div>
                            <div className=" mb-4">
                                <span className="has-float-label" >
                                    <input className="form-control input-text" type="text" placeholder="Enter Email" name="emailId"  defaultValue={this.state.userDataList?this.state.userDataList.email:null}  readOnly= {this.state.nonIndKyc=="N"?"readOnly":null}/>
                                    <label for="Email" className="text-label" >Email <span className="text-danger">*</span></label>
                                </span>
                                <small class="text-danger">{this.state.emailId_err}</small>
                            </div>
                        </div>

                        <div className="col-md-8">
                            <div className="">
                                <span className="has-float-label" >
                                    <textarea className="form-control" name="query_msg"></textarea>
                                    <label for="Query" className="text-label" >Query Message <span className="text-danger">*</span></label>
                                </span>
                                <small class="text-danger">{this.state.query_msg_err}</small>
                            </div>
                        </div>
                        
                    </div>
                    <button class="btn btn-light back-btn " onClick={this.goBack}>Back</button>
                   
                    <a href="javascript:void(0);" class="btn-theme-1 btn-theme-effect pull-right btn-color-green sub"  onClick={this.submit.bind()}>
                        <span class="button-text"> Submit </span> <span class="round" > < i class="fa fa-chevron-right" > </i></span >
                    </a>

                    <a href="javascript:void(0);" class="btn-theme-1 btn-theme-effect pull-right btn-color-green load">
                        <span class="button-text"> Loading... </span> <span class="round" > < i class="fa fa-chevron-right" > </i></span >
                    </a>

                </div>
            </div>
        </div>
          
        </>
        )
    }
    
}
export default Query
