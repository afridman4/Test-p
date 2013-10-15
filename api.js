/**
 * Created with JetBrains WebStorm.
 * User: Alexander
 * Date: 02.08.13
 * Time: 17:18
 * To change this template use File | Settings | File Templates.
 */

//var ApiController = require('./apicontroller').ApiController;
//var apiController = new ApiController();

var apiController;

exports.apiInit = function (controller) {
    console.log("apiInit");
    apiController = controller;
}

exports.htypes = function(req, res){
    console.log("getting htypes");
    apiController.getHtypes(function (error, htypes) {
        if (error) {
            res.send(404, 'Error:' + error);
        }
        res.send(200, htypes);
    })
};

exports.htype = function(req, res){
    console.log("getting htype "+req.param("hname"));
    apiController.getHtype(req.param("hname"), function (error, htypes) {
        if (error) {
            res.send(404, 'Error:' + error);
        }
        res.send(200, htypes);
    })
};

exports.reviews = function(req, res){
    console.log("getting reviews");
    apiController.getReviews(function (error, htypes) {
        if (error) {
            res.send(404, 'Error:' + error);
        }
        res.send(200, htypes);
    })
};

exports.reviewsProviderPlan = function(req, res) {
    console.log("getting reviews for provider "+req.param("provider")+" plan "+req.param("planName"));
    apiController.getReviewsPlanProvider(req.param("provider"), req.param("planName"),function (error, results){
        if (error) {
            res.send(404, 'Error:' + error);
        }
        res.send(200, results);
    })
};

exports.saveHtypes = function (req, res) {
    apiController.saveHtypes(req.body,
        function (error, docs) {
            if (error) {
                res.send(404, error);
            }
            res.send(201, docs);
        });
};

exports.saveHtype = function (req, res) {
    apiController.saveOneHtype(req.body,
        function (error, docs) {
            if (error) {
                res.send(404,error);
            }
            res.send(201, docs);
        })
};

exports.saveProvider = function (req, res) {
    apiController.saveProvider(req.body,
        function (error, docs) {
            if (error) {
                res.send(404, error);
            }
            res.send(201, docs);
        })
};

exports.saveBanner = function (req, res) {
    apiController.saveBanner(req.body,
        function(error, docs) {
            if  (error) {
                res.send(404, error);
            }
            res.send(201, docs);
        }
    )
};

exports.savePlan = function (req, res) {
    apiController.savePlan(req.body,
        function (error, docs) {
            if (error) {
                res.send(404, error);
            }
            res.send(201, docs);
        })
};

exports.saveFeature = function (req, res) {
    apiController.saveFeature(req.body,
        function (error, docs) {
            if (error) {
                res.send(404, error);
            }
            res.send(201, docs);
        })
};

exports.saveReview = function (req, res) {
    apiController.saveReview(req.body,
        function (error, docs) {
            if (error) {
                res.send(404, error);
            }
            res.send(201, docs);
        })
};

exports.saveUser = function (req, res) {
    apiController.saveUser(req.body,
        function (error, docs) {
            if (error) {
                res.send(404, error);
            }
            res.send(201, docs);
        })
};

exports.user = function(req, res){
    console.log("getting user "+req.param("login"));
    apiController.user(req.param("login"), function (error, users) {
        if (error) {
            res.send(404, 'Error:' + error);
        }
        res.send(200, users);
    })
};



exports.saveProvider = function (req, res) {
    apiController.saveProvider(req.body,
        function (error, docs) {
            if (error) {
                res.send(404, error);
            }
            res.send(201, docs);
        })
};

exports.removeHtype = function(req, res){
    console.log('remove htype = '+ req.param("htype"));
    apiController.removeHtype(req.param("htype"), function (error, docs) {
        if (error) {
            res.send(404, error);
        } else {
            res.send(200, docs);
        }
    })
};

exports.features =   function (req, res) {
    console.log("htype="+req.param("htype"));
    apiController.getFeatures(req.param("htype"), function (error, features) {
        if (error) {
            res.send(404, error);
        } else {
            res.send(200, features);
        }
    })
};

exports.feature =   function (req, res) {
    console.log("get feature htype="+req.param("htype")+" name="+req.param('fname'));
    apiController.getFeature(req.param("htype"), req.param('fname'), function (error, features) {
        if (error) {
            res.send(404, error);
        } else {
            res.send(200, features);
        }
    })
};

exports.removeFeature = function (req, res){
    console.log("htype="+req.param("htype") + ' feature=' + req.param("feature"));
    apiController.removeFeature(req.param("htype"), req.param("feature"), function (error, docs) {
        if (error) {
            res.send(404, error);
        } else {
            res.send(200, docs);
        }
    });
};

exports.removeBanner = function (req, res){
    console.log("removing banner id="+req.param("id"));
    apiController.removeBanner(req.param("id"),function (error, docs) {
        if (error) {
            res.send(404, error);
        } else {
            res.send(200, docs);
        }
    });
};

exports.removeReview = function (req, res){
    console.log("removing review id="+req.param("id"));
    apiController.removeReview(req.param("id"),function (error, docs) {
        if (error) {
            res.send(404, error);
        } else {
            res.send(200, docs);
        }
    });
};

exports.removePlan = function (req, res){
    console.log("Removing plan = " + req.param("planName") + ' provider = ' + req.param("provider"));
    apiController.removePlan(req.param("provider"), req.param("planName"), function (error, docs) {
        if (error) {
            res.send(404, error);
        } else {
            res.send(200, docs);
        }
    });
};

exports.reviewsShortRecent = function (req, res) {
    console.log('get short reviews: ' + req.param("n"));
    apiController.getRecentShortReviews(req.param("n"), function (error, reviews) {
        if (error) {
            res.send(404, error);
        }
        for (var i = 0; i < reviews.length; i++) {
            var length = reviews[i].text.length > 160 ? 160 : reviews[i].text.length;
            reviews[i].text = reviews[i].text.substr(0, length);
        }
        res.send(200, reviews);
    });
};

exports.bannersN = function (req, res) {
    console.log('get banners: ' + req.param("n"));
    apiController.getNBanners(req.param("n"), function (error, banners) {
        if (error) {
            res.send(404, error);
        } else {
            res.send(200, banners);
        }
    });
};

exports.banners = function (req, res) {
    console.log('get banners: ' + req.param("n"));
    apiController.getBanners(req.param("n"), function (error, banners) {
        if (error) {
            res.send(404, error);
        } else {
            res.send(200, banners);
        }
    });
};

exports.plansSearch = function (req, res) {
    console.log('search plans: ' + req.param("criteria"));
    apiController.searchPlans(req.param("criteria"), function (error, plans) {
        if (error) {
            res.send(404, error);
        } else {
            res.send(200, plans);
        }
    });
};

exports.usersSearch = function (req, res) {
    console.log('search users: ' + req.param("criteria"));
    apiController.searchUsers(req.param("criteria"), function (error, plans) {
        if (error) {
            res.send(404, error);
        } else {
            res.send(200, plans);
        }
    });
};

exports.removeUser = function(req, res){
    console.log('remove user = '+ req.param("login"));
    apiController.removeUser(req.param("login"), function (error, docs) {
        if (error) {
            res.send(404, error);
        } else {
            res.send(200, docs);
        }
    })
};

/*
exports.plansSearchCount = function (req, res) {
    console.log('search plans count: ' + req.param("criteria"));
    apiController.searchPlans(req.param("criteria"), function (error, plans) {
        if (error) {
            res.send(404, error);
        } else {
            res.send(200, plans);
        }
    });
};

exports.plansSearchPaged = function (req, res) {
    console.log('search plans: ' + req.param("criteria") + 'page# ' + req.param("n")
        + " page length "+ req.param("length")
        + " sorting by "+ req.param("sorting"));


    apiController.searchPlans(req.param("criteria"), function (error, plans) {
        if (error) {
            res.send(404, error);
        } else {
            res.send(200, plans);
        }
    });
};
*/

exports.plansProvider = function (req, res) {
    console.log('get plans for provider: ' + req.param("provider"));
    apiController.plansProvider(req.param("provider"), function (error, plans) {
        if (error) {
            res.send(404, error);
        } else {
            res.send(200, plans);
        }
    });
};

exports.plan = function (req, res){
    console.log("Getting plan = " + req.param("planName") + ' provider = ' + req.param("provider"));
    apiController.plan(req.param("provider"), req.param("planName"), function (error, docs) {
        if (error) {
            res.send(404, error);
        } else {
            res.send(200, docs);
        }
    });
};

exports.removeProvider = function(req, res) {
    apiController.removeProvider(req.param("provider"), function(error, docs) {
        if (error) {
            res.send(404, error);
        } else {
            res.send(200, docs);
        }
    })

}

exports.providers = function (req, res) {
    apiController.getProviders(function (error, providers) {
        if (error) {
            res.send(404, error);
        }
        res.send(200, providers);
    })
};

//
// Test section
//

exports.testSaveFeature = function (req, res) {
    var f = apiController.getTemplate('feature');
    f.htype = 'web'; f.name = 'diskspace';
    f.type = 'int';
    f.unit = 'Gb';		// unit of measurement, like Mb, Hz, etc.
    f.maxvalue = 200;
    f.minvalue = 10;
    f.defaultvalue = 100;
    f.hasany = false;		// should show Any in the dialog, applicable for int, enum (for enum means at least one from selected
    f.hasunlimited= true;	// should show Unlimited
    f.operation = 'ge';

    apiController.saveFeature(
        f,
        function (error, docs) {
            if (error) {
                res.send('Error:' + error);
            }
            res.send(docs);
        })
};

exports.testSaveReview = function (req, res) {
    var f = apiController.getTemplate('review');
    f.author = 'default';
    f.time = new Date();
    f.provider = 'hostgator';
    f.plan = 'webhosting2';
    f.generalratings = 1;
    f.text = 'wrwrwrwr';

    apiController.saveReview(
        f,
        function (error, docs) {
            if (error) {
                res.send('Error:' + error);
            }
            res.send(docs);
        })
};


exports.testSavePlan = function (req, res) {
    var p = apiController.getTemplate('plan');

    p.htype = 'web';
    p.provider = 'hostgator';
    p.planname = 'webhosting2';
    p.prices = [
        {
            currency: "USD",
            timeunit: "month",
            unit: "ALL",
            number_timeunit: 1,
            price: 6.99
        },
        {
            currency: "USD",
            timeunit: "month",
            unit: "",
            number_timeunit: 12,
            price: 4.99
        }
    ]; // array of price objects

    p.disk_space = "unlimited";
    p.domain_registratin = "free";
    p.bandwith = "unlimited";
    p.email_accounts = 5;
    p.os = ["windows", "linux"];
    p.database = ["mySQL", "Postgress"];
    p.description = "Domain registration (free), Disk space (unlimited), Bandwidth (unlimited), SSL Certificate, Dedicated IP�number (1-2 or 3)";
    p.features = ["SSL Certificate", "Website statistics"];
    p.shoping_cart = ["osCommerce", "ZenCart", "Cube Cart"];
    p.address = {
        streetAddress: "Main st., 101, apt.101",
        city: "Zentown",
        postalCode: '101101'
    };
    p.phoneNumbers = ["812 123-1234", "916 123-4567"];
    p.adv_price = 4.99;

    apiController.savePlan(p,
        function (error, docs) {
            if (error) {
                res.send('Error:' + error);
            }
            res.send(docs);
        });
};

exports.testSaveBanner = function (req, res) {
    var p = apiController.getTemplate('banner');

    p.htmlcode = '<body>PPP</body>';
    p.alttext = 'hostgator';

    apiController.saveBanner(p,
        function (error, docs) {
            if (error) {
                res.send('Error:' + error);
            }
            res.send(docs);
        });
};

