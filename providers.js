var providers = [
{
    "provider" : "Hostgator",
    "affiliation" : true,
    "affiliationlink" : "http://secure.hostgator.com/~affiliat/cgi-bin/affiliates/clickthru.cgi?id=magitechusa",
    "street" : "5005 Mitchelldale, Suite 100",
    "city" : "Houston",
    "state" : "TX",
    "postalcode" : "77092",
    "country" : "USA",
    "website" : "www.hostgator.com",
    "phonenumbers" : "(866) 96 - GATOR (42867)",
    "description" : "HostGator.com LLC is a world-wide provider of shared, reseller, VPS and dedicated web hosting. Privately held and based in Houston, Texas, the company was founded in 2002 by Brent Oxley, who started the company from his dorm room at Florida Atlantic University. Since then, HostGator has grown from a small hosting company with just three servers into a world leading and industry recognized hosting provider with more than 12,000 servers under management.",
    "generalrating" : 0,
    "numberofreviews" : 0
},
{
    "provider" : "IXwebhosting",
    "affiliation" : true,
    "affiliationlink" : "https://www.ixwebhosting.com/templates/ix/v2/affiliate/clickthru.cgi?id=magitechusa",
    "street" : "",
    "city" : "Columbus",
    "state" : "OH",
    "postalcode" : "",
    "country" : "USA",
    "website" : "www.ixwebhosting.com",
    "phonenumbers" : "+1 (614) 534-1961",
    "description" : "In 1999 we began supporting our first hosting customers on a server in someone's living room, and since then we have grown into a company with over 110,000 clients hosting over 470,000 sites with us. What does this mean for you? Not only do we know what we're doing, but you're not going to have to worry about changing hosting companies because we're not going anywhere.",
    "generalrating" : 0,
    "numberofreviews" : 0
},
{
    "provider" : "BurstNET",
    "affiliation" : true,
     "affiliationlink" : "https://service.burst.net/aff.php?aff=5894",
     "street" : "PO Box 591",
     "city" : "Scranton",
     "state" : "PA",
     "postalcode" : "18501",
     "country" : "USA",
     "website" : "www.burst.net",
     "phonenumbers" : "1-877-BURSTNET",
     "description" : "BurstNET Technologies, Inc.™ is a world-wide leader in Web Hosting and Internet Solutions. The privately held company, based in North-Eastern Pennsylvania, services clientele in over 100 countries around the world. BurstNET® began in 1991 as a computer hardware/software retail firm and distributorship. Shortly after incorporating in late 1996, the company quickly made the transition to providing Internet services. BurstNET® established itself in the industry prior to the explosion of the Web Hosting market. The company has experienced exceptional growth and currently hosts 10000+ Dedicated Servers and Co-located machines, 20000+ Virtual Private Servers (VPS), and millions of websites",
     "generalrating" : 0,
     "numberofreviews" : 0
}
];

loadProviders = function (db, values) {

    print ('Loading collection: ' + 'providers');
    for (var i = 0; i < values.length; i++) {
        db['providers'].insert( values[i]);
        err = db.getLastError();

        if (err) {
            print ("Provider:"+ values[i].planname + ", values: " + i + " loaded with error:" + err);
            throw {name:'FatalError', message:"Loaded with error"};
        }
        else {
            print("Provider " + ", values:" + i + " loaded successfully");
        }
    }
}

db = connect("localhost:27017/node-bwch");
loadProviders(db, providers);
