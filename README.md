
On my OSX, the MongoDB settings are as follows:
```
$ cat /usr/local/etc/mongod.conf
systemLog:
  destination: file
  path: /apps/data/mongodb/logs/mongo.log
  logAppend: true
storage:
  dbPath: /apps/data/mongodb/data
net:
  bindIp: 127.0.0.1
$
```
