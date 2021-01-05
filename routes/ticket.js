const express = require('express');
const router = express.Router();
const { Ticket, Account } = require('../config/dbConnection');
const httpStatus = require('../constants/constants');
const request = require('request');
const Environment = require('../config/env');
const _ = require('lodash');
let Env = Environment.getEnv();
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const upload = multer({ dest: "./uploaded/files" })

router.post('/', upload.single("file"), (req, res, next) => {
    let targetPath;
    if (!req.query.apiKey) {
        if (req.file.path) {
            const tempPath = req.file.path;
            let extToAllow = ['.png', '.jpg', '.gif', '.jpeg', '.svg'];
            targetPath = path.join("./uploaded/", "files/" + req.file.originalname);
            let ext = path.extname(req.file.originalname).toLowerCase();
            if (extToAllow.includes(ext)) {
                fs.rename(tempPath, targetPath, err => {
                    if (err) {
                        res.status(500).contentType("text/plain").end("Oops! Something went wrong!");
                    };
                });
            } else {
                fs.unlink(tempPath, err => {
                    if (err) {
                        res.status(500).contentType("text/plain").end("Oops! Something went wrong!");
                    } else {
                        res.status(403).contentType("text/plain").end("Only .png ,  .jpg ,  .gif,  .jpeg files are allowed!");
                    }
                });
            }
        } else {
            res.status(500).json({ status: httpStatus.failure, errorMsg: error })
        }
        let jsonObj = {
            title: req.body.title,
            description: req.body.description,
            priority: req.body.priority,
            image: targetPath
        }
        Ticket.create(jsonObj).then(ticket => {
            res.status(200).json({ status: httpStatus.success, ticket: ticket });
        }).catch(error => {
            console.log('error while creating  ticket', error);
            res.status(500).json({ status: httpStatus.failure, message: 'Unable to create ticket', errorMsg: error })
        });
    } else {
        Account.findOne({ where: { apikey: req.query.apiKey } }).then(account => {
            if (account.apikey) {
                try {
                    createTicket(req, res)
                } catch (e) {
                    res.status(500).json({ status: httpStatus.failure, apikey: '' });
                }
            }
        }).catch(error => {
            console.log('error while getting account details', error);
            res.status(500).json({ status: httpStatus.failure, message: 'Unable to find account details', errorMsg: error })
        });
    }
})
function createTicket(req, res) {
    var bodyData = {
        "update": {},
        "fields": {
            "summary": req.body.title,
            "issuetype": {
                "id": "10001"
            },
            "project": {
                "id": "10000"
            },
            "priority": {
                // "id": req.body.priority,
                "name": req.body.priority
            },
            "description": {
                "type": "doc",
                "version": 1,
                "content": [{
                    "type": "paragraph",
                    "content": [{
                        "text": req.body.description,
                        "type": "text"
                    }]
                }]
            }
        }
    };

    options = {
        method: 'POST',
        url: Env.jUrl + '/rest/api/3/issue',
        auth: { username: Env.jName, password: Env.jPwd },
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(bodyData)
    };
    request(options, function (error, response, body) {
        if (error) {
            res.status(500).json({ status: httpStatus.failure, result: 'unable to create Ticket', error: error });
        } else if (JSON.parse(body).errors) {
            res.status(500).json({ status: httpStatus.failure, result: 'unable to create Ticket', error: JSON.parse(body).errors });
        } else {
            res.status(200).json({ status: httpStatus.success, body: JSON.parse(body) });
        }
    })
}

module.exports = router;
