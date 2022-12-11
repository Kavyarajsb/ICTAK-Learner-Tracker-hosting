const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const staffInfo = require('../models/staff')

//read staff list 
exports.getAllStaff= async(req,res)=>{
    try {
        const list = await staffInfo.find();
        res.send(list);
    }
    catch(error) {
        console.log(error);
    }
}

// read single staff detail
exports.getOneStaff=async(req,res)=>{
    try {
        let id = req.params.id;
        let staff = await staffInfo.findById(id);
        res.send(staff);
    }
    catch(error) {
        console.log(error);
    }
}

// add new staff
exports.addStaff= async(req,res)=>{
    try {
        // store the front end entered details in server variable
        console.log(req.body);
        bcrypt.hash(req.body.password, 10).then((hash)=>{
               // store hash in the database
               let staffnew ={
                name: req.body.name,
                email: req.body.email,
                password: hash,
                role : req.body.role
            }

            let staff = new staffInfo(staffnew);
            let saveStaff = staff.save();
            res.send(saveStaff);
        })
    }
    catch(error) {
        console.log(error);
    }
}

// update staff detail
exports.updateStaff= async(req, res) => {
    try {
        let staff={};
        let updateInfo;
        let id = req.body._id;
        console.log(req.body)
        if(req.body.password ==""){
            console.log("inside first condition")
            staff ={
                name: req.body.name,
                email: req.body.email,
                role : req.body.role
            }
            updateInfo = await staffInfo.findByIdAndUpdate({'_id': id }, { $set: staff });

        }
        else {
            console.log("inside second condition")

            bcrypt.hash(req.body.password, 10).then(async(hash)=>{
                // store hash in the database
                staff ={
                 name: req.body.name,
                 email: req.body.email,
                 password: hash,
                 role : req.body.role
             }
             updateInfo = await staffInfo.findByIdAndUpdate({'_id': id }, { $set: staff });

        })}
        
        res.send(updateInfo)
    } catch (error) {
        console.log(error);
    }

}

// delete staff detail
exports.deleteStaff= async(req,res)=>{
    try {
        let id = req.params.id;
        let deleteStaff = await staffInfo.deleteOne({'_id':id});
        res.send(deleteStaff);
    }
    catch(error) {
        console.log(error);   
    }
}

//count of Training Head

exports.countTh=async(req,res)=>{
    try {
        const count = await staffInfo.find( {"role":"Training Head"} ).count();
        console.log("TH Count>>>",count)
        res.json(count);
       
    }
    catch(error) {
        console.log(error);
    }
}

//count of Placement Officer

exports.countPO=async(req,res)=>{
    try {
        const count = await staffInfo.find( {"role":"Placement Officer"} ).count();
        console.log("PO Count>>>",count)
        res.json(count);
       
    }
    catch(error) {
        console.log(error);
    }
}

// Login Api
// exports.login=(req,res)=>{
//     let userData=req.body;
//     var flag=false;
//     var userrole="";
//     var username="";

//     staffInfo.find().then(function(user){
//         for(let i=0;i<user.length;i++){
//             if(userData.email==user[i].email){
//                 if(userData.password==user[i].password){
//                     console.log("found user",user[i].email);
//                     userrole = user[i].role;
//                     username = user[i].name;
//                     let payload={subject:userData.email+userData.password}
//             let token =jwt.sign(payload,"secretKey");
//             res.status(200).send({token,username,userrole});
//                     break;
//                 }else{
//                     res.status(401).send("Wrong Password")                    
//                     break;
//                 }
//             }
//         }
//     });

    


// };




// This will be the login function after frontend is ready 
//              |
//              |
//              V
exports.login=(req,res)=>{
    var flag=false;

    staffInfo.findOne({"email": req.body.email}).then((user)=>{
        if(!user){
            return res.status(401).send("User not found");
        }
        bcrypt.compare(req.body.password, user.password).then((valid)=>{
            if (!valid){
                return res.status(401).send("Invalid password");
            }
            let payload={subject:user.email+user.password}
            let token =jwt.sign(payload,"secretKey");
            var userrole = user.role;
            var username = user.name;
            res.status(200).send({token,username,userrole});
        })
    })
};



