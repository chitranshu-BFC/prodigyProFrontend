import React, {component} from 'react';
import { Link, Redirect } from 'react-router-dom';
import Header from './header';
import Footer from './footer';
import Sidebar from './sidebar';
import {Helmet} from "react-helmet";
import StyleComponent from './styleComponent';
import Axios from 'axios';
import $ from 'jquery';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Select from 'react-select';
class Bank_Mandate extends React.Component{

    constructor(){
        super();
        this.state = {
          users: []
        };
        this.state = {
          Items: []
        };

        
    }

 
    componentDidMount(){
        const schemeList = []; const list = '';
        const userData = JSON.parse(localStorage.getItem("loginUserData"))
        const data = {
            email:userData.email,
        }
        // alert(data.email)
        Axios.post("http://localhost:5010/api/User_profile", data)
        .then((res) => {
        // console.log("dscd",res.data.data.data)
        this.setState({userList:res.data.data.data})
        })
	}

    userProfile = e => {
        let userPro_id; let schemeList =[];
        userPro_id = $('select[name="usersId"]').val();
		  if(userPro_id==''){
            $(".hd-table").css('display','none');
            $(".addBank").css('display','none');
        }else{
		$(".hd-table").css('display','block');
		$(".addBank").css('display','none');
        const userData = JSON.parse(localStorage.getItem("loginUserData"))
        this.setState({userBankList:''})
        this.state.userList.map(value => {
            if(value.id==userPro_id){
				$(".addBank").css('display','block');
				 $("#wait").css('display','block');
				$("#overlay").css("display","block")
				localStorage.setItem("userList",JSON.stringify(value))
                const bankData = {
                    email:userData.email,
                    iin:value.customer_id,
                }
                
                //alert(JSON.stringify(bankData));
                Axios.post("http://localhost:5010/api/getbankList", bankData)
                .then((res) => {
                    $("#wait").css('display','none');
					$("#overlay").css("display","none")
                    //console.log("userBankList",res.data)
                    this.setState({userBankList:res.data.data.data})
                })

                const mandate = {
                    email:userData.email,
                    IIN:value.customer_id,
                }

                Axios.post("http://localhost:5010/api/mandateList", mandate)
                .then((res) => {
                    console.log("mandate ",res.data.data.data)
                     if(res.data.data.data==''){
                        this.setState({userMandateList:''})
                    }else{
                        this.setState({userMandateList:res.data.data.data})
                    }
                })

            }
        })
		}
    }

    MakePrimary (e,acc_no) {
        e.preventDefault();
        $("#wait").css('display','block');
			$("#overlay").css("display","block")
        const userData = JSON.parse(localStorage.getItem("loginUserData"))
        this.state.userBankList.map(value => {
            this.setState({userBankList:""})
            if(value.ac_no==acc_no){
              
                const data = {
                   iin:value.customer_id,
                   acc_no:value.ac_no,
                   bank_name:value.bank_code,
                   default_bank:"Y",
                   email:userData.email
                }
               
                Axios.post("http://localhost:5010/api/primaryBank", data)
                .then((res) => {
                    
                    const bankData = {
                        email:userData.email,
                        iin:value.customer_id,
                    }
                    
                    Axios.post("http://localhost:5010/api/getbankList", bankData)
                    .then((res) => {
                        $("#wait").css('display','none');
							$("#overlay").css("display","none")
                        this.setState({userBankList:res.data.data.data})
                    })

                })
            }
        })
    }

    deletePrimary (e,acc_no) {
        e.preventDefault();
        $("#wait").css('display','block');
			$("#overlay").css("display","block")
        const userData = JSON.parse(localStorage.getItem("loginUserData"))
        this.state.userBankList.map(value => {
            this.setState({userBankList:""})
            if(value.ac_no==acc_no){
                const bankData = {
                    iin:value.customer_id,
                    acc_no:value.ac_no,
                    bank_name:value.bank_code,
                }

                Axios.post("http://localhost:5010/api/deleteBank", bankData)
                .then((res) => {
                    const bankData = {
                        email:userData.email,
                        iin:value.customer_id,
                    }
                    
                    Axios.post("http://localhost:5010/api/getbankList", bankData)
                    .then((res) => {
                        $("#wait").css('display','none');
							$("#overlay").css("display","none")
                        this.setState({userBankList:res.data.data.data})
                    })
                })
            }
        })
    }

    createmandate(e,acc_no){
        this.state.userBankList.map(value => {
            if(value.ac_no==acc_no){
                // console.log("acc",value)
                localStorage.setItem("bankDetail",JSON.stringify(value));
                this.setState({userset:value})
            }
        })
    }

    render(){
        if(this.state.userset){
            return <Redirect to='/prodigypro/dashboard/create-mandate' />
        }
        const profile = [
            { value: 'select', label: 'select' },
         
           
          ];
        return(
        <>
        <Helmet>         
            <title>Bank Details and Mandate</title>
        </Helmet>
            <style>
          {`
            th{
                white-space: nowrap;
            }
            .table td, .table th {
                padding: .60rem;
                font-size:14px;
            }
            
            .no-wrap-ws{
                white-space: nowrap;
            }
            .bank-icon{
                font-size:30px;
            }
            #wait{
                display:none;
              }
              .my-custom-scrollbar {
                position: relative;
                overflow: auto;
              }
              .table-wrapper-scroll-y {
                display: block;
              }
              .no-break{
                white-space:nowrap;
              }
			//   .addBank{
            //     display:none;
            // }
			#overlay{
                display:none;
            }
			// .hd-table{
            //     display:none;
            // }
          
          `}
          </style>

        {/* Page Wrapper */}
      <div id="wrapper">
        {/* Sidebar */}
		  {/* Loader Page */}
		<div id="overlay" >
            <div class="spinner"></div>
            <br/><b className="text-danger">Please Wait...</b>
        </div>
            {/* <Sidebar/> */}
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
                            <li className="breadcrumb-item active" aria-current="page">Bank Details and Mandate</li>
                        </ol>
                    </nav>

                    <div className="row ">
                        <div className="col-xl-12 col-lg-12 ">
                            <div className=" mb-3">
                               
                                        {/* Card Body */}
                                <div className="card-body">
                                    <div className="col-12">
                                        <div className="row">
                                        <div className="col-md-4 mb-5">
                                            <label htmlFor="Profile" >Select Profile</label>
                                            <Select className='orderprofile ' options={profile} />
                                        </div>
                                        <div className="col-md-3 mt-5 ml-auto addBank">
                                            <a className="btn-custom" href="add-bank"><i className="fas fa-plus mr-2 "></i>Add Another Bank</a>
                                            
                                        </div>
                                        </div>
                                        <div className="custom-tab-bg p-4 mb-5 bg-white">
                                        <table className="table hd-table">
                                            <thead className="red">
                                                <tr>
                                                    <th scope="col" >Bank Name</th>
                                                    <th scope="col" >Account Number</th>
                                                    <th scope="col">Status</th>
                                                    <th scope="col">IFSC Code</th>
                                                    <th scope="col" >Account Type</th>
                                                    <th scope="col" >Create Mandate</th> 
                                                    <th scope="col">View Mandate</th> 
                                                                 
                                                </tr>
                                            </thead>
                                            <tbody>

                                                <tr className='text-black'>
                                                    <td>Bhandhan Bank
                                                    <a href="javascript:void(0)" className="text-danger text-xs pl-2">Make Primary Bank</a>
                                                    </td>
                                                    <td>12600048936</td>
                                                    <td><i className="fas fa-check text-success no-break"><span className="pl-2 text-secondary">Verified</span></i></td>
                                                    <td>ICIC004782</td>
                                                    <td>Saving Account</td>
                                                    <td> <a className="btn btn-danger btn-sm shadow-sm no-break" href="/prodigypro/dashboard/create-mandate"><i className="fas fa-plus mr-2"></i>Create E-Mandate</a></td>
                                                    <td>
                                                    <a className="btn btn-danger btn-sm shadow-sm no-break" href="" data-toggle="modal" data-target="#bank_"><i className="fas fa-eye mr-2"></i>View existing mandate</a>

<div className="modal fade" id="bank_" tabIndex={-1} role="dialog" aria-labelledby="bankTitle" aria-hidden="true">
  <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title text-dark" id="bankTitle">Existing Mandate</h5>
        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">×</span>
        </button>
      </div>
      <div className="modal-body">
            <table class="table text-center">
                <thead>
                    <tr className='red'>
                        <th scope="col">UMRN No.</th>
                        <th scope="col">Amount</th>
                        <th scope="col">From</th>
                        <th scope="col">To</th>
                        {/* <th scope="col">Status</th> */}
                    </tr>
                </thead>
                <tbody>
                
                    <tr className='text-black'>
                    <td>KKBK7011503220004544</td>
                        <td>1000000</td>
                        <td>15-MAR-2022</td>
                        <td>31-DEC-2099</td>
                      
                    </tr>
                    
                </tbody>
            </table>
      </div>
     
    </div>
  </div>
</div>

                </td>     



                                                  </tr>
                                                  <tr className='text-black'>
                                                    <td>Kotak Bank 
                                                    <a href="javascript:void(0)" className="text-info text-xs pl-2">(Primary Bank)</a>
                                                    </td>
                                                    <td>12600048936</td>
                                                    <td><i className="fas fa-check text-success no-break"><span className="pl-2 text-secondary">Verified</span></i></td>
                                                    <td>ICIC004782</td>
                                                    <td>Saving Account</td>
                                                    <td> <a className="btn btn-danger btn-sm shadow-sm no-break" href="/prodigypro/dashboard/create-mandate"><i className="fas fa-plus mr-2"></i>Create E-Mandate</a></td>
                                                    <td>
                                                    <a className="btn btn-danger btn-sm shadow-sm no-break" href="" data-toggle="modal" data-target="#bank_"><i className="fas fa-eye mr-2"></i>View existing mandate</a>

<div className="modal fade" id="bank_" tabIndex={-1} role="dialog" aria-labelledby="bankTitle" aria-hidden="true">
  <div className="modal-dialog modal-lg modal-dialog-centered " role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title text-dark" id="bankTitle">Existing Mandate</h5>
        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">×</span>
        </button>
      </div>
      <div className="modal-body">
            <table class="table text-center">
                <thead>
                    <tr className='red'>
                        <th scope="col">UMRN No.</th>
                        <th scope="col">Amount</th>
                        <th scope="col">From</th>
                        <th scope="col">To</th>
                        {/* <th scope="col">Status</th> */}
                    </tr>
                </thead>
                <tbody>
                
                    <tr className='text-black'>
                    <td>KKBK7011503220004544</td>
                        <td>1000000</td>
                        <td>15-MAR-2022</td>
                        <td>31-DEC-2099</td>
                      
                    </tr>
                    
                </tbody>
            </table>
      </div>
     
    </div>
  </div>
</div>

                </td>     



                                                  </tr>
                <tr id="wait">
                    Please Wait...
                    {/* <td colSpan="5" className="text-danger"></td> */}
                </tr>
                {this.state.userBankList?
                    this.state.userBankList.map((item, key) =>
                    <tr id={"rowData_"+key}>
                        <td>{item.bank_name} 
                        {item.default_bank == "Y" ? <span className="text-info text-xs">(Primary Bank)</span>:null}<br></br>
                        {item.default_bank == "N" ? <a href="javascript:void(0)" className="text-danger text-xs"   onClick={(e) => this.MakePrimary(e,item.ac_no)}>Make Primary Bank</a>:null}
                        {item.status == "Not Activated" ? <a href="javascript:void(0)" className="text-danger text-xs"  onClick={(e) => this.deletePrimary(e,item.ac_no)}> | Delete</a>:null}
                        </td>
                        <td>{item.ac_no}</td>
                        {item.status == "Activated" ?
                        <td>
                         <i className="fas fa-check text-success no-break"><span className="pl-2 text-secondary">Verified</span></i>
                        </td>:
                        <td>
                         <i className="fas fa-clock mr-2 text-warning no-break"></i>Not Verified
                        </td>
                        }
                        <td>{item.ifsc_code}</td>
                        <td>{item.ac_type}</td>
                        <td>
                        <a className="btn btn-danger btn-sm shadow-sm no-break" href="javascript:void(0);"  onClick={(e) => this.createmandate(e,item.ac_no)}><i className="fas fa-plus mr-2"></i>Create E-Mandate</a>
                        </td>  
                        <td>

        <a className="btn btn-danger btn-sm shadow-sm no-break" href="" data-toggle="modal" data-target={"#bank_"+key}><i className="fas fa-eye mr-2"></i>View existing mandate</a>

        <div className="modal fade" id={"bank_"+key} tabIndex={-1} role="dialog" aria-labelledby="bankTitle" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered " role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title text-danger" id="bankTitle">Existing Mandate</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">
                    <table class="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th scope="col">UMRN No.</th>
                                <th scope="col">Amount</th>
                                <th scope="col">From</th>
                                <th scope="col">To</th>
                                {/* <th scope="col">Status</th> */}
                            </tr>
                        </thead>
                        <tbody>
                        {this.state.userMandateList?
                          this.state.userMandateList.map((mandateData, key2) =>
                          mandateData.ACCOUNT_NO==item.ac_no?
                            <tr>
                                <td>{mandateData.UMRN_NO}</td>
                                <td>{mandateData.AMOUNT}</td>
                                <td>{mandateData.FROM_DATE}</td>
                                <td>{mandateData.TO_DATE}</td>
                              
                            </tr>
                            :<tr><td colSpan="4">{key2==0?"No Exiting Mandate.":null}</td></tr>
                          ):<tr><td colSpan="4">No Exiting Mandate.</td></tr>}
                        </tbody>
                    </table>
              </div>
              {/* <div className="modal-footer">
                <a className="btn btn-danger btn-sm shadow-sm" href="create-mandate" ><i className="fas fa-plus mr-2"></i>Create E-Mandate</a>
              </div> */}
            </div>
          </div>
        </div>

                        </td>     
                    </tr>
                  ):null}
                                              
                                                
                                            </tbody>
                                        </table>
                                        </div>   
                                    </div>                                
                                </div>
                            </div>
                        </div>
                    </div>   
                </div>
      </div>
          {/* End of Main Content */}

        {/*Bank and Mandate Modal */}
      

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
export default Bank_Mandate
