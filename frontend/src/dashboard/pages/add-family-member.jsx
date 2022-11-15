import React, {component} from 'react';
import Header from './header';
import Footer from './footer';
import Sidebar from './sidebar';
import {Helmet} from "react-helmet";
import { stringify } from 'querystring';
import Axios from 'axios';
import $ from 'jquery';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Select from 'react-select';
class Add_Family_Member extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
          users: []
        };
    }

    componentDidMount(){
        const userData = JSON.parse(localStorage.getItem("loginUserData"))
        const data = {
            adminPan:userData.pan_card
        }

        Axios.post("/prodigypro/api/listFamilyMember", data)
        .then((res) => {
            this.setState({userFamilyList:res.data.data.data})
        })

    }

    panCard = e =>{
       // alert("he")
        $("#add_member").css('display', 'none');
        $("#opt_box").css('display', 'none');
        $("#getotp").css('display', 'block');
        $(".text-info").css('display', 'none');
    }

    getOtp = e =>{
        const userData = JSON.parse(localStorage.getItem("loginUserData"));
        //alert(userData.pan_card);
        const data = {
            adminPan:userData.pan_card,
            memberPan:$('input[name="memberPan"]').val().toUpperCase(),
        }

        // alert(data.pan_numbers)    $(".text-info").css('display', 'block');
                $("#add_member").css('display', 'block');
                $("#opt_box").css('display', 'block');
                $("#getotp").css('display', 'none');
        $("#load").css('display', 'block');
        $("#getotp").css('display', 'none');

       Axios.post("/prodigypro/api/PANVerification", data)
        .then((res) => {
            $("#load").css('display', 'none');
            // console.log("PANVerification",res.data.data.status) getotp
            if(res.data.data.status==400){
                  toast.error(res.data.data.message);
                $("#getotp").css('display', 'block');
            }else{
                toast.success("An OTP has been sent on registered Mobile Number & Email Id.");
                $(".text-info").css('display', 'block');
                $("#add_member").css('display', 'block');
                $("#opt_box").css('display', 'block');
                $("#getotp").css('display', 'none');
            }
        })
    }

    resentOtp = e =>{
        const userData = JSON.parse(localStorage.getItem("loginUserData"));
        //alert(userData.pan_card);
        const data = {
            adminPan:userData.pan_card,
            memberPan:$('input[name="memberPan"]').val().toUpperCase()
        }

        $("#load1").css('display', 'block');
        $("#add_member").css('display', 'none');

       Axios.post("/prodigypro/api/PANVerification", data)
        .then((res) => {
            $("#load1").css('display', 'none');
            $("#add_member").css('display', 'block');
            if(res.data.data.status==400){
                toast.error(res.data.data.message);
            }else{
               toast.success("An OTP has been sent on registered Mobile Number & Email Id.");
            }
        })
    }

    addMember = e =>{
        const userData = JSON.parse(localStorage.getItem("loginUserData"));
        // alert(userData.pan_card); otp
        const data = {
            memberPan:$('input[name="memberPan"]').val().toUpperCase(),
            memberRelation:$('select[name="memberRelation"]').val(),
            otp:$('input[name="otp"]').val(),
            adminPan:userData.pan_card
        }

        $("#load1").css('display', 'block');
        $("#add_member").css('display', 'none');
        
        Axios.post("/prodigypro/api/AddFamily", data)
        .then((res) => {
            $("#load1").css('display', 'none');
            if(res.data.data.status==400){
                $("#add_member").css('display', 'block');
                toast.error(res.data.data.message);
            }else{

                const data = {
                    adminPan:userData.pan_card
                }
        
                Axios.post("/prodigypro/api/listFamilyMember", data)
                .then((res) => {
                    this.setState({userFamilyList:res.data.data.data})
                })

                 const data1 = {
                    pan:$('input[name="memberPan"]').val().toUpperCase()
                }

                 Axios.post("/prodigypro/api/getUsersDataViaPan", data1)
                .then((res) => {
                   
                    if(res.data.data.status==200){
                        if(res.data.data.data.iin!=''){
                            console.log("ww",res.data.data.data.iin)
                            const data2 = {

                                iin:res.data.data.data.iin,
                                email:userData.email
                            }

                            Axios.post("/prodigypro/api/GETIINDETAILSWMS", data2)
                            .then((res1) => {
                                console.log("www",res1.data)
                            })
                        }
                    }

                })

                $('input[name="otp"]').val("")
                $('input[name="memberPan"]').val("");
                $('select[name="memberRelation"]').val("");
                $("#getotp").css('display','block');
                $("#opt_box").css('display', 'none');
                $("#add_member").css('display', 'none');
                $(".text-info").css('display', 'none');
                toast.success("Family Member Added Successfully!");
            }

            
        })
    }

    deleteFamilyMember(adminPan,memberPan,memberRelation){
        if(window.confirm("Are you sure you want to delete?")){
           const userData = JSON.parse(localStorage.getItem("loginUserData"));
            const data = {
                adminPan:adminPan,
                memberPan:memberPan,
                memberRelation:memberRelation
            }

            Axios.post("/prodigypro/api/removeFamilyMember", data)
            .then((res) => {
                const data1 = {
                    adminPan:userData.pan_card
                }
        
                Axios.post("/prodigypro/api/listFamilyMember", data1)
                .then((result) => {
                    this.setState({userFamilyList:result.data.data.data})
                })
            })
        }
        
    }

    render(){
        const relation =[
            {value:"--Select Relation--",label: "--Select Relation--"},
            {value:"Father",label: "Father"},
            {value:"Mother",label: "Mother"},
            {value:"Wife",label: "Wife"},
            {value:"Husband",label: "Husband"},
            {value:"Son",label: "Son"},
            {value:"Daughter",label: "Daughter"},
            {value:"Other",label: "Other"},
        ];
        return(
        <>
        <Helmet>         
            <title>Add Family Membar</title>
        </Helmet>
            <style>
          {`
            .text-color{
                color:#fff !important;
            }
           .mt-input{
                margin-top:3.5%;
            }
            .mt-btn{
                margin-top:12%;
            }
            #opt_box{
                display:none;
            }
            #add_member{
                display:none;
            }
            #load{
                display:none;
            }
            .text-info{
                display:none;
            }
            #load1{
                display:none;
            }
             .panNo{
                text-transform: uppercase;
            }
            .btn-light:hover
             {
                border-color:#fff !important;
             }
            
          `}
          </style>

        {/* Page Wrapper */}
      <div id="wrapper">
        {/* Sidebar */}
            {/* <Sidebar/> */}
        {/* End of Sidebar */}


        {/* Content Wrapper */}
        <div id="content-wrapper" className="d-flex flex-column">
          {/* Main Content */}
          <div id="content">
          <ToastContainer position="top-right" className="mt-8" />
            {/* Topbar */}
                <Header/>
            {/* End of Topbar */}

            {/* Begin Page Content */}
            <div className="container-fluid">
                {/* Page Heading */}
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><a href="home">Home</a></li>
                            <li className="breadcrumb-item active" aria-current="page">Add Family Member</li>
                        </ol>
                    </nav>

                    <div className="row">
                        <div className="col-xl-6 col-lg-6 offset-md-3 my-5  pt-3 member ">
                            <div className="">
                                {/* <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between"> */}
                                    {/* <h6 className="m-0 font-weight-bold text-danger">Add Family Member</h6>  */}
                                {/* </div> */}
                                {/* Card Body */}
                                <div className="card-body ">
                                    <div className="col-12">
                                        <div className="col-lg-10 col-md-10 offset-md-1 py-3 ">
                                           
                                            <div className="col-md-12 mb-3">
                                                <label className='text-label'>Enter PAN</label>                                
                                                <input type="text" className="form-control panNo border-0 bg-c" name="memberPan" onKeyUp={this.panCard}/>
                                            </div>
                                            <div className="col-md-12 mb-4">
                                                <label className='text-label'>Relation</label> 
                                                <Select className='bg-c' options={relation} />                               
                                               
                                            </div>
                                            <div className="col-12 mb-3 text-center mt-3">
                                                <a className="btn-custom w-100 text-color" id="getotp" onClick={this.getOtp.bind()}>Generate OTP</a>                                
                                                      {/* <a className="btn btn-danger shadow-sm w-100" id="load">Loading...</a>     */}

                                                {/*<span className="text-xs text-info">An OTP will be triggered to Registered Mobile Number and Email ID</span>*/}
                                            </div>
                                            <div className="col-12 mb-3" id="opt_box">
                                                <label>Enter OTP</label>                                
                                                <input type="text" className="form-control bg-c" name="otp"/>
                                                <div class="text-right mt-2"><a href="#" onClick={this.resentOtp.bind()}>Didn't Get OTP? Resend</a></div>
                                            </div>
                                            <div className="col-12 text-center" id="add_member">
                                            <a className="btn-custom shadow-sm w-100 text-color">Add Family Member</a>
                                            {/* <a className="btn-custom shadow-sm w-100 text-color" onClick={this.addMember.bind()}>Add Family Member</a> */}
                                            </div>
                                            {/* <div className="col-12" id="load1">
                                            <a className="btn btn-danger shadow-sm w-100">Loading...</a>
                                            </div> */}
                                        </div>
                                    </div>                                
                                </div>
                               
                            </div>
                        </div>
                    </div>  
                    <div className="row">
                    {/* Area Chart */}
            {/* {this.state.userFamilyList?
            <div className="col-xl-12 col-lg-12">
           
                <div className="card shadow mb-3">
                            <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                <h6 className="m-0 font-weight-bold text-danger">All Data</h6> 
                            </div>
                            
                    <div className="card-body">
                        <div className="table-responsive">
                        <table className="table table-hover table-bordered">
                            <thead className="bg-primary">
                            <tr>
                            
                                <th scope="col" className="text-white">Name</th>
                                <th scope="col" className="text-white">Member Pan</th>
                                <th scope="col" className="text-white">Relation</th>
                                <th scope="col" className="text-white">Action</th>
                            </tr>
                            </thead>
                            <tbody >
                          
                                {this.state.userFamilyList.map((item, key) =>
                                <tr>
                                    <th className="bg-light text-success" >{item.name}</th>
                                    <th className="bg-light text-success" >{item.memberPan}</th>
                                    <th className="bg-light text-success" >{item.memberRelation}</th>
                                    <th className="bg-light text-success" > <a href='javascript:void(0);' onClick={this.deleteFamilyMember.bind(this, item.adminPan,item.memberPan,item.memberRelation)}  data-toggle="tooltip" title="Delete"><i class="fa fa-trash" aria-hidden="true" ></i></a></th>
                                </tr>
                            )}
                            </tbody>
                        </table>
                    </div>
                </div>
                </div>
            </div> :null} */}

    <div className='col-xl-6 col-lg-6 offset-md-3 member  p-4 mb-5'>
          <table className="table ">
            <tr className='red'>
                <th>Name</th>
                <th>Pan</th>
                <th>Relation</th>
                <th>Action</th>
            </tr>
            <tr className='text-black'>
            <td >Mr. Mukesh Kumar Gupta</td> 
            <td >ENPPS9985C</td> 
            <td >Father</td> 
             <td><a href='javascript:void(0);' className='red'><i class="fa fa-trash" aria-hidden="true" ></i></a></td>
             </tr>
             <tr className='text-black'>
            <td >Mr. Mukesh Kumar Gupta</td> 
            <td >ENPPS9985C</td> 
            <td >Father</td> 
             <td><a href='javascript:void(0);' className='red'><i class="fa fa-trash" aria-hidden="true" ></i></a></td>
             </tr>
             </table> 
           
            
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
export default Add_Family_Member
