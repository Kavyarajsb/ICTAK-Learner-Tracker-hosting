const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const staffCntrlr = require('../controllers/staff')

// Token Verification

function verifytoken(req,res,next){
    if (!req.headers.authorization)
    {
        return res.status(401).send('Unauthorised Request')
    }
    let token = req.headers.authorization.split(' ')[1]
    if (token=='null')
    {
        return res.status(401).send('Unauthorised Request')
    }
    let payload = jwt.verify(token,'secretKey')
    console.log(payload)
    if(!payload)
    {
        return res.status(401).send('Unauthorised Request')
    }
    req.role=payload.subject
    next()
}
//read staff list 
router.get('/api/stafflist',verifytoken, staffCntrlr.getAllStaff)

// read single staff detail
router.get('/api/staff/:id',verifytoken, staffCntrlr.getOneStaff)

// add new staff
router.post('/api/staff',verifytoken, staffCntrlr.addStaff)

// update staff detail
router.put('/api/staff',verifytoken, staffCntrlr.updateStaff)

// delete staff detail
router.delete('/api/staff/:id',verifytoken, staffCntrlr.deleteStaff)

//get count of Training Head
router.get('/api/staffthcount', staffCntrlr.countTh)

//get count of Placement Officer
router.get('/api/staffpocount', staffCntrlr.countPO)


// Login Api
router.post('/api/login',staffCntrlr.login);

module.exports = router;