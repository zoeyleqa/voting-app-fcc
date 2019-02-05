'use strict';

var path = process.cwd();
var PollHandler = require(path + '/app/controllers/pollHandler.server.js');


module.exports = function(app, passport) {

	function isLoggedIn(req, res, next) {
		if (req.isAuthenticated()) {
			return next();
		}
		else {
			res.redirect('/login');
		}
	}


	var pollHandler = new PollHandler();

	//main. direct to login page if the user has not
	app.route('/')
		.get(isLoggedIn, function(req, res) {
			res.sendFile(path + '/public/index.html');
		});

	//rout to login page
	app.route('/login')
		.get(function(req, res) {
			res.sendFile(path + '/public/login.html');
		});

	//route to logout
	app.route('/logout')
		.get(function(req, res) {
			req.logout();
			res.redirect('/login');
		});

	//profile page
	app.route('/profile')
		.get(isLoggedIn, function(req, res) {
			res.sendFile(path + '/public/profile.html');
		});

	//create new poll	
	app.route('/newpoll')
		.get(isLoggedIn, function(req,res) {
			res.sendFile(path + '/public/newpoll.html');
		});

	//see user's poll database	
	app.route('/mypoll')
		.get(isLoggedIn, function(req, res) {
			res.sendFile(path + '/public/mypoll.html');
		});

	//user's result page of a poll 	
	app.route('/result/:pid')
		.get(isLoggedIn, function(req, res) {
			res.sendFile(path + '/public/result.html');
		});

	//get user's info		
	app.route('/api/:id')
		.get(isLoggedIn, function(req, res) {
			res.json(req.user.github);
		});

	//authorized github account, handled by passport.js
	app.route('/auth/github')
		.get(passport.authenticate('github'));

	//authorized github account, handled by passport.js
	app.route('/auth/github/callback')
		.get(passport.authenticate('github', {
			successRedirect: '/',
			failureRedirect: '/login'
		}));

	//direct to confirm page after create a new poll
	app.route('/api/:id/:pid/confirm') //maybe lose api	
		.get(function(req, res) {
			res.sendFile(path + '/public/confirm.html');
		});


	//direct to vote page for voter		
	app.route('/:id/vote/:pid')
		.get(function(req, res) {
			res.sendFile(path + '/public/voteface.html');
		});
	// .post(pollHandler.addVote);

	//api for vote page		
	app.route('/api/:id/vote/:pid')
		.get(pollHandler.getVote) //get number of votes to show result after voting
		.post(pollHandler.addVote); //add vote


	//api for my poll page		
	app.route('/api/:id/poll')
		.get(isLoggedIn, pollHandler.getPollList) //show poll list in mypoll page
		.post(isLoggedIn, pollHandler.addPoll) //called when creating new poll
		.delete(isLoggedIn, pollHandler.delPoll); //delete poll in mypoll page



};
