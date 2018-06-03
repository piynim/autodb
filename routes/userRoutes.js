var express = require('express');
var moment = require('moment');
var router = express.Router();
var attendenceData = require('../model/employee');

router.get('/',function(req, res, err){
    
    attendenceData.find({},(err, data)=>{
            res.json(200, { data });
        });
});
router.post('/login', function(req, res, err){
        attendenceData.find({ employeeID: req.body.employeeID, password: req.body.password }, function (err, data) {
            if (data !== null && data.length>0) {
                res.send({ message: "User exists" });
            }
            else {
                res.send({message: "Invalid Username or Password"});
            }
        });
    
});

router.put('/:id/checkin', function handler(req, res, err){
        var checkintime = new Date();
    var date = new Date();
        console.log(date)
        attendenceData.findById(req.params.id, function(err,data){
            if(data.checkInTime === null || data.checkInTime.length<0){
                attendenceData.findByIdAndUpdate(req.params.id, { checkInTime: checkintime }, function queryhandler(err, data) {
                    if (err) {
                        res.send(err);
                    }
                    else {
                        console.log(data);
                        res.send(data);
                    }
                });
            }
            else{
                res.json({msg:"checked in before"})
            }
        })
});

router.put('/:id/checkout', function handler(req, res, err) {
    var checkouttime = new Date();
    console.log(checkouttime);
    attendenceData.findByIdAndUpdate(req.params.id, { checkOutTime: checkouttime }, function queryhandler(err, data) {
        if (err) {
            res.send(err);
        }
        else {
            console.log(data);
            res.send(data);
        }
    })
});
router.get('/:id/totalhours',function handler(req, res, err){
    console.log('here')
        attendenceData.findById(req.params.id, function(err, data){
            
            if(err){
                res.send(err);
            }
            else{
                var checkInTime = data.checkInTime;
                var checkOutTime = data.checkOutTime;
                var workingHours = moment(checkOutTime).diff(checkInTime,"hours");               
                attendenceData.findByIdAndUpdate(req.params.id, { totalWorkingHours: workingHours }, function (err, data){
                    res.json({msg: "updated successfully"});
                })
            }
        });
    
})



module.exports = router;