import React, { component } from "react";
import Header from "./header";
import Footer from "./footer";
import Sidebar from "./sidebar";
import { Helmet } from "react-helmet";
import Axios from "axios";
import $ from "jquery";

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
    };

    this.state = {
      Items: [],
    };
  }

  componentDidMount() {
    const schemeList = [];
    const list = "";
    const userData = JSON.parse(localStorage.getItem("loginUserData"));
    const data = {
      email: userData.email,
    };

    Axios.post("/prodigypro/api/get_user_profile", data)
      .then((res) => {
        console.log("dscd", res.data.data.data);
        this.setState({ userProfile: res.data.data.data });
        // console.log(this.state.userProfile)
      })
      .catch((err) => {
        console.log("err get_user_profile ", err);
      });
    // console.log(this.state.userList)
  }

  onFileChange = (event) => {
    console.log(event.target.files[0]);
    // this.setState({ selectedFile: event.target.files[0] });
    const formData = new FormData();
    formData.append("file", event.target.files[0]);
    formData.append("email", "krishnaravi1995@gmail.com");
    Axios.post("/prodigypro/api/profileImg", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }).then((response) => {
      console.log(response.data);
    });
  };

  render() {
    return (
      <>
        <Helmet>
          <title>Profile</title>
        </Helmet>
        <style>
          {`
            .card{
                min-height:420px;
            }

            .profile-img{
                text-align: center;
            }
            .profile-img img{
                width: 100%;
            }
            .profile-img .file {
                position: relative;
                overflow: hidden;
                margin-top: -20%;
                width: 70%;
                border: none;
                border-radius: 0;
                font-size: 15px;
                background: #212529b8;
            }
            .profile-img .file input {
                position: absolute;
                opacity: 0;
                right: 0;
                top: 0;
                cursor:pointer;
            }
 
            .profile-head .nav-tabs .nav-link{
                font-weight:600;
                border: none;
            }
            .profile-head .nav-tabs .nav-link.active{
                border: none;
                border-bottom:2px solid #0062cc;
            }

           .text-alignment{
             text-align : right;
           }

           @media only screen and (max-width: 600px) {
            .text-alignment{
              text-align : left;
            }
          }
          .profile_pic{
            max-width: 200px;
            max-height: 200px;
            border-radius: 20%;
          }
        `}
        </style>

        {/* Page Wrapper */}
        <div id="wrapper">
          {/* Sidebar */}
          <Sidebar />
          {/* End of Sidebar */}

          {/* Content Wrapper */}
          <div id="content-wrapper" className="d-flex flex-column">
            {/* Main Content */}
            <div id="content">
              {/* Topbar */}
              <Header />
              {/* End of Topbar */}

              {/* Begin Page Content */}
              <div className="container-fluid">
                {/* Page Heading */}
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <a href="home">Home</a>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      Profile
                    </li>
                  </ol>
                </nav>

                <div className="row">
                  <div className="col-xl-12 col-lg-12">
                    <div className="card shadow">
                      <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                        <h6 className="m-0 font-weight-bold text-danger"></h6>
                      </div>
                      {/* Card Body */}
                      <div className="card-body">
                        <div className="col-12">
                          <form method="post">
                            {this.state.userProfile ? (
                              <div className="col-md-6 offset-md-3 shadow p-3">
                                <div className="col-md-6 offset-md-3">
                                  <div className="profile-img ">
                                    <img
                                      className="profile_pic"
                                      src={
                                        this.state.userProfile.profile_pic != ""
                                          ? "https://prodigypro.bfccapital.com/" +
                                            this.state.userProfile.profile_pic
                                          : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS52y5aInsxSm31CvHOFHWujqUx_wWTS9iM6s7BAm21oEN_RiGoog"
                                      }
                                      alt=""
                                    />
                                    <div className="file btn btn-lg btn-primary">
                                      Change Photo
                                      <input
                                        type="file"
                                        name="file"
                                        onChange={this.onFileChange}
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-md-7">
                                    <label>Name</label>
                                  </div>
                                  <div className="col-md-5 text-alignment font-weight-bold">
                                    <p>{this.state.userProfile.name}</p>
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-md-7">
                                    <label>Mobile Number</label>
                                  </div>
                                  <div className="col-md-5 text-alignment font-weight-bold">
                                    <p>{this.state.userProfile.phone}</p>
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-md-7">
                                    <label>PAN</label>
                                  </div>
                                  <div className="col-md-5 text-alignment font-weight-bold">
                                    <p>{this.state.userProfile.pan_card}</p>
                                  </div>
                                </div>
                                {/* <div className="row">
                                <div className="col-md-7">
                                  <label>Marital Status</label>
                                </div>
                                <div className="col-md-5 text-alignment font-weight-bold">
                                  <p>{this.state.userProfile.material_status == 0 ? "Single" : "Married"}</p>
                                </div>
                              </div> */}
                                <div className="row">
                                  <div className="col-md-7">
                                    <label>
                                      Invester Identification Number (IIN)
                                    </label>
                                  </div>
                                  <div className="col-md-5 text-alignment font-weight-bold">
                                    <p>{this.state.userProfile.iin}</p>
                                  </div>
                                </div>
                                {/* <div className="row">
                                <div className="col-md-7">
                                  <label>Gender</label>
                                </div>
                                <div className="col-md-5 text-alignment font-weight-bold">
                                  <p>{this.state.userProfile.gender == 1 ? "Male" : "Female"}</p>
                                </div>
                              </div> */}
                                <div className="row">
                                  <div className="col-md-7">
                                    <label>Date of Birth</label>
                                  </div>
                                  <div className="col-md-5 text-alignment font-weight-bold">
                                    <p>
                                      {this.state.userProfile.date_of_birth}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            ) : null}
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
            <Footer />
            {/* End of Footer */}
          </div>
          {/* End of Content Wrapper */}
        </div>
        {/* End of Page Wrapper */}
      </>
    );
  }
}
export default Profile;
