import express from 'express';
import dotenv from 'dotenv';
// import config from './config.js';
import path from 'path';
import bodyParser from 'body-parser';
import Axios from 'axios';
import $ from 'jquery';
import mysql from 'mysql';
import querystring from 'querystring';

// var con = mysql.createConnection({
//   host: "119.18.54.121",
//   user: "bfcca9qh_mfprodigy",
//   password: "W.fA.WaIC*kG",
//   db: "bfcca9qh_mfprodigy"
// });

// con.connect(function (err) {
//   if (err) throw err;
//   console.log("Connected!");
// });

// import moment from 'moment';
dotenv.config();

import cors from 'cors';


const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(bodyParser.json({ limit: '500mb' }));
app.use(bodyParser.urlencoded({ limit: '500mb', extended: true }));

const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));



app.post("/api/registers", function (req, res) {
  // console.log(req.body.email);
  var data = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    c_password: req.body.c_password
  }

  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST',
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Max-Age': '3000',
    'Access-Control-Allow-Headers': ' Origin, Content-Type, X-Auth-Token, Accept, X-Requested-With',
    'Content-Type': 'application/json, charset=utf-8',
  };
  var data = {
    name: 'test',
    phone: '7355013176',
    email: 'admin@gmail.comggg',
    password: '123',
    c_password: '4123'
  }

  // console.log(data);
  // return false;
  
  Axios
      .post("https://mfprodigy.bfccapital.com/api/registers", data, {headers: {'Content-Type': 'multipart/form-data' }})
      .then(res1 => {
        res.send(res1);
      })
      .catch(err => {res.send(err.message)});

  // Axios({
  //   method: "post",
  //   url: "https://mfprodigy.bfccapital.com/api/registers",
  //   data: {
  //     "name": "test",
  //     "phone": "7355013176",
  //     "email": "admin@gmail.comggg",
  //     "password": "123",
  //     "c_password": "4123"
  //   }
  // })
  //   .then(response => {
  //     res.send(response);
  //   })
  //   .catch(err => console(err));


})



app.use(express.static(path.join(__dirname, '/frontend/build')));
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/frontend/build/index.html'))
);

const port = process.env.PORT || 5000;

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

app.listen(port, () => { console.log("server started at port ", port) })


