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
const uploadtoMemory = require('../config/multer.config').memory;
const uploadtoDisk = require('../config/multer.config').disk;

router.post('/localStorage', uploadtoDisk.single("file"), (req, res, next) => {
  let apiKey = req.headers['x-api-key'];
  if(!apiKey){
    res.status(400).json({ status: httpStatus.failure, 'Message': 'Api Key is missing from headers' });
    return;
  }
  let integrationType = req.query.integrationType;
  Account.findOne({ where: { apikey: apiKey } }).then(account => {
    if(account){
      let jsonObj = {
        title: req.body.title,
        description: req.body.description,
        priority: req.body.priority,
        image: 'uploads/' + req.file.originalname,
        accountId: account.id
      }
      Ticket.create(jsonObj).then(ticket => {
        delete ticket["dataValues"].accountId;
        delete ticket["dataValues"].status;
        delete ticket["dataValues"].createdAt;
        delete ticket["dataValues"].updatedAt;
        res.status(200).json({ status: httpStatus.success, ticket: ticket });
      }).catch(error => {
        console.log('error while creating  ticket', error);
        res.status(500).json({ status: httpStatus.failure, message: 'Error while creating ticket', error: error.message })
      });
    } else {
      res.status(400).json({ status: httpStatus.failure, 'Message': 'In Valid Api Key, No information found in our records' });
    }
  })
})

router.post('/externalStorage', uploadtoMemory.single("file"), (req, res, next) => {
  let apiKey = req.headers['x-api-key'];
  if(!apiKey){
    res.status(400).json({ status: httpStatus.failure, 'Message': 'Api Key is missing from headers' });
    return;
  }
  let integrationType = req.query.integrationType;
  Account.findOne({ where: { apikey: apiKey } }).then(account => {
    if(account){
      createTicket(req, res)
    } else {
      res.status(400).json({ status: httpStatus.failure, 'Message': 'In Valid Api Key, No information found in our records' });
    }
  })
})

router.get('/', (req, res) => {
  let apiKey = req.headers['x-api-key'];
  if(!apiKey){
    res.status(400).json({ status: httpStatus.failure, 'Message': 'Api Key is missing from headers' });
    return;
  }
  Account.findOne({ where: { apikey: apiKey } }).then(account => {
    if(account){
      Ticket.findAll({
        where: {
          accountId: account.id,
          status: 'ACTIVE'
        }
      }).then(tickets => {
        _.forEach(tickets, ticket => {
          delete ticket["dataValues"].accountId;
          delete ticket["dataValues"].status;
          delete ticket["dataValues"].createdAt;
          delete ticket["dataValues"].updatedAt;
        })
        res.status(200).json({ status: httpStatus.success, tickets: tickets });
      }).catch(error => {
        console.log('error while creating  ticket', error);
        res.status(500).json({ status: httpStatus.failure, message: 'Error while creating ticket', error: error.message })
      });
    } else {
      res.status(400).json({ status: httpStatus.failure, 'Message': 'In Valid Api Key, No information found in our records' });
    }
  })
})

function createTicket(req, res) {
  console.log(req.file.buffer);
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
      if(req.file){
        let formData = {
          file: {
            value: req.file.buffer,
            options: {
              filename: req.file.originalname,
              'Content-Type': 'multipart/form-data'
            }
          }
        };
        let options2 = {
          method: 'POST',
          url: JSON.parse(body).self + '/attachments',
          headers: {
            'Authorization': `Basic ${Buffer.from(
              Env.jName + ':' + Env.jPwd
            ).toString('base64')}`,
           'Accept': 'application/json',
           'Content-Type': 'multipart/form-data',
           'X-Atlassian-Token': 'no-check'
          },
          formData: formData
        };
        request(options2, function (err, resp, body1) {
          if (err){
            res.status(500).json({ status: httpStatus.failure, message: 'Error while getting data from jira apis', result: 'unable to Add Attachements', error: err });
          } else if(JSON.parse(body1).errors){
            res.status(500).json({ status: httpStatus.failure, message: 'Error while getting data from jira apis', result: 'unable to Add Attachements', error: JSON.parse(body1).errors });
          } else {
            res.status(200).json({ status: httpStatus.success, id: JSON.parse(body).key, Link: JSON.parse(body).self, attachments: JSON.parse(body1) });
          }
        })
      } else {
        res.status(200).json({ status: httpStatus.success, id: JSON.parse(body).key, Link: JSON.parse(body).self });
      }
    }
  })
}

module.exports = router;
