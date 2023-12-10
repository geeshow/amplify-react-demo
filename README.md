# Getting Started with Amplify React
## Overview
This is a sample application for the [Getting Started with AWS Amplify](https://amzn.to/2LWaE0q) workshop. It is a simple social media app that allows users to post text and images and view posts from other users. The app uses the following AWS services:
* [AWS Amplify](https://aws.amazon.com/amplify/) for the client libraries and hosting
* [AWS Lambda](https://aws.amazon.com/lambda/) for the serverless function
* [AWS AppSync](https://aws.amazon.com/appsync/) for the GraphQL API
* [Amazon Cognito](https://aws.amazon.com/cognito/) for user authentication
* [Amazon DynamoDB](https://aws.amazon.com/dynamodb/) for the database

## Amplify CLI
The Amplify CLI is a command line tool that allows you to create and manage AWS resources for your app. It is a Node.js application that you install locally. You can install it using the following command:
```bash
$ npm install -g @aws-amplify/cli
```
You can use the CLI to initialize a new Amplify project, add resources to the project, and push the local changes to the cloud. You can also use the CLI to generate GraphQL statements (queries, mutations, and subscriptions) and generate code for the GraphQL statements.

## Amplify features
* [AUTH](https://aws-amplify.github.io/docs/js/authentication): The AUTH service provides authentication APIs and building blocks for developers who want to create user authentication experiences. The service supports multiple authentication mechanisms, including social sign-in, username and password, and federated identity providers such as Amazon, Google, and Facebook.
```
$ amplify add auth
```

* [API](https://aws-amplify.github.io/docs/js/api): The API service provides a simple solution for creating and interacting with serverless GraphQL and REST APIs. The service supports multiple data sources, including Amazon DynamoDB, AWS Lambda, and HTTP endpoints.
```
$ amplify add api
```
* [GRAPHQL](https://aws-amplify.github.io/docs/js/graphql): The GRAPHQL service provides a simple solution for managing data for your app using GraphQL. The service supports multiple data sources, including Amazon DynamoDB, AWS Lambda, and HTTP endpoints.
```
$ amplify add graphql
```
* [STORAGE](https://aws-amplify.github.io/docs/js/storage): The STORAGE service provides a simple solution for managing user content for your app in public, protected, or private storage buckets. The service supports multiple storage providers, including Amazon S3 and Amazon DynamoDB.
```
$ amplify add storage
```

## Getting Started
To get started, clone the repository and change into the new directory:
```bash
$ git clone
$ cd amplify-react-workshop
```
Install the dependencies:
```bash
$ npm install
```
Initialize the Amplify project:
```bash
$ amplify init
```
When prompted, accept the default values for the project configuration. The project will be initialized in the cloud and locally.

Add the API:
```bash
$ amplify add api
```
When prompted, choose GraphQL as the API type, choose the default AppSync configuration, and choose Yes for the guided schema creation. When prompted, enter `schema.graphql` as the schema filename and accept the default authentication type of Amazon Cognito User Pool. When prompted, choose No for the conflict detection and No for the default authorization type for the API.

Push the local changes to the cloud:
```bash
$ amplify push
```
When prompted, choose Yes to generate the GraphQL statements (queries, mutations, and subscriptions) and accept the default directory name of `src/graphql`. When prompted, choose No for code generation and No for the GraphQL code generation language.

Start the app:
```bash
$ npm start
```
The app will open in a browser window at `http://localhost:3000`.

## License Summary
This sample code is made available under a modified MIT license. See the LICENSE file.
```

