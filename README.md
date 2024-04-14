# ReptilesRUs

This is the project for the class CSCI-3321 at Trinity University. This project is made by Choudhry Abdullah, David, Paul and Santiago. 

Inorder to get started clone the respository and make sure all the packages listed in the dependencies in package.json file are installed. You would have to setup a mysql database to run this website locally.

Open mysql locally and then run ```source dbSetup.txt```. Create a .env file in the root directory of the project and populate it as follows:

```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD="yoursql password"
DB_DATABASE=pets
```

Once everything is setup run node index.js to start
