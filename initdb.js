/**
 * Created with JetBrains WebStorm.
 * User: Alexander
 * Date: 22.01.14
 * Time: 18:59
 * To change this template use File | Settings | File Templates.
 */

var collections = [
    {'collectionName':'htypes',       'fieldName':{'name':1}},
    {'collectionName':'providers',    'fieldName':{'provider':1}},
    {'collectionName':'plans',        'fieldName': {'provider':1, 'planname':1}},
    {'collectionName':'features',     'fieldName': {'htype':1, 'name':1}},
    {'collectionName':'reviews',      'fieldName': null},
    {'collectionName':'banners',      'fieldName': null},
    {'collectionName':'users',        'fieldName':{'login':1}}
];

var data = [
    {'collectionName':'htypes',
        'values': [
            {
                name : "WEB",
                display_name : "Host a web site",
                short_name : "Web hosting",
                description : "This is shared hosting. It is used mostly for personal or business Brochure & Informational Websites. " +
                                "You will share resources with other web sited and will be given limited functionality. " +
                                "However usually this is cheapest hosting plan. ",
                keywords : "www",
                sort_order : 0,
                created : ISODate("2014-01-22")
            },
            {
                name : "VPS",
                display_name : "Run Virtual Private Server",
                short_name : "VPS",
                description : "Run Virtual Private Server. Used for Popular Sites With Dynamic Content & Heavier Workloads. You have access to entire server as administrator, however control is limited." +
                    "VPS is implemented by partitioning a physical server into multiple virtual servers that each have a protected and reserved amount of CPU and RAM resources.\ " +
                    "Unlike Shared hosting, VPS instances do not compete against each other for these resources. Therefore, a spike in resource demand among other VPS instances, " +
                    "will not lead to a performance decline in your website or database.",
                keywords : "vps",
                sort_order : 10,
                created : ISODate("2014-01-07")
            },
            {
                name : "DEDIC",
                display_name : "Have dedicated physical server",
                short_name : "Dedicated server",
                description : "A Dedicated server is a physical server that is only accessed by one customer.\ " +
                    "The customer is able to utilize the full CPU and RAM resources of the hardware system. " +
                    "Unlike a Virtual Private Server (VPS), all resources on a Dedicated Server are made available exclusively to a single customer,\ " +
                    "enabling consistently high performance at all times." +
                    "Dedicated Hosting is ideal for businesses or advanced users who run high traffic websites, CPU-intensive applications, or complex databases.",
                keywords : "dedicated",
                sort_order : 20,
                created : ISODate("2014-01-07")
            },
            {
                name : "COLOCATION",
                display_name : "Place my physical servers in a datacenter",
                short_name : "Colocation",
                description : "This is a hosting where you own the hardware, but you rent space in a data center (or colocation facility) " +
                    "for Internet connectivity and networking." +
                    "It generally costs more than standard Web hosting, but less than a comparable amount of bandwidth into your place of business. " +
                    "Once you have a machine set up, you take it physically to the location of the colocation provider and install it in their rack. " +
                    "That company then provides an IP, bandwidth, and power to your server. Once it's up and running, you access it much like you would access a Web site on a hosting provider. " +
                    "The difference being that you own the hardware.",
                keywords : "colocation",
                sort_order : 30,
                created : ISODate("2014-01-07")
            },
            {
                name : "CLOUD",
                display_name : "Host web site or application on a cloud",
                short_name : "Cloud hosting",
                description : "Cloud Services gives you all of the flexibility and control of a dedicated server, " +
                    "with better uptime, better performance and less hassle. " +
                    "If you are prepared to administer your own server and applications, this is the product for you." +
                    "Backed by rock-solid SLAs and Service Contracts, Cloud hosting provide total Business Continuity and Disaster Recovery in one " +
                    "easy-to-administrate infrastructure you can have confidence in. " +
                    "With root level \"white box\" access, you can install, manage and administer just about anything. " +
                    "Web Sites, Internet Services (SQL, Exchange, etc.), Software-as-a-Service Applications, Infrastructure services and more!",
                keywords : "cloud",
                sort_order : 40,
                created : ISODate("2014-01-07")
            }
]},
    {'collectionName':'features',
        values: [
            {

//**********************************************************
// WEB features
//**********************************************************

                htype: 'WEB',
                name:'a1_os',
                displayname:'Operating System',
                type:'multiple',		// actually this is enum int, bool (yes, no), string, multiple (enum),
                ismultiple:false,   // allow multiple choice
                unit:'',		// unit of measurement, like Mb, Hz, etc.
                maxvalue: 0,
                minvalue: 0,
                defaultvalue:0,
                hasany: false,		// should show Any in the dialog, applicable for int, enum (for enum means at least one from selected
                hasunlimited:false,	// should show Unlimited
                values: ['Windows', 'Linux'],	        // for enum list of possible values
                hasall:false,		// for enum option 'all selected'
                operation:'eq'	    // how to compare int  'le', 'ge' or 'eq'
            },
            {
                htype: 'WEB',
                name:'diskspace',
                displayname:'Disk space',
                description:"The more disk space you have the more files, pages, emails, and more everything your account will be able to store on our server.",
                type:'int',		// actually this is enum int, bool (yes, no), string, oneof, enum,
                ismultiple:0,   // allow multiple choice
                unit:'Gb',		// unit of measurement, like Mb, Hz, etc.
                maxvalue: 1000,
                minvalue: 0,
                defaultvalue:0,
                hasany: false,		// should show Any in the dialog, applicable for int, enum (for enum means at least one from selected
                hasunlimited:true,	// should show Unlimited
                hasall:false,		// for enum option 'all selected'
                operation:'gt'	    // how to compare int  'le', 'ge' or 'eq'
            },
            {
                htype: 'WEB',
                name:'bandwidth',
                displayname:'Bandwidth',
                description:'Bandwidth can be best described as gas for a car. If your website runs out of bandwidth nobody will be able to visit it. 1GB of bandwidth is equal to over 100,000 hits. The average account with us uses less than 2 GB of bandwidth a month. Your bandwidth number used will reset back to zero on the first of every month.',
                type:'int',		// actually this is enum int, bool (yes, no), string, oneof, enum,
                ismultiple:0,   // allow multiple choice
                unit:'Gb',		// unit of measurement, like Mb, Hz, etc.
                maxvalue: 500,
                minvalue: 0,
                defaultvalue:0,
                hasany: false,		// should show Any in the dialog, applicable for int, enum (for enum means at least one from selected
                hasunlimited:true,	// should show Unlimited
                hasall:false,		// for enum option 'all selected'
                operation:'gt'	    // how to compare int  'le', 'ge' or 'eq'
            },
            {
                htype: 'WEB',
                name:'database',
                displayname:'Database',
                description:"Web application or web site usually requires database to store information",
                type:'multiple',		// actually this is enum int, bool (yes, no), string, multiple (enum),
                ismultiple:true,   // allow multiple choice
                unit:'',		// unit of measurement, like Mb, Hz, etc.
                maxvalue: 0,
                minvalue: 0,
                defaultvalue:0,
                hasany: true,		// should show Any in the dialog, applicable for int, enum (for enum means at least one from selected
                hasunlimited:false,	// should show Unlimited
                values: ['MySQL', 'PostgresSQL', 'MongoDB', 'MSSQL'],	        // for enum list of possible values
                hasall:false,		// for enum option 'all selected'
                operation:'eq'	    // how to compare int  'le', 'ge' or 'eq'
            },
            {
                htype: 'WEB',
                name:'numberdatabases',
                displayname:'Number of Databases',
                description:'More databases means you can have more applications on your site',
                type:'int',		// actually this is enum int, bool (yes, no), string, oneof, enum,
                ismultiple:0,   // allow multiple choice
                unit:'',		// unit of measurement, like Mb, Hz, etc.
                maxvalue: 500,
                minvalue: 0,
                defaultvalue:0,
                hasany: false,		// should show Any in the dialog, applicable for int, enum (for enum means at least one from selected
                hasunlimited:true,	// should show Unlimited
                hasall:false,		// for enum option 'all selected'
                operation:'gt'	    // how to compare int  'le', 'ge' or 'eq'
            },
            {
                htype: 'WEB',
                name:'freedomains',
                displayname:'Domain Rgistrations',
                description:'Provider gives free domain registration with each hosting plans',
                type:'int',		// actually this is enum int, bool (yes, no), string, oneof, enum,
                ismultiple:false,   // allow multiple choice
                unit:'',		// unit of measurement, like Mb, Hz, etc.
                maxvalue: 500,
                minvalue: 0,
                defaultvalue:0,
                hasany: false,		// should show Any in the dialog, applicable for int, enum (for enum means at least one from selected
                hasunlimited:false,	// should show Unlimited
                hasall:false,		// for enum option 'all selected'
                operation:'gt'	    // how to compare int  'le', 'ge' or 'eq'
            },
            {
                htype: 'WEB',
                name:'domainsallowed',
                displayname:'Domains Allowed',
                description:'How many domains allowed to be hosted on one single account',
                type:'int',		// actually this is enum int, bool (yes, no), string, oneof, enum,
                ismultiple:false,   // allow multiple choice
                unit:'',		// unit of measurement, like Mb, Hz, etc.
                maxvalue: 500,
                minvalue: 0,
                defaultvalue:0,
                hasany: false,		// should show Any in the dialog, applicable for int, enum (for enum means at least one from selected
                hasunlimited:true,	// should show Unlimited
                hasall:false,		// for enum option 'all selected'
                operation:'gt'	    // how to compare int  'le', 'ge' or 'eq'
            },
            {
                htype: 'WEB',
                name:'tollfreenumber',
                displayname:'Toll-Free Number',
                description:'Free toll-free number for your web site and business. Limitations or additional cost may apply, check with provider',
                type:'yesno',		// actually this is enum int, bool (yes, no), string, oneof, enum,
                ismultiple:false,   // allow multiple choice
                unit:'',		// unit of measurement, like Mb, Hz, etc.
                maxvalue: 0,
                minvalue: 0,
                defaultvalue:0,
                hasany: false,		// should show Any in the dialog, applicable for int, enum (for enum means at least one from selected
                hasunlimited:false,	// should show Unlimited
                hasall:false,		// for enum option 'all selected'
                operation:'eq'	    // how to compare int  'le', 'ge' or 'eq'
            },
            {
                htype: 'WEB',
                name:'ipaddresses',
                displayname:'IP Addresses',
                description:'Your site can be accesses by multiple IP addresses',
                type:'int',		// actually this is enum int, bool (yes, no), string, oneof, enum,
                ismultiple:false,   // allow multiple choice
                unit:'',		// unit of measurement, like Mb, Hz, etc.
                maxvalue: 500,
                minvalue: 0,
                defaultvalue:0,
                hasany: false,		// should show Any in the dialog, applicable for int, enum (for enum means at least one from selected
                hasunlimited:false,	// should show Unlimited
                hasall:false,		// for enum option 'all selected'
                operation:'gt'	    // how to compare int  'le', 'ge' or 'eq'
            },
            {
                htype: 'WEB',
                name:'sslcertificate',
                displayname:'SSL Certificate',
                description:"A private SSL will act as a secure layer between your visitors and your web site. It will encrypt information such as Credit Cards which will give your visitors the confidence to make purchases on your website. Web sites that are e-commerce based are generally required to have an SSL to accept credit cards.",
                type:'multiple',		// actually this is enum int, bool (yes, no), string, multiple (enum),
                ismultiple:false,   // allow multiple choice
                unit:'',		// unit of measurement, like Mb, Hz, etc.
                maxvalue: 0,
                minvalue: 0,
                defaultvalue:0,
                hasany: true,		// should show Any in the dialog, applicable for int, enum (for enum means at least one from selected
                hasunlimited:false,	// should show Unlimited
                values: ['Private', 'Shared'],	        // for enum list of possible values
                hasall:false,		// for enum option 'all selected'
                operation:'eq'	    // how to compare int  'le', 'ge' or 'eq'
            },

//************************************************
// VPS features
//************************************************
            {
                htype: 'VPS',
                name:'a1_os',
                displayname:'Operating System',
                type:'multiple',		// actually this is enum int, bool (yes, no), string, multiple (enum),
                ismultiple:false,   // allow multiple choice
                unit:'',		// unit of measurement, like Mb, Hz, etc.
                maxvalue: 0,
                minvalue: 0,
                defaultvalue:0,
                hasany: false,		// should show Any in the dialog, applicable for int, enum (for enum means at least one from selected
                hasunlimited:false,	// should show Unlimited
                values: ['Windows', 'Linux'],	        // for enum list of possible values
                hasall:false,		// for enum option 'all selected'
                operation:'eq'	    // how to compare int  'le', 'ge' or 'eq'
            },
            {
                htype: 'VPS',
                name:'diskspace',
                displayname:'Disk space',
                description:"The more disk space you have the more files, pages, emails, and more everything you will be able to store on the server.",
                type:'int',		// actually this is enum int, bool (yes, no), string, oneof, enum,
                ismultiple:0,   // allow multiple choice
                unit:'Gb',		// unit of measurement, like Mb, Hz, etc.
                maxvalue: 1000,
                minvalue: 0,
                defaultvalue:0,
                hasany: false,		// should show Any in the dialog, applicable for int, enum (for enum means at least one from selected
                hasunlimited:true,	// should show Unlimited
                hasall:false,		// for enum option 'all selected'
                operation:'gt'	    // how to compare int  'le', 'ge' or 'eq'
            },
            {
                htype: 'VPS',
                name:'domainsallowed',
                displayname:'Domains Allowed',
                description:'How many domains allowed to be hosted on one single account',
                type:'int',		// actually this is enum int, bool (yes, no), string, oneof, enum,
                ismultiple:false,   // allow multiple choice
                unit:'',		// unit of measurement, like Mb, Hz, etc.
                maxvalue: 500,
                minvalue: 0,
                defaultvalue:0,
                hasany: false,		// should show Any in the dialog, applicable for int, enum (for enum means at least one from selected
                hasunlimited:true,	// should show Unlimited
                hasall:false,		// for enum option 'all selected'
                operation:'gt'	    // how to compare int  'le', 'ge' or 'eq'
            },

            {
                htype: 'VPS',
                name:'cpu',
                displayname:'CPU Cores',
                description:"More cores - better performance of your server.",
                type:'int',		// actually this is enum int, bool (yes, no), string, oneof, enum,
                ismultiple:0,   // allow multiple choice
                unit:'',		// unit of measurement, like Mb, Hz, etc.
                maxvalue: 1000,
                minvalue: 0,
                defaultvalue:0,
                hasany: false,		// should show Any in the dialog, applicable for int, enum (for enum means at least one from selected
                hasunlimited:false,	// should show Unlimited
                hasall:false,		// for enum option 'all selected'
                operation:'gt'	    // how to compare int  'le', 'ge' or 'eq'
            },
            {
                htype: 'VPS',
                name:'cpufreq',
                displayname:'CPU Frequency',
                description:"CPU Frequency is a speed on one processor core",
                type:'int',		// actually this is enum int, bool (yes, no), string, oneof, enum,
                ismultiple:0,   // allow multiple choice
                unit:'GHz',		// unit of measurement, like Mb, Hz, etc.
                maxvalue: 8,
                minvalue: 0,
                defaultvalue:0,
                hasany: false,		// should show Any in the dialog, applicable for int, enum (for enum means at least one from selected
                hasunlimited:false,	// should show Unlimited
                hasall:false,		// for enum option 'all selected'
                operation:'gt'	    // how to compare int  'le', 'ge' or 'eq'
            },
            {
                htype: 'VPS',
                name:'bandwidth',
                displayname:'Bandwidth',
                description:'Bandwidth can be best described as gas for a car. If your website runs out of bandwidth nobody will be able to visit it. 1GB of bandwidth is equal to over 100,000 hits. The average account with us uses less than 2 GB of bandwidth a month. Your bandwidth number used will reset back to zero on the first of every month.',
                type:'int',		// actually this is enum int, bool (yes, no), string, oneof, enum,
                ismultiple:0,   // allow multiple choice
                unit:'Gb',		// unit of measurement, like Mb, Hz, etc.
                maxvalue: 500,
                minvalue: 0,
                defaultvalue:0,
                hasany: false,		// should show Any in the dialog, applicable for int, enum (for enum means at least one from selected
                hasunlimited:true,	// should show Unlimited
                hasall:false,		// for enum option 'all selected'
                operation:'gt'	    // how to compare int  'le', 'ge' or 'eq'
            },
            {
                htype: 'VPS',
                name:'database',
                displayname:'Databases',
                description:"Some database can included by default, but you always can install your own",
                type:'multiple',		// actually this is enum int, bool (yes, no), string, multiple (enum),
                ismultiple:false,   // allow multiple choice
                unit:'',		// unit of measurement, like Mb, Hz, etc.
                maxvalue: 0,
                minvalue: 0,
                defaultvalue:0,
                hasany: true,		// should show Any in the dialog, applicable for int, enum (for enum means at least one from selected
                hasunlimited:false,	// should show Unlimited
                values: ['MySQL', 'PostgresSQL', 'MongoDB'],	        // for enum list of possible values
                hasall:false,		// for enum option 'all selected'
                operation:'eq'	    // how to compare int  'le', 'ge' or 'eq'
            },
            {
                htype: 'VPS',
                name:'freedomains',
                displayname:'Free Domains',
                description:'',
                type:'int',		// actually this is enum int, bool (yes, no), string, oneof, enum,
                ismultiple:false,   // allow multiple choice
                unit:'',		// unit of measurement, like Mb, Hz, etc.
                maxvalue: 500,
                minvalue: 0,
                defaultvalue:0,
                hasany: false,		// should show Any in the dialog, applicable for int, enum (for enum means at least one from selected
                hasunlimited:false,	// should show Unlimited
                hasall:false,		// for enum option 'all selected'
                operation:'gt'	    // how to compare int  'le', 'ge' or 'eq'
            },
            {
                htype: 'VPS',
                name:'ram',
                displayname:'RAM',
                description:"",
                type:'int',		// actually this is enum int, bool (yes, no), string, oneof, enum,
                ismultiple:0,   // allow multiple choice
                unit:'Gb',		// unit of measurement, like Mb, Hz, etc.
                maxvalue: 100,
                minvalue: 0,
                defaultvalue:0,
                hasany: false,		// should show Any in the dialog, applicable for int, enum (for enum means at least one from selected
                hasunlimited:false,	// should show Unlimited
                hasall:false,		// for enum option 'all selected'
                operation:'gt'	    // how to compare int  'le', 'ge' or 'eq'
            },
            {
                htype: 'VPS',
                name:'ipaddresses',
                displayname:'IP Addresses',
                description:'',
                type:'int',		// actually this is enum int, bool (yes, no), string, oneof, enum,
                ismultiple:false,   // allow multiple choice
                unit:'',		// unit of measurement, like Mb, Hz, etc.
                maxvalue: 500,
                minvalue: 0,
                defaultvalue:0,
                hasany: false,		// should show Any in the dialog, applicable for int, enum (for enum means at least one from selected
                hasunlimited:false,	// should show Unlimited
                hasall:false,		// for enum option 'all selected'
                operation:'gt'	    // how to compare int  'le', 'ge' or 'eq'
            },
//********************************************************
// Dedicate server features
//********************************************************
            {
                htype: 'DEDIC',
                name:'a1_os',
                displayname:'Operating System',
                type:'multiple',		// actually this is enum int, bool (yes, no), string, multiple (enum),
                ismultiple:false,   // allow multiple choice
                unit:'',		// unit of measurement, like Mb, Hz, etc.
                maxvalue: 0,
                minvalue: 0,
                defaultvalue:0,
                hasany: false,		// should show Any in the dialog, applicable for int, enum (for enum means at least one from selected
                hasunlimited:false,	// should show Unlimited
                values: ['Windows', 'Linux'],	        // for enum list of possible values
                hasall:false,		// for enum option 'all selected'
                operation:'eq'	    // how to compare int  'le', 'ge' or 'eq'
            },
            {
                htype: 'DEDIC',
                name:'diskspace',
                displayname:'Disk drives',
                description:"The more disk space you have the more files, pages, emails, and more everything you will be able to store on the server.",
                type:'int',		// actually this is enum int, bool (yes, no), string, oneof, enum,
                ismultiple:0,   // allow multiple choice
                unit:'Gb',		// unit of measurement, like Mb, Hz, etc.
                maxvalue: 5000,
                minvalue: 0,
                defaultvalue:0,
                hasany: false,		// should show Any in the dialog, applicable for int, enum (for enum means at least one from selected
                hasunlimited:false,	// should show Unlimited
                hasall:false,		// for enum option 'all selected'
                operation:'gt'	    // how to compare int  'le', 'ge' or 'eq'
            },
            {
                htype: 'DEDIC',
                name:'cputype',
                displayname:'CPU type',
                description:'CPU type defines performance of your computer',
                type:'multiple',		// actually this is enum int, bool (yes, no), string, multiple (enum),
                ismultiple:false,   // allow multiple choice
                unit:'',		// unit of measurement, like Mb, Hz, etc.
                maxvalue: 0,
                minvalue: 0,
                defaultvalue:0,
                hasany: true,		// should show Any in the dialog, applicable for int, enum (for enum means at least one from selected
                hasunlimited:false,	// should show Unlimited
                values: ['Intel Xeon', 'Intel i7', 'AMD 64'],	        // for enum list of possible values
                hasall:false,		// for enum option 'all selected'
                operation:'eq'	    // how to compare int  'le', 'ge' or 'eq'
            },
            {
                htype: 'DEDIC',
                name:'cpu',
                displayname:'CPU Cores',
                description:"More CPU cores, more application can run in parallel",
                type:'int',		// actually this is enum int, bool (yes, no), string, oneof, enum,
                ismultiple:0,   // allow multiple choice
                unit:'',		// unit of measurement, like Mb, Hz, etc.
                maxvalue: 64,
                minvalue: 0,
                defaultvalue:0,
                hasany: false,		// should show Any in the dialog, applicable for int, enum (for enum means at least one from selected
                hasunlimited:false,	// should show Unlimited
                hasall:false,		// for enum option 'all selected'
                operation:'gt'	    // how to compare int  'le', 'ge' or 'eq'
            },
            {
                htype: 'DEDIC',
                name:'cpufreq',
                displayname:'CPU Frequency',
                description:"CPU Frequency is a speed on one processor core",
                type:'int',		// actually this is enum int, bool (yes, no), string, oneof, enum,
                ismultiple:0,   // allow multiple choice
                unit:'GHz',		// unit of measurement, like Mb, Hz, etc.
                maxvalue: 8,
                minvalue: 0,
                defaultvalue:0,
                hasany: false,		// should show Any in the dialog, applicable for int, enum (for enum means at least one from selected
                hasunlimited:false,	// should show Unlimited
                hasall:false,		// for enum option 'all selected'
                operation:'gt'	    // how to compare int  'le', 'ge' or 'eq'
            },
            {
                htype: 'DEDIC',
                name:'ram',
                displayname:'RAM',
                description:"",
                type:'int',		// actually this is enum int, bool (yes, no), string, oneof, enum,
                ismultiple:0,   // allow multiple choice
                unit:'Gb',		// unit of measurement, like Mb, Hz, etc.
                maxvalue: 100,
                minvalue: 0,
                defaultvalue:0,
                hasany: false,		// should show Any in the dialog, applicable for int, enum (for enum means at least one from selected
                hasunlimited:false,	// should show Unlimited
                hasall:false,		// for enum option 'all selected'
                operation:'gt'	    // how to compare int  'le', 'ge' or 'eq'
            },
            {
                htype: 'DEDIC',
                name:'bandwidth',
                displayname:'Bandwidth',
                description:'Bandwidth can be best described as gas for a car. If your website runs out of bandwidth nobody will be able to visit it. 1GB of bandwidth is equal to over 100,000 hits. The average account with us uses less than 2 GB of bandwidth a month. Your bandwidth number used will reset back to zero on the first of every month.',
                type:'int',		// actually this is enum int, bool (yes, no), string, oneof, enum,
                ismultiple:0,   // allow multiple choice
                unit:'Gb',		// unit of measurement, like Mb, Hz, etc.
                maxvalue: 500,
                minvalue: 0,
                defaultvalue:0,
                hasany: false,		// should show Any in the dialog, applicable for int, enum (for enum means at least one from selected
                hasunlimited:true,	// should show Unlimited
                hasall:false,		// for enum option 'all selected'
                operation:'gt'	    // how to compare int  'le', 'ge' or 'eq'
            },
            {
                htype: 'DEDIC',
                name:'ipaddresses',
                displayname:'IP Addresses',
                description:'',
                type:'int',		// actually this is enum int, bool (yes, no), string, oneof, enum,
                ismultiple:false,   // allow multiple choice
                unit:'',		// unit of measurement, like Mb, Hz, etc.
                maxvalue: 500,
                minvalue: 0,
                defaultvalue:0,
                hasany: false,		// should show Any in the dialog, applicable for int, enum (for enum means at least one from selected
                hasunlimited:false,	// should show Unlimited
                hasall:false,		// for enum option 'all selected'
                operation:'gt'	    // how to compare int  'le', 'ge' or 'eq'
            },
            {
                htype: 'DEDIC',
                name:'domainsallowed',
                displayname:'Domains Allowed',
                description:'How many domains allowed to be hosted on one single account',
                type:'int',		// actually this is enum int, bool (yes, no), string, oneof, enum,
                ismultiple:false,   // allow multiple choice
                unit:'',		// unit of measurement, like Mb, Hz, etc.
                maxvalue: 500,
                minvalue: 0,
                defaultvalue:0,
                hasany: false,		// should show Any in the dialog, applicable for int, enum (for enum means at least one from selected
                hasunlimited:true,	// should show Unlimited
                hasall:false,		// for enum option 'all selected'
                operation:'gt'	    // how to compare int  'le', 'ge' or 'eq'
            },
//**************************************************************
// Colocation features
//**************************************************************
            {
                htype: 'COLOCATION',
                name:'a1_unit',
                displayname:'Space by',
                type:'multiple',		// actually this is enum int, bool (yes, no), string, multiple (enum),
                ismultiple:false,   // allow multiple choice
                unit:'',		// unit of measurement, like Mb, Hz, etc.
                maxvalue: 0,
                minvalue: 0,
                defaultvalue:0,
                hasany: false,		// should show Any in the dialog, applicable for int, enum (for enum means at least one from selected
                hasunlimited:false,	// should show Unlimited
                values: ['Unit', 'Rack'],	        // for enum list of possible values
                hasall:false,		// for enum option 'all selected'
                operation:'eq'	    // how to compare int  'le', 'ge' or 'eq'
            },
            {
                htype: 'COLOCATION',
                name:'bandwidth',
                displayname:'Bandwidth',
                description:'Bandwidth can be best described as gas for a car. If your website runs out of bandwidth nobody will be able to visit it. 1GB of bandwidth is equal to over 100,000 hits. The average account with us uses less than 2 GB of bandwidth a month. Your bandwidth number used will reset back to zero on the first of every month.',
                type:'int',		// actually this is enum int, bool (yes, no), string, oneof, enum,
                ismultiple:0,   // allow multiple choice
                unit:'Gb',		// unit of measurement, like Mb, Hz, etc.
                maxvalue: 500,
                minvalue: 0,
                defaultvalue:0,
                hasany: false,		// should show Any in the dialog, applicable for int, enum (for enum means at least one from selected
                hasunlimited:true,	// should show Unlimited
                hasall:false,		// for enum option 'all selected'
                operation:'gt'	    // how to compare int  'le', 'ge' or 'eq'
            },
            {
                htype: 'COLOCATION',
                name:'power',
                displayname:'Power Supply',
                description:'',
                type:'int',		// actually this is enum int, bool (yes, no), string, oneof, enum,
                ismultiple:0,   // allow multiple choice
                unit:'Wt',		// unit of measurement, like Mb, Hz, etc.
                maxvalue: 1000,
                minvalue: 0,
                defaultvalue:0,
                hasany: false,		// should show Any in the dialog, applicable for int, enum (for enum means at least one from selected
                hasunlimited:true,	// should show Unlimited
                hasall:false,		// for enum option 'all selected'
                operation:'gt'	    // how to compare int  'le', 'ge' or 'eq'
            },
            {
                htype: 'COLOCATION',
                name:'ipaddresses',
                displayname:'IP Addresses',
                description:'',
                type:'int',		// actually this is enum int, bool (yes, no), string, oneof, enum,
                ismultiple:false,   // allow multiple choice
                unit:'',		// unit of measurement, like Mb, Hz, etc.
                maxvalue: 500,
                minvalue: 0,
                defaultvalue:0,
                hasany: false,		// should show Any in the dialog, applicable for int, enum (for enum means at least one from selected
                hasunlimited:false,	// should show Unlimited
                hasall:false,		// for enum option 'all selected'
                operation:'gt'	    // how to compare int  'le', 'ge' or 'eq'
            },

//**************************************************************
// Cloud hosting features
//**************************************************************
            {
                htype: 'CLOUD',
                name:'a1_os',
                displayname:'Operating System',
                type:'multiple',		// actually this is enum int, bool (yes, no), string, multiple (enum),
                ismultiple:false,   // allow multiple choice
                unit:'',		// unit of measurement, like Mb, Hz, etc.
                maxvalue: 0,
                minvalue: 0,
                defaultvalue:0,
                hasany: false,		// should show Any in the dialog, applicable for int, enum (for enum means at least one from selected
                hasunlimited:false,	// should show Unlimited
                values: ['Windows', 'Linux'],	        // for enum list of possible values
                hasall:false,		// for enum option 'all selected'
                operation:'eq'	    // how to compare int  'le', 'ge' or 'eq'
            },
            {
                htype: 'CLOUD',
                name:'diskspace',
                displayname:'Storage',
                description:"The more disk space you have the more files, pages, emails, and more everything you will be able to store on the server.",
                type:'int',		// actually this is enum int, bool (yes, no), string, oneof, enum,
                ismultiple:0,   // allow multiple choice
                unit:'Gb',		// unit of measurement, like Mb, Hz, etc.
                maxvalue: 5000,
                minvalue: 0,
                defaultvalue:0,
                hasany: false,		// should show Any in the dialog, applicable for int, enum (for enum means at least one from selected
                hasunlimited:false,	// should show Unlimited
                hasall:false,		// for enum option 'all selected'
                operation:'gt'	    // how to compare int  'le', 'ge' or 'eq'
            },
            {
                htype: 'CLOUD',
                name:'cpu',
                displayname:'CPU Cores',
                description:"More CPU cores, more application can run in parallel",
                type:'int',		// actually this is enum int, bool (yes, no), string, oneof, enum,
                ismultiple:0,   // allow multiple choice
                unit:'',		// unit of measurement, like Mb, Hz, etc.
                maxvalue: 64,
                minvalue: 0,
                defaultvalue:0,
                hasany: false,		// should show Any in the dialog, applicable for int, enum (for enum means at least one from selected
                hasunlimited:false,	// should show Unlimited
                hasall:false,		// for enum option 'all selected'
                operation:'gt'	    // how to compare int  'le', 'ge' or 'eq'
            },
            {
                htype: 'CLOUD',
                name:'ram',
                displayname:'Guaranteed RAM',
                description:"",
                type:'int',		// actually this is enum int, bool (yes, no), string, oneof, enum,
                ismultiple:0,   // allow multiple choice
                unit:'Gb',		// unit of measurement, like Mb, Hz, etc.
                maxvalue: 100,
                minvalue: 0,
                defaultvalue:0,
                hasany: false,		// should show Any in the dialog, applicable for int, enum (for enum means at least one from selected
                hasunlimited:false,	// should show Unlimited
                hasall:false,		// for enum option 'all selected'
                operation:'gt'	    // how to compare int  'le', 'ge' or 'eq'
            },
            {
                htype: 'CLOUD',
                name:'datatransfer',
                displayname:'Data Transfers',
                description:'Bandwidth can be best described as gas for a car. If your website runs out of bandwidth nobody will be able to visit it. 1GB of bandwidth is equal to over 100,000 hits. The average account with us uses less than 2 GB of bandwidth a month. Your bandwidth number used will reset back to zero on the first of every month.',
                type:'int',		// actually this is enum int, bool (yes, no), string, oneof, enum,
                ismultiple:0,   // allow multiple choice
                unit:'Gb',		// unit of measurement, like Mb, Hz, etc.
                maxvalue: 2000,
                minvalue: 0,
                defaultvalue:0,
                hasany: false,		// should show Any in the dialog, applicable for int, enum (for enum means at least one from selected
                hasunlimited:true,	// should show Unlimited
                hasall:false,		// for enum option 'all selected'
                operation:'gt'	    // how to compare int  'le', 'ge' or 'eq'
            }
        ]} ,

    {'collectionName': 'users',
        values: [
            {"email" : "admin@admin.com",
                "login" : "admin",
                "name" : "Administrator",
                "password" : "xLyFrMbvYHjUwBtIsGYBFdlM0C9RBH9U+DuW3kG+RfE2bOgg4p8Ep3ZNnaF+fGcN7ytXHm29efdvX/e/ZRAy1A==",
                "registration" : "Wed Jan 29 2014 13:12:45 +0400",
                "role" : 1,
                "salt" : "76xk89qn3u88o04cswcoggkgokgkcwk"}
        ]}
];

initDb = function (db) {

    for (var i=0; i < collections.length; i++ ) {
        initDbCollection(db, collections[i].collectionName, collections[i].fieldName);
    }
}

loadDb = function (db) {

    for (var i=0; i < data.length; i++ ) {
        loadDbCollection(db, data[i].collectionName, data[i].values);
    }
}

initDbCollection = function (db, collectionName, fieldName) {
    if (fieldName != null) {
        db[collectionName].ensureIndex( fieldName, {unique:true});
        err = db.getLastError();
        if (err) {
            print ("Collection:"+ collectionName + ", index by:" + JSON.stringify(fieldName) + " created with error:" + err);
            throw {name:'FatalError', message:"Collection:"+ collectionName + ", index by:" + JSON.stringify(fieldName) + " created with error:" + err};
        }
        else {
            print("Collection:"+ collectionName + ", index by:" + JSON.stringify(fieldName) + " created successfully");
        }
    }
}

loadDbCollection = function (db, collectionName, values) {

    print ('Loading collection: ' + collectionName);
    for (var i = 0; i < values.length; i++) {
        db[collectionName].insert( values[i]);
        err = db.getLastError();

        if (err) {
            print ("Collection:"+ collectionName + ", values: " + i + " loaded with error:" + err);
            throw {name:'FatalError', message:"Loaded with error"};
        }
        else {
            print("Collection:"+ collectionName + ", values:" + i + " loaded successfully");
        }
    }
}

db = connect("localhost:27017/node-bwch");
initDb(db);
loadDb(db);

