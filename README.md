# Job Listing Web Application

This repository contains a job listing web application built with the MERN stack (MongoDB, Express, React, Node.js). The application allows users to search for job listings and apply for jobs.

## Table of Contents
- [Installation](#installation)
- [Setup](#setup)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)

## Installation

To get started with this project, you'll need to clone the repository to your local machine and install the necessary dependencies for both the client and server.

### Cloning the Repository

To clone the repository, use the following command in your terminal:

 ```bash
    git clone git@github.com:JLopez0001/JobListing.git 
```
```
cd JobListing / server
```

1. **Install Node.js dependencies:**

    ```bash
    npm install
    ```

## Setup

### Environment Variables

The server requires environment variables for proper operation. Create a `.env` file in the `server` directory with the following content:

```
PORT="3000"
DB_URL="your-mongodb-connection-string"
SALT_ROUNDS="11"
TOKEN_KEY="your-secret-token-key"
```


- **`DB_URL`**: Replace `"your-mongodb-connection-string"` with your own MongoDB connection string. You can obtain this from your MongoDB database provider.
- **`TOKEN_KEY`**: Replace `"your-secret-token-key"` with a secret key of your choice for token generation and validation.

## Running the Application

### Server

To start the server, run:

```
npm run db:seed
npm run dev
```

### Client

To start the client, navigate to the client directory and run:

```
npm install
npm run dev
```

