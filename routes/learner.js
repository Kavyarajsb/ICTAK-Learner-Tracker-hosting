const express = require('express');
const router = express.Router();
const multer = require('multer');

//csv upload required packages -- multer + fast-csv and streamifier - not saving file to folder
const csvupload = require('@fast-csv/parse');
const streamifier = require('streamifier');
const parseCsv = multer().single('csv'); // uses file input name
//end multer + fast-csv and streamifier

//csv upload required packages and declaration starts -- multer + csvtojson
const csv = require('csvtojson');
let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});
let uploads = multer({ storage: storage });
// csv upload specific code ends

const learnerInfo = require('../models/learner');
const learnerCntrlr = require('../controllers/learner')

//read learner list 
router.get('/api/learnerlist', learnerCntrlr.getAllLearners)

// read single learnerInfo detail
router.get('/api/learner/:id',learnerCntrlr.getOneLearner)

// add new learner
router.post('/api/learner', learnerCntrlr.addLearner)

// update learner detail
router.put('/api/learner', learnerCntrlr.updateLearner)

// delete learner detail
router.delete('/api/learner/:id', learnerCntrlr.deleteLearner)

//count the number of  learners
router.get('/api/learnercount', learnerCntrlr.countLearner)

//count the number of learners doing course "FSD"
router.get('/api/learnerFSD', learnerCntrlr.countFSD)

//count the number of learners doing course "ML-AI"
router.get('/api/learnerMLAI', learnerCntrlr.countMLAI)

//count the number of learners doing course "CSA"
router.get('/api/learnerCSA', learnerCntrlr.countCSA)

//count the number of learners doing course "DSA"
router.get('/api/learnerDSA', learnerCntrlr.countDSA)

//count the number of learners doing course "ST"
router.get('/api/learnerST', learnerCntrlr.countST)

//count the number of learners doing course "RPA"
router.get('/api/learnerRPA', learnerCntrlr.countRPA)

//count the number of  placed
router.get('/api/placedcount', learnerCntrlr.countPlaced)

//count the number of  job seeking
router.get('/api/jobseekingcount', learnerCntrlr.countJobseeking)

//count the number of  not interested
router.get('/api/notinterestedcount', learnerCntrlr.countNotinterested)

// upload csv learners to folder first and then save to db
router.post('/api/uploadlearners',uploads.single('csv'), (req,res)=>{
    csv()
    .fromFile(req.file.path)
    .then((jsonObj)=>{
        var learners = [];
        for(var i = 0;i<jsonObj.length;i++){
            var obj={};
            obj.learnerid=jsonObj[i]['Learner ID'];
            obj.name=jsonObj[i]['Name'];
            obj.course=jsonObj[i]['Course'];
            obj.project=jsonObj[i]['Project'];
            obj.batch=jsonObj[i]['Batch'];
            obj.coursestatus=jsonObj[i]['Course Status'];
            learners.push(obj);
        }
                  
        learnerInfo.insertMany(learners, (err, data) => {
            if (err) {
                res.status(401).send("Duplicate entry error");
               } else {
                 res.status(200).send({data});
            }
        });
    }).catch((error) => {
        console.log(error);
    })
}); 

//upload csv learners by reading line by line from file first and then save to db
router.post("/api/upload", parseCsv , (req, res) => {
    const { buffer } = req.file;  
    const dataFromCSV = [];
  
    streamifier
      .createReadStream(buffer)
      .pipe(csvupload.parse({ headers: true, ignoreEmpty: true })) // <== this is @fast-csv/parse!!
      .on("data", (row) => {
            var obj={};
            obj.learnerid=row['Learner ID'];
            obj.name=row['Name'];
            obj.course=row['Course'];
            obj.project=row['Project'];
            obj.batch=row['Batch'];
            obj.coursestatus=row['Course Status'];
            dataFromCSV.push(obj);
      })
      .on("end", async (rowCount) => {
        try {
            learnerInfo.insertMany(dataFromCSV, (err, data) => {
                if (err) {
                    res.status(401).send("Duplicate entry error");                   
                } else {
                   res.status(200).send({data});
                }
            });                   
        } catch (error) {
             console.log(error);            
        }
      });
  });

module.exports = router;
