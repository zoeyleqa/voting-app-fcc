'use strict';

var Users = require('../models/users.js');
var Polls = require('../models/poll.js');
var shortid = require('short-id');

function pollHandler () {
	
	
	
	this.getVote = function (req, res) {
		Polls
			.findOne({ 'id' : req.params.pid })
			.exec(function (err, result) {
				if (err) { throw err; }
				// console.log('getVote');
				// console.log(result);
				// console.log(req.params.id);
				// console.log(req.params.pid);
				// console.log(JSON.stringify(result));
				
				res.json(result);
			});
	};
	
	this.addVote = function (req, res) {
		// console.log(req.body.value);
		// console.log(req.body.name);
		// console.log('addvote');
		Polls
			.findOneAndUpdate({ "id" :  req.params.pid, 
						"a.opt": req.body.value },
						{ $inc: {"a.$.numVote" : 1 }}, {new: true})
			.exec(function (err, result) {
				if (err) { throw err; }
				
				// console.log(result);
				// console.log(req.params.id);
				// console.log(req.params.pid);
				// console.log(JSON.stringify(result));
				// console.log('addvote');
				res.json(result);
			});
	
	};
	
	this.getPollList = function (req, res) {
		// console.log(req.user.github.id);
		Users
			.findOne({ 'github.id': req.user.github.id }, {'github.pollList': true})
			.exec(function (err, result) {
				// if (err) { throw err; }
				// var arr = [];
				// result.foreach(function(question){
				// console.log(question);
				// arr.push(question);
				// });
				console.log(result.github.pollList);
				res.json(result);
			}); 
	};
	
	
	this.addPoll = function (req, res) {
		var arr = [];
			req.body.opt.forEach(function(option){
				arr.push({opt: option, numVote: 0});
			});
			
		var pid  = shortid.generate();
		var newpoll = new Polls();
		newpoll.id =  pid;
		newpoll.q = req.body.question;
		newpoll.a = arr;
		
		newpoll.save(function(err){
			if(err) throw err;
		var poll  = {id:pid, q:req.body.question};	
		Users
			.findOneAndUpdate({ 'github.id': req.user.github.id }, 
							{ $push: { 'github.pollList': poll } },{new:true})
			.exec(function (err, result) {
					if (err) { throw err; }
					// console.log(JSON.stringify(result));
					// console.log(result);
					// result.nbrClicks = undefined;
					// result.save(function(err){if(err)  throw err;});
					// console.log(result);
			res.redirect('/api/'+req.user.github.id+'/'+pid+'/confirm');
					// res.json(result.poll);
			});
			
		});
	};
	
	

	
	this.delPoll = function (req, res) {
		console.log(req.body.id);
		Users
			.findOneAndUpdate({ 'github.id': req.user.github.id }, 
			{ $pull: { 'github.pollList' : {id: req.body.id}}},
			{new:true})
			.exec(function (err, result) {
					if (err) { throw err; }
					console.log('user');
					console.log(result.github.pollList);
			
			Polls.findOneAndRemove({'id' : req.body.id}, function(err, result){
					if (err) { throw err }
					
					console.log('poll');
					console.log(result);
					res.json(result);
				});
				
				}
			);
	};

}

module.exports = pollHandler;
