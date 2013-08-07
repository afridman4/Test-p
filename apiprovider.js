// generic apiProvider

var Provider = require('./mongodb-provider').Provider;
var assert = require('assert');
var querystring = require('querystring');

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
    rating: 0,
    description: ''
};

var FEATURE_TEMPLATE = 
{
    htype: 'default',   // for what htype is applicable
	name:'default',
    type:'',		// actually this is enum int, bool (yes, no), string, oneof, enum, 
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
    image:'url',		// image URL
	url:'url'		// target URL	
};

ApiProvider = function () {
    this.provider = new Provider();
}

ApiProvider.prototype.getHtypes = function (callback) {
    this.provider.getDocs('htypes', {}, callback);
};

ApiProvider.prototype.getReviews = function (callback) {
};

ApiProvider.prototype.saveHtypes = function (htypes, callback) {

    if (typeof (htypes.length) == "undefined")
        htypes = [htypes];

    console.log('saveHtypes length : ' + htypes.length);
    for (var i = 0; i < htypes.length; i++) {
        htype = htypes[i];
        console.log('saveHtypes ' + i + ' name: ' + htype.name);
        htype.created = new Date();
    }

    this.provider.saveDocs('htypes', htypes, callback);
};

ApiProvider.prototype.saveOneHtype = function (htype, callback) {

    if (typeof (htype.length) != "undefined") {
        console.log("SaveOneHType cannot save an array");
        callback("Error: SaveOneHType cannot save an array");
    } else {
        console.log('saveOneHtype: ' + htype.name);
        htype.created = new Date();
        
        this.provider.saveOneDoc('htypes', {name: htype.name}, htype, callback);
    }
};

ApiProvider.prototype.removeHtype = function( htypeName, callback) {
    console.log("removing htype " + htypeName);
    this.provider.removeDoc('htypes', {name: htypeName}, callback);
};


ApiProvider.prototype.removeFeature = function( htypeName, featureName, callback) {
    console.log("removing feature "+ featureName + " htype " + htypeName);
    this.provider.removeDoc('features', {htype: htypeName, name: featureName}, callback);
};

ApiProvider.prototype.removePlan = function(provider, planName, callback) {
    console.log("removing plan "+ planName + " provider " + provider);
    this.provider.removeDoc('plans', {provider: provider, planname: planName}, callback);
};

ApiProvider.prototype.removeProvider = function( name, callback) {
    console.log("removing provider " + name);
    this.provider.removeDoc('providers', {provider: name}, callback);
};


ApiProvider.prototype.saveFeature = function (feature, callback) {
    console.log("saveFeature");
    this.provider.saveOneDoc('features', {htype:feature.htype, name:feature.name}, feature, callback);
}

ApiProvider.prototype.saveReview = function (review, callback) {
    this.provider.saveDocs('reviews', review, callback);
}

ApiProvider.prototype.getFeatures = function (htype_name, callback) {
    this.provider.getDocs('features', { "htype" : htype_name}, callback);
}

// TODO banners should be returned either randomly, or using some other logic
// TODO maybe priority, or... because I do not know yet this logic, postponed implementation
ApiProvider.prototype.getBanners = function (n, callback) {
    this.provider.getRecentNDocs('banners', {}, n, callback);
}

ApiProvider.prototype.searchPlans = function (criteria, callback) {
    var query = querystring.parse(criteria);    // create JSON from string
    // 
    console.log('query.htype =' + query.htype);
    this.provider.getDocsSorted('plans', query, { adv_price: 1}, callback);
}

ApiProvider.prototype.plansProvider = function (provider, callback) {
    this.provider.getDocs('plans', { "provider" : provider}, callback);
}

ApiProvider.prototype.plan = function(provider, planName, callback) {
    this.provider.getDocs('plans', {provider: provider, planname: planName}, callback);
};

ApiProvider.prototype.checkPlanFeatures = function (plan, callback) {
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
        this.provider.searchNewFeatures(names, callback);
    }
}

ApiProvider.prototype.savePlan = function (plan, callback) {
    plan.created = new Date();
    this.provider.saveOneDoc('plans', {planname: plan.planname, provider: plan.provider},  plan, callback);
}

ApiProvider.prototype.getTemplate = function(t) {
    switch (t){
        case 'htype':
            return HTYPE_TEMPLATE;
        case 'plan':
            return PLAN_TEMPLATE;
        case 'feature':
            return FEATURE_TEMPLATE;
        case 'review':
            return REVIEW_TEMPLATE;
        case 'banner':
            return BANNER_TEMPLATE;
        default :
            console.log('Error - unknown template');
    }
}

ApiProvider.prototype.getRecentShortReviews = function (n, callback) {
    this.provider.getRecentNDocs('reviews', {}, n, callback);
}

ApiProvider.prototype.getProviders = function(callback) {
    this.provider.getDocs('providers', {}, callback);
}

exports.ApiProvider = ApiProvider;


