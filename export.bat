set host1=82.146.52.137
set database=node-bwch
set outputdir=.

mongoexport -h $host1 -d $database -c htypes -o $outputdir/htypes.json
mongoexport -h $host1 -d $database -c providers -o $outputdir/providers.json
mongoexport -h $host1 -d $database -c features -o $outputdir/features.json
mongoexport -h $host1 -d $database -c users -o $outputdir/users.json
mongoexport -h $host1 -d $database -c plans -o $outputdir/plans.json
mongoexport -h $host1 -d $database -c banners -o $outputdir/banners.json
mongoexport -h $host1 -d $database -c reviews -o $outputdir/reviews.json

