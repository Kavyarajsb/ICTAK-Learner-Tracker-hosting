const express = require('express');
const cors = require('cors');
const logger = require('morgan');
// const path = require('path');

require('./middleware/mongoDB')  // initiate mongodb connection

const app = new express();
app.use(cors()); // help to connect frontend and backend seemlessly
app.use(express.json()); //receive data from frontend to backend
app.use(express.urlencoded({extended:true})); // useful when we use files,imgs etc
app.use(logger('dev'));

//static folder  
// app.use(express.static(path.resolve(__dirname, './uploads')))

const PORT = process.env.PORT || 3000;

const path = require ('path');
app.use(express.static('./dist/ictak-learner-tracker-project'));

// routes
const staffApi = require('./routes/staff');
app.use('/api',staffApi);
const learnerApi = require('./routes/learner');
app.use('/api',learnerApi);

app.get('/*',function(req,res){
    res.sendFile(path.join(__dirname +'/dist/ictak-learner-tracker-project/index.html'));
});


//server code
app.listen(PORT,()=>{
    console.log(`Server is running at ${PORT}`);
})