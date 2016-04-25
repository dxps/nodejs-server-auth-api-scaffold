
Mongo DB
--------

- it is used for storing the users.

- installed mongodb using brew:
	brew update
	brew install mongodb

- used /usr/local/etc/mongod.conf:

systemLog:
  destination: file
  path: /apps/data/mongodb/logs/mongo.log
  logAppend: true
storage:
  dbPath: /apps/data/mongodb/data
net:
  bindIp: 127.0.0.1

  - database client used is robomongo

  Postman REST Client
  -------------------

  - Chrome extension for testing the api
  