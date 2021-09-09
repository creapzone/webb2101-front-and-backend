import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config()
const app = express()
const port = process.env.PORT

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}))
app.use(express.urlencoded({extended: false}))
app.use(express.json())


// Här finns databas relaterat
let currentId = 14
function incrementCurrentIdByOne() {
    currentId += 1
}
let inMemoryDatabase = [
    {
        id: 10,
        name: 'Adam',
        age: 12,
        gender: 'Male',
    },
    {
        id: 11,
        name: 'Bengtina',
        age: 24,
        gender: 'Female',
    },
    {
        id: 12,
        name: 'Cissi',
        age: 36,
        gender: 'Female',
    },
    {
        id: 13,
        name: 'Dawit',
        age: 48,
        gender: 'Male',
    }
]

// Svars-kommunikation från API
function messageUserNotFound() {
    return {
        status: 404,
        text: 'User not found!'
    }
}

function messageSuccess(message) {
    return {
        status: 200,
        text: message
    }
}

// Sök i databasen
function getUserIndex(id) {
    for (let i = 0; i < inMemoryDatabase.length; i++) {
        if (inMemoryDatabase[i].id === id) {
            return i
        }
    }
    return -1
}

// CRUD - Create Read Update Delete
function createNewUser(userData) {
    let user = {
        id: currentId,
        name: userData.name,
        age: userData.age,
        gender: userData.gender,
    }
    incrementCurrentIdByOne()
    inMemoryDatabase.push(user)
}

function getAllUsers() {
    return inMemoryDatabase
}

function getUserById(id) {
    let index = getUserIndex(id)

    if (index === -1) {
        return messageUserNotFound()
    } else {
        return messageSuccess(inMemoryDatabase[index])
    }
}

function updateUser(userData) {
    let index = getUserIndex(Number(userData.id))

    if (index === -1) {
        return messageUserNotFound()
    } else {
        if (inMemoryDatabase[index].name !== userData.name) {
            inMemoryDatabase[index].name = userData.name;
        }
        if (inMemoryDatabase[index].age !== userData.age) {
            inMemoryDatabase[index].age = userData.age
        }
        if (inMemoryDatabase[index].gender !== userData.gender) {
            inMemoryDatabase[index].gender = userData.gender
        }

        return messageSuccess('User updated!')
    }
}

function deleteUser(index) {
    inMemoryDatabase.splice(index, 1)
}

function deleteUserById(id) {
    let index = getUserIndex(id)

    if (index === -1) {
        return messageUserNotFound()
    } else {
        deleteUser(index)
        return messageSuccess('User deleted!')
    }
}

// Kontrollerar att API:et lever
app.get('/', function (req, res){
    res.send('API is live')
})

// API CRUD - Create, Read, Update, Delete
app.post('/users', function (req, res) {
    createNewUser(req.body)
    res.json('Successfully created a new user')
})

app.get('/users', function (req, res) {
    res.json(getAllUsers())
})

app.get('/users/:id', function (req, res) {
    const id = Number(req.params.id)
    let response = getUserById(id)
    res.status(response.status).json(response.text)
})

app.put('/users', function (req, res) {
    let response = updateUser(req.body)
    console.log(response.status, response.text)
    res.status(response.status).send(response.text)
});

app.delete('/users/:id', function(req, res) {
    let response = deleteUserById(Number(req.params.id))
    res.status(response.status).send(response.text)
});

// Startar servern.
app.listen(port, () => {
    console.log(`The server is running on port ${port}`)
})

