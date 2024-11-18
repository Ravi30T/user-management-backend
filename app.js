const express = require('express')
const {MongoClient} = require('mongodb')
const cors = require('cors')
const {v4:uuidv4} = require('uuid')
require('dotenv').config()
const app = express()
app.use(express.json())
app.use(cors())

let client

const initializeDBAndServer = async () => {
    const dbUser = process.env.DB_USER
    const dbPassword = process.env.DB_PASSWORD
    const dbCluster = process.env.DB_CLUSTER
    const dbName = process.env.DB_NAME
    const uri = `mongodb+srv://${dbUser}:${dbPassword}@${dbCluster}/${dbName}?retryWrites=true&w=majority`;

    client = new MongoClient(uri)

    try {
        await client.connect()
        console.log('Connected to MongoDB...')
        const PORT =  process.env.PORT || 3000

        app.listen(PORT, () => {
            console.log(`Server is running on port: ${PORT}`)
        })
    }
    catch(e){
        console.log(`Error Connecting to MongoDB: ${e.message}`)
        process.exit(1)
    }
}

initializeDBAndServer()

// API-1 Creating New Account

app.post('/users', async(request, response) => {
    const collection = client.db(process.env.DB_NAME).collection('users')
    const {firstName, lastName, email, department} = request.body // To Get User Form Data From The Request Body
    

    const checkEmailInDB = await collection.find({email}).toArray() // To check whether any user has used the provided email

    if(checkEmailInDB.length === 0){
        const userId = uuidv4()

        if(firstName !== undefined && lastName !== undefined && email !== undefined && department !== undefined){
            const userDetails = {
                userId: userId,
                firstName: firstName,
                lastName: lastName,
                email: email,
                department: department
            }
            
            await collection.insertOne(userDetails)
            response.status(201).send({message: "User Added Successfully"})
            
        }
    }
    else{
        response.status(401).send({message: "Email Already Exists"})
    }
})


// API-2 Update User Details

app.put('/users/:userId', async(request, response) => {
    const collection = client.db(process.env.DB_NAME).collection('users')
    const {userId}= request.params
    const {firstName, lastName, email, department} = request.body // To Get User Form Data From The Request Body
    
    const checkUserInDB = await collection.find({userId}).toArray() // To Check whether the user data is available or not
    const checkEmailInDB = await collection.find({email}).toArray() // To check whether any user has used the provided email

    let updatedUserData = {}

    if(checkUserInDB.length === 1){
        if(checkEmailInDB.length === 0){
            if(firstName){
                updatedUserData.firstName = firstName
            }
    
            if(lastName){
                updatedUserData.lastName = lastName
            }
    
            if(email){
                updatedUserData.email = email
            }
    
            if(department){
                updatedUserData.department = department
            }
    
            await collection.updateOne({userId: userId}, {$set: updatedUserData}) // Updating User Data based on the User Id provided in the request body
            response.status(201).send({message: "User Details Updated Successfully"})
        }
        else{
            response.status(401).send({message: "Email Already Exists"})
        }
    }
    else{
        response.status(401).send({message: "User Doesn't Exist"}) // If the User ID provided is not valid
    }    
})

// API-3 GET All Users Details

app.get('/users', async(request, response) => {
    const collection = client.db(process.env.DB_NAME).collection('users')

    const getAllUsersData = await collection.find().toArray()

    if(getAllUsersData.length > 0){
        response.status(201).send(getAllUsersData)
    }
    else{
        response.status(201).send({message: "No Users Data Available"})
    }
})

// API-4 Get a Specific User Details

app.get('/user/:userId', async(request, response) => {
    const collection = client.db(process.env.DB_NAME).collection('users')
    const {userId} = request.params

    const checkUserInDB = await collection.find({userId}).toArray()

    if(checkUserInDB.length === 1){
        response.status(201).send(checkUserInDB)
    }
    else{
        response.status(401).send({message: "User Doesn't Exist"})
    }
})

// API-5 Delete a Specific User Details

app.delete('/user/:userId', async(request, response) => {
    const collection = client.db(process.env.DB_NAME).collection('users')
    const {userId} = request.params

    const checkUserInDB = await collection.find({userId}).toArray()

    if(checkUserInDB.length === 1){
        await collection.deleteOne({userId})
        response.status(201).send({message: "User Deleted Successfully"})
    }
    else{
        response.status(401).send({message: "User Doesn't Exist"})
    }
})