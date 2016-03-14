/// <reference path="../../typings/tsd.d.ts" />

var express = require('express');
var mongoose = require('mongoose');
var articleModel = require('../models/article');

var router = express.Router();
var article = articleModel.Article;

router.get('/', function(req, res, next) {
    article.find(function(error, articles) {
        if(error) {
            console.log(error);
            res.end(error);
        }
        else {
            // we found the list of articles
            res.render('articles/index', {
                title: 'Articles',
                articles: articles
            })
        }
    });
});

router.get('/add', function(req, res, next) {
    res.render('articles/add', {
        title: "Add a new Article"
    });
});

// post request to save article
router.post('/add', function(req, res, next) {
    article.create({
        title: req.body.title,
        content: req.body.content
    }, function(error, article) {
        if(error) {
            console.log(error);
            res.end(error);
        }
        else {
            res.redirect('/articles');
        }
    });
});

module.exports = router;
