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
        // we found the list of articles
        res.render('articles/index', {
            title: 'Articles',
            articles: articles
        });
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
        res.redirect('/articles');
    });
});

router.get('/:id', function(req, res, next) {
    article.findById(req.params.id, function(error, article) {
        if(error) {
            console.log(error);
            res.end(error);
        }
        res.render('articles/edit', {
            title: "Edit Article",
            article: article
        });
    });
});

router.post('/:id', function(req, res, next) {
    article.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        content: req.body.content
    }, function(error) {
        if(error) {
            console.log(error);
            res.end(error);
        }
        res.redirect('/articles');
    });
});

router.get('/delete/:id', function(req, res, next) {
    article.findByIdAndRemove(req.params.id, function(error) {
        if(error) {
            console.log(error);
            res.end(error);
        }
        res.redirect('/articles');
    })
});

module.exports = router;
