import express from 'express';
import dotenv from 'dotenv';
// import config from './config.js';
import { SipCalculater, LumpsumCalculater, FDCalculater, EmiCalculater, ElssCalculater, MarrigeCalculater, EducationCalculater, RetirmentCalculater } from './Controller/Calculaters.js';
import path from 'path';
import bodyParser from 'body-parser';
import Axios from 'axios';
import $ from 'jquery';
import mysql from 'mysql';
import querystring from 'querystring';
import FormData from 'form-data';
import multer from 'multer';

import fs from 'fs';
dotenv.config();
import cors from 'cors';
const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const __dirname = path.resolve();


const auth = {
  Authorization: "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiMmNkMDRjNTdjMTk0ZDAyNzQzN2M3MDFiYjI0NDQ0NDRiN2YzZjcyYzlhMjI4ZTM5OWVkN2RjYzZhN2Q2YjY5ZDdkYjk1YTM1YjVlNTU2MWUiLCJpYXQiOjE2Njc0NTY1NjEsIm5iZiI6MTY2NzQ1NjU2MSwiZXhwIjoxNjk4OTkyNTYxLCJzdWIiOiIyMDgiLCJzY29wZXMiOltdfQ.M1nt6_aMpiEppl62MuWzD97NMfuW5816RvrSa6CD1n1kjM-mfU6WhdsctQ5fBd7lRUeiBTtyS0iO9oEXTCCpwT_7ndGnjF4ZLovwFFfWYueL7_a4zwh05_sMxCMk-ZgFPvmfmUNOtFruHDUzEqg8d1A6FmPdTdWy07GlP1P7xkWPU-EcNM8-efiVtdRlLNpn58je6dK2x2bZzHH_Xj7lqWy9jaoiOgTX9ifQbSMDV6084FyT5aUaNngkVKzZHlzbKBUwtJSMKnDh1ZOgST5wCUplwWRGx1VznPrQ_L-ZTrcAZ4HN1Ni_PPvqV0uwUAer96VjUa-3YmImVgJtOygMRy434xH1Cl9xp5m2ivtB87y7R8QhgX2qzY43q0hO5Rgu7JrBAO_GO9Fxi6jf-GoutLoRcOC9sFJYpMpdsniVEuIhpNhC-tRiay12U3bhuCRGznF_lAgzzc_eR0aI-IU9ULfiQtXeatCxYvUk4F7CB5mG0BhzYlWD4K1wOoBVBj3_4ZR9NDUfkxEgYyxlI8U-gqrbr26y9OZmV6MJL9ZVf_65W70m8E88K4ydr0cj3bv8VpifrW9M8hW9kgzIvgM8OT2vsBxn3rk-FnbTIlIp2bL4-TGfdkZnmKcRzKsjne3Hbg8mcA02fIByngV3PnoFUkmUGcoamszgxfY7GG1MZgY"
};


const port = 5010;

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

app.listen(port, "0.0.0.0", () => { console.log("server started at port ", port) })

var api_base_url = "https://mfprodigy.bfccapital.com";
var api_base_url_prod = 'https://mfprodigy.bfccapital.com/prodigyfinallive';
var api_base_url_wms = "https://mfprodigy.bfccapital.com/wmsapi";
var api_url_wms = "https://wms.bfccapital.com";

app.post("/api/otp", function (req, res) {

  const data = {
    phno: req.body.phone,
    email: req.body.email,
  };






  Axios.get(api_base_url + '/api/smsWeb?phno=' + data.phno + '&email=' + data.email, {
    headers: {
      "Authorization": auth.Authorization,
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json"
    },
  })
    .then((response) => {
      console.log("api otp", response.data);
      return res.json({ status: 200, data: response.data });
    })
    .catch(err => {
      console.log("api otp err", err);
      return res.send({ status: 400, massage: "Email Id Already Exits!" });
      // res.status(400).json(err)
    });
})


app.post("/api/verifyOtp", function (req, res) {

  const data = {
    otp: req.body.otp,
  };

  Axios.get(api_base_url + '/api/verifysmsweb?otp=' + data.otp, {
    headers: {
      "Authorization": auth.Authorization,
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json"
    },
  })
    .then((response) => {
      // console.log(response.data);
      return res.json(response.data);
    })
    .catch(err => {
      console.log(err);
      // return res.send({status:400,massage:"OTP dose not match!"});
      // res.status(400).json(err)
    });
})

// ****************** Calculater Api's *********************//
app.post("/api/sip", SipCalculater)
app.post("/api/lumpsum", LumpsumCalculater)
app.post("/api/fd", FDCalculater)
app.post("/api/emi", EmiCalculater)
app.post("/api/elss", ElssCalculater)
app.post("/api/marrige", MarrigeCalculater)
app.post("/api/education", EducationCalculater)
app.post("/api/retirment", RetirmentCalculater)


// ****************** End Calculater Api's *********************//

app.post("/api/registers", function (req, res) {

  const request_data = {
    "name": req.body.name,
    "phone": req.body.phone,
    "email": req.body.email,
    "password": req.body.password,
    "c_password": req.body.c_password,
    "type_device": "Web",
  };

  // return res.json({data:req.body.name});
  Axios.post(api_base_url + '/api/registers', request_data, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json"
    },
  })
    .then((response) => {
      // console.log(response.data);
      return res.json({ status: 200, data: response.data });
    })
    .catch(err => {
      // console.log(err);  
      return res.send({ status: 400, massage: "Email Id or Mobile no is Already Exits!" });
      // res.status(400).json(err)
    });
});


app.post("/api/login", function (req, res) {

  const request_data = {
    "email": req.body.email,
    "password": req.body.password,
  };

  Axios.post(api_base_url + '/api/web/login', request_data, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json"
    },
  })
    .then((response) => {
      console.log("login", response.data);
      return res.json({ status: 200, data: response.data });
    })
    .catch(err => {
      console.log("login err", err);
      return res.send({ status: 400, massage: "Invalid Credentials" });
    });
})


app.post("/api/forgetpassword", function (req, res) {

  const request_data = {
    "email": req.body.email,
  };

  // return res.json({data:req.body.email});
  Axios.post(api_base_url + '/api/reSendOtp', request_data, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json"
    },
  })
    .then((response) => {
      // console.log(response.data);
      return res.json({ status: 200, data: response.data });
    })
    .catch(err => {
      console.log(JSON.stringify(err));
      return res.send({ status: 400, massage: "Invalid Credentials" });
    });

})


app.post("/api/OTPverify", function (req, res) {

  const request_data = {
    "email": req.body.email,
    "otp": req.body.otp,
    "userotp": req.body.userotp,
  };

  // return res.json({data:req.body.userotp});
  Axios.post(api_base_url + '/api/verifyOTP', request_data, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json"
    },
  })
    .then((response) => {
      // console.log(response.data);
      return res.json({ status: 200, data: response.data });
    })
    .catch(err => {
      console.log("error " + JSON.stringify(err.message));
      return res.json({ status: 422, massage: "Otp not matched" });

    });

})


app.post("/api/passupdate", function (req, res) {

  const request_data = {
    "email": req.body.email,
    "password": req.body.password,
    "c_password": req.body.cpassword,
  };

  // return res.json(JSON.stringify(request_data));
  Axios.post(api_base_url + '/api/updatePassword', request_data, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json"
    },
  })
    .then((response) => {
      // console.log(response.data);
      return res.json({ status: 200, data: response.data });
    })
    .catch(err => {
      console.log("error " + JSON.stringify(err.message));
      // return res.json({status:422,massage:"Otp not matched"});
    });

})


app.post("/api/updateExistingPassword", (req, res) => {
  const request_data = {
    "exits_password": req.body.exit_pass,
    "c_password": req.body.conf_pass,
    "password": req.body.new_pass,
    "email": req.body.email
  };

  Axios.post(api_base_url + '/api/updateExistingPassword', request_data, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json"
    },
  })
    .then((response) => {
      console.log('response updateExistingPassword', response.data);
      return res.json({ status: 200, data: response.data });
    })
    .catch(err => {
      console.log("error " + JSON.stringify(err.message));
      return res.json({ status: 422, massage: "Wrong Pan Entered w.r.t email!" });
    });

});


app.post("/api/existingPanKyc", (req, res) => {
  const request_data = {
    "pan_number": req.body.pan_numbers,
    "email": req.body.email
  };

  Axios.post(api_base_url + '/api/existingPanKyc', request_data, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json"
    },
  })
    .then((response) => {
      console.log('response existingPanKyc', response.data);
      return res.json({ status: 200, data: response.data });
    })
    .catch(err => {
      console.log("error " + JSON.stringify(err.message));
      return res.json({ status: 422, massage: "Wrong Pan Entered w.r.t email!" });
    });

});

app.post("/api/pen_verify", (req, res) => {
  const request_data = {
    "pan_number": req.body.pan_numbers,
  };

  // Axios.post(api_base_url + '/api/getPanVerification', request_data, {
  Axios.post(api_base_url + '/api/getPanKycStatus', request_data, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json"
    },
  })
    .then((response) => {
      // console.log('response',response.data);
      return res.json({ data: response.data });
    })
    .catch(err => console.log(err));

});


app.post("/api/getIINStatus", (req, res) => {
  const request_data = {
    "Pan_No": req.body.pan_numbers,
  };

  Axios.post(api_base_url_prod + '/getIINStatus', request_data, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json"
    },
  })
    .then((response) => {
      //  console.log('response getIINStatus',response.data);
      return res.json({ data: response.data });
    })
    .catch(err => console.log(err));

});


app.post("/api/GETIINDETAILSWMS", (req, res) => {
  const request_data = {
    "iin": req.body.iin,
    "email": req.body.email
  };

  Axios.post(api_base_url_prod + '/GETIINDETAILSWMS', request_data, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json"
    },
  })
    .then((response) => {
      // console.log('response',response.data);
      return res.json({ data: response.data });
    })
    .catch(err => console.log(err));

});


app.post("/api/eKYC", (req, res) => {
  const request_data = {
    "pan": req.body.pan,
    "amc_code": "K",
    "distributor_name": "BFC Capital Pvt. Ltd",
    "distributor_branch": "Lucknow",
    "distributor_designation": "",
    "investor_email": req.body.email,
    "return_flag": "Y",
    "investor_mobile_no": req.body.mobile,
    "euin_code": "E073161",
    "euin_name": "Sharad Bindal",
    "email": "krishnaravi17@gmail.com"
  };

  //   const request_data = {
  //     "pan":"DSEPK8009J",
  //     "amc_code":"K",
  //     "distributor_name":"BFC Capital Pvt. Ltd",
  //     "distributor_branch":"Lucknow",
  //     "distributor_designation":"",
  //     "investor_email":"krishnaravi17@gmail.com",
  //     "return_flag":"Y",
  //     "investor_mobile_no":"9598848185",
  //     "euin_code":"E073161",
  //     "euin_name":"Sharad Bindal",
  //     "email":"krishnaravi1995@gmail.com"
  // }

  // return res.json({data:request_data});
  Axios.post(api_base_url_prod + '/eKYC_REGISTRATION', request_data, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json"
    },
  })
    .then((response) => {
      // console.log('response',response.data);
      return res.json({ data: response.data });
    })
    .catch(err => console.log(err));

});


app.post("/api/user_details", (req, res) => {
  const request_data = {
    "pan_card": req.body.pan,
    "email": req.body.email,
    "phone": req.body.phone,
    "dob": req.body.dob,
    "birth_place": req.body.pob,
    "occupation": req.body.occupation,
    "income_range": req.body.inc_range,
    "resident_status": req.body.resident,
    "email_relation": req.body.email_relation,
    "mobile_relation": req.body.mobile_relation
  };
  //console.log(request_data);
  // return res.json(JSON.stringify(request_data));
  Axios.post(api_base_url + '/api/persional_details/user_details', request_data, {
    headers: {
      "Authorization": auth.Authorization,
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json"
    },
  })
    .then((response) => {
      // console.log('response',response.data);
      return res.json({ data: response.data });
    })
    .catch(err => console.log(err));

});


app.post("/api/address_details", (req, res) => {
  if (req.body.resident == '0') {
    const request_data = {
      "email": req.body.email,
      "city": req.body.ncity,
      "state": req.body.nstate,
      "locality": req.body.nlandmark,
      "address": req.body.naddress,
      "country": req.body.ncountry,
      "pincode": req.body.npin,
      "nri_city": req.body.nri_city,
      "nri_state": req.body.nri_state,
      "nri_locality": req.body.nri_landmark,
      "nri_addr1": req.body.nri_address,
      "nri_country": req.body.nri_country,
      "nri_pincode": req.body.nri_pin
    };

    // return res.json(JSON.stringify(request_data));
    Axios.post(api_base_url + '/api/persional_details/address_details', request_data, {
      headers: {
        "Authorization": auth.Authorization,
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json"
      },
    })
      .then((response) => {
        // console.log('response',response.data);
        return res.json({ data: response.data });
      })
      .catch(err => console.log(err));

  } else {

    const request_data = {
      "email": req.body.email,
      "city": req.body.city,
      "state": req.body.state,
      "locality": req.body.landmark,
      "address": req.body.address,
      "country": req.body.country,
      "pincode": req.body.pin,
      "nri_city": "",
      "nri_state": "",
      "nri_locality": "",
      "nri_addr1": "",
      "nri_country": "",
      "nri_pincode": ""
    };

    // return res.json(JSON.stringify(request_data));
    Axios.post(api_base_url + '/api/persional_details/address_details', request_data, {
      headers: {
        "Authorization": auth.Authorization,
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json"
      },
    })
      .then((response) => {
        // console.log('response',response.data);
        return res.json({ data: response.data });
      })
      .catch(err => console.log(err));

  }




});

app.post("/api/set_pin", (req, res) => {

  const request_data = {
    "email": req.body.email,
    "password": req.body.password,
    "c_pin": req.body.con_pin,
    "pin": req.body.new_pin
  };

  //  return res.json(JSON.stringify(request_data));
  Axios.post(api_base_url + '/api/setScreenPin', request_data, {
    headers: {
      "Authorization": auth.Authorization,
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json"
    },
  })
    .then((response) => {
      // console.log('response',response.data);
      return res.json({ data: response.data });
    })
    .catch(err => console.log(err));

});


app.post("/api/getoccupations", (req, res) => {

  Axios.get(api_base_url + '/api/nse/getOccupation', {
    headers: {
      "Authorization": auth.Authorization,
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json"
    },
  })
    .then((response) => {
      // console.log('response',response.data);
      return res.json({ data: response.data });
    })
    .catch(err => console.log(err));

});


app.post("/api/getIncome", (req, res) => {

  Axios.get(api_base_url + '/api/persional_details/getIncome', {
    headers: {
      "Authorization": auth.Authorization,
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json"
    },
  })
    .then((response) => {
      // console.log('response',response.data);
      return res.json({ data: response.data });
    })
    .catch(err => console.log(err));

});


app.post("/api/accountType", (req, res) => {

  Axios.get(api_base_url + '/api/persional_details/getAccountType', {
    headers: {
      "Authorization": auth.Authorization,
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json"
    },
  })
    .then((response) => {
      // console.log('response',response.data);
      return res.json({ data: response.data });
    })
    .catch(err => console.log(err));

});


app.post("/api/ifsc_verify", (req, res) => {

  const request_data = {
    "ifsc": req.body.ifsc,
  };

  //return res.json(JSON.stringify(request_data));
  Axios.post(api_base_url + '/api/persional_details/getBankDetailsByIfsc', request_data, {
    headers: {
      "Authorization": auth.Authorization,
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json"
    },
  })
    .then((response) => {
      // console.log('response',response.data);
      return res.json({ status: 200, data: response.data });
    })
    .catch((err) => {
      console.log(err)
      return res.json({ status: 400, data: "Invalid IFSC Code" });
    });

});

app.post("/api/bank_list", (req, res) => {

  //return res.json(JSON.stringify(request_data));
  Axios.get(api_base_url_prod + '/getNSEBank', {
    headers: {
      "Authorization": auth.Authorization,
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json"
    },
  })
    .then((response) => {
      // console.log('response',response.data.data);
      return res.json({ status: 200, data: response.data });
    })
    .catch((err) => console.log(err));

});

app.post("/api/get_Country", (req, res) => {

  //return res.json(JSON.stringify(request_data));
  Axios.get(api_base_url + '/api/persional_details/getCountry', {
    headers: {
      "Authorization": auth.Authorization,
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json"
    },
  })
    .then((response) => {
      // console.log('response',response.data.data);
      return res.json({ status: 200, data: response.data });
    })
    .catch((err) => console.log(err));

});

app.post("/api/StateCitybyPincode", (req, res) => {

  const request_data = {
    "pincode": req.body.pincode,
  };

  //return res.json(JSON.stringify(request_data));
  Axios.post(api_base_url + '/api/persional_details/getStateCitybyPincode', request_data, {
    headers: {
      "Authorization": auth.Authorization,
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json"
    },
  })
    .then((response) => {
      // console.log('response',response.data.data);
      return res.json({ status: 200, data: response.data });
    })
    .catch((err) => console.log(err));

});

app.post("/api/joint_holder", (req, res) => {

  const request_data = {
    "email": req.body.email,
    "phone": req.body.phone,
    "name": req.body.holderName,
    "email_joinholder": req.body.holderEmail,
    "pan": req.body.pan,
    "occupation": req.body.occupation,
    "income_range": req.body.inc_range,
    "place_of_birth": req.body.pob,
    "not_tax_payer_other_country": req.body.tax_payer,
    "not_politically_exposed": req.body.not_politically,
    "dob": req.body.dob,
    "residential_status": req.body.resident,
    "joint_holder": req.body.joint_holder,
    "holding_nature": "AS"
  };

  // return res.json(JSON.stringify(request_data));
  Axios.post(api_base_url + '/api/persional_details/joint_holder', request_data, {
    headers: {
      "Authorization": auth.Authorization,
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json"
    },
  })
    .then((response) => {
      // console.log('response',response.data.data);
      return res.json({ status: 200, data: response.data });
    })
    .catch((err) => console.log(err));

});

app.post("/api/bank_details", (req, res) => {
  const request_data = {
    "email": req.body.email,
    "accountno": req.body.acc_num,
    "c_accountno": req.body.cnf_acc_num,
    "account_type": req.body.acc_type,
    "ifsc": req.body.ifsc,
    "bank": req.body.bank_name,
    "branch": req.body.branch,
    "bank_code": req.body.bank_code,
  };

  //  return res.json(JSON.stringify(request_data));
  Axios.post(api_base_url + '/api/persional_details/bank_details', request_data, {
    headers: {
      "Authorization": auth.Authorization,
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json"
    },
  })
    .then((response) => {
      // console.log('response',response.data);
      return res.json({ data: response.data });
    })
    .catch(err => console.log(err));

});

app.post("/api/nominee", (req, res) => {
  const request_data = {
    "email": req.body.email,
    "name": req.body.name,
    "dob": req.body.dob,
    "relation": req.body.rel,
    "percentage": req.body.perc,
    "guardiun_name": req.body.gud
  };

  // return res.json(JSON.stringify(request_data));
  Axios.post(api_base_url + '/api/persional_details/add_nomini', request_data, {
    headers: {
      "Authorization": auth.Authorization,
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json"
    },
  })
    .then((response) => {
      // console.log('response nominee',response.data);
      return res.json({ data: response.data });
    })
    .catch(err => console.log(err));

});


app.post("/api/get_nomine", (req, res) => {
  const request_data = {
    "email": req.body.email,
  };

  // return res.json(JSON.stringify(request_data));
  Axios.get(api_base_url + '/api/allNominee/' + req.body.email, {
    headers: {
      "Authorization": auth.Authorization,
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json"
    },
  })
    .then((response) => {
      // console.log('response',response.data);
      return res.json({ data: response.data });
    })
    .catch(err => console.log(err));

});


app.post("/api/delete_nominee", (req, res) => {

  const request_data = {
    "nomini_id": req.body.id,
  };
  // return res.json(JSON.stringify(request_data));
  Axios.post(api_base_url + '/api/persional_details/delete_nomini', request_data, {
    headers: {
      "Authorization": auth.Authorization,
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json"
    },
  })
    .then((response) => {
      // console.log('response',response.data);
      return res.json({ data: response.data });
    })
    .catch(err => console.log(err));

});


app.post("/api/update_nominee", (req, res) => {

  const request_data = {
    "nomini_id": req.body.id,
    "email": req.body.email,
    "name": req.body.name,
    "dob": req.body.dob,
    "relation": req.body.rel,
    "percentage": req.body.perc,
    "guardiun_name": req.body.gud
  };

  // console.log('console update_nominee',JSON.stringify(request_data));

  Axios.post(api_base_url + '/api/persional_details/update_nomini', request_data, {
    headers: {
      "Authorization": auth.Authorization,
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json"
    },
  })
    .then((response) => {
      // console.log('response update_nominee',response.data);
      return res.json({ data: response.data });
    })
    .catch(err => console.log(err));

});


app.post("/api/iinCreate", (req, res) => {

  const request_data = {
    "email": req.body.email,
  };

  // return res.json(JSON.stringify(request_data));
  Axios.post(api_base_url + '/api/nse/CreateCustomer', request_data, {
    headers: {
      "Authorization": auth.Authorization,
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json"
    },
  })
    .then((response) => {
      // console.log('response IIN',response.data);
      return res.json({ data: response.data });
    })
    .catch(err => console.log(err));

});


app.post("/api/fatca", (req, res) => {

  const request_data = {
    "email": req.body.email,
  };

  // return res.json(JSON.stringify(request_data));
  Axios.post(api_base_url + '/api/nse/fatca', request_data, {
    headers: {
      "Authorization": auth.Authorization,
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json"
    },
  })
    .then((response) => {
      // console.log('response fatca',response.data);
      return res.json({ data: response.data });
    })
    .catch(err => console.log(err));

});


app.post("/api/uploadImage", (req, res) => {
  // console.log("Email "+req.body.email)
  // console.log(req.file)
  // return res.send(req.file);
  // upload(req, res, (err) => {
  //   if (err) {
  //     console.log('image error',err);
  //     res.sendStatus(500);
  //   }

  const request_data = {
    "email": req.body.email,
    "image": req.body.image
  };
  //console.log("data: "+JSON.stringify(request_data))
  //return res.json(request_data.image);
  Axios.post(api_base_url + '/api/nse/uploadcancelcheck', request_data, {
    headers: {
      "Authorization": auth.Authorization,
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
      "Content-Type": "multipart/form-data"
    },
  })
    .then((response) => {
      // console.log('response',response.data);
      return res.json({ data: response.data });
    })
    .catch(err => console.log(err));

  // });
});

// Get User Profile data
app.post("/api/get_UserProfileData", (req, res) => {
  const request_data = {
    "email": req.body.email,
  };
  Axios.post(api_base_url + '/api/persional_details/getUser_profile', request_data, {
    headers: {
      "Authorization": req.body.token,
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json"
    },
  })
    .then((response) => {
      // console.log('response',response.data);
      return res.json({ LoginUserProfileData: response.data });
    })
    .catch(err => console.log(err));
});

// Get AMC data
app.post("/api/get_AMCData", (req, res) => {
  const request_data = {
    "email": req.body.email,
  };
  Axios.post(api_base_url + '/api/nse/amc', request_data, {
    headers: {
      "Authorization": auth.Authorization,
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json"
    },
  })
    .then((response) => {
      // console.log('response',response.data);
      return res.json({ AMCData: response.data });
    })
    .catch(err => console.log(err));
});

app.post("/api/sipstpuserwise", (req, res) => {

  const request_data = {
    "month": req.body.month,
    "year": req.body.year,
    "pan": req.body.pan
  };
  // console.log(request_data);
  // return false;

  // return res.json(JSON.stringify(request_data));
  Axios.post(api_base_url_wms + '/api/getsipstpuserwise', request_data, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json"
    },
  })
    .then((response) => {
      // console.log('response fatca',response.data);
      return res.json({ data: response.data });
    })
    .catch((err) => {
      return res.json({ status: 400 });
    });

});

app.post("/api/transactionuserwise", (req, res) => {

  const request_data = {
    "month": req.body.month,
    "year": req.body.year,
    "pan": req.body.pan
  };

  // return res.json(JSON.stringify(request_data));
  Axios.post(api_base_url_wms + '/api/gettransactionuserwise', request_data, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json"
    },
  })
    .then((response) => {
      // console.log('response fatca',response.data);
      return res.json({ data: response.data });
    })
    .catch((err) => {
      return res.json({ status: 400 });
    });

});

app.post("/api/taxsavinguserwise", (req, res) => {

  const request_data = {
    "fromyear": req.body.fromyear,
    "toyear": req.body.toyear,
    "pan": req.body.pan
  };

  //  res.json(JSON.stringify(request_data));
  Axios.post(api_base_url_wms + '/api/gettaxsavinguserwise', request_data, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json"
    },
  })
    .then((response) => {
      // console.log('response taxsavinguserwise',response.data);
      return res.json({ data: response.data });
    })
    .catch((err) => {
      return res.json({ status: 400 });
    });

});


app.post("/api/dividend", (req, res) => {

  const request_data = {
    "fromyear": req.body.fromyear,
    "toyear": req.body.toyear,
    "pan": req.body.pan
  };

  // return res.json(JSON.stringify(request_data));
  Axios.post(api_base_url_wms + '/api/getdividend', request_data, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json"
    },
  })
    .then((response) => {
      // console.log('response fatca',response.data);
      return res.json({ data: response.data });
    })
    .catch((err) => {
      return res.json({ status: 400 });
    });

});


app.post("/api/dividendscheme", (req, res) => {

  const request_data = {
    "fromyear": req.body.fromyear,
    "toyear": req.body.toyear,
    "pan": req.body.pan,
    "scheme": req.body.scheme
  };

  // return res.json(JSON.stringify(request_data));
  Axios.post(api_base_url_wms + '/api/getdividendscheme', request_data, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json"
    },
  })
    .then((response) => {
      // console.log('response fatca',response.data);
      return res.json({ data: response.data });
    })
    .catch((err) => {
      console.log('error', err);
      return res.json({ status: 400 });
    });

});

app.post("/api/User_profile", (req, res) => {

  const request_data = {
    email: req.body.email
  };
  console.log("req.body.email", request_data.email);
  // return res.json(JSON.stringify(request_data)); 
  Axios.get('https://mfprodigy.bfccapital.com/api/persional_details/getUser_profile?email=' + request_data.email, {
    headers: {
      "Authorization": auth.Authorization,
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json"
    },
  })
    .then((response) => {
      console.log('response User_profile', response);
      return res.json({ status: 200, data: response.data });
    })
    .catch((err) => {
      console.log('error', err);
      return res.json({ status: 400 });
    });

});

app.post("/api/amc", function (req, res) {
  //console.log("dshgjagdhsj")
  Axios.get(api_base_url_prod + '/amcApiNew', {
    headers: {
      "Authorization": auth.Authorization,
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json"
    },
  })
    .then((response) => {
      // console.log('response AMC',response.data);
      return res.json({ data: response.data });
    })
    .catch((err) => {
      // console.log('error',err);
      return res.json({ status: 400 });
    });

});


app.post("/api/amclist", function (req, res) {

  const request_data = {
    "pan": req.body.pan_card,
    "guard_pan": req.body.guard_pan
  };

  Axios.post(api_base_url_wms + '/api/getamclist', request_data, {
    headers: {
      "Authorization": auth.Authorization,
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json"
    },
  })
    .then((response) => {
      // console.log('response AMC list',response.data);
      return res.json({ data: response.data });
    })
    .catch((err) => {
      // console.log('error',err);
      return res.json({ status: 400 });
    });

});



app.post("/api/getAmcFolioViaProfile", function (req, res) {

  const request_data = {
    "investor_pan": req.body.investor_pan,
    "guard_pan": req.body.guard_pan,
    "jh1_pan": req.body.jh1_pan,
    "jh2_pan": req.body.jh2_pan
  };

  Axios.post(api_base_url_wms + '/api/getAmcFolioViaProfile', request_data, {
    headers: {
      "Authorization": auth.Authorization,
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json"
    },
  })
    .then((response) => {
      // console.log('response AMC list',response.data);
      return res.json({ data: response.data });
    })
    .catch((err) => {
      // console.log('error',err);
      return res.json({ status: 400 });
    });

});


app.post("/api/schemelist", function (req, res) {

  const request_data = {
    "folio": req.body.folio
  };

  Axios.post(api_base_url_wms + '/api/getschemelist', request_data, {
    headers: {
      "Authorization": auth.Authorization,
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json"
    },
  })
    .then((response) => {
      // console.log('response schemelist',response.data);
      return res.json({ data: response.data });
    })
    .catch((err) => {
      // console.log('error',err);
      return res.json({ status: 400 });
    });

});


app.post("/api/regularSWP", function (req, res) {

  const request_data = {
    "email": req.body.email,
    "trxn_type": "SWP",
    "trxn_acceptance": "ALL",
    "sip_paymech": "M",
    "debit_amt_type": "M",
    "perpetual_flag": "N",
    "until_cancelled": "N",
    "amt_unit_type": "AMOUNT",
    "all_unit": "N",
    "payment_mode": "M",
    "ach_amt": "",
    "ach_fromdate": "",
    "ach_enddate": "",
    "umrn": "",
    "input_ref_no": "",
    "ach_exist": "",
    "frequency": "",
    "transfer_date": "",
    "amc": req.body.amc,
    "product_code": req.body.product_code,
    "reinvest": req.body.reinvest,
    "amt_unit": req.body.amt_unit,
    "from_date": req.body.from_date,
    "to_date": req.body.to_date,
    "periodicity": req.body.periodicity,
    "period_day": req.body.period_day,
    "amount": req.body.amount,
    "sip_from_date": req.body.sip_from_date,
    "sip_end_date": req.body.sip_end_date,
    "sip_freq": req.body.sip_freq,
    "sip_amount": req.body.sip_amount,
    "sip_period_day": req.body.sip_period_day,
    "iin": req.body.iin,
    "folio": req.body.folio,
    "instrm_amount": req.body.instrm_amount
  };

  Axios.post(api_base_url_prod + '/regularSIP', request_data, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json"
    },
  })
    .then((response) => {
      // console.log('response SWP',response.data);
      return res.json({ data: response.data });
    })
    .catch((err) => {
      // console.log('error',err);
      return res.json({ status: 400 });
    });

});

app.post("/api/targetScheme", function (req, res) {

  const request_data = {
    "AMC_CODE": req.body.AMC_CODE,
    "ASSET_CLASS": req.body.ASSET_CLASS,
    "DIV_GW": req.body.DIV_GW,
    "REINVEST_TAG": ""
  }

  Axios.post(api_base_url_prod + '/productApiNew', request_data, {
    headers: {
      "Authorization": auth.Authorization,
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json"
    },
  })
    .then((response) => {
      //  console.log('response targetScheme',response.data);
      return res.json({ data: response.data });
    })
    .catch((err) => {
      // console.log('error',err);
      return res.json({ status: 400 });
    });

});

app.post("/api/regularSTP", function (req, res) {

  const request_data = {
    "email": req.body.email,
    "trxn_type": "STP",
    "trxn_acceptance": "ALL",
    "sip_paymech": "M",
    "debit_amt_type": "M",
    "perpetual_flag": "N",
    "until_cancelled": "N",
    "amt_unit_type": "AMOUNT",
    "all_unit": "N",
    "payment_mode": "M",
    "ach_amt": "",
    "ach_fromdate": "",
    "ach_enddate": "",
    "umrn": "",
    "input_ref_no": "",
    "ach_exist": "",
    "frequency": "",
    "transfer_date": "",
    "amc": req.body.amc,
    "product_code": req.body.product_code,
    "target_product": req.body.target_scheme,
    "reinvest": req.body.reinvest,
    "amt_unit": req.body.amt_unit,
    "from_date": req.body.from_date,
    "to_date": req.body.to_date,
    "periodicity": req.body.periodicity,
    "period_day": req.body.period_day,
    "amount": req.body.amount,
    "sip_from_date": req.body.sip_from_date,
    "sip_end_date": req.body.sip_end_date,
    "sip_freq": req.body.sip_freq,
    "sip_amount": req.body.sip_amount,
    "sip_period_day": req.body.sip_period_day,
    "iin": req.body.iin,
    "folio": req.body.folio,
    "instrm_amount": req.body.instrm_amount
  };

  Axios.post(api_base_url_prod + '/regularSIP', request_data, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json"
    },
  })
    .then((response) => {
      // console.log('response SWP',response.data);
      return res.json({ data: response.data });
    })
    .catch((err) => {
      // console.log('error',err);
      return res.json({ status: 400 });
    });

});

app.post("/api/mandateList", function (req, res) {

  const request_data = {
    "email": req.body.email,
    "iin": req.body.IIN
  };

  Axios.post(api_base_url_prod + '/getmandatelist', request_data, {
    headers: {
      "Authorization": auth.Authorization,
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json"
    },
  })
    .then((response) => {
      //  console.log('response Mandate list',response.data);
      return res.json({ data: response.data });
    })
    .catch((err) => {
      // console.log('error',err);
      return res.json({ status: 400 });
    });

});

app.post("/api/regularSIP", function (req, res) {

  const request_data = {
    "email": req.body.email,
    "trxn_type": "SIP",
    "trxn_acceptance": "ALL",
    "sip_paymech": "M",
    "debit_amt_type": "M",
    "until_cancelled": "N",
    "amt_unit_type": "AMOUNT",
    "all_unit": "N",
    "payment_mode": "M",
    "ach_amt": "",
    "ach_fromdate": "",
    "ach_enddate": "",
    "ach_exist": "",
    "frequency": "",
    "transfer_date": "",
    "input_ref_no": req.body.input_ref_no,
    "perpetual_flag": req.body.perpetual_flag,
    "amc": req.body.amc,
    "product_code": req.body.product_code,
    "target_product": req.body.target_scheme,
    "reinvest": req.body.reinvest,
    "amt_unit": req.body.amt_unit,
    "from_date": req.body.from_date,
    "to_date": req.body.to_date,
    "periodicity": req.body.periodicity,
    "period_day": req.body.period_day,
    "amount": req.body.amount,
    "sip_from_date": req.body.sip_from_date,
    "sip_end_date": req.body.sip_end_date,
    "sip_freq": req.body.sip_freq,
    "sip_amount": req.body.sip_amount,
    "sip_period_day": req.body.sip_period_day,
    "iin": req.body.iin,
    "folio": req.body.folio,
    "instrm_amount": req.body.instrm_amount,
    "bank_code": req.body.bank_code,
    "holder_name": req.body.holder_name,
    "accountNo": req.body.accountNo,
    "acoount_type": req.body.acoount_type,
    "branch": req.body.branch,
    "umrn": req.body.umrn,
  };

  Axios.post(api_base_url_prod + '/purchase_sip', request_data, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json"
    },
  })
    .then((response) => {
      // console.log('response SWP',response.data);
      return res.json({ data: response.data });
    })
    .catch((err) => {
      // console.log('error',err);
      return res.json({ status: 400 });
    });

});

app.post("/api/multi_purchase_sip", function (req, res) {

  const request_data = {
    "email": req.body.email,
    "sub_trxn_type": "S",
    "trxn_acceptance": "ALL",
    "payment_mode": "M",
    "debit_amount_type": "M",
    "ach_exist": "Y",
    "return_paymnt_flag": "Y",
    "client_callback_url": "API URL",
    "instrm_date": "",
    "transfer_date": "",
    "instrm_amount": req.body.instrm_amount,
    "bank_code": req.body.bank_code,
    "holder_name": req.body.holder_name,
    "accountNo": req.body.accountNo,
    "acoount_type": req.body.acoount_type,
    "branch": req.body.branch,
    "umrn": req.body.umrn,
    "iin": req.body.iin,
    "ach_amt": req.body.ach_amt,
    "ach_fromdate": req.body.ach_fromdate,
    "ach_enddate": req.body.ach_enddate,
    "until_cancelled": req.body.until_cancelled,
    "childArr": req.body.childArr,
  };

  //return res.json({data:request_data});
  Axios.post(api_base_url_prod + '/multi_purchase_sip', request_data, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json"
    },
  })
    .then((response) => {
      // console.log('response SWP',response.data);
      return res.json({ data: response.data });
    })
    .catch((err) => {
      // console.log('error',err);
      return res.json({ status: 400 });
    });

});

app.post("/api/multi_regularSIP", function (req, res) {

  const request_data = {
    "email": req.body.email,
    "trxn_type": "SIP",
    "trxn_acceptance": "ALL",
    "payment_mode": "M",
    "debit_amount_type": "M",
    "ach_exist": "Y",
    "sip_paymech": "M",
    "return_paymnt_flag": "Y",
    "client_callback_url": "API URL",
    "instrm_date": "",
    "transfer_date": "",
    "frequency": "ONCE A MONTH",
    "instrm_amount": req.body.instrm_amount,
    "bank_code": req.body.bank_code,
    "holder_name": req.body.holder_name,
    "accountNo": req.body.accountNo,
    "branch": req.body.branch,
    "umrn": req.body.umrn,
    "iin": req.body.iin,
    "ach_amt": req.body.ach_amt,
    "ach_fromdate": req.body.ach_fromdate,
    "ach_enddate": req.body.ach_enddate,
    "until_cancelled": req.body.until_cancelled,
    "childArr": req.body.childArr,
  };

  //return res.json({data:request_data});
  Axios.post(api_base_url_prod + '/multi_regularSIP', request_data, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json"
    },
  })
    .then((response) => {
      // console.log('response SIP',response.data);
      return res.json({ data: response.data });
    })
    .catch((err) => {
      // console.log('error',err);
      return res.json({ status: 400 });
    });

});

app.post("/api/multi_regularSTP", function (req, res) {

  const request_data = {
    "email": req.body.email,
    "payment_mode": req.body.payment_mode,
    "trxn_type": req.body.trxn_type,
    "trxn_acceptance": req.body.trxn_acceptance,
    "ach_exist": req.body.ach_exist,
    "sip_paymech": req.body.sip_paymech,
    "umrn": req.body.umrn,
    "ach_amt": req.body.ach_amt,
    "ach_fromdate": req.body.ach_fromdate,
    "frequency": req.body.frequency,
    "until_cancelled": req.body.until_cancelled,
    "ach_enddate": req.body.ach_enddate,
    "transfer_date": req.body.transfer_date,
    "debit_amount_type": req.body.debit_amount_type,
    "return_paymnt_flag": req.body.return_paymnt_flag,
    "client_callback_url": req.body.client_callback_url,
    "instrm_date": req.body.instrm_date,
    "iin": req.body.iin,
    "holder_name": req.body.holder_name,
    "accountNo": req.body.bank_code,
    "bank_code": req.body.bank_code,
    "branch": req.body.branch,
    "instrm_amount": req.body.instrm_amount,
    "childArr": req.body.childArr,
  };

  //return res.json({data:request_data});
  Axios.post(api_base_url_prod + '/multi_regularSIP', request_data, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json"
    },
  })
    .then((response) => {
      // console.log('response SIP',response.data);
      return res.json({ data: response.data });
    })
    .catch((err) => {
      // console.log('error',err);
      return res.json({ status: 400 });
    });

});


app.post("/api/get_user_profile", function (req, res) {

  Axios.get(api_base_url_prod + '/users/' + req.body.email, {
    headers: {
      "Authorization": auth.Authorization,
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json"
    },
  })
    .then((response) => {
      // console.log('response User_profile',response.data);
      return res.json({ data: response.data });
    })
    .catch((err) => {
      // console.log('error',err);
      return res.json({ status: 400 });
    });
});

app.post("/api/foliodetail", function (req, res) {

  const request_data = {
    "folio": req.body.folio,
    "isin": req.body.isin,
    "prodcode": req.body.prodcode,
    "amc_code": req.body.amc_code
  };
  //return res.json({data:request_data});
  Axios.post(api_base_url_wms + '/api/getfoliodetail', request_data, {
    headers: {
      "Authorization": auth.Authorization,
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json"
    },
  })
    .then((response) => {
      // console.log('response unit',response.data);
      return res.json({ data: response.data });
    })
    .catch((err) => {
      // console.log('error',err);
      return res.json({ status: 400 });
    });

});

app.post("/api/redeem", function (req, res) {

  const request_data = {
    "email": req.body.email,
    "trxn_acceptance": "ALL",
    "remark": "",
    "input_ref_no": "",
    "amc": req.body.amc,
    "product_code": req.body.product_code,
    "folio": req.body.folio,
    "iin": req.body.iin,
    "all_units": req.body.all_units,
    "amt_unit_type": req.body.amt_unit_type,
    "amt_unit": req.body.amt_unit
  }
  // return res.json({data:request_data});
  Axios.post(api_base_url_prod + '/redeem', request_data, {
    headers: {
      "Authorization": auth.Authorization,
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json"
    },
  })
    .then((response) => {
      // console.log('response unit',response.data);
      return res.json({ data: response.data });
    })
    .catch((err) => {
      console.log('error', err);
      return res.json({ status: 400 });
    });

});


app.post("/api/multi_redeem", function (req, res) {

  const request_data = {
    "email": req.body.email,
    "iin": req.body.iin,
    "trxn_acceptance": req.body.trxn_acceptance,
    "childArr": req.body.childArr,

  }
  //return res.json({data:request_data});
  Axios.post(api_base_url_prod + '/multi_redeem', request_data, {

    headers: {
      "Authorization": auth.Authorization,
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json"
    },
  })
    .then((response) => {
      // console.log('response switch',response.data);
      return res.json({ data: response.data });
    })
    .catch((err) => {
      // console.log('error',err);
      return res.json({ status: 400 });
    });

});

app.post("/api/switch", function (req, res) {

  const request_data = {
    "email": req.body.email,
    "trxn_acceptance": req.body.trxn_acceptance,
    "remark": req.body.remark,
    "input_ref_no": req.body.input_ref_no,
    "trxn_execution": req.body.trxn_execution,
    "amc": req.body.amc,
    "product_code": req.body.product_code,
    "folio": req.body.folio,
    "iin": req.body.iin,
    "all_units": req.body.all_units,
    "amt_unit_type": req.body.amt_unit_type,
    "amt_unit": req.body.amt_unit,
    "target_ft_acc_no": req.body.target_ft_acc_no,
    "target_product_code": req.body.target_product_code,
    "trxn_execution": req.body.trxn_execution,
    "reinvest": req.body.reinvest
  }
  //return res.json({data:request_data});
  Axios.post(api_base_url_prod + '/switch', request_data, {

    headers: {
      "Authorization": auth.Authorization,
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json"
    },
  })
    .then((response) => {
      // console.log('response switch',response.data);
      return res.json({ data: response.data });
    })
    .catch((err) => {
      // console.log('error',err);
      return res.json({ status: 400 });
    });

});



app.post("/api/multi_switch", function (req, res) {

  const request_data = {
    "email": req.body.email,
    "iin": req.body.iin,
    "trxn_acceptance": req.body.trxn_acceptance,
    "childArr": req.body.childArr,

  }
  //return res.json({data:request_data});
  Axios.post(api_base_url_prod + '/multi_switch', request_data, {

    headers: {
      "Authorization": auth.Authorization,
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json"
    },
  })
    .then((response) => {
      // console.log('response switch',response.data);
      return res.json({ data: response.data });
    })
    .catch((err) => {
      // console.log('error',err);
      return res.json({ status: 400 });
    });

});

app.post("/api/getbankList", (req, res) => {

  const request_data = {
    email: req.body.email,
    iin: req.body.iin
  };

  //return res.json(JSON.stringify(request_data));
  Axios.post(api_base_url_prod + '/getBankMultipleFromNse?email=' + request_data.email + "&iin=" + request_data.iin, {
    headers: {
      "Authorization": auth.Authorization,
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json"
    },
  })
    .then((response) => {
      // console.log('response getbankList',response.data);
      return res.json({ data: response.data });
    })
    .catch((err) => {
      // console.log('error',err);
      return res.json({ status: 400 });
    });

});

app.post("/api/purchase", function (req, res) {

  const request_data = {
    "email": req.body.email,
    "debit_amount_type": req.body.debit_amount_type,
    "input_ref_no": req.body.input_ref_no,
    "perpetual_flag": req.body.perpetual_flag,
    "instrm_date": req.body.instrm_date,
    "accountNo": req.body.accountNo,
    "bank_code": req.body.bank_code,
    "fscode": req.body.fscode,
    "rtgs_code": req.body.rtgs_code,
    "branch": req.body.branch,
    "sub_trxn_type": req.body.sub_trxn_type,
    "trxn_acceptance": req.body.trxn_acceptance,
    "payment_mode": req.body.payment_mode,
    "holder_name": req.body.holder_name,
    "ach_exist": req.body.ach_exist,
    "client_callback_url": req.body.client_callback_url,
    "iin": req.body.iin,
    "instrm_amount": req.body.instrm_amount,
    "Return_paymnt_flag": req.body.Return_paymnt_flag,
    "umrn": req.body.umrn,
    "childArr": req.body.childArr
  }

  //return res.json({data:request_data});
  Axios.post(api_base_url_prod + '/multi_purchase', request_data, {
    headers: {
      "Authorization": auth.Authorization,
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json"
    },
  })
    .then((response) => {
      console.log('response purchase', response.data);
      return res.json({ data: response.data });
    })
    .catch((err) => {
      // console.log('error',err);
      return res.json({ status: 400 });
    });

});

app.post("/api/myOrder", function (req, res) {

  const request_data = {
    "email": req.body.email,
    "from_date": req.body.from_date,
    "to_date": req.body.to_date,
    "trxn_type": req.body.trxn_type,
    "iin": req.body.iin,
    "trxn_status": req.body.trxn_status
  };

  Axios.post('https://mfprodigy.bfccapital.com/api/nse/transaction_status', request_data, {
    headers: {
      "Authorization": auth.Authorization,
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json"
    },
  })
    .then((response) => {
      // console.log('response order',response.data);
      return res.json({ data: response.data });
    })
    .catch(err => {
      console.log(err);
    });
})

app.post("/api/PANVerification", (req, res) => {
  const request_data = {
    "memberPan": req.body.memberPan,
    "adminPan": req.body.adminPan,
  };

  // return res.json(JSON.stringify(request_data));

  Axios.post(api_base_url_wms + '/api/PANVerification', request_data, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json"
    },
  })
    .then((response) => {
      // console.log('PANVerification',response.data);
      return res.json({ data: response.data });
    })
    .catch(err => console.log(err));

});

app.post("/api/AddFamily", (req, res) => {
  const request_data = {
    "memberPan": req.body.memberPan,
    "memberRelation": req.body.memberRelation,
    "otp": req.body.otp,
    "adminPan": req.body.adminPan
  };

  // console.log(request_data)

  Axios.post(api_base_url_wms + '/api/verifiyPanOtpAddFamily', request_data, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json"
    },
  })
    .then((response) => {
      // console.log('verifiyPanOtpAddFamily',response.data);
      return res.json({ data: response.data });
    })
    .catch(err => console.log(err));

});

app.post("/api/primaryBank", (req, res) => {

  const request_data = {
    "email": req.body.email,
    "iin": req.body.iin,
    "acc_no": req.body.acc_no,
    "bank_name": req.body.bank_name,
    "default_bank": req.body.default_bank
  };

  // return res.json(JSON.stringify(request_data));
  Axios.post(api_base_url_prod + '/setdefaultbank', request_data, {
    headers: {
      "Authorization": auth.Authorization,
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json"
    },
  })
    .then((response) => {
      // console.log('response primaryBank',response.data);
      return res.json({ data: response.data });
    })
    .catch((err) => {
      // console.log('error',err);
      return res.json({ status: 400 });
    });

});

app.post("/api/deleteBank", (req, res) => {

  const request_data = {
    "broker_code": "ARN-21399",
    "appln_id": "MFS21399",
    "password": "CO3062WOJ1RPXM19",
    "process_flag": "D",
    "acc_type": "",
    "ifsc_code": "",
    "micr_no": "",
    "branch_name": "",
    "branch_address1": "",
    "branch_address2": "",
    "branch_address3": "",
    "branch_city": "",
    "branch_country": "",
    "branch_pincode": "",
    "proof_of_account": "Original cancelled cheque",
    "iin": req.body.iin,
    "acc_no": req.body.acc_no,
    "bank_name": req.body.bank_name
  };

  // return res.json(JSON.stringify(request_data));
  Axios.post(api_base_url_prod + '/bankmandateregstration', request_data, {
    headers: {
      "Authorization": auth.Authorization,
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json"
    },
  })
    .then((response) => {
      // console.log('response primaryBank',response.data);
      return res.json({ data: response.data });
    })
    .catch((err) => {
      // console.log('error',err);
      return res.json({ status: 400 });
    });

});

app.post("/api/getBasketList", (req, res) => {

  const request_data = {
    "transaction_type": req.body.transaction_type,
    "anchoring": req.body.anchoring,
    "constellation": req.body.constellation,
  };

  // return res.json(JSON.stringify(request_data));
  Axios.post(api_base_url_prod + '/getBasketList', request_data, {
    headers: {
      "Authorization": auth.Authorization,
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json"
    },
  })
    .then((response) => {
      // console.log('response getBasketList',response.data);
      return res.json({ data: response.data });
    })
    .catch((err) => {
      // console.log('error',err);
      return res.json({ status: 400 });
    });

});

/*app.post("/api/ProductViaISIN", (req, res) => {

  const request_data = {
      "isin":req.body.isin,
  };
  
  Axios.post(api_base_url_prod+'/getProductViaISIN',request_data, {
    headers: {
      "Authorization":auth.Authorization,
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json"
    },      
  })      
  .then((response) => {
    // console.log('response ProductViaISIN',response.data);
    return res.json({data:response.data});
  })
  .catch((err) =>{
    // console.log('error',err);
    return res.json({status:400});
  } );

});*/


app.post("/api/ProductViaISIN", (req, res) => {

  const request_data = {
    "isin": req.body.isin,
    "amc_code": req.body.amc_code
  };

  Axios.post(api_base_url_prod + '/getProductViaIsinAmc', request_data, {
    headers: {
      "Authorization": auth.Authorization,
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json"
    },
  })
    .then((response) => {
      console.log('response ProductViaISIN', response.data);
      return res.json({ data: response.data });
    })
    .catch((err) => {
      // console.log('error',err);
      return res.json({ status: 400 });
    });

});

app.post("/api/purchase_save", (req, res) => {

  const request_data = {
    "accountNo": req.body.accountNo,
    "bank_code": req.body.bank_code,
    "fscode": req.body.fscode,
    "rtgs_code": req.body.rtgs_code,
    "branch": req.body.branch,
    "email": req.body.email,
    "sub_trxn_type": req.body.sub_trxn_type,
    "trxn_acceptance": req.body.trxn_acceptance,
    "payment_mode": req.body.payment_mode,
    "instrm_amount": req.body.instrm_amount,
    "amount": req.body.amount,
    "amc": req.body.amc,
    "umrn": req.body.umrn,
    "product_code": req.body.product_code,
    "reinvest": req.body.reinvest,
    "debit_amount_type": req.body.debit_amount_type,
    "input_ref_no": req.body.input_ref_no,
    "perpetual_flag": req.body.perpetual_flag,
    "instrm_date": req.body.instrm_date,
    "Client_callback_url": req.body.Client_callback_url,
    "ach_exist": req.body.ach_exist,
    "folio": req.body.folio,
    "Return_paymnt_flag": req.body.Return_paymnt_flag,
    "holder_name": req.body.holder_name,
    "iin": req.body.iin
  }

  Axios.post(api_base_url_prod + '/purchase', request_data, {
    headers: {
      "Authorization": auth.Authorization,
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json"
    },
  })
    .then((response) => {
      // console.log('response purchase',response.data);
      return res.json({ data: response.data });
    })
    .catch((err) => {
      // console.log('error',err);
      return res.json({ status: 400 });
    });

});




app.post("/api/usergoaldata", (req, res) => {

  const request_data = {
    "email": req.body.email,
  };

  Axios.post(api_base_url_prod + '/getusergoaldata', request_data, {
    headers: {
      "Authorization": auth.Authorization,
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json"
    },
  })
    .then((response) => {
      // console.log('response usergoaldata',response.data);
      return res.json({ data: response.data });
    })
    .catch((err) => {
      console.log('error', err);
      return res.json({ status: 400 });
    });

});


app.post("/api/sipData", (req, res) => {


  Axios.post('https://mfapi.advisorkhoj.com/calc/getTargetAmountSIPCalcResult?wealth_amount=' + req.body.wealth_amount + '&inflation_rate=0&expected_return=12&period=' + req.body.period + '&key=3cd5b774-7cf6-4d0d-8bab-967f8a56797d', {
    headers: {
      "Authorization": auth.Authorization,
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json"
    },
  })
    .then((response) => {
      // console.log('response sipData',response.data);
      return res.json({ data: response.data });
    })
    .catch((err) => {
      console.log('error', err);
      return res.json({ status: 400 });
    });
});



app.post("/api/saveusergoaldata", (req, res) => {

  const request_data = {
    "Email": req.body.email,
    "Goal_Id": req.body.goal_name,
    "Tenure": req.body.tenure,
    "Purchase_Cost": req.body.purchase_cost
  };


  // return res.json({data:JSON.stringify(request_data)});
  Axios.post(api_base_url_prod + '/saveusergoaldata', request_data, {
    headers: {
      "Authorization": auth.Authorization,
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json"
    },
  })
    .then((response) => {
      // console.log('response saveusergoaldata',response.data);
      return res.json({ data: response.data });
    })
    .catch((err) => {
      console.log('error', err);
      return res.json({ status: 400 });
    });

});

app.post("/api/delete_goal", (req, res) => {

  const request_data = {
    "goal_userId": req.body.goal_userId,
  };


  // return res.json({data:JSON.stringify(request_data)});
  Axios.post(api_base_url_prod + '/deleteusergoal', request_data, {
    headers: {
      "Authorization": auth.Authorization,
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json"
    },
  })
    .then((response) => {
      // console.log('response goal_userId',response.data);
      return res.json({ data: response.data });
    })
    .catch((err) => {
      console.log('error', err);
      return res.json({ status: 400 });
    });

});



app.post("/api/creatMandate", (req, res) => {

  const request_data = {
    "email": req.body.email,
    "ach_fromdate": req.body.ach_fromdate,
    "ach_todate": req.body.ach_todate,
    "ach_amount": req.body.ach_amount,
    "process_mode": req.body.process_mode,
    "client_callback_url": req.body.client_callback_url,
    "ifsc_code": req.body.ifsc_code,
    "bank_code": req.body.bank_code,
    "acc_no": req.body.acc_no,
    "acc_type": req.body.acc_type,
    "branch_name": req.body.branch_name,
    "channel_type": req.body.channel_type,
    "iin": req.body.iin
  };


  // return res.json({data:JSON.stringify(request_data)});
  Axios.post(api_base_url_prod + '/create_mandate', request_data, {
    headers: {
      "Authorization": auth.Authorization,
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json"
    },
  })
    .then((response) => {
      // console.log('response creatMandate',response.data);
      return res.json({ data: response.data });
    })
    .catch((err) => {
      console.log('error', err);
      return res.json({ status: 400 });
    });

});


app.post("/api/getIfsc", (req, res) => {
  const request_data = {
    "ifsc": req.body.ifsc,
  };

  // return res.json({data:JSON.stringify(request_data)});
  Axios.post(api_base_url + '/api/persional_details/getBankDetailsByIfsc', request_data, {
    headers: {
      "Authorization": auth.Authorization,
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json"
    },
  })
    .then((response) => {
      // console.log('response getIfsc',response.data);
      return res.json({ data: response.data });
    })
    .catch((err) => {
      console.log('error', err);
      return res.json({ status: 400 });
    });
});


app.post("/api/addBank", (req, res) => {
  const request_data = {
    "broker_code": req.body.broker_code,
    "appln_id": req.body.appln_id,
    "password": req.body.password,
    "process_flag": req.body.process_flag,
    "iin": req.body.iin,
    "acc_no": req.body.acc_no,
    "acc_type": req.body.acc_type,
    "ifsc_code": req.body.ifsc_code,
    "micr_no": "",
    "bank_name": req.body.bank_name,
    "branch_name": req.body.branch_name,
    "branch_address1": "",
    "branch_address2": "",
    "branch_address3": "",
    "branch_city": "",
    "branch_country": "",
    "branch_pincode": "",
    "proof_of_account": req.body.proof_of_account
  };

  Axios.post(api_base_url_prod + "/bankmandateregstration", request_data, {
    headers: {
      "Authorization": auth.Authorization,
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json"
    },
  })
    .then((response) => {
      console.log('response addBank', response.data);
      return res.json({ data: response.data });
    })
    .catch((err) => {
      console.log('error', err);
      return res.json({ status: 400 });
    });
});


app.post("/api/isPANexist", (req, res) => {
  const request_data = {
    "memberPan": req.body.pan_numbers,
  };

  Axios.post(api_base_url_wms + '/api/isPANexist', request_data, {
    headers: {
      "Authorization": auth.Authorization,
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json"
    },
  })
    .then((response) => {
      // console.log('response isPANexist',response.data);
      return res.json({ data: response.data });
    })
    .catch((err) => {
      // console.log('error',err);
      return res.json({ status: 400 });
    });
});


app.post("/api/portfolio", (req, res) => {

  const request_data = {
    "pan": req.body.pan_card,
  };

  Axios.post(api_url_wms + '/api/portfolio_api_data', request_data, {
    headers: {
      "Authorization": auth.Authorization,
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json"
    },
  })
    .then((response) => {
      // console.log('response portfolio',response.data);
      return res.json({ data: response.data });
    })
    .catch((err) => {
      return res.json({ status: 400 });
    });
});

app.post("/api/portfolioDetailApi", (req, res) => {
  const data = {
    "name": req.body.name,
    "pan": req.body.pan,
    "guard_pan": req.body.guard_pan
  };

  // return res.json({data:JSON.stringify(request_data)});
  Axios.post('https://mfprodigy.bfccapital.com/wmsapi/api/portfolio_detailapi_data', data, {
    headers: {
      "Authorization": auth.Authorization,
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json"
    },
  })
    .then((response) => {
      // console.log('response portfolioDetailApi',response.data.data.portfolio_data);
      return res.json({ data: response.data });
    })
    .catch((err) => {
      return res.json({ status: 400 });
    });
});

app.post("/api/snapShot", (req, res) => {
  const data = {
    "name": req.body.name,
    "pan": req.body.pan
  };

  // return res.json({data:JSON.stringify(request_data)});
  Axios.post(api_url_wms + '/api/snapshot', data, {
    headers: {
      "Authorization": auth.Authorization,
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json"
    },
  })
    .then((response) => {
      // console.log('response snapshot',response.data.data.portfolio_data);
      return res.json({ data: response.data });
    })
    .catch((err) => {
      return res.json({ status: 400 });
    });
});

app.post("/api/sip_stp_swp_report", (req, res) => {
  const request_data = {
    "email": req.body.email,
    "from_date": req.body.from_date,
    "to_date": req.body.to_date,
    "trxn_type": req.body.trxn_type,
    "iin": req.body.iin,
  };

  // return res.json({data:JSON.stringify(request_data)});
  Axios.post(api_base_url + '/api/sip_stp_swp_report', request_data, {
    headers: {
      "Authorization": auth.Authorization,
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json"
    },
  })
    .then((response) => {
      // console.log('response sip_stp_swp_report',response.data);
      return res.json({ data: response.data });
    })
    .catch((err) => {
      return res.json({ status: 400 });
    });
});

app.post("/api/getQueryTopics", (req, res) => {
  Axios.get(api_base_url + '/api/getQueryTopics', {
    headers: {
      "Authorization": auth.Authorization,
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json"
    },
  })
    .then((response) => {
      // console.log('response getQueryTopics',response.data);
      return res.json({ data: response.data });
    })
    .catch((err) => {
      return res.json({ status: 400 });
    });
});



app.post("/api/raise_query", (req, res) => {
  const request_data = {
    "topic": req.body.query_name,
    "phone": req.body.mobile,
    "email": req.body.emailId,
    "description": req.body.query_msg,
  };

  // return res.json({data:JSON.stringify(request_data)});
  Axios.post(api_base_url + '/api/raise_query', request_data, {
    headers: {
      "Authorization": auth.Authorization,
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json"
    },
  })
    .then((response) => {
      // console.log('response raise_query',response.data);
      return res.json({ data: response.data });
    })
    .catch((err) => {
      return res.json({ status: 400 });
    });
});

app.post("/api/mobileLogin", function (req, res) {

  const request_data = {
    "mobileno": req.body.mobile,
  };

  // return res.json({data:req.body.email});
  Axios.post(api_base_url + '/api/mobileLogin', request_data, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json"
    },
  })
    .then((response) => {
      console.log(response.data);
      return res.json({ status: 200, data: response.data });
    })
    .catch(err => {
      console.log(JSON.stringify(err));
      return res.send({ status: 400, massage: "Invalid Credentials" });
    });

})


app.post("/api/getSipStpSwpDates", (req, res) => {

  Axios.get(api_base_url_prod + '/getSipStpSwpDates?amc_code=' + req.body.amc_code + '&product_code=' + req.body.product_code + '&isin=' + req.body.isin, {
    headers: {
      "Authorization": auth.Authorization,
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json"
    },
  })
    .then((response) => {
      // console.log('response getQueryTopics',response.data);
      return res.json({ data: response.data });
    })
    .catch((err) => {
      return res.json({ status: 400 });
    });
});




app.post("/api/portfolio_FolioDetails", (req, res) => {
  const data = {
    "folio": req.body.folio_No,
    "prodcode": req.body.product_code
  };

  // return res.json({data:JSON.stringify(request_data)});
  Axios.post('https://mfprodigy.bfccapital.com/wmsapi/api/portfolio_FolioDetails', data, {
    headers: {
      "Authorization": auth.Authorization,
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json"
    },
  })
    .then((response) => {
      console.log('response portfolioDetailApi', response.data);
      return res.json({ data: response.data });
    })
    .catch((err) => {
      console.log('response portfolioDetailApi', err);
      return res.json({ status: 400 });
    });
});

app.post("/api/mobileLoginOtp", function (req, res) {

  const request_data = {
    "otp": req.body.otp,
    "email": req.body.email
  };

  // return res.json({data:req.body.email});
  Axios.post(api_base_url + '/api/mobileLoginOtp', request_data, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json"
    },
  })
    .then((response) => {
      console.log(response.data);
      return res.json({ status: 200, data: response.data });
    })
    .catch(err => {
      console.log(JSON.stringify(err));
      return res.send({ status: 400, massage: "Invalid Credentials" });
    });

})


// app.post("/api/profileImg",(req,res) => {
//    upload(req, res, (err) => {
//     const formData = new FormData();
//     let stream   = fs.createReadStream(path.join(__dirname+'/frontend/public/upload/', req.file.filename));
//     console.log(stream);
//     // return false;
//     formData.append('imageB64',stream);
//     formData.append('email',req.body.email);
//     Axios.post((api_base_url+"/api/upload_profile_picture",formData, {
//     headers: {
//         ...formData.getHeaders(),
//         "Authorization":auth.Authorization
//       },      
//     })
//     .then((response) => {
//       console.log('response',response.data);
//        return res.json({status:200,data:response.data});
//     })
//     .catch(error => console.log('response err',error));
//   });
// });

app.post("/api/GETIINDETAILS", (req, res) => {
  const request_data = {
    "iin": req.body.iin,
    "email": req.body.email
  };

  Axios.post(api_base_url_prod + '/GETIINDETAILS', request_data, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json"
    },
  })
    .then((response) => {
      // console.log('response',response.data);
      return res.json({ data: response.data });
    })
    .catch(err => console.log(err));

});



app.post("/api/profileImg", (req, res) => {

  upload(req, res, (err) => {
    // if (err) {
    //   //console.log('image error',err);
    //   res.sendStatus(500);
    // }else{
    //   // console.log('image ss');
    //   res.sendStatus(200);
    // }

    const formData = new FormData();
    let stream = fs.createReadStream(path.join(__dirname + '/frontend/public/upload/' + req.file.filename));
    // stream.path="https://bfccapital.com/prodigypro/logo192.png";
    stream.path = "https://uat.bfccapital.com/prodigypro/upload/" + req.file.filename;
    formData.append('imageB64', stream);
    // console.log(stream);




    formData.append('email', req.body.email);
    Axios.post(api_base_url + "/api/upload_profile_picture", formData, {
      headers: {
        ...formData.getHeaders(),
        "Authorization": auth.Authorization
      },
    })
      .then((response) => {
        // console.log('response',response.data);
        res.sendStatus(200);
      })
      .catch(err => console.log('response err', err));

  });
});

app.post("/api/insertTransactionDetails", function (req, res) {

  const request_data = {
    "iin": req.body.iin,
    "pan": req.body.pan,
    "mode": req.body.mode,
    "payment_mode": req.body.payment_mode,
    "email": req.body.email,
    "date": req.body.date,
    "amc": req.body.amc,
    "scheme_code": req.body.scheme_code,
    "amount": req.body.amount,
    "folio": req.body.folio,
    "scheme_name": req.body.scheme_name,
  };


  Axios.post(api_base_url + '/api/insertTransactionDetails', request_data, {
    headers: {
      "Authorization": auth.Authorization,
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json"
    },
  })
    .then((response) => {
      console.log('response mobileno', response.data);
      return res.json({ data: response.data });
    })
    .catch(err => {
      console.log("detailsInsertionKycHolderTbl err", err);
      return res.send({ status: 400, massage: "Invalid Credentials" });
    });
})



app.post("/api/deleteTransactionDetails", function (req, res) {

  const request_data = {
    "id": req.body.id,
  };

  Axios.post(api_base_url + '/api/deleteTransactionDetails', request_data, {
    headers: {
      "Authorization": auth.Authorization,
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json"
    },
  })
    .then((response) => {
      console.log('response deleteTransactionDetails', response.data);
      return res.json({ data: response.data });
    })
    .catch(err => {
      console.log("deleteTransactionDetails err", err);
      return res.send({ status: 400, massage: "Invalid Credentials" });
    });
})

app.post("/api/social_registers", function (req, res) {

  const request_data = {
    "email": req.body.email,
    "name": req.body.name,
    "social_id": req.body.social_id,
    "type_device": "Web",
  };

  Axios.post(api_base_url + '/api/social_registers', request_data, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json"
    },
  })
    .then((response) => {
      console.log("login", response.data);
      return res.json({ status: 200, data: response.data });
    })
    .catch(err => {
      console.log("login err", err);
      return res.send({ status: 400, massage: "Invalid Credentials" });
    });
})

app.post("/api/GETIIN", (req, res) => {
  const request_data = {
    "tax_status": req.body.tax_status,
    "hold_nature": req.body.hold_nature,
    "fh_pan": req.body.fh_pan,
    "jh1_pan": req.body.jh1_pan,
    "jh2_pan": req.body.jh2_pan,
    "guardian_pan": req.body.guardian_pan,
    "investor_name": req.body.investor_name,
    "email": req.body.email,
  };

  console.log('GETIIN', request_data);

  Axios.post('https://mfprodigy.bfccapital.com/prodigyfinallive/GETIIN', request_data, {
    headers: {
      "Authorization": auth.Authorization,
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json"
    },
  })
    .then((response) => {
      console.log('response getIinstatus', response);
      return res.json({ data: response.data });
    })
    .catch(err => console.log(err));
});


app.post("/api/userProfileMemberList", function (req, res) {

  const request_data = {
    "pan": req.body.pan,
  };
  console.log("userProfileMemberList", request_data.pan);
  Axios.post(api_base_url_wms + '/api/userProfileMemberList', request_data, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json"
    },
  })
    .then((response) => {
      console.log("userProfileMemberList", response.data);
      return res.json({ status: 200, data: response.data });
    })
    .catch(err => {
      console.log("login err", err);
      return res.send({ status: 400, massage: "Invalid Credentials" });
    });
})



app.post("/api/additional_iin_fatca", (req, res) => {

  const request_data = {
    "user_id": req.body.user_id,
  };

  // return res.json(JSON.stringify(request_data));
  Axios.post(api_base_url + '/api/userIincreationController/fatca_pc', request_data, {
    headers: {
      "Authorization": auth.Authorization,
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json"
    },
  })
    .then((response) => {
      // console.log('response fatca',response.data);
      return res.json({ data: response.data });
    })
    .catch(err => console.log(err));

});



app.post("/api/additional_iinCreate", (req, res) => {

  const request_data = {
    "user_id": req.body.user_id,
  };

  // return res.json(JSON.stringify(request_data));
  Axios.post(api_base_url + '/api/userIincreationController/CreateCustomer_pc', request_data, {
    headers: {
      "Authorization": auth.Authorization,
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json"
    },
  })
    .then((response) => {
      // console.log('response IIN',response.data);
      return res.json({ data: response.data });
    })
    .catch(err => console.log(err));

});


app.post("/api/additional_iin_update_nominee", (req, res) => {

  const request_data = {
    "nomini_id": req.body.id,
    "user_id": req.body.user_id,
    "name": req.body.name,
    "dob": req.body.dob,
    "relation": req.body.rel,
    "percentage": req.body.perc,
    "guardiun_name": req.body.gud
  };

  // console.log('console update_nominee',JSON.stringify(request_data));

  Axios.post(api_base_url + '/api/userIincreationController/update_nomini_PC', request_data, {
    headers: {
      "Authorization": auth.Authorization,
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json"
    },
  })
    .then((response) => {
      // console.log('response update_nominee',response.data);
      return res.json({ data: response.data });
    })
    .catch(err => console.log(err));

});


app.post("/api/additional_iin_get_nomine", (req, res) => {
  const request_data = {
    "user_id": req.body.user_id,
  };

  // return res.json(JSON.stringify(request_data));
  Axios.get(api_base_url + '/api/userIincreationController/allNominee_pc/' + req.body.user_id, {
    headers: {
      "Authorization": auth.Authorization,
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json"
    },
  })
    .then((response) => {
      // console.log('response',response.data);
      return res.json({ data: response.data });
    })
    .catch(err => console.log(err));

});



app.post("/api/additional_iin_nominee", (req, res) => {
  const request_data = {
    "user_id": req.body.user_id,
    "name": req.body.name,
    "dob": req.body.dob,
    "relation": req.body.rel,
    "percentage": req.body.perc,
    "guardiun_name": req.body.gud
  };

  // return res.json(JSON.stringify(request_data));
  Axios.post(api_base_url + '/api/userIincreationController/add_nomini_pc', request_data, {
    headers: {
      "Authorization": auth.Authorization,
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json"
    },
  })
    .then((response) => {
      // console.log('response nominee',response.data);
      return res.json({ data: response.data });
    })
    .catch(err => console.log(err));

});



app.post("/api/additional_iin_bank_details", (req, res) => {
  const request_data = {
    "user_id": req.body.user_id,
    "accountno": req.body.acc_num,
    "c_accountno": req.body.cnf_acc_num,
    "account_type": req.body.acc_type,
    "ifsc": req.body.ifsc,
    "bank": req.body.bank_name,
    "branch": req.body.branch,
    "bank_code": req.body.bank_code,
  };

  //  return res.json(JSON.stringify(request_data));
  Axios.post(api_base_url + '/api/userIincreationController/bank_details_pc', request_data, {
    headers: {
      "Authorization": auth.Authorization,
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json"
    },
  })
    .then((response) => {
      console.log('additional_iin_bank_details', response.data);
      return res.json({ data: response.data });
    })
    .catch(err => console.log(err));

});



app.post("/api/additional_iin_joint_holder", (req, res) => {

  const request_data = {
    "user_id": req.body.user_id,
    "phone": req.body.phone,
    "name": req.body.holderName,
    "email_joinholder": req.body.holderEmail,
    "pan": req.body.pan,
    "occupation": req.body.occupation,
    "income_range": req.body.inc_range,
    "place_of_birth": req.body.pob,
    "not_tax_payer_other_country": req.body.tax_payer,
    "not_politically_exposed": req.body.not_politically,
    "dob": req.body.dob,
    "residential_status": req.body.resident,
    "joint_holder": req.body.joint_holder,
    "holding_nature": "AS"
  };

  // return res.json(JSON.stringify(request_data));
  Axios.post(api_base_url + '/api/userIincreationController/joint_holder_pc', request_data, {
    headers: {
      "Authorization": auth.Authorization,
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json"
    },
  })
    .then((response) => {
      // console.log('response',response.data.data);
      return res.json({ status: 200, data: response.data });
    })
    .catch((err) => console.log(err));

});



app.post("/api/additional_iin_address_details", (req, res) => {
  if (req.body.resident == '0') {
    const request_data = {
      "user_id": req.body.user_id,
      "city": req.body.ncity,
      "state": req.body.nstate,
      "locality": req.body.nlandmark,
      "address": req.body.naddress,
      "country": req.body.ncountry,
      "pincode": req.body.npin,
      "nri_city": req.body.nri_city,
      "nri_state": req.body.nri_state,
      "nri_locality": req.body.nri_landmark,
      "nri_addr1": req.body.nri_address,
      "nri_country": req.body.nri_country,
      "nri_pincode": req.body.nri_pin
    };

    // return res.json(JSON.stringify(request_data));
    Axios.post(api_base_url + '/api/userIincreationController/address_details_pc', request_data, {
      headers: {
        "Authorization": auth.Authorization,
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json"
      },
    })
      .then((response) => {
        // console.log('response',response.data);
        return res.json({ data: response.data });
      })
      .catch(err => console.log(err));

  } else {

    const request_data = {
      "user_id": req.body.user_id,
      "city": req.body.city,
      "state": req.body.state,
      "locality": req.body.landmark,
      "address": req.body.address,
      "country": req.body.country,
      "pincode": req.body.pin,
      "nri_city": "",
      "nri_state": "",
      "nri_locality": "",
      "nri_addr1": "",
      "nri_country": "",
      "nri_pincode": ""
    };

    // return res.json(JSON.stringify(request_data));
    Axios.post(api_base_url + '/api/userIincreationController/address_details_pc', request_data, {
      headers: {
        "Authorization": auth.Authorization,
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json"
      },
    })
      .then((response) => {
        // console.log('response',response.data);
        return res.json({ data: response.data });
      })
      .catch(err => console.log(err));

  }
});

app.post("/api/additional_iin_declaration_journy_pc", (req, res) => {

  const request_data = {
    "user_id": req.body.user_id,
    "exposedPolitically": req.body.not_politically,
    "othertaxpayer": req.body.tax_payer,
  };

  //  return res.json(JSON.stringify(request_data));
  Axios.post(api_base_url + '/api/userIincreationController/declaration_journy_pc', request_data, {
    headers: {
      "Authorization": auth.Authorization,
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json"
    },
  })
    .then((response) => {
      // console.log('response',response.data);
      return res.json({ data: response.data });
    })
    .catch(err => console.log(err));
});


app.post("/api/additional_iin_personalDetails", (req, res) => {
  const request_data = {
    "pan_card": req.body.pan,
    "email": req.body.email,
    "phone": req.body.phone,
    "dob": req.body.dob,
    "birth_place": req.body.pob,
    "occupation": req.body.occupation,
    "income_range": req.body.inc_range,
    "resident_status": req.body.resident,
    "phone": req.body.mobileNo,
    "parent_email": req.body.parent_email,
    "name": req.body.name,
    "guardian_name": req.body.guardian_name,
    "guardian_dob": req.body.guardian_dob,
    "tax_status": req.body.tax_status,
    "holding_nature": req.body.holding_nature,
    "relation_with_admin": req.body.relation_with_admin
  };
  console.log('response userIincreationController', request_data);
  Axios.post(api_base_url + '/api/userIincreationController/user_profile_creation', request_data, {
    headers: {
      "Authorization": auth.Authorization,
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json"
    },
  })
    .then((response) => {
      console.log('response userIincreationController', response.data);
      return res.json({ data: response.data });
    })
    .catch(err => console.log(err));

});




app.post("/api/addIINFamilyGroup", function (req, res) {

  const request_data = {
    "adminPan": req.body.adminPan,
    "memberPan": req.body.memberPan,
    "memberRelation": req.body.memberRelation,
    "email": req.body.email,
  };

  Axios.post(api_base_url_wms + '/api/addIINFamilyGroup', request_data, {
    headers: {
      "Authorization": auth.Authorization,
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json"
    },
  })
    .then((response) => {
      console.log('response addIINFamilyGroup', response.data);
      return res.json({ data: response.data });
    })
    .catch(err => {
      console.log("addIINFamilyGroup err", err);
      return res.send({ status: 400, massage: "Invalid Credentials" });
    });
})




app.post("/api/getschemepersonaldetail", function (req, res) {

  const request_data = {
    "rta": req.body.rta,
    "scheme": req.body.scheme,
    "pan": req.body.pan,
    "folio": req.body.folio,
  };
  console.log('response getschemepersonaldetail', request_data);
  Axios.post(api_url_wms + '/api/getschemepersonaldetail', request_data, {
    headers: {
      "Authorization": auth.Authorization,
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json"
    },
  })
    .then((response) => {
      console.log('response getschemepersonaldetail', response.data);
      return res.json({ data: response.data });
    })
    .catch(err => {
      console.log("getschemepersonaldetail err", err);
      return res.send({ status: 400, massage: "Invalid Credentials" });
    });
})

app.post("/api/getschemedetail", function (req, res) {

  const request_data = {
    "rta": req.body.rta,
    "scheme": req.body.scheme,
    "pan": req.body.pan,
    "folio": req.body.folio,
  };
  console.log('response getschemedetail', request_data);
  Axios.post(api_url_wms + '/api/getschemedetail', request_data, {
    headers: {
      "Authorization": auth.Authorization,
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json"
    },
  })
    .then((response) => {
      console.log('response getschemedetail', response.data);
      return res.json({ data: response.data });
    })
    .catch(err => {
      console.log("getschemedetail err", err);
      return res.send({ status: 400, massage: "Invalid Credentials" });
    });
})

app.post("/api/listFamilyMember", function (req, res) {

  const request_data = {
    "adminPan": req.body.adminPan
  };
  console.log('response getslistFamilyMemberchemedetail', request_data);
  Axios.post(api_base_url_wms + '/api/listFamilyMember', request_data, {
    headers: {
      "Authorization": auth.Authorization,
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json"
    },
  })
    .then((response) => {
      console.log('response listFamilyMember', response.data);
      return res.json({ data: response.data });
    })
    .catch(err => {
      console.log("listFamilyMember err", err);
      return res.send({ status: 400, massage: "Invalid Credentials" });
    });
})


app.post("/api/getUsersDataViaPan", function (req, res) {

  const request_data = {
    "pan": req.body.pan
  };

  Axios.post(api_base_url + '/api/getUsersDataViaPan', request_data)
    .then((response) => {
      return res.json({ data: response.data });
    })
    .catch(err => {
      return res.send({ status: 400, massage: "Invalid Credentials" });
    });

})

app.post("/api/removeFamilyMember", function (req, res) {

  const request_data = {
    "adminPan": req.body.adminPan,
    "memberPan": req.body.memberPan,
    "memberRelation": req.body.memberRelation
  };

  Axios.post(api_base_url_wms + '/api/removeFamilyMember', request_data, {
    headers: {
      "Authorization": auth.Authorization,
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json"
    },
  })
    .then((response) => {
      console.log('response removeFamilyMember', response.data);
      return res.json({ data: response.data });
    })
    .catch(err => {
      console.log("removeFamilyMember err", err);
      return res.send({ status: 400, massage: "Invalid Credentials" });
    });
})



app.post("/api/getRelationshipMaster", function (req, res) {

  /* const request_data = {
    "pan": req.body.pan
  }; */

  Axios.get(api_base_url_prod + '/getRelationshipMaster')
    .then((response) => {
      return res.json({ data: response.data });
    })
    .catch(err => {
      return res.send({ status: 400, massage: "Invalid Credentials" });
    });

})

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'frontend/public/upload')
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname)
  }
})

const upload = multer({ storage: storage }).single('file')




app.use(express.static(path.join(__dirname, '/frontend/build')));
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/frontend/build/index.html'))
);
export default app;
// module.exports = userRouter;