
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , api = require('./api')
  , http = require('http')
  , url = require("url")    
  , path = require('path');


var ApiProvider = require('./apicontroller').ApiController;
var Authenticator = require ('./checkauth').Authenticator;

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.cookieParser());
app.use(express.session({secret: 'bwch-sss'}));
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// var auth = express.basicAuth('testuser', 'testpass');
//app.use(auth);


// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);

/*
var apiController = new ApiController();
*/
var authenticator = new Authenticator();

//
// Authentication
//

app.post('/api/login', authenticator.login);
app.post('/api/logout', authenticator.logout);

/*
app.all('/api/0.1/*', authenticator.checkLogin, function (res, req, next) {
    next();
});
*/

//
// Save part of the API - POST methods
//
app.post('/api/0.1/savehtypes', api.saveHtypes);
app.post('/api/0.1/savehtype', api.saveHtype);
app.post('/api/0.1/saveprovider',api.saveProvider);
app.post('/api/0.1/saveplan',api.savePlan);
app.post('/api/0.1/savefeature', api.saveFeature);
app.post('/api/0.1/savereview', api.saveReview);
app.post('/api/0.1/saveuser', api.saveUser);
app.post('/api/0.1/savebanner', api.saveBanner)

//
// GET methods
//

app.get('/api/0.1/htypes', api.htypes);
app.get('/api/0.1/features/:htype', api.features);
app.get('/api/0.1/reviews/short/recent/:n', api.reviewsShortRecent);
app.get('/api/0.1/reviews', api.reviews);
app.get('/api/0.1/banners', api.banners);
app.get('/api/0.1/banners/:n', api.bannersN);
app.get('/api/0.1/plans/search/:criteria', api.plansSearch);
app.get('/api/0.1/plans/:provider', api.plansProvider);
app.get('/api/0.1/plan/:provider/:planName', api.plan);
app.get('/api/0.1/providers', api.providers);

//
// DELETE methods
//
app.delete('/api/0.1/removehtype/:htype', api.removeHtype);
app.delete('/api/0.1/removefeature/:htype/:feature', api.removeFeature);
app.delete('/api/0.1/removeprovider/:provider', api.removeProvider);
app.delete('/api/0.1/removeplan/:provider/:planName', api.removePlan);
app.delete('/api/0.1/removebanner/:id', api.removeBanner);
app.delete('/api/0.1/removereview/:id', api.removeReview);


/***********************************************************************************
//
// Test methods
//
************************************************************************************/
/*
app.get('/api/test/savehtypes', function (req, res) {
    htype = apiController.getTemplate('htype');
    htype.name = 'web';
    htype.display_name = 'Create and host myweb site';
    htype.description = '';
    htype.keywords = ["web", "site", "shared"];

    apiController.saveHtypes(htype,
            function (error, docs) {
                if (error) {
                    res.send('Error:' + error);
                }
                res.send(docs);
            })
});
 */
app.get('/api/test/savefeature', api.testSaveFeature);


app.get('/api/test/savereview', api.testSaveReview);

app.get('/api/test/saveplan', api.testSavePlan);

app.get('/api/test/savebanner', api.testSaveBanner);

/*
app.get('/api/test/checkplanfeatures', function (req, res) {
    apiController.checkPlanFeatures(
    { 
        provider: 'hostgator',
        planname: 'web hosting 1',
        allows: ['web'], 		// array of htypes name
        prices : [
		{
			currency : "USD",
			timeunit : "month",
			unit : "ALL",
			number_timeunit : 1,
			price : 6.99
		},
		{
			currency : "USD",
			timeunit : "month",
			unit : "",
			number_timeunit : 12,
			price : 4.99
		}
        ],	// array of price objects

        disk_space: "unlimited",
        domain_registratin: "free",
        bandwith: "unlimited",
        email_accounts: 5,
        os: [ "windows", "linux"],
       database: [ "mySQL", "Postgress" ],
       description: "Domain registration (free), Disk space (unlimited), Bandwidth (unlimited), SSL Certificate, Dedicated IP�number (1-2 or 3)",
       features : [	"SSL Certificate", "Website statistics"	],
	   shoping_cart : [	"osCommerce","ZenCart", "Cube Cart" ], 
       address: {
                streetAddress: "Main st., 101, apt.101",
                city: "Zentown",
                postalCode: '101101'
               },
        phoneNumbers: ["812 123-1234", "916 123-4567" ]	
    },
    
     function (error, docs) {
         if (error) {
               res.send('Error:' + error);
          }
          res.send(docs);
      })
});
*/


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
