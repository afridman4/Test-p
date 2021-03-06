// generic apiProvider

var Driver = require('./mongodb-driver').Driver;
var assert = require('assert');
var querystring = require('querystring');

/*
//    Templates for various records
*/
var HTYPE_TEMPLATE =
{
    name: 'default',
	display_name: 'default',
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
   fprices : [
        {   feature : 'diskspace',
            freevalue: 2,
            numberunit : 1,
            price : 0
        }],
   generalrating: 0,               //  integral rating from 0 to 10
   numberofreviews: 0,
   ratings: [                       // array of specific ratings
        { name: "service", rate: 0 },
        { name: "reliability", rate: 0 },
        { name: "performance", rate: 0 },
        { name: "ease of use", rate: 0 },
        { name: "feature set", rate: 0 }
   ],
   short_description: '',
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
    ratings: [                       // array of specific ratings
        { name: "service", rate: 0 },
        { name: "reliability", rate: 0 },
        { name: "performance", rate: 0 },
        { name: "ease of use", rate: 0 },
        { name: "feature set", rate: 0 }
    ],
    description: ''
};

var FEATURE_TEMPLATE = 
{
    htype: 'default',   // for what htype is applicable
	name:'default',
    displayname:'description',
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
    ratings: [{ name: "service", rate: 0 }, { name: "reliability", rate: 0 },
              { name: "performance", rate: 0 }, { name: "ease of use", rate: 0 },
              { name: "feature set", rate: 0 }],
    text: ''
};

var BANNER_TEMPLATE =
{
    htmlcode: '<html></html>',       // banner code
    alttext:'',
    height: 250,                    // banner height (we support 250 and 60)
    priority: 0,                     // priority - most important first
    time: 0
};

var USER_TEMPLATE =
{
    name:'',		// visible name
    login:'',		// login
    password:'',    // password hash
    role:0,         // 0 - regular user, 1 - admin
    email: '',      //
    phone:''
};

ApiController = function (dbDriver) {
    console.log("ApiController constructor");
//    ApiController.driver = new Driver();
    ApiController.driver = dbDriver;
}

var featuresInts = [];

findInFeaturesInts = function(name)
{
    for (var i = 0; i < featuresInts.length; i++)
        if (featuresInts[i]==name)
            return i;

    return -1;
}

loadFeatures = function(driver)
{
    driver.getDocs('features', {}, function (error, features) {
        if (error) {
            ;
        } else {
            console.log("Loaded features "+features.length);
            for (var i = 0; i < features.length; i++) {
                if (features[i].type == 'int') {
                    if (findInFeaturesInts(features[i].name) < 0)
                        featuresInts.push(features[i].name);
                }
            }
            console.log("Save int features "+featuresInts.length);
        }
    })
}

ApiController.prototype.getHtypes = function (callback) {
    ApiController.driver.getDocsSorted('htypes', {}, { sort_order: 1}, callback);
};

ApiController.prototype.getHtype = function (htypeName, callback) {
    ApiController.driver.getDocs('htypes', {name: htypeName}, callback);
};

ApiController.prototype.getReviews = function (callback) {
    // TODO - should be paged
    ApiController.driver.getDocs('reviews', {}, callback);
};

ApiController.prototype.getReview = function (id, callback) {
    ApiController.driver.getDocById('reviews', id, callback);
};


ApiController.prototype.getReviewsPlanProvider = function (providerName, planName, callback) {

    console.log("Get reviews: "+ providerName +":"+planName+":");
    if (providerName.length == 0)
        ApiController.driver.getDocs('reviews', {plan:planName}, callback);
    else if (planName.length == 0)
        ApiController.driver.getDocs('reviews', {provider:providerName}, callback);
    else
        ApiController.driver.getDocs('reviews', {provider:providerName, plan:planName}, callback);
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

ApiController.prototype.removeUser = function( loginName, callback) {
    console.log("removing user " + loginName);
    ApiController.driver.removeDoc('users', {login: loginName}, callback);
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
    if (featuresInts.length == 0) {
        loadFeatures(ApiController.driver);
    }

    if (feature.type == "int")
        featuresInts.push(feature.name);

    ApiController.driver.saveOneDoc('features', {htype:feature.htype, name:feature.name}, feature, callback);
}

ApiController.prototype.saveBanner = function (banner, callback) {
    console.log("saveBanner");
    if (typeof (banner.height) == "undefined")
        banner.height = 250;
    if (typeof (banner.priority) == "undefined")
        banner.priority = 0;
    if (typeof (banner.time) == "undefined")
        banner.time = new Date();

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

ApiController.prototype.updatePlanRatings = function (provider, plan, generalrating, ratings) {
    ApiController.driver.getDocs('plans', {provider: provider, planname: plan}, function (err, result){
        if (err == null && result != null && result.length > 0) {
            if (typeof (result[0].generalrating) == "undefined")
                    result[0].generalrating = 0;
            if (typeof (result[0].numberofreviews) == "undefined")
                    result[0].numberofreviews = 0;

            result[0].generalrating = (result[0].generalrating * result[0].numberofreviews + generalrating)/(result[0].numberofreviews + 1);

            if (typeof(result[0].ratings) == "undefined" || result[0].ratings == null || result[0].ratings.length == 0)
            {
                result[0].ratings = REVIEW_TEMPLATE.ratings;
            }

            for (var i = 0; i < result[0].ratings.length; i++) {
                for (var j = 0; j < ratings.length; j++) {
                    if (ratings[j].name == result[0].ratings[i].name) {
                        if (ratings[j].rate > 0)
                            result[0].ratings[i].rate = (result[0].ratings[i].rate * result[0].numberofreviews + ratings[j].rate)/(result[0].numberofreviews + 1);
                        break;
                    }
                }
            }

            result[0].numberofreviews++;

            ApiController.driver.saveOneDoc('plans',{provider: provider, planname: plan}, result[0], function(err, docs){ });
        }
    })
};

ApiController.prototype.updateProviderRatings = function (provider, generalrating, ratings) {
    ApiController.driver.getDocs('providers', {provider: provider}, function (err, result){
        if (err == null && result != null && result.length > 0) {
            if (typeof (result[0].generalrating) == "undefined")
                result[0].generalrating = 0;
            if (typeof (result[0].numberofreviews) == "undefined")
                result[0].numberofreviews = 0;

            result[0].generalrating = (result[0].generalrating * result[0].numberofreviews + generalrating)/(result[0].numberofreviews + 1);

            if (typeof(result[0].ratings) == "undefined" || result[0].ratings == null || result[0].ratings.length == 0)
            {
                result[0].ratings = REVIEW_TEMPLATE.ratings;
            }

            for (var i = 0; i < result[0].ratings.length; i++) {
                for (var j = 0; j < ratings.length; j++) {
                    if (ratings[j].name == result[0].ratings[i].name){
                        if (ratings[j].rate > 0)
                            result[0].ratings[i].rate = (result[0].ratings[i].rate * result[0].numberofreviews + ratings[j].rate)/(result[0].numberofreviews + 1);
                        break;
                    }
                }
            }

            result[0].numberofreviews++;

            ApiController.driver.saveOneDoc('providers',{provider: provider}, result[0], function(err, docs){ });
        }
    })
};

ApiController.prototype.saveReview = function (review, callback) {
    ApiController.driver.saveDocs('reviews', review, callback);

    if (typeof(review.ratings) == "undefined" || review.ratings == null || review.ratings.length == 0)
    {
        review.ratings = REVIEW_TEMPLATE.ratings;
    }

    if (review.plan != null)
        this.updatePlanRatings(review.provider, review.plan, review.generalratings, review.ratings);

    this.updateProviderRatings(review.provider, review.generalratings, review.ratings);
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

ApiController.prototype.getRandomNBanners = function (n, h, callback) {
    ApiController.driver.getRandomNDocs('banners', {"height": parseInt(h)}, n, callback);
}

ApiController.getBanners = function(callback) {
    ApiController.driver.getDocs('banners', {}, callback);
}

planAdjustPrice = function(plan, target)
{
    if (typeof (plan.fprices) != 'undefined' && (plan.fprices.length > 0) && target.length > 0) {
        for (var i=0; i < plan.fprices.length; i++ )   {
            console.log("fprice:" + plan.fprices[i].feature);
            for (var j=0; j < target.length; j++)
                {
                  console.log(target[j].fname);
                   if (plan.fprices[i].feature == target[j].fname) {
                       if (target[j].fvalue =='yes') {
                           plan.advprice += plan.fprices[i].price;
                       } else if (target[j].fvalue > plan.fprices[i].freevalue) {
                           console.log("Adjustment:");
                            plan.advprice += (target[j].fvalue - plan.fprices[i].freevalue)/plan.fprices[i].numberunit * plan.fprices[i].price;
                       }
                   }
                }
        }
    }
}

ApiController.prototype.searchPlans = function (criteria, order_by, callback) {
    criteria = criteria.replace(new RegExp('ZZ[a-z]+YY','g'),'$or');
    console.log("Search plans by:"+criteria);
    // parse criteria to find features

    var start = 0;
    var fArray = new Array();

    while ((index = criteria.indexOf("$or", start)) > 0) {
        index1 = criteria.indexOf('"', index+8);
        index2 = criteria.indexOf('$gte', index1);
        index3 = criteria.indexOf('}', index2+6);
        console.log("Extract :"+ criteria.substring(index+8, index1)+":"+criteria.substring(index2+6,index3));
        fArray.push({'fname': criteria.substring(index+8, index1),'fvalue': criteria.substring(index2+6,index3)});
        start = index3;
    }

    var query = JSON.parse(criteria);    // create JSON from string
    if (order_by == null)
        ApiController.driver.getDocsSorted('plans', query, { advprice: 1}, function (error, plans) {
            if (error != null)
                callback(error);
            if (plans == null)
                callback(error, plans);
            else {

                for (var i = 0; i < plans.length; i++)
                {
                    console.log("adjust plan "+plans[i].planname);
                    planAdjustPrice(plans[i], fArray);
                }

                callback(error, plans);
            }
        });
    else {
        ApiController.driver.getDocsSorted('plans', query, order_by, callback);
    }
}

ApiController.prototype.searchBestPlans = function (n, callback) {
        ApiController.driver.getDocsOptions('plans', {}, { limit: n, sort: { generalrating: -1 }}, callback);
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

    // make sure that int features are saved as numbers
    // fix for  problems in GUI

    if (featuresInts.length == 0) {
        loadFeatures(ApiController.driver);
    }

    for (var key in plan) {
        for (var i=0; i < featuresInts.length; i++) {
            if (key == featuresInts[i]) {
                if (typeof(plan[key]) != 'number' && plan[key] != 'UNLIMITED' && plan[key] != 'UNSPECIFIED'  ) {
                    plan[key] = (+plan[key]);
                    console.log("Feature "+key+" updated with "+plan[key]);
                }
            }
        }
    }

    // modify plan for specific cases
    // 1. VPS performance - could set feature cpu, could be cpufreq
    //     we add value ANY to the feature that was not set explicitely

    if (plan.htype == "VPS") {
        if ((typeof (plan.cpu) != "undefined") && (typeof (plan.cpufreq) == "undefined"))
            plan.cpufreq = 'UNSPECIFIED';
        else if ((typeof (plan.cpu) == "undefined") && (typeof (plan.cpufreq) != "undefined"))
            plan.cpu = 'UNSPECIFIED';
    }


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

ApiController.prototype.getRecentShortReviews = function (n, user, callback) {
    if (user == null) {
        ApiController.driver.getRecentNDocs('reviews', {}, n, callback);
    } else {
        ApiController.driver.getRecentNDocs('reviews', {author:user}, n, callback);
    }
}

ApiController.prototype.getProviders = function(callback) {
    ApiController.driver.getDocs('providers', {}, callback);
}

ApiController.prototype.provider = function(provider, callback) {
    ApiController.driver.getDocs('providers', {provider: provider}, callback);
};


ApiController.prototype.saveUser = function (user, callback) {
    console.log("saveUser");
    ApiController.driver.saveOneDoc('users', {login: user.login}, user, callback);
}

ApiController.prototype.user = function(loginName, callback) {
    ApiController.driver.getDocs('users', {login: loginName}, callback);
};

ApiController.prototype.searchUsers = function (criteria, callback) {
    var query = JSON.parse(criteria);    // create JSON from string
    console.log('Search users by' + query.name);
    ApiController.driver.getDocsSorted('users', query, { name: 1}, callback);
}

//

calculate = function(plan, features, timeperiod) {
    var price = 0;
    for (var i = 0; i < plan.prices.length; i++) {
        if (plan.prices[i].numbertimeunit > timeperiod) {
            break;
        }
        price = plan.prices[i].price * timeperiod;
    }

    if (typeof (plan.fprices) == 'undefined' || plan.fprices.length == 0)
        return price;

    // add price for additional features

    for (var i=0; i < plan.fprices.length; i++ )   {
        console.log("fprice:" + plan.fprices[i].feature );
        for (var j=0; j < features.length; j++)
        {
            console.log(features[j].fname);
            if (plan.fprices[i].feature == features[j].fname) {
                if (features[j].fvalue =='yes') {
                  price += plan.fprices[i].price * timeperiod;
                } else if (features[j].fvalue > plan.fprices[i].freevalue) {
                    console.log("Adjustment:");
                    price += ((features[j].fvalue - plan.fprices[i].freevalue)/plan.fprices[i].numberunit * plan.fprices[i].price)*timeperiod;
                }
            }
        }
    }

    return price;
}

//
ApiController.prototype.priceCalculate = function(object, callback) {
    console.log("priceCalculate for "+object.provider+":"+object.planname);
    ApiController.driver.getDocs('plans', {provider:object.provider, planname:object.planname}, function (error, plans) {
        if (error != null)
            callback(error);
        else if (plans == null || plans.length == 0)
            callback(error, plans);
        else {
            callback(error, calculate(plans[0], object.features, object.timeperiod).toString());
        }
    });
}

exports.ApiController = ApiController;


