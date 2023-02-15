# Software Engineering 2022-2023

<p align = "center">This project was made for the course of Software engineering NTUA. We were asked to make a system for answering, creating and seeing the statistics of questionnaires . Because this is a very big application, we were asked to make specific functions of this system based on the number of people in the team.</p>
<p align="center">
	<img alt="Byte Code Size" src="https://img.shields.io/github/languages/code-size/ntua/SoftEng22-69?color=red" />
	<img alt="# Lines of Code" src="https://img.shields.io/tokei/lines/github/ntua/SoftEng22-69?color=red" />
	<img alt="# Languages Used" src="https://img.shields.io/github/languages/count/ntua/SoftEng22-69?color=yellow" />
	<img alt="Top language" src="https://img.shields.io/github/languages/top/ntua/SoftEng22-69?color=yellow" />
	<img alt="Last commit" src="https://img.shields.io/github/last-commit/ntua/SoftEng22-69?color=important" />
</p>

## Technology Stack

* MySQL for the database
* NodeJS and Express for the server


## Back-end

The backend folder contains:

* controllers: The logic of the routes.
* data: All data that is been loaded when server starts ( if in server.js you uncomment force:true and populate_db() )
* data_creators: All files that we used to create the data.
* middlewares: Files like authentication, authorization, upload.
* models: Created with the help of sequelize_auto. Those models represent the tables of the database.
* routes: All routes that are being used in the project. Each route starts with https://{{host}}:9103/intelliq_api/{baseURL}/{service}/{path-to-resource}, where each service has certain endpoints.
* test: Contains the tests that were written in order to check all of our endpoints. Mocha and Chai were used for the testing.
* uploads: This folder is not in the control version, when you (locally) start the server, this folder is been created if it does not exist. In this folder all uploads are been uploaded.

### **To start the backend:**

First you need to write *npm install* if you didn't already. To start use the command *npm start*.

### **To test the backend:**

To run the tests use *npm test*.

