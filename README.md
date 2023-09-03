# Loan-Application-System

The Loan Application Status System is a web application developed using the _ERN ( Express.js, React.js, Node.js) stack. For simplicity, I have used local json files to store and fetch the data.
It allows users to view the status of their loan applications by providing their business details.

One such dummy detail with which you can test this feature is :

Business Id : 2377

Business Name : Dummy Business

Business Establishment Year : 2020

Loan Amount : any amount of your choice e.g. 800000

Select Any accounting provider


Dockerization
The Loan Application Status System can be containerized using Docker for easier deployment. Below are the steps to run the application in Docker containers.

Prerequisites
Before you proceed, ensure that you have Docker installed on your system.

Docker Build
1. Clone the repository.
2. cd loan-application-status
3. cd client
4. docker build -t loan-appplication-ui .
5. cd ../server
6. docker build -t loan-application-api .




