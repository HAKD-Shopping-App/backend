var user = require('../models/user')
var jwt = require('jwt-simple')
var config = require('../config/dbconfig')



var functions = {
    // getUsers: function (req,res){
    //     user.find({
            
    //     }, function(err,users){
    //         if(err) throw err
    //         if(!users){
    //             res.json({success:false})
    //         }
    //         else{
    //             res.json({success:true,users:users})
    //         }
    //     })
    // }
    userSignup: function (req,res){
        if((!req.body.email) || (!req.body.password) || (!req.body.fullName)){
            res.json({success: false, msg: 'Please fill all the required fields'})
        }
        else{
            var newUser = user({
                fullName: req.body.fullName,
                email: req.body.email,
                password: req.body.password,
            });
            newUser.save(function(err, newUser){
                if(err){
                    res.json({success:false , msg:'Failed to save'})
                }
                else{
                    res. json({success: true, msg: 'Successfully Registered'})
                }
            })
        }
    },
    userLogin: function(req,res){
        user.findOne({
            email: req.body.email,
        }, function(err,user){
            if(err) throw err
            if(!user){
                res.json({success:false, msg: 'User not found!'})  
            }
            else{
                user.comparePassword(req.body.password, function(err,isMatch){
                    if(isMatch && !err){
                        var token = jwt.encode(user, config.secret)
                        res.json({success:true, token: token})  
                    }
                    else{
                        res.json({success:false, msg: 'Incorrect Credentials!'})  
                    }
                })
            }
        })
    },

    
    
    

} 

module.exports = functions