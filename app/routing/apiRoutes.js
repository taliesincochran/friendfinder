var friends = require("./../data/friends.js");
apiRoutes = {
	user: "",
	bestMatch: {},
	//function to use inside the reduce function
	add: function add (a,b) {
		return a+b;
	},
	//Function to find the best match for a new user
	findMatch: function(userdata, apiJson) {
		var userName = userdata.name;
		var userScores = userdata.scores;
		var friendArr = [];
		for(var i = 0; i< apiJson.length; i++){
			if(userName !== apiJson[i].name) {
				var currentMatchObj = apiJson[i];
				var currentMatchScores = apiJson[i].scores;
				var matchArr = [];				
				for(var j = 0; j<10; j++) {
					matchArr.push(Math.abs(userScores[j]-currentMatchScores[j]));
				}
				var sum = matchArr.reduce(apiRoutes.add, 0);
				console.log(apiJson[i].name, sum);
				friendArr.push({name: apiJson[i].name, score: sum})
			}
		}
		friendArr.sort(function(a, b) {
    			return a.score - b.score;});
		console.log("friendArr 0:", friendArr[0]);
		function findBestMatch(friend) {
			return friend.name === friendArr[0].name;
		};
		var bestMatch = apiJson.find(findBestMatch);

		return bestMatch;
	},
	routes: function(app) {
		app.post("/api/friends", function(req,res) {
			apiRoutes.user = req.body;
			friends.array.push(req.body);
			console.log(req.body.name + " added sucessfully.");
			res.json({});
		});
		//logic for survey data and finding best match
		app.get("/bestMatch", function(req,res) {
			var bestMatch = apiRoutes.findMatch(apiRoutes.user, friends.array);
			console.log(bestMatch);
			res.json(bestMatch);
		});
		app.get("/api/friends", function(req,res) {
			res.json(friends.array);
		});
	}
}
module.exports = apiRoutes;