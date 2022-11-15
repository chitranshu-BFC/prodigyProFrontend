import React, {component} from 'react';
import Header from './header';
import Footer from './footer';
import Sidebar from './sidebar';
import {Helmet} from "react-helmet";
import StyleComponent from './styleComponent';
import Axios from 'axios';
import $ from 'jquery';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, Redirect } from 'react-router-dom';

class Add_Bank extends React.Component{
    constructor(){
        super();
        this.state = {
          users: []
        };
        this.state = {
          Items: []
        };
        
    }
	
		  handleChange = (e) => {
        e.preventDefault();
      };
	
    componentDidMount(){
        const user = JSON.parse(localStorage.getItem("userList"));
        Axios.post("/prodigypro/api/accountType")
        .then((response) => {
            this.setState({ get_AccountType: response.data.data.data.typeofAccount })
        });

        Axios.post("/prodigypro/api/bank_list")
        .then((response) => {
          this.setState({ get_bank_list:response.data.data.data })
        });
        
    }

    ifscGet=e=>{
        //alert("dcd")
        let ifsc =  $("input[name=ifsc]").val();
        if (ifsc.length > 10) {
            const data_ifsc = {
              ifsc:ifsc,
            };
            Axios.post("/prodigypro/api/getIfsc", data_ifsc)
              .then((response) => {
                console.log("ifsc",response.data);
                this.setState({ get_bank:response.data.data.data })
            });
        }
    }

    onFileChange = event => {

        console.log(event.target.files[0]);
        // this.setState({ selectedFile: event.target.files[0] });
        const formData = new FormData();
        formData.append('file',event.target.files[0]);
        formData.append('email',"krishnaravi1995@gmail.com");

        Axios.post("/prodigypro/api/image",formData ,{ headers: {'Content-Type': 'multipart/form-data' }})
        .then((response) => {
            console.log(response.data);
        });
    };

   bankFromValidation = (bank_data) => {
        let data_err=[];
        if (bank_data.ifsc == '') {
            var isValid = {ifsc:"1"};
            data_err.push(isValid);
            this.setState({ ifsc_err: "Mandatory Field" });
          } else {
            // var isValid = true;
            this.setState({ ifsc_err: "" });
          }
      
          if (bank_data.bank_code == '') {
            var isValid = {bank_code:"1"};
            data_err.push(isValid);
            this.setState({ bank_name_err: "Mandatory Field" });
          } else {
            // var isValid = true;
            this.setState({ bank_name_err: "" });
          }

          if (bank_data.bankType == '') {
            var isValid = {bankType:"1"};
            data_err.push(isValid);
            this.setState({ bankType_err: "Mandatory Field" });
          } else {
            // var isValid = true;
            this.setState({ bankType_err: "" });
          }

        var patt = /^([0-9]{10})|([0-9]{2}-[0-9]{3}-[0-9]{6})$/;
        var accValid = patt.test(bank_data.account_no); // true
        // alert(accValid)
        if (bank_data.account_no == '') {
            var isValid = {account_no:"1"};
            data_err.push(isValid);
          this.setState({ acc_num_err: "Mandatory Field" });
        } else if (accValid == false) {
            var isValid = {account_no:"1"};
            data_err.push(isValid);
          this.setState({ acc_num_err: "Please enter a valid Account No " });
        } else {
        //   var isValid = true;
          this.setState({ acc_num_err: "" });
        }
    
        if (bank_data.reAccount_no == '') {
            var isValid = {reAccount_no:"1"};
            data_err.push(isValid);
          this.setState({ cnf_acc_num_err: "Mandatory Field" });
        } else if (bank_data.reAccount_no != bank_data.account_no) {
            var isValid = {reAccount_no:"1"};
            data_err.push(isValid);
          this.setState({ cnf_acc_num_err: "Account No does not Match" });
        } else {
        //   var isValid = true;
          this.setState({ cnf_acc_num_err: "" });
        }
		
		if (bank_data.upload_type == '') {
            var isValid = {upload_type:"1"};
            data_err.push(isValid);
            this.setState({ upload_type_err: "Mandatory Field" });
          } else {
            // var isValid = true;
            this.setState({ upload_type_err: "" });
          }
		
        if (bank_data.image == '') {
            var isValid = {image:"1"};
            data_err.push(isValid);
          this.setState({ image_err: "Mandatory Field" });
        } else {
        //   var isValid = true;
          this.setState({ image_err: "" });
        }
    
        return data_err.length;
    }

    continue=(e)=>{
        let dd=1;
        $("#bank_details").css('display','block');
        const data = {
            ifsc:$("input[name=ifsc]").val(),
            bankType:$("select[name=bankType]").val(),
            bankTypeText:$("select[name=bankType] option:selected").text(),
            account_no:$("input[name=account_no]").val(),
			upload_type: $('select[name="upload_type"]').val(),
            reAccount_no:$("input[name=reAccount_no]").val(),
            bank_code:$("select[name=bank_name]").val(),
            bank_name:$("select[name=bank_name] option:selected").text(),
            image: $("input[name=image]").val()
        }
        
        if(this.bankFromValidation(data)==0){
            this.setState({ dataList:data })
        }
    }

    cnfAdd=(e)=>{
        const user = JSON.parse(localStorage.getItem("userList"))
         //console.log("data",user)
        
        const data ={
            broker_code:"ARN-21399",
            appln_id:"MFS21399",
            password:"CO3062WOJ1RPXM19",
            process_flag:"I",
            iin:user.customer_id,
            acc_no:this.state.dataList.account_no,
            acc_type:this.state.dataList.bankType,
            ifsc_code:this.state.dataList.ifsc,
            micr_no:"",
            bank_name:this.state.dataList.bank_code,
            branch_name:this.state.get_bank.BRANCH,
            branch_address1:"",
            branch_address2:"",
            branch_address3:"",
            branch_city:"",
            branch_country:"",
            branch_pincode:"",
            proof_of_account:"Original cancelled cheque"
        }
        
        // console.log("data",data)
		 $("#overlay").css("display","block")
        Axios.post("/prodigypro/api/addBank", data)
        .then((result) => {
		  $("#overlay").css("display","none")
          console.log("bankDetails",result.data);
          if (result.data.data.status == 400) {
            toast.error(result.data.data.message)
           } else {
            this.setState({ userStatus:200 })
            toast.success(result.data.data.message)
           }
        });
    }

    render(){
		
        if(this.state.userStatus==200){
            return <Redirect to='/prodigypro/dashboard/bank-and-mandate' />
        }
		
        return(
        <>
        <Helmet>         
            <title>Add Bank</title>
        </Helmet>
            <style>
          {`
			  .text-color{
				color:#fff !important;
			}
            .card{
                min-height:420px;
            }
            #bank_details{
                display:none;
            }
			#overlay{
                display:none;
            }
          `}
          </style>

        {/* Page Wrapper */}
      <div id="wrapper">
	   {/* Loader Page */}
		<div id="overlay" >
            <div class="spinner"></div>
            <br/><b className="text-danger">Please Wait...</b>
        </div>
        {/* Sidebar */}
            <Sidebar/>
        {/* End of Sidebar */}

        <ToastContainer position="top-right" className="mt-8" />
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
                            <li className="breadcrumb-item active" aria-current="page">Add Bank</li>
                        </ol>
                    </nav>

                    <div className="row">
                        <div className="col-xl-7 col-lg-7">
                            <div className="card shadow mb-3">
                                <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                    <h6 className="m-0 font-weight-bold text-danger">Add Bank</h6> 
                                </div>
                                        {/* Card Body */}
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-md-6 mb-3">
                                            <label>Enter IFSC Code  <spna className="text-danger">*</spna></label>                                
                                            <input type="text" className="form-control" name="ifsc" onKeyUp={this.ifscGet}
											onCut={this.handleChange}
											  onCopy={this.handleChange}
											  onPaste={this.handleChange}
											  />
                                            <small className="text-danger">{this.state.ifsc_err}</small>
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <label>Select Bank Type  <spna className="text-danger">*</spna></label>                                
                                            <select className="form-control" name="bankType">
                                                <option value="">Select</option>
                                                {this.state.get_AccountType ?
                                                    this.state.get_AccountType.map((item, key) =>
                                                        <option value={item.acount_type} >{item.description}</option>
                                                    ) : null}
                                            </select> 
                                            <small className="text-danger">{this.state.bankType_err}</small>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6 mb-3">
                                            <label>Enter Account Number  <spna className="text-danger">*</spna></label>                                
                                            <input type="text" className="form-control" name="account_no" id="amt"   
											onCut={this.handleChange}
											  onCopy={this.handleChange}
											  onPaste={this.handleChange}
											  />
                                            <small className="text-danger">{this.state.acc_num_err}</small>
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <label>Re-Enter Account Number  <spna className="text-danger">*</spna></label>                                
                                            <input type="text" className="form-control" name="reAccount_no" id="numberField"
											onCut={this.handleChange}
											  onCopy={this.handleChange}
											  onPaste={this.handleChange}
											  />
                                            <small className="text-danger">{this.state.cnf_acc_num_err}</small>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6 mb-4">
                                            <label>Bank Name  <spna className="text-danger">*</spna></label>                                
                                            <select className="form-control input-text" name="bank_name" id="bank-name" onChange={this.onChange}>
                                            <option value="">Select</option>
                                            {this.state.get_bank_list ?
                                            this.state.get_bank_list.map((item, key) =>

                                                <option value={item.BANK_CODE} >{item.BANK_NAME}</option>
                                            ) : null}
                                        </select>
                                        <small className="text-danger">{this.state.bank_name_err}</small>
                                        </div>
                                        <div className="col-md-6 mb-4">
                                        <label for="acc-type" className="text-label">Select File Type  <spna className="text-danger">*</spna></label>
                                        <select className="form-control input-text" name="upload_type" id="upload_type" onChange={this.onChange}>
                                            <option value="">Select</option>
                                        
                                            <option value="CH"> Upload Cancelled Cheque</option>
                                            <option value="S"> Bank Statement</option>
                                            <option value="PH"> Passbook</option>
                                            
                                        </select>
                                        <small className="text-danger">{this.state.upload_type_err}</small>
                                        </div>
                                    </div>
									<div className="row">
                                        <div className="col-md-6 mb-4">
                                            <label>Upload  <spna className="text-danger">*</spna></label>                                
                                            <input type="file" name="image" className="form-control" />
                                            <small className="text-danger">{this.state.image_err}</small>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12 text-right">
                                            <a className="btn btn-danger shadow-sm text-color" onClick={this.continue.bind()}>Continue</a>
                                        </div>
                                    </div>
                                                           
                                </div>
                            </div>
                        </div>

                        <div className="col-xl-5 col-lg-5 " id="bank_details">
                            <div className="card shadow mb-3">
                                <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                    <h6 className="m-0 font-weight-bold text-danger">Bank Details</h6> 
                                </div>
                                {/* Card Body */}
                                <div className="card-body" >
                               {this.state.dataList?
                                <table class="table table-striped">
                                <tbody>
                                    <tr>
                                        <th scope="col">Bank Name</th>
                                        <td>{this.state.dataList?this.state.dataList.bank_name:null}</td>
                                    </tr>
                                    <tr>
                                        <th scope="col">Bank Address</th>
                                        <td>{this.state.get_bank?this.state.get_bank.ADDRESS:null}</td>
                                    </tr>
                                    <tr>
                                        <th scope="col">Bank Branch</th>
                                        <td>{this.state.get_bank?this.state.get_bank.BRANCH:null}</td>
                                    </tr>
                                    <tr>
                                        <th scope="col">Account No.</th>
                                        <td>{this.state.dataList?this.state.dataList.account_no:null}</td>
                                    </tr>
                                    <tr>
                                        <th scope="col">IFSC</th>
                                        <td>{this.state.dataList?this.state.dataList.ifsc:null}</td>
                                    </tr>
                                </tbody>
                                </table>  
                                :null}
                                    {this.state.dataList?
                                    <div className="row" id="Submit">
                                        <div className="col-12 text-right mt-2">
                                            <a className="btn btn-danger shadow-sm text-color" onClick={this.cnfAdd.bind()}>Confirm and Submit</a>
                                        </div>
                                    </div> 
                                    :null}                           
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
export default Add_Bank
