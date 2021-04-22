const mongoose = require('mongoose');


mongoose.connect(process.env.MONGODB_URL, { 

useNewUrlParser: true,
useUnifiedTopology: true,
useCreateIndex: true,
useFindAndModify: false

});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'DB connection error:'));

db.once('open', ()=>{
  
    console.log('DB connected successfully')
}); 