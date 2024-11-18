# User Management Application (Backend)

This is a simple **User Management Application** built with Node.js, Express.js, and MongoDB. It provides RESTful APIs for managing user accounts, including creating, updating, retrieving, and deleting user details.

## Features
1. **Create User:** Add a new user to the database.
2. **Update User:** Modify an existing user's details.
3. **Retrieve All Users:** Fetch the details of all users.
4. **Retrieve Specific User:** Get details of a specific user by their unique `userId`.
5. **Delete User:** Remove a specific user from the database.

## Prerequisites
- [Node.js](https://nodejs.org/) (v14.x or later)
- [MongoDB](https://www.mongodb.com/)
- npm (Node Package Manager)

## Installation

1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   cd <repository-directory>

2. **Install Dependencies Run the following command to install the required packages**:
    ```bash
    npm install

3. **Environment Setup Create a .env file in the root directory and add the following environment variables**:
    ```bash
    PORT=3000
    DB_USER=your_mongo_user
    DB_PASSWORD=your_mongo_password
    DB_CLUSTER=your_mongo_cluster
    DB_NAME=your_database_name

## Running the Application

1. **Start the Server Use the following command**:
    ```bash
    npx nodemon app.js

The server will start on the configured PORT (default: 3000).

2. **Access the Application The API endpoints can be accessed via tools like Postman or a browser.**

## API Endpoints

1.  #### Create User
    ```bash
    Endpoint: POST /users
    Description: Adds a new user to the database.
    Request Body:
        {
            "firstName": "John",
            "lastName": "Doe",
            "email": "john.doe@example.com",
            "department": "Engineering"
        }
    
    Response:

    201 Created: User added successfully.
    401 Unauthorized: Email already exists.

2. #### Update User
    ```bash
    Endpoint: PUT /users/:userId
    Description: Updates the details of an existing user.
    Request Params: userId (string)
    Request Body (optional fields):
        {
            "firstName": "Jane",
            "email": "jane.doe@example.com"
        }

3. #### Retrieve All Users
    ```bash
    Endpoint: GET /users
    Description: Retrieves a list of all users.
    Response:

    201 Created: Returns an array of user objects.
    201 Created: No Users Data Available.

4. #### Retrieve Specific User
    ```bash
    Endpoint: GET /user/:userId
    Description: Fetches details of a specific user by their userId.
    Request Params: userId (string)
    Response:

    201 Created: Returns the user's details.
    401 Unauthorized: User doesn't exist.

5. #### Delete User
    ```bash
    Endpoint: DELETE /user/:userId
    Description: Deletes a specific user from the database.
    Request Params: userId (string)
    Response:

    201 Created: User deleted successfully.
    401 Unauthorized: User doesn't exist.

## Tools and Technologies

- Backend: Node.js, Express.js
- Database: MongoDB
- UUID: For generating unique user IDs
- dotenv: For environment variable management
- cors: For Cross-Origin Resource Sharing