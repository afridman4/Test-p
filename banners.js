/**
 * Created with JetBrains WebStorm.
 * User: Alexander
 * Date: 18.02.14
 * Time: 21:07
 * To change this template use File | Settings | File Templates.
 */

var banners = [
    {
        "htmlcode" : "<a href=\"http://secure.hostgator.com/~affiliat/cgi-bin/affiliates/clickthru.cgi?id=magitechusa-\"><img border=\"0\" src=\"http://tracking.hostgator.com/img/Windows_Server_Promo/Hostgator-windows-2012-AN-300x250.gif\" /></a>\n",
        "alttext" : "Hostgator banner",
        "height" : 250,
        "priority" : 0,
        "time" : ISODate("2014-02-18T17:05:56.224Z")
    },
    {
        "htmlcode" : "<a href=\"http://secure.hostgator.com/~affiliat/cgi-bin/affiliates/clickthru.cgi?id=magitechusa-\"><img src=\"http://tracking.hostgator.com/img/Shared_Red_Blue/300x250-animated.gif\" border=\"0\"></a>\n",
        "alttext" : "Hostgator banner",
        "height" : 250,
        "priority" : 0,
        "time" : ISODate("2014-02-18T17:05:56.224Z")
    },
    {
        "htmlcode" : "<a href=\"http://secure.hostgator.com/~affiliat/cgi-bin/affiliates/clickthru.cgi?id=magitechusa-\"><img src=\"http://tracking.hostgator.com/img/VPS/300x250-animated.gif\" border=\"0\"></a>\n",
        "alttext" : "Hostgator banner",
        "height" : 250,
        "priority" : 0,
        "time" : ISODate("2014-02-18T17:05:56.224Z")
    },
    {
        "htmlcode" : "<a href=\"http://secure.hostgator.com/~affiliat/cgi-bin/affiliates/clickthru.cgi?id=magitechusa-\"><img src=\"http://tracking.hostgator.com/img/Shared_Blue/234x60-animated.gif\" border=\"0\"></a>\n",
        "alttext" : "Hostgator banner",
        "height" : 60,
        "priority" : 0,
        "time" : ISODate("2014-02-18T17:05:56.224Z")
    },
    {
        "htmlcode" : "<a href=\"http://secure.hostgator.com/~affiliat/cgi-bin/affiliates/clickthru.cgi?id=magitechusa-\"><img src=\"http://tracking.hostgator.com/img/Dedicated/234x60.gif\" border=\"0\"></a>\n",
        "alttext" : "Hostgator banner",
        "height" : 60,
        "priority" : 0,
        "time" : ISODate("2014-02-18T17:05:56.224Z")
    },
    {
        "htmlcode" : "<a href=\"http://secure.hostgator.com/~affiliat/cgi-bin/affiliates/clickthru.cgi?id=magitechusa-\"><img src=\"http://tracking.hostgator.com/img/Discount_VPS/HOSTGATOR-VPS-BANNERS-AN234x60.gif\" border=\"0\"></a>\n",
        "alttext" : "Hostgator banner",
        "height" : 60,
        "priority" : 0,
        "time" : ISODate("2014-02-18T17:05:56.224Z")
    }
];

loadBanners = function (db, values) {

    print ('Loading collection: ' + 'banners');
    for (var i = 0; i < values.length; i++) {
        db['banners'].insert( values[i]);
        err = db.getLastError();

        if (err) {
            print ("Banner:"+ values[i].alttext + ", values: " + i + " loaded with error:" + err);
            throw {name:'FatalError', message:"Loaded with error"};
        }
        else {
            print("Banner " + i + " loaded successfully");
        }
    }
}

db = connect("localhost:27017/node-bwch");
loadBanners(db, banners);

