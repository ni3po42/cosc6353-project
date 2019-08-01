instructions used for debian:
https://docs.mongodb.com/manual/tutorial/install-mongodb-on-debian/


first, run this:
sudo apt-get install dirmngr --install-recommends
that will set up dirmngr
then run:
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 9DA31620334BD75D9DCB49F368818C72E52529D4
then:
echo "deb http://repo.mongodb.org/apt/debian stretch/mongodb-org/4.0 main" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.0.list
then:
sudo apt-get update
and:
sudo apt-get install -y mongodb-org

then to start:
sudo service mongod start

to stop:
sudo service mongod stop
or restart:
sudo service mongod restart

or use interactive:
mongo

also, for auth use:
mongo --port 27017 -u 'user' -p 'password' --authenticationDatabase databasename