/// <reference path="../../typings/tsd.d.ts" />

var express = require('express');
var mongoose = require('mongoose');
var userModel = require('../models/user');

var router = express.Router();
var user = userModel.User;

router.get('/', function(req, res, next) {
    user.find(function(error, users) {
        if(error) {
            console.log(error);
            res.end(error);
        }
        res.render('users/index', {
            title: 'Registered Users',
            users: users
        });
    });
});


router.get('/add', function(req, res, next) {
    res.render('users/add', {
        title: "Add a new user"
    });
});

// post request to save user
router.post('/add', function(req, res, next) {
    user.create({
        username: req.body.username,
        password: req.body.password
    }, function(error, user) {
        if(error) {
            console.log(error);
            res.end(error);
        }
        res.redirect('/users');
    });
});

router.get('/:id', function(req, res, next) {
    user.findById(req.params.id, function(error, user) {
        if(error) {
            console.log(error);
            res.end(error);
        }
        res.render('users/edit', {
            title: "Edit User",
            user: user
        });
    });
});

router.post('/:id', function(req, res, next) {
    user.findByIdAndUpdate(req.params.id, {
        username: req.body.username,
        password: req.body.password
    }, function(error) {
        if(error) {
            console.log(error);
            res.end(error);
        }
        res.redirect('/users');
    });
});

router.get('/delete/:id', function(req, res, next) {
    user.findByIdAndRemove(req.params.id, function(error) {
        if(error) {
            console.log(error);
            res.end(error);
        }
        res.redirect('/users');
    })
});

module.exports = router;