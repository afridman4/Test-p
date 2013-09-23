// generic apiProvider

var Driver = require('./mongodb-driver').Driver;
// var winston = require('winston');
var assert = require('assert');
var querystring = require('querystring');

// winston.add(winston.transports.File, { filename: './output.log'});
// console.log('Added winston transport');
/*
//    Templates for various records
*/
var HTYPE_TEMPLATE =
{
    name: 'default',
	displayname: 'default',
    description: '',
	keywords: ['']
};

var PLAN_TEMPLATE =
{
    htype: 'default',
    planname: 'default',
    provider: 'default',
    prices : [                 	// array of price objects
		{	currency : "USD",
			timeunit : "month",
			unit : "ALL",
			numbertimeunit : 1,
			price : 0
		}],
   generalrating: 0,               //  integral rating from 0 to 10
   numberofreviews: 0,
   description: '',
   advprice: 9.99
};

var PROVIDER_TEMPLATE =
{
    provider: 'default',    // provider name (unique)
    affiliation: false,     // true if BWCH is affiliated with this provider
    affiliationlink: '',
    address: {
       streetaddress: '',
       city: '',
       state: '',
       postalcode: '',
       country: ''
    },
    website: 'url',
    phonenumbers: [],
    generalrating: 0,
    numberofreviews: 0,
    description: ''
};

var FEATURE_TEMPLATE = 
{
    htype: 'default',   // for what htype is applicable
	name:'default',
    display:'description',
    type:'',		// actually this is enum int, bool (yes, no), string, oneof, enum,
    ismultiple:0,   // allow multiple choice
	unit:'',		// unit of measurement, like Mb, Hz, etc.
	maxvalue: 0,
	minvalue: 0,
	defaultvalue:0,
	hasany: false,		// should show Any in the dialog, applicable for int, enum (for enum means at least one from selected
	hasunlimited:false,	// should show Unlimited
	values: [],	        // for enum list of possible values
	hasall:false,		// for enum option 'all selected'
	operation:''	    // how to compare int  'le', 'ge' or 'eq'
};

var REVIEW_TEMPLATE =
{
    author: 'default',
    time: 0,
    provider: '',
    plan: '',
    generalratings: 0,
    ratings: [{ name: "service", rate: 0 }, { name: "relability", rate: 0 },
              { name: "performance", rate: 0 }, { name: "ease of use", rate: 0 },
              { name: "feature set", rate: 0 }],
    text: ''
};

var BANNER_TEMPLATE =
{
    htmlcode: '<html></html>',       // banner code
    alttext:''
};

var USER_TEMPLATE =
{
    name:'',		// visible name
    login:'',		// login
    password:'',    // password hash
    role:0,         // 0 - regular user, 1 - admin
    email:'',
    phone:''
};

ApiController = function () {
    ApiController.driver = new Driver();
}

ApiController.prototype.getHtypes = function (callback) {
    ApiController.driver.getDocs('htypes', {}, callback);
};

ApiController.prototype.getReviews = function (callback) {
    // TODO - should be paged
    ApiController.driver.getDocs('reviews', {}, callback);
};

ApiController.prototype.saveHtypes = function (htypes, callback) {

    if (typeof (htypes.length) == "undefined")
        htypes = [htypes];

    console.log('saveHtypes length : ' + htypes.length);
    for (var i = 0; i < htypes.length; i++) {
        htype = htypes[i];
        console.log('saveHtypes ' + i + ' name: ' + htype.name);
        htype.created = new Date();
    }

    ApiController.driver.saveDocs('htypes', htypes, callback);
};

ApiController.prototype.saveOneHtype = function (htype, callback) {

    if (typeof (htype.length) != "undefined") {
        console.log("SaveOneHType cannot save an array");
        callback("Error: SaveOneHType cannot save an array");
    } else {
//        winston.info('saveOneHtype: ' + htype.name);
        console.log('saveOneHtype: ' + htype.name);
        htype.created = new Date();
        
        ApiController.driver.saveOneDoc('htypes', {name: htype.name}, htype, callback);
    }
};

ApiController.prototype.removeHtype = function( htypeName, callback) {
    console.log("removing htype " + htypeName);
    ApiController.driver.removeDoc('htypes', {name: htypeName}, callback);
};


ApiController.prototype.removeFeature = function( htypeName, featureName, callback) {
    console.log("removing feature "+ featureName + " htype " + htypeName);
    ApiController.driver.removeDoc('features', {htype: htypeName, name: featureName}, callback);
};

ApiController.prototype.removePlan = function(provider, planName, callback) {
    console.log("removing plan "+ planName + " provider " + provider);
    ApiController.driver.removeDoc('plans', {provider: provider, planname: planName}, callback);
};

ApiController.prototype.removeProvider = function( name, callback) {
    console.log("removing provider " + name);
    ApiController.driver.removeDoc('providers', {provider: name}, callback);
};


ApiController.prototype.saveFeature = function (feature, callback) {
    console.log("saveFeature");
    ApiController.driver.saveOneDoc('features', {htype:feature.htype, name:feature.name}, feature, callback);
}

ApiController.prototype.saveBanner = function (banner, callback) {
    console.log("saveBanner");
    ApiController.driver.saveOneDoc('banners', null, banner, callback);
}

ApiController.prototype.removeBanner = function( id, callback) {
    console.log("removing banner id= " + id);
    ApiController.driver.removeDocById('banners', id, callback);
};

ApiController.prototype.removeReview = function( id, callback) {
    console.log("removing review id= " + id);
    ApiController.driver.removeDocById('reviews', id, callback);
};

ApiController.prototype.updatePlanRatings = function (provider, plan, rating) {
    ApiController.driver.getDocs('plans', {provider: provider, planname: plan}, function (err, result){
        if (err == null && result != null && result.length > 0) {
            result[0].generalrating = (result[0].generalrating * result[0].numberofreviews + rating)/(result[0].numberofreviews + 1);
            result[0].numberofreviews++;
            ApiController.driver.saveOneDoc('plans',{provider: provider, planname: plan}, result[0], function(err, docs){ });
        }
    })
};

ApiController.prototype.updateProviderRatings = function (provider, rating) {
    ApiController.driver.getDocs('providers', {provider: provider}, function (err, result){
        if (err == null && result != null && result.length > 0) {
            result[0].generalrating = (result[0].generalrating * result[0].numberofreviews + rating)/(result[0].numberofreviews + 1);
            result[0].numberofreviews++;
            ApiController.driver.saveOneDoc('providers',{provider: provider}, result[0], function(err, docs){ });
        }
    })
};

ApiController.prototype.saveReview = function (review, callback) {
    ApiController.driver.saveDocs('reviews', review, callback);

    if (review.plan != null)
        this.updatePlanRatings(review.provider, review.plan, review.generalratings);

    this.updateProviderRatings(review.provider, review.generalratings);
}

ApiController.prototype.getFeatures = function (htype_name, callback) {
    ApiController.driver.getDocs('features', { "htype" : htype_name}, callback);
}

ApiController.prototype.getFeature = function (htype_name, feature_name, callback) {
    ApiController.driver.getDocs('features', { "htype" : htype_name, "name" : feature_name}, callback);
}

// TODO banners should be returned either randomly, or using some other logic
// TODO maybe priority, or... because I do not know yet this logic, postponed implementation
ApiController.prototype.getNBanners = function (n, callback) {
    ApiController.driver.getRecentNDocs('banners', {}, n, callback);
}

ApiController.getBanners = function(callback) {
    ApiController.driver.getDocs('banners', {}, callback);
}

ApiController.prototype.searchPlans = function (criteria, callback) {
    var query = querystring.parse(criteria);    // create JSON from string
    // 
    console.log('query.htype =' + query.htype);
    ApiController.driver.getDocsSorted('plans', query, { adv_price: 1}, callback);
}

ApiController.prototype.plansProvider = function (provider, callback) {
    ApiController.driver.getDocs('plans', { "provider" : provider}, callback);
}

ApiController.prototype.plan = function(provider, planName, callback) {
    ApiController.driver.getDocs('plans', {provider: provider, planname: planName}, callback);
};

ApiController.prototype.checkPlanFeatures = function (plan, callback) {
    var isDefaultFeature = function (name) {
        name = name.toLowerCase();
        if ((name == '_id') || (name == 'provider') || (name == 'planname') || (name == 'allows') || (name == 'prices'))
            return true;
        else
            return false;
    };

    var names = [];
    var i = 0;
    for (var n in plan) {
        console.log("Plan feature :" + n);
        if (!isDefaultFeature(n)) {
            names[i] = n;
            i = i + 1;
        }
    }

    if (names == null) {
        callback(null, null);
    } else {
        // get all features for all plan.allows
        ApiController.driver.searchNewFeatures(names, callback);
    }
}

ApiController.prototype.savePlan = function (plan, callback) {
    plan.created = new Date();
    ApiController.driver.saveOneDoc('plans', {planname: plan.planname, provider: plan.provider},  plan, callback);
}

ApiController.prototype.saveProvider = function (hostingProvider, callback) {
    ApiController.driver.saveOneDoc('providers', {provider: hostingProvider.provider},  hostingProvider, callback);
}

ApiController.prototype.getTemplate = function(t) {
    switch (t){
        case 'htype':
            return HTYPE_TEMPLATE;
        case 'plan':
            return PLAN_TEMPLATE;
        case 'feature':
            return FEATURE_TEMPLATE;
        case 'provider':
            return PROVIDER_TEMPLATE;
        case 'review':
            return REVIEW_TEMPLATE;
        case 'banner':
            return BANNER_TEMPLATE;
        case 'user':
            return USER_TEMPLATE;
        default :
            console.log('Error - unknown template');
    }
}

ApiController.prototype.getRecentShortReviews = function (n, callback) {
    ApiController.driver.getRecentNDocs('reviews', {}, n, callback);
}

ApiController.prototype.getProviders = function(callback) {
    ApiController.driver.getDocs('providers', {}, callback);
}

ApiController.prototype.saveUser = function (user, callback) {
    console.log("saveUser");
    ApiController.driver.saveOneDoc('users', {login: user.login}, user, callback);
}

exports.ApiController = ApiController;


