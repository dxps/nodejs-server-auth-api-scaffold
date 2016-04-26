
#### MongoDB


* On my OSX it was installed using Homebrew:
```bash
brew update
brew install mongodb
```

   At the time of this writing, version 3.2.4 was installed.

* Used the following configuration:

```bash
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

* Started using:
  * either `mongod --config /usr/local/etc/mongod.conf &` 
  * or `brew services start mongodb`

