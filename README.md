# fse-301-project

Web app created for FSE 301

## Tech Stack

Below is the technical stack being used for this web application

- Meteor
- Vue
- Bootstrap-Vue
- MongoDB
- JavaScript

### Front-end

Front-end is built with Vue & Bootstrap-Vue

### Back-end

Back-end is built with JavaScript and the database used is MongoDB

### Containerization & Deployment

Application is bundled into a Docker container and stored on a Kubernetes cluster. Container is connected to external MongoDB. Container has ingress pointing to domain name.

### CI / CD

Each push to main will create a new base Docker image for the application within Kubernetes cluster
