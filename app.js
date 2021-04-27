require('dotenv').config();
const express = require('express');
const cors = require('cors');
require('./db/dbconnection')
const app = express();
const apis = require('./routes')

app.use(cors())

const port = process.env.PORT || 3000 ;


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(apis);
 


app.listen(port,()=>{

console.log(' Server Running on port  ' + port);

});
