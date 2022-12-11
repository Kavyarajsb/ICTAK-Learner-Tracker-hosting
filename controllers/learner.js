const learnerInfo = require('../models/learner');

//read learner list 
exports.getAllLearners= async(req,res)=>{
    try {
        const list = await learnerInfo.find();
        res.send(list);
    }
    catch(error) {
        console.log(error);
    }
}

// read single learnerInfo detail
exports.getOneLearner=async(req,res)=>{
    try {
        let id = req.params.id;
        let learner = await learnerInfo.findById({'_id': id});
        res.send(learner);
    }
    catch(error) {
        console.log(error);
    }
}

// add new learner
exports.addLearner= async(req,res)=>{
    try {
        // store the front end entered details in server variable
        console.log(req.body);
           let learnernew ={
                learnerid: req.body.learnerid,
                name: req.body.name,
                course: req.body.course,
                project: req.body.project,
                batch : req.body.batch,
                coursestatus: req.body.coursestatus,
                placementstatus: req.body.placementstatus
            }

            let learner = new learnerInfo(learnernew);
            let saveLearner = learner.save();
            res.send(saveLearner);                           
    }
    catch(error) {
        console.log(error);
    }
}

// update learner detail
exports.updateLearner= async(req, res) => {
    try {
        let id = req.body._id;
        let learner ={
            learnerid: req.body.learnerid,
            name: req.body.name,
            course: req.body.course,
            project: req.body.project,
            batch : req.body.batch,
            coursestatus: req.body.coursestatus,
            placementstatus: req.body.placementstatus
        }
        let updateLearner = { $set: learner };
        let updateInfo = await learnerInfo.findByIdAndUpdate({'_id': id }, updateLearner);
        res.send(updateInfo)
    } catch (error) {
        console.log(error);
    }
}

// delete learner detail
exports.deleteLearner= async(req,res)=>{
    try {
        let id = req.params.id;
        let deleteLearner = await learnerInfo.deleteOne({'_id':id});
        res.send(deleteLearner);
    }
    catch(error) {
        console.log(error);   
    }
}

//count the number of learners

exports.countLearner=async(req,res)=>{
    try {
        const count = await learnerInfo.find() .count();
        console.log("Learner Count>>>",count)
        res.json(count);
       
    }
    catch(error) {
        console.log(error);
    }

}

//count the number of learners doing course "FSD"

exports.countFSD=async(req,res)=>{
    try {
       
        const count = await learnerInfo.find( {"course":"FSD"} ).count();
        console.log("Learners doing FSD>>>",count)
        res.json(count);
       
    }
    catch(error) {
        console.log(error);
    }

}

//count the number of learners doing course "DSA"

exports.countDSA=async(req,res)=>{
    try {
       
        const count = await learnerInfo.find( {"course":"DSA"} ).count();
        console.log("Learners doing DSA>>>",count)
        res.json(count);
       
    }
    catch(error) {
        console.log(error);
    }

}

//count the number of learners doing course "ML-AI"

exports.countMLAI=async(req,res)=>{
    try {
       
        const count = await learnerInfo.find( {"course":"ML-AI"} ).count();
        console.log("Learners doing ML-AI>>>",count)
        res.json(count);
       
    }
    catch(error) {
        console.log(error);
    }

}

//count the number of learners doing course "RPA"

exports.countRPA=async(req,res)=>{
    try {
       
        const count = await learnerInfo.find( {"course":"RPA"} ).count();
        console.log("Learners doing RPA>>>",count)
        res.json(count);
       
    }
    catch(error) {
        console.log(error);
    }

}
//count the number of learners doing course "ST"

exports.countST=async(req,res)=>{
    try {
       
        const count = await learnerInfo.find( {"course":"ST"} ).count();
        console.log("Learners doing ST>>>",count)
        res.json(count);
       
    }
    catch(error) {
        console.log(error);
    }

}

//count the number of learners doing course "CSA"

exports.countCSA=async(req,res)=>{
    try {
       
        const count = await learnerInfo.find( {"course":"CSA"} ).count();
        console.log("Learners doing CSA>>>",count)
        res.json(count);
       
    }
    catch(error) {
        console.log(error);
    }

}

//count the number of placement status

exports.countPlaced=async(req,res)=>{
    try {
        const count = await learnerInfo.find({"placementstatus":"Placed"}).count();
        console.log("Placed Count>>>",count)
        res.json(count);
       
    }
    catch(error) {
        console.log(error);
    }

}
exports.countJobseeking=async(req,res)=>{
    try {
        const count = await learnerInfo.find({"placementstatus":"Job Seeking"}).count();
        console.log("Jobseeking Count>>>",count)
        res.json(count);
       
    }
    catch(error) {
        console.log(error);
    }

}
exports.countNotinterested=async(req,res)=>{
    try {
        const count = await learnerInfo.find({"placementstatus":"NOT Interested"}).count();
        console.log("Notinterested Count>>>",count)
        res.json(count);
       
    }
    catch(error) {
        console.log(error);
    }

}


// add csv fileinfo
exports.addCSVLearners = async(req,res)=>{
}
