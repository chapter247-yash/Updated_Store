const mongoose = require('mongoose');
const _ = require('lodash');
const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var { Blog } = require('../models/blog.model');

router.get('/', (req, res) => {
    Blog.find((err, docs) => {
        if (!err) { res.send(docs); }
        else { console.log('Error in Retriving Employees :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.get('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    Blog.findById(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Retriving Employee :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.post('/', (req, res) => {
    console.log(req.body);
    var blog = new Blog({
        title: req.body.title,
        shortDescription: req.body.shortDescription,
        category: req.body.category,
        fullDescription: req.body.fullDescription,
    });
    blog.save((err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Blog Save :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.put('/:id', (req, res) => {
    console.log(req.body);
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    var blog = {
        title: req.body.title,
        shortDescription: req.body.shortDescription,
        category: req.body.category,
        fullDescription: req.body.fullDescription,
    };
    Blog.findByIdAndUpdate(req.params.id, { $set: blog }, { new: true }, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Blog Update :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.delete('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    Blog.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Employee Delete :' + JSON.stringify(err, undefined, 2)); }
    });
});

module.exports = router;