import React, {component} from 'react';
import Header from './header';
import Footer from './footer';
import Sidebar from './sidebar';
import {Helmet} from "react-helmet";
import Axios from 'axios';
import $ from 'jquery';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class Contact extends React.Component{
  constructor(props) {
    super(props);
    this.state = { userQuery: '' };
}



componentDidMount(){

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

	const fullpath = window.location.href;
    const answer_array = fullpath.split('?');

    if(answer_array[1]=='mandate'){
        this.setState({query:2})
     }

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
  // alert(data.query_msg);
  if (this.handleFormValidation(data)==0) {
      $(".load").css('display','block');
      $(".sub").css('display','none');
      Axios.post("/prodigypro/api/raise_query", data)
      .then((res) => {
          console.log("query",res.data.data)
          $(".load").css('display','none');
           $(".sub").css('display','block');
          if(res.data.data.status==200){
              $("select[name=query_name]").val("");
              $("input[name=mobile]").val("");
              $("input[name=emailId]").val("");
              $('textarea[name="query_msg"]').val("");
             window.$('#exampleModalCenter').modal('show');
              this.setState({msg:"we have received your query, we will get back to you shortly."})
          }  else{
              toast.error(res.data.data.message);
          } 
         
      })
  }

} 

    render(){
        // console.log("userDataList",this.state.userDataList.email)
        return(
        <>
        <Helmet>         
            <title>Prodigy Pro - Contact Us</title>
        </Helmet>
            <style>
          {`
            .px-row{
                padding:0 .8rem;
            }
            .load{
              display:none;
          }
			.alert-info{
              width:101% !important;
           }
          `}
          </style>
                 {/* Page Wrapper */}
      <div id="wrapper">
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
        {/* Sidebar */}
            <Sidebar/>
        {/* End of Sidebar */}

	
        {/* Content Wrapper */}
        <div id="content-wrapper" className="d-flex flex-column">
          {/* Main Content */}
          <div id="content">

            {/* Topbar */}
                <Header/>
            {/* End of Topbar */}

            {/* Begin Page Content */}
            <div className="container-fluid">
        {/* Page Heading */}
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><a href="home">Home</a></li>
            <li className="breadcrumb-item active" aria-current="page">Contact</li>
          </ol>
        </nav>
        <div className="row">
          {/* Area Chart */}
          <div className="col-xl-12 col-lg-12">
            <div className="card shadow mb-4">
              {/* Card Header - Dropdown */}
              <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                <h6 className="m-0 font-weight-bold text-danger">Contact Us</h6> 
              </div>
              {/* Card Body */}
              <div className="card-body">
                <div className="col-lg-10 col-md-10 offset-md-1 shadow py-4 rounded">
                    <form>
                    <div class="alert alert-info" role="alert">
                        Please send us your query or feedback. We shall revert to you as soon as possible. Thank You..!
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
                    <div className="row px-row">
                        <div className="col-lg-4 col-md-4 mb-3">
                            <label>Email Id <spna className="text-danger">*</spna></label>
                            <input className="form-control input-text" type="text" placeholder="Enter Email" name="emailId" defaultValue={this.state.userDataList?this.state.userDataList.email:null}/>
                            <small class="text-danger">{this.state.emailId_err}</small>
                        </div>
                        <div className="col-lg-4 col-md-4 mb-3">
                            <label>Mobile Number <spna className="text-danger">*</spna></label>
                            <input className="form-control input-text" type="text" placeholder="Enter Mobile Number" name="mobile" defaultValue={this.state.userDataList?this.state.userDataList.phone:null}/>
                            <small class="text-danger">{this.state.mobile_err}</small>
                        </div>
                        <div className="col-lg-4 col-md-4 mb-3">
                                <label>Query <spna className="text-danger">*</spna></label>
                                <select className="form-control input-text" name="query_name">
                                        <option value="">Choose Query</option>
                                        {this.state.userQuery!=''?
                                        this.state.userQuery.map((item, key) =>
                                            <option value={item.id} selected={item.id == this.state.query}>{item.topic}</option>
                                        ) : null}
                                    </select>
                                    <small class="text-danger">{this.state.query_name_err}</small>
                        </div>
                    </div>
                        
                        <div className="col-lg-12 col-md-12 mb-4">
                                <label>Query Message <spna className="text-danger">*</spna></label>
                                <textarea className="form-control" name="query_msg"></textarea>
                                <small class="text-danger">{this.state.query_msg_err}</small>
                        </div>
                       
                        <div className="text-center sub">
                        <a href="javascript:void(0);" class="btn btn-danger "  onClick={this.submit.bind()}>
                            Submit 
                        </a>
                        </div>

                        <div className="text-center load">
                        <a href="javascript:void(0);" class="btn btn-danger">
                          Loading...
                        </a>
                            {/* <a href="#" className="btn btn-danger shadow-sm">Submit</a> */}
                        </div>
                        </form>
                </div>
                
                
              </div>
            </div>
          </div>
        </div>
      </div>

      </div>
          {/* End of Main Content */}

          {/* Footer */}
          <Footer/>
          {/* End of Footer */}
        </div>
        {/* End of Content Wrapper */}
      </div>
      {/* End of Page Wrapper */}
        </>
        )
    }
    
}
export default Contact
