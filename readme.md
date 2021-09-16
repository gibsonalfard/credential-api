# credential-api
User credential application built with [Express.js](https://expressjs.com) and [MongoDB](https://www.mongodb.com) as the database. **Docker-Compose** and **Kubernetes Deployment** can be used to create this application. This application can also be run on your server using [node.js](https://nodejs.org/en/).

## Installation
### Run application using Node.js
To run this application on your server, you'll need to install **npm** and **MongoDB**.
The [node.js official website](https://nodejs.org/en/) allows you to download Node.js and npm.
The [MongoDB Website](https://docs.mongodb.com/manual/installation/) has instructions for installing MongoDB on your server.

Install the dependencies needed to run this application with this command.
```bash
npm install
```
After that, you can run the application with this command.
```bash
npm run dev # To run application in development environment
npm run start # To run application in production environment
```
You can access credential application at http://localhost:8080
### Run application using Docker Compose
To use the docker-compose command, you'll need **Docker** and **Docker-Compose**.
Official documentation for docker and docker-compose installation can be found on [Docker website](https://www.docker.com/get-started).

Use this command to run a docker-compose application.
```bash
docker-compose up --build -d
```
You can access credential application at http://localhost:8080

### Run application using Kubernetes
If you already have **Docker Desktop** installed on your Windows or Mac computer, you can create a Kubernetes cluster using the **Kubernetes** option in Docker Desktop settings.
If you're using Linux, [minikube](https://minikube.sigs.k8s.io/docs/) can help you set up a Kubernetes cluster.

You only need to run the following command from the kubernetes directory inside this project once your Kubernetes cluster is up and running.

To create a Kubernetes deployment for MongoDB Database, run the following command.
```bash
kubectl apply -f mongodb-pvc.yaml  # Create Persistent Volume Claim to store MongoDB database
kubectl apply -f mongodb-configmap.yaml # Create ConfigMap to store environment variable for MongoDB connection
kubectl apply -f mongodb-deployment.yaml  # Create Deployment for MongoDB
kubectl apply -f mongodb-svc.yaml  # Create service to enable connection to MongoDB
```
To create a Kubernetes deployment for Credential API, run the following command.
```bash
kubectl apply -f credentialapi-deployment.yaml  # Create Deployment for credential API apps
kubectl apply -f credentialapi-svc.yaml # Create Service to enable connection to credential apps inside Kubernetes cluster
```
By default, you can't access the application from outside the Kubernetes cluster.
Ingress Controller must be configured to allow access from outside the Kubernetes cluster.


You must first install **NGINX Ingress** in your Kubernetes cluster before running this command.
This [link](https://kubernetes.github.io/ingress-nginx/deploy/) contains the steps for installing NGINX Ingress.


To create an Ingress Controller, run this command after NGINX Ingress has been deployed in your cluster.
```bash
kubectl apply -f ingress-controller.yaml
```

Application deployed in Kubernetes can be accessed at http://kubernetes.docker.internal

## Usage
This [Postman Documentation](https://documenter.getpostman.com/view/9087219/U16oo3ho) contains documentation for accessing endpoints. 

The examples in this documentation are based on the project's Kubernetes cluster implementation.
Change the url to http://localhost:8080 if you're using **Docker Compose** or **Node.js** to install the app.

## Contribution
If you found any bugs in this version, you can send an issues to this repository.