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
		var bestMatch;
		var bestMatchSum;
		for(var i = 0; i< apiJson.length; i++){
			if(userName !== apiJson[i].name) {
				var currentMatchObj = apiJson[i];
				var currentMatchScores = apiJson[i].scores;
				var matchArr = [];
				for(var j = 0; j<10; j++) {
					matchArr.push(Math.abs(userScores[j]-currentMatchScores[j]));
				}
				var sum = matchArr.reduce(apiRoutes.add, 0);
				if(bestMatch === undefined) {
					bestMatch = currentMatchObj;
					bestMatchSum = currentMatchScores.reduce(apiRoutes.add,0);
				}
				else if(sum<bestMatchSum) {
					bestMatch = currentMatchObj;
				}
			}
		}
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