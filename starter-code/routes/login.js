const express = require('express');
const router  = express.Router();
const User = require('../models/User')

router.get('/', (req,res)=>{
    res.render('login')
})

router.get('/forgotpassword', (req,res)=>{
    res.render('stby')
})

router.post('/', (req,res)=>{
    User.findOne({username:req.body.username})
    .then(user=>{
        if (!user) res.render('incorrect')
        else if (user.password !== req.body.password) res.render('incorrect')
        else {
            req.session.currentUser = user
            res.redirect('/main')
        }
    })
    .catch(err=>{
        next('eroor in database')
    })
})


module.exports = router;

