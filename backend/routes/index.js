import app from '../server.js'
 import {SipCalculater, LumpsumCalculater} from '../Controller/Calculaters.js';



app.post("/api/sip", SipCalculater)
app.post("/api/lumpsum", LumpsumCalculater)