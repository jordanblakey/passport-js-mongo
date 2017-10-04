# Passport.js & MongoDB

## MongoDB

The MongoDB instance stores its data files in /var/lib/mongodb and its log files in /var/log/mongodb by default, and runs using the mongodb user account. You can specify alternate log and data file directories in /etc/mongod.conf. See systemLog.path and storage.dbPath for additional information.

If you change the user that runs the MongoDB process, you must modify the access control rights to the /var/lib/mongodb and /var/log/mongodb directories to give this user access to these directories.

`chown -R mongod:mongod db`
`sudo mkdir -p /data/db`

*Use*
`sudo service mongod start`
`tail /var/log/mongodb/mongod.log`
`sudo service mongod stop`
`sudo service mongod restart`
Shell: `mongo`

*Removal*
`sudo apt-get purge mongodb-enterprise*`
`sudo rm -r /var/log/mongodb`
`sudo rm -r /var/lib/mongodb`

*Commands*
Get current DB: `db`
Show all Databases: `show dbs`
Change to/create DB: `use <database>`
Drop current database (argument to drop other): `db.dropDatabase();`
Show help for an db object: `db.help()`

Show all collections: `show collections`
Show help for an collection object: `db.help()`
Create a new collection: `db.myCollection.insertOne()`
Alternate collection syntax: `db["3test"].find()`, `db.getCollection("3test").find()`

Show up to 20 matches: `db.collection.find().pretty`
Call help from shell: `mongo --help`
Call help from Mongo cli: `help`
Show help for a method -- no parens: `db.updateUser`
